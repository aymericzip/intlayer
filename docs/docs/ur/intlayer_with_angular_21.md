---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - 2026 میں ایک Angular 21 ایپ (Vite) کا ترجمہ کیسے کریں
description: جانیں کہ اپنی Angular ویب سائٹ کو ملٹی لنگوئل کیسے بنائیں۔ اسے بین الاقوامی بنانے (i18n) اور ترجمہ کرنے کے لیے دستاویزات کی پیروی کریں۔
keywords:
  - بین الاقوامی بنانا
  - دستاویزات
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
applicationShowcase: https://intlayer-angular-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "پراپرٹی تک براہ راست رسائی کے لیے Solid useIntlayer API کا استعمال اپ ڈیٹ کر دیا گیا"
  - version: 8.0.0
    date: 2026-01-26
    changes: "مستحکم ورژن جاری کر دیا گیا"
  - version: 8.0.0
    date: 2025-12-30
    changes: "init کمانڈ شامل کر دی گئی"
  - version: 5.5.10
    date: 2025-06-29
    changes: "ابتدائی تاریخ"
---

# Intlayer کا استعمال کرتے ہوئے اپنی Angular 21 (Vite) ویب سائٹ کا ترجمہ کریں | بین الاقوامی بنانا (i18n)

## فہرست

<TOC/>

## Intlayer کیا ہے؟

**Intlayer** ایک جدید، اوپن سورس بین الاقوامی (i18n) لائبریری ہے جو جدید ویب ایپس میں ملٹی لنگوئل سپورٹ کو آسان بنانے کے لیے ڈیزائن کی گئی ہے۔

Intlayer کے ساتھ، آپ کر سکتے ہیں:

- جزو کی سطح پر اعلانیہ لغات کا استعمال کرتے ہوئے **آسانی سے تراجم کا نظم کریں**۔
- میٹا ڈیٹا، روٹس، اور مواد کو **متحرک طور پر لوکلائز کریں**۔
- خود کار طریقے سے تیار کردہ اقسام کے ساتھ **TypeScript سپورٹ کو یقینی بنائیں**، جس سے آٹو کمپلیٹ اور غلطی کا پتہ لگانا بہتر ہوتا ہے۔
- متحرک لوکیل کا پتہ لگانے اور تبدیل کرنے جیسی **جدید خصوصیات سے فائدہ اٹھائیں**۔

---

## Angular ایپلی کیشن میں Intlayer ترتیب دینے کے لیے مرحلہ وار گائیڈ

<Tabs defaultTab="code">
  <Tab label="کوڈ" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer کا استعمال کرتے ہوئے اپنی ایپلی کیشن کو کیسے بین الاقوامی بنائیں"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="ڈیمو" value="demo">

<iframe
  src="https://intlayer-angular-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub پر [ایپلیکیشن ٹیمپلیٹ](https://github.com/aymericzip/intlayer-angular-template) دیکھیں۔

### مرحلہ 1: منحصر چیزیں انسٹال کریں

npm کا استعمال کرتے ہوئے ضروری پیکجز انسٹال کریں:

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

  بنیادی پیکج جو کنفیگریشن مینجمنٹ، ترجمہ، [مواد کے اعلان](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md)، ٹرانسپائلیشن، اور [CLI کمانڈز](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/index.md) کے لیے بین الاقوامی آلات فراہم کرتا ہے۔

- **angular-intlayer**
  وہ پیکج جو Intlayer کو Angular ایپلی کیشن کے ساتھ ضم کرتا ہے۔ یہ Angular بین الاقوامی بنانے کے لیے سیاق و سباق فراہم کرنے والے (context providers) اور ہکس فراہم کرتا ہے۔

- **@angular-builders/custom-esbuild**
  Angular CLI کی esbuild کنفیگریشن کو حسب ضرورت بنانے کے لیے درکار ہے۔

### مرحلہ 2: آپ کے پروجیکٹ کی کنفیگریشن

اپنی ایپ کی زبانوں کو کنفیگر کرنے کے لیے ایک کنفیگریشن فائل بنائیں:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // آپ کی دوسری زبانیں
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> اس کنفیگریشن فائل کے ذریعے، آپ لوکلائزڈ URLs، مڈل ویئر ری ڈائریکشن، کوکی کے نام، اپنے مواد کے اعلانات کا مقام اور توسیع ترتیب دے سکتے ہیں، کنسول میں Intlayer لاگز کو غیر فعال کر سکتے ہیں، اور بہت کچھ کر سکتے ہیں۔ دستیاب پیرامیٹرز کی مکمل فہرست کے لیے، [کنفیگریشن دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) سے رجوع کریں۔

### مرحلہ 3: اپنی Angular کنفیگریشن میں Intlayer کو شامل کریں

Intlayer کو Angular CLI کے ساتھ مربوط کرنے کے لیے، آپ کو ایک کسٹم بلڈر استعمال کرنے کی ضرورت ہے۔ یہ گائیڈ فرض کرتی ہے کہ آپ Vite/esbuild (Angular 21 پروجیکٹس کے لیے ڈیفالٹ) استعمال کر رہے ہیں۔

