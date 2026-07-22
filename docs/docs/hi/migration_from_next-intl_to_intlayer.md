---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "next-intl से Intlayer में माइग्रेट करें | अंतर्राष्ट्रीयकरण (i18n)"
description: "सीखें कि अपने Next.js ऐप को next-intl से Intlayer में कैसे माइग्रेट करें — चरण दर चरण, बिना अपने मौजूदा कोड को तोड़े। शून्य-व्यवधान संक्रमण के लिए @intlayer/next-intl compat एडॉप्टर का उपयोग करें।"
keywords:
  - next-intl
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# next-intl से Intlayer में माइग्रेशन

## next-intl से Intlayer में माइग्रेट करने के लिए?

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

मौजूदा ऐप्स के लिए अनुशंसित दृष्टिकोण **compat एडॉप्टर** है: `@intlayer/next-intl` स्थापित करें, जो `next-intl` के **बिल्कुल समान API** को उजागर करता है लेकिन सभी अनुवाद कार्य को हूड के तहत Intlayer को सौंपता है।

आप अपने मौजूदा `useTranslations`, `getTranslations`, `NextIntlClientProvider` और दोस्त रखते हैं — **एकमात्र परिवर्तन import पथ है**। कॉल signature, prop shapes, या component structure के कोई refactoring आवश्यक नहीं है।

समय के साथ आप optionally individual फाइलों को Intlayer के रicher `.content.ts` format में माइग्रेट कर सकते हैं visual editor, CMS, और per-component content scoping को अनलॉक करने के लिए — लेकिन वह चरण पूरी तरह से वैकल्पिक है और वृद्धिशील रूप से किया जा सकता है।

---

## विषय सूची

<TOC/>

---

## त्वरित माइग्रेशन

निम्नलिखित चरण अपने मौजूदा `next-intl` ऐप को बिना कोड परिवर्तन के Intlayer पर चलाने के लिए आवश्यक न्यूनतम हैं।

<Steps>

<Step number={1} title="डिपेंडेंसी स्थापित करें">

