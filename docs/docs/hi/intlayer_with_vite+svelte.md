---
createdAt: 2025-04-18
updatedAt: 2025-11-19
title: अपने Vite और Svelte ऐप का अनुवाद कैसे करें – i18n गाइड 2025
description: जानें कि अपनी Vite और Svelte वेबसाइट को बहुभाषी कैसे बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
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
history:
  - version: 5.5.11
    date: 2025-11-19
    changes: दस्तावेज़ अपडेट करें
  - version: 5.5.10
    date: 2025-06-29
    changes: इतिहास प्रारंभ करें
---

# Intlayer का उपयोग करके अपनी Vite और Svelte वेबसाइट का अनुवाद करें | अंतरराष्ट्रीयकरण (i18n)

## सामग्री तालिका

<TOC/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है, जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कि कॉम्पोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **TypeScript समर्थन सुनिश्चित करें** ऑटो-जेनरेटेड टाइप्स के साथ, जो ऑटो-कम्प्लीशन और त्रुटि पहचान में सुधार करता है।
- **उन्नत फीचर्स का लाभ उठाएं**, जैसे गतिशील लोकल डिटेक्शन और स्विचिंग।

---

## Vite और Svelte एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन का अंतरराष्ट्रीयकरण कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-vite-svelte-template) देखें।

### चरण 1: Dependencies इंस्टॉल करें

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **svelte-intlayer**
- **svelte-intlayer**  
  वह पैकेज जो Intlayer को Svelte एप्लिकेशन के साथ एकीकृत करता है। यह Svelte अंतरराष्ट्रीयकरण के लिए context providers और hooks प्रदान करता है।

- **vite-intlayer**  
  इसमें Vite प्लगइन शामिल है जो Intlayer को [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा locale का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए middleware भी शामिल है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

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

### चरण 3: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

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

### चरण 4: अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाओं को बनाएँ और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// appContent नामक सामग्री शब्दकोश घोषित करता है
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// appContent नामक सामग्री शब्दकोश घोषित करता है
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

module.exports = appContent;
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

> आपकी सामग्री घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- सामग्री को सरल सामग्री के रूप में रेंडर करें -->
<h1>{$content.title}</h1>
<!-- संपादक का उपयोग करके सामग्री को संपादन योग्य रूप में रेंडर करने के लिए -->
<h1><svelte:component this={$content.title} /></h1>
<!-- सामग्री को स्ट्रिंग के रूप में रेंडर करने के लिए -->
<div aria-label={$content.title.value}></div>
```

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

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

### (वैकल्पिक) चरण 7: मार्कडाउन रेंडर करें

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

### (वैकल्पिक) चरण 8: intlayer संपादक / CMS सेट करें

intlayer संपादक सेट करने के लिए, आपको [intlayer संपादक दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) का पालन करना होगा।

intlayer CMS सेट करने के लिए, आपको [intlayer CMS दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का पालन करना होगा।

साथ ही, अपनी Svelte एप्लिकेशन में, आपको निम्नलिखित लाइन को किसी लेआउट में या अपनी एप्लिकेशन की रूट में जोड़ना होगा:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (वैकल्पिक) चरण 7: अपनी एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

अपनी Svelte एप्लिकेशन में स्थानीयकृत रूटिंग को संभालने के लिए, आप `svelte-spa-router` का उपयोग Intlayer के `localeFlatMap` के साथ कर सकते हैं ताकि प्रत्येक लोकल के लिए रूट्स जनरेट किए जा सकें।

सबसे पहले, `svelte-spa-router` इंस्टॉल करें:

```bash packageManager="npm"
npm install svelte-spa-router
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
```

```bash packageManager="yarn"
yarn add svelte-spa-router
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
import { useIntlayer } from 'svelte-intlayer';
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

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (वैकल्पिक) चरण 8: जब locale बदलता है तो URL बदलें

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

### Git कॉन्फ़िगरेशन

यह अनुशंसा की जाती है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
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

### आगे बढ़ें

आगे बढ़ने के लिए, आप [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।
