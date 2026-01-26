---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentacja hooka useRewriteURL
description: Hook specyficzny dla Svelte do zarządzania zlokalizowanymi przepisaniami adresów URL w Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` dla Svelte został zaprojektowany do zarządzania zlokalizowanymi przepisaniami adresów URL po stronie klienta. Automatycznie koryguje adres przeglądarki do jego "przyjaznej", zlokalizowanej wersji na podstawie aktualnego locale oraz konfiguracji w `intlayer.config.ts`.

Aktualizuje adres w sposób niewidoczny, używając `window.history.replaceState`, co pozwala uniknąć pełnych nawigacji SvelteKit.

## Użycie

Wywołaj hook wewnątrz komponentu Svelte.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Automatycznie poprawia /fr/tests na /fr/essais w pasku adresu, jeśli istnieje reguła przepisywania
  useRewriteURL();
</script>

<slot />
```

## Jak to działa

1. **Reaktywne aktualizacje**: Hook subskrybuje store `locale` Intlayera.
2. **Wykrywanie**: Za każdym razem, gdy zmienia się locale (lub przy montowaniu), oblicza, czy aktualny `window.location.pathname` ma ładniejszy, zlokalizowany alias zdefiniowany w Twoich regułach przepisywania.
3. **Korekta URL**: Jeśli znaleziono ładniejszą ścieżkę, hook wywołuje `window.history.replaceState`, aby zaktualizować pasek adresu bez pełnego przeładowania strony ani wywoływania logiki nawigacji SvelteKit.

## Dlaczego warto z tego korzystać?

- **Dobre praktyki SEO**: Zapewnia, że wyszukiwarki indeksują tylko ładną, zlokalizowaną wersję Twoich adresów URL.
- **Lepsze UX**: Koryguje ręcznie wpisane adresy URL, aby odzwierciedlały preferowaną strukturę nazewnictwa.
- **Ciche aktualizacje**: Aktualizuje pasek adresu bez wpływu na drzewo komponentów ani historię nawigacji.
