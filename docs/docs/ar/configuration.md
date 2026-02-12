---
createdAt: 2024-08-13
updatedAt: 2026-02-12
title: التهيئة
description: تعلّم كيفية تهيئة Intlayer لتطبيقك. فهم الإعدادات والخيارات المختلفة المتاحة لتخصيص Intlayer حسب احتياجاتك.
keywords:
  - التهيئة
  - الإعدادات
  - التخصيص
  - Intlayer
  - الخيارات
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.0.6
    date: 2026-02-12
    changes: Add support for Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face, and Together.ai providers
  - version: 8.0.5
    date: 2026-02-06
    changes: إضافة `dataSerialization` إلى تكوين الذكاء الاصطناعي
  - version: 8.0.0
    date: 2026-01-22
    changes: Move `importMode` build configuration to `dictionary` configuration.
  - version: 8.0.0
    date: 2026-01-18
    changes: فصل تكوين النظام عن تكوين المحتوى. نقل المسارات الداخلية إلى خاصية `system`. إضافة `codeDir` لفصل ملفات المحتوى عن تحويل الكود.
  - version: 8.0.0
    date: 2026-01-18
    changes: إضافة خيارات القاموس `location` و `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: إضافة دعم لتنسيقات ملفات JSON5 و JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: إضافة خيار `buildMode`
  - version: 6.0.0
    date: 2025-09-16
    changes: إضافة وضع الاستيراد `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: استبدال حقل `hotReload` بـ `liveSync` وإضافة حقلي `liveSyncPort` و `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: استبدال `activateDynamicImport` بخيار `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: تغيير الدليل الافتراضي للمحتوى من `['src']` إلى `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: إضافة أوامر `docs`
---

# وثائق تهيئة Intlayer

## نظرة عامة

تتيح ملفات تهيئة Intlayer تخصيص جوانب مختلفة من الإضافة، مثل التدويل، والوسائط الوسيطة، والتعامل مع المحتوى. يوفر هذا المستند وصفًا تفصيليًا لكل خاصية في التهيئة.

---

## جدول المحتويات

<TOC/>

---

## دعم ملفات التهيئة

يدعم Intlayer تنسيقات ملفات التهيئة JSON و JS و MJS و TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## مثال على ملف التهيئة

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
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
    storage: "cookie",

    /**
     * Base path for the application URLs.
     * Default: ""
     */
    basePath: "",

    /**
     * Custom URL rewriting rules for locale-specific paths.
     */
    rewrite: {
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
    },
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
     * Default: true
     */
    enabled: true,

    /**
     * URL of your application for origin validation.
     * Default: "*"
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
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Pattern to traverse the code to optimize.
     */
    transformPattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],

    /**
     * Pattern to exclude from the optimization.
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * Output directory for the optimized dictionaries.
     */
    outputDir: "compiler",
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
```

## مرجع التهيئة

تصف الأقسام التالية إعدادات التهيئة المختلفة المتاحة لـ Intlayer.

---

### تهيئة التدويل

تعريف الإعدادات المتعلقة بالتدويل، بما في ذلك اللغات المتاحة واللغة الافتراضية للتطبيق.

#### الخصائص

- **locales**:
  - _النوع_: `string[]`
  - _الافتراضي_: `['en']`
  - _الوصف_: قائمة اللغات المدعومة في التطبيق.
  - _مثال_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _النوع_: `string[]`
  - _الافتراضي_: `[]`
  - _الوصف_: قائمة اللغات المطلوبة في التطبيق.
  - _مثال_: `[]`
  - _ملاحظة_: إذا كانت فارغة، فكل اللغات مطلوبة في وضع `strict`.
  - _ملاحظة_: تأكد من أن اللغات المطلوبة معرفة أيضًا في حقل `locales`.
- **strictMode**:
  - _النوع_: `string`
  - _الافتراضي_: `inclusive`
  - _الوصف_: ضمان تنفيذ قوي للمحتوى الدولي باستخدام typescript.
  - _ملاحظة_: إذا تم تعيينها إلى "strict"، فإن دالة الترجمة `t` ستتطلب تعريف كل اللغات المعلنة. إذا كانت لغة مفقودة، أو إذا لم يتم إعلان لغة في التهيئة الخاصة بك، فسيتم رمي خطأ.
  - _ملاحظة_: إذا تم تعيينها إلى "inclusive"، فإن دالة الترجمة `t` ستتطلب تعريف كل اللغات المعلنة. إذا كانت لغة مفقودة، فستصدر تحذيرًا. لكنها ستقبل إذا كانت اللغة غير معلنة في التهيئة الخاصة بك، لكنها موجودة.
  - _ملاحظة_: إذا تم تعيينها إلى "loose"، فإن دالة الترجمة `t` ستقبل أي لغة موجودة.

