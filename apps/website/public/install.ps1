# Intlayer installer for Windows — https://intlayer.org/install.ps1
#
# Usage (PowerShell):
#   irm https://intlayer.org/install.ps1 | iex
#   $env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
#   & ([scriptblock]::Create((irm https://intlayer.org/install.ps1))) -Mode desktop
#
# Also reachable from the CLI, which downloads and runs this very script:
#   npx intlayer init infra
#
# Windows counterpart of install.sh — same three setups, same files:
#
#   desktop  Desktop app (Tauri) — installs the dashboard as a native app on
#            this machine. It stays connected to the Intlayer Cloud
#            (intlayer.org); nothing to host.
#   docker   All-in-one container — dashboard + API + MongoDB + Redis + MinIO
#            + Chromium in a single Docker container. Quick self-host trials.
#   compose  Docker Compose stack — one process per container (app, backend,
#            mongo, redis, minio). Production self-hosting, scalable.
#
# The self-host modes deliberately do not start anything: first-run setup
# needs a working mailer, so they end by telling you what to fill in and
# printing the command to run. Reference: https://intlayer.org/doc/self-hosting
[CmdletBinding()]
param(
  # desktop | docker | compose — asked interactively when omitted.
  [string] $Mode = ''
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# ------------------------------------------------------------------ settings
if (-not $Mode) { $Mode = [string]$env:INTLAYER_MODE }

$SelfhostRef = if ($env:INTLAYER_SELFHOST_REF) { $env:INTLAYER_SELFHOST_REF } else { 'main' }
$SelfhostBaseUrl = if ($env:INTLAYER_SELFHOST_BASE_URL) { $env:INTLAYER_SELFHOST_BASE_URL } else {
  "https://raw.githubusercontent.com/aymericzip/intlayer/$SelfhostRef/docker/selfhost"
}

# docker (all-in-one)
$Image = if ($env:INTLAYER_IMAGE) { $env:INTLAYER_IMAGE } else { 'intlayer/intlayer-selfhost:latest' }
$ContainerName = if ($env:INTLAYER_CONTAINER_NAME) { $env:INTLAYER_CONTAINER_NAME } else { 'intlayer' }
$DataVolume = if ($env:INTLAYER_DATA_VOLUME) { $env:INTLAYER_DATA_VOLUME } else { 'intlayer-data' }
$EnvFile = if ($env:INTLAYER_ENV_FILE) { $env:INTLAYER_ENV_FILE } else { '.\intlayer.env' }

$AppPort = if ($env:INTLAYER_APP_PORT) { $env:INTLAYER_APP_PORT } else { '3000' }
$ApiPort = if ($env:INTLAYER_API_PORT) { $env:INTLAYER_API_PORT } else { '3100' }
$S3Port = if ($env:INTLAYER_S3_PORT) { $env:INTLAYER_S3_PORT } else { '9000' }
$ConsolePort = if ($env:INTLAYER_CONSOLE_PORT) { $env:INTLAYER_CONSOLE_PORT } else { '9001' }

# compose
$ComposeDir = if ($env:INTLAYER_COMPOSE_DIR) { $env:INTLAYER_COMPOSE_DIR } else { '.\intlayer' }

# desktop
$ReleasesApi = 'https://api.github.com/repos/aymericzip/intlayer/releases/latest'
$ReleasesPage = 'https://github.com/aymericzip/intlayer/releases/latest'
$DownloadDir = if ($env:INTLAYER_DOWNLOAD_DIR) { $env:INTLAYER_DOWNLOAD_DIR } else { Join-Path $HOME 'Downloads' }

function Write-Step([string] $Message) { Write-Host "▸ $Message" -ForegroundColor Cyan }
function Write-Warn([string] $Message) { Write-Host "! $Message" -ForegroundColor Yellow }
function Fail([string] $Message) { Write-Host "✗ $Message" -ForegroundColor Red; exit 1 }

# ------------------------------------------------------------ mode selection
function Select-Mode {
  if (-not [Environment]::UserInteractive -or [Console]::IsInputRedirected) {
    Fail 'No terminal to prompt on. Pick a mode explicitly: $env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex'
  }

  Write-Host @'

  How do you want to run Intlayer?

    1) Desktop app        Native app on this machine, connected to the
                          Intlayer Cloud (intlayer.org). Nothing to host.
    2) All-in-one Docker  Dashboard + API + MongoDB + Redis + MinIO in one
                          container. Quickest way to self-host.
    3) Docker Compose     One container per service. Scalable self-hosting,
                          each datastore replaceable by a managed one.

'@

  while ($true) {
    switch (Read-Host 'Choice [1-3]') {
      '1' { return 'desktop' }
      '2' { return 'docker' }
      '3' { return 'compose' }
      default { Write-Host '  Please answer 1, 2 or 3.' }
    }
  }
}

if (-not $Mode) { $Mode = Select-Mode }

if ($Mode -notin @('desktop', 'docker', 'compose')) {
  Fail "Unknown mode '$Mode' (expected desktop | docker | compose)"
}

# ------------------------------------------------------------- prerequisites
function Assert-Docker {
  if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Fail 'Docker Desktop is required. Install it and re-run this installer: https://docs.docker.com/desktop/setup/install/windows-install/'
  }

  docker info *> $null
  if ($LASTEXITCODE -ne 0) {
    Fail 'Docker is installed but the daemon is not running. Start Docker Desktop and retry.'
  }

  $version = docker version --format '{{.Server.Version}}' 2>$null
  Write-Step "Docker $version is ready"
}

