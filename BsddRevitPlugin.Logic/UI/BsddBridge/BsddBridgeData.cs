﻿using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{
    public static class GlobalSelection
    {
        // This list will store the last selected elements
        public static Dictionary<string, List<ElementType>> LastSelectedElementsWithDocs { get; private set; } = new Dictionary<string, List<ElementType>>();

    }
    public static class GlobalDocument
    {
        public static Document currentDocument;
    }
    public static class GlobalBsddSettings
    {
        public static BsddSettings bsddsettings = new BsddSettings();
    }
    public class BsddDictionary
    {
        [JsonProperty("ifcClassification")]
        public IfcClassification IfcClassification { get; set; }

        [JsonProperty("parameterMapping")]
        public string ParameterMapping { get; set; }
    }

    public class BsddSettings
    {
        [JsonProperty("bsddApiEnvironment")]
        public string BsddApiEnvironment { get; set; } = "production";

        [JsonProperty("mainDictionary")]
        public BsddDictionary MainDictionary { get; set; }

        [JsonProperty("filterDictionaries")]
        public List<BsddDictionary> FilterDictionaries { get; set; }

        [JsonProperty("language")]
        public string Language { get; set; }

        [JsonProperty("includeTestDictionaries")]
        public bool IncludeTestDictionaries { get; set; }
    }

    public class BsddBridgeData
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("settings")]
        public BsddSettings Settings { get; set; }

        [JsonProperty("ifcData")]
        public List<IfcEntity> IfcData { get; set; }

        /// <summary>
        /// Sets the main dictionary URI.
        /// </summary>
        /// <param name="domain">The domain of the main dictionary.</param>
        public void setDomain(string domain)
        {
            Settings.MainDictionary.IfcClassification.Location = new Uri( domain);
        }

        /// <summary>
        /// Adds a filter dictionary.
        /// </summary>
        /// <param name="dictionary">The dictionary to add.</param>
        public void addFilterDictionary(BsddDictionary dictionary)
        {
            Settings.FilterDictionaries.Add(dictionary);
        }

        /// <summary>
        /// Sets the main dictionary.
        /// </summary>
        /// <param name="dictionary">The dictionary to set.</param>
        public void setMainDictionary(BsddDictionary dictionary)
        {
            Settings.MainDictionary = dictionary;
        }

        /// <summary>
        /// Sets the filter dictionaries.
        /// </summary>
        /// <param name="dictionaries">The dictionaries to set.</param>
        public void setFilterDictionaries(List<BsddDictionary> dictionaries)
        {
            Settings.FilterDictionaries = dictionaries;
        }
    }
}
