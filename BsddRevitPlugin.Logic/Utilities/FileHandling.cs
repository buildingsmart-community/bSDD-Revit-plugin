/**
 * File summary:
 * - File name: FileHandling.cs
 * - Description: Writes a Json file at an given filepath location
 * - Development history: 
 * - Copyright: Open Source
*/

#region ================== References ===================
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#endregion

#region ============ Namespace Declaration ============

namespace BsddRevitPlugin.Logic.Utilities {
    #region =================== Classes ===================
    /// <summary>
    /// Writes a Json file at an given filepath location
    /// </summary>
    public static class FileHandling
    {
        /// <summary>
        /// Writes a Json file at an given filepath location
        /// </summary>
        /// <param name="filepath">Location of output file</param>
        /// <param name="newJson">Json input for file</param>
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
    #endregion
}
#endregion