- **defaultLocale**:
  - _النوع_: `string`
  - _الافتراضي_: `'en'`
  - _الوصف_: اللغة الافتراضية المستخدمة كخيار احتياطي إذا لم يتم العثور على اللغة المطلوبة.
  - _مثال_: `'en'`
  - _ملاحظة_: يُستخدم هذا لتحديد اللغة عندما لا يتم تحديد أي لغة في عنوان URL أو ملف تعريف الارتباط أو الرأس.

---

### تكوين المحرر

يحدد الإعدادات المتعلقة بالمحرر المتكامل، بما في ذلك منفذ الخادم وحالة التفعيل.

#### الخصائص

- **applicationURL**:
  - _النوع_: `string`
  - _الافتراضي_: `http://localhost:3000`
  - _الوصف_: عنوان URL الخاص بالتطبيق. يُستخدم لتقييد أصل المحرر لأسباب أمنية.
  - _مثال_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _ملاحظة_: عنوان URL الخاص بالتطبيق. يُستخدم لتقييد أصل المحرر لأسباب أمنية. إذا تم تعيينه إلى `'*'`، يكون المحرر متاحًا من أي أصل.

- **port**:
  - _النوع_: `number`
  - _الافتراضي_: `8000`
  - _الوصف_: المنفذ المستخدم من قبل خادم المحرر المرئي.

- **editorURL**:
  - _النوع_: `string`
  - _الافتراضي_: `'http://localhost:8000'`
  - _الوصف_: عنوان URL الخاص بخادم المحرر. يُستخدم لتقييد أصل المحرر لأسباب أمنية.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _ملاحظة_: عنوان URL الخاص بخادم المحرر الذي يتم الوصول إليه من التطبيق. يُستخدم لتقييد الأصول التي يمكنها التفاعل مع التطبيق لأسباب أمنية. إذا تم تعيينه إلى `'*'`، يكون المحرر متاحًا من أي أصل. يجب تعيينه إذا تم تغيير المنفذ، أو إذا كان المحرر مستضافًا على نطاق مختلف.

- **cmsURL**:
  - _النوع_: `string`
  - _الافتراضي_: `'https://intlayer.org'`
  - _الوصف_: عنوان URL الخاص بنظام إدارة المحتوى Intlayer.
  - _مثال_: `'https://intlayer.org'`
  - _ملاحظة_: عنوان URL الخاص بنظام إدارة المحتوى Intlayer.

- **backendURL**:
  - _النوع_: `string`
  - _الافتراضي_: `https://back.intlayer.org`
  - _الوصف_: عنوان URL الخاص بخادم الواجهة الخلفية.
  - _مثال_: `http://localhost:4000`

- **enabled**:
  - _النوع_: `boolean`
  - _الافتراضي_: `true`
  - _الوصف_: يشير إلى ما إذا كان التطبيق يتفاعل مع المحرر المرئي.
  - _مثال_: `process.env.NODE_ENV !== 'production'`
  - _ملاحظة_: إذا كانت القيمة صحيحة، سيتمكن المحرر من التفاعل مع التطبيق. إذا كانت خاطئة، فلن يتمكن المحرر من التفاعل مع التطبيق. في جميع الأحوال، يمكن تمكين المحرر فقط من خلال المحرر المرئي. تعطيل المحرر لبيئات محددة هو وسيلة لتعزيز الأمان.

- **clientId**:
  - _النوع_: `string` | `undefined`
  - _الافتراضي_: `undefined`
  - _الوصف_: يسمح كل من clientId و clientSecret لحزم intlayer بالمصادقة مع الخادم الخلفي باستخدام مصادقة oAuth2. يتم استخدام رمز وصول للمصادقة على المستخدم المرتبط بالمشروع. للحصول على رمز وصول، انتقل إلى https://app.intlayer.org/project وأنشئ حسابًا.
  - _مثال_: `true`
  - _ملاحظة_: مهم: يجب الحفاظ على سرية clientId و clientSecret وعدم مشاركتهما علنًا. يرجى التأكد من الاحتفاظ بهما في مكان آمن، مثل متغيرات البيئة.

