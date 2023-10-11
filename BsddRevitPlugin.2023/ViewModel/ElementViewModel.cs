using System.Windows.Input;
using System.ComponentModel;
using System.Collections.Generic;
using System;
using BsddRevitPlugin._2023.Model;

namespace BsddRevitPlugin._2023.ViewModel
{
    internal class ElementViewModel
    {
        private IList<Elem> _ElementsList;

        public ElementViewModel()
        {
            _ElementsList = new List<Elem>
            {
                //new Elem{ElemId = 1,Elm="Raj",FamT="Beniwal",Fam="Delhi"}
                new Elem{FamName="Kaas"},
                new Elem{FamName="Worst"},
                new Elem{FamName="Ham"}
            };
        }

        public IList<Elem> Elements
        {
            get { return _ElementsList; }
            set { _ElementsList = value; }
        }

        private ICommand mUpdater;
        public ICommand UpdateCommand
        {
            get
            {
                if (mUpdater == null)
                    mUpdater = new Updater();
                return mUpdater;
            }
            set
            {
                mUpdater = value;
            }
        }

        private class Updater : ICommand
        {
            #region ICommand Members  

            public bool CanExecute(object parameter)
            {
                return true;
            }

            public event EventHandler CanExecuteChanged;

            public void Execute(object parameter)
            {

            }

            #endregion
        }
    }
}


 
