using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace BsddRevitPlugin.Logic.IfcJson
{
    public class IfcJsonConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(IfcEntity);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject jsonObject = JObject.Load(reader);

            IfcEntity ifcData = new IfcEntity();

            if (jsonObject["type"] != null)
            {
                ifcData.Type = (string)jsonObject["type"];
            }
            if (jsonObject["name"] != null)
            {
                ifcData.Name = (string)jsonObject["name"];
            }
            if (jsonObject["description"] != null)
            {
                ifcData.Description = (string)jsonObject["description"];
            }
            if (jsonObject["objectType"] != null)
            {
                ifcData.ObjectType = (string)jsonObject["objectType"];
            }
            if (jsonObject["tag"] != null)
            {
                ifcData.Tag = (string)jsonObject["tag"];
            }
            if (jsonObject["predefinedType"] != null)
            {
                ifcData.PredefinedType = (string)jsonObject["predefinedType"];
            }

            if (jsonObject["hasAssociations"] != null)
            {
                ifcData.HasAssociations = new List<Association>();
                foreach (JObject item in jsonObject["hasAssociations"])
                {
                    switch (item["type"].ToString())
                    {
                        case "IfcClassificationReference":
                            ifcData.HasAssociations.Add(item.ToObject<IfcClassificationReference>());
                            break;
                        case "IfcMaterial":
                            ifcData.HasAssociations.Add(item.ToObject<IfcMaterial>());
                            break;
                    }
                }
            }
            
            if (jsonObject["isDefinedBy"] != null)
            {
                ifcData.IsDefinedBy = new List<IfcPropertySet>();
                foreach (JObject item in jsonObject["isDefinedBy"])
                {
                    IfcPropertySet propertySet = item.ToObject<IfcPropertySet>();
                    if (item["hasProperties"] != null)
                    {
                        propertySet.HasProperties = new List<IfcProperty>();
                        foreach (JObject propertyItem in item["hasProperties"])
                        {
                            switch (propertyItem["type"].ToString())
                            {
                                case "IfcPropertySingleValue":
                                    propertySet.HasProperties.Add(propertyItem.ToObject<IfcPropertySingleValue>());
                                    break;
                                case "IfcPropertyEnumeratedValue":
                                    propertySet.HasProperties.Add(propertyItem.ToObject<IfcPropertyEnumeratedValue>());
                                    break;
                            }
                        }
                    }
                    ifcData.IsDefinedBy.Add(propertySet);
                }
            }

            return ifcData;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}