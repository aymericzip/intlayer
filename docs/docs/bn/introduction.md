---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: ভূমিকা
description: Intlayer কীভাবে কাজ করে তা জানুন। আপনার অ্যাপ্লিকেশনে Intlayer এর বিভিন্ন ধাপ দেখুন। বিভিন্ন প্যাকেজগুলি কী কাজ করে তা দেখুন।
keywords:
  - ভূমিকা
  - শুরু করা
  - Intlayer
  - অ্যাপ্লিকেশন
  - প্যাকেজ
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "ইতিহাস শুরু করা হয়েছে"
---

# Intlayer ডকুমেন্টেশন (Intlayer Documentation)

অফিসিয়াল Intlayer ডকুমেন্টেশনে আপনাকে স্বাগতম! এখানে আপনি আপনার সমস্ত আন্তর্জাতিকীকরণ (i18n) প্রয়োজনের জন্য Intlayer ইন্টিগ্রেট, কনফিগার এবং আয়ত্ত করার জন্য প্রয়োজনীয় সবকিছু পাবেন, আপনি Next.js, React, Vite, Express অথবা অন্য কোনো JavaScript পরিবেশে কাজ করছেন কিনা তা নির্বিশেষে।

## ভূমিকা (Introduction)

### Intlayer কী?

**Intlayer** হলো একটি আন্তর্জাতিকীকরণ লাইব্রেরি যা বিশেষভাবে JavaScript ডেভেলপারদের জন্য ডিজাইন করা হয়েছে। এটি আপনার কোডের যেকোনো জায়গায় আপনার কন্টেন্ট ঘোষণা করার অনুমতি দেয়। এটি বহুভাষিক কন্টেন্টের ঘোষণাকে আপনার কোডে সহজে ইন্টিগ্রেট করার জন্য স্ট্রাকচার্ড ডিকশনারিতে রূপান্তর করে। TypeScript ব্যবহারের মাধ্যমে, **Intlayer** আপনার ডেভেলপমেন্টকে আরও শক্তিশালী এবং দক্ষ করে তোলে।

Intlayer একটি ঐচ্ছিক ভিজ্যুয়াল এডিটরও প্রদান করে যা আপনাকে সহজেই আপনার কন্টেন্ট এডিট এবং পরিচালনা করতে দেয়। এই এডিটরটি বিশেষ করে সেই সব ডেভেলপারদের জন্য উপযোগী যারা কন্টেন্ট ম্যানেজমেন্টের জন্য একটি ভিজ্যুয়াল ইন্টারফেস পছন্দ করেন, অথবা সেই সব টিমের জন্য যারা কোড নিয়ে চিন্তা না করেই কন্টেন্ট জেনারেট করতে চান।

### ব্যবহারের উদাহরণ (Example of usage)

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## মূল বৈশিষ্ট্যসমূহ (Main Features)

Intlayer আধুনিক ওয়েব ডেভেলপমেন্টের চাহিদা মেটানোর জন্য তৈরি করা বিভিন্ন বৈশিষ্ট্য অফার করে। নিচে মূল বৈশিষ্ট্যসমূহ এবং প্রতিটির জন্য বিস্তারিত ডকুমেন্টেশনের লিঙ্ক দেওয়া হলো:

- **আন্তর্জাতিকীকরণ সমর্থন (Internationalization Support)**: আন্তর্জাতিকীকরণের জন্য বিল্ট-ইন সমর্থনের মাধ্যমে আপনার অ্যাপ্লিকেশনের গ্লোবাল রিচ বৃদ্ধি করুন।
- **ভিজ্যুয়াল এডিটর (Visual Editor)**: Intlayer এর জন্য ডিজাইন করা এডিটর প্লাগইনগুলির মাধ্যমে আপনার ডেভেলপমেন্ট ওয়ার্কফ্লো উন্নত করুন। [ভিজ্যুয়াল এডিটর গাইড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md) দেখুন।
- **কনফিগারেশনের নমনীয়তা (Configuration Flexibility)**: [কনফিগারেশন গাইড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md)-এ বর্ণিত বিস্তারিত কনফিগারেশন অপশনগুলির মাধ্যমে আপনার সেটআপ কাস্টমাইজ করুন।
- **অ্যাডভান্সড CLI টুলস (Advanced CLI Tools)**: Intlayer এর কমান্ড লাইন ইন্টারফেস ব্যবহার করে আপনার প্রোজেক্টগুলি দক্ষতার সাথে পরিচালনা করুন। [CLI টুলস ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/index.md)-এ ক্ষমতাগুলি অন্বেষণ করুন।

## মূল ধারণা (Core Concepts)

### ডিকশনারি (Dictionary)

সবকিছু সামঞ্জস্যপূর্ণ এবং রক্ষণাবেক্ষণযোগ্য রাখতে আপনার কোডের কাছাকাছি আপনার বহুভাষিক কন্টেন্ট সংগঠিত করুন।

- **[শুরু করা (Get Started)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md)**  
  Intlayer-এ আপনার কন্টেন্ট ঘোষণার প্রাথমিক বিষয়গুলি শিখুন।

