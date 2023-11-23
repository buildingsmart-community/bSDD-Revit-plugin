using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.Model;
using ComboBox = System.Windows.Controls.ComboBox;
using System.ComponentModel;
using System.Windows.Interop;
using BSDDconnect = BsddRevitPlugin.Logic.UI.Wrappers;
using CefSharp;
using CefSharp.Wpf;
using BsddRevitPlugin.Logic.UI.Wrappers;
using System.Reflection;

/// <summary>
/// Event handler for the selection method combo box. Clears the element manager and raises the appropriate external event based on the selected item in the combo box.
/// </summary>
/// <param name="sender">The selection method combo box.</param>
/// <param name="e">The selection changed event arguments.</param>
namespace BsddRevitPlugin.Logic.UI.View
{
    // This class represents the main panel of the bSDD Revit plugin
    public partial class BsddSelection : Page, IDockablePaneProvider
    {
        // Declaration of events and external events
        BSDDconnect.EventMakeSelection SelectEHMS;
        BSDDconnect.EventSelectAll SelectEHSA;
        BSDDconnect.EventSelectView SelectEHSV;
        BSDDconnect.EventTest testEvent;
        BSDDconnect.EventHandlerBsddSearch testEvent2;
        ExternalEvent SelectEEMS, SelectEESA, SelectEESV, testExEvent, testExEvent2;


        // Data fields
        private Guid m_targetGuid = new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158");
        private DockPosition m_position = DockPosition.Floating;
        private int m_left = 100;
        private int m_right = 100;
        private int m_top = 100;
        private int m_bottom = 100;

        // Constructor
        public BsddSelection()
        {
            InitializeComponent();

            string addinLocation = Assembly.GetExecutingAssembly().Location;
            string addinDirectory = System.IO.Path.GetDirectoryName(addinLocation);

            // Set the address of the CefSharp browser component to the index.html file of the plugin
            Browser.Address = addinDirectory + "/html/bsdd_selection/index.html";
            Browser.JavascriptObjectRepository.Register("bsddBridge", new BsddBridge.BsddBridge(), true);
            Browser.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;
            
            // Sort the list of elements by category, family, and type
            PropertyGroupDescription groupDescription = new PropertyGroupDescription("Category");
            
            // Initialize the events and external events
            SelectEHMS = new BSDDconnect.EventMakeSelection();
            SelectEHMS.SetBrowser(Browser);
            SelectEHSA = new BSDDconnect.EventSelectAll();
            SelectEHSV = new BSDDconnect.EventSelectView();
            testEvent = new BSDDconnect.EventTest();
            testEvent2 = new BSDDconnect.EventHandlerBsddSearch();
            SelectEEMS = ExternalEvent.Create(SelectEHMS);
            SelectEESA = ExternalEvent.Create(SelectEHSA);
            SelectEESV = ExternalEvent.Create(SelectEHSV);
            testExEvent = ExternalEvent.Create(testEvent);
            testExEvent2 = ExternalEvent.Create(testEvent2);

            // Add the selection methods to the selection method combo box
            SM.Items.Add(new ComboBoxItem() { Content = "Selection method:", IsSelected = true, IsEnabled = false });
            SM.Items.Add(new ComboBoxItem() { Content = "Make selection" });
            SM.Items.Add(new ComboBoxItem() { Content = "Select all" });
            SM.Items.Add(new ComboBoxItem() { Content = "Select visible in view" });
            SM.SelectedItem = SM.Items[0];
        }

        // Implement the IDockablePaneProvider interface
        public void SetupDockablePane(Autodesk.Revit.UI.DockablePaneProviderData data)
        {
            data.FrameworkElement = this as FrameworkElement;
            data.InitialState = new Autodesk.Revit.UI.DockablePaneState();
            data.InitialState.DockPosition = m_position;
            DockablePaneId targetPane;
            if (m_targetGuid == Guid.Empty)
            {
                targetPane = null;
            }
            else
            {
                targetPane = new DockablePaneId(m_targetGuid);
            }
            if (m_position == DockPosition.Tabbed)
            {
                data.InitialState.TabBehind = Autodesk.Revit.UI.DockablePanes.BuiltInDockablePanes.ViewBrowser;
            }
            if (m_position == DockPosition.Floating)
            {
                data.InitialState.SetFloatingRectangle(new Autodesk.Revit.DB.Rectangle(0, 0, 100, 710));
            }
        }

        // Set the initial docking parameters of the panel
        public void SetInitialDockingParameters(int left, int right, int top, int bottom, DockPosition position, Guid targetGuid)
        {
            m_position = position;
            m_left = left;
            m_right = right;
            m_top = top;
            m_bottom = bottom;
            m_targetGuid = targetGuid;
        }
        
        //public async void ShowAndSendData(object data)
        //{
        //     Show the form
        //    this.Show();

        //     Serialize the data to a JSON string
        //    var jsonString = JsonConvert.SerializeObject(data);

        //     Create a JavaScript function call
        //    var jsFunctionCall = $"myJavaScriptFunction({jsonString});";

        //     Wait for the browser to be initialized
        //    if (!Browser.IsBrowserInitialized)
        //    {
        //        var tcs = new TaskCompletionSource<bool>();
        //        EventHandler handler = null;
        //        handler = (sender, args) =>
        //        {
        //            Browser.IsBrowserInitializedChanged -= handler;
        //            tcs.SetResult(true);
        //        };
        //        Browser.IsBrowserInitializedChanged += handler;
        //        await tcs.Task;
        //    }

        //     Execute the JavaScript function
        //    await Browser.ExecuteScriptAsync(jsFunctionCall);

        //}

        // Event handlers
        private void PaneInfoButton_Click(object sender, RoutedEventArgs e)
        {
            // TODO: Implement this method
        }

        private void wpf_stats_Click(object sender, RoutedEventArgs e)
        {
            // TODO: Implement this method
        }

        private void btn_getById_Click(object sender, RoutedEventArgs e)
        {
            // TODO: Implement this method
        }

        private void btn_listTabs_Click(object sender, RoutedEventArgs e)
        {
            // TODO: Implement this method
        }

        private void DockableDialogs_Loaded(object sender, RoutedEventArgs e)
        {
            // TODO: Implement this method
        }

        // Event handler for the selection method combo box
        private void SM_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // Clear the element manager
            ElemManager.Clear();

            // Raise the appropriate external event based on the selected item in the combo box
            if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Make selection")
            {
                SelectEEMS.Raise();
                //testExEvent.Raise
                //testExEvent2.Raise();


                ////Main.Instance.ShowbSDDSelector(commandData.Application);
            }
            else if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Select all")
            {
                SelectEESA.Raise();
            }
            else if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Select visible in view")
            {
                SelectEESV.Raise();
            };
        }

        void OnIsBrowserInitializedChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            if (Browser.IsBrowserInitialized)
            {
                Browser.ShowDevTools();
            }
        }
    }
}
