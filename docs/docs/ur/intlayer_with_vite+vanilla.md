---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - 2026 میں ونیلا جے ایس ایپ کا ترجمہ کیسے کریں
description: دریافت کریں کہ اپنی Vite اور Vanilla JS ویب سائٹ کو کثیر لسانی کیسے بنایا جائے۔ بین الاقوامی کاری (i18n) اور ترجمے کے لیے دستاویزی معلومات پر عمل کریں۔
keywords:
  - بین الاقوامی کاری
  - دستاویزات
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Intlayer کا استعمال کرتے ہوئے اپنی Vite اور Vanilla JS ویب سائٹ کا ترجمہ کریں | بین الاقوامی کاری (i18n)

## فہرست مضامین

<TOC/>

## Intlayer کیا ہے؟

**Intlayer** ایک جدید، اوپن سورس بین الاقوامی کاری (i18n) لائبریری ہے جسے جدید ویب ایپلی کیشنز میں کثیر لسانی تعاون کو آسان بنانے کے لیے ڈیزائن کیا گیا ہے۔

Intlayer کے ساتھ، آپ:

- اجزاء کی سطح پر بیانیہ لغات کا استعمال کرتے ہوئے **ترجمہ آسانی سے منظم** کر سکتے ہیں۔
- میٹا ڈیٹا، راستوں اور مواد کو **متحرک طور پر مقامی** بنا سکتے ہیں۔
- خودکار طور پر تیار کردہ اقسام کے ساتھ **TypeScript تعاون کو یقینی** بنا سکتے ہیں، جس سے خود تکمیل اور غلطی کی نشاندہی بہتر ہوتی ہے۔
- متحرک لوکل کی شناخت اور تبدیلی جیسی **جدید خصوصیات سے فائدہ** اٹھا سکتے ہیں۔

---

## Vite اور Vanilla JS ایپلی کیشن میں Intlayer ترتیب دینے کے لیے مرحلہ وار گائیڈ

### مرحلہ 1: انحصار انسٹال کریں

npm کا استعمال کرتے ہوئے ضروری پیکجز انسٹال کریں:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  بنیادی پیکج جو ترتیب کے انتظام، ترجمہ، [مواد کے اعلان](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md)، ٹرانسپائلیشن اور [CLI کمانڈز](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/index.md) کے لیے بین الاقوامی کاری کے اوزار فراہم کرتا ہے۔

- **vanilla-intlayer**
  پیکج جو Intlayer کو خالص JavaScript / TypeScript ایپلی کیشنز کے ساتھ مربوط کرتا ہے۔ یہ ایک pub/sub singleton (`IntlayerClient`) اور کال بیک پر مبنی مددگار (`useIntlayer`, `useLocale`, وغیرہ) فراہم کرتا ہے تاکہ آپ کے ایپ کا کوئی بھی حصہ بغیر کسی UI فریم ورک پر انحصار کیے لوکل کی تبدیلیوں پر ردعمل دے سکے۔

- **vite-intlayer**
  Intlayer کو [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) کے ساتھ مربوط کرنے کے لیے Vite پلگ ان، نیز صارف کے ترجیحی لوکل کا پتہ لگانے، کوکیز کو منظم کرنے اور URL ری ڈائرکشن کو سنبھالنے کے لیے مڈل ویئر شامل ہے۔

### مرحلہ 2: اپنے پروجیکٹ کی ترتیب

اپنی ایپلی کیشن کی زبانیں ترتیب دینے کے لیے ایک کنفیگریشن فائل بنائیں:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // آپ کے دیگر لوکلز
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // آپ کے دیگر لوکلز
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // آپ کے دیگر لوکلز
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> اس ترتیباتی فائل کے ذریعے، آپ مقامی URLs، مڈل ویئر ری ڈائرکشن، کوکی کے نام، اپنے مواد کے اعلانات کا مقام اور توسیع ترتیب دے سکتے ہیں، کنسول میں Intlayer لاگز کو غیر فعال کر سکتے ہیں، اور بہت کچھ۔ دستیاب پیرامیٹرز کی مکمل فہرست کے لیے، [کنفیگریشن دستاویزی معلومات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) دیکھیں۔

### مرحلہ 3: اپنی Vite کنفیگریشن میں Intlayer شامل کریں

