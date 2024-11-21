using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BsddRevitPlugin.Logic.IfcJson;

namespace BsddRevitPlugin.Logic.IfcJsonBuilders
{

    /// <summary>
    /// Builder of IfcEntity
    /// </summary>
    public class IfcEntityBuilder
    {
        private readonly IfcEntity _entity = new IfcEntity();


        public IfcEntityBuilder AddType(string type)
        {
            _entity.Type = type;
            return this;
        }

        public IfcEntityBuilder AddName(string name)
        {
            _entity.Name = name;
            return this;
        }

        public IfcEntityBuilder AddDescription(string description)
        {
            _entity.Description = description;
            return this;
        }

        public IfcEntityBuilder AddTag(string tag)
        {
            _entity.Tag = tag;
            return this;
        }

        public IfcEntityBuilder AddPredefinedType(string predefinedType)
        {
            _entity.PredefinedType = predefinedType;
            return this;
        }

        public IfcEntityBuilder AddHasAssociations(List<Association> associationList)
        {
            if (associationList.Count < 1)
            {
                associationList = new List<Association>();
            }

            _entity.HasAssociations = associationList;
            return this;
        }

        public IfcEntityBuilder AddIsDefinedBy(List<IfcPropertySet> ifcPropertySetList)
        {
            if (ifcPropertySetList.Count < 1)
            {
                ifcPropertySetList = new List<IfcPropertySet>();
            }

            _entity.IsDefinedBy = ifcPropertySetList;
            return this;
        }

        public IfcEntity Build()
        {
            return _entity;
        }
    }
    /// <summary>
    /// Builder of IfcMaterial
    /// </summary>
    public class IfcMaterialBuilder
    {
        private readonly IfcMaterial _entity = new IfcMaterial();

        public IfcMaterialBuilder AddName(string name)
        {
            _entity.Name = name;
            return this;
        }

        public IfcMaterialBuilder AddDescription(string description)
        {
            _entity.Description = description;
            return this;
        }

        public IfcMaterialBuilder AddCategory(string category)
        {
            _entity.Category = category;
            return this;
        }

        public IfcMaterialBuilder AddHasRepresentation(IfcMaterialDefinitionRepresentation hasRepresentation)
        {
            _entity.HasRepresentation = hasRepresentation;
            return this;
        }

        public IfcMaterialBuilder AddIsRelatedWith(IfcMaterialRelationship isRelatedWith)
        {
            _entity.IsRelatedWith = isRelatedWith;
            return this;
        }

        public IfcMaterialBuilder AddRelatesTo(IfcMaterialRelationship relatesTo)
        {
            _entity.RelatesTo = relatesTo;
            return this;
        }

        public IfcMaterial Build()
        {
            return _entity;
        }
    }
    /// <summary>
    /// Represents the bSDD data as an IFC object.
    /// based on IfcTypeProduct:
    /// https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTypeProduct.htm
    /// </summary>
}