- **clientSecret**:
  - _النوع_: `string` | `undefined`
  - _الافتراضي_: `undefined`
  - _الوصف_: يسمح كل من clientId و clientSecret لحزم intlayer بالمصادقة مع الخادم الخلفي باستخدام مصادقة oAuth2. يتم استخدام رمز وصول للمصادقة على المستخدم المرتبط بالمشروع. للحصول على رمز وصول، انتقل إلى https://app.intlayer.org/project وأنشئ حسابًا.
  - _مثال_: `true`
  - _ملاحظة_: مهم: يجب الحفاظ على سرية clientId و clientSecret وعدم مشاركتهما علنًا. يرجى التأكد من الاحتفاظ بهما في مكان آمن، مثل متغيرات البيئة.

- **dictionaryPriorityStrategy**:
  - _النوع_: `string`
  - _الافتراضي_: `'local_first'`
  - _الوصف_: الاستراتيجية لتحديد أولوية القواميس في حالة وجود كل من القواميس المحلية والقواميس البعيدة. إذا تم تعيينها إلى `'distant_first'`، ستعطي التطبيق أولوية للقواميس البعيدة على القواميس المحلية. إذا تم تعيينها إلى `'local_first'`، ستعطي التطبيق أولوية للقواميس المحلية على القواميس البعيدة.
  - _مثال_: `'distant_first'`

- **liveSync**:
  - _النوع_: `boolean`
  - _الافتراضي_: `false`
  - _الوصف_: يشير إلى ما إذا كان يجب على خادم التطبيق إعادة تحميل محتوى التطبيق تلقائيًا عند اكتشاف تغيير في نظام إدارة المحتوى / المحرر المرئي / الخلفية.
  - _مثال_: `true`
  - _ملاحظة_: على سبيل المثال، عندما يتم إضافة قاموس جديد أو تحديثه، سيقوم التطبيق بتحديث المحتوى ليتم عرضه في الصفحة.
  - _ملاحظة_: تحتاج المزامنة الحية إلى تعريض محتوى التطبيق على خادم آخر. هذا يعني أنه قد يؤثر قليلاً على أداء التطبيق. للحد من ذلك، نوصي باستضافة التطبيق وخادم المزامنة الحية على نفس الجهاز. أيضًا، يمكن أن يؤدي الجمع بين المزامنة الحية و`optimize` إلى تطبيق عدد كبير من الطلبات على خادم المزامنة الحية. اعتمادًا على البنية التحتية الخاصة بك، نوصي باختبار كلا الخيارين وتركيبتهما.

- **liveSyncPort**:
  - _النوع_: `number`
  - _الافتراضي_: `4000`
  - _الوصف_: منفذ خادم المزامنة الحية.
  - _مثال_: `4000`
  - _ملاحظة_: منفذ خادم المزامنة الحية.

- **liveSyncURL**:
  - _النوع_: `string`
  - _الافتراضي_: `'http://localhost:{liveSyncPort}'`
  - _الوصف_: عنوان URL الخاص بخادم المزامنة الحية.
  - _مثال_: `'https://example.com'`
  - _ملاحظة_: يشير إلى localhost بشكل افتراضي ولكن يمكن تغييره إلى أي عنوان URL في حالة وجود خادم مزامنة حية عن بُعد.

### تكوين الوسيط

الإعدادات التي تتحكم في سلوك الوسيط، بما في ذلك كيفية تعامل التطبيق مع ملفات تعريف الارتباط، والرؤوس، والبادئات في عناوين URL لإدارة اللغة.

#### الخصائص

- **headerName**:
  - _النوع_: `string`
  - _الافتراضي_: `'x-intlayer-locale'`
  - _الوصف_: اسم رأس HTTP المستخدم لتحديد اللغة.
  - _مثال_: `'x-custom-locale'`
  - _ملاحظة_: هذا مفيد لتحديد اللغة بناءً على واجهة برمجة التطبيقات (API).

- **cookieName**:
  - _النوع_: `string`
  - _الافتراضي_: `'intlayer-locale'`
  - _الوصف_: اسم ملف تعريف الارتباط المستخدم لتخزين اللغة.
  - _مثال_: `'custom-locale'`
  - _ملاحظة_: يُستخدم للحفاظ على اللغة عبر الجلسات.

