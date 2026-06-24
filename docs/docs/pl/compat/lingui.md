---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z Lingui do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji z Lingui do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - lingui
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z Lingui do Intlayer

Jeśli twój projekt opiera się na kompilacji opartej na makrach Lingui, przejście na Intlayer pozwala ci utrzymać potężne przepływy pracy makr, wspierając je natywnie strategią kompilacji JSON Intlayer.

## Co zrobić

Aby rozpocząć, zainicjuj Intlayer w swoim projekcie:

```bash
npx intlayer init
```

To tworzy twój `intlayer.config.ts`. Upewnij się, że zachowujesz `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` w kroku budowania, aby działał _przed_ kompilator Intlayer. Następnie, użyj aliasu wtyczki bundlera aby przekierować `@lingui/core` i `@lingui/react` do `@intlayer/lingui`.

## Co się dzieje za kulisami

Lingui wykorzystuje makra (takie jak `` t`Hello ${name}` `` i `<Trans>`) które są kompilowane w wywołania czasu wykonywania takie jak `i18n._(id, values)`.

Za kulisami:

- **Makra:** Kompilują się dokładnie jak wcześniej, zapewniając brak przerwy w składni źródła.
- **Tłumaczenie czasu wykonywania:** Alias `i18n._()` korzysta ze słowników Intlayer. Zarówno jawnie nazwane identyfikatory jak i zahaszowane identyfikatory są w pełni mapowane używając wtyczek synchronizacji Intlayer `.po` aby agregować i usuwać klucze bezpiecznie.
- **Możliwości ICU:** Obsługa pluralizacji, selekcji i wariantów ICU pozostaje solidna dzięki ujednoliconemu parserowi ICU Intlayer, zapewniając identyczne wyniki renderowania.
