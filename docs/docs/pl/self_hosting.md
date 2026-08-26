---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: "Samodzielne hostowanie Intlayer"
description: "Uruchom kompletną instancję Intlayer na własnej infrastrukturze za pomocą jednego polecenia. Konto Intlayer Cloud nie jest wymagane."
keywords:
  - Samodzielne hostowanie
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Instalacja
  - Infrastruktura
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Samodzielne hostowanie Intlayer

Intlayer może działać w całości na Twojej własnej infrastrukturze — konto Intlayer Cloud nie jest wymagane. Jedno polecenie uruchamia gotowy do produkcji stos:

Jedno polecenie instaluje wszystko:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Instalator pobiera plik `docker-compose.yml` oraz `.env`, automatycznie generuje wymagane sekrety i uruchamia wszystkie kontenery za pomocą `docker compose up -d`.

Jedyną zewnętrzną zależnością jest **MongoDB**: backend łączy się z klastrem MongoDB **Atlas**, który Ty dostarczasz. Wszystko inne działa wewnątrz kontenera.

## Spis treści

<TOC/>

---

## Architektura

```
                ┌─────────────────────────────┐
 przeglądarka ──────▶ │  aplikacja  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (RS z 1 węzłem)             (API S3)     (SMTP)        (w obrazie)
                             minio:9001   mailpit:8025
                             (konsola)    (interfejs webowy)
```

Chromium (używany do generowania zrzutów ekranu przez Puppeteer) jest dołączony do obrazu backendu — nie jest potrzebny oddzielny kontener.

---

## Wymagania wstępne

- **Docker** ≥ 24 i **Docker Compose** ≥ v2. Jeśli którykolwiek z nich jest brakujący, instalator wyświetli link do instalacji i zakończy działanie.
- Porty `3000`, `3100`, `8025`, `9000` i `9001` dostępne na hoście.
- Host Linux lub macOS (lub WSL2 na Windows).

Wszystko inne — Bun, Redis, MinIO, Chromium — jest dołączone do obrazu.

---

## Szybki start

### 1. Uruchom instalator

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Instalator sprawdza, czy Docker jest zainstalowany i uruchomiony, zapisuje `./intlayer.env` z już wygenerowanymi `BETTER_AUTH_SECRET` i `S3_SECRET_ACCESS_KEY`, a następnie pobiera obraz. Nie uruchamia kontenera — backend nie może się uruchomić bez poświadczeń bazy danych.

Ponowne uruchomienie instalatora jest bezpieczne: istniejący plik `intlayer.env` nigdy nie zostanie nadpisany, co czyni to również ścieżką aktualizacji.

### 2. Wypełnij swoje dane uwierzytelniające

Otwórz `intlayer.env` i uzupełnij wartości oznaczone `TODO`:

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

