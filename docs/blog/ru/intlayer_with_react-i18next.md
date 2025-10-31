---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Как автоматизировать ваши JSON-переводы react-i18next с помощью Intlayer
description: Автоматизируйте ваши JSON-переводы с помощью Intlayer и react-i18next для улучшенной интернационализации в React-приложениях.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Интернационализация
  - i18n
  - Блог
  - React
  - JavaScript
  - TypeScript
  - Управление контентом
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Переход на плагин syncJSON
---

# Как автоматизировать ваши JSON-переводы react-i18next с помощью Intlayer

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации, разработанная для устранения недостатков традиционных решений i18n. Она предлагает современный подход к управлению контентом в React-приложениях.

Смотрите конкретное сравнение с react-i18next в нашем блоге [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/react-i18next_vs_react-intl_vs_intlayer.md).

## Почему стоит сочетать Intlayer с react-i18next?

Хотя Intlayer предоставляет отличное самостоятельное решение i18n (см. наше [руководство по интеграции с React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)), вы можете захотеть объединить его с react-i18next по нескольким причинам:

1. **Существующая кодовая база**: У вас уже есть реализованная система на react-i18next, и вы хотите постепенно перейти на улучшенный опыт разработки с Intlayer.
2. **Требования к совместимости**: Ваш проект требует совместимости с существующими плагинами или рабочими процессами react-i18next.
3. **Знакомство команды**: Ваша команда привыкла к react-i18next, но хочет улучшить управление контентом.

**Для этого Intlayer может быть реализован как адаптер для react-i18next, чтобы помочь автоматизировать ваши JSON-переводы в CLI или CI/CD пайплайнах, тестировать переводы и многое другое.**

В этом руководстве показано, как использовать превосходную систему декларации контента Intlayer, сохраняя при этом совместимость с react-i18next.

## Содержание

<TOC/>

## Пошаговое руководство по настройке Intlayer с react-i18next

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
- **@intlayer/sync-json-plugin**: Плагин для экспорта деклараций контента Intlayer в JSON-формат, совместимый с react-i18next

### Шаг 2: Реализация плагина Intlayer для обёртывания JSON

Создайте конфигурационный файл Intlayer для определения поддерживаемых локалей:

**Если вы также хотите экспортировать JSON-словари для react-i18next**, добавьте плагин `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагин `syncJSON` автоматически обернет JSON. Он будет читать и записывать JSON-файлы без изменения архитектуры контента.

Если вы хотите, чтобы JSON сосуществовал с файлами декларации контента intlayer (`.content` файлы), Intlayer будет работать следующим образом:

    1. загрузить как JSON, так и файлы декларации контента и преобразовать их в словарь intlayer.
    2. если возникают конфликты между JSON и файлами декларации контента, Intlayer выполнит слияние всех этих словарей. В зависимости от приоритета плагинов и файла декларации контента (все настраивается).

Если изменения внесены с помощью CLI для перевода JSON или с использованием CMS, Intlayer обновит JSON-файл с новыми переводами.

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

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
