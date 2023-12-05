
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.Classifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BsddRevitPlugin.Logic.Classifications
{
    public class Classifier
    {
        public class bSDD_Classification 
        {
            public bSDD_Classification(string[] keys, string value, string classificationFieldName)
            {
                this.ClassificationName = keys[1];
                this.Value = value;
                this.ClassificationFieldName = classificationFieldName;
            }
            public string ClassificationName { get; set; }
            public string Value { get; set; }
            public string ClassificationFieldName { get; set; }
        }

        public static void ClassifyElement(Document doc, bSDD_Classification classification, Parameter parameter)
        {
            using (Transaction t = new Transaction(doc, "stringParameter"))
            {
                try
                {
                    t.Start();


                    Regex rx = new Regex(@"\((.*?)\)");

                    var NLSFB = rx.Match(classification.Value).Groups[1].Value;
                    parameter.Set(NLSFB);
                    t.Commit();
                }
                catch (Exception err)
                {
                    TaskDialog.Show("Error", err.Message);
                    t.RollBack();
                }
            }
        }

        public static void ClassifyIfcEntity(Document doc, bSDD_Classification classification, Parameter parameter)
        {

            using (Transaction t = new Transaction(doc, "Classify IFC Entity"))
            {
                try
                {
                    if (parameter != null)
                    {
                        t.Start();
                        parameter.Set(classification.Value);
                        t.Commit();
                    }
                }
                catch (Exception err)
                {
                    TaskDialog.Show("Error", err.Message);
                    t.RollBack();
                }
            }

        }
    }
}