- **[অনুবাদ (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/translation.md)**  
  কীভাবে অনুবাদ জেনারেট, সংরক্ষিত এবং আপনার অ্যাপ্লিকেশনে ব্যবহৃত হয় তা বুঝতে শিখুন।

- **[এনিমেরেশন (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/enumeration.md)**  
  বিভিন্ন ল্যাঙ্গুয়েজ জুড়ে বারবার ব্যবহৃত বা নির্দিষ্ট ডেটাসেট সহজে পরিচালনা করুন।

- **[শর্ত (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/condition.md)**  
  গতিশীল কন্টেন্ট তৈরি করতে Intlayer-এ কন্ডিশনাল লজিক কীভাবে ব্যবহার করবেন তা শিখুন।

- **[ইনসার্টেশন (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/insertion.md)**  
  ইনসার্টেশন প্লেসহোল্ডার ব্যবহার করে স্ট্রিংয়ে কীভাবে ভ্যালু ইনসার্ট করবেন তা আবিষ্কার করুন।

- **[ফাংশন ফেচিং (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/function_fetching.md)**  
  আপনার প্রোজেক্টের ওয়ার্কফ্লোর সাথে মিল রেখে কাস্টম লজিকের মাধ্যমে কীভাবে গতিশীলভাবে কন্টেন্ট ফেচ করবেন তা দেখুন।

- **[মার্কডাউন (Markdown)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/markdown.md)**  
  সমৃদ্ধ কন্টেন্ট তৈরি করতে Intlayer-এ কীভাবে মার্কডাউন ব্যবহার করবেন তা শিখুন।

- **[ফাইল এম্বেডিং (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/file.md)**  
  কন্টেন্ট এডিটরে ব্যবহারের জন্য Intlayer-এ এক্সটার্নাল ফাইলগুলি কীভাবে এম্বেড করবেন তা আবিষ্কার করুন।

- **[নেস্টিং (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/nesting.md)**  
  জটিল স্ট্রাকচার তৈরি করতে Intlayer-এ কন্টেন্ট কীভাবে নেস্ট করবেন তা বুঝুন।

### পরিবেশ এবং ইন্টিগ্রেশন (Environments & Integrations)

আমরা নমনীয়তার কথা মাথায় রেখে Intlayer তৈরি করেছি, যা জনপ্রিয় ফ্রেমওয়ার্ক এবং বিল্ড টুল জুড়ে নির্বিঘ্নে ইন্টিগ্রেট করা যায়:

- **[Next.js 16 এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_16.md)**
- **[Next.js 15 এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_15.md)**
- **[Next.js 14 এর সাথে Intlayer (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_14.md)**
- **[Next.js Page Router এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_page_router.md)**
- **[React CRA এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_create_react_app.md)**
- **[Vite + React এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+react.md)**
- **[React Router v7 এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_react_router_v7.md)**
- **[Tanstack Start এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_tanstack.md)**
- **[React Native এবং Expo এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_react_native+expo.md)**
- **[Lynx এবং React এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_lynx+react.md)**
- **[Vite + Preact এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+preact.md)**
- **[Vite + Vue এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+vue.md)**
- **[Nuxt এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nuxt.md)**
- **[Vite + Svelte এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+svelte.md)**
- **[SvelteKit এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_svelte_kit.md)**
- **[Express এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_express.md)**
- **[NestJS এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nestjs.md)**
- **[Hono এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_hono.md)**
- **[Angular এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_angular.md)**

প্রতিটি ইন্টিগ্রেশন গাইডে Intlayer-এর বৈশিষ্ট্যগুলি ব্যবহারের সেরা অনুশীলন অন্তর্ভুক্ত রয়েছে, যেমন **সার্ভার-সাইড রেন্ডারিং**, **গতিশীল রাউটিং**, অথবা **ক্লায়েন্ট-সাইড রেন্ডারিং**, যাতে আপনি একটি দ্রুত, SEO-ফ্রেন্ডলি এবং অত্যন্ত স্কেলেবল অ্যাপ্লিকেশন রক্ষণাবেক্ষণ করতে পারেন।

## অবদান এবং প্রতিক্রিয়া (Contributing & Feedback)

আমরা ওপেন-সোর্স এবং সম্প্রদায়-চালিত ডেভেলপমেন্টের শক্তিতে বিশ্বাস করি। আপনি যদি উন্নতির প্রস্তাব দিতে চান, একটি নতুন গাইড যোগ করতে চান, অথবা আমাদের ডক্সে কোনো সমস্যা সংশোধন করতে চান, তবে নির্দ্বिধায় একটি পুল রিকোয়েস্ট জমা দিন অথবা আমাদের [GitHub রিপোজিটরি](https://github.com/aymericzip/intlayer/blob/main/docs/docs)-এ একটি ইস্যু ওপেন করুন।

**আপনার অ্যাপ্লিকেশন আরও দ্রুত এবং আরও দক্ষতার সাথে অনুবাদ করতে প্রস্তুত?** আজই Intlayer ব্যবহার শুরু করতে আমাদের ডক্সে ডুব দিন। একটি শক্তিশালী, সুবিন্যস্ত আন্তর্জাতিকীকরণ পদ্ধতির অভিজ্ঞতা নিন যা আপনার কন্টেন্টকে সংগঠিত রাখে এবং আপনার টিমকে আরও বেশি প্রোডাক্টিভ করে তোলে।
