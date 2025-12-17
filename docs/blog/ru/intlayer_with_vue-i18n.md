---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer и vue-i18n
description: Интеграция Intlayer с vue-i18n для комплексного решения интернационализации Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - Интернационализация
  - Блог
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Добавлен плагин loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Переход на плагин syncJSON и полное переписывание
---

# Интернационализация Vue.js (i18n) с vue-i18n и Intlayer

<iframe title="Как автоматизировать ваши JSON-переводы vue-i18n с помощью Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Содержание

<TOC/>

## Что такое Intlayer?

**Intlayer** — это инновационная, с открытым исходным кодом библиотека интернационализации, разработанная для устранения недостатков традиционных решений i18n. Она предлагает современный подход к управлению контентом в приложениях Vue.js и Nuxt.

Смотрите конкретное сравнение с vue-i18n в нашем блоге [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/vue-i18n_vs_intlayer.md).

## Почему стоит сочетать Intlayer с vue-i18n?

Хотя Intlayer предоставляет отличное самостоятельное решение i18n (см. наше [руководство по интеграции с Vue.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md)), вы можете захотеть сочетать его с vue-i18n по нескольким причинам:

1. **Существующая кодовая база**: У вас уже есть реализованная система vue-i18n, и вы хотите постепенно перейти на улучшенный опыт разработки с Intlayer.
2. **Требования наследия**: Ваш проект требует совместимости с существующими плагинами или рабочими процессами vue-i18n.
3. **Знакомство команды**: Ваша команда привыкла к vue-i18n, но хочет улучшить управление контентом.
4. **Использование возможностей Intlayer**: Вы хотите использовать функции Intlayer, такие как декларация контента, автоматизация перевода, тестирование переводов и многое другое.

**Для этого Intlayer может быть реализован как адаптер для vue-i18n, чтобы помочь автоматизировать ваши JSON-переводы в CLI или CI/CD пайплайнах, тестировать переводы и многое другое.**

Это руководство показывает, как использовать превосходную систему декларации контента Intlayer, сохраняя при этом совместимость с vue-i18n.

---

## Пошаговое руководство по настройке Intlayer с vue-i18n

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью предпочитаемого менеджера пакетов:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Объяснение пакетов:**

- **intlayer**: Основная библиотека для декларации и управления контентом
- **@intlayer/sync-json-plugin**: Плагин для синхронизации деклараций контента Intlayer с форматом JSON vue-i18n

### Шаг 2: Реализация плагина Intlayer для обёртки JSON

Создайте файл конфигурации Intlayer для определения поддерживаемых локалей:

**Если вы также хотите экспортировать JSON-словарь для vue-i18n**, добавьте плагин `syncJSON`:

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
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагин `syncJSON` автоматически обернет JSON. Он будет читать и записывать JSON-файлы без изменения архитектуры содержимого.

Если вы хотите, чтобы JSON сосуществовал с файлами деклараций контента Intlayer (`.content` файлы), Intlayer будет работать следующим образом:

    1. загрузит как JSON, так и файлы деклараций контента и преобразует их в словарь Intlayer.
    2. если возникнут конфликты между JSON и файлами деклараций контента, Intlayer выполнит слияние всех словарей. В зависимости от приоритета плагинов и файлов деклараций контента (все настраивается).

Если изменения вносятся с помощью CLI для перевода JSON или через CMS, Intlayer обновит JSON-файл с новыми переводами.

Чтобы узнать больше подробностей о плагине `syncJSON`, пожалуйста, обратитесь к [документации плагина syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md).

---

### (Необязательно) Шаг 3: Реализация переводов JSON по компонентам

По умолчанию Intlayer загружает, объединяет и синхронизирует как JSON, так и файлы деклараций контента. Подробнее смотрите в [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md). Но если вы предпочитаете, используя плагин Intlayer, вы также можете реализовать управление локализованным JSON по компонентам в любом месте вашего кода.

Для этого вы можете использовать плагин `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Синхронизируйте ваши текущие JSON-файлы с словарями Intlayer
  plugins: [
    /**
     * Загрузит все JSON-файлы в src, которые соответствуют шаблону {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Обеспечивает приоритет этих JSON-файлов над файлами в `./locales/en/${key}.json`
    }),
    /**
     * Загрузит, а также запишет результат и переводы обратно в JSON-файлы в директории locales
     */
    syncJSON({
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Это загрузит все JSON-файлы в каталоге `src`, которые соответствуют шаблону `{key}.i18n.json`, и загрузит их как словари Intlayer.

---

## Конфигурация Git

Исключите сгенерированные файлы из системы контроля версий:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

Эти файлы автоматически пересоздаются в процессе сборки и не требуют добавления в ваш репозиторий.

### Расширение VS Code

Для улучшения опыта разработчика установите официальное **расширение Intlayer для VS Code**:

[Установить из магазина расширений VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Установить из магазина расширений VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
