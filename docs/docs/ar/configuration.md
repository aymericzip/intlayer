---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: التكوين (Configuration)
description: تعرف على كيفية تكوين Intlayer لتطبيقك. افهم الإعدادات والخيارات المتنوعة المتاحة لتخصيص Intlayer وفقًا لاحتياجاتك.
keywords:
  - التكوين
  - الإعدادات
  - التخصيص
  - Intlayer
  - الخيارات
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: تمت إضافة تدوين الكائن لكل لغة لـ 'compiler.output' و 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: نقل 'baseDir' من تكوين 'content' إلى تكوين 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: تحديث خيارات المترجم (compiler)، وإضافة دعم لـ 'output' و 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: تحديث خيارات المترجم
  - version: 8.1.5
    date: 2026-02-23
    changes: إضافة خيار المترجم 'build-only' وبادئة القاموس
  - version: 8.0.6
    date: 2026-02-12
    changes: إضافة دعم لمزودي Open Router و Alibaba و Amazon و Google Vertex Bedrock و Fireworks و Groq و Hugging Face و Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: إضافة `dataSerialization` إلى تكوين الذكاء الاصطناعي
  - version: 8.0.0
    date: 2026-01-24
    changes: إعادة تسمية وضع الاستيراد `live` إلى `fetch` لوصف الآلية الأساسية بشكل أفضل.
  - version: 8.0.0
    date: 2026-01-22
    changes: نقل تكوين البناء `importMode` إلى تكوين القاموس `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: إضافة خيار `rewrite` لتكوين التوجيه
  - version: 8.0.0
    date: 2026-01-18
    changes: فصل تكوين النظام عن تكوين المحتوى. نقل المسارات الداخلية إلى خاصية `system`. إضافة `codeDir` لفصل ملفات المحتوى وتحويل الكود.
  - version: 8.0.0
    date: 2026-01-18
    changes: إضافة خيارات القاموس `location` و `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: إضافة دعم لتنسيقات ملفات JSON5 و JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: إضافة خيار `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: إضافة تكوين `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: استبدال `middleware` بتكوين التوجيه `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: إضافة خيار `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: تحديث خيار `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: إضافة خيار `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: إزالة حقل `dictionaryOutput` وحقل `i18nextResourcesDir`
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
    changes: تغيير `contentDir` الافتراضي من `['src']` إلى `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: إضافة أوامر `docs`
---

# توثيق تكوين Intlayer

## نظرة عامة

تسمح لك ملفات تكوين Intlayer بتخصيص جوانب مختلفة من البرنامج المساعد، مثل التدويل (internationalization)، والبرامج الوسيطة (middleware)، ومعالجة المحتوى. يوفر هذا التوثيق وصفًا تفصيليًا لكل خاصية في التكوين.

---

## جدول المحتويات

<TOC/>

---

## تنسيقات ملفات التكوين المدعومة

يقبل Intlayer تنسيقات ملفات التكوين JSON و JS و MJS و TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## مثال على ملف التكوين

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * مثال على ملف تكوين Intlayer يعرض جميع الخيارات المتاحة.
 */
const config: IntlayerConfig = {
  /**
   * تكوين إعدادات التدويل.
   */
  internationalization: {
    /**
     * قائمة اللغات (locales) المدعومة في التطبيق.
     * الافتراضي: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * قائمة اللغات الإلزامية التي يجب تعريفها في كل قاموس.
     * إذا كانت فارغة، فستكون جميع اللغات إلزامية في وضع `strict`.
     * الافتراضي: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * مستوى الصرامة للمحتوى المدوّل.
     * - "strict": خطأ إذا كانت أي لغة معلنة مفقودة أو غير معلنة.
     * - "inclusive": تحذير إذا كانت اللغة المعلنة مفقودة.
     * - "loose": قبول أي لغة موجودة.
     * الافتراضي: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * اللغة الافتراضية المستخدمة كبديل في حالة عدم العثور على اللغة المطلوبة.
     * الافتراضي: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * الإعدادات التي تتحكم في عمليات القاموس وسلوك البدائل.
   */
  dictionary: {
    /**
     * يتحكم في كيفية استيراد القواميس.
     * - "static": يتم استيراده بشكل ثابت في وقت البناء.
     * - "dynamic": يتم استيراده بشكل ديناميكي باستخدام Suspense.
     * - "fetch": يتم جلبه ديناميكيًا عبر واجهة برمجة تطبيقات Live Sync.
     * الافتراضي: "static"
     */
    importMode: "static",

    /**
     * استراتيجية ملء الترجمات المفقودة تلقائيًا باستخدام الذكاء الاصطناعي.
     * يمكن أن تكون قيمة منطقية أو نمط مسار لحفظ المحتوى المملوء.
     * الافتراضي: true
     */
    fill: true,

    /**
     * الموقع الفعلي لملفات القاموس.
     * - "local": مخزن في نظام الملفات المحلي.
     * - "remote": مخزن في Intlayer CMS.
     * - "hybrid": مخزن محليًا وفي Intlayer CMS.
     * - "plugin" (أو أي سلسلة مخصصة): يتم توفيره بواسطة مكون إضافي أو مصدر مخصص.
     * الافتراضي: "local"
     */
    location: "local",

    /**
     * ما إذا كان يجب تحويل المحتوى تلقائيًا (مثل Markdown إلى HTML).
     * الافتراضي: false
     */
    contentAutoTransformation: false,
  },

  /**
   * تكوين التوجيه والبرامج الوسيطة.
   */
  routing: {
    /**
     * استراتيجية توجيه اللغات.
     * - "prefix-no-default": يضيف بادئة للجميع باستثناء اللغة الافتراضية (مثل /dashboard، /fr/dashboard).
     * - "prefix-all": يضيف بادئة لجميع اللغات (مثل /en/dashboard، /fr/dashboard).
     * - "no-prefix": لا توجد لغة في عنوان URL.
     * - "search-params": يستخدم ?locale=...
     * الافتراضي: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * مكان تخزين اللغة المختارة من قبل المستخدم.
     * الخيارات: 'cookie' أو 'localStorage' أو 'sessionStorage' أو 'header' أو مصفوفة منها.
     * الافتراضي: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * المسار الأساسي لعناوين URL للتطبيق.
     * الافتراضي: ""
     */
    basePath: "",

    /**
     * قواعد إعادة كتابة URL مخصصة لمسارات محددة لكل لغة.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * الإعدادات المتعلقة بالبحث عن ملفات المحتوى ومعالجتها.
   */
  content: {
    /**
     * امتدادات الملفات لمسح القواميس.
     * الافتراضي: ['.content.ts', '.content.js', '.content.json' وغيرها]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * المجلدات التي توجد بها ملفات .content.
     * الافتراضي: ["."]
     */
    contentDir: ["src"],

    /**
     * مكان وجود الكود المصدري.
     * يستخدم لتحسين البناء وتحويل الكود.
     * الافتراضي: ["."]
     */
    codeDir: ["src"],

    /**
     * الأنماط المستبعدة من المسح.
     * الافتراضي: ['node_modules', '.intlayer' وغيرها]
     */
    excludedPath: ["node_modules"],

    /**
     * ما إذا كان يجب مراقبة التغييرات وإعادة بناء القواميس أثناء التطوير.
     * الافتراضي: true في وضع التطوير
     */
    watch: true,

    /**
     * الأمر المستخدم لتنسيق ملفات .content المنشأة حديثًا / المحدثة.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * تكوين المحرر المرئي (Visual Editor).
   */
  editor: {
    /**
     * ما إذا كان المحرر المرئي ممكناً.
     * الافتراضي: false
     */
    enabled: true,

    /**
     * عنوان URL لتطبيقك للتحقق من المصدر (origin validation).
     * الافتراضي: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * منفذ خادم المحرر المحلي.
     * الافتراضي: 8000
     */
    port: 8000,

    /**
     * عنوان URL العام للمحرر.
     * الافتراضي: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * عنوان URL لـ Intlayer CMS.
     * الافتراضي: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * عنوان URL لواجهة برمجة تطبيقات الخلفية (Backend API).
     * الافتراضي: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * ما إذا كان يجب تمكين مزامنة المحتوى في الوقت الفعلي.
     * الافتراضي: false
     */
    liveSync: true,
  },

  /**
   * إعدادات الترجمة والبناء القائم على الذكاء الاصطناعي.
   */
  ai: {
    /**
     * مزود الذكاء الاصطناعي المراد استخدامه.
     * الخيارات: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * الافتراضي: 'openai'
     */
    provider: "openai",

    /**
     * نموذج المزود المختار المراد استخدامه.
     */
    model: "gpt-4o",

    /**
     * مفتاح واجهة برمجة تطبيقات المزود.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * سياق عالمي لتوجيه الذكاء الاصطناعي عند بناء الترجمات.
     */
    applicationContext: "هذا تطبيق لحجز الرحلات.",

    /**
     * عنوان URL للمسار الأساسي لواجهة برمجة تطبيقات الذكاء الاصطناعي.
     */
    baseURL: "http://localhost:3000",

    /**
     * تسلسل البيانات (Data Serialization)
     *
     * الخيارات:
     * - "json": افتراضي، قوي؛ يستهلك المزيد من التوكنات.
     * - "toon": يستهلك توكنات أقل، قد لا يكون متسقًا مثل JSON.
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
     * - "auto": يتم البناء تلقائيًا أثناء بناء التطبيق.
     * - "manual": يتطلب أمر بناء صريح.
     * الافتراضي: "auto"
     */
    mode: "auto",

    /**
     * ما إذا كان يجب تحسين الحزمة النهائية عن طريق إزالة القواميس غير المستخدمة.
     * الافتراضي: true في الإنتاج
     */
    optimize: true,

    /**
     * تنسيق الإخراج لملفات القاموس المنشأة.
     * الافتراضي: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * يحدد ما إذا كان ينبغي للبناء التحقق من أنواع TypeScript.
     * الافتراضي: false
     */
    checkTypes: false,
  },

  /**
   * تكوين المسجل (Logger).
   */
  log: {
    /**
     * مستوى تسجيل البيانات.
     * - "default": تسجيل البيانات القياسي.
     * - "verbose": تسجيل بيانات تصحيح الأخطاء بعمق.
     * - "disabled": تعطيل تسجيل البيانات.
     * الافتراضي: "default"
     */
    mode: "default",

    /**
     * البادئة لجميع رسائل السجل.
     * الافتراضي: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * تكوين النظام (للاستخدام المتقدم)
   */
  system: {
    /**
     * المجلد لتخزين القواميس المترجمة.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * المجلد لزيادة وحدات TypeScript (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * المجلد لتخزين القواميس غير المدمجة (unmerged).
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * المجلد لتخزين أنواع القواميس.
     */
    typesDir: ".intlayer/types",

    /**
     * المجلد الذي يتم فيه تخزين ملفات التطبيق الرئيسية.
     */
    mainDir: ".intlayer/main",

    /**
     * المجلد الذي يتم فيه تخزين ملفات التكوين.
     */
    configDir: ".intlayer/config",

    /**
     * المجلد الذي يتم فيه تخزين ملفات التخزين المؤقت.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * تكوين المترجم (للاستخدام المتقدم)
   */
  compiler: {
    /**
     * يحدد ما إذا كان ينبغي تمكين المترجم.
     *
     * - false: تعطيل المترجم.
     * - true: تمكين المترجم.
     * - "build-only": يتخطى المترجم أثناء التطوير ويسرع وقت البدء.
     *
     * الافتراضي: false
     */
    enabled: true,

    /**
     * يحدد المسار لملفات الإخراج. يستبدل `outputDir`.
     *
     * - يتم حل المسارات التي تبدأ بـ `./` بالنسبة لمجلد المكون.
     * - يتم حل المسارات التي تبدأ بـ `/` بالنسبة لجذر المشروع (`baseDir`).
     *
     * - سيؤدي تضمين متغير `{{locale}}` في المسار إلى إنشاء قواميس منفصلة لكل لغة.
     *
     * مثال:
     * ```ts
     * {
     *   // إنشاء ملفات .content.ts متعددة اللغات بجوار المكون
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // مكافئ باستخدام سلسلة قالب
     * }
     * ```
     *
     * ```ts
     * {
     *   // إنشاء ملفات JSON مركزية لكل لغة في جذر المشروع
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // مكافئ باستخدام سلسلة قالب
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
     *   - `format`: تنسيق القاموس.
     *   - `componentFormat`: تنسيق قاموس المكون.
     *   - `componentDirPath`: مسار مجلد المكون.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * يحدد ما إذا كانت المكونات يجب أن تحفظ بعد تحويلها.
     * بهذه الطريقة، يمكن تشغيل المترجم مرة واحدة فقط لتحويل التطبيق ثم حذفه.
     */
    saveComponents: false,

    /**
     * إدراج المحتوى فقط في الملف المنشأ. مفيد لإخراج JSON لكل لغة لـ i18next أو ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * بادئة مفتاح القاموس
     */
    dictionaryKeyPrefix: "", // أضف بادئة اختيارية لمفاتيح القواميس المستخرجة
  },

  /**
   * مخططات مخصصة (Schemas) للتحقق من صحة محتوى القاموس.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * تكوين المكونات الإضافية (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## مرجع التكوين (Configuration Reference)

تصف الأقسام التالية خيارات التكوين المختلفة المتاحة في Intlayer.

---

### تكوين التدويل (Internationalization Configuration)

يعرف الإعدادات المتعلقة بالتدويل، بما في ذلك اللغات المتاحة واللغة الافتراضية للتطبيق.

| الحقل             | النوع      | الوصف                                                                                               | مثال                 | ملاحظة                                                                                                                                                                                                                                |
| ----------------- | ---------- | --------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | قائمة اللغات المدعومة في التطبيق. الافتراضي: `[Locales.ENGLISH]`                                    | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                       |
| `requiredLocales` | `string[]` | قائمة اللغات الإلزامية في التطبيق. الافتراضي: `[]`                                                  | `[]`                 | إذا كانت فارغة، فستكون جميع اللغات إلزامية في وضع `strict`. تأكد من تعريف اللغات الإلزامية أيضًا في حقل `locales`.                                                                                                                    |
| `strictMode`      | `string`   | يضمن تنفيذًا قويًا للمحتوى المدوّل باستخدام TypeScript. الافتراضي: `inclusive`                      |                      | إذا كان `"strict"`: تتطلب وظيفة `t` تعريف كل لغة معلنة - يطرح خطأ إذا كانت أي منها مفقودة أو غير معلنة. إذا كان `"inclusive"`: يحذر من اللغات المفقودة ولكنه يقبل اللغات غير المعلنة الموجودة. إذا كان `"loose"`: يقبل أي لغة موجودة. |
| `defaultLocale`   | `string`   | اللغة الافتراضية المستخدمة كبديل إذا لم يتم العثور على اللغة المطلوبة. الافتراضي: `Locales.ENGLISH` | `'en'`               | يستخدم لتحديد اللغة عندما لا يتم تحديد أي لغة في عنوان URL أو ملف تعريف الارتباط أو الرأس.                                                                                                                                            |

---

### تكوين المحرر (Editor Configuration)

يعرف الإعدادات المتعلقة بالمحرر المدمج، بما في ذلك منفذ الخادم وحالة النشاط.

| الحقل                        | النوع                     | الوصف                                                                                                                                                                     | مثال                                                                                  | ملاحظة                                                                                                                                                                                                   |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | عنوان URL لتطبيقك. الافتراضي: `''`                                                                                                                                        | `'http://localhost:3000'`، `'https://example.com'`، `process.env.INTLAYER_EDITOR_URL` | يستخدم لتقييد مصادر (origin) المحرر لأسباب أمنية. إذا تم تعيينه على `'*'`، يمكن الوصول إلى المحرر من أي مصدر.                                                                                            |
| `port`                       | `number`                  | المنفذ المستخدم من قبل خادم المحرر المرئي. الافتراضي: `8000`                                                                                                              |                                                                                       |                                                                                                                                                                                                          |
| `editorURL`                  | `string`                  | عنوان URL لخادم المحرر. الافتراضي: `'http://localhost:8000'`                                                                                                              | `'http://localhost:3000'`، `'https://example.com'`، `process.env.INTLAYER_EDITOR_URL` | يستخدم لتقييد المصادر التي يمكنها التفاعل مع التطبيق. إذا تم تعيينه على `'*'`، يمكن الوصول إليه من أي مصدر. يجب تعيينه عند تغيير المنفذ أو إذا تم استضافة المحرر في مجال مختلف.                          |
| `cmsURL`                     | `string`                  | عنوان URL لـ Intlayer CMS. الافتراضي: `'https://intlayer.org'`                                                                                                            | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                          |
| `backendURL`                 | `string`                  | عنوان URL لخادم الخلفية. الافتراضي: `https://back.intlayer.org`                                                                                                           | `http://localhost:4000`                                                               |                                                                                                                                                                                                          |
| `enabled`                    | `boolean`                 | يحدد ما إذا كان التطبيق سيتفاعل مع المحرر المرئي. الافتراضي: `true`                                                                                                       | `process.env.NODE_ENV !== 'production'`                                               | إذا كان `false`، لا يمكن للمحرر التفاعل مع التطبيق. يؤدي تعطيله لبيئات معينة إلى تعزيز الأمان.                                                                                                           |
| `clientId`                   | `string &#124; undefined` | يسمح لحزم intlayer بالمصادقة مع الخلفية باستخدام oAuth2. للحصول على توكن وصول، انتقل إلى [intlayer.org/project](https://app.intlayer.org/project). الافتراضي: `undefined` |                                                                                       | ابقِهِ سريًا؛ قم بتخزينه في متغيرات البيئة.                                                                                                                                                              |
| `clientSecret`               | `string &#124; undefined` | يسمح لحزم intlayer بالمصادقة مع الخلفية باستخدام oAuth2. للحصول على توكن وصول، انتقل إلى [intlayer.org/project](https://app.intlayer.org/project). الافتراضي: `undefined` |                                                                                       | ابقِهِ سريًا؛ قم بتخزينه في متغيرات البيئة.                                                                                                                                                              |
| `dictionaryPriorityStrategy` | `string`                  | استراتيجية تحديد أولويات القواميس عند وجود قواميس محلية وعن بُعد. الافتراضي: `'local_first'`                                                                              | `'distant_first'`                                                                     | `'distant_first'`: يعطي الأولوية للبعيد على المحلي. `'local_first'`: يعطي الأولوية للمحلي على البعيد.                                                                                                    |
| `liveSync`                   | `boolean`                 | يحدد ما إذا كان يجب على خادم التطبيق إعادة تحميل المحتوى حرارياً عند اكتشاف تغيير في CMS / المحرر المرئي / الخلفية. الافتراضي: `true`                                     | `true`                                                                                | عند إضافة/تحديث قاموس، يقوم التطبيق بتحديث محتوى الصفحة. يقوم المزامنة الحية (Live sync) بالاستعانة بمصادر خارجية للمحتوى لخادم آخر، مما قد يؤثر قليلاً على الأداء. يوصى باستضافة كليهما على نفس الجهاز. |
| `liveSyncPort`               | `number`                  | منفذ خادم المزامنة الحية. الافتراضي: `4000`                                                                                                                               | `4000`                                                                                |                                                                                                                                                                                                          |
| `liveSyncURL`                | `string`                  | عنوان URL لخادم المزامنة الحية. الافتراضي: `'http://localhost:{liveSyncPort}'`                                                                                            | `'https://example.com'`                                                               | يشير إلى localhost بشكل افتراضي؛ يمكن تغييره إلى خادم مزامنة حية بعيد.                                                                                                                                   |

### تكوين التوجيه (Routing Configuration)

الإعدادات التي تتحكم في سلوك التوجيه، بما في ذلك بنية URL، وتخزين اللغات، ومعالجة البرامج الوسيطة.

| الحقل      | النوع                                                                                                                                                | الوصف                                                                                                                               | مثال                                                                                                                                                                                             | ملاحظة                                                                                                                                                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | وضع توجيه URL لمعالجة اللغات. الافتراضي: `'prefix-no-default'`                                                                      | `'prefix-no-default'`: `/dashboard` (en) أو `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: تتم معالجة اللغة بوسائل أخرى. `'search-params'`: يستخدم `/dashboard?locale=fr` | لا يؤثر على إدارة ملفات تعريف الارتباط أو تخزين اللغات.                                                                                                                                                                                                      |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | تكوين لتخزين اللغة على العميل. الافتراضي: `['cookie', 'header']`                                                                    | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                    | راجع جدول خيارات التخزين أدناه.                                                                                                                                                                                                                              |
| `basePath` | `string`                                                                                                                                             | المسار الأساسي لعناوين URL للتطبيق. الافتراضي: `''`                                                                                 | `'/my-app'`                                                                                                                                                                                      | إذا كان التطبيق على `https://example.com/my-app` ، فإن basePath هو `'/my-app'` وتصبح عناوين URL مثل `https://example.com/my-app/en`.                                                                                                                         |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | قواعد إعادة كتابة URL مخصصة تتجاوز وضع التوجيه الافتراضي لمسارات محددة. يدعم المعلمات الديناميكية `[param]`. الافتراضي: `undefined` | انظر المثال أدناه                                                                                                                                                                                | قواعد إعادة الكتابة لها الأولوية على `mode`. تعمل مع Next.js و Vite. تقوم `getLocalizedUrl()` بتطبيق القواعد المطابقة تلقائيًا. انظر [عمليات إعادة كتابة URL المخصصة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/custom_url_rewrites.md). |

**مثال على `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // استراتيجية التراجع
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

#### خيارات التخزين (Storage Options)

| القيمة             | الوصف                                                                           | ملاحظة                                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | يخزن اللغة في ملفات تعريف الارتباط - يمكن الوصول إليها من جانبي العميل والخادم. | للامتثال للقانون العام لحماية البيانات (GDPR) ، تأكد من الحصول على موافقة المستخدم المناسبة. قابلة للتخصيص عبر `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | يخزن اللغة في المتصفح بدون تاريخ انتهاء - جانب العميل فقط.                      | لا تنتهي صلاحيتها إلا إذا تم مسحها صراحة. لا يمكن لبروكسي Intlayer الوصول إليها. قابلة للتخصيص عبر `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                                      |
| `'sessionStorage'` | يخزن اللغة طوال مدة جلسة الصفحة - جانب العميل فقط.                              | يتم مسحها عند إغلاق علامة التبويب/النافذة. لا يمكن لبروكسي Intlayer الوصول إليها. قابلة للتخصيص عبر `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                                   |
| `'header'`         | يخزن أو ينقل اللغة عبر رؤوس HTTP - جانب الخادم فقط.                             | مفيد لمكالمات واجهة برمجة التطبيقات. لا يمكن لجانب العميل الوصول إليه. قابلة للتخصيص عبر `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                                      |

#### سمات ملف تعريف الارتباط (Cookie Attributes)

عند استخدام التخزين عبر ملفات تعريف الارتباط ، يمكنك تكوين سمات إضافية:

| الحقل      | النوع                                 | الوصف                                                       |
| ---------- | ------------------------------------- | ----------------------------------------------------------- |
| `name`     | `string`                              | اسم ملف تعريف الارتباط. الافتراضي: `'INTLAYER_LOCALE'`      |
| `domain`   | `string`                              | مجال ملف تعريف الارتباط. الافتراضي: `undefined`             |
| `path`     | `string`                              | مسار ملف تعريف الارتباط. الافتراضي: `undefined`             |
| `secure`   | `boolean`                             | يتطلب HTTPS. الافتراضي: `undefined`                         |
| `httpOnly` | `boolean`                             | علم HTTP-only. الافتراضي: `undefined`                       |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | سياسة SameSite.                                             |
| `expires`  | `Date &#124; number`                  | تاريخ انتهاء الصلاحية أو عدد الأيام. الافتراضي: `undefined` |

#### سمات تخزين اللغة (Locale Storage Attributes)

عند استخدام localStorage أو sessionStorage:

| الحقل  | النوع                                    | الوصف                                             |
| ------ | ---------------------------------------- | ------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | نوع التخزين.                                      |
| `name` | `string`                                 | اسم مفتاح التخزين. الافتراضي: `'INTLAYER_LOCALE'` |

#### أمثلة التكوين

إليك بعض أمثلة التكوين الشائعة لبنية التوجيه الجديدة v7:

**التكوين الأساسي (افتراضي)**:

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

**تكوين متوافق مع GDPR**:

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

**وضع معلمات البحث (Search Parameters Mode)**:

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

**وضع بدون بادئة (No Prefix Mode) مع تخزين مخصص**:

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

**إعادة كتابة URL مخصص مع مسارات ديناميكية**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // استراتيجية التراجع للمسارات غير المعاد كتابتها
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

### تكوين المحتوى (Content Configuration)

الإعدادات المتعلقة بمعالجة المحتوى داخل التطبيق (أسماء المجلدات ، امتدادات الملفات ، والتكوينات المشتقة).

| الحقل            | النوع      | الوصف                                                                                                                                                                                 | مثال                                | ملاحظة                                                                                        |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | يحدد ما إذا كان يجب على Intlayer مراقبة التغييرات في ملفات إعلان المحتوى لإعادة بناء القواميس. الافتراضي: `process.env.NODE_ENV === 'development'`                                    |                                     |                                                                                               |
| `fileExtensions` | `string[]` | امتدادات الملفات المستخدمة لمسح ملفات إعلان المحتوى. الافتراضي: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                               |
| `contentDir`     | `string[]` | مسارات المجلدات التي توجد بها ملفات إعلان المحتوى. الافتراضي: `['.']`                                                                                                                 | `['src/content']`                   |                                                                                               |
| `codeDir`        | `string[]` | مسارات المجلدات التي توجد بها ملفات الكود المصدري لتطبيقك. الافتراضي: `['.']`                                                                                                         | `['src']`                           | يستخدم لتحسين البناء وضمان تطبيق تحويل الكود وإعادة التحميل الحراري فقط على الملفات الضرورية. |
| `excludedPath`   | `string[]` | المسارات المستبعدة من مسح المحتوى. الافتراضي: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                               | `['src/styles']`                    |                                                                                               |
| `formatCommand`  | `string`   | الأمر الذي سيتم تشغيله لتنسيق ملفات المحتوى المنشأة حديثًا أو المحدثة. الافتراضي: `undefined`                                                                                         | `'npx prettier --write "{{file}}"'` | يستخدم أثناء استخراج المحتوى أو عبر المحرر المرئي.                                            |

---

### تكوين القاموس (Dictionary Configuration)

الإعدادات التي تتحكم في عمليات القواميس، بما في ذلك سلوك الملء التلقائي وإنشاء المحتوى.

يخدم تكوين القاموس هذا غرضين رئيسيين:

1. **القيم الافتراضية**: تحديد القيم الافتراضية عند إنشاء ملفات إعلان المحتوى.
2. **سلوك البدائل (Fallback)**: توفير قيم بديلة عندما لا يتم تعريف حقول محددة، مما يسمح لك بتعريف سلوك عمليات القاموس بشكل عالمي.

لمزيد من المعلومات حول ملفات إعلان المحتوى وكيفية تطبيق قيم التكوين، راجع [توثيق ملفات المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

| الحقل                       | النوع                                                                                           | الوصف                                                                                           | مثال              | ملاحظة                                                                                                                                                                                                                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | يتحكم في كيفية إنشاء ملفات إخراج الملء التلقائي (الترجمة بالذكاء الاصطناعي). الافتراضي: `true`  | انظر المثال أدناه | `true`: المسار الافتراضي (نفس ملف المصدر). `false`: معطل. تنشئ قوالب السلسلة/الوظيفة ملفات لكل لغة. كائن لكل لغة: يتم تعيين كل لغة لنمطها الخاص؛ يؤدي `false` لتخطي تلك اللغة. يؤدي تضمين `{{locale}}` إلى بدء الإنشاء لكل لغة. الـ `fill` على مستوى القاموس له الأولوية دائماً على هذا التكوين العالمي. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | يتحكم في كيفية استيراد القواميس. الافتراضي: `'static'`                                          | `'dynamic'`       | `'static'`: يتم استيراده بشكل ثابت. `'dynamic'`: يتم استيراده بشكل ديناميكي عبر Suspense. `'fetch'`: يتم جلبه ديناميكيًا عبر واجهة برمجة تطبيقات Live Sync. لا يؤثر على `getIntlayer` أو `getDictionary` أو `useDictionary` وما إلى ذلك.                                                                 |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | مكان تخزين القواميس. الافتراضي: `'local'`                                                       | `'remote'`        | `'local'`: نظام الملفات. `'remote'`: Intlayer CMS. `'hybrid'`: كلاهما.                                                                                                                                                                                                                                   |
| `contentAutoTransformation` | `boolean`                                                                                       | يحدد ما إذا كان يجب تحويل ملفات المحتوى تلقائيًا (مثل من Markdown إلى HTML). الافتراضي: `false` | `true`            | مفيد لمعالجة حقول Markdown عبر @intlayer/markdown.                                                                                                                                                                                                                                                       |

**مثال على `fill`**:

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

### تكوين الذكاء الاصطناعي (AI Configuration)

يعرف الإعدادات لميزات Intlayer التي تعمل بالذكاء الاصطناعي ، مثل بناء الترجمة.

| الحقل                | النوع                  | الوصف                                                               | مثال                                        | ملاحظة                                                                            |
| -------------------- | ---------------------- | ------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------- |
| `provider`           | `string`               | مزود الذكاء الاصطناعي المراد استخدامه.                              | `'openai'`، `'anthropic'`، `'googlevertex'` |                                                                                   |
| `model`              | `string`               | نموذج الذكاء الاصطناعي المراد استخدامه.                             | `'gpt-4o'`، `'claude-3-5-sonnet-20240620'`  |                                                                                   |
| `apiKey`             | `string`               | مفتاح واجهة برمجة التطبيقات للمزود المختار.                         | `process.env.OPENAI_API_KEY`                |                                                                                   |
| `applicationContext` | `string`               | سياق إضافي حول تطبيقك لتحسين دقة ترجمة الذكاء الاصطناعي.            | `'منصة تعليمية للأطفال.'`                   |                                                                                   |
| `baseURL`            | `string`               | عنوان URL اختياري للمسار الأساسي لمكالمات واجهة برمجة التطبيقات.    |                                             | مفيد إذا كنت تستخدم بروكسي أو نشر ذكاء اصطناعي محلي.                              |
| `dataSerialization`  | `'json' &#124; 'toon'` | يحدد كيفية إرسال البيانات إلى الذكاء الاصطناعي. الافتراضي: `'json'` | `'json'`                                    | `'json'`: أكثر قوة ودقة. `'toon'`: يستهلك توكنات أقل ولكنه قد يكون أقل استقرارًا. |

---

### تكوين البناء (Build Configuration)

إعدادات عملية بناء وتحسين Intlayer.

| الحقل          | النوع                    | الوصف                                                                                            | مثال | ملاحظة |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------ | ---- | ------ |
| `mode`         | `'auto' &#124; 'manual'` | يحدد ما إذا كان يجب تشغيل Intlayer تلقائيًا أثناء خطوات ما قبل بناء التطبيق. الافتراضي: `'auto'` |      |        |
| `optimize`     | `boolean`                | يحدد ما إذا كان يجب تحسين القواميس المجمعة لوقت التشغيل. الافتراضي: `true` في الإنتاج            |      |        |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | تنسيق الإخراج لملفات القاموس المنشأة. الافتراضي: `['cjs', 'esm']`                                |      |        |
| `checkTypes`   | `boolean`                | يحدد ما إذا كان يجب على Intlayer التحقق من الأنواع في الملفات المنشأة. الافتراضي: `false`        |      |        |

---

### تكوين النظام (System Configuration)

هذه الإعدادات مخصصة لحالات الاستخدام المتقدمة والتكوين الداخلي لـ Intlayer.

| الحقل                     | النوع    | الوصف                        | الافتراضي                         |
| ------------------------- | -------- | ---------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | مجلد القواميس المجمعة.       | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | مجلد زيادة وحدات TypeScript. | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | مجلد القواميس غير المدمجة.   | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | مجلد الأنواع المنشأة.        | `'.intlayer/types'`               |
| `mainDir`                 | `string` | مجلد ملف Intlayer الرئيسي.   | `'.intlayer/main'`                |
| `configDir`               | `string` | مجلد ملفات التكوين المجمعة.  | `'.intlayer/config'`              |
| `cacheDir`                | `string` | مجلد ملفات التخزين المؤقت.   | `'.intlayer/cache'`               |

---

### تكوين المترجم (Compiler Configuration)

إعدادات مترجم Intlayer (`intlayer compiler`).

| الحقل                 | النوع                    | الوصف                                                                | الافتراضي |
| --------------------- | ------------------------ | -------------------------------------------------------------------- | --------- |
| `enabled`             | `boolean`                | يحدد ما إذا كان المترجم نشطًا.                                       | `false`   |
| `output`              | `string &#124; Function` | مسار الإخراج للقواميس المستخرجة.                                     |           |
| `saveComponents`      | `boolean`                | يحدد ما إذا كان يجب استبدال ملفات المصدر الأصلية بالإصدارات المحولة. | `false`   |
| `noMetadata`          | `boolean`                | إذا كان `true` ، فلن يدرج المترجم بيانات وصفية في الملفات المنشأة.   | `false`   |
| `dictionaryKeyPrefix` | `string`                 | بادئة مفتاح قاموس اختيارية.                                          | `''`      |

---

### تكوين المسجل (Logger Configuration)

إعدادات لتخصيص إخراج سجل Intlayer.

| الحقل    | النوع                                          | الوصف                 | الافتراضي      |
| -------- | ---------------------------------------------- | --------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | وضع تسجيل البيانات.   | `'default'`    |
| `prefix` | `string`                                       | البادئة لرسائل السجل. | `'[intlayer]'` |

---

### المخططات المخصصة (Custom Schemas)

| الحقل     | النوع                       | الوصف                                             |
| --------- | --------------------------- | ------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | يسمح لك بتعريف مخططات Zod للتحقق من بنية قواميسك. |

---

### المكونات الإضافية (Plugins)

| الحقل     | النوع              | الوصف                                          |
| --------- | ------------------ | ---------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | قائمة مكونات Intlayer الإضافية المراد تفعيلها. |
