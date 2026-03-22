---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Intlayer ডকুমেন্টেশন - জাভাস্ক্রিপ্টের জন্য সম্পূর্ণ i18n গাইড
description: Intlayer-এর জন্য সম্পূর্ণ ডকুমেন্টেশন, জাভাস্ক্রিপ্ট, রিঅ্যাক্ট, নেক্সট জেএস, এক্সপ্রেস এবং আরও অনেক ফ্রেমওয়ার্কের জন্য আধুনিক আন্তর্জাতিকীকরণ লাইব্রেরি।
keywords:
  - intlayer
  - internationalization
  - i18n
  - JavaScript
  - React
  - Next.js
  - documentation
  - translation
  - multilingual
slugs:
  - doc
  - index
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "ইতিহাস শুরু করা হয়েছে"
---

# Intlayer ডকুমেন্টেশন (Intlayer Documentation)

অফিসিয়াল **Intlayer** ডকুমেন্টেশনে আপনাকে স্বাগতম! এখানে আপনি আপনার সমস্ত আন্তর্জাতিকীকরণ (i18n) প্রয়োজনের জন্য Intlayer ইন্টিগ্রেট, কনফিগার এবং আয়ত্ত করার জন্য প্রয়োজনীয় সবকিছু পাবেন, আপনি **Next.js**, **React**, **Vite**, **Express**, অথবা অন্য কোনো JavaScript পরিবেশে কাজ করছেন কিনা তা নির্বিশেষে।

Intlayer আপনার অ্যাপ্লিকেশন অনুবাদ করার জন্য একটি নমনীয়, আধুনিক পদ্ধতি অফার করে। আমাদের ডকুমেন্টেশন আপনাকে ইনস্টলেশন এবং সেটআপ থেকে শুরু করে **AI-চালিত অনুবাদ**, **TypeScript** ডেফিনিশন এবং **সার্ভার কম্পোনেন্ট** সাপোর্টের মতো উন্নত বৈশিষ্ট্যগুলি ব্যবহারের মাধ্যমে একটি নির্বিঘ্ন, বহুভাষিক অভিজ্ঞতা তৈরি করতে সহায়তা করবে।

---

## শুরু করা (Getting Started)

- **[ভূমিকা (Introduction)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/introduction.md)**  
  Intlayer কীভাবে কাজ করে তার একটি ওভারভিউ পান, এর মূল বৈশিষ্ট্যগুলি জানুন এবং কেন এটি i18n-এর জন্য একটি গেম-চেঞ্জার তা বুঝুন।

- **[Intlayer কীভাবে কাজ করে (How Intlayer Works)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/how_works_intlayer.md)**  
  আর্কিটেকচারাল ডিজাইনে ডুব দিন এবং জানুন কীভাবে Intlayer কন্টেন্ট ডিক্লারেশন থেকে শুরু করে অনুবাদ সরবরাহ পর্যন্ত সবকিছু পরিচালনা করে।

- **[কনফিগারেশন (Configuration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md)**  
  আপনার প্রোজেক্টের প্রয়োজন অনুযায়ী Intlayer কাস্টমাইজ করুন। মিডলওয়্যার অপশন, ডিরেক্টরি স্ট্রাকচার এবং অ্যাডভান্সড সেটিংস এক্সপ্লোর করুন।

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/index.md)**  
  আমাদের কমান্ড-লাইন টুল ব্যবহার করে কন্টেন্ট এবং অনুবাদ পরিচালনা করুন। কন্টেন্ট পুশ এবং পুল করা, স্বয়ংক্রিয় অনুবাদ এবং আরও অনেক কিছু আবিষ্কার করুন।

