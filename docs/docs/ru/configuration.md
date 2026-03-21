---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Конфигурация (Configuration)
description: Узнайте, как настроить Intlayer для вашего приложения. Поймите различные настройки и опции, доступные для настройки Intlayer в соответствии с вашими потребностями.
keywords:
  - Конфигурация
  - Настройки
  - Кастомизация
  - Intlayer
  - Опции
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: Добавлена нотация объектов по локалям для 'compiler.output' и 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Перенесен 'baseDir' из конфигурации 'content' в конфигурацию 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Обновлены параметры компилятора (compiler), добавлена поддержка для 'output' и 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Обновлены параметры компилятора
  - version: 8.1.5
    date: 2026-02-23
    changes: Добавлен параметр компилятора 'build-only' и префикс словаря
  - version: 8.0.6
    date: 2026-02-12
    changes: Добавлена поддержка провайдеров Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face и Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Добавлен `dataSerialization` в конфигурацию AI
  - version: 8.0.0
    date: 2026-01-24
    changes: Переименован режим импорта `live` в `fetch` для лучшего описания базового механизма.
  - version: 8.0.0
    date: 2026-01-22
    changes: Перенесена конфигурация сборки `importMode` в конфигурацию `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: Добавлен параметр `rewrite` в конфигурацию маршрутизации
  - version: 8.0.0
    date: 2026-01-18
    changes: Разделена системная конфигурация и конфигурация контента. Внутренние пути перемещены в свойство `system`. Добавлен `codeDir` для разделения файлов контента и преобразования кода.
  - version: 8.0.0
    date: 2026-01-18
    changes: Добавлены параметры словаря `location` и `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Добавлена поддержка форматов файлов JSON5 и JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Добавлен параметр `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Добавлена конфигурация `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Заменен `middleware` конфигурацией маршрутизации `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Добавлен параметр `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Обновлен параметр `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Добавлен параметр `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Удалено поле `dictionaryOutput` и поле `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Добавлен режим импорта `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Поле `hotReload` заменено на `liveSync`, добавлены поля `liveSyncPort` и `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Поле `activateDynamicImport` заменено параметром `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Изменен контентный каталог по умолчанию `contentDir` с `['src']` на `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Добавлены команды `docs`
---

# Документация по конфигурации Intlayer

## Обзор

Конфигурационные файлы Intlayer позволяют настраивать различные аспекты плагина, такие как интернационализация (internationalization), промежуточное ПО (middleware) и обработка контента. Эта документация содержит подробное описание каждого свойства конфигурации.

---

## Содержание

<TOC/>

---

## Поддерживаемые форматы конфигурационных файлов

Intlayer принимает форматы конфигурационных файлов JSON, JS, MJS и TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Пример конфигурационного файла

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Пример конфигурационного файла Intlayer со всеми доступными параметрами.
 */
const config: IntlayerConfig = {
  /**
   * Конфигурация настроек интернационализации.
   */
  internationalization: {
    /**
     * Список локалей (locales), поддерживаемых в приложении.
     * По умолчанию: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Список обязательных локалей, которые должны быть определены в каждом словаре.
     * Если пуст, все локали обязательны в режиме `strict`.
     * По умолчанию: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Уровень строгости для интернационализированного контента.
     * - "strict": Ошибка, если любая объявленная локаль отсутствует или не объявлена.
     * - "inclusive": Предупреждение, если объявленная локаль отсутствует.
     * - "loose": Принимает любую существующую локаль.
     * По умолчанию: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Локаль по умолчанию, используемая в качестве резервной, если запрошенная локаль не найдена.
     * По умолчанию: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Настройки, управляющие операциями со словарями и поведением при отсутствии перевода.
   */
  dictionary: {
    /**
     * Управляет способом импорта словарей.
     * - "static": Статически импортируется во время сборки.
     * - "dynamic": Динамически импортируется с использованием Suspense.
     * - "fetch": Динамически извлекается через Live Sync API.
     * По умолчанию: "static"
     */
    importMode: "static",

    /**
     * Стратегия автоматического заполнения отсутствующих переводов с помощью AI.
     * Может быть логическим значением или шаблоном пути для сохранения заполненного контента.
     * По умолчанию: true
     */
    fill: true,

    /**
     * Физическое расположение файлов словарей.
     * - "local": Хранится в локальной файловой системе.
     * - "remote": Хранится в Intlayer CMS.
     * - "hybrid": Хранится как локально, так и в Intlayer CMS.
     * - "plugin" (или любая пользовательская строка): Предоставляется плагином или пользовательским источником.
     * По умолчанию: "local"
     */
    location: "local",

    /**
     * Должен ли контент автоматически преобразовываться (например, Markdown в HTML).
     * По умолчанию: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Конфигурация маршрутизации и промежуточного ПО.
   */
  routing: {
    /**
     * Стратегия маршрутизации локалей.
     * - "prefix-no-default": Добавляет префикс ко всем локалям, кроме локали по умолчанию (например, /dashboard, /fr/dashboard).
     * - "prefix-all": Добавляет префикс ко всем локалям (например, /en/dashboard, /fr/dashboard).
     * - "no-prefix": Локаль в URL отсутствует.
     * - "search-params": Использует ?locale=...
     * По умолчанию: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Где хранить выбранную пользователем локаль.
     * Параметры: 'cookie', 'localStorage', 'sessionStorage', 'header' или их массив.
     * По умолчанию: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Базовый путь для URL приложения.
     * По умолчанию: ""
     */
    basePath: "",

    /**
     * Пользовательские правила перезаписи (rewrite) URL для конкретных путей в зависимости от локали.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Настройки, касающиеся поиска и обработки файлов контента.
   */
  content: {
    /**
     * Расширения файлов для сканирования словарей.
     * По умолчанию: ['.content.ts', '.content.js', '.content.json' и др.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Каталоги, в которых расположены файлы .content.
     * По умолчанию: ["."]
     */
    contentDir: ["src"],

    /**
     * Где находится исходный код.
     * Используется для оптимизации сборки и преобразования кода.
     * По умолчанию: ["."]
     */
    codeDir: ["src"],

    /**
     * Паттерны, исключаемые из сканирования.
     * По умолчанию: ['node_modules', '.intlayer' и др.]
     */
    excludedPath: ["node_modules"],

    /**
     * Отслеживать ли изменения и пересобирать словари во время разработки.
     * По умолчанию: true в режиме разработки
     */
    watch: true,

    /**
     * Команда, используемая для форматирования вновь созданных / обновленных файлов .content.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Конфигурация визуального редактора (Visual Editor).
   */
  editor: {
    /**
     * Включен ли визуальный редактор.
     * По умолчанию: false
     */
    enabled: true,

    /**
     * URL вашего приложения для проверки источника (origin validation).
     * По умолчанию: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Порт для локального сервера редактора.
     * По умолчанию: 8000
     */
    port: 8000,

    /**
     * Публичный URL для редактора.
     * По умолчанию: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL Intlayer CMS.
     * По умолчанию: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL Backend API.
     * По умолчанию: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Включить ли синхронизацию контента в реальном времени.
     * По умолчанию: false
     */
    liveSync: true,
  },

  /**
   * Настройки перевода и создания контента на базе AI.
   */
  ai: {
    /**
     * Провайдер AI для использования.
     * Параметры: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * По умолчанию: 'openai'
     */
    provider: "openai",

    /**
     * Модель выбранного провайдера для использования.
     */
    model: "gpt-4o",

    /**
     * API-ключ провайдера.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Глобальный контекст для руководства AI при создании переводов.
     */
    applicationContext: "Это приложение для бронирования путешествий.",

    /**
     * Базовый URL для AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Сериализация данных (Data Serialization)
     *
     * Параметры:
     * - "json": По умолчанию, надежно; потребляет больше токенов.
     * - "toon": Потребляет меньше токенов, может быть не таким последовательным, как JSON.
     *
     * По умолчанию: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Настройки сборки и оптимизации.
   */
  build: {
    /**
     * Режим выполнения сборки.
     * - "auto": Собирается автоматически во время сборки приложения.
     * - "manual": Требуется явная команда сборки.
     * По умолчанию: "auto"
     */
    mode: "auto",

    /**
     * Оптимизировать ли финальный бандл, удаляя неиспользуемые словари.
     * По умолчанию: true в продакшене
     */
    optimize: true,

    /**
     * Формат вывода сгенерированных файлов словарей.
     * По умолчанию: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Указывает, должна ли сборка проверять типы TypeScript.
     * По умолчанию: false
     */
    checkTypes: false,
  },

  /**
   * Конфигурация логгера (Logger).
   */
  log: {
    /**
     * Уровень логирования.
     * - "default": Стандартное логирование.
     * - "verbose": Углубленное отладочное логирование.
     * - "disabled": Отключает логирование.
     * По умолчанию: "default"
     */
    mode: "default",

    /**
     * Префикс для всех лог-сообщений.
     * По умолчанию: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Системная конфигурация (Для продвинутого использования)
   */
  system: {
    /**
     * Каталог для хранения локализованных словарей.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Каталог для расширения модулей TypeScript (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Каталог для хранения несложенных (unmerged) словарей.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Каталог для хранения типов словарей.
     */
    typesDir: ".intlayer/types",

    /**
     * Каталог, в котором хранятся основные файлы приложения.
     */
    mainDir: ".intlayer/main",

    /**
     * Каталог, в котором хранятся файлы конфигурации.
     */
    configDir: ".intlayer/config",

    /**
     * Каталог, в котором хранятся файлы кэша.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Конфигурация компилятора (Для продвинутого использования)
   */
  compiler: {
    /**
     * Указывает, должен ли быть включен компилятор.
     *
     * - false: Отключает компилятор.
     * - true: Включает компилятор.
     * - "build-only": Пропускает компилятор во время разработки и ускоряет время запуска.
     *
     * По умолчанию: false
     */
    enabled: true,

    /**
     * Определяет путь для выходных файлов. Заменяет `outputDir`.
     *
     * - Пути `./` разрешаются относительно каталога компонента.
     * - Пути `/` разрешаются относительно корня проекта (`baseDir`).
     *
     * - Включение переменной `{{locale}}` в путь приведет к созданию отдельных словарей для каждого языка.
     *
     * Пример:
     * ```ts
     * {
     *   // Создавать многоязычные файлы .content.ts рядом с компонентом
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Эквивалентно через шаблонную строку
     * }
     * ```
     *
     * ```ts
     * {
     *   // Создавать централизованные JSON для каждого языка в корне проекта
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Эквивалентно через шаблонную строку
     * }
     * ```
     *
     * Список переменных:
     *   - `fileName`: Имя файла.
     *   - `key`: Ключ контента.
     *   - `locale`: Локаль контента.
     *   - `extension`: Расширение файла.
     *   - `componentFileName`: Имя файла компонента.
     *   - `componentExtension`: Расширение файла компонента.
     *   - `format`: Формат словаря.
     *   - `componentFormat`: Формат словаря компонента.
     *   - `componentDirPath`: Путь к каталогу компонента.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Указывает, должны ли компоненты сохраняться после преобразования.
     * Таким образом, компилятор можно запустить только один раз для преобразования приложения, а затем удалить.
     */
    saveComponents: false,

    /**
     * Вставляет в сгенерированный файл только контент. Полезно для вывода JSON для каждого языка для i18next или ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "", // Добавьте необязательный префикс к извлеченным ключам словарей
  },

  /**
   * Пользовательские схемы (Schemas) для валидации контента словарей.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Конфигурация плагинов (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## Справочник по конфигурации (Configuration Reference)

В следующих разделах описываются различные параметры конфигурации, доступные в Intlayer.

---

### Конфигурация интернационализации (Internationalization Configuration)

Определяет настройки, связанные с интернационализацией, включая доступные локали и локаль по умолчанию для приложения.

| Поле              | Тип        | Описание                                                                                                                    | Пример               | Примечание                                                                                                                                                                                                                                                                                              |
| ----------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Список локалей, поддерживаемых в приложении. По умолчанию: `[Locales.ENGLISH]`                                              | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                         |
| `requiredLocales` | `string[]` | Список обязательных локалей в приложении. По умолчанию: `[]`                                                                | `[]`                 | Если пуст, все локали обязательны в режиме `strict`. Убедитесь, что обязательные локали также определены в поле `locales`.                                                                                                                                                                              |
| `strictMode`      | `string`   | Гарантирует надежную реализацию интернационализированного контента с использованием TypeScript. По умолчанию: `inclusive`   |                      | Если `"strict"`: функция `t` требует определения каждой объявленной локали — выдает ошибку, если какая-либо локаль отсутствует или не объявлена. Если `"inclusive"`: предупреждает о недостающих локалях, но принимает существующие необъявленные. Если `"loose"`: принимает любую существующую локаль. |
| `defaultLocale`   | `string`   | Локаль по умолчанию, используемая в качестве резервной, если запрошенная локаль не найдена. По умолчанию: `Locales.ENGLISH` | `'en'`               | Используется для определения локали, когда она не указана в URL, куки или заголовке.                                                                                                                                                                                                                    |

---

### Конфигурация редактора (Editor Configuration)

Определяет настройки, связанные с интегрированным редактором, включая порт сервера и статус активности.

| Поле                         | Тип                       | Описание                                                                                                                                                                                                               | Пример                                                                                | Примечание                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | URL вашего приложения. По умолчанию: `''`                                                                                                                                                                              | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Используется для ограничения источников (origin) редактора из соображений безопасности. Если установлено значение `'*'`, редактор доступен из любого источника.                                                                                 |
| `port`                       | `number`                  | Порт, используемый сервером визуального редактора. По умолчанию: `8000`                                                                                                                                                |                                                                                       |                                                                                                                                                                                                                                                 |
| `editorURL`                  | `string`                  | URL сервера редактора. По умолчанию: `'http://localhost:8000'`                                                                                                                                                         | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Используется для ограничения источников, которые могут взаимодействовать с приложением. Если установлено значение `'*'`, доступно из любого источника. Должно быть установлено при изменении порта или если редактор размещен на другом домене. |
| `cmsURL`                     | `string`                  | URL Intlayer CMS. По умолчанию: `'https://intlayer.org'`                                                                                                                                                               | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                                 |
| `backendURL`                 | `string`                  | URL бэкенд-сервера. По умолчанию: `https://back.intlayer.org`                                                                                                                                                          | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                                 |
| `enabled`                    | `boolean`                 | Указывает, будет ли приложение взаимодействовать с визуальным редактором. По умолчанию: `true`                                                                                                                         | `process.env.NODE_ENV !== 'production'`                                               | Если `false`, редактор не может взаимодействовать с приложением. Отключение для определенных сред повышает безопасность.                                                                                                                        |
| `clientId`                   | `string &#124; undefined` | Позволяет пакетам intlayer проходить аутентификацию на бэкенде с использованием oAuth2. Чтобы получить токен доступа, перейдите на [intlayer.org/project](https://app.intlayer.org/project). По умолчанию: `undefined` |                                                                                       | Держите в секрете; сохраняйте в переменных среды.                                                                                                                                                                                               |
| `clientSecret`               | `string &#124; undefined` | Позволяет пакетам intlayer проходить аутентификацию на бэкенде с использованием oAuth2. Чтобы получить токен доступа, перейдите на [intlayer.org/project](https://app.intlayer.org/project). По умолчанию: `undefined` |                                                                                       | Держите в секрете; сохраняйте в переменных среды.                                                                                                                                                                                               |
| `dictionaryPriorityStrategy` | `string`                  | Стратегия определения приоритетов словарей при наличии локальных и удаленных словарей. По умолчанию: `'local_first'`                                                                                                   | `'distant_first'`                                                                     | `'distant_first'`: отдает приоритет удаленным словарям перед локальными. `'local_first'`: отдает приоритет локальным словарям перед удаленными.                                                                                                 |
| `liveSync`                   | `boolean`                 | Указывает, должен ли сервер приложений выполнять горячую перезагрузку контента при обнаружении изменений в CMS / визуальном редакторе / бэкенде. По умолчанию: `true`                                                  | `true`                                                                                | При добавлении/обновлении словаря приложение обновляет контент страницы. Live sync передает контент на другой сервер, что может незначительно повлиять на производительность. Рекомендуется размещать оба на одной машине.                      |
| `liveSyncPort`               | `number`                  | Порт сервера Live Sync. По умолчанию: `4000`                                                                                                                                                                           | `4000`                                                                                |                                                                                                                                                                                                                                                 |
| `liveSyncURL`                | `string`                  | URL сервера Live Sync. По умолчанию: `'http://localhost:{liveSyncPort}'`                                                                                                                                               | `'https://example.com'`                                                               | По умолчанию указывает на localhost; может быть изменен на удаленный сервер Live Sync.                                                                                                                                                          |

### Конфигурация маршрутизации (Routing Configuration)

Настройки, управляющие поведением маршрутизации, включая структуру URL, хранение локалей и обработку промежуточного ПО.

| Поле       | Тип                                                                                                                                                  | Описание                                                                                                                                                                                  | Пример                                                                                                                                                                                                | Примечание                                                                                                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Режим маршрутизации URL для обработки локалей. По умолчанию: `'prefix-no-default'`                                                                                                        | `'prefix-no-default'`: `/dashboard` (en) или `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: локаль обрабатывается другими способами. `'search-params'`: `/dashboard?locale=fr` | Не влияет на управление куки или хранилищем локалей.                                                                                                                                                                                                                        |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Конфигурация для хранения локали на клиенте. По умолчанию: `['cookie', 'header']`                                                                                                         | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                         | См. таблицу "Параметры хранения" ниже.                                                                                                                                                                                                                                      |
| `basePath` | `string`                                                                                                                                             | Базовый путь для URL приложения. По умолчанию: `''`                                                                                                                                       | `'/my-app'`                                                                                                                                                                                           | Если приложение находится по адресу `https://example.com/my-app`, basePath равен `'/my-app'`, а URL становятся `https://example.com/my-app/en`.                                                                                                                             |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Пользовательские правила перезаписи URL, переопределяющие режим маршрутизации по умолчанию для конкретных путей. Поддерживает динамические параметры `[param]`. По умолчанию: `undefined` | См. пример ниже                                                                                                                                                                                       | Правила перезаписи имеют приоритет над `mode`. Работает с Next.js и Vite. `getLocalizedUrl()` автоматически применяет соответствующие правила. См. [Пользовательские перезаписи URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/custom_url_rewrites.md). |

**Пример `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Стратегия по умолчанию
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Параметры хранения (Storage Options)

| Значение           | Описание                                                                          | Примечание                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Хранит локаль в куки — доступно как на стороне клиента, так и на стороне сервера. | Для соответствия GDPR убедитесь в получении надлежащего согласия пользователя. Настраивается через `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Хранит локаль в браузере без срока действия — только на стороне клиента.          | Не исчезает до явной очистки. Прокси Intlayer не может получить к нему доступ. Настраивается через `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                          |
| `'sessionStorage'` | Хранит локаль в течение сессии страницы — только на стороне клиента.              | Очищается при закрытии вкладки/окна. Прокси Intlayer не может получить к нему доступ. Настраивается через `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                 |
| `'header'`         | Хранит или передает локаль через HTTP-заголовки — только на стороне сервера.      | Полезно для API-вызовов. Сторона клиента не может получить к нему доступ. Настраивается через `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                     |

#### Атрибуты куки (Cookie Attributes)

При использовании хранилища куки вы можете настроить дополнительные атрибуты:

| Поле       | Тип                                   | Описание                                                      |
| ---------- | ------------------------------------- | ------------------------------------------------------------- |
| `name`     | `string`                              | Имя куки. По умолчанию: `'INTLAYER_LOCALE'`                   |
| `domain`   | `string`                              | Домен куки. По умолчанию: `undefined`                         |
| `path`     | `string`                              | Путь куки. По умолчанию: `undefined`                          |
| `secure`   | `boolean`                             | Требует HTTPS. По умолчанию: `undefined`                      |
| `httpOnly` | `boolean`                             | Флаг HTTP-only. По умолчанию: `undefined`                     |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Политика SameSite.                                            |
| `expires`  | `Date &#124; number`                  | Дата истечения или количество дней. По умолчанию: `undefined` |

#### Атрибуты хранилища локалей (Locale Storage Attributes)

При использовании localStorage или sessionStorage:

| Поле   | Тип                                      | Описание                                               |
| ------ | ---------------------------------------- | ------------------------------------------------------ |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Тип хранилища.                                         |
| `name` | `string`                                 | Имя ключа хранилища. По умолчанию: `'INTLAYER_LOCALE'` |

#### Примеры конфигурации

Вот несколько распространенных примеров конфигурации для новой структуры маршрутизации v7:

**Базовая конфигурация (по умолчанию)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Конфигурация, соответствующая GDPR**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Режим параметров поиска (Search Parameters Mode)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Режим без префикса (No Prefix Mode) с пользовательским хранилищем**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Пользовательская перезапись URL с динамическими путями**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Резервная стратегия для путей без перезаписи
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Конфигурация контента (Content Configuration)

Настройки обработки контента в приложении (имена каталогов, расширения файлов и производные конфигурации).

| Поле             | Тип        | Описание                                                                                                                                                                                                         | Пример                              | Примечание                                                                                                                           |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `watch`          | `boolean`  | Указывает, должен ли Intlayer следить за изменениями в файлах объявления контента для пересборки словарей. По умолчанию: `process.env.NODE_ENV === 'development'`                                                |                                     |                                                                                                                                      |
| `fileExtensions` | `string[]` | Расширения файлов, используемые для сканирования файлов объявления контента. По умолчанию: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                      |
| `contentDir`     | `string[]` | Пути к каталогам, где расположены файлы объявления контента. По умолчанию: `['.']`                                                                                                                               | `['src/content']`                   |                                                                                                                                      |
| `codeDir`        | `string[]` | Пути к каталогам, где находятся файлы исходного кода вашего приложения. По умолчанию: `['.']`                                                                                                                    | `['src']`                           | Используется для оптимизации сборки и обеспечения применения преобразования кода и горячей перезагрузки только к необходимым файлам. |
| `excludedPath`   | `string[]` | Пути, исключаемые из сканирования контента. По умолчанию: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                              | `['src/styles']`                    |                                                                                                                                      |
| `formatCommand`  | `string`   | Команда, которая будет запущена для форматирования вновь созданных или обновленных файлов контента. По умолчанию: `undefined`                                                                                    | `'npx prettier --write "{{file}}"'` | Используется при извлечении контента или через визуальный редактор.                                                                  |

---

### Конфигурация словаря (Dictionary Configuration)

Настройки, управляющие способом импорта словарей и управлением ими.

| Поле                        | Тип                                                     | Описание                                                                                                                  | Пример                                                                                                                          | Примечание                                                                                         |
| --------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`              | Режим импорта словарей. По умолчанию: `'static'`                                                                          | `'static'`: словари импортируются при сборке. `'dynamic'`: загружаются по требованию. `'fetch'`: извлекаются из удаленного API. | См. режим импорта ниже.                                                                            |
| `fill`                      | `boolean &#124; DictionaryFill`                         | Заполнять ли отсутствующие переводы автоматически с помощью AI. По умолчанию: `true` в режиме разработки                  | `true`                                                                                                                          | Помогает идентифицировать отсутствующие переводы. Можно настроить сохранение результатов локально. |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string` | Где хранятся словари. По умолчанию: `'local'`                                                                             | `'remote'`                                                                                                                      | `'local'`: файловая система. `'remote'`: Intlayer CMS. `'hybrid'`: и то, и другое.                 |
| `contentAutoTransformation` | `boolean`                                               | Указывает, должны ли файлы контента автоматически преобразовываться (например, из Markdown в HTML). По умолчанию: `false` | `true`                                                                                                                          | Полезно для обработки Markdown полей через @intlayer/markdown.                                     |

#### Режим импорта (Import Modes)

| Значение    | Описание                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'static'`  | Словари включаются в бандл во время сборки. Лучшая производительность, но больший размер файлов при наличии множества языков.                           |
| `'dynamic'` | Словари загружаются асинхронно при доступе к определенному языку. Использует React Suspense. Рекомендуется для приложений с большим количеством языков. |
| `'fetch'`   | Словари извлекаются динамически во время выполнения (runtime) с сервера (например, Intlayer CMS). Позволяет обновлять контент без пересборки.           |

---

### Конфигурация словарей (Dictionary Configuration)

Настройки, управляющие операциями со словарями, включая поведение автозаполнения и генерацию контента.

Эта конфигурация словарей служит двум основным целям:

1. **Значения по умолчанию**: Определение значений по умолчанию при создании файлов объявления контента.
2. **Поведение при отсутствии перевода**: Предоставление резервных значений, когда конкретные поля не определены, что позволяет глобально настраивать поведение операций со словарями.

Для получения дополнительной информации о файлах объявления контента и о том, как применяются значения конфигурации, см. [Документацию по файлам контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

| Поле                        | Тип                                                                                             | Описание                                                                                                    | Пример          | Примечание                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Управляет тем, как генерируются выходные файлы автозаполнения (AI-перевод). По умолчанию: `true`            | См. пример ниже | `true`: путь по умолчанию (тот же файл, что и источник). `false`: отключено. Шаблон строки/функции генерирует файлы для каждой локали. Объект по локалям: каждая локаль сопоставляется со своим шаблоном; `false` пропускает эту локаль. Включение `{{locale}}` запускает генерацию для каждой локали. `fill` на уровне словаря всегда имеет приоритет над этой глобальной конфигурацией. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Управляет способом импорта словарей. По умолчанию: `'static'`                                               | `'dynamic'`     | `'static'`: импортируется статически. `'dynamic'`: импортируется динамически через Suspense. `'fetch'`: динамически запрашивается через API Live Sync. Не влияет на `getIntlayer`, `getDictionary`, `useDictionary` и др.                                                                                                                                                                 |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Определяет, где хранятся словари. По умолчанию: `'local'`                                                   | `'remote'`      | `'local'`: файловая система. `'remote'`: Intlayer CMS. `'hybrid'`: и то, и другое.                                                                                                                                                                                                                                                                                                        |
| `contentAutoTransformation` | `boolean`                                                                                       | Должны ли файлы контента автоматически преобразовываться (например, Markdown в HTML). По умолчанию: `false` | `true`          | Полезно для обработки полей Markdown через @intlayer/markdown.                                                                                                                                                                                                                                                                                                                            |

**Пример `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Конфигурация AI (AI Configuration)

Определяет настройки для функций Intlayer на базе AI, таких как создание переводов.

| Поле                 | Тип                    | Описание                                                                       | Пример                                      | Примечание                                                                                            |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Провайдер AI для использования.                                                | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                                       |
| `model`              | `string`               | Модель AI для использования.                                                   | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                                       |
| `apiKey`             | `string`               | API-ключ для выбранного провайдера.                                            | `process.env.OPENAI_API_KEY`                |                                                                                                       |
| `applicationContext` | `string`               | Дополнительный контекст о вашем приложении для повышения точности перевода AI. | `'Обучающая платформа для детей.'`          |                                                                                                       |
| `baseURL`            | `string`               | Необязательный базовый URL для API-вызовов.                                    |                                             | Полезно, если вы используете прокси или локальное развертывание AI.                                   |
| `dataSerialization`  | `'json' &#124; 'toon'` | Определяет способ отправки данных в AI. По умолчанию: `'json'`                 | `'json'`                                    | `'json'`: более надежно и точно. `'toon'`: потребляет меньше токенов, но может быть менее стабильным. |

---

### Конфигурация сборки (Build Configuration)

Настройки процесса сборки и оптимизации Intlayer.

| Поле           | Тип                      | Описание                                                                                                                         | Пример | Примечание |
| -------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------- |
| `mode`         | `'auto' &#124; 'manual'` | Указывает, должен ли Intlayer запускаться автоматически во время шагов предварительной сборки приложения. По умолчанию: `'auto'` |        |            |
| `optimize`     | `boolean`                | Указывает, должны ли скомпилированные словари быть оптимизированы для рантайма. По умолчанию: `true` в продакшене                |        |            |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Формат вывода сгенерированных файлов словарей. По умолчанию: `['cjs', 'esm']`                                                    |        |            |
| `checkTypes`   | `boolean`                | Указывает, должен ли Intlayer проверять типы в сгенерированных файлах. По умолчанию: `false`                                     |        |            |

---

### Системная конфигурация (System Configuration)

Эти настройки предназначены для продвинутых вариантов использования и внутренней конфигурации Intlayer.

| Поле                      | Тип      | Описание                                          | По умолчанию                      |
| ------------------------- | -------- | ------------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Каталог скомпилированных словарей.                | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Каталог расширения модулей TypeScript.            | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Каталог несложенных словарей.                     | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Каталог сгенерированных типов.                    | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Каталог основных файлов Intlayer.                 | `'.intlayer/main'`                |
| `configDir`               | `string` | Каталог скомпилированных конфигурационных файлов. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Каталог файлов кэша.                              | `'.intlayer/cache'`               |

---

### Конфигурация компилятора (Compiler Configuration)

Настройки компилятора Intlayer (`intlayer compiler`).

| Поле                  | Тип                      | Описание                                                                         | По умолчанию |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------- | ------------ |
| `enabled`             | `boolean`                | Указывает, активен ли компилятор.                                                | `false`      |
| `output`              | `string &#124; Function` | Путь вывода для извлеченных словарей.                                            |              |
| `saveComponents`      | `boolean`                | Указывает, должны ли исходные файлы быть перезаписаны преобразованными версиями. | `false`      |
| `noMetadata`          | `boolean`                | Если `true`, компилятор не будет включать метаданные в сгенерированные файлы.    | `false`      |
| `dictionaryKeyPrefix` | `string`                 | Необязательный префикс ключа словаря.                                            | `''`         |

---

### Конфигурация логгера (Logger Configuration)

Настройки настройки лог-вывода Intlayer.

| Поле     | Тип                                            | Описание                   | По умолчанию   |
| -------- | ---------------------------------------------- | -------------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Режим логирования.         | `'default'`    |
| `prefix` | `string`                                       | Префикс для лог-сообщений. | `'[intlayer]'` |

---

### Пользовательские схемы (Custom Schemas)

| Поле      | Тип                         | Описание                                                               |
| --------- | --------------------------- | ---------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Позволяет определять схемы Zod для валидации структуры ваших словарей. |

---

### Плагины (Plugins)

| Поле      | Тип                | Описание                                |
| --------- | ------------------ | --------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Список плагинов Intlayer для активации. |
