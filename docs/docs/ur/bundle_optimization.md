---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: i18n بنڈل سائز اور کارکردگی کی بہتری
description: انٹرنیشنلائزیشن (i18n) مواد کو بہتر بنا کر ایپلیکیشن بنڈل کے سائز کو کم کریں۔ سیکھیں کہ Intlayer کے ساتھ ڈکشنریوں کے لیے ٹری شیکنگ (tree shaking) اور لیزی لوڈنگ (lazy loading) کا فائدہ کیسے اٹھایا جائے۔
keywords:
  - بنڈل کی بہتری
  - مواد کی آٹومیشن
  - متحرک مواد
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "بلڈ کنفیگریشن میں `minify` اور `purge` کے اختیارات شامل کیے گئے"
---

# i18n بنڈل سائز اور کارکردگی کی بہتری

روایتی i18n حلوں کے ساتھ سب سے عام چیلنجوں میں سے ایک جو JSON فائلوں پر انحصار کرتے ہیں وہ مواد کے سائز کا انتظام کرنا ہے۔ اگر ڈویلپرز دستی طور پر مواد کو نیم اسپیسز (namespaces) میں الگ نہیں کرتے ہیں، تو صارف اکثر صرف ایک صفحہ دیکھنے کے لیے ہر صفحے اور ممکنہ طور پر ہر زبان کے ترجمے ڈاؤن لوڈ کر لیتے ہیں۔

مثال کے طور پر، 10 زبانوں میں ترجمہ شدہ 10 صفحات والی ایپلیکیشن کے نتیجے میں ایک صارف 100 صفحات کا مواد ڈاؤن لوڈ کر سکتا ہے، چاہے اسے صرف **ایک** (موجودہ زبان میں موجودہ صفحہ) کی ضرورت ہو۔ اس سے بینڈوتھ کا ضیاع ہوتا ہے اور لوڈ ہونے کا وقت سست ہو جاتا ہے۔

**Intlayer بلڈ ٹائم آپٹیمائزیشن کے ذریعے اس مسئلے کو حل کرتا ہے۔** یہ آپ کے کوڈ کا تجزیہ کرتا ہے تاکہ پتہ لگایا جا سکے کہ فی کمپوننٹ کون سی ڈکشنریاں درحقیقت استعمال ہو رہی ہیں اور صرف ضروری مواد کو آپ کے بنڈل میں دوبارہ شامل کرتا ہے۔

## فہرست مواد

<TOC />

## اپنے بنڈل کو اسکین کریں

اپنے بنڈل کا تجزیہ کرنا "بھاری" JSON فائلوں اور کوڈ اسپلٹنگ (code-splitting) کے مواقع کی نشاندہی کرنے کا پہلا قدم ہے۔ یہ ٹولز آپ کی ایپلیکیشن کے مرتب شدہ کوڈ کا ایک بصری ٹری میپ (treemap) تیار کرتے ہیں، جس سے آپ دیکھ سکتے ہیں کہ کون سی لائبریریاں سب سے زیادہ جگہ لے رہی ہیں۔

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite ہڈ کے نیچے Rollup کا استعمال کرتا ہے۔ `rollup-plugin-visualizer` پلگ ان ایک انٹرایکٹو HTML فائل تیار کرتا ہے جو آپ کے گراف میں ہر ماڈیول کا سائز دکھاتی ہے۔

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // رپورٹ کو آپ کے براؤزر میں خود بخود کھولیں
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

ان پروجیکٹس کے لیے جو App Router اور Turbopack استعمال کر رہے ہیں، Next.js ایک بلٹ ان تجرباتی تجزیہ کار (experimental analyzer) فراہم کرتا ہے جس کے لیے کسی اضافی انحصار کی ضرورت نہیں ہوتی ہے۔

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

