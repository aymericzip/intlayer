---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: Dowiedz się, jak używać polecenia init infra interfejsu Intlayer CLI, aby zainstalować aplikację desktopową lub samodzielnie hostować Intlayer CMS z użyciem Dockera (kontener all-in-one lub stos Docker Compose).
keywords:
  - CLI
  - Infrastruktura
  - Self-hosting
  - Aplikacja desktopowa
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
    changes: "Dodaj polecenie init infra"
author: aymericzip
---

# Polecenie Intlayer CLI Init Infra

## Opis

Polecenie `init infra` konfiguruje infrastrukturę Intlayer na Twoim komputerze. Pobiera instalator dla danej platformy (`https://intlayer.org/install.sh` w systemie macOS / Linux, `https://intlayer.org/install.ps1` w systemie Windows) i uruchamia go w terminalu, dzięki czemu menu instalatora i informacje o postępie są wyświetlane bez zmian.

Instalator pyta, jak chcesz uruchomić Intlayer:

- **Aplikacja desktopowa**: pobiera natywny pulpit nawigacyjny dla Twojego systemu operacyjnego i procesora oraz otwiera go lub instaluje. Wersja desktopowa komunikuje się z backendem Intlayer Cloud.
- **All-in-one Docker**: pulpit nawigacyjny + API + MongoDB + Redis + MinIO w pojedynczym kontenerze obsługiwanym przez jeden wolumen. Zapisuje `./intlayer.env` z wygenerowanymi sekretami i pobiera obraz `intlayer/cms-all`.
- **Docker Compose**: jeden kontener na usługę, dla skalowalnego self-hostingu. Zapisuje `docker-compose.yml` oraz `.env` w `./intlayer/` i pobiera obrazy.

Instalator online stanowi jedyne źródło prawdy dotyczące procesu instalacji: CLI uruchamia go zamiast ponownie implementować te same kroki, więc `npx intlayer init infra` oraz `curl -fsSL https://intlayer.org/install.sh | sh` działają dokładnie tak samo.

## Użycie

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

Ten sam krok jest oferowany na liście kontrolnej `npx intlayer init --interactive` w sekcji **Infrastruktura (aplikacja desktopowa / self-hosting)**.

## Opcje

- `-m, --mode <mode>` - Opcjonalnie. Pomija menu instalatora i uruchamia dany tryb bezpośrednio. Dozwolone wartości: `desktop`, `docker` (all-in-one) lub `compose`. Każda inna wartość powoduje błąd z listą dozwolonych trybów.

## Przykłady

### Wybierz tryb interaktywnie

```bash
npx intlayer init infra
```

### Zainstaluj aplikację desktopową

```bash
npx intlayer init infra --mode desktop
```

### Self-hosting w kontenerze all-in-one

```bash
npx intlayer init infra --mode docker
```

### Self-hosting za pomocą Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Przykładowy wynik

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

## Ustawienia instalatora

Instalator odczytuje kilka zmiennych środowiskowych, które CLI przekazuje bez zmian. Ustaw je w powłoce przed uruchomieniem polecenia:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Zmienna                   | Domyślnie                 | Dotyczy   | Opis                                                            |
| ------------------------- | ------------------------- | --------- | --------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(zapytanie)_             | wszystkie | `desktop`, `docker` lub `compose`, tak samo jak `--mode`        |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop   | Gdzie zapisywany jest instalator aplikacji                      |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker    | Obraz all-in-one do pobrania                                    |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker    | Gdzie zapisać plik środowiskowy                                 |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker    | Nazwa kontenera                                                 |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker    | Nazwany wolumen zamontowany w `/data`                           |
| `INTLAYER_APP_PORT`       | `3000`                    | docker    | Port hosta dla pulpitu nawigacyjnego                            |
| `INTLAYER_API_PORT`       | `3100`                    | docker    | Port hosta dla API                                              |
| `INTLAYER_S3_PORT`        | `9000`                    | docker    | Port hosta dla API MinIO S3                                     |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker    | Port hosta dla konsoli MinIO                                    |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose   | Gdzie zapisywane są `docker-compose.yml` i `.env`               |
| `INTLAYER_SELFHOST_REF`   | `main`                    | oba       | Ref Git, z którego pobierany jest plik compose oraz szablon env |

> Zmienne portów zmieniają wyłącznie stronę **hosta** w mapowaniu. Opublikowane obrazy mają wartości `http://localhost:3000`, `http://localhost:3100` oraz `http://localhost:9000` skompilowane w pakiecie pulpitu, więc zachowaj wartości domyślne, chyba że budujesz własne obrazy: zobacz [przewodnik po self-hostingu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md#limitations).

## Wymagania

- **Aplikacja desktopowa** wymaga [Node.js](https://nodejs.org): aplikacja zawiera wbudowany serwer pulpitu i uruchamia go przy użyciu pliku binarnego `node` z systemu.
- **Tryby Docker** wymagają [Dockera](https://docs.docker.com/get-docker/) (Docker Desktop z backendem WSL 2 w systemie Windows). Tryb Compose wymaga także wtyczki `docker compose`.

## Uwagi

- Ponowne uruchomienie polecenia jest bezpieczne: istniejący plik środowiskowy nigdy nie jest nadpisywany, co pozwala używać go również jako ścieżki aktualizacji (instalator pobiera najnowsze obrazy i zachowuje sekrety).
- Instalator jest pobierany do katalogu tymczasowego i usuwany po zakończeniu, niezależnie od wyniku.
- Kod wyjścia polecenia jest kodem instalatora. Jeśli samo pobieranie się nie powiedzie, CLI wyświetla równoważne polecenie `curl … | sh` (lub `irm … | iex`), aby można było uruchomić instalator bezpośrednio.
- Tryby Docker wymagają skonfigurowania usługi poczty do wysyłania wiadomości logowania. Po zakończeniu instalatora skonfiguruj Resend lub SMTP w wygenerowanym pliku środowiskowym: zobacz [Globalna usługa pocztowa](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md#global-mailer).

## Powiązane

- [Przewodnik po self-hostingu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md) - Architektura, pierwsze kroki i ograniczenia każdego trybu
- [Zainicjuj Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/init.md) - Nadrzędne polecenie `init` i jego interaktywna lista kontrolna
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) - Działanie zainstalowanego pulpitu nawigacyjnego
