---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Angular 21 i18n - আপনার অ্যাপ অনুবাদের সম্পূর্ণ গাইড"
description: "আর i18next নয়। 2026 সালে Angular 21 অ্যাপ কে বহুভাষিক (i18n) করার গাইড। AI এজেন্ট দিয়ে অনুবাদ করুন এবং বান্ডেল সাইজ, SEO ও পারফরম্যান্স অপ্টিমাইজ করুন।"
keywords:
  - আন্তর্জাতিকীকরণ
  - ডকুমেন্টেশন
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API এর ব্যবহার সরাসরি প্রপার্টি অ্যাক্সেসে আপডেট করা হয়েছে"
  - version: 8.0.0
    date: 2026-01-26
    changes: "স্ট্যাবল ভার্সন রিলিজ"
  - version: 8.0.0
    date: 2025-12-30
    changes: "init কমান্ড যোগ করা হয়েছে"
  - version: 5.5.10
    date: 2025-06-29
    changes: "প্রাথমিক ইতিহাস"
---

# Intlayer ব্যবহার করে আপনার Angular 21 (Vite) ওয়েবসাইট অনুবাদ করুন | আন্তর্জাতিকীকরণ (i18n)

## সূচিপত্র

<TOC/>

## Intlayer কি?

**Intlayer** হল আধুনিক ওয়েব অ্যাপ্লিকেশনগুলোতে বহুভাষিক সমর্থন সহজ করার জন্য ডিজাইন করা একটি উদ্ভাবনী, ওপেন-সোর্স আন্তর্জাতিকীকরণ (i18n) লাইব্রেরি।

Intlayer এর মাধ্যমে আপনি যা করতে পারেন:

- উপাদান-স্তরে ঘোষণামূলক অভিধান ব্যবহার করে **সহজেই অনুবাদ পরিচালনা করুন**।
- মেটাডেটা, রুট এবং বিষয়বস্তু **গতিশীলভাবে স্থানীয়করণ করুন**।
- অটো-জেনারেটেড টাইপ সহ **TypeScript সমর্থন নিশ্চিত করুন**, যা অটোকমপ্লিশন এবং ত্রুটি সনাক্তকরণ উন্নত করে।
- ডায়নামিক লোকেল সনাক্তকরণ এবং পরিবর্তনের মতো **উন্নত বৈশিষ্ট্যগুলো উপভোগ করুন**।

---

## Angular অ্যাপ্লিকেশনে Intlayer সেট আপ করার ধাপে ধাপে গাইড

<Tabs defaultTab="code">
  <Tab label="কোড" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer ব্যবহার করে কীভাবে আপনার অ্যাপ্লিকেশনের আন্তর্জাতিকীকরণ করবেন"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="ডেমো" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub এ [অ্যাপ্লিকেশন টেমপ্লেট](https://github.com/aymericzip/intlayer-angular-21-template) দেখুন।

### ধাপ ১: ডিপেন্ডেন্সি ইন্সটল করুন

