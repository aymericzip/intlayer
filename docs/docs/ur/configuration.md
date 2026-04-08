---
createdAt: 2024-08-13
updatedAt: 2026-04-03
title: ترتیب (Configuration)
description: سیکھیں کہ اپنی ایپلیکیشن کے لیے Intlayer کو کیسے ترتیب دینا ہے۔ اپنی ضروریات کے مطابق Intlayer کو اپنی مرضی کے مطابق بنانے کے لیے دستیاب مختلف ترتیبات اور اختیارات کو سمجھیں۔
keywords:
  - Configuration
  - Settings
  - Customization
  - Intlayer
  - Options
  - ترتیب
  - ترتیبات
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.7.0
    date: 2026-04-07
    changes: "بلڈ کنفیگریشن میں `minify` اور `prune` کے اختیارات شامل کیے گئے۔"
  - version: 8.7.0
    date: 2026-04-03
    changes: "`currentDomain` آپشن شامل کیا گیا۔"
  - version: 8.4.0
    date: 2026-03-20
    changes: "'compiler.output' اور 'dictionary.fill' کے لیے فی لوکیل (per-locale) نوٹیشن شامل کی گئی۔"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir' کو 'content' کنفیگ سے 'system' کنفیگ میں منتقل کیا گیا۔"
  - version: 8.2.0
    date: 2026-03-09
    changes: "کمپائلر کے اختیارات کو اپ ڈیٹ کیا گیا، 'output' اور 'noMetadata' کی سپورٹ شامل کی گئی۔"
  - version: 8.1.7
    date: 2026-02-25
    changes: "کمپائلر کے اختیارات کو اپ ڈیٹ کیا گیا"
  - version: 8.1.5
    date: 2026-02-23
    changes: "کمپائلر آپشن 'build-only' اور لغت کا سابقہ (prefix) شامل کیا گیا۔"
  - version: 8.0.6
    date: 2026-02-12
    changes: "اوپن راؤٹر، علی بابا، ایمیزون، گوگل ورٹیکس بیڈراک، فائر ورکس، گروق، ہگنگ فیس، اور Together.ai فراہم کنندگان کے لیے سپورٹ شامل کی گئی۔"
  - version: 8.0.5
    date: 2026-02-06
    changes: "AI کنفیگریشن میں `dataSerialization` شامل کیا گیا۔"
  - version: 8.0.0
    date: 2026-01-24
    changes: "اندرونی طریقہ کار کو بہتر طور پر بیان کرنے کے لیے `live` امپورٹ موڈ کا نام تبدیل کر کے `fetch` کر دیا گیا۔"
  - version: 8.0.0
    date: 2026-01-22
    changes: "`importMode` بلڈ کنفیگریشن کو `dictionary` کنفیگریشن میں منتقل کیا گیا۔"
  - version: 8.0.0
    date: 2026-01-22
    changes: "راؤٹنگ کنفیگریشن میں `rewrite` آپشن شامل کیا گیا۔"
  - version: 8.0.0
    date: 2026-01-18
    changes: "سسٹم کنفیگریشن کو مواد (content) کنفیگریشن سے الگ کیا گیا۔ اندرونی راستوں کو `system` پراپرٹی میں منتقل کیا گیا۔ مواد کی فائلوں کو کوڈ کی تبدیلی سے الگ کرنے کے لیے `codeDir` شامل کیا گیا۔"
  - version: 8.0.0
    date: 2026-01-18
    changes: "لغت کے اختیارات `location` اور `schema` شامل کیے گئے۔"
  - version: 7.5.1
    date: 2026-01-10
    changes: "JSON5 اور JSONC فائل فارمیٹس کے لیے سپورٹ شامل کی گئی۔"
  - version: 7.5.0
    date: 2025-12-17
    changes: "`buildMode` آپشن شامل کیا گیا۔"
  - version: 7.0.0
    date: 2025-10-25
    changes: "`dictionary` کنفیگریشن شامل کی گئی۔"
  - version: 7.0.0
    date: 2025-10-21
    changes: "`middleware` کو `routing` کنفیگریشن سے بدل دیا گیا۔"
  - version: 7.0.0
    date: 2025-10-12
    changes: "`formatCommand` آپشن شامل کیا گیا۔"
  - version: 6.2.0
    date: 2025-10-12
    changes: "`excludedPath` آپشن کو اپ ڈیٹ کیا گیا۔"
  - version: 6.0.2
    date: 2025-09-23
    changes: "`outputFormat` آپشن شامل کیا گیا۔"
  - version: 6.0.0
    date: 2025-09-21
    changes: "`dictionaryOutput` فیلڈ اور `i18nextResourcesDir` فیلڈ کو ہٹا دیا گیا۔"
  - version: 6.0.0
    date: 2025-09-16
    changes: "`live` امپورٹ موڈ شامل کیا گیا۔"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` فیلڈ کو `liveSync` سے بدل دیا گیا اور `liveSyncPort` اور `liveSyncURL` فیلڈز شامل کی گئیں۔"
  - version: 5.6.1
    date: 2025-07-25
    changes: "`activateDynamicImport` کو `importMode` آپشن سے بدل دیا گیا۔"
  - version: 5.6.0
    date: 2025-07-13
    changes: "ڈیفالٹ contentDir کو `['src']` سے بدل کر `['.']` کر دیا گیا۔"
  - version: 5.5.11
    date: 2025-06-29
    changes: "`docs` کمانڈز شامل کی گئیں۔"
---

# Intlayer کنفیگریشن دستاویزات

## جائزہ

Intlayer کنفیگریشن فائلیں پلگ ان کے مختلف پہلوؤں بشمول بین الاقوامی کاری (i18n)، مڈل ویئر، اور مواد کی ہینڈلنگ کو حسب ضرورت بنانے کی اجازت دیتی ہیں۔ یہ دستاویز کنفیگریشن میں موجود ہر پراپرٹی کی تفصیلی وضاحت فراہم کرتی ہے۔

---

## فہرست مضامین

<TOC/>

---

## کنفیگریشن فائل سپورٹ

Intlayer JSON، JS، MJS، اور TS کنفیگریشن فائل فارمیٹس کو قبول کرتا ہے:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## مثال کنفیگریشن فائل

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * تمام دستیاب اختیارات کو ظاہر کرنے والی مثال Intlayer کنفیگریشن فائل۔
 */
const config: IntlayerConfig = {
  /**
   * بین الاقوامی کاری (internationalization) کی ترتیبات کی کنفیگریشن۔
   */
  internationalization: {
    /**
     * ایپلیکیشن میں سپورٹڈ لوکلز کی فہرست۔
     * ڈیفالٹ: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * مطلوبہ لوکلز کی فہرست جو ہر لغت میں بیان ہونا ضروری ہیں۔
     * اگر خالی ہو، تو `strict` موڈ میں تمام لوکلز مطلوبہ ہوں گے۔
     * ڈیفالٹ: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * بین الاقوامی مواد کے لیے سختی کی سطح۔
     * - "strict": اگر کوئی اعلان کردہ لوکل غائب ہو تو ایرر دیتا ہے۔
     * - "inclusive": اگر اعلان کردہ لوکل غائب ہو تو وارننگ دیتا ہے۔
     * - "loose": کسی بھی موجودہ لوکل کو قبول کرتا ہے۔
     * ڈیفالٹ: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * ڈیفالٹ لوکل جو فال بیک کے طور پر استعمال ہوتا ہے اگر مطلوبہ لوکل نہ ملے۔
     * ڈیفالٹ: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * لغت (dictionary) کے آپریشنز اور فال بیک رویے کو کنٹرول کرنے والی ترتیبات۔
   */
  dictionary: {
    /**
     * کنٹرول کرتا ہے کہ لغات کیسے امپورٹ کی جاتی ہیں۔
     * - "static": بلڈ ٹائم پر ساکن طور پر امپورٹ کیا جاتا ہے۔
     * - "dynamic": Suspense استعمال کرتے ہوئے متحرک طور پر امپورٹ کیا جاتا ہے۔
     * - "fetch": لائیو سنک API کے ذریعے متحرک طور پر حاصل کیا جاتا ہے۔
     * ڈیفالٹ: "static"
     */
    importMode: "static",

    /**
     * AI استعمال کرتے ہوئے غائب شدہ ترجموں کو خودکار طور پر بھرنے کی حکمت عملی۔
     * یہ بولین یا بھرے ہوئے مواد کو محفوظ کرنے کے لیے پاتھ پیٹرن ہو سکتا ہے۔
     * ڈیفالٹ: true
     */
    fill: true,

    /**
     * لغت کی فائلوں کا جسمانی محل وقوع۔
     * - "local": مقامی فائل سسٹم میں محفوظ۔
     * - "remote": Intlayer CMS میں محفوظ۔
     * - "hybrid": مقامی فائل سسٹم اور Intlayer CMS دونوں میں محفوظ۔
     * - "plugin" (یا کوئی بھی کسٹم اسٹرنگ): پلگ ان یا کسی کسٹم ذریعے سے فراہم کردہ۔
     * ڈیفالٹ: "local"
     */
    location: "local",

    /**
     * کیا مواد کو خودکار طور پر تبدیل کرنا ہے (مثلاً Markdown سے HTML)۔
     * ڈیفالٹ: false
     */
    contentAutoTransformation: false,
  },

  /**
   * راؤٹنگ اور مڈل ویئر کنفیگریشن۔
   */
  routing: {
    /**
     * لوکل راؤٹنگ حکمت عملی۔
     * - "prefix-no-default": ڈیفالٹ لوکل کے علاوہ سب کے لیے سابقہ (مثلاً /dashboard، /fr/dashboard)۔
     * - "prefix-all": تمام لوکلز کے لیے سابقہ (مثلاً /en/dashboard، /fr/dashboard)۔
     * - "no-prefix": URL میں کوئی لوکل نہیں۔
     * - "search-params": ?locale=... استعمال کریں۔
     * ڈیفالٹ: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * صارف کے منتخب کردہ لوکل کو کہاں محفوظ کرنا ہے۔
     * اختیارات: 'cookie', 'localStorage', 'sessionStorage', 'header'، یا ان کا مجموعہ۔
     * ڈیفالٹ: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * ایپلیکیشن URLs کے لیے بنیادی راستہ۔
     * ڈیفالٹ: ""
     */
    basePath: "",

    /**
     * لوکل مخصوص راستوں کے لیے کسٹم URL رائٹنگ قواعد۔
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * ڈومین پر مبنی راؤٹنگ کے لیے لوکلز کو ڈومین ہوسٹ نیمز کے ساتھ میپ کرتا ہے۔
     * ان لوکلز کے URLs مطلق (absolute) ہوں گے (مثلاً https://intlayer.cn/)۔
     * ڈومین خود لوکل کی نشاندہی کرتا ہے، اس لیے پاتھ میں کوئی لوکل سابقہ (prefix) شامل نہیں کیا جاتا۔
     * ڈیفالٹ: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * مواد کی فائلوں کو تلاش کرنے اور ان پر کارروائی کرنے کی ترتیبات۔
   */
  content: {
    /**
     * لغات کے لیے اسکین کی جانے والی فائل ایکسٹینشنز۔
     * ڈیفالٹ: ['.content.ts', '.content.js', '.content.json', وغیرہ]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * وہ ڈائریکٹریز جہاں .content فائلیں واقع ہیں۔
     * ڈیفالٹ: ["."]
     */
    contentDir: ["src"],

    /**
     * وہ ڈائریکٹریز جہاں سورس کوڈ واقع ہے۔
     * بلڈ آپٹیمائزیشن اور کوڈ ٹرانسفارمیشن کے لیے استعمال ہوتا ہے۔
     * ڈیفالٹ: ["."]
     */
    codeDir: ["src"],

    /**
     * اسکیننگ سے خارج کیے جانے والے پیٹرنز۔
     * ڈیفالٹ: ['node_modules', '.intlayer', وغیرہ]
     */
    excludedPath: ["node_modules"],

    /**
     * کیا تبدیلیوں کی نگرانی کرنی ہے اور ڈیولپمنٹ میں لغات کو دوبارہ بنانا ہے۔
     * ڈیفالٹ: ڈیولپمنٹ میں true
     */
    watch: true,

    /**
     * نئی تخلیق شدہ / اپ ڈیٹ شدہ .content فائلوں کو فارمیٹ کرنے کی کمانڈ۔
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Visual Editor کنفیگریشن۔
   */
  editor: {
    /**
     * کیا بصری ایڈیٹر فعال ہے۔
     * ڈیفالٹ: false
     */
    enabled: true,

    /**
     * اصل کی توثیق (origin validation) کے لیے آپ کی ایپلیکیشن کا URL۔
     * ڈیفالٹ: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * مقامی ایڈیٹر سرور کے لیے پورٹ۔
     * ڈیفالٹ: 8000
     */
    port: 8000,

    /**
     * ایڈیٹر کے لیے عوامی URL۔
     * ڈیفالٹ: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL۔
     * ڈیفالٹ: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * بیک اینڈ API URL۔
     * ڈیفالٹ: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * کیا حقیقی وقت میں مواد کی ہم آہنگی (real-time sync) کو فعال کرنا ہے۔
     * ڈیفالٹ: false
     */
    liveSync: true,
  },

  /**
   * AI کے ذریعے ترجمہ اور تیاری کی ترتیبات۔
   */
  ai: {
    /**
     * استعمال کیا جانے والا AI فراہم کنندہ۔
     * اختیارات: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * ڈیفالٹ: 'openai'
     */
    provider: "openai",

    /**
     * منتخب کردہ فراہم کنندہ سے استعمال کیا جانے والا ماڈل۔
     */
    model: "gpt-4o",

    /**
     * فراہم کنندہ کی API کلید۔
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * ترجمہ تیار کرنے میں AI کی رہنمائی کے لیے عالمی تناظر۔
     */
    applicationContext: "یہ ایک ٹریول بکنگ ایپلیکیشن ہے۔",

    /**
     * AI API کے لیے بنیادی URL۔
     */
    baseURL: "http://localhost:3000",

    /**
     * ڈیٹا سیریلائزیشن
     *
     * اختیارات:
     * - "json": معیاری، قابل اعتماد؛ زیادہ ٹوکن استعمال کرتا ہے۔
     * - "toon": کم ٹوکن، JSON کے مقابلے میں کم مستقل۔
     *
     * ڈیفالٹ: "json"
     */
    dataSerialization: "json",
  },

  /**
   * بلڈ اور آپٹیمائزیشن ترتیبات۔
   */
  build: {
    /**
     * بلڈ ایگزیکیوشن موڈ۔
     * - "auto": ایپ بلڈ کے دوران خودکار بلڈ۔
     * - "manual": واضح بلڈ کمانڈ کی ضرورت ہے۔
     * ڈیفالٹ: "auto"
     */
    mode: "auto",

    /**
     * کیا غیر استعمال شدہ لغات کو ہٹا کر حتمی بنڈل کو آپٹیمائز کرنا ہے۔
     * ڈیفالٹ: پروڈکشن میں true
     */
    optimize: true,

    /**
     * بنڈل کے سائز کو کم کرنے کے لیے لغات کو منی فائی (minify) کریں۔
     * ڈیفالٹ: false
     *
     * نوٹ:
     * - اگر `optimize` غیر فعال ہو تو اسے نظر انداز کر دیا جائے گا۔
     * - اگر `editor.enabled` کی ویلیو true ہو تو اسے نظر انداز کر دیا جائے گا۔
     */
    minify: true,

    /**
     * لغات میں غیر استعمال شدہ کلیدوں کو ہٹا دیں (prune)۔
     * ڈیفالٹ: false
     *
     * نوٹ:
     * - اگر `optimize` غیر فعال ہو تو اسے نظر انداز کر دیا جائے گا۔
     */
    prune: true,

    /**
     * تیار کردہ لغت فائلوں کے لیے آؤٹ پٹ فارمیٹ۔
     * ڈیفالٹ: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * بتاتا ہے کہ آیا بلڈ کو TypeScript اقسام (types) کو چیک کرنا چاہیے۔
     * ڈیفالٹ: false
     */
    checkTypes: false,
  },

  /**
   * لاگر (Logger) کنفیگریشن۔
   */
  log: {
    /**
     * لاگنگ کی سطح۔
     * - "default": معیاری لاگنگ۔
     * - "verbose": تفصیلی ڈیبگ لاگنگ۔
     * - "disabled": کوئی لاگنگ نہیں۔
     * ڈیفالٹ: "default"
     */
    mode: "default",

    /**
     * تمام لاگ پیغامات کے لیے سابقہ (prefix)۔
     * ڈیفالٹ: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * سسٹم کنفیگریشن (اعلی درجے کے استعمال کے کیسز)
   */
  system: {
    /**
     * لوکلائزیشن لغات کو محفوظ کرنے کے لیے ڈائریکٹری۔
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * ماڈیول آگمینٹیشن (augmentation) کے لیے ڈائریکٹری۔
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * غیر ضم شدہ (unmerged) لغات کو محفوظ کرنے کے لیے ڈائریکٹری۔
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * لغت کی اقسام کو محفوظ کرنے کے لیے ڈائریکٹری۔
     */
    typesDir: ".intlayer/types",

    /**
     * جہاں مین ایپلیکیشن فائلیں محفوظ ہیں۔
     */
    mainDir: ".intlayer/main",

    /**
     * جہاں کنفیگریشن فائلیں محفوظ ہیں۔
     */
    configDir: ".intlayer/config",

    /**
     * جہاں کیشے فائلیں محفوظ ہیں۔
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * کمپائلر کنفیگریشن (اعلی درجے کے استعمال کے کیسز)
   */
  compiler: {
    /**
     * بتاتا ہے کہ آیا کمپائلر کو فعال ہونا چاہیے۔
     *
     * - false: کمپائلر کو غیر فعال کریں۔
     * - true: کمپائلر کو فعال کریں۔
     * - "build-only": ڈیولپمنٹ کے دوران کمپائلر کو چھوڑ دیں اور اسٹارٹ وقت کو تیز کریں۔
     *
     * ڈیفالٹ: false
     */
    enabled: true,

    /**
     * آؤٹ پٹ فائلوں کا راستہ متعین کرتا ہے۔ `outputDir` کی جگہ لیتا ہے۔
     *
     * - `./` راستے اجزاء کی ڈائریکٹری کے مقابلے میں حل کیے جاتے ہیں۔
     * - `/` راستے پروجیکٹ روٹ (`baseDir`) کے مقابلے میں حل کیے جاتے ہیں۔
     *
     * - راستے میں `{{locale}}` متغیر شامل کرنے سے ہر لوکل کے لیے الگ لغات تیار ہوں گی۔
     *
     * مثال:
     * ```ts
     * {
     *   // اجزاء کے قریب کثیر لسانی .content.ts فائلیں بنائیں
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // ٹیمپلیٹ اسٹرنگ استعمال کرتے ہوئے مساوی
     * }
     * ```
     *
     * ```ts
     * {
     *   // پروجیکٹ کے روٹ پر مرکزی فی لوکل JSON بنائیں
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // ٹیمپلیٹ اسٹرنگ استعمال کرتے ہوئے مساوی
     * }
     * ```
     *
     * متغیرات کی فہرست:
     *   - `fileName`: فائل کا نام۔
     *   - `key`: مواد کی کلید۔
     *   - `locale`: مواد کا لوکل۔
     *   - `extension`: فائل کی ایکسٹینشن۔
     *   - `componentFileName`: جزو فائل کا نام۔
     *   - `componentExtension`: جزو فائل کی ایکسٹینشن۔
     *   - `format`: لغت کا فارمیٹ۔
     *   - `componentFormat`: جزو لغت کا فارمیٹ۔
     *   - `componentDirPath`: جزو کی ڈائریکٹری کا راستہ۔
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * بتاتا ہے کہ کیا اجزاء کو تبدیل ہونے کے بعد محفوظ کیا جانا چاہیے۔
     * اس طرح، کمپائلر کو ایپ کو تبدیل کرنے کے لیے صرف ایک بار چلایا جا سکتا ہے، اور پھر اسے ہٹایا جا سکتا ہے۔
     */
    saveComponents: false,

    /**
     * تیار کردہ فائل میں صرف مواد داخل کریں۔ فی لوکل i18next یا ICU MessageFormat JSON آؤٹ پٹس کے لیے مفید ہے۔
     */
    noMetadata: false,

    /**
     * لغت کلید کا سابقہ
     */
    dictionaryKeyPrefix: "", // نکالی گئی لغت کی کلیدوں کے لیے ایک اختیاری سابقہ شامل کریں
  },

  /**
   * لغات کے مواد کی توثیق کرنے کے لیے کسٹم اسکیمات۔
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * پلگ ان کنفیگریشن۔
   */
  plugins: [],
};

export default config;
````

---

## کنفیگریشن حوالہ (Reference)

درج ذیل حصے Intlayer کے لیے دستیاب مختلف کنفیگریشن ترتیبات کو بیان کرتے ہیں۔

---

### بین الاقوامی کاری (Internationalization) کنفیگریشن

بین الاقوامی کاری سے متعلق ترتیبات کی وضاحت کرتا ہے، بشمول دستیاب لوکلز اور ایپلیکیشن کے لیے ڈیفالٹ لوکل۔

| فیلڈ              | وضاحت                                                                         | قسم        | ڈیفالٹ              | مثال                 | نوٹ                                                                                                                                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | ایپلیکیشن میں سپورٹڈ لوکلز کی فہرست۔                                          | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                |
| `requiredLocales` | ایپلیکیشن میں مطلوبہ لوکلز کی فہرست۔                                          | `string[]` | `[]`                | `[]`                 | • اگر خالی ہو، تو `strict` موڈ میں تمام لوکلز مطلوبہ ہوں گے۔<br/>• اس بات کو یقینی بنائیں کہ مطلوبہ لوکلز `locales` فیلڈ میں بھی بیان کیے گئے ہیں۔                                                                                                                             |
| `strictMode`      | TypeScript استعمال کرتے ہوئے بین الاقوامی مواد کے مضبوط نفاذ کو یقینی بنائیں۔ | `string`   | `'inclusive'`       |                      | • اگر `"strict"` ہو: `t` فنکشن کے لیے ضروری ہے کہ ہر اعلان کردہ لوکل بیان ہو — اگر کوئی غائب ہو تو ایرر دیتا ہے۔<br/>• اگر `"inclusive"` ہو: غائب لوکلز پر وارننگ دیتا ہے لیکن غیر اعلان کردہ کو قبول کر لیتا ہے۔<br/>• اگر `"loose"` ہو: کسی بھی موجودہ لوکل کو قبول کرتا ہے۔ |
| `defaultLocale`   | ڈیفالٹ لوکل جو فال بیک کے طور پر استعمال ہوتا ہے اگر مطلوبہ لوکل نہ ملے۔      | `string`   | `Locales.ENGLISH`   | `'en'`               | جب URL، کوکی، یا ہیڈر میں کچھ بھی متعین نہ ہو تو لوکل کا تعین کرنے کے لیے استعمال ہوتا ہے۔                                                                                                                                                                                     |

---

### ایڈیٹر کنفیگریشن (Editor)

مربوط ایڈیٹر سے متعلق ترتیبات کی وضاحت کرتا ہے، بشمول سرور پورٹ اور فعال حیثیت۔

| فیلڈ                         | وضاحت                                                                                                                                                                            | قسم                               | ڈیفالٹ                              | مثال                                                                                            | نوٹ                                                                                                                                                                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | ایپلیکیشن کا URL۔                                                                                                                                                                | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • سیکیورٹی وجوہات کی بنا پر ایڈیٹر کی اصل (origin) کو محدود کرنے کے لیے استعمال ہوتا ہے۔<br/>• اگر `'*'` پر سیٹ ہو، تو ایڈیٹر کسی بھی جگہ سے قابل رسائی ہوتا ہے۔                                                                               |
| `port`                       | بصری ایڈیٹر سرور کے ذریعے استعمال ہونے والا پورٹ۔                                                                                                                                | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                |
| `editorURL`                  | ایڈیٹر سرور کا URL۔                                                                                                                                                              | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • ان جگہوں کو محدود کرنے کے لیے استعمال ہوتا ہے جو ایپلیکیشن کے ساتھ بات چیت کر سکتے ہیں۔<br/>• اگر `'*'` پر سیٹ ہو، تو کسی بھی جگہ سے قابل رسائی ہوتا ہے۔<br/>• اگر پورٹ تبدیل ہو یا ایڈیٹر کسی مختلف ڈومین پر ہوسٹ ہو تو اسے سیٹ کرنا چاہیے۔ |
| `cmsURL`                     | Intlayer CMS کا URL۔                                                                                                                                                             | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                |
| `backendURL`                 | بیک اینڈ سرور کا URL۔                                                                                                                                                            | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                |
| `enabled`                    | بتاتا ہے کہ آیا ایپلیکیشن بصری ایڈیٹر کے ساتھ بات چیت کرتی ہے۔                                                                                                                   | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • اگر `false` ہو، تو ایڈیٹر ایپلیکیشن کے ساتھ بات چیت نہیں کر سکتا۔<br/>• مخصوص ماحول کے لیے غیر فعال کرنا سیکیورٹی کو یقینی بناتا ہے۔                                                                                                         |
| `clientId`                   | intlayer پیکجوں کو oAuth2 کے ذریعے بیک اینڈ کے ساتھ توثیق کرنے کی اجازت دیتا ہے۔ ایکسیس ٹوکن حاصل کرنے کے لیے [intlayer.org/project](https://app.intlayer.org/project) پر جائیں۔ | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | خفیہ رکھیں؛ انوائرمنٹ ویری ایبلز میں محفوظ کریں۔                                                                                                                                                                                               |
| `clientSecret`               | intlayer پیکجوں کو oAuth2 کے ذریعے بیک اینڈ کے ساتھ توثیق کرنے کی اجازت دیتا ہے۔ ایکسیس ٹوکن حاصل کرنے کے لیے [intlayer.org/project](https://app.intlayer.org/project) پر جائیں۔ | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | خفیہ رکھیں؛ انوائرمنٹ ویری ایبلز میں محفوظ کریں۔                                                                                                                                                                                               |
| `dictionaryPriorityStrategy` | جب مقامی اور دور دراز دونوں لغات موجود ہوں تو لغات کو ترجیح دینے کی حکمت عملی۔                                                                                                   | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: مقامی پر دور دراز کو ترجیح دیتا ہے۔<br/>• `'local_first'`: دور دراز پر مقامی کو ترجیح دیتا ہے۔                                                                                                                            |
| `liveSync`                   | بتاتا ہے کہ آیا CMS <br/> Visual Editor <br/> Backend پر تبدیلی کی صورت میں ایپ سرور کو مواد کو گرم لوڈ (hot reload) کرنا چاہیے۔                                                 | `boolean`                         | `true`                              | `true`                                                                                          | • جب لغت شامل/اپ ڈیٹ ہوتی ہے، ایپ صفحہ کے مواد کو اپ ڈیٹ کرتی ہے۔<br/>• لائیو سنک مواد کو کسی دوسرے سرور پر منتقل کرتا ہے، جس سے کارکردگی پر تھوڑا اثر پڑ سکتا ہے۔<br/>• دونوں کو ایک ہی مشین پر ہوسٹ کرنے کی سفارش کی جاتی ہے۔                |
| `liveSyncPort`               | لائیو سنک سرور کا پورٹ۔                                                                                                                                                          | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                |
| `liveSyncURL`                | لائیو سنک سرور کا URL۔                                                                                                                                                           | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | ڈیفالٹ میں لوکل ہوسٹ کی طرف اشارہ کرتا ہے؛ دور دراز لائیو سنک سرور کے لیے تبدیل کیا جا سکتا ہے۔                                                                                                                                                |

---

### راؤٹنگ کنفیگریشن (Routing)

ترتیبات جو راؤٹنگ کے رویے کو کنٹرول کرتی ہیں، بشمول URL کا ڈھانچہ، لوکل اسٹوریج، اور مڈل ویئر ہینڈلنگ۔

| فیلڈ       | وضاحت                                                                                                                                                                                                            | قسم                                                                                                                                                                                                          | ڈیفالٹ                 | مثال                                                                                                                                                                                               | نوٹ                                                                                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`     | لوکل ہینڈلنگ کے لیے URL راؤٹنگ موڈ۔                                                                                                                                                                              | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) یا `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: لوکل دوسرے ذرائع سے ہینڈل کیا جاتا ہے۔ `'search-params'`: `/dashboard?locale=fr` | کوکی یا لوکل اسٹوریج مینجمنٹ پر اثر انداز نہیں ہوتا۔                                                                                                                                                                                                                           |
| `storage`  | کلائنٹ میں لوکل محفوظ کرنے کی کنفیگریشن۔                                                                                                                                                                         | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                 | نیچے اسٹوریج کے اختیارات والا ٹیبل دیکھیں۔                                                                                                                                                                                                                                     |
| `basePath` | ایپلیکیشن URLs کے لیے بنیادی راستہ۔                                                                                                                                                                              | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                        | اگر ایپ `https://example.com/my-app` پر ہے، تو basePath `'/my-app'` ہے اور URLs `https://example.com/my-app/en` بن جاتے ہیں۔                                                                                                                                                   |
| `rewrite`  | کسٹم URL رائٹنگ کے قواعد جو مخصوص راستوں کے لیے ڈیفالٹ راؤٹنگ موڈ کو اوور رائڈ کرتے ہیں۔ `[param]` متحرک پیرامیٹرز کی سپورٹ۔                                                                                     | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | نیچے دی گئی مثال دیکھیں                                                                                                                                                                            | • ری رائٹ رولز `mode` پر فوقیت رکھتے ہیں۔<br/>• Next.js اور Vite کے ساتھ کام کرتا ہے۔<br/>• `getLocalizedUrl()` خودکار طور پر مماثل رولز لاگو کرتا ہے۔<br/>• [کسٹم URL ری رائٹس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md) دیکھیں۔ |
| `domains`  | ڈومین پر مبنی راؤٹنگ کے لیے لوکلز کو ڈومین ہوسٹ نیمز کے ساتھ میپ کرتا ہے۔ جب سیٹ کیا جائے تو اس لوکل کے URLs اس ڈومین کو بطور بنیاد (مطلق URL) استعمال کرتے ہیں اور پاتھ میں کوئی لوکل سابقہ شامل نہیں کیا جاتا۔ | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                        | • اگر ہوسٹ نیم میں شامل نہ ہو تو ڈیفالٹ پروٹوکول `https://` ہے۔<br/>• ڈومین خود لوکل کی شناخت کرتا ہے، اس لیے کوئی `/zh/` سابقہ شامل نہیں کیا جاتا۔<br/>• `getLocalizedUrl('/', 'zh')` واپسی دیتا ہے `https://intlayer.zh/`۔                                                   |

