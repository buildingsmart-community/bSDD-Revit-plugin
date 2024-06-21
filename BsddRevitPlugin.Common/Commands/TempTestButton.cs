using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.Utilities;
using NLog;
using System.Collections.Generic;
using System.Linq;

namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]

    public class TempTestButton : IExternalCommand
    {

        Logger logger = LogManager.GetCurrentClassLogger();
        public Result Execute(
            ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            UIApplication uiApp = commandData.Application;
            UIDocument uiDoc = uiApp.ActiveUIDocument;
            Document doc = uiDoc.Document;


            // Toggle the feature state
            var settings = GlobalBsddSettings.bsddsettings;
            settings.UserModifiableParameters = !settings.UserModifiableParameters;
            SettingsManager.SaveSettingsToGlobalParametersAndDataStorage(doc, settings);

            // Backup, remove, recreate parameters, and restore data
            ToggleUserModifiableForParameters(doc);


            return Result.Succeeded;
        }
        private void ToggleUserModifiableForParameters(Document doc)
        {
            List<ParameterCreation> sharedParameterSave = new List<ParameterCreation>();
            // Backup parameter values
            var backupData = BackupParameterValues(doc);

            // Remove and recreate parameters with the desired UserModifiable setting
            sharedParameterSave = BackupAndRemoveSharedParameters(doc);
            // Start a transaction to modify document data
            using (Transaction tx = new Transaction(doc, "Re-create BSDD Parameters"))
            {
                tx.Start();

                ForgeTypeId groupType = GroupTypeId.Ifc;
                Parameters.CreateProjectParameters(doc, sharedParameterSave, "tempGroupName", groupType);



                tx.Commit();

            }
            using (Transaction tx = new Transaction(doc, "Restore values"))
            {
                tx.Start();


                // Restore parameter values from backup
                RestoreParameterValues(doc, backupData);


                tx.Commit();

            }

        }
        private List<ParameterCreation> BackupAndRemoveSharedParameters(Document doc)
        {
            // Dictionary to store parameter names and their associated categories
            Dictionary<string, List<Category>> parameterCategories = new Dictionary<string, List<Category>>();
            List<ParameterCreation> sharedParameterSave = new List<ParameterCreation>();

            // Start a transaction to modify document data
            using (Transaction tx = new Transaction(doc, "Delete BSDD Parameters"))
            {
                tx.Start();

                BindingMap bindingMap = doc.ParameterBindings;
                DefinitionBindingMapIterator it = bindingMap.ForwardIterator();
                logger.Info($"Total count: {bindingMap.Size}");

                List<Definition> defenitions = new List<Definition>();

                int i = 0;

                while (it.MoveNext())
                {
                    logger.Info($"Iteration #2: {i}");
                    Definition definition = it.Key;
                    Binding binding = it.Current as Binding;

                    bool parameterIsType = true;
                    if (binding is InstanceBinding)
                    {
                        parameterIsType = false;
                    }
                    // Check if the parameter name starts with "bsdd/"
                    if (definition.Name.StartsWith("bsdd/"))
                    {

                        logger.Info($"Iteration #2 -> bsdd/: {i}");
                        
                        ForgeTypeId forgeTypeId = definition.GetDataType();
                        // Retrieve categories associated with this parameter
                        List<Category> categories = new List<Category>();
                        if (binding is ElementBinding elementBinding)
                        {
                            foreach (Category category in elementBinding.Categories)
                            {
                                categories.Add(category);
                            }
                        }

                        // Add to dictionary
                        sharedParameterSave.Add(new ParameterCreation(definition.Name, forgeTypeId, false, categories, parameterIsType));

                        defenitions.Add(definition);

                        //// Remove the parameter from the document
                        //bool removed = doc.ParameterBindings.Remove(definition);

                        //if (!removed)
                        //{
                        //    logger.Error($"Failed to remove parameter: {definition.Name}");
                        //}
                    }
                    i++;
                }
                logger.Info($"Total iterations #2: {i}");

                foreach (var definition in defenitions)
                {
                    bool removed = doc.ParameterBindings.Remove(definition);

                    if (!removed)
                    {
                        logger.Error($"Failed to remove parameter: {definition.Name}");
                    }
                }

                tx.Commit();

              


                return sharedParameterSave;
            }

            // Optionally, display the results or handle the dictionary as needed
            foreach (var entry in parameterCategories)
            {
                string categories = string.Join(", ", entry.Value.Select(c => c.Name));
                TaskDialog.Show("Deleted Parameter", $"{entry.Key}: {categories}");
            }
        }
        private Dictionary<ElementId, Dictionary<string, object>> BackupParameterValues(Document doc)
        {
            var backup = new Dictionary<ElementId, Dictionary<string, object>>();

            var collector = new FilteredElementCollector(doc).WherePasses(new LogicalOrFilter(new ElementIsElementTypeFilter(false), new ElementIsElementTypeFilter(true)));

            foreach (Element element in collector)
            {
                foreach (Parameter param in element.Parameters)
                {
                    if (param.Definition != null && param.Definition.Name.StartsWith("bsdd/") && param.HasValue)
                    {
                        if (!backup.ContainsKey(element.Id))
                        {
                            backup[element.Id] = new Dictionary<string, object>();
                        }
                        // Backup the value based on the storage type
                        switch (param.StorageType)
                        {
                            case StorageType.Integer:
                                backup[element.Id][param.Definition.Name] = param.AsInteger();
                                break;
                            case StorageType.Double:
                                backup[element.Id][param.Definition.Name] = param.AsDouble();
                                break;
                            case StorageType.String:
                                backup[element.Id][param.Definition.Name] = param.AsString();
                                break;
                            case StorageType.ElementId:
                                backup[element.Id][param.Definition.Name] = param.AsElementId();
                                break;
                        }
                    }
                }
            }

            return backup;
        }
        private void RestoreParameterValues(Document doc, Dictionary<ElementId, Dictionary<string, object>> backupData)
        {
            foreach (var elementEntry in backupData)
            {
                Element element = doc.GetElement(elementEntry.Key);
                foreach (var paramEntry in elementEntry.Value)
                {
                    Parameter param = element.LookupParameter(paramEntry.Key);
                    if (param != null)
                    {
                        var value = paramEntry.Value;
                        // Determine the storage type and cast value accordingly before setting it
                        switch (param.StorageType)
                        {
                            case StorageType.Integer:
                                param.Set((int)value);
                                break;
                            case StorageType.Double:
                                // For Double, consider the unit type if necessary
                                param.Set((double)value);
                                break;
                            case StorageType.String:
                                param.Set(value as string);
                                break;
                            case StorageType.ElementId:
                                param.Set(value as ElementId);
                                break;
                            default:
                                try
                                {
                                    param.Set(value as string);

                                }
                                catch (System.Exception)
                                {

                                    throw;
                                }
                                continue;
                        }
                    }
                }
            }
        }
    }

}
