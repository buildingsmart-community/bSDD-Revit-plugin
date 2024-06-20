using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BsddRevitPlugin.Logic.UI.Translations
{
    public class LanguageConverter
    {
        public string Translate(string textParam, string language)
        {
            switch (language)
            {
                case "EN":
                    return new English().GetType().GetProperty(textParam)?.GetValue(new English()).ToString();
                case "nl-NL":
                    return new Dutch().GetType().GetProperty(textParam)?.GetValue(new Dutch()).ToString();
                default:
                    new Exception("Language not supported");
                    return new English().GetType().GetProperty(textParam)?.GetValue(new English()).ToString();
            }
        }
    }
    public class Dutch
    {
        // public string IFCExport_TaskDialogName { get; } = "IFC Common Property Sets";
        // public string IFCExport_TaskDialogMessage { get; } = "IFC Common Property Sets (PSets) staan aan in de exportinstellingen. Dit kan conflicten geven met de IFC Psets die zijn toegevoegd door de bSDD plugin. Wij adviseren de Revit IFC PSets te deactiveren. \r\r Wil je deze direct uitzetten voor deze export?";
    }

    public class English
    {
        // public string IFCExport_TaskDialogName { get; } = "IFC Common Property Sets";
        // public string IFCExport_TaskDialogMessage { get; } = "IFC Common Property Sets (PSets) were enabled. This can interfere with the IFC PSets added by the bSDD plugin. We advise you to disable the Revits IFC PSets. \r\r Would you like to disable this right now for this export?";
    }

}
