---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentacja hooka useRewriteURL
description: Hook specyficzny dla Solid do zarządzania lokalizowanym przepisywaniem adresów URL w Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` dla SolidJS został stworzony do zarządzania lokalizowanym przepisywaniem URL po stronie klienta. Automatycznie poprawia URL w przeglądarce do jego "ładnej" zlokalizowanej wersji w oparciu o aktualny locale i konfigurację w `intlayer.config.ts`.

Dzięki użyciu `window.history.replaceState` unika zbędnych nawigacji Solid Router.

## Użycie

Wywołaj hook wewnątrz komponentu będącego częścią Twojej aplikacji.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // Automatycznie koryguje /fr/tests na /fr/essais w pasku adresu, jeśli istnieje reguła przepisywania
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Jak to działa

1. **Wykrywanie**: Hook używa `createEffect` do monitorowania zmian reaktywnej wartości `locale()`.
2. **Dopasowywanie**: Sprawdza, czy bieżący `window.location.pathname` odpowiada kanonicznej trasie, która ma ładniejszy, zlokalizowany alias dla bieżącego języka.
3. **Korekta URL**: Jeśli znaleziono ładniejszy alias, hook wywołuje `window.history.replaceState`, aby zaktualizować pasek adresu bez wpływu na wewnętrzny stan nawigacji ani wywoływania ponownych renderów komponentów.

## Dlaczego go używać?

- **Autorytatywne adresy URL**: Wymusza pojedynczy adres URL dla każdej zlokalizowanej wersji twoich treści, co ma kluczowe znaczenie dla SEO.
- **Wygoda dewelopera**: Pozwala zachować wewnętrzne definicje tras jako kanoniczne, jednocześnie udostępniając na zewnątrz przyjazne dla użytkownika, zlokalizowane ścieżki.
- **Spójność**: Koryguje adresy URL, gdy użytkownicy ręcznie wpiszą ścieżkę niezgodną z preferowanymi zasadami lokalizacji.

---
