---
createdAt: 2024-08-13
updatedAt: 2026-04-08
title: الإعدادات (Configuration)
description: تعرف على كيفية إعداد Intlayer لتطبيقك. افهم الإعدادات والخيارات المختلفة المتاحة لتخصيص Intlayer وفقًا لاحتياجاتك.
keywords:
  - الإعدادات
  - الإعداد
  - التخصيص
  - Intlayer
  - الخيارات
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "إضافة خياري `prune` و `minify` إلى إعدادات البناء"
  - version: 8.7.0
    date: 2026-04-03
    changes: "إضافة خيار `currentDomain`"
  - version: 8.4.0
    date: 2026-03-20
    changes: "إضافة تمثيل الكائن لكل لغة لـ 'compiler.output' و 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "نقل 'baseDir' من إعدادات 'content' إلى إعدادات 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "تحديث خيارات المترجم، إضافة دعم لـ 'output' و 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "تحديث خيارات المترجم"
  - version: 8.1.5
    date: 2026-02-23
    changes: "إضافة خيار المترجم 'build-only' وبادئة القاموس"
  - version: 8.0.6
    date: 2026-02-12
    changes: "إضافة دعم لمزودي Open Router و Alibaba و Amazon و Google Vertex Bedrock و Fireworks و Groq و Hugging Face و Together.ai"
  - version: 8.0.5
    date: 2026-02-06
    changes: "إضافة `dataSerialization` إلى إعدادات الذكاء الاصطناعي"
  - version: 8.0.0
    date: 2026-01-24
    changes: "تم تغيير اسم وضع الاستيراد `live` إلى `fetch` لوصف الآلية الأساسية بشكل أفضل."
  - version: 8.0.0
    date: 2026-01-22
    changes: "تم نقل إعدادات البناء `importMode` إلى إعدادات `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "إضافة خيار `rewrite` إلى إعدادات التوجيه"
  - version: 8.0.0
    date: 2026-01-18
    changes: "فصل إعدادات النظام عن إعدادات المحتوى. نقل المسارات الداخلية إلى خاصية `system`. إضافة `codeDir` لفصل ملفات المحتوى عن تحويل الكود."
  - version: 8.0.0
    date: 2026-01-18
    changes: "إضافة خيارات القاموس `location` و `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "إضافة دعم لصيغ ملفات JSON5 و JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "إضافة خيار `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "إضافة إعدادات `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "استبدال `middleware` بإعدادات `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "إضافة خيار `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "تحديث خيار `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "إضافة خيار `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "إزالة حقول `dictionaryOutput` و `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "إضافة وضع الاستيراد `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "استبدال حقل `hotReload` بـ `liveSync` وإضافة حقول `liveSyncPort` و `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "استبدال `activateDynamicImport` بخيار `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "تغيير `contentDir` الافتراضي من `['src']` إلى `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "إضافة أوامر `docs`"
---

# توثيق إعدادات Intlayer

## نظرة عامة

تسمح لك ملفات إعدادات Intlayer بتخصيص جوانب مختلفة من الإضافة، مثل تدويل التطبيق (i18n)، والبرمجيات الوسيطة (middleware)، وإدارة المحتوى. يوفر هذا المستند وصفاً مفصلاً لكل خاصية في الإعدادات.

---

## جدول المحتويات

<TOC/>

---

## دعم ملفات الإعدادات

يقبل Intlayer صيغ ملفات الإعدادات التالية: JSON، JS، MJS، و TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## مثال لملف الإعدادات

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * مثال لملف إعدادات Intlayer مع جميع الخيارات المتاحة.
 */
const config: IntlayerConfig = {
  /**
   * إعدادات التدويل (Internationalization).
   */
  internationalization: {
    /**
     * قائمة اللغات المدعومة في التطبيق.
     * الافتراضي: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * قائمة اللغات المطلوبة التي يجب تعريفها في كل قاموس.
     * إذا كانت فارغة، فستكون جميع اللغات مطلوبة في وضع `strict`.
     * الافتراضي: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * مستوى الصرامة للمحتوى المترجم.
     * - "strict": يلقي خطأ إذا كانت اللغة المعلنة مفقودة أو غير معلنة.
     * - "inclusive": يلقي تحذيراً إذا كانت اللغة المعلنة مفقودة.
     * - "loose": يقبل أي لغة موجودة.
     * الافتراضي: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * اللغة الافتراضية المستخدمة كاحتياطي في حالة عدم العثور على اللغة المطلوبة.
     * الافتراضي: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * الإعدادات التي تتحكم في عمليات القاموس والسلوك عند فقدان المحتوى.
   */
  dictionary: {
    /**
     * يتحكم في طريقة استيراد القواميس.
     * - "static": استيراد ثابت أثناء البناء.
     * - "dynamic": استيراد ديناميكي باستخدام Suspense.
     * - "fetch": جلب ديناميكي عبر Live Sync API.
     * الافتراضي: "static"
     */
    importMode: "static",

    /**
     * إستراتيجية الملء التلقائي للترجمات المفقودة باستخدام الذكاء الاصطناعي.
     * يمكن أن تكون قيمة منطقية أو نمط مسار لحفظ المحتوى المملوء.
     * الافتراضي: true
     */
    fill: true,

    /**
     * الموقع الفعلي لملفات القاموس.
     * - "local": مخزنة في نظام الملفات المحلي.
     * - "remote": مخزنة في Intlayer CMS.
     * - "hybrid": مخزنة محلياً وفي Intlayer CMS.
     * - "plugin" (أو أي سلسلة مخصصة): يتم توفيرها بواسطة إضافة أو مصدر مخصص.
     * الافتراضي: "local"
     */
    location: "local",

    /**
     * ما إذا كان سيتم تحويل المحتوى تلقائياً (مثلMarkdown إلى HTML).
     * الافتراضي: false
     */
    contentAutoTransformation: false,
  },

  /**
   * إعدادات التوجيه والبرمجيات الوسيطة.
   */
  routing: {
    /**
     * إستراتيجية التوجيه حسب اللغة.
     * - "prefix-no-default": بادئة لجميع اللغات باستثناء الافتراضية (مثلاً: /dashboard، /fr/dashboard).
     * - "prefix-all": بادئة لجميع اللغات (مثلاً: /en/dashboard، /fr/dashboard).
     * - "no-prefix": لا توجد لغة في رابط URL.
     * - "search-params": استخدام ?locale=...
     * الافتراضي: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * أين يتم تخزين اللغة التي يختارها المستخدم.
     * الخيارات: 'cookie' أو 'localStorage' أو 'sessionStorage' أو 'header' أو مصفوفة منها.
     * الافتراضي: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * المسار الأساسي لروابط التطبيق.
     * الافتراضي: ""
     */
    basePath: "",

    /**
     * قواعد إعادة كتابة رابط URL مخصصة للمسارات في لغات معينة.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * يربط اللغات بأسماء نطاقات الاستضافة للتوجيه القائم على النطاق.
     * ستكون روابط URL لهذه اللغات مطلقة (مثلاً: https://intlayer.cn/).
     * النطاق يشير إلى اللغة، لذا لا يتم إضافة بادئة لغة إلى المسار.
     * الافتراضي: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * إعدادات البحث ومعالجة ملفات المحتوى.
   */
  content: {
    /**
     * امتدادات الملفات لفحص القواميس.
     * الافتراضي: ['.content.ts', '.content.js', '.content.json', إلخ]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * المجلدات التي توجد بها ملفات .content.
     * الافتراضي: ["."]
     */
    contentDir: ["src"],

    /**
     * مجلد كود المصدر.
     * يستخدم لتحسينات البناء وتحويل الكود.
     * الافتراضي: ["."]
     */
    codeDir: ["src"],

    /**
     * الأنماط المستبعدة من الفحص.
     * الافتراضي: ['node_modules', '.intlayer', إلخ]
     */
    excludedPath: ["node_modules"],

    /**
     * ما إذا كان سيتم مراقبة التغييرات وإعادة توليد القواميس أثناء التطوير.
     * الافتراضي: true في وضع التطوير
     */
    watch: true,

    /**
     * أمر لتنسيق ملفات .content المنشأة/المحدثة حديثاً.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * إعدادات المحرر المرئي.
   */
  editor: {
    /**
     * ما إذا كان المحرر المرئي مفعلاً.
     * الافتراضي: false
     */
    enabled: true,

    /**
     * رابط تطبيقك للتحقق من المصدر (origin).
     * الافتراضي: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * المنفذ لخادم المحرر المحلي.
     * الافتراضي: 8000
     */
    port: 8000,

    /**
     * الرابط العام للمحرر.
     * الافتراضي: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * رابط Intlayer CMS.
     * الافتراضي: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * رابط خادم واجهة برمجة التطبيقات (API) الخلفي.
     * الافتراضي: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * ما إذا كان سيتم تفعيل مزامنة المحتوى في الوقت الفعلي.
     * الافتراضي: false
     */
    liveSync: true,
  },

  /**
   * إعدادات الترجمة والتوليد باستخدام الذكاء الاصطناعي.
   */
  ai: {
    /**
     * مزود الذكاء الاصطناعي المستخدم.
     * الخيارات: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * الافتراضي: 'openai'
     */
    provider: "openai",

    /**
     * النموذج المستخدم من المزود المختار.
     */
    model: "gpt-4o",

    /**
     * مفتاح واجهة برمجة التطبيقات (API key) للمزود.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * السياق العام لتوجيه الذكاء الاصطناعي عند توليد الترجمات.
     */
    applicationContext: "هذا تطبيق لحجز السفر.",

    /**
     * الرابط الأساسي لواجهة برمجة تطبيقات الذكاء الاصطناعي.
     */
    baseURL: "http://localhost:3000",

    /**
     * تسلسل البيانات
     *
     * الخيارات:
     * - "json": افتراضي، موثوق؛ يستهلك المزيد من الوحدات (tokens).
     * - "toon": حات سريعة، استهلاك أقل للوحدات، أقل استقراراً من JSON.
     *
     * الافتراضي: "json"
     */
    dataSerialization: "json",
  },

  /**
   * إعدادات البناء والتحسين.
   */
  build: {
    /**
     * وضع تنفيذ البناء.
     * - "auto": بناء تلقائي أثناء بناء التطبيق.
     * - "manual": يتطلب أمر بناء صريح.
     * الافتراضي: "auto"
     */
    mode: "auto",

    /**
     * ما إذا كان سيتم تحسين الحزمة الناتجة عن طريق إزالة القواميس غير المستخدمة.
     * الافتراضي: true في الإنتاج
     */
    optimize: true,

    /**
     * ما إذا كان سيتم ضغط القواميس لتقليل حجم الحزمة.
     * الافتراضي: true
     */
    minify: true,

    /**
     * ما إذا كان سيتم حذف المفاتيح غير المستخدمة في القواميس.
     * الافتراضي: true
     */
    prune: true,

    /**
     * صيغة الإخراج لملفات القاموس المولدة.
     * الافتراضي: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * ما إذا كان ينبغي للبناء التحقق من أنواع TypeScript.
     * الافتراضي: false
     */
    checkTypes: false,
  },

  /**
   * إعدادات السجل (Logger).
   */
  log: {
    /**
     * مستوى السجل.
     * - "default": تسجيل قياسي.
     * - "verbose": تسجيل تصحيح مفصل.
     * - "disabled": لا يوجد تسجيل.
     * الافتراضي: "default"
     */
    mode: "default",

    /**
     * بادئة لجميع الرسائل في السجل.
     * الافتراضي: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * إعدادات النظام (حالات الاستخدام المتقدمة)
   */
  system: {
    /**
     * المجلد لتخزين القواميس المترجمة.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * المجلد لتوسيع الوحدات (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * المجلد لتخزين القواميس غير المدمجة.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * المجلد لتخزين أنواع القواميس.
     */
    typesDir: ".intlayer/types",

    /**
     * المجلد حيث يتم الاحتفاظ بملفات التطبيق الرئيسية.
     */
    mainDir: ".intlayer/main",

    /**
     * المجلد حيث يتم الاحتفاظ بملفات الإعدادات المحولة برمجياً.
     */
    configDir: ".intlayer/config",

    /**
     * المجلد لملفات التخزين المؤقت (cache).
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * إعدادات المترجم (حالات الاستخدام المتقدمة)
   */
  compiler: {
    /**
     * ما إذا كان سيتم تفعيل المترجم.
     *
     * - false: تعطيل المترجم.
     * - true: تفعيل المترجم.
     * - "build-only": تخطي المترجم أثناء التطوير لبدء أسرع.
     *
     * الافتراضي: false
     */
    enabled: true,

    /**
     * يحدد المسار لملفات الإخراج. يستبدل `outputDir`.
     *
     * - يتم حل المسارات التي تبدأ بـ `./` بالنسبة لمجلد المكون.
     * - يتم حل المسارات التي تبدأ بـ `/` بالنسبة لمجلد المشروع الأساسي (`baseDir`).
     *
     * - وجود متغير `{{locale}}` في المسار يفعل توليد قواميس منفصلة لكل لغة.
     *
     * مثال:
     * ```ts
     * {
     *   // إنشاء ملفات .content.ts متعددة اللغات بجانب المكون
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // مكافئ عبر سلسلة قالب
     * }
     * ```
     *
     * ```ts
     * {
     *   // إنشاء ملفات JSON مركزية حسب اللغة في مجلد المشروع الأساسي
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // مكافئ عبر سلسلة قالب
     * }
     * ```
     *
     * قائمة المتغيرات:
     *   - `fileName`: اسم الملف.
     *   - `key`: مفتاح المحتوى.
     *   - `locale`: لغة المحتوى.
     *   - `extension`: امتداد الملف.
     *   - `componentFileName`: اسم ملف المكون.
     *   - `componentExtension`: امتداد ملف المكون.
     *   - `format`: صيغة القاموس.
     *   - `componentFormat`: صيغة قاموس المكون.
     *   - `componentDirPath`: المسار إلى مجلد المكون.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * ما إذا كان سيتم حفظ المكونات بعد تحويلها.
     * بهذه الطريقة، يمكن تشغيل المترجم مرة واحدة لتحويل التطبيق ثم إزالته.
     */
    saveComponents: false,

    /**
     * وضع المحتوى فقط في الملف المولد. مفيد لمخرجات بصيغة i18next أو ICU MessageFormat JSON حسب اللغة.
     */
    noMetadata: false,

    /**
     * بادئة لمفتاح القاموس
     */
    dictionaryKeyPrefix: "", // إضافة بادئة اختيارية لمفاتيح القواميس المستخرجة
  },

  /**
   * مخططات مخصصة للتحقق من صحة محتوى القاموس.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * إعدادات الإضافات.
   */
  plugins: [],
};

export default config;
````

---

## مرجع دليل الإعدادات

يوضح ما يلي معالم الإعدادات المختلفة المتاحة في Intlayer.

---

### إعدادات التدويل (Internationalization)

تحدد الإعدادات المتعلقة بتدويل التطبيق، بما في ذلك اللغات المتاحة واللغة الافتراضية.

| الحقل             | الوصف                                                                      | النوع      | الافتراضي           | مثال                 | ملاحظة                                                                                                                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | قائمة اللغات المدعومة في التطبيق.                                          | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                 |
| `requiredLocales` | قائمة اللغات المطلوبة في التطبيق.                                          | `string[]` | `[]`                | `[]`                 | • إذا كانت فارغة، فستكون جميع اللغات مطلوبة في وضع `strict`. <br/> • تأكد من تعريف اللغات المطلوبة أيضاً في حقل `locales`.                                                                                                                                      |
| `strictMode`      | يضمن تنفيذاً قوياً للمحتوى المترجم باستخدام TypeScript.                    | `string`   | `'inclusive'`       |                      | • إذا كان `"strict"`: تطلب الدالة `t` تعريف كل لغة معلنة — يلقي خطأ إذا كانت إحداها مفقودة أو غير معلنة. <br/> • إذا كان `"inclusive"`: يحذر من اللغات المفقودة ولكنه يسمح باستخدام اللغات الموجودة غير المعلنة. <br/> • إذا كان `"loose"`: يقبل أي لغة موجودة. |
| `defaultLocale`   | اللغة الافتراضية المستخدمة كاحتياطي في حالة عدم العثور على اللغة المطلوبة. | `string`   | `Locales.ENGLISH`   | `'en'`               | تُستخدم لتحديد اللغة عندما لا يتم تحديدها في رابط URL أو الكوكيز أو الهيدر.                                                                                                                                                                                     |

---

### إعدادات المحرر (Editor)

تحدد إعدادات المحرر المرئي المدمج، بما في ذلك منفذ الخادم وحالة التفعيل.

| الحقل                        | الوصف                                                                                                                                                                 | النوع                             | الافتراضي                           | مثال                                                                                            | ملاحظة                                                                                                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | رابط التطبيق.                                                                                                                                                         | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • يُستخدم لتقييد مصدر (origin) المحرر لأسباب أمنية. <br/> • إذا تم تعيينه على `'*'`، يمكن الوصول إلى المحرر من أي مصدر.                                                                         |
| `port`                       | المنفذ المستخدم بواسطة خادم المحرر المرئي.                                                                                                                            | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                 |
| `editorURL`                  | رابط خادم المحرر.                                                                                                                                                     | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • يُستخدم لتقييد المصادر التي يمكنها التواصل مع التطبيق. <br/> • إذا تم تعيينه على `'*'`، يمكن الوصول إليه من أي مصدر. <br/> • يجب تعيينه إذا تم تغيير المنفذ أو استضافة المحرر على نطاق مختلف. |
| `cmsURL`                     | رابط Intlayer CMS.                                                                                                                                                    | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                 |
| `backendURL`                 | رابط الخادم الخلفي.                                                                                                                                                   | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                 |
| `enabled`                    | ما إذا كان ينبغي للتطبيق التواصل مع المحرر المرئي.                                                                                                                    | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • إذا كان `false` ، فلا يمكن للمحرر التواصل مع التطبيق. <br/> • يؤدي تعطيله لبيئات معينة إلى زيادة الأمان.                                                                                      |
| `clientId`                   | يسمح لحزم intlayer بالتحقق من الهوية على الخادم الخلفي عبر oAuth2. انتقل إلى [intlayer.org/project](https://app.intlayer.org/project) للحصول على رمز الوصول الخاص بك. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | يجب الحفاظ على سريته؛ استخدم متغيرات البيئة.                                                                                                                                                    |
| `clientSecret`               | يسمح لحزم intlayer بالتحقق من الهوية على الخادم الخلفي عبر oAuth2. انتقل إلى [intlayer.org/project](https://app.intlayer.org/project) للحصول على رمز الوصول الخاص بك. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | يجب الحفاظ على سريته؛ استخدم متغيرات البيئة.                                                                                                                                                    |
| `dictionaryPriorityStrategy` | إستراتيجية أولوية القواميس عند وجود قواميس محلية وعن بعد معاً.                                                                                                        | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: يعطي الأولوية للقواميس البعيدة على المحلية. <br/> • `'local_first'`: يعطي الأولوية للقواميس المحلية على البعيدة.                                                           |
| `liveSync`                   | ما إذا كان ينبغي لخادم التطبيق إعادة تحميل المحتوى فوراً عند اكتشاف تغييرات في CMS <br/> المحرر المرئي <br/> الخادم الخلفي.                                           | `boolean`                         | `true`                              | `true`                                                                                          | • عند إضافة/تحديث قاموس، سيقوم التطبيق بتحديث محتوى الصفحة. <br/> • تستهلك المزامنة الحية المحتوى في خادم آخر، مما قد يؤثر قليلاً على الأداء. <br/> • يوصى باستضافة كليهما على نفس الجهاز.      |
| `liveSyncPort`               | منفذ خادم المزامنة الحية.                                                                                                                                             | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                 |
| `liveSyncURL`                | رابط خادم المزامنة الحية.                                                                                                                                             | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | يشير افتراضياً إلى localhost؛ يمكن تغييره ليشير إلى خادم مزامنة حية بعيد.                                                                                                                       |

---

### إعدادات التوجيه (Routing)

الإعدادات التي تتحكم في سلوك التوجيه، بما في ذلك بنية رابط URL، وتخزين اللغة، وإدارة البرمجيات الوسيطة.

| الحقل      | الوصف                                                                                                                                                                  | النوع                                                                                                                                                                                                        | الافتراضي              | مثال                                                                                                                                                                                                   | ملاحظة                                                                                                                                                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | وضع توجيه رابط URL لإدارة اللغات.                                                                                                                                      | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (الإنجليزية) أو `/fr/dashboard` (الفرنسية). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: تتم إدارة اللغة بوسائل أخرى. `'search-params'`: `/dashboard?locale=fr` | لا يؤثر على إدارة الكوكيز أو تخزين اللغات.                                                                                                                                                                                                                                       |
| `storage`  | إعدادات تخزين اللغة على العميل.                                                                                                                                        | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                     | انظر جدول معالم التخزين أدناه.                                                                                                                                                                                                                                                   |
| `basePath` | المسار الأساسي لروابط التطبيق.                                                                                                                                         | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                            | إذا كان التطبيق يعمل على العنوان `https://example.com/my-app` ، فإن الـ basePath هو `'/my-app'` وتصبح الروابط `https://example.com/my-app/en`.                                                                                                                                   |
| `rewrite`  | قواعد إعادة كتابة رابط URL مخصصة تتجاوز وضع التوجيه الافتراضي لمسارات معينة. تدعم المعاملات الديناميكية `[param]`.                                                     | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | انظر المثال أدناه                                                                                                                                                                                      | • لقواعد إعادة الكتابة أولوية على `mode`. <br/> • يعمل مع Next.js و Vite. <br/> • تقوم `getLocalizedUrl()` بتطبيق القواعد المناسبة تلقائياً. <br/> • انظر [إعادة كتابة روابط URL المخصصة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |
| `domains`  | يربط اللغات بأسماء نطاقات الاستضافة للتوجيه القائم على النطاق. عند تعيينه، تستخدم روابط URL للغة ذلك النطاق كقاعدة (رابط URL مطلق) ولا يتم إضافة بادئة لغة إلى المسار. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                            | • البروتوكول الافتراضي هو `https://` عندما لا يتم تضمينه في اسم الاستضافة.<br/>• النطاق نفسه يحدد اللغة، لذا لا يتم إضافة بادئة `/zh/`.<br/>• `getLocalizedUrl('/', 'zh')` يرجع `https://intlayer.zh/`.                                                                          |

**مثال لـ `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // إستراتيجية احتياطية
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

#### معالم التخزين (Storage)

| القيمة             | ملاحظة                                                                                                                                                                                                                    | الوصف                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `'cookie'`         | • للامتثال للقانون العام لحماية البيانات (GDPR)، تأكد من الحصول على موافقة المستخدم بشكل صحيح. <br/> • قابل للتخصيص عبر `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). | يخزن اللغة في الكوكيز — يمكن الوصول إليها على كل من العميل والخادم. |
| `'localStorage'`   | • لا تنتهي صلاحيته إلا إذا تم مسحه صراحة. <br/> • لا يمكن لـ Intlayer Proxy الوصول إليه. <br/> • قابل للتخصيص عبر `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                                | يخزن اللغة في المتصفح دون حد زمني — من جانب العميل فقط.             |
| `'sessionStorage'` | • يتم مسحه عند إغلاق التبويب/النافذة. <br/> • لا يمكن لـ Intlayer Proxy الوصول إليه. <br/> • قابل للتخصيص عبر `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                                  | يخزن اللغة طوال مدة جلسة الصفحة — من جانب العميل فقط.               |
| `'header'`         | • مفيد لطلبات واجهة برمجة التطبيقات (API). <br/> • لا يمكن لجانب العميل الوصول إليه. <br/> • قابل للتخصيص عبر `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                          | يخزن أو يمرر اللغة عبر ترويسات HTTP — من جانب الخادم فقط.           |

#### سمات الكوكيز (Cookies Attributes)

عند استخدام التخزين في الكوكيز، يمكن تعيين سمات إضافية:

| الحقل      | الوصف                                                | النوع                                                 |
| ---------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `name`     | اسم الكوكيز. الافتراضي: `'INTLAYER_LOCALE'`          | `string`                                              |
| `domain`   | نطاق الكوكيز. الافتراضي: `undefined`                 | `string`                                              |
| `path`     | مسار الكوكيز. الافتراضي: `undefined`                 | `string`                                              |
| `secure`   | يتطلب HTTPS. الافتراضي: `undefined`                  | `boolean`                                             |
| `httpOnly` | علامة HTTP-only. الافتراضي: `undefined`              | `boolean`                                             |
| `sameSite` | سياسة SameSite.                                      | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | تاريخ الانتهاء أو عدد الأيام. الافتراضي: `undefined` | `Date` &#124; <br/> `number`                          |

#### سمات التخزين (Storage Attributes)

عند استخدام localStorage أو sessionStorage:

| الحقل  | الوصف                                                  | النوع                                            |
| ------ | ------------------------------------------------------ | ------------------------------------------------ |
| `type` | نوع التخزين.                                           | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | اسم المفتاح في التخزين. الافتراضي: `'INTLAYER_LOCALE'` | `string`                                         |

#### أمثلة للإعدادات

فيما يلي بعض الأمثلة الشائعة للإعدادات لهيكل التوجيه v7 الجديد:

**الإعدادات الأساسية (الافتراضية)**:

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

**الإعدادات مع الامتثال لـ GDPR**:

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

**وضع معاملات البحث (Search Params)**:

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

**وضع بدون بادئة مع تخزين مخصص**:

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

**إعادة كتابة روابط URL مخصصة مع مسارات ديناميكية**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // احتياطي للمسارات غير المعاد كتابتها
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

### إعدادات المحتوى (Content)

الإعدادات المتعلقة بكيفية إدارة المحتوى في التطبيق، بما في ذلك أسماء المجلدات، وامتدادات الملفات، والإعدادات المشتقة.

| الحقل            | الوصف                                                                                                     | النوع      | الافتراضي                                                                                                                                                                 | مثال                                                                                                                                                                                  | ملاحظة                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | يشير إلى ما إذا كان ينبغي لـ Intlayer مراقبة التغييرات في ملفات الإعلان عن المحتوى لإعادة توليد القواميس. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                          |
| `fileExtensions` | امتدادات الملفات للفحص أثناء تجميع القواميس.                                                              | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | يساعد التخصيص في تجنب التعارضات.                                                                                                         |
| `contentDir`     | المسار إلى المجلد حيث يتم الاحتفاظ بملفات تعريف المحتوى (`.content.*`).                                   | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | يُستخدم لمراقبة ملفات المحتوى وإعادة توليد القواميس.                                                                                     |
| `codeDir`        | المسار إلى المجلد حيث يتم الاحتفاظ بالكود، بالنسبة لمجلد المشروع الأساسي.                                 | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • يُستخدم لمراقبة ملفات الكود للتحويل (إزالة الأجزاء غير الضرورية، التحسين). <br/> • يمكن أن يؤدي فصله عن `contentDir` إلى تحسين الأداء. |
| `excludedPath`   | المجلدات المستبعدة من فحص المحتوى.                                                                        | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | غير مستخدم حالياً؛ مخطط له في المستقبل.                                                                                                  |
| `formatCommand`  | أمر لتنسيق ملفات المحتوى عند كتابتها محلياً بواسطة Intlayer.                                              | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • سيتم استبدال `{{file}}` بمسار الملف. <br/> • إذا لم يتم تعريفه، فسيقوم Intlayer بالتحديد تلقائياً (يختبر prettier و biome و eslint).   |

---

### إعدادات القاموس (Dictionary)

المعالم التي تتحكم في عمليات القاموس، بما في ذلك سلوك الملء التلقائي وتوليد المحتوى.

| الحقل                       | الوصف                                                                                                              | النوع                                                                                                           | الافتراضي    | مثال                                                                                        | ملاحظة                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | يتحكم في كيفية توليد ملفات مخرجات الملء التلقائي (ترجمة الذكاء الاصطناعي).                                         | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`       | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: المسار الافتراضي (نفس ملف المصدر). <br/> • `false`: تعطيل. <br/> • تولد سلسلة القالب/الدالة ملفات حسب اللغة. <br/> • كائن حسب اللغة: كل لغة تقابل قالبها؛ `false` يتجاهل هذه اللغة. <br/> • إدراج `{{locale}}` يفعل التوليد حسب اللغة. <br/> • الـ `fill` على مستوى القاموس دائماً له الأولوية على هذا الإعداد العام.                                         |
| `description`               | يساعد المحرر و CMS على فهم الغرض من القاموس. يُستخدم أيضاً كسياق لتوليد الترجمات باستخدام الذكاء الاصطناعي.        | `string`                                                                                                        | `undefined`  | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                         |
| `locale`                    | يحول القاموس إلى صيغة خاصة بلغة محددة. تصبح كل حقل معلن عقدة ترجمة. إذا غاب، يُعتبر القاموس متعدد اللغات.          | `LocalesValues`                                                                                                 | `undefined`  | `'en'`                                                                                      | استخدم هذا إذا كان القاموس مخصصاً للغة واحدة معينة، بدلاً من ترجمات متعددة.                                                                                                                                                                                                                                                                                             |
| `contentAutoTransformation` | يحول سلاسل المحتوى تلقائياً إلى عقد ذات أنواع (markdown أو HTML أو إدراج).                                         | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`      | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`. <br/> • HTML : `<div>Title</div>` → `html('<div>Title</div>')`. <br/> • إدراج : `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                            |
| `location`                  | يشير إلى مكان تخزين ملفات القاموس وكيفية مزامنتها مع CMS.                                                          | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`    | `'hybrid'`                                                                                  | • `'local'`: إدارة محلية فقط. <br/> • `'remote'`: إدارة عن بعد فقط (CMS). <br/> • `'hybrid'`: إدارة محلية وعن بعد معاً. <br/> • `'plugin'` أو سلسلة مخصصة: إدارة بواسطة إضافة أو مصدر مخصص.                                                                                                                                                                             |
| `importMode`                | يتحكم في طريقة استيراد القواميس.                                                                                   | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`   | `'dynamic'`                                                                                 | • `'static'`: استيراد ثابت. <br/> • `'dynamic'`: استيراد ديناميكي عبر Suspense. <br/> • `'fetch'`: جلب عبر Live Sync API؛ التراجع إلى `'dynamic'` عند الفشل. <br/> • يتطلب إضافات `@intlayer/babel` و `@intlayer/swc`. <br/> • يجب الإعلان عن المفاتيح بشكل ثابت. <br/> • يتم تجاهله إذا تم إيقاف `optimize`. <br/> • لا يؤثر على `getIntlayer` أو `getDictionary` إلخ. |
| `priority`                  | أولوية القاموس. تفوز القيم الأعلى على القيم الأدنى عند حل التعارضات بين القواميس.                                  | `number`                                                                                                        | `undefined`  | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                         |
| `live`                      | ملغي — استخدم `importMode: 'fetch'`. كان يشير إلى ما إذا كان ينبغي جلب محتوى القاموس ديناميكياً عبر Live Sync API. | `boolean`                                                                                                       | `undefined`  |                                                                                             | تم تغيير اسمه إلى `importMode: 'fetch'` في v8.0.0.                                                                                                                                                                                                                                                                                                                      |
| `schema`                    | يتم توليده تلقائياً بواسطة Intlayer للتحقق من صحة JSON schema.                                                     | `'https://intlayer.org/schema.json'`                                                                            | توليد تلقائي |                                                                                             | لا تقم بتحريره يدوياً.                                                                                                                                                                                                                                                                                                                                                  |
| `title`                     | يساعد في التعرف على القاموس في المحرر و CMS.                                                                       | `string`                                                                                                        | `undefined`  | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                         |
| `tags`                      | يصنف القواميس ويوفر سياقاً أو تعليمات للمحرر والذكاء الاصطناعي.                                                    | `string[]`                                                                                                      | `undefined`  | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                         |
| `version`                   | إصدار القاموس البعيد؛ يساعد في تتبع النسخة المستخدمة حالياً.                                                       | `string`                                                                                                        | `undefined`  | `'1.0.0'`                                                                                   | • تتم إدارته في CMS. <br/> • لا تقم بتحريره محلياً.                                                                                                                                                                                                                                                                                                                     |

**مثال لـ `fill`**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### إعدادات السجل (Log)

المعالم لتخصيص مخرجات سجل Intlayer.

| الحقل    | الوصف                         | النوع                                                          | الافتراضي       | مثال             | ملاحظة                                                                                           |
| -------- | ----------------------------- | -------------------------------------------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| `mode`   | يشير إلى وضع السجل.           | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`      | • `'verbose'`: يسجل المزيد من المعلومات لتصحيح الأخطاء. <br/> • `'disabled'`: يوقف السجل تماماً. |
| `prefix` | بادئة لجميع الرسائل في السجل. | `string`                                                       | `'[intlayer] '` | `'[my prefix] '` |                                                                                                  |

