using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace BsddRevitPlugin.Logic.Classifications
{
    public static class RevitMapping
    {
        public static Dictionary<string, Guid> Mapping { get; set; } = new Dictionary<string, Guid>()
        {
            {"IfcName", new Guid("d6ddeaaa-ca8a-4602-a2db-5ed247c66beb")    },
            {"IfcDescription", new Guid("06759d2b-d5f3-406a-91ba-574d390d07b9")    },
            {"IsExternal", new Guid("576da907-5f75-40ce-a0c1-572ca690fc1b")    },
            {"FireRating", new Guid("6af66917-fcb5-441c-8e47-1ec63ce387fa")    },
            {"LoadBearing", new Guid("61ac94f8-e1d0-4ce1-987e-19ce530dbb9e")    },
            {"IfcExportType", new Guid("765c61bc-7588-4846-bfef-befb28681767")},
            {"IfcExportAs", new Guid("f53d1285-ae3d-4992-a3f1-2e7978be529a") },
            {"nlsfb2005-2.2", new Guid("f53d1285-ae3d-4992-a3f1-2e7978be529b") },
            {"volkerwesselsbv-0.1", new Guid("f53d1285-ae3d-4992-a3f1-2e7978be529c") },
            {"naakt-0.1",   new Guid("f53d1285-ae3d-4992-a3f1-2e7978be529d") },
            {"volume",   new Guid("f53d1285-ae3d-4992-a3f1-2e7978be529e") }
        };

        public static Guid? getParameterGuid(string parameterName)
        {
            Guid parameterGuid;
            if (Mapping.TryGetValue(parameterName, out parameterGuid))
            {
                return parameterGuid;
            }
            else
            {
                return null;
            }
        }
    }
}
