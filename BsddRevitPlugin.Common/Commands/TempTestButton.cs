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
using NLog.Fluent;

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
            var count = bindingMap.Size;
            int i= 0;
            DefinitionBindingMapIterator it = bindingMap.ForwardIterator();

            // Get the first Floor element
            Element elem = new FilteredElementCollector(doc).OfCategory(BuiltInCategory.OST_Floors).FirstElement();

            Parameter parameter = null;

           
            foreach (var p in doc.ParameterBindings)
            {

                if (p is InstanceBinding instanceBinding)
                {
                   
                }
                else if (p is TypeBinding typeBinding)
                {
                    
                }
            }
            if (false)
            {
                try
                {
                    foreach (var p in bindingMap)
                    {


                        it.MoveNext();
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
                                else if (oldBinding is TypeBinding typeBinding)
                                {
                                    CategorySet oldCategories = typeBinding.Categories;
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
                                    TypeBinding newBinding = doc.Application.Create.NewTypeBinding(newCategories);

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
                }
                catch (Exception e)
                {

                    logger.Error(e);
                }
            }
            

            // Get the Parameter from the Element
            Parameter param = elem.LookupParameter("testinstancebinding");

            // Get the Definition from the Parameter
            //Definition def2 = param.Definition;

            // Get the Binding from the BindingMap
            //Binding binding = bindingMap.get_Item(def2);



            if (true)
            {

                try
                {

                    bool continue2 = true;

                    while (it.MoveNext() || continue2)
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
                                    break;
                                }
                                else if (oldBinding is TypeBinding typeBinding)
                                {
                                    CategorySet oldCategories = typeBinding.Categories;
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
                                    TypeBinding newBinding = doc.Application.Create.NewTypeBinding(newCategories);

                                    // Replace the old binding with the new one
                                    using (Transaction t = new Transaction(doc, "Modify Binding"))
                                    {
                                        t.Start();
                                        bindingMap.ReInsert(def, newBinding, def.GetGroupTypeId());
                                        t.Commit();
                                    }
                                    break;
                                }

                            }
                        }
                    }
                }
                catch (Exception e)
                {

                    logger.Error(e);
                }
            }


            //foreach (var item in doc.ParameterBindings)
            //{

            //    switch (item)
            //    {
            //        case InstanceBinding instanceBinding:
            //            logger.Info($"InstanceBinding {instanceBinding}");
            //            break;
            //        case TypeBinding typeBinding:
            //            logger.Info($"TypeBinding {typeBinding}");
            //            break;
            //    }
            //    logger.Info($"log {item}");
            //}

            
            return Result.Succeeded;
        }
    }
}
