---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - 2026 সালে একটি Fastify অ্যাপ কীভাবে অনুবাদ করবেন
description: কীভাবে আপনার Fastify ব্যাকএন্ডকে বহুভাষিক করবেন তা আবিষ্কার করুন। আন্তর্জাতিকীকরণ (i18n) এবং অনুবাদের জন্য ডকুমেন্টেশন অনুসরণ করুন।
keywords:
  - আন্তর্জাতিকীকরণ
  - ডকুমেন্টেশন
  - Intlayer
  - Fastify
  - JavaScript
  - ব্যাকএন্ড
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "init কমান্ড যোগ করা হয়েছে"
  - version: 7.6.0
    date: 2025-12-31
    changes: "ইতিহাস শুরু করা হয়েছে"
---

# Intlayer ব্যবহার করে আপনার Fastify ব্যাকএন্ড ওয়েবসাইট অনুবাদ করুন | আন্তর্জাতিকীকরণ (i18n)

`fastify-intlayer` হল Fastify অ্যাপ্লিকেশনের জন্য একটি শক্তিশালী আন্তর্জাতিকীকরণ (i18n) প্লাগইন, যা ক্লায়েন্টের পছন্দের উপর ভিত্তি করে স্থানীয়করণ করা প্রতিক্রিয়া প্রদান করে আপনার ব্যাকএন্ড পরিষেবাগুলিকে বিশ্বব্যাপী অ্যাক্সেসযোগ্য করার জন্য ডিজাইন করা হয়েছে।

> GitHub-এ প্যাকেজটির বাস্তবায়ন দেখুন: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### ব্যবহারিক কেসসমূহ

- **ব্যবহারকারীর ভাষায় ব্যাকএন্ড ত্রুটি প্রদর্শন করা**: যখন কোনো ত্রুটি ঘটে, ব্যবহারকারীর মাতৃভাষায় বার্তা প্রদর্শন করলে তা তাদের বুঝতে সুবিধা হয় এবং বিরক্তি কমায়। এটি বিশেষ করে ডায়নামিক ত্রুটি বার্তার জন্য উপযোগী যা ফ্রন্ট-এন্ড কম্পোনেন্ট যেমন টোস্ট বা মডালে প্রদর্শিত হতে পারে।
- **বহুভাষিক কন্টেন্ট পুনরুদ্ধার**: যেসব অ্যাপ ডাটাবেস থেকে কন্টেন্ট গ্রহণ করে, তাদের জন্য আন্তর্জাতিকীকরণ নিশ্চিত করে যে আপনি একাধিক ভাষায় সেই কন্টেন্ট পরিবেশন করতে পারবেন। এটি ই-কমার্স সাইট বা কন্টেন্ট ম্যানেজমেন্ট সিস্টেমের মতো প্ল্যাটফর্মগুলোর জন্য অত্যন্ত গুরুত্বপূর্ণ যেখানে ব্যবহারকারীর পছন্দের ভাষায় পণ্যের বিবরণ, নিবন্ধ এবং অন্যান্য কন্টেন্ট প্রদর্শন করতে হয়।
- **বহুভাষিক ইমেল পাঠানো**: তা লেনদেনের ইমেল হোক, মার্কেটিং ক্যাম্পেইন হোক বা বিজ্ঞপ্তি, প্রাপকের ভাষায় ইমেল পাঠানো এনগেজমেন্ট এবং কার্যকারিতা উল্লেখযোগ্যভাবে বাড়িয়ে দিতে পারে।
- **বহুভাষিক পুশ বিজ্ঞপ্তি**: মোবাইল অ্যাপ্লিকেশনের জন্য ব্যবহারকারীর পছন্দের ভাষায় পুশ বিজ্ঞপ্তি পাঠানো ইন্টারঅ্যাকশন এবং রিটেনশন বাড়াতে পারে। এই ব্যক্তিগত ছোঁয়া বিজ্ঞপ্তিগুলোকে আরও প্রাসঙ্গিক করে তোলে।
- **অন্যান্য যোগাযোগ**: ব্যাকএন্ড থেকে যেকোনো ধরনের যোগাযোগ, যেমন এসএমএস বার্তা, সিস্টেম অ্যালার্ট বা ইউজার ইন্টারফেস আপডেট, ব্যবহারকারীর ভাষায় হলে তা স্পষ্টতা নিশ্চিত করে এবং সামগ্রিক ব্যবহারকারীর অভিজ্ঞতা উন্নত করে।

ব্যাকএন্ডকে আন্তর্জাতিকীকরণ করার মাধ্যমে, আপনার অ্যাপ্লিকেশন কেবল সাংস্কৃতিক পার্থক্যকে সম্মান করে না বরং বিশ্ববাজারের প্রয়োজনের সাথে আরও ভালভাবে খাপ খাইয়ে নেয়, যা বিশ্বব্যাপী আপনার পরিষেবাগুলিকে প্রসারিত করার একটি মূল পদক্ষেপ।

## শুরু করা

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer ব্যবহার করে কীভাবে আপনার অ্যাপ্লিকেশন আন্তর্জাতিকীকরণ করবেন"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub-এ [অ্যাপ্লিকেশন টেমপ্লেট](https://github.com/aymericzip/intlayer-fastify-template) দেখুন।

### ইনস্টলেশন

`fastify-intlayer` ব্যবহার শুরু করতে, npm ব্যবহার করে প্যাকেজটি ইনস্টল করুন:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bun x intlayer init

