---
createdAt: 2026-06-13
updatedAt: 2026-06-13
priority: 7
title: "Адаптери сумісності Intlayer"
description: "Мігруйте своє існуюче рішення i18n на Intlayer без зусиль, використовуючи адаптери сумісності."
keywords:
  - compat
  - migration
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

# Compat адаптери Intlayer

Міграція великої програми на нову бібліотеку інтернаціоналізації може бути складною. Щоб полегшити цей перехід, Intlayer надає **compat адаптери** для найпопулярніших i18n бібліотек в екосистемі.

Ці пакети адаптерів надають **точно такий самий публічний API**, як ваші існуючі i18n бібліотеки, але делегують усю роботу перекладу в Intlayer під час виконання.

## Як це працює

Коли ви використовуєте compat adapter, вам не потрібно переписувати імпорти вашої програми або змінювати те, як ви користуєтеся translation hooks та компонентами. Замість цього, плагіни bundler Intlayer автоматично створюють alias ваших існуючих імпортів на Intlayer compat пакети.

Наприклад, розробник замінює `import { useTranslation } from 'react-i18next'` на `import { useTranslation } from '@intlayer/react-i18next'` (робиться автоматично через плагін bundler), і програма продовжує працювати з перекладами, які тепер надаються з Intlayer словників. Ключі також типізовані щодо ваших Intlayer словників!

## Доступні адаптери сумісності

Виберіть вашу існуючу бібліотеку нижче, щоб дізнатися, як легко перейти:

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md)