اپنی کنفیگریشن میں intlayer پلگ ان شامل کریں۔

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> `intlayer()` Vite پلگ ان Intlayer کو Vite کے ساتھ مربوط کرنے کے لیے استعمال ہوتا ہے۔ یہ مواد کے اعلان کی فائلوں کی تیاری کو یقینی بناتا ہے اور ترقیاتی موڈ میں ان پر نظر رکھتا ہے۔ یہ Vite ایپلی کیشن کے اندر Intlayer کے ماحولیاتی متغیرات کی تعریف کرتا ہے۔ مزید برآں، یہ کارکردگی کو بہتر بنانے کے لیے عرفی نام (aliases) فراہم کرتا ہے۔

### مرحلہ 4: اپنے انٹری پوائنٹ میں Intlayer بوٹسٹریپ کریں

کسی بھی مواد کو رینڈر کرنے سے **پہلے** `installIntlayer()` کو کال کریں تاکہ عالمی لوکل سنگلٹن تیار ہو جائے۔

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// کسی بھی i18n مواد کو رینڈر کرنے سے پہلے کال کیا جانا چاہیے۔
installIntlayer();

// اپنے ایپ ماڈیولز امپورٹ کریں اور چلائیں۔
import "./app.js";
```

اگر آپ `md()` مواد کے اعلانات (Markdown) بھی استعمال کرتے ہیں، تو مارک ڈاؤن رینڈرر بھی انسٹال کریں:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

### مرحلہ 5: اپنے مواد کا اعلان کریں

ترجموں کو محفوظ کرنے کے لیے اپنے مواد کے اعلانات بنائیں اور ان کا انتظام کریں:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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
      es: "مزید جاننے کے لیے Vite لوگو پر کلک کریں",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
      es: "مزید جاننے کے لیے Vite لوگو پر کلک کریں",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      es: "مزید جاننے کے لیے Vite لوگو پر کلک کریں",
    }),
  },
};

module.exports = appContent;
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
        "es": "مزید جاننے کے لیے Vite لوگو پر کلک کریں"
      }
    }
  }
}
```

