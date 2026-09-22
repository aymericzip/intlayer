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
# The self-host modes write the environment file through a short wizard
# (domain, mailer, optional integrations) but deliberately do not start
# anything: they end by printing the command to run, so the file can still be
# reviewed first. Reference: https://intlayer.org/doc/self-hosting
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
$Image = if ($env:INTLAYER_IMAGE) { $env:INTLAYER_IMAGE } else { 'intlayer/cms-all:latest' }
$ContainerName = if ($env:INTLAYER_CONTAINER_NAME) { $env:INTLAYER_CONTAINER_NAME } else { 'intlayer' }
$DataVolume = if ($env:INTLAYER_DATA_VOLUME) { $env:INTLAYER_DATA_VOLUME } else { 'intlayer-data' }
$EnvFile = if ($env:INTLAYER_ENV_FILE) { $env:INTLAYER_ENV_FILE } else { '.\intlayer.env' }

$AppPort = if ($env:INTLAYER_APP_PORT) { $env:INTLAYER_APP_PORT } else { '3000' }
$ApiPort = if ($env:INTLAYER_API_PORT) { $env:INTLAYER_API_PORT } else { '3100' }
$S3Port = if ($env:INTLAYER_S3_PORT) { $env:INTLAYER_S3_PORT } else { '9000' }
$ConsolePort = if ($env:INTLAYER_CONSOLE_PORT) { $env:INTLAYER_CONSOLE_PORT } else { '9001' }

# compose
$ComposeDir = if ($env:INTLAYER_COMPOSE_DIR) { $env:INTLAYER_COMPOSE_DIR } else { '.\intlayer' }

# A custom domain needs the dashboard rebuilt with its URLs compiled in. Docker
# can build straight from the repository, no checkout needed.
$RepositoryBuildContext = if ($env:INTLAYER_BUILD_CONTEXT) { $env:INTLAYER_BUILD_CONTEXT } else {
  "https://github.com/aymericzip/intlayer.git#$SelfhostRef"
}
$CustomImage = if ($env:INTLAYER_CUSTOM_IMAGE) { $env:INTLAYER_CUSTOM_IMAGE } else { 'intlayer/cms-all:custom' }

# Filled in by the wizard (Set-EnvFileAnswers). Empty means localhost.
$PublicDomain = ''
$PublicAppUrl = ''
$PublicBackendUrl = ''
$PublicS3Url = ''
$MailerConfigured = $false
# Compose expands `$VAR` inside .env values (`$$` is a literal `$`);
# `docker run --env-file` does not. Set per mode before writing the file.
$EscapeDollar = $false

# desktop
$ReleasesApi = 'https://api.github.com/repos/aymericzip/intlayer/releases/latest'
$ReleasesPage = 'https://github.com/aymericzip/intlayer/releases/latest'
$DownloadDir = if ($env:INTLAYER_DOWNLOAD_DIR) { $env:INTLAYER_DOWNLOAD_DIR } else { Join-Path $HOME 'Downloads' }

function Write-Step([string] $Message) { Write-Host "▸ $Message" -ForegroundColor Cyan }
function Write-Warn([string] $Message) { Write-Host "! $Message" -ForegroundColor Yellow }
function Fail([string] $Message) { Write-Host "✗ $Message" -ForegroundColor Red; exit 1 }

function Test-Interactive {
  return [Environment]::UserInteractive -and -not [Console]::IsInputRedirected
}

# The answer to a free-text question, or the suggestion when the user just
# presses Enter.
function Read-Answer([string] $Question, [string] $Suggestion = '') {
  Write-Host '? ' -ForegroundColor Cyan -NoNewline
  $label = if ($Suggestion) { "$Question [$Suggestion]" } else { $Question }
  $answer = Read-Host $label
  if ($answer) { return $answer } else { return $Suggestion }
}

