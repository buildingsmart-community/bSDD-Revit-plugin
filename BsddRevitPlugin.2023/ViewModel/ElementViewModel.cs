using System.Windows.Input;
using System.ComponentModel;
using System.Collections.Generic;
using System;
using BsddRevitPlugin._2023.Model;
using System.Collections.ObjectModel;
using BsddRevitPlugin._2023.Commands;
using BsddRevitPlugin._2023.View;

namespace BsddRevitPlugin._2023.ViewModel
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


 
