---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: কনফিগারেশন (Configuration)
description: আপনার অ্যাপ্লিকেশনের জন্য কীভাবে Intlayer কনফিগার করবেন তা শিখুন। আপনার প্রয়োজন অনুযায়ী Intlayer কাস্টমাইজ করার জন্য উপলব্ধ বিভিন্ন সেটিংস এবং বিকল্পগুলি বুঝুন।
keywords:
  - কনফিগারেশন
  - সেটিংস
  - কাস্টমাইজেশন
  - Intlayer
  - বিকল্প
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: "'compiler.output' এবং 'dictionary.fill' এর জন্য প্রতি-লোকেল অবজেক্ট নোটেশন যোগ করা হয়েছে"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir' কে 'content' কনফিগারেশন থেকে 'system' কনফিগারেশনে সরানো হয়েছে"
  - version: 8.2.0
    date: 2026-03-09
    changes: কম্পাইলার বিকল্পগুলি আপডেট করা হয়েছে, 'output' এবং 'noMetadata' এর জন্য সমর্থন যোগ করা হয়েছে
  - version: 8.1.7
    date: 2026-02-25
    changes: কম্পাইলার বিকল্পগুলি আপডেট করা হয়েছে
  - version: 8.1.5
    date: 2026-02-23
    changes: কম্পাইলার অপশন 'build-only' এবং ডিকশনারি প্রিফিক্স যোগ করা হয়েছে
  - version: 8.0.6
    date: 2026-02-12
    changes: Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face এবং Together.ai প্রোভাইডারদের সমর্থন যোগ করা হয়েছে
  - version: 8.0.5
    date: 2026-02-06
    changes: AI কনফিগারেশনে `dataSerialization` যোগ করা হয়েছে
  - version: 8.0.0
    date: 2026-01-24
    changes: অন্তর্নিহিত মেকানিজমটি আরও ভালভাবে বর্ণনা করার জন্য ইম্পোর্ট মোড `live` থেকে `fetch` এ পরিবর্তন করা হয়েছে।
  - version: 8.0.0
    date: 2026-01-22
    changes: বিল্ড কনফিগারেশন `importMode` কে ডিকশনারি (`dictionary`) কনফিগারেশনে সরানো হয়েছে।
  - version: 8.0.0
    date: 2026-01-22
    changes: রাউটিং কনফিগারেশনে `rewrite` অপশন যোগ করা হয়েছে
  - version: 8.0.0
    date: 2026-01-18
    changes: সিস্টেম কনফিগারেশনকে কন্টেন্ট কনফিগারেশন থেকে আলাদা করা হয়েছে। ইন্টারনাল পাথগুলোকে `system` প্রপার্টিতে সরানো হয়েছে। কন্টেন্ট ফাইল এবং কোড ট্রান্সফরমেশন আলাদা করতে `codeDir` যোগ করা হয়েছে।
  - version: 8.0.0
    date: 2026-01-18
    changes: ডিকশনারি অপশন `location` এবং `schema` যোগ করা হয়েছে
  - version: 7.5.1
    date: 2026-01-10
    changes: JSON5 এবং JSONC ফাইল ফরম্যাটের সমর্থন যোগ করা হয়েছে
  - version: 7.5.0
    date: 2025-12-17
    changes: `buildMode` অপশন যোগ করা হয়েছে
  - version: 7.0.0
    date: 2025-10-25
    changes: `dictionary` কনফিগারেশন যোগ করা হয়েছে
  - version: 7.0.0
    date: 2025-10-21
    changes: `middleware` কে `routing` কনফিগারেশন দ্বারা প্রতিস্থাপন করা হয়েছে
  - version: 7.0.0
    date: 2025-10-12
    changes: `formatCommand` অপশন যোগ করা হয়েছে
  - version: 6.2.0
    date: 2025-10-12
    changes: `excludedPath` অপশন আপডেট করা হয়েছে
  - version: 6.0.2
    date: 2025-09-23
    changes: `outputFormat` অপশন যোগ করা হয়েছে
  - version: 6.0.0
    date: 2025-09-21
    changes: `dictionaryOutput` এবং `i18nextResourcesDir` ফিল্ডগুলো মুছে ফেলা হয়েছে
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` ইম্পোর্ট মোড যোগ করা হয়েছে
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` ফিল্ডকে `liveSync` দ্বারা প্রতিস্থাপন করা হয়েছে এবং `liveSyncPort` ও `liveSyncURL` ফিল্ড যোগ করা হয়েছে
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport` কে `importMode` অপশন দ্বারা প্রতিস্থাপন করা হয়েছে
  - version: 5.6.0
    date: 2025-07-13
    changes: ডিফল্ট contentDir `['src']` থেকে `['.']` তে পরিবর্তন করা হয়েছে
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` কমান্ডগুলো যোগ করা হয়েছে
---

# Intlayer কনফিগারেশন ডকুমেন্টেশন

## ওভারভিউ

Intlayer কনফিগারেশন ফাইল আপনাকে প্লাগইনটির বিভিন্ন দিক কাস্টমাইজ করতে দেয়, যেমন ইন্টারন্যাশনালাইজেশন (internationalization), মিডলওয়্যার এবং কন্টেন্ট হ্যান্ডলিং। এই ডকুমেন্টেশন কনফিগারেশনের প্রতিটি প্রপার্টির বিস্তারিত বর্ণনা প্রদান করে।

---

## সূচিপত্র

<TOC/>

---

## সমর্থিত কনফিগারেশন ফাইল ফরম্যাট

Intlayer JSON, JS, MJS এবং TS সহ নিচের কনফিগারেশন ফাইল ফরম্যাটগুলো গ্রহণ করে:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## কনফিগারেশন ফাইল উদাহরণ

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * সমস্ত উপলব্ধ বিকল্প প্রদর্শনকারী একটি উদাহরণ Intlayer কনফিগারেশন ফাইল।
 */
