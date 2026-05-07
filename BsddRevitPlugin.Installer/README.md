# bSDD Revit Plugin Installer

Dit project bevat de installer configuratie voor de bSDD Revit Plugin, gebouwd met [Inno Setup](https://www.innosetup.com/).

## 📋 Overzicht

De installer zorgt voor:
- Automatische detectie van geïnstalleerde Revit versies (2023, 2024)
- Gebruikerskeuze voor welke Revit versies de plugin geïnstalleerd moet worden
- Installatie van plugin bestanden in de juiste Revit add-ins directories
- Ondersteuning voor meerdere talen
- Uninstall functionaliteit

## 🔧 Prerequisites

### Inno Setup Installeren

De installer wordt gebouwd met **Inno Setup 6** of hoger.

**Optie 1: Via winget (aanbevolen)**
```powershell
winget install --id=JRSoftware.InnoSetup --exact --silent
```

**Optie 2: Via Chocolatey**
```powershell
choco install innosetup
```

**Optie 3: Handmatige download**
Download van: https://www.innosetup.com/isdl.php

## 🏗️ Build Instructies

### Stap 1: Projecten Bouwen

Voordat je de installer bouwt, moeten alle projecten gebouwd worden in **Release** mode:

```powershell
# 1. NuGet packages herstellen
dotnet restore

# 2. ASRR Core libraries bouwen
msbuild lib\asrr\lib-asrr-core\ASRR.Core.csproj /p:Configuration=Release /p:Platform=AnyCPU
msbuild lib\asrr\lib-asrr-core\ASRR.Core.csproj /p:Configuration=Release /p:Platform=x64
msbuild lib\asrr\lib-asrr-revit-core\ASRR.Revit.Core.csproj /p:Configuration=Release /p:Platform=AnyCPU
msbuild lib\asrr\lib-asrr-revit-core\ASRR.Revit.Core.csproj /p:Configuration=Release /p:Platform=x64

# 3. Plugin Logic bouwen
msbuild BsddRevitPlugin.Logic\BsddRevitPlugin.Logic.csproj /p:Configuration=Release /p:Platform=x64

# 4. Revit versie-specifieke plugins bouwen
msbuild BsddRevitPlugin.2023\BsddRevitPlugin.2023.csproj /p:Configuration=Release /p:Platform=x64
msbuild BsddRevitPlugin.2024\BsddRevitPlugin.2024.csproj /p:Configuration=Release /p:Platform=x64
```

**Of gebruik Visual Studio:**
```powershell
devenv BsddRevitPlugin.sln /Build "Release|x64"
```

### Stap 2: Installer Bouwen

Zodra alle projecten zijn gebouwd, compileer de installer:

```powershell
# Als Inno Setup in standaard locatie is geïnstalleerd
& "$env:LOCALAPPDATA\Programs\Inno Setup 6\ISCC.exe" "BsddRevitPlugin.Installer\Installer.iss"

# Of als het in Program Files staat
& "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" "BsddRevitPlugin.Installer\Installer.iss"
```

### Stap 3: Output

De installer wordt gegenereerd in:
```
BsddRevitPlugin.Installer\Output\bSDD-Revit-plugin-setup.exe
```

## 📁 Projectstructuur

```
BsddRevitPlugin.Installer/
├── Installer.iss           # Inno Setup configuratie script
├── Output/                 # Gegenereerde installer (gitignored)
│   └── bSDD-Revit-plugin-setup.exe
├── Properties/
│   └── AssemblyInfo.cs
├── packages.config
└── README.md              # Dit bestand
```

## ⚙️ Installer Configuratie

### Belangrijke Instellingen in Installer.iss

#### Versie Informatie
```pascal
#define PluginName "bSDD Revit plugin"
#define PluginShortName "BsddRevitPlugin"
#define PluginVersion "1.7.4"
#define RevitVersions "2023;2024"
```

Om een nieuwe versie te maken:
1. Update `PluginVersion` naar het nieuwe versienummer
2. Bouw de projecten opnieuw
3. Compileer de installer

#### Ondersteunde Revit Versies Toevoegen

Om een nieuwe Revit versie toe te voegen (bijvoorbeeld 2025):

1. Voeg "2025" toe aan de `RevitVersions` definitie:
```pascal
#define RevitVersions "2023;2024;2025"
```

2. Voeg Files sectie toe voor de nieuwe versie:
```pascal
; Files for Revit 2025
Source: "..\{#PluginShortName}.2025\bin\Release\*"; DestDir: {code:GetDestDir|2025}; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2025')
Source: "..\{#PluginShortName}.2025\{#PluginShortName}.addin"; DestDir: "{code:GetAddinsDir|2025}\"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2025')
Source: "..\{#PluginShortName}.Common\PackageContents.xml"; DestDir: "{code:GetDestDir|2025}"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2025')
```

#### Ondersteunde Talen

De installer ondersteunt de volgende talen:
- English (Engels)
- Dutch (Nederlands)
- Czech (Tsjechisch)
- Danish (Deens)
- Finnish (Fins)
- French (Frans)
- German (Duits)
- Italian (Italiaans)
- Japanese (Japans)
- Norwegian (Noors)
- Polish (Pools)
- Portuguese (Portugees)
- Brazilian Portuguese (Braziliaans Portugees)
- Slovenian (Sloveens)
- Spanish (Spaans)
- Turkish (Turks)

## 🔍 Hoe de Installer Werkt

### 1. Revit Detectie
De installer controleert het Windows registry voor geïnstalleerde Revit versies:
```pascal
RegPath := 'SOFTWARE\\Autodesk\\Revit\\Autodesk Revit ' + RevitVersion;
Result := RegKeyExists(HKLM64, RegPath);
```

### 2. Versie Selectie
Tijdens installatie krijgt de gebruiker een wizard scherm met checkboxes voor elke gedetecteerde Revit versie.

### 3. Installatie Locaties
De installer bepaalt de juiste installatie directory op basis van gebruikersrechten:

**Voor administrators:**
```
%ProgramData%\Autodesk\Revit\Addins\{VERSION}\BsddRevitPlugin\
```

**Voor normale gebruikers:**
```
%AppData%\Autodesk\Revit\Addins\{VERSION}\BsddRevitPlugin\
```

### 4. Geïnstalleerde Bestanden
- Plugin DLL (`BsddRevitPlugin.dll`)
- Afhankelijkheden (ASRR libraries, NLog, Newtonsoft.Json, etc.)
- Resources (iconen, shared parameters, settings)
- Addin manifest bestand (`.addin`)
- Package contents XML

## 🐛 Troubleshooting

### Fout: "Inno Setup not found"
**Oplossing:** Installeer Inno Setup (zie Prerequisites sectie)

### Fout: "Metadata file could not be found"
**Oplossing:** Bouw alle projecten eerst in Release mode voordat je de installer maakt

### Fout: "No supported version of Revit was found"
Dit is normaal gedrag - de installer detecteert automatisch of Revit is geïnstalleerd en toont deze waarschuwing als geen ondersteunde versie wordt gevonden.

### Warning: "IsAdminLoggedOn has been renamed"
Dit is een waarschuwing van Inno Setup 6.7+. De functie werkt nog steeds correct. Overweeg in de toekomst `IsAdmin` te gebruiken.

### De installer wordt niet getrackt in git
Dit is correct - de `Output/` directory wordt genegeerd in `.gitignore`. Alleen de bronbestanden (Installer.iss) worden getrackt. De gebouwde installer moet gedistribueerd worden via GitHub Releases.

## 📦 Distributie

De installer moet **niet** worden gecommit naar git. Distribueer via:

1. **GitHub Releases** (aanbevolen):
   - Maak een nieuwe release op GitHub
   - Upload de `bSDD-Revit-plugin-setup.exe` als release asset
   - Tag de release met het versienummer (bijv. `v1.7.4`)

2. **Build Automation** (toekomstig):
   - Overweeg GitHub Actions voor automatische builds
   - Genereer installers bij elke release tag

## 📚 Referenties

- [Inno Setup Documentation](https://jrsoftware.org/ishelp/)
- [Inno Setup Pascal Scripting](https://jrsoftware.org/ishelp/topic_scriptintro.htm)
- [Revit Add-in Development](https://www.autodesk.com/developer-network/platform-technologies/revit)

## 🤝 Bijdragen

Bij wijzigingen aan de installer:
1. Test de installer met verschillende Revit versies
2. Controleer zowel admin als non-admin installatie modi
3. Verifieer de uninstall functionaliteit
4. Update dit README bestand indien nodig
