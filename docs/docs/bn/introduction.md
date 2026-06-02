---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: ভূমিকা
description: Intlayer কীভাবে কাজ করে তা আবিষ্কার করুন। আপনার অ্যাপ্লিকেশনে Intlayer যে পদক্ষেপগুলি ব্যবহার করে তা দেখুন। বিভিন্ন প্যাকেজগুলি কী করে তা জানুন।
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
    changes: "Init history"
---

# Intlayer ডকুমেন্টেশন

অফিসিয়াল Intlayer ডকুমেন্টেশনে আপনাকে স্বাগতম! এখানে আপনি আপনার সমস্ত আন্তর্জাতিকীকরণ (i18n) চাহিদার জন্য Intlayer কে সংহত (integrate), কনফিগার এবং আয়ত্ত করার জন্য প্রয়োজনীয় সবকিছু পাবেন, আপনি Next.js, React, Vite, Express বা অন্য কোনও জাভাস্ক্রিপ্ট পরিবেশে কাজ করুন না কেন।

## ভূমিকা

### Intlayer কী?

**Intlayer** হল একটি আন্তর্জাতিকীকরণ (internationalization) লাইব্রেরি যা বিশেষভাবে জাভাস্ক্রিপ্ট ডেভেলপারদের জন্য ডিজাইন করা হয়েছে। এটি আপনার কোডের যে কোনও জায়গায় আপনার সামগ্রী (content) ঘোষণা করার অনুমতি দেয়। এটি বহুভাষিক সামগ্রীর ঘোষণাকে কাঠামোগত অভিধানে (structured dictionaries) রূপান্তর করে যাতে সহজেই আপনার কোডে সংহত করা যায়। TypeScript ব্যবহার করে, **Intlayer** আপনার ডেভেলপমেন্টকে আরও শক্তিশালী এবং দক্ষ করে তোলে।

Intlayer একটি ঐচ্ছিক ভিজ্যুয়াল এডিটরও প্রদান করে যা আপনাকে সহজেই আপনার সামগ্রী সম্পাদনা এবং পরিচালনা করতে দেয়। এই এডিটরটি বিশেষত সেই ডেভেলপারদের জন্য দরকারী যারা সামগ্রী পরিচালনার জন্য একটি ভিজ্যুয়াল ইন্টারফেস পছন্দ করেন, বা এমন দলগুলির জন্য যারা কোড নিয়ে চিন্তা না করেই সামগ্রী তৈরি করেন।

### ব্যবহারের উদাহরণ

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      bn: "হ্যালো ওয়ার্ল্ড",
    }),
  },
} satisfies Dictionary;

export default componentContent;
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
        "es": "Hola Mundo",
        "bn": "হ্যালো ওয়ার্ল্ড"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### বিকল্পগুলির চেয়ে Intlayer কেন?

`next-intl` বা `i18next` এর মতো প্রধান সমাধানগুলির তুলনায়, Intlayer এমন একটি সমাধান যা সমন্বিত অপ্টিমাইজেশনের সাথে আসে যেমন:
<AccordionGroup>
<Accordion header="বান্ডিল সাইজ (Bundle size)">

আপনার পেজগুলিতে বিশাল JSON ফাইল লোড করার পরিবর্তে, শুধুমাত্র প্রয়োজনীয় সামগ্রী লোড করুন। Intlayer আপনার **বান্ডিল এবং পেজের আকার ৫০% পর্যন্ত কমাতে** সাহায্য করে।

</Accordion>
<Accordion header="রক্ষণাবেক্ষণযোগ্যতা (Maintainability)">

আপনার অ্যাপ্লিকেশনের বিষয়বস্তুকে স্কোপ করা বৃহৎ-স্কেল অ্যাপ্লিকেশনগুলির জন্য **রক্ষণাবেক্ষণ সহজ করে তোলে**। আপনার সম্পূর্ণ কন্টেন্ট কোডবেস পর্যালোচনা করার মানসিক বোঝা ছাড়াই আপনি একটি একক বৈশিষ্ট্য ফোল্ডার নকল বা মুছতে পারেন। উপরন্তু, আপনার সামগ্রীর যথার্থতা নিশ্চিত করতে Intlayer **সম্পূর্ণরূপে টাইপড (fully typed)**।

</Accordion>
<Accordion header="এআই এজেন্ট (AI Agent)">

