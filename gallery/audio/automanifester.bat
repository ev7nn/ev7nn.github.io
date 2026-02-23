@echo off
set outfile=manifest.json

echo [ > "%outfile%"

setlocal enabledelayedexpansion
set first=1
for %%f in ("%~dp0*.mp3" "%~dp0*.wav" "%~dp0*.ogg") do (
    if /i not "%%~nxf"=="%~nx0" if /i not "%%~nxf"=="manifest.json" (
        set "img=audiodefault.png"
        if exist "%~dp0%%~nf.png" set "img=%%~nf.png"

        if !first!==1 (
            echo   ["%%~nxf","!img!"] >> "%outfile%"
            set first=0
        ) else (
            echo   ,["%%~nxf","!img!"] >> "%outfile%"
        )
    )
)

echo ] >> "%outfile%"

echo Done. Saved to %outfile%
pause