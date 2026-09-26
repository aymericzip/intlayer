---
createdAt: 2026-09-21
updatedAt: 2026-09-21
priority: 5
title: CLI - Init Infra
description: Erfahren Sie, wie Sie mit dem Intlayer CLI init infra-Befehl die Desktop-App installieren oder das Intlayer CMS mit Docker (All-in-One-Container oder Docker Compose-Stack) selbst hosten.
keywords:
  - CLI
  - Infrastruktur
  - Self-Hosting
  - Desktop-App
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "Befehl init infra hinzufügen"
author: aymericzip
---

# Intlayer CLI Init Infra Befehl

## Beschreibung

Der Befehl `init infra` richtet die Intlayer-Infrastruktur auf Ihrem Computer ein. Er lädt das gehostete Installationsprogramm für Ihre Plattform herunter (`https://intlayer.org/install.sh` unter macOS / Linux, `https://intlayer.org/install.ps1` unter Windows) und führt es im Terminal aus, sodass das Menü und die Fortschrittsausgabe unverändert angezeigt werden.

Das Installationsprogramm fragt, wie Sie Intlayer ausführen möchten:

- **Desktop-App**: Lädt das native Dashboard für Ihr Betriebssystem und Ihre CPU herunter und öffnet oder installiert es. Die Desktop-Version verbindet sich mit dem Intlayer Cloud-Backend.
- **All-in-One Docker**: Dashboard + API + MongoDB + Redis + MinIO in einem einzigen Container mit einem Volume. Schreibt `./intlayer.env` mit generierten Secrets und lädt das Image `intlayer/cms-all` herunter.
- **Docker Compose**: Ein Container pro Dienst für skalierbares Self-Hosting. Schreibt `docker-compose.yml` und `.env` nach `./intlayer/` und lädt die Images herunter.

Das gehostete Installationsprogramm ist die zentrale Referenz für den Einrichtungsprozess: Die CLI führt es aus, anstatt die Schritte neu zu implementieren, sodass `npx intlayer init infra` und `curl -fsSL https://intlayer.org/install.sh | sh` genau dasselbe tun.

## Verwendung

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

Derselbe Schritt wird auch in der Checkliste von `npx intlayer init --interactive` unter **Infrastruktur (Desktop-App / Self-Hosting)** angeboten.

## Optionen

- `-m, --mode <mode>` - Optional. Überspringt das Menü und führt einen Modus direkt aus. Zulässige Werte: `desktop`, `docker` (All-in-One) oder `compose`. Jeder andere Wert wird mit einer Fehlermeldung beendet.

## Beispiele

### Modus interaktiv auswählen

```bash
npx intlayer init infra
```

### Desktop-App installieren

```bash
npx intlayer init infra --mode desktop
```

### Self-Hosting mit dem All-in-One-Container

```bash
npx intlayer init infra --mode docker
```

### Self-Hosting mit Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Beispielausgabe

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## Installationsprogramm-Einstellungen

Das Installationsprogramm liest einige Umgebungsvariablen, die die CLI unverändert weitergibt. Setzen Sie diese vor dem Ausführen in der Shell:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Variable                  | Standard                  | Gilt für | Beschreibung                                                    |
| ------------------------- | ------------------------- | -------- | --------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(gefragt)_               | alle     | `desktop`, `docker` oder `compose`, entspricht `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop  | Speicherort für das Installationsprogramm der App               |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker   | All-in-One-Image zum Herunterladen                              |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker   | Speicherort für die Umgebungsdatei                              |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker   | Containername                                                   |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker   | Benanntes Volume gemountet unter `/data`                        |
| `INTLAYER_APP_PORT`       | `3000`                    | docker   | Host-Port für das Dashboard                                     |
| `INTLAYER_API_PORT`       | `3100`                    | docker   | Host-Port für die API                                           |
| `INTLAYER_S3_PORT`        | `9000`                    | docker   | Host-Port für die MinIO S3-API                                  |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker   | Host-Port für die MinIO-Konsole                                 |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose  | Speicherort für `docker-compose.yml` und `.env`                 |
| `INTLAYER_SELFHOST_REF`   | `main`                    | beide    | Git-Ref, von der die Compose-Datei und Vorlage abgerufen werden |

> Die Portvariablen ändern nur die **Host**-Seite des Mappings. Die veröffentlichten Images haben `http://localhost:3000`, `http://localhost:3100` und `http://localhost:9000` im Bundle kompiliert. Behalten Sie die Standardwerte bei, es sei denn, Sie erstellen eigene Images: siehe den [Self-Hosting-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md#limitations).

## Anforderungen

- **Desktop-App** benötigt [Node.js](https://nodejs.org): Die App bettet den Dashboard-Server ein und startet ihn mit der maschineneigenen `node`-Binärdatei.
- **Docker-Modi** benötigen [Docker](https://docs.docker.com/get-docker/) (Docker Desktop mit WSL 2-Backend unter Windows). Der Compose-Modus benötigt zusätzlich das `docker compose`-Plugin.

## Hinweise

- Das erneute Ausführen des Befehls ist sicher: Eine vorhandene Umgebungsdatei wird nie überschrieben, was auch als Upgrade-Pfad dient (neue Images werden geladen, Secrets bleiben erhalten).
- Das Installationsprogramm wird in ein temporäres Verzeichnis heruntergeladen und nach dem Beenden gelöscht.
- Der Exit-Code des Befehls entspricht dem des Installationsprogramms. Schlägt der Download fehl, gibt die CLI den entsprechenden `curl … | sh` bzw. `irm … | iex`-Befehl aus.
- Die Docker-Modi benötigen einen Mailer für Anmelde-E-Mails. Konfigurieren Sie nach Abschluss Resend oder SMTP in der erstellten Umgebungsdatei: siehe [Globaler Mailer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md#global-mailer).

## Verwandt

- [Self-Hosting-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) - Architektur, erste Schritte und Einschränkungen jedes Modus
- [Intlayer initialisieren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/init.md) - Der übergeordnete `init`-Befehl und seine interaktive Checkliste
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) - Funktionen des installierten Dashboards