**`rewrite` کی مثال**:

```typescript
routing: {
  mode: "prefix-no-default", // فال بیک حکمت عملی
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

| قدر                | نوٹ                                                                                                                                                                                                                           | وضاحت                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `'cookie'`         | • GDPR کی تعمیل کے لیے، صارف کی مناسب رضامندی کو یقینی بنائیں۔<br/>• `CookiesAttributes` کے ذریعے حسب ضرورت بنایا جا سکتا ہے (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`)۔                    | لوکل کو کوکیز میں محفوظ کرتا ہے — کلائنٹ اور سرور دونوں طرف سے قابل رسائی۔ |
| `'localStorage'`   | • جب تک واضح طور پر صاف نہ کیا جائے یہ ختم نہیں ہوتا۔<br/>• Intlayer پراکسی اس تک رسائی حاصل نہیں کر سکتی۔<br/>• `StorageAttributes` کے ذریعے حسب ضرورت بنایا جا سکتا ہے (`{ type: 'localStorage', name: 'custom-locale' }`)۔ | لوکل کو براؤزر میں بغیر کسی میعاد کے محفوظ کرتا ہے — صرف کلائنٹ کی طرف۔    |
| `'sessionStorage'` | • ٹیب/ونڈو بند ہونے پر صاف ہو جاتا ہے۔<br/>• Intlayer پراکسی اس تک رسائی حاصل نہیں کر سکتی۔<br/>• `StorageAttributes` کے ذریعے حسب ضرورت بنایا جا سکتا ہے (`{ type: 'sessionStorage', name: 'custom-locale' }`)۔              | صفحہ کے سیشن کی مدت کے لیے لوکل محفوظ کرتا ہے — صرف کلائنٹ کی طرف۔         |
| `'header'`         | • API کالز کے لیے مفید ہے۔<br/>• کلائنٹ کی طرف سے اس تک رسائی حاصل نہیں کی جا سکتی۔<br/>• `StorageAttributes` کے ذریعے حسب ضرورت بنایا جا سکتا ہے (`{ type: 'header', name: 'custom-locale' }`)۔                              | HTTP ہیڈرز کے ذریعے لوکل محفوظ یا منتقل کرتا ہے — صرف سرور کی طرف۔         |

