using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using Autodesk.Revit.DB;
using System.Collections.ObjectModel;
using System.Data;

namespace BsddRevitPlugin._2023.Model
{
    public class ElemManager
    {
        public static ObservableCollection<Elem> _DatabaseElem = new ObservableCollection<Elem>() 
        {
        };

        public static ObservableCollection<Elem> GetElem()
        {
            return _DatabaseElem;
        }

        public static void AddElem(Elem elem)
        {
            bool Unique = true;
            foreach (var item in _DatabaseElem) 
            {
                if(item.Type == elem.Type && item.Family == elem.Family)
                {
                    Unique = false;
                    break;
                }
            }
            if (Unique == true)
            {
                _DatabaseElem.Add(elem);
            }
        }

        public static void Clear()
        {
            _DatabaseElem.Clear();
        }
    }
}