npm ব্যবহার করে প্রয়োজনীয় প্যাকেজ ইন্সটল করুন:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
bun x intlayer init
```

- **intlayer**

  কোর প্যাকেজ যা কনফিগারেশন পরিচালনা, অনুবাদ, [কন্টেন্ট ডিক্লেরেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md), ট্রান্সপিলেশন এবং [CLI কমান্ডের](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/index.md) জন্য আন্তর্জাতিকীকরণ টুল সরবরাহ করে।

- **angular-intlayer**
  এই প্যাকেজটি Angular অ্যাপ্লিকেশনের সাথে Intlayer কে একীভূত করে। এটি Angular আন্তর্জাতিকীকরণের জন্য কনটেক্সট প্রোভাইডার এবং হুক সরবরাহ করে।

- **@angular-builders/custom-esbuild**
  Angular CLI এর esbuild কনফিগারেশন কাস্টমাইজ করার জন্য প্রয়োজন।

### ধাপ ২: আপনার প্রজেক্টের কনফিগারেশন

আপনার অ্যাপ্লিকেশনের ভাষা কনফিগার করার জন্য একটি কনফিগারেশন ফাইল তৈরি করুন:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // আপনার অন্যান্য ভাষা
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> এই কনফিগারেশন ফাইলের মাধ্যমে আপনি স্থানীয়করণ করা URL, মিডলওয়্যার রিডাইরেকশন, কুকি নাম, আপনার কন্টেন্ট ডিক্লেরেশনের অবস্থান এবং এক্সটেনশন সেট করতে পারেন, কনসোল এ Intlayer লগ নিষ্ক্রিয় করতে পারেন এবং আরও অনেক কিছু করতে পারেন। উপলব্ধ প্যারামিটারগুলোর একটি সম্পূর্ণ তালিকার জন্য [কনফিগারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) দেখুন।

### ধাপ ৩: আপনার Angular কনফিগারেশনে Intlayer একত্রিত করুন

Intlayer কে Angular CLI এর সাথে একত্রিত করতে আপনাকে একটি কাস্টম বিল্ডার ব্যবহার করতে হবে। এই গাইডটি ধরে নেয় যে আপনি Vite/esbuild ব্যবহার করছেন (Angular 21 প্রজেক্টের জন্য ডিফল্ট)।

প্রথমে আপনার `angular.json` পরিবর্তন করে কাস্টম esbuild বিল্ডার ব্যবহার করুন। `build` এবং `serve` কনফিগারেশন আপডেট করুন:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> `angular.json` এর মধ্যে থাকা `your-app-name` কে আপনার প্রজেক্টের প্রকৃত নাম দিয়ে পরিবর্তন করতে ভুলবেন না।

এরপর, আপনার প্রজেক্টের রুটে একটি `esbuild.plugins.ts` ফাইল তৈরি করুন:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> `intlayerEsbuildPlugin` ফাংশন esbuild কে Intlayer এর সাথে কনফিগার করে। এটি কন্টেন্ট ডিক্লেরেশন ফাইলগুলোকে হ্যান্ডেল করার জন্য প্লাগইনটি ইনজেক্ট করে এবং সর্বোত্তম পারফরম্যান্সের জন্য কনফিগারেশন সেটআপ করে।

> **NX ব্যবহারকারীরা**: NX-এর Angular বিল্ডাররা Node-এর নেটিভ ESM রেজোলিউশনের মাধ্যমে প্লাগইন ফাইলগুলি লোড করে এবং ফ্লাইতে TypeScript প্লাগইন ফাইলগুলি কম্পাইল করে না। পরিবর্তে একটি `.mjs` ফাইল ব্যবহার করুন এবং তদনুসারে `angular.json`-এ `plugins` রেফারেন্স আপডেট করুন:
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> তারপর `angular.json`-এ `"./esbuild.plugins.ts"`-এর পরিবর্তে `"./esbuild.plugins.mjs"` নির্দেশ করুন।

### ধাপ ৪: আপনার কন্টেন্ট ডিক্লেয়ার করুন

অনুবাদ জমা করার জন্য আপনার কন্টেন্ট ডিক্লেরেশন তৈরি ও পরিচালনা করুন:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> আপনার কন্টেন্ট ডিক্লেরেশনগুলো আপনার অ্যাপ্লিকেশনের যেকোনো স্থানে সংজ্ঞায়িত করা যেতে পারে যতক্ষণ না সেগুলো `contentDir` ডিরেক্টরিতে (ডিফল্টভাবে `./src`) অন্তর্ভুক্ত থাকে। এবং কন্টেন্ট ডিক্লেরেশনের ফাইল এক্সটেনশনের সাথে মেলে (ডিফল্টভাবে `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)।

> আরও বিস্তারিত জানার জন্য, [কন্টেন্ট ডিক্লেরেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md) দেখুন।

### ধাপ ৫: আপনার কোডে Intlayer ব্যবহার করুন

