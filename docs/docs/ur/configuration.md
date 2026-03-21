---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: کنفیگریشن (Configuration)
description: اپنی ایپلیکیشن کے لیے Intlayer کو کنفیگر کرنے کا طریقہ سیکھیں۔ Intlayer کو اپنی ضروریات کے مطابق اپنی مرضی کے مطابق بنانے کے لیے دستیاب مختلف ترتیبات اور اختیارات کو سمجھیں۔
keywords:
  - کنفیگریشن
  - ترتیبات
  - حسب ضرورت
  - Intlayer
  - اختیارات
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: 'compiler.output' اور 'dictionary.fill' کے لیے فی لوکیل آبجیکٹ نوٹیشن شامل کی گئی۔
  - version: 8.3.0
    date: 2026-03-11
    changes: 'baseDir' کو 'content' کنفیگریشن سے 'system' کنفیگریشن میں منتقل کر دیا گیا۔
  - version: 8.2.0
    date: 2026-03-09
    changes: کمپائلر (compiler) کے اختیارات اپ ڈیٹ کیے گئے، 'output' اور 'noMetadata' کے لیے سپورٹ شامل کی گئی۔
  - version: 8.1.7
    date: 2026-02-25
    changes: کمپائلر کے اختیارات اپ ڈیٹ کیے گئے۔
  - version: 8.1.5
    date: 2026-02-23
    changes: کمپائلر آپشن 'build-only' اور ڈکشنری پریفکس شامل کیا گیا۔
  - version: 8.0.6
    date: 2026-02-12
    changes: Open Router، Alibaba، Amazon، Google Vertex Bedrock، Fireworks، Groq، Hugging Face اور Together.ai فراہم کنندگان کے لیے سپورٹ شامل کی گئی۔
  - version: 8.0.5
    date: 2026-02-06
    changes: AI کنفیگریشن میں `dataSerialization` شامل کیا گیا۔
  - version: 8.0.0
    date: 2026-01-24
    changes: درکار میکانزم کی بہتر تفصیل کے لیے امپورٹ موڈ `live` کا نام بدل کر `fetch` رکھ دیا گیا۔
  - version: 8.0.0
    date: 2026-01-22
    changes: بلڈ کنفیگریشن `importMode` کو ڈکشنری (`dictionary`) کنفیگریشن میں منتقل کر دیا گیا۔
  - version: 8.0.0
    date: 2026-01-22
    changes: راؤٹنگ کنفیگریشن میں `rewrite` آپشن شامل کیا گیا۔
  - version: 8.0.0
    date: 2026-01-18
    changes: سسٹم کنفیگریشن کو مواد کی کنفیگریشن سے الگ کر دیا گیا۔ اندرونی راستوں کو `system` پراپرٹی میں منتقل کر دیا گیا۔ مواد کی فائلوں اور کوڈ کی تبدیلی کو الگ کرنے کے لیے `codeDir` شامل کیا گیا۔
  - version: 8.0.0
    date: 2026-01-18
    changes: ڈکشنری آپشنز `location` اور `schema` شامل کیے گئے۔
  - version: 7.5.1
    date: 2026-01-10
    changes: JSON5 اور JSONC فائل فارمیٹس کے لیے سپورٹ شامل کی گئی۔
  - version: 7.5.0
    date: 2025-12-17
    changes: `buildMode` آپشن شامل کیا گیا۔
  - version: 7.0.0
    date: 2025-10-25
    changes: `dictionary` کنفیگریشن شامل کی گئی۔
  - version: 7.0.0
    date: 2025-10-21
    changes: `middleware` کو `routing` کنفیگریشن سے بدل دیا گیا۔
  - version: 7.0.0
    date: 2025-10-12
    changes: `formatCommand` آپشن شامل کیا گیا۔
  - version: 6.2.0
    date: 2025-10-12
    changes: `excludedPath` آپشن اپ ڈیٹ کیا گیا۔
  - version: 6.0.2
    date: 2025-09-23
    changes: `outputFormat` آپشن شامل کیا گیا۔
  - version: 6.0.0
    date: 2025-09-21
    changes: `dictionaryOutput` فیلڈ اور `i18nextResourcesDir` فیلڈز ختم کر دی گئیں۔
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` امپورٹ موڈ شامل کیا گیا۔
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` فیلڈ کو `liveSync` سے بدل دیا گیا اور `liveSyncPort` اور `liveSyncURL` فیلڈز شامل کی گئیں۔
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport` کو `importMode` آپشن سے بدل دیا گیا۔
  - version: 5.6.0
    date: 2025-07-13
    changes: ڈیفالٹ contentDir کو `['src']` سے `['.']` میں بدل دیا گیا۔
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` کمانڈز شامل کی گئیں۔
---

# Intlayer کنفیگریشن دستاویزات

## جائزہ

Intlayer کنفیگریشن فائلیں آپ کو پلگ ان کے مختلف پہلوؤں کو حسب ضرورت بنانے کی اجازت دیتی ہیں، جیسے کہ بین الاقوامی بنانا (internationalization)، مڈل ویئر، اور مواد کی ہینڈلنگ۔ یہ دستاویز کنفیگریشن میں موجود ہر پراپرٹی کی تفصیلی وضاحت فراہم کرتی ہے۔

---

## فہرست مضامین

<TOC/>

---

## تعاون یافتہ کنفیگریشن فائل فارمیٹس

Intlayer کنفیگریشن فائل فارمیٹس بشمول JSON، JS، MJS، اور TS قبول کرتا ہے:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## کنفیگریشن فائل کی مثال

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * تمام دستیاب اختیارات دکھانے والی مثال Intlayer کنفیگریشن فائل۔
 */
