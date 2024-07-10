//TODO comments

#region ================== References ===================
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
#endregion

#region ============ Namespace Declaration ============
namespace BsddRevitPlugin.Logic.UI.Services
{
    #region ================= Interfaces =================
    public interface IBrowserService
    {
        #region ================ Class methods ================
        /// <summary>
        /// Objects should have an url to load
        /// </summary>
        /// <param name="url">url input</param>
        void LoadUrl(string url);

        /// <summary>
        /// Objects should have an Java Script Object to Register
        /// </summary>
        /// <param name="name">Name of object</param>
        /// <param name="objectToBind">Selection</param>
        /// <param name="isAsync">Async function yes/no</param>
        void RegisterJsObject(string name, object objectToBind, bool isAsync = false);
        
        /// <summary>
        /// Java Script to execute Async
        /// </summary>
        /// <param name="script">Java Script</param>
        void ExecuteScriptAsync(string script);
        
        /// <summary>
        /// 
        /// </summary>
        void ShowDevTools();
        
        event DependencyPropertyChangedEventHandler IsBrowserInitializedChanged;
        
        
        bool IsBrowserInitialized { get; }
        string Address { get; set; }
        ICustomBrowserControl BrowserInstance { get; }
        object BrowserControl { get; }
        #endregion
    }
    #endregion
}
#endregion