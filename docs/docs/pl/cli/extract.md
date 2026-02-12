---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Wyodrębnianie stringów
description: Dowiedz się, jak wyodrębnić stringi z Twoich komponentów do pliku .content umieszczonego blisko komponentu.
keywords:
  - Ekstrakcja
  - Komponenty
  - Migracja
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Wyodrębnianie stringów

```bash
npx intlayer extract
```

Ten polecenie analizuje pliki z kodem, aby wyodrębnić stringi z komponentów do pliku .content umieszczonego blisko komponentu. Obsługuje interaktywny wybór plików lub wskazanie konkretnych plików do przetworzenia.

## Aliasy:

- `npx intlayer ext`

## Argumenty:

**Opcje wyboru plików:**

- **`-f, --file [files...]`**: Lista konkretnych plików do wyodrębnienia. Jeśli nie zostanie podane, CLI przeskanuje pasujące pliki (`**/*.{tsx,jsx,vue,svelte,ts,js}`) i poprosi o wybranie tych, które mają zostać wyodrębnione.

  > Przykład: `npx intlayer extract -f src/components/MyComponent.tsx`

**Opcje wyjścia:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Katalog do zapisania wygenerowanych plików deklaracji treści.

  > Przykład: `npx intlayer extract -o src/content`

- **`--code-only`**: Wyodrębnij tylko kod komponentu (nie zapisuj deklaracji treści).

  > Przykład: `npx intlayer extract --code-only`

- **`--declaration-only`**: Wygeneruj tylko deklarację treści (nie modyfikuj komponentu).

  > Przykład: `npx intlayer extract --declaration-only`

**Opcje konfiguracji:**

- **`--base-dir`**: Określa katalog bazowy projektu.
- **`--env`**: Określa środowisko.
- **`--env-file`**: Wskazuje niestandardowy plik środowiska.
- **`--verbose`**: Włącza szczegółowe logowanie.

**Wymagane wtyczki:**

Polecenie extract działa bez dodatkowych wtyczek dla plików TypeScript / JSX. Jednak dla projektów Vue i Svelte wymaga zainstalowania następujących wtyczek:

- **`@intlayer/vue-transformer`**: Dla plików Vue.
- **`@intlayer/svelte-transformer`**: Dla plików Svelte.