#### کوکی ایٹریبیوٹس (Cookie Attributes)

کوکی اسٹوریج استعمال کرتے وقت، آپ اضافی کوکی ایٹریبیوٹس ترتیب دے سکتے ہیں:

| فیلڈ       | وضاحت                                              | قسم                                                   |
| ---------- | -------------------------------------------------- | ----------------------------------------------------- |
| `name`     | کوکی کا نام۔ ڈیفالٹ: `'INTLAYER_LOCALE'`           | `string`                                              |
| `domain`   | کوکی ڈومین۔ ڈیفالٹ: `undefined`                    | `string`                                              |
| `path`     | کوکی راستہ۔ ڈیفالٹ: `undefined`                    | `string`                                              |
| `secure`   | HTTPS کی ضرورت۔ ڈیفالٹ: `undefined`                | `boolean`                                             |
| `httpOnly` | HTTP-only فلیگ۔ ڈیفالٹ: `undefined`                | `boolean`                                             |
| `sameSite` | SameSite پالیسی۔                                   | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | میعاد ختم ہونے کی تاریخ یا دن۔ ڈیفالٹ: `undefined` | `Date` &#124; <br/> `number`                          |

#### لوکل اسٹوریج ایٹریبیوٹس (Locale Storage Attributes)

localStorage یا sessionStorage استعمال کرتے وقت:

