using System.Reflection;

namespace BsddRevitPlugin.Resources
{
    /// <summary>
    /// Resource assembly helper methods
    /// </summary>
    public static class ResourceAssembly
    {
        /// <summary>
        /// Gets the current resource assembly
        /// </summary>
        /// <returns></returns>
        public static Assembly GetAssembly()
        {
            return Assembly.GetExecutingAssembly();
        }

        /// <summary>
        /// Gets the namespace of the currently running resource assembly
        /// </summary>
        /// <returns></returns>
        public static string GetNamespace()
        {
            return $"{typeof(ResourceAssembly).Namespace}.";
        }
    }
}
