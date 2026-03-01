<# : batch portion
@echo off & setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -Command "[ScriptBlock]::Create((Get-Content -LiteralPath '%~f0' -Raw)).Invoke()"
pause
exit /b
: end batch / begin PowerShell #>

$imageExts = '.jpg','.jpeg','.png','.webp','.gif','.bmp'
$audioExts = '.mp3','.wav','.ogg','.flac','.m4a','.aac','.wma'
$warnings = [System.Collections.ArrayList]::new()

function Test-Problematic($name) {
    $issues = @()
    if ($name -match '!') { $issues += 'contains !' }
    if ($name -match '[^\x20-\x7E]') { $issues += 'non-ASCII characters' }
    return $issues
}

function JsonEscape($s) {
    return $s.Replace('\','\\').Replace('"','\"').Replace("`n",'\n').Replace("`r",'\r').Replace("`t",'\t')
}

$playlists = [System.Collections.ArrayList]::new()

foreach ($dir in (Get-ChildItem -Directory | Sort-Object Name)) {
    $probs = Test-Problematic $dir.Name
    if ($probs.Count -gt 0) {
        [void]$warnings.Add("Folder `"$($dir.Name)`" - $($probs -join ', ')")
    }

    $cover = ""
    $files = Get-ChildItem -LiteralPath $dir.FullName -File | Sort-Object Name
    foreach ($f in $files) {
        if ($f.Extension.ToLower() -in $imageExts) {
            $cover = "$($dir.Name)/$($f.Name)"
            break
        }
    }

    $tracks = [System.Collections.ArrayList]::new()
    foreach ($f in $files) {
        if ($f.Extension.ToLower() -in $audioExts) {
            $fprobs = Test-Problematic $f.BaseName
            if ($fprobs.Count -gt 0) {
                [void]$warnings.Add("Track  `"$($f.Name)`" in `"$($dir.Name)`" - $($fprobs -join ', ')")
            }
            [void]$tracks.Add(@{ title = $f.BaseName; src = "$($dir.Name)/$($f.Name)" })
        }
    }

    [void]$playlists.Add(@{ name = $dir.Name; image = $cover; tracks = $tracks })
}

# build json
$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine('{"playlists":[')
for ($i = 0; $i -lt $playlists.Count; $i++) {
    $pl = $playlists[$i]
    $comma = if ($i -lt $playlists.Count - 1) { ',' } else { '' }
    [void]$sb.Append("  {`"name`":`"$(JsonEscape $pl.name)`",`"image`":`"$(JsonEscape $pl.image)`",`"tracks`":[")
    if ($pl.tracks.Count -gt 0) { [void]$sb.AppendLine() }
    for ($j = 0; $j -lt $pl.tracks.Count; $j++) {
        $t = $pl.tracks[$j]
        $tcomma = if ($j -lt $pl.tracks.Count - 1) { ',' } else { '' }
        [void]$sb.AppendLine("    {`"title`":`"$(JsonEscape $t.title)`",`"src`":`"$(JsonEscape $t.src)`"}$tcomma")
    }
    [void]$sb.AppendLine("  ]}$comma")
}
[void]$sb.Append(']}')

$jsonPath = Join-Path (Get-Location) 'main.json'
[System.IO.File]::WriteAllText($jsonPath, $sb.ToString(), [System.Text.Encoding]::UTF8)

$totalTracks = ($playlists | ForEach-Object { $_.tracks.Count } | Measure-Object -Sum).Sum
Write-Host ""
Write-Host "  done! $($playlists.Count) playlists, $totalTracks tracks" -ForegroundColor Green
Write-Host "  saved to main.json" -ForegroundColor Green

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "  WARNING: special characters detected:" -ForegroundColor Red
    Write-Host "  (still included in main.json, just letting you know)" -ForegroundColor DarkYellow
    Write-Host ""
    foreach ($w in $warnings) {
        Write-Host "    $w" -ForegroundColor Yellow
    }
}
Write-Host ""