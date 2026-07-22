---
createdAt: 2025-11-20
updatedAt: 2026-06-23
title: "SvelteKit i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में SvelteKit ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ें"
  - version: 7.1.10
    date: 2025-11-20
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी SvelteKit वेबसाइट का अनुवाद करें | अंतरराष्ट्रीयकरण (i18n)

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## सामग्री सूची

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`svelte-i18n` या `i18next` जैसे मुख्य समाधानों की तुलना में, Intlayer एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

**पूर्ण SvelteKit कवरेज**

Intlayer को **बहुभाषी रूटिंग**, **SSR समर्थन**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके SvelteKit के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

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

## SvelteKit एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

शुरू करने के लिए, एक नया SvelteKit प्रोजेक्ट बनाएं। यहाँ अंतिम संरचना है जिसे हम बनाएंगे:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="Dependencies इंस्टॉल करें">

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

> `--interactive` ध्वज (flag) वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके एनवायरनमेंट को डिटेक्ट करेगी और आवश्यक पैकेज इंस्टॉल करेगी। उदाहरण के लिए:

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

- **intlayer**: मुख्य i18n पैकेज।
- **svelte-intlayer**: Svelte/SvelteKit के लिए context providers और stores प्रदान करता है।
- **vite-intlayer**: Vite प्लगइन जो content declarations को build प्रक्रिया के साथ एकीकृत करता है।

</Step>

<Step number={2} title="अपने प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने प्रोजेक्ट रूट में एक config फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

अपने `vite.config.ts` को अपडेट करें ताकि इसमें Intlayer प्लगइन शामिल हो। यह प्लगइन आपकी content फ़ाइलों के transpilation को संभालता है।

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // क्रम महत्वपूर्ण है, Intlayer को SvelteKit से पहले रखा जाना चाहिए
});
```

</Step>

<Step number={4} title="अपनी सामग्री घोषित करें">

अपने `src` फ़ोल्डर में कहीं भी अपनी सामग्री घोषणा फ़ाइलें बनाएं (जैसे, `src/lib/content` या अपने components के साथ)। ये फ़ाइलें आपके एप्लिकेशन के लिए अनुवाद योग्य सामग्री को परिभाषित करती हैं, प्रत्येक locale के लिए `t()` फ़ंक्शन का उपयोग करके।

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="अपने Components में Intlayer का उपयोग करें">

प्रीफिक्स का उपयोग करना होगा (जैसे, `$content.title`)।

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" वह key है जो चरण 4 में परिभाषित की गई है
  const content = useIntlayer("hero-section");
</script>

<!-- सामग्री को सरल सामग्री के रूप में रेंडर करें -->
<h1>{$content.title}</h1>
<!-- संपादक का उपयोग करके सामग्री को संपादन योग्य बनाने के लिए -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- सामग्री को स्ट्रिंग के रूप में प्रस्तुत करने के लिए -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="रूटिंग सेट करें" isOptional={true}>

निम्नलिखित चरण दिखाते हैं कि SvelteKit में locale-आधारित रूटिंग कैसे सेट करें। यह आपके URLs को locale प्रीफिक्स (जैसे, `/en/about`, `/fr/about`) शामिल करने की अनुमति देता है, जिससे SEO और उपयोगकर्ता अनुभव बेहतर होता है।

```bash
.
└─── src
    ├── app.d.ts                  # locale प्रकार को परिभाषित करें
    ├── hooks.server.ts           # locale रूटिंग प्रबंधित करें
    ├── lib
    │   └── getLocale.ts          # हेडर, कुकीज़ से locale जांचें
    ├── params
    │   └── locale.ts             # locale पैरामीटर को परिभाषित करें
    └── routes
        ├── [[locale=locale]]     # locale सेट करने के लिए route group में लपेटें
        │   ├── +layout.svelte    # रूट के लिए स्थानीय लेआउट
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # फोंट और वैश्विक शैलियों के लिए रूट लेआउट
```

</Step>

<Step number={7} title="सर्वर-साइड लोकल डिटेक्शन (हुक्स) को संभालें">

SvelteKit में, SSR के दौरान सही सामग्री प्रस्तुत करने के लिए सर्वर को उपयोगकर्ता की लोकल जानकारी जाननी होती है। हम URL या कुकीज़ से लोकल पता लगाने के लिए `hooks.server.ts` का उपयोग करते हैं।

`src/hooks.server.ts` बनाएँ या संशोधित करें:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // जांचें कि क्या वर्तमान पथ पहले से ही किसी locale से शुरू होता है (जैसे /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // यदि URL में कोई locale मौजूद नहीं है (जैसे उपयोगकर्ता "/" पर जाता है), तो उन्हें पुनः निर्देशित करें
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // अस्थायी पुनर्निर्देशन
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

फिर, अनुरोध ईवेंट से उपयोगकर्ता की locale प्राप्त करने के लिए एक हेल्पर बनाएं:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * अनुरोध ईवेंट से उपयोगकर्ता की भाषा प्राप्त करें।
 * यह फ़ंक्शन `src/hooks.server.ts` में `handle` हुक में उपयोग किया जाता है।
 *
 * यह पहले Intlayer स्टोरेज (कुकीज़ या कस्टम हेडर) से भाषा प्राप्त करने का प्रयास करता है।
 * यदि भाषा नहीं मिलती है, तो यह ब्राउज़र के "Accept-Language" नेगोशिएशन पर वापस जाता है।
 *
 * @param event - SvelteKit से अनुरोध ईवेंट
 * @returns उपयोगकर्ता की भाषा
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Intlayer स्टोरेज (कुकीज़ या हेडर) से भाषा प्राप्त करने का प्रयास करें
  const storedLocale = getLocaleFromStorage({
    // SvelteKit कुकीज़ एक्सेस
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // SvelteKit हेडर एक्सेस
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // ब्राउज़र "Accept-Language" नेगोशिएशन पर फॉलबैक
  const negotiatorHeaders: Record<string, string> = {};

  // SvelteKit Headers ऑब्जेक्ट को साधारण Record<string, string> में कन्वर्ट करें
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // `Accept-Language` हेडर से लोकल की जांच करें
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // यदि कोई मैच नहीं मिलता है तो डिफ़ॉल्ट लोकल लौटाएं
  return defaultLocale;
};
```