اگر آپ Next.js میں ڈیفالٹ Webpack بنڈلر استعمال کر رہے ہیں، تو آفیشل بنڈل اینالائزر استعمال کریں۔ اپنی بلڈ کے دوران ایک انوائرمنٹ ویری ایبل سیٹ کر کے اسے فعال کریں۔

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // آپ کی Next.js کنفیگریشن
});
```

**استعمال:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### معیاری Webpack

Create React App (ejected)، Angular، یا کسٹم Webpack سیٹ اپ کے لیے، انڈسٹری اسٹینڈرڈ `webpack-bundle-analyzer` استعمال کریں۔

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## یہ کیسے کام کرتا ہے

Intlayer **فی کمپوننٹ نقطہ نظر** استعمال کرتا ہے۔ عالمی JSON فائلوں کے برعکس، آپ کا مواد آپ کے کمپوننٹس کے ساتھ یا ان کے اندر بیان کیا جاتا ہے۔ بلڈ کے عمل کے دوران، Intlayer:

1.  `useIntlayer` کالز تلاش کرنے کے لیے آپ کے کوڈ کا **تجزیہ** کرتا ہے۔
2.  متعلقہ ڈکشنری مواد **تیار** کرتا ہے۔
3.  آپ کی کنفیگریشن کی بنیاد پر `useIntlayer` کال کو بہتر کوڈ سے **تبدیل** کرتا ہے۔

یہ یقینی بناتا ہے کہ:

- اگر کوئی کمپوننٹ امپورٹ نہیں کیا گیا ہے، تو اس کا مواد بنڈل میں شامل نہیں کیا جاتا (ڈیڈ کوڈ کا خاتمہ)۔
- اگر کوئی کمپوننٹ لیزی لوڈڈ ہے تو اس کا مواد بھی لیزی لوڈڈ ہوتا ہے۔

## پلیٹ فارم کے مطابق سیٹ اپ

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js کو تبدیلی کو سنبھالنے کے لیے `@intlayer/swc` پلگ ان کی ضرورت ہوتی ہے، کیونکہ Next.js بلڈز کے لیے SWC استعمال کرتا ہے۔

> یہ پلگ ان ڈیفالٹ طور پر انسٹال نہیں ہوتا ہے کیونکہ SWC پلگ ان ابھی بھی Next.js کے لیے تجرباتی ہیں۔ یہ مستقبل میں تبدیل ہو سکتا ہے۔

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

ایک بار انسٹال ہونے کے بعد، Intlayer خود بخود پلگ ان کا پتہ لگائے گا اور اسے استعمال کرے گا۔

 </Tab>
 <Tab value="vite">

### Vite

Vite `@intlayer/babel` پلگ ان کا استعمال کرتا ہے جو `vite-intlayer` کے انحصار (dependency) کے طور پر شامل ہے۔ آپٹیمائزیشن ڈیفالٹ طور پر فعال ہے۔ مزید کچھ کرنے کی ضرورت نہیں ہے۔

 </Tab>
 <Tab value="webpack">

### Webpack

Webpack پر Intlayer کے ساتھ بنڈل آپٹیمائزیشن کو فعال کرنے کے لیے، آپ کو مناسب Babel (`@intlayer/babel`) یا SWC (`@intlayer/swc`) پلگ ان انسٹال اور کنفیگر کرنے کی ضرورت ہے۔

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

```typescript fileName="babel.config.js"
const {
  getOptimizePluginOptions,
  intlayerOptimizeBabelPlugin,
} = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## کنفیگریشن

آپ اپنے `intlayer.config.ts` میں `build` پراپرٹی کے ذریعے کنٹرول کر سکتے ہیں کہ Intlayer آپ کے بنڈل کو کس طرح بہتر بناتا ہے۔

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * بنڈل سائز کم کرنے کے لیے ڈکشنریوں کو منی فائی کریں۔
     */
     minify: true;

    /**
     * ڈکشنریوں میں غیر استعمال شدہ کلیدوں (keys) کو ہٹائیں (purge)
     */
     purge: true;

    /**
     * اس بات کی نشاندہی کرتا ہے کہ آیا بلڈ کو ٹائپ اسکرپٹ اقسام (TypeScript types) کو چیک کرنا چاہئے
     */
    checkTypes: false;
  },
};

