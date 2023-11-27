﻿using Autodesk.Revit.DB;
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


        public BsddSearch()
        {

            InitializeComponent();

            string addinLocation = Assembly.GetExecutingAssembly().Location;
            string addinDirectory = System.IO.Path.GetDirectoryName(addinLocation);


            // Set the address of the CefSharp browser component to the index.html file of the plugin
            Browser.Address = addinDirectory + "/html/bsdd_search/index.html";
            Browser.JavascriptObjectRepository.Register("bsddBridge", new BsddBridge.BsddBridge(), true);
            Browser.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;

        }

        private void Window_Closed(object sender, EventArgs e)
        {
            Close();
        }

        //public async void ShowAndSendData(object data)
        //{
        //    // Show the form
        //    this.Show();

        //    // Serialize the data to a JSON string
        //    var jsonString = JsonConvert.SerializeObject(data);

        //    // Create a JavaScript function call
        //    var jsFunctionCall = $"myJavaScriptFunction({jsonString});";

        //    // Wait for the browser to be initialized
        //    if (!Browser.IsBrowserInitialized)
        //    {
        //        var tcs = new TaskCompletionSource<bool>();
        //        EventHandler handler = null;
        //        handler = (sender, args) =>
        //        {
        //            Browser.IsBrowserInitializedChanged -= handler;
        //            tcs.SetResult(true);
        //        };
        //        Browser.IsBrowserInitializedChanged += handler;
        //        await tcs.Task;
        //    }

        //    // Execute the JavaScript function
        //    Browser.ExecuteScriptAsync(jsFunctionCall);
        //}

        public void UpdateSelection(MainData ifcData)
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
                Browser.ExecuteScriptAsync("CefSharp.BindObjectAsync('bsddBridge');");
            }
        }
    }
}