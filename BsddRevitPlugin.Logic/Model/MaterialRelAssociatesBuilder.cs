using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Media.Media3D;
using Autodesk.Revit.DB;
using Material = Autodesk.Revit.DB.Material;
using BsddRevitPlugin.Logic.IfcJson;
using NLog;
using Revit.IFC.Import.Data;
using Autodesk.Revit.DB.Architecture;
using Newtonsoft.Json;
using System.Security.Principal;
using Autodesk.Revit.DB.Mechanical;
using System.Diagnostics;
using System.Reflection;

namespace BsddRevitPlugin.Logic.Model
{
    internal class MaterialRelAssociatesBuilder
    {
        /// <summary>
        /// Interface of IfcMaterial
        /// The Builder interface specifies methods for creating the different parts
        /// of the material objects.
        /// </summary>
        public interface IMaterialRelAssociatesBuilder
        {

            void GetParameterMaterials(List<ElementId> e, Document doc);

            void GetCompoundStructureMat(List<ElementId> e, Document doc);

            void GetProfileMat(List<ElementId> e, Document doc);

            void ifcMaterialToDictionary(List<ElementId> e, Document doc);

            void ThrowToAssociation();


            AssociationProduct GetResult();

        }

        /// <summary>
        /// 
        /// </summary>
        // The MatRelAssociates Builder classes follow the IMaterialRelAssociates Builder interface and provide
        // specific implementations of the building steps. Your program may have
        // several variations of Builders, implemented differently.
        public class MatRelAssociatesBuilder : IMaterialRelAssociatesBuilder
        {
            //Make list of assosiations to return
            private AssociationProduct _associationProduct = new AssociationProduct();

            //Builder variables
            private Association _association = new Association();


            // A fresh builder instance should contain a blank product object, which
            // is used in further assembly.
            public MatRelAssociatesBuilder()
            {
                this.Reset();
            }

            public void Reset()
            {
                this._associationProduct = new AssociationProduct();
            }

            // All production steps work with the same product instance.

            //Get Element(Type) Materials in List<Material> Materials (Parameters)
            public void GetParameterMaterials(List<ElementId> e, Document doc)
            {
                if (GetElementMaterials(e, doc) != null)
                {
                    this._associationProduct.matList = GetElementMaterials(e, doc);
                }
            }

            //Get materials of each Layer of compound structure
            public void GetCompoundStructureMat(List<ElementId> e, Document doc)
            {
                //Get materials of each Layer of compound structure and transform to IfcLayerSet
                this._associationProduct.MatLayerset = GetElementMaterialsLayerset(e, doc);
            }

            //Get materials of Profile
            public void GetProfileMat(List<ElementId> e, Document doc)
            {
                this._associationProduct.MatProfileset = GetElementMaterialsProfileset(e, doc);
            }

            public void ifcMaterialToDictionary(List<ElementId> e, Document doc)
            {
                Element elem = doc.GetElement(e[0]);
                ElementType elemType = doc.GetElement(e[0]) as ElementType;
                ElementId elemId;

                if (elemType != null)
                {
                    elemId = elemType.Id;
                }
                else
                {
                    elemId = elem.Id;
                }

                //ElementId elemId = e[0] as ElementId;

                if (this._associationProduct.matList != null)
                {
                    this._associationProduct.associationsMat = ifcMatToDictionary(_associationProduct.matList);
                }

                if (this._associationProduct.MatLayerset != null)
                {
                    this._associationProduct.associationsMatLayerset = ifcMatLayerToDictionary(elemId, _associationProduct.MatLayerset);
                }

                if (this._associationProduct.MatProfileset != null)
                {
                    this._associationProduct.associationsMatProfileset = ifcMatProfilesetToDictionary(elemId, _associationProduct.MatProfileset);
                }
            }

