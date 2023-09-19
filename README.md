# BsddRevitPlugin

This is a community build tool. 
It is not an official buildingSMART International initiative. 

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
