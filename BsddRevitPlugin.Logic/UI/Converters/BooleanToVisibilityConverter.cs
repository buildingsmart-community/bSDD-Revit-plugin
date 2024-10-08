using System;
using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace BsddRevitPlugin.Logic.UI.Converters
{
    public class BooleanToVisibilityConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is bool boolValue)
            {
                MessageBox.Show("1: " + boolValue.ToString());
                return boolValue ? Visibility.Visible : Visibility.Collapsed;
            }
            MessageBox.Show("2: " + value.ToString());
            return Visibility.Collapsed;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            MessageBox.Show("3: " + value.ToString());
            if (value is Visibility visibility)
            {
                return visibility == Visibility.Visible;
            }
            return false;
        }
    }
}
