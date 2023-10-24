using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.ViewModel;
using System.Windows.Input;
using ComboBox = System.Windows.Controls.ComboBox;
using System.ComponentModel;

namespace BsddRevitPlugin.Logic.View
{
    /// <summary>
    /// Interaction logic for UserControl1.xaml
    /// </summary>
    public partial class bSDDPanel : Page, IDockablePaneProvider
    {

        //Declaration
        BSDDconnect.EventMakeSelection SelectEHMS;
        BSDDconnect.EventSelectAll SelectEHSA;
        BSDDconnect.EventSelectView SelectEHSV;
        ExternalEvent SelectEEMS, SelectEESA, SelectEESV;

        #region Data
        private Guid m_targetGuid = new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158");
        private DockPosition m_position = DockPosition.Floating;
        private int m_left = 100;
        private int m_right = 100;
        private int m_top = 100;
        private int m_bottom = 100;
        #endregion

        // constructor
        public bSDDPanel()
        {
            InitializeComponent();

            ElementViewModel elementViewModel = new ElementViewModel();
            this.DataContext = elementViewModel;
            lbxSelection.ItemsSource = elementViewModel.Elems;

            ////Sorteren van elementenlijst
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lbxSelection.ItemsSource);
            PropertyGroupDescription groupDescription = new PropertyGroupDescription("Category");
            view.GroupDescriptions.Add(groupDescription);
            view.SortDescriptions.Add(new SortDescription("Family", ListSortDirection.Ascending));
            view.SortDescriptions.Add(new SortDescription("Type", ListSortDirection.Ascending));
            
            ////initialazor
            SelectEHMS = new BSDDconnect.EventMakeSelection();
            SelectEHSA = new BSDDconnect.EventSelectAll();
            SelectEHSV = new BSDDconnect.EventSelectView();
            SelectEEMS = ExternalEvent.Create(SelectEHMS);
            SelectEESA = ExternalEvent.Create(SelectEHSA);
            SelectEESV = ExternalEvent.Create(SelectEHSV);
            
            SM.Items.Add(new ComboBoxItem() { Content = "Selection method:", IsSelected = true, IsEnabled = false });
            SM.Items.Add(new ComboBoxItem() { Content = "Make selection" });
            SM.Items.Add(new ComboBoxItem() { Content = "Select all" });
            SM.Items.Add(new ComboBoxItem() { Content = "Select visable in view" });
            SM.SelectedItem = SM.Items[0];
        }

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
        public void SetInitialDockingParameters(int left, int right, int top, int bottom, DockPosition position, Guid targetGuid)
        {
            m_position = position;
            m_left = left;
            m_right = right;
            m_top = top;
            m_bottom = bottom;
            m_targetGuid = targetGuid;
        }

        private void PaneInfoButton_Click(object sender, RoutedEventArgs e)
        {

        }

        private void wpf_stats_Click(object sender, RoutedEventArgs e)
        {

        }

        private void btn_getById_Click(object sender, RoutedEventArgs e)
        {

        }

        private void btn_listTabs_Click(object sender, RoutedEventArgs e)
        {

        }

        private void DockableDialogs_Loaded(object sender, RoutedEventArgs e)
        {

        }

        private void SM_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ElemManager.Clear();

            //Make the IExternalcommand happen
            if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Make selection")
            {
                SelectEEMS.Raise();
            }
            else if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Select all")
            {
                SelectEESA.Raise();
            }
            else if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Select visable in view")
            {
                SelectEESV.Raise();
            };
        }
    }
}
