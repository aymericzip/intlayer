---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n: адаптер сумісності для @nuxtjs/i18n"
description: "Збережіть код на @nuxtjs/i18n і обслуговуйте його через Intlayer: встановіть @intlayer/nuxt-i18n, налаштуйте аліаси імпортів і дізнайтеся, що адаптер змінює під капотом."
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

# @intlayer/nuxt-i18n: адаптер сумісності для @nuxtjs/i18n

Перехід вашої Nuxt-програми з `@nuxtjs/i18n` на Intlayer є безперебійним процесом за допомогою модуля адаптера Nuxt.

## Що робити

Щоб ініціалізувати проект, запустіть:

```bash
npx intlayer init --interactive
```

Це налаштує `intlayer.config.ts`. Потім додайте модуль Intlayer Nuxt (наприклад `@intlayer/nuxt-i18n`) у масив modules вашого `nuxt.config.ts`. Це автоматично застосує конфігурацію сумісності для вашої програми.

## Що він робить під капотом

`@nuxtjs/i18n` обгортає `vue-i18n`, надаючи Nuxt-специфічні routing composables (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Під капотом:

- **Translations:** Покладається нативно на `@intlayer/vue-i18n` compat layer для всіх завдань трансляції рядків (повністю підтримуючи формати `vue-i18n`, pipe plurals та reactivity).
- **Routing:** Відзеркалює routing composables, використовуючи Intlayer's localized URL helpers.
- **Configuration:** Читає `availableLocales` та параметри за замовчуванням прямо з вашого `intlayer.config.ts` для автоматичної координації сторінок Nuxt.

> Щоб зрозуміти, звідки взялися ці бібліотеки, прочитайте історію i18n у JavaScript.

- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)
