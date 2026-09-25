---
createdAt: 2026-06-13
updatedAt: 2026-06-13
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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/vue-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/transloco" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/react-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/svelte-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/react-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/polyglot" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/nuxtjs-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/ngx-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/i18n-js" />
</TechGrid>
