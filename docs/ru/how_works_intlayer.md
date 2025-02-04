# Как работает Intlayer

## Обзор

Роль Intlayer заключается в интерпретации файлов декларации контента JavaScript в словари.

Для этого Intlayer проходит несколько этапов:

1. Декларация файлов контента

   - Файлы контента могут быть определены в различных форматах, таких как TypeScript, ECMAScript, CommonJS или JSON.
   - Файлы контента могут быть определены в любой части проекта, что позволяет лучше поддерживать и масштабировать его. Важно придерживаться соглашений о расширениях файлов для файлов контента. По умолчанию это расширение `*.content.{js|cjs|mjs|ts|tsx|json}`, но его можно изменить в [файле конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

2. Генерация словарей

   - Словари генерируются из файлов контента. По умолчанию, словари intlayer генерируются в директории `.intlayer/dictionary` проекта.
   - Можно сгенерировать два типа словарей: словари intlayer и словари i18n (бета).

3. Генерация типов словарей

   - Типы словарей генерируются из словарей intlayer. По умолчанию, типы словарей intlayer генерируются в директории `types` проекта.

4. Генерация расширения модуля Intlayer

   - Расширение модуля Intlayer [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) является функцией TypeScript, которая позволяет вам определять дополнительные типы для Intlayer. Это упрощает процесс разработки, предлагая доступные аргументы или обязательные аргументы.
     Среди сгенерированных типов добавляются типы словарей intlayer или даже типы конфигурации языка в файл `types/intlayer.d.ts`, и используются другими пакетами. Для этого необходимо, чтобы файл `tsconfig.json` был настроен на включение директории `types` проекта.

5. Мониторинг файлов контента

   - Файлы контента отслеживаются, чтобы быть восстановленными каждый раз, когда они модифицируются.

6. Интерпретация словарей
   - Словари наконец интерпретируются для использования в приложениях.

## Пакеты

Intlayer состоит из нескольких пакетов, каждый из которых имеет свою конкретную роль в процессе перевода. Вот графическое представление структуры этого пакета:

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Пакет `intlayer` используется в приложениях для декларации контента в файлах контента.

### react-intlayer

Пакет `react-intlayer` используется для интерпретации словарей intlayer и их использования в приложениях React.

### next-intlayer

Пакет `next-intlayer` используется как уровень поверх `react-intlayer`, чтобы сделать словари intlayer доступными в приложениях Next.js. Он интегрирует основные функции, чтобы сделать Intlayer работающим в среде Next.js, такие как промежуточное ПО перевода, маршрутизация или конфигурация файла `next.config.js`.

### vite-intlayer

Включает плагин Vite для интеграции Intlayer с [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительного языка пользователя, управления файлами cookie и обработки перенаправления URL.

### react-scripts-intlayer

Включает команды и плагины `react-scripts-intlayer` для интеграции Intlayer с приложением на основе Create React App. Эти плагины основаны на [craco](https://craco.js.org/) и включают дополнительную конфигурацию для сборщика [Webpack](https://webpack.js.org/).

### intlayer-editor

Пакет `intlayer-editor` используется для обеспечения использования визуального редактора. Этот пакет, по желанию, может быть установлен в приложениях и будет использоваться пакетом `react-intlayer`.
Он состоит из двух частей: сервера и клиента.

Клиент содержит UI-элементы, которые будут использоваться `react-intlayer`.

Сервер, основанный на Express, используется для получения визуальных запросов редактора и управления или изменения файлов контента.

### intlayer-cli

Пакет `intlayer-cli` может быть использован для генерации словарей с помощью команды `npx intlayer build`. Если `intlayer` уже установлен, cli автоматически устанавливается, и этот пакет не нужен.

### @intlayer/core

Пакет `@intlayer/core` является основным пакетом Intlayer. Он содержит функции управления переводами и словарями. `@intlayer/core` многоплатформен и используется другими пакетами для выполнения интерпретации словарей.

### @intlayer/config

Пакет `@intlayer/config` используется для настройки параметров Intlayer, таких как доступные языки, параметры промежуточного ПО Next.js или настройки интегрированного редактора.

### @intlayer/webpack

Пакет `@intlayer/webpack` используется для предоставления конфигурации Webpack, чтобы сделать работу приложения на основе Webpack с Intlayer возможной. Пакет также предоставляет плагин для добавления в существующее Webpack приложение.

### @intlayer/cli

Пакет `@intlayer/cli` является пакетом NPM, который используется для объявления скрипта, связанного с интерфейсами командной строки intlayer. Он обеспечивает единство всех команд CLI intlayer. Этот пакет заметно используется [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/ru/packages/intlayer-cli/index.md) и [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/ru/packages/intlayer/index.md) пакетов.

### @intlayer/dictionaries-entry

Пакет `@intlayer/dictionaries-entry` является пакетом, который возвращает только путь к записям словарей intlayer. Поскольку поиск файловой системы невозможен из браузера, использование сборщиков, таких как Webpack или Rollup, для извлечения пути к записям словарей невозможно. Этот пакет предназначен для алиасирования.

### @intlayer/chokidar

Пакет `@intlayer/chokidar` используется для мониторинга файлов контента и восстановления измененного словаря при каждом изменении.

## Общайтесь с нашей умной документацией

- [Задайте свои вопросы нашей умной документации](https://intlayer.org/docs/chat)
