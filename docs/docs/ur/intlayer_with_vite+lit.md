---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "Vite + Lit i18n - اپنی ایپ کو ترجمہ کرنے کا مکمل گائیڈ"
description: "اب i18next کی ضرورت نہیں۔ 2026 میں Vite + Lit ایپ کو کثیر لسانی (i18n) بنانے کا گائیڈ۔ AI ایجنٹس سے ترجمہ کریں اور بنڈل سائز، SEO اور پرفارمنس بہتر بنائیں۔"
keywords:
  - بین الاقوامی کاری
  - دستاویزات
  - Intlayer
  - Vite
  - Lit
  - ویب اجزاء
  - جاوا اسکرپٹ
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "سولڈ useIntlayer API کے استعمال کو براہ راست پراپرٹی تک رسائی میں اپ ڈیٹ کریں"
  - version: 8.4.10
    date: 2026-03-23
    changes: "ابتدائی تاریخ"
author: aymericzip
---

# Intlayer کا استعمال کرتے ہوئے اپنی Vite اور Lit ویب سائٹ کا ترجمہ کریں | بین الاقوامی کاری (i18n)

<Tabs defaultTab="code">
  <Tab label="کوڈ" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="ڈیمو" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="ڈیمو - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## فہرستِ مواد

<TOC/>

## Intlayer کیا ہے؟

**Intlayer** ایک جدید، اوپن سورس بین الاقوامی کاری (i18n) لائبریری ہے جسے جدید ویب ایپلی کیشنز میں کثیر لسانی مدد کو آسان بنانے کے لیے ڈیزائن کیا گیا ہے۔

Intlayer کے ساتھ، آپ:

- اجزاء کی سطح پر وضاحتی لغات کا استعمال کرتے ہوئے **ترجمہ کو آسانی سے منظم کریں**۔
- **میٹا ڈیٹا، روٹس، اور مواد کو متحرک طور پر مقامی بنائیں**۔
- خودکار طور پر تیار کردہ اقسام کے ساتھ **TypeScript سپورٹ کو یقینی بنائیں**، جس سے آٹو مکمل ہونے اور غلطی کی نشاندہی میں بہتری آتی ہے۔
- متحرک مقام (locale) کی شناخت اور تبدیلی جیسی **جدید خصوصیات سے فائدہ اٹھائیں**۔

---

## Vite اور Lit ایپلی کیشن میں Intlayer سیٹ کرنے کے لیے مرحلہ وار گائیڈ

<Steps>

<Step number={1} title="انحصار (Dependencies) انسٹال کریں">

npm کا استعمال کرتے ہوئے ضروری پیکجز انسٹال کریں:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> `--interactive` فلیگ اختیاری ہے۔ اگر آپ AI ایجنٹ ہیں تو `intlayer-cli init` استعمال کریں۔

> یہ کمانڈ آپ کے ماحول کا پتہ لگائے گی اور مطلوبہ پیکیجز انسٹال کرے گی۔ مثال کے طور پر:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  بنیادی پیکج جو کنفیگریشن مینجمنٹ، ترجمہ، [مواد کی اعلامیہ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md)، ٹرانسپائلیشن، اور [CLI کمانڈز](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/index.md) کے لیے بین الاقوامی کاری کے ٹولز فراہم کرتا ہے۔

- **lit-intlayer**
  وہ پیکج جو Intlayer کو Lit ایپلی کیشنز کے ساتھ مربوط کرتا ہے۔ یہ `ReactiveController` پر مبنی ہکس (`useIntlayer` ، `useLocale` وغیرہ) فراہم کرتا ہے تاکہ مقام تبدیل ہونے پر LitElement خود بخود دوبارہ رینڈر ہو سکیں۔

