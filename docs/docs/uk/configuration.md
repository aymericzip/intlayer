---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Конфігурація (Configuration)
description: Дізнайтеся, як налаштувати Intlayer для вашого додатка. Зрозумійте різні параметри та опції, доступні для налаштування Intlayer відповідно до ваших потреб.
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
  - version: 8.4.0
    date: 2026-03-20
    changes: Додано об'єктну нотацію для кожної мови для 'compiler.output' та 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Переміщено 'baseDir' з конфігурації 'content' до конфігурації 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Оновлено параметри компілятора (compiler), додано підтримку 'output' та 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Оновлено параметри компілятора
  - version: 8.1.5
    date: 2026-02-23
    changes: Додано параметр компілятора 'build-only' та префікс словника
  - version: 8.0.6
    date: 2026-02-12
    changes: Додано підтримку провайдерів Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face та Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Додано `dataSerialization` до конфігурації AI
  - version: 8.0.0
    date: 2026-01-24
    changes: Перейменовано режим імпорту `live` на `fetch` для кращого опису механізму роботи.
  - version: 8.0.0
    date: 2026-01-22
    changes: Переміщено конфігурацію збірки `importMode` до конфігурації словника `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: Додано опцію `rewrite` до конфігурації маршрутизації
  - version: 8.0.0
    date: 2026-01-18
    changes: Відокремлено системну конфігурацію від конфігурації контенту. Переміщено внутрішні шляхи до властивості `system`. Додано `codeDir` для відокремлення файлів контенту та трансформації коду.
  - version: 8.0.0
    date: 2026-01-18
    changes: Додано параметри словника `location` та `schema`
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
    changes: Замінено `middleware` конфігурацією маршрутизації `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Додано опцію `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Оновлено параметр `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Додано параметр `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Видалено поля `dictionaryOutput` та `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Додано режим імпорту `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Замінено поле `hotReload` на `liveSync`, додано поля `liveSyncPort` та `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Замінено `activateDynamicImport` опцією `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Змінено значення за замовчуванням для `contentDir` з `['src']` на `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Додано команди `docs`
---

# Документація з конфігурації Intlayer

## Огляд

Конфігураційні файли Intlayer дозволяють налаштовувати різні аспекти плагіна, такі як інтернаціоналізація (internationalization), проміжне програмне забезпечення (middleware) та обробка контенту. Ця документація надає детальний опис кожної властивості в конфігурації.

---

## Зміст

<TOC/>

---

## Підтримувані формати конфігураційних файлів

Intlayer приймає формати конфігураційних файлів JSON, JS, MJS та TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Приклад конфігураційного файлу

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Приклад конфігураційного файлу Intlayer, що відображає всі доступні опції.
 */
