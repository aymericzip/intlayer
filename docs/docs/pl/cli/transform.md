---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Transformacja komponentów
description: Dowiedz się, jak przekształcić istniejące komponenty, aby korzystały z Intlayer.
keywords:
  - Transformacja
  - Komponenty
  - Migracja
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Transformacja komponentów

```bash
npx intlayer transform
```

To polecenie analizuje Twoje pliki kodu, aby pomóc w migracji istniejących komponentów do korzystania z Intlayer. Obsługuje interaktywny wybór plików lub wskazanie konkretnych plików do przekształcenia.

## Alias:

- `npx intlayer trans`

## Argumenty:

**Opcje wyboru plików:**

- **`-f, --file [files...]`**: Lista konkretnych plików do przekształcenia. Jeśli nie zostanie podana, CLI przeskanuje pliki pasujące do wzorca (`**/*.{tsx,jsx,vue,svelte,ts,js}`) i poprosi o wybranie tych, które mają zostać przekształcone.

  > Przykład: `npx intlayer transform -f src/components/MyComponent.tsx`

**Opcje wyjścia:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Katalog do zapisu wygenerowanych plików deklaracji zawartości.

  > Przykład: `npx intlayer transform -o src/content`

- **`--code-only`**: Przekształć tylko kod komponentu (nie zapisuj deklaracji zawartości).

  > Przykład: `npx intlayer transform --code-only`

- **`--declaration-only`**: Wygeneruj tylko deklarację zawartości (nie nadpisuj komponentu).

  > Przykład: `npx intlayer transform --declaration-only`

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--env`**: Określ środowisko.
- **`--env-file`**: Podaj niestandardowy plik środowiskowy.
- **`--verbose`**: Włącz szczegółowe logowanie.

**Wymagane wtyczki:**

Polecenie transform działa bez dodatkowych wtyczek dla plików TypeScript / JSX. Jednak wymaga zainstalowania następujących wtyczek dla projektów Vue i Svelte:

- **`@intlayer/vue-transformer`**: Dla plików Vue.
- **`@intlayer/svelte-transformer`**: Dla plików Svelte.
