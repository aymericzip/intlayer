---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Dokumentacja integracji intlayer | astro-intlayer
description: Zobacz, jak skonfigurować i używać integracji Astro intlayer w pliku astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - integracja
  - i18n
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Zaktualizowano dokumentację integracji o szczegóły middleware i hooków"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Dokumentacja integracji Astro intlayer

Integracja `intlayer` dla Astro konfiguruje projekt pod kątem wielojęzyczności (i18n). Odpowiada za przygotowanie słowników w czasie kompilacji, wstrzykiwanie wtyczek Vite, automatyczną rejestrację middleware zapytań oraz generowanie wstępnie renderowanych zlokalizowanych stron.

## Użycie

Dodaj `intlayer()` do pliku `astro.config.mjs`:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Polecenie codemod Astro CLI (`astro add astro-intlayer`) generuje również domyślny import, który jest obsługiwany:

```ts
import intlayer from "astro-intlayer";
```

## Opis

Integracja podłącza się do cyklu życia kompilacji i działania Astro:

1. **Konfiguracja (`astro:config:setup`)**:
   - **Przygotowanie słowników**: Przygotowuje słowniki Intlayer i wygenerowane typy przed rozpoczęciem kompilacji.
   - **Wtyczki Vite**: Wstrzykuje wtyczki dla aliasów Vite (umożliwiając bezproblemowy import słowników), proxy routingu lokalizacji oraz czyszczenia kodu.
   - **Rejestracja middleware**: Automatycznie wstrzykuje `astro-intlayer/middleware` do łańcucha middleware projektu, wypełniając `Astro.locals.intlayer` dla każdego przychodzącego zapytania.
2. **Zakończenie kompilacji (`astro:build:done`)**:
   - **Przepisywanie stron**: Analizuje reguły przepisywania zlokalizowanych adresów URL i generuje wstępnie renderowane strony HTML pod odpowiednimi ścieżkami językowymi.

## Co otrzymujesz po instalacji

Po skonfigurowaniu aplikacja Astro może natychmiast korzystać z:

- Hooków `useIntlayer`, `useDictionary` oraz `useLocale` wewnątrz sekcji frontmatter komponentów `.astro`.
- Obiektu `Astro.locals.intlayer` w endpointach i stronach Astro.
- Importów po stronie klienta w blokach `<script>`, odzwierciedlających to samo API z reaktywnymi aktualizacjami.
- Wbudowanych formaterów w module `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency` itp.).

## Powiązana dokumentacja

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/onRequest.md)
