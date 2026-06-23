---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths ফাংশন ডকুমেন্টেশন | intlayer
description: intlayer প্যাকেজের জন্য comparePaths ফাংশন কীভাবে ব্যবহার করবেন তা দেখুন
keywords:
  - comparePaths
  - normalizePath
  - সক্রিয় লিঙ্ক (active link)
  - নেভিগেশন
  - Intlayer
  - intlayer
  - আন্তর্জাতিকীকরণ
  - ডকুমেন্টেশন
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "প্রাথমিক ডকুমেন্টেশন"
author: aymericzip
---

# ডকুমেন্টেশন: `intlayer` এ `comparePaths` ফাংশন

## বর্ণনা

`comparePaths` ফাংশনটি লোকেল (locale) সেগমেন্ট, প্রোটোকল/হোস্ট, কোয়েরি স্ট্রিং, হ্যাশ এবং ট্রেইলিং স্ল্যাশ (trailing slashes) উপেক্ষা করে দুটি URL বা পাথনেমের সমতা পরীক্ষা করে। এটি একটি নেভিগেশন লিঙ্ক বর্তমান পৃষ্ঠাকে নির্দেশ করছে কিনা তা নির্ধারণ করার প্রস্তাবিত উপায় — উদাহরণস্বরূপ সক্রিয় লিঙ্কটি হাইলাইট করার জন্য — নিজের (ত্রুটি-প্রবণ) নরমালাইজেশন লজিক লেখার প্রয়োজন ছাড়াই।

অভ্যন্তরীণভাবে এটি লোকেল সেগমেন্টটি সরাতে [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getPathWithoutLocale.md) পুনরায় ব্যবহার করে, তাই এটি আপনার কনফিগার করা রাউটিং মোড এবং লোকেলগুলিকে সম্মান করে।

প্যাকেজটি অন্তর্নিহিত [`normalizePath`](#normalizepath) সহায়ক ফাংশনটিও এক্সপোর্ট করে, যা তুলনার জন্য ব্যবহৃত ক্যানোনিকাল, লোকেল-স্বাধীন পাথনেম ফেরত দেয়।

**মূল বৈশিষ্ট্য:**

- লোকেল-স্বাধীন তুলনা (`/bn/about`, `/about` এর সাথে মিলে যায়)
- উভয় পরম (absolute) URL এবং আপেক্ষিক (relative) পাথগুলির সাথে কাজ করে
- কোয়েরি স্ট্রিং, হ্যাশ এবং ট্রেইলিং স্ল্যাশগুলি উপেক্ষা করে
- লিডিং স্ল্যাশ না থাকা এবং খালি মানগুলি সহ্য করে (যা `/` তে নরমালাইজ হয়)
- হালকা ওজনের — `getPathWithoutLocale` এর উপরে নির্মিত

---

## ফাংশন সিগনেচার

```typescript
comparePaths(
  pathname: string,  // প্রয়োজনীয়
  href: string,      // প্রয়োজনীয়
  locales?: Locales[] // ঐচ্ছিক
): boolean

normalizePath(
  inputUrl: string,   // প্রয়োজনীয়
  locales?: Locales[] // ঐচ্ছিক
): string
```

---

## প্যারামিটার

- `pathname: string`
  - **বর্ণনা**: তুলনা করার জন্য প্রথম URL স্ট্রিং বা পাথনেম (সাধারণত বর্তমান পাথনেম)।
  - **ধরন**: `string`
  - **প্রয়োজনীয়**: হ্যাঁ

- `href: string`
  - **বর্ণনা**: তুলনা করার জন্য দ্বিতীয় URL স্ট্রিং বা পাথনেম (সাধারণত একটি নেভিগেশন লিঙ্কের `href`)।
  - **ধরন**: `string`
  - **প্রয়োজনীয়**: হ্যাঁ

- `locales: Locales[]`
  - **বর্ণনা**: সমর্থিত লোকেলগুলির ঐচ্ছিক অ্যারে। ডিফল্টরূপে প্রকল্পে কনফিগার করা লোকেলগুলি নেয়।
  - **ধরন**: `Locales[]`
  - **প্রয়োজনীয়**: না (ঐচ্ছিক)

### রিটার্নস

- **ধরন**: `boolean`
- **বর্ণনা**: `true` যখন উভয় ইনপুট একই লোকেল-স্বাধীন পাথে সমাধান হয়, অন্যথায় `false`।

---

## ব্যবহারের উদাহরণ

### প্রাথমিক ব্যবহার

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### পরম এবং আপেক্ষিক URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### সক্রিয় নেভিগেশন লিঙ্ক হাইলাইট করা

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` হল সেই ক্যানোনিকাল, লোকেল-স্বাধীন পাথনেম যা `comparePaths` দ্বারা ব্যবহৃত হয়। এটি লোকেল সেগমেন্ট, প্রোটোকল/হোস্ট, কোয়েরি স্ট্রিং এবং হ্যাশ সরিয়ে দেয়, একটি একক লিডিং স্ল্যাশ নিশ্চিত করে, যে কোনও ট্রেইলিং স্ল্যাশ মুছে ফেলে (রুট বাদে) এবং খালি মানগুলির জন্য `/` এ ফিরে আসে।

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## সম্পর্কিত ফাংশন

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getPathWithoutLocale.md): একটি URL বা পাথ থেকে লোকেল সেগমেন্ট মুছে ফেলে।
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getPrefix.md): একটি প্রদত্ত লোকেলের জন্য URL প্রিফিক্স নির্ধারণ করে।
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/packages/intlayer/getLocalizedUrl.md): একটি নির্দিষ্ট লোকেলের জন্য স্থানীয়কৃত (localized) URL তৈরি করে।

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
