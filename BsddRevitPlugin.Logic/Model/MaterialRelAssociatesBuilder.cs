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

            void SetCompoundStructure(List<ElementId> e, Document doc);

            void SetLayersOfCompoundStructure(List<ElementId> e, Document doc);

            void SetLayersInMaterialLayerset(List<ElementId> e, Document doc);

            
            void ThrowToAssiciation();
            
        }

        /// <summary>
        /// 
        /// </summary>
        // The MatRelAssociates Builder classes follow the IMaterialRelAssociates Builder interface and provide
        // specific implementations of the building steps. Your program may have
        // several variations of Builders, implemented differently.
        public class MatRelAssociatesBuilder : IMaterialRelAssociatesBuilder
        {
            private AssociationProduct _association = new AssociationProduct();
            private CompoundStructure _compoundStructure = null;
            private IList<CompoundStructureLayer> _compoundStructureLayerList;
            private List<IfcMaterialLayer> _ifcMaterialLayerSet = new List<IfcMaterialLayer>();
            private IfcRelAssociatesMaterial _ifcRelAssociatesMaterial = new IfcRelAssociatesMaterial();
            private IfcMaterialProfileSet _ifcMaterialProfileSet = new IfcMaterialProfileSet();
            private IfcMaterialProfile _ifcMaterialProfile = new IfcMaterialProfile();
            private IfcProfileDef _ifcProfileDef = new IfcProfileDef();
            private IfcMaterialConstituentSet _ifcMaterialConstituentSet = new IfcMaterialConstituentSet();
            private IfcMaterialConstituent _ifcMaterialConstituent = new IfcMaterialConstituent();
            private IfcMaterials _ifcMaterial = new IfcMaterials();
            private List<Material> _Material = new List<Material>();

            // A fresh builder instance should contain a blank product object, which
            // is used in further assembly.
            public MatRelAssociatesBuilder()
            {
                this.Reset();
            }

            public void Reset()
            {
                this._association = new AssociationProduct();
            }

            // All production steps work with the same product instance.
                  
            public void GetParameterMaterials(List<ElementId> e, Document doc)
            {
                if(GetElementMaterials(e, doc) != null)
                {
                    foreach (Material mat in GetElementMaterials(e, doc))
                    {
                        this._Material.Add(mat);
                    }
                }
            }

            public void SetCompoundStructure(List<ElementId> e, Document doc)
            {
                this._compoundStructure = GetCompoundStructure(e, doc);
            }

            public void SetLayersOfCompoundStructure(List<ElementId> e, Document doc)
            {
                if (this._compoundStructure != null)
                {
                    this._compoundStructureLayerList = this._compoundStructure.GetLayers();
                }
            }

            public void SetLayersInMaterialLayerset(List<ElementId> e, Document doc)
            {
                if(this._compoundStructureLayerList != null)
                {
                    foreach (CompoundStructureLayer layer in this._compoundStructureLayerList)
                    {
                        this._ifcMaterialLayerSet.Add(ifcMaterialLayer(layer, doc));
                    }
                }
                
            }

            public void ThrowToAssiciation()
            {
                foreach (IfcMaterial ifcMat in this._ifcMaterial.ListIfcMaterials())
                {
                    this._association.Add(ifcMat);
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
            public AssociationProduct GetAssociation()
            {
                AssociationProduct result = this._association;

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

            public void Add(Association association)
            {
                this._associations.Add(association);
            }

            public List<Association> ListAssociations()
            {
                List<Association> associations = new List<Association>();
                
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

//Totale lijst van stappen
                //Get Materials (Parameters) --> GetElementMaterials(elementType, doc)
                //Get Layer
                //Get Materials of Layer
                //Get (material) Element Id of each found material
                //Get the description value

                //add new IfcMaterial to the dictionary based on dictionaryUri, Identification and Name
                //OR
                //update the existing IfcClassificationReference with the new values from the revit typeEntity

                //Add new IfcMaterial to the dictionary based on elementId and IfcMaterial
                //Add MaterialRelAssociatesDictionart to Associations







                this._builder.GetParameterMaterials(e, doc);
                //Build IfcMaterials

                //Build IfcRelAssociatesMaterial

                //Throw IfcRelAssociatesMaterial into Assiciation
                this._builder.ThrowToAssiciation();
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

                //Get Materials (Compound)
       //         GetCompoundMaterials(e, doc);
                //Build IfcMaterials
       //         this._builder.BuildIfcMaterial(e, doc);
                //Build IfcMaterialLayerSet
        //        this._builder.BuildIfcMaterialLayerSet(e, doc);
                //Build IfcRelAssociatesMaterial
      //          this._builder.IfcRelAssociatesMaterial(e, doc);
                //Throw IfcRelAssociatesMaterial into Assiciation
                this._builder.ThrowToAssiciation();


                this._builder.SetCompoundStructure(e, doc);
                this._builder.SetLayersOfCompoundStructure(e, doc);
                this._builder.SetLayersInMaterialLayerset(e, doc);
                //this._builder.ThrowToAssiciation();

                //Get number of materials in layer
                //Make a IfcMaterial for each found layer
                //Store each layer material in a IfcMaterial
                //Make IfcMaterialLayerSet
                //Add IfcMaterials to IfcMaterialLayerSet
                //Make IfcRelAssociatesMaterial
                //Add IfcMaterialLayerSet to IfcRelAssociatesMaterial
            }

            public void BuildMaterialProfileSet()
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

                //this._builder.BuildPartA();
                //this._builder.BuildPartB();
                //this._builder.BuildPartC();
                //this._builder.ThrowToAssiciation();

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

            
            //#TODO ifc schema = Ifc4
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

                //this._builder.BuildPartA();
                //this._builder.BuildPartB();
                //this._builder.BuildPartC();
                //this._builder.ThrowToAssiciation();

                //Get number of materials in parameters
                //Make a IfcMaterial for each found parameter
                //Store each material in a IfcMaterial
                //Make a IfcMaterialConstituent for each IfcMaterial
                //Store each IfcMaterial in the IfcMaterialConstituent
                //Make IfcMaterialConstituentSet
                //Add IfcMaterialConstituent to IfcMaterialConstituentSet
                //Make IfcRelAssociatesMaterial
                //Add IfcMaterialConstituentSet to IfcRelAssociatesMaterial
            }
        }

        //combine associations
//        foreach (KeyValuePair<Uri, IfcClassificationReference> pair in associationsRef)
//        {
//            Association association = new Association();
//            association = (IfcClassificationReference) pair.Value;
//            associations.Add(association);
//        }

        public static List<Association> IfcMaterialToAssociation(List<Association> associations, Dictionary<ElementId, IfcMaterial> Dict)
        {
            foreach(KeyValuePair<ElementId, IfcMaterial> pair in Dict)
            {
                Association association = new Association();
                association = (IfcMaterial)pair.Value;
                associations.Add(association);
            }

            return associations;
        }

        //        foreach (KeyValuePair<ElementId, IfcMaterialLayerSet> pair in associationsMatLayerset)
        //        {
        //            Association association = new Association();
        //            association = (IfcMaterialLayerSet)pair.Value;
        //            associations.Add(association);
        //        }

        //        foreach (KeyValuePair<ElementId, IfcMaterialConstituentSet> pair in associationsMatConstituentSet)
        //        {
        //            Association association = new Association();
        //            association = (IfcMaterialConstituentSet)pair.Value;
        //            associations.Add(association);
        //        }

        //        foreach (KeyValuePair<ElementId, IfcMaterialProfileSet> pair in associationsMatProfileset)
        //        {
        //            Association association = new Association();
        //            association = (IfcMaterialProfileSet)pair.Value;
        //            associations.Add(association);
        //        }

        public static List<IfcMaterial> ReplacedGetElementMaterials(Element e, Document doc)
        {
            //Make material list
            List<Material> mat = new List<Material>();
            
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
            

            //if (mat.Count > 0)
            //{
                var MaterialRelAssociatesDictionart = new Dictionary<ElementId, IfcMaterial>();

                if (mat != null)
                {
                    foreach (Material m in mat)
                    {

                        ElementId elemId = m.Id;
                        if (!MaterialRelAssociatesDictionart.TryGetValue(elemId, out var associationM))
                        {
                            // add new IfcMaterial to the dictionary based on elementId and IfcMaterial
                            MaterialRelAssociatesDictionart[elemId] = new IfcMaterial
                            {
                                Type = "IfcMaterial",
                                Name = m.Name,
                            };
                        }
                    }
                }
                
                List<IfcMaterial> ifcMaterialList = new List<IfcMaterial>();

                foreach (KeyValuePair<ElementId, IfcMaterial> pair in MaterialRelAssociatesDictionart)
                {
                    ifcMaterialList.Add((IfcMaterial)pair.Value);
                }

                return ifcMaterialList;
            //}
            //else
            //{
            //    return ifcMaterialList;
            //}
        }

        public static List<IfcMaterial> ReplacedGetElementMaterials(ElementType e, Document doc)
        {
            //Make material list
            List<Material> mat = new List<Material>();

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

            //if (mat.Count > 0)
            //{
                var MaterialRelAssociatesDictionart = new Dictionary<ElementId, IfcMaterial>();

                if (mat != null)
                {
                    foreach (Material m in mat)
                    {

                        ElementId elemId = m.Id;
                        if (!MaterialRelAssociatesDictionart.TryGetValue(elemId, out var association))
                        {
                            //get the description value
                            BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                            string descriptionValue = "";

                            Parameter description = m.get_Parameter(desiredBIP);
                            if (description != null)
                            {
                                descriptionValue = description.AsString();
                            }

                            // add new IfcMaterial to the dictionary based on dictionaryUri, Identification and Name
                            MaterialRelAssociatesDictionart[elemId] = new IfcMaterial
                            {
                                Name = m.Name,
                                Description = descriptionValue,
                                Category = m.Category.Name,
                                //HasRepresentation = m.,
                                //IsRelatedWith = m.,
                                //RelatesTo = m.,
                                Type = "IfcMaterial",
                            };
                        }
                        else
                        {
                            //update the existing IfcClassificationReference with the new values from the revit typeEntity
                            var ifcMaterial = (IfcMaterial)association;
                            ifcMaterial.Name = m.Name;
                        }
                    }
                }
                
                List<IfcMaterial> ifcMaterialList = new List<IfcMaterial>();

                foreach (KeyValuePair<ElementId, IfcMaterial> pair in MaterialRelAssociatesDictionart)
                {
                    ifcMaterialList.Add((IfcMaterial)pair.Value);
                }

                return ifcMaterialList;
            //}
            //else
            //{
            //    return ifcMaterialList;
            //}
        }

        public static List<Material> GetElementMaterials(List<ElementId> elemSet, Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            //Always only 1 element. ElementSet used to make it compattible for both Element and ElementType
            try
            {
                foreach (ElementId id in elemSet)
                {
                    if(doc.GetElement(id) is ElementType)
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

        public static CompoundStructure GetCompoundStructure(List<ElementId> elemSet, Document doc)
        {
            //Always only 1 element. ElementSet used to make it compattible for both Element and ElementType
            try
            {
                foreach (ElementId id in elemSet)
                {
                    if(doc.GetElement(id) is ElementType)
                    {
                        ElementType elemType = (ElementType)doc.GetElement(id);
                        
                        //take first element out of elementtype
                        List<Element> collectorEF = new FilteredElementCollector(doc)
                            .WhereElementIsNotElementType()
                            .ToList<Element>();
                        List<Element> listEI = collectorEF.Where(q => q.GetTypeId() == elemType.Id).ToList<Element>();
                        Element instances = listEI[0];
                        CompoundStructure compoundStructure = null;

                        switch (elemType.Category.Name)
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

                        return compoundStructure;
                    }
                }
            } catch { }
            
            return null;
        }

        public static IfcMaterialLayer ifcMaterialLayer(CompoundStructureLayer layer, Document doc)
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
                return ifcMaterialLayer;
            }
            else
            {
                return null;
            }
        }
    }
}
