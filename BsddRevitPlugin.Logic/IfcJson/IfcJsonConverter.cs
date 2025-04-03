//TODO comments

#region ================== References ===================
using Autodesk.Revit.DB;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
#endregion

#region ============ Namespace Declaration ============
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
            JObject jsonObject = new JObject();
            // if reader is JArray than make it an JObject
            if (reader.TokenType == JsonToken.StartArray)
            {
                JArray jsonArray = JArray.Load(reader);
                foreach (JObject item in jsonArray)
                {
                    foreach (var property in item.Properties())
                    {
                        if (jsonObject[property.Name] != null)
                        {
                            jsonObject[property.Name] = property.Value;
                        }
                        else
                        {
                            jsonObject.Add(property.Name, property.Value);
                        }
                    }
                }
            }
            else
            {
                jsonObject = JObject.Load(reader);
                Console.WriteLine(jsonObject.ToString()); // Print the entire JSON object
            }

            IfcEntity ifcData = new IfcEntity();
            JObject firstElement = null;

            // Access the ifcData array            
            if ((JArray)jsonObject["ifcData"] != null)
            {
                JArray ifcDataArray = (JArray)jsonObject["ifcData"];
                firstElement = (JObject)ifcDataArray[0];
            }
            


            if (jsonObject["type"] != null || firstElement["type"] != null)
            {
                ifcData.Type = jsonObject["type"] != null ? (string)jsonObject["type"] : (string)firstElement["type"];
            }
            if (jsonObject["name"] != null || firstElement["name"] != null)
            {
                ifcData.Name = (string)jsonObject["name"] != null ? (string)jsonObject["name"] : (string)firstElement["name"];
            }
            if (jsonObject["typeId"] != null || firstElement["typeId"] != null)
            {
                ifcData.Tag = (string)jsonObject["typeId"] != null ? (string)jsonObject["typeId"] : (string)firstElement["typeId"];
            }
            if (jsonObject["description"] != null || firstElement["description"] != null)
            {
                ifcData.Description = (string)jsonObject["description"] != null ? (string)jsonObject["description"] : (string)firstElement["description"];
            }
            if (jsonObject["objectType"] != null || firstElement["objectType"] != null)
            {
                ifcData.ObjectType = (string)jsonObject["objectType"] != null ? (string)jsonObject["objectType"] : (string)firstElement["objectType"];
            }
            if (jsonObject["tag"] != null || firstElement["tag"] != null)
            {
                ifcData.Tag = (string)jsonObject["tag"] != null ? (string)jsonObject["tag"] : (string)firstElement["tag"];
            }
            if (jsonObject["predefinedType"] != null || firstElement["predefinedType"] != null)
            {
                ifcData.PredefinedType = (string)jsonObject["predefinedType"] != null ? (string)jsonObject["predefinedType"] : (string)firstElement["predefinedType"];
            }
            if (jsonObject["instance"] != null)
            {
                JToken token = jsonObject["instance"];
                bool instance = token.Value<bool>(); 
                if (instance)
                {
                    ifcData.Instance = true;
                }
                else
                {
                    ifcData.Instance = false;
                }
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
#endregion