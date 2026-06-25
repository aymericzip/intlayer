---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з NGX-Translate на Intlayer"
description: "Дізнайтеся, як перенести вашу Angular-застосунок з ngx-translate на Intlayer за допомогою адаптера сумісності."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Ініціалізація історії"
author: aymericzip
---

# Міграція з NGX-Translate на Intlayer

Міграція вашої Angular-програми з `ngx-translate` на Intlayer легка за допомогою адаптера сумісності, що дозволяє вам уникнути необхідності переписувати всі ваші шаблони.

## Що робити

Почніть з виконання:

```bash
npx intlayer init
```

Це налаштовує `intlayer.config.ts`. Замініть ваші налаштування `TranslateModule.forRoot()` та імпорт альіасів відповідно, щоб вони вказували на `@intlayer/ngx-translate`.

## Що це робить під капотом

`ngx-translate` використовує `TranslateService` (`instant`, `get`, `stream`) разом з pipe `{{ 'KEY' | translate:params }}` та директивою `[translate]`.

Під капотом:

- **Services:** `TranslateService` обгортає `getIntlayer` та locale observable, забезпечуючи точно такі ж методи.
- **Pipes & Directives:** Переімплементовані для прямого розв'язання проти словників Intlayer.
- **Loaders:** Конфігурації `TranslateHttpLoader` перетворюються на заглушки попередження, тому що Intlayer за своєю суттю розв'язує та пакує ваші словники під час збірки (або через стандартні динамічні імпорти), повністю усуваючи необхідність у HTTP loaders.
