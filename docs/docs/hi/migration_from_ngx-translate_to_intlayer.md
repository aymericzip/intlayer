---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "ngx-translate से Intlayer पर माइग्रेट करें"
description: "Angular ऐप को चरण-दर-चरण ngx-translate से Intlayer पर माइग्रेट करें। compat adapter @intlayer/ngx-translate के साथ translate pipe, translate directive और TranslateService काम करते रहते हैं।"
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# ngx-translate से Intlayer पर माइग्रेट करें

## ngx-translate से Intlayer पर क्यों जाएँ?

<AccordionGroup>
<Accordion header="HTTP loader की ज़रूरत नहीं">

ngx-translate रनटाइम पर `TranslateHttpLoader` के ज़रिए locale फ़ाइलें लाता है, जिससे पहला रेंडर देर से होता है। Intlayer build के समय डिक्शनरी कंपाइल करता है, इसलिए ट्रांसलेशन तुरंत उपलब्ध होते हैं।

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

1. **Compat adapter (मौजूदा ऐप्स के लिए सुझाया गया)**: `@intlayer/ngx-translate` इंस्टॉल करें। यह `@ngx-translate/core` जैसा ही API (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) एक्सपोज़ करता है और मैसेज Intlayer डिक्शनरी से देता है। आपके टेम्पलेट बिना बदलाव के रहते हैं।
2. **पूरा माइग्रेशन**: ngx-translate कॉल्स को धीरे-धीरे `angular-intlayer` के `useIntlayer` और कॉम्पोनेंट्स के पास रखी `.content.ts` फ़ाइलों से बदलें।

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
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> `@ngx-translate/core` इंस्टॉल रहने दें: यह TypeScript टाइप्स देता है। `@ngx-translate/http-loader` हटाया जा सकता है।

</Step>
<Step number={2} title="Intlayer कॉन्फ़िगर करें">

`syncJSON` प्लगइन को अपनी मौजूदा ट्रांसलेशन फ़ाइलों की ओर पॉइंट करें। हर namespace के लिए एक फ़ाइल (`src/i18n/en/home.json`) होने पर, हर फ़ाइल एक डिक्शनरी बन जाती है:

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
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate` डिक्शनरी `home` के `title` फ़ील्ड पर रिज़ॉल्व होता है। अगर आप हर locale के लिए एक फ़ाइल (`src/assets/i18n/en.json`) में नेस्टेड keys इस्तेमाल करते हैं, तो इसकी जगह `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\`` इस्तेमाल करें: हर टॉप-लेवल key एक डिक्शनरी बन जाती है।

</Step>
<Step number={3} title="esbuild प्लगइन जोड़ें">

Angular CLI `@angular-builders/custom-esbuild` के ज़रिए esbuild प्लगइन स्वीकार करता है। एक प्लगइन फ़ाइल बनाएँ:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

फिर `angular.json` में उसका रेफ़रेंस दें:

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

यह प्लगइन Intlayer build चलाता है और `@ngx-translate/core` को `@intlayer/ngx-translate` पर रिज़ॉल्व करता है, सोर्स फ़ाइलों में कोई बदलाव नहीं चाहिए।

> Vite (Analog) से build करते हैं? इसकी जगह `@intlayer/ngx-translate/plugin` का `ngxTranslateVitePlugin()` इस्तेमाल करें।

</Step>
<Step number={4} title="HTTP loader हटाएँ">

`provideTranslateService()` रखें, लेकिन `loader` विकल्प हटा दें: मैसेज Intlayer डिक्शनरी से आते हैं।

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> ट्रांसलेशन अब loader से होकर नहीं जाते, इसलिए `TranslateHttpLoader` और `@ngx-translate/http-loader` हटाए जा सकते हैं।

</Step>
</Steps>

आपके टेम्पलेट और सर्विसेज़ बिना बदलाव के काम करते रहते हैं:

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## पूरा माइग्रेशन

<Steps>
<Step number={5} title="imports का स्पष्ट नाम बदलना (वैकल्पिक)" isOptional={true}>

esbuild प्लगइन पहले से aliasing संभालता है। डिपेंडेंसी को स्पष्ट करने के लिए:

| पहले                                                             | बाद में                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="कंटेंट को .content.ts फ़ाइलों में ले जाएँ" isOptional={true}>

नए कॉम्पोनेंट्स मौजूदा ngx-translate कॉल्स के साथ-साथ नेटिव Intlayer कंटेंट इस्तेमाल कर सकते हैं। `app.config.ts` में `provideTranslateService()` के साथ `angular-intlayer` का `provideIntlayer()` रजिस्टर करें, फिर:

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
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

| फ़ाइल / पैटर्न                                              | अब ज़रूरत क्यों नहीं                       |
| -------------------------------------------------------- | ------------------------------------- |
| `TranslateHttpLoader` / कस्टम loaders                     | डिक्शनरी Intlayer कंपाइल और लोड करता है। |
| `@ngx-translate/http-loader`                             | रनटाइम पर ट्रांसलेशन फ़ाइलें नहीं लाई जातीं।  |
| `provideHttpClient()` (अगर सिर्फ़ ट्रांसलेशन के लिए इस्तेमाल हो) | वही कारण।                             |

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

- [ngx-translate compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/ngx-translate.md)
- [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md)
- [Angular के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_21.md)
- [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