- **prefixDefault**:
  - _النوع_: `boolean`
  - _الافتراضي_: `false`
  - _الوصف_: ما إذا كان يجب تضمين اللغة الافتراضية في عنوان URL.
  - _مثال_: `true`
  - _ملاحظة_:
    - إذا كانت القيمة `true` و `defaultLocale = 'en'`: المسار = `/en/dashboard` أو `/fr/dashboard`
    - إذا كانت القيمة `false` و `defaultLocale = 'en'`: المسار = `/dashboard` أو `/fr/dashboard`

- **basePath**:
  - _النوع_: `string`
  - _الافتراضي_: `''`
  - _الوصف_: المسار الأساسي لعناوين URL الخاصة بالتطبيق.
  - _مثال_: `'/my-app'`
  - _ملاحظة_:
    - إذا كان التطبيق مستضافًا على `https://example.com/my-app`
    - يكون المسار الأساسي هو `'/my-app'`
    - سيكون عنوان URL هو `https://example.com/my-app/en`
    - إذا لم يتم تعيين المسار الأساسي، سيكون عنوان URL هو `https://example.com/en`

- **rewrite**:
  - _النوع_: `Record<string, StrictModeLocaleMap<string>>`
  - _الافتراضي_: `undefined`
  - _الوصف_: قواعد إعادة كتابة URL المخصصة التي تتجاوز وضع التوجيه الافتراضي لمسارات محددة. يسمح بتعريف مسارات محددة حسب اللغة تختلف عن سلوك التوجيه القياسي. يدعم معاملات المسار الديناميكية باستخدام بناء الجملة `[param]`.
  - _مثال_:
    ```typescript
    routing: {
      mode: "prefix-no-default", // استراتيجية احتياطية
      rewrite: {
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
      },
    }
    ```
  - _ملاحظة_: قواعد إعادة الكتابة لها الأولوية على سلوك `mode` الافتراضي. إذا تطابق مسار مع قاعدة إعادة كتابة، سيتم استخدام المسار المترجم من تكوين إعادة الكتابة بدلاً من بادئة اللغة القياسية.
  - _ملاحظة_: معاملات المسار الديناميكية مدعومة باستخدام ترميز الأقواس (على سبيل المثال، `[slug]`، `[id]`). يتم استخراج قيم المعاملات تلقائيًا من URL وإدراجها في المسار المعاد كتابته.
  - _ملاحظة_: يعمل مع تطبيقات Next.js و Vite. ستعيد البرمجية الوسيطة/الوكيل كتابة الطلبات الواردة تلقائيًا لتطابق بنية المسار الداخلية.
  - _ملاحظة_: عند إنشاء عناوين URL باستخدام `getLocalizedUrl()`، يتم تطبيق قواعد إعادة الكتابة تلقائيًا إذا تطابقت مع المسار المقدم.

- **serverSetCookie**:
  - _النوع_: `string`
  - _الافتراضي_: `'always'`
  - _الوصف_: قاعدة تعيين ملف تعريف الارتباط للغة على الخادم.
  - _الخيارات_: `'always'`، `'never'`
  - _مثال_: `'never'`
  - _ملاحظة_: تتحكم فيما إذا كان يتم تعيين ملف تعريف الارتباط للغة عند كل طلب أو لا يتم تعيينه أبدًا.

- **noPrefix**:
  - _النوع_: `boolean`
  - _الافتراضي_: `false`
  - _الوصف_: ما إذا كان يجب حذف بادئة اللغة من عناوين URL.
  - _مثال_: `true`
  - _ملاحظة_:
    - إذا كانت القيمة `true`: لا توجد بادئة في عنوان URL
    - إذا كانت القيمة `false`: توجد بادئة في عنوان URL
    - مثال مع `basePath = '/my-app'`:
      - إذا كانت `noPrefix = false`: سيكون عنوان URL هو `https://example.com/my-app/en`
      - إذا كانت `noPrefix = true`: سيكون عنوان URL هو `https://example.com`

---

### تكوين المحتوى

إعدادات تتعلق بمعالجة المحتوى داخل التطبيق، بما في ذلك أسماء الدلائل، امتدادات الملفات، والتكوينات المشتقة.

#### الخصائص

