; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define PluginName "bSDD Revit plugin"
#define PluginShortName "BsddRevitPlugin"
#define PluginVersion "1.0.2_beta"
#define PluginPublisher "bSDD Revit plugin contributors"
#define PluginURL "https://github.com/buildingsmart-community/bSDD-Revit-plugin"
#define RevitVersions "2023;2024";

#define revitVersion "{code:GetRevitVersion}"
;#define buildPath "..\BsddRevitPlugin.{{#revitVersion}\bin\Release\*"
#define installPath "{code:GetDestDir|2023}"
#define iconPath "..\BsddRevitPlugin.Resources\Images\Icons\BsddLabel.ico"

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{9F598BE3-797C-4594-9B38-3700E6402FF5}
AppName={#PluginName}
AppVersion={#PluginVersion}
AppVerName={#PluginName} {#PluginVersion}
AppPublisher={#PluginPublisher}
AppPublisherURL={#PluginURL}
DefaultDirName={#installPath}
DefaultGroupName={#PluginName}
AppSupportURL={#PluginURL}
AppUpdatesURL={#PluginURL}
CreateAppDir=no
LicenseFile=..\LICENSE

; Remove the following line to run in administrative install mode (install for all users.)
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
OutputDir=.\Output
OutputBaseFilename=bSDD-Revit-plugin-setup
SetupIconFile={#iconPath}
OutputManifestFile=Setup-Manifest.txt
Compression=lzma
SolidCompression=yes
UninstallDisplayName="{#PluginName} uninstall"
UninstallDisplayIcon={userappdata}\{#PluginShortName}\BsddLabel.ico
WizardStyle=modern
UninstallFilesDir={userappdata}\{#PluginShortName}

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "dutch"; MessagesFile: "compiler:Languages\Dutch.isl"

[Files]
Source: "..\{#PluginShortName}.2023\bin\Release\Images\Icons\BsddLabel.ico"; DestDir: {userappdata}\{#PluginShortName}; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2023')

; Files for Revit 2023
Source: "..\{#PluginShortName}.2023\bin\Release\*"; DestDir: {code:GetDestDir|2023}; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2023')
Source: "..\{#PluginShortName}.2023\{#PluginShortName}.addin"; DestDir: "{code:GetAddinsDir|2023}\"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2023')
Source: "..\{#PluginShortName}.Common\PackageContents.xml"; DestDir: "{code:GetDestDir|2023}"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2023')

; Files for Revit 2024
Source: "..\{#PluginShortName}.2024\bin\Release\*"; DestDir: {code:GetDestDir|2024}; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2024')
Source: "..\{#PluginShortName}.2024\{#PluginShortName}.addin"; DestDir: "{code:GetAddinsDir|2024}\"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2024')
Source: "..\{#PluginShortName}.Common\PackageContents.xml"; DestDir: "{code:GetDestDir|2024}"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsVersionSelected('2024')

; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{cm:UninstallProgram,{#PluginName}}"; Filename: "{uninstallexe}"

[Code]
function IsAppInstalled(RevitVersion: String): Boolean;
var
  RegPath: String;
begin
  RegPath := 'SOFTWARE\\Autodesk\\Revit\\Autodesk Revit ' + RevitVersion;
  Result := RegKeyExists(HKLM64, RegPath);
  Log('Checking if Revit ' + RevitVersion + ' is installed...');
  Log('Registry path: ' + RegPath);
  if Result then
    Log('Revit ' + RevitVersion + ' is installed.')
  else
    Log('Revit ' + RevitVersion + ' is not installed.');
end;

[Code]
function GetAddinsDir(RevitVersion: String): String;
begin
  if IsAdminLoggedOn then
    Result := ExpandConstant('{commonappdata}\Autodesk\Revit\Addins\' + RevitVersion)
  else
    Result := ExpandConstant('{userappdata}\Autodesk\Revit\Addins\' + RevitVersion);
end;

[Code]
function GetDestDir(RevitVersion: String): String;
begin
  if IsAdminLoggedOn then
    Result := ExpandConstant('{commonappdata}\Autodesk\Revit\Addins\' + RevitVersion + '\{#PluginShortName}\')
  else
    Result := ExpandConstant('{userappdata}\Autodesk\Revit\Addins\' + RevitVersion + '\{#PluginShortName}\');
end;

[Code]
function Split(const Delimiter: String; Input: String): TArrayOfString;
var
  i, p: Integer;
begin
  i := 0;
  repeat
    SetArrayLength(Result, i+1);
    p := Pos(Delimiter, Input);
    if p > 0 then
    begin
      Result[i] := Copy(Input, 1, p-1);
      Input := Copy(Input, p + Length(Delimiter), MaxInt);
    end
    else
    begin
      Result[i] := Input;
      Input := '';
    end;
    Inc(i);
  until Input = '';
end;

[Code]
var
  RevitVersionsArray: TArrayOfString;

function InitializeSetup(): Boolean;
var
  i: Integer;
  isAnyVersionInstalled: Boolean;
begin
  RevitVersionsArray := Split(';', ExpandConstant('{#RevitVersions}'));
  isAnyVersionInstalled := False;

  for i := 0 to GetArrayLength(RevitVersionsArray)-1 do
  begin
    if IsAppInstalled(RevitVersionsArray[i]) then
    begin
      isAnyVersionInstalled := True;
      Break;
    end;
  end;

  if not isAnyVersionInstalled then
  begin
    MsgBox('No supported version of Revit was found. Installation will be cancelled.', mbError, MB_OK);
    Result := False;
  end
  else
    Result := True;
end;

[Code]
var
  RevitVersionsPage: TInputOptionWizardPage;

procedure InitializeWizard;
var
  i: Integer;
begin
  RevitVersionsArray := Split(';', ExpandConstant('{#RevitVersions}'));
  RevitVersionsPage := CreateInputOptionPage(wpWelcome, 'Select Revit versions', 'Which versions of Revit do you want to install the plugin for?', 'Select the versions of Revit that you want to install the plugin for, and then click Next.', False, False);

  for i := 0 to GetArrayLength(RevitVersionsArray)-1 do
  begin
    RevitVersionsPage.Add(RevitVersionsArray[i]);
    RevitVersionsPage.Values[i] := IsAppInstalled(RevitVersionsArray[i]);
  end;
end;

function IsAnyVersionInstalled: Boolean;
var
  i: Integer;
begin
  Result := False;
  for i := 0 to GetArrayLength(RevitVersionsArray)-1 do
  begin
    if IsAppInstalled(RevitVersionsArray[i]) then
    begin
      Result := True;
      Break;
    end;
  end;
end;

function ShouldSkipPage(PageID: Integer): Boolean;
begin
  Result := False;
  if (PageID = RevitVersionsPage.ID) and not IsAnyVersionInstalled then
  begin
    Result := True;
  end;
end;

[Code]
function IsVersionSelected(RevitVersion: String): Boolean;
var
  i: Integer;
begin
  Result := False;
  for i := 0 to GetArrayLength(RevitVersionsArray)-1 do
  begin
    if (RevitVersionsArray[i] = RevitVersion) and RevitVersionsPage.Values[i] then
    begin
      Result := True;
      Break;
    end;
  end;
end;