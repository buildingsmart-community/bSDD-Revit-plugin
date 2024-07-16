using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using NLog;
using System.Collections.Generic;

namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    public class TempTestButton : IExternalCommand
    {
        // Static variable to maintain the toggle state
        private static bool isFeatureEnabled = false;
        public Result Execute(
            ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            UIApplication uiApp = commandData.Application;
            UIDocument uiDoc = uiApp.ActiveUIDocument;
            Document doc = uiDoc.Document;

            if (false)
            {
                // Toggle the feature state
                isFeatureEnabled = !isFeatureEnabled;

                // Your code to enable/disable the feature based on isFeatureEnabled
                // Since we cannot directly toggle UserModifiable, this part would be conceptual.
                // For example, you might enable/disable a custom handler that intercepts user actions.
                if (isFeatureEnabled)
                {
                    // Start a transaction to modify document data
                    using (Transaction tx = new Transaction(doc, "Toggle UserModifiable"))
                    {
                        tx.Start();

                        // Iterate through all shared parameters in the document
                        var bindingMap = doc.ParameterBindings;
                        DefinitionBindingMapIterator it = bindingMap.ForwardIterator();
                        while (it.MoveNext())
                        {
                            if (it.Key is ExternalDefinition externalDefinition &&
                                externalDefinition.Name.StartsWith("bsdd/"))
                            {
                                // Retrieve the current binding for the parameter
                                Binding binding = bindingMap.get_Item(it.Key);

                                // Check if the binding is an instance of ElementBinding
                                if (binding is ElementBinding elementBinding)
                                {
                                    // Toggle UserModifiable for each category in the binding
                                    var categories = elementBinding.Categories;
                                    foreach (Category category in categories)
                                    {
                                        // Here you would toggle the UserModifiable property
                                        // Note: Revit API does not directly allow toggling UserModifiable on shared parameters.
                                        // This step is more about conceptually what you'd want to do, but may not be directly achievable as described.
                                    }
                                }
                            }
                        }

                        tx.Commit();
                    }
                }
                else
                {

                }
            }



            return Result.Succeeded;
        }

    }
}
