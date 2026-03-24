---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: Vite + Lit i18n - ২০২৬ সালে কীভাবে একটি Lit অ্যাপ অনুবাদ করবেন
description: শিখুন কীভাবে আপনার Vite এবং Lit ওয়েবসাইটকে বহুভাষী করবেন। আন্তর্জাতিকীকরণ (i18n) এবং অনুবাদের জন্য ডকুমেন্টেশন অনুসরণ করুন।
keywords:
  - আন্তর্জাতিকীকরণ
  - ডকুমেন্টেশন
  - Intlayer
  - Vite
  - Lit
  - ওয়েব কম্পোনেন্টস
  - জাভাস্ক্রিপ্ট
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

# Intlayer ব্যবহার করে আপনার Vite এবং Lit ওয়েবসাইট অনুবাদ করুন | আন্তর্জাতিকীকরণ (i18n)

## সূচিপত্র

<TOC/>

## Intlayer কী?

**Intlayer** হলো একটি উদ্ভাবনী, ওপেন-সোর্স আন্তর্জাতিকীকরণ (i18n) লাইব্রেরি যা আধুনিক ওয়েব অ্যাপ্লিকেশনগুলোতে বহুভাষী সমর্থন সহজ করার জন্য ডিজাইন করা হয়েছে।

Intlayer এর মাধ্যমে আপনি:

- কম্পোনেন্ট স্তরে ঘোষণামূলক ডিকশনারি ব্যবহার করে **সহজেই অনুবাদ পরিচালনা করতে পারেন**।
- **মেটাডেটা, রুট এবং কন্টেন্ট ডাইনামিকভাবে স্থানীয়করণ করতে পারেন**।
- অটো-জেনারেটেড টাইপস এর মাধ্যমে **TypeScript সমর্থন নিশ্চিত করতে পারেন**, যা অটো-কমপ্লিশন এবং এরর ডিটেকশন উন্নত করে।
- ডাইনামিক লোকাল ডিটেকশন এবং সুইচিং এর মতো **উন্নত বৈশিষ্ট্যগুলোর সুবিধা নিতে পারেন**।

---

## Vite এবং Lit অ্যাপ্লিকেশনে Intlayer সেট আপ করার জন্য ধাপে ধাপে নির্দেশিকা

### ধাপ ১: ডিপেন্ডেন্সি ইনস্টল করুন (Install Dependencies)

