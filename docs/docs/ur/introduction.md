---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: تعارف
description: دریافت کریں کہ Intlayer کیسے کام کرتا ہے۔ اپنی ایپلی کیشن میں Intlayer کے ذریعے استعمال ہونے والے مراحل دیکھیں۔ دیکھیں کہ مختلف پیکیجز کیا کرتے ہیں۔
keywords:
  - تعارف
  - شروع کریں
  - Intlayer
  - ایپلی کیشن
  - پیکیجز
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "تاریخ کا آغاز"
---

# Intlayer دستاویزات

آفیشل Intlayer دستاویزات میں خوش آمدید! یہاں آپ کو اپنی تمام بین الاقوامی سازی (i18n) کی ضروریات کے لیے Intlayer کو انٹیگریٹ کرنے، کنفیگر کرنے اور اس میں مہارت حاصل کرنے کے لیے درکار ہر چیز ملے گی، چاہے آپ Next.js، React، Vite، Express، یا کسی دوسرے JavaScript ماحول کے ساتھ کام کر رہے ہوں۔

## تعارف

### Intlayer کیا ہے؟

**Intlayer** ایک بین الاقوامی سازی لائبریری ہے جو خاص طور پر JavaScript ڈویلپرز کے لیے ڈیزائن کی گئی ہے۔ یہ آپ کو اپنے کوڈ میں ہر جگہ اپنے مواد کا اعلان کرنے کی اجازت دیتی ہے۔ یہ کثیر لسانی مواد کے اعلانات کو منظم ڈکشنریوں میں تبدیل کرتی ہے تاکہ آپ کے کوڈ میں آسانی سے انٹیگریٹ کیا جا سکے۔ TypeScript کا استعمال کرتے ہوئے، **Intlayer** آپ کی ڈویلپمنٹ کو مضبوط اور زیادہ موثر بناتی ہے۔

Intlayer ایک اختیاری ویژول ایڈیٹر بھی فراہم کرتی ہے جو آپ کو اپنے مواد کو آسانی سے ایڈٹ اور منظم کرنے کی اجازت دیتی ہے۔ یہ ایڈیٹر خاص طور پر ان ڈویلپرز کے لیے مفید ہے جو مواد کے انتظام کے لیے ویژول انٹرفیس کو ترجیح دیتے ہیں، یا ان ٹیموں کے لیے جو کوڈ کی فکر کیے بغیر مواد تیار کرنا چاہتی ہیں۔

### استعمال کی مثال

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## اہم خصوصیات

Intlayer جدید ویب ڈویلپمنٹ کی ضروریات کو پورا کرنے کے لیے مختلف خصوصیات پیش کرتی ہے۔ نیچے اہم خصوصیات دی گئی ہیں، جن میں سے ہر ایک کے لیے تفصیلی دستاویزات کے لنکس موجود ہیں:

- **بین الاقوامی سازی سپورٹ**: بین الاقوامی سازی کے لیے بلٹ ان سپورٹ کے ساتھ اپنی ایپلی کیشن کی عالمی رسائی کو بڑھائیں۔
- **ویژول ایڈیٹر**: Intlayer کے لیے ڈیزائن کیے گئے ایڈیٹر پلگ انز کے ساتھ اپنے ڈویلپمنٹ ورک فلو کو بہتر بنائیں۔ [ویژول ایڈیٹر گائیڈ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md) دیکھیں۔
- **کنفیگریشن میں لچک**: [کنفیگریشن گائیڈ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) میں بیان کردہ وسیع کنفیگریشن اختیارات کے साथ اپنے سیٹ اپ کو اپنی مرضی کے مطابق بنائیں۔
- **اعلی درجے کے CLI ٹولز**: Intlayer کے کمانڈ لائن انٹرفیس کا استعمال کرتے ہوئے اپنے پروجیکٹس کو مؤثر طریقے سے منظم کریں۔ [CLI ٹولز دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/index.md) میں صلاحیتوں کو تلاش کریں۔

## بنیادی تصورات

### ڈکشنری (Dictionary)

اپنے کثیر لسانی مواد کو اپنے کوڈ کے قریب منظم کریں تاکہ ہر چیز مستقل اور برقرار رکھنے کے قابل رہے۔

- **[شروع کریں](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md)**  
  Intlayer میں اپنے مواد کے اعلان کی بنیادی باتیں سیکھیں۔

- **[ترجمہ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/translation.md)**  
  سمجھیں کہ ترجمہ کیسے تیار، ذخیرہ اور آپ کی ایپلی کیشن میں استعمال کیا جاتا ہے۔

