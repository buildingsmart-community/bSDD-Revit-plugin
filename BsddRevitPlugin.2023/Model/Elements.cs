/*
https://www.google.com/search?q=mvvm+wpf&oq=mvvm&gs_lcrp=EgZjaHJvbWUqBwgHEAAYgAQyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABNIBCDUyODRqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:292e5a84,vid:4v8PobcZpqM,st:0
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using Autodesk.Revit.DB;

namespace BsddRevitPlugin._2023.Model
{
    public class Elem //: INotifyPropertyChanged
    {
        //private Element elm;
        //private ElementId elemId;
        //private FamilyType famT;
        //private Family fam;
        
        public Elem()
        {
            
        }
        public enum CategoryType { Walls, Windows, Doors };
        
        public string Category { get; set; }

        public string Family { get; set; }

        public string Type { get; set; }

        public ElementId Id { get; set; }

        public CategoryType CatEnum { get; set; }

    }
}