npm ব্যবহার করে প্রয়োজনীয় প্যাকেজগুলো ইনস্টল করুন:

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
bunx intlayer init
```

- **intlayer**

  মূল প্যাকেজ যা কনফিগারেশন ম্যানেজমেন্ট, ট্রান্সলেশন, [কন্টেন্ট ডিক্লারেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md), ট্রান্সপাইলেশন এবং [CLI কমান্ডের](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/index.md) জন্য আন্তর্জাতিকীকরণ সরঞ্জাম সরবরাহ করে।

- **lit-intlayer**
  প্যাকেজ যা Lit অ্যাপ্লিকেশনের সাথে Intlayer কে একীভূত করে। এটি `ReactiveController`-ভিত্তিক হুক (`useIntlayer`, `useLocale` ইত্যাদি) প্রদান করে যাতে লোকাল পরিবর্তনের সাথে সাথে LitElement স্বয়ংক্রিয়ভাবে পুনরায় রেন্ডার হয়।

- **vite-intlayer**
  [Vite বান্ডলার](https://vite.dev/guide/why.html#why-bundle-for-production) এর সাথে Intlayer কে একীভূত করার জন্য Vite প্লাগইন এবং ব্যবহারকারীর পছন্দের লোকাল সনাক্ত করা, কুকি ম্যানেজমেন্ট এবং URL রিডাইরেকশন হ্যান্ডেল করার জন্য মিডলওয়্যার অন্তর্ভুক্ত করে।

### ধাপ ২: আপনার প্রজেক্ট কনফিগার করুন

আপনার অ্যাপ্লিকেশনের ভাষাগুলি কনফিগার করার জন্য একটি কনফিগারেশন ফাইল তৈরি করুন:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // আপনার অন্যান্য লোকাল
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
      // আপনার অন্যান্য লোকাল
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
      // আপনার অন্যান্য লোকাল
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> এই কনফিগারেশন ফাইলের মাধ্যমে, আপনি স্থানীয়কৃত URL, মিডলওয়্যার রিডাইরেকশন, কুকির নাম, আপনার কন্টেন্ট ডিক্লারেশনের অবস্থান এবং এক্সটেনশন সেট করতে পারেন, কনসোলে Intlayer লগ নিষ্ক্রিয় করতে পারেন এবং আরও অনেক কিছু। উপলব্ধ প্যারামিটারগুলোর সম্পূর্ণ তালিকার জন্য [কনফিগারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) দেখুন।

### ধাপ ৩: আপনার Vite কনফিগারেশনে Intlayer একীভূত করুন

আপনার কনফিগারেশনে intlayer প্লাগইন যোগ করুন।

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

> `intlayer()` Vite প্লাগইনটি Vite এর সাথে Intlayer কে একীভূত করতে ব্যবহৃত হয়। এটি কন্টেন্ট ডিক্লারেশন ফাইলগুলোর বিল্ড নিশ্চিত করে এবং ডেভেলপমেন্ট মোডে সেগুলোকে পর্যবেক্ষণ করে। এটি Vite অ্যাপ্লিকেশনের মধ্যে Intlayer এনভায়রনমেন্ট ভেরিয়েবলগুলো সংজ্ঞায়িত করে। অতিরিক্তভাবে, এটি কর্মক্ষমতা অপ্টিমাইজ করার জন্য অ্যালিয়াস (aliases) প্রদান করে।

### ধাপ ৪: আপনার এন্ট্রি পয়েন্টে Intlayer বুটস্ট্র্যাপ করুন

যেকোনো কাস্টম এলিমেন্ট রেজিস্টার করার **আগে** `installIntlayer()` কল করুন যাতে প্রথম এলিমেন্টটি কানেক্ট হওয়ার সময় গ্লোবাল লোকাল সিঙ্গেলটন প্রস্তুত থাকে।

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// যেকোনো LitElement DOM এ কানেক্ট হওয়ার আগে এটি কল করতে হবে।
installIntlayer();

// আপনার কাস্টম কম্পোনেন্টগুলো ইম্পোর্ট এবং রেজিস্টার করুন।
import "./my-element.js";
```

আপনি যদি `md()` কন্টেন্ট ডিক্লারেশন (Markdown) ব্যবহার করেন, তবে মার্কডাউন রেন্ডারারও ইনস্টল করুন:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

### ধাপ ৫: আপনার কন্টেন্ট ঘোষণা করুন (Declare Your Content)

অনুবাদগুলো সংরক্ষণের জন্য আপনার কন্টেন্ট ডিক্লারেশনগুলো তৈরি এবং পরিচালনা করুন:

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
      es: "Haga clic en los logotipos de Vite y Lit para obtener más তথ্য",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" codeFormat="commonjs"
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
      es: "Haga clic en los logotipos de Vite y Lit para obtener más তথ্য",
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
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más তথ্য"
      }
    }
  }
}
```

> আপনার কন্টেন্ট ডিক্লারেশনগুলো আপনার অ্যাপ্লিকেশনের যেকোনো জায়গায় সংজ্ঞায়িত করা যেতে পারে যতক্ষণ সেগুলো `contentDir` ডিরেক্টরিতে (ডিফল্টভাবে, `./src`) অন্তর্ভুক্ত থাকে এবং কন্টেন্ট ডিক্লারেশন ফাইল এক্সটেনশনের (ডিফল্টভাবে, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) সাথে মেলে।
>
> আরও বিস্তারিত জানার জন্য [কন্টেন্ট ডিক্লারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md) দেখুন।

### ধাপ ৬: আপনার LitElement-এ Intlayer ব্যবহার করুন

একটি `LitElement`-এর ভিতরে `useIntlayer` ব্যবহার করুন। এটি একটি `ReactiveController` প্রক্সি প্রদান করে যা লোকাল পরিবর্তন হলে স্বয়ংক্রিয়ভাবে পুনরায় রেন্ডারিং ট্রিগার করে — কোনো অতিরিক্ত সেটআপের প্রয়োজন নেই।

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer নিজেকে একটি ReactiveController হিসেবে রেজিস্টার করে।
  // লোকাল পরিবর্তন হলে কম্পোনেন্ট স্বয়ংক্রিয়ভাবে পুনরায় রেন্ডার হয়।
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

> [!NOTE]
> যখন আপনার নেটিভ HTML অ্যাট্রিবিউটে (যেমন `alt`, `aria-label`, `title`) অনুবাদ করা স্ট্রিং প্রয়োজন হয়, তখন লিফ নোডে (leaf node) `.value` কল করুন:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> ```

