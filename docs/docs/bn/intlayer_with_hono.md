---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - ২০২৬ সালে কীভাবে একটি Hono অ্যাপ অনুবাদ করবেন
description: কীভাবে আপনার Hono ব্যাকএন্ডকে বহুভাষিক করবেন তা আবিষ্কার করুন। এটিকে আন্তর্জাতিকীকরণ (i18n) এবং অনুবাদ করতে ডকুমেন্টেশন অনুসরণ করুন।
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "init কমান্ড যোগ করা হয়েছে"
  - version: 5.5.10
    date: 2025-06-29
    changes: "ইতিহাস শুরু (Init history)"
---

# Intlayer ব্যবহার করে আপনার Hono ব্যাকএন্ড ওয়েবসাইট অনুবাদ করুন | আন্তর্জাতিকীকরণ (i18n)

`hono-intlayer` হলো Hono অ্যাপ্লিকেশনগুলির জন্য একটি শক্তিশালী আন্তর্জাতিকীকরণ (i18n) মিডলওয়্যার, যা ক্লায়েন্টের পছন্দের উপর ভিত্তি করে স্থানীয়কৃত রেসপন্স প্রদান করে আপনার ব্যাকএন্ড পরিষেবাগুলিকে বিশ্বব্যাপী অ্যাক্সেসযোগ্য করার জন্য ডিজাইন করা হয়েছে।

### ব্যবহারিক ক্ষেত্র (Practical Use Cases)

- **ব্যাকএন্ড এরর ব্যবহারকারীর ভাষায় প্রদর্শন করা**: যখন কোনো এরর ঘটে, ব্যবহারকারীর নিজস্ব ভাষায় বার্তা প্রদর্শন করলে তা বুঝতে সুবিধা হয় এবং বিরক্তি কমায়। এটি বিশেষ করে সেই সকল ডাইনামিক এরর বার্তার জন্য উপযোগী যা ফ্রন্ট-এন্ড কম্পোনেন্ট যেমন টোস্ট বা মোডাল-এ দেখানো হতে পারে।

- **বহুভাষিক কন্টেন্ট সংগ্রহ করা**: ডাটাবেস থেকে কন্টেন্ট নেওয়া অ্যাপ্লিকেশনগুলির জন্য, আন্তর্জাতিকীকরণ নিশ্চিত করে যে আপনি এই কন্টেন্ট একাধিক ভাষায় পরিবেশন করতে পারবেন। এটি ই-কমার্স সাইট বা কন্টেন্ট ম্যানেজমেন্ট সিস্টেমের মতো প্ল্যাটফর্মের জন্য অত্যন্ত গুরুত্বপূর্ণ যেখানে ব্যবহারকারীর পছন্দের ভাষায় পণ্যের বিবরণ, নিবন্ধ এবং অন্যান্য কন্টেন্ট প্রদর্শন করা প্রয়োজন।

- **বহুভাষিক ইমেল পাঠানো**: ট্রানজ্যাকশনাল ইমেল, মার্কেটিং ক্যাম্পেইন বা নোটিফিকেশন যাই হোক না কেন, প্রাপকের ভাষায় ইমেল পাঠানো এনগেজমেন্ট এবং কার্যকারিতা উল্লেখযোগ্যভাবে বৃদ্ধি করতে পারে।

- **বহুভাষিক পুশ নোটিফিকেশন**: মোবাইল অ্যাপ্লিকেশনের জন্য, ব্যবহারকারীর পছন্দের ভাষায় পুশ নোটিফিকেশন পাঠানো ইন্টারঅ্যাকশন এবং রিটেনশন বাড়াতে পারে। এই ব্যক্তিগত স্পর্শ নোটিফিকেশনগুলোকে আরও প্রাসঙ্গিক এবং কার্যকর মনে করতে সাহায্য করে।

- **অন্যান্য যোগাযোগ**: ব্যাকএন্ড থেকে যেকোনো ধরনের যোগাযোগ, যেমন এসএমএস বার্তা, সিস্টেম অ্যালার্ট বা ইউজার ইন্টারফেস আপডেট, ব্যবহারকারীর ভাষায় হলে তা স্বচ্ছতা নিশ্চিত করে এবং সামগ্রিক ব্যবহারকারীর অভিজ্ঞতা উন্নত করে।

ব্যাকএন্ড আন্তর্জাতিকীকরণের মাধ্যমে, আপনার অ্যাপ্লিকেশন কেবল সাংস্কৃতিক পার্থক্যকে সম্মানই করে না বরং বিশ্ববাজারের চাহিদার সাথে আরও ভালোভাবে সামঞ্জস্যপূর্ণ হয়, যা আপনার পরিষেবাগুলিকে বিশ্বব্যাপী ছড়িয়ে দেওয়ার একটি মূল পদক্ষেপ।

## শুরু করা (Getting Started)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub-এ [Application Template](https://github.com/aymericzip/intlayer-hono-template) দেখুন।

### ইনস্টলেশন (Installation)

`hono-intlayer` ব্যবহার শুরু করতে, npm ব্যবহার করে প্যাকেজটি ইনস্টল করুন:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### সেটআপ (Setup)

আপনার প্রজেক্ট রুটে একটি `intlayer.config.ts` তৈরি করে আন্তর্জাতিকীকরণ সেটিংস কনফিগার করুন:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### আপনার কন্টেন্ট ডিক্লেয়ার করুন (Declare Your Content)

