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
            return objectType == typeof(IfcData);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject jsonObject = JObject.Load(reader);

            IfcData ifcData = new IfcData();

            if (jsonObject["type"] != null)
            {
                ifcData.Type = (string)jsonObject["type"];
            }
            if (jsonObject["name"] != null)
            {
                ifcData.Name = (string)jsonObject["name"];
            }
            if (jsonObject["typeId"] != null)
            {
                ifcData.Tag = (string)jsonObject["typeId"];
            }
            if (jsonObject["description"] != null)
            {
                ifcData.Description = (string)jsonObject["description"];
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
                    switch (item["type"].ToString())
                    {
                        case "IfcPropertySet":
                            ifcData.IsDefinedBy.Add(item.ToObject<IfcPropertySet>());
                            break;
                    }
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