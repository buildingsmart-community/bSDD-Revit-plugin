﻿using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Mechanical;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BsddRevitPlugin.Logic.Utilities
{
    public class ParameterCreation
    {
        public string parameterName { get; set; }
        public ForgeTypeId specType { get; set; }

        public ParameterCreation(string parameterName, ForgeTypeId specType)
        {
            this.parameterName = parameterName;
            this.specType = specType;
        }
    }
    public static class Parameters
    {
       
        #region Shared Parameters

        /// <summary>
        /// Gets the path to the shared parameter file of this document
        /// </summary>
        /// <returns></returns>
        public static string SharedParameterFile(Document doc)
        {
            Document document = doc;
            return document.Application.SharedParametersFilename;
        }

        /// <summary>
        /// Create a new Shared Parameter in the current Revit document for all applicable categories
        /// </summary>
        /// <param name="parameterName">Name</param>
        /// <param name="groupName">Group of the parameter for shared parameters</param>
        /// <param name="specType">The type of new parameter.</param>
        /// <param name="groupType">The type of the group to which the parameter belongs.</param>
        /// <param name="instance">True if it's an instance parameter, otherwise it's a type parameter</param>
        public static void CreateSharedParameterForAllCategories(Document doc, string parameterName, string groupName, ForgeTypeId specType, ForgeTypeId groupType, bool instance)
        {
            CreateSharedParameter(doc,parameterName, groupName, specType, groupType, instance, null);
        }

        /// <summary>
        /// Create a new Shared Parameter in the current Revit document
        /// </summary>
        /// <param name="parameterName">Name</param>
        /// <param name="groupName">Group of the parameter for shared parameters</param>
        /// <param name="specType">The type of new parameter.</param>
        /// <param name="groupType">The type of the group to which the parameter belongs.</param>
        /// <param name="instance">True if it's an instance parameter, otherwise it's a type parameter</param>
        /// <param name="categoryList">A list of categories this parameter applies to. If no category is supplied, all possible categories are selected</param>
        public static void CreateSharedParameter(Document doc, string parameterName, string groupName, ForgeTypeId specType, ForgeTypeId groupType, bool instance, System.Collections.Generic.IEnumerable<Category> categoryList)
        {
            // get document and open transaction
            Document document = doc;

            try
            {
                // get current shared parameter file
                string sharedParameterFile = document.Application.SharedParametersFilename;

                // if the file does not exist, throw an error
                if (sharedParameterFile == null || !System.IO.File.Exists(sharedParameterFile))
                    throw new System.Exception();

                // Apply selected parameter categories
                CategorySet categories = (categoryList == null) ? AllCategories(doc) : ToCategorySet(doc,categoryList);

                // Create new parameter group if it does not exist yet
                DefinitionGroup groupDef =
                    document.Application.OpenSharedParameterFile()
                    .Groups.get_Item(groupName);

                if (groupDef == null)
                {
                    groupDef =
                        document.Application.OpenSharedParameterFile()
                        .Groups.Create(groupName);
                }

                // If the parameter definition does not exist yet, create it
                if (groupDef.Definitions.get_Item(parameterName) == null)
                {
                    ExternalDefinition def =
                        groupDef.Definitions.Create
                        (new ExternalDefinitionCreationOptions(parameterName, specType)) as ExternalDefinition;

                    // Apply instance or type binding
                    Binding bin = (instance) ?
                        (Binding)document.Application.Create.NewInstanceBinding(categories) :
                        (Binding)document.Application.Create.NewTypeBinding(categories);

                    document.ParameterBindings.Insert(def, bin, groupType);
                }

            }
            catch (System.Exception e)
            {
                throw e;
            }

        }

        #endregion
        #region Project Parameters

        /// <summary>
        /// Create a new Project Parameter in this current Revit document for all applicable categories
        /// </summary>
        /// <param name="parameterName">Name</param>
        /// <param name="groupName">Group of the parameter for shared parameters</param>
        /// <param name="specType">The type of new parameter.</param>
        /// <param name="groupType">The type of the group to which the parameter belongs.</param>
        /// <param name="instance">True if it's an instance parameter, otherwise it's a type parameter</param>
        public static void CreateProjectParameterForAllCategories(Document doc, string parameterName, string groupName, ForgeTypeId specType, ForgeTypeId groupType, bool instance)
        {
            CreateProjectParameter(doc, parameterName, groupName, specType, groupType, instance, null);
        }

        /// <summary>
        /// Create a new Project Parameter in this current Revit document
        /// </summary>
        /// <param name="parameterName">Name</param>
        /// <param name="groupName">Group of the parameter for shared parameters</param>
        /// <param name="specType">The type of new parameter.</param>
        /// <param name="groupType">The type of the group to which the parameter belongs.</param>
        /// <param name="instance">True if it's an instance parameter, otherwise it's a type parameter</param>
        /// <param name="categoryList">A list of categories this parameter applies to. If no category is supplied, all possible categories are selected</param>
        public static void CreateProjectParameter(Document doc, string parameterName, string groupName, ForgeTypeId specType, ForgeTypeId groupType, bool instance, System.Collections.Generic.IEnumerable<Category> categoryList)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            // get document and open transaction
            Document document = doc;
            //TransactionManager.Instance.EnsureInTransaction(document);

            try
            {
                // buffer the current shared parameter file name and apply a new empty parameter file instead
                string sharedParameterFile = document.Application.SharedParametersFilename;
                string tempSharedParameterFile = System.IO.Path.GetTempFileName() + ".txt";
                using (System.IO.File.Create(tempSharedParameterFile)) { }
                document.Application.SharedParametersFilename = tempSharedParameterFile;

                // Apply selected parameter categories
                CategorySet categories = (categoryList == null) ? AllCategories(document) : ToCategorySet(document, categoryList);

                //// create a new shared parameter, since the file is empty everything has to be created from scratch
                //document.Application.OpenSharedParameterFile()
                //    .Groups.Create(groupName).Definitions.Create(
                //    new ExternalDefinitionCreationOptions(parameterName, specType));

                //// Create an instance or type binding
                //Binding bin = (instance) ?
                //    (Binding)document.Application.Create.NewInstanceBinding(categories) :
                //    (Binding)document.Application.Create.NewTypeBinding(categories);

                //// Apply parameter bindings
                //var def = document.Application.OpenSharedParameterFile()
                //    .Groups.get_Item(groupName).Definitions.get_Item(parameterName);
                //document.ParameterBindings.Insert(def, bin, groupType);




                //-----------------------------------

                // Create new parameter group if it does not exist yet
                DefinitionGroup groupDef =
                    document.Application.OpenSharedParameterFile()
                    .Groups.get_Item(groupName);

                if (groupDef == null)
                {
                    groupDef =
                        document.Application.OpenSharedParameterFile()
                        .Groups.Create(groupName);
                }

                // If the parameter definition does not exist yet, create it
                if (groupDef.Definitions.get_Item(parameterName) == null)
                {
                    ExternalDefinitionCreationOptions externalDefinitionCreationOptions = new ExternalDefinitionCreationOptions(parameterName, specType);

                    externalDefinitionCreationOptions.GUID = BsddRevitPlugin.Logic.Utilities.UuidFromUri.CreateUuidFromUri(parameterName);
                    logger.Info($"Parameter = {parameterName}, GUID = {externalDefinitionCreationOptions.GUID.ToString()}");

                    ExternalDefinition def =
                        groupDef.Definitions.Create
                        (externalDefinitionCreationOptions) as ExternalDefinition;

                    // Apply instance or type binding
                    Binding bin = (instance) ?
                        (Binding)document.Application.Create.NewInstanceBinding(categories) :
                        (Binding)document.Application.Create.NewTypeBinding(categories);

                    document.ParameterBindings.Insert(def, bin, groupType);
                }

                //-----------------------------------

                // apply old shared parameter file
                document.Application.SharedParametersFilename = sharedParameterFile;

                // delete temp shared parameter file
                System.IO.File.Delete(tempSharedParameterFile);

                document.Application.SharedParametersFilename = sharedParameterFile;

            }
            catch (System.Exception e)
            {
                //TransactionManager.Instance.ForceCloseTransaction();
                logger.Info($"Failed to create parameter '{parameterName}' groupname: '{groupName}' spectype: '{specType.GetType().ToString()}' grouptype: '{groupType.GetType().ToString()}': {e.Message}");
            }

            //TransactionManager.Instance.TransactionTaskDone();
        }
        /// <summary>
        /// Create a new Project Parameter in this current Revit document for all applicable categories
        /// </summary>
        /// <param name="parameterName">Name</param>
        /// <param name="groupName">Group of the parameter for shared parameters</param>
        /// <param name="specType">The type of new parameter.</param>
        /// <param name="groupType">The type of the group to which the parameter belongs.</param>
        /// <param name="instance">True if it's an instance parameter, otherwise it's a type parameter</param>
        public static void CreateProjectParametersForAllCategories(Document doc, List<ParameterCreation> parametersToCreate, string groupName, ForgeTypeId groupType, bool instance)
        {
            CreateProjectParameters(doc, parametersToCreate, groupName, groupType, instance, null);
        }
        /// <summary>
        /// Create a new Project Parameters in this current Revit document
        /// </summary>
        /// <param name="parameterName">Name</param>
        /// <param name="groupName">Group of the parameter for shared parameters</param>
        /// <param name="specType">The type of new parameter.</param>
        /// <param name="groupType">The type of the group to which the parameter belongs.</param>
        /// <param name="instance">True if it's an instance parameter, otherwise it's a type parameter</param>
        /// <param name="categoryList">A list of categories this parameter applies to. If no category is supplied, all possible categories are selected</param>
        public static void CreateProjectParameters(Document doc, List<ParameterCreation> parametersToCreate, string groupName, ForgeTypeId groupType, bool instance, System.Collections.Generic.IEnumerable<Category> categoryList)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            // get document and open transaction
            Document document = doc;
            //TransactionManager.Instance.EnsureInTransaction(document);

            try
            {
                // buffer the current shared parameter file name and apply a new empty parameter file instead
                string sharedParameterFile = document.Application.SharedParametersFilename;
                string tempSharedParameterFile = System.IO.Path.GetTempFileName() + ".txt";
                using (System.IO.File.Create(tempSharedParameterFile)) { }
                document.Application.SharedParametersFilename = tempSharedParameterFile;

                // Apply selected parameter categories
                CategorySet categories = (categoryList == null) ? AllCategories(document) : ToCategorySet(document, categoryList);

                //// create a new shared parameter, since the file is empty everything has to be created from scratch
                //document.Application.OpenSharedParameterFile()
                //    .Groups.Create(groupName).Definitions.Create(
                //    new ExternalDefinitionCreationOptions(parameterName, specType));

                //// Create an instance or type binding
                //Binding bin = (instance) ?
                //    (Binding)document.Application.Create.NewInstanceBinding(categories) :
                //    (Binding)document.Application.Create.NewTypeBinding(categories);

                //// Apply parameter bindings
                //var def = document.Application.OpenSharedParameterFile()
                //    .Groups.get_Item(groupName).Definitions.get_Item(parameterName);
                //document.ParameterBindings.Insert(def, bin, groupType);




                //-----------------------------------

                // Create new parameter group if it does not exist yet
                DefinitionGroup groupDef =
                    document.Application.OpenSharedParameterFile()
                    .Groups.get_Item(groupName);

                if (groupDef == null)
                {
                    groupDef =
                        document.Application.OpenSharedParameterFile()
                        .Groups.Create(groupName);
                }

                foreach (var parameter in parametersToCreate)
                {
                    string parameterName = parameter.parameterName;
                    ForgeTypeId specType = parameter.specType;

                    // If the parameter definition does not exist yet, create it
                    if (groupDef.Definitions.get_Item(parameterName) == null)
                    {
                        try
                        {
                            ExternalDefinitionCreationOptions externalDefinitionCreationOptions = new ExternalDefinitionCreationOptions(parameterName, specType);

                            externalDefinitionCreationOptions.GUID = BsddRevitPlugin.Logic.Utilities.UuidFromUri.CreateUuidFromUri(parameterName);
                            logger.Info($"Parameter = {parameterName}, GUID = {externalDefinitionCreationOptions.GUID.ToString()}");

                            ExternalDefinition def =
                                groupDef.Definitions.Create
                                (externalDefinitionCreationOptions) as ExternalDefinition;

                            // Apply instance or type binding
                            Binding bin = (instance) ?
                                (Binding)document.Application.Create.NewInstanceBinding(categories) :
                                (Binding)document.Application.Create.NewTypeBinding(categories);

                            document.ParameterBindings.Insert(def, bin, groupType);

                        }
                        catch (Exception e)
                        {
                            logger.Info($"Failed to create parameter '{parameterName}' groupname: '{groupName}' spectype: '{specType.GetType().ToString()}' grouptype: '{groupType.GetType().ToString()}': {e.Message}");

                            
                        }
                    }
                }
              

                //-----------------------------------

                // apply old shared parameter file
                document.Application.SharedParametersFilename = sharedParameterFile;

                // delete temp shared parameter file
                System.IO.File.Delete(tempSharedParameterFile);

                document.Application.SharedParametersFilename = sharedParameterFile;

            }
            catch (System.Exception e)
            {
                //TransactionManager.Instance.ForceCloseTransaction();
                logger.Info($"Failed to create parameters: {e.Message}");
            }

            //TransactionManager.Instance.TransactionTaskDone();
        }


        #endregion

        /// <summary>
        /// Get a CategorySet for all categories
        /// </summary>
        /// <returns></returns>
        internal static CategorySet AllCategories(Document doc)
        {
            Document document = doc;

            // Apply selected parameter categories
            CategorySet categories = document.Application.Create.NewCategorySet();


            // Walk thru all categories and add them if they allow bound parameters
            foreach (Autodesk.Revit.DB.Category cat in document.Settings.Categories)
            {
                if (cat.AllowsBoundParameters)
                {
                    categories.Insert(cat);
                }
            }


            return categories;
        }

        /// <summary>
        /// Convert a list of categories to a category set
        /// </summary>
        /// <param name="categoryList"></param>
        /// <returns></returns>
        internal static CategorySet ToCategorySet(Document doc, System.Collections.Generic.IEnumerable<Category> categoryList)
        {
            Document document = doc;

            // Apply selected parameter categories
            CategorySet categories = document.Application.Create.NewCategorySet();


            foreach (Category category in categoryList)
            {
                categories.Insert(category);
            }


            return categories;
        }



    }
}