আপনার পুরো Angular অ্যাপ্লিকেশন জুড়ে Intlayer এর আন্তর্জাতিকীকরণ বৈশিষ্ট্যগুলো ব্যবহার করতে হলে অ্যাপ্লিকেশনের কনফিগারেশনে Intlayer প্রোভাইড করতে হবে।

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // এখানে Intlayer প্রোভাইডার যোগ করুন
  ],
};
```

এরপর আপনি যেকোনো কম্পোনেন্টের মধ্যে `useIntlayer` ফাংশন ব্যবহার করতে পারবেন।

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

এবং আপনার টেমপ্লেটে:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer কন্টেন্ট একটি `Signal` হিসেবে ফেরত পাঠানো হয়, তাই আপনি সিগন্যাল কল করে মানগুলোতে অ্যাক্সেস করতে পারেন: `content().title`।

### (ঐচ্ছিক) ধাপ ৬: আপনার কন্টেন্টের ভাষা পরিবর্তন করুন

আপনার কন্টেন্টের ভাষা পরিবর্তন করতে আপনি `useLocale` ফাংশন থেকে পাওয়া `setLocale` ফাংশনটি ব্যবহার করতে পারেন। এটি আপনাকে অ্যাপ্লিকেশনের লোকেল সেট করতে এবং সেই অনুযায়ী কন্টেন্ট আপডেট করতে দেয়।

ভাষা পরিবর্তনের জন্য একটি কম্পোনেন্ট তৈরি করুন:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

তারপর আপনার `app.component.ts` ফাইলে এই কম্পোনেন্টটি ব্যবহার করুন:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

### TypeScript কনফিগার করা

Intlayer মডিউল অগমেন্টেশন (Module Augmentation) ব্যবহার করে TypeScript এর সুবিধাগুলি কাজে লাগায় এবং আপনার কোডবেসকে আরও শক্তিশালী করে তোলে।

![অটোকমপ্লিশন](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![অনুবাদ ত্রুটি](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

নিশ্চিত করুন আপনার TypeScript কনফিগারেশনে অটো-জেনারেটেড টাইপগুলো অন্তর্ভুক্ত আছে।

```json5 fileName="tsconfig.json"
{
  // ... আপনার বিদ্যমান TypeScript কনফিগারেশনগুলো
  "include": [
    // ... আপনার বিদ্যমান TypeScript কনফিগারেশনগুলো
    ".intlayer/**/*.ts", // অটো-জেনারেটেড টাইপ অন্তর্ভুক্ত করা
  ],
}
```

### Git কনফিগারেশন

Intlayer দ্বারা জেনারেট করা ফাইলগুলোকে ইগনোর করার পরামর্শ দেওয়া হয়। এটি আপনাকে সেগুলো আপনার Git রিপোজিটরিতে কমিট করা থেকে বিরত রাখবে।

এটি করার জন্য আপনি আপনার `.gitignore` ফাইলে নিচের নির্দেশাবলী যোগ করতে পারেন:

```bash
# Intlayer দ্বারা তৈরি হওয়া ফাইলগুলোকে ইগনোর করুন
.intlayer
```

### VS Code এক্সটেনশন

Intlayer এর সাথে আপনার ডেভেলপমেন্টের অভিজ্ঞতা উন্নত করতে আপনি অফিসিয়াল **Intlayer VS Code এক্সটেনশন** ইন্সটল করতে পারেন।

[VS Code Marketplace থেকে ইন্সটল করুন](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

এই এক্সটেনশনটি প্রদান করে:

- অনুবাদ কিউয়ের জন্য **অটোকমপ্লিশন**।
- মিসিং অনুবাদের জন্য **রিয়েল-টাইম ত্রুটি সনাক্তকরণ**।
- অনুবাদ করা কন্টেন্টের **ইনলাইন প্রিভিউ**।
- সহজে অনুবাদ তৈরি এবং আপডেট করার জন্য **দ্রুত পদক্ষেপ** (Quick actions)।

এক্সটেনশনটি কীভাবে ব্যবহার করবেন তা সম্পর্কে আরও জানতে [Intlayer VS Code এক্সটেনশন ডকুমেন্টেশন](https://intlayer.org/doc/vs-code-extension) দেখুন।

---

### আরও গভীরে যান

আরও গভীরে যাওয়ার জন্য আপনি [ভিজ্যুয়াল এডিটর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_visual_editor.md) বাস্তবায়ন করতে পারেন বা [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_CMS.md) ব্যবহার করে আপনার কন্টেন্ট বাহ্যিক করতে পারেন।

---
