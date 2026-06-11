using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.IfcJson;
using Newtonsoft.Json;
using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Windows;
using System.Windows.Media;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{
    public static class GlobalSelection
    {
        // This list will store the last selected elements
        public static Dictionary<string, List<ElementType>> LastSelectedElementsWithDocs { get; private set; } = new Dictionary<string, List<ElementType>>();

    }
    public static class GlobalDocument
    {

        public static Document currentDocument;
    }
    public static class GlobalBsddSettings
    {
        public static BsddSettings bsddsettings = new BsddSettings();
    }
    public class BsddDictionary
    {
        [JsonProperty("ifcClassification")]
        public IfcClassification IfcClassification { get; set; }

        [JsonProperty("parameterMapping")]
        public string ParameterMapping { get; set; }
    }

    public class BsddSettings
    {
        [JsonProperty("bsddApiEnvironment")]
        public string BsddApiEnvironment { get; set; } = "production";

        [JsonProperty("mainDictionary")]
        public BsddDictionary MainDictionary { get; set; }

        [JsonProperty("ifcDictionary")]
        public BsddDictionary IfcDictionary { get; set; }

        [JsonProperty("filterDictionaries")]
        public List<BsddDictionary> FilterDictionaries { get; set; }

        [JsonProperty("language")]
        public string Language { get; set; }

        [JsonProperty("includeTestDictionaries")]
        public bool IncludeTestDictionaries { get; set; }
    }

    public class BsddBridgeData
    {
        [JsonProperty("settings")]
        public BsddSettings Settings { get; set; }

        [JsonProperty("ifcData")]
        public List<IfcEntity> IfcData { get; set; }

        [JsonProperty("propertyIsInstanceMap")]
        public Dictionary<string, bool> PropertyIsInstanceMap { get; set; } //string = propertyset/property - for now just property

        [JsonProperty("displayScale")]
        public double? DisplayScale { get; set; }
    }

    /// <summary>
    /// Utility class for display scaling operations.
    /// </summary>
    public static class DisplayScaleUtility
    {
        // Base typography scale factor to correct Mantine (16px) to Revit (12px) baseline mismatch.
        // Empirically calibrated through visual comparison: 0.85 provides optimal visual parity without blur artifacts.
        private const double BaseTypographyFactor = 0.85;

        [DllImport("user32.dll")]
        private static extern uint GetDpiForWindow(IntPtr hWnd);

        /// <summary>
        /// Gets the current system display scale factor.
        /// For example: 1.0 for 96 DPI (100%), 1.25 for 120 DPI (125%), 1.5 for 144 DPI (150%), etc.
        /// Includes base typography factor (0.85) to align Mantine UI with Revit native text sizing.
        /// </summary>
        /// <returns>The display scale factor, or null if it cannot be determined.</returns>
        public static double? GetDisplayScale()
        {
            try
            {
                double dpiX = 96.0;

                // Most reliable in Revit: ask Windows for the effective DPI of Revit's main window.
                var mainWindowHandle = Process.GetCurrentProcess().MainWindowHandle;
                if (mainWindowHandle != IntPtr.Zero)
                {
                    try
                    {
                        var dpi = GetDpiForWindow(mainWindowHandle);
                        if (dpi > 0)
                        {
                            dpiX = dpi;
                        }
                    }
                    catch (EntryPointNotFoundException)
                    {
                        // Older Windows versions may not expose GetDpiForWindow.
                    }
                    catch (DllNotFoundException)
                    {
                        // Defensive fallback if user32 is unavailable.
                    }
                }

                // Fallback to WPF visual DPI when available.
                if (Math.Abs(dpiX - 96.0) < 0.01 && Application.Current != null && Application.Current.MainWindow != null)
                {
                    var dpiScale = VisualTreeHelper.GetDpi(Application.Current.MainWindow);
                    if (dpiScale.PixelsPerInchX > 0)
                    {
                        dpiX = dpiScale.PixelsPerInchX;
                    }
                }

                // Calculate scale factor: (DPI / 96) * 0.85 typography adjustment
                double scale = (dpiX / 96.0) * BaseTypographyFactor;
                return scale;
            }
            catch
            {
                // If we can't determine the scale, return null
                return null;
            }
        }
    }
}
