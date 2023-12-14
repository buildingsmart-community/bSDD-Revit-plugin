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
            var bridgeSelection = new BsddBridge.BsddSelectionBridge();
            bridgeSelection.SetParentWindow(this);
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
                if (_inputBsddBridgeData == null || _inputBsddBridgeData.IfcData == null || _inputBsddBridgeData.IfcData[0] == null)
                {
                    return;
                }

                var jsonString = JsonConvert.SerializeObject(_inputBsddBridgeData.IfcData[0]);

                // Initialize the bridge and set the initial IfcEntity
                var script = @"
                    CefSharp.BindObjectAsync('bsddBridge').then(() => {
                        window.globalIfcEntity = " + jsonString + @";
                    });
                ";
                Browser.ExecuteScriptAsync(script);
            }
        }
    }
}
