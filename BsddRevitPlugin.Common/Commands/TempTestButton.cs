using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using NLog;
using BIM.IFC.Export.UI;
using Autodesk.Revit.DB.IFC;

namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    public class TempTestButton : IExternalCommand
    {
        public Result Execute(
            ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            UIApplication uiApp = commandData.Application;
            UIDocument uiDoc = uiApp.ActiveUIDocument;
            Document doc = uiDoc.Document;

            var table = uiApp.Application.ExportIFCCategoryTable;



            BindingMap bindingMap = doc.ParameterBindings;
            DefinitionBindingMapIterator it = bindingMap.ForwardIterator();

            Element elem = new FilteredElementCollector(doc).OfCategory(BuiltInCategory.OST_Floors).FirstElement(); 

            while (it.MoveNext())
            {
                InternalDefinition def = it.Key as InternalDefinition;
                if (def != null)
                {
                    logger.Info($"Paramname =  {def.Name}");
                    // Use the InternalDefinition here
                    if (def.Name == "testinstancebinding")
                    {
                        Binding oldBinding = bindingMap.get_Item(def);

                        if (oldBinding is InstanceBinding instanceBinding)
                        {
                            CategorySet oldCategories = instanceBinding.Categories;
                            CategorySet newCategories = doc.Application.Create.NewCategorySet();

                            // Copy the old categories to the new set
                            foreach (Category category in oldCategories)
                            {
                                newCategories.Insert(category);
                            }
                            // Add the new category
                            Category newCategory = doc.Settings.Categories.get_Item(BuiltInCategory.OST_Floors);
                            newCategories.Insert(newCategory);

                            // Create a new binding with the new category set
                            InstanceBinding newBinding = doc.Application.Create.NewInstanceBinding(newCategories);

                            // Replace the old binding with the new one
                            using (Transaction t = new Transaction(doc, "Modify Binding"))
                            {
                                t.Start();
                                bindingMap.ReInsert(def, newBinding, def.GetGroupTypeId());
                                t.Commit();
                            }
                        }

                    }
                }
            }

            foreach (var item in doc.ParameterBindings)
            {

                switch (item)
                {
                    case InstanceBinding instanceBinding:
                        logger.Info($"InstanceBinding {instanceBinding}");
                        break;
                    case TypeBinding typeBinding:
                        logger.Info($"TypeBinding {typeBinding}");
                        break;
                }
                logger.Info($"log {item}");
            }

            
            return Result.Succeeded;
        }
    }
}
