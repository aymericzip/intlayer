---
createdAt: 2026-06-30
updatedAt: 2026-10-08
priority: 8
title: "Własny hosting Intlayer w Dockerze"
description: "Uruchamiaj Intlayer na własnej infrastrukturze: aplikacja desktopowa, kontener Docker all-in-one lub stos Docker Compose, bez konta w chmurze."
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

| Konfiguracja             | Opis                                                                                | Zastosowanie                                       |
| ------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Aplikacja desktopowa** | Natywny pulpit nawigacyjny dla systemów macOS, Linux i Windows                      | Klient lokalny, brak konieczności hostowania       |
| **All-in-one Docker**    | Pulpit nawigacyjny, API, MongoDB, Redis i MinIO w **jednym kontenerze**             | Wersje próbne i instalacje na pojedynczej maszynie |
| **Docker Compose**       | **Jeden kontener na usługę**, każdy magazyn danych wymienialny na usługę zarządzaną | Produkcja, skalowanie, zarządzane bazy danych      |

## Spis treści

<TOC/>

## Opublikowane obrazy i pakiety

| Artefakt                      | Docker Hub                                                                | Mirror GHCR                                | Zawartość                                                                        |
| ----------------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| Kontener all-in-one           | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Pulpit nawigacyjny (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | Pulpit nawigacyjny TanStack Start na Bun                                         |
| API (backend)                 | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API na Bun + Chromium                                               |
| Aplikacja desktopowa          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

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

Zapisuje `./intlayer.env` z wygenerowanymi `BETTER_AUTH_SECRET` oraz `S3_SECRET_ACCESS_KEY`, zadaje kilka pytań, aby uzupełnić resztę, i pobiera `intlayer/cms-all:latest`.

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

### 2. Odpowiedz na pytania konfiguracyjne

Instalator pyta o (naciśnij Enter, aby zaakceptować sugestię; każdą odpowiedź można później zmienić w pliku):

- **Domenę**, pod którą serwowany jest Intlayer. Pozostaw puste, aby zostać przy `localhost`. Dla domeny takiej jak `example.org` proponuje `https://cms.example.org` dla pulpitu nawigacyjnego, `https://back.example.org` dla API oraz `https://s3.example.org/intlayer` dla magazynu obiektów, a następnie zapisuje `DOMAIN`, `APP_URL`, `BACKEND_URL` i `S3_PUBLIC_URL`. Dalsze kroki opisano w sekcji [Domena niestandardowa](#custom-domain).
- **Mailer**: Resend (klucz API) lub przekaźnik SMTP (host, port, dane uwierzytelniające) oraz adres nadawcy. Ten krok można pominąć i wykonać ręcznie później.
- Opcjonalny **klucz API OpenAI** dla funkcji AI.

Bez terminala (na przykład gdy skrypt jest uruchamiany z CI) pytania są pomijane i generowane są tylko sekrety. Otwórz `intlayer.env` i ręcznie uzupełnij Resend **lub** SMTP (szczegóły w sekcji [Globalny mailer](#global-mailer)):

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

Oto polecenie, które wyświetla instalator (przy domenie niestandardowej poprzedza je `docker build`, który tworzy `intlayer/cms-all:custom`, zobacz [Domena niestandardowa](#custom-domain)):

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

Otwórz **http://localhost:3000** (lub adres URL swojego pulpitu nawigacyjnego) i postępuj zgodnie z instrukcją [Pierwsza konfiguracja](#first-run-setup). Pierwsze uruchomienie inicjalizuje zestaw replik oraz zasobnik, odczekaj chwilę.

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

Zapisuje `docker-compose.yml` oraz `.env` z wygenerowanymi sekretami w `./intlayer/`, zadaje te same pytania konfiguracyjne co tryb all-in-one (domena, mailer, klucz OpenAI) i pobiera obrazy.

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

Jeśli pominięto pytanie o mailer, uzupełnij Resend **lub** SMTP w `intlayer/.env`, dokładnie tak samo jak w konfiguracji all-in-one (zobacz [Globalny mailer](#global-mailer)).

### 3. Uruchomienie

```sh
cd intlayer && docker compose up -d
```

Przy domenie niestandardowej instalator pobiera również `docker-compose.build.yml`, a polecenie uruchomienia zmienia się na `docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build` (zobacz [Domena niestandardowa](#custom-domain)).

Otwórz **http://localhost:3000** (lub adres URL swojego pulpitu nawigacyjnego) i postępuj zgodnie z instrukcją [Pierwsza konfiguracja](#first-run-setup).

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

Plik nadpisujący przełącza obie usługi Intlayer z `image:` na `build:`. W sklonowanym repozytorium:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Bez klonu wskaż kontekst budowania bezpośrednio na repozytorium, ustawiając `INTLAYER_BUILD_CONTEXT=https://github.com/aymericzip/intlayer.git#main` w `.env`. Argumenty budowania `VITE_*` pulpitu nawigacyjnego podążają za `DOMAIN`, `APP_URL` i `BACKEND_URL` z tego samego pliku - w ten sposób stosowana jest [domena niestandard| Zmienna | Wartość domyślna | Dotyczy | Opis |
| ------------------------- | ------------------------- | ---------- | -------------------------------------------------------------------------------- |
| `INTLAYER_MODE` | _(pytanie w instalatorze)_ | wszystkie | `desktop`, `docker` lub `compose`, to samo co `--mode` |
| `INTLAYER_DOWNLOAD_DIR` | `~/Downloads` | desktop | Miejsce zapisu instalatora aplikacji |
| `INTLAYER_IMAGE` | `intlayer/cms-all:latest` | docker | Obraz all-in-one do pobrania |
| `INTLAYER_ENV_FILE` | `./intlayer.env` | docker | Gdzie zapisać plik środowiskowy |
| `INTLAYER_CONTAINER_NAME` | `intlayer` | docker | Nazwa kontenera |
| `INTLAYER_DATA_VOLUME` | `intlayer-data` | docker | Nazwany wolumen zamontowany w `/data` |
| `INTLAYER_APP_PORT` | `3000` | docker | Port hosta dla pulpitu nawigacyjnego |
| `INTLAYER_API_PORT` | `3100` | docker | Port hosta dla API |
| `INTLAYER_S3_PORT` | `9000` | docker | Port hosta dla MinIO S3 API |
| `INTLAYER_CONSOLE_PORT` | `9001` | docker | Port hosta dla konsoli MinIO |
| `INTLAYER_COMPOSE_DIR` | `./intlayer` | compose | Gdzie zapisywane są pliki `docker-compose.yml` i `.env` |
| `INTLAYER_SELFHOST_REF` | `main` | oba | Referencja Git, z której pobierany jest plik compose i szablon env |
| `INTLAYER_BUILD_CONTEXT` | `…/intlayer.git#main` | oba | Kontekst budowania używany, gdy niestandardowa domena wymaga przebudowy |
| `INTLAYER_CUSTOM_IMAGE` | `intlayer/cms-all:custom` | docker | Tag obrazu all-in-one zbudowanego dla niestandardowej domeny |

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

| Zmienna                | Przykład         | Opis                                                                                                                                                          |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(wygenerowany)_ | 32-bajtowy sekret do podpisywania sesji                                                                                                                       |
| `S3_SECRET_ACCESS_KEY` | _(wygenerowany)_ | Sekret dla dołączonego MinIO                                                                                                                                  |
| `RESEND_API_KEY`       | _(twój klucz)_   | E-maile transakcyjne przez Resend. Wymagane przy pierwszej konfiguracji, chyba że skonfigurowano przekaźnik SMTP (zobacz [Globalny mailer](#globalny-mailer)) |

> Obraz all-in-one akceptuje też pusty `S3_SECRET_ACCESS_KEY`: generuje go przy pierwszym uruchomieniu i zapisuje w `/data/.s3-secret-access-key`. Docker Compose nadal go wymaga.

### Ustalane przez wdrożenie

Są one ustawiane przez obraz (all-in-one) lub przez plik compose i wymagają nadpisania tylko w przypadku niestandardowej topologii. Wyjątkiem są `DOMAIN`, `APP_URL`, `BACKEND_URL` i `S3_PUBLIC_URL`: ustawione w pliku env, mają pierwszeństwo w obu trybach (zobacz [Domena niestandardowa](#custom-domain)).

| Zmienna            | All-in-one                                          | Docker Compose                   | Opis                                                                               |
| ------------------ | --------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | Port nasłuchiwania backendu                                                        |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | Publiczny URL pulpitu nawigacyjnego                                                |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | Publiczny URL API backendu                                                         |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Domena ciasteczek                                                                  |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Wyłącza endpointy API specyficzne dla chmury (płatności, subskrypcje, rynek)       |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | Parametry połączenia MongoDB, działa dowolny klaster mongodb:// lub mongodb+srv:// |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                              |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (komunikacja serwer-serwer)                                                  |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | Publiczny URL do ładowania zasobów przez przeglądarkę                              |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Nazwa zasobnika (bucket)                                                           |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | Klucz dostępu MinIO                                                                |

Usługa Compose `app` otrzymuje dodatkowo `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: przeglądarka łączy się z API pod adresem `localhost:3100`, ale renderowanie po stronie serwera działa wewnątrz sieci Compose i musi używać nazwy usługi.

### Domena niestandardowa

Backend odczytuje swoje publiczne adresy URL w czasie działania, ale pulpit nawigacyjny ma je **wkompilowane**: opublikowane obrazy `intlayer/cms-frontend` i `intlayer/cms-all` działają tylko pod `http://localhost:3000`. Udostępnienie Intlayer we własnej domenie wymaga więc dwóch rzeczy, które instalator przygotowuje, gdy odpowiesz na pytanie o domenę:

1. **Cztery zmienne w pliku env**, odczytywane przez backend (ciasteczka, linki w e-mailach, callbacki OAuth, adresy URL zasobów) i używane jako argumenty budowania przez `docker-compose.build.yml`:

   ```sh fileName="intlayer.env"
   DOMAIN=example.org                          # domena ciasteczek, nadrzędna dla poniższych hostów
   APP_URL=https://cms.example.org
   BACKEND_URL=https://back.example.org
   S3_PUBLIC_URL=https://s3.example.org/intlayer
   ```

2. **Obraz pulpitu nawigacyjnego zbudowany z tymi adresami URL.** Docker buduje go bezpośrednio z repozytorium, bez potrzeby klonowania:

   ```sh
   # Docker Compose: nadpisanie odczytuje argumenty budowania z .env
   docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build

   # All-in-one
   docker build -f docker/selfhost/Dockerfile \
     --build-arg VITE_DOMAIN=example.org \
     --build-arg VITE_SITE_URL=https://cms.example.org \
     --build-arg VITE_IDE_URL=https://cms.example.org \
     --build-arg VITE_BACKEND_URL=https://back.example.org \
     -t intlayer/cms-all:custom \
     https://github.com/aymericzip/intlayer.git#main
   ```

Następnie umieść przed kontenerem reverse proxy z TLS: `cms.example.org` → port `3000`, `back.example.org` → `3100`, `s3.example.org` → `9000`. Trzy hosty muszą mieć wspólny sufiks `DOMAIN`, ponieważ ciasteczko sesji jest do niego ograniczone.

### Opcjonalne (funkcje działają poprawnie w stopniu ograniczonym przy ich braku)

| Zmienna                                          | Funkcja                                        |
| ------------------------------------------------ | ---------------------------------------------- |
| `OPENAI_API_KEY`                                 | Tłumaczenie i audyt treści wspomagane przez AI |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | Logowanie przez GitHub OAuth                   |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Logowanie przez Google OAuth                   |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | Logowanie przez GitLab OAuth                   |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Logowanie przez Microsoft OAuth                |

### Globalny mailer

Każda transakcyjna wiadomość e-mail, w tym wiadomości spoza organizacji (takie jak resetowanie hasła i linki logowania), przechodzi przez jeden z dwóch globalnych transportów:

- **Resend**, przy użyciu `RESEND_API_KEY`.
- **SMTP**, przy użyciu zmiennych `MAIL_SMTP_*`. Gdy tylko zostanie ustawiona zmienna `MAIL_SMTP_HOST`, używany jest protokół SMTP, a `RESEND_API_KEY` jest ignorowany.

`MAIL_PROVIDER` jest potrzebny tylko do wymuszenia jednego transportu, gdy oba są skonfigurowane (na przykład `MAIL_PROVIDER=resend`, aby zachować Resend, gdy zdefiniowany jest host SMTP).

| Zmienna              | Przykład                       | Opis                                                                                 |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Nagłówek nadawcy dla obu transportów. Akceptuje sam adres lub postać `Imię <email>`  |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | Host SMTP. Jego ustawienie aktywuje transport SMTP                                   |
| `MAIL_SMTP_PORT`     | `587`                          | Port SMTP (domyślnie `587`)                                                          |
| `MAIL_SMTP_SECURE`   | `false`                        | Niejawne TLS. Ustaw `true` dla portu `465`                                           |
| `MAIL_SMTP_USER`     | _(twój użytkownik)_            | Nazwa użytkownika SMTP (opcjonalnie; pomiń dla przekaźników bez uwierzytelniania)    |
| `MAIL_SMTP_PASSWORD` | _(twoje hasło)_                | Hasło SMTP                                                                           |
| `MAIL_PROVIDER`      | `resend`                       | Opcjonalne nadpisanie: `smtp` lub `resend`. Pozostaw puste dla automatycznego wyboru | -------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>`         |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                                     |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                        |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                              |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                            |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                        |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select                    |

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
     * Adres URL samodzielnie hostowanego pulpitu nawigacyjnego CMS.
     * Domyślnie: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // np. http://localhost:3000

    /**
     * Adres URL samodzielnie hostowanego API backendu.
     * Domyślnie: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // np. http://localhost:3100
  },
};

export default config;
```

Ustaw zmienne środowiskowe w pliku `.env` swojego projektu:

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

- **Domena niestandardowa oznacza ponowne zbudowanie.** Wszystkie adresy URL `VITE_*` widoczne dla przeglądarki są wbudowane w pulpit nawigacyjny podczas kompilacji, a opublikowane obrazy (i aplikacja desktopowa) są dostarczane z wartościami `localhost` / Intlayer Cloud. Domyślnie dostęp do pulpitu nawigacyjnego musi odbywać się pod adresem `http://localhost:3000`, do API pod `:3100`, a do MinIO pod `:9000`; remapowanie portów hosta daje ten sam efekt. Gdy podasz domenę, instalator przygotowuje wszystko do ponownego zbudowania z repozytorium (zobacz [Domena niestandardowa](#custom-domain)), ale samo budowanie trwa kilka minut. Wskazywanie aplikacji desktopowej na własny backend nie jest obsługiwane.
- **Wysyłanie e-maili wymaga działającego mailera.** Pierwsza konfiguracja wymusza weryfikację e-mail, dlatego należy skonfigurować `RESEND_API_KEY` lub [przekaźnik SMTP](#global-mailer) (`MAIL_SMTP_*`). Po zalogowaniu się pierwszego administratora każda organizacja może również skonfigurować własny mailer SMTP lub Resend z poziomu pulpitu nawigacyjnego.
- **Aplikacja desktopowa wymaga środowiska Node.js** na komputerze do uruchomienia wbudowanego serwera.
- **Brak asystenta dokumentacji.** Asystent AI dokumentacji intlayer.org (`/api/ai/ask`, `/api/search/doc`) opiera się na ok. 130 MB wstępnie obliczonych embeddingów dokumentacji, których obrazy self-hosted nie zawierają; te dwie trasy nie są rejestrowane w trybie self-hosted. Własne funkcje AI pulpitu nawigacyjnego (tłumaczenie, audyt, autouzupełnianie, czat) nie są tym objęte i wymagają jedynie `OPENAI_API_KEY`.

## Przydatne linki

- [Dokumentacja Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- [Informacje o konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [SDK CMS: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Wydania aplikacji desktopowej](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), mirror na GHCR: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` i `.env.template`