function Assert-Compose {
  docker compose version *> $null
  if ($LASTEXITCODE -ne 0) {
    Fail "Docker Compose v2 is required (the 'docker compose' plugin, bundled with Docker Desktop)."
  }
}

# ------------------------------------------------------------ env file
function New-HexSecret([int] $ByteCount) {
  $bytes = New-Object byte[] $ByteCount
  [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  return ($bytes | ForEach-Object { $_.ToString('x2') }) -join ''
}

# Writes the environment file from the repository template with the secrets
# generated. An existing file is never touched, so re-running is an upgrade.
function Write-EnvFile([string] $Target) {
  if (Test-Path $Target) {
    Write-Step "Keeping the existing $Target (delete it to regenerate)"
    return
  }

  Write-Step "Writing $Target"
  $template = (Invoke-WebRequest -UseBasicParsing "$SelfhostBaseUrl/.env.template").Content

  $content = $template `
    -replace '(?m)^BETTER_AUTH_SECRET=.*$', "BETTER_AUTH_SECRET=$(New-HexSecret 32)" `
    -replace '(?m)^S3_SECRET_ACCESS_KEY=.*$', "S3_SECRET_ACCESS_KEY=$(New-HexSecret 16)"

  # LF line endings and no BOM: the file is read inside Linux containers.
  [IO.File]::WriteAllText((Join-Path (Get-Location) $Target), ($content -replace "`r`n", "`n"), (New-Object Text.UTF8Encoding $false))
}

$MailerReminder = @'
     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
'@

# ============================================================== desktop mode
# Downloads the latest Windows installer from the GitHub release that
# .github/workflows/tauri-app-release.yaml publishes.
function Invoke-Desktop {
  Write-Step 'Looking up the latest desktop release'
  try {
    $release = Invoke-RestMethod -UseBasicParsing $ReleasesApi
  } catch {
    Fail "Could not reach the GitHub releases API. Download the app manually: $ReleasesPage"
  }

  $asset = $release.assets | Where-Object { $_.name -match '_x64-setup\.exe$' } | Select-Object -First 1
  if (-not $asset) { $asset = $release.assets | Where-Object { $_.name -match '_x64_[a-z]{2}-[A-Z]{2}\.msi$' } | Select-Object -First 1 }
  if (-not $asset) { Fail "No Windows build in the latest release. See $ReleasesPage" }

  New-Item -ItemType Directory -Force -Path $DownloadDir | Out-Null
  $file = Join-Path $DownloadDir $asset.name
  Write-Step "Downloading $($asset.name)"
  Invoke-WebRequest -UseBasicParsing $asset.browser_download_url -OutFile $file

  # The desktop app embeds the dashboard's Node server and starts it with the
  # machine's own `node` binary.
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Warn 'Node.js was not found. The desktop app needs it to start: https://nodejs.org'
  }

  Write-Step 'Launching the installer'
  Start-Process -FilePath $file

  Write-Host @'

  Intlayer desktop is being installed. It signs in to the Intlayer Cloud
  (https://app.intlayer.org) — no server to run.

  To self-host instead, re-run this installer with $env:INTLAYER_MODE set to
  "docker" or "compose".

'@
}

# =============================================================== docker mode
function Invoke-Docker {
  Assert-Docker
  Write-EnvFile $EnvFile

  Write-Step "Pulling $Image"
  docker pull $Image
  if ($LASTEXITCODE -ne 0) { Fail "docker pull failed" }

  Write-Host @"

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       $EnvFile

$MailerReminder
  2. Start Intlayer:

       docker run -d --name $ContainerName ``
         --restart unless-stopped ``
         -p ${AppPort}:3000 ``
         -p ${ApiPort}:3100 ``
         -p ${S3Port}:9000 ``
         -p ${ConsolePort}:9001 ``
         -v ${DataVolume}:/data ``
         --env-file $EnvFile ``
         $Image

  Then open http://localhost:$AppPort — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker logs -f $ContainerName
    Stop      docker rm -f $ContainerName
    Upgrade   re-run this installer, then recreate the container

"@
}

# ============================================================== compose mode
# Downloads docker/selfhost/docker-compose.yml from the repository next to the
# generated .env and pulls the images.
function Invoke-Compose {
  Assert-Docker
  Assert-Compose

  New-Item -ItemType Directory -Force -Path $ComposeDir | Out-Null
  Write-Step "Fetching docker-compose.yml into $ComposeDir"
  Invoke-WebRequest -UseBasicParsing "$SelfhostBaseUrl/docker-compose.yml" -OutFile (Join-Path $ComposeDir 'docker-compose.yml')
  Write-EnvFile (Join-Path $ComposeDir '.env')

  Write-Step 'Pulling images'
  Push-Location $ComposeDir
  try {
    docker compose pull
    if ($LASTEXITCODE -ne 0) { Fail 'docker compose pull failed' }
  } finally {
    Pop-Location
  }

  Write-Host @"

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       $ComposeDir\.env

$MailerReminder
  2. Start the stack:

       cd $ComposeDir; docker compose up -d

  Then open http://localhost:$AppPort — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull; docker compose up -d

"@
}

switch ($Mode) {
  'desktop' { Invoke-Desktop }
  'docker'  { Invoke-Docker }
  'compose' { Invoke-Compose }
}
