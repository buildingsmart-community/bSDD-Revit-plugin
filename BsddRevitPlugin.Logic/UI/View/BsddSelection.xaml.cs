using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using Autodesk.Revit.UI;
using ComboBox = System.Windows.Controls.ComboBox;
using BsddRevitPlugin.Logic.UI.Wrappers;
using System.Reflection;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using Newtonsoft.Json;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.Services;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Globalization;
using System.Net.Sockets;
using static Autodesk.Revit.DB.SpecTypeId;
using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.Commands;

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
        private SelectionMode _selectionMode;
        private readonly IBrowserService _browserService;




        public void CheckSelectionMode(UIDocument uidoc, SelectionMode selectionMode)
        {
            // Example method to check selection mode
            selectionMode.IsInSelectionMode = uidoc.Selection.GetElementIds().Count > 0;
        }

        private void ToggleButtonVisibility(object sender, RoutedEventArgs e)
        {
            if (DataContext is SelectionMode buttonsVisible)
            {
                buttonsVisible.IsInSelectionMode = !buttonsVisible.IsInSelectionMode;
            }
        }

        public void ToggleVisibility(bool boolean)
        {
            if (DataContext is SelectionMode buttonsVisible)
            {
                buttonsVisible.IsInSelectionMode = boolean;
            }
        }

        

        public class RevitEventHandler : IExternalEventHandler
        {
            private SelectionMode _selectionMode;
            private UIDocument _uidoc;

            public RevitEventHandler(UIDocument uidoc, SelectionMode selectionMode)
            {
                _uidoc = uidoc;
                _selectionMode = selectionMode;
            }

            public void Execute(UIApplication app)
            {
                _selectionMode.IsInSelectionMode = _uidoc.Selection.GetElementIds().Count > 0;
            }

            public string GetName()
            {
                return "Revit Selection Mode Handler";
            }
        }









        // Declaration of events and external events
        EventMakeSelection SelectEHMS;
        EventSelectAll SelectEHSA;
        EventSelectView SelectEHSV;
        EventUseLastSelection eventUseLastSelection;
        EventSelectionMode_Finish eventSelectionMode_Finish;
        EventSelectionMode_Cancel eventSelectionMode_Cancel;
        ExternalEvent SelectEEMS, SelectEESA, SelectEESV, SelectEULS, SelectMode_Finish, SelectMode_Cancel;
        UpdateUIonSave updateUIEvent;
        private BsddBridgeData _inputBsddBridgeData;

        // Data fields
        public class SelectionMode : INotifyPropertyChanged
        {
            private bool _isInSelectionMode = false; // Initialize to false
            public bool IsInSelectionMode
            {
                get { return _isInSelectionMode; }
                set
                {
                    if (_isInSelectionMode != value)
                    {
                        _isInSelectionMode = value;
                        OnPropertyChanged(nameof(IsInSelectionMode));
                    }
                }
            }

            public event PropertyChangedEventHandler PropertyChanged;
            protected void OnPropertyChanged([CallerMemberName] string name = null)
            {
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
            }
        }
        private Guid m_targetGuid = new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158");
        private DockPosition m_position = DockPosition.Floating;
        private int m_left = 100;
        private int m_right = 100;
        private int m_top = 100;
        private int m_bottom = 100;

        // Constructor
        public BsddSelection(IBrowserService browserService)
        {
            _browserService = browserService;
            InitializeComponent();
            _selectionMode = new SelectionMode();
            DataContext = _selectionMode;

            /*RevitEventHandler handler = new RevitEventHandler(uidoc, _selectionMode);
            _externalEvent = ExternalEvent.Create(handler);

            // Subscribe to the Idling event
            uidoc.Application.Idling += OnIdling;*/

            string addinLocation = Assembly.GetExecutingAssembly().Location;
            string addinDirectory = System.IO.Path.GetDirectoryName(addinLocation);

            updateUIEvent = new UpdateUIonSave();
            updateUIEvent.SetBrowser(_browserService);

            // Initialize the events
            eventSelectionMode_Finish = new EventSelectionMode_Finish();
            eventSelectionMode_Cancel = new EventSelectionMode_Cancel();
            SelectEHMS = new EventMakeSelection();
            SelectEHSA = new EventSelectAll();
            SelectEHSV = new EventSelectView();
            eventUseLastSelection = new EventUseLastSelection();

            // Give current browser to event
            SelectEHMS.SetBrowser(_browserService);
            SelectEHSA.SetBrowser(_browserService);
            SelectEHSV.SetBrowser(_browserService);
            eventUseLastSelection.SetBrowser(_browserService);

            // Initialize external events
            SelectMode_Finish = ExternalEvent.Create(eventSelectionMode_Finish);
            SelectMode_Cancel = ExternalEvent.Create(eventSelectionMode_Cancel);
            SelectEEMS = ExternalEvent.Create(SelectEHMS);
            SelectEESA = ExternalEvent.Create(SelectEHSA);
            SelectEESV = ExternalEvent.Create(SelectEHSV);
            SelectEULS = ExternalEvent.Create(eventUseLastSelection);

            // Set the address of the CefSharp browser component to the index.html file of the plugin
            //_browserService.Address = "http://localhost:4173/bsdd_selection";
            //_browserService.Address = "http://localhost:3001/bsdd_selection";
            _browserService.Address = "https://buildingsmart-community.github.io/bSDD-filter-UI/v1.5.0/bsdd_selection/";
            //_browserService.Address = "https://buildingsmart-community.github.io/bSDD-filter-UI/main/bsdd_selection/";
            _browserService.RegisterJsObject("bsddBridge", new BsddSelectionBridge(SelectEULS, updateUIEvent), true);
            _browserService.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;

            // Sort the list of elements by category, family, and type
            PropertyGroupDescription groupDescription = new PropertyGroupDescription("Category");

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

        public void UpdateSettings(BsddSettings settings)
        {
            var jsonString = JsonConvert.SerializeObject(settings);
            var jsFunctionCall = $"updateSettings({jsonString});";

            if (_browserService.IsBrowserInitialized)
            {
                _browserService.ExecuteScriptAsync(jsFunctionCall);
            }
        }

        // Event handlers
        private void PaneInfoButton_Click(object sender, RoutedEventArgs e)
        {
            // TODO: Implement this method
        }
        private void Click_Finish(object sender, RoutedEventArgs e)
        {
            UIApplication uiapp = getUIapp();
            
            // Post the finish command
            RevitCommandId finishCommandId = RevitCommandId.LookupPostableCommandId(PostableCommand.Finish);
            uiapp.PostCommand(finishCommandId);

            ToggleVisibility(false);
            SelectMode_Finish.Raise();
        }
        private void Click_Cancel(object sender, RoutedEventArgs e)
        {
            ToggleVisibility(false);
            SelectMode_Cancel.Raise();
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
            if (!BrowserContainer.Children.Contains((UIElement)_browserService.BrowserControl))
            {
                BrowserContainer.Children.Add((UIElement)_browserService.BrowserControl);
            }
        }

        // Event handler for the selection method combo box
        private void SM_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // Raise the appropriate external event based on the selected item in the combo box
            if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Make selection")
            {
                SelectEEMS.Raise();
                ToggleVisibility(true);
            }
            else if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Select all")
            {
                SelectEESA.Raise();
                ToggleVisibility(false);
            }
            else if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Select visible in view")
            {
                SelectEESV.Raise();
                ToggleVisibility(false);
            };
        }

        private void SM_DropDownOpened(object sender, EventArgs e)
        {
            // Your code to handle the ComboBox dropdown opening
            SM.SelectedItem = SM.Items[0];
        }

        void OnIsBrowserInitializedChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            //var settings = GlobalBsddSettings.bsddsettings;
            //if (settings.BsddApiEnvironment == null)
            //{
            //    SettingsManager.LoadDefaultSettings();
            //    SettingsManager.ApplySettingsToGlobalParametersAndDataStorage(GlobalDocument.currentDocument);
            //}
            if (_browserService.IsBrowserInitialized)
            {
#if DEBUG

                _browserService.ShowDevTools();
#endif
                _browserService.ExecuteScriptAsync("CefSharp.BindObjectAsync('bsddBridge');");
            }
        }
    }
}