- **[Intlayer এডিটর (Intlayer Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md)**  
  নন-ডেভেলপারদের সাথে সহযোগিতা সহজ করুন এবং সরাসরি আমাদের ফ্রি, স্বজ্ঞাত CMS-এ AI-এর মাধ্যমে আপনার অনুবাদগুলিকে শক্তিশালী করুন।

---

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

- **[লিঙ্গ (Gender)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/gender.md)**  
  গতিশীল কন্টেন্ট তৈরি করতে Intlayer-এ জেন্ডার লজিক কীভাবে ব্যবহার করবেন তা শিখুন।

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

---

## পরিবেশ এবং ইন্টিগ্রেশন (Environments & Integrations)

আমরা নমনীয়তার কথা মাথায় রেখে Intlayer তৈরি করেছি, যা জনপ্রিয় ফ্রেমওয়ার্ক এবং বিল্ড টুল জুড়ে নির্বিঘ্নে ইন্টিগ্রেট করা যায়:

- **[Next.js 16 এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_16.md)**
- **[Next.js 15 এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_15.md)**
- **[Next.js 14 এর সাথে Intlayer (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_14.md)**
- **[Next.js Page Router এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nextjs_page_router.md)**
- **[React CRA এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_create_react_app.md)**
- **[Vite + React এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+react.md)**
- **[React Router v7 এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_react_router_v7.md)**
- **[React Router v7 (fs routes) এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_react_router_v7_fs_routes.md)**
- **[Tanstack Start এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_tanstack.md)**
- **[React Native এবং Expo এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_react_native+expo.md)**
- **[Lynx এবং React এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_lynx+react.md)**
- **[Vite + Preact এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+preact.md)**
- **[Vite + Vue এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+vue.md)**
- **[Nuxt এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nuxt.md)**
- **[Express এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_express.md)**
- **[NestJS এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_nestjs.md)**
- **[Hono এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_hono.md)**
- **[Angular এর সাথে Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_angular.md)**

প্রতিটি ইন্টিগ্রেশন গাইডে Intlayer-এর বৈশিষ্ট্যগুলি ব্যবহারের সেরা অনুশীলন অন্তর্ভুক্ত রয়েছে, যেমন **সার্ভার-সাইড রেন্ডারিং**, **গতিশীল রাউটিং**, অথবা **ক্লায়েন্ট-সাইড রেন্ডারিং**, যাতে আপনি একটি দ্রুত, SEO-ফ্রেন্ডলি এবং অত্যন্ত স্কেলেবল অ্যাপ্লিকেশন রক্ষণাবেক্ষণ করতে পারেন।

---

## প্যাকেজসমূহ (Packages)

Intlayer-এর মডুলার ডিজাইন নির্দিষ্ট পরিবেশ এবং প্রয়োজনের জন্য নিবেদিত প্যাকেজ অফার করে:

### `intlayer`

আপনার i18n সেটআপ কনফিগার এবং পরিচালনা করার জন্য মূল ইউটিলিটি ফাংশন।

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

**Express**-ভিত্তিক অ্যাপে Intlayer লিভারেজ করুন:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/express-intlayer/t.md)**  
  আপনার সার্ভার রুট এবং ভিউ-এর জন্য একটি সহজ অনুবাদ হেল্পার।

### `hono-intlayer`

**Hono**-ভিত্তিক অ্যাপে Intlayer লিভারেজ করুন:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/hono-intlayer/t.md)**  
  আপনার সার্ভার রুটের জন্য একটি সহজ অনুবাদ হেল্পার।

### `react-intlayer`

শক্তিশালী হুক ব্যবহারের মাধ্যমে আপনার **React** অ্যাপ্লিকেশন উন্নত করুন:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

**Next.js**-এর সাথে নির্বিঘ্নে ইন্টিগ্রেট করুন:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/next-intlayer/useLocale.md)**

---

## অতিরিক্ত রিসোর্স (Additional Resources)

- **[ব্লগ: Intlayer এবং i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_i18next.md)**  
  জনপ্রিয় **i18next** লাইব্রেরির সাথে Intlayer-এর তুলনা এবং ব্যবহারের সুবিধা জানুন।

- **[YouTube-এ লাইভ টিউটোরিয়াল](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  একটি ভিডিও ডেমো দেখুন এবং রিয়েল-টাইমে Intlayer ইন্টিগ্রেশন শিখুন।

---

## অবদান এবং প্রতিক্রিয়া (Contributing & Feedback)

আমরা ওপেন-সোর্স এবং সম্প্রদায়-চালিত ডেভেলপমেন্টের শক্তিতে বিশ্বাস করি। আপনি যদি উন্নতির প্রস্তাব দিতে চান, একটি নতুন গাইড যোগ করতে চান, অথবা আমাদের ডক্সে কোনো সমস্যা সংশোধন করতে চান, তবে নির্দ্বিধায় একটি পুল রিকোয়েস্ট জমা দিন অথবা আমাদের [GitHub রিপোজিটরি](https://github.com/aymericzip/intlayer/blob/main/docs/docs)-এ একটি ইস্যু ওপেন করুন।

**আপনার অ্যাপ্লিকেশন আরও দ্রুত এবং আরও দক্ষতার সাথে অনুবাদ করতে প্রস্তুত?** আজই Intlayer ব্যবহার শুরু করতে আমাদের ডক্সে ডুব দিন। একটি শক্তিশালী, সুবিন্যস্ত আন্তর্জাতিকীকরণ পদ্ধতির অভিজ্ঞতা নিন যা আপনার কন্টেন্টকে সংগঠিত রাখে এবং আপনার টিমকে আরও বেশি প্রোডাক্টিভ করে তোলে।
