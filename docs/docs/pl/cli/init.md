---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inicjalizacja Intlayer
description: Dowiedz się, jak zainicjować Intlayer w swoim projekcie.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Dodano opcję --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodano polecenie init"
---

# Inicjalizacja Intlayer

```bash
npx intlayer init
```

Polecenie `init` automatycznie konfiguruje Intlayer w Twoim projekcie, tworząc niezbędne pliki i ustawienia. Jest to zalecany sposób na rozpoczęcie pracy z Intlayer.

## Aliase:

- `npx intlayer init`

## Argumenty:

- `--project-root [projectRoot]` - Opcjonalnie. Określ katalog główny projektu. Jeśli nie zostanie podany, polecenie będzie szukać katalogu głównego projektu zaczynając od bieżącego katalogu roboczego.
- `--no-gitignore` - Opcjonalnie. Pomija automatyczną aktualizację pliku `.gitignore`. Jeśli ta flaga jest ustawiona, `.intlayer` nie zostanie dodany do `.gitignore`.

## Co to robi:

Polecenie `init` wykonuje następujące zadania konfiguracyjne:

1. **Waliduje strukturę projektu** - Upewnia się, że znajdujesz się w prawidłowym katalogu projektu z plikiem `package.json`.
2. **Aktualizuje `.gitignore`** - Dodaje `.intlayer` do pliku `.gitignore`, aby wykluczyć wygenerowane pliki z kontroli wersji (można pominąć za pomocą `--no-gitignore`).
3. **Konfiguruje TypeScript** - Aktualizuje pliki `tsconfig.json`, aby zawierały definicje typów Intlayer (`.intlayer/**/*.ts`).
4. **Tworzy plik konfiguracyjny** - Generuje `intlayer.config.ts` (dla projektów TypeScript) lub `intlayer.config.mjs` (dla projektów JavaScript) z domyślnymi ustawieniami.
5. **Aktualizuje konfigurację Vite** - Jeśli zostanie wykryty plik konfiguracyjny Vite, dodaje import wtyczki `vite-intlayer`.
6. **Aktualizuje konfigurację Next.js** - Jeśli zostanie wykryty plik konfiguracyjny Next.js, dodaje import wtyczki `next-intlayer`.

## Przykłady:

### Podstawowa inicjalizacja:

```bash
npx intlayer init
```

Inicjuje Intlayer w bieżącym katalogu, automatycznie wykrywając katalog główny projektu.

### Inicjalizacja z niestandardowym katalogiem głównym projektu:

```bash
npx intlayer init --project-root ./moj-projekt
```

Inicjuje Intlayer we wskazanym katalogu.

### Inicjalizacja bez aktualizacji .gitignore:

```bash
npx intlayer init --no-gitignore
```

Konfiguruje wszystkie pliki konfiguracyjne, ale nie modyfikuje pliku `.gitignore`.

## Przykładowy wynik:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Uwagi:

- Polecenie jest idempotentne - możesz je bezpiecznie uruchamiać wielokrotnie. Już skonfigurowane kroki zostaną pominięte.
- Jeśli plik konfiguracyjny już istnieje, nie zostanie nadpisany.
- Konfiguracje TypeScript bez tablicy `include` (np. konfiguracje w stylu solution z referencjami) są pomijane.
- Polecenie zakończy się błędem, jeśli w katalogu głównym projektu nie zostanie znaleziony plik `package.json`.
