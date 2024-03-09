using ASRR.Core.Log;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.UI.View;
using NLog;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Windows.Threading;

namespace BsddRevitPlugin.Common
{
    public class Main
    {
        private static Main _instance;
        private static readonly object InstanceLock = new object();
        private static readonly Logger Log = LogManager.GetCurrentClassLogger();
        private string _openLogFilePath;


        private Main()
        {
            SetupLogs();

            Log.Trace($"Initialized bSDD Revit plugin");
        }

        internal static Main Instance
        {
            get
            {
                lock(InstanceLock)
                {
                    return _instance ?? (_instance = new Main());
                }
            }
        }

        private void SetupLogs()
        {
            var logTarget = CreateLogTarget();
            LogHandler.AddLogTarget(logTarget);
            _openLogFilePath = logTarget.LogFilePath;

            if (logTarget.OpenOnStartUp)
            {
                Process.Start(logTarget.LogFilePath);
            }
        }

        private NLogBasedLogConfiguration CreateLogTarget()
        {
            return new NLogBasedLogConfiguration
            {
                LogFilePath = "C:\\TEMP\\logs\\template\\main.log",
                LogName = "TemplateMainLog",
                MinLevel = "Trace",
                OpenOnStartUp = false,
                NameFilter = "*"
            };
        }

        public void OpenLogs()
        {
            if (_openLogFilePath != null)
            {
                if (!File.Exists(_openLogFilePath)) File.Create(_openLogFilePath);

                //Process.Start(_openLogFilePath);
            }
            else
            {
                TaskDialog.Show("Logs Unspecified", "No log filepath was specified.");
            }
        }
    }
}