            public void ThrowToAssociation()
            {
                if (this._associationProduct.associationsMat != null)
                {
                    foreach (KeyValuePair<ElementId, IfcMaterial> pair in _associationProduct.associationsMat)
                    {
                        Association association = new Association();
                        association = (IfcMaterial)pair.Value;
                        this._associationProduct.Add(association);
                    }
                }

                //#TODO Ifc4 out of scope: foreach (KeyValuePair<ElementId, IfcMaterialConstituentSet> pair in _association.associationsMatConstituentSet)
                //{
                //    Association association = new Association();
                //    association = (IfcMaterialConstituentSet)pair.Value;
                //    _associationProduct.Add(association);
                //}

                if (_associationProduct.associationsMatLayerset != null)
                {
                    foreach (KeyValuePair<ElementId, IfcMaterialLayerSet> pair in _associationProduct.associationsMatLayerset)
                    {
                        Association association = new Association();
                        association = (IfcMaterialLayerSet)pair.Value;
                        this._associationProduct.Add(association);
                    }
                }

                if (_associationProduct.associationsMatProfileset != null)
                {
                    foreach (KeyValuePair<ElementId, IfcMaterialProfileSet> pair in _associationProduct.associationsMatProfileset)
                    {
                        Association association = new Association();
                        association = (IfcMaterialProfileSet)pair.Value;
                        this._associationProduct.Add(association);
                    }
                }
            }


            // Concrete Builders are supposed to provide their own methods for
            // retrieving results. That's because various types of builders may
            // create entirely different products that don't follow the same
            // interface. Therefore, such methods cannot be declared in the base
            // Builder interface (at least in a statically typed programming
            // language).
            //
            // Usually, after returning the end result to the client, a builder
            // instance is expected to be ready to start producing another product.
            // That's why it's a usual practice to call the reset method at the end
            // of the `GetProduct` method body. However, this behavior is not
            // mandatory, and you can make your builders wait for an explicit reset
            // call from the client code before disposing of the previous result.
            public AssociationProduct GetResult()
            {
                AssociationProduct result = this._associationProduct;

                this.Reset();

                return result;
            }
        }


        // It makes sense to use the Builder pattern only when your products are
        // quite complex and require extensive configuration.
        //
        // Unlike in other creational patterns, different concrete builders can
        // produce unrelated products. In other words, results of various builders
        // may not always follow the same interface.
        public class AssociationProduct
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            private List<Association> _associations = new List<Association>();
            public List<Material> matList { get; set; }
            public Dictionary<ElementId, IfcMaterial> associationsMat { get; set; }
            //#TODO Ifc4 out of scope: public Dictionary<ElementId, IfcMaterialConstituentSet> associationsMatConstituentSet { get; set; }
            public IfcMaterialLayerSet MatLayerset { get; set; }
            public Dictionary<ElementId, IfcMaterialLayerSet> associationsMatLayerset { get; set; }
            public IfcMaterialProfileSet MatProfileset { get; set; }
            public Dictionary<ElementId, IfcMaterialProfileSet> associationsMatProfileset { get; set; }


            public void Add(Association association)
            {
                this._associations.Add(association);
            }

            public List<Association> SetAssociations(List<Association> ExistingAssiciations)
            {
                List<Association> associations = new List<Association>();
                associations = ExistingAssiciations;

                for (int i = 0; i < this._associations.Count; i++)
                {
                    associations.Add(this._associations[i]);
                }

                return associations;
            }
        }

        public class IfcMaterials
        {
            private List<IfcMaterial> _ifcMaterials = new List<IfcMaterial>();

            public void Add(IfcMaterial ifcMaterial)
            {
                this._ifcMaterials.Add(ifcMaterial);
            }

            public List<IfcMaterial> ListIfcMaterials()
            {
                List<IfcMaterial> associations = null;

                associations = this._ifcMaterials;

                //for (int i = 0; i < this._ifcMaterials.Count; i++)
                //{
                //    associations.Add(this._ifcMaterials[i]);
                //}

                return associations;
            }
        }

