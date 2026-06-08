---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Vite + Svelte i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Vite + Svelte ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ें"
  - version: 5.5.11
    date: 2025-11-19
    changes: "दस्तावेज़ अपडेट करें"
  - version: 5.5.10
    date: 2025-06-29
    changes: "इतिहास प्रारंभ करें"
---

# Intlayer का उपयोग करके अपनी Vite और Svelte वेबसाइट का अनुवाद करें | अंतरराष्ट्रीयकरण (i18n)

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## सामग्री तालिका

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`svelte-i18n` या `i18next` जैसे मुख्य समाधानों की तुलना में, Intlayer एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

**पूर्ण विस्तृत कवरेज**

इंटलेयर को **घटक-स्तरीय सामग्री स्कोपिंग**, **प्रतिक्रियाशील अनुवाद**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके स्वेल्टे के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

**बंडल का आकार**

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

**रखरखाव**

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

**एआई एजेंट**

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[एजेंट कौशल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

**स्वचालन**

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

**प्रदर्शन**

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

**किसी भी देव के साथ स्केलिंग**

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

---

## Vite और Svelte एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन का अंतरराष्ट्रीयकरण कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-vite-svelte-template) देखें।

<Steps>

<Step number={1} title="Dependencies इंस्टॉल करें">

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
```

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **svelte-intlayer**
- **svelte-intlayer**  
  वह पैकेज जो Intlayer को Svelte एप्लिकेशन के साथ एकीकृत करता है। यह Svelte अंतरराष्ट्रीयकरण के लिए context providers और hooks प्रदान करता है।

- **vite-intlayer**  
  इसमें Vite प्लगइन शामिल है जो Intlayer को [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा locale का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए middleware भी शामिल है।

</Step>

<Step number={2} title="अपने प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक config फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, middleware पुनर्निर्देशन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उन्हें मॉनिटर करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

</Step>

<Step number={4} title="अपनी सामग्री घोषित करें">

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाओं को बनाएँ और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)।

> अधिक विवरण के लिए, [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>

<Step number={5} title="अपने कोड में Intlayer का उपयोग करें">

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- सामग्री को सरल सामग्री के रूप में रेंडर करें -->
<h1>{$content.title}</h1>
<!-- संपादक का उपयोग करके सामग्री को संपादन योग्य रूप में रेंडर करने के लिए -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- सामग्री को स्ट्रिंग के रूप में रेंडर करने के लिए -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

> यदि आपका ऐप पहले से मौजूद है, तो आप हजारों घटकों को एक सेकंड में बदलने के लिए [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) को [एक्सट्रैक्ट कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) के साथ उपयोग कर सकते हैं।

</Step>

<Step number={6} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

// लोकल जानकारी और setLocale फ़ंक्शन प्राप्त करें
const { locale, availableLocales, setLocale } = useLocale();

// लोकल परिवर्तन को संभालें
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={7} title="मार्कडाउन रेंडर करें" isOptional={true}>

Intlayer सीधे आपके Svelte एप्लिकेशन में Markdown सामग्री को रेंडर करने का समर्थन करता है। डिफ़ॉल्ट रूप से, Markdown को सादा टेक्स्ट के रूप में माना जाता है। Markdown को समृद्ध HTML में बदलने के लिए, आप `@humanspeak/svelte-markdown` या किसी अन्य markdown पार्सर को एकीकृत कर सकते हैं।

> `intlayer` पैकेज का उपयोग करके markdown सामग्री को कैसे घोषित करें, यह देखने के लिए [markdown doc](https://github.com/aymericzip/intlayer/tree/main/docs/docs/hi/dictionary/markdown.md) देखें।

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // मार्कडाउन सामग्री को एक स्ट्रिंग के रूप में रेंडर करें
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> आप अपने मार्कडाउन फ्रंट-मैटर डेटा को `content.markdownContent.metadata.xxx` प्रॉपर्टी का उपयोग करके भी एक्सेस कर सकते हैं।

</Step>

<Step number={8} title="intlayer संपादक / CMS सेट करें" isOptional={true}>

intlayer संपादक सेट करने के लिए, आपको [intlayer संपादक दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) का पालन करना होगा।

intlayer CMS सेट करने के लिए, आपको [intlayer CMS दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का पालन करना होगा।

</Step>

<Step number={7} title="अपनी एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें" isOptional={true}>

अपनी Svelte एप्लिकेशन में स्थानीयकृत रूटिंग को संभालने के लिए, आप `svelte-spa-router` का उपयोग Intlayer के `localeFlatMap` के साथ कर सकते हैं ताकि प्रत्येक लोकल के लिए रूट्स जनरेट किए जा सकें।

सबसे पहले, `svelte-spa-router` इंस्टॉल करें:

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

फिर, अपने रूट्स को परिभाषित करने के लिए एक `Router.svelte` फ़ाइल बनाएं:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

अपने `main.ts` को अपडेट करें ताकि `App` के बजाय `Router` कंपोनेंट को माउंट किया जा सके:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

अंत में, अपने `App.svelte` को अपडेट करें ताकि वह `locale` prop प्राप्त कर सके और इसे `useIntlayer` के साथ उपयोग कर सके:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from "svelte-intlayer";
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... आपके ऐप का बाकी हिस्सा ... -->
</main>
```

#### सर्वर-साइड रूटिंग कॉन्फ़िगर करें (वैकल्पिक)

साथ ही, आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intlayerProxy` का भी उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान locale को स्वचालित रूप से पहचान लेगा और उपयुक्त locale कुकी सेट करेगा। यदि कोई locale निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त locale निर्धारित करेगा। यदि कोई locale पता नहीं चलता है, तो यह डिफ़ॉल्ट locale पर पुनर्निर्देशित कर देगा।

> ध्यान दें कि उत्पादन में `intlayerProxy` का उपयोग करने के लिए, आपको `vite-intlayer` पैकेज को `devDependencies` से `dependencies` में स्विच करना होगा।

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

  plugins: [intlayerProxy(), // should be placed first
 svelte(), intlayer()],
});
```

</Step>

<Step number={8} title="जब locale बदलता है तो URL बदलें" isOptional={true}>

उपयोगकर्ताओं को भाषाएँ बदलने और URL को उसके अनुसार अपडेट करने की अनुमति देने के लिए, आप एक `LocaleSwitcher` कॉम्पोनेंट बना सकते हैं। यह कॉम्पोनेंट `intlayer` से `getLocalizedUrl` और `svelte-spa-router` से `push` का उपयोग करेगा।

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// locale जानकारी प्राप्त करें
const { locale, availableLocales } = useLocale();

// locale परिवर्तन को संभालें
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={1} title="अपने घटकों की सामग्री निकालें" isOptional={true}>

यदि आपके पास मौजूदा कोडबेस है, तो हजारों फ़ाइलों को बदलना समय लेने वाला हो सकता है।

इस प्रक्रिया को आसान बनाने के लिए, Intlayer आपके घटकों को बदलने और सामग्री निकालने के लिए एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) / [एक्सट्रैक्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) का प्रस्ताव करता है।

