---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z Transloco do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Angular z Transloco do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - transloco
  - angular
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z Transloco do Intlayer

Jeśli aplikacja Angular aktualnie używa `@jsverse/transloco`, możesz przeprowadzić migrację do Intlayer używając naszego adaptera compat. To przejście pozwala ci zachować istniejącą składnię szablonu przy jednoczesnym wykorzystaniu potężnej struktury słownika Intlayer.

## Co zrobić

Po prostu uruchom polecenie inicjalizacji w swoim projekcie:

```bash
npx intlayer init
```

To będzie generować wymaganą konfigurację `intlayer.config.ts`. Następnie zastąpisz importy Transloco modułami `@intlayer/transloco` lub polegaj na aliasach budowania.

## Co się dzieje za kulisami

Transloco używa zakresów i `TranslocoService` (`translate`, `selectTranslate`), wraz z dyrektywami strukturalnymi (`*transloco="let t"`) i piperem (`| transloco`).

Za kulisami:

- **Zakresy:** Naturalnie mapują się na klucze słownika Intlayer, zapewniając wspaniałą historię czyszczenia dla optymalizacji rozmiaru bundle.
- **Serwis i dyrektywy:** Adapter Intlayer Angular bezproblemowo zastępuje dostawców, pozwalając istniejącym piperom i dyrektywom szablonu rozwiązywać ciągi względem słowników Intlayer.
- **Parsowanie czasu budowania:** Analizator TypeScript rozpoznaje wywołania `instant/get`, a rezerwowe czyszczenie zapewnia poprawność, nawet gdy użycie szablonu nie jest statycznie śledzone.
