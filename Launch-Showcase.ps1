$ErrorActionPreference = 'Stop'

$showcaseRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverScript = Join-Path $showcaseRoot 'Start-Showcase.ps1'
$siteUrl = 'http://127.0.0.1:4173/#/'
$healthUrl = 'http://127.0.0.1:4173/'

function Show-LaunchError([string]$message) {
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.MessageBox]::Show(
        $message,
        '工业自动化能力展示站',
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Error
    ) | Out-Null
}

function Test-ShowcaseReady {
    try {
        $response = Invoke-WebRequest -Uri $healthUrl -UseBasicParsing -TimeoutSec 2
        return $response.StatusCode -eq 200 -and $response.Content -match '工业自动化能力图谱'
    }
    catch {
        return $false
    }
}

try {
    if (Test-ShowcaseReady) {
        Start-Process $siteUrl
        exit 0
    }

    $portInUse = netstat -ano | Select-String -Quiet -Pattern ':4173\s+.*LISTENING'
    if ($portInUse) {
        throw '端口 4173 已被其他程序占用，请先关闭占用程序后再启动。'
    }

    if (-not (Test-Path -LiteralPath $serverScript)) {
        throw "找不到启动脚本：$serverScript"
    }

    $windowsPowerShell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
    $serverArguments = @(
        '-NoProfile',
        '-ExecutionPolicy', 'Bypass',
        '-File', "`"$serverScript`""
    )

    # 保留服务窗口，用户可以查看构建结果并通过关闭窗口停止站点。
    $serverStartParameters = @{
        FilePath = $windowsPowerShell
        ArgumentList = $serverArguments
        WorkingDirectory = $showcaseRoot
        WindowStyle = 'Normal'
        PassThru = $true
    }
    $serverProcess = Start-Process @serverStartParameters

    $deadline = [DateTime]::UtcNow.AddSeconds(90)
    while ([DateTime]::UtcNow -lt $deadline) {
        if (Test-ShowcaseReady) {
            Start-Process $siteUrl
            exit 0
        }

        if ($serverProcess.HasExited) {
            throw "本地服务未能启动，退出代码：$($serverProcess.ExitCode)。请查看服务窗口中的错误信息。"
        }

        Start-Sleep -Milliseconds 400
    }

    throw '等待本地服务超时。请查看服务窗口中的错误信息。'
}
catch {
    Show-LaunchError $_.Exception.Message
    exit 1
}
