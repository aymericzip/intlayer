---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentacja hooka usePathname | react-intlayer
description: Dowiedz się, jak używać hooka usePathname z pakietu react-intlayer, aby uzyskać bieżącą ścieżkę URL bez segmentu lokalizacji.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internacjonalizacja
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Dodano narzędzie usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Integracja React: Dokumentacja hooka `usePathname`

Hook `usePathname` z `react-intlayer` zwraca obecną ścieżkę (pathname) przeglądarki z usuniętym segmentem lokalizacji (locale). Opiera się na natywnej właściwości `window.location.pathname` i reaguje na zdarzenia nawigacji przeglądarki za pośrednictwem `popstate`.

## Importowanie `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Przegląd

W przeciwieństwie do hooków routingu specyficznych dla frameworków (takich jak te w `next-intlayer` lub `react-router`), ten hook jest lekkim, niezależnym od frameworka rozwiązaniem dla czystych aplikacji React. Wyciąga bieżący adres URL i usuwa wszelkie pasujące prefiksy lokalizacji (np. `/pl/about` staje się `/about`).

## Użycie

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Strona główna
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        O nas
      </a>
    </nav>
  );
};

export default Navigation;
```

## Zwracana wartość

| Typ      | Opis                                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| `string` | Obecna ścieżka (pathname) przeglądarki z usuniętym prefiksem lokalizacji (np. `/pl/dashboard` → `/dashboard`). |

## Zachowanie

- **Usuwanie lokalizacji**: Pod maską korzysta z narzędzia `getPathWithoutLocale`, aby automatycznie wykrywać i usuwać lokalizację ze ścieżki w oparciu o konfigurację Intlayer aplikacji.
- **Reaktywność**: Nasłuchuje zdarzenia `popstate`. Gdy użytkownik nawiguje za pomocą przycisków wstecz/dalej w przeglądarce lub gdy wywoływane jest `pushState`/`replaceState`, hook aktualizuje zwracaną ścieżkę.
- **SSR Fallback**: Na serwerze (gdzie `window` jest niezdefiniowane), domyślnie zwraca `/`, ponieważ w czystym kontekście React domyślnie nie ma dostępu do adresu URL żądania.

## Powiązana dokumentacja

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md)
