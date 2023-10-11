using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using Autodesk.Revit.DB;

namespace BsddRevitPlugin._2023.Model
{
    public class Elem : INotifyPropertyChanged
    {
        private Element elm;
        private ElementId elemId;
        private FamilyType famT;
        private Family fam;
        private string famName;
        public string FamName
        {
            get
            {
                return famName;
            }
            set
            {
                famName = value;
                OnPropertyChanged("FamName");
            }
        }

        public Element Elm
        {
            get
            {
                return elm;
            }
            set
            {
                elm = value;
                OnPropertyChanged("Elem");
            }
        }

        public ElementId ElemId
        {
            get
            {
                return elemId;
            }
            set
            {
                elemId = value;
                OnPropertyChanged("ElemId");
            }
        }

        public FamilyType FamT
        {
            get
            {
                return famT;
            }
            set
            {
                famT = value;
                OnPropertyChanged("FamT");
            }
        }

        public Family Fam
        {
            get
            {
                return fam;
            }
            set
            {
                fam = value;
                OnPropertyChanged("Fam");
            }
        }

        #region INotifyPropertyChanged Members  

        public event PropertyChangedEventHandler PropertyChanged;
        private void OnPropertyChanged(string propertyName)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }
        #endregion
    }
}