অনুবাদ সংরক্ষণের জন্য আপনার কন্টেন্ট ডিক্লারেশন তৈরি এবং পরিচালনা করুন:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> আপনার কন্টেন্ট ডিক্লারেশন আপনার অ্যাপ্লিকেশনের যেকোনো জায়গায় ডিফাইন করা যেতে পারে যতক্ষণ না সেগুলো `contentDir` ডিরেক্টরিতে (ডিফল্টভাবে, `./src`) অন্তর্ভুক্ত থাকে এবং কন্টেন্ট ডিক্লারেশন ফাইল এক্সটেনশনের (ডিফল্টভাবে, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) সাথে মিল থাকে।

> আরও বিস্তারিত জানার জন্য, [কন্টেন্ট ডিক্লারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md) দেখুন।

### Hono অ্যাপ্লিকেশন সেটআপ (Hono Application Setup)

`hono-intlayer` ব্যবহার করতে আপনার Hono অ্যাপ্লিকেশন সেটআপ করুন:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// আন্তর্জাতিকীকরণ রিকোয়েস্ট হ্যান্ডলার লোড করুন
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// আন্তর্জাতিকীকরণ রিকোয়েস্ট হ্যান্ডলার লোড করুন
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t, getDictionary, getIntlayer } = require("hono-intlayer");
const dictionaryExample = require("./index.content");

const app = new Hono();

// আন্তর্জাতিকীকরণ রিকোয়েস্ট হ্যান্ডলার লোড করুন
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

module.exports = app;
```

### সামঞ্জস্যতা (Compatibility)

`hono-intlayer` এর সাথে পুরোপুরি সামঞ্জস্যপূর্ণ:

- React অ্যাপ্লিকেশনের জন্য [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/react-intlayer/index.md)
- Next.js অ্যাপ্লিকেশনের জন্য [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/next-intlayer/index.md)
- Vite অ্যাপ্লিকেশনের জন্য [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/vite-intlayer/index.md)

এটি ব্রাউজার এবং API রিকোয়েস্টসহ বিভিন্ন পরিবেশে যেকোনো আন্তর্জাতিকীকরণ সল্যুশনের সাথে নিরবিচ্ছিন্নভাবে কাজ করে। আপনি হেডার বা কুকির মাধ্যমে লোকাল শনাক্ত করতে মিডলওয়্যার কাস্টমাইজ করতে পারেন:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... অন্যান্য কনফিগারেশন অপশন
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... অন্যান্য কনফিগারেশন অপশন
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... অন্যান্য কনফিগারেশন অপশন
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

ডিফল্টভাবে, `hono-intlayer` ক্লায়েন্টের পছন্দের ভাষা নির্ধারণ করতে `Accept-Language` হেডার ব্যাখ্যা করবে।

> কনফিগারেশন এবং উন্নত বিষয় সম্পর্কে আরও তথ্যের জন্য, আমাদের [ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) ভিজিট করুন।

### TypeScript কনফিগার করুন (Configure TypeScript)

`hono-intlayer` আন্তর্জাতিকীকরণ প্রক্রিয়াকে উন্নত করতে TypeScript-এর শক্তিশালী সক্ষমতাকে কাজে লাগায়। TypeScript-এর স্ট্যাটিক টাইপিং নিশ্চিত করে যে প্রতিটি অনুবাদ কী (translation key) হিসাব করা হয়েছে, যা অনুবাদের ঘাটতির ঝুঁকি কমায় এবং রক্ষণাবেক্ষণযোগ্যতা উন্নত করে।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

নিশ্চিত করুন যে অটোজেনারেটেড টাইপগুলো (ডিফল্টভাবে `./types/intlayer.d.ts`-এ থাকে) আপনার `tsconfig.json` ফাইলে অন্তর্ভুক্ত আছে।

```json5 fileName="tsconfig.json"
{
  // ... আপনার বিদ্যমান TypeScript কনফিগারেশন
  "include": [
    // ... আপনার বিদ্যমান TypeScript কনফিগারেশন
    ".intlayer/**/*.ts", // অটো-জেনারেটেড টাইপগুলো অন্তর্ভুক্ত করুন
  ],
}
```

### VS Code এক্সটেনশন (VS Code Extension)

Intlayer-এর সাথে আপনার ডেভেলপমেন্ট অভিজ্ঞতা উন্নত করতে, আপনি অফিসিয়াল **Intlayer VS Code Extension** ইনস্টল করতে পারেন।

[VS Code Marketplace থেকে ইনস্টল করুন](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

এই এক্সটেনশনটি প্রদান করে:

- অনুবাদ কী-এর জন্য **Autocompletion**।
- অনুবাদের ঘাটতির জন্য **Real-time error detection**।
- অনুবাদিত কন্টেন্টের **Inline previews**।
- সহজে অনুবাদ তৈরি এবং আপডেট করার জন্য **Quick actions**।

এক্সটেনশনটি কীভাবে ব্যবহার করবেন সে সম্পর্কে আরও বিশদ বিবরণের জন্য, [Intlayer VS Code Extension ডকুমেন্টেশন](https://intlayer.org/doc/vs-code-extension) দেখুন।

### Git কনফিগারেশন (Git Configuration)

Intlayer দ্বারা জেনারেট করা ফাইলগুলোকে ইগনোর করার পরামর্শ দেওয়া হয়। এটি আপনাকে আপনার Git রিপোজিটরিতে সেগুলো কমিট করা এড়াতে সাহায্য করে।

এটি করতে, আপনি আপনার `.gitignore` ফাইলে নিম্নলিখিত নির্দেশাবলী যোগ করতে পারেন:

```plaintext fileName=".gitignore"
# Intlayer দ্বারা জেনারেট করা ফাইলগুলো ইগনোর করুন
.intlayer
```
