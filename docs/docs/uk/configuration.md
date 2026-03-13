---
createdAt: 2024-08-13
updatedAt: 2026-03-12
title: Конфігурація
description: Дізнайтеся, як налаштувати Intlayer для вашого застосунку. Зрозумійте різні параметри та опції, доступні для налаштування Intlayer відповідно до ваших потреб.
keywords:
  - Конфігурація
  - Налаштування
  - Кастомізація
  - Intlayer
  - Опції
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.3.0
    date: 2026-03-11
    changes: Перемістити 'baseDir' з конфігурації 'content' до конфігурації 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Оновлення опцій компілятора, додавання підтримки 'output' та 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Оновлення опцій компілятора
  - version: 8.0.6
    date: 2026-02-12
    changes: Додано підтримку провайдерів Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face та Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Додано `dataSerialization` до конфігурації AI
  - version: 8.0.0
    date: 2026-01-22
    changes: Перемістити конфігурацію збірки importMode до конфігурації словника.
  - version: 8.0.0
    date: 2026-01-18
    changes: Розділити конфігурацію системи від конфігурації контенту. Перемістити внутрішні шляхи до властивості `system`. Додати `codeDir` для розділення файлів контенту та перетворення коду.
  - version: 8.0.0
    date: 2026-01-18
    changes: Додано опції словника `location` та `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Додано підтримку форматів файлів JSON5 та JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Додано опцію `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Додано конфігурацію `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Замінено `middleware` на конфігурацію `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Додано опцію `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Оновлено опцію `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Додано опцію `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Вилучено поле `dictionaryOutput` та поле `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Додано режим імпорту `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Замінено поле `hotReload` на `liveSync` та додано поля `liveSyncPort` і `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Замінено `activateDynamicImport` опцією `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Змінено значення за замовчуванням для contentDir з `['src']` на `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Додано команди `docs`
---

# Документація конфігурації Intlayer

## Огляд

Файли конфігурації Intlayer дозволяють налаштовувати різні аспекти плагіна, такі як інтернаціоналізація, middleware та обробка контенту. У цьому документі наведено детальний опис кожної властивості конфігурації.

---

## Зміст

<TOC/>

---

## Підтримувані формати файлів конфігурації

Intlayer підтримує формати файлів конфігурації JSON, JS, MJS та TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Приклад файлу конфігурації

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Example Intlayer configuration file showing all available options.
 */
