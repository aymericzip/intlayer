---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "react-intl (FormatJS) से Intlayer पर माइग्रेट करें"
description: "React ऐप को चरण-दर-चरण react-intl से Intlayer पर माइग्रेट करें। compat adapter @intlayer/react-intl के साथ useIntl, FormattedMessage और सभी Formatted* कॉम्पोनेंट्स काम करते रहते हैं।"
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# react-intl (FormatJS) से Intlayer पर माइग्रेट करें

## react-intl से Intlayer पर क्यों जाएँ?

<AccordionGroup>
<Accordion header="Bundle साइज़">

react-intl में locale के सभी मैसेज `IntlProvider` को दिए जाते हैं, इसलिए हर पेज पूरा कैटलॉग साथ ले जाता है। Intlayer हर पेज को सिर्फ़ वही डिक्शनरी भेजता है जो वह इस्तेमाल करता है, जिससे **आपके bundle और पेज का साइज़ 50% तक कम** होता है।

</Accordion>
<Accordion header="मेंटेनेबिलिटी">

मैसेज id आपकी डिक्शनरी के हिसाब से **टाइप्ड** होते हैं: अमान्य id build के समय फ़ेल होते हैं। कंटेंट को उसे इस्तेमाल करने वाले कॉम्पोनेंट्स के पास रखा जा सकता है।

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

1. **Compat adapter (मौजूदा ऐप्स के लिए सुझाया गया)**: `@intlayer/react-intl` इंस्टॉल करें। यह `react-intl` जैसा ही API (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) एक्सपोज़ करता है और मैसेज Intlayer डिक्शनरी से देता है। ICU MessageFormat, plurals, selects और rich text टैग पहले की तरह काम करते हैं।
2. **पूरा माइग्रेशन**: react-intl कॉल्स को धीरे-धीरे `useIntlayer` और कॉम्पोनेंट्स के पास रखी `.content.ts` फ़ाइलों से बदलें।

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> `react-intl` इंस्टॉल रहने दें: यह TypeScript टाइप्स देता है।

</Step>
<Step number={2} title="Intlayer कॉन्फ़िगर करें">

`syncJSON` प्लगइन को अपनी मौजूदा मैसेज फ़ाइलों की ओर पॉइंट करें। react-intl कैटलॉग डॉट वाले id के फ़्लैट maps होते हैं:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> हर id का पहला सेगमेंट (`home`) एक Intlayer डिक्शनरी बन जाता है, इसलिए हर पेज सिर्फ़ वही डिक्शनरी लोड करता है जो वह इस्तेमाल करता है। जब Intlayer ट्रांसलेशन वापस लिखता है, तो फ़ाइल अपना फ़्लैट रूप बनाए रखती है।

</Step>
<Step number={3} title="Vite प्लगइन जोड़ें">

`reactIntlVitePlugin()` Intlayer build चलाता है और `react-intl` को `@intlayer/react-intl` पर alias करता है, सोर्स फ़ाइलों में कोई बदलाव नहीं चाहिए।

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> कोई दूसरा bundler इस्तेमाल कर रहे हैं? imports का नाम `@intlayer/react-intl` करें (चरण 5 देखें) और अपने bundler के लिए Intlayer प्लगइन इस्तेमाल करें, उदाहरण के लिए Next.js के लिए `next-intlayer` का `withIntlayer`।

</Step>
<Step number={4} title="IntlProvider को मैसेज देना बंद करें">

`IntlProvider` काम करता रहता है, लेकिन मैसेज अब Intlayer लोड करता है। `messages` prop और कैटलॉग import हटा दें:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> अगर `messages` अब भी दिया जाता है, तो उसे अनदेखा किया जाता है और डेवलपमेंट में चेतावनी दिखती है।

</Step>
</Steps>

आपके कॉम्पोनेंट्स टाइप्ड id के साथ बिना बदलाव के काम करते रहते हैं:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## पूरा माइग्रेशन

<Steps>
<Step number={5} title="imports का स्पष्ट नाम बदलना (वैकल्पिक)" isOptional={true}>

Vite प्लगइन पहले से aliasing संभालता है। डिपेंडेंसी को स्पष्ट करने के लिए:

| पहले                                             | बाद में                                                     |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="कंटेंट को .content.ts फ़ाइलों में ले जाएँ" isOptional={true}>

नए कॉम्पोनेंट्स मौजूदा react-intl कॉल्स के साथ-साथ नेटिव Intlayer कंटेंट इस्तेमाल कर सकते हैं:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
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

| फ़ाइल / पैटर्न                        | अब ज़रूरत क्यों नहीं                                          |
| ---------------------------------- | -------------------------------------------------------- |
| `messages` prop और कैटलॉग लोडिंग     | डिक्शनरी Intlayer कंपाइल और लोड करता है।                    |
| `formatjs compile` स्टेप             | Intlayer ICU मैसेज सीधे JSON फ़ाइलों से पार्स करता है।           |
| `babel-plugin-formatjs` से id जनरेशन | स्पष्ट डॉट वाले id इस्तेमाल करें ताकि हर id एक डिक्शनरी से मैप हो। |

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

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/react-intl.md)
- [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md)
- [Vite और React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)
- [react-i18next से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_react-i18next_to_intlayer.md)
- [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
