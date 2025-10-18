# PowerShell script to replace Events.tsx with the updated version
# Run this from the frontend directory

Write-Host "Event Registration Feature - File Replacement Script" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

$originalFile = "src\pages\Events.tsx"
$updatedFile = "src\pages\Events_Updated.tsx"
$backupFile = "src\pages\Events.tsx.backup"

# Check if updated file exists
if (-Not (Test-Path $updatedFile)) {
    Write-Host "ERROR: Updated file not found: $updatedFile" -ForegroundColor Red
    Write-Host "Please ensure Events_Updated.tsx exists in src/pages/" -ForegroundColor Yellow
    exit 1
}

# Create backup of original file
if (Test-Path $originalFile) {
    Write-Host "Creating backup of original file..." -ForegroundColor Yellow
    Copy-Item $originalFile $backupFile -Force
    Write-Host "✓ Backup created: $backupFile" -ForegroundColor Green
} else {
    Write-Host "WARNING: Original file not found: $originalFile" -ForegroundColor Yellow
}

# Replace the file
Write-Host "Replacing Events.tsx with updated version..." -ForegroundColor Yellow
Move-Item -Path $updatedFile -Destination $originalFile -Force

if (Test-Path $originalFile) {
    Write-Host "✓ File replacement successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Review the changes in Events.tsx" -ForegroundColor White
    Write-Host "2. Update DEFAULT_REGISTRATION_LINK with your Google Form URL" -ForegroundColor White
    Write-Host "3. Add your upcoming events to the upcomingEvents array" -ForegroundColor White
    Write-Host "4. Test the application: npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Documentation: EVENT_REGISTRATION_FEATURE.md" -ForegroundColor Cyan
} else {
    Write-Host "✗ File replacement failed!" -ForegroundColor Red
    Write-Host "Please manually replace the file." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "To restore the original file, run:" -ForegroundColor Gray
Write-Host "Copy-Item $backupFile $originalFile -Force" -ForegroundColor Gray
