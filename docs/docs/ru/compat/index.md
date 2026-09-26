---
createdAt: 2026-06-13
updatedAt: 2026-06-13
priority: 7
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

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md)
