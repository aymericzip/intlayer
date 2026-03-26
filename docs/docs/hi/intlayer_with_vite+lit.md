---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: Vite + Lit i18n - 2026 में लिट ऐप का अनुवाद कैसे करें
description: जानें कि अपनी Vite और Lit वेबसाइट को बहुभाषी कैसे बनाया जाए। इसे अंतरराष्ट्रीय बनाने (i18n) और अनुवाद करने के लिए दस्तावेज़ों का पालन करें।
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
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Intlayer का उपयोग करके अपनी Vite और Lit वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-lit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## विषय सूची

<TOC/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप निम्न कर सकते हैं:

- घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके **अनुवादों को आसानी से प्रबंधित करें**।
- **मेटाडेटा, रूट और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- स्वतः जनित प्रकारों के साथ **TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटो-पूर्णता और त्रुटि पहचान में सुधार होता है।
- उन्नत सुविधाओं का लाभ उठाएं, जैसे गतिशील स्थान (locale) पहचान और स्विचिंग।

---

## Vite और Lit एप्लिकेशन में Intlayer सेट करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें (Install Dependencies)

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **lit-intlayer**
  वह पैकेज जो Intlayer को Lit अनुप्रयोगों के साथ एकीकृत करता है। यह `ReactiveController`-आधारित हुक (`useIntlayer`, `useLocale`, आदि) प्रदान करता है ताकि स्थान बदलने पर LitElement स्वचालित रूप से पुनः रेंडर हो सकें।

- **vite-intlayer**
  इसमें [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ Intlayer को एकीकृत करने के लिए Vite प्लगइन शामिल है, साथ ही उपयोगकर्ता के पसंदीदा स्थान का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग अक्षम कर सकते हैं, और बहुत कुछ कर सकते हैं। उपलब्ध मापदंडों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Vite कॉन्फ़िगरेशन में Intlayer एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer वातावरण चर परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम (aliases) प्रदान करता है।

### चरण 4: अपने प्रवेश बिंदु (Entry Point) में Intlayer बूटस्ट्रैप करें

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

### चरण 5: अपनी सामग्री घोषित करें (Declare Your Content)

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = appContent;
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

> आपकी सामग्री घोषणाएं आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) से मेल खाती हों।
>
> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### चरण 6: अपने LitElement में Intlayer का उपयोग करें

`LitElement` के अंदर `useIntlayer` का उपयोग करें। यह एक `ReactiveController` प्रॉक्सी देता है जो सक्रिय स्थान बदलने पर स्वचालित रूप से पुनः रेंडरिंग ट्रिगर करता है — किसी अतिरिक्त सेटअप की आवश्यकता नहीं है।

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
> ```

### (वैकल्पिक) चरण 7: अपनी सामग्री की भाषा बदलें

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

### (वैकल्पिक) चरण 8: मार्कडाउन और HTML सामग्री रेंडर करें

Intlayer `md()` और `html()` सामग्री घोषणाओं का समर्थन करता है। लिट में, संकलित आउटपुट को `unsafeHTML` निर्देश के माध्यम से कच्चे HTML के रूप में इंजेक्ट किया जाता है।

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

### (वैकल्पिक) चरण 9: अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

प्रत्येक भाषा के लिए अद्वितीय रूट बनाने के लिए (SEO के लिए उपयोगी), आप Intlayer के `localeMap` / `localeFlatMap` सहायकों के साथ क्लाइंट-साइड राउटर का उपयोग कर सकते हैं, और सर्वर-साइड स्थान पहचान के लिए `intlayerProxy` Vite प्लगइन का उपयोग कर सकते हैं।

सबसे पहले, अपने Vite कॉन्फ़िगरेशन में `intlayerProxy` जोड़ें:

> ध्यान दें कि उत्पादन में `intlayerProxy` का उपयोग करने के लिए, आपको `vite-intlayer` को `devDependencies` से `dependencies` में ले जाने की आवश्यकता है।

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

### (वैकल्पिक) चरण 10: स्थान बदलने पर URL बदलें

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

### (वैकल्पिक) चरण 11: HTML भाषा और दिशा विशेषताओं को स्विच करें

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

### (वैकल्पिक) चरण 12: अपने कंपोनेंट्स की सामग्री निकालें (Extract content)

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
