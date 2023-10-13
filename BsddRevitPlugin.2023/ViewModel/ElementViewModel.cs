using System.Windows.Input;
using System.ComponentModel;
using System.Collections.Generic;
using System;
using BsddRevitPlugin._2023.Model;
using System.Collections.ObjectModel;

namespace BsddRevitPlugin._2023.ViewModel
{
    public class ElementViewModel
    {
        public ObservableCollection<Elem> Elems {  get; set; }

        public ElementViewModel()
        {
            Elems = ElemManager.GetElem();
        }

    }
}


 
