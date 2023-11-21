# Introduction
This project is part of an opensource development of a series of consistent bSDD plugins and bSDD web UI.

Subprojects:
-	Web UI https://github.com/buildingsmart-community/bSDD-filter-UI
-	Revit Plugin https://github.com/buildingsmart-community/bSDD-Revit-plugin
-	Sketchup bSDD plugin (Not available yet)
-	Trimble Connect bSDD plugin (Not available yet)

This project is initiated by Dutch contractors VolkerWessels and Heijmans. By starting this opensource development we believe we can help the industry structuring data. Proper usage of the buildingSMART Data Dictionary helps in getting consistent information in objects. Good information is the basis for further automation. 
The idea of our development is that we inspire our industry to include bSDD in their processes and softwareproducts natively.

# BsddRevitPlugin

This is a community build tool. 
It is not an official buildingSMART International initiative.

This plugin uses CEFsharp that's also used by Revit internally, therefore the version used must always match the Revit version:
* 2024: CEFsharp version 105.3.390
* 2023: CEFsharp version 92.0.260
* 2020: CEFsharp version 65.0.1
* 2019: CEFsharp version 57.0.0

<!-- TOC -->
* [Internal NuGet Packages](#internal-nuget-packages)
* [TODO](#todo)
<!-- TOC -->

## Internal NuGet Packages
We're currently experimenting with using internal NuGet packages instead of submodules to make the C# project workflow smoother. However, to gain access to the internal packages you must follow a few steps:

1) Generate a Personal Access Token (classic) in GitHub:
    - a) On your GitHub account, go to your settings, and then go to `Developer settings`
    - b) Under `Personal access tokens`, click Tokens (classic)
    - c) Click on `Generate new token (classic)` -- make sure to store this token securely, it will only be shown once!
    - d) Make sure to set the scope of the token to at _least_ reading repositories (add write if you are going to be publishing internal NuGet packages)

2) Add ASRR's internal NuGet package repository as a source:
- a) In Visual Studio, right-click on your solution and go to `Manage NuGet Packages for Solution`.
- b) Click on the settings icon (:gear:) top-right. This should open a window showing Package sources. Click on the plus (:heavy_plus_sign:) button to add a new source and add the following source: `https://nuget.pkg.github.com/ASRRtechnologies/index.json`. The name can be anything, but prefer the convention `GitHub ASRR`.
- c) Back in the NuGet manager window, change the Package source to `All` (or `GitHub ASRR` if you only want to see the internal packages). This should prompt you to enter your GitHub username and password (:warning: Here you have to fill in the Personal access token you generated earlier, NOT your GitHub password).

If everything went right, you should see our internal packages such as ASRR.Core now, and can install it as you would any other NuGet package!


## TODO
- [x] Create shared project for common Revit Addin code (so just the startup and log setups etc)
- [x] Create an installer executable using InnoSetup
- [ ] Auto deploy to GH repo releases
- [ ] Automatic signing
- [ ] Automatic versioning
- [ ] Dependency Injection
- [x] Debugger auto placer of files
- [ ] Auto updater
- [ ] Check different types of ribbon panel icons and add some sample buttons with uniform styling
- [ ] Standard gaia setup in template (uptime tool)
