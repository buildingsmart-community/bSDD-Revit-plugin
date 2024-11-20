//TODO comments

#region ================== References ===================
using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.IFC;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.Logic.UI.Services;
using BsddRevitPlugin.Logic.UI.View;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Interop;
using static BsddRevitPlugin.Logic.Model.ElementsManager;
using Document = Autodesk.Revit.DB.Document;
#endregion

#region ============ Namespace Declaration ============
/// <summary>
/// Represents an abstract base class for handling Revit selection events.
/// </summary>
namespace BsddRevitPlugin.Logic.UI.Wrappers
{
    public class UpdateUIonSave : RevitEventWrapper<BsddSettings>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        private IBrowserService browser;

        public override void Execute(UIApplication uiapp, BsddSettings bsddSettings)
        {
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;

            //UpdateSettings(bsddSettings);
            SettingsManager.SaveSettingsToGlobalParametersAndDataStorage(doc,bsddSettings);
            UpdateBsddLastSelection();


        }

        public void SetBrowser(IBrowserService browserObject)
        {
            browser = browserObject;
        }

        public void UpdateBsddLastSelection()
        {
            List<ElementId> lastSelection = new List<ElementId>();
            List<Element> ListlastSelection = new List<Element>();
            try
            {
                ListlastSelection = GlobalSelection.LastSelectedElementsWithDocs[GlobalDocument.currentDocument.PathName];
                foreach(Element element in ListlastSelection)
                {
                    lastSelection.Add(element.Id);
                }
            }
            catch (Exception)
            {

            }
            var jsonString = JsonConvert.SerializeObject(SelectElements.SelectionToIfcJson(GlobalDocument.currentDocument, lastSelection));
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (browser.IsBrowserInitialized)
            {
                browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }

    }
    public abstract class EventRevitSelection : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        protected Select Selectorlist = new Select();
        private IBrowserService browser;