### (ঐচ্ছিক) ধাপ ৭: আপনার কন্টেন্টের ভাষা পরিবর্তন করুন

আপনার কন্টেন্টের ভাষা পরিবর্তন করতে, `useLocale` কন্ট্রোলার দ্বারা প্রদান করা `setLocale` পদ্ধতি ব্যবহার করুন।

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

### (ঐচ্ছিক) ধাপ ৮: মার্কডাউন এবং HTML কন্টেন্ট রেন্ডার করুন

Intlayer `md()` এবং `html()` কন্টেন্ট ডিক্লারেশন সমর্থন করে। Lit-এ, কম্পাইল করা আউটপুট `unsafeHTML` ডিরেক্টিভ এর মাধ্যমে কাঁচা HTML হিসেবে ইনজেক্ট করা হয়।

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

আপনার কম্পোনেন্টে কম্পাইল করা HTML রেন্ডার করুন:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { compileMarkdown, useIntlayer } from "lit-intlayer";

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
> `String(content.editNote)` `IntlayerNode`-এ `toString()` কল করে, যা কাঁচা মার্কডাউন স্ট্রিং প্রদান করে। HTML স্ট্রিং পেতে এটি `compileMarkdown`-এ পাস করুন, তারপর এটি Lit-এর `unsafeHTML` ডিরেক্টিভ এর সাথে রেন্ডার করুন।

### (ঐচ্ছিক) ধাপ ৯: আপনার অ্যাপ্লিকেশনে স্থানীয়কৃত রাউটিং যোগ করুন

প্রতিটি ভাষার জন্য অনন্য রুট তৈরি করতে (SEO এর জন্য দরকারী), আপনি Intlayer এর `localeMap` / `localeFlatMap` হেল্পারের সাথে একটি ক্লায়েন্ট-সাইড রাউটার ব্যবহার করতে পারেন এবং সার্ভার-সাইড লোকাল ডিটেকশনের জন্য `intlayerProxy` Vite প্লাগইন ব্যবহার করতে পারেন।

প্রথমে আপনার Vite কনফিগারেশনে `intlayerProxy` যোগ করুন:

> মনে রাখবেন যে প্রোডাকশনে `intlayerProxy` ব্যবহার করতে হলে আপনাকে `vite-intlayer` কে `devDependencies` থেকে `dependencies`-এ সরিয়ে আনতে হবে।

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

### (ঐচ্ছিক) ধাপ ১০: লোকাল পরিবর্তনের সাথে সাথে URL পরিবর্তন করুন

লোকাল পরিবর্তন হলে ব্রাউজার URL আপডেট করতে লোকাল সুইচারের সাথে `useRewriteURL` ব্যবহার করুন:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // লোকাল পরিবর্তন হলে স্বয়ংক্রিয়ভাবে বর্তমান URL পুনরায় লিখে।
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

### (ঐচ্ছিক) ধাপ ১১: HTML ভাষা এবং দিক নির্দেশনা অ্যাট্রিবিউট পরিবর্তন করুন

