using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
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
using BsddRevitPlugin.Logic.IfcJson;
using Newtonsoft.Json;
using BsddRevitPlugin.Logic.UI.Wrappers;
using System.Reflection;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.Services;

namespace BsddRevitPlugin.Logic.UI.View
{
    /// <summary>
    /// Interaction logic for BsddSearch.xaml
    /// </summary>
    public partial class BsddSearch : Window
    {
        private readonly IBrowserService _browserService;

        private readonly Document _doc;
        public static UIApplication UiApp;
        public static UIDocument UiDoc;
        private BsddBridgeData _inputBsddBridgeData;
        private ExternalEvent _bsddLastSelectionEvent;

        public BsddSearch(BsddBridgeData bsddBridgeData, ExternalEvent bsddLastSelectionEvent)
        {
            _bsddLastSelectionEvent = bsddLastSelectionEvent;
            _browserService = GlobalServiceFactory.Factory.CreateBrowserService();
            InitializeComponent();

            string addinLocation = Assembly.GetExecutingAssembly().Location;
            string addinDirectory = System.IO.Path.GetDirectoryName(addinLocation);


            // Set the address of the CefSharp browser component to the index.html file of the plugin
            //_browserService.Address = "https://buildingsmart-community.github.io/bSDD-filter-UI/main/bsdd_search/";
            //_browserService.Address = "http://localhost:4173/bsdd_search";
            //_browserService.Address = "http://localhost:3000/bsdd_search";
            //_browserService.Address = "http://localhost:3000/bsdd_search";
            _browserService.Address = "https://buildingsmart-community.github.io/bSDD-filter-UI/v1.4.0/bsdd_search/";
            var bridgeSearch = new BsddSearchBridge(bsddBridgeData, _bsddLastSelectionEvent);
            bridgeSearch.SetParentWindow(this);
            _browserService.RegisterJsObject("bsddBridge", bridgeSearch, true);
            _browserService.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;
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

            if (_browserService.IsBrowserInitialized)
            {
                _browserService.ExecuteScriptAsync(jsFunctionCall);
            }
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            BrowserContainer.Children.Add((UIElement)_browserService.BrowserControl);
        }

        void OnIsBrowserInitializedChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            if (_browserService.IsBrowserInitialized)
            {
#if DEBUG
                _browserService.ShowDevTools();
#endif
                _browserService.ExecuteScriptAsync("CefSharp.BindObjectAsync('bsddBridge');");
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
