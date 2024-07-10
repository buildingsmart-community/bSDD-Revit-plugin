//TODO comments
/**
 * File summary:
 * - File name: RelayCommand.cs
 * - Description: 
 * - Development history: 
 * - Copyright: Open Source
*/

#region ================== References ===================
using System;
using System.Windows.Input;
#endregion

#region ============ Namespace Declaration ============
namespace BsddRevitPlugin.Logic.Commands
{
    #region ============= Class: RelayCommand =============
    public class RelayCommand : ICommand
    {
        #region ================= Constructor =================
        public RelayCommand(Action<object> executeMethod, Predicate<object> canExecuteMethod)
        {
            _Execute = executeMethod;
            _CanExecute = canExecuteMethod;
        }
        #endregion

        public event EventHandler CanExecuteChanged;

        private Action<Object> _Execute {  get; set; }
        private Predicate<Object> _CanExecute { get; set; }

        public bool CanExecute(object parameter)
        {
            return _CanExecute(parameter);
        }

        public void Execute(object parameter)
        {
            _Execute(parameter);
        }
    }
    #endregion
}
#endregion