# Same as Read-Answer, with the input hidden (API keys, passwords).
function Read-Secret([string] $Question) {
  Write-Host '? ' -ForegroundColor Cyan -NoNewline
  $secure = Read-Host $Question -AsSecureString
  return [Runtime.InteropServices.Marshal]::PtrToStringBSTR(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
}

# ------------------------------------------------------------ mode selection
function Select-Mode {
  if (-not (Test-Interactive)) {
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

# Sets KEY=value in an env file: replaces the first `KEY=` line, commented out
# or not (the template ships optional keys as `# KEY=example`), or appends it.
function Set-EnvValue([string] $Target, [string] $Key, [string] $Value) {
  if ($EscapeDollar) { $Value = $Value -replace '\$', '$$$$' }
  $line = "$Key=$Value"
  $pattern = "(?m)^#? ?$([regex]::Escape($Key))=.*$"
  $content = [IO.File]::ReadAllText($Target)

  if ($content -match $pattern) {
    # The replacement is a literal: `$` in the value must not be a group reference.
    $evaluator = [Text.RegularExpressions.MatchEvaluator] { param($match) $line }.GetNewClosure()
    $content = [regex]::new($pattern).Replace($content, $evaluator, 1)
  } else {
    if (-not $content.EndsWith("`n")) { $content += "`n" }
    $content += "$line`n"
  }

  # LF line endings and no BOM: the file is read inside Linux containers.
  [IO.File]::WriteAllText($Target, ($content -replace "`r`n", "`n"), (New-Object Text.UTF8Encoding $false))
}

# "https://s3.example.org/intlayer" → "https://s3.example.org"
function Get-UrlOrigin([string] $Url) {
  if ($Url -match '^([a-z]+://[^/]+)') { return $Matches[1] }
  return ($Url -split '/')[0]
}

# Reduces "https://www.example.org/" to "example.org". Empty for localhost,
# which is the template default.
function Get-NormalizedDomain([string] $Domain) {
  $domain = $Domain.Trim() -replace '^https?://', ''
  $domain = ($domain -split '/')[0]
  $domain = ($domain -replace '^www\.', '').ToLowerInvariant()
  if ($domain -in @('', 'localhost', '127.0.0.1')) { return '' }
  return $domain
}

# .NET file APIs resolve relative paths against the process directory, not
# PowerShell's current location.
function Resolve-TargetPath([string] $Target) {
  if ([IO.Path]::IsPathRooted($Target)) { return $Target }
  return Join-Path (Get-Location) $Target
}

# Asks for the domain, the mailer and the optional integrations, and writes the
# answers into the env file. Every answer can be changed in the file afterwards.
function Set-EnvFileAnswers([string] $Target) {
  Write-Host @"

  Let's fill in $(Split-Path -Leaf $Target). Press Enter to accept a suggestion;
  every value can be changed later in the file.

"@

  # --- Domain: the dashboard, the API and the object storage each get a host.
  $script:PublicDomain = Get-NormalizedDomain (Read-Answer 'Domain Intlayer will be served on (empty = localhost only)')

  if ($PublicDomain) {
    $script:PublicAppUrl = Read-Answer 'Dashboard URL' "https://cms.$PublicDomain"
    $script:PublicBackendUrl = Read-Answer 'API URL' "https://back.$PublicDomain"
    $script:PublicS3Url = Read-Answer 'Object storage public URL (browser-facing MinIO)' "https://s3.$PublicDomain/intlayer"

    Set-EnvValue $Target 'DOMAIN' $PublicDomain
    Set-EnvValue $Target 'APP_URL' $PublicAppUrl
    Set-EnvValue $Target 'BACKEND_URL' $PublicBackendUrl
    Set-EnvValue $Target 'S3_PUBLIC_URL' $PublicS3Url
  }

  # --- Mailer: first-run setup verifies the first account by email.
  Write-Host @'

  How should Intlayer send emails? The first account cannot be verified
  without a working mailer.

    1) Resend            API key from resend.com
    2) SMTP relay        Your own SMTP server
    3) Later             Fill in the file by hand before starting

'@
  $mailFromSuggestion = "Intlayer <no-reply@$(if ($PublicDomain) { $PublicDomain } else { 'example.com' })>"
  while ($true) {
    $choice = Read-Answer 'Choice [1-3]'
    if ($choice -eq '1') {
      Set-EnvValue $Target 'RESEND_API_KEY' (Read-Secret 'Resend API key')
      Set-EnvValue $Target 'MAIL_FROM' (Read-Answer 'Sender address' $mailFromSuggestion)
      $script:MailerConfigured = $true
      break
    }
    if ($choice -eq '2') {
      Set-EnvValue $Target 'MAIL_SMTP_HOST' (Read-Answer 'SMTP host')
      $smtpPort = Read-Answer 'SMTP port' '587'
      Set-EnvValue $Target 'MAIL_SMTP_PORT' $smtpPort
      # Port 465 is implicit TLS; 587 / 25 upgrade with STARTTLS.
      Set-EnvValue $Target 'MAIL_SMTP_SECURE' $(if ($smtpPort -eq '465') { 'true' } else { 'false' })
      Set-EnvValue $Target 'MAIL_SMTP_USER' (Read-Answer 'SMTP user (empty for an unauthenticated relay)')
      Set-EnvValue $Target 'MAIL_SMTP_PASSWORD' (Read-Secret 'SMTP password')
      Set-EnvValue $Target 'MAIL_FROM' (Read-Answer 'Sender address' $mailFromSuggestion)
      $script:MailerConfigured = $true
      break
    }
    if ($choice -eq '3') { break }
    Write-Host '  Please answer 1, 2 or 3.'
  }

  # --- Optional integrations: blank leaves the feature disabled.
  $openAiKey = Read-Secret 'OpenAI API key, enables AI translation (empty = skip)'
  if ($openAiKey) { Set-EnvValue $Target 'OPENAI_API_KEY' $openAiKey }
}

