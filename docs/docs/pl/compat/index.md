---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Adaptery kompatybilności Intlayer"
description: "Migruj istniejące rozwiązanie i18n do Intlayer bez tarcia za pomocą adapterów kompatybilności."
keywords:
  - compat
  - migracja
  - internationalization
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Adaptery kompatybilności Intlayer

Migracja dużej aplikacji do nowej biblioteki internacjonalizacji może być zniechęcająca. Aby ułatwić to przejście, Intlayer zapewnia **adaptery kompatybilności** dla najpopularniejszych bibliotek i18n w ekosystemie.

Te pakiety adapterów ujawniają **dokładnie taki sam publiczny API** co istniejące biblioteki i18n, ale delegują całą pracę tłumaczenia do Intlayer w czasie wykonywania.

## Jak to działa

Kiedy używasz adaptera compat, nie musisz przepisywać importów aplikacji ani zmieniać sposobu korzystania z hoków i komponentów tłumaczenia. Zamiast tego, wtyczki bundlera Intlayer automatycznie aliasują istniejące importy do pakietów compat Intlayer.

Na przykład, deweloper zastępuje `import { useTranslation } from 'react-i18next'` przez `import { useTranslation } from '@intlayer/react-i18next'` (wykonane automatycznie poprzez wtyczkę bundlera), a aplikacja kontynuuje pracę z tłumaczeniami serwowanymi z słowników Intlayer. Klucze są również wpisane względem twoich słowników Intlayer!

## Dostępne adaptery kompatybilności

Wybierz istniejącą bibliotekę poniżej, aby zobaczyć jak bezproblemowo przeprowadzić migrację:

- [Vue I18n](./vue-i18n.md)
- [Transloco](./transloco.md)
- [React Intl](./react-intl.md)
- [Svelte I18n](./svelte-i18n.md)
- [React i18next](./react-i18next.md)
- [Polyglot.js](./polyglot.md)
- [NuxtJS I18n](./nuxtjs-i18n.md)
- [NGX Translate](./ngx-translate.md)
- [Next Translate](./next-translate.md)
- [Next Intl](./next-intl.md)
- [Next i18next](./next-i18next.md)
- [i18next](./i18next.md)
- [Lingui](./lingui.md)
- [I18n-js](./i18n-js.md)