| فیلڈ   | وضاحت                                            | قسم                                              |
| ------ | ------------------------------------------------ | ------------------------------------------------ |
| `type` | اسٹوریج کی قسم۔                                  | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | اسٹوریج کلید کا نام۔ ڈیفالٹ: `'INTLAYER_LOCALE'` | `string`                                         |

#### کنفیگریشن کی مثالیں

نئے v7 راؤٹنگ ڈھانچے کے لیے کچھ عام کنفیگریشن مثالیں یہاں دی گئی ہیں:

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

**سرچ پیرامیٹرز موڈ**:

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

**بغیر سابقہ (No Prefix) موڈ اور کسٹم اسٹوریج کے ساتھ**:

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

**متحرک راستوں کے ساتھ کسٹم URL ری رائٹنگ**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // ان راستوں کے لیے فال بیک جو ری رائٹ نہیں ہوئے
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

### مواد کی کنفیگریشن (Content)

ایپلیکیشن کے اندر مواد کی ہینڈلنگ سے متعلق ترتیبات بشمول ڈائریکٹری کے نام، فائل ایکسٹینشنز، اور دیگر کنفیگریشنز۔

| فیلڈ             | وضاحت                                                                                                              | قسم        | ڈیفالٹ                                                                                                                                                                    | مثال                                                                                                                                                                                  | نوٹ                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | بتاتا ہے کہ آیا Intlayer کو لغات کو دوبارہ بنانے کے لیے مواد کے اعلان کی فائلوں میں تبدیلیوں کی نگرانی کرنی چاہیے۔ | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                             |
| `fileExtensions` | لغت کی کمپائلیشن کے دوران اسکین کی جانے والی فائل ایکسٹینشنز۔                                                      | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | کسٹمائزیشن کے دوران تصادم (conflict) سے بچنے میں مدد مل سکتی ہے۔                                                                                            |
| `contentDir`     | اس ڈائریکٹری کا راستہ جہاں مواد کی تعریف کی فائلیں (`.content.*`) واقع ہیں۔                                        | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | مواد کی فائلوں کو ٹریک کرنے اور لغات کو دوبارہ بنانے کے لیے استعمال ہوتا ہے۔                                                                                |
| `codeDir`        | وہ ڈائریکٹری کا راستہ جہاں سورس کوڈ واقع ہے، بنیادی ڈائریکٹری کے مقابلے میں۔                                       | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • کوڈ فائلوں کی تبدیلی (غیر ضروری حصوں کو ہٹانا، آپٹیمائزیشن) کو ٹریک کرنے کے لیے استعمال ہوتا ہے۔<br/>• `contentDir` سے علیحدگی کارکردگی کو بہتر بناتی ہے۔ |
| `excludedPath`   | مواد کی اسکیننگ سے خارج کی جانے والی ڈائریکٹریاں۔                                                                  | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | فی الحال استعمال نہیں کیا گیا؛ مستقبل کے لیے منصوبہ بند ہے۔                                                                                                 |
| `formatCommand`  | جب Intlayer مقامی طور پر مواد کی فائلیں لکھتا ہے تو انہیں فارمیٹ کرنے کی کمانڈ۔                                    | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` کو فائل پاتھ سے بدل دیا جاتا ہے۔<br/>• اگر مقرر نہ ہو، تو Intlayer خود بخود پتہ لگانے کی کوشش کرے گا (prettier, biome, eslint کو ٹیسٹ کرے گا)۔ |

---

### لغت کی کنفیگریشن (Dictionary)

وہ اختیارات جو لغت کے آپریشنز بشمول خودکار طور پر بھرنے کے رویے اور مواد کی تیاری کو کنٹرول کرتے ہیں۔

| فیلڈ                        | وضاحت                                                                                                                                     | قسم                                                                                                             | ڈیفالٹ             | مثال                                                                                        | نوٹ                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | خودکار طور پر بھرنے (AI ترجمہ) کی آؤٹ پٹ فائلوں کی تیاری کو کنٹرول کرتا ہے۔                                                               | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`             | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: ڈیفالٹ راستہ (ماخذ کے طور پر وہی فائل)۔<br/>• `false`: غیر فعال۔<br/>• اسٹرنگ پیٹرن/فنکشن فی لوکل تیاری کی اجازت دیتا ہے۔<br/>• فی لوکل آبجیکٹ: ہر لوکل کا اپنا پیٹرن ہوتا ہے؛ `false` لوکل کو خارج کر دیتا ہے۔<br/>• `{{locale}}` شامل کرنے سے فی لوکل تیاری کی اجازت ملتی ہے۔<br/>• لغت کی سطح کی `fill` ترتیب ہمیشہ اس عالمی ترتیب پر فوقیت رکھتی ہے۔                                             |
| `description`               | ایڈیٹرز اور CMS کو لغت کے مقصد کو سمجھنے میں مدد کرتا ہے۔ AI ترجمہ کی تیاری کے تناظر (context) کے طور پر بھی استعمال ہوتا ہے۔             | `string`                                                                                                        | `undefined`        | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                |
| `locale`                    | لغت کو کسی مخصوص لوکل کے فارمیٹ پر سیٹ کرتا ہے۔ ہر اعلان کردہ فیلڈ ترجمہ نوڈ بن جاتی ہے۔ اگر غائب ہو، تو لغت کو کثیر لسانی سمجھا جاتا ہے۔ | `LocalesValues`                                                                                                 | `undefined`        | `'en'`                                                                                      | اسے تب استعمال کریں جب لغت کسی مخصوص زبان کے لیے وقف ہو، بجائے اس کے کہ اس میں کئی ترجمے ہوں۔                                                                                                                                                                                                                                                                                                                  |
| `contentAutoTransformation` | کیا اسٹرنگ مواد کو خودکار طور پر ٹائپ شدہ نوڈز (Markdown، HTML، یا داخل کرنے والا) میں تبدیل کرنا ہے۔                                     | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`            | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')` .<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')` .<br/>• Insertion : `Hello {{name}}` → `insert('Hello {{name}}')` .                                                                                                                                                                                                                                |
| `location`                  | لغت کی فائلوں کے اسٹوریج کے محل وقوع اور CMS کے ساتھ ان کی ہم آہنگی کا طریقہ بتاتا ہے۔                                                    | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`          | `'hybrid'`                                                                                  | • `'local'`: صرف مقامی انتظام۔<br/>• `'remote'`: صرف دور دراز کا انتظام (CMS)۔<br/>• `'hybrid'`: مقامی اور دور دراز دونوں کا انتظام۔<br/>• `'plugin'` یا کسٹم اسٹرنگ: پلگ ان یا کسٹم ذریعے سے انتظام۔                                                                                                                                                                                                          |
| `importMode`                | کنٹرول کرتا ہے کہ لغات کیسے امپورٹ کی جاتی ہیں۔                                                                                           | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`         | `'dynamic'`                                                                                 | • `'static'`: ساکن امپورٹ۔<br/>• `'dynamic'`: Suspense کے ذریعے متحرک امپورٹ۔<br/>• `'fetch'`: LIVE سنک API کے ذریعے حاصل کرنا؛ ناکامی پر `'dynamic'` پر واپس آتا ہے۔<br/>• `@intlayer/babel` اور `@intlayer/swc` پلگ انز کی ضرورت ہے۔<br/>• کلیدیں ساکن طور پر اعلان ہونی چاہئیں۔<br/>• اگر `optimize` غیر فعال ہو تو نظر انداز کر دیا جاتا ہے۔<br/>• `getIntlayer` ، `getDictionary` وغیرہ پر کوئی اثر نہیں۔ |
| `priority`                  | لغت کی ترجیح۔ لغات کے درمیان تصادم کو حل کرتے وقت، زیادہ قیمت والی لغت کم قیمت والی پر غالب آئے گی۔                                       | `number`                                                                                                        | `undefined`        | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                |
| `live`                      | DEPRECATED — `importMode: 'fetch'` استعمال کریں۔ پہلے بتاتا تھا کہ آیا API Live Sync کے ذریعے لغت کا مواد متحرک طور پر حاصل کرنا ہے۔      | `boolean`                                                                                                       | `undefined`        |                                                                                             | v8.0.0 میں نام تبدیل کر کے `importMode: 'fetch'` کر دیا گیا۔                                                                                                                                                                                                                                                                                                                                                   |
| `schema`                    | JSON اسکیمہ کی توثیق کے لیے Intlayer کے ذریعے خودکار طور پر تیار کیا گیا۔                                                                 | `'https://intlayer.org/schema.json'`                                                                            | خودکار طور پر تیار |                                                                                             | دستی طور پر ترمیم نہ کریں۔                                                                                                                                                                                                                                                                                                                                                                                     |
| `title`                     | ایڈیٹر اور CMS میں لغت کی شناخت کرنے میں مدد کرتا ہے۔                                                                                     | `string`                                                                                                        | `undefined`        | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tags`                      | لغت کی درجہ بندی کرتا ہے اور ایڈیٹر اور AI کے لیے تناظر یا ہدایات فراہم کرتا ہے۔                                                          | `string[]`                                                                                                      | `undefined`        | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                |
| `version`                   | دور دراز لغت کا ورژن؛ فی الحال استعمال ہونے والے ورژن کو ٹریک کرنے میں مدد کرتا ہے۔                                                       | `string`                                                                                                        | `undefined`        | `'1.0.0'`                                                                                   | • CMS میں انتظام کیا جاتا ہے۔<br/>• مقامی طور پر ترمیم نہ کریں۔                                                                                                                                                                                                                                                                                                                                                |

**`fill` کی مثال**:

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

### لاگر کنفیگریشن (Log)

Intlayer لاگ آؤٹ پٹ کو حسب ضرورت بنانے کی ترتیبات۔

| فیلڈ     | وضاحت                                   | قسم                                                            | ڈیفالٹ          | مثال               | نوٹ                                                                                                                      |
| -------- | --------------------------------------- | -------------------------------------------------------------- | --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `mode`   | لاگر موڈ کا تعین کرتا ہے۔               | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`        | • `'verbose'`: ڈیبگنگ کے لیے زیادہ معلومات ریکارڈ کرتا ہے۔<br/>• `'disabled'`: لاگنگ کو مکمل طور پر غیر فعال کر دیتا ہے۔ |
| `prefix` | تمام لاگ پیغامات کے لیے سابقہ (prefix)۔ | `string`                                                       | `'[intlayer] '` | `'[mój prefiks] '` |                                                                                                                          |

