---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - ২০২৬ সালে কীভাবে একটি Vanilla JS অ্যাপ অনুবাদ করবেন
description: কীভাবে আপনার Vanilla JS ওয়েবসাইটকে বহুভাষিক করবেন তা আবিষ্কার করুন। এটিকে আন্তর্জাতিকীকরণ (i18n) এবং অনুবাদ করতে ডকুমেন্টেশন অনুসরণ করুন।
keywords:
  - আন্তর্জাতিকীকরণ
  - ডকুমেন্টেশন
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "ইতিহাস শুরু"
---

# Intlayer ব্যবহার করে আপনার Vanilla JS ওয়েবসাইট অনুবাদ করুন | আন্তর্জাতিকীকরণ (i18n)

## সূচিপত্র

<TOC/>

## Intlayer কী?

**Intlayer** একটি উদ্ভাবনী, ওপেন-সোর্স আন্তর্জাতিকীকরণ (i18n) লাইব্রেরি যা আধুনিক ওয়েব অ্যাপ্লিকেশনগুলিতে বহুভাষিক সমর্থন সহজ করার জন্য ডিজাইন করা হয়েছে।

Intlayer এর মাধ্যমে আপনি যা করতে পারেন:

- উপাদান স্তরে ঘোষণামূলক ডিকশনারি ব্যবহার করে **সহজেই অনুবাদ পরিচালনা করুন**।
- **মেটাডেটা, রুট এবং বিষয়বস্তু গতিশীলভাবে স্থানীয়করণ করুন**।
- স্বয়ংক্রিয়ভাবে তৈরি টাইপগুলির সাথে **TypeScript সমর্থন নিশ্চিত করুন**, যা অটো-কমপ্লিশন এবং ত্রুটি শনাক্তকরণ উন্নত করে।
- **উন্নত বৈশিষ্ট্যগুলি থেকে উপকৃত হন**, যেমন গতিশীল লোকাল শনাক্তকরণ এবং পরিবর্তন।

এই নির্দেশিকাটি দেখায় কীভাবে একটি Vanilla JavaScript অ্যাপ্লিকেশনে **প্যাকেজ ম্যানেজার বা বান্ডলার ব্যবহার না করে** (যেমন Vite, Webpack ইত্যাদি) Intlayer ব্যবহার করবেন।

যদি আপনার অ্যাপ্লিকেশনটি একটি বান্ডলার (যেমন Vite) ব্যবহার করে, তবে আমরা পরিবর্তে [Vite + Vanilla JS নির্দেশিকা](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_with_vite+vanilla.md) অনুসরণ করার পরামর্শ দিই।

স্ট্যান্ডঅলোন বান্ডল ব্যবহার করে, আপনি একটি একক JavaScript ফাইলের মাধ্যমে সরাসরি আপনার HTML ফাইলগুলিতে Intlayer ইম্পোর্ট করতে পারেন, যা পুরনো প্রজেক্ট বা সাধারণ স্ট্যাটিক সাইটগুলির জন্য উপযুক্ত।

---

## Vanilla JS অ্যাপ্লিকেশনে Intlayer সেট আপ করার জন্য ধাপে ধাপে নির্দেশিকা

### ধাপ ১: নির্ভরতা ইনস্টল করুন

npm ব্যবহার করে প্রয়োজনীয় প্যাকেজগুলি ইনস্টল করুন:

```bash packageManager="npm"
# intlayer এবং vanilla-intlayer এর একটি স্ট্যান্ডঅলোন বান্ডল তৈরি করুন
# এই ফাইলটি আপনার HTML ফাইলে ইম্পোর্ট করা হবে
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# কনফিগারেশন ফাইল সহ intlayer শুরু করুন
npx intlayer init --no-gitignore

# ডিকশনারি বিল্ড করুন
npx intlayer build
```

```bash packageManager="pnpm"
# intlayer এবং vanilla-intlayer এর একটি স্ট্যান্ডঅলোন বান্ডল তৈরি করুন
# এই ফাইলটি আপনার HTML ফাইলে ইম্পোর্ট করা হবে
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# কনফিগারেশন ফাইল সহ intlayer শুরু করুন
pnpm intlayer init --no-gitignore

# ডিকশনারি বিল্ড করুন
pnpm intlayer build
```

```bash packageManager="yarn"
# intlayer এবং vanilla-intlayer এর একটি স্ট্যান্ডঅলোন বান্ডল তৈরি করুন
# এই ফাইলটি আপনার HTML ফাইলে ইম্পোর্ট করা হবে
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer কনফিগারেশন ফাইল, TypeScript (যদি সেট আপ থাকে), env var শুরু করুন
yarn intlayer init --no-gitignore

# ডিকশনারি বিল্ড করুন
yarn intlayer build
```

```bash packageManager="bun"
# intlayer এবং vanilla-intlayer এর একটি স্ট্যান্ডঅলোন বান্ডল তৈরি করুন
# এই ফাইলটি আপনার HTML ফাইলে ইম্পোর্ট করা হবে
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# কনফিগারেশন ফাইল সহ intlayer শুরু করুন
bun x intlayer init --no-gitignore

# ডিকশনারি বিল্ড করুন
bun x intlayer build
```

