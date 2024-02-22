using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BSDDconnect = BsddRevitPlugin.Logic.UI.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using CefSharp;
using BsddRevitPlugin.Logic.IfcJson;
using Newtonsoft.Json;
using BsddRevitPlugin.Logic.UI.Wrappers;
using System.Reflection;
using BsddRevitPlugin.Logic.UI.BsddBridge;

namespace BsddRevitPlugin.Logic.UI.View
{
    /// <summary>
    /// Interaction logic for BsddSearch.xaml
    /// </summary>
    public partial class BsddSearch : Window
    {

        private readonly Document _doc;
        public static UIApplication UiApp;
        public static UIDocument UiDoc;
        private BsddBridgeData _inputBsddBridgeData;

        public BsddSearch()
        {

            InitializeComponent();

            string addinLocation = Assembly.GetExecutingAssembly().Location;
            string addinDirectory = System.IO.Path.GetDirectoryName(addinLocation);


            // Set the address of the CefSharp browser component to the index.html file of the plugin
            Browser.Address = addinDirectory + "/html/bsdd_search/index.html";
            var bridgeSearch = new BsddBridge.BsddSearchBridge();
            bridgeSearch.SetParentWindow(this);
            Browser.JavascriptObjectRepository.Register("bsddBridge", bridgeSearch, true);
            Browser.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;

        }

        private void Window_Closed(object sender, EventArgs e)
        {
            Close();
        }


        public void UpdateBsddBridgeData(BsddBridgeData bsddBridgeData)
        {
            _inputBsddBridgeData = bsddBridgeData;
        }

        public void UpdateSelection(BsddBridgeData ifcData)
        {
            var jsonString = JsonConvert.SerializeObject(ifcData);
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (Browser.IsBrowserInitialized)
            {
                Browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }

        void OnIsBrowserInitializedChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            if (Browser.IsBrowserInitialized)
            {
                Browser.ShowDevTools();
                if (_inputBsddBridgeData == null || _inputBsddBridgeData.IfcData == null || _inputBsddBridgeData.IfcData.Count == 0)
                {
                    return;
                }

                var bsddApiEnvironment = _inputBsddBridgeData.Settings.BsddApiEnvironment;
                var mainDictionary = _inputBsddBridgeData.Settings.MainDictionary;


                var ifcEntity = _inputBsddBridgeData.IfcData[0];
                var ifcEntityName = ifcEntity.Name;

                var domain = new Domain
                {
                    value = mainDictionary.IfcClassification.Location.ToString(),
                    label = mainDictionary.IfcClassification.Name,
                };

                Search defaultSearch = null;

                // iterate over the ifcEntity hasAssociations, for every one with type == IfcClassificationReference, check if its referencedSource is the same as the domainUri then set the defaultSearch to that classificationReference it's location(value) and name(label)
                ifcEntity.HasAssociations.ForEach(association =>
                {
                    if (association.Type == "IfcClassificationReference")
                    {
                        var classificationReference = association as IfcClassificationReference;
                        if (classificationReference != null && classificationReference.ReferencedSource != null && classificationReference.ReferencedSource.Location != null)
                        {
                            if (classificationReference.ReferencedSource.Location == mainDictionary.IfcClassification.Location)
                            {
                                defaultSearch = new Search
                                {
                                    value = classificationReference.Location?.ToString(),
                                    label = classificationReference.Name,
                                };
                            }
                        }
                    }
                });


                var bsddSearchConfig = new BsddSearchConfig
                {
                    baseUrl = bsddApiEnvironment,
                    defaultDomains = new List<Domain>
                    {
                        domain
                    },
                    defaultSearch = defaultSearch,
                    ifcEntity = ifcEntity
                };

                var jsonString = JsonConvert.SerializeObject(_inputBsddBridgeData.IfcData[0]);
                var bsddSearchConfigJson = JsonConvert.SerializeObject(bsddSearchConfig);

                // Initialize the bridge and set the initial IfcEntity
                var script = @"
                    function callback(ifcProduct) {
                        console.log(ifcProduct);

                        // @ts-ignore
                        window?.bsddBridge?.save(JSON.stringify(ifcProduct)).then(function (actualResult) {
                        console.log('Sent to Revit', actualResult);
                        });
                    }

                    document.addEventListener('DOMContentLoaded', function() {
                        CefSharp.BindObjectAsync('bsddBridge').then(() => {
                            const root = document.getElementById('bsdd');
                            BsddSearch.insertBsddSearch(root, callback, " + bsddSearchConfigJson + @");
                            // window.globalIfcEntity = " + jsonString + @";
                        });
                    });
                ";
                Browser.ExecuteScriptAsync(script);
            }
        }

        public class BsddSearchConfig
        {
            public string baseUrl { get; set; }
            public List<Domain> defaultDomains { get; set; }
            public Search defaultSearch { get; set; }
            public IfcEntity ifcEntity { get; set; }
        }

        public class Domain
        {
            public string value { get; set; }
            public string label { get; set; }
        }

        public class Search
        {
            public string value { get; set; }
            public string label { get; set; }
        }
    }
}
