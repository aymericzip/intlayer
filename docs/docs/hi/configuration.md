---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: कॉन्फ़िगरेशन (Configuration)
description: अपने एप्लिकेशन के लिए Intlayer को कॉन्फ़िगर करने का तरीका जानें। अपनी आवश्यकताओं के अनुसार Intlayer को अनुकूलित करने के लिए विभिन्न सेटिंग्स और विकल्पों को समझें।
keywords:
  - कॉन्फ़िगरेशन
  - सेटिंग्स
  - अनुकूलन
  - Intlayer
  - विकल्प
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: "'compiler.output' और 'dictionary.fill' के लिए प्रति-लोकेल ऑब्जेक्ट नोटेशन जोड़ा गया"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir' को 'content' कॉन्फ़िगरेशन से 'system' कॉन्फ़िगरेशन में स्थानांतरित किया गया"
  - version: 8.2.0
    date: 2026-03-09
    changes: कंपाइलर (compiler) विकल्पों को अपडेट किया गया, 'output' और 'noMetadata' के लिए समर्थन जोड़ा गया
  - version: 8.1.7
    date: 2026-02-25
    changes: कंपाइलर विकल्पों को अपडेट किया गया
  - version: 8.1.5
    date: 2026-02-23
    changes: कंपाइलर विकल्प 'build-only' और डिक्शनरी प्रीफिक्स जोड़ा गया
  - version: 8.0.6
    date: 2026-02-12
    changes: Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face और Together.ai प्रदाताओं के लिए समर्थन जोड़ा गया
  - version: 8.0.5
    date: 2026-02-06
    changes: AI कॉन्फ़िगरेशन में `dataSerialization` जोड़ा गया
  - version: 8.0.0
    date: 2026-01-24
    changes: अंतर्निहित तंत्र का बेहतर वर्णन करने के लिए आयात मोड `live` का नाम बदलकर `fetch` कर दिया गया।
  - version: 8.0.0
    date: 2026-01-22
    changes: बिल्ड कॉन्फ़िगरेशन `importMode` को `dictionary` कॉन्फ़िगरेशन में स्थानांतरित किया गया।
  - version: 8.0.0
    date: 2026-01-22
    changes: राउटिंग कॉन्फ़िगरेशन में `rewrite` विकल्प जोड़ा गया
  - version: 8.0.0
    date: 2026-01-18
    changes: सिस्टम कॉन्फ़िगरेशन को कंटेंट कॉन्फ़िगरेशन से अलग किया गया। आंतरिक पथों को `system` प्रॉपर्टी में स्थानांतरित किया गया। कंटेंट फ़ाइलों और कोड परिवर्तन को अलग करने के लिए `codeDir` जोड़ा गया।
  - version: 8.0.0
    date: 2026-01-18
    changes: डिक्शनरी विकल्प `location` और `schema` जोड़े गए
  - version: 7.5.1
    date: 2026-01-10
    changes: JSON5 और JSONC फ़ाइल स्वरूपों के लिए समर्थन जोड़ा गया
  - version: 7.5.0
    date: 2025-12-17
    changes: `buildMode` विकल्प जोड़ा गया
  - version: 7.0.0
    date: 2025-10-25
    changes: `dictionary` कॉन्फ़िगरेशन जोड़ा गया
  - version: 7.0.0
    date: 2025-10-21
    changes: `middleware` को राउटिंग कॉन्फ़िगरेशन `routing` से बदल दिया गया
  - version: 7.0.0
    date: 2025-10-12
    changes: `formatCommand` विकल्प जोड़ा गया
  - version: 6.2.0
    date: 2025-10-12
    changes: `excludedPath` विकल्प अपडेट किया गया
  - version: 6.0.2
    date: 2025-09-23
    changes: `outputFormat` विकल्प जोड़ा गया
  - version: 6.0.0
    date: 2025-09-21
    changes: `dictionaryOutput` फ़ील्ड और `i18nextResourcesDir` फ़ील्ड हटा दिए गए
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` आयात मोड जोड़ा गया
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` फ़ील्ड को `liveSync` से बदल दिया गया, और `liveSyncPort` और `liveSyncURL` फ़ील्ड जोड़े गए
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport` को `importMode` विकल्प से बदल दिया गया
  - version: 5.6.0
    date: 2025-07-13
    changes: डिफ़ॉल्ट contentDir को `['src']` से बदलकर `['.']` कर दिया गया
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` कमांड जोड़े गए
---

# Intlayer कॉन्फ़िगरेशन दस्तावेज़

## अवलोकन

Intlayer कॉन्फ़िगरेशन फ़ाइलें आपको प्लगइन के विभिन्न पहलुओं को अनुकूलित करने की अनुमति देती हैं, जैसे कि अंतर्राष्ट्रीयकरण (internationalization), मिडलवेयर और कंटेंट हैंडलिंग। यह दस्तावेज़ कॉन्फ़िगरेशन में प्रत्येक प्रॉपर्टी का विस्तृत विवरण प्रदान करता है।

---

## विषय सूची

<TOC/>

---

## समर्थित कॉन्फ़िगरेशन फ़ाइल स्वरूप

Intlayer JSON, JS, MJS, और TS कॉन्फ़िगरेशन फ़ाइल स्वरूपों को स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## कॉन्फ़िगरेशन फ़ाइल उदाहरण

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * सभी उपलब्ध विकल्पों को प्रदर्शित करने वाला Intlayer कॉन्फ़िगरेशन फ़ाइल उदाहरण।
 */
