---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - 2026 میں Fastify ایپ کا ترجمہ کیسے کریں
description: دریافت کریں کہ اپنے Fastify بیک اینڈ کو کثیر لسانی کیسے بنایا جائے۔ بین الاقوامی کاری (i18n) اور ترجمے کے لیے دستاویزات پر عمل کریں۔
keywords:
  - بین الاقوامی کاری
  - دستاویزات
  - Intlayer
  - Fastify
  - JavaScript
  - بیک اینڈ
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "init کمانڈ کا اضافہ"
  - version: 7.6.0
    date: 2025-12-31
    changes: "تاریخچہ شروع کیا گیا"
---

# Intlayer کا استعمال کرتے ہوئے اپنی Fastify بیک اینڈ ویب سائٹ کا ترجمہ کریں | بین الاقوامی کاری (i18n)

`fastify-intlayer` Fastify ایپلی کیشنز کے لیے ایک طاقتور بین الاقوامی کاری (i18n) پلگ ان ہے، جو کلائنٹ کی ترجیحات کی بنیاد پر مقامی جوابات فراہم کر کے آپ کے بیک اینڈ سروسز کو عالمی سطح پر قابل رسائی بنانے کے لیے ڈیزائن کیا گیا ہے۔

> GitHub پر پیکیج کی عمل درآمد دیکھیں: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### عملی استعمال کے معاملات

- **صارف کی زبان میں بیک اینڈ کی غلطیاں دکھانا**: جب کوئی غلطی ہوتی ہے تو صارف کی مادری زبان میں پیغامات دکھانے سے سمجھنے میں آسانی ہوتی ہے اور مایوسی کم ہوتی ہے۔ یہ خاص طور پر متحرک غلطی کے پیغامات کے لیے مفید ہے جو فرنٹ اینڈ اجزاء جیسے ٹوسٹ یا موڈلز میں دکھائے جا سکتے ہیں۔
- **کثیر لسانی مواد کی بازیافت**: ایسی ایپلی کیشنز کے لیے جو ڈیٹا بیس سے مواد حاصل کرتی ہیں، بین الاقوامی کاری اس بات کو یقینی بناتی ہے کہ آپ اس مواد کو متعدد زبانوں میں فراہم کر سکیں۔ یہ ای کامرس سائٹس یا کنٹینٹ مینجمنٹ سسٹم جیسے پلیٹ فارمز کے لیے بہت اہم ہے جنہیں مصنوعات کی تفصیلات، مضامین اور دیگر مواد صارف کی پسندیدہ زبان میں دکھانے کی ضرورت ہوتی ہے۔
- **کثیر لسانی ای میلز بھیجنا**: چاہے وہ ٹرانزیکشنل ای میلز ہوں، مارکیٹنگ مہمات ہوں یا نوٹیفیکیشنز، وصول کنندہ کی زبان میں ای میلز بھیجنے سے مشغولیت اور تاثیر میں نمایاں اضافہ ہو سکتا ہے۔
- **کثیر لسانی پش نوٹیفیکیشنز**: موبائل ایپلی کیشنز کے لیے صارف کی پسندیدہ زبان میں پش نوٹیفیکیشنز بھیجنے سے تعامل اور برقرار رکھنے کی شرح میں بہتری آ سکتی ہے۔ یہ ذاتی ٹچ نوٹیفیکیشنز کو زیادہ متعلقہ اور قابل عمل محسوس کرا سکتا ہے۔
- **دیگر مواصلات**: بیک اینڈ سے مواصلات کی کوئی بھی شکل، جیسے SMS پیغامات، سسٹم الرٹس یا یوزر انٹرفیس اپ ڈیٹس، صارف کی زبان میں ہونے سے واضحیت کو یقینی بناتی ہے اور مجموعی صارف کے تجربے کو بہتر بناتی ہے۔

بیک اینڈ کو بین الاقوامی بنا کر، آپ کی ایپلی کیشن نہ صرف ثقافتی اختلافات کا احترام کرتی ہے بلکہ عالمی مارکیٹ کی ضروریات کے ساتھ بھی بہتر طور پر ہم آہنگ ہوتی ہے، جو آپ کی سروسز کو دنیا بھر میں پھیلانے کے لیے ایک اہم قدم ہے۔

## شروع کرنا

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer کا استعمال کرتے ہوئے اپنی ایپلی کیشن کو بین الاقوامی کیسے بنائیں"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub پر [ایپلی کیشن ٹیمپلیٹ](https://github.com/aymericzip/intlayer-fastify-template) دیکھیں۔

### تنصیب

`fastify-intlayer` کا استعمال شروع کرنے کے لیے، npm کا استعمال کرتے ہوئے پیکیج انسٹال کریں:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### ترتیب

اپنے پروجیکٹ کی روٹ ڈائریکٹری میں `intlayer.config.ts` فائل بنا کر بین الاقوامی کاری کی ترتیبات ترتیب دیں:

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

### اپنے مواد کا اعلان کریں

ترجمے محفوظ کرنے کے لیے اپنے مواد کے اعلانات بنائیں اور ان کا انتظام کریں:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de مواد devuelto en español (México)",
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
      "es-MX": "Ejemplo de مواد devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de مواد devuelto en español (España)",
      "es-MX": "Ejemplo de مواد devuelto en español (México)",
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
        "es-MX": "Ejemplo de مواد devuelto en español (México)"
      }
    }
  }
}
```

> آپ کے مواد کے اعلانات ایپلی کیشن میں کہیں بھی بیان کیے جا سکتے ہیں جب تک کہ وہ `contentDir` ڈائریکٹری (بطور ڈیفالٹ `./src`) میں شامل ہوں۔ اور وہ مواد کے اعلان کی فائل کی توسیع (بطور ڈیفالٹ `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) سے مطابقت رکھنے چاہئیں۔