অ্যাক্সেসযোগ্যতা এবং SEO-এর জন্য বর্তমান লোকালের সাথে সাথে `<html>` ট্যাগের `lang` এবং `dir` অ্যাট্রিবিউট আপডেট করুন।

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
    return html`<!-- আপনার কন্টেন্ট -->`;
  }
}
```

### (ঐচ্ছিক) ধাপ ১২: আপনার কম্পোনেন্টের কন্টেন্ট এক্সট্র্যাক্ট করুন (Extract content)

আপনার যদি একটি বিদ্যমান কোডবেস থাকে, তবে হাজার হাজার ফাইল পরিবর্তন করা সময়সাপেক্ষ হতে পারে।

এই প্রক্রিয়া সহজ করার জন্য, Intlayer আপনার কম্পোনেন্ট পরিবর্তন এবং কন্টেন্ট এক্সট্র্যাক্ট করার জন্য একটি [কম্পাইলার](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/compiler.md) / [এক্সট্র্যাক্টর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/extract.md) প্রস্তাব করে।

এটি সেট আপ করার জন্য, আপনি আপনার `intlayer.config.ts` ফাইলে একটি `compiler` বিভাগ যোগ করতে পারেন:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... আপনার কনফিগারেশনের বাকি অংশ
  compiler: {
    /**
     * কম্পাইলার সক্ষম হওয়া উচিত কিনা তা নির্দেশ করে।
     */
    enabled: true,

    /**
     * আউটপুট ফাইলগুলোর পথ নির্ধারণ করে
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * কম্পোনেন্টগুলো পরিবর্তনের পরে সংরক্ষণ করা উচিত কিনা তা নির্দেশ করে।
     * এইভাবে, কম্পাইলার অ্যাপ পরিবর্তনের জন্য কেবল একবার চালানো যেতে পারে এবং তারপরে সরানো যেতে পারে।
     */
    saveComponents: false,

    /**
     * ডিকশনারি কী প্রিফিক্স (Dictionary key prefix)
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='এক্সট্র্যাক্ট কমান্ড'>

আপনার কম্পোনেন্টগুলো পরিবর্তন এবং কন্টেন্ট এক্সট্র্যাক্ট করার জন্য এক্সট্র্যাক্টর চালান

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
bunx intlayer extract
```

 </Tab>
 <Tab value='বাবেল কম্পাইলার'>

`intlayerCompiler` প্লাগইন অন্তর্ভুক্ত করার জন্য আপনার `vite.config.ts` আপডেট করুন:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // কম্পাইলার প্লাগইন যোগ করে
  ],
});
```

```bash packageManager="npm"
npm run build # অথবা npm run dev
```

```bash packageManager="pnpm"
pnpm run build # অথবা pnpm run dev
```

```bash packageManager="yarn"
yarn build # অথবা yarn dev
```

```bash packageManager="bun"
bun run build # অথবা bun run dev
```

 </Tab>
</Tabs>

### TypeScript কনফিগার করুন

নিশ্চিত করুন যে আপনার TypeScript কনফিগারেশনে অটো-জেনারেটেড টাইপস অন্তর্ভুক্ত আছে।

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

> `experimentalDecorators` এবং `useDefineForClassFields: false` ডেকোরেটর সমর্থনের জন্য Lit দ্বারা প্রয়োজন।

### Git কনফিগারেশন

Intlayer দ্বারা উৎপন্ন ফাইলগুলো উপেক্ষা করার পরামর্শ দেওয়া হয়। এটি আপনাকে সেগুলো আপনার Git রিপোজিটরিতে কমিট (commit) করা এড়াতে সাহায্য করে।

এটি করার জন্য, আপনি আপনার `.gitignore` ফাইলে নিম্নলিখিত নির্দেশ যোগ করতে পারেন:

```bash
# Intlayer দ্বারা উৎপন্ন ফাইলগুলো উপেক্ষা করুন
.intlayer
```

### VS Code এক্সটেনশন

Intlayer এর মাধ্যমে আপনার ডেভেলপমেন্ট অভিজ্ঞতা উন্নত করার জন্য, আপনি অফিসিয়াল **Intlayer VS Code এক্সটেনশন** ইনস্টল করতে পারেন।

[VS Code মার্কেটপ্লেস থেকে ইনস্টল করুন](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

এই এক্সটেনশনটি প্রদান করে:

- অনুবাদ কীগুলোর জন্য **অটো-কমপ্লিশন**।
- অনুপস্থিত অনুবাদের জন্য **রিয়েল-টাইম এরর ডিটেকশন**।
- অনুবাদিত কন্টেন্টের **ইনলাইন প্রিভিউ**।
- সহজেই অনুবাদ তৈরি এবং আপডেট করার জন্য **দ্রুত কাজ (Quick actions)**।

এক্সটেনশন ব্যবহারের আরও বিস্তারিত জানার জন্য [Intlayer VS Code এক্সটেনশন ডকুমেন্টেশন](https://intlayer.org/doc/vs-code-extension) দেখুন।

---

### আরও এগিয়ে যান

আরও এগিয়ে যাওয়ার জন্য, আপনি [ভিজ্যুয়াল এডিটর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md) প্রয়োগ করতে পারেন অথবা [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_CMS.md) ব্যবহার করে আপনার কন্টেন্ট বাহ্যিক করতে পারেন।
