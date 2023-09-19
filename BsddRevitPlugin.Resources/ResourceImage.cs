using System.IO;
using System.Windows.Media.Imaging;

namespace BsddRevitPlugin.Resources
{
    /// <summary>
    /// Gets the embedded resource image from the Resources assembly based on user provided file name with extension.
    /// Helper methods.
    /// </summary>
    public static class ResourceImage
    {
        /// <summary>
        /// Gets the icon image from resource assembly by specified name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static BitmapImage GetIcon(string name)
        {
            Stream stream = ResourceAssembly.GetAssembly().GetManifestResourceStream($"{ResourceAssembly.GetNamespace()}Images.Icons.{name}");

            BitmapImage image = new BitmapImage();

            image.BeginInit();
            image.StreamSource = stream;
            image.EndInit();

            return image;
        }
    }
}
