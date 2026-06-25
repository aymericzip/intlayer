---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з NuxtJS I18n на Intlayer"
description: "Дізнайтеся, як перенести вашу програму Nuxt.js з @nuxtjs/i18n на Intlayer за допомогою адаптера compat."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Перехід з NuxtJS I18n на Intlayer

Перехід вашої Nuxt-програми з `@nuxtjs/i18n` на Intlayer є безперебійним процесом за допомогою модуля адаптера Nuxt.

## Що робити

Щоб ініціалізувати проект, запустіть:

```bash
npx intlayer init
```

Це налаштує `intlayer.config.ts`. Потім додайте модуль Intlayer Nuxt (наприклад `@intlayer/nuxt-i18n`) у масив modules вашого `nuxt.config.ts`. Це автоматично застосує конфігурацію сумісності для вашої програми.

## Що він робить під капотом

`@nuxtjs/i18n` обгортає `vue-i18n`, надаючи Nuxt-специфічні routing composables (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Під капотом:

- **Translations:** Покладається нативно на `@intlayer/vue-i18n` compat layer для всіх завдань трансляції рядків (повністю підтримуючи формати `vue-i18n`, pipe plurals та reactivity).
- **Routing:** Відзеркалює routing composables, використовуючи Intlayer's localized URL helpers.
- **Configuration:** Читає `availableLocales` та параметри за замовчуванням прямо з вашого `intlayer.config.ts` для автоматичної координації сторінок Nuxt.
