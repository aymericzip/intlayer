---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Dokumentacja oprogramowania pośredniczącego intlayer dla AdonisJS | adonis-intlayer
description: Zobacz, jak używać middleware intlayer w pakiecie adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Dokumentacja początkowa
---

# Dokumentacja oprogramowania pośredniczącego intlayer dla AdonisJS

Middleware `intlayer` dla AdonisJS wykrywa ustawienia regionalne użytkownika i zapewnia funkcje tłumaczenia poprzez kontekst żądania. Umożliwia również korzystanie z globalnych funkcji tłumaczenia w ramach przepływu żądania.

## Użycie

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Opis

Middleware wykonuje następujące zadania:

1. **Wykrywanie ustawień regionalnych**: Analizuje żądanie (nagłówki, ciasteczka itp.) w celu określenia preferowanych ustawień regionalnych użytkownika.
2. **Konfiguracja kontekstu**: Wypełnia kontekst żądania informacjami o ustawieniach regionalnych.
3. **Async Local Storage**: Używa `cls-hooked` do zarządzania asynchronicznym kontekstem, umożliwiając globalnym funkcjom Intlayer, takim jak `t`, `getIntlayer` i `getDictionary`, dostęp do ustawień regionalnych specyficznych dla żądania bez konieczności ich ręcznego przekazywania.

> Uwaga: Aby używać ciasteczek do wykrywania ustawień regionalnych, upewnij się, że `@adonisjs/cookie` jest skonfigurowane i używane w Twojej aplikacji.
