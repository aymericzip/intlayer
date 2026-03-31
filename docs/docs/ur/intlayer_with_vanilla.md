---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - 2026 میں Vanilla JS ایپ کا ترجمہ کیسے کریں
description: دریافت کریں کہ اپنی Vanilla JS ویب سائٹ کو کثیر لسانی کیسے بنایا جائے۔ بین الاقوامی کاری (i18n) اور ترجمہ کے لیے دستاویزات پر عمل کریں۔
keywords:
  - بین الاقوامی کاری
  - دستاویزات
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
    changes: "تاریخ کا آغاز"
---

# Intlayer کا استعمال کرتے ہوئے اپنی Vanilla JS ویب سائٹ کا ترجمہ کریں | بین الاقوامی کاری (i18n)

## فہرست مواد

<TOC/>

## Intlayer کیا ہے؟

**Intlayer** ایک جدید، اوپن سورس بین الاقوامی کاری (i18n) لائبریری ہے جسے جدید ویب ایپلی کیشنز میں کثیر لسانی تعاون کو آسان بنانے کے لیے ڈیزائن کیا گیا ہے۔

Intlayer کے ساتھ، آپ یہ کر سکتے ہیں:

- جزو کی سطح پر بیانیہ لغات کا استعمال کرتے ہوئے **آسانی سے تراجم کا انتظام کریں**۔
- **میٹا ڈیٹا، راستوں اور مواد کو متحرک طور پر مقامی بنائیں**۔
- خودکار طور پر تیار کردہ اقسام کے ساتھ **TypeScript تعاون کو یقینی بنائیں**، جو آٹو تکمیل اور غلطی کی نشاندہی کو بہتر بناتا ہے۔
- **جدید خصوصیات سے فائدہ اٹھائیں**، جیسے متحرک لوکیل کی شناخت اور تبدیلی۔

یہ گائیڈ یہ بتاتی ہے کہ Vanilla JavaScript ایپلی کیشن میں **پیکیج منیجر یا بنڈلر کے استعمال کے بغیر** (جیسے Vite، Webpack وغیرہ) Intlayer کا استعمال کیسے کریں۔

اگر آپ کی ایپلی کیشن بنڈلر (جیسے Vite) کا استعمال کرتی ہے، تو ہم تجویز کرتے ہیں کہ اس کے بجائے [Vite + Vanilla JS گائیڈ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_vite+vanilla.md) پر عمل کریں۔

اسٹینڈ اکیلے بنڈل کا استعمال کرتے ہوئے، آپ ایک واحد JavaScript فائل کے ذریعے Intlayer کو براہ راست اپنی HTML فائلوں میں درآمد کر سکتے ہیں، جو اسے پرانے پروجیکٹس یا سادہ جامد سائٹس کے لیے بہترین بناتا ہے۔

---

## Vanilla JS ایپلی کیشن میں Intlayer ترتیب دینے کے لیے مرحلہ وار گائیڈ

### مرحلہ 1: انحصار نصب کریں

npm کا استعمال کرتے ہوئے ضروری پیکیجز نصب کریں:

```bash packageManager="npm"
# intlayer اور vanilla-intlayer کا اسٹینڈ اکیلے بنڈل تیار کریں
# یہ فائل آپ کے HTML فائل میں درآمد کی جائے گی
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer کو کنفیگ فائل کے ساتھ شروع کریں
npx intlayer init --no-gitignore

# لغات بنائیں
npx intlayer build
```

```bash packageManager="pnpm"
# intlayer اور vanilla-intlayer کا اسٹینڈ اکیلے بنڈل تیار کریں
# یہ فائل آپ کے HTML فائل میں درآمد کی جائے گی
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer کو کنفیگ فائل کے ساتھ شروع کریں
pnpm intlayer init --no-gitignore

# لغات بنائیں
pnpm intlayer build
```

```bash packageManager="yarn"
# intlayer اور vanilla-intlayer کا اسٹینڈ اکیلے بنڈل تیار کریں
# یہ فائل آپ کے HTML فائل میں درآمد کی جائے گی
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer کنفیگ فائل، TypeScript اگر ترتیب دی گئی ہو، env var شروع کریں
yarn intlayer init --no-gitignore

# لغات بنائیں
yarn intlayer build
```

```bash packageManager="bun"
# intlayer اور vanilla-intlayer کا اسٹینڈ اکیلے بنڈل تیار کریں
# یہ فائل آپ کے HTML فائل میں درآمد کی جائے گی
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer کو کنفیگ فائل کے ساتھ شروع کریں
bun x intlayer init --no-gitignore

# لغات بنائیں
bun x intlayer build
```