        // The Director is only responsible for executing the building steps in a
        // particular sequence. It is helpful when producing products according to a
        // specific order or configuration. Strictly speaking, the Director class is
        // optional, since the client can control builders directly.
        public class Director
        {
            private IMaterialRelAssociatesBuilder _builder;


            public IMaterialRelAssociatesBuilder Builder
            {
                set { _builder = value; }
            }

            // The Director can construct several product variations using the same
            // building steps.

            //if schema = Ifc2x3
            public void BuildMaterial(List<ElementId> e, Document doc)
            {
                //    IfcRelAssociatesMaterial
                //      |
                //      | --IfcMaterial

                //Get Element(Type) Materials in List<Material> Materials (Parameters) --> GetElementMaterials(elementType, doc)
                this._builder.GetParameterMaterials(e, doc);

                //add found IfcMaterial to the dictionary
                this._builder.ifcMaterialToDictionary(e, doc);

                //Add Dictionary to Associations
                this._builder.ThrowToAssociation();
            }

            public void BuildMaterialLayerSet(List<ElementId> e, Document doc)
            {
                // IfcWall
                //  |
                //  | --IfcRelAssociatesMaterial
                //      |
                //      | --IfcMaterialLayerSet
                //          |
                //          | --IfcMaterial(Baksteen)
                //          | --IfcMaterial(Isolatie)
                //          | --IfcMaterial(Gipsplaat)

                //Get materials of each Layer of compound structure
                this._builder.GetCompoundStructureMat(e, doc);
                //add found IfcMaterial to the dictionary
                this._builder.ifcMaterialToDictionary(e, doc);
                //Add Dictionary to Associations
                this._builder.ThrowToAssociation();

                //Get number of materials in layer
                //Make a IfcMaterial for each found layer
                //Store each layer material in a IfcMaterial
                //Make IfcMaterialLayerSet
                //Add IfcMaterials to IfcMaterialLayerSet
                //Make IfcRelAssociatesMaterial
                //Add IfcMaterialLayerSet to IfcRelAssociatesMaterial
            }

            public void BuildMaterialProfileSet(List<ElementId> e, Document doc)
            {
                // IfcElement(bijv.IfcBeam, IfcColumn)
                //  |
                //  | --IfcRelAssociatesMaterial
                //      |
                //      | --IfcMaterialProfileSet
                //          |
                //          | --IfcMaterialProfile(1..n)
                //              |
                //              | --IfcProfileDef(bijv.IfcRectangleProfileDef, IfcCircleProfileDef)
                //              | --IfcMaterial

                //Get materials of each Layer of compound structure
                this._builder.GetProfileMat(e, doc);
                //add found IfcMaterial to the dictionary
                this._builder.ifcMaterialToDictionary(e, doc);
                //Add Dictionary to Associations
                this._builder.ThrowToAssociation();

                //Get Element(Type) Materials in List<Material> Materials (Parameters) --> GetElementMaterials(elementType, doc)

                //Get IfcMaterialLayer ifcMaterialLayer(CompoundStructureLayer layer, Document doc)
                //X Get the description value

                //add new IfcMaterial to the dictionary
                //OR
                //update the existing IfcClassificationReference with the new values from the revit typeEntity

                //Add new IfcMaterial to the dictionary based on elementId and IfcMaterial



                //Build IfcMaterialLayerSet
                //        this._builder.BuildIfcMaterialLayerSet(e, doc);


                //this._builder.BuildPartA();
                //this._builder.BuildPartB();
                //this._builder.BuildPartC();
                //this._builder.ThrowToAssociation();

                //Get number of materials in parameters
                //Make a IfcMaterial for each found parameter
                //Make a IfcProfileDef for each found parameter
                //Store each parameter material in a IfcMaterial
                //Define each IfcProfileDef related to the IfcMaterial
                //Make IfcMaterialProfile for each IfcMaterial, IfcMaterialDef combination
                //Make a IfcMaterialProfileSet
                //Add IfcMaterialProfiles to IfcMaterialProfileSet
                //Make IfcRelAssociatesMaterial
                //Add IfcMaterialProfileSet to IfcRelAssociatesMaterial
            }