- **autoFill**:
  - _النوع_: `boolean | string | { [key in Locales]?: string }`
  - _الافتراضي_: `undefined`
  - _الوصف_: يشير إلى كيفية ملء المحتوى تلقائيًا باستخدام الذكاء الاصطناعي. يمكن الإعلان عنه عالميًا في ملف `intlayer.config.ts`.
  - _مثال_: true
  - _مثال_: `'./{{fileName}}.content.json'`
  - _مثال_: `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _ملاحظة_: تكوين الملء التلقائي. يمكن أن يكون:
    - boolean: تمكين الملء التلقائي لجميع اللغات
    - string: مسار إلى ملف واحد أو قالب مع متغيرات
    - object: مسارات ملفات لكل لغة

- **watch**:
  - _النوع_: `boolean`
  - _الافتراضي_: `process.env.NODE_ENV === 'development'`
  - _الوصف_: يشير إلى ما إذا كان يجب على Intlayer مراقبة التغييرات في ملفات إعلان المحتوى داخل التطبيق لإعادة بناء القواميس ذات الصلة.

- **fileExtensions**:
  - _النوع_: `string[]`
  - _الافتراضي_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _الوصف_: امتدادات الملفات التي يجب البحث عنها عند بناء القواميس.
  - _مثال_: `['.data.ts', '.data.js', '.data.json']`
  - _ملاحظة_: تخصيص امتدادات الملفات يمكن أن يساعد في تجنب التعارضات.

- **baseDir**:
  - _النوع_: `string`
  - _الافتراضي_: `process.cwd()`
  - _الوصف_: الدليل الأساسي للمشروع.
  - _مثال_: `'/path/to/project'`
  - _ملاحظة_: يُستخدم هذا لحل جميع الدلائل المتعلقة بـ Intlayer.

- **dictionaryOutput**:
  - _النوع_: `string[]`
  - _الافتراضي_: `['intlayer']`
  - _الوصف_: نوع إخراج القاموس المستخدم، مثل `'intlayer'` أو `'i18next'`.

- **contentDir**:
  - _النوع_: `string[]`
  - _الافتراضي_: `['.']`
  - _مثال_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _الوصف_: مسار الدليل حيث يتم تخزين ملفات تعريف المحتوى (`.content.*`).
  - _ملاحظة_: يُستخدم هذا لمراقبة ملفات المحتوى لإعادة بناء القواميس.

- **codeDir**:
  - _النوع_: `string[]`
  - _الافتراضي_: `['.']`
  - _مثال_: `['src', '../../ui-library']`
  - _الوصف_: مسار الدليل حيث يتم تخزين الكود، بالنسبة إلى الدليل الأساسي.
  - _ملاحظة_: يُستخدم هذا لمراقبة ملفات الكود للتحويل (التقليم، التحسين). يمكن أن يؤدي الحفاظ على هذا منفصلاً عن `contentDir` إلى تحسين أداء البناء من خلال تجنب عمليات المسح غير الضرورية لملفات المحتوى.

- **dictionariesDir**:
  - _النوع_: `string`
  - _الافتراضي_: `'.intlayer/dictionaries'`
  - _الوصف_: مسار الدليل لتخزين النتائج الوسيطة أو الناتجة.

- **moduleAugmentationDir**:
  - _النوع_: `string`
  - _الافتراضي_: `'.intlayer/types'`
  - _الوصف_: دليل لتوسيع الوحدات، مما يسمح بتحسين اقتراحات IDE وفحص الأنواع.
  - _مثال_: `'intlayer-types'`
  - _ملاحظة_: تأكد من تضمين هذا في `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _النوع_: `string`
  - _الافتراضي_: `'.intlayer/unmerged_dictionary'`
  - _الوصف_: الدليل لتخزين القواميس غير المدمجة.
  - _مثال_: `'translations'`

- **dictionariesDir**:
  - _النوع_: `string`
  - _الافتراضي_: `'.intlayer/dictionary'`
  - _الوصف_: الدليل لتخزين قواميس التوطين.
  - _مثال_: `'translations'`

- **i18nextResourcesDir**:
  - _النوع_: `string`
  - _الافتراضي_: `'i18next_dictionary'`
  - _الوصف_: الدليل لتخزين قواميس i18n.
  - _مثال_: `'translations'`
  - _ملاحظة_: تأكد من تكوين هذا الدليل لنوع الإخراج i18next.

