---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer и next-i18next
description: Интеграция Intlayer с next-i18next для комплексного решения интернационализации Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Интернационализация
  - Блог
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Переход на плагин syncJSON и полное переписывание
---

# Интернационализация (i18n) Next.js с next-i18next и Intlayer

## Содержание

<TOC/>

## Что такое next-i18next?

**next-i18next** — одна из самых популярных библиотек для интернационализации (i18n) в приложениях Next.js. Построенная на мощной экосистеме **i18next**, она предоставляет комплексное решение для управления переводами, локализацией и переключением языков в проектах Next.js.

Однако next-i18next имеет некоторые сложности:

- **Сложная конфигурация**: Настройка next-i18next требует нескольких конфигурационных файлов и тщательной настройки i18n как на стороне сервера, так и на стороне клиента.
- **Разрозненные переводы**: Файлы переводов обычно хранятся в отдельных директориях, отличных от компонентов, что затрудняет поддержание согласованности.
- **Ручное управление пространствами имён**: Разработчикам необходимо вручную управлять пространствами имён и обеспечивать правильную загрузку ресурсов переводов.
- **Ограниченная типобезопасность**: Поддержка TypeScript требует дополнительной настройки и не обеспечивает автоматическую генерацию типов для переводов.

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации, разработанная для устранения недостатков традиционных решений i18n. Она предлагает современный подход к управлению контентом в приложениях Next.js.

Смотрите конкретное сравнение с next-intl в нашем блоге [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

## Почему стоит сочетать Intlayer с next-i18next?

Хотя Intlayer предоставляет отличное автономное решение для i18n (см. наше [руководство по интеграции с Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)), вы можете захотеть комбинировать его с next-i18next по нескольким причинам:

1. **Существующая кодовая база**: У вас уже есть реализованная система next-i18next, и вы хотите постепенно перейти на улучшенный опыт разработки с Intlayer.
2. **Требования наследия**: Ваш проект требует совместимости с существующими плагинами или рабочими процессами i18next.
3. **Знакомство команды**: Ваша команда привыкла к next-i18next, но хочет улучшенного управления контентом.

**Для этого Intlayer может быть реализован как адаптер для next-i18next, чтобы помочь автоматизировать ваши JSON-переводы в CLI или CI/CD пайплайнах, тестировать ваши переводы и многое другое.**

В этом руководстве показано, как использовать превосходную систему декларации контента Intlayer, сохраняя совместимость с next-i18next.

---

## Пошаговое руководство по настройке Intlayer с next-i18next

### Шаг 1: Установка зависимостей

Установите необходимые пакеты, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**Объяснение пакетов:**

- **intlayer**: Основная библиотека для декларации и управления контентом
- **next-intlayer**: Слой интеграции с Next.js с плагинами сборки
- **i18next**: Основной фреймворк для интернационализации
- **next-i18next**: Обертка Next.js для i18next
- **i18next-resources-to-backend**: Динамическая загрузка ресурсов для i18next
- **@intlayer/sync-json-plugin**: Плагин для синхронизации деклараций контента Intlayer в формат JSON для i18next

### Шаг 2: Реализация плагина Intlayer для обертки JSON

Создайте конфигурационный файл Intlayer для определения поддерживаемых локалей:

**Если вы также хотите экспортировать JSON-словари для i18next**, добавьте плагин `syncJSON`:

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

    1. загрузит как JSON, так и файлы декларации контента и преобразует их в словарь intlayer.
    2. если возникают конфликты между JSON и файлами декларации контента, Intlayer выполнит слияние всех словарей. В зависимости от приоритета плагинов и файла декларации контента (все настраивается).

Если изменения внесены с помощью CLI для перевода JSON или с использованием CMS, Intlayer обновит JSON-файл с новыми переводами.

---

## Конфигурация Git

Исключите сгенерированные файлы из системы контроля версий:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
intl
```

Эти файлы автоматически пересоздаются в процессе сборки и не требуют коммита в ваш репозиторий.

### Расширение VS Code

Для улучшения опыта разработчика установите официальное **расширение Intlayer для VS Code**:

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
