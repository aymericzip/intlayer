---
createdAt: 2025-08-23
updatedAt: 2026-06-29
title: Intlayer CMS | আপনার কন্টেন্ট Intlayer CMS-এ এক্সটার্নালাইজ করুন
description: আপনার টিমের কাছে কন্টেন্ট ম্যানেজমেন্ট অর্পণ করতে Intlayer CMS-এ আপনার কন্টেন্ট এক্সটার্নালাইজ করুন।
keywords:
  - CMS
  - Visual Editor
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-06-30
    changes: "সেলফ-হোস্টিং বিভাগ যোগ করুন: Docker Compose বুটস্ট্র্যাপ, সার্ভিস ইনভেন্টরি, SDK কনফিগারেশন, ঐচ্ছিক বৈশিষ্ট্য, এবং আপগ্রেড নোট"
  - version: 9.0.0
    date: 2026-06-29
    changes: "প্রোগ্রামাটিক CMS অ্যাক্সেসের জন্য @intlayer/api SDK (createIntlayerCMS) বিভাগ যোগ করুন"
  - version: 6.0.1
    date: 2025-09-22
    changes: "লাইভ সিঙ্ক ডকুমেন্টেশন যোগ করুন"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` ফিল্ড `liveSync` দিয়ে প্রতিস্থাপন করুন"
  - version: 5.5.10
    date: 2025-06-29
    changes: "ইতিহাস শুরু করুন"
author: aymericzip
---

# Intlayer Content Management System (CMS) ডকুমেন্টেশন

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS একটি অ্যাপ্লিকেশন যা আপনাকে একটি Intlayer প্রজেক্টের কন্টেন্ট এক্সটার্নালাইজ করার সুযোগ দেয়।

এর জন্য, Intlayer 'দূরবর্তী ডিকশনারি' ধারণাটি প্রবর্তন করে।

![Intlayer CMS ইন্টারফেস](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## বিষয়বস্তু সূচি

<TOC/>

---

## দূরবর্তী ডিকশনারি বোঝা

Intlayer 'স্থানীয়' এবং 'দূরবর্তী' ডিকশনারির মধ্যে পার্থক্য করে।

- একটি 'স্থানীয়' ডিকশনারি হল এমন একটি ডিকশনারি যা আপনার Intlayer প্রজেক্টে ঘোষণা করা হয়। যেমন একটি বাটনের ডিক্লারেশন ফাইল বা আপনার নেভিগেশন বার। এই ক্ষেত্রে কন্টেন্ট এক্সটার্নালাইজ করার কোনো অর্থ নেই কারণ এই কন্টেন্ট প্রায়শই পরিবর্তন হওয়ার কথা নয়।

- একটি 'দূরবর্তী' ডিকশনারি হল এমন একটি ডিকশনারি যা Intlayer CMS-এর মাধ্যমে পরিচালিত হয়। এটি আপনার টিমকে সরাসরি আপনার ওয়েবসাইটে কন্টেন্ট পরিচালনা করার অনুমতি দিতে এবং A/B পরীক্ষা বৈশিষ্ট্য ও SEO স্বয়ংক্রিয় অপ্টিমাইজেশন ব্যবহার করার লক্ষ্যে কার্যকর হতে পারে।

## ভিজ্যুয়াল এডিটর বনাম CMS

[Intlayer ভিজ্যুয়াল](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md) এডিটর হল একটি টুল যা আপনাকে স্থানীয় ডিকশনারির জন্য একটি ভিজ্যুয়াল এডিটরে কন্টেন্ট পরিচালনা করার সুযোগ দেয়। একবার পরিবর্তন করা হলে, কোডবেসে কন্টেন্ট প্রতিস্থাপিত হবে। এর অর্থ হল অ্যাপ্লিকেশনটি পুনর্নির্মাণ হবে এবং নতুন কন্টেন্ট প্রদর্শন করতে পেজটি পুনরায় লোড হবে।

বিপরীতে, Intlayer CMS হল একটি টুল যা আপনাকে দূরবর্তী ডিকশনারির জন্য একটি ভিজ্যুয়াল এডিটরে কন্টেন্ট পরিচালনা করার সুযোগ দেয়। একবার পরিবর্তন করা হলে, কন্টেন্ট আপনার কোডবেসকে **প্রভাবিত করবে না**। এবং ওয়েবসাইটটি স্বয়ংক্রিয়ভাবে পরিবর্তিত কন্টেন্ট প্রদর্শন করবে।

## ইন্টিগ্রেট করা

প্যাকেজটি কীভাবে ইন্সটল করতে হয় সে সম্পর্কে আরো বিস্তারিত জানতে, নীচের প্রাসঙ্গিক বিভাগটি দেখুন:

### Next.js-এর সাথে ইন্টিগ্রেট করা

Next.js-এর সাথে ইন্টিগ্রেশনের জন্য, [সেটআপ গাইড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_15.md) দেখুন।

### Create React App-এর সাথে ইন্টিগ্রেট করা

Create React App-এর সাথে ইন্টিগ্রেশনের জন্য, [সেটআপ গাইড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_create_react_app.md) দেখুন।

### Vite + React-এর সাথে ইন্টিগ্রেট করা

Vite + React-এর সাথে ইন্টিগ্রেশনের জন্য, [সেটআপ গাইড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+react.md) দেখুন।

## কনফিগারেশন

Intlayer CMS-এ লগইন করতে নিম্নলিখিত কমান্ড চালান:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

এটি প্রমাণীকরণ প্রক্রিয়া সম্পন্ন করতে এবং Intlayer পরিষেবাগুলি ব্যবহার করার জন্য প্রয়োজনীয় ক্রেডেনশিয়াল (Client ID এবং Client Secret) পেতে আপনার ডিফল্ট ব্রাউজার খুলবে।

আপনার Intlayer কনফিগারেশন ফাইলে, আপনি CMS সেটিংস কাস্টমাইজ করতে পারেন:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... অন্যান্য কনফিগারেশন সেটিংস
  editor: {
    /**
     * প্রয়োজনীয়
     *
     * অ্যাপ্লিকেশনের URL।
     * এটি ভিজ্যুয়াল এডিটর দ্বারা লক্ষ্য করা URL।
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * প্রয়োজনীয়
     *
     * এডিটর সক্রিয় করতে Client ID এবং client secret প্রয়োজন।
     * এগুলি কন্টেন্ট সম্পাদনাকারী ব্যবহারকারীকে চিহ্নিত করতে দেয়।
     * Intlayer Dashboard - Projects-এ একটি নতুন ক্লায়েন্ট তৈরি করে এগুলি পাওয়া যায় (https://app.intlayer.org/projects)।
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * ঐচ্ছিক
     *
     * আপনি যদি Intlayer CMS সেলফ-হোস্ট করেন, তাহলে CMS-এর URL সেট করতে পারেন।
     *
     * Intlayer CMS-এর URL।
     * ডিফল্টরূপে, এটি https://intlayer.org-এ সেট করা হয়
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * ঐচ্ছিক
     *
     * আপনি যদি Intlayer CMS সেলফ-হোস্ট করেন, তাহলে ব্যাকএন্ডের URL সেট করতে পারেন।
     *
     * Intlayer CMS-এর URL।
     * ডিফল্টরূপে, এটি https://back.intlayer.org-এ সেট করা হয়
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> যদি আপনার কাছে client ID এবং client secret না থাকে, তাহলে [Intlayer Dashboard - Projects](https://app.intlayer.org/projects)-এ একটি নতুন ক্লায়েন্ট তৈরি করে সেগুলি পেতে পারেন।

> সমস্ত উপলব্ধ প্যারামিটার দেখতে, [কনফিগারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) দেখুন।

## CMS ব্যবহার করা

### আপনার কনফিগারেশন পুশ করুন

Intlayer CMS কনফিগার করতে, আপনি [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/bn/cli/index.md) কমান্ডগুলি ব্যবহার করতে পারেন।

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> যদি আপনি আপনার `intlayer.config.ts` কনফিগারেশন ফাইলে পরিবেশ ভেরিয়েবল ব্যবহার করেন, তাহলে `--env` আর্গুমেন্ট ব্যবহার করে পছন্দসই পরিবেশ নির্দিষ্ট করতে পারেন:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

এই কমান্ডটি আপনার কনফিগারেশন Intlayer CMS-এ আপলোড করে।

### একটি ডিকশনারি পুশ করুন

আপনার লোকেল ডিকশনারিগুলিকে দূরবর্তী ডিকশনারিতে রূপান্তর করতে, আপনি [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/bn/cli/index.md) কমান্ডগুলি ব্যবহার করতে পারেন।

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> যদি আপনি আপনার `intlayer.config.ts` কনফিগারেশন ফাইলে পরিবেশ ভেরিয়েবল ব্যবহার করেন, তাহলে `--env` আর্গুমেন্ট ব্যবহার করে পছন্দসই পরিবেশ নির্দিষ্ট করতে পারেন:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

এই কমান্ডটি আপনার প্রাথমিক কন্টেন্ট ডিকশনারিগুলি আপলোড করে, সেগুলিকে Intlayer প্ল্যাটফর্মের মাধ্যমে অ্যাসিঙ্ক্রোনাস ফেচিং এবং এডিটিংয়ের জন্য উপলব্ধ করে।

### ডিকশনারি সম্পাদনা করুন

তারপর আপনি [Intlayer CMS](https://app.intlayer.org/content)-এ আপনার ডিকশনারি দেখতে এবং পরিচালনা করতে পারবেন।

## `@intlayer/api` SDK-এর সাথে প্রোগ্রামাটিক অ্যাক্সেস

CLI এবং ভিজ্যুয়াল এডিটরের বাইরে, Intlayer [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api) প্যাকেজে একটি টাইপড SDK শিপ করে। এটি আপনাকে CMS-কে একটি **হেডলেস কন্টেন্ট ডেটাবেস** হিসেবে ব্যবহার করতে দেয়: আপনি আপনার নিজের অ্যাপ্লিকেশন, স্ক্রিপ্ট, বা CI পাইপলাইন থেকে সরাসরি প্রজেক্ট আনতে, ডিকশনারি আনতে, এবং সেগুলি পুশ বা আপডেট করতে পারেন।

SDK আপনার জন্য প্রমাণীকরণ পরিচালনা করে। যতক্ষণ আপনার `clientId` এবং `clientSecret` উপলব্ধ থাকে (আপনার Intlayer কনফিগারেশনে বা পরিবেশে), এটি স্বয়ংক্রিয়ভাবে একটি OAuth2 অ্যাক্সেস টোকেন পায় এবং রিফ্রেশ করে এবং প্রতিটি অনুরোধে স্বাক্ষর করে।

### ইন্সটলেশন

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### এটি কীভাবে কাজ করে: অথেনটিকেটর + এন্ডপয়েন্ট

SDK ইচ্ছাকৃতভাবে **দুটি আলাদা ইম্পোর্টে** বিভক্ত, আপনার বান্ডেল ছোট রাখতে:

১। `createIntlayerCMS` — একটি হালকা **অথেনটিকেটর** তৈরি করে। এটি শুধুমাত্র ক্রেডেনশিয়াল এবং পরিচালিত অ্যাক্সেস টোকেন বহন করে; এটি কোনো নির্দিষ্ট ডোমেইন সম্পর্কে কিছু জানে না।
২। `dictionaryEndpoint`, `projectEndpoint`, … — প্রতি-ডোমেইন **এন্ডপয়েন্ট বাইন্ডার**, প্রতিটি তার নিজস্ব সাবপাথ থেকে ইম্পোর্ট করা হয় (`@intlayer/api/dictionary`, `@intlayer/api/project`, …)। আপনি প্রয়োজনীয় এন্ডপয়েন্টে অথেনটিকেটর পাস করেন।

যেহেতু প্রতিটি এন্ডপয়েন্ট আলাদাভাবে ইম্পোর্ট করা হয়, আপনার বান্ডেলে শুধুমাত্র আপনার ব্যবহৃত ডোমেইনগুলি অন্তর্ভুক্ত হয় — `dictionaryEndpoint` ইম্পোর্ট করলে কখনই project, AI, বা অন্য কোনো ডোমেইন ক্লায়েন্ট টেনে আনে না।

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// কনফিগারেশন ঐচ্ছিক: বাদ দিলে, ক্রেডেনশিয়াল
// `@intlayer/config/built` থেকে পড়া হয়, যা INTLAYER_CLIENT_ID এবং
// INTLAYER_CLIENT_SECRET পরিবেশ ভেরিয়েবল রিজলভ করে।
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> CMS ক্রেডেনশিয়াল (`clientId` / `clientSecret`) আপনার কন্টেন্টে **লেখার অ্যাক্সেস** প্রদান করে। অথেনটিকেটর সর্বদা **সার্ভার সাইডে** (server actions, route handlers, scripts, CI) তৈরি করুন। কখনই এটি ক্লায়েন্ট-সাইড কোডে ইম্পোর্ট করবেন না বা আপনার ক্রেডেনশিয়াল ব্রাউজারে এক্সপোজ করবেন না।

যদি আপনি বিল্ড-টাইম কনফিগারেশনের উপর নির্ভর না করতে চান, তাহলে স্পষ্টভাবে ক্রেডেনশিয়াল পাস করুন:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // ঐচ্ছিক, সেলফ-হোস্টেড ব্যাকএন্ডের জন্য:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> [Intlayer Dashboard - Projects](https://app.intlayer.org/projects)-এ একটি নতুন অ্যাক্সেস কী তৈরি করে আপনার ক্রেডেনশিয়াল পান।

### প্রজেক্ট আনুন

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// আপনার ক্রেডেনশিয়াল দিয়ে অ্যাক্সেসযোগ্য প্রজেক্টগুলির তালিকা করুন
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// নির্বাচিত প্রজেক্টের সমষ্টিগত লোকালাইজেশন ইনসাইট পড়ুন
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### ডিকশনারি আনুন

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// প্রজেক্টের প্রতিটি দূরবর্তী ডিকশনারির তালিকা করুন
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// অথবা কী দ্বারা একটি একক ডিকশনারি পান
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### ডিকশনারি পুশ ও আপডেট করুন

কন্টেন্ট ফিরিয়ে লিখতে CMS-কে ডেটাবেস হিসেবে ব্যবহার করুন:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// একটি নতুন ডিকশনারি তৈরি করুন
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// একটি ব্যাচ ডিকশনারি আপসার্ট করুন (একটি কলে তৈরি বা আপডেট করুন)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// একটি বিদ্যমান ডিকশনারি আপডেট করুন
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> পরামর্শ: নিজেকে পুনরাবৃত্তি এড়াতে বাউন্ড এন্ডপয়েন্ট পুনর্ব্যবহার করুন:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### একটি একক মেথড এক্সট্র্যাক্ট করা

প্রতিটি এন্ডপয়েন্ট মেথড ইতিমধ্যে প্রমাণীকৃত এবং স্বতন্ত্র (এটি নিজের টোকেন হ্যান্ডলিং বহন করে), তাই আপনি একটি এক্সট্র্যাক্ট করে পাস করতে পারেন — উদাহরণস্বরূপ একটি নির্ভরতা হিসেবে ইনজেক্ট করতে:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// ইতিমধ্যে প্রমাণীকৃত — প্রতিটি কলে স্বয়ংক্রিয়ভাবে টোকেন রিফ্রেশ করে
export const pushDictionaries = dictionary.pushDictionaries;

// ব্যবহার
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## লাইভ সিঙ্ক

লাইভ সিঙ্ক আপনার অ্যাপকে রানটাইমে CMS কন্টেন্ট পরিবর্তন প্রতিফলিত করতে দেয়। পুনর্নির্মাণ বা পুনরায় স্থাপনার প্রয়োজন নেই। সক্রিয় হলে, আপডেটগুলি একটি লাইভ সিঙ্ক সার্ভারে স্ট্রিম করা হয় যা আপনার অ্যাপ্লিকেশন পড়া ডিকশনারিগুলি রিফ্রেশ করে।

আপনার Intlayer কনফিগারেশন আপডেট করে লাইভ সিঙ্ক সক্রিয় করুন:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... অন্যান্য কনফিগারেশন সেটিংস
  editor: {
    /**
     * পরিবর্তন সনাক্ত হলে লোকেল কনফিগারেশনের হট রিলোডিং সক্রিয় করে।
     * উদাহরণস্বরূপ, যখন একটি ডিকশনারি যোগ বা আপডেট করা হয়, অ্যাপ্লিকেশনটি
     * পেজে প্রদর্শিত কন্টেন্ট আপডেট করে।
     *
     * কারণ হট রিলোডিংয়ের জন্য সার্ভারের সাথে একটি ক্রমাগত সংযোগ প্রয়োজন,
     * এটি শুধুমাত্র `enterprise` প্ল্যানের ক্লায়েন্টদের জন্য উপলব্ধ।
     *
     * ডিফল্ট: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * ডিকশনারি কীভাবে ইম্পোর্ট করা হয় তা নিয়ন্ত্রণ করে:
     *
     * - "fetch": ডিকশনারিগুলি লাইভ সিঙ্ক API ব্যবহার করে ডায়নামিকভাবে ফেচ করা হয়।
     *   useIntlayer কে useDictionaryDynamic দিয়ে প্রতিস্থাপন করে।
     *
     * নোট: লাইভ মোড ডিকশনারি ফেচ করতে লাইভ সিঙ্ক API ব্যবহার করে। API কল
     * ব্যর্থ হলে, ডিকশনারিগুলি ডায়নামিকভাবে ইম্পোর্ট করা হয়।
     * নোট: শুধুমাত্র দূরবর্তী কন্টেন্ট এবং "live" ফ্ল্যাগযুক্ত ডিকশনারিগুলি লাইভ মোড ব্যবহার করে।
     * অন্যগুলি পারফরম্যান্সের জন্য ডায়নামিক মোড ব্যবহার করে।
     */
    importMode: "fetch",
  },
};

export default config;
```

