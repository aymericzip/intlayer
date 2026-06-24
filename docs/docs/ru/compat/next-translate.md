---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Миграция с Next Translate на Intlayer"
description: "Узнайте, как перенести ваше приложение Next.js с next-translate на Intlayer, используя адаптер совместимости."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# Миграция с Next Translate на Intlayer

Миграция с `next-translate` на Intlayer - это почти прямая замена, которая сохраняет ваш существующий синтаксис и теги.

## Что делать

Инициализируйте Intlayer в вашем проекте:

```bash
npx intlayer init
```

CLI будет строить вашу конфигурацию. Вы можете применить плагин Intlayer в вашем `next.config.ts`, который впрыскивает псевдонимы подпути времени сборки, сопоставляющие `next-translate/useTranslation` с `@intlayer/next-translate`.

## Что происходит под капотом

`next-translate` предоставляет хуки, такие как `useTranslation('ns')`, `t('ns:key.path')` и компонент `<Trans>`.

Под капотом:

- **Интерполяция и множественное число:** Он тесно полагается на поведение адаптера `react-i18next`. Динамически обрабатываются заполнители `{{var}}` и множественное число, отображаемое из суффиксов, таких как `key_0`, `key_one` и `key_other`.
- **Компонент `<Trans>`:** Прямо поддерживается для парсинга HTML-подобных тегов вместе с prop `components` на основе массива.
- **Пространства имён:** Подпуть aliasing обеспечивает, что ваш `useTranslation` ссылается на правильные внутренние пространства имён словаря без ручного изменения.
