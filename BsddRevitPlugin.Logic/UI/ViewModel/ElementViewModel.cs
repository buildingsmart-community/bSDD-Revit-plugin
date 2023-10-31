using System.Windows.Input;

using System.Collections.ObjectModel;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.Commands;
using BsddRevitPlugin.Logic.UI.View;

namespace BsddRevitPlugin.Logic.UI.ViewModel
{
    public class ElementViewModel
    {
        public ObservableCollection<Elem> Elems {  get; set; }

        public ICommand ShowWindowCommand { get; set; }

        public ElementViewModel()
        {
            Elems = ElemManager.GetElem();

            ShowWindowCommand = new RelayCommand(ShowWindow, CanShowWindow);
        }

        private bool CanShowWindow(object obj)
        {
            return true;
        }

        private void ShowWindow(object obj)
        {
            CheckFamilyType CheckFamilyTypeWin = new CheckFamilyType();
            CheckFamilyTypeWin.Show();
        }
    }
}


 