- **typesDir**:
  - _النوع_: `string`
  - _الافتراضي_: `'types'`
  - _الوصف_: الدليل لتخزين أنواع القواميس.
  - _مثال_: `'intlayer-types'`

- **mainDir**:
  - _النوع_: `string`
  - _الافتراضي_: `'main'`
  - _الوصف_: الدليل الذي تُخزن فيه ملفات التطبيق الرئيسية.
  - _مثال_: `'intlayer-main'`

- **excludedPath**:
  - _النوع_: `string[]`
  - _الافتراضي_: `['node_modules']`
  - _الوصف_: الأدلة المستبعدة من البحث في المحتوى.
  - _ملاحظة_: هذا الإعداد غير مستخدم حالياً، لكنه مخطط لتطبيقه في المستقبل.

### تكوين القاموس

الإعدادات التي تتحكم في عمليات القاموس، بما في ذلك سلوك التعبئة التلقائية وإنشاء المحتوى.

يخدم تكوين القاموس هذا غرضين رئيسيين:

1. **القيم الافتراضية**: تحديد القيم الافتراضية عند إنشاء ملفات إعلان المحتوى
2. **سلوك الاحتياطي**: توفير قيم احتياطية عندما لا تكون الحقول المحددة معرّفة، مما يسمح لك بتعريف سلوك عمليات القاموس بشكل عام