Plik zawiera również skomentowane bloki dla opcjonalnych funkcji — [SMTP mailer](#global-mailer), `OPENAI_API_KEY` i dostawcy OAuth. Odkomentuj to, czego potrzebujesz.

> Plik jest odczytywany przez `docker run --env-file`, który nie usuwa cudzysłowów i traktuje wszystko po `=` jako wartość. Wpisz wartości bez cudzysłowów i przechowuj komentarze na własnych liniach.

### 3. Uruchom kontener

To jest polecenie, które instalator wypisuje po zakończeniu:

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  ghcr.io/aymericzip/intlayer-selfhost:latest
```

Następnie otwórz **http://localhost:3000**. Pierwszy boot inicjalizuje magazyny danych, więc daj mu minutę.

> Dashboard jest serwowany na `localhost`. Zobacz [Ograniczenia](#limitations) — niestandardowe domeny nie są obsługiwane przez opublikowany obraz.

### Ustawienia instalatora

Installer odczytuje kilka zmiennych środowiskowych. Ponieważ są one przesyłane do `sh`, przekaż je do powłoki zamiast do `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| Zmienna                   | Domyślnie                                     | Opis                               |
| ------------------------- | --------------------------------------------- | ---------------------------------- |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | Obraz do pobrania                  |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | Gdzie zapisać plik env             |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | Nazwa kontenera                    |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | Named volume zamontowany w `/data` |
| `INTLAYER_APP_PORT`       | `3000`                                        | Port hosta dla dashboardu          |
| `INTLAYER_API_PORT`       | `3100`                                        | Port hosta dla API                 |
| `INTLAYER_S3_PORT`        | `9000`                                        | Port hosta dla MinIO S3 API        |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | Port hosta dla konsoli MinIO       |

> Cztery zmienne portów zmieniają tylko **stronę hosta** mapowania wydrukowanego w poleceniu `docker run`. Opublikowany obraz ma `http://localhost:3000`, `http://localhost:3100` i `http://localhost:9000` skompilowane w bundle'u dashboardu w czasie kompilacji, dlatego zmapowanie ich na nowo powoduje, że przeglądarka wskazuje na stare porty. Zachowaj wartości domyślne, chyba że budujesz swój własny obraz — zobacz [Ograniczenia](#limitations).

---

## Szybki start

Co robi instalator:

1.  Sprawdza, czy `docker` i `docker compose` są obecne.
2.  Pobiera `docker-compose.yml` i `.env.example` do `./intlayer/`.
3.  Jeśli plik `.env` nie istnieje, kopiuje przykład i generuje losowe sekrety dla `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` i `S3_SECRET_ACCESS_KEY` za pomocą `openssl rand`.
4.  Uruchamia `docker compose pull` + `docker compose up -d`.
5.  Wyświetla adresy URL: pulpit nawigacyjny `:3000`, API `:3100`, interfejs e-mail `:8025`, konsola MinIO `:9001`.

Po uruchomieniu stosu, otwórz **http://localhost:3000** i utwórz swoje pierwsze konto.

---

## Usługi

| Usługa        | Obraz                                 | Port(y) hosta                            | Cel                                                               |
| :------------ | :------------------------------------ | :--------------------------------------- | :---------------------------------------------------------------- |
| **aplikacja** | zbudowana z `apps/app/Dockerfile`     | `3000`                                   | Pulpit nawigacyjny TanStack Start (interfejs użytkownika CMS)     |
| **backend**   | zbudowany z `apps/backend/Dockerfile` | `3100`                                   | Fastify REST API (punkt końcowy `/health`)                        |
| **mongo**     | `mongo:7`                             | wewnętrzny                               | Zestaw replikacji z jednym węzłem (`rs0`)                         |
| **redis**     | `redis:7-alpine`                      | wewnętrzny                               | Kolejki zadań (BullMQ) i buforowanie (ioredis)                    |
| **minio**     | `minio/minio`                         | `9000` (S3), `9001` (konsola)            | Przechowywanie obiektów zgodne z S3 dla awatarów i zrzutów ekranu |
| **mailpit**   | `axllent/mailpit`                     | `1025` (SMTP), `8025` (interfejs webowy) | Lokalny odbiornik transakcyjnych wiadomości e-mail                |

> Port MinIO `9000` musi być osiągalny przez przeglądarkę, ponieważ przesłane zasoby (awatary, zrzuty ekranu) są ładowane bezpośrednio z `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Zmienne środowiskowe

### Wymagane

| Variable               | Example                      | Description                                                                                                                                                                   |
| ---------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | Użytkownik MongoDB Atlas                                                                                                                                                      |
| `DB_MDP`               | _(your password)_            | Hasło MongoDB Atlas                                                                                                                                                           |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | Host klastra MongoDB Atlas (używany w URI `mongodb+srv://`)                                                                                                                   |
| `BETTER_AUTH_SECRET`   | _(generated)_                | 32-bajtowy secret do podpisywania sesji                                                                                                                                       |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | Secret dla wbudowanego MinIO                                                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_                 | Transakcyjne e-maile via Resend. Wymagane dla konfiguracji przy pierwszym uruchomieniu, chyba że skonfigurujesz globalny mailer SMTP (zobacz [Global mailer](#global-mailer)) |

### Wymagane (generowane automatycznie lub monitowane)

| Zmienna                | Przykład                                        | Opis                                                            |
| :--------------------- | :---------------------------------------------- | :-------------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Środowisko uruchomieniowe                                       |
| `PORT`                 | `3100`                                          | Port nasłuchiwania backendu                                     |
| `BACKEND_URL`          | `http://localhost:3100`                         | Publiczny URL API backendu                                      |
| `APP_URL`              | `http://localhost:3000`                         | Publiczny URL pulpitu nawigacyjnego                             |
| `DOMAIN`               | `localhost`                                     | Domena plików cookie                                            |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | Pełny URI połączenia z MongoDB                                  |
| `REDIS_URL`            | `redis://redis:6379`                            | URL połączenia z Redis                                          |
| `BETTER_AUTH_SECRET`   | _(generated)_                                   | 32-bajtowy sekret do podpisywania sesji                         |
| `MAIL_PROVIDER`        | `smtp`                                          | Transport poczty: `smtp` lub `resend`                           |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Nazwa hosta SMTP (nazwa kontenera Mailpit)                      |
| `MAIL_SMTP_PORT`       | `1025`                                          | Port SMTP                                                       |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Adres nadawcy                                                   |
| `S3_ENDPOINT`          | `http://minio:9000`                             | Punkt końcowy zgodny z S3                                       |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | Publiczny URL do ładowania zasobów przez przeglądarkę           |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Nazwa zasobnika (bucket)                                        |
| `S3_ACCESS_KEY_ID`     | _(generated)_                                   | Klucz dostępu MinIO                                             |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                                   | Tajny klucz MinIO                                               |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL backendu wbudowany w pulpit nawigacyjny w czasie kompilacji |
| `VITE_DOMAIN`          | `localhost`                                     | Domena wbudowana w pulpit nawigacyjny w czasie kompilacji       |

### Opcjonalne (funkcje działają z ograniczoną funkcjonalnością, gdy ich brakuje)

| Zmienna                                                  | Funkcja                                                                                         |
| :------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Tłumaczenie wspomagane AI i audyt treści                                                        |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Zarządzanie płatnościami i subskrypcjami                                                        |
| `RESEND_API_KEY`                                         | Transakcyjne wiadomości e-mail za pośrednictwem Resend (przesłania Mailpit, gdy jest ustawione) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Logowanie GitHub OAuth                                                                          |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Logowanie Google OAuth                                                                          |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Logowanie GitLab OAuth                                                                          |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Logowanie Microsoft OAuth                                                                       |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Logowanie LinkedIn OAuth                                                                        |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Logowanie Atlassian OAuth                                                                       |

### Globalny dostawca poczty

Domyślnie wszystkie transakcyjne wiadomości e-mail są wysyłane za pośrednictwem Resend przy użyciu `RESEND_API_KEY`. Wdrożenia self-hosted mogą zamiast tego kierować **każdy** e-mail — w tym e-maile niezwiązane z organizacją, takie jak resetowanie hasła i linki magiczne — za pośrednictwem globalnego dostawcy poczty skonfigurowanego zmiennymi środowiskowymi.

Ustaw `MAIL_PROVIDER`, aby go aktywować. Jeśli nie jest ustawiony, używany jest domyślny dostawca Resend.

| Zmienna              | Przykład                       | Opis                                                                              |
| -------------------- | ------------------------------ | --------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Transport globalny: `smtp` lub `resend`. Pozostaw puste, aby użyć domyślnych      |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Nagłówek nadawcy. Akceptuje zwykły adres lub format `Nazwa <email>`               |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | Host SMTP (wymagany, gdy `MAIL_PROVIDER=smtp`)                                    |
| `MAIL_SMTP_PORT`     | `587`                          | Port SMTP (domyślnie `587`)                                                       |
| `MAIL_SMTP_SECURE`   | `false`                        | Niejawny TLS. Ustaw `true` dla portu `465`                                        |
| `MAIL_SMTP_USER`     | _(twoja nazwa użytkownika)_    | Nazwa użytkownika SMTP (opcjonalnie; pomiń dla nieuwierzytelnionych przekaźników) |
| `MAIL_SMTP_PASSWORD` | _(twoje hasło)_                | Hasło SMTP                                                                        |

> Priorytet: własny dostawca poczty organizacji (skonfigurowany z pulpitu **Organizacji**) ma priorytet nad globalnym dostawcą poczty, który z kolei ma priorytet nad domyślnym kluczem Resend.

---

## Łączenie Twojego projektu Intlayer

Po uruchomieniu stosu, skieruj swój projekt na samodzielnie hostowany backend i pulpit nawigacyjny zamiast na `intlayer.org`.

### Konfiguracja projektu

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL samodzielnie hostowanego pulpitu nawigacyjnego CMS.
     * Domyślnie: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // np. http://localhost:3000

    /**
     * URL samodzielnie hostowanego API backendu.
     * Domyślnie: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // np. http://localhost:3100
  },
};

export default config;
```

Ustaw zmienne środowiskowe w pliku `.env` Twojego projektu:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Utwórz dane uwierzytelniające dostęp w swoim samodzielnie hostowanym pulpicie nawigacyjnym w sekcji **Projects → Access keys** pod adresem `http://localhost:3000/projects`.

### SDK `@intlayer/api`

Używając SDK `@intlayer/api` programowo, przekaż `backendURL` jawnie:

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

---

## Aktualizacja

Spowoduje to pobranie najnowszych obrazów i ponowne uruchomienie kontenerów za pomocą `docker compose pull && docker compose up -d`. Istniejące woluminy (`mongo-data`, `redis-data`, `minio-data`) zostaną zachowane — brak utraty danych.

```sh
docker compose pull
docker compose up -d
```

---

## Kopia zapasowa i przywracanie

Wszystkie trwałe dane znajdują się w trzech nazwach woluminów Docker.

### Kopia zapasowa

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/mongo-data.tar.gz /data

docker run --rm \
  -v intlayer_redis-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/redis-data.tar.gz /data

docker run --rm \
  -v intlayer_minio-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/minio-data.tar.gz /data
```

### Przywracanie

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Powtórz dla redis-data i minio-data
```

---

## Ograniczenia

- **MongoDB musi być zewnętrzna (Atlas).** Backend łączy się tylko przez `mongodb+srv://` (zbudowany z `DB_ID` / `DB_MDP` / `DB_CLUSTER`), więc zwykły `mongodb://host:27017` — w tym wbudowany `mongod` kontenera — nie może być używany. Zapewnij klaster MongoDB Atlas.
- **Brak niestandardowej domeny.** Wszystkie adresy URL `VITE_*` dostępne w przeglądarce są wbudowywane w aplikację w czasie kompilacji, a opublikowany obraz zawiera wartości `localhost`. Dostęp do dashboardu musi być realizowany pod adresem `http://localhost:3000`; udostępnienie go w domenie publicznej wymagałoby przebudowania obrazu z docelowymi adresami URL wbakowanymi w kod i nie jest obsługiwane out of the box.
- **Email wymaga działającego mailera.** Konfiguracja przy pierwszym uruchomieniu wymusza weryfikację email, więc musi być skonfigurowany `RESEND_API_KEY` lub [globalny mailer SMTP](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`). Po zalogowaniu się pierwszego administratora każda organizacja może również skonfigurować swój własny mailer SMTP lub Resend z dashboardu.

---

## Rozwiązywanie problemów

### Backend w pętli awarii przy pierwszym uruchomieniu

MongoDB i Redis muszą być sprawne przed uruchomieniem backendu. Plik compose używa `depends_on` z `condition: service_healthy`. Jeśli widzisz powtarzające się restarty backendu, sprawdź, czy testy kondycji `mongo` i `redis` przechodzą pomyślnie:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Poszukaj `MongoDB connection error` w górnej części dziennika.

### Pulpit nawigacyjny nie może dotrzeć do API

Sprawdź, czy `VITE_BACKEND_URL` odpowiada adresowi URL, pod którym backend jest osiągalny z **przeglądarki** (nie z sieci Docker). Jeśli zmieniłeś port backendu lub dodałeś reverse proxy, ponownie zbuduj obraz pulpitu nawigacyjnego:

### Brak zasobnika MinIO

Jeśli jednorazowa usługa `minio-init` nie uruchomiła się (lub uruchomiła się, zanim MinIO było gotowe), utwórz zasobnik ręcznie:

```sh
docker compose run --rm minio-init
```

---

## Przydatne linki

- [Dokumentacja Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- [Referencje konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [SDK CMS — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
