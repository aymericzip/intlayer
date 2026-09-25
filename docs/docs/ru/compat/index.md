---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Адаптеры совместимости Intlayer"
description: "Переведите ваше существующее решение i18n на Intlayer без трения, используя адаптеры совместимости."
keywords:
  - compat
  - миграция
  - интернационализация
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# Адаптеры совместимости Intlayer

Миграция крупного приложения на новую библиотеку интернационализации может быть сложной. Чтобы облегчить этот переход, Intlayer предоставляет **адаптеры совместимости** для наиболее популярных библиотек i18n в экосистеме.

Эти пакеты адаптеров предоставляют **точно такой же публичный API**, как ваши существующие библиотеки i18n, но делегируют всю работу по переводу Intlayer во время выполнения.

## Как это работает

Когда вы используете адаптер совместимости, вам не нужно переписывать импорты приложения или изменять способ использования ваших хуков перевода и компонентов. Вместо этого плагины bundler Intlayer автоматически создают псевдонимы ваших существующих импортов для пакетов совместимости Intlayer.

Например, разработчик заменяет `import { useTranslation } from 'react-i18next'` на `import { useTranslation } from '@intlayer/react-i18next'` (выполняется автоматически через плагин bundler), и приложение продолжает работать с переводами, поступающими из словарей Intlayer. Ключи также типированы в соответствии с вашими словарями Intlayer!

## Доступные адаптеры совместимости

Выберите вашу существующую библиотеку ниже, чтобы увидеть, как перейти на него легко:

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
