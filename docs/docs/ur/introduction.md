---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: تعارف
description: دریافت کریں کہ Intlayer کیسے کام کرتا ہے۔ وہ اقدامات دیکھیں جو Intlayer آپ کی ایپلیکیشن میں استعمال کرتا ہے۔ جانیں कि مختلف پیکجز کیا کرتے ہیں۔
keywords:
  - تعارف
  - شروعات کریں
  - Intlayer
  - ایپلیکیشن
  - پیکجز
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer ڈاکیومنٹیشن

آفیشل Intlayer ڈاکیومنٹیشن میں خوش آمدید! یہاں، آپ کو اپنی تمام بین الاقوامی کاری (i18n) کی ضروریات کے لیے Intlayer کو مربوط (integrate)، کنفیگر اور ماسٹر کرنے کے لیے درکار ہر چیز مل جائے گی، چاہے آپ Next.js، React، Vite، Express، یا کسی اور JavaScript ماحول کے ساتھ کام کر رہے ہوں۔

## تعارف

### Intlayer کیا ہے؟

**Intlayer** ایک بین الاقوامی کاری (internationalization) لائبریری ہے جو خاص طور پر JavaScript ڈیولپرز کے لیے ڈیزائن کی گئی ہے۔ یہ آپ کے مواد کو آپ کے کوڈ میں کہیں بھی ڈیکلیئر کرنے کی اجازت دیتی ہے۔ یہ کثیر لسانی مواد کے ڈیکلریشنز کو ساختی لغات (structured dictionaries) میں تبدیل کرتی ہے تاکہ آپ کے کوڈ میں آسانی سے مربوط ہو سکے۔ TypeScript کا استعمال کرتے ہوئے، **Intlayer** آپ کے ڈیولپمنٹ کو زیادہ مضبوط اور موثر بناتی ہے۔

Intlayer ایک اختیاری بصری ایڈیٹر (visual editor) بھی فراہم کرتا ہے جو آپ کو اپنے مواد کو آسانی سے ایڈٹ اور منظم کرنے کی اجازت دیتا ہے۔ یہ ایڈیٹر خاص طور پر ان ڈیولپرز کے لیے مفید ہے جو مواد کے انتظام کے لیے بصری انٹرفیس کو ترجیح دیتے ہیں، یا ان ٹیموں کے لیے جو کوڈ کی فکر کیے بغیر مواد تیار کرتی ہیں۔

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
      ur: "ہیلو دنیا",
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
        "es": "Hola Mundo",
        "ur": "ہیلو دنیا"
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

### متبادل کے مقابلے میں Intlayer کیوں؟

`next-intl` یا `i18next` جیسے اہم حلوں کے مقابلے میں، Intlayer ایک ایسا حل ہے جو مربوط آپٹمائزیشن کے ساتھ آتا ہے جیسے:

<AccordionGroup>

<Accordion header="بنڈل کا سائز (Bundle size)">

اپنے صفحات میں بھاری JSON فائلیں لوڈ کرنے کے بجائے، صرف ضروری مواد لوڈ کریں۔ Intlayer آپ کے **بنڈل اور صفحہ کے سائز کو 50% تک کم کرنے** میں مدد کرتا ہے۔

</Accordion>

<Accordion header="قابلِ برقراری (Maintainability)">

اپنی ایپلیکیشن کے مواد کو قریب رکھنا بڑے پیمانے کی ایپلیکیشنز کے لیے **دیکھ بھال کو آسان بناتا ہے**۔ آپ اپنے پورے مواد کے کوڈ بیس کا جائزہ لینے کے ذہنی بوجھ کے بغیر کسی ایک فیچر فولڈر کو نقل یا حذف کر سکتے ہیں۔ مزید برآں، آپ کے مواد کی درستگی کو یقینی بنانے کے لیے Intlayer کو **مکمل طور پر ٹائپڈ (fully typed)** کیا گیا ہے۔

</Accordion>

<Accordion header="AI ایجنٹ (AI Agent)">