const config: IntlayerConfig = {
  /**
   * ইন্টারন্যাশনালাইজেশন সেটিংসের কনফিগারেশন।
   */
  internationalization: {
    /**
     * অ্যাপ্লিকেশনে সমর্থিত লোকেলগুলোর তালিকা।
     * ডিফল্ট: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * বাধ্যতামূলক লোকেলগুলোর তালিকা যা প্রতিটি ডিকশনারিতে সংজ্ঞায়িত করা আবশ্যক।
     * যদি খালি থাকে, তবে `strict` মোডে সমস্ত লোকেল বাধ্যতামূলক।
     * ডিফল্ট: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * ইন্টারন্যাশনালাইজড কন্টেন্টের কঠোরতার স্তর।
     * - "strict": কোনো ঘোষিত লোকেল অনুপস্থিত বা অঘোষিত থাকলে ত্রুটি।
     * - "inclusive": ঘোষিত লোকেল অনুপস্থিত থাকলে সতর্কতা।
     * - "loose": যে কোনো বিদ্যমান লোকেল গ্রহণ করে।
     * ডিফল্ট: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * অনুরোধকৃত লোকেল পাওয়া না গেলে ব্যাকআপ হিসেবে ব্যবহৃত ডিফল্ট লোকেল।
     * ডিফল্ট: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * ডিকশনারি অপারেশন এবং ফলব্যাক আচরণ নিয়ন্ত্রণকারী সেটিংস।
   */
  dictionary: {
    /**
     * ডিকশনারিগুলো কীভাবে ইম্পোর্ট করা হবে তা নিয়ন্ত্রণ করে।
     * - "static": বিল্ড টাইমে স্ট্যাটিক্যালি ইম্পোর্ট করা হয়।
     * - "dynamic": Suspense ব্যবহার করে ডাইনামিক্যালি ইম্পোর্ট করা হয়।
     * - "fetch": লাইভ সিঙ্ক API এর মাধ্যমে ডাইনামিক্যালি আনা হয়।
     * ডিফল্ট: "static"
     */
    importMode: "static",

    /**
     * AI ব্যবহার করে স্বয়ংক্রিয়ভাবে অনুপস্থিত অনুবাদ পূরণ করার কৌশল।
     * একটি বুলিয়ান মান অথবা পূর্ণ করা কন্টেন্ট সংরক্ষণের জন্য পাথ প্যাটার্ন হতে পারে।
     * ডিফল্ট: true
     */
    fill: true,

    /**
     * ডিকশনারি ফাইলের শারীরিক অবস্থান।
     * - "local": লোকাল ফাইলসিস্টেমে সংরক্ষিত।
     * - "remote": Intlayer CMS এ সংরক্ষিত।
     * - "hybrid": লোকাল এবং Intlayer CMS উভয় জায়গাতেই সংরক্ষিত।
     * - "plugin" (অথবা যে কোনো কাস্টম স্ট্রিং): প্লাগইন বা কাস্টম সোর্স দ্বারা সরবরাহকৃত।
     * ডিফল্ট: "local"
     */
    location: "local",

    /**
     * কন্টেন্ট কি স্বয়ংক্রিয়ভাবে রূপান্তরিত হওয়া উচিত (যেমন Markdown থেকে HTML)।
     * ডিফল্ট: false
     */
    contentAutoTransformation: false,
  },

  /**
   * রাউটিং এবং মিডলওয়্যার কনফিগারেশন।
   */
  routing: {
    /**
     * লোকেল রাউটিং কৌশল।
     * - "prefix-no-default": ডিফল্ট লোকেল বাদে অন্যগুলোতে প্রিফিক্স যোগ করে (যেমন /dashboard, /fr/dashboard)।
     * - "prefix-all": সমস্ত লোকেলে প্রিফিক্স যোগ করে (যেমন /en/dashboard, /fr/dashboard)।
     * - "no-prefix": URL এ কোনো লোকেল প্রিফিক্স থাকবে না।
     * - "search-params": ?locale=... ব্যবহার করে।
     * ডিফল্ট: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * ব্যবহারকারী-নির্বাচিত লোকেল কোথায় সংরক্ষণ করতে হবে।
     * বিকল্প: 'cookie', 'localStorage', 'sessionStorage', 'header', অথবা এগুলোর একটি অ্যারে।
     * ডিফল্ট: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * অ্যাপ্লিকেশন URL গুলোর জন্য বেস পাথ।
     * ডিফল্ট: ""
     */
    basePath: "",

    /**
     * প্রতি-লোকেল ভিত্তিতে নির্দিষ্ট পাথের জন্য কাস্টম URL রিরাইট রুল।
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * কন্টেন্ট ফাইল খোঁজা এবং প্রক্রিয়াকরণ সংক্রান্ত সেটিংস।
   */
  content: {
    /**
     * ডিকশনারি স্ক্যান করার জন্য ফাইল এক্সটেনশন।
     * ডিফল্ট: ['.content.ts', '.content.js', '.content.json', ইত্যাদি]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * ডিরেক্টরি যেখানে .content ফাইলগুলো অবস্থিত।
     * ডিফল্ট: ["."]
     */
    contentDir: ["src"],

    /**
     * সোর্স কোড যেখানে অবস্থিত।
     * বিল্ড অপ্টিমাইজেশন এবং কোড ট্রান্সফরমেশনের জন্য ব্যবহৃত হয়।
     * ডিফল্ট: ["."]
     */
    codeDir: ["src"],

    /**
     * স্ক্যানিং থেকে বাদ দেওয়া প্যাটার্ন।
     * ডিফল্ট: ['node_modules', '.intlayer', ইত্যাদি]
     */
    excludedPath: ["node_modules"],

    /**
     * ডেভেলপমেন্টের সময় পরিবর্তনগুলি নজরদারি করা এবং ডিকশনারি পুনর্নির্মাণ করা হবে কি না।
     * ডিফল্ট: ডেভেলপমেন্টে true
     */
    watch: true,

    /**
     * নতুন তৈরি / আপডেট করা .content ফাইল ফরম্যাট করতে ব্যবহৃত কমান্ড।
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * ভিউয়াল এডিটর (Visual Editor) কনফিগারেশন।
   */
  editor: {
    /**
     * ভিউয়াল এডিটর কি সক্রিয় থাকবে।
     * ডিফল্ট: false
     */
    enabled: true,

    /**
     * অরিজিন ভ্যালিডেশনের জন্য আপনার অ্যাপ্লিকেশনের URL।
     * ডিফল্ট: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * লোকাল এডিটর সার্ভারের পোর্ট।
     * ডিফল্ট: 8000
     */
    port: 8000,

    /**
     * এডিটরের পাবলিক URL।
     * ডিফল্ট: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS এর URL।
     * ডিফল্ট: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * ব্যাকএন্ড API এর URL।
     * ডিফল্ট: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * রিয়েল-টাইম কন্টেন্ট সিঙ্ক কি সক্রিয় থাকবে।
     * ডিফল্ট: false
     */
    liveSync: true,
  },

  /**
   * AI-ভিত্তিক অনুবাদ এবং নির্মাণ সেটিংস।
   */
  ai: {
    /**
     * ব্যবহারের জন্য AI প্রোভাইডার।
     * বিকল্প: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * ডিফল্ট: 'openai'
     */
    provider: "openai",

    /**
     * নির্বাচিত প্রোভাইডারের মডেল যা ব্যবহার করা হবে।
     */
    model: "gpt-4o",

    /**
     * প্রোভাইডার API কী।
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * অনুবাদ তৈরির সময় AI কে নির্দেশিকা দেওয়ার জন্য গ্লোবাল কনটেক্সট।
     */
    applicationContext: "এটি একটি ভ্রমণ বুকিং অ্যাপ্লিকেশন।",

    /**
     * AI API এর জন্য বেস পাথ URL।
     */
    baseURL: "http://localhost:3000",

    /**
     * ডেটা সিরিয়ালাইজেশন (Data Serialization)
     *
     * বিকল্প:
     * - "json": ডিফল্ট, শক্তিশালী; বেশি টোকেন ব্যবহার করে।
     * - "toon": কম টোকেন ব্যবহার করে, তবে JSON এর মতো সামঞ্জস্যপূর্ণ নাও হতে পারে।
     *
     * ডিফল্ট: "json"
     */
    dataSerialization: "json",
  },

  /**
   * বিল্ড এবং অপ্টিমাইজেশন সেটিংস।
   */
  build: {
    /**
     * বিল্ড এক্সিকিউশন মোড।
     * - "auto": অ্যাপ্লিকেশন বিল্ড করার সময় স্বয়ংক্রিয়ভাবে বিল্ড হবে।
     * - "manual": একটি স্পষ্ট বিল্ড কমান্ডের প্রয়োজন।
     * ডিফল্ট: "auto"
     */
    mode: "auto",

    /**
     * অব্যবহৃত ডিকশনারিগুলো সরিয়ে ফাইনাল বান্ডল কি অপ্টিমাইজ করা হবে।
     * ডিফল্ট: প্রোডাকশনে true
     */
    optimize: true,

    /**
     * জেনারেটেড ডিকশনারি ফাইলগুলোর জন্য আউটপুট ফরম্যাট।
     * ডিফল্ট: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * বিল্ড করার সময় TypeScript টাইপগুলি চেক করবে কি না তা নির্দেশ করে।
     * ডিফল্ট: false
     */
    checkTypes: false,
  },

  /**
   * লগার (Logger) কনফিগারেশন।
   */
  log: {
    /**
     * লগিং লেভেল।
     * - "default": স্ট্যান্ডার্ড লগিং।
     * - "verbose": বিস্তারিত ডিবাগ লগিং।
     * - "disabled": লগিং নিষ্ক্রিয় করে।
     * ডিফল্ট: "default"
     */
    mode: "default",

    /**
     * সমস্ত লগ মেসেজের জন্য প্রিফিক্স।
     * ডিফল্ট: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * সিস্টেম কনফিগারেশন (উন্নত ব্যবহারের জন্য)
   */
  system: {
    /**
     * লোকালাইজড ডিকশনারিগুলো সংরক্ষণের ডিরেক্টরি।
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * TypeScript মডিউল অগমেন্টেশনের ডিরেক্টরি।
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * আনমার্জড (unmerged) ডিকশনারিগুলো সংরক্ষণের ডিরেক্টরি।
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * ডিকশনারি টাইপগুলো সংরক্ষণের ডিরেক্টরি।
     */
    typesDir: ".intlayer/types",

    /**
     * মেইন অ্যাপ্লিকেশন ফাইলগুলো যেখানে সংরক্ষিত হয়।
     */
    mainDir: ".intlayer/main",

    /**
     * কনফিগারেশন ফাইলগুলো যেখানে সংরক্ষিত হয়।
     */
    configDir: ".intlayer/config",

    /**
     * ক্যাশে ফাইলগুলো যেখানে সংরক্ষিত হয়।
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * কম্পাইলার কনফিগারেশন (উন্নত ব্যবহারের জন্য)
   */
  compiler: {
    /**
     * কম্পাইলার সক্রিয় থাকবে কি না তা নির্দেশ করে।
     *
     * - false: কম্পাইলার নিষ্ক্রিয় করে।
     * - true: কম্পাইলার সক্রিয় করে।
     * - "build-only": ডেভেলপমেন্টের সময় কম্পাইলার বাদ দেয় এবং স্টার্টআপের গতি বাড়ায়।
     *
     * ডিফল্ট: false
     */
    enabled: true,

    /**
     * আউটপুট ফাইলগুলোর জন্য পাথ নির্ধারণ করে। `outputDir` কে প্রতিস্থাপন করে।
     *
     * - `./` পাথগুলো কম্পোনেন্ট ডিরেক্টরি সাপেক্ষে সমাধান করা হয়।
     * - `/` পাথগুলো প্রজেক্ট রুট (`baseDir`) সাপেক্ষে সমাধান করা হয়।
     *
     * - পাথে `{{locale}}` ভেরিয়েবল অন্তর্ভুক্ত করলে প্রতি-ভাষার জন্য আলাদা ডিকশনারি তৈরি হবে।
     *
     * উদাহরণ:
     * ```ts
     * {
     *   // কম্পোনেন্টের পাশে মাল্টিলিঙ্গুয়াল .content.ts ফাইল তৈরি করুন
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // টেমপ্লেট স্ট্রিং ব্যবহার করে সমতুল্য
     * }
     * ```
     *
     * ```ts
     * {
     *   // প্রজেক্ট রুটে প্রতি ভাষার জন্য সেন্ট্রালাইজড JSON তৈরি করুন
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // টেমপ্লেট স্ট্রিং ব্যবহার করে সমতুল্য
     * }
     * ```
     *
     * ভেরিয়েবল তালিকা:
     *   - `fileName`: ফাইলের নাম।
     *   - `key`: কন্টেন্ট কী।
     *   - `locale`: কন্টেন্ট লোকেল।
     *   - `extension`: ফাইলের এক্সটেনশন।
     *   - `componentFileName`: কম্পোনেন্ট ফাইলের নাম।
     *   - `componentExtension`: কম্পোনেন্ট ফাইলের এক্সটেনশন।
     *   - `format`: ডিকশনারি ফরম্যাট।
     *   - `componentFormat`: কম্পোনেন্ট ডিকশনারি ফরম্যাট।
     *   - `componentDirPath`: কম্পোনেন্ট ডিরেক্টরি পাথ।
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * রূপান্তরিত করার পর কম্পোনেন্টগুলো কি সংরক্ষণ করা হবে তা নির্দেশ করে।
     * এর ফলে কম্পাইলার আপনার অ্যাপ্লিকেশন রূপান্তরিত করতে একবার রান হতে পারে এবং তারপর সরানো যেতে পারে।
     */
    saveComponents: false,

    /**
     * জেনারেটেড ফাইলে শুধুমাত্র কন্টেন্ট যোগ করবে। i18next বা ICU MessageFormat-এর জন্য প্রতি-ভাষা JSON আউটপুটের জন্য উপযোগী।
     */
    noMetadata: false,

    /**
     * ডিকশনারি কী প্রিফিক্স
     */
    dictionaryKeyPrefix: "", // এক্সট্র্যাক্টেড ডিকশনারি কীগুলোতে একটি ঐচ্ছিক প্রিফিক্স যোগ করুন
  },

  /**
   * ডিকশনারি বিষয়বস্তু যাচাই করার জন্য কাস্টম স্কিমা (Schemas)।
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * প্লাগইন কনফিগারেশন।
   */
  plugins: [],
};

export default config;
````

---

## কনফিগারেশন রেফারেন্স (Configuration Reference)

নিচের বিভাগগুলো Intlayer-এ উপলব্ধ বিভিন্ন কনফিগারেশন বিকল্প বর্ণনা করে।

---

### ইন্টারন্যাশনালাইজেশন কনফিগারেশন (Internationalization Configuration)

উপলব্ধ লোকেল এবং অ্যাপ্লিকেশনের জন্য ডিফল্ট লোকেল সহ ইন্টারন্যাশনালাইজেশন সংক্রান্ত সেটিংস সংজ্ঞায়িত করে।

| ফিল্ড             | টাইপ       | বর্ণনা                                                                                                        | উদাহরণ               | নোট                                                                                                                                                                                                                                                                                  |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | `string[]` | অ্যাপ্লিকেশনে সমর্থিত লোকেলগুলোর তালিকা। ডিফল্ট: `[Locales.ENGLISH]`                                          | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                      |
| `requiredLocales` | `string[]` | অ্যাপ্লিকেশনে বাধ্যতামূলক লোকেলগুলোর তালিকা। ডিফল্ট: `[]`                                                     | `[]`                 | যদি খালি থাকে, তবে `strict` মোডে সব লোকেল বাধ্যতামূলক। নিশ্চিত করুন যে বাধ্যতামূলক লোকেলগুলো ও `locales` ফিল্ডে সংজ্ঞায়িত করা আছে।                                                                                                                                                  |
| `strictMode`      | `string`   | TypeScript ব্যবহারের মাধ্যমে ইন্টারন্যাশনালাইজড কন্টেন্টের বলিষ্ঠ বাস্তবায়ন নিশ্চিত করে। ডিফল্ট: `inclusive` |                      | যদি `"strict"` হয়: প্রতিটি ঘোষিত লোকেল সংজ্ঞায়িত হওয়া প্রয়োজন — কোনোটি অনুপস্থিত বা অঘোষিত থাকলে `t` ফাংশন এরর থ্রো করবে। যদি `"inclusive"` হয়: অনুপস্থিত লোকেল সম্পর্কে সতর্ক করে কিন্তু বিদ্যমান অঘোষিত লোকেল গ্রহণ করে। যদি `"loose"` হয়: যে কোনো বিদ্যমান লোকেল গ্রহণ করে। |
| `defaultLocale`   | `string`   | অনুরোধকৃত লোকেল পাওয়া না গেলে ব্যাকআপ হিসেবে ব্যবহৃত ডিফল্ট লোকেল। ডিফল্ট: `Locales.ENGLISH`                 | `'en'`               | URL, কুকি বা হেডারে কোনো লোকেল নির্দিষ্ট না থাকলে সেটি নির্ধারণ করতে ব্যবহৃত হয়।                                                                                                                                                                                                    |

---

### এডিটর কনফিগারেশন (Editor Configuration)

সার্ভার পোর্ট এবং অ্যাক্টিভিটি স্টেট সহ ইন্টিগ্রেটেড এডিটর সংক্রান্ত সেটিংস সংজ্ঞায়িত করে।

| ফিল্ড                        | টাইপ                      | বর্ণনা                                                                                                                                                                                                | উদাহরণ                                                                                | নোট                                                                                                                                                                                                                           |
| ---------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | আপনার অ্যাপ্লিকেশনের URL। ডিফল্ট: `''`                                                                                                                                                                | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | নিরাপত্তার খাতিরে এডিটরের অরিজিন সীমিত করতে ব্যবহৃত হয়। যদি `'*'` সেট করা হয়, এডিটর যে কোনো অরিজিন থেকে অ্যাক্সেস করা যাবে।                                                                                                 |
| `port`                       | `number`                  | ভিউয়াল এডিটর সার্ভার দ্বারা ব্যবহৃত পোর্ট। ডিফল্ট: `8000`                                                                                                                                            |                                                                                       |                                                                                                                                                                                                                               |
| `editorURL`                  | `string`                  | এডিটর সার্ভার URL। ডিফল্ট: `'http://localhost:8000'`                                                                                                                                                  | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | অরিজিনগুলো সীমিত করতে ব্যবহৃত হয় যা অ্যাপ্লিকেশনের সাথে ইন্টারঅ্যাক্ট করতে পারে। যদি `'*'` সেট করা হয়, যে কোনো অরিজিন থেকে অ্যাক্সেসযোগ্য। পোর্ট পরিবর্তন করলে বা এডিটর ভিন্ন কোনো ডোমেনে হোস্ট করা হলে এটি সেট করা আবশ্যক। |
| `cmsURL`                     | `string`                  | Intlayer CMS URL। ডিফল্ট: `'https://intlayer.org'`                                                                                                                                                    | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                               |
| `backendURL`                 | `string`                  | ব্যাকএন্ড সার্ভার URL। ডিফল্ট: `https://back.intlayer.org`                                                                                                                                            | `http://localhost:4000`                                                               |                                                                                                                                                                                                                               |
| `enabled`                    | `boolean`                 | অ্যাপ্লিকেশনটি ভিউয়াল এডিটরের সাথে ইন্টারঅ্যাক্ট করবে কি না তা নির্দেশ করে। ডিফল্ট: `true`                                                                                                           | `process.env.NODE_ENV !== 'production'`                                               | যদি `false` হয়, এডিটর অ্যাপ্লিকেশনের সাথে যোগাযোগ করতে পারবে না। নির্দিষ্ট পরিবেশের জন্য এটি নিষ্ক্রিয় করা নিরাপত্তা জোরদার করে।                                                                                            |
| `clientId`                   | `string &#124; undefined` | oAuth2 ব্যবহার করে ব্যাকএন্ডের সাথে প্রমাণীকরণের জন্য intlayer প্যাকেজগুলোকে সক্ষম করে। একটি অ্যাক্সেস টোকেন পেতে [intlayer.org/project](https://app.intlayer.org/project) এ যান। ডিফল্ট: `undefined` |                                                                                       | গোপন রাখুন; এনভায়রনমেন্ট ভেরিয়েবলে সংরক্ষণ করুন।                                                                                                                                                                            |
| `clientSecret`               | `string &#124; undefined` | oAuth2 ব্যবহার করে ব্যাকএন্ডের সাথে প্রমাণীকরণের জন্য intlayer প্যাকেজগুলোকে সক্ষম করে। একটি অ্যাক্সেস টোকেন পেতে [intlayer.org/project](https://app.intlayer.org/project) এ যান। ডিফল্ট: `undefined` |                                                                                       | গোপন রাখুন; এনভায়রনমেন্ট ভেরিয়েবলে সংরক্ষণ করুন।                                                                                                                                                                            |
| `dictionaryPriorityStrategy` | `string`                  | যখন লোকাল এবং রিমোট ডিকশনারি উভয়ই উপস্থিত থাকে, তখন ডিকশনারি অগ্রাধিকার দেওয়ার কৌশল। ডিফল্ট: `'local_first'`                                                                                        | `'distant_first'`                                                                     | `'distant_first'`: লোকালের তুলনায় রিমোট ডিকশনারিকে অগ্রাধিকার দেয়। `'local_first'`: রিমোটের তুলনায় লোকাল ডিকশনারিকে অগ্রাধিকার দেয়।                                                                                       |
| `liveSync`                   | `boolean`                 | CMS / ভিউয়াল এডিটর / ব্যাকএন্ডে কোনো পরিবর্তন শনাক্ত হলে অ্যাপ সার্ভার কন্টেন্ট হট-রিললোড করবে কি না তা নির্দেশ করে। ডিফল্ট: `true`                                                                  | `true`                                                                                | যখন কোনো ডিকশনারি যোগ বা আপডেট করা হয়, অ্যাপ্লিকেশন পেজ কন্টেন্ট আপডেট করে। লাইভ সিঙ্ক অন্য সার্ভারের কন্টেন্ট আউটসোর্স করে, যা পারফরম্যান্সে সামান্য প্রভাব ফেলতে পারে। উভয়কে একই মেশিনে হোস্ট করার পরামর্শ দেওয়া হয়।    |
| `liveSyncPort`               | `number`                  | লাইভ সিঙ্ক সার্ভার পোর্ট। ডিফল্ট: `4000`                                                                                                                                                              | `4000`                                                                                |                                                                                                                                                                                                                               |
| `liveSyncURL`                | `string`                  | লাইভ সিঙ্ক সার্ভার URL। ডিফল্ট: `'http://localhost:{liveSyncPort}'`                                                                                                                                   | `'https://example.com'`                                                               | ডিফল্টরূপে লোকালহোস্ট নির্দেশ করে; একটি রিমোট লাইভ সিঙ্ক সার্ভারে পরিবর্তন করা যেতে পারে।                                                                                                                                     |

### রাউটিং কনফিগারেশন (Routing Configuration)

URL স্ট্রাকচার, লোকেল স্টোরেজ এবং মিডলওয়্যার হ্যান্ডলিং সহ রাউটিং আচরণ নিয়ন্ত্রণকারী সেটিংস।

| ফিল্ড      | টাইপ                                                                                                                                                 | বর্ণনা                                                                                                                                         | উদাহরণ                                                                                                                                                                                                           | নোট                                                                                                                                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | লোকেল হ্যান্ডলিংয়ের জন্য URL রাউটিং মোড। ডিফল্ট: `'prefix-no-default'`                                                                        | `'prefix-no-default'`: `/dashboard` (en) অথবা `/fr/dashboard` (fr)। `'prefix-all'`: `/en/dashboard`। `'no-prefix'`: লোকেল অন্য উপায়ে নিয়ন্ত্রণ করা হয়। `'search-params'`: `/dashboard?locale=fr` ব্যবহার করে। | কুকি বা লোকেল স্টোরেজ ম্যানেজমেন্টকে প্রভাবিত করে না।                                                                                                                                                                                                                  |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | ক্লায়েন্টে লোকেল সংরক্ষণের জন্য কনফিগারেশন। ডিফল্ট: `['cookie', 'header']`                                                                    | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                                    | নিচে স্টোরেজ অপশন টেবিলটি দেখুন।                                                                                                                                                                                                                                       |
| `basePath` | `string`                                                                                                                                             | অ্যাপ্লিকেশন URL গুলোর জন্য বেস পাথ। ডিফল্ট: `''`                                                                                              | `'/my-app'`                                                                                                                                                                                                      | অ্যাপ্লিকেশনটি যদি `https://example.com/my-app` এ থাকে, তবে basePath হবে `'/my-app'` এবংURL গুলো হবে `https://example.com/my-app/en` মতো।                                                                                                                              |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | কাস্টম URL রিরাইট রুল যা নির্দিষ্ট পাথের জন্য ডিফল্ট রাউটিং মোডকে ওভাররাইড করে। ডাইনামিক প্যারামিটার `[param]` সমর্থন করে। ডিফল্ট: `undefined` | নিচের উদাহরণটি দেখুন                                                                                                                                                                                             | রিরাইট রুলগুলো `mode`-এর তুলনায় অগ্রাধিকার পায়। Next.js এবং Vite এর সাথে কাজ করে। `getLocalizedUrl()` স্বয়ংক্রিয়ভাবে ম্যাচিং রুলগুলো প্রয়োগ করে। দেখুন [কাস্টম URL রিরাইট](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/custom_url_rewrites.md)। |

**`rewrite` উদাহরণ**:

```typescript
routing: {
  mode: "prefix-no-default", // ফলব্যাক কৌশল
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

#### স্টোরেজ অপশন (Storage Options)

| মান                | বর্ণনা                                                                               | নোট                                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | কুকিতে লোকেল সংরক্ষণ করে — ক্লায়েন্ট এবং সার্ভার উভয় দিক থেকেই অ্যাক্সেসযোগ্য।     | GDPR কমপ্লায়েন্সের জন্য, নিশ্চিত করুন যে সঠিক ব্যবহারকারীর সম্মতি নেওয়া হয়েছে। `CookiesAttributes` এর মাধ্যমে কাস্টমাইজযোগ্য (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`)। |
| `'localStorage'`   | ব্রাউজারে কোনো এক্সপায়ারি ডেট ছাড়াই লোকেল সংরক্ষণ করে — শুধুমাত্র ক্লায়েন্ট-সাইড। | স্পষ্টভাবে পরিষ্কার না করা পর্যন্ত এক্সপায়ার হয় না। Intlayer প্রক্সি এটি অ্যাক্সেস করতে পারে না। `StorageAttributes` এর মাধ্যমে কাস্টমাইজযোগ্য (`{ type: 'localStorage', name: 'custom-locale' }`)।         |
| `'sessionStorage'` | পেজ সেশনের মেয়াদের জন্য লোকেল সংরক্ষণ করে — শুধুমাত্র ক্লায়েন্ট-সাইড।              | ট্যাব বা উইন্ডো বন্ধ করলে পরিষ্কার হয়ে যায়। Intlayer প্রক্সি এটি অ্যাক্সেস করতে পারে না। `StorageAttributes` এর মাধ্যমে কাস্টমাইজযোগ্য (`{ type: 'sessionStorage', name: 'custom-locale' }`)।               |
| `'header'`         | HTTP হেডারের মাধ্যমে লোকেল সংরক্ষণ বা প্রেরণ করে — শুধুমাত্র সার্ভার-সাইড।           | API কলের জন্য উপযোগী। ক্লায়েন্ট-সাইড এটি অ্যাক্সেস করতে পারে না। `StorageAttributes` এর মাধ্যমে কাস্টমাইজযোগ্য (`{ type: 'header', name: 'custom-locale' }`)।                                                |

#### কুকি অ্যাট্রিবিউটস (Cookie Attributes)

কুকি স্টোরেজ ব্যবহার করার সময়, আপনি অতিরিক্ত কুকি অ্যাট্রিবিউট কনফিগার করতে পারেন:

| ফিল্ড      | টাইপ                                  | বর্ণনা                                               |
| ---------- | ------------------------------------- | ---------------------------------------------------- |
| `name`     | `string`                              | কুকির নাম। ডিফল্ট: `'INTLAYER_LOCALE'`               |
| `domain`   | `string`                              | কুকি ডোমেইন। ডিফল্ট: `undefined`                     |
| `path`     | `string`                              | কুকি পাথ। ডিফল্ট: `undefined`                        |
| `secure`   | `boolean`                             | HTTPS প্রয়োজন। ডিফল্ট: `undefined`                  |
| `httpOnly` | `boolean`                             | HTTP-only ফ্ল্যাগ। ডিফল্ট: `undefined`               |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite পলিসি।                                      |
| `expires`  | `Date &#124; number`                  | এক্সপায়ারি ডেট বা দিনের সংখ্যা। ডিফল্ট: `undefined` |

#### লোকেল স্টোরেজ অ্যাট্রিবিউটস (Locale Storage Attributes)

localStorage অথবা sessionStorage ব্যবহার করার সময়:

| ফিল্ড  | টাইপ                                     | বর্ণনা                                      |
| ------ | ---------------------------------------- | ------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | স্টোরেজ টাইপ।                               |
| `name` | `string`                                 | স্টোরেজ কী নাম। ডিফল্ট: `'INTLAYER_LOCALE'` |

#### কনফিগারেশন উদাহরণ

নতুন v7 রাউটিং স্ট্রাকচারের জন্য এখানে কিছু সাধারণ কনফিগারেশন উদাহরণ দেওয়া হলো:

**বেসিক কনফিগারেশন (ডিফল্ট)**:

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

**GDPR কমপ্লায়েন্ট কনফিগারেশন**:

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

**সার্চ প্যারামিটার মোড (Search Parameters Mode)**:

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

**কাস্টম স্টোরেজ সহ কোনো প্রিফিক্স মোড নেই (No Prefix Mode)**:

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

**ডাইনামিক পাথ সহ কাস্টম URL রিরাইট**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // রিরাইট না করা পাথের জন্য ফলব্যাক
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

### কন্টেন্ট কনফিগারেশন (Content Configuration)

অ্যাপ্লিকেশনের মধ্যে কন্টেন্ট প্রসেসিং সংক্রান্ত সেটিংস (ডিরেক্টরি নাম, ফাইল এক্সটেনশন এবং প্রাপ্ত কনফিগারেশন)।

| ফিল্ড            | টাইপ       | বর্ণনা                                                                                                                                                                                   | উদাহরণ                              | নোট                                                                                                                      |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `watch`          | `boolean`  | ডিকশনারি পুনর্নির্মাণের জন্য কন্টেন্ট ডিক্লারেশন ফাইলে পরিবর্তনের দিকে Intlayer নজর রাখবে কি না তা নির্দেশ করে। ডিফল্ট: `process.env.NODE_ENV === 'development'`                         |                                     |                                                                                                                          |
| `fileExtensions` | `string[]` | কন্টেন্ট ডিক্লারেশন ফাইল স্ক্যান করার জন্য ফাইল এক্সটেনশন। ডিফল্ট: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                          |
| `contentDir`     | `string[]` | ডিরেক্টরি পাথ যেখানে কন্টেন্ট ডিক্লারেশন ফাইলগুলো অবস্থিত। ডিফল্ট: `['.']`                                                                                                               | `['src/content']`                   |                                                                                                                          |
| `codeDir`        | `string[]` | ডিরেক্টরি পাথ যেখানে আপনার অ্যাপ্লিকেশনের সোর্স কোড ফাইলগুলো অবস্থিত। ডিফল্ট: `['.']`                                                                                                    | `['src']`                           | বিল্ড অপ্টিমাইজ করতে এবং কোড ট্রান্সফরমেশন ও হট রিললোড শুধুমাত্র প্রয়োজনীয় ফাইলে প্রয়োগ করা নিশ্চিত করতে ব্যবহৃত হয়। |
| `excludedPath`   | `string[]` | কন্টেন্ট স্ক্যানিং থেকে বাদ দেওয়া পাথ। ডিফল্ট: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                | `['src/styles']`                    |                                                                                                                          |
| `formatCommand`  | `string`   | নতুন তৈরি বা আপডেট করা কন্টেন্ট ফাইলগুলো ফরম্যাট করার জন্য যে কমান্ডটি চালানো হবে। ডিফল্ট: `undefined`                                                                                   | `'npx prettier --write "{{file}}"'` | কন্টেন্ট এক্সট্রাকশন কালীন অথবা ভিউয়াল এডিটরের মাধ্যমে ব্যবহৃত হয়।                                                     |

---

### ডিকশনারি কনফিগারেশন (Dictionary Configuration)

ডিকশনারি অপারেশন নিয়ন্ত্রণকারী সেটিংস, যার মধ্যে অটো-ফিলিং আচরণ এবং কন্টেন্ট তৈরি অন্তর্ভুক্ত।

এই ডিকশনারি কনফিগারেশনের দুটি প্রধান উদ্দেশ্য রয়েছে:

১. **ডিফল্ট মান**: কন্টেন্ট ডিক্লারেশন ফাইল তৈরির সময় ডিফল্ট মান নির্ধারণ করা।
২. **ফলব্যাক আচরণ**: ডিকশনারি অপারেশনের আচরণ গ্লোবালভাবে সেট করার অনুমতি দেয়, নির্দিষ্ট ফিল্ড সংজ্ঞায়িত না থাকলে ফলব্যাক মান প্রদান করে।

কন্টেন্ট ডিক্লারেশন ফাইল এবং কনফিগারেশন মান কীভাবে প্রয়োগ করা হয় সে সম্পর্কে আরও তথ্যের জন্য [কন্টেন্ট ফাইল ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md) দেখুন।

| ফিল্ড                       | টাইপ                                                                                            | বর্ণনা                                                                                                                                                                                           | উদাহরণ                   | নোট                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | অটো-ফিল (AI অনুবাদ) আউটপুট ফাইলগুলো কীভাবে জেনারেট হবে তা নিয়ন্ত্রণ করে। ডিফল্ট: `true`                                                                                                          | নিচের উদাহরণটি দেখুন     | `true`: ডিফল্ট পাথ (সোর্সের মতো একই ফাইল)। `false`: নিষ্ক্রিয়। স্ট্রিং/ফাংশন প্যাটার্ন প্রতি ভাষার জন্য ফাইল জেনারেট করে। প্রতি ভাষার জন্য অবজেক্ট: প্রতিটি ভাষা নিজস্ব প্যাটার্নের সাথে ম্যাপ করে; `false` সেই ভাষাটি বাদ দেয়। `{{locale}}` ভেরিয়েবল অন্তর্ভুক্ত করা প্রতি-ভাষা জেনারেশন ট্রিগার করে। ডিকশনারি-স্তরের `fill` সবসময় এই গ্লোবাল কনফিগারেশনের চেয়ে অগ্রাধিকার পায়। |
| `description`               | `string`                                                                                        | এডিটর এবং CMS-এ ডিকশনারির উদ্দেশ্য বুঝতে সাহায্য করে। AI অনুবাদ জেনারেশনের জন্য কনটেক্সট হিসেবেও ব্যবহৃত হয়। ডিফল্ট: `undefined`                                                                | `'User profile section'` |                                                                                                                                                                                                                                                                                                                                                                                  |
| `locale`                    | `LocalesValues`                                                                                 | ডিকশনারিটিকে প্রতি-লোকেল ফরম্যাটে রূপান্তরিত করে। প্রতিটি ডিক্লেয়ার করা ফিল্ড একটি ট্রান্সলেশন নোড হয়ে যায়। অনুপস্থিত থাকলে, ডিকশনারিটি মাল্টিলিঙ্গুয়াল হিসেবে গণ্য হয়। ডিফল্ট: `undefined` | `'en'`                   | ডিকশনারিটি একটি নির্দিষ্ট লোকেলের জন্য হলে এটি ব্যবহার করুন, একাধিক লোকেলের অনুবাদ ধারণ করার পরিবর্তে।                                                                                                                                                                                                                                                                           |
| `contentAutoTransformation` | `boolean &#124; { markdown?: boolean; html?: boolean; insertion?: boolean }`                    | কন্টেন্ট স্ট্রিংগুলো স্বয়ংক্রিয়ভাবে টাইপড নোডে (markdown, HTML, বা insertion) রূপান্তরিত করে। ডিফল্ট: `false`                                                                                  | `true`                   | Markdown: `### Title` → `md('### Title')`। HTML: `<div>Title</div>` → `html('<div>Title</div>')`। Insertion: `Hello {{name}}` → `insert('Hello {{name}}')`।                                                                                                                                                                                                                      |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; 'plugin' &#124; string`                         | ডিকশনারি ফাইলগুলো কোথায় সংরক্ষিত এবং CMS সিঙ্ক্রোনাইজেশন মোড নির্দেশ করে। ডিফল্ট: `'local'`                                                                                                     | `'hybrid'`               | `'local'`: শুধুমাত্র স্থানীয়ভাবে পরিচালিত। `'remote'`: শুধুমাত্র রিমোটভাবে পরিচালিত (CMS)। `'hybrid'`: স্থানীয় এবং রিমোট উভয়ভাবে পরিচালিত। `'plugin'` বা কাস্টম স্ট্রিং: কোনো প্লাগইন বা কাস্টম সোর্স দ্বারা পরিচালিত।                                                                                                                                                        |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | ডিকশনারিগুলো কীভাবে ইম্পোর্ট করা হবে তা নিয়ন্ত্রণ করে। ডিফল্ট: `'static'`                                                                                                                        | `'dynamic'`              | `'static'`: স্ট্যাটিক্যালি ইম্পোর্ট করা হয়। `'dynamic'`: 'Suspense'-এর মাধ্যমে ডাইনামিক্যালি ইম্পোর্ট করা হয়। `'fetch'`: 'Live Sync API'-এর মাধ্যমে ডাইনামিক্যালি আনা হয়। `getIntlayer`, `getDictionary`, `useDictionary` ইত্যাদিতে প্রভাব ফেলে না।                                                                                                                              |
| `priority`                  | `number`                                                                                        | ডিকশনারির অগ্রাধিকার। ডিকশনারিগুলোর মধ্যে দ্বন্দ্ব সমাধান করার সময় উচ্চ মান নিম্ন মানের চেয়ে প্রাধান্য পায়। ডিফল্ট: `undefined`                                                               | `1`                      |                                                                                                                                                                                                                                                                                                                                                                                  |
| `live`                      | `boolean`                                                                                       | অবজ্ঞাত — পরিবর্তে `importMode: 'fetch'` ব্যবহার করুন। নির্দেশ করত যে ডিকশনারি কন্টেন্ট লাইভ সিঙ্ক API-এর মাধ্যমে ডাইনামিক্যালি ফেচ করা হয়েছিল কিনা। ডিফল্ট: `undefined`                        |                          | v8.0.0-এ `importMode: 'fetch'`-এ নামকরণ করা হয়েছে।                                                                                                                                                                                                                                                                                                                              |
| `schema`                    | `'https://intlayer.org/schema.json'`                                                            | JSON স্কিমা ভ্যালিডেশনের জন্য Intlayer দ্বারা অটো-জেনারেটেড। ডিফল্ট: অটো-জেনারেটেড                                                                                                               |                          | ম্যানুয়ালি পরিবর্তন করবেন না।                                                                                                                                                                                                                                                                                                                                                   |
| `title`                     | `string`                                                                                        | এডিটর এবং CMS-এ ডিকশনারি সনাক্ত করতে সাহায্য করে। ডিফল্ট: `undefined`                                                                                                                            | `'User Profile'`         |                                                                                                                                                                                                                                                                                                                                                                                  |
| `tags`                      | `string[]`                                                                                      | ডিকশনারিগুলো শ্রেণীবদ্ধ করে এবং এডিটর ও AI-এর জন্য কনটেক্সট বা নির্দেশনা প্রদান করে। ডিফল্ট: `undefined`                                                                                         | `['user', 'profile']`    |                                                                                                                                                                                                                                                                                                                                                                                  |
| `version`                   | `string`                                                                                        | রিমোট ডিকশনারির সংস্করণ; বর্তমানে কোন সংস্করণ ব্যবহৃত হচ্ছে তা ট্র্যাক করতে সাহায্য করে। ডিফল্ট: `undefined`                                                                                     | `'1.0.0'`                | CMS-এ পরিচালনাযোগ্য। স্থানীয়ভাবে পরিবর্তন করবেন না।                                                                                                                                                                                                                                                                                                                             |

**`fill` উদাহরণ**:

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

### AI কনফিগারেশন (AI Configuration)

Intlayer-এর AI-চালিত বৈশিষ্ট্যগুলোর জন্য সেটিংস সংজ্ঞায়িত করে, যেমন বিল্ড ট্রান্সলেশন।

| ফিল্ড                | টাইপ                   | বর্ণনা                                                                          | উদাহরণ                                      | নোট                                                                                               |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | ব্যবহারের জন্য AI প্রোভাইডার।                                                   | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                                   |
| `model`              | `string`               | ব্যবহারের জন্য AI মডেল।                                                         | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                                   |
| `apiKey`             | `string`               | নির্বাচিত প্রোভাইডারের জন্য API কী।                                             | `process.env.OPENAI_API_KEY`                |                                                                                                   |
| `applicationContext` | `string`               | AI অনুবাদের নির্ভুলতা উন্নত করতে আপনার অ্যাপ্লিকেশন সম্পর্কে অতিরিক্ত কনটেক্সট। | `'শিশুদের জন্য একটি লার্নিং প্ল্যাটফর্ম।'`  |                                                                                                   |
| `baseURL`            | `string`               | API কলের জন্য ঐচ্ছিক বেস পাথ URL।                                               |                                             | আপনি যদি প্রক্সি বা লোকাল AI ডেপ্লয়মেন্ট ব্যবহার করেন তবে উপযোগী।                                |
| `dataSerialization`  | `'json' &#124; 'toon'` | AI-তে কীভাবে ডেটা পাঠানো হবে তা সংজ্ঞায়িত করে। ডিফল্ট: `'json'`                | `'json'`                                    | `'json'`: আরও শক্তিশালী এবং সুনির্দিষ্ট। `'toon'`: কম টোকেন খরচ করে কিন্তু কম স্থিতিশীল হতে পারে। |

---

### বিল্ড কনফিগারেশন (Build Configuration)

Intlayer বিল্ড প্রসেস এবং অপ্টিমাইজেশন সেটিংস।

| ফিল্ড          | টাইপ                     | বর্ণনা                                                                                                     | উদাহরণ | নোট |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- | ------ | --- |
| `mode`         | `'auto' &#124; 'manual'` | অ্যাপ্লিকেশনের প্রি-বিল্ড ধাপগুলোতে Intlayer স্বয়ংক্রিয়ভাবে চলবে কি না তা নির্দেশ করে। ডিফল্ট: `'auto'`  |        |     |
| `optimize`     | `boolean`                | কম্পাইল করা ডিকশনারিগুলো রানটাইমের জন্য অপ্টিমাইজ করা উচিত কি না তা নির্দেশ করে। ডিফল্ট: প্রোডাকশনে `true` |        |     |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | জেনারেটেড ডিকশনারি ফাইলগুলোর জন্য আউটপুট ফরম্যাট। ডিফল্ট: `['cjs', 'esm']`                                 |        |     |
| `checkTypes`   | `boolean`                | জেনারেটেড ফাইলগুলোতে Intlayer টাইপ চেক করবে কি না তা নির্দেশ করে। ডিফল্ট: `false`                          |        |     |

---

### সিস্টেম কনফিগারেশন (System Configuration)

এই সেটিংসগুলো উন্নত ব্যবহারের ক্ষেত্র এবং Intlayer-এর ইন্টারনাল কনফিগারেশনের জন্য।

| ফিল্ড                     | টাইপ     | বর্ণনা                                 | ডিফল্ট                            |
| ------------------------- | -------- | -------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | কম্পাইল করা ডিকশনারি ডিরেক্টরি।        | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | TypeScript মডিউল অগমেন্টেশন ডিরেক্টরি। | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | আনমার্জড ডিকশনারি ডিরেক্টরি।           | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | জেনারেটেড টাইপ ডিরেক্টরি।              | `'.intlayer/types'`               |
| `mainDir`                 | `string` | মেইন Intlayer ফাইল ডিরেক্টরি।          | `'.intlayer/main'`                |
| `configDir`               | `string` | কম্পাইল করা কনফিগারেশন ফাইল ডিরেক্টরি। | `'.intlayer/config'`              |
| `cacheDir`                | `string` | ক্যাশে ফাইল ডিরেক্টরি।                 | `'.intlayer/cache'`               |

---

### কম্পাইলার কনফিগারেশন (Compiler Configuration)

Intlayer কম্পাইলার (`intlayer compiler`) এর সেটিংস।

| ফিল্ড                 | টাইপ                     | বর্ণনা                                                                                    | ডিফল্ট  |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------- | ------- |
| `enabled`             | `boolean`                | কম্পাইলার সক্রিয় কি না তা নির্দেশ করে।                                                   | `false` |
| `output`              | `string &#124; Function` | এক্সট্র্যাক্টেড ডিকশনারির জন্য আউটপুট পাথ।                                                |         |
| `saveComponents`      | `boolean`                | অরিজিনাল সোর্স ফাইলগুলো ট্রান্সফরমড ভার্সন দ্বারা ওভাররাইট করা উচিত কি না তা নির্দেশ করে। | `false` |
| `noMetadata`          | `boolean`                | যদি `true` হয়, কম্পাইলার জেনারেটেড ফাইলগুলোতে মেটাডেটা অন্তর্ভুক্ত করবে না।              | `false` |
| `dictionaryKeyPrefix` | `string`                 | ঐচ্ছিক ডিকশনারি কী প্রিফিক্স।                                                             | `''`    |

---

### লগার কনফিগারেশন (Logger Configuration)

Intlayer লগ আউটপুট কাস্টমাইজ করার সেটিংস।

| ফিল্ড    | টাইপ                                           | বর্ণনা              | ডিফল্ট         |
| -------- | ---------------------------------------------- | ------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | লগিং মোড।           | `'default'`    |
| `prefix` | `string`                                       | লগ মেসেজ প্রিফিক্স। | `'[intlayer]'` |

---

### কাস্টম স্কিমা (Custom Schemas)

| ফিল্ড     | টাইপ                        | বর্ণনা                                                                             |
| --------- | --------------------------- | ---------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | আপনাকে আপনার ডিকশনারির গঠন যাচাই করার জন্য Zod স্কিমা সংজ্ঞায়িত করার অনুমতি দেয়। |

---

### প্লাগইন (Plugins)

| ফিল্ড     | টাইপ               | বর্ণনা                                       |
| --------- | ------------------ | -------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | সক্রিয় করার জন্য Intlayer প্লাগইনের তালিকা। |