इसे सेट करने के लिए, आप अपनी `intlayer.config.ts` फ़ाइल में एक `compiler` अनुभाग जोड़ सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... आपका शेष कॉन्फ़िगरेशन
  compiler: {
    /**
     * इंगित करता है कि क्या कंपाइलर सक्षम होना चाहिए।
     */
    enabled: true,

    /**
     * आउटपुट फ़ाइलों का पथ परिभाषित करता है
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * इंगित करता है कि क्या घटकों को बदलने के बाद सहेजा जाना चाहिए। उस तरह से, कंपाइलर को ऐप बदलने के लिए केवल एक बार चलाया जा सकता है, और फिर इसे हटाया जा सकता है।
     */
    saveComponents: false,

    /**
     * शब्दकोश कुंजी उपसर्ग
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='निकालें कमांड'>

अपने घटकों को बदलने और सामग्री निकालने के लिए एक्सट्रैक्टर चलाएँ

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='बैबेल कंपाइलर'>

intlayerCompiler प्लगइन शामिल करने के लिए अपनी `vite.config.ts` अपडेट करें:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // कंपाइलर प्लगइन जोड़ता है
  ],
});
```

```bash packageManager="npm"
npm run build # या npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Git कॉन्फ़िगरेशन

यह अनुशंसा की जाती है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```bash
#  Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code Extension** इंस्टॉल कर सकते हैं।

[VS Code Marketplace से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकंप्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पता लगाना**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक जानकारी के लिए देखें [Intlayer VS Code Extension दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

### (वैकल्पिक) साइटमैप और robots.txt (बिल्ड-टाइम जनरेशन)

Intlayer `generateSitemap` और `getMultilingualUrls` उपलब्ध कराता है ताकि आप क्रॉलर-तैयार बहुभाषी `sitemap.xml` और `robots.txt` बनाकर `public/` में स्वचालित लिख सकें। आमतौर पर Vite से **पहले** छोटा Node स्क्रिप्ट चलाएँ (जैसे npm `predev` / `prebuild`)।

#### साइटमैप

Intlayer का साइटमैप जनरेटर आपकी लोकेल सेटिंग का सम्मान करता है और क्रॉलर के लिए मेटाडेटा जोड़ता है।

> जनरेट साइटमैप `xhtml:link` (hreflang) नेमस्पेस को सपोर्ट करता है। सपाट URL सूची के बजाय Intlayer हर पृष्ठ के सभी भाषा संस्करणों को दोतरफा जोड़ता है (जैसे `/about`, `/fr/about`, या `/about?lang=fr` - रूटिंग मोड पर निर्भर)।

#### Robots.txt

`getMultilingualUrls` का उपयोग करें ताकि `Disallow` नियम संवेदनशील पथों के सभी बहुभाषी रूपों को कवर करें।

#### 1. प्रोजेक्ट रूट में `generate-seo.mjs` जोड़ें

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

स्क्रिप्ट को `intlayer` इम्पोर्ट करने के लिए पैकेज इंस्टॉल होना चाहिए। प्रोडक्शन में `SITE_URL` सेट करें (जैसे CI में)।

> Node ESM के लिए `generate-seo.mjs` पसंद करें। `generate-seo.js` के लिए `package.json` में `"type": "module"` या अन्य ESM सेटअप करें।

#### 2. Vite से पहले स्क्रिप्ट चलाएँ

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm या yarn हो तो कमांड अनुकूलित करें। CI से भी कॉल कर सकते हैं।

### आगे बढ़ें

आगे बढ़ने के लिए, आप [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।
