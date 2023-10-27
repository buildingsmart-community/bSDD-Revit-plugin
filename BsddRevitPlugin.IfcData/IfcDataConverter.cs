using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace BsddRevitPlugin.IfcData
{
    public class IfcDataConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(IfcData);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject jsonObject = JObject.Load(reader);

            IfcData ifcData = new IfcData();

            ifcData.HasAssociations = new List<IfcClassificationReference>();
            ifcData.IsDefinedBy = new List<IfcPropertySet>();

            foreach (JObject item in jsonObject["hasAssociations"])
            {
                switch (item["type"].ToString())
                {
                    case "IfcClassificationReference":
                        ifcData.HasAssociations.Add(item.ToObject<IfcClassificationReference>());
                        break;
                }
            }

            foreach (JObject item in jsonObject["isDefinedBy"])
            {
                switch (item["type"].ToString())
                {
                    case "IfcPropertySet":
                        ifcData.IsDefinedBy.Add(item.ToObject<IfcPropertySet>());
                        break;
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