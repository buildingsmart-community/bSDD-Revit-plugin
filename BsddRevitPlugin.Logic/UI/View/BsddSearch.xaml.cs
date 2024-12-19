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
using System.Windows.Forms;

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

        private static double _width = 800;
        private static double _height = 800;
        private static double _left = 100;
        private static double _top = 100;

        public BsddSearch(BsddBridgeData bsddBridgeData, ExternalEvent bsddLastSelectionEvent)
        {

            _bsddLastSelectionEvent = bsddLastSelectionEvent;
            _browserService = GlobalServiceFactory.Factory.CreateBrowserService();
            InitializeComponent();

            // Set the window size and position using stored values
            this.Width = Settings.Default.SearchWindowWidth;
            this.Height = Settings.Default.SearchWindowHeight;
            this.Left = Settings.Default.SearchWindowLeft;
            this.Top = Settings.Default.SearchWindowTop;

            // Ensure the window is within the bounds of the current screen setup
            EnsureWindowIsVisible();

            string addinLocation = Assembly.GetExecutingAssembly().Location;
            string addinDirectory = System.IO.Path.GetDirectoryName(addinLocation);


            // Set the address of the CefSharp browser component to the index.html file of the plugin
            //_browserService.Address = "http://localhost:4173/bsdd_search";
            //_browserService.Address = "http://localhost:3000/bsdd_search";
            //_browserService.Address = "http://localhost:3000/bsdd_search";
            //_browserService.Address = "https://buildingsmart-community.github.io/bSDD-filter-UI/v1.4.0/bsdd_search/";
            _browserService.Address = "https://buildingsmart-community.github.io/bSDD-filter-UI/v1.6.0/bsdd_search/";
            _browserService.Address = "https://buildingsmart-community.github.io/bSDD-filter-UI/main/bsdd_search/";
            _browserService.Address = "https://buildingsmart-community.github.io/bSDD-filter-UI/v1.7.1/bsdd_search/";
            var bridgeSearch = new BsddSearchBridge(bsddBridgeData, _bsddLastSelectionEvent);
            bridgeSearch.SetParentWindow(this);
            _browserService.RegisterJsObject("bsddBridge", bridgeSearch, true);
            _browserService.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;

            // Handle the Closed event to store the window size and position
            this.Closed += Window_Closed;
        }

        private void Window_Closed(object sender, EventArgs e)
        {
            // Store the current window size and position
            Settings.Default.SearchWindowWidth = this.Width;
            Settings.Default.SearchWindowHeight = this.Height;
            Settings.Default.SearchWindowLeft = this.Left;
            Settings.Default.SearchWindowTop = this.Top;
            Settings.Default.Save();
        }
        private void EnsureWindowIsVisible()
        {
            bool isVisible = false;
            foreach (Screen screen in Screen.AllScreens)
            {
                if (screen.WorkingArea.Contains(new System.Drawing.Point((int)this.Left, (int)this.Top)))
                {
                    isVisible = true;
                    break;
                }
            }

            if (!isVisible)
            {
                // Reset to default values if the window is off-screen
                this.Left = 100;
                this.Top = 100;
            }
        }

        public void UpdateBsddBridgeData(BsddBridgeData bsddBridgeData)
        {
            _inputBsddBridgeData = bsddBridgeData;
        }

        public void UpdateEditSelection(BsddBridgeData ifcData)
        {
            var jsonString = JsonConvert.SerializeObject(ifcData);
            var jsFunctionCall = $"updateEditSelection({jsonString});";

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
