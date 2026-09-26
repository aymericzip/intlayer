---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentacja hooka useIntlayer | astro-intlayer
description: Zobacz, jak używać hooka useIntlayer w komponentach Astro i skryptach klienta, aby uzyskać dostęp do zlokalizowanej treści.
keywords:
  - useIntlayer
  - słownik
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - astro-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Dokumentacja hooka useIntlayer

Hook `useIntlayer` pozwala pobierać zlokalizowaną treść słownika na podstawie klucza w aplikacjach Astro.

Może być wywoływany w dwóch różnych kontekstach za pomocą tej samej ścieżki importu:

1. **Serwer / Frontmatter**: Wewnątrz plików `.astro` automatycznie ustala treść na podstawie lokalizacji zapytania zapisanej w `Astro.locals.intlayer`.
2. **Przeglądarka / Skrypt klienta `<script>`**: Wewnątrz skryptów klienta lub komponentów frameworków UI korzysta z implementacji magazynu po stronie klienta (`vanilla-intlayer`).

## Użycie

### W sekcji frontmatter komponentu Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### W blokach `<script>` klienta

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Parametry

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Unikalny klucz słownika (zgodnie z definicją w plikach deklaracji `.content.ts`).
2. **`localeOrSelector`** (opcjonalny): Konkretna lokalizacja lub obiekt selektora (`{ item }`, `{ variant }`, opcjonalnie z `locale`). Gdy zostanie podany, nadpisuje lokalizację wykrytą z kontekstu zapytania lub magazynu klienta.

## Opis

Hook wykonuje następujące zadania:

1. **Ustalanie lokalizacji**:
   - Na serwerze odczytuje aktywną lokalizację z `Astro.locals.intlayer` za pośrednictwem zakresu `AsyncLocalStorage` zainicjowanego przez `astro-intlayer/middleware`.
   - W przeglądarce odczytuje aktywną lokalizację z magazynu klienta.
2. **Pobieranie słownika**: Wstrzykuje zawartość słownika pasującą do określonego klucza.
3. **Przetwarzanie tłumaczeń**: Rozwiązuje tłumaczenia (`t()`), wyliczenia, warunki i markdown na gotową do wyświetlenia treść.

## Powiązana dokumentacja

- [Integracja `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useLocale.md)