- **intlayer**
  মূল প্যাকেজ যা কনফিগারেশন ম্যানেজমেন্ট, অনুবাদ, [বিষয়বস্তু ঘোষণা](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md), ট্রান্সপাইলেশন এবং [CLI কমান্ড](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/index.md) এর জন্য আন্তর্জাতিকীকরণ সরঞ্জাম সরবরাহ করে।

- **vanilla-intlayer**
  প্যাকেজটি যা Intlayer কে সাধারণ JavaScript / TypeScript অ্যাপ্লিকেশনের সাথে একীভূত করে। এটি একটি পাব/সাব সিঙ্গেলটন (`IntlayerClient`) এবং কলব্যাক-ভিত্তিক হেলপার (`useIntlayer`, `useLocale` ইত্যাদি) সরবরাহ করে যাতে আপনার অ্যাপের যেকোনো অংশ UI ফ্রেমওয়ার্কের উপর নির্ভর না করে লোকাল পরিবর্তনের প্রতিক্রিয়া জানাতে পারে।

> `intlayer standalone` CLI-এর বান্ডলিং এক্সপোর্ট অব্যবহৃত প্যাকেজ, লোকাল এবং আপনার কনফিগারেশনের জন্য নির্দিষ্ট অপ্রয়োজনীয় লজিক (যেমন রিডাইরেক্ট বা প্রিফিক্স) ট্রি-শেকিং (tree-shaking)-এর মাধ্যমে বাদ দিয়ে একটি অপ্টিমাইজড বিল্ড তৈরি করে।

### ধাপ ২: আপনার প্রজেক্টের কনফিগারেশন

আপনার অ্যাপ্লিকেশনের ভাষাগুলি কনফিগার করার জন্য একটি কনফিগারেশন ফাইল তৈরি করুন:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> এই কনফিগারেশন ফাইলের মাধ্যমে, আপনি স্থানীয় ইউআরএল, মিডলওয়্যার রিডাইরেকশন, কুকি নাম, আপনার বিষয়বস্তু ঘোষণার অবস্থান এবং এক্সটেনশন সেট আপ করতে পারেন, কনসোলে Intlayer লগ নিষ্ক্রিয় করতে পারেন এবং আরও অনেক কিছু। উপলব্ধ প্যারামিটারগুলির সম্পূর্ণ তালিকার জন্য, [কনফিগারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) দেখুন।

### ধাপ ৩: আপনার HTML-এ বান্ডল ইম্পোর্ট করুন

একবার আপনি `intlayer.js` বান্ডল তৈরি করলে, আপনি এটি আপনার HTML ফাইলে ইম্পোর্ট করতে পারেন:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="bn">
  <head>
    <meta charset="UTF-8" />

    <!-- বান্ডল ইম্পোর্ট করুন -->
    <script src="./intlayer.js" defer></script>
    <!-- আপনার মূল স্ক্রিপ্ট ইম্পোর্ট করুন -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

বান্ডলটি `window`-এ গ্লোবাল অবজেক্ট হিসেবে `Intlayer` এবং `VanillaIntlayer` প্রকাশ করে।

### ধাপ ৪: আপনার এন্ট্রি পয়েন্টে Intlayer বুটস্ট্র্যাপ করুন