            //#TODO Ifc4 out of scope: Make function
            public void BuildMaterialConstituentSet()
            {
                // IfcElement(bijv.IfcWall, IfcBeam, IfcColumn)
                //  |
                //  | --IfcRelAssociatesMaterial
                //      |
                //      | --IfcMaterialConstituentSet
                //          |
                //          | -- IfcMaterialConstituent
                //              |
                //              | -- IfcMaterial
                //          | -- IfcMaterialConstituent
                //              |
                //              | -- IfcMaterial

            }
        }

        public static List<Material> GetElementMaterials(List<ElementId> elemSet, Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            //Always only 1 element. ElementSet used to make it compattible for both Element and ElementType
            try
            {
                foreach (ElementId id in elemSet)
                {
                    if (doc.GetElement(id) is ElementType)
                    {
                        ElementType elemType = (ElementType)doc.GetElement(id);

                        //Make material list
                        List<Material> mat = new List<Material>();

                        // Find out or there are any material parameters
                        foreach (Parameter parameter in elemType.Parameters)
                        {
                            // Check if the parameter is related to materials
                            if (parameter.Definition.GetDataType() == SpecTypeId.Reference.Material)
                            {
                                Material Pmat = null;
                                ElementId materialId = parameter.AsElementId();
                                if (-1 == materialId.IntegerValue)
                                {
                                    //Invalid ElementId, assume the material is "By Category"
                                    if (null != elemType.Category)
                                    {
                                        Pmat = elemType.Category.Material;
                                        if (Pmat != null)
                                        {
                                            mat.Add(Pmat);
                                        }
                                    }
                                }
                                else
                                {
                                    Pmat = doc.GetElement(materialId) as Material;
                                    mat.Add(Pmat);
                                }
                            }
                        }
                        logger.Info($"ElementType: {mat.Count}");
                        return mat;
                    }
                    else if (doc.GetElement(id) is Element)
                    {
                        Element elem = (Element)doc.GetElement(id);

                        //Make material list
                        List<Material> mat = new List<Material>();

                        // Find out or there are any material parameters
                        foreach (Parameter parameter in elem.Parameters)
                        {
                            // Check if the parameter is related to materials
                            if (parameter.Definition.GetDataType() == SpecTypeId.Reference.Material)
                            {
                                Material Pmat = null;
                                ElementId materialId = parameter.AsElementId();
                                if (-1 == materialId.IntegerValue)
                                {
                                    //Invalid ElementId, assume the material is "By Category"
                                    if (null != elem.Category)
                                    {
                                        Pmat = elem.Category.Material;
                                        if (Pmat != null)
                                        {
                                            mat.Add(Pmat);
                                        }
                                    }
                                }
                                else
                                {
                                    Pmat = doc.GetElement(materialId) as Material;
                                    mat.Add(Pmat);
                                }
                            }
                        }
                        logger.Info($"Element: {mat.Count}");
                        return mat;
                    }
                }
            }
            catch { }

            return null;
        }

        public static Dictionary<ElementId, IfcMaterial> ifcMatToDictionary(List<Material> matList)
        {
            Dictionary<ElementId, IfcMaterial> associationsMat = new Dictionary<ElementId, IfcMaterial>();

            foreach (Material mat in matList)
            {
                //get the description value
                BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                string descriptionValue = "";

                Parameter description = mat.get_Parameter(desiredBIP);
                if (description != null)
                {
                    descriptionValue = description.AsString();
                }

                // add new IfcMaterial to the dictionary based on dictionaryUri, Identification and Name
                associationsMat[mat.Id] = new IfcMaterial
                {
                    Name = mat.Name,
                    Description = descriptionValue,
                    Category = mat.Category.Name,
                    //HasRepresentation = mat.,
                    //IsRelatedWith = mat.,
                    //RelatesTo = mat.,
                    Type = "IfcMaterial",
                };
            }

            return associationsMat;
        }

