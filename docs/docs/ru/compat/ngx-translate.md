---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Миграция с NGX-Translate на Intlayer"
description: "Узнайте, как перенести ваше приложение Angular с ngx-translate на Intlayer, используя адаптер совместимости."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# Миграция с NGX-Translate на Intlayer

Миграция вашего приложения Angular с `ngx-translate` на Intlayer легко с адаптером совместимости, позволяя вам избежать необходимости переписывать все ваши шаблоны.

## Что делать

Начните с запуска:

```bash
npx intlayer init
```

Это устанавливает `intlayer.config.ts`. Замените ваши параметры `TranslateModule.forRoot()` и импортируйте псевдонимы должным образом, чтобы они указывали на `@intlayer/ngx-translate`.

## Что происходит под капотом

`ngx-translate` использует `TranslateService` (`instant`, `get`, `stream`) вместе с трубой `{{ 'KEY' | translate:params }}` и директивой `[translate]`.

Под капотом:

- **Services:** `TranslateService` оборачивает `getIntlayer` и наблюдаемую локаль, предоставляя точно те же методы.
- **Pipes и директивы:** Переимплементированы для прямого разрешения в словарях Intlayer.
- **Loaders:** Параметры `TranslateHttpLoader` преобразуются в предупреждающие заглушки, потому что Intlayer по своей природе разрешает и объединяет ваши словари во время сборки (или через стандартные динамические импорты), полностью исключая необходимость в HTTP-загрузчиках.
