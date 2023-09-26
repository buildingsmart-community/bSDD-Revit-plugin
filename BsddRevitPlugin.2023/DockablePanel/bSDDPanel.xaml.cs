using System;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media.Imaging;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Net;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using Microsoft.Win32;
using System.Windows.Navigation;
using System.Windows.Controls.Primitives;
using System.Reflection;
using System.Drawing;
using System.Configuration;
using System.Collections.Generic;
using Autodesk.Revit.UI;
using System.Text;
using APIUtility;
using System.Windows.Forms;
using ComboBox = System.Windows.Controls.ComboBox;
using Autodesk.Revit.DB.Electrical;
using Autodesk.Revit.DB;
using System.Windows.Shapes;
using System.Windows.Markup;
using bSDDconnect;

namespace DockableDialog.Forms
{
    /// <summary>
    /// Interaction logic for UserControl1.xaml
    /// </summary>
    public partial class bSDDPanel : Page, Autodesk.Revit.UI.IDockablePaneProvider
    {
        #region Data
        private Guid m_targetGuid = new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158");
        private DockPosition m_position = DockPosition.Floating;
        private int m_left = 100;
        private int m_right = 100;
        private int m_top = 100;
        private int m_bottom = 100;
        #endregion
        public bSDDPanel()
        {
            InitializeComponent();
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
                //data.InitialState.DockPosition = DockPosition.Tabbed;
            }
            System.Windows.MessageBox.Show("***Intial docking parameters***");
            System.Windows.MessageBox.Show(GetDockStateSummary(data.InitialState));
            //Log.Message("***Intial docking parameters***");
            //Log.Message(APIUtility.GetDockStateSummary(data.InitialState));
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

        /// <summary>
        /// Display docking state information as a string.
        /// </summary>
        public static string GetDockStateSummary(DockablePaneState paneState)
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            sb.AppendLine(" -DockablePaneState-");
            sb.AppendLine(" Left: " + paneState.FloatingRectangle.Left.ToString());
            sb.AppendLine(" Right: " + paneState.FloatingRectangle.Right.ToString());
            sb.AppendLine(" Top: " + paneState.FloatingRectangle.Top.ToString());
            sb.AppendLine(" Bottom: " + paneState.FloatingRectangle.Bottom.ToString());
            sb.AppendLine(" Position: " + paneState.DockPosition.ToString());
            sb.AppendLine(" Tab target guid:" + paneState.TabBehind.Guid.ToString());
            return (sb.ToString());
        }

        private void SM_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            string path = Assembly.GetExecutingAssembly().Location;
            var lijst = "";
            if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Make selection")
            {
                var elemList = new bSDDconnect.Command();
                new PushButtonData("Contact", "Contact", path, "Contact.Command");

                //ListBuilder(elemList);
                lijst = "hoi1";
            }
            else if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Select all")
            {
                var elemList = new bSDDconnect.Command();
                lijst = "hoi2";
            }
            else if (((ComboBoxItem)(((ComboBox)sender).SelectedItem)).Content.ToString() == "Select visable in view")
            {
                var elemList = new bSDDconnect.Command();
                lijst = "hoi3";
            };
            lb1.Content = lijst;
        }

        private void ListBuilder(List<Element> e)
        {
            //print
            StringBuilder sb = new StringBuilder();
            if (e != null && e.Count > 0)
            {
                foreach (Element elem in e)
                {
                    sb.Append("\n" + elem.Name);
                }
                TaskDialog.Show("Titel: ", sb.ToString());
            }
        }
    }
}
