---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "vue-i18n से Intlayer में माइग्रेट करें | अंतर्राष्ट्रीयकरण (i18n)"
description: "सीखें कि अपने Vue या Nuxt ऐप को vue-i18n से Intlayer में कैसे माइग्रेट करें — चरण दर चरण, बिना अपने मौजूदा कोड को तोड़े। शून्य-व्यवधान संक्रमण के लिए @intlayer/vue-i18n compat एडॉप्टर का उपयोग करें।"
keywords:
  - vue-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# vue-i18n से Intlayer में माइग्रेशन

## vue-i18n से Intlayer में माइग्रेट करने के लिए?

<AccordionGroup>

<Accordion header="बंडल का आकार">

बड़ी JSON फाइलों को अपने पेजों में लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। Intlayer आपके बंडल और पेज आकारों को **50% तक कम करने में मदद करता है**।

</Accordion>

<Accordion header="रखरखाव">

अपने एप्लिकेशन की सामग्री को स्कोप करना **बड़े पैमाने के एप्लिकेशन के लिए रखरखाव को सुविधाजनक बनाता है**। आप अपने पूरे सामग्री कोडबेस की समीक्षा की मानसिक बोझ के बिना एक भी फीचर फोल्डर को डुप्लिकेट या हटा सकते हैं। इसके अलावा, Intlayer **पूरी तरह से टाइप किया गया है** आपकी सामग्री की सटीकता सुनिश्चित करने के लिए।

Intlayer भी i18n पारिस्थितिकी तंत्र में **सबसे सक्रिय विकास** के साथ समाधान है — समस्याएं तेजी से ठीक की जाती हैं, नई फ्रेमवर्क एडॉप्टर नियमित रूप से आती हैं, और मुख्य API को वास्तविक दुनिया के उत्पादन प्रतिक्रिया के आधार पर निरंतर परिष्कृत किया जाता है।

</Accordion>

<Accordion header="AI एजेंट">

सामग्री को सह-स्थित करना **बड़ी भाषा मॉडल (LLM) द्वारा आवश्यक संदर्भ को कम करता है**। Intlayer साथ ही एक समूह के साथ आता है, जैसे कि **CLI** अनुपलब्ध अनुवादों के लिए परीक्षण करने के लिए, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, डेवलपर अनुभव (DX) को AI एजेंटों के लिए भी मसृण बनाने के लिए।

</Accordion>

<Accordion header="स्वचालन">

अपनी पसंद के LLM का उपयोग करके CI/CD पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें आपके AI प्रदाता की लागत पर। Intlayer साथ ही एक **compiler** प्रदान करता है सामग्री निष्कर्षण को स्वचालित करने के लिए, साथ ही एक [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) **पृष्ठभूमि में अनुवाद करने में मदद करने के लिए**।

</Accordion>

<Accordion header="कार्यक्षमता">

बड़ी JSON फाइलों को घटकों से जोड़ने से कार्यक्षमता और प्रतिक्रिया समस्याएं हो सकती हैं। Intlayer बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

</Accordion>

<Accordion header="गैर-dev के साथ स्केलिंग">

केवल एक i18n समाधान से अधिक, Intlayer एक **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)** और एक **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को प्रबंधित करने में मदद करने के लिए **वास्तविक समय में**, अनुवादक, कॉपीराइटर और अन्य टीम सदस्यों के साथ सहयोग को निर्बाध बनाता है। सामग्री स्थानीय रूप से और/या दूरस्थ रूप से संग्रहीत की जा सकती है।

</Accordion>

</AccordionGroup>

---

## माइग्रेशन रणनीति

`vue-i18n` से Intlayer में माइग्रेट करने के लिए दो पूरक रणनीतियां हैं:

1. **Compat एडॉप्टर (मौजूदा ऐप्स के लिए अनुशंसित)** — `@intlayer/vue-i18n` (Vue घटकों के लिए) स्थापित करें। यह पैकेज `vue-i18n` के **बिल्कुल समान API** को उजागर करता है लेकिन सभी अनुवाद कार्य को हूड के तहत Intlayer को सौंपता है। आप अपने मौजूदा `$t`, `useI18n()`, और `<i18n-t>` कॉल रखते हैं — एकमात्र परिवर्तन import पथ और initialization है।

2. **पूर्ण माइग्रेशन** — धीरे-धीरे `vue-i18n` API को native Intlayer hooks (`useIntlayer`) और सह-स्थित सामग्री के साथ `.content.ts` फाइलों में बदलें।