- **intlayer**
  بنیادی پیکیج جو کنفیگریشن مینجمنٹ، ترجمہ، [مواد کا اعلان](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md)، ٹرانسپائلیشن، اور [CLI کمانڈز](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/index.md) کے لیے بین الاقوامی کاری کے ٹولز فراہم کرتا ہے۔

- **vanilla-intlayer**
  وہ پیکیج جو Intlayer کو خالص JavaScript / TypeScript ایپلی کیشنز کے ساتھ مربوط کرتا ہے۔ یہ ایک pub/sub سنگلٹن (`IntlayerClient`) اور کال بیک پر مبنی مددگار (`useIntlayer`, `useLocale` وغیرہ) فراہم کرتا ہے تاکہ آپ کے ایپ کا کوئی بھی حصہ UI فریم ورک پر انحصار کیے بغیر لوکیل کی تبدیلیوں پر ردعمل دے سکے۔

> `intlayer standalone` CLI کی بنڈلنگ ایکسپورٹ آپ کی ترتیب (configuration) کے لیے مخصوص غیر استعمال شدہ پیکیجز، لوکیلز، اور غیر ضروری لاجک (جیسے ری ڈائریکٹس یا سابقے) کو ٹری شیکنگ (tree-shaking) کے ذریعے خارج کر کے ایک بہترین بلڈ بناتی ہے۔

### مرحلہ 2: اپنے پروجیکٹ کی کنفیگریشن

اپنی ایپلی کیشن کی زبانوں کو ترتیب دینے کے لیے ایک کنفیگ فائل بنائیں:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // آپ کے دیگر لوکیل
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
      // آپ کے دیگر لوکیل
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
      // آپ کے دیگر لوکیل
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> اس کنفیگریشن فائل کے ذریعے، آپ مقامی URLs، مڈل ویئر ری ڈائریکشن، کوکی کے نام، اپنے مواد کے اعلانات کی جگہ اور توسیع، کنسول میں Intlayer لاگز کو غیر فعال کرنا، اور بہت کچھ ترتیب دے سکتے ہیں۔ دستیاب پیرامیٹرز کی مکمل فہرست کے لیے، [کنفیگریشن دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) دیکھیں۔

### مرحلہ 3: اپنے HTML میں بنڈل درآمد کریں

ایک بار جب آپ `intlayer.js` بنڈل تیار کر لیں، تو آپ اسے اپنی HTML فائل میں درآمد کر سکتے ہیں:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="ur" dir="rtl">
  <head>
    <meta charset="UTF-8" />

    <!-- بنڈل درآمد کریں -->
    <script src="./intlayer.js" defer></script>
    <!-- اپنی مین اسکرپٹ درآمد کریں -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

بنڈل `Intlayer` اور `VanillaIntlayer` کو `window` پر عالمی اشیاء کے طور پر ظاہر کرتا ہے۔

### مرحلہ 4: اپنے انٹری پوائنٹ میں Intlayer کو بوٹ اسٹریپ کریں

