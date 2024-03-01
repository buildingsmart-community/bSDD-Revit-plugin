using BsddRevitPlugin.Logic.UI.Services;
using CefSharp.Wpf;
using System.Windows.Controls;

namespace BsddRevitPlugin.V2024.Services
{
    public class BrowserControl2024 : Control, ICustomBrowserControl
    {
        public ChromiumWebBrowser ChromiumWebBrowser { get; private set; }

        public BrowserControl2024()
        {
            this.ChromiumWebBrowser = new CefSharp.Wpf.ChromiumWebBrowser();
        }

        public void Navigate(string url)
        {
            this.ChromiumWebBrowser.Address = url;
        }

    }
}
