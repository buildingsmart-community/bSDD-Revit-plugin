using System;
using System.Collections.Generic;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Newtonsoft.Json;

namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    public class ParameterAanpassen : IExternalCommand
    {
        public Result Execute(
            ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            UIApplication uiApp = commandData.Application;
            UIDocument uiDoc = uiApp.ActiveUIDocument;
            Document doc = uiDoc.Document;

            string jsonString = "{\"350319\":{\"Export Type to IFC As\":\"IfcSlab.FLOOR\",\"Type Comments\":\"ABC\",\"Type Name\":\"ABC\"},\"350304\":{\"Export Type to IFC As\":\"IfcWall\",\"Type Comments\":\"DEF\",\"Type Name\":\"ABC123\"},\"350307\":{\"cat\":\"Ceiling\",\"Type Comments\":\"GHI\",\"Type Name\":\"ABsdfaC\"}}";
            string jsonStringempty = "{\"Export to IFC As\":\"\",\"IFC Predefined Type\":\"\",\"Comments\":\"\"}";

            try
            {
                Dictionary<int, Dictionary<string, string>> dictionary = JsonConvert.DeserializeObject<Dictionary<int, Dictionary<string, string>>>(jsonString);
                Dictionary<string, string> dictionaryempty = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonStringempty);
                


                // You can now access the data in the dictionary
                foreach (var entry in dictionary)
                {
                    int key = entry.Key;
                    Dictionary<string, string> values = entry.Value;

                    try
                    {
                        ElementId elementid = new ElementId(key);                         
                        Element element = doc.GetElement(elementid);

                        if (element != null)
                        {
                            // TYPEPARAMETERS //
                            List<Parameter> typeparameters = new List<Parameter>();
                            ElementId typeId = element.GetTypeId();
                            Element elementType = doc.GetElement(typeId);

                            foreach (Parameter typeparameter in elementType.Parameters)
                            {
                                typeparameters.Add(typeparameter);
                            }

                            using (Transaction trans = new Transaction(doc, "Update Parameters"))
                            {
                                if (trans.Start() == TransactionStatus.Started)
                                {
                                    foreach (Parameter typeparameter in typeparameters)
                                    {
                                        string paramName = typeparameter.Definition.Name;
                                        //TaskDialog.Show("Success", paramName);

                                        if (!typeparameter.IsReadOnly)
                                        {
                                            if (values.ContainsKey(paramName))
                                            {
                                                string parametervalue = values[paramName];
                                                typeparameter.Set(parametervalue);
                                                //TaskDialog.Show("Success", paramName + ": " + parametervalue);
                                            }

                                            //string test = parameter.Definition.GetDataType().ToString();
                                            //TaskDialog.Show("Success", parameter.AsValueString());
                                            //parameter.Set("Aanpassen parameters");
                                        }
                                        //if (typeparameter.Definition.Name == )
                                    }

                                    trans.Commit();
                                }

                            }
                            // TYPEPARAMETERS //

                            // INSTANCEPARAMETERS //

                            List<Parameter> parameters = new List<Parameter>();
                            foreach (Parameter parameter in element.Parameters)
                            {
                                parameters.Add(parameter);
                            }

                            using (Transaction trans = new Transaction(doc, "Update Parameters"))
                            {
                                if (trans.Start() == TransactionStatus.Started)
                                {
                                    foreach (Parameter parameter in parameters)
                                    {
                                        if (!parameter.IsReadOnly)
                                        {
                                            string paramName = parameter.Definition.Name;
                                            if (dictionaryempty.ContainsKey(paramName))
                                            {
                                                string parametervalue = dictionaryempty[paramName];
                                                parameter.Set(parametervalue);
                                            }
                                        }
                                    }

                                    trans.Commit();
                                }

                            }
                            // INSTANCEPARAMETERS //


                        }
                    }
                    catch(Exception ex)
                    {
                        message = ex.Message;
                        return Result.Failed;
                    }
                }
            }
            catch (JsonException ex)
            {
                TaskDialog.Show("Success", "Error deserializing JSON: " + ex.Message);
            }

            TaskDialog.Show("Success", "Parameters updated successfully.");
            return Result.Succeeded;
        }
       
    }
}



