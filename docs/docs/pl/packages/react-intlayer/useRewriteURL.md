---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentacja hooka useRewriteURL
description: Hook specyficzny dla React służący do zarządzania lokalizowanymi przekierowaniami URL w Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` został zaprojektowany do zarządzania lokalizowanymi przekierowaniami URL po stronie klienta. Automatycznie wykrywa, czy bieżący URL powinien zostać poprawiony do „ładnej” zlokalizowanej wersji w oparciu o lokalizację użytkownika oraz reguły przepisywania zdefiniowane w `intlayer.config.ts`.

W przeciwieństwie do standardowej nawigacji, hook ten używa `window.history.replaceState` do aktualizacji adresu URL w pasku adresu bez wywoływania pełnego przeładowania strony ani cyklu nawigacji routera.

## Użycie

Po prostu wywołaj hook w komponencie po stronie klienta.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // Automatycznie poprawia /fr/tests na /fr/essais w pasku adresu, jeśli istnieje reguła przepisywania
  useRewriteURL();

  return <div>Mój komponent</div>;
};
```

## Jak to działa

1. **Wykrywanie**: Hook monitoruje bieżący `window.location.pathname` oraz `locale` użytkownika.
2. **Dopasowywanie**: Korzysta z wewnętrznego silnika Intlayer, aby sprawdzić, czy bieżący pathname pasuje do kanonicznej trasy, która ma ładniejszy zlokalizowany alias dla bieżącego `locale`.
3. **Korekta adresu URL**: Jeśli zostanie znaleziony lepszy alias (i różni się od bieżącej ścieżki), hook wywołuje `window.history.replaceState`, aby zaktualizować URL w przeglądarce przy zachowaniu tej samej kanonicznej zawartości i stanu.

## Dlaczego warto z tego korzystać?

- **SEO**: Zapewnia, że użytkownicy zawsze trafiają na pojedynczy, autorytatywny pretty URL dla danego języka.
- **Spójność**: Zapobiega niezgodnościom, gdy użytkownik ręcznie wpisze kanoniczną ścieżkę (np. `/fr/privacy-notice`) zamiast zlokalizowanej wersji (`/fr/politique-de-confidentialite`).
- **Wydajność**: Aktualizuje pasek adresu bez wywoływania niepożądanych efektów ubocznych routera lub ponownego montowania komponentów.
