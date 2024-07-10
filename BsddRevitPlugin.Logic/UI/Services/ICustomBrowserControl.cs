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
    public interface ICustomBrowserControl
    {
        void Navigate(string url);
    }
}
#endregion