---

### إعدادات الذكاء الاصطناعي (AI)

الإعدادات التي تتحكم في ميزات الذكاء الاصطناعي في Intlayer، بما في ذلك المزود، والنموذج، ومفتاح واجهة برمجة التطبيقات.

هذه الإعدادات اختيارية إذا كنت مسجلاً في [لوحة تحكم Intlayer](https://app.intlayer.org/project) بمفتاح وصول. سيقوم Intlayer تلقائياً بإدارة حل الذكاء الاصطناعي الأكثر كفاءة وملاءمة للتكاليف لاحتياجاتك. استخدام الخيارات الافتراضية يضمن أفضل دعم طويل الأمد حيث يتم تحديث Intlayer باستمرار لاستخدام أحدث النماذج.

إذا كنت تفضل استخدام مفتاح واجهة برمجة تطبيقات خاص بك أو نموذج محدد، يمكنك تعريف إعدادات الذكاء الاصطناعي الخاصة بك.
سيتم استخدام إعدادات الذكاء الاصطناعي هذه عالمياً في بيئة Intlayer الخاصة بك. ستستخدم أوامر CLI هذه الإعدادات افتراضياً لأوامر مثل `fill` ، وكذلك SDK ، والمحرر المرئي ، و CMS. يمكنك تجاوز هذه القيم الافتراضية لحالات استخدام معينة عبر معاملات الأوامر.

يدعم Intlayer العديد من مزودي الذكاء الاصطناعي لتحقيق أقصى قدر من المرونة. حالياً، المزودون المدعومون هم:

- **OpenAI** (الافتراضي)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| الحقل                | الوصف                                                                                                                  | النوع                                                                                                                                                                                                                                                                                                                                                                                          | الافتراضي   | مثال                                                          | ملاحظة                                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | المزود المستخدم لميزات الذكاء الاصطناعي في Intlayer.                                                                   | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | يحتاج المزودون المختلفون إلى مفاتيح واجهة برمجة تطبيقات مختلفة ولهم أسعار مختلفة.                                                                                           |
| `model`              | النموذج المستخدم لميزات الذكاء الاصطناعي.                                                                              | `string`                                                                                                                                                                                                                                                                                                                                                                                       | لا يوجد     | `'gpt-4o-2024-11-20'`                                         | يعتمد النموذج المحدد على المزود.                                                                                                                                            |
| `temperature`        | يتحكم في عشوائية ردود الذكاء الاصطناعي.                                                                                | `number`                                                                                                                                                                                                                                                                                                                                                                                       | لا يوجد     | `0.1`                                                         | درجة حرارة أعلى = أكثر إبداعاً وأقل قابلية للتنبؤ.                                                                                                                          |
| `apiKey`             | مفتاح واجهة برمجة التطبيقات الخاص بك للمزود المختار.                                                                   | `string`                                                                                                                                                                                                                                                                                                                                                                                       | لا يوجد     | `process.env.OPENAI_API_KEY`                                  | يجب الحفاظ على سريته؛ استخدم متغيرات البيئة.                                                                                                                                |
| `applicationContext` | سياق إضافي حول تطبيقك لمساعدة الذكاء الاصطناعي في توليد ترجمات أكثر دقة (المجال، الجمهور المستهدف، النبرة، المصطلحات). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | لا يوجد     | `'سياق تطبيقي الخاص'`                                         | يمكن استخدامه لإضافة قواعد (مثلاً: `"لا يجب عليك تحويل روابط URL"`).                                                                                                        |
| `baseURL`            | الرابط الأساسي لواجهة برمجة تطبيقات الذكاء الاصطناعي.                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                       | لا يوجد     | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | يمكن أن يشير إلى نقطة نهاية محلية أو مخصصة لواجهة برمجة تطبيقات الذكاء الاصطناعي.                                                                                           |
| `dataSerialization`  | صيغة تسلسل البيانات لميزات الذكاء الاصطناعي.                                                                           | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: افتراضي، موثوق؛ يستهلك المزيد من الوحدات. <br/> • `'toon'`: وحدات أقل، أقل استقراراً. <br/> • يتم تمرير المعاملات الإضافية إلى النموذج كسياق (جهد التفكير إلخ). |

---

### إعدادات البناء (Build)

المعالم التي تتحكم في كيفية قيام Intlayer بتحسين وترجمة تدويل تطبيقك.

يتم تطبيق خيارات البناء على إضافات `@intlayer/babel` و `@intlayer/swc`.

> في وضع التطوير، يستخدم Intlayer استيراداً ثابتاً للقواميس لتبسيط عملية التطوير.

> أثناء التحسين، سيقوم Intlayer باستبدال استدعاءات القواميس لتحسين تقسيم الكود (chunking) بحيث تستورد الحزمة الناتجة القواميس المستخدمة فعلياً فقط.

| الحقل             | الوصف                                                                       | النوع                            | الافتراضي                                                                                                                                                                         | مثال                                                                          | ملاحظة                                                                                                                                                                                                                                                                           |
| ----------------- | --------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | يتحكم في وضع البناء.                                                        | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: يتم تشغيل البناء تلقائياً أثناء بناء التطبيق. <br/> • `'manual'`: يتم تنفيذه فقط عند استدعاء أمر بناء صريح. <br/> • يمكن استخدامه لإيقاف بناء القواميس (مثلاً لتجنب الجري في بيئات Node.js).                                                                         |
| `optimize`        | يتحكم في ما إذا كان ينبغي إجراء تحسينات البناء.                             | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • إذا لم يتم تعريفه، فسيتم تشغيل التحسين عند بناء إطار العمل (Vite/Next.js). <br/> • `true` يفرض التحسين حتى في وضع التطوير. <br/> • `false` يعطله. <br/> • عند تشغيله، يستبدل استدعاءات القواميس لتحسين الـ chunking. <br/> • يتطلب إضافات `@intlayer/babel` و `@intlayer/swc`. |
| `minify`          | يحدد ما إذا كان ينبغي ضغط القواميس لتقليل حجم الحزمة.                       | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • يحدد ما إذا كانت الحزمة يجب أن تكون مضغوطة.<br/>• الافتراضي: `true` في الإنتاج.<br/>• سيتم تجاهل هذا الخيار إذا تم تعطيل `optimize`.<br/>• سيتم تجاهل هذا الخيار إذا كان `editor.enabled` صحيحاً.                                                                              |
| `prune`           | يحدد ما إذا كان ينبغي حذف المفاتيح غير المستخدمة في القواميس.               | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • يحدد ما إذا كانت الحزمة يجب أن يتم تنظيفها.<br/>• الافتراضي: `true` في الإنتاج.<br/>• سيتم تجاهل هذا الخيار إذا تم تعطيل `optimize`.                                                                                                                                           |
| `checkTypes`      | يشير إلى ما إذا كان ينبغي للبناء التحقق من أنواع TypeScript وتسجيل الأخطاء. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | قد يبطئ عملية البناء.                                                                                                                                                                                                                                                            |
| `outputFormat`    | يتحكم في صيغة إخراج القواميس.                                               | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                  |
| `traversePattern` | الأنماط التي تحدد الملفات التي يتم فحصها أثناء التحسين.                     | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • قيد التحسين على الملفات ذات الصلة لزيادة أداء البناء. <br/> • سيتم تجاهله إذا توقف `optimize`. <br/> • يستخدم أنماط glob.                                                                                                                                                      |

---

### إعدادات النظام (System)

هذه الإعدادات مخصصة لحالات الاستخدام المتقدمة والإعدادات الداخلية لـ Intlayer.

| الحقل                     | الوصف                                    | النوع    | الافتراضي                         | مثال | ملاحظة |
| ------------------------- | ---------------------------------------- | -------- | --------------------------------- | ---- | ------ |
| `dictionariesDir`         | المجلد للقواميس المحولة برمجياً.         | `string` | `'.intlayer/dictionary'`          |      |        |
| `moduleAugmentationDir`   | المجلد لتوسيع وحدات TypeScript.          | `string` | `'.intlayer/types'`               |      |        |
| `unmergedDictionariesDir` | المجلد لتخزين القواميس غير المدمجة.      | `string` | `'.intlayer/unmerged_dictionary'` |      |        |
| `typesDir`                | المجلد للأنواع المولدة.                  | `string` | `'.intlayer/types'`               |      |        |
| `mainDir`                 | المجلد لملف Intlayer الرئيسي.            | `string` | `'.intlayer/main'`                |      |        |
| `configDir`               | المجلد لملفات الإعدادات المحولة برمجياً. | `string` | `'.intlayer/config'`              |      |        |
| `cacheDir`                | المجلد لملفات التخزين المؤقت.            | `string` | `'.intlayer/cache'`               |      |        |

---

### إعدادات المترجم (Compiler)

الإعدادات التي تتحكم في مترجم Intlayer، الذي يستخرج القواميس مباشرة من مكوناتك.

| الحقل                 | الوصف                                                                                                                                                                                                                                                                                           | النوع                                                                                                           | الافتراضي   | مثال                                                                                                                                                     | ملاحظة                                                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | يشير إلى ما إذا كان ينبغي تفعيل المترجم لاستخراج القواميس.                                                                                                                                                                                                                                      | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` يتخطى المترجم أثناء التطوير لبناء أسرع؛ يتم تنفيذه فقط عند أوامر البناء.                                                                                 |
| `dictionaryKeyPrefix` | بادئة لمفاتيح القواميس المستخرجة.                                                                                                                                                                                                                                                               | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | تتم إضافتها إلى المفتاح المولد (بناءً على اسم الملف) لتجنب التعارضات.                                                                                                   |
| `saveComponents`      | ما إذا كان ينبغي حفظ المكونات بعد تحويلها.                                                                                                                                                                                                                                                      | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • إذا كان `true` ، فسيتم استبدال الملفات الأصلية بنسخها المحولة. <br/> • يمكن إزالة المترجم بعد تشغيله مرة واحدة.                                                       |
| `output`              | يحدد المسار لملفات الإخراج. يستبدل `outputDir`. يدعم قوالب المتغيرات: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • يتم حل مسارات `./` بالنسبة لمجلد المكون. <br/> • مسارات `/` بالنسبة للمشروع الأساسي. <br/> • `{{locale}}` يتضمن التوليد حسب اللغة. <br/> • يدعم تمثيل الكائن لكل لغة. |
| `noMetadata`          | إذا كان `true` ، فسيقوم المترجم بحذف بيانات ميتا القاموس (المفتاح، غلاف المحتوى) من المخرجات.                                                                                                                                                                                                   | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • مفيد لمخرجات بصيغة i18next أو ICU MessageFormat JSON. <br/> • يعمل جيداً مع إضافة `loadJSON`.                                                                         |
| `dictionaryKeyPrefix` | بادئة لمفتاح القاموس                                                                                                                                                                                                                                                                            | `string`                                                                                                        | `''`        |                                                                                                                                                          | إضافة بادئة اختيارية لمفاتيح القواميس المستخرجة                                                                                                                         |

---

### مخططات مخصصة (Custom Schemas)

| الحقل     | الوصف                                                 | النوع                       |
| --------- | ----------------------------------------------------- | --------------------------- |
| `schemas` | يسمح لك بتعريف مخططات Zod للتحقق من صحة هيكل قواميسك. | `Record<string, ZodSchema>` |

---

### الإضافات (Plugins)

| الحقل     | الوصف                           | النوع              |
| --------- | ------------------------------- | ------------------ |
| `plugins` | قائمة إضافات Intlayer لإدراجها. | `IntlayerPlugin[]` |
