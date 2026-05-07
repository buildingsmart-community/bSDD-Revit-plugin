@echo off
REM Build script for bSDD Revit Plugin
REM Usage: build.bat [Debug|Release]

setlocal enabledelayedexpansion

set "CONFIG=%~1"
if "%CONFIG%"=="" set "CONFIG=Release"

echo.
echo ============================================================
echo   bSDD Revit Plugin - Build Script
echo ============================================================
echo   Configuration: %CONFIG%
echo ============================================================
echo.

REM Change to script directory
cd /d "%~dp0"

echo [1/10] Restoring NuGet packages...
dotnet restore BsddRevitPlugin.sln
if errorlevel 1 goto :error

echo.
echo [2/10] Building ASRR.Core (AnyCPU)...
msbuild lib\asrr\lib-asrr-core\ASRR.Core.csproj /p:Configuration=%CONFIG% /p:Platform=AnyCPU /v:minimal /nologo /restore
if errorlevel 1 goto :error

echo.
echo [3/10] Building ASRR.Core (x64)...
msbuild lib\asrr\lib-asrr-core\ASRR.Core.csproj /p:Configuration=%CONFIG% /p:Platform=x64 /v:minimal /nologo
if errorlevel 1 goto :error

echo.
echo [4/10] Building ASRR.Revit.Core (AnyCPU)...
msbuild lib\asrr\lib-asrr-revit-core\ASRR.Revit.Core.csproj /p:Configuration=%CONFIG% /p:Platform=AnyCPU /v:minimal /nologo /restore
if errorlevel 1 goto :error

echo.
echo [5/10] Building ASRR.Revit.Core (x64)...
msbuild lib\asrr\lib-asrr-revit-core\ASRR.Revit.Core.csproj /p:Configuration=%CONFIG% /p:Platform=x64 /v:minimal /nologo
if errorlevel 1 goto :error

echo.
echo [6/10] Building BsddRevitPlugin.Resources...
msbuild BsddRevitPlugin.Resources\BsddRevitPlugin.Resources.csproj /p:Configuration=%CONFIG% /v:minimal /nologo
if errorlevel 1 goto :error

echo.
echo [7/10] Building BsddRevitPlugin.Logic...
msbuild BsddRevitPlugin.Logic\BsddRevitPlugin.Logic.csproj /p:Configuration=%CONFIG% /p:Platform=x64 /v:minimal /nologo
if errorlevel 1 goto :error

echo.
echo [8/10] Building BsddRevitPlugin.2023...
msbuild BsddRevitPlugin.2023\BsddRevitPlugin.2023.csproj /p:Configuration=%CONFIG% /p:Platform=x64 /v:minimal /nologo
if errorlevel 1 goto :error

echo.
echo [9/10] Building BsddRevitPlugin.2024...
msbuild BsddRevitPlugin.2024\BsddRevitPlugin.2024.csproj /p:Configuration=%CONFIG% /p:Platform=x64 /v:minimal /nologo
if errorlevel 1 goto :error

echo.
echo [10/10] Building Installer...

REM Try to find Inno Setup
set "ISCC="
if exist "%LOCALAPPDATA%\Programs\Inno Setup 6\ISCC.exe" set "ISCC=%LOCALAPPDATA%\Programs\Inno Setup 6\ISCC.exe"
if exist "%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe" set "ISCC=%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe"
if exist "%ProgramFiles%\Inno Setup 6\ISCC.exe" set "ISCC=%ProgramFiles%\Inno Setup 6\ISCC.exe"

if "%ISCC%"=="" (
    echo ERROR: Inno Setup not found. Please install it first:
    echo   winget install --id=JRSoftware.InnoSetup --exact --silent
    goto :error
)

"%ISCC%" "BsddRevitPlugin.Installer\Installer.iss"
if errorlevel 1 goto :error

echo.
echo ============================================================
echo   BUILD COMPLETED SUCCESSFULLY
echo ============================================================
echo   Installer: BsddRevitPlugin.Installer\Output\bSDD-Revit-plugin-setup.exe
echo ============================================================
echo.
exit /b 0

:error
echo.
echo ============================================================
echo   BUILD FAILED
echo ============================================================
echo.
exit /b 1
