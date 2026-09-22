---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Self-hosting Intlayer
description: "Uruchom Intlayer na własnej infrastrukturze: jako aplikację desktopową, pojedynczy kontener Docker all-in-one lub skalowalny stos Docker Compose. Konto Intlayer Cloud nie jest wymagane."
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Aplikacja desktopowa
  - Intlayer
  - CMS
  - Instalacja
  - Infrastruktura
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Self-hosting Intlayer

Intlayer może działać na Twojej własnej infrastrukturze, bez konieczności posiadania konta Intlayer Cloud. Dostępne są trzy konfiguracje, zarządzane przez ten sam instalator (`install.sh`, `install.ps1` w systemie Windows lub `npx intlayer init infra`):

| Setup                    | What it is                                                                          | Pick it for                                        |
| ------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Aplikacja desktopowa** | Natywny pulpit nawigacyjny dla systemów macOS, Linux i Windows                      | Klient lokalny, brak konieczności hostowania       |
| **All-in-one Docker**    | Pulpit nawigacyjny, API, MongoDB, Redis i MinIO w **jednym kontenerze**             | Wersje próbne i instalacje na pojedynczej maszynie |
| **Docker Compose**       | **Jeden kontener na usługę**, każdy magazyn danych wymienialny na usługę zarządzaną | Produkcja, skalowanie, zarządzane bazy danych      |

## Table of Contents

<TOC/>

## Opublikowane obrazy i pakiety

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Wszystkie trzy obrazy są budowane z tego samego pliku [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) i publikowane przy każdym wydaniu. Stos Compose pobiera również oficjalne obrazy `mongo:8`, `redis:8-alpine` oraz `quay.io/minio/minio`.

## Konfiguracja

Instalator pyta o preferowaną konfigurację, sprawdza wymagania wstępne (proponując instalację Dockera), zapisuje plik środowiskowy z wygenerowanymi sekretami i pobiera obrazy. Nigdy nie uruchamia niczego samodzielnie: tryby Dockera wymagają najpierw mailera, więc na końcu wyświetla polecenie do uruchomienia. Ponowne uruchomienie jest bezpieczne: istniejący plik środowiskowy nigdy nie jest nadpisywany, co czyni go również ścieżką aktualizacji.

<Tabs group="mode">
<Tab label="Aplikacja desktopowa" value="desktop">

Pulpit nawigacyjny Intlayer jako natywna aplikacja zbudowana w Tauri. Loguje się do Intlayer Cloud (`https://app.intlayer.org`), więc nie trzeba niczego hostować. To właściwy wybór, gdy wolisz lokalnego klienta zamiast karty przeglądarki.

### Instalacja

