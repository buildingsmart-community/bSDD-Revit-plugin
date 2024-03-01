using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace BsddRevitPlugin.Logic.UI.Services
{
    public interface IBrowserService
    {
        void LoadUrl(string url);
        void RegisterJsObject(string name, object objectToBind, bool isAsync = false);
        void ExecuteScriptAsync(string script);
        event DependencyPropertyChangedEventHandler IsBrowserInitializedChanged;
        bool IsBrowserInitialized { get; }
        void ShowDevTools();
        string Address { get; set; }
        ICustomBrowserControl BrowserInstance { get; }
        object BrowserControl { get; }
    }
}
