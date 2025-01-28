using Autodesk.Revit.ApplicationServices;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Events;
using System;
using System.Linq;

namespace BsddRevitPlugin.UnitTesting.TestEnviorment
{
    public class DocumentOpener
    {
        private UIApplication _uiapp;
        private Action _onDocumentOpened;

        public DocumentOpener(UIApplication uiapp)
        {
            _uiapp = uiapp;
        }

        public void OpenDocument(string filePath, Action onDocumentOpened)
        {
            _onDocumentOpened = onDocumentOpened;
            _uiapp.Idling += OnIdling;

            Application app = _uiapp.Application;
            ModelPath modelPath = ModelPathUtils.ConvertUserVisiblePathToModelPath(filePath);
            OpenOptions openOptions = new OpenOptions();
            app.OpenDocumentFile(modelPath, openOptions);
        }

        private void OnIdling(object sender, IdlingEventArgs e)
        {
            _uiapp.Idling -= OnIdling;
            _onDocumentOpened?.Invoke();
        }
    }

    public class ViewCreator
    {
        public ViewPlan CreatePlanView(Document doc)
        {
            // Get View Family Type Id
            ViewFamilyType viewFamilyType = new FilteredElementCollector(doc)
                .OfClass(typeof(ViewFamilyType))
                .Cast<ViewFamilyType>()
                .FirstOrDefault();

            // Get a level to associate with the view
            Level level = new FilteredElementCollector(doc)
                .OfClass(typeof(Level))
                .Cast<Level>()
                .FirstOrDefault();

            if (level != null)
            {
                // Create a new plan view
                ViewPlan planView = ViewPlan.Create(doc, viewFamilyType.Id, level.Id);
                return planView;
            }
            return null;
        }
    }
}