> مزید تفصیلات کے لیے، [مواد کے اعلان کی دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) دیکھیں۔

### Fastify ایپلی کیشن سیٹ اپ

`fastify-intlayer` استعمال کرنے کے لیے اپنی Fastify ایپلی کیشن سیٹ اپ کریں:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// بین الاقوامی کاری پلگ ان لوڈ کریں
await fastify.register(intlayer);

// راستے
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de مواد devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// سرور شروع کریں
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// بین الاقوامی کاری پلگ ان لوڈ کریں
await fastify.register(intlayer);

// راستے
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de مواد renvoyé en français",
    "es-ES": "Ejemplo de مواد devuelto en español (España)",
    "es-MX": "Ejemplo de مواد devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// سرور شروع کریں
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// async/await کے لیے سرور اسٹارٹ ریپر
const start = async () => {
  try {
    // بین الاقوامی کاری پلگ ان لوڈ کریں
    await fastify.register(intlayer);

    // راستے
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de مواد renvoyé en français",
        "es-ES": "Ejemplo de مواد devuelto en español (España)",
        "es-MX": "Ejemplo de مواد devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### مطابقت

`fastify-intlayer` درج ذیل کے ساتھ مکمل طور پر مطابقت رکھتا ہے:

- React ایپلی کیشنز کے لیے [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/react-intlayer/index.md)
- Next.js ایپلی کیشنز کے لیے [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/next-intlayer/index.md)
- Vite ایپلی کیشنز کے لیے [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/vite-intlayer/index.md)

یہ براؤزرز اور API درخواستوں سمیت مختلف ماحول میں کسی بھی بین الاقوامی کاری کے حل کے ساتھ بغیر کسی رکاوٹ کے کام کرتا ہے۔ آپ ہیڈرز یا کوکیز کے ذریعے لوکیل کا پتہ لگانے کے لیے مڈل ویئر کو اپنی مرضی کے مطابق بنا سکتے ہیں:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... دیگر ترتیب کے اختیارات
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
  // ... دیگر ترتیب کے اختیارات
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
  // ... دیگر ترتیب کے اختیارات
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

بطور ڈیفالٹ، `fastify-intlayer` کلائنٹ کی پسندیدہ زبان کا تعین کرنے کے لیے `Accept-Language` ہیڈر کی تشریح کرے گا۔

> ترتیب اور جدید موضوعات کے بارے میں مزید معلومات کے لیے ہماری [دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) دیکھیں۔

### TypeScript ترتیب دیں

`fastify-intlayer` بین الاقوامی کاری کے عمل کو بہتر بنانے کے لیے TypeScript کی مضبوط صلاحیتوں کا فائدہ اٹھاتا ہے۔ TypeScript کی جامد ٹائپنگ اس بات کو یقینی بناتی ہے کہ ہر ترجمے کی کلید کو مدنظر رکھا گیا ہے، جس سے ترجمے کے چھوٹ جانے کے خطرے کو کم کیا جاتا ہے اور دیکھ بھال کو بہتر بنایا جاتا ہے۔

یقینی بنائیں کہ خود بخود تیار کردہ ٹائپس (بطور ڈیفالٹ ./types/intlayer.d.ts میں) آپ کی tsconfig.json فائل میں شامل ہیں۔

```json5 fileName="tsconfig.json"
{
  // ... آپ کی موجودہ TypeScript ترتیبات
  "include": [
    // ... آپ کی موجودہ TypeScript ترتیبات
    ".intlayer/**/*.ts", // خود بخود تیار کردہ ٹائپس شامل کریں
  ],
}
```

### VS Code ایکسٹینشن

Intlayer کے ساتھ اپنے ترقیاتی تجربے کو بہتر بنانے کے لیے، آپ سرکاری **Intlayer VS Code Extension** انسٹال کر سکتے ہیں۔

[VS Code Marketplace سے انسٹال کریں](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

یہ ایکسٹینشن فراہم کرتا ہے:

- ترجمے کی کلیدوں کے لیے **آٹو کمپلیشن**۔
- چھوٹ جانے والے ترجموں کے لیے **ریئل ٹائم غلطی کا پتہ لگانا**۔
- ترجمہ شدہ مواد کا **ان لائن پیش نظارہ**۔
- آسانی سے ترجمے بنانے اور اپ ڈیٹ کرنے کے لیے **فوری اقدامات**۔

ایکسٹینشن کے استعمال کے بارے میں مزید تفصیلات کے لیے، [Intlayer VS Code Extension دستاویزات](https://intlayer.org/doc/vs-code-extension) دیکھیں۔

### Git ترتیب

انٹلیئر کے ذریعے تیار کردہ فائلوں کو نظر انداز کرنے کی سفارش کی جاتی ہے۔ یہ آپ کو انہیں اپنے Git ذخیرہ میں جمع کرانے سے بچنے کی اجازت دیتا ہے۔

ایسا کرنے کے لیے، آپ اپنی `.gitignore` فائل میں درج ذیل ہدایات شامل کر سکتے ہیں:

```plaintext fileName=".gitignore"
# انٹلیئر کے ذریعے تیار کردہ فائلوں کو نظر انداز کریں
.intlayer

```
