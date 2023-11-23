using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.UI.View;
using CefSharp;
using System;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Threading;
using UIFramework;

namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    public class Popup : IExternalCommand
    {

        ////// ModelessForm instance
        ////private BsddSearch _mainWindow;

        ////// Separate thread to run Ui on
        ////private Thread _uiThread;
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {

            //////if (!(_uiThread is null) && _uiThread.IsAlive) return;
            ////try
            ////{
            ////    //UI THREAD WERKT NIET

            ////    //_uiThread = new Thread(() =>
            ////    //{
            ////        SynchronizationContext.SetSynchronizationContext(
            ////            new DispatcherSynchronizationContext(
            ////                Dispatcher.CurrentDispatcher));
            ////        // The dialog becomes the owner responsible for disposing the objects given to it.
            ////        _mainWindow = new BsddSearch();
            ////        _mainWindow.Closed += (s, e) => Dispatcher.CurrentDispatcher.InvokeShutdown();
            ////        _mainWindow.Show();
            ////        Dispatcher.Run();
            ////    //});

            ////    //TaskDialog.Show("bSDD Revit plugin", "Looks like this worked! CvO");
            ////    return Result.Succeeded;
            ////}
            ////catch (Exception e)
            ////{
            ////    TaskDialog.Show("bSDD Revit plugin", $"Exception found: {e.Message}");
            ////    return Result.Failed;
            ////}
            return Result.Succeeded;
        }
    }
}