const config: IntlayerConfig = {
  /**
   * अंतर्राष्ट्रीयकरण सेटिंग्स कॉन्फ़िगरेशन।
   */
  internationalization: {
    /**
     * एप्लिकेशन में समर्थित लोकेल (locales) की सूची।
     * डिफ़ॉल्ट: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * प्रत्येक डिक्शनरी में परिभाषित की जाने वाली अनिवार्य लोकेल की सूची।
     * यदि खाली है, तो `strict` मोड में सभी लोकेल अनिवार्य हैं।
     * डिफ़ॉल्ट: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * अंतर्राष्ट्रीयकृत कंटेंट के लिए सख्ती का स्तर।
     * - "strict": यदि कोई घोषित लोकेल अनुपस्थित है या घोषित नहीं है तो त्रुटि।
     * - "inclusive": यदि घोषित लोकेल अनुपस्थित है तो चेतावनी।
     * - "loose": किसी भी मौजूदा लोकेल को स्वीकार करता है।
     * डिफ़ॉल्ट: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * अनुरोधित लोकेल न मिलने की स्थिति में फ़ालबैक के रूप में उपयोग की जाने वाली डिफ़ॉल्ट लोकेल।
     * डिफ़ॉल्ट: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * डिक्शनरी संचालन और फ़ालबैक व्यवहार को नियंत्रित करने वाली सेटिंग्स।
   */
  dictionary: {
    /**
     * डिक्शनरी को आयात करने के तरीके को नियंत्रित करता है।
     * - "static": बिल्ड समय पर स्थिर रूप से आयातित।
     * - "dynamic": सस्पेंस का उपयोग करके गतिशील रूप से आयातित।
     * - "fetch": लाइव सिंक एपीआई के माध्यम से गतिशील रूप से प्राप्त।
     * डिफ़ॉल्ट: "static"
     */
    importMode: "static",

    /**
     * AI का उपयोग करके लुप्त अनुवादों को स्वचालित रूप से भरने की रणनीति।
     * यह एक बूलियन मान या भरे हुए कंटेंट को सहेजने के लिए एक पथ पैटर्न हो सकता है।
     * डिफ़ॉल्ट: true
     */
    fill: true,

    /**
     * डिक्शनरी फ़ाइलों का भौतिक स्थान।
     * - "local": स्थानीय फ़ाइल सिस्टम में संग्रहीत।
     * - "remote": Intlayer CMS में संग्रहीत।
     * - "hybrid": स्थानीय और Intlayer CMS दोनों में संग्रहीत।
     * - "plugin" (या कोई भी कस्टम स्ट्रिंग): प्लगइन या कस्टम स्रोत द्वारा प्रदान किया गया।
     * डिफ़ॉल्ट: "local"
     */
    location: "local",

    /**
     * क्या कंटेंट स्वचालित रूप से रूपांतरित होना चाहिए (जैसे: Markdown से HTML)।
     * डिफ़ॉल्ट: false
     */
    contentAutoTransformation: false,
  },

  /**
   * राउटिंग और मिडलवेयर कॉन्फ़िगरेशन।
   */
  routing: {
    /**
     * लोकेल राउटिंग रणनीति।
     * - "prefix-no-default": डिफ़ॉल्ट के अलावा सभी को प्रीफ़िक्स करता है (जैसे: /dashboard, /fr/dashboard)।
     * - "prefix-all": सभी लोकेल को प्रीफ़िक्स करता है (जैसे: /en/dashboard, /fr/dashboard)।
     * - "no-prefix": URL में कोई लोकेल नहीं।
     * - "search-params": ?locale=... का उपयोग करता है
     * डिफ़ॉल्ट: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * उपयोगकर्ता द्वारा चुनी गई लोकेल को कहाँ संग्रहीत करना है।
     * विकल्प: 'cookie', 'localStorage', 'sessionStorage', 'header' या इनका संयोजन।
     * डिफ़ॉल्ट: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * एप्लिकेशन URL के लिए मूल पथ (Base path)।
     * डिफ़ॉल्ट: ""
     */
    basePath: "",

    /**
     * प्रति लोकेल विशिष्ट पथों के लिए कस्टम URL रीराइट (rewrite) नियम।
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * कंटेंट फ़ाइल ढूंढने और प्रसंस्करण से संबंधित सेटिंग्स।
   */
  content: {
    /**
     * डिक्शनरी को स्कैन करने के लिए फ़ाइल एक्सटेंशन।
     * डिफ़ॉल्ट: ['.content.ts', '.content.js', '.content.json', आदि]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * निर्देशिका जहाँ .content फ़ाइलें स्थित हैं।
     * डिफ़ॉल्ट: ["."]
     */
    contentDir: ["src"],

    /**
     * स्रोत कोड कहाँ स्थित है।
     * बिल्ड ऑप्टिमाइज़ेशन और कोड परिवर्तन के लिए उपयोग किया जाता है।
     * डिफ़ॉल्ट: ["."]
     */
    codeDir: ["src"],

    /**
     * स्कैन से बाहर रखे गए पैटर्न।
     * डिफ़ॉल्ट: ['node_modules', '.intlayer', आदि]
     */
    excludedPath: ["node_modules"],

    /**
     * क्या विकास के दौरान परिवर्तनों की निगरानी करनी चाहिए और डिक्शनरी का पुनर्निर्माण करना चाहिए।
     * डिफ़ॉल्ट: विकास परिवेश में true
     */
    watch: true,

    /**
     * नई निर्मित/अपडेट की गई .content फ़ाइलों को फ़ॉर्मैट करने के लिए उपयोग किया जाने वाला कमांड।
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * विजुअल एडिटर (Visual Editor) कॉन्फ़िगरेशन।
   */
  editor: {
    /**
     * क्या विजुअल एडिटर सक्षम है।
     * डिफ़ॉल्ट: false
     */
    enabled: true,

    /**
     * ऑरिजिन वैलिडेशन के लिए आपके एप्लिकेशन का URL।
     * डिफ़ॉल्ट: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * स्थानीय एडिटर सर्वर के लिए पोर्ट।
     * डिफ़ॉल्ट: 8000
     */
    port: 8000,

    /**
     * एडिटर के लिए सार्वजनिक URL।
     * डिफ़ॉल्ट: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL।
     * डिफ़ॉल्ट: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * बैकएंड एपीआई URL।
     * डिफ़ॉल्ट: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * क्या रीयल-टाइम कंटेंट सिंक सक्षम करना है।
     * डिफ़ॉल्ट: false
     */
    liveSync: true,
  },

  /**
   * AI-आधारित अनुवाद और निर्माण सेटिंग्स।
   */
  ai: {
    /**
     * उपयोग किए जाने वाले AI प्रदाता।
     * विकल्प: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * डिफ़ॉल्ट: 'openai'
     */
    provider: "openai",

    /**
     * उपयोग करने के लिए चयनित प्रदाता का मॉडल।
     */
    model: "gpt-4o",

    /**
     * प्रदाता एपीआई कुंजी।
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * अनुवाद बनाते समय AI को निर्देशित करने के लिए वैश्विक संदर्भ।
     */
    applicationContext: "यह एक यात्रा बुकिंग एप्लिकेशन है।",

    /**
     * AI एपीआई के लिए बेस पाथ URL।
     */
    baseURL: "http://localhost:3000",

    /**
     * डेटा सीरियलाइजेशन (Data Serialization)
     *
     * विकल्प:
     * - "json": डिफ़ॉल्ट, मजबूत; अधिक टोकन की खपत करता है।
     * - "toon": कम टोकन की खपत करता है, JSON की तरह सुसंगत नहीं हो सकता है।
     *
     * डिफ़ॉल्ट: "json"
     */
    dataSerialization: "json",
  },

  /**
   * बिल्ड और ऑप्टिमाइज़ेशन सेटिंग्स।
   */
  build: {
    /**
     * बिल्ड निष्पादन मोड।
     * - "auto": एप्लिकेशन बिल्ड के दौरान स्वचालित रूप से बिल्ड किया जाएगा।
     * - "manual": स्पष्ट बिल्ड कमांड की आवश्यकता है।
     * डिफ़ॉल्ट: "auto"
     */
    mode: "auto",

    /**
     * क्या अप्रयुक्त डिक्शनरी को हटाकर अंतिम बंडल को ऑप्टिमाइज़ करना है।
     * डिफ़ॉल्ट: प्रोडक्शन परिवेश में true
     */
    optimize: true,

    /**
     * जनरेट की गई डिक्शनरी फ़ाइलों के लिए आउटपुट स्वरूप।
     * डिफ़ॉल्ट: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * इंगित करता है कि क्या बिल्ड को टाइपस्क्रिप्ट प्रकारों (TypeScript types) की जांच करनी चाहिए।
     * डिफ़ॉल्ट: false
     */
    checkTypes: false,
  },

  /**
   * लॉगर (Logger) कॉन्फ़िगरेशन।
   */
  log: {
    /**
     * लॉगिंग स्तर।
     * - "default": मानक लॉगिंग।
     * - "verbose": गहन डिबग लॉगिंग।
     * - "disabled": लॉगिंग अक्षम करें।
     * डिफ़ॉल्ट: "default"
     */
    mode: "default",

    /**
     * सभी लॉग संदेशों के लिए प्रीफ़िक्स।
     * डिफ़ॉल्ट: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * सिस्टम कॉन्फ़िगरेशन (उन्नत उपयोग के लिए)
   */
  system: {
    /**
     * स्थानीयकृत डिक्शनरी को संग्रहीत करने के लिए निर्देशिका।
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * टाइपस्क्रिप्ट मॉड्यूल वृद्धि (module augmentation) के लिए निर्देशिका।
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * विलय नहीं की गई डिक्शनरी को संग्रहीत करने के लिए निर्देशिका।
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * डिक्शनरी प्रकारों को संग्रहीत करने के लिए निर्देशिका।
     */
    typesDir: ".intlayer/types",

    /**
     * मुख्य एप्लिकेशन फ़ाइलें जहाँ संग्रहीत हैं।
     */
    mainDir: ".intlayer/main",

    /**
     * कॉन्फ़िगरेशन फ़ाइलें जहाँ संग्रहीत हैं।
     */
    configDir: ".intlayer/config",

    /**
     * कैश फ़ाइलें जहाँ संग्रहीत हैं।
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * कंपाइलर (Compiler) कॉन्फ़िगरेशन (उन्नत उपयोग के लिए)
   */
  compiler: {
    /**
     * इंगित करता है कि क्या कंपाइलर सक्षम होना चाहिए।
     *
     * - false: कंपाइलर को अक्षम करता है।
     * - true: कंपाइलर को सक्षम करता है।
     * - "build-only": विकास के दौरान कंपाइलर को छोड़ देता है और स्टार्टअप समय को गति देता है।
     *
     * डिफ़ॉल्ट: false
     */
    enabled: true,

    /**
     * आउटपुट फ़ाइलों के लिए पथ परिभाषित करता है। `outputDir` की जगह लेता है।
     *
     * - `./` पथ घटक निर्देशिका के सापेक्ष हल किए जाते हैं।
     * - `/` पथ प्रोजेक्ट रूट (`baseDir`) के सापेक्ष हल किए जाते हैं।
     *
     * - पथ में `{{locale}}` वेरिएबल शामिल करने से प्रति भाषा अलग डिक्शनरी का निर्माण शुरू हो जाएगा।
     *
     * उदाहरण:
     * ```ts
     * {
     *   // कंपोनेंट के बगल में बहुभाषी .content.ts फ़ाइलें बनाएँ
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // टेम्प्लेट स्ट्रिंग का उपयोग करके समकक्ष
     * }
     * ```
     *
     * ```ts
     * {
     *   // प्रोजेक्ट रूट पर प्रति भाषा केंद्रीकृत JSON बनाएँ
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // टेम्प्लेट स्ट्रिंग का उपयोग करके समकक्ष
     * }
     * ```
     *
     * वेरिएबल्स की सूची:
     *   - `fileName`: फ़ाइल का नाम।
     *   - `key`: कंटेंट की (key)।
     *   - `locale`: कंटेंट लोकेल।
     *   - `extension`: फ़ाइल एक्सटेंशन।
     *   - `componentFileName`: कंपोनेंट फ़ाइल का नाम।
     *   - `componentExtension`: कंपोनेंट फ़ाइल एक्सटेंशन।
     *   - `format`: डिक्शनरी स्वरूप।
     *   - `componentFormat`: कंपोनेंट डिक्शनरी स्वरूप।
     *   - `componentDirPath`: कंपोनेंट निर्देशिका पथ।
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * इंगित करता है कि रूपांतरित होने के बाद कंपोनेंट को सहेजा जाना चाहिए या नहीं।
     * इस तरह, कंपाइलर आपके एप्लिकेशन को रूपांतरित करने के लिए केवल एक बार चल सकता है और फिर हटाया जा सकता है।
     */
    saveComponents: false,

    /**
     * केवल जनरेट की गई फ़ाइल में कंटेंट सम्मिलित करता है। i18next या ICU MessageFormat स्वरूप के प्रति भाषा JSON आउटपुट के लिए उपयोगी है।
     */
    noMetadata: false,

    /**
     * डिक्शनरी की (key) प्रीफ़िक्स
     */
    dictionaryKeyPrefix: "", // निकाले गए डिक्शनरी कीज़ में एक वैकल्पिक प्रीफ़िक्स जोड़ें
  },

  /**
   * डिक्शनरी के कंटेंट को सत्यापित करने के लिए कस्टम स्कीमा (Schemas)।
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * प्लगइन कॉन्फ़िगरेशन।
   */
  plugins: [],
};

export default config;
````

---

## कॉन्फ़िगरेशन संदर्भ (Configuration Reference)

निम्नलिखित अनुभाग Intlayer में उपलब्ध विभिन्न कॉन्फ़िगरेशन विकल्पों का वर्णन करते हैं।

---

### अंतर्राष्ट्रीयकरण कॉन्फ़िगरेशन (Internationalization Configuration)

उपलब्ध लोकेल और एप्लिकेशन के लिए डिफ़ॉल्ट लोकेल सहित अंतर्राष्ट्रीयकरण से संबंधित सेटिंग्स को परिभाषित करता है।

| फ़ील्ड            | प्रकार     | विवरण                                                                                                                      | उदाहरण               | नोट                                                                                                                                                                                                                                                                                                            |
| ----------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | एप्लिकेशन में समर्थित लोकेल की सूची। डिफ़ॉल्ट: `[Locales.ENGLISH]`                                                         | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                |
| `requiredLocales` | `string[]` | एप्लिकेशन में आवश्यक लोकेल की सूची। डिफ़ॉल्ट: `[]`                                                                         | `[]`                 | यदि खाली है, तो `strict` मोड में सभी लोकेल आवश्यक हैं। सुनिश्चित करें कि आवश्यक लोकेल `locales` फ़ील्ड में भी परिभाषित हैं।                                                                                                                                                                                    |
| `strictMode`      | `string`   | टाइपस्क्रिप्ट के उपयोग के माध्यम से अंतर्राष्ट्रीयकृत कंटेंट के मजबूत कार्यान्वयन सुनिश्चित करता है। डिफ़ॉल्ट: `inclusive` |                      | यदि `"strict"` है: `t` फ़ंक्शन के लिए प्रत्येक घोषित लोकेल को परिभाषित करना आवश्यक है — यदि कोई गायब है या घोषित नहीं है तो त्रुटि फेंकता है। यदि `"inclusive"` है: गायब लोकेल के लिए चेतावनी देता है लेकिन मौजूदा अघोषित लोकेल को स्वीकार करता है। यदि `"loose"` है: किसी भी मौजूदा लोकेल को स्वीकार करता है। |
| `defaultLocale`   | `string`   | अनुरोधित लोकेल न मिलने पर फ़ालबैक के रूप में उपयोग की जाने वाली डिफ़ॉल्ट लोकेल। डिफ़ॉल्ट: `Locales.ENGLISH`                | `'en'`               | लोकेल निर्धारित करने के लिए उपयोग किया जाता है जब URL, कुकी या हेडर में कोई निर्दिष्ट नहीं होता है।                                                                                                                                                                                                            |

---

### एडिटर कॉन्फ़िगरेशन (Editor Configuration)

सर्वर पोर्ट और गतिविधि स्थिति सहित एकीकृत एडिटर से संबंधित सेटिंग्स को परिभाषित करता है।

| फ़ील्ड                       | प्रकार                    | विवरण                                                                                                                                                                                                             | उदाहरण                                                                                | नोट                                                                                                                                                                                                                                               |
| ---------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | आपके एप्लिकेशन का URL। डिफ़ॉल्ट: `''`                                                                                                                                                                             | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | सुरक्षा कारणों से एडिटर के ऑरिजिन को प्रतिबंधित करने के लिए उपयोग किया जाता है। यदि `'*'` सेट किया गया है, तो एडिटर को किसी भी ऑरिजिन से एक्सेस किया जा सकता है।                                                                                  |
| `port`                       | `number`                  | विजुअल एडिटर सर्वर द्वारा उपयोग किया जाने वाला पोर्ट। डिफ़ॉल्ट: `8000`                                                                                                                                            |                                                                                       |                                                                                                                                                                                                                                                   |
| `editorURL`                  | `string`                  | एडिटर सर्वर URL। डिफ़ॉल्ट: `'http://localhost:8000'`                                                                                                                                                              | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | उन ऑरिजिन्स को प्रतिबंधित करने के लिए उपयोग किया जाता है जो एप्लिकेशन के साथ इंटरैक्ट कर सकते हैं। यदि `'*'` सेट किया गया है, तो किसी भी ऑरिजिन से एक्सेस योग्य है। पोर्ट बदलने पर या एडिटर किसी अन्य डोमेन पर होस्ट होने पर सेट किया जाना चाहिए। |
| `cmsURL`                     | `string`                  | Intlayer CMS URL। डिफ़ॉल्ट: `'https://intlayer.org'`                                                                                                                                                              | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                                   |
| `backendURL`                 | `string`                  | बैकएंड सर्वर URL। डिफ़ॉल्ट: `https://back.intlayer.org`                                                                                                                                                           | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                                   |
| `enabled`                    | `boolean`                 | इंगित करता है कि क्या ऐप विजुअल एडिटर के साथ इंटरैक्ट करेगा। डिफ़ॉल्ट: `true`                                                                                                                                     | `process.env.NODE_ENV !== 'production'`                                               | यदि `false` है, तो एडिटर ऐप के साथ इंटरैक्ट नहीं कर सकता है। विशिष्ट परिवेशों के लिए इसे अक्षम करने से सुरक्षा बढ़ जाती है।                                                                                                                       |
| `clientId`                   | `string &#124; undefined` | oAuth2 का उपयोग करके बैकएंड के साथ प्रमाणित करने के लिए intlayer पैकेज को सक्षम करता है। एक्सेस टोकन प्राप्त करने के लिए, [intlayer.org/project](https://app.intlayer.org/project) पर जाएँ। डिफ़ॉल्ट: `undefined` |                                                                                       | गुप्त रखें; पर्यावरण चर (environment variables) में संग्रहीत करें।                                                                                                                                                                                |
| `clientSecret`               | `string &#124; undefined` | oAuth2 का उपयोग करके बैकएंड के साथ प्रमाणित करने के लिए intlayer पैकेज को सक्षम करता है। एक्सेस टोकन प्राप्त करने के लिए, [intlayer.org/project](https://app.intlayer.org/project) पर जाएँ। डिफ़ॉल्ट: `undefined` |                                                                                       | गुप्त रखें; पर्यावरण चर में संग्रहीत करें।                                                                                                                                                                                                        |
| `dictionaryPriorityStrategy` | `string`                  | स्थानीय और रिमोट दोनों डिक्शनरी मौजूद होने पर डिक्शनरी प्राथमिकता रणनीति। डिफ़ॉल्ट: `'local_first'`                                                                                                               | `'distant_first'`                                                                     | `'distant_first'`: स्थानीय पर रिमोट को प्राथमिकता देता है। `'local_first'`: रिमोट पर स्थानीय को प्राथमिकता देता है।                                                                                                                               |
| `liveSync`                   | `boolean`                 | इंगित करता है कि CMS / विजुअल एडिटर / बैकएंड में परिवर्तन मिलने पर ऐप सर्वर को हॉट रीलोड कंटेंट करना चाहिए या नहीं। डिफ़ॉल्ट: `true`                                                                              | `true`                                                                                | जब डिक्शनरी जोड़ा/अपडेट किया जाता है, तो ऐप पेज कंटेंट को अपडेट करता है। लाइव सिंक कंटेंट को दूसरे सर्वर पर आउटसोर्स करता है, जो प्रदर्शन को थोड़ा प्रभावित कर सकता है। दोनों को एक ही मशीन पर होस्ट करने की अनुशंसा की जाती है।                  |
| `liveSyncPort`               | `number`                  | लाइव सिंक सर्वर पोर्ट। डिफ़ॉल्ट: `4000`                                                                                                                                                                           | `4000`                                                                                |                                                                                                                                                                                                                                                   |
| `liveSyncURL`                | `string`                  | लाइव सिंक सर्वर URL। डिफ़ॉल्ट: `'http://localhost:{liveSyncPort}'`                                                                                                                                                | `'https://example.com'`                                                               | डिफ़ॉल्ट रूप से localhost को इंगित करता है; इसे रिमोट लाइव सिंक सर्वर में बदला जा सकता है।                                                                                                                                                        |

### राउटिंग कॉन्फ़िगरेशन (Routing Configuration)

URL संरचना, लोकेल स्टोरेज और मिडलवेयर हैंडलिंग सहित राउटिंग व्यवहार को नियंत्रित करने वाली सेटिंग्स।

| फ़ील्ड     | प्रकार                                                                                                                                               | विवरण                                                                                                                                                                          | उदाहरण                                                                                                                                                                                                                  | नोट                                                                                                                                                                                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | लोकेल हैंडलिंग के लिए URL राउटिंग मोड। डिफ़ॉल्ट: `'prefix-no-default'`                                                                                                         | `'prefix-no-default'`: `/dashboard` (en) या `/fr/dashboard` (fr)। `'prefix-all'`: `/en/dashboard` । `'no-prefix'`: लोकेल को अन्य माध्यमों से संभाला जाता है। `'search-params'`: `/dashboard?locale=fr` का उपयोग करता है | कुकी या लोकेल स्टोरेज प्रबंधन को प्रभावित नहीं करता है।                                                                                                                                                                                                             |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | क्लाइंट पर लोकेल संग्रहीत करने के लिए कॉन्फ़िगरेशन। डिफ़ॉल्ट: `['cookie', 'header']`                                                                                           | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                                           | नीचे दी गई स्टोरेज विकल्प तालिका देखें।                                                                                                                                                                                                                             |
| `basePath` | `string`                                                                                                                                             | एप्लिकेशन URL के लिए मूल पथ (Base path)। डिफ़ॉल्ट: `''`                                                                                                                        | `'/my-app'`                                                                                                                                                                                                             | यदि एप्लिकेशन `https://example.com/my-app` पर है, तो basePath `'/my-app'` है और URL `https://example.com/my-app/en` की तरह हो जाते हैं।                                                                                                                             |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | कस्टम URL रीराइट नियम जो विशिष्ट पथों के लिए डिफ़ॉल्ट राउटिंग मोड को ओवरराइड करते हैं। गतिशील मापदंडों (dynamic parameters) `[param]` का समर्थन करता है। डिफ़ॉल्ट: `undefined` | नीचे उदाहरण देखें                                                                                                                                                                                                       | रीराइट नियम `mode` पर प्राथमिकता रखते हैं। Next.js और Vite के साथ काम करता है। `getLocalizedUrl()` स्वचालित रूप से मिलान नियमों को लागू करता है। [Custom URL Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/custom_url_rewrites.md) देखें। |

**`rewrite` उदाहरण**:

```typescript
routing: {
  mode: "prefix-no-default", // फ़ालबैक रणनीति
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

#### स्टोरेज विकल्प (Storage Options)

| मान                | विवरण                                                                         | नोट                                                                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | लोकेल को कुकीज़ में सहेजता है — क्लाइंट और सर्वर साइड दोनों से एक्सेस योग्य।  | GDPR अनुपालन के लिए, सुनिश्चित करें कि उचित उपयोगकर्ता सहमति प्राप्त की गई है। `CookiesAttributes` के माध्यम से अनुकूलन योग्य (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`)।           |
| `'localStorage'`   | बिना समाप्ति तिथि के ब्राउज़र में लोकेल सहेजता है — केवल क्लाइंट साइड।        | जब तक स्पष्ट रूप से साफ़ नहीं किया जाता, तब तक समाप्त नहीं होता है। Intlayer प्रॉक्सी इसे एक्सेस नहीं कर सकता है। `StorageAttributes` के माध्यम से अनुकूलन योग्य (`{ type: 'localStorage', name: 'custom-locale' }`)। |
| `'sessionStorage'` | पेज सत्र की अवधि के लिए लोकेल सहेजता है — केवल क्लाइंट साइड।                  | टैब/विंडो बंद होने पर साफ़ हो जाता है। Intlayer प्रॉक्सी इसे एक्सेस नहीं कर सकता है। `StorageAttributes` के माध्यम से अनुकूलन योग्य (`{ type: 'sessionStorage', name: 'custom-locale' }`)।                            |
| `'header'`         | HTTP हेडर के माध्यम से लोकेल को सहेजता या प्रसारित करता है — केवल सर्वर साइड। | एपीआई कॉल के लिए उपयोगी। क्लाइंट साइड एक्सेस नहीं कर सकता है। `StorageAttributes` के माध्यम से अनुकूलन योग्य (`{ type: 'header', name: 'custom-locale' }`)।                                                           |

#### कुकी विशेषताएँ (Cookie Attributes)

कुकी स्टोरेज का उपयोग करते समय, आप अतिरिक्त कुकी विशेषताओं को कॉन्फ़िगर कर सकते हैं:

| फ़ील्ड     | प्रकार                                | विवरण                                                  |
| ---------- | ------------------------------------- | ------------------------------------------------------ |
| `name`     | `string`                              | कुकी का नाम। डिफ़ॉल्ट: `'INTLAYER_LOCALE'`             |
| `domain`   | `string`                              | कुकी डोमेन। डिफ़ॉल्ट: `undefined`                      |
| `path`     | `string`                              | कुकी पथ। डिफ़ॉल्ट: `undefined`                         |
| `secure`   | `boolean`                             | HTTPS की आवश्यकता है। डिफ़ॉल्ट: `undefined`            |
| `httpOnly` | `boolean`                             | HTTP-only फ़्लैग। डिफ़ॉल्ट: `undefined`                |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite नीति।                                         |
| `expires`  | `Date &#124; number`                  | समाप्ति तिथि या दिनों की संख्या। डिफ़ॉल्ट: `undefined` |

#### लोकेल स्टोरेज विशेषताएँ (Locale Storage Attributes)

localStorage या sessionStorage का उपयोग करते समय:

| फ़ील्ड | प्रकार                                   | विवरण                                                  |
| ------ | ---------------------------------------- | ------------------------------------------------------ |
| `type` | `'localStorage' &#124; 'sessionStorage'` | स्टोरेज प्रकार।                                        |
| `name` | `string`                                 | स्टोरेज की (key) का नाम। डिफ़ॉल्ट: `'INTLAYER_LOCALE'` |

#### कॉन्फ़िगरेशन उदाहरण

नई v7 राउटिंग संरचना के लिए यहाँ कुछ सामान्य कॉन्फ़िगरेशन उदाहरण दिए गए हैं:

**मूल कॉन्फ़िगरेशन (डिफ़ॉल्ट)**:

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

**GDPR अनुपालन कॉन्फ़िगरेशन**:

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

**सर्च पैरामीटर्स मोड (Search Parameters Mode)**:

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

**कस्टम स्टोरेज के साथ नो प्रीफ़िक्स मोड (No Prefix Mode)**:

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

**गत्यात्मक पथों (Dynamic paths) के साथ कस्टम URL रीराइट**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // गैर-रीराइट पथों के लिए फ़ालबैक रणनीति
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

### कंटेंट कॉन्फ़िगरेशन (Content Configuration)

एप्लिकेशन के भीतर कंटेंट प्रसंस्करण से संबंधित सेटिंग्स (निर्देशिका नाम, फ़ाइल एक्सटेंशन और व्युत्पन्न कॉन्फ़िगरेशन)।

| फ़ील्ड           | प्रकार     | विवरण                                                                                                                                                                                                          | उदाहरण                              | नोट                                                                                                                                        |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `watch`          | `boolean`  | इंगित करता है कि क्या Intlayer को डिक्शनरी के पुनर्निर्माण के लिए कंटेंट घोषणा फ़ाइलों में परिवर्तनों की निगरानी करनी चाहिए। डिफ़ॉल्ट: `process.env.NODE_ENV === 'development'`                                |                                     |                                                                                                                                            |
| `fileExtensions` | `string[]` | कंटेंट घोषणा फ़ाइलों को स्कैन करने के लिए उपयोग किए जाने वाले फ़ाइल एक्सटेंशन। डिफ़ॉल्ट: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                            |
| `contentDir`     | `string[]` | कंटेंट घोषणा फ़ाइलें कहाँ स्थित हैं, उस निर्देशिका का पथ। डिफ़ॉल्ट: `['.' ]`                                                                                                                                   | `['src/content']`                   |                                                                                                                                            |
| `codeDir`        | `string[]` | आपके एप्लिकेशन की स्रोत कोड फ़ाइलें जहाँ स्थित हैं, उस निर्देशिका का पथ। डिफ़ॉल्ट: `['.' ]`                                                                                                                    | `['src']`                           | बिल्ड को ऑप्टिमाइज़ करने और यह सुनिश्चित करने के लिए उपयोग किया जाता है कि कोड परिवर्तन और हॉट रीलोड केवल आवश्यक फ़ाइलों पर लागू होते हैं। |
| `excludedPath`   | `string[]` | कंटेंट स्कैन से बाहर रखे गए पथ। डिफ़ॉल्ट: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                                            | `['src/styles']`                    |                                                                                                                                            |
| `formatCommand`  | `string`   | नई निर्मित या अपडेट की गई कंटेंट फ़ाइलों को फ़ॉर्मैट करने के लिए चलाया जाने वाला कमांड। डिफ़ॉल्ट: `undefined`                                                                                                  | `'npx prettier --write "{{file}}"'` | कंटेंट निष्कर्षण के दौरान या विजुअल एडिटर के माध्यम से उपयोग किया जाता है।                                                                 |

---

### डिक्शनरी कॉन्फ़िगरेशन (Dictionary Configuration)

सेटिंग्स जो ऑटो-फिल व्यवहार और कंटेंट जनरेशन सहित डिक्शनरी संचालन को नियंत्रित करती हैं।

इस डिक्शनरी कॉन्फ़िगरेशन के दो मुख्य उद्देश्य हैं:

1. **डिफ़ॉल्ट मान**: कंटेंट घोषणा फ़ाइलें बनाते समय डिफ़ॉल्ट मानों को परिभाषित करना।
2. **फ़ालबैक व्यवहार**: विशिष्ट फ़ील्ड परिभाषित न होने पर फ़ालबैक मान प्रदान करना, जिससे डिक्शनरी संचालन के व्यवहार को वैश्विक स्तर पर सेट किया जा सके।

कंटेंट घोषणा फ़ाइलों और कॉन्फ़िगरेशन मानों को कैसे लागू किया जाता है, इसके बारे में अधिक जानकारी के लिए, [कंटेंट फ़ाइल दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

| फ़ील्ड                      | प्रकार                                                                                          | विवरण                                                                                                                                                                             | उदाहरण                   | नोट                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | ऑटो-फिल (AI अनुवाद) आउटपुट फ़ाइलें कैसे जेनरेट की जाती हैं, इसे नियंत्रित करता है। डिफ़ॉल्ट: `true`                                                                               | नीचे उदाहरण देखें        | `true`: डिफ़ॉल्ट पथ (स्रोत वाली ही फ़ाइल)। `false`: अक्षम। स्ट्रिंग/फ़ंक्शन टेम्प्लेट प्रति लोकेल फ़ाइलें जेनरेट करते हैं। प्रति-लोकेल ऑब्जेक्ट: प्रत्येक लोकेल अपने पैटर्न पर मैप होता है; `false` उस लोकेल को छोड़ देता है। `{{locale}}` को शामिल करने से प्रति-लोकेल जनरेशन ट्रिगर होता है। डिक्शनरी स्तर पर `fill` हमेशा इस वैश्विक कॉन्फ़िगरेशन पर प्राथमिकता लेता है। |
| `description`               | `string`                                                                                        | एडिटर और CMS में डिक्शनरी के उद्देश्य को समझने में सहायता करता है। AI अनुवाद जनरेशन के लिए संदर्भ के रूप में भी उपयोग किया जाता है। डिफ़ॉल्ट: `undefined`                         | `'User profile section'` |                                                                                                                                                                                                                                                                                                                                                                             |
| `locale`                    | `LocalesValues`                                                                                 | डिक्शनरी को प्रति-लोकेल प्रारूप में बदलता है। प्रत्येक घोषित फ़ील्ड एक अनुवाद नोड बन जाता है। अनुपस्थित होने पर, डिक्शनरी को बहुभाषी माना जाता है। डिफ़ॉल्ट: `undefined`          | `'en'`                   | इसका उपयोग तब करें जब डिक्शनरी एक विशिष्ट लोकेल के लिए हो, न कि कई लोकेल के लिए अनुवाद धारण करने के बजाय।                                                                                                                                                                                                                                                                   |
| `contentAutoTransformation` | `boolean &#124; { markdown?: boolean; html?: boolean; insertion?: boolean }`                    | कंटेंट स्ट्रिंग्स को स्वचालित रूप से टाइप्ड नोड्स (markdown, HTML, या insertion) में बदलता है। डिफ़ॉल्ट: `false`                                                                  | `true`                   | Markdown: `### Title` → `md('### Title')`। HTML: `<div>Title</div>` → `html('<div>Title</div>')`। Insertion: `Hello {{name}}` → `insert('Hello {{name}}')`।                                                                                                                                                                                                                 |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; 'plugin' &#124; string`                         | इंगित करता है कि डिक्शनरी फ़ाइलें कहाँ संग्रहीत हैं और उनका CMS सिंक्रोनाइज़ेशन मोड क्या है। डिफ़ॉल्ट: `'local'`                                                                  | `'hybrid'`               | `'local'`: केवल स्थानीय रूप से प्रबंधित। `'remote'`: केवल दूरस्थ रूप से प्रबंधित (CMS)। `'hybrid'`: स्थानीय और दूरस्थ दोनों रूप से प्रबंधित। `'plugin'` या कस्टम स्ट्रिंग: किसी प्लगइन या कस्टम स्रोत द्वारा प्रबंधित।                                                                                                                                                      |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | डिक्शनरी को आयात करने के तरीके को नियंत्रित करता है। डिफ़ॉल्ट: `'static'`                                                                                                         | `'dynamic'`              | `'static'`: स्थिर रूप से आयातित। `'dynamic'`: 'Suspense' के माध्यम से गतिशील रूप से आयातित। `'fetch'`: 'Live Sync API' के माध्यम से गतिशील रूप से प्राप्त। `getIntlayer`, `getDictionary`, `useDictionary`, आदि को प्रभावित नहीं करता है।                                                                                                                                   |
| `priority`                  | `number`                                                                                        | डिक्शनरी की प्राथमिकता। डिक्शनरी के बीच टकराव हल करते समय उच्च मान निम्न मान पर प्राथमिकता लेते हैं। डिफ़ॉल्ट: `undefined`                                                        | `1`                      |                                                                                                                                                                                                                                                                                                                                                                             |
| `live`                      | `boolean`                                                                                       | अप्रचलित — इसके बजाय `importMode: 'fetch'` का उपयोग करें। इंगित करता था कि डिक्शनरी कंटेंट को live sync API के माध्यम से गतिशील रूप से प्राप्त किया गया था। डिफ़ॉल्ट: `undefined` |                          | v8.0.0 में `importMode: 'fetch'` में नाम बदला गया।                                                                                                                                                                                                                                                                                                                          |
| `schema`                    | `'https://intlayer.org/schema.json'`                                                            | JSON स्कीमा सत्यापन के लिए Intlayer द्वारा स्वत: जनरेट। डिफ़ॉल्ट: स्वत: जनरेट                                                                                                     |                          | मैन्युअल रूप से संशोधित न करें।                                                                                                                                                                                                                                                                                                                                             |
| `title`                     | `string`                                                                                        | एडिटर और CMS में डिक्शनरी की पहचान करने में सहायता करता है। डिफ़ॉल्ट: `undefined`                                                                                                 | `'User Profile'`         |                                                                                                                                                                                                                                                                                                                                                                             |
| `tags`                      | `string[]`                                                                                      | डिक्शनरी को वर्गीकृत करता है और एडिटर और AI के लिए संदर्भ या निर्देश प्रदान करता है। डिफ़ॉल्ट: `undefined`                                                                        | `['user', 'profile']`    |                                                                                                                                                                                                                                                                                                                                                                             |
| `version`                   | `string`                                                                                        | दूरस्थ डिक्शनरी का संस्करण; वर्तमान में उपयोग में आने वाले संस्करण को ट्रैक करने में मदद करता है। डिफ़ॉल्ट: `undefined`                                                           | `'1.0.0'`                | CMS पर प्रबंधनीय। स्थानीय रूप से संशोधित न करें।                                                                                                                                                                                                                                                                                                                            |

**`fill` उदाहरण**:

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

### AI कॉन्फ़िगरेशन (AI Configuration)

अनुवाद निर्माण जैसी Intlayer की AI-संचालित विशेषताओं के लिए सेटिंग्स को परिभाषित करता।

| फ़ील्ड               | प्रकार                 | विवरण                                                                  | उदाहरण                                      | नोट                                                                                       |
| -------------------- | ---------------------- | ---------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `provider`           | `string`               | उपयोग किया जाने वाला AI प्रदाता।                                       | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                           |
| `model`              | `string`               | उपयोग किया जाने वाला AI मॉडल।                                          | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                           |
| `apiKey`             | `string`               | चयनित प्रदाता के लिए एपीआई कुंजी।                                      | `process.env.OPENAI_API_KEY`                |                                                                                           |
| `applicationContext` | `string`               | AI अनुवाद सटीकता में सुधार के लिए आपके ऐप के बारे में अतिरिक्त संदर्भ। | `'बच्चों के लिए एक अध्ययन मंच।'`            |                                                                                           |
| `baseURL`            | `string`               | एपीआई कॉल के लिए वैकल्पिक बेस URL।                                     |                                             | यदि आप प्रॉक्सी या स्थानीय AI परिनियोजन (deployment) का उपयोग कर रहे हैं तो उपयोगी है।    |
| `dataSerialization`  | `'json' &#124; 'toon'` | यह परिभाषित करता है कि AI को डेटा कैसे भेजा जाए। डिफ़ॉल्ट: `'json'`    | `'json'`                                    | `'json'`: अधिक मजबूत और सटीक। `'toon'`: कम टोकन की खपत करता है लेकिन कम स्थिर हो सकता है। |

---

### बिल्ड कॉन्फ़िगरेशन (Build Configuration)

Intlayer बिल्ड प्रक्रिया और ऑप्टिमाइज़ेशन सेटिंग्स।

| फ़ील्ड         | प्रकार                   | विवरण                                                                                                                                  | उदाहरण | नोट |
| -------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------ | --- |
| `mode`         | `'auto' &#124; 'manual'` | इंगित करता है कि ऐप के प्री-बिल्ड चरणों के दौरान Intlayer को स्वचालित रूप से चलना चाहिए या नहीं। डिफ़ॉल्ट: `'auto'`                    |        |     |
| `optimize`     | `boolean`                | इंगित करता है कि संकलित (compiled) डिक्शनरी को रनटाइम के लिए ऑप्टिमाइज़ किया जाना चाहिए या नहीं। डिफ़ॉल्ट: प्रोडक्शन परिवेश में `true` |        |     |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | जनरेट की गई डिक्शनरी फ़ाइलों के लिए आउटपुट स्वरूप। डिफ़ॉल्ट: `['cjs', 'esm']`                                                          |        |     |
| `checkTypes`   | `boolean`                | इंगित करता है कि क्या Intlayer को जनरेट की गई फ़ाइलों में प्रकारों (types) की जांच करनी चाहिए। डिफ़ॉल्ट: `false`                       |        |     |

---

### सिस्टम कॉन्फ़िगरेशन (System Configuration)

ये सेटिंग्स उन्नत उपयोग के मामलों और Intlayer के आंतरिक कॉन्फ़िगरेशन के लिए हैं।

| फ़ील्ड                    | प्रकार   | विवरण                                       | डिफ़ॉल्ट                          |
| ------------------------- | -------- | ------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | संकलित डिक्शनरी निर्देशिका।                 | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | टाइपस्क्रिप्ट मॉड्यूल ऑगमेंटेशन निर्देशिका। | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | विलय नहीं की गई डिक्शनरी निर्देशिका।        | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | जनरेट की गई प्रकार निर्देशिका।              | `'.intlayer/types'`               |
| `mainDir`                 | `string` | मुख्य Intlayer फ़ाइल निर्देशिका।            | `'.intlayer/main'`                |
| `configDir`               | `string` | संकलित कॉन्फ़िगरेशन फ़ाइल निर्देशिका।       | `'.intlayer/config'`              |
| `cacheDir`                | `string` | कैश फ़ाइल निर्देशिका।                       | `'.intlayer/cache'`               |

---

### कंपाइलर कॉन्फ़िगरेशन (Compiler Configuration)

Intlayer कंपाइलर (`intlayer compiler`) के लिए सेटिंग्स।

| फ़ील्ड                | प्रकार                   | विवरण                                                                                          | डिफ़ॉल्ट |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------------- | -------- |
| `enabled`             | `boolean`                | इंगित करता है कि कंपाइलर सक्रिय है या नहीं।                                                    | `false`  |
| `output`              | `string &#124; Function` | निकाले गए डिक्शनरी के लिए आउटपुट पथ।                                                           |          |
| `saveComponents`      | `boolean`                | इंगित करता है कि क्या रूपांतरित संस्करणों के साथ मूल स्रोत फ़ाइलों को ओवरराइट किया जाना चाहिए। | `false`  |
| `noMetadata`          | `boolean`                | यदि `true` है, तो कंपाइलर जनरेट की गई फ़ाइलों में मेटाडेटा शामिल नहीं करेगा।                   | `false`  |
| `dictionaryKeyPrefix` | `string`                 | वैकल्पिक डिक्शनरी की (key) प्रीफ़िक्स।                                                         | `''`     |

---

### लॉगर कॉन्फ़िगरेशन (Logger Configuration)

Intlayer लॉग आउटपुट को अनुकूलित करने की सेटिंग्स।

| फ़ील्ड   | प्रकार                                         | विवरण                 | डिफ़ॉल्ट       |
| -------- | ---------------------------------------------- | --------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | लॉगिंग मोड।           | `'default'`    |
| `prefix` | `string`                                       | लॉग संदेश प्रीफ़िक्स। | `'[intlayer]'` |

---

### कस्टम स्कीमा (Custom Schemas)

| फ़ील्ड    | प्रकार                      | विवरण                                                                                         |
| --------- | --------------------------- | --------------------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | आपको अपनी डिक्शनरी की संरचना को मान्य करने के लिए Zod स्कीमा परिभाषित करने की अनुमति देता है। |

---

### प्लगइन्स (Plugins)

| फ़ील्ड    | प्रकार             | विवरण                                       |
| --------- | ------------------ | ------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | सक्रिय होने वाले Intlayer प्लगइन्स की सूची। |