আপনার অ্যাপ্লিকেশন র‍্যাপ করতে লাইভ সিঙ্ক সার্ভার শুরু করুন:

স্বতন্ত্র সার্ভার ব্যবহার করার উদাহরণ:

```json5 fileName="package.json"
{
  "scripts": {
    // ... অন্যান্য স্ক্রিপ্ট
    "live:start": "npx intlayer live",
  },
}
```

আপনি `--process` আর্গুমেন্ট ব্যবহার করে আপনার অ্যাপ্লিকেশন সার্ভার সমান্তরালে ব্যবহার করতে পারেন।

Next.js ব্যবহার করার উদাহরণ:

```json5 fileName="package.json"
{
  "scripts": {
    // ... অন্যান্য স্ক্রিপ্ট
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Vite ব্যবহার করার উদাহরণ:

```json5 fileName="package.json"
{
  "scripts": {
    // ... অন্যান্য স্ক্রিপ্ট
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

লাইভ সিঙ্ক সার্ভার আপনার অ্যাপ্লিকেশন র‍্যাপ করে এবং আসার সাথে সাথে আপডেট করা কন্টেন্ট স্বয়ংক্রিয়ভাবে প্রয়োগ করে।

CMS থেকে পরিবর্তন বিজ্ঞপ্তি পেতে, লাইভ সিঙ্ক সার্ভার ব্যাকএন্ডে একটি SSE সংযোগ বজায় রাখে। CMS-এ কন্টেন্ট পরিবর্তন হলে, ব্যাকএন্ড লাইভ সিঙ্ক সার্ভারে আপডেট ফরোয়ার্ড করে, যা নতুন ডিকশনারি লেখে। আপনার অ্যাপ্লিকেশন পরবর্তী নেভিগেশন বা ব্রাউজার রিলোডে আপডেট প্রতিফলিত করবে, কোনো পুনর্নির্মাণ ছাড়াই।

ফ্লো চার্ট (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![লাইভ সিঙ্ক ফ্লো CMS/Backend/Live Sync Server/Application Server/Frontend স্কিমা](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

এটি কীভাবে কাজ করে:

![লাইভ সিঙ্ক লজিক স্কিমা](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

### ডেভেলপমেন্ট ওয়ার্কফ্লো (স্থানীয়)

- ডেভেলপমেন্টে, সমস্ত দূরবর্তী ডিকশনারি অ্যাপ্লিকেশন শুরু হলে ফেচ করা হয়, তাই আপনি দ্রুত আপডেট পরীক্ষা করতে পারেন।
- Next.js-এর সাথে স্থানীয়ভাবে লাইভ সিঙ্ক পরীক্ষা করতে, আপনার dev সার্ভার র‍্যাপ করুন:

```json5 fileName="package.json"
{
  "scripts": {
    // ... অন্যান্য স্ক্রিপ্ট
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Vite-এর জন্য
  },
}
```

ডেভেলপমেন্টের সময় Intlayer লাইভ ইম্পোর্ট ট্রান্সফর্মেশন প্রয়োগ করে তা নিশ্চিত করতে অপ্টিমাইজেশন সক্রিয় করুন:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true, // ডিফল্ট: process.env.NODE_ENV === 'production'
  },
};

export default config;
```

এই সেটআপ আপনার dev সার্ভারকে লাইভ সিঙ্ক সার্ভার দিয়ে র‍্যাপ করে, স্টার্টআপে দূরবর্তী ডিকশনারি ফেচ করে, এবং SSE-র মাধ্যমে CMS থেকে আপডেট স্ট্রিম করে। পরিবর্তনগুলি দেখতে পেজ রিফ্রেশ করুন।

নোট এবং সীমাবদ্ধতা:

- আপনার সাইট নিরাপত্তা নীতিতে (CSP) লাইভ সিঙ্ক অরিজিন যোগ করুন। লাইভ সিঙ্ক URL `connect-src`-এ অনুমোদিত আছে কিনা নিশ্চিত করুন (এবং প্রযোজ্য হলে `frame-ancestors`)।
- লাইভ সিঙ্ক স্ট্যাটিক আউটপুটের সাথে কাজ করে না। Next.js-এর জন্য, রানটাইমে আপডেট পেতে পেজটি ডায়নামিক হতে হবে (উদাহরণস্বরূপ, সম্পূর্ণ স্ট্যাটিক-মাত্র সীমাবদ্ধতা এড়াতে `generateStaticParams`, `generateMetadata`, `getServerSideProps`, বা `getStaticProps` উপযুক্তভাবে ব্যবহার করুন)।
- CMS-এ, প্রতিটি ডিকশনারিতে একটি `live` ফ্ল্যাগ থাকে। শুধুমাত্র `live=true` ফ্ল্যাগযুক্ত ডিকশনারিগুলি লাইভ সিঙ্ক API-র মাধ্যমে ফেচ করা হয়; অন্যগুলি ডায়নামিকভাবে ইম্পোর্ট করা হয় এবং রানটাইমে অপরিবর্তিত থাকে।
- `live` ফ্ল্যাগ বিল্ড সময়ে প্রতিটি ডিকশনারির জন্য মূল্যায়ন করা হয়। যদি দূরবর্তী কন্টেন্ট বিল্ডের সময় `live=true` হিসেবে ফ্ল্যাগ না করা হয়, তাহলে সেই ডিকশনারির জন্য লাইভ সিঙ্ক সক্রিয় করতে আপনাকে পুনর্নির্মাণ করতে হবে।
- লাইভ সিঙ্ক সার্ভার অবশ্যই `.intlayer`-এ লিখতে সক্ষম হতে হবে। কন্টেইনারে, `/.intlayer`-এ লেখার অ্যাক্সেস নিশ্চিত করুন।

## সেলফ-হোস্টিং

Intlayer সম্পূর্ণরূপে আপনার নিজস্ব অবকাঠামোতে চলতে পারে। একটি এক-লাইনার পূর্ণ স্ট্যাক (ড্যাশবোর্ড, API, ডেটাবেস, অবজেক্ট স্টোরেজ, এবং ইমেইল) Docker Compose-এর মাধ্যমে বুটস্ট্র্যাপ করে:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

সম্পূর্ণ সেটআপ গাইড, পরিবেশ ভেরিয়েবল রেফারেন্স, আপগ্রেড নির্দেশাবলী, এবং ব্যাকআপ/পুনরুদ্ধার পদ্ধতির জন্য, [সেলফ-হোস্টিং গাইড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/self_hosting.md) দেখুন।

---

## ডিবাগ

CMS-এর সাথে কোনো সমস্যা হলে, নিম্নলিখিতগুলি পরীক্ষা করুন:

- অ্যাপ্লিকেশনটি চলছে।

- আপনার Intlayer কনফিগারেশন ফাইলে [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) কনফিগারেশন সঠিকভাবে সেট করা আছে।
  - প্রয়োজনীয় ফিল্ড:
    - অ্যাপ্লিকেশন URL এডিটর কনফিগারেশনে আপনি যেটি সেট করেছেন তার সাথে মেলে কিনা (`applicationURL`)।
    - CMS URL

- নিশ্চিত করুন যে প্রজেক্ট কনফিগারেশন Intlayer CMS-এ পুশ করা হয়েছে।

- ভিজ্যুয়াল এডিটর আপনার ওয়েবসাইট প্রদর্শন করতে একটি iframe ব্যবহার করে। নিশ্চিত করুন যে আপনার ওয়েবসাইটের Content Security Policy (CSP) CMS url কে `frame-ancestors` হিসেবে অনুমতি দেয় (ডিফল্টরূপে 'https://app.intlayer.org')। কোনো ত্রুটির জন্য এডিটর কনসোল চেক করুন।