> `getLocaleFromStorage` आपके कॉन्फ़िगरेशन के अनुसार हेडर या कुकी से locale की जांच करेगा। अधिक जानकारी के लिए देखें [Configuration](https://intlayer.org/doc/configuration)।

> `localeDetector` फ़ंक्शन `Accept-Language` हेडर को प्रोसेस करेगा और सबसे उपयुक्त मैच लौटाएगा।

यदि locale कॉन्फ़िगर नहीं किया गया है, तो हम 404 त्रुटि लौटाना चाहते हैं। इसे आसान बनाने के लिए, हम एक `match` फ़ंक्शन बना सकते हैं जो जांचे कि locale मान्य है या नहीं:

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **नोट:** सुनिश्चित करें कि आपकी `src/app.d.ts` में locale परिभाषा शामिल है:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

`+layout.svelte` फ़ाइल के लिए, हम सब कुछ हटा सकते हैं, केवल स्थैतिक सामग्री रखने के लिए, जो i18n से संबंधित नहीं है:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

फिर, `[[locale=locale]]` समूह के अंतर्गत एक नया पेज और लेआउट बनाएं:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// सामान्य Load टाइप का उपयोग करें
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// रूट से locale के साथ Intlayer को इनिशियलाइज़ करें
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// लेआउट सामग्री शब्दकोश का उपयोग करें
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// होम कंटेंट डिक्शनरी का उपयोग करें
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="अंतरराष्ट्रीयकृत लिंक" isOptional={true}>

SEO के लिए, यह अनुशंसा की जाती है कि आप अपने routes को locale के साथ prefix करें (जैसे, `/en/about`, `/fr/about`)। यह component स्वचालित रूप से किसी भी लिंक के साथ वर्तमान locale को prefix करता है।

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // वर्तमान locale के साथ URL को prefix करने में मदद करता है
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

यदि आप SvelteKit से `goto` का उपयोग करते हैं, तो आप localized URL पर नेविगेट करने के लिए `getLocalizedUrl` के साथ वही लॉजिक उपयोग कर सकते हैं:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // स्थानीय भाषा के अनुसार /en/about या /fr/about पर नेविगेट करता है
```

</Step>

<Step number={9} title="भाषा स्विचर" isOptional={true}>

उपयोगकर्ताओं को भाषाएँ बदलने की अनुमति देने के लिए, URL को अपडेट करें।

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // स्टोर में locale सेट करेगा और onLocaleChange को ट्रिगर करेगा
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="बैकएंड प्रॉक्सी जोड़ें" isOptional={true}>

अपने SvelteKit एप्लिकेशन में बैकएंड प्रॉक्सी जोड़ने के लिए, आप `vite-intlayer` प्लगइन द्वारा प्रदान किया गया `intlayerProxy` फ़ंक्शन उपयोग कर सकते हैं। यह प्लगइन URL, कुकीज़, और ब्राउज़र भाषा प्राथमिकताओं के आधार पर उपयोगकर्ता के लिए सबसे अच्छा locale स्वचालित रूप से पहचान लेगा।

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="intlayer संपादक / CMS सेट करें" isOptional={true}>

intlayer संपादक सेट करने के लिए, आपको [intlayer संपादक दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) का पालन करना होगा।

intlayer CMS सेट करने के लिए, आपको [intlayer CMS दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का पालन करना होगा।

intlayer संपादक चयनकर्ता को विज़ुअलाइज़ करने में सक्षम होने के लिए, आपको अपने intlayer कंटेंट में component सिंटैक्स का उपयोग करना होगा।

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component"); // सामग्री को component के रूप में उपयोग करें
</script>

<div>

  <!-- सामग्री को सरल सामग्री के रूप में रेंडर करें -->
  <h1>{$content.title}</h1>

  <!-- सामग्री को एक component के रूप में रेंडर करें (संपादक के लिए आवश्यक) -->
  {@const Component = $content.component}<Component />
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
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
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

यह अनुशंसित है कि Intlayer द्वारा उत्पन्न फ़ाइलों को ignore किया जाए।

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को ignore करें
.intlayer
```

---

### आगे बढ़ें

- **विज़ुअल एडिटर**: UI से सीधे अनुवाद संपादित करने के लिए [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को एकीकृत करें।
- **CMS**: अपनी सामग्री प्रबंधन को बाहरी बनाएं [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके।
