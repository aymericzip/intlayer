---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - ২০২৬ সালে কীভাবে একটি Vanilla JS অ্যাপ অনুবাদ করবেন
description: আপনার Vite এবং Vanilla JS ওয়েবসাইটকে কীভাবে বহুভাষিক করবেন তা আবিষ্কার করুন। আন্তর্জাতিকীকরণ (i18n) এবং অনুবাদের জন্য ডকুমেন্টেশন অনুসরণ করুন।
keywords:
  - আন্তর্জাতিকীকরণ
  - ডকুমেন্টেশন
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Intlayer ব্যবহার করে আপনার Vite এবং Vanilla JS ওয়েবসাইট অনুবাদ করুন | আন্তর্জাতিকীকরণ (i18n)

## সূচিপত্র

<TOC/>

## Intlayer কী?

**Intlayer** হলো একটি উদ্ভাবনী, ওপেন-সোর্স আন্তর্জাতিকীকরণ (i18n) লাইব্রেরি যা আধুনিক ওয়েব অ্যাপ্লিকেশনগুলোতে বহুভাষিক সমর্থন সহজ করার জন্য ডিজাইন করা হয়েছে।

Intlayer এর মাধ্যমে আপনি:

- কম্পোনেন্ট স্তরে ঘোষণামূলক ডিকশনারি ব্যবহার করে **সহজে অনুবাদ পরিচালনা** করতে পারেন।
- মেটাডেটা, রুট এবং কন্টেন্ট **গতিশীলভাবে স্থানীয়করণ** করতে পারেন।
- স্বয়ংক্রিয়ভাবে তৈরি টাইপগুলোর মাধ্যমে **TypeScript সমর্থন নিশ্চিত** করতে পারেন, যা অটো-কমপ্লিশন এবং ত্রুটি শনাক্তকরণ উন্নত করে।
- গতিশীল লোক্যাল শনাক্তকরণ এবং পরিবর্তনের মতো **উন্নত বৈশিষ্ট্যগুলো উপভোগ** করতে পারেন।

---

## Vite এবং Vanilla JS অ্যাপ্লিকেশনে Intlayer সেট আপ করার ধাপে ধাপে নির্দেশিকা

### ধাপ ১: ডিপেন্ডেন্সি ইনস্টল করুন

npm ব্যবহার করে প্রয়োজনীয় প্যাকেজগুলো ইনস্টল করুন:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**
  মূল প্যাকেজ যা কনফিগারেশন পরিচালনা, অনুবাদ, [কন্টেন্ট ঘোষণা](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md), ট্রান্সপাইলেশন এবং [CLI কমান্ডের](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/index.md) জন্য আন্তর্জাতিকীকরণ সরঞ্জাম সরবরাহ করে।

- **vanilla-intlayer**
  প্যাকেজ যা Intlayer-কে বিশুদ্ধ JavaScript / TypeScript অ্যাপ্লিকেশনের সাথে সংহত করে। এটি একটি pub/sub singleton (`IntlayerClient`) এবং কলব্যাক-ভিত্তিক সহায়ক (`useIntlayer`, `useLocale` ইত্যাদি) সরবরাহ করে যাতে আপনার অ্যাপের যেকোনো অংশ কোনো UI ফ্রেমওয়ার্কের ওপর নির্ভর না করেই লোক্যাল পরিবর্তনের প্রতিক্রিয়া জানাতে পারে।

- **vite-intlayer**
  Intlayer-কে [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) এর সাথে সংহত করার জন্য Vite প্লাগিন অন্তর্ভুক্ত করে, সেই সাথে ব্যবহারকারীর পছন্দের লোক্যাল শনাক্তকরণ, কুকি পরিচালনা এবং URL রিডাইরেকশন হ্যান্ডেল করার জন্য মিডলওয়্যার সরবরাহ করে।

### ধাপ ২: আপনার প্রজেক্ট কনফিগার করা

আপনার অ্যাপ্লিকেশনের ভাষাগুলো সেট আপ করতে একটি কনফিগারেশন ফাইল তৈরি করুন:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // আপনার অন্যান্য লোক্যাল
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
      // আপনার অন্যান্য লোক্যাল
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
      // আপনার অন্যান্য লোক্যাল
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> এই কনফিগারেশন ফাইলের মাধ্যমে, আপনি স্থানীয়কৃত URL, মিডলওয়্যার রিডাইরেকশন, কুকির নাম, আপনার কন্টেন্ট ঘোষণার অবস্থান এবং এক্সটেনশন সেট করতে পারেন, কনসোলে Intlayer লগ নিষ্ক্রিয় করতে পারেন এবং আরও অনেক কিছু। উপলব্ধ প্যারামিটারগুলোর সম্পূর্ণ তালিকার জন্য, [কনফিগারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) দেখুন।

