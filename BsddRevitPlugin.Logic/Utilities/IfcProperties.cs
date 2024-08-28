using ASRR.Revit.Core.Utilities;
using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.IfcJson;
using NLog;

namespace BsddRevitPlugin.Logic.Utilities
{
    internal class IfcProperties
    {
        public static IfcPropertySingleValue GetIfcPropertySingleValue(string name, Parameter parameter)
        {
            return new IfcPropertySingleValue
            {
                NominalValue = GetNominalValue(parameter),
                Name = name
            };
        }

        private static IfcValue GetNominalValue(Parameter parameter)
        {
            //Define nominalvalue Type and Value
            IfcValue nominalValue = new IfcValue();
            ForgeTypeId paramTypeId = parameter.Definition.GetDataType();

            switch (paramTypeId)
            {
                case var _ when paramTypeId == SpecTypeId.Boolean.YesNo:
                    nominalValue.Type = "IfcBoolean"; //BOOLEAN
                    nominalValue.Value = parameter.AsInteger() != 0;
                    break;
                case var _ when paramTypeId == SpecTypeId.Int.Integer:
                    nominalValue.Type = "IfcInteger"; //INTEGER
                    nominalValue.Value = parameter.AsInteger();
                    break;
                case var _ when paramTypeId == SpecTypeId.Int.NumberOfPoles:
                    nominalValue.Type = "IfcCountMeasure"; //NUMBER
                    nominalValue.Value = parameter.AsInteger();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.String.Url:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.String.Text:
                    nominalValue.Type = "IfcText"; //STRING
                    nominalValue.Value = parameter.AsString();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.String.MultilineText:
                    nominalValue.Type = "IfcText"; //STRING
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Reference.Material:
                    nominalValue.Type = "IfcMaterial"; //??
                    nominalValue.Value = parameter.ToString();
                    break;
                case var _ when paramTypeId == SpecTypeId.Reference.LoadClassification:
                    nominalValue.Type = "IfcElectricCurrentMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.Reference.Image:
                    nominalValue.Type = "Ifc";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.Reference.FillPattern:
                    nominalValue.Type = "IfcInteger";
                    nominalValue.Value = parameter.ToString();
                    break;*/

                case var _ when paramTypeId == SpecTypeId.Acceleration:
                    nominalValue.Type = "IfcAccelerationMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.AirFlow:
                    nominalValue.Type = "IfcVolumetricFlowRateMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.AirFlowDensity:
                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.AirFlowDividedByCoolingLoad:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.AirFlowDividedByVolume:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Angle:
                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.AngularSpeed:
                    nominalValue.Type = "IfcAngularVelocityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ApparentPower:
                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.ApparentPowerDensity:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Area:
                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.AreaDividedByCoolingLoad:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.AreaDividedByHeatingLoad:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.AreaForce:
                    nominalValue.Type = "IfcPlanarForceMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.AreaForceScale:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.AreaSpringCoefficient:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.BarDiameter:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.CableTraySize:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;
                m*m not existing in ifc? */
                /*case var _ when paramTypeId == SpecTypeId.ColorTemperature:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.ConduitSize:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.CoolingLoad:
                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.CoolingLoadDividedByArea:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.CoolingLoadDividedByVolume:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.CostPerArea:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.CostRateEnergy:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.CostRatePower:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.CrackWidth:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.CrossSection:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.Currency:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Current:
                    nominalValue.Type = "IfcElectricCurrentMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.Custom:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.DecimalSheetLength:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.DemandFactor:
                    nominalValue.Type = "IfcReal"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Diffusivity:
                    nominalValue.Type = "IfcMoistureDiffusivityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                //m2 / s but not IfcKinematicViscosityMeasure was not found
                /*case var _ when paramTypeId == SpecTypeId.Displacement:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;
                m1? */
                case var _ when paramTypeId == SpecTypeId.Distance:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.DuctInsulationThickness:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.DuctLiningThickness:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.DuctSize:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;
                m* m not existing in ifc ? */
                case var _ when paramTypeId == SpecTypeId.Efficacy:
                    nominalValue.Type = "IfcReal"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                //lm / W lummen per Watt no entity found
                case var _ when paramTypeId == SpecTypeId.ElectricalFrequency:
                    nominalValue.Type = "IfcFrequencyMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ElectricalPotential:
                    nominalValue.Type = "IfcElectricVoltageMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ElectricalPower:
                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.ElectricalPowerDensity:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;
                W / m3 no entity found*/
                case var _ when paramTypeId == SpecTypeId.ElectricalResistivity:
                    nominalValue.Type = "IfcElectricResistanceMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.ElectricalTemperature:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.ElectricalTemperatureDifference:
                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Energy:
                    nominalValue.Type = "IfcEnergyMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Factor:
                    nominalValue.Type = "IfcReal"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Flow:
                    nominalValue.Type = "IfcVolumetricFlowRateMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.FlowPerPower:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Force:
                    nominalValue.Type = "IfcForceMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.ForceScale:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.HeatCapacityPerArea:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.HeatGain:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;
                Delta? */
                /*case var _ when paramTypeId == SpecTypeId.HeatingLoad:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.HeatingLoadDividedByArea:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.HeatingLoadDividedByVolume:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.HeatTransferCoefficient:
                    nominalValue.Type = "IfcThermalTransmittanceMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.HvacDensity:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;
                NotFiniteNumberException clear what density exactly*/
                case var _ when paramTypeId == SpecTypeId.HvacEnergy:
                    nominalValue.Type = "IfcEnergyMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.HvacFriction:
                    nominalValue.Type = "IfcReal"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                //F or FR (Friction) not found
                case var _ when paramTypeId == SpecTypeId.HvacMassPerTime:
                    nominalValue.Type = "IfcMassFlowRateMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                // kg / s = Mass per time = flowrate
                case var _ when paramTypeId == SpecTypeId.HvacPower:
                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.HvacPowerDensity:
                    nominalValue.Type = "IfcHeatFluxDensityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.HvacPressure:
                    nominalValue.Type = "IfcPressureMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.HvacRoughness:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.HvacSlope:
                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.HvacTemperature:
                    nominalValue.Type = "IfcThermodynamicTemperatureMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.HvacTemperatureDifference:
                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                // k (Kelvin) per s
                case var _ when paramTypeId == SpecTypeId.HvacVelocity:
                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.HvacViscosity:
                    nominalValue.Type = "IfcDynamicViscosityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Illuminance:
                    nominalValue.Type = "IfcIlluminanceMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.IsothermalMoistureCapacity:
                    nominalValue.Type = "IfcIsothermalMoistureCapacityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Length:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = CoordinateUtilities.ConvertFeetToMm(parameter.AsDouble());
                    break;
                case var _ when paramTypeId == SpecTypeId.LinearForce:
                    nominalValue.Type = "IfcLinearForceMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.LinearForceScale:
                    nominalValue.Type = "IfcLinearForceMeasure";
                    nominalValue.Value = paramPset.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.LinearMoment:
                    nominalValue.Type = "IfcLinearMomentMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.LinearMomentScale:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.LineSpringCoefficient:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.Luminance:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.LuminousFlux:
                    nominalValue.Type = "IfcLuminousFluxMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.LuminousIntensity:
                    nominalValue.Type = "IfcLuminousIntensityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Mass:
                    nominalValue.Type = "IfcMassMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.MassDensity:
                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.MassPerUnitArea:
                    nominalValue.Type = "IfcAreaDensityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.MassPerUnitLength:
                    nominalValue.Type = "IfcMassPerLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Moment:
                    nominalValue.Type = "IfcTorqueMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.MomentOfInertia:
                    nominalValue.Type = "IfcMomentOfInertiaMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.MomentScale:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Number:
                    nominalValue.Type = "IfcReal"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.Period:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Permeability:
                    nominalValue.Type = "IfcVaporPermeabilityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipeDimension:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipeInsulationThickness:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipeMassPerUnitLength:
                    nominalValue.Type = "IfcMassPerLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipeSize:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipingDensity:
                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.PipingFriction:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.PipingMass:
                    nominalValue.Type = "IfcMassMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipingMassPerTime:
                    nominalValue.Type = "IfcMassFlowRateMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.PipingRoughness:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.PipingSlope:
                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipingTemperature:
                    nominalValue.Type = "IfcThermodynamicTemperatureMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipingTemperatureDifference:
                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipingVelocity:
                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipingViscosity:
                    nominalValue.Type = "IfcDynamicViscosityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PipingVolume:
                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.PointSpringCoefficient:
                    nominalValue.Type = "IfcLinearStiffnessMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.PowerPerFlow:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.PowerPerLength:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.Pulsation:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.ReinforcementArea:
                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ReinforcementAreaPerUnitLength:
                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ReinforcementCover:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ReinforcementLength:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.ReinforcementSpacing:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.ReinforcementVolume:
                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.Rotation:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.RotationalLineSpringCoefficient:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.RotationalPointSpringCoefficient:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.RotationAngle:
                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.SectionArea:
                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.SectionDimension:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.SectionModulus:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.SectionProperty:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.SheetLength:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.SiteAngle:
                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Slope:
                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.SpecificHeat:
                    nominalValue.Type = "IfcSpecificHeatCapacityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.SpecificHeatOfVaporization:
                    nominalValue.Type = "IfcHeatingValueMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Speed:
                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.Stationing:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                /*case var _ when paramTypeId == SpecTypeId.StationingInterval:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;*/
                case var _ when paramTypeId == SpecTypeId.Stress:
                    nominalValue.Type = "IfcModulusOfElasticityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.StructuralFrequency:
                    nominalValue.Type = "IfcFrequencyMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.StructuralVelocity:
                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.SurfaceAreaPerUnitLength:
                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ThermalConductivity:
                    nominalValue.Type = "IfcThermalConductivityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ThermalExpansionCoefficient:
                    nominalValue.Type = "IfcThermalExpansionCoefficientMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.ThermalGradientCoefficientForMoistureCapacity:
                    nominalValue.Type = "IfcIsothermalMoistureCapacityMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                /*case var _ when paramTypeId == SpecTypeId.ThermalMass:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.ToString();
                    break;
                capacity to store energie J / K or J / Celcium Degrees*/
                case var _ when paramTypeId == SpecTypeId.ThermalResistance:
                    nominalValue.Type = "IfcThermalResistanceMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Time:
                    nominalValue.Type = "IfcTimeMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.UnitWeight:
                    nominalValue.Type = "IfcMassMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Volume:
                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.WarpingConstant:
                    nominalValue.Type = "IfcWarpingConstantMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Wattage:
                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.Weight:
                    nominalValue.Type = "IfcMassMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.WeightPerUnitLength:
                    nominalValue.Type = "IfcMassMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;
                case var _ when paramTypeId == SpecTypeId.WireDiameter:
                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                    nominalValue.Value = parameter.AsDouble();
                    break;

                default:
                    nominalValue.Type = "IfcText";
                    nominalValue.Value = parameter.AsString();
                    break;
            }
            return nominalValue;
        }
    }
}
