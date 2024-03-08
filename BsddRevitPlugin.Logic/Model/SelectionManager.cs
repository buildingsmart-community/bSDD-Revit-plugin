using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BsddRevitPlugin.Logic.Model
{
    public class SelectionManager
    {
        private IBrowserService browser;
        public void SetBrowser(IBrowserService browserObject)
        {
            browser = browserObject;
        }

        public void UpdateBsddLastSelection()
        {
            List<ElementType> lastSelection = new List<ElementType>();
            try
            {
                lastSelection = GlobalSelection.LastSelectedElementsWithDocs[GlobalDocument.currentDocument.PathName];

            }
            catch (Exception)
            {

            }
            var jsonString = JsonConvert.SerializeObject(ElementsManager.SelectionToIfcJson(GlobalDocument.currentDocument, lastSelection));
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (browser.IsBrowserInitialized)
            {
                browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }
    }
}