        public static Dictionary<ElementId, IfcMaterialLayerSet> ifcMatLayerToDictionary(ElementId elemId, IfcMaterialLayerSet matLayerSet)
        {
            Dictionary<ElementId, IfcMaterialLayerSet> MatLayerSetDict = new Dictionary<ElementId, IfcMaterialLayerSet>();

            MatLayerSetDict[elemId] = matLayerSet;

            return MatLayerSetDict;
        }

        public static Dictionary<ElementId, IfcMaterialProfileSet> ifcMatProfilesetToDictionary(ElementId elemId, IfcMaterialProfileSet matProfileSet)
        {
            Dictionary<ElementId, IfcMaterialProfileSet> MatProfileSetDict = new Dictionary<ElementId, IfcMaterialProfileSet>();

            MatProfileSetDict[elemId] = matProfileSet;

            return MatProfileSetDict;
        }

        public static IfcMaterialProfileSet GetElementMaterialsProfileset(List<ElementId> e, Document doc)
        {
            // IfcElement(bijv.IfcBeam, IfcColumn)
            //  |
            //  | --IfcRelAssociatesMaterial
            //      |
            //      | --IfcMaterialProfileSet
            //          |
            //          | --IfcMaterialProfile(1..n)
            //              |
            //              | --IfcProfileDef(bijv.IfcRectangleProfileDef, IfcCircleProfileDef)
            //              | --IfcMaterial

            //Make materila list
            List<IfcMaterialProfile> matProfileSet = new List<IfcMaterialProfile>();

            //Make material list
            List<Material> mat = new List<Material>();

            // #Is elem Profile
            if (
                e != null &&
                doc.GetElement(e[0]).Category.Name == "Structural Beam Systems" ||
                doc.GetElement(e[0]).Category.Name == "Structural Columns" ||
                doc.GetElement(e[0]).Category.Name == "Structural Framing" ||
                doc.GetElement(e[0]).Category.Name == "Structural Trusses"
                )
            {
                // Find out or there are any material parameters
                foreach (Parameter parameter in doc.GetElement(e[0]).Parameters)
                {
                    // Check if the parameter is related to materials
                    if (parameter.Definition.GetDataType() == SpecTypeId.Reference.Material)
                    {
                        Material Pmat = null;
                        ElementId materialId = parameter.AsElementId();
                        if (-1 == materialId.IntegerValue)
                        {
                            //Invalid ElementId, assume the material is "By Category"
                            if (null != doc.GetElement(e[0]).Category)
                            {
                                Pmat = doc.GetElement(e[0]).Category.Material;
                                if (Pmat != null)
                                {
                                    mat.Add(Pmat);
                                }
                            }
                        }
                        else
                        {
                            Pmat = doc.GetElement(materialId) as Material;
                            mat.Add(Pmat);
                        }
                    }
                }

            }

            for (int i = 0; i < mat.Count; i++)
            {
                if (mat[i] == null)
                {
                    mat.RemoveAt(mat.IndexOf(mat[i]));
                    i--;
                }
            }

            foreach (Material material in mat)
            {
                if (material != null)
                {
                    //get the description value
                    BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                    string descriptionValue = "N/A";

                    Parameter description = material.get_Parameter(desiredBIP);
                    if (description != null)
                    {
                        descriptionValue = description.AsString();
                    }

                    //Convert Revit material to IfcMaterial by IfcMaterialBuilder
                    IfcMaterial ifcMaterial = new IfcMaterialBuilder()
                        .AddName(material.Name)
                        .AddDescription(descriptionValue)
                        .AddCategory(material.Category.Name)
                        //.AddHasRepresentation()
                        //.AddIsRelatedWith()
                        //.AddRelatesTo()
                        .Build();

                    //!!!!!!!!!!!!!!!!!!!Add assosiation inherrit builder??

                    ifcMaterial.Name = material.Name;
                    ifcMaterial.Type = "IfcMaterial";

                    //Make IfcMaterialProfile
                    IfcMaterialProfile ifcMaterialProfile = new IfcMaterialProfile();
                    ifcMaterialProfile.Name = material.Name;
                    ifcMaterialProfile.Description = "N/A";
                    ifcMaterialProfile.Material = ifcMaterial;
                    //ifcMaterialProfile.Profile = ;
                    ifcMaterialProfile.Priority = 0;
                    //ifcMaterialProfile.Category = ;
                    matProfileSet.Add(ifcMaterialProfile);
                }
            }

            if (matProfileSet.Count > 0)
            {
                //Define IfcProfileDef
                IfcProfileDef ifcProfileDef = new IfcProfileDef();
                //ifcProfileDef.ProfileType = ;
                ifcProfileDef.ProfileName = doc.GetElement(e[0]).Name;
                //ifcProfileDef.HasExternalReference = ;
                //ifcProfileDef.HasProperties = ;

                //Define IfcCompositeProfileDef
                IfcCompositeProfileDef ifcCompositeProfileDef = new IfcCompositeProfileDef();
                ifcProfileDef.ProfileName = doc.GetElement(e[0]).Name;
                ifcProfileDef.ProfileName = doc.GetElement(e[0]).Name;
                ifcCompositeProfileDef.Profiles = ifcProfileDef;
                ifcCompositeProfileDef.Label = "ifcCompositeProfileDef";

                //Define IfcMaterialProfileSet
                IfcMaterialProfileSet ifcMaterialProfileSet = new IfcMaterialProfileSet();
                ifcMaterialProfileSet.Name = doc.GetElement(e[0]).Name;
                ifcMaterialProfileSet.Description = "N/A";
                ifcMaterialProfileSet.MaterialProfiles = matProfileSet;
                ifcMaterialProfileSet.CompositeProfile = ifcCompositeProfileDef;
                ifcMaterialProfileSet.Type = "IfcMaterialProfileSet";

                return ifcMaterialProfileSet;
            }
            else
            {
                return null;
            }
        }