مواد کو قریب رکھنا بڑے لینگویج ماڈلز (LLMs) کی طرف سے **درکار سیاق و سباق کو کم کرتا ہے**۔ Intlayer ٹولز کے ایک سوٹ کے ساتھ بھی آتا ہے، جیسے غائب ترجموں کو جانچنے کے لیے **CLI**، **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/mcp_server.md)** اور AI ایجنٹس کے لیے ڈیولپر کے تجربے (DX) کو اور بھی ہموار بنانے کے لیے **[ایجنٹ کی مہارتیں (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/agent_skills.md)**۔

</Accordion>

<Accordion header="آٹومیشن (Automation)">

اپنے AI فراہم کنندہ کی قیمت پر اپنی پسند کا LLM استعمال کرتے ہوئے اپنے CI/CD پائپ لائن میں ترجمہ کرنے کے لیے آٹومیشن کا استعمال کریں۔ Intlayer مواد نکالنے کو خودکار بنانے کے لیے ایک **کمپائلر (compiler)** کے ساتھ ساتھ [ویب پلیٹ فارم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md) بھی پیش کرتا ہے تاکہ **پس منظر میں ترجمہ** کرنے میں مدد ملے۔

</Accordion>

<Accordion header="کارکردگی (Performance)">

بھاری JSON فائلوں کو اجزاء (components) سے جوڑنے سے کارکردگی اور ردعمل (reactivity) کے مسائل پیدا ہو سکتے ہیں۔ Intlayer تعمیر کے وقت (build time) پر آپ کے مواد کی لوڈنگ کو بہتر بناتا ہے۔

</Accordion>

<Accordion header="غیر ڈیولپرز کے ساتھ اسکیلنگ (Scaling with non-dev)">

صرف ایک i18n حل سے بڑھ کر، Intlayer ایک **خود میزبان (self-hosted) [بصری ایڈیٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md)** اور ایک **[مکمل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md)** فراہم کرتا ہے تاکہ آپ کو اپنے کثیر لسانی مواد کو **ریئل ٹائم** میں منظم کرنے میں مدد ملے، جس سے مترجمین، کاپی رائٹرز اور ٹیم کے دیگر اراکین کے ساتھ باہمی تعاون کو ہموار بنایا جا سکے۔ مواد کو مقامی طور پر اور/یا دور دراز سے محفوظ کیا جا سکتا ہے۔

</Accordion>
</AccordionGroup>

## اہم خصوصیات

Intlayer جدید ویب ڈیولپمنٹ کی ضروریات کو پورا کرنے کے لیے تیار کردہ مختلف خصوصیات پیش کرتا ہے۔ ذیل میں ہر ایک کے لیے تفصیلی ڈاکیومنٹیشن کے لنکس کے ساتھ کلیدی خصوصیات درج ہیں:

- **بین الاقوامی کاری کی معاونت**: بین الاقوامی کاری کے لیے بلٹ ان سپورٹ کے ساتھ اپنی ایپلیکیشن کی عالمی رسائی کو بڑھائیں۔
- **بصری ایڈیٹر**: Intlayer کے لیے ڈیزائن کردہ ایڈیٹر پلگ انز کے ساتھ اپنے ڈیولپمنٹ ورک فلو کو بہتر بنائیں۔ [بصری ایڈیٹر گائیڈ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md) دیکھیں۔
- **کنفیگریشن کی لچک**: [کنفیگریشن گائیڈ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) میں تفصیلی وسیع کنفیگریشن آپشنز کے ساتھ اپنے سیٹ اپ کو حسب ضرورت بنائیں۔
- **اعلی درجے کے CLI ٹولز**: Intlayer کے کمانڈ لائن انٹرفیس کا استعمال کرتے ہوئے اپنے پروجیکٹس کو مؤثر طریقے سے منظم کریں۔ [CLI ٹولز ڈاکیومنٹیشن](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/index.md) میں صلاحیتوں کو دریافت کریں۔

## بنیادی تصورات

### ڈکشنری (Dictionary)

اپنے کثیر لسانی مواد کو اپنے کوڈ کے قریب منظم کریں تاکہ ہر چیز مطابقت پذیر اور قابل انتظام رہے۔

- **[شروعات کریں (Get Started)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md)**  
  Intlayer میں اپنا مواد ڈیکلیئر کرنے کی بنیادی باتیں سیکھیں۔

- **[ترجمہ (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/translation.md)**  
  سمجھیں کہ آپ کی ایپلیکیشن میں ترجمے کیسے بنائے، محفوظ کیے اور استعمال کیے جاتے ہیں۔

- **[شماریات (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/enumeration.md)**  
  مختلف زبانوں میں دہرائے گئے یا مقررہ ڈیٹا سیٹس کو آسانی سے منظم کریں۔

- **[شرط (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/condition.md)**  
  متحرک مواد بنانے کے لیے Intlayer میں مشروط منطق کا استعمال سیکھیں۔

- **[اندراج (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/insertion.md)**  
  اندراج پلیس ہولڈرز کا استعمال کرتے ہوئے سٹرنگ میں اقدار شامل کرنے کا طریقہ دریافت کریں۔

- **[فنکشن لانا (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/function_fetching.md)**  
  دیکھیں کہ آپ کے پروجیکٹ کے ورک فلو سے ملنے کے لیے حسب ضرورت منطق کے ساتھ متحرک طور پر مواد کیسے لایا جائے۔

- **[مارک ڈاؤن (Markdown)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/markdown.md)**  
  بھرپور مواد بنانے کے لیے Intlayer میں مارک ڈاؤن کا استعمال سیکھیں۔

- **[فائل ایمبیڈنگ (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/file.md)**  
  کنٹینٹ ایڈیٹر میں استعمال کرنے کے لیے Intlayer میں بیرونی فائلوں کو ایمبیڈ کرنے کا طریقہ دریافت کریں۔

- **[نیسٹنگ (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/nesting.md)**  
  پیچیدہ ڈھانچے بنانے کے لیے Intlayer میں مواد کو نیسٹ کرنا سمجھیں۔

### ماحولیات اور انضمام (Environments & Integrations)

ہم نے لچک کو ذہن میں رکھتے ہوئے Intlayer بنایا ہے، جو مقبول فریم ورکس اور بلڈ ٹولز میں ہموار انضمام کی پیشکش کرتا ہے:

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
- **[Angular کے ساتھ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_with_angular_21.md)**

ہر انضمام گائیڈ میں Intlayer کی خصوصیات کو استعمال کرنے کے بہترین طریقے (best practices) شامل ہیں، جیسے **سرور سائیڈ رینڈرنگ (SSR)**، **ڈائنامک روٹنگ**، یا **کلائنٹ سائیڈ رینڈرنگ**، تاکہ آپ ایک تیز، SEO-دوست اور انتہائی قابل توسیع ایپلیکیشن کو برقرار رکھ سکیں۔

## شراکت اور تاثرات

ہم اوپن سورس اور کمیونٹی کے ذریعے چلنے والی ڈیولپمنٹ کی طاقت کی قدر کرتے ہیں۔ اگر آپ بہتری کی تجویز دینا چاہتے ہیں، ایک نئی گائیڈ شامل کرنا چاہتے ہیں، یا ہماری ڈاکیومنٹیشن میں کسی بھی مسئلے کو درست کرنا چاہتے ہیں، تو بلا جھجھک پُل ریکویسٹ (Pull Request) جمع کرائیں یا ہمارے [GitHub ریپوزٹری](https://github.com/aymericzip/intlayer/blob/main/docs/docs) پر ایک مسئلہ (Issue) کھولیں۔

**کیا آپ اپنی ایپلیکیشن کا تیزی سے اور زیادہ مؤثر طریقے سے ترجمہ کرنے کے لیے تیار ہیں؟** آج ہی Intlayer کا استعمال شروع کرنے کے لیے ہماری ڈاکیومنٹیشن میں غوطہ لگائیں۔ بین الاقوامی کاری کے لیے ایک مضبوط اور ہموار نقطہ نظر کا تجربہ کریں جو آپ کے مواد کو منظم اور آپ کی ٹیم کو زیادہ نتیجہ خیز بناتا ہے۔