### ধাপ ৩: আপনার Vite কনফিগারেশনে Intlayer সংহত করুন

আপনার কনফিগারেশনে intlayer প্লাগিন যোগ করুন।

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

> `intlayer()` Vite প্লাগিনটি Intlayer-কে Vite এর সাথে সংহত করতে ব্যবহৃত হয়। এটি কন্টেন্ট ঘোষণা ফাইলগুলোর নির্মাণ নিশ্চিত করে এবং ডেভেলপমেন্ট মোডে সেগুলোর ওপর নজর রাখে। এটি Vite অ্যাপ্লিকেশনের মধ্যে Intlayer এনভায়রনমেন্ট ভেরিয়েবল সংজ্ঞায়িত করে। অতিরিক্তভাবে, এটি কর্মক্ষমতা অপ্টিমাইজ করার জন্য অ্যালিয়াস সরবরাহ করে।

### ধাপ ৪: আপনার এন্ট্রি পয়েন্টে Intlayer বুটস্ট্র্যাপ করুন

যেকোনো কন্টেন্ট রেন্ডার করার **আগে** `installIntlayer()` কল করুন যাতে গ্লোবাল লোক্যাল সিঙ্গেলটন প্রস্তুত থাকে।

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// যেকোনো i18n কন্টেন্ট রেন্ডার করার আগে কল করা উচিত।
installIntlayer();

// আপনার অ্যাপ মডিউলগুলো ইম্পোর্ট এবং রান করুন।
import "./app.js";
```

আপনি যদি `md()` কন্টেন্ট ঘোষণা (Markdown) ব্যবহার করেন, তবে মার্কডাউন রেন্ডারারও ইনস্টল করুন:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

### ধাপ ৫: আপনার কন্টেন্ট ঘোষণা করুন

অনুবাদগুলো সংরক্ষণ করতে আপনার কন্টেন্ট ঘোষণাগুলো তৈরি এবং পরিচালনা করুন:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "আরও জানতে Vite লোগোতে ক্লিক করুন",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "আরও জানতে Vite লোগোতে ক্লিক করুন",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "আরও জানতে Vite লোগোতে ক্লিক করুন",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "আরও জানতে Vite লোগোতে ক্লিক করুন"
      }
    }
  }
}
```

