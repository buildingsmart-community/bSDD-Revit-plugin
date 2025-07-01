@echo off
REM Post-build script to copy CefSharp native files for WPF project

REM Define source and destination directories
setlocal
set CEF_SRC_DIR=%~dp0cef_bin
set TARGET_DIR=%1

echo Copying CefSharp native files from %CEF_SRC_DIR% to %TARGET_DIR%

REM Create target directory if it doesn't exist
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"

REM Copy required DLLs and data files
copy /Y "%CEF_SRC_DIR%\libcef.dll" "%TARGET_DIR%"
copy /Y "%CEF_SRC_DIR%\icudtl.dat" "%TARGET_DIR%"
copy /Y "%CEF_SRC_DIR%\CefSharp.Core.Runtime.dll" "%TARGET_DIR%"
copy /Y "%CEF_SRC_DIR%\CefSharp.dll" "%TARGET_DIR%"
copy /Y "%CEF_SRC_DIR%\CefSharp.Wpf.dll" "%TARGET_DIR%"
copy /Y "%CEF_SRC_DIR%\chrome_elf.dll" "%TARGET_DIR%"

REM Copy locales directory
xcopy /E /Y /I "%CEF_SRC_DIR%\locales" "%TARGET_DIR%\locales"

REM Copy swiftshader directory
xcopy /E /Y /I "%CEF_SRC_DIR%\swiftshader" "%TARGET_DIR%\swiftshader"

echo CefSharp native files copied successfully.
endlocal