export default config;
```

> زیادہ تر معاملات میں `optimize` کے لیے ڈیفالٹ آپشن رکھنے کی سفارش کی جاتی ہے۔

> مزید تفصیلات کے لیے کنفیگریشن ڈاک دیکھیں: [کنفیگریشن](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md)

### بلڈ کے اختیارات

بلڈ کنفیگریشن آبجیکٹ کے تحت درج ذیل اختیارات دستیاب ہیں:

| پراپرٹی        | ٹائپ      | ڈیفالٹ      | تفصیل                                                                                                                                                                                                           |
| :------------- | :-------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | کنٹرول کرتا ہے کہ آیا بلڈ آپٹیمائزیشن فعال ہے یا نہیں۔ اگر `true` ہے، تو Intlayer ڈکشنری کالز کو بہتر انجیکشنز سے بدل دیتا ہے۔ اگر `false` ہے، تو آپٹیمائزیشن غیر فعال ہے۔ پروڈکشن میں `true` سیٹ کرنا بہتر ہے۔ |
| **`minify`**   | `boolean` | `false`     | بنڈل سائز کم کرنے کے لیے ڈکشنریوں کو منی فائی کرنا ہے یا نہیں۔                                                                                                                                                  |
| **`purge`**    | `boolean` | `false`     | ڈکشنریوں میں غیر استعمال شدہ کلیدوں کو صاف کرنا ہے یا نہیں۔                                                                                                                                                     |

### منی فیکیشن (Minification)

ڈکشنریوں کو منی فائی کرنے سے غیر ضروری خالی جگہ، تبصرے ختم ہو جاتے ہیں اور JSON مواد کا سائز کم ہو جاتا ہے۔ یہ خاص طور پر بڑی ڈکشنریوں کے لیے مفید ہے۔

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> نوٹ: اگر `optimize` غیر فعال ہو یا اگر ویژول ایڈیٹر (Visual Editor) فعال ہو تو منی فیکیشن کو نظر انداز کر دیا جاتا ہے (کیونکہ ایڈیٹر کو ترمیم کی اجازت دینے کے لیے مکمل مواد کی ضرورت ہوتی ہے)۔

### پرجنگ (Purging)

پرجنگ یہ یقینی بناتی ہے کہ آپ کے کوڈ میں درحقیقت استعمال ہونے والی کلیدیں ہی فائنل ڈکشنری بنڈل میں شامل کی جائیں۔ اگر آپ کے پاس بہت سی کلیدوں والی بڑی ڈکشنریاں ہیں جو آپ کی ایپلیکیشن کے ہر حصے میں استعمال نہیں ہوتی ہیں، تو یہ آپ کے بنڈل کے سائز کو نمایاں طور بر کم کر سکتا ہے۔

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> نوٹ: اگر `optimize` غیر فعال ہو تو پرجنگ کو نظر انداز کر دیا جاتا ہے۔

### امپورٹ موڈ

بڑی ایپلیکیشنز کے لیے، جن میں کئی صفحات اور زبانیں شامل ہیں، آپ کی JSON فائلیں آپ کے بنڈل سائز کا ایک اہم حصہ ہو سکتی ہیں۔ Intlayer آپ کو کنٹرول کرنے کی اجازت دیتا ہے کہ ڈکشنریاں کیسے لوڈ کی جائیں۔

امپورٹ موڈ کو آپ کی `intlayer.config.ts` فائل میں عالمی سطح پر ڈیفالٹ کے طور پر بیان کیا جا سکتا ہے۔

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

ساتھ ہی آپ کی `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` فائلوں میں ہر ڈکشنری کے لیے بھی۔

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // ڈیفالٹ امپورٹ موڈ کو اوور رائڈ کریں
  content: {
    // ...
  },
};

export default appContent;
```

| پراپرٹی          | ٹائپ                               | ڈیفالٹ     | تفصیل                                                                                                         |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------ |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **غیر مروجہ**: اس کی جگہ `dictionary.importMode` استعمال کریں۔ یہ طے کرتا ہے کہ ڈکشنریاں کس طرح لوڈ ہوتی ہیں۔ |

`importMode` ترتیب یہ بتاتی ہے کہ ڈکشنری کا مواد آپ کے کمپوننٹ میں کس طرح داخل (inject) کیا جاتا ہے۔
آپ اسے `intlayer.config.ts` فائل میں `dictionary` آبجیکٹ کے تحت عالمی سطح پر بیان کر سکتے ہیں، یا آپ اسے اس کی `.content.ts` فائل میں کسی خاص ڈکشنری کے لیے تبدیل کر سکتے ہیں۔

### 1. جامد موڈ (`default`)

جامد موڈ میں، Intlayer `useIntlayer` کو `useDictionary` سے بدل دیتا ہے اور ڈکشنری کو براہ راست جاوا اسکرپٹ بنڈل میں شامل کر دیتا ہے۔