const config: IntlayerConfig = {
  /**
   * Налаштування інтернаціоналізації.
   */
  internationalization: {
    /**
     * Список мов (locales), що підтримуються в додатку.
     * За замовчуванням: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Список обов'язкових мов, які повинні бути визначені в кожному словнику.
     * Якщо порожньо, усі мови є обов'язковими в режимі `strict`.
     * За замовчуванням: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Рівень суворості для інтернаціоналізованого контенту.
     * - "strict": Помилка, якщо будь-яка оголошена мова відсутня або не оголошена.
     * - "inclusive": Попередження, якщо оголошена мова відсутня.
     * - "loose": Приймає будь-яку існуючу мову.
     * За замовчуванням: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Мова за замовчуванням, яка використовується як резервна, якщо запитувана мова не знайдена.
     * За замовчуванням: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Параметри, що контролюють операції зі словниками та поведінку резервного копіювання.
   */
  dictionary: {
    /**
     * Контролює спосіб імпорту словників.
     * - "static": Статично імпортується під час збірки.
     * - "dynamic": Динамічно імпортується за допомогою Suspense.
     * - "fetch": Динамічно отримується через Live Sync API.
     * За замовчуванням: "static"
     */
    importMode: "static",

    /**
     * Стратегія автоматичного заповнення відсутніх перекладів за допомогою AI.
     * Може бути логічним значенням або шаблоном шляху для збереження заповненого контенту.
     * За замовчуванням: true
     */
    fill: true,

    /**
     * Фізичне розташування файлів словника.
     * - "local": Зберігається в локальній файловій системі.
     * - "remote": Зберігається в Intlayer CMS.
     * - "hybrid": Зберігається як локально, так і в Intlayer CMS.
     * - "plugin" (або будь-який користувацький рядок): Надається плагіном або користувацьким джерелом.
     * За замовчуванням: "local"
     */
    location: "local",

    /**
     * Чи повинен контент автоматично трансформуватися (наприклад, з Markdown в HTML).
     * За замовчуванням: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Конфігурація маршрутизації та проміжного ПЗ.
   */
  routing: {
    /**
     * Стратегія маршрутизації мов.
     * - "prefix-no-default": Додає префікс усім мовам, крім мови за замовчуванням (наприклад, /dashboard, /fr/dashboard).
     * - "prefix-all": Додає префікс усім мовам (наприклад, /en/dashboard, /fr/dashboard).
     * - "no-prefix": Мова відсутня в URL.
     * - "search-params": Використовує ?locale=...
     * За замовчуванням: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Де зберігати вибрану користувачем мову.
     * Опції: 'cookie', 'localStorage', 'sessionStorage', 'header' або їх масив.
     * За замовчуванням: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Базовий шлях для URL додатка.
     * За замовчуванням: ""
     */
    basePath: "",

    /**
     * Користувацькі правила перенаправлення (rewrite) URL для конкретних шляхів за мовами.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Параметри, пов'язані з пошуком та обробкою файлів контенту.
   */
  content: {
    /**
     * Розширення файлів для сканування словників.
     * За замовчуванням: ['.content.ts', '.content.js', '.content.json' тощо]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Директорії, де розташовані файли .content.
     * За замовчуванням: ["."]
     */
    contentDir: ["src"],

    /**
     * Де розташований вихідний код.
     * Використовується для оптимізації збірки та трансформації коду.
     * За замовчуванням: ["."]
     */
    codeDir: ["src"],

    /**
     * Шаблони, виключені зі сканування.
     * За замовчуванням: ['node_modules', '.intlayer' тощо]
     */
    excludedPath: ["node_modules"],

    /**
     * Чи відстежувати зміни та перебудовувати словники під час розробки.
     * За замовчуванням: true в режимі розробки
     */
    watch: true,

    /**
     * Команда, що використовується для форматування новостворених / оновлених файлів .content.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Конфігурація візуального редактора (Visual Editor).
   */
  editor: {
    /**
     * Чи ввімкнено візуальний редактор.
     * За замовчуванням: false
     */
    enabled: true,

    /**
     * URL вашого додатка для перевірки джерела (origin validation).
     * За замовчуванням: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Порт для локального сервера редактора.
     * За замовчуванням: 8000
     */
    port: 8000,

    /**
     * Публічний URL для редактора.
     * За замовчуванням: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL Intlayer CMS.
     * За замовчуванням: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL Backend API.
     * За замовчуванням: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Чи ввімкнути синхронізацію контенту в реальному часі.
     * За замовчуванням: false
     */
    liveSync: true,
  },

  /**
   * Параметри AI-перекладу та створення контенту.
   */
  ai: {
    /**
     * Провайдер AI для використання.
     * Опції: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * За замовчуванням: 'openai'
     */
    provider: "openai",

    /**
     * Модель вибраного провайдера для використання.
     */
    model: "gpt-4o",

    /**
     * API ключ провайдера.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Глобальний контекст для спрямування AI при створенні перекладів.
     */
    applicationContext: "Це додаток для бронювання подорожей.",

    /**
     * URL базового шляху для AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Серіалізація даних (Data Serialization)
     *
     * Опції:
     * - "json": За замовчуванням, надійно; споживає більше токенів.
     * - "toon": Споживає менше токенів, може бути не таким стабільним, як JSON.
     *
     * За замовчуванням: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Налаштування збірки та оптимізації.
   */
  build: {
    /**
     * Режим виконання збірки.
     * - "auto": Буде зібрано автоматично під час збірки додатка.
     * - "manual": Потребує явної команди на збірку.
     * За замовчуванням: "auto"
     */
    mode: "auto",

    /**
     * Чи оптимізувати фінальний бандл шляхом видалення невикористовуваних словників.
     * За замовчуванням: true у продуктовому середовищі
     */
    optimize: true,

    /**
     * Формат виводу для згенерованих файлів словника.
     * За замовчуванням: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Визначає, чи повинна збірка перевіряти типи TypeScript.
     * За замовчуванням: false
     */
    checkTypes: false,
  },

  /**
   * Конфігурація логера (Logger).
   */
  log: {
    /**
     * Рівень логування.
     * - "default": Стандартне логування.
     * - "verbose": Поглиблене дебаг-логування.
     * - "disabled": Вимкнути логування.
     * За замовчуванням: "default"
     */
    mode: "default",

    /**
     * Префікс для всіх повідомлень логування.
     * За замовчуванням: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Системна конфігурація (Для розширеного використання)
   */
  system: {
    /**
     * Директорія для зберігання локалізованих словників.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Директорія для розширення модулів TypeScript (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Директорія для зберігання незлитих (unmerged) словників.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Директорія для зберігання типів словників.
     */
    typesDir: ".intlayer/types",

    /**
     * Директорія, де зберігаються основні файли додатка.
     */
    mainDir: ".intlayer/main",

    /**
     * Директорія, де зберігаються конфігураційні файли.
     */
    configDir: ".intlayer/config",

    /**
     * Директорія, де зберігаються кеш-файли.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Конфігурація компілятора (Для розширеного використання)
   */
  compiler: {
    /**
     * Визначає, чи має бути ввімкнено компілятор.
     *
     * - false: Вимикає компілятор.
     * - true: Вмикає компілятор.
     * - "build-only": Пропускає компілятор під час розробки та пришвидшує час запуску.
     *
     * За замовчуванням: false
     */
    enabled: true,

    /**
     * Визначає шлях для вихідних файлів. Замінює `outputDir`.
     *
     * - Шляхи з `./` розв'язуються відносно директорії компонента.
     * - Шляхи з `/` розв'язуються відносно кореня проєкту (`baseDir`).
     *
     * - Додавання змінної `{{locale}}` у шлях активує створення окремих словників для кожної мови.
     *
     * Приклад:
     * ```ts
     * {
     *   // Створювати багатомовні файли .content.ts поряд з компонентом
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Рівноцінно з використанням шаблонного рядка
     * }
     * ```
     *
     * ```ts
     * {
     *   // Створювати централізовані JSON для кожної мови в корені проєкту
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Рівноцінно з використанням шаблонного рядка
     * }
     * ```
     *
     * Список змінних:
     *   - `fileName`: Ім'я файлу.
     *   - `key`: Ключ контенту.
     *   - `locale`: Мова контенту.
     *   - `extension`: Розширення файлу.
     *   - `componentFileName`: Ім'я файлу компонента.
     *   - `componentExtension`: Розширення файлу компонента.
     *   - `format`: Формат словника.
     *   - `componentFormat`: Формат словника компонента.
     *   - `componentDirPath`: Шлях до директорії компонента.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Визначає, чи мають компоненти зберігатися після трансформації.
     * Таким чином, компілятор можна запустити лише один раз для трансформації вашого додатка, а потім видалити.
     */
    saveComponents: false,

    /**
     * Вставляє лише контент у згенерований файл. Корисно для JSON-виводу за мовами для i18next або ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "", // Додайте необов'язковий префікс до витягнутих ключів словника
  },

  /**
   * Користувацькі схеми (Schemas) для валідації контенту словників.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Конфігурація плагінів (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## Довідник конфігурації (Configuration Reference)

Наступні розділи описують різні параметри конфігурації, доступні в Intlayer.

---

### Конфігурація інтернаціоналізації (Internationalization Configuration)

Визначає налаштування, пов'язані з інтернаціоналізацією, включаючи доступні мови та мову за замовчуванням для додатка.

| Поле              | Тип        | Опис                                                                                                                          | Приклад              | Примітка                                                                                                                                                                                                                                                                |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Список мов, що підтримуються в додатку. За замовчуванням: `[Locales.ENGLISH]`                                                 | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                         |
| `requiredLocales` | `string[]` | Список обов'язкових мов у додатку. За замовчуванням: `[]`                                                                     | `[]`                 | Якщо порожньо, усі мови є обов'язковими в режимі `strict`. Переконайтеся, що обов'язкові мови також визначені у полі `locales`.                                                                                                                                         |
| `strictMode`      | `string`   | Забезпечує надійну реалізацію інтернаціоналізованого контенту завдяки використанню TypeScript. За замовчуванням: `inclusive`  |                      | Якщо `"strict"`: функція `t` вимагає визначення кожної оголошеної мови — видає помилку, якщо будь-яка відсутня або не оголошена. Якщо `"inclusive"`: попереджає про відсутні мови, але приймає існуючі неоголошені мови. Якщо `"loose"`: приймає будь-яку існуючу мову. |
| `defaultLocale`   | `string`   | Мова за замовчуванням, що використовується як резервна, якщо запитувана мова не знайдена. За замовчуванням: `Locales.ENGLISH` | `'en'`               | Використовується для визначення мови, коли жодна не вказана в URL, кукі або заголовку.                                                                                                                                                                                  |

---

### Конфігурація редактора (Editor Configuration)

Визначає налаштування, пов'язані з інтегрованим редактором, включаючи порт сервера та статус активності.

| Поле                         | Тип                       | Опис                                                                                                                                                                                                                 | Приклад                                                                               | Примітка                                                                                                                                                                                                                         |
| ---------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | URL вашого додатка. За замовчуванням: `''`                                                                                                                                                                           | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Використовується для обмеження джерел (origins) редактора з міркувань безпеки. Якщо встановлено `'*'`, редактор доступний з будь-якого джерела.                                                                                  |
| `port`                       | `number`                  | Порт, що використовується сервером візуального редактора. За замовчуванням: `8000`                                                                                                                                   |                                                                                       |                                                                                                                                                                                                                                  |
| `editorURL`                  | `string`                  | URL сервера редактора. За замовчуванням: `'http://localhost:8000'`                                                                                                                                                   | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Використовується для обмеження джерел, які можуть взаємодіяти з додатком. Якщо встановлено `'*'`, доступний з будь-якого джерела. Повинен бути встановлений, якщо ви змінюєте порт або якщо редактор розміщено на іншому домені. |
| `cmsURL`                     | `string`                  | URL Intlayer CMS. За замовчуванням: `'https://intlayer.org'`                                                                                                                                                         | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                  |
| `backendURL`                 | `string`                  | URL сервера бекенду. За замовчуванням: `https://back.intlayer.org`                                                                                                                                                   | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                  |
| `enabled`                    | `boolean`                 | Визначає, чи буде додаток взаємодіяти з візуальним редактором. За замовчуванням: `true`                                                                                                                              | `process.env.NODE_ENV !== 'production'`                                               | Якщо `false`, редактор не може взаємодіяти з додатком. Вимкнення для певних середовищ підвищує безпеку.                                                                                                                          |
| `clientId`                   | `string &#124; undefined` | Дозволяє пакетам intlayer проходити автентифікацію на бекенді за допомогою oAuth2. Для отримання токена доступу перейдіть на [intlayer.org/project](https://app.intlayer.org/project). За замовчуванням: `undefined` |                                                                                       | Тримайте в секреті; зберігайте в змінних оточення.                                                                                                                                                                               |
| `clientSecret`               | `string &#124; undefined` | Дозволяє пакетам intlayer проходити автентифікацію на бекенді за допомогою oAuth2. Для отримання токена доступу перейдіть на [intlayer.org/project](https://app.intlayer.org/project). За замовчуванням: `undefined` |                                                                                       | Тримайте в секреті; зберігайте в змінних оточення.                                                                                                                                                                               |
| `dictionaryPriorityStrategy` | `string`                  | Стратегія пріоритетності словників за наявності як локальних, так і віддалених словників. За замовчуванням: `'local_first'`                                                                                          | `'distant_first'`                                                                     | `'distant_first'`: Надає пріоритет віддаленим словникам над локальними. `'local_first'`: Надає пріоритет локальним словникам над віддаленими.                                                                                    |
| `liveSync`                   | `boolean`                 | Визначає, чи повинен сервер додатка виконувати гаряче перезавантаження контенту при виявленні зміни в CMS / візуальному редакторі / бекенді. За замовчуванням: `true`                                                | `true`                                                                                | Коли словник додається/оновлюється, додаток оновлює контент сторінки. Live sync передає контент на аутсорс іншому серверу, що може трохи вплинути на продуктивність. Рекомендується розміщувати обидва на одній машині.          |
| `liveSyncPort`               | `number`                  | Порт сервера Live Sync. За замовчуванням: `4000`                                                                                                                                                                     | `4000`                                                                                |                                                                                                                                                                                                                                  |
| `liveSyncURL`                | `string`                  | URL сервера Live Sync. За замовчуванням: `'http://localhost:{liveSyncPort}'`                                                                                                                                         | `'https://example.com'`                                                               | Вказує на localhost за замовчуванням; може бути змінено на віддалений сервер живої синхронізації.                                                                                                                                |

### Конфігурація маршрутизації (Routing Configuration)

Налаштування, що контролюють поведінку маршрутизації, включаючи структуру URL, зберігання мови та обробку проміжного ПЗ.

| Поле       | Тип                                                                                                                                                  | Опис                                                                                                                                                                                        | Приклад                                                                                                                                                                                                      | Примітка                                                                                                                                                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Режим маршрутизації URL для обробки мов. За замовчуванням: `'prefix-no-default'`                                                                                                            | `'prefix-no-default'`: `/dashboard` (en) або `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: мова обробляється іншими засобами. `'search-params'`: використовує `/dashboard?locale=fr` | Не впливає на керування кукі або зберігання мови (locale storage).                                                                                                                                                                                                           |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Конфігурація для зберігання мови на клієнті. За замовчуванням: `['cookie', 'header']`                                                                                                       | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                                | Див. таблицю Параметри зберігання нижче.                                                                                                                                                                                                                                     |
| `basePath` | `string`                                                                                                                                             | Базовий шлях для URL додатка. За замовчуванням: `''`                                                                                                                                        | `'/my-app'`                                                                                                                                                                                                  | Якщо додаток знаходиться на `https://example.com/my-app`, basePath — це `'/my-app'`, а URL стають на кшталт `https://example.com/my-app/en`.                                                                                                                                 |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Користувацькі правила перенаправлення (rewrite) URL, що замінюють стандартний режим маршрутизації для певних шляхів. Підтримує динамічні параметри `[param]`. За замовчуванням: `undefined` | Див. приклад нижче                                                                                                                                                                                           | Правила перенаправлення мають пріоритет над `mode`. Працює з Next.js та Vite. `getLocalizedUrl()` автоматично застосовує відповідні правила. Див. [Користувацькі перенаправлення URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/custom_url_rewrites.md). |

**Приклад `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Резервна стратегія
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

#### Параметри зберігання (Storage Options)

| Значення           | Опис                                                                         | Примітка                                                                                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Зберігає мову в кукі — доступно як з клієнтської, так і з серверної сторони. | Для відповідності GDPR переконайтеся, що отримано належну згоду користувача. Налаштовується через `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Зберігає мову в браузері без терміну дії — лише клієнтська сторона.          | Не закінчується, поки не буде явно очищено. Проксі Intlayer не може отримати доступ до цього. Налаштовується через `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).         |
| `'sessionStorage'` | Зберігає мову на час сесії сторінки — лише клієнтська сторона.               | Очищується при закритті вкладки/вікна. Проксі Intlayer не може отримати доступ до цього. Налаштовується через `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).            |
| `'header'`         | Зберігає або передає мову через HTTP-заголовки — лише серверна сторона.      | Корисно для API-викликів. Клієнтська сторона не може отримати доступ. Налаштовується через `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                       |

#### Атрибути кукі (Cookie Attributes)

При використанні зберігання через кукі ви можете налаштувати додаткові атрибути кукі:

| Поле       | Тип                                   | Опис                                                                          |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| `name`     | `string`                              | Назва кукі. За замовчуванням: `'INTLAYER_LOCALE'`                             |
| `domain`   | `string`                              | Домен кукі. За замовчуванням: `undefined`                                     |
| `path`     | `string`                              | Шлях кукі. За замовчуванням: `undefined`                                      |
| `secure`   | `boolean`                             | Вимагає HTTPS. За замовчуванням: `undefined`                                  |
| `httpOnly` | `boolean`                             | Флаг HTTP-only. За замовчуванням: `undefined`                                 |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Політика SameSite.                                                            |
| `expires`  | `Date &#124; number`                  | Дата закінчення терміну дії або кількість днів. За замовчуванням: `undefined` |

#### Атрибути зберігання мови (Locale Storage Attributes)

При використанні localStorage або sessionStorage:

| Поле   | Тип                                      | Опис                                                          |
| ------ | ---------------------------------------- | ------------------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Тип зберігання.                                               |
| `name` | `string`                                 | Назва ключа зберігання. За замовчуванням: `'INTLAYER_LOCALE'` |

#### Приклади конфігурації

Ось кілька поширених прикладів конфігурації для нової структури маршрутизації v7:

**Базова конфігурація (За замовчуванням)**:

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

**Конфігурація для відповідності GDPR**:

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

**Режим параметрів пошуку (Search Parameters Mode)**:

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

**Режим без префікса (No Prefix Mode) з користувацьким сховищем**:

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

**Користувацьке перенаправлення URL з динамічними шляхами**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Резервна стратегія для шляхів без перенаправлення
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

### Конфігурація контенту (Content Configuration)

Налаштування, пов'язані з обробкою контенту всередині додатка (імена директорій, розширення файлів та похідні конфігурації).

| Поле             | Тип        | Опис                                                                                                                                                                                                                      | Приклад                             | Примітка                                                                                                                                             |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Визначає, чи повинен Intlayer відстежувати зміни у файлах оголошення контенту для перебудови словників. За замовчуванням: `process.env.NODE_ENV === 'development'`                                                        |                                     |                                                                                                                                                      |
| `fileExtensions` | `string[]` | Розширення файлів, що використовуються для сканування файлів оголошення контенту. За замовчуванням: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                                      |
| `contentDir`     | `string[]` | Шляхи до директорій, де розташовані файли оголошення контенту. За замовчуванням: `['.']`                                                                                                                                  | `['src/content']`                   |                                                                                                                                                      |
| `codeDir`        | `string[]` | Шляхи до директорій, де розташовані файли вихідного коду вашого додатка. За замовчуванням: `['.']`                                                                                                                        | `['src']`                           | Використовується для оптимізації збірки та гарантії того, що трансформація коду та гаряче перезавантаження застосовуються лише до необхідних файлів. |
| `excludedPath`   | `string[]` | Шляхи, виключені зі сканування контенту. За замовчуванням: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                                      | `['src/styles']`                    |                                                                                                                                                      |
| `formatCommand`  | `string`   | Команда, яка буде виконана для форматування новостворених або оновлених файлів контенту. За замовчуванням: `undefined`                                                                                                    | `'npx prettier --write "{{file}}"'` | Використовується під час вилучення контенту або через візуальний редактор.                                                                           |

---

### Конфігурація словника (Dictionary Configuration)

Налаштування, що контролюють операції зі словниками, включаючи поведінку автоматичного заповнення та створення контенту.

Ця конфігурація словника має дві основні мети:

1. **Значення за замовчуванням**: Визначення значень за замовчуванням при створенні файлів оголошення контенту.
2. **Поведінка резервного копіювання**: Дозволяє глобально налаштувати поведінку операцій зі словниками, надаючи резервні значення, коли конкретні поля не визначені.

Для отримання додаткової інформації про те, як застосовуються файли оголошення контенту та значення конфігурації, див. [документацію файлів контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

| Поле                        | Тип                                                                                             | Опис                                                                                                             | Приклад            | Примітка                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Контролює, як генеруються вихідні файли автоматичного заповнення (AI-переклад). За замовчуванням: `true`         | Див. приклад нижче | `true`: шлях за замовчуванням (той самий файл, що й джерело). `false`: вимкнено. Шаблони рядків/функцій генерують файли за мовами. Об'єкт за мовами: кожна мова відповідає своєму шаблону; `false` пропускає цю мову. Включення змінної `{{locale}}` активує генерацію за мовами. `fill` на рівні словника завжди має пріоритет над цією глобальною конфігурацією. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Контролює спосіб імпорту словників. За замовчуванням: `'static'`                                                 | `'dynamic'`        | `'static'`: Статично імпортується. `'dynamic'`: Динамічно імпортується через 'Suspense'. `'fetch'`: Динамічно отримується через 'Live Sync API'. Не впливає на `getIntlayer`, `getDictionary`, `useDictionary` тощо.                                                                                                                                               |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Де зберігаються словники. За замовчуванням: `'local'`                                                            | `'remote'`         | `'local'`: файлова система. `'remote'`: Intlayer CMS. `'hybrid'`: обидва.                                                                                                                                                                                                                                                                                          |
| `contentAutoTransformation` | `boolean`                                                                                       | Чи повинні файли контенту автоматично трансформуватися (наприклад, з Markdown в HTML). За замовчуванням: `false` | `true`             | Корисно для обробки полів Markdown через @intlayer/markdown.                                                                                                                                                                                                                                                                                                       |

**Приклад `fill`**:

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

### Конфігурація AI (AI Configuration)

Визначає налаштування для функцій Intlayer на базі AI, таких як переклад при збірці.

| Поле                 | Тип                    | Опис                                                                      | Приклад                                     | Примітка                                                                                           |
| -------------------- | ---------------------- | ------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Провайдер AI для використання.                                            | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                                    |
| `model`              | `string`               | Модель AI для використання.                                               | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                                    |
| `apiKey`             | `string`               | API ключ для вибраного провайдера.                                        | `process.env.OPENAI_API_KEY`                |                                                                                                    |
| `applicationContext` | `string`               | Додатковий контекст про ваш додаток для покращення точності перекладу AI. | `'Навчальна платформа для дітей.'`          |                                                                                                    |
| `baseURL`            | `string`               | Необов'язковий URL базового шляху для API-викликів.                       |                                             | Корисно, якщо ви використовуєте проксі або локальне розгортання AI.                                |
| `dataSerialization`  | `'json' &#124; 'toon'` | Визначає, як надсилати дані до AI. За замовчуванням: `'json'`             | `'json'`                                    | `'json'`: більш надійно та точно. `'toon'`: споживає менше токенів, але може бути менш стабільним. |

---

### Конфігурація збірки (Build Configuration)

Налаштування процесу збірки та оптимізації Intlayer.

| Поле           | Тип                      | Опис                                                                                                                           | Приклад | Примітка |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------- | -------- |
| `mode`         | `'auto' &#124; 'manual'` | Визначає, чи повинен Intlayer запускатися автоматично під час етапів pre-build додатка. За замовчуванням: `'auto'`             |         |          |
| `optimize`     | `boolean`                | Визначає, чи повинні скомпільовані словники бути оптимізовані для рантайму. За замовчуванням: `true` у продуктовому середовищі |         |          |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Формат виводу для згенерованих файлів словника. За замовчуванням: `['cjs', 'esm']`                                             |         |          |
| `checkTypes`   | `boolean`                | Визначає, чи має Intlayer перевіряти типи в згенерованих файлах. За замовчуванням: `false`                                     |         |          |

---

### Системна конфігурація (System Configuration)

Ці налаштування призначені для розширених випадків використання та внутрішньої конфігурації Intlayer.

| Поле                      | Тип      | Опис                                              | За замовчуванням                  |
| ------------------------- | -------- | ------------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Директорія скомпільованих словників.              | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Директорія для розширення модулів TypeScript.     | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Директорія незлитих словників.                    | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Директорія згенерованих типів.                    | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Директорія основного файлу Intlayer.              | `'.intlayer/main'`                |
| `configDir`               | `string` | Директорія скомпільованих конфігураційних файлів. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Директорія кеш-файлів.                            | `'.intlayer/cache'`               |

---

### Конфігурація компілятора (Compiler Configuration)

Налаштування компілятора Intlayer (`intlayer compiler`).

| Поле                  | Тип                      | Опис                                                                                  | За замовчуванням |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------- | ---------------- |
| `enabled`             | `boolean`                | Визначає, чи активний компілятор.                                                     | `false`          |
| `output`              | `string &#124; Function` | Шлях виводу для витягнутих словників.                                                 |                  |
| `saveComponents`      | `boolean`                | Визначає, чи слід перезаписувати оригінальні вихідні файли трансформованими версіями. | `false`          |
| `noMetadata`          | `boolean`                | Якщо `true`, компілятор не включатиме метадані у згенеровані файли.                   | `false`          |
| `dictionaryKeyPrefix` | `string`                 | Необов'язковий префікс ключа словника.                                                | `''`             |

---

### Конфігурація логера (Logger Configuration)

Налаштування для кастомізації виводу логів Intlayer.

| Поле     | Тип                                            | Опис                           | За замовчуванням |
| -------- | ---------------------------------------------- | ------------------------------ | ---------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Режим логування.               | `'default'`      |
| `prefix` | `string`                                       | Префікс повідомлень логування. | `'[intlayer]'`   |

---

### Користувацькі схеми (Custom Schemas)

| Поле      | Тип                         | Опис                                                                  |
| --------- | --------------------------- | --------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Дозволяє визначати Zod-схеми для валідації структури ваших словників. |

---

### Плагіни (Plugins)

| Поле      | Тип                | Опис                                    |
| --------- | ------------------ | --------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Список плагінів Intlayer для активації. |