আপনার `src/main.js`-এ, কোনো বিষয়বস্তু রেন্ডার করার **আগে** `installIntlayer()` কল করুন যাতে গ্লোবাল লোকাল সিঙ্গেলটন প্রস্তুত থাকে।

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// যেকোনো i18n বিষয়বস্তু রেন্ডার করার আগে কল করতে হবে।
installIntlayer();
```

আপনি যদি মার্কডাউন রেন্ডারারও ব্যবহার করতে চান তবে `installIntlayerMarkdown()` কল করুন:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### ধাপ ৫: আপনার বিষয়বস্তু ঘোষণা করুন

অনুবাদগুলি সংরক্ষণ করতে আপনার বিষয়বস্তু ঘোষণাগুলি তৈরি এবং পরিচালনা করুন:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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
      es: "আরও জানতে ভাইট (Vite) লোগোতে ক্লিক করুন",
    }),
  },
} satisfies Dictionary;

export default appContent;
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
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> আপনার বিষয়বস্তু ঘোষণাগুলি আপনার অ্যাপ্লিকেশনের যেকোনো জায়গায় সংজ্ঞায়িত করা যেতে পারে যখনই সেগুলি `contentDir` ডিরেক্টরিতে অন্তর্ভুক্ত করা হয় (ডিফল্টভাবে, `./src`) এবং বিষয়বস্তু ঘোষণা ফাইল এক্সটেনশনের সাথে মেলে (ডিফল্টভাবে, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)।
>
> আরও বিশদ বিবরণের জন্য, [বিষয়বস্তু ঘোষণা ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md) দেখুন।

### ধাপ ৬: আপনার JavaScript-এ Intlayer ব্যবহার করুন

`window.VanillaIntlayer` অবজেক্ট API হেলপার সরবরাহ করে: `useIntlayer(key, locale?)` একটি প্রদত্ত কী-এর জন্য অনুবাদিত বিষয়বস্তু ফেরত দেয়।

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// বর্তমান লোকালের জন্য প্রাথমিক বিষয়বস্তু পান।
// যখনই লোকাল পরিবর্তিত হয় তখন অবহিত হতে .onChange() চেইন করুন।
const content = useIntlayer("app").onChange((newContent) => {
  // শুধুমাত্র প্রভাবিত DOM নোডগুলি পুনরায় রেন্ডার বা প্যাচ করুন
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// প্রাথমিক রেন্ডার
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> লিফ মানগুলিকে `String()`-এ মোড়ানোর মাধ্যমে স্ট্রিং হিসেবে অ্যাক্সেস করুন, যা নোডের `toString()` মেথডকে কল করে এবং অনুবাদিত পাঠ্য ফেরত দেয়।
>
> যখন আপনার একটি নেটিভ HTML অ্যাট্রিবিউটের (যেমন `alt`, `aria-label`) মানের প্রয়োজন হয়, তখন সরাসরি `.value` ব্যবহার করুন:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (ঐচ্ছিক) ধাপ ৭: আপনার বিষয়বস্তুর ভাষা পরিবর্তন করুন

আপনার বিষয়বস্তুর ভাষা পরিবর্তন করতে, `useLocale` দ্বারা প্রকাশ করা `setLocale` ফাংশন ব্যবহার করুন।

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "ভাষা");

  const render = (currentLocale) => {
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

  select.addEventListener("change", () => setLocale(select.value));

  // যখন লোকাল অন্য কোথাও থেকে পরিবর্তিত হয় তখন ড্রপডাউনটি সিঙ্কে রাখুন
  return subscribe((newLocale) => render(newLocale));
}
```

### (ঐচ্ছিক) ধাপ ৮: HTML ভাষা এবং দিকনির্দেশক অ্যাট্রিবিউটগুলি পরিবর্তন করুন

অ্যাক্সেসযোগ্যতা এবং এসইও-এর জন্য বর্তমান লোকালের সাথে মিল রাখতে `<html>` ট্যাগের `lang` এবং `dir` অ্যাট্রিবিউটগুলি আপডেট করুন।

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (ঐচ্ছিক) ধাপ ৯: লোকাল প্রতি ডিকশনারি অলস-লোড (Lazy-load) করুন

আপনি যদি লোকাল প্রতি ডিকশনারি অলস-লোড করতে চান তবে আপনি `useDictionaryDynamic` ব্যবহার করতে পারেন। আপনার যদি প্রারম্ভিক `intlayer.js` ফাইলে সমস্ত অনুবাদ বান্ডল করতে না চান তবে এটি কার্যকর।

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> দ্রষ্টব্য: `useDictionaryDynamic`-এর জন্য ডিকশনারিগুলি আলাদা ESM ফাইল হিসেবে উপলব্ধ থাকা প্রয়োজন। এই পদ্ধতিটি সাধারণত তখনই ব্যবহৃত হয় যদি আপনার ডিকশনারি পরিবেশন করার জন্য একটি ওয়েব সার্ভার থাকে।

### TypeScript কনফিগার করুন

নিশ্চিত করুন যে আপনার TypeScript কনফিগারেশনে স্বয়ংক্রিয়ভাবে তৈরি টাইপগুলি অন্তর্ভুক্ত রয়েছে।

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### VS Code এক্সটেনশন

Intlayer এর মাধ্যমে আপনার ডেভেলপমেন্ট অভিজ্ঞতা উন্নত করতে, আপনি অফিসিয়াল **Intlayer VS Code এক্সটেনশন** ইনস্টল করতে পারেন।

[VS Code মার্কেটপ্লেস থেকে ইনস্টল করুন](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

এই এক্সটেনশনটি প্রদান করে:

- অনুবাদ কীগুলির জন্য **অটো-কমপ্লিশন**।
- অনুপস্থিত অনুবাদের জন্য **রিয়েল-টাইম ত্রুটি শনাক্তকরণ**।
- অনুবাদিত বিষয়বস্তুর **ইনলাইন প্রিভিউ**।
- সহজে অনুবাদ তৈরি এবং আপডেট করতে **দ্রুত পদক্ষেপ**।

এক্সটেনশনটি কীভাবে ব্যবহার করবেন সে সম্পর্কে আরও বিশদ বিবরণের জন্য, [Intlayer VS Code এক্সটেনশন ডকুমেন্টেশন](https://intlayer.org/doc/vs-code-extension) দেখুন।

---

### আরও এগিয়ে যান

আরও এগিয়ে যেতে, আপনি [ভিজ্যুয়াল এডিটর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md) বাস্তবায়ন করতে পারেন বা [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_CMS.md) ব্যবহার করে আপনার বিষয়বস্তু বাইরে রাখতে পারেন।
