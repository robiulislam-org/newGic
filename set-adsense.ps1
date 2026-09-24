param (
    [Parameter(Mandatory=$true)]
    [string]$PublisherId
)

$PublisherId = $PublisherId.Trim()
if ($PublisherId -match "^pub-\d+$") {
    $PublisherId = "ca-$PublisherId"
}

if (-not ($PublisherId -match "^ca-pub-\d{16}$")) {
    Write-Warning "Notice: AdSense Publisher ID is usually 'ca-pub-' followed by 16 digits (e.g. ca-pub-1234567890123456)."
    Write-Host "Provided ID: $PublisherId"
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Setting Google AdSense Publisher ID..." -ForegroundColor Cyan
Write-Host "Target ID: $PublisherId" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Update ads.txt
$adsTxtPath = Join-Path $PSScriptRoot "ads.txt"
if (Test-Path $adsTxtPath) {
    $adsContent = @"
# Google AdSense ads.txt
# globalislamiccare.com
google.com, $PublisherId, DIRECT, f08c47fec0942fa0
"@
    [System.IO.File]::WriteAllText($adsTxtPath, $adsContent, [System.Text.Encoding]::UTF8)
    Write-Host "[1/2] ads.txt updated successfully!" -ForegroundColor Green
} else {
    Write-Warning "ads.txt not found."
}

# 2. Update all HTML files
$htmlFiles = Get-ChildItem -Path $PSScriptRoot -Recurse -Filter *.html | Where-Object {
    $_.FullName -notmatch "\\(\.git|\.agents|\.well-known)\\"
}

$updatedCount = 0
foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    if ($content -match "ca-pub-[X0-9]+") {
        $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, "ca-pub-[X0-9]+", $PublisherId)
        if ($newContent -ne $content) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            Write-Host "  -> Updated: $($file.Name)" -ForegroundColor DarkGray
            $updatedCount++
        }
    }
}

Write-Host "[2/2] Updated $updatedCount HTML pages with your AdSense Publisher ID!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "All done! Your site is ready for Google AdSense." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
