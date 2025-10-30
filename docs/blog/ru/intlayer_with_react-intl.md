---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Как автоматизировать ваши JSON-переводы react-intl с помощью Intlayer
description: Автоматизируйте ваши JSON-переводы с помощью Intlayer и react-intl для улучшенной интернационализации в React-приложениях.
keywords:
  - react-intl
  - Intlayer
  - Интернационализация
  - Блог
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Переход на плагин syncJSON
---

# Как автоматизировать ваши JSON-переводы react-intl с помощью Intlayer

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации, разработанная для устранения недостатков традиционных решений i18n. Она предлагает современный подход к управлению контентом в React-приложениях.

Смотрите конкретное сравнение с react-intl в нашем блоге [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/react-i18next_vs_react-intl_vs_intlayer.md).

## Почему стоит сочетать Intlayer с react-intl?

Хотя Intlayer предоставляет отличное самостоятельное решение для i18n (см. наше [руководство по интеграции с React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)), вы можете захотеть сочетать его с react-intl по нескольким причинам:

1. **Существующая кодовая база**: У вас уже есть реализованная система react-intl, и вы хотите постепенно перейти на улучшенный опыт разработчика с Intlayer.
2. **Требования наследия**: Ваш проект требует совместимости с существующими плагинами или рабочими процессами react-intl.
3. **Знакомство команды**: Ваша команда привыкла к react-intl, но хочет улучшить управление контентом.

**Для этого Intlayer может быть реализован как адаптер для react-intl, чтобы помочь автоматизировать ваши JSON-переводы в CLI или CI/CD пайплайнах, тестировать переводы и многое другое.**

Это руководство покажет вам, как использовать превосходную систему декларации контента Intlayer, сохраняя при этом совместимость с react-intl.

## Содержание

<TOC/>

## Пошаговое руководство по настройке Intlayer с react-intl

### Шаг 1: Установка зависимостей

Установите необходимые пакеты:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**Описание пакетов:**

- **intlayer**: Основная библиотека для управления интернационализацией, декларации контента и сборки
- **@intlayer/sync-json-plugin**: Плагин для экспорта деклараций контента Intlayer в JSON-формат, совместимый с react-intl

### Шаг 2: Реализация плагина Intlayer для обёртки JSON

Создайте конфигурационный файл Intlayer для определения поддерживаемых локалей:

**Если вы также хотите экспортировать JSON-словари для react-intl**, добавьте плагин `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагин `syncJSON` автоматически обернет JSON. Он будет читать и записывать JSON-файлы без изменения архитектуры контента.

Если вы хотите, чтобы JSON сосуществовал с файлами декларации контента intlayer (`.content` файлы), Intlayer будет работать следующим образом:

    1. загрузит как JSON, так и файлы декларации контента и преобразует их в словарь intlayer.
    2. если возникают конфликты между JSON и файлами декларации контента, Intlayer выполнит слияние всех словарей. В зависимости от приоритета плагинов и файла декларации контента (все настраивается).

Если изменения вносятся с помощью CLI для перевода JSON или с использованием CMS, Intlayer обновит JSON-файл с новыми переводами.

Для получения дополнительной информации о плагине `syncJSON` обратитесь к [документации плагина syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md).

## Конфигурация Git

Рекомендуется игнорировать автоматически сгенерированные файлы Intlayer:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

Эти файлы могут быть сгенерированы заново в процессе сборки и не требуют добавления в систему контроля версий.

### Расширение VS Code

Для улучшения опыта разработчика установите официальное **Расширение Intlayer для VS Code**:

[Установить из магазина расширений VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
