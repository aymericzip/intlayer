---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z NGX-Translate do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Angular z ngx-translate do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z NGX-Translate do Intlayer

Migracja aplikacji Angular z `ngx-translate` do Intlayer jest łatwa za pomocą adaptera compat, pozwalając pominąć potrzebę przepisywania wszystkich szablonów.

## Co zrobić

Rozpocznij uruchamiając:

```bash
npx intlayer init
```

To ustawia `intlayer.config.ts`. Zastąp konfiguracje `TranslateModule.forRoot()` i aliasy importu odpowiednio aby wskazywały na `@intlayer/ngx-translate`.

## Co się dzieje za kulisami

`ngx-translate` wykorzystuje `TranslateService` (`instant`, `get`, `stream`) wraz z piperem `{{ 'KEY' | translate:params }}` i dyrektywą `[translate]`.

Za kulisami:

- **Serwisy:** `TranslateService` opakuje `getIntlayer` i obserwowalne lokali, zapewniając dokładnie te same metody.
- **Pipy i dyrektywy:** Ponownie wdrożone aby rozwiązywać względem słowników Intlayer bezpośrednio.
- **Zaladowniki:** Konfiguracje `TranslateHttpLoader` są konwertowane na zadania ostrzeżeń, ponieważ Intlayer natywnie rozwiązuje i powiązuje twoje słowniki w czasie budowania (lub poprzez standardowe importy dynamiczne), całkowicie eliminując potrzebę zaladowników HTTP.
