---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - 2026 میں Hono ایپ کا ترجمہ کیسے کریں
description: دریافت کریں کہ اپنے Hono بیک اینڈ کو کثیر لسانی کیسے بنایا جائے۔ اسے بین الاقوامی بنانے (i18n) اور ترجمہ کرنے کے لیے دستاویزات پر عمل کریں۔
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "init کمانڈ شامل کی گئی۔"
  - version: 5.5.10
    date: 2025-06-29
    changes: "تاریخ کا آغاز (Init history)"
---

# Intlayer کا استعمال کرتے ہوئے اپنی Hono بیک اینڈ ویب سائٹ کا ترجمہ کریں | بین الاقوامی بنانا (i18n)

`hono-intlayer` Hono ایپلی کیشنز کے لیے ایک طاقتور بین الاقوامی بنانے (i18n) کا مڈل ویئر ہے، جسے کلائنٹ کی ترجیحات کی بنیاد پر مقامی جوابات فراہم کر کے آپ کی بیک اینڈ سروسز کو عالمی سطح پر قابل رسائی بنانے کے لیے ڈیزائن کیا گیا ہے۔

### عملی استعمال کے کیسز (Practical Use Cases)

- **صارف کی زبان میں بیک اینڈ کی غلطیاں دکھانا**: جب کوئی غلطی ہوتی ہے، تو صارف کی مادری زبان میں پیغامات دکھانے سے سمجھ بہتر ہوتی ہے اور مایوسی کم ہوتی ہے۔ یہ خاص طور پر ان متحرک غلطی کے پیغامات کے لیے مفید ہے جو فرنٹ اینڈ اجزاء جیسے ٹوسٹ یا موڈلز میں دکھائے جا سکتے ہیں۔

- **کثیر لسانی مواد کی بازیافت**: ڈیٹا بیس سے مواد نکالنے والی ایپلی کیشنز کے لیے، بین الاقوامی بنانا اس بات کو یقینی بناتا ہے کہ آپ اس مواد کو متعدد زبانوں میں پیش کر سکیں۔ یہ ای کامرس سائٹس یا مواد کے انتظام کے نظام جیسے پلیٹ فارمز کے لیے بہت اہم ہے جنہیں صارف کی پسندیدہ زبان میں مصنوعات کی تفصیلات، مضامین اور دیگر مواد دکھانے کی ضرورت ہوتی ہے۔

- **کثیر لسانی ای میلز بھیجنا**: چاہے وہ لین دین کی ای میلز ہوں، مارکیٹنگ مہمات ہوں یا اطلاعات، وصول کنندہ کی زبان میں ای میلز بھیجنا مشغولیت اور تاثیر میں نمایاں اضافہ کر سکتا ہے۔

- **کثیر لسانی پش اطلاعات**: موبائل ایپلی کیشنز کے لیے، صارف کی پسندیدہ زبان میں پش اطلاعات بھیجنا تعامل اور برقرار رکھنے کی شرح کو بڑھا سکتا ہے۔ یہ ذاتی لمس اطلاعات کو زیادہ متعلقہ اور قابل عمل بنا سکتا ہے۔

- **دیگر مواصلات**: بیک اینڈ سے کسی بھی قسم کا مواصلہ، جیسے ایس ایم ایس پیغامات، سسٹم الرٹس یا یوزر انٹرفیس اپ ڈیٹس، صارف کی زبان میں ہونے سے شفافیت یقینی ہوتی ہے اور مجموعی صارف کا تجربہ بہتر ہوتا ہے۔

بیک اینڈ کو بین الاقوامی بنا کر، آپ کی ایپلی کیشن نہ صرف ثقافتی اختلافات کا احترام کرتی ہے بلکہ عالمی مارکیٹ کی ضروریات کے ساتھ بھی بہتر طور پر ہم آہنگ ہوتی ہے، جو آپ کی خدمات کو دنیا بھر میں پھیلانے کا ایک اہم قدم ہے۔

## شروع کرنا (Getting Started)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub پر [Application Template](https://github.com/aymericzip/intlayer-hono-template) دیکھیں۔

### تنصیب (Installation)

`hono-intlayer` کا استعمال شروع کرنے کے لیے، npm کا استعمال کرتے ہوئے پیکیج انسٹال کریں:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### سیٹ اپ (Setup)

اپنے پروجیکٹ کی جڑ (root) میں ایک `intlayer.config.ts` بنا کر بین الاقوامی بنانے کی ترتیبات کو کنفیگر کریں:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### اپنے مواد کا اعلان کریں (Declare Your Content)

ترجموں کو محفوظ کرنے کے لیے اپنے مواد کے اعلانات بنائیں اور ان کا انتظام کریں:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> آپ کے مواد کے اعلانات آپ کی ایپلی کیشن میں کہیں بھی بیان کیے جا سکتے ہیں جب تک کہ وہ `contentDir` ڈائریکٹری (بطور ڈیفالٹ، `./src`) میں شامل ہوں اور مواد کے اعلان کی فائل کی توسیع (بطور ڈیفالٹ، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) سے میل کھاتے ہوں۔