لمزيد من المعلومات حول ملفات إعلان المحتوى وكيفية تطبيق قيم التكوين، راجع [وثائق ملف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

#### الخصائص

- **fill**
- **description**
- **locale**
- **location**
- **importMode**:
  - _Note_: **Deprecated**: Use `dictionary.importMode` instead.
  - _Type_: `'static' | 'dynamic' | 'fetch'`
  - _Default_: `'static'`
  - _Description_: Controls how dictionaries are imported.
  - _Example_: `'dynamic'`
- **priority**
- **live**
- **schema**
- **title**
- **tags**
- **version**

---

### إعدادات المسجل (Logger)

الإعدادات التي تتحكم في المسجل، بما في ذلك البادئة التي تُستخدم.

#### الخصائص

- **mode**:
  - _النوع_: `string`
  - _الافتراضي_: `default`
  - _الوصف_: يشير إلى وضع المسجل.
  - _الخيارات_: `default`، `verbose`، `disabled`
  - _مثال_: `default`
  - _ملاحظة_: وضع المسجل. الوضع المفصل (verbose) يسجل معلومات أكثر، ويمكن استخدامه لأغراض التصحيح. الوضع المعطل (disabled) يعطل المسجل.

- **prefix**:
  - _النوع_: `string`
  - _الافتراضي_: `'[intlayer] '`
  - _الوصف_: بادئة المسجل.
  - _مثال_: `'[my custom prefix] '`
  - _ملاحظة_: بادئة المسجل.

### تكوين الذكاء الاصطناعي

الإعدادات التي تتحكم في ميزات الذكاء الاصطناعي في Intlayer، بما في ذلك المزود، النموذج، ومفتاح API.

هذا التكوين اختياري إذا كنت مسجلاً في [لوحة تحكم Intlayer](https://app.intlayer.org/project) باستخدام مفتاح وصول. ستدير Intlayer تلقائيًا الحل الأكثر كفاءة وفعالية من حيث التكلفة لاحتياجاتك في الذكاء الاصطناعي. يضمن استخدام الخيارات الافتراضية صيانة أفضل على المدى الطويل حيث تقوم Intlayer بالتحديث المستمر لاستخدام النماذج الأكثر ملاءمة.

إذا كنت تفضل استخدام مفتاح API الخاص بك أو نموذج معين، يمكنك تعريف تكوين الذكاء الاصطناعي المخصص الخاص بك.
سيتم استخدام تكوين الذكاء الاصطناعي هذا على مستوى بيئة Intlayer الخاصة بك بشكل عام. ستستخدم أوامر CLI هذه الإعدادات كقيم افتراضية للأوامر (مثل `fill`)، وكذلك SDK، والمحرر المرئي، ونظام إدارة المحتوى (CMS). يمكنك تجاوز هذه القيم الافتراضية لحالات استخدام محددة باستخدام معلمات الأوامر.

يدعم Intlayer عدة مزودي ذكاء اصطناعي لزيادة المرونة والاختيار. المزودون المدعومون حاليًا هم:

- **OpenAI** (الافتراضي)
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
- **Google Vertex**
- **Together.ai**

#### الخصائص

- **provider**:
  - _النوع_: `string`
  - _الافتراضي_: `'openai'`
  - _الوصف_: المزود المستخدم لميزات الذكاء الاصطناعي في Intlayer.
  - _الخيارات_:`'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`, `'openrouter'`, `'alibaba'`, `'fireworks'`, `'groq'`, `'huggingface'`, `'bedrock'`, `'googlevertex'``'togetherai'`
  - _مثال_: `'anthropic'`
  - _ملاحظة_: قد تتطلب مزودات مختلفة مفاتيح API مختلفة ولها نماذج تسعير مختلفة.

- **model**:
  - _النوع_: `string`
  - _الافتراضي_: لا شيء
  - _الوصف_: النموذج المستخدم لميزات الذكاء الاصطناعي في Intlayer.
  - _مثال_: `'gpt-4o-2024-11-20'`
  - _ملاحظة_: يختلف النموذج المحدد المستخدم حسب المزود.

- **temperature**:
  - _النوع_: `number`
  - _الافتراضي_: لا شيء
  - _الوصف_: تتحكم درجة الحرارة في عشوائية استجابات الذكاء الاصطناعي.
  - _مثال_: `0.1`
  - _ملاحظة_: درجة حرارة أعلى تجعل الذكاء الاصطناعي أكثر إبداعًا وأقل قابلية للتنبؤ.

- **apiKey**:
  - _النوع_: `string`
  - _الافتراضي_: لا شيء
  - _الوصف_: مفتاح API الخاص بك للمزود المحدد.
  - _مثال_: `process.env.OPENAI_API_KEY`
  - _ملاحظة_: مهم: يجب الحفاظ على سرية مفاتيح API وعدم مشاركتها علنًا. يرجى التأكد من الاحتفاظ بها في مكان آمن، مثل متغيرات البيئة.

- **applicationContext**:
  - _النوع_: `string`
  - _الافتراضي_: لا شيء
  - _الوصف_: يوفر سياقًا إضافيًا حول تطبيقك لنموذج الذكاء الاصطناعي، مما يساعده على توليد ترجمات أكثر دقة وملاءمة للسياق. يمكن أن يشمل ذلك معلومات حول مجال تطبيقك، الجمهور المستهدف، النغمة، أو المصطلحات الخاصة.

- **baseURL**:
  - _النوع_: `string`
  - _الافتراضي_: لا شيء
  - _الوصف_: عنوان URL الأساسي لواجهة برمجة تطبيقات الذكاء الاصطناعي.
  - _مثال_: `'https://api.openai.com/v1'`
  - _ملاحظة_: يمكن استخدامه للإشارة إلى نقطة نهاية واجهة برمجة تطبيقات الذكاء الاصطناعي المحلية أو المخصصة.

- **dataSerialization**:
  - _النوع_: `'json' | 'toon'`
  - _الافتراضي_: `'json'`
  - _الوصف_: تنسيق تسلسل البيانات لاستخدامه في ميزات الذكاء الاصطناعي لـ Intlayer.
  - _مثال_: `'toon'`
  - _ملاحظة_: `json`: قياسي وموثوق؛ يستهلك رموزًا أكثر. `toon`: رموز أقل، ولكنه أقل اتساقًا من JSON.

### إعدادات البناء

الإعدادات التي تتحكم في كيفية تحسين Intlayer وبناء التدويل في تطبيقك.

تنطبق خيارات البناء على الإضافات `@intlayer/babel` و `@intlayer/swc`.

> في وضع التطوير، يستخدم Intlayer الاستيراد الثابت للقواميس لتبسيط تجربة التطوير.

> عند التهيئة للتحسين، سيقوم Intlayer باستبدال استدعاءات القواميس لتحسين تقسيم الحزم، بحيث يقوم الحزمة النهائية باستيراد القواميس التي يتم استخدامها فقط.

#### الخصائص

- **mode**:
  - _النوع_: `'auto' | 'manual'`
  - _الافتراضي_: `'auto'`
  - _الوصف_: يتحكم في وضع البناء.
  - _المثال_: `'manual'`
  - _ملاحظة_: إذا كان 'auto'، سيتم تفعيل البناء تلقائيًا عند بناء التطبيق.
  - _ملاحظة_: إذا كان 'manual'، سيتم تعيين البناء فقط عند تنفيذ أمر البناء.
  - _ملاحظة_: يمكن استخدامه لتعطيل بناء القواميس، على سبيل المثال عندما يجب تجنب التنفيذ في بيئة Node.js.

- **optimize**:
  - _النوع_: `boolean`
  - _الافتراضي_: `process.env.NODE_ENV === 'production'`
  - _الوصف_: يتحكم فيما إذا كان يجب تحسين عملية البناء.
  - _المثال_: `true`
  - _ملاحظة_: عند التفعيل، سيقوم Intlayer باستبدال جميع استدعاءات القواميس لتحسين تقسيم الحزم. بهذه الطريقة، ستقوم الحزمة النهائية باستيراد القواميس المستخدمة فقط. ستبقى جميع الاستيرادات استيرادًا ثابتًا لتجنب المعالجة غير المتزامنة عند تحميل القواميس.
  - _ملاحظة_: سيقوم Intlayer باستبدال جميع استدعاءات `useIntlayer` بالنمط المحدد بواسطة خيار `importMode` و`getIntlayer` بـ `getDictionary`.
  - _ملاحظة_: يعتمد هذا الخيار على الإضافات `@intlayer/babel` و `@intlayer/swc`.
  - _ملاحظة_: تأكد من إعلان جميع المفاتيح بشكل ثابت في استدعاءات `useIntlayer`، على سبيل المثال `useIntlayer('navbar')`.

- **importMode**:
  - _Note_: **Deprecated**: Use `dictionary.importMode` instead.
  - _النوع_: `'static' | 'dynamic' | 'fetch'`
  - _الافتراضي_: `'static'`
  - _الوصف_: يتحكم في كيفية استيراد القواميس.
  - _مثال_: `'dynamic'`
  - _ملاحظة_: الأنماط المتاحة:
    - "static": يتم استيراد القواميس بشكل ثابت. يستبدل `useIntlayer` بـ `useDictionary`.
    - "dynamic": يتم استيراد القواميس بشكل ديناميكي باستخدام Suspense. يستبدل `useIntlayer` بـ `useDictionaryDynamic`.
- "fetch": يتم جلب القواميس ديناميكيًا باستخدام واجهة برمجة التطبيقات للمزامنة الحية. يستبدل `useIntlayer` بـ `useDictionaryFetch`.
- _ملاحظة_: تعتمد الاستيرادات الديناميكية على Suspense وقد تؤثر قليلاً على أداء العرض.
- _ملاحظة_: إذا تم تعطيلها، سيتم تحميل جميع اللغات مرة واحدة، حتى لو لم تُستخدم.
- _ملاحظة_: تعتمد هذه الخيار على الإضافات `@intlayer/babel` و `@intlayer/swc`.
- _ملاحظة_: تأكد من إعلان جميع المفاتيح بشكل ثابت في استدعاءات `useIntlayer`، مثل `useIntlayer('navbar')`.
- _ملاحظة_: سيتم تجاهل هذا الخيار إذا تم تعطيل `optimize`.
  - _ملاحظة_: إذا تم تعيينه إلى "live"، فسيتم تحويل القواميس التي تحتوي على محتوى عن بُعد والمحددة كعلامات "live" فقط إلى وضع البث المباشر. وسيتم استيراد القواميس الأخرى ديناميكيًا كـ "dynamic" لتحسين عدد استعلامات الجلب وأداء التحميل.
  - _ملاحظة_: سيستخدم وضع البث المباشر واجهة برمجة التطبيقات للمزامنة الحية لجلب القواميس. إذا فشل استدعاء واجهة برمجة التطبيقات، فسيتم استيراد القواميس ديناميكيًا كـ "dynamic".
  - _ملاحظة_: لن تؤثر هذه الخيار على الدوال `getIntlayer`، `getDictionary`، `useDictionary`، `useDictionaryAsync` و `useDictionaryDynamic`.

- **traversePattern**:
  - _النوع_: `string[]`
  - _الافتراضي_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx}', '!**\/node_modules/**']`
  - _الوصف_: أنماط تحدد الملفات التي يجب استعراضها أثناء التحسين.
    - _مثال_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _ملاحظة_: استخدم هذا لتحديد التحسين لملفات الكود ذات الصلة وتحسين أداء البناء.
  - _ملاحظة_: سيتم تجاهل هذا الخيار إذا تم تعطيل `optimize`.
  - _ملاحظة_: استخدم نمط glob.