> আপনার কন্টেন্ট ঘোষণাগুলো আপনার অ্যাপ্লিকেশনের যেকোনো জায়গায় সংজ্ঞায়িত করা যেতে পারে যতক্ষণ না সেগুলো `contentDir` ডাইরেক্টরির (ডিফল্টভাবে `./src`) অন্তর্ভুক্ত থাকে এবং কন্টেন্ট ঘোষণা ফাইল এক্সটেনশনের (ডিফল্টভাবে `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) সাথে মিলে যায়।
>
> আরও বিস্তারিত জানার জন্য, [কন্টেন্ট ঘোষণা ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md) দেখুন।

### ধাপ ৬: আপনার JavaScript-এ Intlayer ব্যবহার করুন

`vanilla-intlayer` প্যাকেজটি `react-intlayer` এর সারফেস API-কে অনুকরণ করে: `useIntlayer(key, locale?)` সরাসরি অনূদিত কন্টেন্ট রিটার্ন করে। লোক্যাল পরিবর্তনের সাবস্ক্রিপশন নিতে রেজাল্টের সাথে `.onChange()` চেইন করুন — যা React রি-রেন্ডারের একটি স্পষ্ট সমতুল্য।

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// বর্তমান লোক্যালের জন্য প্রাথমিক কন্টেন্ট পান।
// লোক্যাল যখনই পরিবর্তিত হবে তখন অবহিত হতে .onChange() চেইন করুন।
const content = useIntlayer("app").onChange((newContent) => {
  // শুধুমাত্র প্রভাবিত DOM নোডগুলো রি-রেন্ডার বা প্যাচ করুন
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// প্রাথমিক রেন্ডার
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> লিফ ভ্যালুগুলোকে `String()` এর মধ্যে র্যাপ করে সেগুলোকে স্ট্রিং হিসেবে অ্যাক্সেস করুন, যা নোডের `toString()` মেথড কল করে এবং অনূদিত টেক্সট রিটার্ন করে।
>
> যখন আপনার একটি নেটিভ HTML অ্যাট্রিবিউটের (যেমন `alt`, `aria-label`) জন্য ভ্যালু প্রয়োজন হবে, তখন সরাসরি `.value` ব্যবহার করুন:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (ঐচ্ছিক) ধাপ ৭: আপনার কন্টেন্টের ভাষা পরিবর্তন করুন

আপনার কন্টেন্টের ভাষা পরিবর্তন করতে, `useLocale` দ্বারা প্রদত্ত `setLocale` ফাংশনটি ব্যবহার করুন।

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value as any));

  // অন্য কোথাও থেকে লোক্যাল পরিবর্তিত হলে ড্রপডাউনটি সিঙ্কে রাখুন
  return subscribe((newLocale) => render(newLocale));
}
```

### (ঐচ্ছিক) ধাপ ৮: মার্কডাউন এবং HTML কন্টেন্ট রেন্ডার করুন

Intlayer `md()` এবং `html()` কন্টেন্ট ঘোষণা সমর্থন করে। Vanilla JS-এ, কম্পাইল করা আউটপুট `innerHTML` এর মাধ্যমে র-HTML হিসেবে ঢোকানো হয়।

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

HTML কম্পাইল এবং ইনসার্ট করুন:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` ফাংশনটি `IntlayerNode`-এ `toString()` কল করে যা র-মার্কডাউন স্ট্রিং রিটার্ন করে। একটি HTML স্ট্রিং পেতে এটি `compileMarkdown`-এ পাস করুন, তারপর `innerHTML` এর মাধ্যমে সেট করুন।

> [!WARNING]
> শুধুমাত্র বিশ্বস্ত কন্টেন্টের সাথে `innerHTML` ব্যবহার করুন। যদি মার্কডাউন ব্যবহারকারীর ইনপুট থেকে আসে, তবে প্রথমে এটি স্যানিটাইজ করুন (যেমন DOMPurify দিয়ে)। আপনি একটি স্যানিটাইজিং রেন্ডারার গতিশীলভাবে ইনস্টল করতে পারেন:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (ঐচ্ছিক) ধাপ ৯: আপনার অ্যাপ্লিকেশনে স্থানীয়করণকৃত রাউটিং (Localized Routing) যোগ করুন

প্রতিটি ভাষার জন্য অনন্য রুট তৈরি করতে (SEO এর জন্য দরকারী), আপনি সার্ভার-সাইড লোক্যাল শনাক্তকরণের জন্য আপনার Vite কনফিগারেশনে `intlayerProxy` ব্যবহার করতে পারেন।

প্রথমে, আপনার Vite কনফিগারেশনে `intlayerProxy` যোগ করুন:

> মনে রাখবেন যে প্রোডাকশনে `intlayerProxy` ব্যবহার করতে হলে আপনাকে `vite-intlayer`-কে `devDependencies` থেকে `dependencies`-এ স্থানান্তর করতে হবে।

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // প্রথমে রাখা উচিত
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // প্রথমে রাখা উচিত
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // প্রথমে রাখা উচিত
    intlayer(),
  ],
});
```

### (ঐচ্ছিক) ধাপ ১০: লোক্যাল পরিবর্তনের সময় URL পরিবর্তন করুন

লোক্যালি পরিবর্তনের সময় ব্রাউজার URL আপডেট করতে, Intlayer ইনস্টল করার পরে `useRewriteURL()` কল করুন:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// অবিলম্বে এবং প্রতিটি পরবর্তী লোক্যাল পরিবর্তনে URL পুনরায় লিখে।
// ক্লিনআপের জন্য একটি আনসাবস্ক্রাইব ফাংশন রিটার্ন করে।
const stopRewriteURL = useRewriteURL();
```

### (ঐচ্ছিক) ধাপ ১১: HTML ভাষা এবং দিকনির্দেশ (Direction) অ্যাট্রিবিউট সুইচ করুন

অ্যাক্সেসিবিলিটি এবং SEO এর জন্য বর্তমান লোক্যালের সাথে মিল রেখে `<html>` ট্যাগের `lang` এবং `dir` অ্যাট্রিবিউট আপডেট করুন।

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (ঐচ্ছিক) ধাপ ১২: প্রতি-লোক্যালের ডিকশনারি লেজি-লোড (Lazy-load) করুন

বড় অ্যাপের জন্য আপনি প্রতিটি লোক্যালের ডিকশনারিকে নিজস্ব চাঙ্কে (chunk) বিভক্ত করতে চাইতে পারেন। Vite-এর গতিশীল `import()` এর সাথে `useDictionaryDynamic` ব্যবহার করুন:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> প্রতিটি লোক্যালের বান্ডেল শুধুমাত্র তখনই আনা হয় যখন সেই লোক্যালটি সক্রিয় হয় এবং ফলাফলটি ক্যাশে রাখা হয় — একই লোক্যালে পরবর্তী পরিবর্তনগুলো তাত্ক্ষণিক হয়।

### (ঐচ্ছিক) ধাপ ১৩: আপনার কম্পোনেন্টের কন্টেন্ট এক্সট্র্যাক্ট করুন

আপনার যদি বিদ্যমান কোডবেস থাকে তবে হাজার হাজার ফাইল রূপান্তর করা সময়সাপেক্ষ হতে পারে।

এই প্রক্রিয়াটি সহজ করতে, Intlayer আপনার কম্পোনেন্ট রূপান্তর করতে এবং কন্টেন্ট এক্সট্র্যাক্ট করার জন্য একটি [কম্পাইলর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/compiler.md) / [এক্সট্র্যাক্টর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/extract.md) প্রস্তাব করে।

এটি সেট আপ করতে, আপনি আপনার `intlayer.config.ts` ফাইলে একটি `compiler` সেকশন যোগ করতে পারেন:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... আপনার বাকি কনফিগারেশন
  compiler: {
    /**
     * কম্পাইলর সক্ষম করা উচিত কিনা তা নির্দেশ করে।
     */
    enabled: true,

    /**
     * আউটপুট ফাইলগুলোর পাথ সংজ্ঞায়িত করে
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * কম্পোনেন্ট রূপান্তর করার পরে সংরক্ষণ করা উচিত কিনা তা নির্দেশ করে।
     * এইভাবে, কম্পাইলর একবার অ্যাপ রূপান্তর করার জন্য চালানো যেতে পারে এবং তারপরে এটি সরানো যেতে পারে।
     */
    saveComponents: false,

    /**
     * ডিকশনারি কী প্রিফিক্স
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract কমান্ড'>

আপনার কম্পোনেন্ট রূপান্তর করতে এবং কন্টেন্ট এক্সট্র্যাক্ট করতে এক্সট্র্যাক্টর চালান

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
 <Tab value='Babel কম্পাইলর'>

`intlayerCompiler` প্লাগিন অন্তর্ভুক্ত করতে আপনার `vite.config.ts` আপডেট করুন:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // কম্পাইলর প্লাগিন যোগ করে
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

নিশ্চিত করুন যে আপনার TypeScript কনফিগারেশনে স্বয়ংক্রিয়ভাবে তৈরি টাইপগুলো অন্তর্ভুক্ত আছে।

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git কনফিগারেশন

Intlayer দ্বারা তৈরি ফাইলগুলো উপেক্ষা করার পরামর্শ দেওয়া হয়। এটি আপনাকে সেগুলো আপনার Git রিপোজিটরিতে কমিট করা এড়াতে সহায়তা করে।

এটি করতে, আপনি আপনার `.gitignore` ফাইলে নিম্নলিখিত নির্দেশাবলী যোগ করতে পারেন:

```bash
# Intlayer দ্বারা তৈরি ফাইলগুলো উপেক্ষা করুন
.intlayer
```

### VS Code এক্সটেনশন

Intlayer এর সাথে আপনার ডেভেলপমেন্ট অভিজ্ঞতা উন্নত করতে, আপনি অফিসিয়াল **Intlayer VS Code এক্সটেনশন** ইনস্টল করতে পারেন।

[VS Code Marketplace থেকে ইনস্টল করুন](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

এই এক্সটেনশনটি সরবরাহ করে:

- অনুবাদ কীগুলোর জন্য **অটো-কমপ্লিশন**।
- অনুপস্থিত অনুবাদের জন্য **রিয়েল-টাইম ত্রুটি শনাক্তকরণ**।
- অনূদিত কন্টেন্টের **ইনলাইন প্রিভিউ**।
- সহজে অনুবাদ তৈরি এবং আপডেট করার জন্য **কুইক অ্যাকশন**।

এক্সটেনশনটি কীভাবে ব্যবহার করবেন সে সম্পর্কে আরও বিস্তারিত জানার জন্য, [Intlayer VS Code এক্সটেনশন ডকুমেন্টেশন](https://intlayer.org/doc/vs-code-extension) দেখুন।

---

### আরও এগিয়ে যান

আরও গভীরে যেতে, আপনি [ভিসুয়াল এডিটর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md) প্রয়োগ করতে পারেন অথবা [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_CMS.md) ব্যবহার করে আপনার কন্টেন্টকে এক্সটার্নালাইজ করতে পারেন।