        public static IfcMaterialLayerSet GetElementMaterialsLayerset(List<ElementId> e, Document doc)
        {
            // IfcWall
            //  |
            //  | --IfcRelAssociatesMaterial
            //      |
            //      | --IfcMaterialLayerSet
            //          |
            //          | --IfcMaterial(Baksteen)
            //          | --IfcMaterial(Isolatie)
            //          | --IfcMaterial(Gipsplaat)


            //Make material list
            List<IfcMaterialLayer> matLayerSet = new List<IfcMaterialLayer>();

            /*//Get HostObject by query existing FamilyInstances with the same ElementType
            var instances1 = new FilteredElementCollector(doc)
                .OfClass(typeof(FamilyInstance))
                .Cast<FamilyInstance>()
                .Where(fi => fi.Symbol.Id == e.Id);*/

            //take first element out of elementtype
            List<Element> collectorEF = new FilteredElementCollector(doc)
                .WhereElementIsNotElementType()
                .ToList<Element>();
            List<Element> listEI = collectorEF.Where(q => q.GetTypeId() == e[0]).ToList<Element>();
            Element instances = listEI[0];
            CompoundStructure compoundStructure = null;

            ElementType elemType = doc.GetElement(e[0]) as ElementType;

            // #Is elem with compound structure
            if (elemType != null)
            {
                if (
                    elemType.Category.Name == "Ceilings" ||
                    elemType.Category.Name == "Roofs" ||
                    elemType.Category.Name == "Walls" ||
                    elemType.Category.Name == "Floors"
                )
                {
                    switch (doc.GetElement(e[0]).Category.Name)
                    {
                        case "Walls":
                            Wall wall = instances as Wall;
                            compoundStructure = wall.WallType.GetCompoundStructure();
                            break;
                        case "Floors":
                            Floor floor = instances as Floor;
                            compoundStructure = floor.FloorType.GetCompoundStructure();
                            break;
                        case "Ceilings":
                            try
                            {
                                Ceiling ceiling = instances as Ceiling;
                                CeilingType CT = doc.GetElement(ceiling.GetTypeId()) as CeilingType;
                                compoundStructure = CT.GetCompoundStructure();
                            }
                            catch { }
                            break;
                        case "Roofs":
                            RoofBase roof = instances as RoofBase;
                            compoundStructure = roof.RoofType.GetCompoundStructure();
                            break;
                    }


                    if (compoundStructure != null)
                    {
                        var layers = compoundStructure.GetLayers();
                        if (layers == null)
                        {
                            //find category and subcategory corresponding to the compoundstructure layer
                        }
                        foreach (var layer in layers)
                        {
                            Material material = doc.GetElement(layer.MaterialId) as Material;

                            if (material != null)
                            {
                                //get the description value
                                BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                                string descriptionValue = "N/A";

                                Parameter description = material.get_Parameter(desiredBIP);
                                if (description != null)
                                {
                                    descriptionValue = description.AsString();
                                }

                                //Convert Revit material to IfcMaterial
                                IfcMaterial ifcMaterial = new IfcMaterial();
                                ifcMaterial.Name = material.Name;
                                ifcMaterial.Description = descriptionValue;
                                ifcMaterial.Category = material.Category.Name;
                                /*
                                ifcMaterial.HasRepresentation = ;
                                ifcMaterial.IsRelatedWith = ;
                                ifcMaterial.RelatesTo = ;
                                */
                                ifcMaterial.Name = material.Name;
                                ifcMaterial.Type = "IfcMaterial";

                                //Make IfcMaterialLayer
                                IfcMaterialLayer ifcMaterialLayer = new IfcMaterialLayer();
                                ifcMaterialLayer.Material = ifcMaterial;
                                ifcMaterialLayer.LayerThickness = layer.Width * 304.8;
                                //ifcMaterialLayer.IsVentilated = ;
                                ifcMaterialLayer.Name = material.Name;
                                ifcMaterialLayer.Description = "N/A";
                                ifcMaterialLayer.Category = layer.Function.ToString();
                                ifcMaterialLayer.Priority = 0;
                                matLayerSet.Add(ifcMaterialLayer);
                            }
                        }
                    }
                }
            }


            if (matLayerSet.Count > 0)
            {
                IfcMaterialLayerSet ifcMaterialLayerSet = new IfcMaterialLayerSet();
                ifcMaterialLayerSet.IfcMaterialLayer = matLayerSet;
                ifcMaterialLayerSet.LayerSetName = "N/A";
                ifcMaterialLayerSet.Description = "N/A";
                //calculate total length
                double thickness = 0;
                foreach (IfcMaterialLayer layer in ifcMaterialLayerSet.IfcMaterialLayer)
                {
                    thickness = thickness + layer.LayerThickness;
                }
                ifcMaterialLayerSet.TotalThickness = thickness;
                ifcMaterialLayerSet.Name = elemType.Name;
                ifcMaterialLayerSet.Type = "IfcMaterialLayerSet";

                return ifcMaterialLayerSet;
            }
            else
            {
                return null;
            }
        }