Intlayer मुख्य पैकेज और `@intlayer/next-intl` compat एडॉप्टर स्थापित करें:

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
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> `next-intl` को स्थापित रखें — यह अभी भी **URL routing** के लिए आवश्यक है (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`)। compat एडॉप्टर routing परत को **नहीं** replace करता।

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
      // 'icu' next-intl के ICU प्लेसहोल्डर सिंटैक्स से मेल खाता है: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** एक locale को इसकी JSON फाइल पथ पर मैप करता है। **`location`** Intlayer को बताता है कि परिवर्तनों की निगरानी के लिए कौन सा फोल्डर देखना चाहिए। `format: 'icu'` विकल्प सुनिश्चित करता है कि ICU placeholders जैसे `{name}` और `{count, plural, one {# item} other {# items}}` को सही ढंग से पार्स किया जाता है।

> configuration विकल्पों की पूरी सूची के लिए, [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="Next.js में Intlayer Plugin जोड़ें">

अपने मौजूदा Next.js config को `@intlayer/next-intl/plugin` से `createNextIntlPlugin` से लपेटें। यह wrapper `withIntlayer` को compose करता है **और** आपके लिए `next-intl` → `@intlayer/next-intl` एलिएस को register करता है:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {/* आपके मौजूदा config विकल्प */};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` `withIntlayer` को लपेटता है, स्वचालित रूप से **Webpack** या **Turbopack** को detect करता है, content watching, dictionary compilation को wire करता है, और — महत्वपूर्ण रूप से — **module एलिएस को injects करता है** ताकि आपके मौजूदा `import … from 'next-intl'` कॉल को build समय पर transparently `@intlayer/next-intl` पर रीडायरेक्ट किया जा सके। routing entry `next-intl/routing` को असली package की ओर इंगित रहता है। कोई स्रोत फाइल परिवर्तन आवश्यक नहीं है।
>
> `next-intlayer/server` से सादे `withIntlayer` को प्राथमिकता देते हैं? यह आपके dictionaries को compile करेगा, लेकिन यह **नहीं** `next-intl` एलिएस को जोड़ता है — आप तब imports को `@intlayer/next-intl` पर manually नाम दें (चरण 4 देखें)।

> **आपको अब `getRequestConfig` या `loadMessages` की आवश्यकता नहीं है।** `next-intl` के साथ, आपको एक `src/i18n.ts` फाइल लिखनी थी जो `getRequestConfig` के माध्यम से हर request पर JSON message bundles को load करती थी। Intlayer सभी dictionaries को **build समय पर** compile करता है, इसलिए कोई runtime loading चरण नहीं है। आप उस फाइल को पूरी तरह से delete कर सकते हैं (या यदि आप अभी भी `createNavigation` routing parts का उपयोग करते हैं तो केवल वह भाग रखें)।

</Step>

</Steps>

त्वरित माइग्रेशन के लिए बस इतना ही। आपका ऐप अब Intlayer पर चलता है जबकि हर `next-intl` import और API को बरकरार रखता है।

> **Typed अनुवाद कुंजियां — स्वचालित।** एक बार Intlayer आपके dictionaries को compile कर देने के बाद, `useTranslations` और `getTranslations` आपकी वास्तविक सामग्री के विरुद्ध typed होते हैं। कुंजियां आपके IDE में autocompleted होती हैं और invalid paths build समय पर TypeScript त्रुटियां पैदा करते हैं — कोई अतिरिक्त setup आवश्यक नहीं है।
>
> ```tsx
> // Client component — 'about' एक registered dictionary key है
> const t = useTranslations("about");
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
>
> // Server component
> const t = await getTranslations("about");
> t("counter.label"); // ✓ typed
> ```

---

## पूर्ण माइग्रेशन

नीचे दिए गए चरण वैकल्पिक हैं और वृद्धिशील रूप से किए जा सकते हैं। वे पूर्ण Intlayer फीचर सेट को अनलॉक करते हैं: visual editor, CMS, typed content फाइलें, AI-powered अनुवाद, और बहुत कुछ।

<Steps>

<Step number={4} title="स्पष्ट import नाम देना (वैकल्पिक)" isOptional={true}>

`createNextIntlPlugin()` wrapper पहले से ही bundler स्तर पर `next-intl` → `@intlayer/next-intl` aliasing को हैंडल करता है। अगर आप अपनी स्रोत फाइलों में निर्भरता को स्पष्ट बनाना पसंद करते हैं (और सादे `withIntlayer` प्लग-इन का उपयोग करते हैं), तो आप imports को manually नाम दे सकते हैं:

| पहले                                                 | बाद में                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> हमेशा असली `next-intl` से routing imports को रखें — compat एडॉप्टर **नहीं** URL routing परत को replace करता है:
>
> ```ts
> // ✅ हमेशा इन्हें असली 'next-intl' से रखें
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> वैकल्पिक रूप से, आप `@intlayer/next-intl/routing` से `defineRouting` का उपयोग कर सकते हैं जो अपने `intlayer.config.ts` से locale config को स्वचालित रूप से merge करता है।

</Step>

<Step number={5} title="AI-Powered अनुवाद ऑटोमेशन को सक्षम करें" isOptional={true}>

एक बार Intlayer वायर्ड होने के बाद, आप अपनी पसंद के LLM का उपयोग करके अनुपलब्ध अनुवादों को स्वचालित रूप से भरने के लिए इसके CLI का उपयोग कर सकते हैं:

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

अपनी `.env` फाइल में `OPENAI_API_KEY` (या अपने पसंद के प्रदाता की key) जोड़ें, फिर अपने `intlayer.config.ts` को extend करें:

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
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

एक बार `@intlayer/next-intl` मौजूद होने के बाद, निम्नलिखित `next-intl` boilerplate को हटाया जा सकता है:

| फाइल / पैटर्न                                     | यह अब आवश्यक क्यों नहीं है                                                                                                                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/i18n.ts` → `getRequestConfig` export         | Intlayer dictionaries को build समय पर compile करता है; कोई per-request message loading नहीं है। फाइल को केवल तभी रखें जब यह `createNavigation` routing helpers को भी export करता है। |
| `loadMessages()` / `getMessages()` call in layout | `@intlayer/next-intl` से `NextIntlClientProvider` compiled output से पढ़ता है; कोई `messages` prop की आवश्यकता नहीं है।                                                              |
| `locales/{locale}/*.json` imports in layout       | JSON bundles केवल तभी आवश्यक हैं जब आप अभी भी `syncJSON` प्लग-इन का उपयोग करते हैं। एक बार `.content.ts` फाइलों में माइग्रेट करने के बाद आप JSON फोल्डर को हटा सकते हैं।             |

जब आप आगे बढ़ने के लिए तैयार हों, Intlayer **स्वचालित रूप से आपके कोडबेस में कहीं भी सभी `.content.ts` और `.content.json` फाइलों को खोजता है** (डिफ़ॉल्ट रूप से, `./src` के अंदर कहीं भी)। आप एक `about.content.ts` फाइल को अपने `about/page.tsx` के बगल में रख सकते हैं और Intlayer इसे बिल्ड समय पर किसी अतिरिक्त कॉन्फ़िगरेशन के बिना उठाएगा — कोई imports, कोई पंजीकरण, कोई केंद्रीकृत index फाइल आवश्यक नहीं है। यह अनुवाद को पेजों और घटकों के साथ सह-स्थित करना पूरी तरह से घर्षण रहित बनाता है।

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
- **Intlayer with Next.js** — Next.js के लिए full setup guide: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)