> مزید تفصیلات کے لیے، [مواد کے اعلان کی دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) دیکھیں۔

### Hono ایپلی کیشن سیٹ اپ (Hono Application Setup)

`hono-intlayer` استعمال کرنے کے لیے اپنی Hono ایپلی کیشن سیٹ اپ کریں:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// بین الاقوامی بنانے کے لیے درخواست کا ہینڈلر لوڈ کریں
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// بین الاقوامی بنانے کے لیے درخواست کا ہینڈلر لوڈ کریں
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t, getDictionary, getIntlayer } = require("hono-intlayer");
const dictionaryExample = require("./index.content");

const app = new Hono();

// بین الاقوامی بنانے کے لیے درخواست کا ہینڈلر لوڈ کریں
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

module.exports = app;
```

### مطابقت (Compatibility)

`hono-intlayer` مکمل طور پر مطابقت رکھتا ہے:

- React ایپلی کیشنز کے لیے [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/react-intlayer/index.md)
- Next.js ایپلی کیشنز کے لیے [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/next-intlayer/index.md)
- Vite ایپلی کیشنز کے لیے [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/vite-intlayer/index.md)

یہ براؤزر اور API درخواستوں سمیت مختلف ماحولوں میں کسی بھی بین الاقوامی حل کے ساتھ بغیر کسی رکاوٹ کے کام کرتا ہے۔ آپ ہیڈر یا کوکیز کے ذریعے مقام (locale) کا پتہ لگانے کے لیے مڈل ویئر کو اپنی مرضی کے مطابق بنا سکتے ہیں:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... دیگر کنفیگریشن کے اختیارات
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... دیگر کنفیگریشن کے اختیارات
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... دیگر کنفیگریشن کے اختیارات
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

بطور ڈیفالٹ، `hono-intlayer` کلائنٹ کی پسندیدہ زبان کا تعین کرنے کے لیے `Accept-Language` ہیڈر کی ترجمانی کرے گا۔

> کنفیگریشن اور جدید موضوعات کے بارے میں مزید معلومات کے لیے، ہماری [دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) دیکھیں۔

### TypeScript کنفیگر کریں (Configure TypeScript)

`hono-intlayer` بین الاقوامی نظام کو بہتر بنانے کے لیے TypeScript کی طاقتور خصوصیات کا فائدہ اٹھاتا ہے۔ TypeScript کی جامد ٹائپنگ اس بات کو یقینی بناتی ہے کہ ہر ترجمے کی کلید (translation key) موجود ہو، جس سے ترجمہ غائب ہونے کا خطرہ کم ہو جاتا ہے اور کام کو برقرار رکھنا آسان ہو جاتا ہے۔

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

یقینی بنائیں کہ خودکار طور پر تیار کردہ اقسام (بطور ڈیفالٹ `./types/intlayer.d.ts` پر) آپ کی `tsconfig.json` فائل میں شامل ہیں۔

```json5 fileName="tsconfig.json"
{
  // ... آپ کی موجودہ TypeScript کنفیگریشنز
  "include": [
    // ... آپ کی موجودہ TypeScript کنفیگریشنز
    ".intlayer/**/*.ts", // خودکار طور پر تیار کردہ اقسام کو شامل کریں
  ],
}
```

### VS Code ایکسٹینشن (VS Code Extension)

Intlayer کے ساتھ اپنے ڈیولپمنٹ کے تجربے کو بہتر بنانے کے لیے، آپ آفیشل **Intlayer VS Code Extension** انسٹال کر سکتے ہیں۔

[VS Code Marketplace سے انسٹال کریں](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

یہ ایکسٹینشن فراہم کرتی ہے:

- ترجمے کی کلیدوں کے لیے **Autocompletion**۔
- غائب ترجموں کے لیے **Real-time error detection**۔
- ترجمہ شدہ مواد کا **Inline previews**۔
- آسانی سے ترجمہ تخلیق کرنے اور اپ ڈیٹ کرنے کے لیے **Quick actions**۔

ایکسٹینشن استعمال کرنے کے طریقہ کے بارے میں مزید تفصیلات کے لیے، [Intlayer VS Code Extension دستاویزات](https://intlayer.org/doc/vs-code-extension) دیکھیں۔

### Git کنفیگریشن (Git Configuration)

Intlayer کی طرف سے تیار کردہ فائلوں کو نظر انداز کرنے کی سفارش کی جاتی ہے۔ یہ آپ کو انہیں اپنی Git ریپوزٹری میں شامل کرنے سے بچنے میں مدد دیتا ہے۔

ایسا کرنے کے لیے، آپ اپنی `.gitignore` فائل میں درج ذیل ہدایات شامل کر سکتے ہیں:

```plaintext fileName=".gitignore"
# Intlayer کی تیار کردہ فائلوں کو نظر انداز کریں
.intlayer
```
