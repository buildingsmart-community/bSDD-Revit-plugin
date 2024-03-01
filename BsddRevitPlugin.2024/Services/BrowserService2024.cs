using BsddRevitPlugin.Logic.UI.Services;
using CefSharp;
using System.Windows;

namespace BsddRevitPlugin.V2024.Services
{
    public class BrowserService2024 : IBrowserService
    {
        private readonly ICustomBrowserControl customBrowserControl;
        private readonly CefSharp.Wpf.ChromiumWebBrowser chromiumWebBrowser;


        public BrowserService2024()
        {
            this.customBrowserControl = new BrowserControl2024();
            this.chromiumWebBrowser = (this.customBrowserControl as BrowserControl2024)?.ChromiumWebBrowser;
        }

        public ICustomBrowserControl BrowserInstance
        {
            get { return this.customBrowserControl; }
        }

        public CefSharp.Wpf.ChromiumWebBrowser ChromiumWebBrowser
        {
            get { return this.chromiumWebBrowser; }
        }
        public object BrowserControl
        {
            get { return this.chromiumWebBrowser; }
        }

        public string Address
        {
            get { return this.chromiumWebBrowser.Address; }
            set { this.chromiumWebBrowser.Address = value; }
        }

        public void LoadUrl(string url)
        {
            this.chromiumWebBrowser.Address = url;
        }

        public void RegisterJsObject(string name, object objectToBind, bool isAsync = false)
        {
            this.chromiumWebBrowser.JavascriptObjectRepository.Register(name, objectToBind, isAsync);
        }

        public void ExecuteScriptAsync(string script)
        {
            this.chromiumWebBrowser.ExecuteScriptAsync(script);
        }
        public void ShowDevTools()
        {
            this.chromiumWebBrowser.ShowDevTools();
        }

        public event DependencyPropertyChangedEventHandler IsBrowserInitializedChanged
        {
            add { this.chromiumWebBrowser.IsBrowserInitializedChanged += value; }
            remove { this.chromiumWebBrowser.IsBrowserInitializedChanged -= value; }
        }

        public bool IsBrowserInitialized => this.chromiumWebBrowser.IsBrowserInitialized;
    }
}