# Writes the environment file from the repository template with the secrets
# generated, then runs the wizard when a terminal is available. An existing
# file is never touched, so re-running is an upgrade.
function Write-EnvFile([string] $Target) {
  if (Test-Path $Target) {
    Write-Step "Keeping the existing $Target (delete it to regenerate)"
    return
  }

  Write-Step "Writing $Target"
  $template = (Invoke-WebRequest -UseBasicParsing "$SelfhostBaseUrl/.env.template").Content

  # LF line endings and no BOM: the file is read inside Linux containers.
  $path = Resolve-TargetPath $Target
  [IO.File]::WriteAllText($path, ($template -replace "`r`n", "`n"), (New-Object Text.UTF8Encoding $false))

  # The template ships the secrets blank; fill them in place.
  Set-EnvValue $path 'BETTER_AUTH_SECRET' (New-HexSecret 32)
  Set-EnvValue $path 'S3_SECRET_ACCESS_KEY' (New-HexSecret 16)

  if (Test-Interactive) {
    Set-EnvFileAnswers $path
  } else {
    Write-Warn "No terminal: skipping the setup questions. Edit $Target by hand."
  }
}

$MailerReminder = @'
     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.

'@

# The published dashboard image has http://localhost:3000 compiled in, so a
# custom domain needs an image built with its URLs. Docker builds it straight
# from the repository.
function Write-CustomDomainNotice {
  Write-Host @"
  Your domain is $PublicDomain. Two things follow from that:

  - The published dashboard image only works on localhost; the command below
    builds one with your URLs compiled in (takes a while, no checkout needed).
  - Route the hosts to the container through your reverse proxy (with TLS):

       $PublicAppUrl  →  port $AppPort
       $PublicBackendUrl  →  port $ApiPort
       $(Get-UrlOrigin $PublicS3Url)  →  port $S3Port

"@
}

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

  if ($PublicDomain) {
    $script:Image = $CustomImage
  } else {
    Write-Step "Pulling $Image"
    docker pull $Image
    if ($LASTEXITCODE -ne 0) { Fail "docker pull failed" }
  }

  $step = 1
  Write-Host "`n  Everything is installed.`n"

  if ($PublicDomain) {
    Write-CustomDomainNotice
    Write-Host @"
  $step. Build the image for ${PublicDomain}:

       docker build -f docker/selfhost/Dockerfile ``
         --build-arg VITE_DOMAIN=$PublicDomain ``
         --build-arg VITE_SITE_URL=$PublicAppUrl ``
         --build-arg VITE_IDE_URL=$PublicAppUrl ``
         --build-arg VITE_BACKEND_URL=$PublicBackendUrl ``
         -t $Image ``
         $RepositoryBuildContext

"@
    $step++
  }

  if (-not $MailerConfigured) {
    Write-Host @"
  $step. Configure a mailer in:

       $EnvFile

$MailerReminder
"@
    $step++
  }

  $openUrl = if ($PublicAppUrl) { $PublicAppUrl } else { "http://localhost:$AppPort" }
  Write-Host @"
  $step. Start Intlayer:

       docker run -d --name $ContainerName ``
         --restart unless-stopped ``
         -p ${AppPort}:3000 ``
         -p ${ApiPort}:3100 ``
         -p ${S3Port}:9000 ``
         -p ${ConsolePort}:9001 ``
         -v ${DataVolume}:/data ``
         --env-file $EnvFile ``
         $Image

  Then open $openUrl
  First boot initialises the datastores, so give it a minute. The first
  account you create becomes the super admin.

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

  $script:EscapeDollar = $true
  New-Item -ItemType Directory -Force -Path $ComposeDir | Out-Null
  Write-Step "Fetching docker-compose.yml into $ComposeDir"
  Invoke-WebRequest -UseBasicParsing "$SelfhostBaseUrl/docker-compose.yml" -OutFile (Join-Path $ComposeDir 'docker-compose.yml')
  Write-EnvFile (Join-Path $ComposeDir '.env')

  $composeCommand = 'docker compose'
  $upgradeCommand = 'docker compose pull; docker compose up -d'
  $buildFlag = ''

  if ($PublicDomain) {
    # The build override reads DOMAIN / APP_URL / BACKEND_URL from .env and
    # passes them as build args; the context points at the repository so no
    # checkout is needed.
    Write-Step 'Fetching docker-compose.build.yml (custom domain: images are built, not pulled)'
    Invoke-WebRequest -UseBasicParsing "$SelfhostBaseUrl/docker-compose.build.yml" -OutFile (Join-Path $ComposeDir 'docker-compose.build.yml')
    Set-EnvValue (Resolve-TargetPath (Join-Path $ComposeDir '.env')) 'INTLAYER_BUILD_CONTEXT' $RepositoryBuildContext
    $composeCommand = 'docker compose -f docker-compose.yml -f docker-compose.build.yml'
    $upgradeCommand = "$composeCommand up -d --build   (rebuilds from the latest $SelfhostRef)"
    $buildFlag = ' --build'
  } else {
    Write-Step 'Pulling images'
    Push-Location $ComposeDir
    try {
      docker compose pull
      if ($LASTEXITCODE -ne 0) { Fail 'docker compose pull failed' }
    } finally {
      Pop-Location
    }
  }

  $step = 1
  Write-Host "`n  Everything is installed.`n"
  if ($PublicDomain) { Write-CustomDomainNotice }

  if (-not $MailerConfigured) {
    Write-Host @"
  $step. Configure a mailer in:

       $ComposeDir\.env

$MailerReminder
"@
    $step++
  }

  $startNote = if ($PublicDomain) { ' (the first run builds the images)' } else { '' }
  $openUrl = if ($PublicAppUrl) { $PublicAppUrl } else { "http://localhost:$AppPort" }
  Write-Host @"
  $step. Start the stack${startNote}:

       cd $ComposeDir; $composeCommand up -d$buildFlag

  Then open $openUrl
  First boot initialises the datastores, so give it a minute. The first
  account you create becomes the super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   $upgradeCommand

"@
}

switch ($Mode) {
  'desktop' { Invoke-Desktop }
  'docker'  { Invoke-Docker }
  'compose' { Invoke-Compose }
}
