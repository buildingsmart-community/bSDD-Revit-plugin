using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using System;
using Element = Autodesk.Revit.DB.Element;
using ElementType = Autodesk.Revit.DB.ElementType;
using Parameter = Autodesk.Revit.DB.Parameter;
using Category = Autodesk.Revit.DB.Category;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using NLog;
using System.Collections.Generic;

namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    public class ParameterCheck : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            try
            {
                // Get the active document
                Document doc = commandData.Application.ActiveUIDocument.Document;
                UIApplication app = commandData.Application;
                //{
                //    "type": "IfcClassificationReference",
                //    "name": "23.21 vloeren; constructief, vrijdragende vloeren",
                //    "location": "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/23.21",
                //    "identification": "23.21",
                //    "referencedSource": {
                //        "type": "IfcClassification",
                //         "name": "DigiBase Demo NL-SfB tabel 1",
                //         "location": "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
                //    }
                //}

                string paramnam = "bsdd\\digibase\\nlsfb";

                Dictionary<string, string> dictionary = new Dictionary<string, string>
                {
                    { "Name", "digibase" },
                    { "Type", "nlsfb" },
                    { "location", "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021" },
                };

            https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/23.21

                //string parameterName = $"bsdd/{dictionary.Values}/{dictionary.Name}".Replace(" ", "-");


                //////////////////////////// REMARK, Replace with your elementId
                // Specify the element id you want to check
                ElementId elementId = new ElementId(2609522); // Replace with your element id

                // Specify the parameter name you want to check
                string parameterName = "BSDD_Material"; // Replace with your parameter name

                PublicClass.checkTypeParameter = false;
                PublicClass.checkParameter = false;
                //ParameterChecker(doc, elementId, parameterName, app);



                return Result.Succeeded;
            }
            catch (Exception ex)
            {
                message = ex.Message;
                return Result.Failed;
            }
        }






        private void ParameterChecker(Document doc, ElementId elementId, string parameterName, UIApplication app)
        {
            Element element = doc.GetElement(elementId);
            ElementId elementTypeId = element.GetTypeId();
            ElementType elementType = doc.GetElement(elementTypeId) as ElementType;
            if (element != null)
            {
                foreach (Parameter parameter in elementType.Parameters)
                {
                    if (parameter.Definition.Name == parameterName)
                    {
                        PublicClass.checkTypeParameter = true;
                        // Parameter found
                        //TaskDialog.Show("Parameter Check", $"ElementType {element.Id} has parameter {parameterName}.");
                    }
                }
                foreach (Parameter parameter in element.Parameters)
                {
                    if (parameter.Definition.Name == parameterName)
                    {
                        PublicClass.checkParameter = true;
                        // Parameter found
                        //TaskDialog.Show("Parameter Check", $"ElementType {element.Id} has parameter {parameterName}.");
                    }
                }

                if (PublicClass.checkParameter || PublicClass.checkTypeParameter)
                {
                    TaskDialog.Show("Parameter Check", $"Element {element.Id} has parameter {parameterName}.");
                }
                else
                {
                    try
                    {
                        DefinitionFile myDefinitionFile = doc.Application.OpenSharedParameterFile();
                        SetNewParameterToInstanceWall(app, myDefinitionFile, parameterName);

                        TaskDialog.Show("Parameter Check", $"ElementType {element.Id} has not the parameter {parameterName}.");
                    }
                    catch (Exception ex)
                    {
                        TaskDialog.Show("Shared parameterfile missing", "Create or load a shared parameterfile");
                    }
                }
            }

        }


        public bool SetNewParameterToInstanceWall(UIApplication app, DefinitionFile myDefinitionFile, string parameterName)
        {
            // create a new group in the shared parameters file
            DefinitionGroups myGroups = myDefinitionFile.Groups;
            try
            {
                DefinitionGroup myGroup = myGroups.Create("BSDD_Parameters");
            }
            catch (Exception ex)
            {
            }


            DefinitionGroup Group = myGroups.get_Item("BSDD_Parameters");
            // create an instance definition in definition group MyParameters
            ExternalDefinitionCreationOptions option = new ExternalDefinitionCreationOptions(parameterName, SpecTypeId.String.Text);
            // Don't let the user modify the value, only the API
            option.UserModifiable = true;
            // Set tooltip
            option.Description = parameterName;
            Definition myDefinition = Group.Definitions.Create(option);

            try
            {
                // create a category set and insert category of wall to it
                PublicClass.myCategories = app.Application.Create.NewCategorySet();
                // use BuiltInCategory to get category of wall
                PublicClass.myCategory = Category.GetCategory(app.ActiveUIDocument.Document, BuiltInCategory.OST_Walls); // LIST OF ELEMENTS WHERE TO WRITE BACK TO
            }
            catch (Exception ex)
            {
                TaskDialog.Show("VASTLOPEN", "Hier loopt het vast");
            }

            try
            {
                PublicClass.myCategories.Insert(PublicClass.myCategory);
            }
            catch (Exception ex)
            {
                TaskDialog.Show("VASTLOPEN", "Het loopt hier vast");
            }

            try
            {
                //Create an instance of InstanceBinding
                PublicClass.instanceBinding = app.Application.Create.NewInstanceBinding(PublicClass.myCategories);
            }
            catch (Exception ex)
            {
                TaskDialog.Show("VASTLOPEN", "Het loopt hier vast");
            }



            //////////////////////////////////////////////////
            try
            {
                // Get the BingdingMap of current document.
                BindingMap bindingMap = app.ActiveUIDocument.Document.ParameterBindings;

                // Bind the definitions to the document
                bool instanceBindOK = bindingMap.Insert(myDefinition,
                                                PublicClass.instanceBinding, GroupTypeId.Text);

                return instanceBindOK;
            }
            catch (Exception ex)
            {
                TaskDialog.Show("VASTLOPEN", "Probeer het anders hier");
            }
            /////////////////////////////////////////////////////



            return false;
        }





        public static class PublicClass
        {
            public static bool checkTypeParameter { get; set; }
            public static bool checkParameter { get; set; }

            public static CategorySet myCategories { get; set; }

            public static Category myCategory { get; set; }

            public static InstanceBinding instanceBinding { get; set; }
        }
    }
}
