---
createdAt: 2026-06-13
updatedAt: 2026-06-13
priority: 7
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

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/lingui.md)