پہلے، کسٹم esbuild بلڈر استعمال کرنے کے لیے اپنے `angular.json` میں ترمیم کریں۔ `build` اور `serve` کی کنفیگریشن کو اپ ڈیٹ کریں:

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
              "exclude": ["@intlayer/config/built"],
            },
          },
        },
      },
    },
  },
}
```

> یقینی بنائیں کہ آپ `angular.json` میں `your-app-name` کو اپنے پروجیکٹ کے اصل نام سے بدل دیں۔

اس کے بعد، اپنے پروجیکٹ کے روٹ میں `esbuild.plugins.ts` فائل بنائیں:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> `intlayerEsbuildPlugin` فنکشن esbuild کو Intlayer کے ساتھ کنفیگر کرتا ہے۔ یہ مواد کی تعریفی فائلوں کو سنبھالنے کے لیے پلگ ان داخل کرتا ہے اور بہترین کارکردگی کے لیے ترتیب دیتا ہے۔

### مرحلہ 4: اپنے مواد کا اعلان کریں

تراجم کو ذخیرہ کرنے کے لیے اپنے مواد کے اعلانات بنائیں اور ان کا نظم کریں:

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

> آپ کے مواد کے اعلانات کو آپ کی ایپلیکیشن میں کہیں بھی متعین کیا جا سکتا ہے جب تک کہ وہ `contentDir` ڈائرکٹری (بطور ڈیفالٹ، `./src`) میں شامل ہوں۔ اور مواد کے اعلان کی فائل ایکسٹینشن سے مماثل ہوں (بطور ڈیفالٹ، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)۔

> مزید تفصیلات کے لیے، [مواد کے اعلان کے دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) سے رجوع کریں۔

### مرحلہ 5: اپنے کوڈ میں Intlayer کا استعمال کریں

اپنی پوری Angular ایپلی کیشن میں Intlayer کی بین الاقوامی سازی کی خصوصیات کو استعمال کرنے کے لیے، آپ کو ایپ کی کنفیگریشن میں Intlayer فراہم کرنا ہوگا۔

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // یہاں Intlayer فراہم کنندہ شامل کریں
  ],
};
```

پھر، آپ کسی بھی جزو میں `useIntlayer` فنکشن استعمال کر سکتے ہیں۔

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

اور آپ کے ٹیمپلیٹ میں:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer مواد ایک `Signal` کے طور پر لوٹایا جاتا ہے، لہذا آپ سگنل کو کال کر کے اقدار تک رسائی حاصل کرتے ہیں: `content().title`۔

### (اختیاری) مرحلہ 6: اپنے مواد کی زبان تبدیل کریں

اپنے مواد کی زبان کو تبدیل کرنے کے لیے، آپ `useLocale` فنکشن کے ذریعے فراہم کردہ `setLocale` فنکشن کا استعمال کر سکتے ہیں۔ یہ آپ کو ایپ کا لوکیل سیٹ کرنے اور اسی کے مطابق مواد کو اپ ڈیٹ کرنے کی سہولت دیتا ہے۔

زبانوں کے درمیان سوئچ کرنے کے لیے ایک جزو بنائیں:

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

پھر، اس جزو کو اپنے `app.component.ts` میں استعمال کریں:

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

### TypeScript کو کنفیگر کریں

Intlayer TypeScript کے فوائد حاصل کرنے اور آپ کے کوڈ بیس کو مضبوط بنانے کے لیے Module Augmentation کا استعمال کرتا ہے۔

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

اس بات کو یقینی بنائیں کہ آپ کے TypeScript کنفیگریشن میں خود کار طریقے سے تیار کردہ اقسام (autogenerated types) شامل ہیں۔

```json5 fileName="tsconfig.json"
{
  // ... آپ کی موجودہ TypeScript کنفیگریشنز
  "include": [
    // ... آپ کی موجودہ TypeScript کنفیگریشنز
    ".intlayer/**/*.ts", // خود کار طریقے سے تیار کردہ اقسام کو شامل کریں
  ],
}
```

### Git کنفیگریشن

یہ تجویز کیا جاتا ہے کہ آپ Intlayer کی طرف سے تیار کی گئی فائلوں کو نظر انداز کریں۔ یہ آپ کو انہیں اپنے Git ریپوزٹری میں کمٹ کرنے سے بچاتا ہے۔

ایسا کرنے کے لیے، آپ اپنی `.gitignore` فائل میں درج ذیل ہدایات شامل کر سکتے ہیں:

```bash
# Intlayer کے ذریعہ تیار کردہ فائلوں کو نظر انداز کریں
.intlayer
```

### VS Code ایکسٹینشن

Intlayer کے ساتھ اپنے ترقیاتی تجربے کو بہتر بنانے کے لیے، آپ سرکاری **Intlayer VS Code Extension** انسٹال کر سکتے ہیں۔

[VS Code Marketplace سے انسٹال کریں](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

یہ ایکسٹینشن فراہم کرتا ہے:

- ترجمہ کیز (translation keys) کے لیے **آٹو کمپلیشن**۔
- غائب تراجم کے لیے **ریئل ٹائم ایرر ڈیڈیکشن**۔
- ترجمہ شدہ مواد کی **ان لائن پریویوز**۔
- آسانی سے تراجم تخلیق کرنے اور اپ ڈیٹ کرنے کے لیے **تیز اعمال**۔

ایکسٹینشن کو استعمال کرنے کے طریقہ کار کے بارے میں مزید تفصیلات کے لیے، [Intlayer VS Code Extension دستاویزات](https://intlayer.org/doc/vs-code-extension) دیکھیں۔

---

### مزید آگے بڑھیں

مزید آگے جانے کے لیے، آپ [بصری ایڈیٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md) کو لاگو کر سکتے ہیں یا [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md) کا استعمال کرتے ہوئے اپنے مواد کو آؤٹ سورس کر سکتے ہیں۔

---