यह गाइड **रणनीति 1** को पहले कवर करता है (drop-in compat एडॉप्टर), फिर वैकल्पिक पूर्ण माइग्रेशन के माध्यम से चलता है।

---

## विषय सूची

<TOC/>

---

## त्वरित माइग्रेशन

निम्नलिखित चरण अपने मौजूदा `vue-i18n` ऐप को आपके घटकों में बिना कोड परिवर्तन के Intlayer पर चलाने के लिए आवश्यक न्यूनतम हैं।

<Steps>

<Step number={1} title="डिपेंडेंसी स्थापित करें">

Intlayer मुख्य पैकेज और compat एडॉप्टर स्थापित करें:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` फ्लैग वैकल्पिक है। अगर आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके वातावरण का पता लगाएगा और आवश्यक पैकेज स्थापित करेगा। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> आप `vue-i18n` को स्थापित रख सकते हैं — compat एडॉप्टर इसे TypeScript प्रकारों के लिए `devDependency` / `peerDependency` के रूप में उपयोग करता है।

</Step>

<Step number={2} title="Intlayer को कॉन्फ़िगर करें">

`intlayer init` कमांड एक स्टार्टर `intlayer.config.ts` बनाता है। अपने मौजूदा locales से मेल खाने के लिए इसे अपडेट करें और `syncJSON` प्लग-इन को अपनी संदेश फाइलों पर इंगित करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // अपने सभी मौजूदा locales यहां जोड़ें
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // vue-i18n प्लेसहोल्डर सिंटैक्स से मेल खाता है: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** एक locale को इसकी JSON फाइल पथ पर मैप करता है। **`location`** Intlayer को बताता है कि परिवर्तनों की निगरानी के लिए कौन सा फोल्डर देखना चाहिए। `format: 'icu'` विकल्प सुनिश्चित करता है कि placeholders को `vue-i18n` के लिए सही ढंग से पार्स किया जाता है।

</Step>

<Step number={3} title="अपने Bundler में Intlayer Plugin जोड़ें">

अपने मौजूदा bundler config को compat प्लग-इन से लपेटें। यह core Intlayer प्लग-इन को compose करता है, content watching को wire करता है, और — महत्वपूर्ण रूप से — **एक module एलिएस को injects करता है** ताकि आपके मौजूदा `import … from 'vue-i18n'` कॉल को build समय पर transparently `@intlayer/vue-i18n` पर रीडायरेक्ट किया जा सके। कोई स्रोत फाइल परिवर्तन आवश्यक नहीं है।

**Vite के लिए:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` `vite-intlayer` के `intlayer()` प्लग-इन को लपेटता है और `vue-i18n` एलिएस को जोड़ता है। `vite-intlayer` से सादे `intlayer()` प्लग-इन का उपयोग करने से dictionaries को संकलित किया जाता है लेकिन **नहीं** एलिएस को जोड़ता है — आप तब imports को `@intlayer/vue-i18n` पर manually नाम दें (चरण 4 देखें)।

**Nuxt के लिए:**

अगर आप `@nuxtjs/i18n` (Nuxt integration) का उपयोग कर रहे हैं, तो `nuxt-intlayer` स्थापित करें और इसे अपने `nuxt.config.ts` में जोड़ें:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // आप अपने modules से @nuxtjs/i18n को safely हटा सकते हैं
});
```

> **आपको अब `createI18n()` या manual provider bootstrapping की आवश्यकता नहीं है।** Intlayer सभी dictionaries को **build समय पर** compile करता है, इसलिए कोई runtime loading चरण नहीं है। एलिएस किए गए provider initialization को आपके लिए हैंडल करता है।

</Step>

</Steps>

त्वरित माइग्रेशन के लिए बस इतना ही। आपका ऐप अब Intlayer पर चलता है जबकि हर `vue-i18n` import और API को बरकरार रखता है।

> **Typed अनुवाद कुंजियां — स्वचालित।** एक बार Intlayer आपके dictionaries को compile कर देने के बाद, `useI18n` एक `namespace` option पास करने पर आपकी वास्तविक सामग्री के विरुद्ध typed होता है। कुंजियां आपके IDE में autocompleted होती हैं और invalid paths build समय पर TypeScript त्रुटियां पैदा करते हैं — कोई अतिरिक्त setup आवश्यक नहीं है।
>
> ```ts
> // 'about' एक registered dictionary key है
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
> ```

---

## पूर्ण माइग्रेशन

नीचे दिए गए चरण वैकल्पिक हैं और वृद्धिशील रूप से किए जा सकते हैं। वे पूर्ण Intlayer फीचर सेट को अनलॉक करते हैं: visual editor, CMS, typed content फाइलें, AI-powered अनुवाद, और बहुत कुछ।

<Steps>

<Step number={4} title="स्पष्ट import नाम देना (वैकल्पिक)" isOptional={true}>

Intlayer प्लग-इन पहले से ही bundler स्तर पर aliasing को हैंडल करते हैं। अगर आप अपनी स्रोत फाइलों में निर्भरता को स्पष्ट बनाना पसंद करते हैं, तो आप imports को manually नाम दे सकते हैं:

| पहले                                    | बाद में                                           |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

ये **drop-in replacements** हैं — कॉल signature, arguments, या return प्रकार में कोई परिवर्तन आवश्यक नहीं है।

</Step>

<Step number={5} title="AI-Powered अनुवाद ऑटोमेशन को सक्षम करें" isOptional={true}>

एक बार Intlayer वायर्ड होने के बाद, अनुपलब्ध अनुवादों को स्वचालित रूप से भरने के लिए इसके CLI का उपयोग करें:

```bash packageManager="npm"
# अनुपलब्ध अनुवादों के लिए परीक्षण (CI में जोड़ें)
npx intlayer test

