using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.Classifications;
using Revit.IFC.Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BsddRevitPlugin.Logic.Classifications
{
    internal class RevitClassificationHelper
    {
        private Document document;
        public RevitClassificationHelper(Document document)
        {
            this.document = document;
        }

        public string writeClassification(Transaction transaction, Element element, ElementType elementType, Classifier.bSDD_Classification classification)
        {
            string entityDescription = null;

            //ElementType elementType = doc.GetElement(element.GetTypeId()) as ElementType;
            Parameter revitParameter = elementType.get_Parameter(BuiltInParameter.UNIFORMAT_CODE);

            // https://github.com/Autodesk/revit-ifc/blob/master/Source/IFCExporterUIOverride/IFCClassificationUI.xaml.cs
            // https://github.com/Autodesk/revit-ifc/blob/master/Source/Revit.IFC.Common/Extension/IFCClassification.cs

            IFCClassification m_newClassification = new IFCClassification();
            IList<IFCClassification> m_newClassificationList = new List<IFCClassification>();
            IList<IFCClassification> m_oldClassificationList = new List<IFCClassification>();
            IFCClassification m_savedClassification = new IFCClassification();

            /// Initialization of the Classification Tab when there is saved item
            bool hasSavedItem = BsddRevitPlugin.Logic.Classifications.IFCClassificationMgr.GetSavedClassifications(document, null, out m_oldClassificationList);

            if (hasSavedItem == true)
            {
                foreach (IFCClassification cls in m_oldClassificationList)
                {
                    if (cls.ClassificationName == classification.ClassificationName)
                    {
                        m_savedClassification = cls.Clone();
                        //m_newClassificationList.Add(m_newClassification);
                    }
                    else
                    {
                        //m_newClassificationList.Add(cls);
                    }
                }
            }

            if (m_newClassification.ClassificationEditionDate <= DateTime.MinValue || m_newClassification.ClassificationEditionDate >= DateTime.MaxValue)
            {
                DateTime today = DateTime.Now;
                m_newClassification.ClassificationEditionDate = today;
            }

            m_newClassification.ClassificationName = classification.ClassificationName;
            m_newClassificationList.Add(m_newClassification);

            // Update Classification if it has changed or the mandatory fields are filled. If mandatory fields are not filled we will ignore the classification.
            //if (!m_newClassification.IsUnchanged(m_savedClassification))
            //{
            if (!m_newClassification.AreMandatoryFieldsFilled())
            {
                fillMandatoryFields(m_newClassification);

                //Classifier.ClassifyElement(doc, classification, parameter);

                Guid? classificationGuid = RevitMapping.getParameterGuid(classification.ClassificationName);
                if (classificationGuid != null)
                {
                    revitParameter = elementType.get_Parameter((Guid)classificationGuid);
                    Classifier.ClassifyIfcEntity(document, classification, revitParameter);
                }
            }
            BsddRevitPlugin.Logic.Classifications.IFCClassificationMgr.UpdateClassifications(document, transaction, m_newClassificationList);
            //}
            hasSavedItem = BsddRevitPlugin.Logic.Classifications.IFCClassificationMgr.GetSavedClassifications(document, null, out m_oldClassificationList);
            if (classification.ClassificationName == "IFC")
            {

                Guid? parameterGuid = RevitMapping.getParameterGuid("IfcExportAs");
                if (parameterGuid != null)
                {
                    revitParameter = elementType.get_Parameter((Guid)parameterGuid);
                }
                Classifier.ClassifyIfcEntity(document, classification, revitParameter);
            }
            else if (entityDescription == null)
            {

                Guid? parameterGuid = RevitMapping.getParameterGuid("IfcDescription");
                if (parameterGuid != null)
                {
                    revitParameter = elementType.get_Parameter((Guid)parameterGuid);
                }
                Classifier.ClassifyIfcEntity(document, classification, revitParameter);

                Guid? parameterNameGuid = RevitMapping.getParameterGuid("IfcName");
                if (parameterGuid != null)
                {
                    revitParameter = elementType.get_Parameter((Guid)parameterNameGuid);
                }
                Classifier.ClassifyIfcEntity(document, classification, revitParameter);

                entityDescription = classification.ClassificationName;
                BuiltInParameter paraIndex = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                revitParameter = elementType.get_Parameter(paraIndex);
                Classifier.ClassifyIfcEntity(document, classification, revitParameter);
            }
            return entityDescription;
        }

        /// <summary>
        /// If any of the mandatory fields have been modified, it adds a default blank value to the empty field.
        /// </summary>
        /// <param name="IFCClassification"></param>
        private void fillMandatoryFields(IFCClassification newClassification)
        {
            if (String.IsNullOrWhiteSpace(newClassification.ClassificationName))
            {
                newClassification.ClassificationName = "";
            }
            if (String.IsNullOrWhiteSpace(newClassification.ClassificationSource))
            {
                newClassification.ClassificationSource = "";
            }
            if (String.IsNullOrWhiteSpace(newClassification.ClassificationEdition))
            {
                newClassification.ClassificationEdition = "";
            }
        }
    }
}