```

### কনফিগারেশন

আপনার প্রজেক্টের রুট ডিরেক্টরিতে একটি `intlayer.config.ts` ফাইল তৈরি করে আন্তর্জাতিকীকরণ সেটিংস কনফিগার করুন:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### আপনার কন্টেন্ট ঘোষণা করুন

অনুবাদ জমা করার জন্য আপনার কন্টেন্ট ডিক্লারেশন তৈরি করুন এবং ম্যানেজ করুন:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de কন্টেন্ট devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
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
        "es-MX": "Ejemplo de কন্টেন্ট devuelto en español (México)"
      }
    }
  }
}
```

> আপনার কন্টেন্ট ডিক্লারেশনগুলো অ্যাপ্লিকেশনের যেকোনো জায়গায় ডিফাইন করা যেতে পারে যদি সেগুলো `contentDir` ডিরেক্টরিতে (ডিফল্টভাবে `./src`) অন্তর্ভুক্ত থাকে। এবং অবশ্যই কন্টেন্ট ডিক্লারেশন ফাইল এক্সটেনশনের সাথে মিল থাকতে হবে (ডিফল্টভাবে `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> আরও বিস্তারিত জানতে, দেখুন [কন্টেন্ট ডিক্লারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md)।

### Fastify অ্যাপ্লিকেশন সেটআপ

`fastify-intlayer` ব্যবহার করতে আপনার Fastify অ্যাপ্লিকেশনটি সেটআপ করুন:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// আন্তর্জাতিকীকরণ প্লাগইন লোড করুন
await fastify.register(intlayer);

// রাউটস
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de কন্টেন্ট devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// সার্ভার স্টার্ট করুন
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### সামঞ্জস্যতা

`fastify-intlayer` নিচের গুলোর সাথে সম্পূর্ণ সামঞ্জস্যপূর্ণ:

- রিঅ্যাক্ট অ্যাপ্লিকেশনের জন্য [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/react-intlayer/index.md)
- নেক্সট জেএস অ্যাপ্লিকেশনের জন্য [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/next-intlayer/index.md)
- ভাইট অ্যাপ্লিকেশনের জন্য [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/vite-intlayer/index.md)

এটি ব্রাউজার এবং এপিআই রিকোয়েস্ট সহ বিভিন্ন পরিবেশে যেকোনো আন্তর্জাতিকীকরণ সলিউশনের সাথে নির্বিঘ্নে কাজ করে। আপনি হেডার বা কুকির মাধ্যমে লোকেল শনাক্ত করতে মিডলওয়্যারটি কাস্টমাইজ করতে পারেন:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

ডিফল্টভাবে, `fastify-intlayer` ক্লায়েন্টের পছন্দের ভাষা নির্ধারণ করতে `Accept-Language` হেডার ব্যাখ্যা করবে।

> কনফিগারেশন এবং উন্নত বিষয় সম্পর্কে আরও তথ্যের জন্য আমাদের [ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) ভিজিট করুন।

### TypeScript কনফিগার করা

`fastify-intlayer` আন্তর্জাতিকীকরণ প্রক্রিয়া উন্নত করতে TypeScript-এর শক্তিশালী সক্ষমতা ব্যবহার করে। TypeScript-এর স্ট্যাটিক টাইপিং নিশ্চিত করে যে প্রতিটি অনুবাদ কী বিবেচনায় নেওয়া হয়েছে, যা অনুবাদের ঘাটতির ঝুঁকি কমায় এবং রক্ষণাবেক্ষণযোগ্যতা উন্নত করে।

অটো-জেনারেটেড টাইপগুলো (ডিফল্টভাবে ./types/intlayer.d.ts-এ) আপনার tsconfig.json ফাইলে অন্তর্ভুক্ত করা হয়েছে কিনা তা নিশ্চিত করুন।

```json5 fileName="tsconfig.json"
{
  // ... আপনার বিদ্যমান TypeScript কনফিগারেশন
  "include": [
    // ... আপনার বিদ্যমান TypeScript কনফিগারেশন
    ".intlayer/**/*.ts", // অটো-জেনারেটেড টাইপগুলো অন্তর্ভুক্ত করুন
  ],
}
```

### VS Code এক্সটেনশন

ইন্টলেয়ারের সাথে আপনার ডেভেলপমেন্ট অভিজ্ঞতা উন্নত করতে, আপনি অফিসিয়াল **Intlayer VS Code Extension** ইনস্টল করতে পারেন।

[VS Code Marketplace থেকে ইনস্টল করুন](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

এই এক্সটেনশনটি প্রদান করে:

- অনুবাদ কী-এর জন্য **অটো-কমপ্লিশন**।
- অনুবাদের ঘাটতির জন্য **রিয়েল-টাইম ত্রুটি শনাক্তকরণ**।
- অনুবাদিত কন্টেন্টের **ইনলাইন প্রিভিউ**।
- সহজে অনুবাদ তৈরি এবং আপডেট করার জন্য **কুইক অ্যাকশন**।

এক্সটেনশন ব্যবহারের আরও বিস্তারিত জানতে, দেখুন [ইন্টলেয়ার ভিএস কোড এক্সটেনশন ডকুমেন্টেশন](https://intlayer.org/doc/vs-code-extension)।

### Git কনফিগারেশন

ইন্টলেয়ার দ্বারা জেনারেট করা ফাইলগুলো উপেক্ষা করার পরামর্শ দেওয়া হয়। এটি আপনাকে আপনার Git রিপোজিটরিতে সেগুলো কমিট করা থেকে বিরত রাখতে দেয়।

এর জন্য, আপনি আপনার `.gitignore` ফাইলে নিচের নির্দেশাবলী যোগ করতে পারেন:

```plaintext fileName=".gitignore"
# ইন্টলেয়ার দ্বারা জেনারেট করা ফাইলগুলো উপেক্ষা করুন
.intlayer

```