const config: IntlayerConfig = {
  /**
   * بین الاقوامی بنانے کی ترتیبات کی کنفیگریشن۔
   */
  internationalization: {
    /**
     * ایپلیکیشن میں تعاون یافتہ زبانوں (locales) کی فہرست۔
     * ڈیفالٹ: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * لازمی زبانوں کی فہرست جو ہر ڈکشنری میں بیان ہونی چاہئیں۔
     * اگر خالی ہو تو، `strict` موڈ میں تمام زبانیں لازمی ہیں۔
     * ڈیفالٹ: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * بین الاقوامی مواد کے لیے سختی کی سطح۔
     * - "strict": اگر کوئی بیان شدہ زبان غائب ہو یا بیان نہ کی گئی ہو تو خرابی (Error)۔
     * - "inclusive": اگر بیان شدہ زبان غائب ہو تو وارننگ۔
     * - "loose": کسی بھی موجودہ زبان کو قبول کرتا ہے۔
     * ڈیفالٹ: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * ڈیفالٹ زبان جو بیک اپ کے طور پر استعمال ہوتی ہے اگر مطلوبہ زبان نہ ملے۔
     * ڈیفالٹ: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * ڈکشنری آپریشنز اور بیک اپ رویے کو کنٹرول کرنے والی ترتیبات۔
   */
  dictionary: {
    /**
     * کنٹرول کرتا ہے کہ ڈکشنریز کیسے امپورٹ کی جاتی ہیں۔
     * - "static": بلڈ ٹائم پر سٹیٹک طور پر امپورٹ کی جاتی ہیں۔
     * - "dynamic": Suspense کا استعمال کرتے ہوئے ڈائنامک طور پر امپورٹ کی جاتی ہیں۔
     * - "fetch": لائیو سنک API کے ذریعے ڈائنامک طور پر حاصل کی جاتی ہیں۔
     * ڈیفالٹ: "static"
     */
    importMode: "static",

    /**
     * AI کا استعمال کرتے ہوئے غائب ترجموں کو خود بخود بھرنے کی حکمت عملی۔
     * یہ ایک بولین ویلیو یا بھرے ہوئے مواد کو محفوظ کرنے کے لیے پاتھ پیٹرن ہو سکتا ہے۔
     * ڈیفالٹ: true
     */
    fill: true,

    /**
     * ڈکشنری فائلوں کا جسمانی مقام۔
     * - "local": مقامی فائل سسٹم میں محفوظ۔
     * - "remote": Intlayer CMS میں محفوظ۔
     * - "hybrid": مقامی اور Intlayer CMS دونوں میں محفوظ۔
     * - "plugin" (یا کوئی بھی کسٹم سٹرنگ): کسی پلگ ان یا کسٹم سورس کے ذریعے فراہم کردہ۔
     * ڈیفالٹ: "local"
     */
    location: "local",

    /**
     * کیا مواد کو خود بخود تبدیل کیا جانا چاہیے (مثلاً Markdown سے HTML)۔
     * ڈیفالٹ: false
     */
    contentAutoTransformation: false,
  },

  /**
   * راؤٹنگ اور مڈل ویئر کنفیگریشن۔
   */
  routing: {
    /**
     * زبان کی راؤٹنگ کی حکمت عملی۔
     * - "prefix-no-default": ڈیفالٹ کے علاوہ تمام میں پریفکس شامل کرتا ہے (مثلاً /dashboard, /fr/dashboard)۔
     * - "prefix-all": تمام زبانوں میں پریفکس شامل کرتا ہے (مثلاً /en/dashboard, /fr/dashboard)۔
     * - "no-prefix": URL میں کوئی زبان نہیں۔
     * - "search-params": ?locale=... استعمال کرتا ہے
     * ڈیفالٹ: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * صارف کی منتخب کردہ زبان کہاں محفوظ کرنی ہے۔
     * اختیارات: 'cookie', 'localStorage', 'sessionStorage', 'header' یا ان کی ایک صف (array)۔
     * ڈیفالٹ: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * ایپلیکیشن URLs کے لیے بیس پاتھ۔
     * ڈیفالٹ: ""
     */
    basePath: "",

    /**
     * فی زبان کی بنیاد پر مخصوص راستوں کے لیے کسٹم URL ری رائٹ رولز۔
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * مواد کی فائلیں تلاش کرنے اور ان پر کارروائی کرنے سے متعلق ترتیبات۔
   */
  content: {
    /**
     * ڈکشنریز کو اسکین کرنے کے لیے فائل ایکسٹینشنز۔
     * ڈیفالٹ: ['.content.ts', '.content.js', '.content.json', وغیرہ]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * وہ ڈائریکٹریز جہاں .content فائلیں واقع ہیں۔
     * ڈیفالٹ: ["."]
     */
    contentDir: ["src"],

    /**
     * جہاں سورس کوڈ واقع ہے۔
     * بلڈ آپٹیمائزیشن اور کوڈ کی تبدیلی کے لیے استعمال ہوتا ہے۔
     * ڈیفالٹ: ["."]
     */
    codeDir: ["src"],

    /**
     * اسکیننگ سے خارج کردہ پیٹرنز۔
     * ڈیفالٹ: ['node_modules', '.intlayer', وغیرہ]
     */
    excludedPath: ["node_modules"],

    /**
     * کیا ڈویلپمنٹ کے دوران تبدیلیوں کی نگرانی کی جائے اور ڈکشنریز کو دوبارہ بنایا جائے۔
     * ڈیفالٹ: ڈویلپمنٹ میں true
     */
    watch: true,

    /**
     * نئی تخلیق شدہ / اپ ڈیٹ شدہ .content فائلوں کو فارمیٹ کرنے کے لیے استعمال ہونے والی کمانڈ۔
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * بصری ایڈیٹر (Visual Editor) کنفیگریشن۔
   */
  editor: {
    /**
     * کیا بصری ایڈیٹر فعال ہے۔
     * ڈیفالٹ: false
     */
    enabled: true,

    /**
     * اوریجن کی توثیق (origin validation) کے لیے آپ کی ایپلیکیشن کا URL۔
     * ڈیفالٹ: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * مقامی ایڈیٹر سرور کے لیے پورٹ۔
     * ڈیفالٹ: 8000
     */
    port: 8000,

    /**
     * ایڈیٹر کے لیے پبلک URL۔
     * ڈیفالٹ: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS کا URL۔
     * ڈیفالٹ: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * بیک اینڈ API کا URL۔
     * ڈیفالٹ: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * کیا ریئل ٹائم مواد کی مطابقت پذیری (content sync) کو فعال کرنا ہے۔
     * ڈیفالٹ: false
     */
    liveSync: true,
  },

  /**
   * مصنوعی ذہانت (AI) پر مبنی ترجمے اور تعمیری ترتیبات۔
   */
  ai: {
    /**
     * استعمال کرنے کے لیے AI فراہم کنندہ (provider)۔
     * اختیارات: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * ڈیفالٹ: 'openai'
     */
    provider: "openai",

    /**
     * استعمال کرنے کے لیے منتخب فراہم کنندہ کا ماڈل۔
     */
    model: "gpt-4o",

    /**
     * فراہم کنندہ کی API کلید۔
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * ترجمے تیار کرتے وقت AI کی رہنمائی کے لیے عالمی سیاق و سباق (global context)۔
     */
    applicationContext: "یہ ایک ٹریول بکنگ ایپلیکیشن ہے۔",

    /**
     * AI API کے لیے بیس پاتھ URL۔
     */
    baseURL: "http://localhost:3000",

    /**
     * ڈیٹا سیریلائزیشن (Data Serialization)
     *
     * اختیارات:
     * - "json": ڈیفالٹ، مستحکم؛ زیادہ ٹوکن خرچ کرتا ہے۔
     * - "toon": کم ٹوکن خرچ کرتا ہے، شاید JSON جتنا مستقل نہ ہو۔
     *
     * ڈیفالٹ: "json"
     */
    dataSerialization: "json",
  },

  /**
   * بلڈ اور آپٹیمائزیشن کی ترتیبات۔
   */
  build: {
    /**
     * بلڈ ایگزیکیوشن موڈ۔
     * - "auto": ایپلیکیشن بلڈ کے دوران خود بخود بلڈ ہو جائے گا۔
     * - "manual": ایک واضح بلڈ کمانڈ کی ضرورت ہے۔
     * ڈیفالٹ: "auto"
     */
    mode: "auto",

    /**
     * کیا غیر استعمال شدہ ڈکشنریز کو ہٹا کر فائنل بنڈل کو آپٹیمائز کیا جائے۔
     * ڈیفالٹ: پروڈکشن میں true
     */
    optimize: true,

    /**
     * تیار کردہ ڈکشنری فائلوں کے لیے آؤٹ پٹ فارمیٹ۔
     * ڈیفالٹ: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * اس بات کی نشاندہی کرتا ہے کہ آیا بلڈ کو TypeScript کی اقسام کو چیک کرنا چاہیے۔
     * ڈیفالٹ: false
     */
    checkTypes: false,
  },

  /**
   * لاگر (Logger) کنفیگریشن۔
   */
  log: {
    /**
     * لاگنگ لیول۔
     * - "default": معیاری لاگنگ۔
     * - "verbose": گہری ڈیبگ لاگنگ۔
     * - "disabled": لاگنگ کو غیر فعال کرتا ہے۔
     * ڈیفالٹ: "default"
     */
    mode: "default",

    /**
     * تمام لاگ پیغامات کے لیے پریفکس۔
     * ڈیفالٹ: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * سسٹم کنفیگریشن (اعلی درجے کے استعمال کے لیے)
   */
  system: {
    /**
     * مقامی ڈکشنریز کو محفوظ کرنے کے لیے ڈائریکٹری۔
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * TypeScript ماڈیول بڑھانے (module augmentation) کے لیے ڈائریکٹری۔
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * غیر ضم شدہ (unmerged) ڈکشنریز کو محفوظ کرنے کے لیے ڈائریکٹری۔
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * ڈکشنری کی اقسام کو محفوظ کرنے کے لیے ڈائریکٹری۔
     */
    typesDir: ".intlayer/types",

    /**
     * وہ ڈائریکٹری جہاں مین ایپلیکیشن فائلیں محفوظ ہوتی ہیں۔
     */
    mainDir: ".intlayer/main",

    /**
     * وہ ڈائریکٹری جہاں کنفیگریشن فائلیں محفوظ ہوتی ہیں۔
     */
    configDir: ".intlayer/config",

    /**
     * وہ ڈائریکٹری جہاں کیشے فائلیں محفوظ ہوتی ہیں۔
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * کمپائلر کنفیگریشن (اعلی درجے کے استعمال کے لیے)
   */
  compiler: {
    /**
     * اس بات کی نشاندہی کرتا ہے کہ آیا کمپائلر کو فعال ہونا چاہیے۔
     *
     * - false: کمپائلر کو غیر فعال کرتا ہے۔
     * - true: کمپائلر کو فعال کرتا ہے۔
     * - "build-only": ڈویلپمنٹ کے دوران کمپائلر کو چھوڑ دیتا ہے اور اسٹارٹ اپ ٹائم تیز کرتا ہے۔
     *
     * ڈیفالٹ: false
     */
    enabled: true,

    /**
     * آؤٹ پٹ فائلوں کے لیے پاتھ کی وضاحت کرتا ہے۔ `outputDir` کی جگہ لیتا ہے۔
     *
     * - `./` والے راستے کمپوننٹ ڈائریکٹری کے مقابلے میں حل کیے جاتے ہیں۔
     * - `/` والے راستے پروجیکٹ روٹ (`baseDir`) کے مقابلے میں حل کیے جاتے ہیں۔
     *
     * - راستے میں `{{locale}}` متغیر شامل کرنا فی زبان الگ ڈکشنریز کی تخلیق کا باعث بنے گا۔
     *
     * مثال:
     * ```ts
     * {
     *   // کمپوننٹ کے ساتھ کثیر لسانی .content.ts فائلیں بنائیں۔
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // ٹیمپلیٹ اسٹرنگ کا استعمال کرتے ہوئے مساوی
     * }
     * ```
     *
     * ```ts
     * {
     *   // پروجیکٹ روٹ پر فی زبان مرکزی JSON بنائیں۔
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // ٹیمپلیٹ اسٹرنگ کا استعمال کرتے ہوئے مساوی
     * }
     * ```
     *
     * متغیرات کی فہرست:
     *   - `fileName`: فائل کا نام۔
     *   - `key`: مواد کی کلید (content key)۔
     *   - `locale`: مواد کی زبان۔
     *   - `extension`: فائل ایکسٹینشن۔
     *   - `componentFileName`: کمپوننٹ فائل کا نام۔
     *   - `componentExtension`: کمپوننٹ فائل ایکسٹینشن۔
     *   - `format`: ڈکشنری فارمیٹ۔
     *   - `componentFormat`: کمپوننٹ ڈکشنری فارمیٹ۔
     *   - `componentDirPath`: کمپوننٹ ڈائریکٹری کا راستہ۔
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * اس بات کی نشاندہی کرتا ہے کہ آیا تبدیل ہونے کے بعد کمپوننٹس کو محفوظ کیا جانا چاہیے۔
     * اس طرح، کمپائلر آپ کی ایپلیکیشن کو تبدیل کرنے کے لیے صرف ایک بار چل سکتا ہے اور پھر اسے ہٹایا جا سکتا ہے۔
     */
    saveComponents: false,

    /**
     * تیار کردہ فائل میں صرف مواد داخل کرتا ہے۔ i18next یا ICU MessageFormat کے لیے فی زبان JSON آؤٹ پٹ کے لیے مفید ہے۔
     */
    noMetadata: false,

    /**
     * ڈکشنری کلید کا پریفکس
     */
    dictionaryKeyPrefix: "", // نکالی گئی ڈکشنری کیز میں ایک اختیاری پریفکس شامل کریں۔
  },

  /**
   * ڈکشنری کے مواد کی توثیق کرنے کے لیے کسٹم اسکیمات (Schemas)۔
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * پلگ انز کی کنفیگریشن۔
   */
  plugins: [],
};

export default config;
````

---

## کنفیگریشن حوالہ (Configuration Reference)

مندرجہ ذیل حصے Intlayer میں دستیاب مختلف کنفیگریشن اختیارات کی وضاحت کرتے ہیں۔

---

### بین الاقوامی بنانا (Internationalization) کنفیگریشن

بین الاقوامی بنانا سے متعلق ترتیبات کی وضاحت کرتی ہے، بشمول دستیاب زبانیں اور ایپلیکیشن کے لیے ڈیفالٹ زبان۔

| فیلڈ              | ٹائپ       | تفصیل                                                                                                | مثال                 | نوٹ                                                                                                                                                                                                                                                                                                      |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | ایپلیکیشن میں تعاون یافتہ زبانوں کی فہرست۔ ڈیفالٹ: `[Locales.ENGLISH]`                               | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                          |
| `requiredLocales` | `string[]` | ایپلیکیشن میں لازمی زبانوں کی فہرست۔ ڈیفالٹ: `[]`                                                    | `[]`                 | اگر خالی ہو تو، `strict` موڈ میں تمام زبانیں لازمی ہیں۔ یقینی بنائیں کہ لازمی زبانیں `locales` فیلڈ میں بھی بیان کی گئی ہیں۔                                                                                                                                                                             |
| `strictMode`      | `string`   | TypeScript کے استعمال کے ذریعے بین الاقوامی مواد کے مضبوط نفاذ کی ضمانت دیتا ہے۔ ڈیفالٹ: `inclusive` |                      | اگر `"strict"` ہو: `t` فنکشن کو ہر بیان کردہ زبان کی تعریف درکار ہوتی ہے — اگر کوئی غائب ہو یا بیان نہ کی گئی ہو تو خرابی (error) دیتا ہے۔ اگر `"inclusive"` ہو: غائب زبانوں کے بارے میں وارننگ دیتا ہے لیکن موجودہ غیر بیان شدہ کو قبول کرتا ہے۔ اگر `"loose"` ہو: کسی بھی موجودہ زبان کو قبول کرتا ہے۔ |
| `defaultLocale`   | `string`   | ڈیفالٹ زبان جو بیک اپ کے طور پر استعمال ہوتی ہے اگر مطلوبہ زبان نہ ملے۔ ڈیفالٹ: `Locales.ENGLISH`    | `'en'`               | وہ زبان متعین کرنے کے لیے استعمال ہوتی ہے جب URL، کوکی، یا ہیڈر میں کوئی زبان متعین نہ ہو۔                                                                                                                                                                                                               |

---

### ایڈیٹر کنفیگریشن (Editor Configuration)

انٹیگریٹڈ ایڈیٹر سے متعلق ترتیبات کی وضاحت کرتی ہے، بشمول سرور پورٹ اور ایکٹیویٹی اسٹیٹ۔

| فیلڈ                         | ٹائپ                      | تفصیل                                                                                                                                                                                                                | مثال                                                                                  | نوٹ                                                                                                                                                                                                                                         |
| ---------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | آپ کی ایپلیکیشن کا URL۔ ڈیفالٹ: `''`                                                                                                                                                                                 | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | سیکیورٹی وجوہات کی بنا پر ایڈیٹر کے اوریجن کو محدود کرنے کے لیے استعمال ہوتا ہے۔ اگر `'*'` پر سیٹ ہو تو، ایڈیٹر تک کسی بھی اوریجن سے رسائی حاصل کی جا سکتی ہے۔                                                                              |
| `port`                       | `number`                  | بصری ایڈیٹر (Visual Editor) سرور کے ذریعے استعمال ہونے والا پورٹ۔ ڈیفالٹ: `8000`                                                                                                                                     |                                                                                       |                                                                                                                                                                                                                                             |
| `editorURL`                  | `string`                  | ایڈیٹر سرور URL۔ ڈیفالٹ: `'http://localhost:8000'`                                                                                                                                                                   | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | ان اوریجنز کو محدود کرنے کے لیے استعمال ہوتا ہے جو ایپلیکیشن کے ساتھ تعامل کر سکتے ہیں۔ اگر `'*'` پر سیٹ ہو تو، کسی بھی اوریجن سے قابل رسائی۔ پورٹ تبدیل کرنے پر یا اگر ایڈیٹر کسی دوسرے ڈومین پر ہوسٹ کیا گیا ہو تو اسے سیٹ کرنا ضروری ہے۔ |
| `cmsURL`                     | `string`                  | Intlayer CMS کا URL۔ ڈیفالٹ: `'https://intlayer.org'`                                                                                                                                                                | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                             |
| `backendURL`                 | `string`                  | بیک اینڈ سرور کا URL۔ ڈیفالٹ: `https://back.intlayer.org`                                                                                                                                                            | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                             |
| `enabled`                    | `boolean`                 | اس بات کی نشاندہی کرتا ہے کہ آیا ایپ بصری ایڈیٹر کے ساتھ تعامل کرے گی۔ ڈیفالٹ: `true`                                                                                                                                | `process.env.NODE_ENV !== 'production'`                                               | اگر `false` ہو تو، ایڈیٹر ایپ کے ساتھ تعامل نہیں کر سکتا۔ مخصوص ماحول کے لیے اسے غیر فعال کرنا سیکیورٹی کو مضبوط بناتا ہے۔                                                                                                                  |
| `clientId`                   | `string &#124; undefined` | oAuth2 کا استعمال کرتے ہوئے بیک اینڈ کے ساتھ تصدیق کرنے کے لیے intlayer پیکجز کو قابل بناتا ہے۔ ایکسیس ٹوکن حاصل کرنے کے لیے، [intlayer.org/project](https://app.intlayer.org/project) پر جائیں۔ ڈیفالٹ: `undefined` |                                                                                       | اسے خفیہ رکھیں؛ ماحول کے متغیرات میں محفوظ کریں۔                                                                                                                                                                                            |
| `clientSecret`               | `string &#124; undefined` | oAuth2 کا استعمال کرتے ہوئے بیک اینڈ کے ساتھ تصدیق کرنے کے لیے intlayer پیکجز کو قابل بناتا ہے۔ ایکسیس ٹوکن حاصل کرنے کے لیے، [intlayer.org/project](https://app.intlayer.org/project) پر جائیں۔ ڈیفالٹ: `undefined` |                                                                                       | اسے خفیہ رکھیں؛ ماحول کے متغیرات میں محفوظ کریں۔                                                                                                                                                                                            |
| `dictionaryPriorityStrategy` | `string`                  | مقامی اور دور دراز (local and distant) دونوں ڈکشنریز موجود ہونے کی صورت میں ڈکشنریز کو ترجیح دینے کی حکمت عملی۔ ڈیفالٹ: `'local_first'`                                                                              | `'distant_first'`                                                                     | `'distant_first'`: مقامی پر دور دراز کو ترجیح دیتا ہے۔ `'local_first'`: دور دراز پر مقامی کو ترجیح دیتا ہے۔                                                                                                                                 |
| `liveSync`                   | `boolean`                 | اس بات کی نشاندہی کرتا ہے کہ آیا جب CMS / بصری ایڈیٹر / بیک اینڈ پر کوئی تبدیلی پکڑی جائے تو ایپ سرور کو مواد کو ہاٹ ری لوڈ کرنا چاہیے۔ ڈیفالٹ: `true`                                                               | `true`                                                                                | جب کوئی ڈکشنری شامل/اپ ڈیٹ کی جاتی ہے، تو ایپ صفحہ کے مواد کو اپ ڈیٹ کرتی ہے۔ Live sync مواد کو دوسرے سرور سے آؤٹ سورس کرتا ہے، جو کارکردگی کو تھوڑا سا متاثر کر سکتا ہے۔ دونوں کو ایک ہی مشین پر ہوسٹ کرنے کی سفارش کی جاتی ہے۔            |
| `liveSyncPort`               | `number`                  | لائیو سنک سرور پورٹ۔ ڈیفالٹ: `4000`                                                                                                                                                                                  | `4000`                                                                                |                                                                                                                                                                                                                                             |
| `liveSyncURL`                | `string`                  | لائیو سنک سرور URL۔ ڈیفالٹ: `'http://localhost:{liveSyncPort}'`                                                                                                                                                      | `'https://example.com'`                                                               | پہلے سے طے شدہ طور پر localhost کی نشاندہی کرتا ہے؛ اسے ریموٹ لائیو سنک سرور میں تبدیل کیا جا سکتا ہے۔                                                                                                                                      |

### راؤٹنگ کنفیگریشن (Routing Configuration)

وہ ترتیبات جو راؤٹنگ کے رویے کو کنٹرول کرتی ہیں، بشمول URL ڈھانچہ، زبان کی اسٹوریج، اور مڈل ویئر ہینڈلنگ۔

| فیلڈ       | ٹائپ                                                                                                                                                 | تفصیل                                                                                                                                                                 | مثال                                                                                                                                                                                                                | نوٹ                                                                                                                                                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | زبان کی ہینڈلنگ کے لیے URL راؤٹنگ موڈ۔ ڈیفالٹ: `'prefix-no-default'`                                                                                                  | `'prefix-no-default'`: `/dashboard` (en) یا `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: زبان کسی اور طریقے سے ہینڈل کی جاتی ہے۔ `'search-params'`: `/dashboard?locale=fr` استعمال کرتا ہے | کوکی یا زبان کے اسٹوریج کے انتظام کو متاثر نہیں کرتا۔                                                                                                                                                                                                     |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | کلائنٹ پر زبان کو محفوظ کرنے کے لیے کنفیگریشن۔ ڈیفالٹ: `['cookie', 'header']`                                                                                         | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                                       | نیچے اسٹوریج کے اختیارات والا ٹیبل دیکھیں۔                                                                                                                                                                                                                |
| `basePath` | `string`                                                                                                                                             | ایپلیکیشن URLs کے لیے بیس پاتھ۔ ڈیفالٹ: `''`                                                                                                                          | `'/my-app'`                                                                                                                                                                                                         | اگر ایپ `https://example.com/my-app` پر ہے، تو basePath `'/my-app'` ہے اور URLs `https://example.com/my-app/en` جیسے بن جاتے ہیں۔                                                                                                                         |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | اپنی مرضی کے مطابق URL ری رائٹ رولز جو مخصوص راستوں کے لیے ڈیفالٹ راؤٹنگ موڈ کو اوور رائڈ کرتے ہیں۔ ڈائنامک پیرامیٹرز `[param]` کو سپورٹ کرتا ہے۔ ڈیفالٹ: `undefined` | نیچے دی گئی مثال دیکھیں۔                                                                                                                                                                                            | ری رائٹ رول کو `mode` پر فوقیت حاصل ہے۔ Next.js اور Vite کے ساتھ کام کرتا ہے۔ `getLocalizedUrl()` خود بخود مماثل قوانین لاگو کرتا ہے۔ دیکھیں [Custom URL Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/custom_url_rewrites.md)۔ |

**`rewrite` کی مثال**:

```typescript
routing: {
  mode: "prefix-no-default", // بیک اپ حکمت عملی
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

#### اسٹوریج کے اختیارات (Storage Options)

| ویلیو              | تفصیل                                                                                     | نوٹ                                                                                                                                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | زبان کو کوکیز میں محفوظ کرتا ہے — کلائنٹ اور سرور دونوں اطراف سے قابل رسائی۔              | GDPR کی تعمیل کے لیے، یقینی بنائیں کہ صارف کی مناسب رضامندی حاصل کی گئی ہے۔ `CookiesAttributes` کے ذریعے اپنی مرضی کے مطابق بنایا جا سکتا ہے (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`)۔ |
| `'localStorage'`   | براونزر میں زبان کو بغیر کسی میعاد ختم ہونے کی تاریخ کے محفوظ کرتا ہے — صرف کلائنٹ سائیڈ۔ | جب تک واضح طور پر صاف نہ کیا جائے میعاد ختم نہیں ہوتی۔ Intlayer پراکسی اس تک رسائی حاصل نہیں کر سکتی۔ `StorageAttributes` کے ذریعے حسب ضرورت بنایا جا سکتا ہے (`{ type: 'localStorage', name: 'custom-locale' }`)۔         |
| `'sessionStorage'` | صفحہ کے سیشن کی مدت کے لیے زبان کو محفوظ کرتا ہے — صرف کلائنٹ سائیڈ۔                      | ٹیب/ونڈو بند ہونے پر صاف کر دیا جاتا ہے۔ Intlayer پراکسی اس تک رسائی حاصل نہیں کر سکتی۔ `StorageAttributes` کے ذریعے حسب ضرورت بنایا جا سکتا ہے (`{ type: 'sessionStorage', name: 'custom-locale' }`)۔                     |
| `'header'`         | HTTP ہیڈرز کے ذریعے زبان کو اسٹور یا منتقل کرتا ہے — صرف سرور سائیڈ۔                      | API کالز کے لیے مفید ہے۔ کلائنٹ سائیڈ اس تک رسائی حاصل نہیں کر سکتی۔ `StorageAttributes` کے ذریعے اپنی مرضی کے مطابق بنایا جا سکتا ہے (`{ type: 'header', name: 'custom-locale' }`)۔                                       |

#### کوکی ایٹریبیوٹس (Cookie Attributes)

کوکی اسٹوریج استعمال کرتے وقت، آپ اضافی کوکی ایٹریبیوٹس کو کنفیگر کر سکتے ہیں:

| فیلڈ       | ٹائپ                                  | تفصیل                                                         |
| ---------- | ------------------------------------- | ------------------------------------------------------------- |
| `name`     | `string`                              | کوکی کا نام۔ ڈیفالٹ: `'INTLAYER_LOCALE'`                      |
| `domain`   | `string`                              | کوکی ڈومین۔ ڈیفالٹ: `undefined`                               |
| `path`     | `string`                              | کوکی پاتھ۔ ڈیفالٹ: `undefined`                                |
| `secure`   | `boolean`                             | HTTPS کی ضرورت ہے۔ ڈیفالٹ: `undefined`                        |
| `httpOnly` | `boolean`                             | HTTP-only فلیگ۔ ڈیفالٹ: `undefined`                           |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite پالیسی۔                                              |
| `expires`  | `Date &#124; number`                  | میعاد ختم ہونے کی تاریخ یا دنوں کی تعداد۔ ڈیفالٹ: `undefined` |

#### زبان اسٹوریج ایٹریبیوٹس (Locale Storage Attributes)

localStorage یا sessionStorage استعمال کرتے وقت:

| فیلڈ   | ٹائپ                                     | تفصیل                                            |
| ------ | ---------------------------------------- | ------------------------------------------------ |
| `type` | `'localStorage' &#124; 'sessionStorage'` | اسٹوریج کی قسم۔                                  |
| `name` | `string`                                 | اسٹوریج کلید کا نام۔ ڈیفالٹ: `'INTLAYER_LOCALE'` |

#### کنفیگریشن کی مثالیں

نئے v7 راؤٹنگ ڈھانچے کے لیے کچھ عام کنفیگریشن مثالیں یہاں ہیں:

**بنیادی کنفیگریشن (ڈیفالٹ)**:

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

**GDPR کے مطابق کنفیگریشن**:

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

**تلاش پیرامیٹرز موڈ (Search Parameters Mode)**:

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

**کسٹم اسٹوریج کے ساتھ کوئی پریفکس موڈ نہیں (No Prefix Mode)**:

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

**ڈائنامک راستوں کے ساتھ کسٹم URL ری رائٹ**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // ان راستوں کے لیے بیک اپ جو ری رائٹ نہیں کیے گئے
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

### کینٹینٹ کنفیگریشن (Content Configuration)

ایپلیکیشن کے اندر مواد کی پروسیسنگ سے متعلق ترتیبات (ڈائریکٹری کے نام، فائل ایکسٹینشنز، اور اخذ کردہ کنفیگریشنز)۔

| فیلڈ             | ٹائپ       | تفصیل                                                                                                                                                                                       | مثال                                | نوٹ                                                                                                                                    |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | اس بات کی نشاندہی کرتا ہے کہ آیا Intlayer کو ڈکشنریز دوبارہ بنانے کے لیے مواد کے اعلان کی فائلوں میں تبدیلیوں کی نگرانی کرنی چاہیے۔ ڈیفالٹ: `process.env.NODE_ENV === 'development'`        |                                     |                                                                                                                                        |
| `fileExtensions` | `string[]` | مواد کے اعلان کی فائلوں کو اسکین کرنے کے لیے فائل ایکسٹینشنز۔ ڈیفالٹ: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                        |
| `contentDir`     | `string[]` | ڈائریکٹری راستے جہاں مواد کے اعلان کی فائلیں واقع ہیں۔ ڈیفالٹ: `['.']`                                                                                                                      | `['src/content']`                   |                                                                                                                                        |
| `codeDir`        | `string[]` | ڈائریکٹری راستے جہاں آپ کی ایپلیکیشن کی سورس کوڈ فائلیں واقع ہیں۔ ڈیفالٹ: `['.']`                                                                                                           | `['src']`                           | بلڈ کو آپٹیمائز کرنے اور اس بات کو یقینی بنانے کے لیے استعمال کیا جاتا ہے کہ کوڈ کی تبدیلی اور ہاٹ ری لوڈ صرف ضروری فائلوں پر لاگو ہو۔ |
| `excludedPath`   | `string[]` | مواد کی اسکیننگ سے خارج ہونے والے راستے۔ ڈیفالٹ: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                  | `['src/styles']`                    |                                                                                                                                        |
| `formatCommand`  | `string`   | وہ کمانڈ جو نئی تخلیق شدہ یا اپ ڈیٹ شدہ مواد کی فائلوں کو فارمیٹ کرنے کے لیے چلائی جائے گی۔ ڈیفالٹ: `undefined`                                                                             | `'npx prettier --write "{{file}}"'` | مواد نکالنے کے دوران یا بصری ایڈیٹر کے ذریعے استعمال ہوتا ہے۔                                                                          |

---

### ڈکشنری کنفیگریشن (Dictionary Configuration)

وہ ترتیبات جو ڈکشنری آپریشنز کو کنٹرول کرتی ہیں، بشمول خود بخود بھرنے (auto-filling) کے رویے اور مواد کی تخلیق۔

اس ڈکشنری کنفیگریشن کے دو اہم مقاصد ہیں:

1. **ڈیفالٹ اقدار (Default values)**: مواد کے اعلان کی فائلیں بناتے وقت ڈیفالٹ اقدار کی وضاحت کرنا۔
2. **بیک اپ رویہ (Fallback behaviour)**: ڈکشنری آپریشنز کے رویے کو عالمی سطح پر ترتیب دینے کی اجازت دیتا ہے، جب مخصوص فیلڈز بیان نہ کیے گئے ہوں تو بیک اپ اقدار فراہم کرتا ہے۔

مواد کے اعلان کی فائلوں اور کنفیگریشن کی اقدار کو لاگو کرنے کے طریقے کے بارے میں مزید معلومات کے لیے، [کونٹینٹ فائل دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) دیکھیں۔

| فیلڈ                        | ٹائپ                                                                                            | تفصیل                                                                                     | مثال                    | نوٹ                                                                                                                                                                                                                                                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | کنٹرول کرتا ہے کہ آٹو فل (AI ترجمہ) آؤٹ پٹ فائلیں کیسے تیار کی جاتی ہیں۔ ڈیفالٹ: `true`   | نیچے دی گئی مثال دیکھیں | `true`: ڈیفالٹ پاتھ (وہی فائل جو سورس ہے)۔ `false`: غیر فعال۔ سٹرنگ/فنکشن پیٹرنز فی زبان فائلیں جنریٹ کرتے ہیں۔ فی زبان آبجیکٹ: ہر زبان اپنے پیٹرن پر میپ ہوتی ہے؛ `false` اس زبان کو چھوڑ دیتا ہے۔ `{{locale}}` متغیر شامل کرنا فی زبان جنریشن کو متحرک کرتا ہے۔ ڈکشنری کی سطح پر `fill` ہمیشہ اس عالمی کنفیگریشن پر فوقیت رکھتا ہے۔ |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | کنٹرول کرتا ہے کہ ڈکشنریز کیسے امپورٹ کی جاتی ہیں۔ ڈیفالٹ: `'static'`                     | `'dynamic'`             | `'static'`: سٹیٹک طور پر امپورٹ کی گئی۔ `'dynamic'`: 'Suspense' کے ذریعے ڈائنامک طور پر امپورٹ کی گئی۔ `'fetch'`: 'Live Sync API' کے ذریعے ڈائنامک طور پر حاصل کی گئی۔ یہ `getIntlayer` ، `getDictionary` ، `useDictionary` وغیرہ کو متاثر نہیں کرتا۔                                                                                 |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | ڈکشنریز کہاں محفوظ ہوتی ہیں۔ ڈیفالٹ: `'local'`                                            | `'remote'`              | `'local'`: فائل سسٹم۔ `'remote'`: Intlayer CMS. `'hybrid'`: دونوں۔                                                                                                                                                                                                                                                                    |
| `contentAutoTransformation` | `boolean`                                                                                       | کیا مواد کی فائلوں کو خود بخود تبدیل ہونا چاہیے (مثلاً Markdown سے HTML)۔ ڈیفالٹ: `false` | `true`                  | @intlayer/markdown کے ذریعے Markdown فیلڈز پر کارروائی کرنے کے لیے مفید ہے۔                                                                                                                                                                                                                                                           |

**`fill` کی مثال**:

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

### AI کنفیگریشن (AI Configuration)

Intlayer کی AI سے چلنے والی خصوصیات کے لیے ترتیبات کی وضاحت کرتی ہے، جیسے کہ بلڈ ٹرانسلیشن۔

| فیلڈ                 | ٹائپ                   | تفصیل                                                                                  | مثال                                        | نوٹ                                                                                       |
| -------------------- | ---------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `provider`           | `string`               | استعمال کرنے کے لیے AI فراہم کنندہ۔                                                    | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                           |
| `model`              | `string`               | استعمال کرنے کے لیے AI ماڈل۔                                                           | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                           |
| `apiKey`             | `string`               | منتخب فراہم کنندہ کے لیے API کلید۔                                                     | `process.env.OPENAI_API_KEY`                |                                                                                           |
| `applicationContext` | `string`               | AI ترجمہ کی درستگی کو بہتر بنانے کے لیے آپ کی ایپلیکیشن کے بارے میں اضافی سیاق و سباق۔ | `'بچوں کے لیے ایک سیکھنے کا پلیٹ فارم۔'`    |                                                                                           |
| `baseURL`            | `string`               | API کالز کے لیے اختیاری بیس پاتھ URL۔                                                  |                                             | اگر آپ پراکسی یا لوکل AI تعیناتی (deployment) استعمال کر رہے ہیں تو مفید ہے۔              |
| `dataSerialization`  | `'json' &#124; 'toon'` | AI کو ڈیٹا بھیجنے کے طریقہ کی وضاحت کرتا ہے۔ ڈیفالٹ: `'json'`                          | `'json'`                                    | `'json'`: زیادہ مستحکم اور درست۔ `'toon'`: کم ٹوکن خرچ کرتا ہے لیکن کم مستحکم ہو سکتا ہے۔ |

---

### بلڈ کنفیگریشن (Build Configuration)

Intlayer بلڈ پروسیس اور آپٹیمائزیشن کی ترتیبات۔

| فیلڈ           | ٹائپ                     | تفصیل                                                                                                                     | مثال | نوٹ |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---- | --- |
| `mode`         | `'auto' &#124; 'manual'` | اس بات کی نشاندہی کرتا ہے کہ آیا ایپ کے پری بلڈ مراحل کے دوران Intlayer کو خود بخود چلنا چاہیے۔ ڈیفالٹ: `'auto'`          |      |     |
| `optimize`     | `boolean`                | اس بات کی نشاندہی کرتا ہے کہ آیا کمپائل شدہ ڈکشنریز کو رن ٹائم کے لیے آپٹیمائز کیا جانا چاہیے۔ ڈیفالٹ: پروڈکشن میں `true` |      |     |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | تیار کردہ ڈکشنری فائلوں کے لیے آؤٹ پٹ فارمیٹ۔ ڈیفالٹ: `['cjs', 'esm']`                                                    |      |     |
| `checkTypes`   | `boolean`                | اس بات کی نشاندہی کرتا ہے کہ آیا Intlayer کو تیار کردہ فائلوں میں اقسام (types) کو چیک کرنا چاہیے۔ ڈیفالٹ: `false`        |      |     |

---

### سسٹم کنفیگریشن (System Configuration)

یہ ترتیبات اعلی درجے کے استعمال کے معاملات اور Intlayer کی اندرونی کنفیگریشن کے لیے ہیں۔

| فیلڈ                      | ٹائپ     | تفصیل                                   | ڈیفالٹ                            |
| ------------------------- | -------- | --------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | مرتب شدہ ڈکشنریز کی ڈائریکٹری۔          | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | TypeScript ماڈیول بڑھانے کی ڈائریکٹری۔  | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | غیر ضم شدہ ڈکشنریز کی ڈائریکٹری۔        | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | تیار کردہ اقسام (types) کی ڈائریکٹری۔   | `'.intlayer/types'`               |
| `mainDir`                 | `string` | مین Intlayer فائل کی ڈائریکٹری۔         | `'.intlayer/main'`                |
| `configDir`               | `string` | مرتب شدہ کنفیگریشن فائلوں کی ڈائریکٹری۔ | `'.intlayer/config'`              |
| `cacheDir`                | `string` | کیشے فائلوں کی ڈائریکٹری۔               | `'.intlayer/cache'`               |

---

### کمپائلر کنفیگریشن (Compiler Configuration)

Intlayer کمپائلر (`intlayer compiler`) کی ترتیبات۔

| فیلڈ                  | ٹائپ                     | تفصیل                                                                                                | ڈیفالٹ  |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- | ------- |
| `enabled`             | `boolean`                | بتاتا ہے کہ آیا کمپائلر فعال ہے۔                                                                     | `false` |
| `output`              | `string &#124; Function` | نکالی گئی ڈکشنریز کے لیے آؤٹ پٹ پاتھ۔                                                                |         |
| `saveComponents`      | `boolean`                | اس بات کی نشاندہی کرتا ہے کہ آیا اصل سورس فائلوں کو تبدیل شدہ ورژن کے ساتھ اوور رائٹ کیا جانا چاہیے۔ | `false` |
| `noMetadata`          | `boolean`                | اگر `true` ہو تو، کمپائلر تیار کردہ فائلوں میں میٹا ڈیٹا شامل نہیں کرے گا۔                           | `false` |
| `dictionaryKeyPrefix` | `string`                 | اختیاری ڈکشنری کلید کا پریفکس۔                                                                       | `''`    |

---

### لاگر کنفیگریشن (Logger Configuration)

Intlayer لاگ آؤٹ پٹ کو حسب ضرورت بنانے کی ترتیبات۔

| فیلڈ     | ٹائپ                                           | تفصیل                  | ڈیفالٹ         |
| -------- | ---------------------------------------------- | ---------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | لاگنگ موڈ۔             | `'default'`    |
| `prefix` | `string`                                       | لاگ پیغامات کا پریفکس۔ | `'[intlayer]'` |

---

### کسٹم اسکیمات (Custom Schemas)

| فیلڈ      | ٹائپ                        | تفصیل                                                                                       |
| --------- | --------------------------- | ------------------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | آپ کو اپنی ڈکشنریز کی ساخت کی توثیق کرنے کے لیے Zod اسکیمات کی وضاحت کرنے کی اجازت دیتا ہے۔ |

---

### پلگ انز (Plugins)

| فیلڈ      | ٹائپ               | تفصیل                                       |
| --------- | ------------------ | ------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | فعال کرنے کے لیے Intlayer پلگ انز کی فہرست۔ |