const config: IntlayerConfig = {
  /**
   * Configuration for internationalization settings.
   */
  internationalization: {
    /**
     * List of supported locales in the application.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * List of required locales that must be defined in every dictionary.
     * If empty, all locales are required in `strict` mode.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Strictness level for internationalized content.
     * - "strict": Errors if any declared locale is missing or undeclared.
     * - "inclusive": Warnings if a declared locale is missing.
     * - "loose": Accepts any existing locale.
     * Default: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Default locale used as a fallback if the requested locale is not found.
     * Default: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Settings that control dictionary operations and fallback behavior.
   */
  dictionary: {
    /**
     * Controls how dictionaries are imported.
     * - "static": Statically imported at build time.
     * - "dynamic": Dynamically imported using Suspense.
     * - "fetch": Fetched dynamically via the live sync API.
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategy for auto-filling missing translations using AI.
     * Can be a boolean or a path pattern to store filled content.
     * Default: true
     */
    fill: true,

    /**
     * Physical location of the dictionary files.
     * - "local": Stored in the local filesystem.
     * - "remote": Stored in the Intlayer CMS.
     * - "hybrid": Stored in the local filesystem and the Intlayer CMS.
     * - "plugin" (or any custom string): Provided by a plugin or a custom source.
     * Default: "local"
     */
    location: "local",

    /**
     * Whether to automatically transform content (e.g., Markdown to HTML).
     * Default: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Routing and middleware configuration.
   */
  routing: {
    /**
     * Locale routing strategy.
     * - "prefix-no-default": Prefix all except the default locale (e.g., /dashboard, /fr/dashboard).
     * - "prefix-all": Prefix all locales (e.g., /en/dashboard, /fr/dashboard).
     * - "no-prefix": No locale in the URL.
     * - "search-params": Use ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Where to store the user's selected locale.
     * Options: 'cookie', 'localStorage', 'sessionStorage', 'header', or an array of these.
     * Default: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Base path for the application URLs.
     * Default: ""
     */
    basePath: "",

    /**
     * Custom URL rewriting rules for locale-specific paths.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Settings for finding and processing content files.
   */
  content: {
    /**
     * File extensions to scan for dictionaries.
     * Default: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directories where .content files are located.
     * Default: ["."]
     */
    contentDir: ["src"],

    /**
     * Directories where source code is located.
     * Used for build optimization and code transformation.
     * Default: ["."]
     */
    codeDir: ["src"],

    /**
     * Patterns to exclude from scanning.
     * Default: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Whether to watch for changes and rebuild dictionaries in development.
     * Default: true in development
     */
    watch: true,

    /**
     * Command to format newly created / updated .content files.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Visual Editor configuration.
   */
  editor: {
    /**
     * Whether the visual editor is enabled.
     * Default: false
     */
    enabled: true,

    /**
     * URL of your application for origin validation.
     * Default: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port for the local editor server.
     * Default: 8000
     */
    port: 8000,

    /**
     * Public URL for the editor.
     * Default: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * Default: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Backend API URL.
     * Default: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Whether to enable real-time content synchronization.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * AI-powered translation and generation settings.
   */
  ai: {
    /**
     * AI provider to use.
     * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model to use from the selected provider.
     */
    model: "gpt-4o",

    /**
     * Provider API key.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Global context to guide the AI in generating translations.
     */
    applicationContext: "This is a travel booking application.",

    /**
     * Base URL for the AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Серіалізація даних
     *
     * Опції:
     * - "json": Стандартний, надійний; використовує більше токенів.
     * - "toon": Менше токенів, менш послідовний, ніж JSON.
     *
     * За замовчуванням: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Build and optimization settings.
   */
  build: {
    /**
     * Build execution mode.
     * - "auto": Automatic build during app build.
     * - "manual": Requires explicit build command.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Whether to optimize the final bundle by pruning unused dictionaries.
     * Default: true in production
     */
    optimize: true,

    /**
     * Output format for generated dictionary files.
     * Default: ['esm', 'cjs']
     */
    outputFormat: ["esm"],

    /**
     * Indicates if the build should check TypeScript types.
     * Default: false
     */
    checkTypes: false,
  },

  /**
   * Logger configuration.
   */
  log: {
    /**
     * Logging level.
     * - "default": Standard logging.
     * - "verbose": Detailed debug logging.
     * - "disabled": No logging.
     * Default: "default"
     */
    mode: "default",

    /**
     * Prefix for all log messages.
     * Default: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * System configuration (Advanced use cases)
   */
  system: {
    /**
     * Directory for storing localization dictionaries.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory for module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directory for storing unmerged dictionaries.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directory for storing dictionary types.
     */
    typesDir: ".intlayer/types",

    /**
     * Directory where main application files are stored.
     */
    mainDir: ".intlayer/main",

    /**
     * Directory where the configuration files are stored.
     */
    configDir: ".intlayer/config",

    /**
     * Directory where the cache files are stored.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compiler configuration (Advanced use cases)
   */
  compiler: {
    /**
     * Вказує, чи має бути увімкнено компілятор.
     *
     * - false : Вимкнути компілятор.
     * - true : Увімкнути компілятор.
     * - "build-only" : Пропустити компілятор під час розробки для прискорення запуску.
     *
     * Значення за замовчуванням : false
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів. Замінює `outputDir`.
     *
     * - Шляхи, що починаються з `./`, розв'язуються відносно каталогу компонента.
     * - Шляхи, що починаються з `/`, розв'язуються відносно кореня проєкту (`baseDir`).
     *
     * - Включення змінної `{{locale}}` у шлях дозволить генерувати словники, розділені за локалями.
     *
     * Приклади:
     * ```ts
     * {
     *   // Створює багатомовні файли .content.ts поруч із компонентом
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Еквівалент з використанням рядкового шаблону
     * }
     * ```
     *
     * ```ts
     * {
     *   // Створює централізовані JSON-файли за локалями в корені проєкту
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Еквівалент з використанням рядкового шаблону
     * }
     * ```
     *
     * Список змінних:
     *   - `fileName`: Назва файлу.
     *   - `key`: Ключ контенту.
     *   - `locale`: Локаль контенту.
     *   - `extension`: Розширення файлу.
     *   - `componentFileName`: Назва файлу компонента.
     *   - `componentExtension`: Розширення файлу компонента.
     *   - `format`: Формат словника.
     *   - `componentFormat`: Формат словника компонента.
     *   - `componentDirPath`: Шлях до каталогу компонента.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Вказує, чи мають компоненти зберігатися після трансформації.
     * Таким чином компілятор можна запустити лише один раз для трансформації додатка, а потім видалити.
     */
    saveComponents: false,

    /**
     * Вставляти лише вміст у згенерований файл. Корисно для JSON-виводів i18next або ICU MessageFormat для кожної локалі.
     */
    noMetadata: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "", // Додайте необов'язковий префікс для витягнутих ключів словника
  },

  /**
   * Custom schemas to validate the dictionaries content.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Plugins configuration.
   */
  plugins: [],
};

export default config;
````

## Довідник конфігурації

Нижченаведені розділи описують різні параметри конфігурації, доступні в Intlayer.

---

### Налаштування інтернаціоналізації

Визначає параметри, пов'язані з інтернаціоналізацією, включно з доступними локалями та локаллю за замовчуванням для застосунку.

#### Властивості

- **locales**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['en']`
  - _Опис_: Список локалей, які підтримуються в застосунку.
  - _Приклад_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `[]`
  - _Опис_: Перелік обов'язкових локалей у застосунку.
  - _Приклад_: `[]`
  - _Примітка_: Якщо порожній, усі локалі є обов'язковими в режимі `strict`.
  - _Примітка_: Переконайтеся, що обов'язкові локалі також визначені в полі `locales`.
- **strictMode**:
  - _Тип_: `string`
  - _Типово_: `inclusive`
  - _Опис_: Забезпечує суворі реалізації інтернаціоналізованого контенту з використанням TypeScript.
  - _Примітка_: Якщо встановлено "strict", функція перекладу `t` вимагатиме, щоб кожна оголошена локаль була визначена. Якщо якась локаль відсутня або не зазначена в конфігурації, буде викинута помилка.
  - _Примітка_: Якщо встановлено "inclusive", функція перекладу `t` вимагатиме, щоб кожна оголошена locale була визначена. Якщо одна locale відсутня, буде виведено попередження. Проте функція прийме locale, яка не оголошена у вашій конфігурації, але існує.
  - _Примітка_: Якщо встановлено "loose", функція перекладу `t` прийматиме будь-яку наявну locale.

- **defaultLocale**:
  - _Тип_: `string`
  - _Типово_: `'en'`
  - _Опис_: Локаль за замовчуванням, яка використовується як fallback, якщо запитувана локаль не знайдена.
  - _Приклад_: `'en'`
  - _Примітка_: Використовується для визначення локалі, коли вона не вказана в URL, cookie або заголовку.

---

### Editor Configuration

Визначає налаштування, пов'язані з інтегрованим редактором, включно з портом сервера та статусом активності.

#### Properties

- **applicationURL**:
  - _Тип_: `string`
  - _За замовчуванням_: `http://localhost:3000`
  - _Опис_: URL додатка. Використовується для обмеження origin редактора з міркувань безпеки.
  - _Приклад_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Примітка_: URL додатка. Використовується для обмеження origin редактора з міркувань безпеки. Якщо встановлено в `'*'`, редактор доступний з будь-якого origin.

- **port**:
  - _Тип_: `number`
  - _За замовчуванням_: `8000`
  - _Опис_: Порт, який використовується сервером візуального редактора.

- **editorURL**:
  - _Тип_: `string`
  - _За замовчуванням_: `'http://localhost:8000'`
  - _Опис_: URL сервера редактора. Використовується для обмеження origin редактора з міркувань безпеки.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Примітка_: URL сервера редактора, до якого звертається додаток. Використовується для обмеження origins, які можуть взаємодіяти з додатком з міркувань безпеки. Якщо встановлено `'*'`, редактор доступний з будь-якого origin. Має бути вказаний, якщо змінено порт або якщо редактор розміщено на іншому домені.

- **cmsURL**:
  - _Тип_: `string`
  - _Типово_: `'https://intlayer.org'`
  - _Опис_: URL Intlayer CMS.
  - _Приклад_: `'https://intlayer.org'`
  - _Примітка_: URL Intlayer CMS.

- **backendURL**:
  - _Тип_: `string`
  - _Типово_: `https://back.intlayer.org`
  - _Опис_: URL backend-сервера.
  - _Приклад_: `http://localhost:4000`

- **enabled**:
  - _Тип_: `boolean`
  - _За замовчуванням_: `true`
  - _Опис_: Вказує, чи додаток взаємодіє з візуальним редактором.
  - _Приклад_: `process.env.NODE_ENV !== 'production'`
  - _Примітка_: Якщо `true`, редактор зможе взаємодіяти з додатком. Якщо `false`, редактор не зможе взаємодіяти з додатком. У будь-якому випадку редактор може бути ввімкнений лише візуальним редактором. Вимкнення редактора для окремих середовищ, спосіб підвищити безпеку.

- **clientId**:
  - _Тип_: `string` | `undefined`
  - _За замовчуванням_: `undefined`
  - _Опис_: clientId і clientSecret дозволяють пакетам intlayer автентифікуватися з бекендом за допомогою автентифікації oAuth2. Access token використовується для автентифікації користувача, пов’язаного з проєктом. Щоб отримати access token, перейдіть на https://app.intlayer.org/project та створіть обліковий запис.
  - _Приклад_: `true`
  - _Примітка_: Важливо: clientId та clientSecret мають зберігатися в секреті і не розголошуватися публічно. Переконайтеся, що вони зберігаються у безпечному місці, наприклад у змінних оточення.

- **clientSecret**:
  - _Тип_: `string` | `undefined`
  - _Типово_: `undefined`
  - _Опис_: clientId та clientSecret дозволяють пакетам intlayer автентифікуватися з бекендом за допомогою oAuth2. Токен доступу використовується для автентифікації користувача, пов’язаного з проєктом. Щоб отримати токен доступу, перейдіть на https://app.intlayer.org/project і створіть обліковий запис.
  - _Приклад_: `true`
  - _Примітка_: Важливо: clientId та clientSecret слід зберігати в таємниці й не розголошувати публічно. Переконайтеся, що зберігаєте їх у безпечному місці, наприклад у environment variables.

- **dictionaryPriorityStrategy**:
  - _Тип_: `string`
  - _Типово_: `'local_first'`
  - _Опис_: Стратегія пріоритету словників у разі наявності як локальних, так і віддалених словників. Якщо встановлено `'distant_first'`, застосунок віддаватиме пріоритет віддаленим словникам над локальними. Якщо встановлено `'local_first'`, застосунок віддаватиме пріоритет локальним словникам над віддаленими.
  - _Приклад_: `'distant_first'`

- **liveSync**:
  - _Тип_: `boolean`
  - _Типово_: `false`
  - _Опис_: Вказує, чи має сервер застосунку виконувати hot reload контенту застосунку при виявленні змін у CMS / Visual Editor / Backend.
  - _Приклад_: `true`
  - _Примітка_: Наприклад, коли додається або оновлюється новий словник, застосунок оновить контент, що відображається на сторінці.
  - _Примітка_: Live sync потребує винесення вмісту застосунку на інший сервер. Це означає, що це може трохи вплинути на продуктивність застосунку. Щоб обмежити цей вплив, рекомендуємо розміщувати застосунок і live sync сервер на одній машині. Також комбінація live sync та `optimize` може спричинити значну кількість запитів до live sync сервера. Залежно від вашої інфраструктури, рекомендуємо протестувати обидві опції та їх комбінацію.

- **liveSyncPort**:
  - _Тип_: `number`
  - _За замовчуванням_: `4000`
  - _Опис_: Порт live sync сервера.
  - _Приклад_: `4000`
  - _Примітка_: Порт live sync сервера.

- **liveSyncURL**:
  - _Тип_: `string`
  - _За замовчуванням_: `'http://localhost:{liveSyncPort}'`
  - _Опис_: URL live sync сервера.
  - _Приклад_: `'https://example.com'`
  - _Примітка_: За замовчуванням вказує на localhost, але може бути змінений на будь-який URL у випадку віддаленого live sync сервера.

### Конфігурація маршрутизації

Налаштування, що контролюють поведінку маршрутизації, включно зі структурою URL, зберіганням locale та обробкою middleware.

#### Властивості

- **mode**:
  - _Тип_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Типово_: `'prefix-no-default'`
  - _Опис_: Режим маршрутизації URL для обробки locale.
  - _Examples_:
    - `'prefix-no-default'`: `/dashboard` (en) або `/fr/dashboard` (fr)
    - `'prefix-all'`: `/en/dashboard` (en) або `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (locale обробляється іншими способами`)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Примітка_: Це налаштування не впливає на керування cookie або зберіганням локалі.

- **storage**:
  - _Тип_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Типово_: `'localStorage'`
  - _Опис_: Налаштування для зберігання локалі на клієнті.

  - **cookie**:
    - _Опис_: Зберігає дані в cookie, невеликі фрагменти даних, що зберігаються в браузері клієнта, доступні як на стороні клієнта, так і на стороні сервера.
    - _Примітка_: Для зберігання, що відповідає вимогам GDPR, перед використанням забезпечте належну згоду користувача.
    - _Примітка_: Параметри cookie можна налаштувати, якщо вказати їх як CookiesAttributes (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Опис_: Зберігає дані в браузері без дат закінчення терміну дії, що дозволяє зберігати дані між сесіями, доступне лише на боці клієнта.
    - _Примітка_: Ідеально підходить для зберігання довгострокових даних, проте слід враховувати питання приватності та безпеки через відсутність строку дії, якщо їх не видалити явно.
    - _Примітка_: Сховище локалі доступне лише на боці клієнта, проксі intlayer не зможе до нього отримати доступ.
    - _Примітка_: Параметри сховища локалі можна налаштувати, якщо вказати їх як StorageAttributes (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Опис_: Зберігає дані протягом сеансу сторінки, тобто вони очищуються після закриття вкладки або вікна, доступне лише на боці клієнта.
    - _Примітка_: Підходить для тимчасового збереження даних для кожної сесії.
    - _Примітка_: Сховище локалі доступне лише на стороні клієнта, проксі intlayer не зможе до нього звертатися.
    - _Примітка_: Параметри збереження локалі можна налаштувати, якщо задати їх як StorageAttributes (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Опис_: Використовує HTTP-заголовки для збереження або передачі даних локалі, підходить для визначення мови на стороні сервера.
    - _Примітка_: Корисно в API-запитах для підтримки узгоджених налаштувань мови між запитами.
    - _Примітка_: Заголовок доступний лише на стороні сервера, клієнт не зможе отримати до нього доступ.
    - _Примітка_: Назву заголовка можна змінити, якщо вказати її в StorageAttributes (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Тип_: `string`
  - _За замовчуванням_: `''`
  - _Опис_: Базовий шлях для URL-адрес застосунку.
  - _Приклад_: `'/my-app'`
  - _Примітка_:
    - Якщо застосунок розміщений за адресою `https://example.com/my-app`
    - Базовий шлях, `'/my-app'`
    - URL буде `https://example.com/my-app/en`
    - Якщо базовий шлях не встановлено, URL буде `https://example.com/en`

- **rewrite**:
  - _Тип_: `Record<string, StrictModeLocaleMap<string>>`
  - _За замовчуванням_: `undefined`
  - _Опис_: Користувацькі правила перезапису URL, які перевизначають режим маршрутизації за замовчуванням для певних шляхів. Дозволяє визначати специфічні для локалі шляхи, які відрізняються від стандартної поведінки маршрутизації. Підтримує динамічні параметри маршруту з використанням синтаксису `[param]`.
  - _Приклад_:
    ```typescript
    routing: {
      mode: "prefix-no-default", // Стратегія відкату
      rewrite: nextjsRewrite({
        "/[locale]/about": {
          en: "/[locale]/about",
          fr: "/[locale]/a-propos",
        },
        "/[locale]/product/[slug]": {
          en: "/[locale]/product/[slug]",
          fr: "/[locale]/produit/[slug]",
        },
        "/[locale]/blog/[category]/[id]": {
          en: "/[locale]/blog/[category]/[id]",
          fr: "/[locale]/journal/[category]/[id]",
        },
      }),
    }
    ```
  - _Примітка_: Правила перезапису мають пріоритет над поведінкою `mode` за замовчуванням. Якщо шлях відповідає правилу перезапису, буде використано локалізований шлях з конфігурації перезапису замість стандартного префікса локалі.
  - _Примітка_: Динамічні параметри маршруту підтримуються з використанням нотації в квадратних дужках (наприклад, `[slug]`, `[id]`). Значення параметрів автоматично витягуються з URL та інтерполюються в перезаписаний шлях.
  - _Примітка_: Працює з додатками Next.js та Vite. Middleware/proxy автоматично перезапише вхідні запити, щоб відповідати внутрішній структурі маршруту.
  - _Примітка_: При генерації URL за допомогою `getLocalizedUrl()` правила перезапису автоматично застосовуються, якщо вони відповідають наданому шляху.
  - _Посилання_: Для отримання додаткової інформації див. [Користувацьке перезаписування URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/custom_url_rewrites.md).

#### Атрибути cookie

При використанні зберігання в cookie ви можете налаштувати додаткові атрибути cookie:

- **name**: Ім'я cookie (за замовчуванням: `'INTLAYER_LOCALE'`)
- **domain**: Домен cookie (за замовчуванням: undefined)
- **path**: Шлях cookie (за замовчуванням: undefined)
- **secure**: Вимагати HTTPS (за замовчуванням: undefined)
- **httpOnly**: Прапорець лише для HTTP (httpOnly) (за замовчуванням: undefined)
- **sameSite**: Політика SameSite (`'strict' | 'lax' | 'none'`)
- **expires**: Дата закінчення строку дії або кількість днів (значення за замовчуванням: undefined)

#### Атрибути збереження локалі

Коли використовується localStorage або sessionStorage:

- **type**: Тип сховища (`'localStorage' | 'sessionStorage'`)
- **name**: Ім'я ключа в сховищі (за замовчуванням: `'INTLAYER_LOCALE'`)

#### Приклади конфігурації

Нижче наведені поширені приклади конфігурації для нової структури маршрутизації v7:

**Базова конфігурація (за замовчуванням)**:

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
    headerName: "x-intlayer-locale",
  },
};

export default config;
```

**Конфігурація, сумісна з GDPR**:

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
  },
};

export default config;
```

**Режим параметрів пошуку**:

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
  },
};

export default config;
```

**Режим без префікса з кастомним сховищем**:

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
    },
  },
};

export default config;
```

---

### Конфігурація контенту

Налаштування, пов'язані з обробкою контенту в додатку, включаючи назви директорій, розширення файлів та похідні конфігурації.

#### Властивості

- **watch**:
  - _Тип_: `boolean`
  - _За замовчуванням_: `process.env.NODE_ENV === 'development'`
  - _Опис_: Вказує, чи Intlayer має відслідковувати зміни в файлах декларації контенту в додатку, щоб перебудувати відповідні словники.

- **fileExtensions**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Опис_: Розширення файлів, які слід шукати під час побудови словників.
  - _Приклад_: `['.data.ts', '.data.js', '.data.json']`
  - _Примітка_: Налаштування розширень файлів може допомогти уникнути конфліктів.

- **contentDir**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['.']`
  - _Приклад_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Опис_: Шлях до каталогу, де зберігаються файли визначення контенту (`.content.*`).
  - _Примітка_: Використовується для відстеження файлів контенту для перебудови словників.

- **codeDir**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['.']`
  - _Приклад_: `['src', '../../ui-library']`
  - _Опис_: Шлях до каталогу, де зберігається код, відносно базового каталогу.
  - _Примітка_: Використовується для відстеження файлів коду для перетворення (обрізання, оптимізація). Тримання цього окремо від `contentDir` може покращити продуктивність збірки, уникаючи непотрібного сканування файлів контенту.

---

### Конфігурація системи

Налаштування, пов'язані з внутрішніми шляхами та вихідними результатами Intlayer. Ці налаштування зазвичай є внутрішніми і не повинні змінюватися користувачем.

#### Властивості

- **baseDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `process.cwd()`
  - _Опис_: Базова директорія проекту.
  - _Приклад_: `'/path/to/project'`
  - _Примітка_: Використовується для визначення всіх директорій, пов'язаних з Intlayer.

- **dictionariesDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'.intlayer/dictionary'`
  - _Опис_: Каталог для збереження словників локалізації.
  - _Приклад_: `'translations'`

- **moduleAugmentationDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'.intlayer/types'`
  - _Опис_: Каталог для module augmentation, що дозволяє покращені підказки IDE та перевірку типів.
  - _Приклад_: `'intlayer-types'`
  - _Примітка_: Переконайтеся, що цей каталог включений у `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'.intlayer/unmerged_dictionary'`
  - _Опис_: Каталог для збереження незлитих словників.
  - _Приклад_: `'translations'`

- **typesDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'types'`
  - _Опис_: Каталог для збереження типів словників.
  - _Приклад_: `'intlayer-types'`

- **mainDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'main'`
  - _Опис_: Каталог, де зберігаються основні файли застосунку.
  - _Приклад_: `'intlayer-main'`

- **excludedPath**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Опис_: Каталоги, виключені з пошуку вмісту.
  - _Примітка_: Ця налаштування ще не використовується, але планується для майбутньої реалізації.

- **formatCommand**:
  - _Тип_: `string`
  - _Типово_: `undefined`
  - _Опис_: Команда для форматування вмісту. Коли Intlayer записуватиме ваші .content файли локально, ця команда буде використана для форматування вмісту.
  - _Приклад_: `'npx prettier --write "{{file}}" --log-level silent'` За допомогою Prettier
  - _Приклад_: `'npx biome format "{{file}}" --write --log-level none'` За допомогою Biome
  - _Приклад_: `'npx eslint --fix "{{file}}"  --quiet'` За допомогою ESLint
  - _Примітка_: Intlayer замінить {{file}} на шлях до файлу, який потрібно форматувати.
  - _Примітка_: Якщо не вказано, Intlayer спробує визначити команду форматування автоматично. Він буде намагатися знайти такі команди: prettier, biome, eslint.

### Конфігурація словника

Налаштування, які керують операціями словника, включаючи поведінку автоматичного заповнення та генерацію контенту.

Ця конфігурація словника має дві основні цілі:

1. **Значення за замовчуванням**: Визначати значення за замовчуванням під час створення файлів декларації контенту
2. **Поведінка при відсутності значень**: Забезпечувати запасні значення, коли певні поля не визначені, що дозволяє задавати поведінку операцій словника глобально

Щоб дізнатися більше про файли декларації контенту та про те, як застосовуються значення конфігурації, див. [Документацію щодо контент-файлів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

#### Властивості

- **fill**
- **description**
- **locale**
- **location**
- **importMode**:
  - _Примітка_: **Deprecated**: Use `dictionary.importMode` instead.
  - _Тип_: `'static' | 'dynamic' | 'fetch'`
  - _Типово_: `'static'`
  - _Опис_: Controls how dictionaries are imported.
  - _Приклад_: `'dynamic'`
- **priority**
- **live**
- **schema**
- **title**
- **tags**
- **version**

---

### Конфігурація логера

Налаштування, що керують логером, включно з префіксом, який слід використовувати.

#### Властивості

- **mode**:
  - _Тип_: `string`
  - _За замовчуванням_: `default`
  - _Опис_: Вказує режим роботи логера.
  - _Опції_: `default`, `verbose`, `disabled`
  - _Приклад_: `default`
  - _Примітка_: Режим роботи логера. Режим `verbose` записуватиме більше інформації й підходить для налагодження. Режим `disabled` вимкне логер.

- **prefix**:
  - _Тип_: `string`
  - _Типово_: `'[intlayer] '`
  - _Опис_: Префікс logger'а.
  - _Приклад_: `'[my custom prefix] '`
  - _Примітка_: Префікс logger'а.

### Конфігурація AI

Налаштування, які контролюють AI-функції Intlayer, включно з провайдером, моделлю та API-ключем.

Ця конфігурація є необов'язковою, якщо ви зареєстровані на [Intlayer Dashboard](https://app.intlayer.org/project) і використовуєте ключ доступу. Intlayer автоматично підбере найефективніше та економічно вигідне AI-рішення для ваших потреб. Використання опцій за замовчуванням забезпечує кращу довгострокову підтримуваність, оскільки Intlayer постійно оновлюється, щоб використовувати найбільш релевантні моделі.

Якщо ви віддаєте перевагу використовувати власний API-ключ або конкретну модель, ви можете визначити власну конфігурацію AI.
Ця конфігурація ШІ буде використовуватися глобально в усьому вашому середовищі Intlayer. Команди CLI використовуватимуть ці налаштування як значення за замовчуванням для команд (наприклад, `fill`), а також SDK, Visual Editor і CMS. Ви можете перевизначати ці значення за замовчуванням для конкретних випадків використання за допомогою параметрів команд.

Intlayer підтримує кількох постачальників ШІ для більшої гнучкості та вибору. Наразі підтримуються такі постачальники:

- **OpenAI** (за замовчуванням)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Google AI Studio**
- **Google Vertex**
- **Together.ai**
- **ollama**

#### Властивості

- **provider**:
  - _Тип_: `string`
  - _Типово_: `'openai'`
  - _Опис_: Постачальник, який використовуватиметься для функцій ШІ Intlayer.
  - _Options_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`, `'openrouter'`, `'alibaba'`, `'fireworks'`, `'groq'`, `'huggingface'`, `'bedrock'`, `'googleaistudio'`, `'googlevertex'`, `'togetherai'`
  - _Приклад_: `'anthropic'`
  - _Примітка_: Різні провайдери можуть вимагати різні API-ключі та мати різні моделі ціноутворення.

- **model**:
  - _Тип_: `string`
  - _Типово_: None
  - _Опис_: Модель, яку слід використовувати для функцій ШІ в Intlayer.
  - _Приклад_: `'gpt-4o-2024-11-20'`
  - _Примітка_: Конкретна модель для використання залежить від провайдера.

- **temperature**:
  - _Тип_: `number`
  - _Типово_: None
  - _Опис_: Параметр temperature контролює випадковість відповідей ШІ.
  - _Приклад_: `0.1`
  - _Примітка_: Вища температура зробить ШІ більш креативним та менш передбачуваним.

- **apiKey**:
  - _Тип_: `string`
  - _Типово_: None
  - _Опис_: Ваш API-ключ для вибраного провайдера.
  - _Приклад_: `process.env.OPENAI_API_KEY`
  - _Примітка_: Важливо: API-ключі слід зберігати в таємниці та не поширювати публічно. Будь ласка, зберігайте їх у безпечному місці, наприклад у змінних середовища.

- **applicationContext**:
  - _Тип_: `string`
  - _Типово_: None
  - _Опис_: Надає додатковий контекст про ваш застосунок для AI-моделі, допомагаючи їй генерувати точніші та контекстуально доречні переклади. Це може включати інформацію про домен вашого додатку, цільову аудиторію, тон або специфічну термінологію.
  - _Примітка_: Ви можете використовувати його, щоб додати більше правил для AI-моделі (e.g. "You should not transform urls").
  - _Приклад_: `'My application context'`

- **baseURL**:
  - _Тип_: `string`
  - _Типово_: None
  - _Опис_: Базовий URL для AI API.
  - _Приклад_: `'https://api.openai.com/v1'`
  - _Приклад_: `'http://localhost:5000'`
  - _Примітка_: Може використовуватися для вказівки локального або кастомного AI API endpoint.

- **dataSerialization**:
  - _Тип_: `'json' | 'toon'`
  - _За замовчуванням_: `'json'`
  - _Опис_: Формат серіалізації даних для використання у функціях ШІ Intlayer.
  - _Приклад_: `'toon'`
  - _Примітка_: `json`: Стандартний, надійний; використовує більше токенів. `toon`: Менше токенів, менш стабільний, ніж JSON.

> Якщо ви надаєте додаткові параметри, Intlayer передасть їх AI-моделі як контекст. Це можна використовувати для налаштування інтенсивності міркувань, детальності тексту тощо

### Конфігурація збірки

Налаштування, що контролюють, як Intlayer оптимізує та збирає інтернаціоналізацію вашого застосунку.

Параметри збірки застосовуються до плагінів `@intlayer/babel` та `@intlayer/swc`.

> У режимі розробки Intlayer використовує статичні імпорти словників, щоб спростити процес розробки.

> У режимі оптимізації Intlayer замінює виклики словників для оптимізації розбиття на чанки (chunking), тож фінальний бандл імпортує лише ті словники, які фактично використовуються.

#### Властивості

- **mode**:
  - _Тип_: `'auto' | 'manual'`
  - _За замовчуванням_: `'auto'`
  - _Опис_: Керує режимом збірки.
  - _Приклад_: `'manual'`
  - _Примітка_: Якщо 'auto', збірка буде увімкнена автоматично під час побудови застосунку.
  - _Примітка_: Якщо 'manual', збірка буде встановлена лише під час виконання команди збірки.
  - _Примітка_: Може використовуватися для вимкнення збірки словників, наприклад, коли слід уникати виконання в середовищі Node.js.

- **optimize**:
  - _Тип_: `boolean`
  - _За замовчуванням_: `undefined`
  - _Опис_: Керує тим, чи слід оптимізувати збірку.
  - _Приклад_: `process.env.NODE_ENV === 'production'`
  - _Примітка_: За замовчуванням оптимізація збірки не зафіксована. Якщо не встановлено, Intlayer запустить оптимізацію під час збірки вашого застосунку (vite / nextjs / тощо). Встановлення `true` примусово увімкне оптимізацію збірки, включно з режимом розробки. Встановлення `false` вимкне оптимізацію збірки.
  - _Примітка_: Коли ввімкнено, Intlayer замінює всі виклики словників для оптимізації розбиття на чанки. Таким чином фінальний бандл імпортуватиме лише ті словники, які використовуються. Всі імпорти залишаться статичними, щоб уникнути асинхронної обробки під час завантаження словників.
  - _Примітка_: Intlayer замінить усі виклики `useIntlayer` на варіант, визначений опцією `importMode`, а `getIntlayer`, на `getDictionary`.
  - _Примітка_: Ця опція покладається на плагіни `@intlayer/babel` та `@intlayer/swc`.
  - _Примітка_: Переконайтесь, що всі ключі оголошені статично у викликах `useIntlayer`. Наприклад `useIntlayer('navbar')`.

- **checkTypes**:
  - _Тип_: `boolean`
  - _Типово_: `false`
  - _Опис_: Вказує, чи повинна збірка перевіряти типи TypeScript та реєструвати помилки.
  - _Примітка_: Це може уповільнити процес збірки.

- **outputFormat**:
  - _Тип_: `'esm' | 'cjs'`
  - _Типово_: `'esm'`
  - _Опис_: Керує форматом виводу словників.
  - _Приклад_: `'cjs'`
  - _Примітка_: Формат виводу словників.

- **traversePattern**:
  - _Тип_: `string[]`
  - _Типово_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx}', '!**\/node_modules/**']`
  - _Опис_: Шаблони, що визначають, які файли слід обходити під час оптимізації.
    - _Приклад_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Примітка_: Використовуйте це, щоб обмежити оптимізацію релевантними файлами коду та покращити продуктивність збірки.
  - _Примітка_: Ця опція буде ігнорована, якщо `optimize` вимкнено.
  - _Примітка_: Використовуйте glob-шаблон.

---

### Конфігурація компілятора

Налаштування, що керують компілятором Intlayer, який витягує словники безпосередньо з ваших компонентів.

#### Властивості

- **enabled**:
  - _Тип_: `boolean | 'build-only'`
  - _За замовчуванням_: `true`
  - _Опис_: Вказує, чи повинен бути ввімкнений компілятор для витягування словників.
  - _Приклад_: `'build-only'`
  - _Примітка_: Встановлення значення `'build-only'` призведе до пропуску компілятора під час режиму розробки для прискорення часу запуску. Він буде запускатися лише для команд збірки.

- **dictionaryKeyPrefix**:
  - _Тип_: `string`
  - _За замовчуванням_: `''`
  - _Опис_: Префікс для витягнутих ключів словника.
  - _Приклад_: `'my-key-'`
  - _Примітка_: Під час витягування словників ключ генерується на основі назви файлу. Цей префікс додається до згенерованого ключа, щоб запобігти конфліктам.

- **saveComponents**:
  - _Тип_: `boolean`
  - _За замовчуванням_: `false`
  - _Опис_: Вказує, чи повинні зберігатися компоненти після їх трансформації.
  - _Примітка_: Якщо встановлено значення true, компілятор замінить оригінальні файли трансформованими. Таким чином, компілятор можна запустити лише один раз для трансформації застосунку, а потім видалити його.

- **transformPattern**:
  - _Тип_: `string | string[]`
  - _За замовчуванням_: `['**/*.{ts,tsx,jsx,js,cjs,mjs,svelte,vue}', '!**/node_modules/**']`
  - _Опис_: Шаблони, що визначають, які файли слід обходити під час оптимізації.
  - _Приклад_: `['src/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Примітка_: Використовуйте це, щоб обмежити оптимізацію релевантними файлами коду та покращити продуктивність збірки.

- **excludePattern**:
  - _Тип_: `string | string[]`
  - _За замовчуванням_: `['**/node_modules/**']`
  - _Опис_: Шаблони, що визначають, які файли слід виключити під час оптимізації.
  - _Приклад_: `['**/node_modules/**', '!**/node_modules/react/**']`

- **output**:
  - _Тип_: `FilePathPattern`
  - _Типово_: `undefined`
  - _Опис_: Визначає шлях до вихідних файлів. Замінює `outputDir`. Підтримує динамічні змінні через рядкові шаблони або функцію. Підтримувані змінні: `{{fileName}}`, `{{key}}`, `{{locale}}`, `{{extension}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{format}}`, `{{componentFormat}}`, та `{{componentDirPath}}`.
  - _Примітка_: Шляхи, що починаються з `./`, розв'язуються відносно каталогу компонента. Шляхи, що починаються з `/`, розв'язуються відносно кореня проєкту (`baseDir`).
  - _Примітка_: Включення змінної `{{locale}}` у шлях дозволить генерувати словники, розділені за локалями.
  - _Приклад_:
    - **Багатомовний файл поруч із компонентом**:
    - Рядок: `'./{{fileName}}{{extension}}'`
    - Функція: `({ fileName, extension }) => \`./${fileName}${extension}\``

    - **Централізовані JSON-файли для кожної локалі**:
    - Рядок: `'/locales/{{locale}}/{{key}}.content.json'`
    - Функція: `({ key, locale }) => \`/locales/${locale}/${key}.content.json\``

- **noMetadata**:
  - _Тип_: `boolean`
  - _Типово_: `false`
  - _Опис_: Вказує, чи мають метадані зберігатися у файлі. Якщо true, компілятор не зберігатиме метадані словників (ключ, оболонка вмісту). Корисно для виводу JSON для i18next або ICU MessageFormat для кожної локалі.
  - _Примітка_: Корисно при використанні з плагіном `loadJSON`.
  - _Приклад_:
    Якщо `true` :

    ```json
    {
      "key": "value"
    }
    ```

    Якщо `false`:

    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```