Instalator pobiera pakiet dla Twojego systemu operacyjnego i procesora, a następnie otwiera go (macOS), instaluje (`dpkg` / `rpm` w systemie Linux) lub uruchamia kreatora instalacji (Windows). Możesz go także pobrać ręcznie ze [strony wydań](https://github.com/aymericzip/intlayer/releases/latest).

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "desktop"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode desktop
```

</Tab>
</Tabs>

### Wymagania

- **Node.js**: aplikacja zawiera wbudowany serwer pulpitu i uruchamia go przy użyciu pliku binarnego `node` z systemu. Zainstaluj go z [nodejs.org](https://nodejs.org), jeśli aplikacja się nie uruchamia.

> Opublikowana wersja desktopowa łączy się z backendem Intlayer Cloud. Skierowanie jej na własny backend wymaga przebudowania aplikacji ze zmienną `VITE_BACKEND_URL` wskazującą na Twoje API, zobacz [Ograniczenia](#limitations).

</Tab>
<Tab label="All-in-one Docker" value="docker">

Wszystko działa wewnątrz pojedynczego kontenera `intlayer/cms-all`, nadzorowanego przez [s6-overlay](https://github.com/just-containers/s6-overlay), a każdy magazyn danych jest utrwalany w jednym wolumenie.

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (baked at build)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────────┐
          ▼          ▼         ▼               ▼
      mongo:27017  redis:6379  minio:9000   Chromium
      /data/mongo  /data/redis /data/minio  (in-image)
      (1-node RS)              minio:9001
```

| Usługa      | Port(y) hosta                 | Przeznaczenie                                              |
| ----------- | ----------------------------- | ---------------------------------------------------------- |
| **app**     | `3000`                        | Pulpit nawigacyjny (interfejs CMS)                         |
| **backend** | `3100`                        | REST API (punkt końcowy `/health`)                         |
| **mongo**   | wewnętrzny                    | MongoDB 8, jedno-węzłowy zestaw replik `rs0`               |
| **redis**   | wewnętrzny                    | Kolejki zadań (BullMQ) i buforowanie                       |
| **minio**   | `9000` (S3), `9001` (konsola) | Magazyn obiektów zgodny z S3 dla awatarów i zrzutów ekranu |

Kolejność uruchamiania jest wymuszana przez zależności s6 (`mongod` → init replica-set, `minio` → utworzenie zasobnika, następnie `backend`, a potem `app`), a usługi restartują się po zakończeniu, dzięki czemu pierwszy rozruch naprawia się samoczynnie.

### Wymagania wstępne

- **Docker** ≥ 24: instalator oferuje jego instalację (przez [get.docker.com](https://get.docker.com) w systemie Linux, Homebrew w macOS). W systemie Windows najpierw zainstaluj [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Wolne porty `3000`, `3100`, `9000` i `9001` na hoście. MinIO `9000` musi być dostępne dla przeglądarki, która ładuje zasoby bezpośrednio z `S3_PUBLIC_URL`.
- Mailer: klucz API [Resend](https://resend.com) lub przekaźnik SMTP.

### 1. Instalacja

Zapisuje `./intlayer.env` z wygenerowanymi `BETTER_AUTH_SECRET` oraz `S3_SECRET_ACCESS_KEY` i pobiera `intlayer/cms-all:latest`.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode docker
```

</Tab>
</Tabs>

### 2. Konfiguracja mailera

Otwórz `intlayer.env` i uzupełnij Resend **lub** SMTP (szczegóły w sekcji [Globalny mailer](#global-mailer)):

```sh fileName="intlayer.env"
# Option A: Resend
RESEND_API_KEY=<your-resend-key>

# Option B: SMTP (takes over from Resend as soon as MAIL_SMTP_HOST is set)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. Uruchomienie

Oto polecenie, które wyświetla instalator:

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Windows" value="windows">

```powershell
docker run -d --name intlayer `
  --restart unless-stopped `
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 `
  -v intlayer-data:/data `
  --env-file ./intlayer.env `
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

CLI uruchamia instalator, który wyświetla polecenie `docker run …` widoczne na pozostałych kartach. Skopiuj je do terminala po skonfigurowaniu mailera.

</Tab>
</Tabs>

Otwórz **http://localhost:3000** i postępuj zgodnie z instrukcją [Pierwsza konfiguracja](#first-run-setup). Pierwsze uruchomienie inicjalizuje zestaw replik oraz zasobnik, odczekaj chwilę.

### Kopia zapasowa i aktualizacja

Cały stan znajduje się w wolumenie `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Aby zaktualizować, uruchom ponownie instalator (pobiera najnowszy obraz i zachowuje `intlayer.env`), a następnie wykonaj `docker rm -f intlayer` i uruchom ponownie polecenie startowe. Aby użyć zarządzanej bazy MongoDB zamiast wbudowanej, ustaw `MONGODB_URI` w `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Jeden kontener na usługę w prywatnej sieci Compose. Pulpit nawigacyjny i API korzystają z opublikowanych obrazów `intlayer/cms-frontend` oraz `intlayer/cms-backend`; magazyny danych korzystają z oficjalnych obrazów `mongo`, `redis` i `minio`.

```
                ┌───────────────────┐
 browser ──────▶ │  app        :3000 │ ── SSR ──▶ http://backend:3100
 (localhost)    └───────────────────┘
                ┌───────────────────┐
 browser ──────▶ │  backend    :3100 │
 (localhost)    └─────────┬─────────┘
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     mongo:27017     redis:6379      minio:9000 ◀── browser (assets)
     (1-node RS)                     minio:9001
```

| Usługa       | Obraz                   | Rola                                                                       |
| ------------ | ----------------------- | -------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Pulpit nawigacyjny na `:3000`; oczekuje na sprawność backendu              |
| `backend`    | `intlayer/cms-backend`  | API na `:3100` z Chromium; oczekuje na Mongo, Redis i zasobnik MinIO       |
| `mongo`      | `mongo:8`               | Jedno-węzłowy zestaw replik `rs0`, inicjalizowany przez własny healthcheck |
| `redis`      | `redis:8-alpine`        | Kolejki i buforowanie, trwałość append-only                                |
| `minio`      | `quay.io/minio/minio`   | Pamięć S3 na `:9000`, konsola na `:9001`                                   |
| `minio-init` | `quay.io/minio/mc`      | Pojedyncze uruchomienie: tworzy zasobnik i politykę anonimowego pobierania |

Dane są przechowywane w wolumenach `intlayer_mongo-data`, `intlayer_redis-data` oraz `intlayer_minio-data`. Połączenia między usługami (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, wewnętrzny adres URL backendu używany przez SSR) są ustalone w pliku compose i mają pierwszeństwo przed `.env`, który zawiera tylko sekrety i opcjonalne integracje.

### Wymagania wstępne

- **Docker** ≥ 24 z wtyczką Compose: instalator oferuje jego instalację w systemach Linux i macOS. W systemie Windows najpierw zainstaluj [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Wolne porty `3000`, `3100`, `9000` i `9001` na hoście.
- Mailer: klucz API [Resend](https://resend.com) lub przekaźnik SMTP.

### 1. Instalacja

Zapisuje `docker-compose.yml` oraz `.env` z wygenerowanymi sekretami w `./intlayer/` i pobiera obrazy.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

Or by hand:

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY (openssl rand -hex 32)
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

Or by hand:

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. Konfiguracja mailera

Uzupełnij Resend **lub** SMTP w `intlayer/.env`, dokładnie tak samo jak w konfiguracji all-in-one (zobacz [Globalny mailer](#global-mailer)).

### 3. Uruchomienie

```sh
cd intlayer && docker compose up -d
```

Otwórz **http://localhost:3000** i postępuj zgodnie z instrukcją [Pierwsza konfiguracja](#first-run-setup).

### Zarządzane magazyny danych

Usuń zastępowaną usługę z pliku compose (oraz jej wpis w `depends_on` w `backend`), a następnie nadpisz odpowiednią zmienną:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` zachowują swoje znaczenie w przypadku każdego dostawcy zgodnego z S3.

### Skalowanie

`app` i `backend` są bezstanowe (stateless). Za modułem równoważenia obciążenia `docker compose up -d --scale backend=3` działa po usunięciu stałych mapowań portów hosta i gdy proxy odwołuje się do usług po nazwie. Zadania w tle są koordynowane za pośrednictwem Redis (BullMQ), więc wiele replik backendu bezpiecznie współdzieli kolejkę.

### Budowanie ze źródeł

W sklonowanym repozytorium plik nadpisujący przełącza obie usługi Intlayer z `image:` na `build:`:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

W ten sposób można również utworzyć obrazy dla domeny niestandardowej: przekaż wartości `VITE_*` jako build args (zobacz [Ograniczenia](#limitations)).

### Kopia zapasowa i aktualizacja

```sh
# Backup one volume (repeat for intlayer_redis-data and intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# Upgrade, volumes are kept
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### Ustawienia instalatora

Bez `--mode` (lub `INTLAYER_MODE`) instalator wyświetla menu: `desktop`, `docker` (all-in-one) lub `compose`. Odczytuje również kilka zmiennych środowiskowych. Ponieważ instalator jest przekazywany potokiem do powłoki, przekaż je do powłoki, a nie do `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
```

| Variable                  | Default                   | Applies to | Description                                                |
| ------------------------- | ------------------------- | ---------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(asked)_                 | all        | `desktop`, `docker` or `compose`, same as `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop    | Where the app installer is saved                           |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker     | All-in-one image to pull                                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker     | Where to write the environment file                        |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker     | Container name                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker     | Named volume mounted at `/data`                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker     | Host port for the dashboard                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker     | Host port for the API                                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker     | Host port for the MinIO S3 API                             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker     | Host port for the MinIO console                            |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose    | Where `docker-compose.yml` and `.env` are written          |
| `INTLAYER_SELFHOST_REF`   | `main`                    | both       | Git ref the compose file and env template are fetched from |

> Zmienne portów zmieniają wyłącznie stronę **hosta** w mapowaniu. Opublikowane obrazy mają wartości `http://localhost:3000`, `http://localhost:3100` oraz `http://localhost:9000` skompilowane w pakiecie pulpitu, więc zachowaj wartości domyślne, chyba że budujesz własne obrazy, zobacz [Ograniczenia](#limitations).

## Pierwsza konfiguracja

W nowej instancji (pusta baza danych) otwarcie pulpitu nawigacyjnego przekierowuje na stronę **`/init`**:

1. Utwórz pierwsze konto. Ponieważ kolekcja użytkowników jest pusta, to konto zostanie automatycznie awansowane na **superadministratora**.
2. Wiadomość e-mail weryfikacyjna jest wysyłana za pośrednictwem Resend lub przekaźnika SMTP. Weryfikacja adresu e-mail jest **obowiązkowa**, dlatego mailer musi być skonfigurowany przed uruchomieniem.
3. Kliknij link w wiadomości e-mail, a następnie zaloguj się.

Gdy administrator już istnieje, `/init` przekierowuje do standardowej strony logowania.

## Zmienne środowiskowe

Oba tryby Dockera odczytują ten sam plik (`intlayer.env` dla kontenera, `.env` dla Compose), wygenerowany na podstawie [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Wymagane

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Ustalane przez wdrożenie

These are set by the image (all-in-one) or by the compose file, and only need overriding for a non-standard topology.

| Variable           | All-in-one                                          | Docker Compose                   | Description                                                                   |
| ------------------ | --------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | Backend listening port                                                        |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | Public URL of the dashboard                                                   |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | Public URL of the backend API                                                 |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Cookie domain                                                                 |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Disables the cloud-only API endpoints (billing, subscriptions, marketplace)   |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | MongoDB connection string, any `mongodb://` or `mongodb+srv://` cluster works |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                         |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (server-to-server)                                                      |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | Public URL for browser asset loading                                          |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Bucket name                                                                   |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | MinIO access key                                                              |

Usługa Compose `app` otrzymuje dodatkowo `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: przeglądarka łączy się z API pod adresem `localhost:3100`, ale renderowanie po stronie serwera działa wewnątrz sieci Compose i musi używać nazwy usługi.

### Opcjonalne (funkcje działają poprawnie w stopniu ograniczonym przy ich braku)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Globalny mailer

Każda transakcyjna wiadomość e-mail, w tym wiadomości spoza organizacji (takie jak resetowanie hasła i linki logowania), przechodzi przez jeden z dwóch globalnych transportów:

- **Resend**, przy użyciu `RESEND_API_KEY`.
- **SMTP**, przy użyciu zmiennych `MAIL_SMTP_*`. Gdy tylko zostanie ustawiona zmienna `MAIL_SMTP_HOST`, używany jest protokół SMTP, a `RESEND_API_KEY` jest ignorowany.

`MAIL_PROVIDER` jest potrzebny tylko do wymuszenia jednego transportu, gdy oba są skonfigurowane (na przykład `MAIL_PROVIDER=resend`, aby zachować Resend, gdy zdefiniowany jest host SMTP).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Pierwszeństwo: własny mailer organizacji (skonfigurowany w panelu **Organizacja**) ma pierwszeństwo przed mailerem globalnym, który z kolei ma pierwszeństwo przed domyślnym kluczem Resend.

## Łączenie projektu Intlayer

Po uruchomieniu stosu skieruj swój projekt na samodzielnie hostowany backend i pulpit nawigacyjny zamiast `intlayer.org`.

### Konfiguracja projektu

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL of the self-hosted CMS dashboard.
     * Default: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL of the self-hosted backend API.
     * Default: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Set the environment variables in your project's `.env`:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Utwórz poświadczenia dostępu w swoim hostowanym pulpicie w sekcji **Projekty → Klucze dostępu** pod adresem `http://localhost:3000/projects`.

### SDK `@intlayer/api`

W przypadku programistycznego korzystania z pakietu SDK `@intlayer/api` przekaż `backendURL` jawnie:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

## Ograniczenia

- **Brak domeny niestandardowej i brak remapowania portów.** Wszystkie adresy URL `VITE_*` widoczne dla przeglądarki są wbudowane w pulpit nawigacyjny podczas kompilacji, a opublikowane obrazy (i aplikacja desktopowa) są dostarczane z wartościami `localhost` / Intlayer Cloud. Dostęp do pulpitu nawigacyjnego musi odbywać się pod adresem `http://localhost:3000`, do API pod `:3100`, a do MinIO pod `:9000`. Udostępnianie w domenie publicznej lub wskazywanie aplikacji desktopowej na własny backend wymaga ponownego zbudowania z wbudowanymi docelowymi adresami URL (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` w `docker/selfhost/Dockerfile` lub przez `docker-compose.build.yml`) i nie jest domyślnie obsługiwane.
- **Wysyłanie e-maili wymaga działającego mailera.** Pierwsza konfiguracja wymusza weryfikację e-mail, dlatego należy skonfigurować `RESEND_API_KEY` lub [przekaźnik SMTP](#global-mailer) (`MAIL_SMTP_*`). Po zalogowaniu się pierwszego administratora każda organizacja może również skonfigurować własny mailer SMTP lub Resend z poziomu pulpitu nawigacyjnego.
- **Aplikacja desktopowa wymaga środowiska Node.js** na komputerze do uruchomienia wbudowanego serwera.

## Przydatne linki

- [Dokumentacja Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- [Informacje o konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [SDK CMS: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Wydania aplikacji desktopowej](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), mirror na GHCR: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` i `.env.template`