- **vite-intlayer**
  اس میں [Vite بنڈلر](https://vite.dev/guide/why.html#why-bundle-for-production) کے ساتھ Intlayer کو مربوط کرنے کے لیے Vite پلگ ان، نیز صارف کے پسندیدہ مقام کا پتہ لگانے، کوکیز کو منظم کرنے اور URL ری ڈائریکشن کو سنبھالنے کے لیے مڈل ویئر شامل ہے۔

</Step>

<Step number={2} title="اپنے پروجیکٹ کی کنفیگریشن">

اپنی ایپلی کیشن کی زبانوں کو کنفیگر کرنے کے لیے ایک کنفیگ فائل بنائیں:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // آپ کے دیگر مقامات (locales)
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> اس کنفیگریشن فائل کے ذریعے، آپ مقامی URLs، مڈل ویئر ری ڈائریکشن، کوکی کے نام، اپنے مواد کے اعلانات کا مقام اور ایکسٹینشن سیٹ کر سکتے ہیں، کنسول میں Intlayer لاگز بند کر سکتے ہیں، اور بہت کچھ۔ دستیاب پیرامیٹرز کی مکمل فہرست کے لیے، [کنفیگریشن دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) دیکھیں۔

</Step>

<Step number={3} title="اپنی Vite کنفیگریشن میں Intlayer کو مربوط کریں">

اپنی کنفیگریشن میں intlayer پلگ ان شامل کریں۔

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite پلگ ان کا استعمال Intlayer کو Vite کے ساتھ مربوط کرنے کے لیے کیا جاتا ہے۔ یہ مواد کے اعلامیہ فائلوں کی تعمیر کو یقینی بناتا ہے اور ترقی کے موڈ میں ان کی نگرانی کرتا ہے۔ یہ Vite ایپلی کیشن کے اندر Intlayer ماحول کے تغیرات (environment variables) کی وضاحت کرتا ہے۔ مزید برآں، یہ کارکردگی کو بہتر کرنے کے لیے عرف (aliases) فراہم کرتا ہے۔

</Step>

<Step number={4} title="اپنے انٹری پوائنٹ میں Intlayer کو شروع کریں">

کسی بھی حسب ضرورت اجزاء (custom elements) کے رجسٹر ہونے سے **پہلے** `installIntlayer()` کو کال کریں تاکہ پہلا جزو جڑتے وقت عالمی مقام کا سنگلٹن تیار ہو۔

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// کسی بھی LitElement کے DOM سے جڑنے سے پہلے کال کیا جانا چاہیے۔
installIntlayer();

// اپنے حسب ضرورت اجزاء کو درآمد اور رجسٹر کریں۔
import "./my-element.js";
```

اگر آپ `md()` مواد کے اعلانات (Markdown) بھی استعمال کرتے ہیں، تو مارک ڈاؤن رینڈرر بھی انسٹال کریں:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="اپنے مواد کا اعلان کریں">

ترجمہ محفوظ کرنے کے لیے اپنے مواد کے اعلانات بنائیں اور ان کا انتظام کریں:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
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
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener مزید معلومات"
      }
    }
  }
}
```

> آپ کے مواد کے اعلانات آپ کی ایپلی کیشن میں کہیں بھی بیان کیے جا سکتے ہیں جب تک کہ وہ `contentDir` ڈائرکٹری (بطور ڈیفالٹ، `./src`) میں شامل ہوں اور مواد کے اعلامیہ فائل کی ایکسٹینشن (بطور ڈیفالٹ، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) سے میل کھاتے ہوں۔
>
> مزید تفصیلات کے لیے، [مواد کے اعلامیہ کی دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) دیکھیں۔

</Step>

<Step number={6} title="اپنے LitElement میں Intlayer کا استعمال کریں">

ایک `LitElement` کے اندر `useIntlayer` کا استعمال کریں۔ یہ ایک `ReactiveController` پراکسی واپس کرتا ہے جو فعال مقام تبدیل ہونے پر خود بخود دوبارہ رینڈرنگ شروع کر دیتا ہے - کسی اضافی سیٹ اپ کی ضرورت نہیں ہے۔

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer خود کو ایک ReactiveController کے طور پر رجسٹر کرتا ہے۔
  // مقام تبدیل ہونے پر جزو خود بخود دوبارہ رینڈر ہوتا ہے۔
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> جب آپ کو مقامی HTML ایٹریبیوٹ (جیسے `alt` ، `aria-label` ، `title`) میں ترجمہ شدہ سٹرنگ کی ضرورت ہو، تو لیف نوڈ پر `.value` کو کال کریں:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="اپنے مواد کی زبان تبدیل کریں" isOptional={true}>

اپنے مواد کی زبان تبدیل کرنے کے لیے، `useLocale` کنٹرولر کے ذریعے فراہم کردہ `setLocale` طریقہ استعمال کریں۔

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="مارک ڈاؤن اور HTML مواد رینڈر کریں" isOptional={true}>

Intlayer `md()` اور `html()` مواد کے اعلانات کی حمایت کرتا ہے۔ Lit میں، مرتب شدہ آؤٹ پٹ کو `unsafeHTML` ہدایت کے ذریعے کچے HTML کے طور پر انجیکٹ کیا جاتا ہے۔

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

اپنے جزو میں مرتب شدہ HTML رینڈر کریں:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` `IntlayerNode` پر `toString()` کال کرتا ہے، جو کچا مارک ڈاؤن سٹرنگ واپس کرتا ہے۔ HTML سٹرنگ حاصل کرنے کے لیے اسے `compileMarkdown` پر منتقل کریں، پھر اسے Lit کی `unsafeHTML` ہدایت کے ساتھ رینڈر کریں۔

</Step>

<Step number={9} title="اپنی ایپلی کیشن میں مقامی روٹنگ شامل کریں" isOptional={true}>

ہر زبان کے لیے منفرد روٹس بنانے کے لیے (جو SEO کے لیے مفید ہے)، آپ Intlayer کے `localeMap` / `localeFlatMap` ہیلپرز کے ساتھ ایک کلائنٹ سائیڈ راؤٹر استعمال کر سکتے ہیں، اور سرور سائیڈ مقام کی نشاندہی کے لیے `intlayerProxy` Vite پلگ ان استعمال کر سکتے ہیں۔

سب سے پہلے، اپنی Vite کنفیگریشن میں `intlayerProxy` شامل کریں:

> یاد رکھیں کہ پروڈکشن میں `intlayerProxy` استعمال کرنے کے لیے آپ کو `vite-intlayer` کو `devDependencies` سے `dependencies` میں منتقل کرنے کی ضرورت ہے۔

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

</Step>

<Step number={10} title="مقام تبدیل ہونے پر URL تبدیل کریں" isOptional={true}>

مقام تبدیل ہونے پر براؤزر URL کو اپ ڈیٹ کرنے کے لیے مقام سوئچر کے ساتھ `useRewriteURL` استعمال کریں:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // مقام تبدیل ہونے پر خود بخود موجودہ URL کو دوبارہ لکھتا ہے۔
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="HTML زبان اور سمت کے ایٹریبیوٹس تبدیل کریں" isOptional={true}>

رسائی (accessibility) اور SEO کے لیے موجودہ مقام سے مطابقت رکھنے کے لیے `<html>` ٹیگ کے `lang` اور `dir` ایٹریبیوٹس کو اپ ڈیٹ کریں۔

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- آپ کا مواد -->`;
  }
}
```

</Step>

<Step number={12} title="اپنے اجزاء کا مواد نکالیں" isOptional={true}>

اگر آپ کے پاس موجودہ کوڈ بیس ہے، تو ہزاروں فائلوں کو تبدیل کرنا وقت طلب ہو سکتا ہے۔

اس عمل کو آسان بنانے کے لیے، Intlayer آپ کے اجزاء کو تبدیل کرنے اور مواد نکالنے کے لیے ایک [کمپائلر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/compiler.md) / [ایکسٹریکٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/extract.md) تجویز کرتا ہے۔

اسے سیٹ کرنے کے لیے، آپ اپنی `intlayer.config.ts` فائل میں ایک `compiler` سیکشن شامل کر سکتے ہیں:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... آپ کی کنفیگریشن کا باقی حصہ
  compiler: {
    /**
     * اشارہ کرتا ہے کہ آیا کمپائلر فعال ہونا چاہیے۔
     */
    enabled: true,

    /**
     * آؤٹ پٹ فائلوں کا راستہ متعین کرتا ہے
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * اشارہ کرتا ہے کہ آیا اجزاء کو تبدیل کرنے کے بعد محفوظ کیا جانا چاہیے۔
     * اس طرح، کمپائلر کو ایپ کو تبدیل کرنے کے لیے صرف ایک بار چلایا جا سکتا ہے، اور پھر اسے ہٹایا جا سکتا ہے۔
     */
    saveComponents: false,

    /**
     * لغت کی کلید کا سابقہ (Dictionary key prefix)
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

</Step>

</Steps>

### (Optional) Sitemap and robots.txt (build-time)

Intlayer includes formatters such as `generateSitemap` and `getMultilingualUrls` that produce crawler-ready multilingual `sitemap.xml` and `robots.txt` output you can write into your project’s `public/` folder. In practice you run a small Node script **before** Vite (for example `predev` / `prebuild` npm hooks) so those files exist when you build or serve the app.

#### Sitemap

Intlayer’s sitemap generator respects your locale setup and includes the usual metadata for crawlers.

> The generated sitemap supports the `xhtml:link` namespace (hreflang XML extensions). Unlike basic generators that only emit flat URLs, Intlayer wires bidirectional links between every localized variant of each page (for example `/about`, `/fr/about`, or `/about?lang=fr`, depending on your routing mode), which helps search engines relate localized URLs.

#### Robots.txt

Use `getMultilingualUrls` so `Disallow` entries cover every localized spelling of sensitive paths.

#### 1. Add `generate-seo.mjs` at the project root

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

`intlayer` must be installed so the script can import it. Set `SITE_URL` in the environment for production (for example in CI).

> Prefer `generate-seo.mjs` for Node ESM. If you use `generate-seo.js` instead, ensure `"type": "module"` is set in `package.json`, or run Node with ESM enabled.

#### 2. Run the script before Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Adjust if you use pnpm or yarn. You can also invoke the same script from CI or another step if that fits your workflow.

### TypeScript کنفیگر کریں

یقینی بنائیں کہ آپ کی TypeScript کنفیگریشن میں خودکار طور پر تیار کردہ اقسام شامل ہیں۔

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` اور `useDefineForClassFields: false` ڈیکوریٹر سپورٹ کے لیے Lit کی طرف سے ضروری ہیں۔