- **[فہرست (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/enumeration.md)**  
  مختلف زبانوں میں بار بار ہونے والے یا طے شدہ ڈیٹا کے سیٹس کو آسانی سے منظم کریں۔

- **[شرط (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/condition.md)**  
  ڈائنامک مواد بنانے کے لیے Intlayer میں مشروط منطق (conditional logic) استعمال کرنا سیکھیں۔

- **[شمولیت (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/insertion.md)**
  دریافت کریں کہ انسریشن پلیس ہولڈرز کا استعمال کرتے ہوئے اسٹرنگ میں ویلیوز کو کیسے شامل کیا جائے۔

- **[فنکشن فیچنگ (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/function_fetching.md)**  
  دیکھیں کہ اپنے پروجیکٹ کے ورک فلو کے مطابق کسٹم لاجک کے ساتھ ڈائنامک طور پر مواد حاصل کیا جائے۔

- **[مارک ڈاؤن (Markdown)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/markdown.md)**  
  بھرپور مواد تخلیق کرنے کے لیے Intlayer میں مارک ڈاؤن استعمال کرنا سیکھیں۔

- **[فائل ایمبیڈنگ (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/file.md)**  
  دریافت کریں کہ کٹنٹ ایڈیٹر میں استعمال کرنے کے لیے Intlayer میں بیرونی فائلوں کو کیسے شامل کیا جائے۔

- **[نیسٹنگ (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/nesting.md)**  
  پیچیدہ ڈھانچے بنانے کے لیے Intlayer میں مواد کو نیسٹ کرنے کا طریقہ سمجھیں۔

### ماحول اور انٹیگریشنز (Environments & Integrations)

ہم نے Intlayer کو لچک کو مدنظر رکھتے ہوئے بنایا ہے، جو مقبول فریم ورکس اور بلڈ ٹولز میں ہموار انٹیگریشن پیش کرتی ہے:

- **[Next.js 16 کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_nextjs_16.md)**
- **[Next.js 15 کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (App Router) کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_nextjs_14.md)**
- **[Next.js Page Router کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_nextjs_page_router.md)**
- **[React CRA کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_create_react_app.md)**
- **[Vite + React کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_vite+react.md)**
- **[React Router v7 کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_react_router_v7.md)**
- **[Tanstack Start کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_tanstack.md)**
- **[React Native اور Expo کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_react_native+expo.md)**
- **[Lynx اور React کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_lynx+react.md)**
- **[Vite + Preact کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_vite+preact.md)**
- **[Vite + Vue کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_vite+vue.md)**
- **[Nuxt کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_nuxt.md)**
- **[Vite + Svelte کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_vite+svelte.md)**
- **[SvelteKit کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_svelte_kit.md)**
- **[Express کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_express.md)**
- **[NestJS کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_nestjs.md)**
- **[Hono کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_hono.md)**
- **[Angular کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_angular.md)**

ہر انٹیگریشن گائیڈ میں Intlayer کی خصوصیات کے استعمال کے لیے بہترین طریقے شامل ہیں، جیسے **سرور سائیڈ رینڈرنگ**، **ڈائنامک روٹنگ**، یا **کلائنٹ سائیڈ رینڈرنگ**، تاکہ آپ ایک تیز، SEO دوستانہ، اور انتہائی توسیع پذیر ایپلی کیشن برقرار رکھ سکیں۔

## تعاون اور فیڈ بیک

ہم اوپن سورس اور کمیونٹی پر مبنی ڈویلپمنٹ کی طاقت کی قدر کرتے ہیں۔ اگر آپ بہتری کی تجویز دینا چاہتے ہیں، کوئی نئی گائیڈ شامل کرنا چاہتے ہیں، یا ہماری دستاویزات میں کسی بھی مسئلے کو درست کرنا چاہتے ہیں، تو بلا جھجھک پل ریکوسٹ (Pull Request) جمع کرائیں یا ہمارے [GitHub ریپوزٹری](https://github.com/aymericzip/intlayer/blob/main/docs/docs) پر ایشو (issue) شروع کریں۔

**اپنی ایپلی کیشن کو تیزی سے اور زیادہ مؤثر طریقے سے ترجمہ کرنے کے لیے تیار ہیں؟** آج ہی Intlayer کا استعمال شروع کرنے کے لیے ہماری دستاویزات دیکھیں۔ بین الاقوامی سازی کے ایک مضبوط، ہموار طریقہ کار کا تجربہ کریں جو آپ کے مواد کو منظم رکھتا ہے اور آپ کی ٹیم کو زیادہ پیداواری بناتا ہے۔
