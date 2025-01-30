using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.BsddBridge;
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

            //SHOULD ONLY BE IF THEY ARE IN SELECTION OR ALL IN VIEW OR ALL IN DOCUMENT
            ParameterDataManagement parameterDataManagement = new ParameterDataManagement();
            //Add type for all Rooms
            var roomEntity = new IfcEntity
            {
                Name = parameterDataManagement._roomName,
                Type = "Rooms & Area's",
                Description = "Rooms & Area's",
                ObjectType = "Rooms & Area's",
                PredefinedType = "Rooms & Area's"
            };
            ifcEntities.Add(roomEntity);

            //Add type for all Area's
            var areaEntity = new IfcEntity
            {
                Name = parameterDataManagement._areaName,
                Type = "Rooms & Area's",
                Description = "Rooms & Area's",
                ObjectType = "Rooms & Area's",
                PredefinedType = "Rooms & Area's"

            };
            ifcEntities.Add(areaEntity);

            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(ifcEntities);

            return ifcEntities;
        }
        /// <summary>
        /// Set the IFC data from the bSDD UI to the correct Revit element.
        /// </summary>
        /// <param name="doc"></param>
        /// <param name="ifcEntity"></param>
        public static void SetIfcDataToRevitElement(Document doc, BsddBridgeData bsddBridgeData)
        {
            BsddSettings bsddSettings = new BsddSettings();

            Dictionary<string, bool> keyValuePairs = new Dictionary<string, bool>();
            //TODO: Let this work with full settings (and aditional project parameters)

            Logger logger = LogManager.GetCurrentClassLogger();

            List<IfcEntity> ifcEntityLst = bsddBridgeData.IfcData;

            //TODO: make sure parameters are being made instance/type according to list below
            Dictionary<string, bool> propertyIsInstanceMap = bsddBridgeData.PropertyIsInstanceMap;

            ParameterDataManagement parameterDataManagement = new ParameterDataManagement();

            foreach (var ifcEntity in ifcEntityLst)
            {
                logger.Info($"Element json {JsonConvert.SerializeObject(ifcEntity)}");

                try
                {

                    // Create a classification set in which every dictionary will be collected
                    HashSet<IfcClassification> dictionaryCollection = new HashSet<IfcClassification>();

                    ForgeTypeId groupType = GroupTypeId.Ifc;

                    List<ParameterCreation> parametersToCreate = new List<ParameterCreation>();
                    Dictionary<string, object> parametersToSet = new Dictionary<string, object>();

                    parameterDataManagement.GetParametersToCreateAndSet(doc, ifcEntity, dictionaryCollection, propertyIsInstanceMap, out parametersToCreate, out parametersToSet);

                    if (ifcEntity.Name == parameterDataManagement._areaName || ifcEntity.Name == parameterDataManagement._roomName)
                    {
                        //TODO: No SetIfcEntityToElementDataStorage for instance parameters (yet), needs UI

                        using (Transaction tx = new Transaction(doc))
                        {
                            tx.Start("Create or edit parameters");

                            //First create all parameters at once (in Release creating parameters seperately sometimes fails)
                            List<Category> currentCategoryLst = new List<Category>();
                            if (ifcEntity.Name == parameterDataManagement._areaName)
                            {
                                // add Area category
                                currentCategoryLst.Add(doc.Settings.Categories.get_Item(BuiltInCategory.OST_Areas));
                            }
                            else
                            {
                                // add Room category
                                currentCategoryLst.Add(doc.Settings.Categories.get_Item(BuiltInCategory.OST_Rooms));
                            }
                            Parameters.CreateProjectParameters(doc, parametersToCreate, "tempGroupName", groupType, currentCategoryLst);

                            tx.Commit();
                        }
                        if (parametersToCreate.Any(a => a.isInstance == true))
                        {
                            using (Transaction tx = new Transaction(doc))
                            {
                                tx.Start("Update instance parameters");

                                Parameters.SetInstanceParameterVaryBetweenGroups(doc, parametersToCreate, true);

                                tx.Commit();
                            }
                        }   
                        //TODO: No SetElementTypeParameters for instance parameters (yet), needs UI
                    }
                    else
                    {
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

                        using (Transaction tx = new Transaction(doc))
                        {
                            tx.Start("Create or edit parameters");

                            //First create all parameters at once (in Release creating parameters seperately sometimes fails)
                            List<Category> currentCategoryLst = new List<Category>() { elementType.Category };
                            Parameters.CreateProjectParameters(doc, parametersToCreate, "tempGroupName", groupType, currentCategoryLst);

                            tx.Commit();
                        }
                        if (parametersToCreate.Any(a => a.isInstance == true))
                        {
                            using (Transaction tx = new Transaction(doc))
                            {
                                tx.Start("Update instance parameters");

                                Parameters.SetInstanceParameterVaryBetweenGroups(doc, parametersToCreate, true);

                                tx.Commit();
                            }
                        }


                        using (Transaction tx = new Transaction(doc))
                        {
                            tx.Start("Set parameters");

                            //Set all parameters
                            Parameters.SetElementTypeParameters(elementType, parametersToSet);

                            tx.Commit();
                        }
                    }
                }
                catch (Exception e)
                {
                    logger.Info($"Failed to set elementdata: {e.Message}");
                    throw;
                }
            }

            propertyIsInstanceMap.Clear();
        }






        public static void SetIfcDataToRevitElement_new(Document doc, BsddBridgeData bsddBridgeData)
        {
            var bsddSettings = new BsddSettings();
            var logger = LogManager.GetCurrentClassLogger();
            var ifcEntityList = bsddBridgeData.IfcData;
            var propertyIsInstanceMap = bsddBridgeData.PropertyIsInstanceMap;
            var parameterDataManagement = new ParameterDataManagement();

            foreach (var ifcEntity in ifcEntityList)
            {
                logger.Info($"Element json {JsonConvert.SerializeObject(ifcEntity)}");

                try
                {
                    var dictionaryCollection = new HashSet<IfcClassification>();
                    var groupType = GroupTypeId.Ifc;
                    parameterDataManagement.GetParametersToCreateAndSet(doc, ifcEntity, dictionaryCollection, propertyIsInstanceMap, out var parametersToCreate, out var parametersToSet);

                    if (ifcEntity.Name == parameterDataManagement._areaName || ifcEntity.Name == parameterDataManagement._roomName)
                    {
                        HandleAreaOrRoomParameters(doc, ifcEntity, parameterDataManagement, parametersToCreate);
                    }
                    else
                    {
                        HandleElementTypeParameters(doc, ifcEntity, parametersToCreate, parametersToSet);
                    }
                }
                catch (Exception e)
                {
                    logger.Info($"Failed to set element data: {e.Message}");
                    throw;
                }
            }

            propertyIsInstanceMap.Clear();
        }

        private static void HandleAreaOrRoomParameters(Document doc, IfcEntity ifcEntity, ParameterDataManagement parameterDataManagement, List<ParameterCreation> parametersToCreate)
        {
            using (var tx = new Transaction(doc, "Create or edit parameters"))
            {
                tx.Start();
                var currentCategoryList = new List<Category>
        {
            ifcEntity.Name == parameterDataManagement._areaName
                ? doc.Settings.Categories.get_Item(BuiltInCategory.OST_Areas)
                : doc.Settings.Categories.get_Item(BuiltInCategory.OST_Rooms)
        };
                Parameters.CreateProjectParameters(doc, parametersToCreate, "tempGroupName", GroupTypeId.Ifc, currentCategoryList);
                tx.Commit();
            }

            if (parametersToCreate.Any(a => a.isInstance))
            {
                using (var tx = new Transaction(doc, "Update instance parameters"))
                {
                    tx.Start();
                    Parameters.SetInstanceParameterVaryBetweenGroups(doc, parametersToCreate, true);
                    tx.Commit();
                }
            }
        }

        private static void HandleElementTypeParameters(Document doc, IfcEntity ifcEntity, List<ParameterCreation> parametersToCreate, Dictionary<string, object> parametersToSet)
        {
            var typeId = new ElementId(Convert.ToInt32(ifcEntity.Tag));
            var elementType = doc.GetElement(typeId) as ElementType;

            using (var tx = new Transaction(doc, "Set IfcEntity"))
            {
                tx.Start();
                SetIfcEntityToElementDataStorage(ifcEntity, elementType);
                tx.Commit();
            }

            using (var tx = new Transaction(doc, "Create or edit parameters"))
            {
                tx.Start();
                var currentCategoryList = new List<Category> { elementType.Category };
                Parameters.CreateProjectParameters(doc, parametersToCreate, "tempGroupName", GroupTypeId.Ifc, currentCategoryList);
                tx.Commit();
            }

            if (parametersToCreate.Any(a => a.isInstance))
            {
                using (var tx = new Transaction(doc, "Update instance parameters"))
                {
                    tx.Start();
                    Parameters.SetInstanceParameterVaryBetweenGroups(doc, parametersToCreate, true);
                    tx.Commit();
                }
            }

            using (var tx = new Transaction(doc, "Set parameters"))
            {
                tx.Start();
                Parameters.SetElementTypeParameters(elementType, parametersToSet);
                tx.Commit();
            }
        }

























        /// <summary>
        /// Highlight/select the elements in Revit
        /// </summary>
        /// <param name="uidoc"></param>
        /// <param name="ifcEntityLst"></param>
        public static void SelectElementsWithIfcData(UIDocument uidoc, List<IfcEntity> ifcEntityLst)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            logger.Info($"Element json {JsonConvert.SerializeObject(ifcEntityLst)}");
            Document doc = uidoc.Document;

            try
            {

                List<ElementId> allElementIds = new List<ElementId>();
                foreach (IfcEntity ifcEntity in ifcEntityLst)
                {

                    ParameterDataManagement parameterDataManagement = new ParameterDataManagement();
                    if (ifcEntity.Name == parameterDataManagement._areaName)
                    {
                        // Select all areas
                        FilteredElementCollector collector = new FilteredElementCollector(doc);
                        var areas = collector.OfCategory(BuiltInCategory.OST_Areas).WhereElementIsNotElementType().ToList();
                        allElementIds.AddRange(areas.Select(a => a.Id));
                    }
                    else if (ifcEntity.Name == parameterDataManagement._roomName)
                    {
                        // Select all rooms
                        FilteredElementCollector collector = new FilteredElementCollector(doc);
                        var rooms = collector.OfCategory(BuiltInCategory.OST_Rooms).WhereElementIsNotElementType().ToList();
                        allElementIds.AddRange(rooms.Select(r => r.Id));
                    }
                    else
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

                        allElementIds.AddRange(elementIds);
                    }

                }



                try
                {

                    // Select the elements in the UI
                    uidoc.Selection.SetElementIds(allElementIds);
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