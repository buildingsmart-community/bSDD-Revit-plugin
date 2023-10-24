/*
https://www.google.com/search?q=mvvm+wpf&oq=mvvm&gs_lcrp=EgZjaHJvbWUqBwgHEAAYgAQyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABNIBCDUyODRqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:292e5a84,vid:4v8PobcZpqM,st:0
*/

using Autodesk.Revit.DB;

namespace BsddRevitPlugin.Logic.Model
{

    public class ElementList
    {
        public Elements[] elements { get; set; }
    }

    public class Elements
    {
        public Hasassociation[] hasAssociations { get; set; }
        public Isdefinedby[] isDefinedBy { get; set; }
    }

    public class Hasassociation
    {
        public string type { get; set; }
        public string name { get; set; }
        public string location { get; set; }
        public string identification { get; set; }
        public Referencedsource referencedSource { get; set; }
    }

    public class Referencedsource
    {
        public string type { get; set; }
        public string name { get; set; }
    }

    public class Isdefinedby
    {
        public string type { get; set; }
        public string name { get; set; }
        public Hasproperty[] hasProperties { get; set; }
    }

    public class Hasproperty
    {
        public string type { get; set; }
        public string name { get; set; }
        public string specification { get; set; }
        public Nominalvalue nominalValue { get; set; }
    }

    public class Nominalvalue
    {
        public string type { get; set; }
        public object value { get; set; }
    }


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