### Git کنفیگریشن

Intlayer کی طرف سے تیار کردہ فائلوں کو نظر انداز کرنے کی سفارش کی جاتی ہے۔ یہ آپ کو انہیں اپنی Git ریپوزٹری میں کمٹ (commit) کرنے سے بچنے میں مدد دیتا ہے۔

ایسا کرنے کے لیے، آپ اپنی `.gitignore` فائل میں درج ذیل ہدایت شامل کر سکتے ہیں:

```bash
# Intlayer کی طرف سے تیار کردہ فائلوں کو نظر انداز کریں
.intlayer
```

### VS Code ایکسٹینشن

Intlayer کے ذریعے اپنے ترقیاتی تجربے کو بہتر بنانے کے لیے، آپ آفیشل **Intlayer VS Code ایکسٹینشن** انسٹال کر سکتے ہیں۔

[VS Code مارکیٹ پلیس سے انسٹال کریں](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

یہ ایکسٹینشن فراہم کرتی ہے:

- ترجمہ کی کلیدوں کے لیے **آٹو مکمل ہونے کی خصوصیت**۔
- غیر موجود تراجم کے لیے **ریئل ٹائم غلطی کی نشاندہی**۔
- ترجمہ شدہ مواد کا **ان لائن پیش نظارہ**۔
- آسانی سے ترجمہ بنانے اور اپ ڈیٹ کرنے کے لیے **فوری کارروائیاں (Quick actions)**۔

ایکسٹینشن استعمال کرنے کے مزید تفصیلات کے لیے، [Intlayer VS Code ایکسٹینشن دستاویزات](https://intlayer.org/doc/vs-code-extension) دیکھیں۔

---

### مزید آگے بڑھیں

مزید آگے بڑھنے کے لیے، آپ [وژول ایڈیٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md) لاگو کر سکتے ہیں یا [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md) استعمال کر کے اپنے مواد کو بیرونی بنا سکتے ہیں۔