# AI के साथ अनुपलब्ध अनुवाद भरें
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

`intlayer.config.ts` में AI कॉन्फ़िगरेशन जोड़ें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // default
    // model: "gpt-4o-mini",   // default
  },
};

export default config;
```

> सभी उपलब्ध विकल्पों के लिए [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।

</Step>

</Steps>

---

## माइग्रेशन के बाद आप क्या हटा सकते हैं

एक बार compat एडॉप्टर मौजूद होने के बाद, निम्नलिखित `vue-i18n` boilerplate को हटाया जा सकता है:

| फाइल / पैटर्न                             | यह अब आवश्यक क्यों नहीं है                                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `createI18n()` कॉल                        | Intlayer का provider हर चीज को स्वचालित रूप से आरंभ करता है; कोई runtime loading चरण नहीं है।                                                                            |
| Vue plugin registration (`app.use(i18n)`) | Intlayer प्लग-इन हूड के तहत injection और bootstrapping को हैंडल करता है।                                                                                                 |
| JSON language bundles (`locales/*.json`)  | JSON bundles केवल तभी आवश्यक हैं जब आप अभी भी `syncJSON` प्लग-इन का उपयोग करते हैं। एक बार `.content.ts` फाइलों में माइग्रेट करने के बाद आप JSON फोल्डर को हटा सकते हैं। |

जब आप आगे बढ़ने के लिए तैयार हों, Intlayer **स्वचालित रूप से आपके कोडबेस में कहीं भी सभी `.content.ts` और `.content.json` फाइलों को खोजता है** (डिफ़ॉल्ट रूप से, `./src` के अंदर कहीं भी)। आप एक `my-component.content.ts` फाइल को अपने `MyComponent.vue` के बगल में रख सकते हैं और Intlayer इसे बिल्ड समय पर किसी अतिरिक्त कॉन्फ़िगरेशन के बिना उठाएगा — कोई imports, कोई पंजीकरण, कोई केंद्रीकृत index फाइल आवश्यक नहीं है। यह अनुवाद को पेजों और घटकों के साथ सह-स्थित करना पूरी तरह से घर्षण रहित बनाता है।

---

## TypeScript को कॉन्फ़िगर करें

Intlayer module augmentation का उपयोग करता है आपके अनुवाद कुंजियों के लिए पूर्ण TypeScript intellisense प्रदान करने के लिए। सुनिश्चित करें कि आपका `tsconfig.json` auto-generated प्रकारों को शामिल करता है:

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // auto-generated प्रकारों को शामिल करें
  ],
}
```

---

## Git कॉन्फ़िगरेशन

Intlayer के generated directory को अपने `.gitignore` में जोड़ें:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा करें
.intlayer
```

---

## आगे बढ़ें

- **Visual Editor** — अपने ब्राउज़र में translations को visually प्रबंधित करें: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
- **CMS** — सामग्री को बाहरी रूप से प्रबंधित करें: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)
- **VS Code Extension** — autocompletion और real-time अनुवाद त्रुटि पहचान प्राप्त करें: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)
- **CLI Reference** — CLI commands की पूर्ण सूची: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
- **Intlayer with Vue** — Vue के लिए full setup guide: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+vue.md)
- **Intlayer with Nuxt** — Nuxt के लिए full setup guide: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nuxt.md)
