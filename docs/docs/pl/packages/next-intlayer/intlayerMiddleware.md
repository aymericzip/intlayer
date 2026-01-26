---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja intlayerMiddleware | next-intlayer
description: Zobacz, jak używać funkcji intlayerMiddleware w pakiecie next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Dokumentacja
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inicjalizacja dokumentacji
---

# Dokumentacja intlayerMiddleware

Funkcja `intlayerMiddleware` to middleware dla Next.js, który obsługuje routowanie i przekierowania oparte na lokalizacji (locale). Automatycznie wykrywa preferowaną przez użytkownika lokalizację i, jeśli to konieczne, przekierowuje go na odpowiednią zlokalizowaną ścieżkę.

## Użycie

```ts
// middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Opis

Middleware wykonuje następujące zadania:

1. **Wykrywanie locale**: Sprawdza ścieżkę URL, ciasteczka i nagłówek `Accept-Language`, aby określić locale użytkownika.
2. **Przekierowanie**: Jeśli URL nie zawiera prefiksu locale i konfiguracja wymaga takiego prefiksu (lub na podstawie preferencji użytkownika), przekierowuje do zlokalizowanego URL.
3. **Zarządzanie ciasteczkami**: Może zapisać wykryte locale w ciasteczku na przyszłe żądania.

## Parametry

Funkcja przyjmuje standardowy Next.js `NextRequest` jako parametr, gdy jest używana bezpośrednio, lub może być eksportowana tak jak pokazano powyżej.
