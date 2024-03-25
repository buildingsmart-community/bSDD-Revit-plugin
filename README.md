# bSDD Revit plugin

> **This is a community build tool. It is not an official buildingSMART International initiative.**

## Introduction
This project is part of the Open bSDD toolkit, an opensource development of a series of consistent bSDD plugins sharing a common bSDD web UI.

This project is initiated by Dutch contractors VolkerWessels and Heijmans. By starting this opensource development we believe we can help the industry structuring data. Proper usage of the buildingSMART Data Dictionary helps in getting consistent information in objects. Good information is the basis for further automation. 
The idea of our development is that we inspire our industry to include bSDD in their processes and softwareproducts natively.

<!-- TOC -->
* [Internal NuGet Packages](#internal-nuget-packages)
* [TODO](#todo)
<!-- TOC -->

## Open bSDD toolkit projects
-	Web UI https://github.com/buildingsmart-community/bSDD-filter-UI
-	Revit Plugin https://github.com/buildingsmart-community/bSDD-Revit-plugin
-	Sketchup bSDD plugin https://github.com/DigiBase-VolkerWessels/SketchUp-bsDD-plugin
-	Trimble Connect bSDD plugin (Not available yet)

## Features
### Validate model against bSDD
- [x] **Revit types**
- [ ] (Revit instances) **TODO**
- [ ] (Revit families) **TODO**
- [x] **validate against multiple dictionaries**
- [ ] (validate against class restrictions) **TODO**
- [ ] (validate against nested class restrictions) **TODO**
- [ ] (validate against property restrictions) **TODO**
- [ ] (apply IDS filter before linking to the model) **TODO**
### Apply bSDD classes on Revit elements
- [x] **search in main dictionary**
- [x] **select possible related classifications**
- [x] **automatic generation of persistent shared parameter GUIDs**
- [ ] (select unrelated classes from filter dictionaries)
- [ ] (add bSDD materials) **TODO**
### Export IFC, according to [bSDD documentation](https://github.com/buildingSMART/bSDD/blob/master/Documentation/bSDD-IFC%20documentation.md)
- [x] **consistent mapping of bSDD properties**
- [x] **consistent application of an unlimited number of IfcClassifications**
- [x] **leverages the built-in Revit IFC exporter, with a postprocessing step for improving Ifcclassificationreference location URL**
- [ ] (add property URL) **TODO**

## Installation
1. Go to the [Releases](https://github.com/buildingsmart-community/bSDD-Revit-plugin/releases) page
2. Find the release you want to install, the latest is at the top (**Mind the "Pre-release" tags, those versions are not meant for production use!**)
3. Expand the **Assets** section, and download the installer (.exe) file.
4. When running the installer it first asks you if you want to install for:
   - just you (plugin is installed in "C:\Users\%USERNAME%\AppData\Roaming\Autodesk\Revit\Addins\")
   - all users, **needing admin privilages to install** (plugin is installed in (C:\ProgramData\Autodesk\Revit\Addins\)
6. Select installation language
7. Select Revit versions to install for (2023 and 2024 currently)
8. Accept [MIT license](https://github.com/buildingsmart-community/bSDD-Revit-plugin/blob/main/LICENSE)
9. Select start menu folder to get a shortcut to the uninstaller.

## Usage
[Go to the wiki page](https://github.com/buildingsmart-community/bSDD-Revit-plugin/wiki/)
