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
        public string IFCExport_TaskDialogName { get; } = "IFC Common Property Sets";
        public string IFCExport_TaskDialogMessage { get; } = "Het exporteren van IFC Common Property Sets (PSets) staan uit in de exportinstellingen. Hierdoor kan het zijn dat je informatie mist in de IFC die wel uitgevraagd is. Wij adviseren de Revit IFC PSets te activeren. \r\r Wil je deze direct aanzetten voor deze export?";
    }

    public class English
    {
        public string IFCExport_TaskDialogName { get; } = "IFC Common Property Sets";
        public string IFCExport_TaskDialogMessage { get; } = "Exporting of IFC Common Property Sets (PSets) were disabled in the settings. This may result in parameters missing in your IFC. We advise you to enable the Revits IFC PSets. \r\r Would you like to disable this right now for this export?";
    }

}