---

### AI کنفیگریشن (AI)

Intlayer میں AI خصوصیات بشمول فراہم کنندگان، ماڈلز اور API کلیدوں کے انتظام کی ترتیبات۔

اگر آپ [Intlayer Dashboard](https://app.intlayer.org/project) پر ایکسیس کلید کے ساتھ سائن اپ کرتے ہیں تو یہ کنفیگریشن اختیاری ہے۔ Intlayer آپ کی ضروریات کے لیے خودکار طور پر سب سے زیادہ لاگت اور کارکردگی کے لحاظ سے موزوں AI حل کا انتظام کرے گا۔ ڈیفالٹ ترتیبات کا استعمال بہترین طویل مدتی سپورٹ کو یقینی بناتا ہے کیونکہ Intlayer جدید ترین ماڈلز استعمال کرنے کے لیے مسلسل اپ ڈیٹ ہوتا رہتا ہے۔

اگر آپ اپنی API کلیدیں یا مخصوص ماڈل استعمال کرنا چاہتے ہیں، تو آپ اپنی AI کنفیگریشن بیان کر سکتے ہیں۔
یہ AI کنفیگریشن آپ کے پورے Intlayer ماحول میں عالمی سطح پر استعمال ہوگی۔ CLI کمانڈز جیسے `fill` ان ترتیبات کو بطور ڈیفالٹ استعمال کریں گی، اور اسی طرح SDK، Visual Editor، اور CMS بھی۔ آپ کمانڈ پیرامیٹرز کا استعمال کرتے ہوئے مخصوص استعمال کے کیسز کے لیے ان ڈیفالٹس کو اوور رائڈ کر سکتے ہیں۔

Intlayer زیادہ سے زیادہ لچک کو یقینی بنانے کے لیے مختلف AI فراہم کنندگان کی حمایت کرتا ہے۔ اس وقت سپورٹڈ فراہم کنندگان میں شامل ہیں:

- **OpenAI** (ڈیفالٹ)
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

| فیلڈ                 | وضاحت                                                                                                                           | قسم                                                                                                                                                                                                                                                                                                                                                                                            | ڈیفالٹ      | مثال                                                          | نوٹ                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Intlayer AI خصوصیات کے لیے استعمال کیا جانے والا فراہم کنندہ۔                                                                   | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | مختلف فراہم کنندگان کے لیے مختلف API کلیدوں کی ضرورت ہوتی ہے اور ان کی قیمتوں کا ڈھانچہ بھی مختلف ہوتا ہے۔                                                  |
| `model`              | AI خصوصیات میں استعمال ہونے والا AI ماڈل۔                                                                                       | `string`                                                                                                                                                                                                                                                                                                                                                                                       | کوئی نہیں   | `'gpt-4o-2024-11-20'`                                         | مخصوص ماڈلز فراہم کنندہ پر منحصر ہیں۔                                                                                                                       |
| `temperature`        | AI کے جوابات میں بے ترتیبی (randomness) کو کنٹرول کرتا ہے۔                                                                      | `number`                                                                                                                                                                                                                                                                                                                                                                                       | کوئی نہیں   | `0.1`                                                         | زیادہ ٹمپریچر = زیادہ تخلیقی لیکن کم قابل اعتماد جوابات۔                                                                                                    |
| `apiKey`             | منتخب کردہ فراہم کنندہ کے لیے آپ کی API کلید۔                                                                                   | `string`                                                                                                                                                                                                                                                                                                                                                                                       | کوئی نہیں   | `process.env.OPENAI_API_KEY`                                  | خفیہ رکھیں؛ انوائرمنٹ ویری ایبلز میں محفوظ کریں۔                                                                                                            |
| `applicationContext` | آپ کی ایپلیکیشن کے بارے میں اضافی تناظر تاکہ AI کو زیادہ درست ترجمے تیار کرنے میں مدد ملے (ڈومین، ٹارگٹ آڈینس، لہجہ، اصطلاحات)۔ | `string`                                                                                                                                                                                                                                                                                                                                                                                       | کوئی نہیں   | `'میرا اپنا ایپلیکیشن تناظر'`                                 | قواعد شامل کرنے کے لیے استعمال کیا جا سکتا ہے (مثلاً: `"آپ کو اپنے URLs کا ترجمہ نہیں کرنا چاہیے"`)۔                                                        |
| `baseURL`            | AI API کے لیے بنیادی URL۔                                                                                                       | `string`                                                                                                                                                                                                                                                                                                                                                                                       | کوئی نہیں   | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | کسی مقامی یا کسٹم AI API اینڈ پوائنٹ سے رجوع کر سکتا ہے۔                                                                                                    |
| `dataSerialization`  | AI خصوصیات کے لیے ڈیٹا سیریلائزیشن فارمیٹ۔                                                                                      | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: ڈیفالٹ، قابل اعتماد؛ زیادہ ٹوکن لیتا ہے۔<br/>• `'toon'`: کم ٹوکن، کم مستحکم۔<br/>• ماڈل کو اضافی پیرامیٹرز بھیجتا ہے (استدلال کی کوششیں وغیرہ)۔ |

---

### بلڈ کنفیگریشن (Build)

ترتیبات جو کنٹرول کرتی ہیں کہ Intlayer آپ کی ایپلیکیشن کی بین الاقوامی کاری کو کس طرح آپٹیمائز اور کمپائل کرتا ہے۔

بلڈ ترتیبات `@intlayer/babel` اور `@intlayer/swc` پلگ انز پر لاگو ہوتی ہیں۔

> ڈیولپمنٹ موڈ میں، Intlayer ڈیولپمنٹ کے عمل کو آسان بنانے کے لیے ساکن لغت امپورٹ استعمال کرتا ہے۔

> آپٹیمائزیشن کے دوران، Intlayer لغت کی کالز کو کوڈ اسپلٹنگ (chunking) آپٹیمائزیشن سے بدل دیتا ہے تاکہ حتمی بنڈل صرف وہی لغات امپورٹ کرے جو اصل میں استعمال ہوئی ہیں۔

| فیلڈ              | وضاحت                                                                                | قسم                              | ڈیفالٹ                                                                                                                                                                            | مثال                                                                          | نوٹ                                                                                                                                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | بلڈ ایگزیکیوشن موڈ کو کنٹرول کرتا ہے۔                                                | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: ایپ بلڈ کے دوران خودکار طور پر بلڈ شروع ہوتا ہے۔<br/>• `'manual'`: صرف واضح بلڈ کمانڈ کے ذریعے چلتا ہے۔<br/>• لغت کی بلڈ کو روکنے کے لیے مفید ہو سکتا ہے (مثلاً: Node.js ماحول میں چلنے سے بچنے کے لیے)۔                                                                                                 |
| `optimize`        | کنٹرول کرتا ہے کہ آیا بلڈ آپٹیمائزیشن کی جاتی ہے۔                                    | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • اگر متعین نہ ہو، تو یہ فریم ورک بلڈ (Vite/Next.js) کے دوران شروع ہوگا۔<br/>• `true` ڈیولپمنٹ موڈ میں بھی آپٹیمائزیشن کو مجبور کرتا ہے۔<br/>• `false` اسے غیر فعال کرتا ہے۔<br/>• اگر فعال ہو، تو لغت کی کالز کو چنکنگ آپٹیمائزیشن سے بدل دیتا ہے۔<br/>• `@intlayer/babel` اور `@intlayer/swc` پلگ انز کی ضرورت ہے۔ |
| `minify`          | بتاتا ہے کہ آیا بنڈل کے سائز کو کم کرنے کے لیے لغات کو کم (minify) کیا جانا چاہیے۔   | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • بتاتا ہے کہ آیا بنڈل کو منی فائی کرنا ہے۔<br/>• ڈیفالٹ: پروڈکشن میں `true`۔<br/>• اگر `optimize` غیر فعال ہو تو اسے نظر انداز کر دیا جائے گا۔<br/>• اگر `editor.enabled` کی ویلیو true ہو تو اسے نظر انداز کر دیا جائے گا۔                                                                                         |
| `prune`           | بتاتا ہے کہ آیا لغات میں غیر استعمال شدہ کلیدوں کو ہٹا دینا (prune) چاہیے۔           | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • بتاتا ہے کہ آیا بنڈل کو پرون (prune) کرنا ہے۔ <br/>• ڈیفالٹ: پروڈکشن میں `true`۔<br/>• اگر `optimize` غیر فعال ہو تو اسے نظر انداز کر دیا جائے گا۔                                                                                                                                                                 |
| `checkTypes`      | بتاتا ہے کہ آیا بلڈ کو TypeScript اقسام کو چیک کرنا چاہیے اور ایررز لاگ کرنے چاہئیں۔ | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | بلڈ کی کارکردگی کو سست کر سکتا ہے۔                                                                                                                                                                                                                                                                                   |
| `outputFormat`    | لغت کے آؤٹ پٹ فارمیٹ کو کنٹرول کرتا ہے۔                                              | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                      |
| `traversePattern` | آپٹیمائزیشن کے دوران اسکین کی جانے والی فائلوں کا پیٹرن۔                             | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • متعلقہ فائلوں تک آپٹیمائزیشن کو محدود کرکے بلڈ کی کارکردگی کو بہتر بناتا ہے۔<br/>• اگر `optimize` غیر فعال ہو تو نظر انداز کر دیا جاتا ہے۔<br/>• گلوب (glob) پیٹرنز استعمال کرتا ہے۔                                                                                                                               |

---

### سسٹم کنفیگریشن (System)

یہ ترتیبات اعلی درجے کے صارفین اور Intlayer کی اندرونی کنفیگریشن کے لیے ہیں۔

| فیلڈ                      | وضاحت                                                   | قسم      | ڈیفالٹ                            | مثال | نوٹ |
| ------------------------- | ------------------------------------------------------- | -------- | --------------------------------- | ---- | --- |
| `dictionariesDir`         | کمپائل شدہ لغات کے لیے محل وقوع۔                        | `string` | `'.intlayer/dictionary'`          |      |     |
| `moduleAugmentationDir`   | وہ ڈائریکٹری جہاں TypeScript ماڈیول آگمینٹیشن واقع ہے۔  | `string` | `'.intlayer/types'`               |      |     |
| `unmergedDictionariesDir` | وہ ڈائریکٹری جہاں غیر ضم شدہ لغات واقع ہیں۔             | `string` | `'.intlayer/unmerged_dictionary'` |      |     |
| `typesDir`                | وہ ڈائریکٹری جہاں تیار کردہ اقسام واقع ہیں۔             | `string` | `'.intlayer/types'`               |      |     |
| `mainDir`                 | وہ ڈائریکٹری جہاں Intlayer کی مین فائلیں واقع ہیں۔      | `string` | `'.intlayer/main'`                |      |     |
| `configDir`               | وہ ڈائریکٹری جہاں کمپائل شدہ کنفیگریشن فائلیں واقع ہیں۔ | `string` | `'.intlayer/config'`              |      |     |
| `cacheDir`                | وہ ڈائریکٹری جہاں کیشے فائلیں واقع ہیں۔                 | `string` | `'.intlayer/cache'`               |      |     |

---

### کمپائلر کنفیگریشن (Compiler)

Intlayer کمپائلر کی ترتیبات کو کنٹرول کرتا ہے جو براہ راست آپ کے اجزاء سے لغات جمع کرتا ہے۔

| فیلڈ                  | وضاحت                                                                                                                                                                                                                                                                                                                          | قسم                                                                                                             | ڈیفالٹ      | مثال                                                                                                                                                     | نوٹ                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`             | بتاتا ہے کہ آیا کمپائلر کو لغات جمع کرنے کے لیے فعال ہونا چاہیے۔                                                                                                                                                                                                                                                               | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` ڈیولپمنٹ کے دوران کمپائلر کو چھوڑ دیتا ہے تاکہ اسٹارٹ ٹائم تیز ہو؛ صرف بلڈ کمانڈ کے دوران چلتا ہے۔                                                                                            |
| `dictionaryKeyPrefix` | جمع کی گئی لغت کی کلیدوں کے لیے سابقہ۔                                                                                                                                                                                                                                                                                         | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | تصادم سے بچنے کے لیے تیار کردہ کلیدوں (فائل کے نام کی بنیاد پر) سے پہلے لگایا جاتا ہے۔                                                                                                                       |
| `saveComponents`      | بتاتا ہے کہ کیا اجزاء کو تبدیل ہونے کے بعد محفوظ کیا جانا چاہیے۔                                                                                                                                                                                                                                                               | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • اگر `true` ہو، تو اصل فائلیں تبدیل شدہ ورژن سے بدل دی جائیں گی۔<br/>• کمپائلر کو ایک بار چلا کر ہٹانے کی اجازت دیتا ہے۔                                                                                    |
| `output`              | آؤٹ پٹ فائلوں کا راستہ متعین کرتا ہے۔ `outputDir` کی جگہ لیتا ہے۔ ٹیمپلیٹ متغیرات کی حمایت کرتا ہے: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}` . | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • `./` راستے جزو کی ڈائریکٹری کے مقابلے میں حل ہوتے ہیں۔<br/>• `/` راستے پروجیکٹ کے روٹ کے مقابلے میں حل ہوتے ہیں۔<br/>• `{{locale}}` فی لوکل تیاری کی اجازت دیتا ہے۔<br/>• فی لوکل آبجیکٹ کی حمایت کرتا ہے۔ |
| `noMetadata`          | اگر `true` ہو، تو کمپائلر آؤٹ پٹ سے لغت کا میٹا ڈیٹا (کلید، مواد کا ریپر) ہٹا دیتا ہے۔                                                                                                                                                                                                                                         | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • فی لوکل i18next یا ICU MessageFormat JSON آؤٹ پٹس کے لیے مفید ہے۔<br/>• `loadJSON` پلگ ان کے ساتھ اچھا کام کرتا ہے۔                                                                                        |
| `dictionaryKeyPrefix` | لغت کی کلید کا سابقہ                                                                                                                                                                                                                                                                                                           | `string`                                                                                                        | `''`        |                                                                                                                                                          | نکالی گئی لغت کی کلیدوں کے لیے ایک اختیاری سابقہ شامل کریں                                                                                                                                                   |

---

### کسٹم اسکیمات (Custom Schemas)

| فیلڈ      | وضاحت                                                                           | قسم                         |
| --------- | ------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | آپ کو اپنی لغت کے ڈھانچے کی توثیق کرنے کے لیے Zod اسکیمہ کی وضاحت کرنے دیتا ہے۔ | `Record<string, ZodSchema>` |

---

### پلگ انز (Plugins)

| فیلڈ      | وضاحت                                         | قسم                |
| --------- | --------------------------------------------- | ------------------ |
| `plugins` | شامل کیے جانے والے Intlayer پلگ انز کی فہرست۔ | `IntlayerPlugin[]` |
