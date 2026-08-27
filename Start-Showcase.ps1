$ErrorActionPreference = 'Stop'

$showcaseRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $showcaseRoot

if (-not (Test-Path -LiteralPath (Join-Path $showcaseRoot 'node_modules'))) {
    throw 'Dependencies are missing. Run npm install once while online.'
}

npm run build
if ($LASTEXITCODE -ne 0) {
    throw "Showcase build failed with exit code $LASTEXITCODE."
}

$nodeCommand = Get-Command node -ErrorAction Stop
$viteCli = Join-Path $showcaseRoot 'node_modules\vite\bin\vite.js'
if (-not (Test-Path -LiteralPath $viteCli)) {
    throw 'Vite is missing. Run npm install once while online.'
}

$previewArguments = @(
    "`"$viteCli`"",
    'preview',
    '--host', '127.0.0.1',
    '--port', '4173',
    '--strictPort'
)
$previewStartParameters = @{
    FilePath = $nodeCommand.Source
    ArgumentList = $previewArguments
    WorkingDirectory = $showcaseRoot
    NoNewWindow = $true
    PassThru = $true
}
$previewProcess = Start-Process @previewStartParameters

try {
    Wait-Process -Id $previewProcess.Id
    $previewProcess.Refresh()
    if ($previewProcess.ExitCode -ne 0) {
        throw "Showcase preview failed with exit code $($previewProcess.ExitCode)."
    }
}
finally {
    $previewProcess.Refresh()
    if (-not $previewProcess.HasExited) {
        Stop-Process -Id $previewProcess.Id -Force -ErrorAction SilentlyContinue
    }
}