        public override void Execute(UIApplication uiapp, string args)
        {
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;

            if (!(this is EventUseLastSelection))
            {
                var elemList = GetSelection(uiapp);
                                
                if (GlobalSelection.LastSelectedElementsWithDocs.ContainsKey(doc.PathName))
                {
                    //if contains, always make sure the value is the updated list
                    GlobalSelection.LastSelectedElementsWithDocs[doc.PathName] = new List<Element>();
                    GlobalSelection.LastSelectedElementsWithDocs[doc.PathName].Clear();
                    GlobalSelection.LastSelectedElementsWithDocs[doc.PathName].AddRange(elemList);
                }
                else
                {
                    //if first time, add to dictionary
                    //List<Element> elemtypes = new List<Element>();
                    //elemtypes.AddRange(elemList);
                    GlobalSelection.LastSelectedElementsWithDocs.Add(doc.PathName, elemList);

                }
            }

            // Pack data into json format
            List<ElementId> elemSet = new List<ElementId>();
            foreach(Element elem in GlobalSelection.LastSelectedElementsWithDocs[doc.PathName])
            {
                elemSet.Add(elem.Id);
            }
            List<IfcEntity> selectionData = SelectElements.SelectionToIfcJson(doc, elemSet);
            
            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);
        }

        protected abstract List<Element> GetSelection(UIApplication uiapp);

        public void SetBrowser(IBrowserService browserObject)
        {
            browser = browserObject;
        }

        public void UpdateBsddSelection(List<IfcEntity> ifcData)
        {
            
            var jsonString = JsonConvert.SerializeObject(ifcData);
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (browser.IsBrowserInitialized)
            {
                browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }
    }

    /// <summary>
    /// Selection event for manualy selecting elements in Revit.
    /// </summary>
    public class EventMakeSelection : EventRevitSelection
    {
        protected override List<Element> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.SelectElements(uiapp);
        }
    }

    /// <summary>
    /// Selection event for selecting all elements in Revit.
    /// </summary>
    public class EventSelectAll : EventRevitSelection
    {
        protected override List<Element> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.AllElements(uiapp);
        }
    }

    /// <summary>
    /// Selection event for selecting all elements in the current Revit view.
    /// </summary>
    public class EventSelectView : EventRevitSelection
    {
        protected override List<Element> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.AllElementsView(uiapp);
        }
    }

    public class EventUseLastSelection : EventRevitSelection
    {
        protected override List<Element> GetSelection(UIApplication uiapp)
        {
            // Use the last selected elements
            return GlobalSelection.LastSelectedElementsWithDocs[GlobalDocument.currentDocument.PathName];
        }
    }


    /// <summary>
    /// Represents a class that triggers the writing of IFC data into a Revit type object.
    /// </summary>
    public class UpdateElementtypeWithIfcData : RevitEventWrapper<IfcEntity>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        IfcEntity ifcData;

        public override void Execute(UIApplication uiapp, IfcEntity ifcDataObject)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            SetIfcDataToRevitElement(doc, ifcDataObject);
        }

    }

    /// <summary>
    /// Represents a class that triggers the writing of IFC data into a Revit type object.
    /// </summary>
    public class SelectElementsWithIfcData : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        IfcEntity ifcData;

        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            SelectElements.SelectElementsWithIfcData(uidoc, ifcData);
        }
        public void SetIfcData(IfcEntity ifcDataObject)
        {
            ifcData = ifcDataObject;
        }
    }

    /// <summary>
    /// Represents a class that triggers the writing of settings into the BsddSettings object and the DataStorage.
    /// </summary>
    public class UpdateSettings : RevitEventWrapper<BsddSettings>
    {
        Logger logger = LogManager.GetCurrentClassLogger();


        public override void Execute(UIApplication uiapp, BsddSettings settingsObject)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;
            SettingsManager.SaveSettingsToGlobalVariable(settingsObject);
            SettingsManager.SaveSettingsToDataStorage(doc, settingsObject);
        }

    }

    /// <summary>
    /// Represents an event handler for the BsddSearch event that is fired from the BsddSelection window.
    /// </summary>
    public class EventHandlerBsddSearch : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        // ModelessForm instance
        private Window wnd;
        private BsddSearch _bsddSearch;
        private BsddBridgeData _bsddBridgeData;
        private ExternalEvent _bsddLastSelectionEvent;

        public EventHandlerBsddSearch(ExternalEvent bsddLastSelectionEvent)
        {
            _bsddLastSelectionEvent = bsddLastSelectionEvent;
        }

        public override void Execute(UIApplication uiapp, string args)
        {
            _bsddSearch = new BsddSearch(_bsddBridgeData, _bsddLastSelectionEvent);

            HwndSource hwndSource = HwndSource.FromHwnd(uiapp.MainWindowHandle);
            wnd = hwndSource.RootVisual as Window;
            if (wnd != null)
            {
                _bsddSearch.Owner = wnd;
                //bsddSearch.ShowInTaskbar = false;
                _bsddSearch.Show();

            }
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;
            var name = doc.Title;
            var path = doc.PathName;
        }

        public void setBsddBridgeData(BsddBridgeData bsddBridgeData)
        {
            _bsddBridgeData = bsddBridgeData;
        }

    }

    
    public class SelectElements
    {
        /// <summary>
        /// Select ElementType and its Element instances or in case of instance keep only instance selected
        /// </summary>
        /// <param name="uidoc">User Interface document</param>
        /// <param name="ifcEntity">Given element</param>
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
                Element element = doc.GetElement(typeId);

                //Get all instances of the elementtype
                FilteredElementCollector collector = new FilteredElementCollector(doc);
                List<Element> elements = new List<Element>();
                if (elementType != null)
                {
                    elements = collector
                    .WhereElementIsNotElementType()
                    .Where(e => e.GetTypeId() == elementType.Id)
                    .ToList();
                }
                else
                {
                    elements.Add(doc.GetElement(typeId));
                }

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

        /// Transforms selected Revit types into a bSDD-compatible ifcJSON structure.
        /// </summary>
        /// <param name="doc">The active Revit document.</param>
        /// <param name="elemList">The list of selected Revit element types.</param>
        /// <returns>A IfcData object representing the ifcJSON structure.</returns>
        ///
        public static List<IfcEntity> SelectionToIfcJson(Document doc, List<ElementId> elemSet)
        {
            if (doc == null || elemSet == null)
            {
                throw new ArgumentNullException(doc == null ? nameof(doc) : nameof(elemSet));
            }

            var ifcEntities = new List<IfcEntity>();
            List<ElementId> elemSetType = new List<ElementId>();
            Element type;
            ElementId typeId;
            foreach (ElementId id in elemSet)
            {
                type = doc.GetElement(id);
                typeId = type.GetTypeId();

                if (elemSetType == null || elemSetType.Contains(typeId) == false)
                {
                    elemSetType.Add(typeId);
                }
            }
            //elemSet.AddRange(elemSetType);
            //Check or is Geometrie
            elemSet = ListGeoFilter(doc, elemSet);
            elemSetType = ListGeoFilter(doc, elemSetType);

            List<ElementId> listItem = new List<ElementId>();
            if (elemSet != null)
            {
                foreach (ElementId id in elemSet)
                {
                    listItem.Add(id);
                    var ifcData = CreateIfcEntity(listItem, doc);
                    ifcEntities.Add(ifcData);
                    listItem.Clear();
                }
            }

            if (elemSetType != null)
            {
                foreach (ElementId idType in elemSetType)
                {
                    listItem.Add(idType);
                    var ifcData = CreateIfcEntity(listItem, doc);
                    ifcEntities.Add(ifcData);
                    listItem.Clear();
                }
            }


            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(ifcEntities);

            return ifcEntities;
        }

        /// <summary>
        /// Transforms a Revit element instance into an IFC entity.
        /// </summary>
        /// <param name="elem">Element instance</param>
        /// <param name="doc">Currently open document</param>
        /// <returns>Fully filled IfcEntity</returns>
        private static IfcEntity CreateIfcEntity(List<ElementId> elemSet, Document doc)
        {
            Element element = null;
            ElementType elementType = null;
            try
            {
                foreach (ElementId id in elemSet)
                {
                    if (doc.GetElement(id) is ElementType)
                    {
                        elementType = doc.GetElement(id) as ElementType;
                        break; // Exit the loop after the first element (there is only 1 element)
                    }
                    else if (doc.GetElement(id) is Element)
                    {
                        element = doc.GetElement(id);
                        break; // Exit the loop after the first element (there is only 1 element)
                    }
                }
            }
            catch { }


            if (element != null)
            {
                ElementId elemTypeId = element.GetTypeId();
                ElementType elemType = doc.GetElement(elemTypeId) as ElementType;

                //Collect input for IfcEntity defenition
                string familyName = GetParameterValueByElement(elemType ?? element, "IfcName") ?? element.Name ?? "n/a";
                string typeName = GetParameterValueByElement(elemType ?? element, "IfcType") ?? element.Name ?? "n/a";
                string ifcTag = element.Id.ToString();
                string typeDescription = GetParameterValueByElement(elemType ?? element, "Description") ?? "n/a";
                string ifcType = IFCMappingValue(doc, element);
                string ifcPredefinedType = element.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE)?.AsString();
                //string materials = GetElementMaterials(elem, doc);
                var associations = GetElementAssociations(elemSet, doc);

                //Create IfcEntity by IfcEntityBuilder
                IfcEntity ifcEntity = new IfcEntityBuilder()
                    .AddInstance(true)
                    .AddType(ifcType)
                    .AddName($"I: {typeName} - {familyName}")
                    //.AddMaterial()
                    .AddTag(ifcTag)
                    .AddDescription(string.IsNullOrWhiteSpace(typeDescription) ? null : typeDescription)
                    .AddPredefinedType(ifcPredefinedType)
                    .AddIsDefinedBy(IfcDefinition(doc, element))
                    .AddHasAssociations(associations)
                    .Build();

                return ifcEntity;
            }
            else if (elementType != null)
            {
                //Collect input for IfcEntity defenition
                string familyName = GetParameterValueByElement(elementType, "IfcName") ?? elementType.Name ?? "n/a";
                string typeName = GetParameterValueByElement(elementType, "IfcType") ?? elementType.Name ?? "n/a";
                string ifcTag = elementType.Id.ToString();
                string typeDescription = GetParameterValueByElement(elementType, "Description") ?? "n/a";
                string ifcType = IFCMappingValue(doc, elementType);
                string ifcPredefinedType = elementType.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE)?.AsString();
                //string materials = GetElementMaterials(elem, doc);
                var associations = GetElementTypeAssociations(elemSet, doc, out Dictionary<Uri, IfcClassificationReference> a);

                //Create IfcEntity by IfcEntityBuilder
                IfcEntity ifcEntity = new IfcEntityBuilder()
                    .AddInstance(false)
                    .AddType(ifcType)
                    .AddName($"T: {typeName} - {familyName}")
                    //.AddMaterial()
                    .AddTag(ifcTag)
                    .AddDescription(string.IsNullOrWhiteSpace(typeDescription) ? null : typeDescription)
                    .AddPredefinedType(ifcPredefinedType)
                    .AddIsDefinedBy(IfcDefinition(doc, elementType))
                    .AddHasAssociations(associations)
                    .Build();

                return ifcEntity;
            }

            return null;
        }

        /// <summary>
        /// Retrieves the IfcDefinition filled with the parameters who starts with bsdd/prop/ of the given element type.
        /// </summary>
        /// <param name="elementType">The element type.</param>
        /// <returns>The IfcDefinition with the bsdd parameters</returns>
        public static List<IfcPropertySet> IfcDefinition(Document doc, Element elem)
        {
            Dictionary<IfcPropertySet, Dictionary<IfcPropertySingleValue, IfcValue>> ifcProps = new Dictionary<IfcPropertySet, Dictionary<IfcPropertySingleValue, IfcValue>>();
            List<IfcPropertySet> isDefinedBy = new List<IfcPropertySet>();
            IfcPropertySet ifcPropSet = new IfcPropertySet();
            List<IfcProperty> hasProperties = new List<IfcProperty>();
            IfcPropertySingleValue ifcPropValue = new IfcPropertySingleValue();
            IfcValue nominalValue = new IfcValue();
            string[] promptArr = null;
            List<string> pSetDone = new List<string>();

            foreach (Parameter parameter in elem.Parameters)
            {
                if (parameter.Definition.Name.StartsWith("bsdd/prop/", false, null) == true)
                {
                    if (parameter.HasValue == true)
                    {
                        //Remove bsdd/prop/ from property name and split property name in property [1] value and propertyset [0]
                        promptArr = parameter.Definition.Name.Remove(0, 10).Split('/');

                        if (!pSetDone.Contains(promptArr[0]))
                        {
                            hasProperties = new List<IfcProperty>();
                            foreach (Parameter paramPSet in elem.Parameters)
                            {
                                if (paramPSet.Definition.Name.StartsWith("bsdd/prop/" + promptArr[0], false, null) == true)
                                {
                                    if (paramPSet.HasValue == true)
                                    {
                                        if (paramPSet.Definition.GetDataType() != SpecTypeId.Reference.Material)
                                        {
                                            //Define nominalvalue Type and Value
                                            nominalValue = new IfcValue();
                                            ForgeTypeId paramTypeId = paramPSet.Definition.GetDataType();

                                            switch (paramTypeId)
                                            {
                                                case var _ when paramTypeId == SpecTypeId.Boolean.YesNo:
                                                    nominalValue.Type = "IfcBoolean"; //BOOLEAN
                                                    nominalValue.Value = paramPSet.AsInteger(); //0 or 1
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Int.Integer:
                                                    nominalValue.Type = "IfcInteger"; //INTEGER
                                                    nominalValue.Value = paramPSet.AsInteger();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Int.NumberOfPoles:
                                                    nominalValue.Type = "IfcCountMeasure"; //NUMBER
                                                    nominalValue.Value = paramPSet.AsInteger();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.String.Url:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.String.Text:
                                                    nominalValue.Type = "IfcText"; //STRING
                                                    nominalValue.Value = paramPSet.AsString();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.String.MultilineText:
                                                    nominalValue.Type = "IfcText"; //STRING
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Reference.Material:
                                                    nominalValue.Type = "IfcMaterial"; //??
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Reference.LoadClassification:
                                                    nominalValue.Type = "IfcElectricCurrentMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Reference.Image:
                                                    nominalValue.Type = "Ifc";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.Reference.FillPattern:
                                                    nominalValue.Type = "IfcInteger";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/

                                                case var _ when paramTypeId == SpecTypeId.Acceleration:
                                                    nominalValue.Type = "IfcAccelerationMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.AirFlow:
                                                    nominalValue.Type = "IfcVolumetricFlowRateMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.AirFlowDensity:
                                                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.AirFlowDividedByCoolingLoad:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.AirFlowDividedByVolume:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Angle:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.AngularSpeed:
                                                    nominalValue.Type = "IfcAngularVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ApparentPower:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ApparentPowerDensity:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Area:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.AreaDividedByCoolingLoad:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.AreaDividedByHeatingLoad:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.AreaForce:
                                                    nominalValue.Type = "IfcPlanarForceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.AreaForceScale:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.AreaSpringCoefficient:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.BarDiameter:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.CableTraySize:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                m*m not existing in ifc? */
                                                /*case var _ when paramTypeId == SpecTypeId.ColorTemperature:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.ConduitSize:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.CoolingLoad:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.CoolingLoadDividedByArea:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.CoolingLoadDividedByVolume:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.CostPerArea:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.CostRateEnergy:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.CostRatePower:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.CrackWidth:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.CrossSection:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.Currency:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Current:
                                                    nominalValue.Type = "IfcElectricCurrentMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Custom:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.DecimalSheetLength:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.DemandFactor:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Diffusivity:
                                                    nominalValue.Type = "IfcMoistureDiffusivityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                //m2 / s but not IfcKinematicViscosityMeasure was not found
                                                /*case var _ when paramTypeId == SpecTypeId.Displacement:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                m1? */
                                                case var _ when paramTypeId == SpecTypeId.Distance:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.DuctInsulationThickness:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.DuctLiningThickness:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.DuctSize:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                m* m not existing in ifc ? */
                                                case var _ when paramTypeId == SpecTypeId.Efficacy:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                //lm / W lummen per Watt no entity found
                                                case var _ when paramTypeId == SpecTypeId.ElectricalFrequency:
                                                    nominalValue.Type = "IfcFrequencyMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ElectricalPotential:
                                                    nominalValue.Type = "IfcElectricVoltageMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ElectricalPower:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ElectricalPowerDensity:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                W / m3 no entity found*/
                                                case var _ when paramTypeId == SpecTypeId.ElectricalResistivity:
                                                    nominalValue.Type = "IfcElectricResistanceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ElectricalTemperature:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.ElectricalTemperatureDifference:
                                                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Energy:
                                                    nominalValue.Type = "IfcEnergyMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Factor:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Flow:
                                                    nominalValue.Type = "IfcVolumetricFlowRateMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.FlowPerPower:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Force:
                                                    nominalValue.Type = "IfcForceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ForceScale:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.HeatCapacityPerArea:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.HeatGain:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                Delta? */
                                                /*case var _ when paramTypeId == SpecTypeId.HeatingLoad:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.HeatingLoadDividedByArea:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.HeatingLoadDividedByVolume:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.HeatTransferCoefficient:
                                                    nominalValue.Type = "IfcThermalTransmittanceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.HvacDensity:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                NotFiniteNumberException clear what density exactly*/
                                                case var _ when paramTypeId == SpecTypeId.HvacEnergy:
                                                    nominalValue.Type = "IfcEnergyMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacFriction:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                //F or FR (Friction) not found
                                                case var _ when paramTypeId == SpecTypeId.HvacMassPerTime:
                                                    nominalValue.Type = "IfcMassFlowRateMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                // kg / s = Mass per time = flowrate
                                                case var _ when paramTypeId == SpecTypeId.HvacPower:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacPowerDensity:
                                                    nominalValue.Type = "IfcHeatFluxDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacPressure:
                                                    nominalValue.Type = "IfcPressureMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.HvacRoughness:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.HvacSlope:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacTemperature:
                                                    nominalValue.Type = "IfcThermodynamicTemperatureMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacTemperatureDifference:
                                                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                // k (Kelvin) per s
                                                case var _ when paramTypeId == SpecTypeId.HvacVelocity:
                                                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacViscosity:
                                                    nominalValue.Type = "IfcDynamicViscosityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Illuminance:
                                                    nominalValue.Type = "IfcIlluminanceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.IsothermalMoistureCapacity:
                                                    nominalValue.Type = "IfcIsothermalMoistureCapacityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Length:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.LinearForce:
                                                    nominalValue.Type = "IfcLinearForceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.LinearForceScale:
                                                    nominalValue.Type = "IfcLinearForceMeasure";
                                                    nominalValue.Value = paramPset.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.LinearMoment:
                                                    nominalValue.Type = "IfcLinearMomentMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.LinearMomentScale:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.LineSpringCoefficient:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.Luminance:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.LuminousFlux:
                                                    nominalValue.Type = "IfcLuminousFluxMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.LuminousIntensity:
                                                    nominalValue.Type = "IfcLuminousIntensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Mass:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.MassDensity:
                                                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.MassPerUnitArea:
                                                    nominalValue.Type = "IfcAreaDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.MassPerUnitLength:
                                                    nominalValue.Type = "IfcMassPerLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Moment:
                                                    nominalValue.Type = "IfcTorqueMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.MomentOfInertia:
                                                    nominalValue.Type = "IfcMomentOfInertiaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.MomentScale:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Number:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Period:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Permeability:
                                                    nominalValue.Type = "IfcVaporPermeabilityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipeDimension:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipeInsulationThickness:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipeMassPerUnitLength:
                                                    nominalValue.Type = "IfcMassPerLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipeSize:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingDensity:
                                                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.PipingFriction:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.PipingMass:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingMassPerTime:
                                                    nominalValue.Type = "IfcMassFlowRateMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.PipingRoughness:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.PipingSlope:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingTemperature:
                                                    nominalValue.Type = "IfcThermodynamicTemperatureMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingTemperatureDifference:
                                                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingVelocity:
                                                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingViscosity:
                                                    nominalValue.Type = "IfcDynamicViscosityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingVolume:
                                                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PointSpringCoefficient:
                                                    nominalValue.Type = "IfcLinearStiffnessMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.PowerPerFlow:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.PowerPerLength:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.Pulsation:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementArea:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementAreaPerUnitLength:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementCover:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementLength:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ReinforcementSpacing:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementVolume:
                                                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Rotation:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.RotationalLineSpringCoefficient:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.RotationalPointSpringCoefficient:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.RotationAngle:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SectionArea:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.SectionDimension:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.SectionModulus:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.SectionProperty:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.SheetLength:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SiteAngle:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Slope:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SpecificHeat:
                                                    nominalValue.Type = "IfcSpecificHeatCapacityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SpecificHeatOfVaporization:
                                                    nominalValue.Type = "IfcHeatingValueMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Speed:
                                                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Stationing:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.StationingInterval:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Stress:
                                                    nominalValue.Type = "IfcModulusOfElasticityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.StructuralFrequency:
                                                    nominalValue.Type = "IfcFrequencyMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.StructuralVelocity:
                                                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SurfaceAreaPerUnitLength:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ThermalConductivity:
                                                    nominalValue.Type = "IfcThermalConductivityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ThermalExpansionCoefficient:
                                                    nominalValue.Type = "IfcThermalExpansionCoefficientMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ThermalGradientCoefficientForMoistureCapacity:
                                                    nominalValue.Type = "IfcIsothermalMoistureCapacityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ThermalMass:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                capacity to store energie J / K or J / Celcium Degrees*/
                                                case var _ when paramTypeId == SpecTypeId.ThermalResistance:
                                                    nominalValue.Type = "IfcThermalResistanceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Time:
                                                    nominalValue.Type = "IfcTimeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.UnitWeight:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Volume:
                                                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.WarpingConstant:
                                                    nominalValue.Type = "IfcWarpingConstantMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Wattage:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Weight:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.WeightPerUnitLength:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.WireDiameter:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;

                                                default:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.AsString();
                                                    break;
                                            }

                                            //Define property NominalValue, name and value
                                            ifcPropValue = new IfcPropertySingleValue
                                            {
                                                NominalValue = nominalValue,
                                                Name = paramPSet.Definition.Name.Remove(0, 10).Split('/')[1]
                                            };

                                            hasProperties.Add(ifcPropValue);
                                        }
                                    }
                                }
                            }
                            //Embed name en value in propertyset with name Arr[0] 
                            ifcPropSet = new IfcPropertySet();
                            ifcPropSet.Type = "IfcPropertySet";
                            ifcPropSet.Name = promptArr[0];
                            ifcPropSet.HasProperties = hasProperties;

                            isDefinedBy.Add(ifcPropSet);

                            pSetDone.Add(promptArr[0]);
                        }
                    }
                }
            }
            //embed propertyset in Ifc Defenition
            return isDefinedBy;
        }

    }


}
#endregion