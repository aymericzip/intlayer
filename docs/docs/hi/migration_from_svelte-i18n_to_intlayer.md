---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "svelte-i18n से Intlayer पर माइग्रेट करें"
description: "Svelte या SvelteKit ऐप को चरण-दर-चरण svelte-i18n से Intlayer पर माइग्रेट करें। compat adapter @intlayer/svelte-i18n के साथ $_, $date और $number stores काम करते रहते हैं।"
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# svelte-i18n से Intlayer पर माइग्रेट करें

## svelte-i18n से Intlayer पर क्यों जाएँ?

<AccordionGroup>
<Accordion header="Bundle साइज़">

svelte-i18n स्टार्टअप पर पूरी locale फ़ाइलें रजिस्टर करता है। Intlayer हर पेज को सिर्फ़ वही डिक्शनरी भेजता है जो वह इस्तेमाल करता है, जिससे **आपके bundle और पेज का साइज़ 50% तक कम** होता है।

</Accordion>
<Accordion header="मेंटेनेबिलिटी">

Keys आपकी डिक्शनरी के हिसाब से **टाइप्ड** होती हैं: अमान्य keys build के समय फ़ेल होती हैं। कंटेंट को उसे इस्तेमाल करने वाले कॉम्पोनेंट्स के पास रखा जा सकता है।

</Accordion>
<Accordion header="AI एजेंट">

कॉम्पोनेंट्स के पास रखा कंटेंट LLMs के लिए **ज़रूरी कॉन्टेक्स्ट कम करता है**। Intlayer में छूटे हुए ट्रांसलेशन जाँचने के लिए **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**, **[MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)** और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)** शामिल हैं।

</Accordion>
<Accordion header="ऑटोमेशन">

अपनी पसंद के LLM से CI/CD पाइपलाइन में छूटे हुए मैसेज ट्रांसलेट करें, या [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के साथ बैकग्राउंड में।

</Accordion>
<Accordion header="नॉन-डेवलपर्स के साथ स्केल करना">

Intlayer एक self-hosted **[विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)** और **[पूरा CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)** देता है, ताकि ट्रांसलेटर और कॉपीराइटर रियल-टाइम में कंटेंट एडिट कर सकें।

</Accordion>
</AccordionGroup>

> ये लाइब्रेरी कहाँ से आईं, यह समझने के लिए [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md) पढ़ें।

## माइग्रेशन रणनीतियाँ

1. **Compat adapter (मौजूदा ऐप्स के लिए सुझाया गया)**: `@intlayer/svelte-i18n` इंस्टॉल करें। यह `svelte-i18n` जैसा ही API (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) एक्सपोज़ करता है और मैसेज Intlayer डिक्शनरी से देता है। ICU MessageFormat पहले की तरह काम करता है।
2. **पूरा माइग्रेशन**: svelte-i18n stores को धीरे-धीरे `svelte-intlayer` के `useIntlayer` और कॉम्पोनेंट्स के पास रखी `.content.ts` फ़ाइलों से बदलें।

## विषय सूची

<TOC/>

## क्विक माइग्रेशन

<Steps>
<Step number={1} title="डिपेंडेंसी इंस्टॉल करें">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` फ़्लैग वैकल्पिक है। अगर आप AI एजेंट हैं तो `intlayer-cli init` इस्तेमाल करें।

यह कमांड आपके एनवायरनमेंट को पहचानती है और ज़रूरी packages इंस्टॉल करती है, उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> `svelte-i18n` इंस्टॉल रहने दें: यह TypeScript टाइप्स देता है।

</Step>
<Step number={2} title="Intlayer कॉन्फ़िगर करें">

`syncJSON` प्लगइन को अपनी मौजूदा मैसेज फ़ाइलों की ओर पॉइंट करें। हर namespace के लिए एक फ़ाइल (`src/locales/en/home.json`) होने पर, हर फ़ाइल एक डिक्शनरी बन जाती है:

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` डिक्शनरी `home` के `title` फ़ील्ड पर रिज़ॉल्व होता है। अगर आप हर locale के लिए एक फ़ाइल (`src/locales/en.json`) में नेस्टेड namespaces इस्तेमाल करते हैं, तो इसकी जगह `source: ({ locale }) => \`./src/locales/${locale}.json\`` इस्तेमाल करें: हर टॉप-लेवल key एक डिक्शनरी बन जाती है।

</Step>
<Step number={3} title="Vite प्लगइन जोड़ें">

`svelteI18nVitePlugin()` Intlayer build चलाता है और `svelte-i18n` को `@intlayer/svelte-i18n` पर alias करता है, सोर्स फ़ाइलों में कोई बदलाव नहीं चाहिए।

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> SvelteKit के लिए, उसी `plugins` array में `sveltekit()` के बाद `svelteI18nVitePlugin()` जोड़ें।

</Step>
<Step number={4} title="i18n सेटअप को आसान बनाएँ">

`init()` रखें, लेकिन `register()` और `addMessages()` हटा दें: मैसेज Intlayer डिक्शनरी से आते हैं।

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

आपके कॉम्पोनेंट्स बिना बदलाव के काम करते रहते हैं:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

`$locale = 'fr'` सेट करने से svelte-i18n stores और `useIntlayer` दोनों की भाषा बदल जाती है।

## पूरा माइग्रेशन

<Steps>
<Step number={5} title="imports का स्पष्ट नाम बदलना (वैकल्पिक)" isOptional={true}>

Vite प्लगइन पहले से aliasing संभालता है। डिपेंडेंसी को स्पष्ट करने के लिए:

| पहले                                          | बाद में                                                  |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="कंटेंट को .content.ts फ़ाइलों में ले जाएँ" isOptional={true}>

नए कॉम्पोनेंट्स मौजूदा svelte-i18n कॉल्स के साथ-साथ नेटिव Intlayer कंटेंट इस्तेमाल कर सकते हैं:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="AI-आधारित ट्रांसलेशन चालू करें" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
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

भरे गए ट्रांसलेशन आपकी JSON फ़ाइलों में वापस लिखे जाते हैं। AI कॉन्फ़िगरेशन के लिए [CLI डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।

</Step>
</Steps>

## माइग्रेशन के बाद आप क्या हटा सकते हैं

| फ़ाइल / पैटर्न                         | अब ज़रूरत क्यों नहीं                       |
| ----------------------------------- | ------------------------------------- |
| `register()` / `addMessages()` कॉल्स | डिक्शनरी Intlayer कंपाइल और लोड करता है। |
| रेंडर से पहले `waitLocale()`            | locale सेट होते ही मैसेज उपलब्ध होते हैं।     |

## TypeScript कॉन्फ़िगर करें

जनरेट किए गए टाइप्स को अपनी `tsconfig.json` में शामिल करें:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git कॉन्फ़िगरेशन

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [svelte-i18n compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/svelte-i18n.md)
- [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md)
- [Vite और Svelte के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+svelte.md)
- [SvelteKit के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_svelte_kit.md)
- [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