বিষয়বস্তু সহ-অবস্থান (Co-locating content) লার্জ ল্যাঙ্গুয়েজ মডেল (LLMs) দ্বারা **প্রয়োজনীয় প্রসঙ্গ হ্রাস করে**। Intlayer অনুপস্থিত অনুবাদের পরীক্ষা করার জন্য **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/mcp_server.md)** এবং এআই এজেন্টদের জন্য ডেভেলপার অভিজ্ঞতা (DX) আরও মসৃণ করতে **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/agent_skills.md)** এর মতো সরঞ্জামগুলির একটি স্যুট নিয়ে আসে।

</Accordion>
<Accordion header="স্বয়ংক্রিয়করণ (Automation)">

আপনার এআই প্রদানকারীর খরচে আপনার পছন্দের LLM ব্যবহার করে আপনার CI/CD পাইপলাইনে অনুবাদ করার জন্য স্বয়ংক্রিয়করণ ব্যবহার করুন। Intlayer বিষয়বস্তু নিষ্কাশন স্বয়ংক্রিয় করতে একটি **কম্পাইলার (compiler)** এবং **ব্যাকগ্রাউন্ডে অনুবাদ** করতে সাহায্য করার জন্য একটি [ওয়েব প্ল্যাটফর্ম](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_CMS.md) অফার করে।

</Accordion>
<Accordion header="কর্মক্ষমতা (Performance)">

উপাদানগুলির (components) সাথে বিশাল JSON ফাইলগুলি সংযোগ করা কর্মক্ষমতা এবং প্রতিক্রিয়াশীলতা (reactivity) সমস্যাগুলির দিকে পরিচালিত করতে পারে। Intlayer বিল্ড টাইমে (build time) আপনার সামগ্রী লোড করা অপ্টিমাইজ করে।

</Accordion>
<Accordion header="নন-ডেভদের সাথে স্কেলিং (Scaling with non-dev)">

শুধুমাত্র একটি i18n সমাধানের চেয়ে বেশি, Intlayer আপনাকে **রিয়েল-টাইমে** আপনার বহুভাষিক সামগ্রী পরিচালনা করতে সহায়তা করার জন্য একটি **স্ব-হোস্টেড (self-hosted) [ভিজ্যুয়াল এডিটর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md)** এবং একটি **[সম্পূর্ণ CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_CMS.md)** প্রদান করে, যা অনুবাদক, কপিরাইটার এবং অন্যান্য দলের সদস্যদের সাথে সহযোগিতা নির্বিঘ্ন করে। সামগ্রী স্থানীয়ভাবে এবং/বা দূরবর্তীভাবে সংরক্ষণ করা যেতে পারে।

</Accordion>
</AccordionGroup>

## প্রধান বৈশিষ্ট্যসমূহ

Intlayer আধুনিক ওয়েব ডেভেলপমেন্টের চাহিদা মেটাতে বিভিন্ন বৈশিষ্ট্য প্রদান করে। নিচে প্রতিটি বৈশিষ্ট্যের জন্য বিস্তারিত ডকুমেন্টেশনের লিঙ্ক সহ মূল বৈশিষ্ট্যগুলি দেওয়া হলো:

- **আন্তর্জাতিকীকরণ সমর্থন**: আন্তর্জাতিকীকরণের জন্য অন্তর্নির্মিত সমর্থন দিয়ে আপনার অ্যাপ্লিকেশনের বিশ্বব্যাপী পৌঁছানো বাড়ান।
- **ভিজ্যুয়াল এডিটর**: Intlayer-এর জন্য ডিজাইন করা এডিটর প্লাগইনগুলির মাধ্যমে আপনার ডেভেলপমেন্ট ওয়ার্কফ্লো উন্নত করুন। [ভিজ্যুয়াল এডিটর গাইড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md) দেখুন।
- **কনফিগারেশন নমনীয়তা**: [কনফিগারেশন গাইড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md)-এ বিস্তারিত কনফিগারেশন বিকল্পগুলির সাথে আপনার সেটআপ কাস্টমাইজ করুন।
- **উন্নত CLI টুলস**: Intlayer-এর কমান্ড লাইন ইন্টারফেস ব্যবহার করে দক্ষতার সাথে আপনার প্রকল্পগুলি পরিচালনা করুন। [CLI টুলস ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/index.md)-এ সক্ষমতাগুলি অন্বেষণ করুন।

## মূল ধারণা

### অভিধান (Dictionary)

সবকিছু সামঞ্জস্যপূর্ণ এবং রক্ষণাবেক্ষণযোগ্য রাখতে আপনার বহুভাষিক সামগ্রী আপনার কোডের কাছাকাছি সংগঠিত করুন।

