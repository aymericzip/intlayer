---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inicjalizacja Intlayer
description: Dowiedz się, jak zainicjalizować Intlayer w swoim projekcie.
keywords:
  - Inicjalizacja
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Dodano polecenie init
---

# Inicjalizacja Intlayer

```bash
npx intlayer init
```

Polecenie `init` automatycznie konfiguruje Intlayer w Twoim projekcie, tworząc niezbędne pliki i ustawienia. To zalecany sposób rozpoczęcia pracy z Intlayer.

## Aliasy:

- `npx intlayer init`

## Argumenty:

- `--project-root [projectRoot]` - Opcjonalne. Określa katalog główny projektu. Jeśli nie zostanie podane, polecenie wyszuka katalog główny projektu, zaczynając od bieżącego katalogu roboczego.

## Co robi:

Polecenie `init` wykonuje następujące zadania konfiguracyjne:

1. **Weryfikuje strukturę projektu** - Upewnia się, że znajdujesz się w poprawnym katalogu projektu z plikiem `package.json`
2. **Aktualizuje `.gitignore`** - Dodaje `.intlayer` do pliku `.gitignore`, aby wykluczyć generowane pliki z kontroli wersji
3. **Konfiguruje TypeScript** - Aktualizuje wszystkie pliki `tsconfig.json`, aby uwzględniały definicje typów Intlayer (`.intlayer/**/*.ts`)
4. **Tworzy plik konfiguracyjny** - Generuje `intlayer.config.ts` (dla projektów TypeScript) lub `intlayer.config.mjs` (dla projektów JavaScript) z ustawieniami domyślnymi
5. **Aktualizuje konfigurację Vite** - Jeśli wykryto plik konfiguracyjny Vite, dodaje import wtyczki `vite-intlayer`

Polecenie `init` wykonuje następujące zadania konfiguracyjne:

1. **Weryfikuje strukturę projektu** - Zapewnia, że znajdujesz się w prawidłowym katalogu projektu zawierającym plik `package.json`
2. **Aktualizuje `.gitignore`** - Dodaje `.intlayer` do pliku `.gitignore`, aby wykluczyć wygenerowane pliki z kontroli wersji
3. **Konfiguruje TypeScript** - Aktualizuje wszystkie pliki `tsconfig.json`, aby uwzględnić definicje typów Intlayer (`.intlayer/**/*.ts`)
4. **Tworzy plik konfiguracyjny** - Generuje `intlayer.config.ts` (dla projektów TypeScript) lub `intlayer.config.mjs` (dla projektów JavaScript) z ustawieniami domyślnymi
5. **Aktualizuje konfigurację Vite** - Jeśli wykryto plik konfiguracyjny Vite, dodaje import wtyczki `vite-intlayer`
6. **Aktualizuje konfigurację Next.js** - Jeśli wykryty zostanie plik konfiguracyjny Next.js, dodaje import wtyczki `next-intlayer`

## Przykłady:

### Podstawowa inicjalizacja:

```bash
npx intlayer init
```

To zainicjalizuje Intlayer w bieżącym katalogu, automatycznie wykrywając katalog projektu.

### Inicjalizacja z niestandardowym katalogiem projektu:

```bash
npx intlayer init --project-root ./my-project
```

To zainicjalizuje Intlayer w podanym katalogu.

## Przykładowe wyjście:

```bash
npx intlayer init
Sprawdzanie konfiguracji Intlayer...
✓ Dodano .intlayer do .gitignore
✓ Zaktualizowano tsconfig.json, aby uwzględniał typy intlayer
Utworzono intlayer.config.ts
✓ Wstrzyknięto import do vite.config.ts
✓ Inicjalizacja Intlayer zakończona pomyślnie.
```

## Uwagi:

- Polecenie jest idempotentne — można je uruchamiać wielokrotnie bez obaw. Pomiń kroki, które są już skonfigurowane.
- Jeśli plik konfiguracyjny już istnieje, nie zostanie nadpisany.
- Pliki konfiguracyjne TypeScript bez tablicy `include` (np. konfiguracje w stylu solution z odwołaniami) są pomijane.
- Polecenie zakończy się błędem, jeśli w katalogu głównym projektu nie zostanie znaleziony plik `package.json`.
