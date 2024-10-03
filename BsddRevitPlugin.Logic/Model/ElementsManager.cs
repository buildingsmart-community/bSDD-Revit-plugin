using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.Utilities;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using static BsddRevitPlugin.Logic.Model.ElementsManagerLogic;


namespace BsddRevitPlugin.Logic.Model
{
    public static class ElementsManager
    {
        /// <summary>
        /// Transforms selected Revit types into a bSDD-compatible ifcJSON structure.
        /// </summary>
        /// <param name="doc">The active Revit document.</param>
        /// <param name="elemList">The list of selected Revit element types.</param>
        /// <returns>A IfcData object representing the ifcJSON structure.</returns>
        public static List<IfcEntity> SelectionToIfcJson(Document doc, List<ElementType> elemList)
        {
            if (doc == null || elemList == null)
            {
                throw new ArgumentNullException(doc == null ? nameof(doc) : nameof(elemList));
            }

            var ifcEntities = new List<IfcEntity>();

            foreach (ElementType elem in elemList)
            {
                if (elem == null)
                {
                    continue;
                }

                var ifcData = CreateIfcEntity(elem, doc);
                ifcEntities.Add(ifcData);
            }

            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(ifcEntities);

            return ifcEntities;
        }
        /// <summary>
        /// Set the IFC data from the bSDD UI to the correct Revit element.
        /// </summary>
        /// <param name="doc"></param>
        /// <param name="ifcEntity"></param>
        public static void SetIfcDataToRevitElement(Document doc, IfcEntity ifcEntity)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            logger.Info($"Element json {JsonConvert.SerializeObject(ifcEntity)}");


            try
            {
                // Create a classification set in which every dictionary will be collected
                HashSet<IfcClassification> dictionaryCollection = new HashSet<IfcClassification>();

                //Get the elementType
                int idInt = Convert.ToInt32(ifcEntity.Tag);
                ElementId typeId = new ElementId(idInt);
                ElementType elementType = doc.GetElement(typeId) as ElementType;
                using (Transaction tx = new Transaction(doc))
                {
                    tx.Start("SetIfcEntity");

                    //Set IfcEntity to the Elements DataStorage
                    SetIfcEntityToElementDataStorage(ifcEntity, elementType);

                    tx.Commit();
                }

                ForgeTypeId groupType = GroupTypeId.Ifc;

                List<ParameterCreation> parametersToCreate = new List<ParameterCreation>();
                Dictionary<string, object> parametersToSet = new Dictionary<string, object>();

                ParameterDataManagement parameterDataManagement = new ParameterDataManagement();
                parameterDataManagement.GetParametersToCreateAndSet(doc, ifcEntity, dictionaryCollection, out parametersToCreate, out parametersToSet);


                using (Transaction tx = new Transaction(doc))
                {
                    tx.Start("Create or edit parameters");

                    //First create all parameters at once (in Release creating parameters seperately sometimes fails)
                    List<Category> currentCategoryLst = new List<Category>() { elementType.Category };
                    Parameters.CreateProjectParameters(doc, parametersToCreate, "tempGroupName", groupType, false, currentCategoryLst);

                    tx.Commit();
                }

                using (Transaction tx = new Transaction(doc))
                {
                    tx.Start("Set parameters");

                    //Set all parameters
                    Parameters.SetElementTypeParameters(elementType, parametersToSet);

                    tx.Commit();
                }
            }
            catch (Exception e)
            {
                logger.Info($"Failed to set elementdata: {e.Message}");
                throw;
            }
        }
        /// <summary>
        /// Highlight/select the elements in Revit
        /// </summary>
        /// <param name="uidoc"></param>
        /// <param name="ifcEntity"></param>
        public static void SelectElementsWithIfcData(UIDocument uidoc, IfcEntity ifcEntity)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            logger.Info($"Element json {JsonConvert.SerializeObject(ifcEntity)}");
            Document doc = uidoc.Document;

            try
            {
                //Get the elementType
                int idInt = Convert.ToInt32(ifcEntity.Tag);
                ElementId typeId = new ElementId(idInt);
                ElementType elementType = doc.GetElement(typeId) as ElementType;

                //Get all instances of the elementtype
                FilteredElementCollector collector = new FilteredElementCollector(doc);
                var elements = collector
                    .WhereElementIsNotElementType()
                    .Where(e => e.GetTypeId() == elementType.Id)
                    .ToList();

                //Get element ids
                List<ElementId> elementIds = elements.Select(e => e.Id).ToList();


                try
                {

                    // Select the elements in the UI
                    uidoc.Selection.SetElementIds(elementIds);
                }
                catch
                {
                    Console.WriteLine("Could not select any elements");
                }


            }
            catch (Exception e)
            {
                logger.Info(e.Message);
                throw;
            }
        }
        /// <summary>
        /// Filter the current selection
        /// </summary>
        /// <param name="elemList"></param>
        /// <returns></returns>
        public static List<ElementType> ListFilter(List<ElementType> elemList)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            List<ElementType> elemListFiltered = new List<ElementType>();


            string typeId;
            List<string> idList = new List<string>();
            foreach (ElementType item in elemList)
            {
                try
                {
                    if (item != null && item.Category != null)
                    {
                        if (
                        item.Category.Name != "Levels" &&
                        item.Category.Name != "Grids" &&
                        item.Category.Name != "Location Data" &&
                        item.Category.Name != "Model Groups" &&
                        item.Category.Name != "RVT Links" &&
                        item.Category.Name != "Stacked Walls" &&
                        item.Category.Name.Substring(System.Math.Max(0, item.Category.Name.Length - 4)) != ".dwg" &&
                        item.Category.Name.Substring(System.Math.Max(0, item.Category.Name.Length - 4)) != ".pdf"
                        )
                        {
                            //dubble elementen verwijderen
                            typeId = GetTypeId(item);
                            bool chk = !idList.Any();
                            //logger.Debug("Aantal: " + idList.Count());
                            //logger.Debug("TypeId: " + typeId);
                            int count = idList.Count();
                            int number = 1;
                            foreach (string result in idList)
                            {
                                // do something with each item
                                //logger.Debug("result: " + result);
                                if (count == number)
                                {
                                    // do something different with the last item
                                    if (result != typeId)
                                    {
                                        idList.Add(typeId);
                                        elemListFiltered.Add(item);
                                        break;
                                    }
                                }
                                else
                                {
                                    // do something different with every item but the last
                                    if (result == typeId)
                                    {
                                        break;
                                    }
                                }
                                number++;
                            }
                            if (idList.Count() == 0)
                            {
                                idList.Add(typeId);
                                elemListFiltered.Add(item);
                            }
                        }
                    }
                }
                catch { }
            }

            elemListFiltered = elemListFiltered.Distinct().ToList();
            return elemListFiltered;
        }
    }
}