> آپ کے مواد کے اعلانات آپ کی ایپلی کیشن میں کہیں بھی بیان کیے جا سکتے ہیں جب تک کہ وہ `contentDir` ڈائرکٹری (ڈیفالٹ کے طور پر `./src`) میں شامل ہوں اور مواد کے اعلان کی فائل کی توسیع (ڈیفالٹ کے طور پر `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) سے مطابقت رکھتے ہوں۔
>
> مزید تفصیلات کے لیے، [مواد کے اعلان کی دستاویزی معلومات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) دیکھیں۔

### مرحلہ 6: اپنے JavaScript میں Intlayer کا استعمال کریں

`vanilla-intlayer` لائبریری `react-intlayer` کے سرفیس API کی عکاسی کرتی ہے: `useIntlayer(key, locale?)` براہ راست ترجمہ شدہ مواد واپس کرتا ہے۔ لوکل کی تبدیلیوں کو سبسکرائب کرنے کے لیے نتیجے پر `.onChange()` کو جوڑیں — جو کہ React ری رینڈر کا واضح متبادل ہے۔

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// موجودہ لوکل کے لیے ابتدائی مواد حاصل کریں۔
// جب بھی لوکل تبدیل ہو تو اطلاع پانے کے لیے .onChange() جوڑیں۔
const content = useIntlayer("app").onChange((newContent) => {
  // صرف متاثرہ DOM نوڈس کو دوبارہ رینڈر کریں یا پیوند کاری کریں
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// ابتدائی رینڈر
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> لیف ویلیوز (leaf values) کو `String()` میں لپیٹ کر اسٹرنگ کے طور پر حاصل کریں، جو نوڈ کے `toString()` میتھڈ کو کال کرتا ہے اور ترجمہ شدہ متن واپس کرتا ہے۔
>
> جب آپ کو نیٹو HTML خاصیت (جیسے `alt`, `aria-label`) کے لیے ویلیو کی ضرورت ہو، تو براہ راست `.value` استعمال کریں:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (اختیاری) مرحلہ 7: اپنے مواد کی زبان تبدیل کریں

اپنے مواد کی زبان تبدیل کرنے کے لیے، `useLocale` کے فراہم کردہ `setLocale` فنکشن کا استعمال کریں۔

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
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

  select.addEventListener("change", () => setLocale(select.value as any));

  // جب لوکل کہیں بھی تبدیل ہو تو ڈراپ ڈاؤن کو ہم آہنگ رکھیں
  return subscribe((newLocale) => render(newLocale));
}
```

### (اختیاری) مرحلہ 8: مارک ڈاؤن اور HTML مواد رینڈر کریں

Intlayer `md()` اور `html()` مواد کے اعلانات کی حمایت کرتا ہے۔ Vanilla JS میں، کمپائل شدہ آؤٹ پٹ خام HTML کے طور پر `innerHTML` کے ذریعے داخل کیا جاتا ہے۔

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

HTML کمپائل کریں اور داخل کریں:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` نوڈ پر `toString()` کو کال کرتا ہے جو خام مارک ڈاؤن اسٹرنگ واپس کرتا ہے۔ HTML اسٹرنگ حاصل کرنے کے لیے اسے `compileMarkdown` میں پاس کریں، پھر اسے `innerHTML` کے ذریعے سیٹ کریں۔

> [!WARNING]
> `innerHTML` کو صرف بھروسہ مند مواد کے ساتھ استعمال کریں۔ اگر مارک ڈاؤن صارف کے ان پٹ سے آتا ہے، تو اسے پہلے صاف کریں (مثلاً DOMPurify کے ساتھ)۔ آپ متحرک طور پر صفائی کرنے والا رینڈرر انسٹال کر سکتے ہیں:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (اختیاری) مرحلہ 9: اپنی ایپلی کیشن میں مقامی راؤٹنگ (Localized Routing) شامل کریں

ہر زبان کے لیے منفرد راستے بنانے کے لیے (SEO کے لیے مفید)، آپ سرور سائیڈ لوکل کی شناخت کے لیے اپنی Vite کنفیگریشن میں `intlayerProxy` استعمال کر سکتے ہیں۔

سب سے پہلے، اپنی Vite کنفیگریشن میں `intlayerProxy` شامل کریں:

> یاد رکھیں کہ پروڈکشن میں `intlayerProxy` استعمال کرنے کے لیے آپ کو `vite-intlayer` کو `devDependencies` سے `dependencies` میں منتقل کرنا ہوگا۔

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // اسے پہلے رکھنا چاہیے
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // اسے پہلے رکھنا چاہیے
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // اسے پہلے رکھنا چاہیے
    intlayer(),
  ],
});
```

### (اختیاری) مرحلہ 10: لوکل کی تبدیلی پر URL تبدیل کریں

لوکل کی تبدیلی پر براؤزر URL کو اپ ڈیٹ کرنے کے لیے، Intlayer انسٹال کرنے کے بعد `useRewriteURL()` کو کال کریں:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// URL کو فوری طور پر اور ہر بعد کی لوکل تبدیلی پر دوبارہ لکھتا ہے۔
// صفائی کے لیے ایک ان سبسکرائب فنکشن واپس کرتا ہے۔
const stopRewriteURL = useRewriteURL();
```

### (اختیاری) مرحلہ 11: HTML لینگویج اور ڈائریکشن ایٹریبیوٹس تبدیل کریں

رسائی (Accessibility) اور SEO کے لیے `<html>` ٹیگ کے `lang` اور `dir` ایٹریبیوٹس کو موجودہ لوکل کے مطابق اپ ڈیٹ کریں۔

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (اختیاری) مرحلہ 12: ہر لوکل کے لیے لغات لیزی لوڈ (Lazy-load) کریں

بڑی ایپس کے لیے آپ ہر لوکل کی لغت کو اس کے اپنے ٹکڑے (chunk) میں تقسیم کرنا چاہیں گے۔ Vite کے متحرک `import()` کے ساتھ `useDictionaryDynamic` استعمال کریں:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> ہر لوکل کا بنڈل صرف اس وقت حاصل کیا جاتا ہے جب وہ لوکل فعال ہو جائے اور نتیجہ کیش کر دیا جاتا ہے — اسی لوکل پر بعد کی تبدیلیاں فوری ہوتی ہیں۔

### (اختیاری) مرحلہ 13: اپنے اجزاء سے مواد نکالیں (Extract)

اگر آپ کے پاس پہلے سے موجود کوڈ بیس ہے، تو ہزاروں فائلوں کو تبدیل کرنا وقت طلب ہو سکتا ہے۔

اس عمل کو آسان بنانے کے لیے، Intlayer آپ کے اجزاء کو تبدیل کرنے اور مواد نکالنے کے لیے ایک [کمپائلر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/compiler.md) / [ایکسٹریکٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/extract.md) تجویز کرتا ہے۔

تیاری کے لیے، آپ اپنی `intlayer.config.ts` فائل میں `compiler` سیکشن شامل کر سکتے ہیں:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... آپ کی باقی کنفیگریشن
  compiler: {
    /**
     * اشارہ کرتا ہے کہ آیا کمپائلر فعال ہونا چاہیے۔
     */
    enabled: true,

    /**
     * آؤٹ پٹ فائلوں کے پاتھ کی تعریف کرتا ہے
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * اشارہ کرتا ہے کہ آیا اجزاء کو تبدیل کرنے کے بعد محفوظ کیا جانا چاہیے۔
     * اس طرح، کمپائلر کو ایپ کو تبدیل کرنے کے لیے صرف ایک بار چلایا جا سکتا ہے، اور پھر اسے ہٹایا جا سکتا ہے۔
     */
    saveComponents: false,

    /**
     * لغت کی کلید کا سابقہ
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract کمانڈ'>

اپنے اجزاء کو تبدیل کرنے اور مواد نکالنے کے لیے ایکسٹریکٹر چلائیں

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

 </Tab>
 <Tab value='Babel کمپائلر'>

`intlayerCompiler` پلگ ان شامل کرنے کے لیے اپنی `vite.config.ts` اپ ڈیٹ کریں:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // کمپائلر پلگ ان شامل کرتا ہے
  ],
});
```

```bash packageManager="npm"
npm run build # یا npm run dev
```

```bash packageManager="pnpm"
pnpm run build # یا pnpm run dev
```

```bash packageManager="yarn"
yarn build # یا yarn dev
```

```bash packageManager="bun"
bun run build # یا bun run dev
```

 </Tab>
</Tabs>

### TypeScript کنفیگر کریں

یقینی بنائیں کہ آپ کی TypeScript کنفیگریشن میں خودکار طور پر تیار کردہ اقسام شامل ہیں۔

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git کنفیگریشن

Intlayer کے ذریعے تیار کردہ فائلوں کو نظر انداز کرنے کی سفارش کی جاتی ہے۔ یہ آپ کو انہیں اپنے Git ریپوزٹری میں کمٹ کرنے سے بچنے کی اجازت دیتا ہے۔

ایسا کرنے کے لیے، آپ اپنی `.gitignore` فائل میں درج ذیل ہدایات شامل کر سکتے ہیں:

```bash
# Intlayer کے ذریعے تیار کردہ فائلوں کو نظر انداز کریں
.intlayer
```

### VS Code ایکسٹینشن

Intlayer کے ساتھ اپنے ترقیاتی تجربے کو بہتر بنانے کے لیے، آپ سرکاری **Intlayer VS Code ایکسٹینشن** انسٹال کر سکتے ہیں۔

[VS Code Marketplace سے انسٹال کریں](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

یہ ایکسٹینشن فراہم کرتا ہے:

- ترجمہ کی کلیدوں کے لیے **خود تکمیل (Autocompletion)**۔
- غائب ترجموں کے لیے **ریئل ٹائم غلطی کی شناخت**۔
- ترجمہ شدہ مواد کا **ان لائن پیش نظارہ (Inline preview)**۔
- ترجموں کو آسانی سے بنانے اور اپ ڈیٹ کرنے کے لیے **فوری اقدامات (Quick actions)**۔

ایکسٹینشن کے استعمال کے بارے میں مزید تفصیلات کے لیے، [Intlayer VS Code ایکسٹینشن دستاویزی معلومات](https://intlayer.org/doc/vs-code-extension) دیکھیں۔

---

### مزید آگے بڑھیں

مزید گہرائی میں جانے کے لیے، آپ [بصری ایڈیٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md) لاگو کر سکتے ہیں یا [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md) کا استعمال کرتے ہوئے اپنے مواد کو ایکسٹرنل بنا سکتے ہیں۔
