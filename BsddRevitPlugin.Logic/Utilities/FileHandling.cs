using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BsddRevitPlugin.Logic.Utilities { 
    public static class FileHandling
    {

        public static void WriteToJson(string filepath, JObject newJson)
        {
            // write JSON directly to a file
            using (StreamWriter file = File.CreateText($@"{filepath}"))
            using (JsonTextWriter writer = new JsonTextWriter(file))
            {
                writer.Formatting = Formatting.Indented;
                newJson.WriteTo(writer);
            }
        }
    }
}