- **فوائد:** فوری رینڈرنگ (سنکرونس)، ہائیڈریشن کے دوران کوئی اضافی نیٹ ورک درخواست نہیں۔
- **نقصانات:** بنڈل میں اس مخصوص کمپوننٹ کے لیے **تمام** دستیاب زبانوں کے ترجمے شامل ہوتے ہیں۔
- **ان کے لیے بہترین:** سنگل پیج ایپلیکیشنز (SPA)۔

**تبدیل شدہ کوڈ کی مثال:**

```tsx
// آپ کا کوڈ
const content = useIntlayer("my-key");

// بہتر کوڈ (جامد)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. متحرک موڈ (Dynamic Mode)

متحرک موڈ میں، Intlayer `useIntlayer` کو `useDictionaryAsync` سے بدل دیتا ہے۔ یہ موجودہ زبان کے لیے خاص طور پر JSON کو لیزی لوڈ کرنے کے لیے `import()` کا استعمال کرتا ہے۔

- **فوائد:** **زبان کی سطح پر ٹری شیکنگ (Locale-level tree shaking)۔** انگریزی ورژن دیکھنے والا صارف _صرف_ انگریزی ڈکشنری ڈاؤن لوڈ کرے گا۔ فرانسیسی ڈکشنری کبھی لوڈ نہیں ہوگی۔
- **نقصانات:** ہائیڈریشن کے دوران فی کمپوننٹ ایک نیٹ ورک درخواست (ایسیٹ فیچ) شروع کرتا ہے۔
- **ان کے لیے بہترین:** بڑے ٹیکسٹ بلاکس، مضامین، یا بہت سی زبانوں کو سپورٹ کرنے والی ایپلیکیشنز جہاں بنڈل سائز بہت اہم ہے۔

**تبدیل شدہ کوڈ کی مثال:**

```tsx
// آپ کا کوڈ
const content = useIntlayer("my-key");

// بہتر کوڈ (متحرک)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> جب `importMode: 'dynamic'` استعمال کر رہے ہوں، اگر آپ کے پاس ایک ہی صفحے پر 100 کمپوننٹس `useIntlayer` استعمال کر رہے ہیں، تو براؤزر 100 الگ الگ ڈاؤن لوڈز کی کوشش کرے گا۔ درخواستوں کے اس "واٹر فال" (waterfall) سے بچنے کے لیے، مواد کو ہر چھوٹے کمپوننٹ کے بجائے کم `.content` فائلوں (مثلاً ہر صفحے کے حصے کے لیے ایک ڈکشنری) میں گروپ کریں۔

### 3. فیچ موڈ (Fetch Mode)

متحرک موڈ کی طرح برتاؤ کرتا ہے لیکن پہلے Intlayer Live Sync API سے ڈکشنریاں حاصل کرنے کی کوشش کرتا ہے۔ اگر API کال ناکام ہو جاتی ہے یا مواد لائیو اپ ڈیٹس کے لیے نشان زد نہیں ہے، تو یہ متحرک امپورٹ پر واپس آ جاتا ہے۔

> مزید تفصیلات کے لیے CMS ڈاک دیکھیں: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md)

> فیچ موڈ میں، پرجنگ اور منی فیکیشن استعمال نہیں کی جا سکتی۔

## خلاصہ: جامد بمقابلہ متحرک

| خصوصیت                | جامد موڈ                              | متحرک موڈ                                |
| :-------------------- | :------------------------------------ | :--------------------------------------- |
| **JS بنڈل سائز**      | بڑا (کمپوننٹ کی تمام زبانیں شامل ہیں) | سب سے چھوٹا (صرف کوڈ، کوئی مواد نہیں)    |
| **ابتدائی لوڈ**       | فوری (مواد بنڈل میں ہے)               | ہلکی تاخیر (JSON حاصل کرتا ہے)           |
| **نیٹ ورک درخواستیں** | 0 اضافی درخواستیں                     | فی ڈکشنری 1 درخواست                      |
| **ٹری شیکنگ**         | کمپوننٹ کی سطح                        | کمپوننٹ کی سطح + زبان کی سطح             |
| **بہترین استعمال**    | UI کمپوننٹس، چھوٹی ایپس               | بہت سارے ٹیکسٹ والے صفحات، بہت سی زبانیں |
