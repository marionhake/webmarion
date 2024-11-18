@echo off
setlocal

set UPDATE_URL=http://web.realmarion.com/marion/terminal/update-installer.exe

set DOWNLOAD_PATH=%TEMP%\update-installer.exe

powershell -Command "Invoke-WebRequest -Uri %UPDATE_URL% -OutFile %DOWNLOAD_PATH%"

if exist %DOWNLOAD_PATH% (
    start %DOWNLOAD_PATH%
    exit /b 0
) else (
    echo Failed to download update.
    exit /b 1
)