        // #TODO
        /*public static IfcMaterialConstituentSet GetElementMatConstituentSet(Element e, Document doc)
        {
            //schema
            //https://help.autodesk.com/view/RVT/2022/ENU/?guid=Revit_API_Revit_API_Developers_Guide_Revit_Geometric_Elements_Material_Element_Material_html

            // koppeling materialen via IfcRelAssociatesMaterial
            // verbindt een IfcElement met een IfcMaterial, IfcMaterialLayerSet (layered element zoals wall), of IfcMaterialProfileSet (profielen).

            // IfcElement(bijv.IfcWall, IfcBeam, IfcColumn)
            //  |
            //  | --IfcRelAssociatesMaterial
            //      |
            //      | --IfcMaterialConstituentSet
            //          |
            //          | -- IfcMaterialConstituent
            //              |
            //              | -- IfcMaterial
            //          | -- IfcMaterialConstituent
            //              |
            //              | -- IfcMaterial

            //Make material list
            Dictionary<Material, String> matDict = new Dictionary<Material, String>();

            if (
                e != null &&
                e.Category.Name != "Structural Beam Systems" &&
                e.Category.Name != "Structural Columns" &&
                e.Category.Name != "Structural Framing" &&
                e.Category.Name != "Structural Trusses"
                )
            {

                // Find out or there are any material parameters
                foreach (Parameter parameter in e.Parameters)
                {
                    // Check if the parameter is related to materials
                    if (parameter.Definition.GetDataType() == SpecTypeId.Reference.Material)
                    {
                        Material Pmat = null;
                        ElementId materialId = parameter.AsElementId();
                        if (-1 == materialId.IntegerValue)
                        {
                            //Invalid ElementId, assume the material is "By Category"
                            if (null != e.Category)
                            {
                                Pmat = e.Category.Material;
                                if (Pmat != null)
                                {
                                    matDict.Add(Pmat, parameter.Definition.Name);
                                }
                            }
                        }
                        else
                        {
                            Pmat = doc.GetElement(materialId) as Material;
                            matDict.Add(Pmat, "");
                        }
                    }
                }
            }



            if (matDict.Count > 1)
            {
                //Define IfcMaterialConstituentSet
                IfcMaterialConstituentSet ifcMaterialConstituentSet = new IfcMaterialConstituentSet();

                List<IfcMaterialConstituent> ifcMaterialConstituentList = new List<IfcMaterialConstituent>();
                foreach (KeyValuePair<Material, String> entry in matDict)
                {
                    //get the description value
                    BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                    string descriptionValue = "N/A";

                    Parameter description = entry.Key.get_Parameter(desiredBIP);
                    if (description != null)
                    {
                        descriptionValue = description.AsString();
                    }

                    //Convert Revit material to IfcMaterial
                    IfcMaterial ifcMaterial = new IfcMaterial();
                    ifcMaterial.Name = entry.Key.Name;
                    ifcMaterial.Description = descriptionValue;
                    ifcMaterial.Category = entry.Key.Category.Name;
                    //ifcMaterial.HasRepresentation = ;
                    //ifcMaterial.IsRelatedWith = ;
                    //ifcMaterial.RelatesTo = ;
                    ifcMaterial.Type = "IfcMaterial";

                    //Make IfcMaterialConstituent
                    IfcMaterialConstituent ifcMaterialConstituent = new IfcMaterialConstituent();
                    ifcMaterialConstituent.Name = entry.Value;
                    ifcMaterialConstituent.Description = "N/A";
                    ifcMaterialConstituent.Material = ifcMaterial;
                    //ifcMaterialConstituent.Fraction = ;
                    //ifcMaterialConstituent.Category = ;
                    //ifcMaterialConstituent.ToMaterialConstituentSet = ifcMaterialConstituentSet;
                    ifcMaterialConstituentList.Add(ifcMaterialConstituent);
                }


                ifcMaterialConstituentSet.Name = e.Name;
                ifcMaterialConstituentSet.Description = "N/A";
                ifcMaterialConstituentSet.MaterialConstituents = ifcMaterialConstituentList;

                return ifcMaterialConstituentSet;
            }
            else
            {
                return null;
            }
        }
        */
    }
}
