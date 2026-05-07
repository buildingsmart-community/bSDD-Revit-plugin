#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Build script for bSDD Revit Plugin
.DESCRIPTION
    This script builds all projects in the correct order and generates the installer.
.PARAMETER Configuration
    Build configuration (Debug or Release). Default is Release.
.PARAMETER SkipRestore
    Skip NuGet package restore step.
.PARAMETER BuildInstallerOnly
    Only build the installer (assumes projects are already built).
.EXAMPLE
    .\build.ps1
    .\build.ps1 -Configuration Debug
    .\build.ps1 -SkipRestore
    .\build.ps1 -BuildInstallerOnly
#>

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("Debug", "Release")]
    [string]$Configuration = "Release",

    [Parameter(Mandatory=$false)]
    [switch]$SkipRestore,

    [Parameter(Mandatory=$false)]
    [switch]$BuildInstallerOnly
)

# Set error action preference
$ErrorActionPreference = "Stop"

# Start timer
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  bSDD Revit Plugin - Build Script" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Configuration: $Configuration" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

try {
    # Get solution directory
    $solutionDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $solutionFile = Join-Path $solutionDir "BsddRevitPlugin.sln"

    if (-not (Test-Path $solutionFile)) {
        throw "Solution file not found: $solutionFile"
    }

    if (-not $BuildInstallerOnly) {
        # Step 1: NuGet Restore
        if (-not $SkipRestore) {
            Write-Host "`n===> Step 1/10: Restoring NuGet packages..." -ForegroundColor Cyan
            dotnet restore $solutionFile
            if ($LASTEXITCODE -ne 0) { throw "NuGet restore failed" }
            Write-Host "Done: NuGet packages restored" -ForegroundColor Green
        } else {
            Write-Host "Skipping NuGet restore" -ForegroundColor Gray
        }

        # Step 2: Build ASRR.Core (AnyCPU)
        Write-Host "`n===> Step 2/10: Building ASRR.Core (AnyCPU)..." -ForegroundColor Cyan
        msbuild "lib\asrr\lib-asrr-core\ASRR.Core.csproj" /p:Configuration=$Configuration /p:Platform=AnyCPU /v:minimal /nologo /restore
        if ($LASTEXITCODE -ne 0) { throw "ASRR.Core (AnyCPU) build failed" }
        Write-Host "Done: ASRR.Core (AnyCPU) built" -ForegroundColor Green

        # Step 3: Build ASRR.Core (x64)
        Write-Host "`n===> Step 3/10: Building ASRR.Core (x64)..." -ForegroundColor Cyan
        msbuild "lib\asrr\lib-asrr-core\ASRR.Core.csproj" /p:Configuration=$Configuration /p:Platform=x64 /v:minimal /nologo
        if ($LASTEXITCODE -ne 0) { throw "ASRR.Core (x64) build failed" }
        Write-Host "Done: ASRR.Core (x64) built" -ForegroundColor Green

        # Step 4: Build ASRR.Revit.Core (AnyCPU)
        Write-Host "`n===> Step 4/10: Building ASRR.Revit.Core (AnyCPU)..." -ForegroundColor Cyan
        msbuild "lib\asrr\lib-asrr-revit-core\ASRR.Revit.Core.csproj" /p:Configuration=$Configuration /p:Platform=AnyCPU /v:minimal /nologo /restore
        if ($LASTEXITCODE -ne 0) { throw "ASRR.Revit.Core (AnyCPU) build failed" }
        Write-Host "Done: ASRR.Revit.Core (AnyCPU) built" -ForegroundColor Green

        # Step 5: Build ASRR.Revit.Core (x64)
        Write-Host "`n===> Step 5/10: Building ASRR.Revit.Core (x64)..." -ForegroundColor Cyan
        msbuild "lib\asrr\lib-asrr-revit-core\ASRR.Revit.Core.csproj" /p:Configuration=$Configuration /p:Platform=x64 /v:minimal /nologo
        if ($LASTEXITCODE -ne 0) { throw "ASRR.Revit.Core (x64) build failed" }
        Write-Host "Done: ASRR.Revit.Core (x64) built" -ForegroundColor Green

        # Step 6: Build BsddRevitPlugin.Resources
        Write-Host "`n===> Step 6/10: Building BsddRevitPlugin.Resources..." -ForegroundColor Cyan
        msbuild "BsddRevitPlugin.Resources\BsddRevitPlugin.Resources.csproj" /p:Configuration=$Configuration /v:minimal /nologo
        if ($LASTEXITCODE -ne 0) { throw "BsddRevitPlugin.Resources build failed" }
        Write-Host "Done: BsddRevitPlugin.Resources built" -ForegroundColor Green

        # Step 7: Build BsddRevitPlugin.Logic
        Write-Host "`n===> Step 7/10: Building BsddRevitPlugin.Logic..." -ForegroundColor Cyan
        msbuild "BsddRevitPlugin.Logic\BsddRevitPlugin.Logic.csproj" /p:Configuration=$Configuration /p:Platform=x64 /v:minimal /nologo
        if ($LASTEXITCODE -ne 0) { throw "BsddRevitPlugin.Logic build failed" }
        Write-Host "Done: BsddRevitPlugin.Logic built" -ForegroundColor Green

        # Step 8: Build BsddRevitPlugin.2023
        Write-Host "`n===> Step 8/10: Building BsddRevitPlugin.2023..." -ForegroundColor Cyan
        msbuild "BsddRevitPlugin.2023\BsddRevitPlugin.2023.csproj" /p:Configuration=$Configuration /p:Platform=x64 /v:minimal /nologo
        if ($LASTEXITCODE -ne 0) { throw "BsddRevitPlugin.2023 build failed" }
        Write-Host "Done: BsddRevitPlugin.2023 built" -ForegroundColor Green

        # Step 9: Build BsddRevitPlugin.2024
        Write-Host "`n===> Step 9/10: Building BsddRevitPlugin.2024..." -ForegroundColor Cyan
        msbuild "BsddRevitPlugin.2024\BsddRevitPlugin.2024.csproj" /p:Configuration=$Configuration /p:Platform=x64 /v:minimal /nologo
        if ($LASTEXITCODE -ne 0) { throw "BsddRevitPlugin.2024 build failed" }
        Write-Host "Done: BsddRevitPlugin.2024 built" -ForegroundColor Green
    } else {
        Write-Host "Skipping project builds (BuildInstallerOnly mode)" -ForegroundColor Gray
    }

    # Step 10: Build Installer
    Write-Host "`n===> Step 10/10: Building Installer..." -ForegroundColor Cyan

    # Try to find Inno Setup
    $isccPaths = @(
        "$env:LOCALAPPDATA\Programs\Inno Setup 6\ISCC.exe",
        "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe",
        "${env:ProgramFiles}\Inno Setup 6\ISCC.exe"
    )

    $isccPath = $null
    foreach ($path in $isccPaths) {
        if (Test-Path $path) {
            $isccPath = $path
            break
        }
    }

    if (-not $isccPath) {
        Write-Host "ERROR: Inno Setup not found. Please install it first:" -ForegroundColor Red
        Write-Host "  winget install --id=JRSoftware.InnoSetup --exact --silent" -ForegroundColor Yellow
        throw "Inno Setup not found"
    }

    Write-Host "  Using Inno Setup: $isccPath" -ForegroundColor Gray

    $installerScript = Join-Path $solutionDir "BsddRevitPlugin.Installer\Installer.iss"
    & $isccPath $installerScript
    if ($LASTEXITCODE -ne 0) { throw "Installer build failed" }

    $installerPath = Join-Path $solutionDir "BsddRevitPlugin.Installer\Output\bSDD-Revit-plugin-setup.exe"
    if (Test-Path $installerPath) {
        $installerSize = (Get-Item $installerPath).Length / 1MB
        Write-Host "Done: Installer built successfully!" -ForegroundColor Green
        Write-Host "  Location: $installerPath" -ForegroundColor Gray
        Write-Host "  Size: $([math]::Round($installerSize, 2)) MB" -ForegroundColor Gray
    }

    # Stop timer
    $stopwatch.Stop()
    $elapsed = $stopwatch.Elapsed

    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "  BUILD COMPLETED SUCCESSFULLY" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "  Time: $($elapsed.Minutes)m $($elapsed.Seconds)s" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host "  BUILD FAILED" -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
