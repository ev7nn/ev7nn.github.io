@echo off
set outfile=manifest.json

echo [ > "%outfile%"

setlocal enabledelayedexpansion
set first=1
for %%f in ("%~dp0*") do (
    if /i not "%%~nxf"=="%~nx0" if /i not "%%~nxf"=="manifest.json" (
        if !first!==1 (
            echo   "%%~nxf" >> "%outfile%"
            set first=0
        ) else (
            echo   ,"%%~nxf" >> "%outfile%"
        )
    )
)

echo ] >> "%outfile%"

echo Done. Saved to %outfile%
pause