اپنے `src/main.js` میں، کسی بھی مواد کے رینڈر ہونے سے **پہلے** `installIntlayer()` کو کال کریں تاکہ عالمی لوکیل سنگلٹن تیار ہو جائے۔

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// کسی بھی i18n مواد کو رینڈر کرنے سے پہلے کال کیا جانا چاہیے۔
installIntlayer();
```

اگر آپ مارک ڈاؤن رینڈرر بھی استعمال کرنا چاہتے ہیں، تو `installIntlayerMarkdown()` کال کریں:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### مرحلہ 5: اپنے مواد کا اعلان کریں

تراجم کو اسٹور کرنے کے لیے اپنے مواد کے اعلانات بنائیں اور ان کا انتظام کریں:

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
      es: "مزید جاننے کے لیے وائٹ (Vite) لوگو پر کلک کریں",
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
      es: "وائٹ (Vite) لوگو پر کلک کر کے مزید جانیں",
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
      es: "مزید جاننے کے لیے وائٹ (Vite) لوگو پر کلک کریں",
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
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> آپ کے مواد کے اعلانات آپ کی ایپلی کیشن میں کہیں بھی بیان کیے جا سکتے ہیں جیسے ہی وہ `contentDir` ڈائرکٹری (ڈیفالٹ کے طور پر، `./src`) میں شامل ہوتے ہیں۔ اور مواد کے اعلان کی فائل کی توسیع (ڈیفالٹ کے طور پر، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) سے ملتے ہیں۔
>
> مزید تفصیلات کے لیے، [مواد کے اعلان کے دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) دیکھیں۔

### مرحلہ 6: اپنے JavaScript میں Intlayer استعمال کریں

`window.VanillaIntlayer` آبجیکٹ API مددگار فراہم کرتا ہے: `useIntlayer(key, locale?)` دی گئی کلید کے لیے ترجمہ شدہ مواد واپس کرتا ہے۔

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// موجودہ لوکیل کے لیے ابتدائی مواد حاصل کریں۔
// جب بھی لوکیل تبدیل ہو تو مطلع ہونے کے لیے .onChange() جوڑیں۔
const content = useIntlayer("app").onChange((newContent) => {
  // صرف متاثرہ DOM نوڈس کو دوبارہ رینڈر یا پیچ کریں
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// ابتدائی رینڈر
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> لیف کی اقدار کو `String()` میں لپیٹ کر اسٹرنگ کے طور پر حاصل کریں، جو نوڈ کے `toString()` طریقہ کو کال کرتا ہے اور ترجمہ شدہ متن واپس کرتا ہے۔
>
> جب آپ کو نیٹو HTML وصف (مثلاً `alt`, `aria-label`) کے لیے قدر کی ضرورت ہو، تو براہ راست `.value` استعمال کریں:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (اختیاری) مرحلہ 7: اپنے مواد کی زبان تبدیل کریں

اپنے مواد کی زبان تبدیل کرنے کے لیے، `useLocale` کے ذریعے ظاہر کردہ `setLocale` فنکشن استعمال کریں۔

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "زبان");

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

  // جب لوکیل کہیں اور سے تبدیل ہو تو ڈراپ ڈاؤن کو سنک میں رکھیں
  return subscribe((newLocale) => render(newLocale));
}
```

### (اختیاری) مرحلہ 8: HTML زبان اور سمت کے اوصاف کو تبدیل کریں

ایکسیسبیلٹی اور SEO کے لیے `<html>` ٹیگ کے `lang` اور `dir` اوصاف کو موجودہ لوکیل سے مطابقت رکھنے کے لیے اپ ڈیٹ کریں۔

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

### (اختیاری) مرحلہ 9: فی لوکیل لغات کو سست لوڈ (Lazy-load) کریں

اگر آپ فی لوکیل لغات کو سست لوڈ کرنا چاہتے ہیں، تو آپ `useDictionaryDynamic` استعمال کر سکتے ہیں۔ یہ مفید ہے اگر آپ ابتدائی `intlayer.js` فائل میں تمام تراجم کو بنڈل نہیں کرنا چاہتے ہیں۔

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

> نوٹ: `useDictionaryDynamic` کے لیے لغات کا علیحدہ ESM فائلوں کے طور پر دستیاب ہونا ضروری ہے۔ یہ طریقہ عام طور پر تب استعمال ہوتا ہے جب آپ کے پاس لغات پیش کرنے والا ویب سرور ہوتا ہے۔

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

### VS Code ایکسٹینشن

Intlayer کے ساتھ اپنے ترقی کے تجربے کو بہتر بنانے کے لیے، آپ سرکاری **Intlayer VS Code ایکسٹینشن** نصب کر سکتے ہیں۔

[VS Code مارکیٹ پلیس سے انسٹال کریں](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

یہ ایکسٹینشن فراہم کرتی ہے:

- ترجمہ کی چابیاں کے لیے **آٹو تکمیل**۔
- لاپتہ تراجم کے لیے **ریئل ٹائم غلطی کی نشاندہی**۔
- ترجمہ شدہ مواد کا **ان لائن پری ویو**۔
- تراجم کو آسانی سے تخلیق اور اپ ڈیٹ کرنے کے لیے **فوری اقدامات**۔

ایکسٹینشن کو استعمال کرنے کے طریقے کے بارے में مزید تفصیلات کے لیے، [Intlayer VS Code ایکسٹینشن دستاویزات](https://intlayer.org/doc/vs-code-extension) دیکھیں۔

---

### مزید آگے بڑھیں

مزید آگے بڑھنے کے لیے، آپ [بصری ایڈیٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md) کو نافذ کر سکتے ہیں یا [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md) کا استعمال کرتے ہوئے اپنے مواد کو بیرونی بنا سکتے ہیں۔
