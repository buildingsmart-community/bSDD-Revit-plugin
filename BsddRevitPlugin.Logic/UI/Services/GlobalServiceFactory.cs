//TODO comments

#region ================== References ===================
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#endregion

#region ============ Namespace Declaration ============
namespace BsddRevitPlugin.Logic.UI.Services
{
    public static class GlobalServiceFactory
    {
        public static IServiceFactory Factory { get; set; }
    }
}
#endregion