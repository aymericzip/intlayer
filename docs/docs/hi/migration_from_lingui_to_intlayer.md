---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Lingui से Intlayer पर माइग्रेट करें"
description: "React ऐप को चरण-दर-चरण Lingui से Intlayer पर माइग्रेट करें। compat adapter @intlayer/lingui के साथ आपके Lingui मैक्रो, useLingui और <Trans> काम करते रहते हैं।"
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Lingui से Intlayer पर माइग्रेट करें

## Lingui से Intlayer पर क्यों जाएँ?

<AccordionGroup>
<Accordion header="Bundle साइज़">

Lingui हर locale के लिए एक कंपाइल्ड कैटलॉग लोड करता है जिसमें ऐप के सभी मैसेज होते हैं। Intlayer कंटेंट को डिक्शनरी के हिसाब से बाँटता है और हर पेज को सिर्फ़ वही भेजता है जो वह इस्तेमाल करता है, जिससे **आपके bundle और पेज का साइज़ 50% तक कम** होता है।

</Accordion>
<Accordion header="मेंटेनेबिलिटी">

Intlayer डिक्शनरी **पूरी तरह टाइप्ड** होती हैं और उन्हें इस्तेमाल करने वाले कॉम्पोनेंट्स के पास रखा जा सकता है। `extract` / `compile` स्टेप याद रखने की ज़रूरत नहीं: डिक्शनरी bundler प्लगइन build करता है।

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

1. **Compat adapter (मौजूदा ऐप्स के लिए सुझाया गया)**: `@intlayer/lingui` इंस्टॉल करें। यह `@lingui/core` और `@lingui/react` जैसा ही API (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) एक्सपोज़ करता है और मैसेज Intlayer डिक्शनरी से देता है। आपके मैक्रो (`` t`…` ``, `<Trans>`, `msg`, `plural`) पहले की तरह ही कंपाइल होते रहते हैं।
2. **पूरा माइग्रेशन**: Lingui कॉल्स को धीरे-धीरे `useIntlayer` और कॉम्पोनेंट्स के पास रखी `.content.ts` फ़ाइलों से बदलें।

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> `@lingui/core`, `@lingui/react` और अपना मैक्रो प्लगइन (`@lingui/babel-plugin-lingui-macro` या `@lingui/swc-plugin`) इंस्टॉल रहने दें। मैक्रो चलते रहते हैं, और Lingui packages TypeScript टाइप्स देते हैं।

</Step>
<Step number={2} title="Intlayer कॉन्फ़िगर करें">

Intlayer आपके Lingui कैटलॉग को सोर्स ऑफ़ ट्रुथ के रूप में पढ़ता है। Lingui के डिफ़ॉल्ट लेआउट (`src/locales/{locale}/messages.po`) के साथ, `syncPO` प्लगइन को उनकी ओर पॉइंट करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="JSON कैटलॉग इस्तेमाल करना">

`@lingui/format-json` के साथ, ICU फ़ॉर्मेट में `syncJSON` इस्तेमाल करें:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> स्पष्ट मैसेज id इस्तेमाल करें (`t({ id: "hero.title", message: "Welcome" })` या `<Trans id="hero.title">`)। सोर्स टेक्स्ट से बने id कैटलॉग में रिज़ॉल्व नहीं होते।

</Step>
<Step number={3} title="Lingui का Vite प्लगइन बदलें">

`@lingui/vite-plugin` की जगह `@intlayer/lingui/plugin` इस्तेमाल करें। बाइंडिंग `lingui()` ही रहती है: यह Intlayer build चलाता है और `@lingui/core` व `@lingui/react` को `@intlayer/lingui` पर alias करता है, सोर्स फ़ाइलों में कोई बदलाव नहीं चाहिए।

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> मैक्रो प्लगइन को React प्लगइन (Babel या `@lingui/swc-plugin`) में ही रखें, ताकि Intlayer के रिज़ॉल्व करने से पहले मैक्रो `i18n._()` कॉल्स में कंपाइल हो जाएँ।

</Step>
</Steps>

आपके कॉम्पोनेंट्स बिना बदलाव के काम करते रहते हैं:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

locale बदलना अब भी `i18n.activate(locale)` से होता है, जो हर `useLingui()` कंज़्यूमर को अपडेट करता है।

## पूरा माइग्रेशन

<Steps>
<Step number={4} title="रनटाइम पर कैटलॉग लोडिंग हटाएँ" isOptional={true}>

मैसेज अब build के समय कंपाइल होने वाली Intlayer डिक्शनरी से आते हैं। `i18n.load()` / `i18n.loadAndActivate()` कॉल्स सिर्फ़ fallback का काम करती हैं और डेवलपमेंट में चेतावनी दिखाती हैं। इन्हें `i18n.activate(locale)` से बदलें और `lingui compile` स्टेप हटा दें। नए मैसेज id इकट्ठा करने के लिए `lingui extract` रखें।

</Step>
<Step number={5} title="imports का स्पष्ट नाम बदलना (वैकल्पिक)" isOptional={true}>

Vite प्लगइन पहले से aliasing संभालता है। डिपेंडेंसी को स्पष्ट करने के लिए:

| पहले                                                | बाद में                                                 |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="कंटेंट को .content.ts फ़ाइलों में ले जाएँ" isOptional={true}>

नए कॉम्पोनेंट्स मौजूदा Lingui कॉल्स के साथ-साथ नेटिव Intlayer कंटेंट इस्तेमाल कर सकते हैं:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

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

भरे गए ट्रांसलेशन आपके Lingui कैटलॉग में वापस लिखे जाते हैं। AI कॉन्फ़िगरेशन के लिए [CLI डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।

</Step>
</Steps>

## माइग्रेशन के बाद आप क्या हटा सकते हैं

| फ़ाइल / पैटर्न                            | अब ज़रूरत क्यों नहीं                                    |
| -------------------------------------- | -------------------------------------------------- |
| `i18n.load()` / डायनेमिक कैटलॉग imports  | डिक्शनरी Intlayer कंपाइल और लोड करता है।              |
| `lingui compile` और कंपाइल्ड `.js` कैटलॉग | Intlayer सीधे आपके कैटलॉग से डिक्शनरी build करता है।     |
| `@lingui/vite-plugin`                  | `@intlayer/lingui/plugin` के `lingui()` से बदला गया। |

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

- [Lingui compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md)
- [sync PO प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md)
- [Vite और React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)
- [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
