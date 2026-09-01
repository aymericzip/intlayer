---
createdAt: 2026-03-23
updatedAt: 2026-06-23
title: "Vite + Lit i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Vite + Lit ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Intlayer
  - Vite
  - Lit
  - वेब कंपोनेंट्स
  - जावास्क्रिप्ट
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.4.10
    date: 2026-03-23
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी Vite और Lit वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## विषय सूची

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`लिट-लोकलाइज़` या `i18next` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

<AccordionGroup>
<Accordion header="पूर्ण प्रकाश कवरेज">

**वेब कंपोनेंट-स्तरीय सामग्री स्कोपिंग**, **टाइपस्क्रिप्ट समर्थन**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके इंटलेयर को लिट के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

</Accordion>

<Accordion header="Bundle size">

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

</Accordion>

<Accordion header="रखरखाव">

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

</Accordion>

<Accordion header="AI Agent">

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

</Accordion>

<Accordion header="ऑटोमेशन">

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

</Accordion>

<Accordion header="Performance">

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

</Accordion>

<Accordion header="किसी भी देव के साथ स्केलिंग">

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

</Accordion>
</AccordionGroup>

---

GitHub पर [Application Template](https://github.com/aymericzip/intlayer-vite-lit-template) देखें।

## Vite और Lit एप्लिकेशन में Intlayer सेट करने के लिए चरण-दर-चरण मार्गदर्शिका

<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

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
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **lit-intlayer**
  वह पैकेज जो Intlayer को Lit अनुप्रयोगों के साथ एकीकृत करता है। यह `ReactiveController`-आधारित हुक (`useIntlayer`, `useLocale`, आदि) प्रदान करता है ताकि स्थान बदलने पर LitElement स्वचालित रूप से पुनः रेंडर हो सकें।

- **vite-intlayer**
  इसमें [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ Intlayer को एकीकृत करने के लिए Vite प्लगइन शामिल है, साथ ही उपयोगकर्ता के पसंदीदा स्थान का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल है।

</Step>

<Step number={2} title="अपने प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपके अन्य स्थान (locales)
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग अक्षम कर सकते हैं, और बहुत कुछ कर सकते हैं। उपलब्ध मापदंडों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने Vite कॉन्फ़िगरेशन में Intlayer एकीकृत करें">

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
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

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer वातावरण चर परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम (aliases) प्रदान करता है।

</Step>

<Step number={4} title="अपने प्रवेश बिंदु (Entry Point) में Intlayer बूटस्ट्रैप करें">

किसी भी कस्टम घटकों के पंजीकृत होने से **पहले** `installIntlayer()` को कॉल करें ताकि पहला घटक कनेक्ट होने पर वैश्विक स्थान सिंगलटन तैयार हो।

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// किसी भी LitElement के DOM से जुड़ने से पहले कॉल किया जाना चाहिए।
installIntlayer();

// अपने कस्टम कंपोनेंट्स को इम्पोर्ट और रजिस्टर करें।
import "./my-element.js";
```

यदि आप `md()` सामग्री घोषणाओं (Markdown) का भी उपयोग करते हैं, तो मार्कडाउन रेंडरर भी स्थापित करें:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="अपनी सामग्री घोषित करें">

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
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
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएं आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाती हों।
>
> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>

<Step number={6} title="अपने LitElement में Intlayer का उपयोग करें">

`LitElement` के अंदर `useIntlayer` का उपयोग करें। यह एक `ReactiveController` प्रॉक्सी देता है जो सक्रिय स्थान बदलने पर स्वचालित रूप से पुनः रेंडरिंग ट्रिगर करता है - किसी अतिरिक्त सेटअप की आवश्यकता नहीं है।

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer खुद को ReactiveController के रूप में पंजीकृत करता है।
  // स्थान बदलने पर घटक स्वचालित रूप से पुनः रेंडर होता है।
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> जब आपको नेटिव HTML एट्रिब्यूट (जैसे `alt`, `aria-label`, `title`) में अनुवादित स्ट्रिंग की आवश्यकता हो, तो लीफ नोड पर `.value` कॉल करें:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

अपनी सामग्री की भाषा बदलने के लिए, `useLocale` कंट्रोलर द्वारा प्रदान की गई `setLocale` विधि का उपयोग करें।

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="मार्कडाउन और HTML सामग्री रेंडर करें" isOptional={true}>

Intlayer `md()` और `html()` सामग्री घोषणाओं का समर्थन करता है। लिट में, संकलित आउटपुट को `unsafeHTML` निर्देश के माध्यम से कच्चे HTML के रूप में इंजेक्ट किया जाता है।

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

अपने घटक में संकलित HTML रेंडर करें:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` `IntlayerNode` पर `toString()` कॉल करता है, जो कच्चा मार्कडाउन स्ट्रिंग देता है। HTML स्ट्रिंग प्राप्त करने के लिए इसे `compileMarkdown` पर पास करें, फिर इसे लिट के `unsafeHTML` निर्देश के साथ रेंडर करें।

</Step>

<Step number={9} title="अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें" isOptional={true}>

प्रत्येक भाषा के लिए अद्वितीय रूट बनाने के लिए (SEO के लिए उपयोगी), आप Intlayer के `localeMap` / `localeFlatMap` सहायकों के साथ क्लाइंट-साइड राउटर का उपयोग कर सकते हैं, और सर्वर-साइड स्थान पहचान के लिए `intlayerProxy` Vite प्लगइन का उपयोग कर सकते हैं।

सबसे पहले, अपने Vite कॉन्फ़िगरेशन में `intlayerProxy` जोड़ें:

> ध्यान दें कि उत्पादन में `intlayerProxy` का उपयोग करने के लिए, आपको `vite-intlayer` को `devDependencies` से `dependencies` में ले जाने की आवश्यकता है।

> Intlayer v9 के बाद से, `intlayerProxy()` को सीधे `intlayer()` प्लगइन में बंडल किया गया है और `routing.enableProxy` विकल्प (`true` डिफ़ॉल्ट रूप से) के माध्यम से डिफ़ॉल्ट रूप से सक्षम किया गया है। इसे नीचे दिखाए अनुसार अलग से पंजीकृत करना अब वैकल्पिक है — यह पिछड़े संगतता के लिए और उन सेटअप के लिए रखा गया है जिन्हें प्लगइन क्रम को नियंत्रित करने की आवश्यकता है। ऑप्ट आउट करने के लिए `routing.enableProxy: false` सेट करें। [v9 रिलीज़ नोट्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/releases/v9.md) देखें।

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

</Step>

<Step number={10} title="स्थान बदलने पर URL बदलें" isOptional={true}>

स्थान बदलने पर ब्राउज़र URL अपडेट करने के लिए, स्थान स्विचर के साथ `useRewriteURL` का उपयोग करें:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // स्थान बदलने पर स्वचालित रूप से वर्तमान URL को फिर से लिखता है।
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="HTML भाषा और दिशा विशेषताओं को स्विच करें" isOptional={true}>

अभिगम्यता और SEO के लिए वर्तमान स्थान से मिलान करने के लिए `<html>` टैग के `lang` और `dir` विशेषताओं को अपडेट करें।

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- आपकी सामग्री -->`;
  }
}
```

</Step>

<Step number={12} title="अपने कंपोनेंट्स की सामग्री निकालें" isOptional={true}>

यदि आपके पास मौजूदा कोडबेस है, तो हजारों फ़ाइलों को बदलना समय लेने वाला हो सकता है।

इस प्रक्रिया को आसान बनाने के लिए, Intlayer आपके घटकों को बदलने और सामग्री निकालने के लिए एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) / [एक्सट्रैक्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) का प्रस्ताव करता है।

इसे सेट करने के लिए, आप अपनी `intlayer.config.ts` फ़ाइल में एक `compiler` अनुभाग जोड़ सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... आपके कॉन्फ़िगरेशन का शेष भाग
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
     * इंगित करता है कि क्या घटकों को बदलने के बाद सहेजा जाना चाहिए।
     * इस तरह, कंपाइलर को ऐप को बदलने के लिए केवल एक बार चलाया जा सकता है, और फिर इसे हटाया जा सकता है।
     */
    saveComponents: false,

    /**
     * शब्दकोश कुंजी उपसर्ग (Dictionary key prefix)
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

</Step>

</Steps>

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

### TypeScript कॉन्फ़िगर करें

सुनिश्चित करें कि आपके TypeScript कॉन्फ़िगरेशन में स्वतः जनित प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` और `useDefineForClassFields: false` डेकोरेटर समर्थन के लिए लिट द्वारा आवश्यक हैं।

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में प्रतिबद्ध (commit) करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```bash
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code मार्केटप्लेस से स्थापित करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटो-पूर्णता**।
- गुम अनुवादों के लिए **वास्तविक समय त्रुटि पहचान**।
- अनुवादित सामग्री का **इनलाइन पूर्वावलोकन**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **त्वरित कार्य (Quick actions)**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक विवरण के लिए, [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

### और आगे बढ़ें

और आगे बढ़ने के लिए, आप [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी बना सकते हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Vite और Lit अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

Vite का i18n पर कोई विशेष दृष्टिकोण नहीं है, इसलिए विकल्प Lit पारिस्थितिकी तंत्र वाले ही हैं:

- **`@lit/localize`**: XLIFF टेम्पलेट्स पर आधारित Lit के लिए आधिकारिक समाधान।
- **`Intlayer`**: घटक के बगल में घोषणा, Vite प्लगइन द्वारा बिल्ड समय पर संकलन, पूर्ण TypeScript प्रकार, AI अनुवाद, विज़ुअल एडिटर और CMS।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे Lit बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित समाधानों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक प्रविष्टियों से बदल देता है, और [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं, जिससे बंडल 50% तक कम हो जाता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना @lit/localize से माइग्रेट कर सकता हूँ?">

काफी हद तक हाँ। [संगतता एडेप्टर अवलोकन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) देखें।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी फ़ाइलों को पढ़ता है, उपयोगकर्ता के अनुकूल स्ट्रिंग्स निकालता है, और प्रत्येक के बगल में एक `.content` फ़ाइल लिखता है, जिससे आप कैटलॉग में मैन्युअल रूप से कॉपी करने के बजाय एक diff की समीक्षा करते हैं।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) बिल्ड समय पर यही काम करता है: प्रत्येक परिवर्तन पर कोड स्कैन करता है, शब्दकोश उत्पन्न करता है और HMR के साथ सिंक करता है।

कंपाइलर को चालू करने से पहले दो सीमाएं जानने योग्य हैं। यह स्थिर विश्लेषण द्वारा काम करता है, इसलिए जो स्ट्रिंग्स केवल रनटाइम पर मौजूद होती हैं, जैसे कि API त्रुटि कोड या CMS फ़ील्ड, वे पहुंच से बाहर रहती हैं। और इसे `className="active"` या स्थिति कोड जैसे एप्लिकेशन लॉजिक से उपयोगकर्ता के सामने आने वाले टेक्स्ट को अलग करना होगा, जिसके लिए एक बड़े कोडबेस में कुछ एनोटेशन की आवश्यकता होती है। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) आपको लूप में रखकर दोनों से बचाता है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="Lit घटक के अंदर अनुवादित सामग्री का उपयोग कैसे करें?">

`LitElement` के `render` मेथड के अंदर Intlayer बाइंडिंग के माध्यम से सामग्री पढ़ें, जैसा कि चरण 6 में दिखाया गया है। लोकेल बदलने पर पृष्ठ को पुनः लोड किए बिना घटक अपडेट हो जाता है।

</Question>

<Question title="क्या Intlayer Vite देव सर्वर और HMR के साथ काम करता है?">

हाँ। Vite प्लगइन आपकी `.content.ts` फ़ाइलों की निगरानी करता है और आपके सहेजते ही शब्दकोशों को पुनः संकलित करता है, इसलिए परिवर्तन बिना देव सर्वर को पुनः आरंभ किए तुरंत दिखाई देते हैं।

</Question>

<Question title="स्थानीयकृत रूटिंग कैसे सेट करें?">

इस गाइड के चरण स्थानीयकृत मार्गों और भाषा बदलने पर URL पुनर्लेखन को कवर करते हैं। `routing.mode` URL योजना को नियंत्रित करता है: `"prefix-no-default"` (डिफ़ॉल्ट: `/about` और `/hi/about`), `"prefix-all"`, `"no-prefix"`, या `"search-params"`। [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Question>

<Question title="अरबी या हिब्रू जैसी दाएं से बाएं लिखी जाने वाली भाषाओं का समर्थन कैसे करें?">

`getHTMLTextDir` किसी दिए गए लोकेल के लिए `ltr`, `rtl`, या `auto` लौटाता है, जिससे आप सक्रिय लोकेल से रूट तत्व पर `lang` और `dir` बाइंड कर सकते हैं और अपनी तार्किक CSS विशेषताओं को बाकी संभालने दे सकते हैं।

</Question>

<Question title="क्लाइंट-रेंडर किए गए Vite ऐप में SEO मेटाडेटा कैसे प्रबंधित करें?">

सक्रिय लोकेल से `html` तत्व पर `lang` और `dir` विशेषताएँ सेट करें, और प्रत्येक घोषित लोकेल के लिए `hreflang` विकल्प प्रकाशित करने के लिए `getMultilingualUrls` का उपयोग करें। विश्वसनीय अनुक्रमणिका की आवश्यकता वाले पृष्ठों के लिए, प्रीरेंडर या SSR पर विचार करें।

</Question>

<Question title="मैं ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं। यह कमांड आपके चुने हुए LLM का उपयोग करके आपके अपने प्रदाता और API कुंजी के साथ लापता अनुवादों को भरता है, और `--git-diff` बदली गई फ़ाइलों तक संचालन को सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

</Question>

<Question title="क्या Intlayer बहुवचन, लिंग और समृद्ध पाठ (rich text) का समर्थन करता है?">

हाँ: [बहुवचन (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/plurial.md), [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md), शर्तें, [सम्मिलन (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md), और संख्याओं, तिथियों और मुद्राओं के लिए [प्रारूपक (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md)।

</Question>

<Question title="अनुवादक कोड को छुए बिना सामग्री को कैसे संपादित कर सकते हैं?">

[विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) के माध्यम से, जो किसी को भी सीधे चलते हुए ऐप में टेक्स्ट संपादित करने देता है, या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के माध्यम से, जो सामग्री को अलग करता है ताकि कोड को फिर से तैनात किए बिना उसे अपडेट किया जा सके।

</Question>

<Question title="क्या Intlayer मुफ्त और ओपन सोर्स है?">

हाँ, Apache 2.0 लाइसेंस के तहत, व्यावसायिक उपयोग सहित। होस्टेड CMS एक वैकल्पिक सशुल्क सेवा है जिसे [स्वयं होस्ट (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

</Question>

</FAQ>