- **[শুরু করা (Get Started)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md)**  
  Intlayer-এ আপনার সামগ্রী ঘোষণা করার মূল বিষয়গুলি শিখুন।

- **[অনুবাদ (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/translation.md)**  
  আপনার অ্যাপ্লিকেশনে অনুবাদগুলি কীভাবে তৈরি, সংরক্ষণ এবং ব্যবহার করা হয় তা বুঝুন।

- **[গণনা (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/enumeration.md)**  
  বিভিন্ন ভাষায় পুনরাবৃত্ত বা নির্দিষ্ট ডেটাসেটগুলি সহজেই পরিচালনা করুন।

- **[শর্ত (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/condition.md)**  
  গতিশীল সামগ্রী তৈরি করতে Intlayer-এ শর্তযুক্ত যুক্তি ব্যবহার করা শিখুন।

- **[সন্নিবেশ (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/insertion.md)**  
  সন্নিবেশ প্লেসহোল্ডার ব্যবহার করে স্ট্রিংয়ে মান কীভাবে প্রবেশ করাবেন তা আবিষ্কার করুন।

- **[ফাংশন ফেচিং (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/function_fetching.md)**  
  আপনার প্রকল্পের ওয়ার্কফ্লো মেলাতে কাস্টম যুক্তির সাথে গতিশীলভাবে সামগ্রী কীভাবে আনতে হয় তা দেখুন।

- **[মার্কডাউন (Markdown)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/markdown.md)**  
  সমৃদ্ধ সামগ্রী তৈরি করতে Intlayer-এ মার্কডাউন কীভাবে ব্যবহার করবেন তা শিখুন।

- **[ফাইল এম্বেডিং (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/file.md)**  
  কন্টেন্ট এডিটরে ব্যবহার করার জন্য Intlayer-এ বহিরাগত ফাইলগুলি কীভাবে এম্বেড করবেন তা আবিষ্কার করুন।

- **[নেস্টিং (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/nesting.md)**  
  জটিল কাঠামো তৈরি করতে Intlayer-এ সামগ্রী কীভাবে নেস্ট করবেন তা বুঝুন।

### পরিবেশ এবং ইন্টিগ্রেশন

আমরা নমনীয়তা মাথায় রেখে Intlayer তৈরি করেছি, যা জনপ্রিয় ফ্রেমওয়ার্ক এবং বিল্ড টুলস জুড়ে বিরামবিহীন ইন্টিগ্রেশন প্রদান করে:

- **[Next.js 16 এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_16.md)**
- **[Next.js 15 এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (App Router) এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_14.md)**
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
- **[Angular এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_angular_21.md)**

প্রতিটি ইন্টিগ্রেশন গাইডে Intlayer-এর বৈশিষ্ট্যগুলি ব্যবহার করার জন্য সর্বোত্তম অনুশীলন (best practices) অন্তর্ভুক্ত রয়েছে, যেমন **সার্ভার-সাইড রেন্ডারিং (SSR)**, **ডায়নামিক রাউটিং**, বা **ক্লায়েন্ট-সাইড রেন্ডারিং**, যাতে আপনি একটি দ্রুত, SEO-বান্ধব এবং অত্যন্ত স্কেলেবল অ্যাপ্লিকেশন বজায় রাখতে পারেন।

## অবদান এবং প্রতিক্রিয়া

আমরা ওপেন-সোর্স এবং সম্প্রদায়-চালিত (community-driven) বিকাশের শক্তিকে মূল্য দিই। আপনি যদি উন্নতির প্রস্তাব দিতে চান, একটি নতুন গাইড যোগ করতে চান বা আমাদের ডকুমেন্টেশনে কোনো সমস্যা ঠিক করতে চান, তবে নির্দ্বিধায় একটি পুল রিকোয়েস্ট (Pull Request) জমা দিন বা আমাদের [GitHub রিপোজিটরিতে](https://github.com/aymericzip/intlayer/blob/main/docs/docs) একটি ইস্যু খুলুন।

**আপনার অ্যাপ্লিকেশনটি আরও দ্রুত এবং আরও দক্ষতার সাথে অনুবাদ করার জন্য প্রস্তুত?** আজই Intlayer ব্যবহার শুরু করতে আমাদের ডকুমেন্টেশনে ডুব দিন। আন্তর্জাতিকীকরণের জন্য একটি শক্তিশালী, সুশৃঙ্খল পদ্ধতির অভিজ্ঞতা নিন যা আপনার সামগ্রীকে সংগঠিত রাখে এবং আপনার দলকে আরও বেশি উৎপাদনশীল করে তোলে।
