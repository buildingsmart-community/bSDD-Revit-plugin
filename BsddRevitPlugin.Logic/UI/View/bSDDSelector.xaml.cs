using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BSDDconnect = BsddRevitPlugin.Logic.UI.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace BsddRevitPlugin.Logic.UI.View
{
    /// <summary>
    /// Interaction logic for bSDDSelector.xaml
    /// </summary>
    public partial class bSDDSelector : Window
    {

        private readonly Document _doc;
        public static UIApplication UiApp;
        public static UIDocument UiDoc;

        // Declaration of events and external events
        BSDDconnect.EventTest testEvent;
        ExternalEvent SelectEEMS, SelectEESA, SelectEESV, testExEvent;
        
        public bSDDSelector()
        {


            InitializeComponent();

            // Initialize the events and external events
            testEvent = new BSDDconnect.EventTest();
            testExEvent = ExternalEvent.Create(testEvent);
        }

        private void Window_Closed(object sender, EventArgs e)
        {
            Close();
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            testExEvent.Raise();
            //EventHandlerTest.Raise("");
            MessageBox.Show("Button was clicked.");
        }
    }
}
