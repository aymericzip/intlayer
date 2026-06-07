---
createdAt: 2024-08-14
updatedAt: 2026-05-31
title: Intlayer کی اہمیت
description: اپنے پروجیکٹس میں Intlayer استعمال کرنے کے فوائد اور خوبیوں کو دریافت کریں۔ سمجھیں کہ کیوں Intlayer دوسرے فریم ورکس کے درمیان نمایاں ہے۔
keywords:
  - فوائد
  - خوبیاں
  - Intlayer
  - فریم ورک
  - موازنہ
slugs:
  - doc
  - why
history:
  - version: 8.11.2
    date: 2026-05-31
    changes: "متبادل کے مقابلے میں Intlayer کیوں والا سیکشن شامل کیا گیا"
  - version: 7.3.1
    date: 2025-11-27
    changes: "کمپائلر کی ریلیز"
  - version: 5.8.0
    date: 2025-08-19
    changes: "تقابلی جدول کی اپ ڈیٹ"
  - version: 5.5.10
    date: 2025-06-29
    changes: "ہسٹری کا آغاز"
---

# آپ کو Intlayer پر کیوں غور کرنا چاہیے؟

## Intlayer کیا ہے؟

**Intlayer** ایک انٹرنیشنلائزیشن (internationalization) لائبریری ہے جو خاص طور پر جاوا اسکرپٹ (JavaScript) ڈویلپرز کے لیے ڈیزائن کی گئی ہے۔ یہ آپ کو اپنے کوڈ میں ہر جگہ اپنے مواد (content) کو ڈیکلیئر (declare) کرنے کی اجازت دیتی ہے۔ یہ کثیر لسانی مواد (multilingual content) کی ڈیکلیئریشنز کو اسٹرکچرڈ ڈکشنریوں (structured dictionaries) میں تبدیل کرتی ہے تاکہ آپ کے کوڈ میں آسانی سے ضم (integrate) ہو سکے۔ ٹائپ اسکرپٹ (TypeScript) کا استعمال کرتے ہوئے، **Intlayer** آپ کی ڈویلپمنٹ کو مضبوط اور زیادہ موثر بناتا ہے۔

## متبادلات کے مقابلے میں Intlayer ہی کیوں؟

`next-intl` یا `i18next` جیسے بڑے حلوں کے مقابلے میں، Intlayer ایک ایسا حل ہے جو انٹیگریٹڈ آپٹیمائزیشنز (integrated optimizations) کے ساتھ آتا ہے جیسے کہ:

**بنڈل سائز (Bundle size)**

اپنے پیجز میں بڑی بڑی JSON فائلیں لوڈ کرنے کے بجائے، صرف ضروری مواد لوڈ کریں۔ Intlayer آپ کے بنڈل اور پیج سائز کو 50% تک کم کرنے میں مدد کرتا ہے۔

**مینٹینیبلٹی (Maintainability)**

اپنی ایپلیکیشن کے مواد کو اسکوپ (Scope) کرنا بڑے پیمانے کی ایپلیکیشنز کے لیے **مینٹیننس (maintenance) کو آسان بناتا ہے**۔ آپ اپنے پورے مواد کے کوڈ بیس (codebase) کا جائزہ لینے کے ذہنی بوجھ کے بغیر کسی ایک فیچر فولڈر کو ڈپلیکیٹ یا ڈیلیٹ کر سکتے ہیں۔ مزید برآں، Intlayer **مکمل طور پر ٹائپ شدہ (fully typed)** ہے تاکہ آپ کے مواد کی درستگی کو یقینی بنایا جا سکے۔

**AI ایجنٹ**

مواد کو ایک ہی جگہ رکھنا (Co-locating content) Large Language Models (LLMs) کے لیے **درکار سیاق و سباق (context) کو کم کرتا ہے**۔ Intlayer ٹولز کے ایک مجموعے کے ساتھ بھی آتا ہے، جیسے کہ گمشدہ تراجم کو ٹیسٹ کرنے کے لیے **CLI**، **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/mcp_server.md)**، اور **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/agent_skills.md)**، تاکہ AI agents کے لیے ڈویلپر تجربے (DX) کو مزید ہموار بنایا جا سکے۔

**خصوصیت**

Intlayer اضافی خصوصیات کا ایک ایسا مجموعہ فراہم کرتا ہے جو دیگر i18n حلوں (solutions) میں موجود نہیں ہیں، جیسے کہ [Markdown سپورٹ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/markdown.md)، [بیرونی مواد کا حصول](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/function_fetching.md)، [فائل کے مواد کی لوڈنگ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/file.md)، [لائیو مواد کی اپ ڈیٹ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/live.md)، [ویژول ایڈیٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md) اور بہت کچھ۔

**آٹومیشن**

اپنی مرضی کے LLM کا استعمال کرتے ہوئے اپنے CI/CD پائپ لائن میں ترجمہ کرنے کے لیے آٹومیشن کا استعمال کریں، جو آپ کے AI فراہم کنندہ کی لاگت پر ہوگا۔ Intlayer ایک **compiler** بھی پیش کرتا ہے تاکہ مواد نکالنے (content extraction) کو خودکار بنایا جا سکے، ساتھ ہی ایک [ویب پلیٹ فارم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md) بھی فراہم کرتا ہے تاکہ **بیک گراؤنڈ میں ترجمہ** کرنے میں مدد مل سکے۔

**Performance**

اجزاء (components) کے ساتھ بڑی JSON فائلوں کو جوڑنا کارکردگی اور ری ایکٹیویٹی (reactivity) کے مسائل کا باعث بن سکتا ہے۔ Intlayer بلڈ ٹائم (build time) پر آپ کے مواد کی لوڈنگ کو بہتر (optimize) بناتا ہے۔

**نان-ڈیولپرز (none-dev) کے ساتھ اسکیلنگ**

ایک i18n حل سے بڑھ کر، Intlayer ایک **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_visual_editor.md)** اور ایک **[مکمل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md)** فراہم کرتا ہے تاکہ آپ کو اپنے کثیر لسانی مواد کو **real-time** میں منظم کرنے میں مدد مل سکے، جس سے مترجمین، کاپی رائٹرز اور ٹیم کے دیگر اراکین کے ساتھ تعاون ہموار ہو جاتا ہے۔ مواد کو مقامی طور پر اور/یا ریموٹ طور پر محفوظ کیا جا سکتا ہے۔

**Cross framework design**

اگر آپ اپنی ایپلیکیشن کے مختلف حصوں کے لیے مختلف فریم ورکس (frameworks) استعمال کرتے ہیں (مثلاً React، React-native، Vue، Angular، Svelte وغیرہ)، تو Intlayer تمام اہم فرنٹ اینڈ فریم ورکس میں **ایک مشترکہ syntax اور عمل درآمد (implementation) استعمال کرنے** کا طریقہ فراہم کرتا ہے۔ آپ اپنے ڈیزائن سسٹم (design-system)، ایپس، بیک اینڈ (backend) وغیرہ میں اپنی مواد کی ڈیکلریشن (content declaration) شیئر کرنے کے قابل بھی ہوں گے۔

## Intlayer کیوں بنایا گیا؟

Intlayer کو ایک عام مسئلے کو حل کرنے کے لیے بنایا گیا تھا جو تمام عام i18n لائبریریوں جیسے `next-intl` ، `react-i18next` ، `react-intl` ، `next-i18next` ، `react-intl` ، اور `vue-i18n` کو متاثر کرتا ہے۔

یہ تمام حل آپ کے مواد کی فہرست سازی اور انتظام کے لیے ایک مرکزی (centralized) نقطہ نظر اپناتے ہیں۔ مثال کے طور پر:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

یا یہاں namespaces استعمال کرتے ہوئے:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

اس قسم کا فن تعمیر (architecture) ترقی کے عمل کو سست کر دیتا ہے اور کئی وجوہات کی بناء پر codebase کو برقرار رکھنا زیادہ پیچیدہ بنا دیتا ہے:

1. **کسی بھی نئے بنائے گئے component کے لیے، آپ کو چاہیے کہ:**
   - `locales` فولڈر میں نیا ریسورس/namespace بنائیں
   - اپنے پیج میں نئے namespace کو امپورٹ کرنا یاد رکھیں
   - اپنے مواد کا ترجمہ کریں (اکثر AI فراہم کنندگان سے کاپی/پیسٹ کر کے دستی طور پر کیا جاتا ہے)

2. **اپنے components میں کی جانے والی کسی بھی تبدیلی کے لیے، آپ کو چاہیے کہ:**
   - متعلقہ ریسورس/نیم اسپیس (resource/namespace) تلاش کریں (جو کمپوننٹ سے دور ہو)
   - اپنا مواد ترجمہ کریں
   - اس بات کو یقینی بنائیں کہ آپ کا مواد ہر لوکیل (locale) کے لیے اپ ٹو ڈیٹ ہے
   - اس بات کی تصدیق کریں کہ آپ کے نیم اسپیس میں غیر استعمال شدہ کیز/ویلیوز (keys/values) شامل نہیں ہیں
   - اس بات کو یقینی بنائیں کہ آپ کی JSON فائلوں کا اسٹرکچر تمام لوکیلز کے لیے ایک جیسا ہے

پیشہ ورانہ پروجیکٹس میں ان سلوشنز کا استعمال کرتے ہوئے، اکثر مواد کے ترجمے کو مینیج کرنے کے لیے لوکلائزیشن پلیٹ فارمز (localization platforms) کا استعمال کیا جاتا ہے۔ تاہم، بڑے پروجیکٹس کے لیے یہ تیزی سے مہنگا ہو سکتا ہے۔

اس مسئلے کو حل کرنے کے لیے، Intlayer ایک ایسا طریقہ کار اپناتا ہے جو آپ کے مواد کو فی-کمپوننٹ (per-component) اسکوپ کرتا ہے اور آپ کے مواد کو آپ کے کمپوننٹ کے قریب رکھتا ہے، جیسا کہ ہم اکثر CSS (`styled-components`)، ٹائپس (types)، ڈاکیومنٹیشن (`storybook`)، یا یونٹ ٹیسٹ (`jest`) کے ساتھ کرتے ہیں۔

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

یہ طریقہ کار آپ کو درج ذیل کی اجازت دیتا ہے:

1. **ڈیولپمنٹ کی رفتار میں اضافہ**
   - VSCode ایکسٹینشن کا استعمال کرتے ہوئے `.content.{{ts|mjs|cjs|json}}` فائلیں بنائی جا سکتی ہیں
   - آپ کے IDE میں موجود آٹو کمپلیشن AI ٹولز (جیسے GitHub Copilot) مواد کو ڈیکلیئر کرنے میں آپ کی مدد کر سکتے ہیں، جس سے کاپی/پیسٹ کا کام کم ہو جاتا ہے

2. **اپنے codebase کو صاف ستھرا بنانا**
   - پیچیدگی میں کمی
   - مینٹین ایبلٹی (maintainability) میں اضافہ

3. **اپنے components اور ان سے متعلقہ content کو زیادہ آسانی سے ڈپلیکیٹ کریں (مثال کے طور پر: login/register components، وغیرہ)**
   - دوسرے components کے content پر اثر انداز ہونے کے خطرے کو محدود کر کے
   - بیرونی dependencies کے بغیر اپنے content کو ایک ایپلیکیشن سے دوسری میں copy/paste کر کے

4. **غیر استعمال شدہ components کے لیے غیر استعمال شدہ keys/values کے ساتھ اپنے codebase کو آلودہ کرنے سے بچیں**
   - اگر آپ کوئی component استعمال نہیں کرتے ہیں، تو Intlayer اس سے متعلقہ content کو امپورٹ نہیں کرے گا
   - اگر آپ کوئی component ڈیلیٹ کرتے ہیں، تو آپ کو اس کے متعلقہ content کو ہٹانا زیادہ آسانی سے یاد رہے گا کیونکہ یہ اسی فولڈر میں موجود ہوگا

5. **AI agents کے لیے آپ کے multilingual content کو ڈیکلیئر کرنے کی ریزننگ لاگت (reasoning cost) کو کم کریں**
   - AI agent کو یہ جاننے کے لیے آپ کے پورے codebase کو اسکین نہیں کرنا پڑے گا کہ آپ کا content کہاں implement کرنا ہے
   - تراجم آسانی سے آپ کے IDE میں آٹو کمپلیشن AI ٹولز (جیسے GitHub Copilot) کے ذریعے کیے جا سکتے ہیں

6. **لوڈنگ کی کارکردگی کو بہتر بنائیں**
   - اگر کوئی کمپوننٹ لیزی لوڈ (lazy-loaded) ہے، تو اس کا متعلقہ مواد بھی اسی وقت لوڈ ہوگا

## Intlayer کی اضافی خصوصیات

| Feature                                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **کراس فریم ورک سپورٹ (Cross-Frameworks Support)**<br><br>Intlayer تمام بڑے فریم ورکس اور لائبریریوں کے ساتھ مطابقت رکھتا ہے، بشمول Next.js، React، Vite، Vue.js، Nuxt، Preact، Express، اور بہت کچھ۔                                                                                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **جاوا اسکرپٹ سے چلنے والا مواد کا انتظام (JavaScript-Powered Content Management)**<br><br>اپنے مواد کو مؤثر طریقے سے بیان اور منظم کرنے کے لیے جاوا اسکرپٹ کی لچک کا فائدہ اٹھائیں۔ <br><br> - [مواد کا اعلان (Content declaration)](https://intlayer.org/doc/concept/content)                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **کمپائلر (Compiler)**<br><br>Intlayer کمپائلر خود بخود اجزاء سے مواد نکالتا ہے اور ڈکشنری فائلیں تیار کرتا ہے۔<br><br> - [کمپائلر (Compiler)](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **فی لوکیل مواد کے اعلان کی فائل (Per-Locale Content Declaration File)**<br><br>خودکار جنریشن سے پہلے، ایک بار اپنے مواد کا اعلان کر کے اپنی ترقی کو تیز کریں۔<br><br> - [فی لوکیل مواد کے اعلان کی فائل](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **ٹائپ سیف ماحول (Type-Safe Environment)**<br><br>یہ یقینی بنانے کے لیے ٹائپ اسکرپٹ (TypeScript) کا استعمال کریں کہ آپ کے مواد کی تعریفیں اور کوڈ غلطیوں سے پاک ہیں، جبکہ IDE آٹو کمپلیشن سے بھی فائدہ اٹھائیں۔<br><br> - [ٹائپ اسکرپٹ کنفیگریشن](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **آسان سیٹ اپ (Simplified Setup)**<br><br>کم سے کم کنفیگریشن کے ساتھ تیزی سے کام شروع کریں۔ انٹرنیشنلائزیشن، روٹنگ، AI، بلڈ، اور مواد کے انتظام کے لیے ترتیبات کو آسانی سے ایڈجسٹ کریں۔ <br><br> - [Next.js انٹیگریشن کو دریافت کریں](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **آسان مواد کا حصول (Simplified Content Retrieval)**<br><br>مواد کے ہر حصے کے لیے اپنے `t` فنکشن کو کال کرنے کی ضرورت نہیں ہے۔ ایک ہی ہک کا استعمال کرتے ہوئے براہ راست اپنا تمام مواد حاصل کریں۔<br><br> - [React انٹیگریشن](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **مستقل سرور کمپوننٹ عمل درآمد (Consistent Server Component Implementation)**<br><br>Next.js سرور اجزاء کے لیے بالکل موزوں، کلائنٹ اور سرور دونوں اجزاء کے لیے ایک ہی عمل درآمد کا استعمال کریں، ہر سرور جزو میں اپنے `t` فنکشن کو منتقل کرنے کی ضرورت نہیں ہے۔ <br><br> - [سرور اجزاء (Server Components)](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **منظم کوڈ بیس (Organized Codebase)**<br><br>اپنے کوڈ بیس کو زیادہ منظم رکھیں: 1 کمپوننٹ = 1 ڈکشنری اسی فولڈر میں۔ اپنے متعلقہ اجزاء کے قریب تراجم برقرار رکھنے کی صلاحیت اور وضاحت کو بڑھاتے ہیں۔ <br><br> - [Intlayer کیسے کام کرتا ہے](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **بہتر روٹنگ (Enhanced Routing)**<br><br>ایپ روٹنگ کی مکمل سپورٹ، پیچیدہ ایپلیکیشن ڈھانچے کے لیے بغیر کسی رکاوٹ کے ڈھلتی ہے، جیسے Next.js، React، Vite، Vue.js، وغیرہ کے لیے۔<br><br> - [Next.js انٹیگریشن کو دریافت کریں](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **مارک ڈاؤن سپورٹ (Markdown Support)**<br><br>کثیر لسانی مواد جیسے پرائیویسی پالیسیوں، دستاویزات وغیرہ کے لیے لوکیل فائلوں اور ریموٹ مارک ڈاؤن کو امپورٹ اور انٹرپریٹ کریں۔ اپنے کوڈ میں مارک ڈاؤن میٹا ڈیٹا کو قابل رسائی بنا کریں۔<br><br> - [مواد کی فائلیں (Content files)](https://intlayer.org/doc/concept/content/file)                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **مفت ویژول ایڈیٹر اور CMS (Free Visual Editor & CMS)**<br><br>مواد لکھنے والوں کے لیے ایک مفت ویژول ایڈیٹر اور CMS دستیاب ہے، جس سے لوکلائزیشن پلیٹ فارم کی ضرورت ختم ہو جاتی ہے۔ Git کا استعمال کرتے ہوئے اپنے مواد کو ہم آہنگ رکھیں، یا CMS کے ساتھ اسے مکمل یا جزوی طور پر بیرونی بنائیں۔<br><br> - [Intlayer ایڈیٹر](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **ٹریس شیک ایبل مواد (Tree-shakable Content)**<br><br>ٹریس شیک ایبل مواد، جو حتمی بنڈل کے سائز کو کم کرتا ہے۔ ہر کمپوننٹ کے حساب سے مواد لوڈ کرتا ہے، آپ کے بنڈل سے کسی بھی غیر استعمال شدہ مواد کو خارج کرتا ہے۔ ایپ لوڈنگ کی کارکردگی کو بڑھانے کے لیے لیزی لوڈنگ کی حمایت کرتا ہے۔ <br><br> - [ایپ بلڈ آپٹیمائزیشن](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **اسٹیٹک رینڈرنگ (Static Rendering)**<br><br>اسٹیٹک رینڈرنگ کو نہیں روکتا۔ <br><br> - [Next.js انٹیگریشن](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI سے چلنے والا ترجمہ (AI-Powered Translation)**<br><br>اپنے اپنے AI فراہم کنندہ/API کی کا استعمال کرتے ہوئے Intlayer کے جدید AI سے چلنے والے ترجمے کے ٹولز کے ساتھ صرف ایک کلک میں اپنی ویب سائٹ کو 231 زبانوں میں تبدیل کریں۔ <br><br> - [CI/CD انٹیگریشن](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [آٹو فل (Auto fill)](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP سرور انٹیگریشن (MCP Server Integration)**<br><br>IDE آٹومیشن کے لیے ایک MCP (Model Context Protocol) سرور فراہم کرتا ہے، جو آپ کے ڈویلپمنٹ ماحول کے اندر ہی ہموار مواد کے انتظام اور i18n ورک فلوز کو قابل بناتا ہے۔ <br><br> - [MCP سرور](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/mcp_server.md)                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode ایکسٹینشن (VSCode Extension)**<br><br>Intlayer ایک VSCode ایکسٹینشن فراہم کرتا ہے تاکہ آپ کو اپنے مواد اور تراجم کا انتظام کرنے، اپنی ڈکشنریز بنانے، اپنے مواد کا ترجمہ کرنے، اور بہت کچھ کرنے میں مدد ملے۔ <br><br> - [VSCode ایکسٹینشن](https://intlayer.org/doc/vs-code-extension)                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **باہمی مطابقت (Interoperability)**<br><br>react-i18next، next-i18next، next-intl، اور react-intl کے ساتھ باہمی مطابقت کی اجازت دیتا ہے۔ <br><br> - [Intlayer اور react-intl](https://intlayer.org/doc/blog/intlayer-with-react-intl) <br> - [Intlayer اور next-intl](https://intlayer.org/doc/blog/intlayer-with-next-intl) <br> - [Intlayer اور next-i18next](https://intlayer.org/doc/blog/intlayer-with-next-i18next)                  |
| Testing Missing Translations (CLI/CI)                                                                                     | ✅ CLI: npx intlayer content test (CI کے لیے موزوں آڈٹ)                                                                                                                                                                                                                                                                                                                                                                                    |

## دیگر حلوں کے ساتھ Intlayer کا موازنہ

| خصوصیت                                                      | `intlayer`                                                                                                                                                                     | `react-i18next`                                                                                         | `react-intl` (FormatJS)                                                                                                       | `lingui`                                                                        | `next-intl`                                                                                             | `next-i18next`                                                                                          | `vue-i18n`                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **اجزاء کے قریب تراجم (Translations Near Components)**      | ✅ جی ہاں، مواد ہر جزو کے ساتھ رکھا گیا ہے                                                                                                                                     | ❌ نہیں                                                                                                 | ❌ نہیں                                                                                                                       | ❌ نہیں                                                                         | ❌ نہیں                                                                                                 | ❌ نہیں                                                                                                 | ✅ جی ہاں - سنگل فائل اجزاء (SFCs) کا استعمال کرتے ہوئے          |
| **ٹائپ اسکرپٹ انٹیگریشن (TypeScript Integration)**          | ✅ جدید، خود کار طریقے سے تیار کردہ سخت ٹائپس                                                                                                                                  | ⚠️ بنیادی؛ حفاظت کے لیے اضافی کنفیگریشن                                                                 | ✅ اچھا، لیکن کم سخت                                                                                                          | ⚠️ ٹائپنگز، کنفیگریشن کی ضرورت ہے                                               | ✅ اچھا                                                                                                 | ⚠️ بنیادی                                                                                               | ✅ اچھا (ٹائپس دستیاب ہیں؛ کی-سیفٹی کے لیے سیٹ اپ درکار ہے)      |
| **گمشدہ ترجمہ کی نشاندہی (Missing Translation Detection)**  | ✅ ٹائپ اسکرپٹ کی غلطی کی ہائی لائٹ اور بلڈ ٹائم غلطی/وارننگ                                                                                                                   | ⚠️ زیادہ تر رن ٹائم پر فال بیک اسٹرنگز                                                                  | ⚠️ فال بیک اسٹرنگز                                                                                                            | ⚠️ اضافی کنفیگریشن کی ضرورت ہے                                                  | ⚠️ رن ٹائم فال بیک                                                                                      | ⚠️ رن ٹائم فال بیک                                                                                      | ⚠️ رن ٹائم فال بیک/وارننگز (قابل ترتیب)                          |
| **امیر مواد (Rich Content - JSX/Markdown/components)**      | ✅ براہ راست سپورٹ                                                                                                                                                             | ⚠️ محدود / صرف انٹرپولیلیشن                                                                             | ⚠️ ICU سنٹیکس، حقیقی JSX نہیں                                                                                                 | ⚠️ محدود                                                                        | ❌ امیر نوڈس کے لیے ڈیزائن نہیں کیا گیا                                                                 | ⚠️ محدود                                                                                                | ⚠️ محدود (اجزاء `<i18n-t>` کے ذریعے، مارک ڈاؤن پلگ انز کے ذریعے) |
| **AI سے چلنے والا ترجمہ (AI-powered Translation)**          | ✅ جی ہاں، متعدد AI فراہم کنندگان کی مدد کرتا ہے۔ آپ کی اپنی API کیز کا استعمال کرتے ہوئے قابل استعمال ہے۔ آپ کی ایپلیکیشن کے سیاق و سباق اور مواد کے دائرہ کار پر غور کرتا ہے | ❌ نہیں                                                                                                 | ❌ نہیں                                                                                                                       | ❌ نہیں                                                                         | ❌ نہیں                                                                                                 | ❌ نہیں                                                                                                 | ❌ نہیں                                                          |
| **ویژول ایڈیٹر (Visual Editor)**                            | ✅ جی ہاں، مقامی ویژول ایڈیٹر + اختیاری CMS؛ کوڈ بیس کے مواد کو بیرونی بنا سکتا ہے؛ ایمبیڈ ایبل                                                                                | ❌ نہیں / بیرونی لوکلائزیشن پلیٹ فارمز کے ذریعے دستیاب ہے                                               | ❌ نہیں / بیرونی لوکلائزیشن پلیٹ فارمز کے ذریعے دستیاب ہے                                                                     | ❌ نہیں / بیرونی لوکلائزیشن پلیٹ فارمز کے ذریعے دستیاب ہے                       | ❌ نہیں / بیرونی لوکلائزیشن پلیٹ فارمز کے ذریعے دستیاب ہے                                               | ❌ نہیں / بیرونی لوکلائزیشن پلیٹ فارمز کے ذریعے دستیاب ہے                                               | ❌ نہیں / بیرونی لوکلائزیشن پلیٹ فارمز کے ذریعے دستیاب ہے        |
| **لوکلائزڈ روٹنگ (Localized Routing)**                      | ✅ جی ہاں، باکس سے باہر لوکلائزڈ راستوں کی حمایت کرتا ہے (Next.js اور Vite کے ساتھ کام کرتا ہے)                                                                                | ⚠️ کوئی بلٹ ان نہیں، پلگ انز (مثلاً next-i18next) یا اپنی مرضی کے روٹر کنفیگ کی ضرورت ہے                | ❌ نہیں، فقط میسج فارمیٹنگ، روٹنگ دستی ہونی چاہیے                                                                             | ⚠️ کوئی بلٹ ان نہیں، پلگ انز یا دستی کنفیگ کی ضرورت ہے                          | ✅ بلٹ ان، ایپ روٹر [locale] سیگمنٹ کی حمایت کرتا ہے                                                    | ✅ بلٹ ان                                                                                               | ✅ بلٹ ان                                                        |
| **ڈائنامک روٹ جنریشن (Dynamic Route Generation)**           | ✅ جی ہاں                                                                                                                                                                      | ⚠️ پلگ ان/ایکو سسٹم یا دستی سیٹ اپ                                                                      | ❌ فراہم نہیں کیا گیا                                                                                                         | ⚠️ پلگ ان/دستی                                                                  | ✅ جی ہاں                                                                                               | ✅ جی ہاں                                                                                               | ❌ فراہم نہیں کیا گیا (Nuxt i18n فراہم کرتا ہے)                  |
| **جمع سازی (Pluralization)**                                | ✅ شمار پر مبنی پیٹرنز (Enumeration-based patterns)                                                                                                                            | ✅ قابل ترتیب (پلگ انز جیسے i18next-icu)                                                                | ✅ (ICU)                                                                                                                      | ✅ (ICU/messageformat)                                                          | ✅ اچھا                                                                                                 | ✅ اچھا                                                                                                 | ✅ بلٹ ان جمع کے قواعد                                           |
| **فارمیٹنگ (تاریخیں، نمبر، کرنسیاں)**                       | ✅ بہتر فارمیٹٹرز (پردے کے پیچھے Intl)                                                                                                                                         | ⚠️ پلگ انز یا اپنی مرضی کے Intl استعمال کے ذریعے                                                        | ✅ ICU فارمیٹٹرز                                                                                                              | ✅ ICU/CLI مددگار                                                               | ✅ اچھا (Intl مددگار)                                                                                   | ✅ اچھا (Intl مددگار)                                                                                   | ✅ بلٹ ان تاریخ/نمبر فارمیٹٹرز (Intl)                            |
| **مواد کا فارمیٹ (Content Format)**                         | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml کام جاری ہے)                                                                                                                       | ⚠️ .json                                                                                                | ✅ .json, .js                                                                                                                 | ⚠️ .po, .json                                                                   | ✅ .json, .js, .ts                                                                                      | ⚠️ .json                                                                                                | ✅ .json, .js                                                    |
| **ICU سپورٹ**                                               | ⚠️ کام جاری ہے (WIP)                                                                                                                                                           | ⚠️ پلگ ان کے ذریعے (i18next-icu)                                                                        | ✅ جی ہاں                                                                                                                     | ✅ جی ہاں                                                                       | ✅ جی ہاں                                                                                               | ⚠️ پلگ ان کے ذریعے (`i18next-icu`)                                                                      | ⚠️ اپنی مرضی کے فارمیٹر/کمپائلر کے ذریعے                         |
| **SEO مددگار (hreflang, sitemap)**                          | ✅ بلٹ ان ٹولز: sitemap، robots.txt، میٹا ڈیٹا کے لیے مددگار                                                                                                                   | ⚠️ کمیونٹی پلگ انز/دستی                                                                                 | ❌ بنیادی حصہ نہیں                                                                                                            | ❌ بنیادی حصہ نہیں                                                              | ✅ اچھا                                                                                                 | ✅ اچھا                                                                                                 | ❌ بنیادی حصہ نہیں (Nuxt i18n مددگار فراہم کرتا ہے)              |
| **ایکو سسٹم / کمیونٹی**                                     | ⚠️ چھوٹا لیکن تیزی سے بڑھتا ہوا اور فعال                                                                                                                                       | ✅ سب سے بڑا اور پختہ                                                                                   | ✅ بڑا                                                                                                                        | ⚠️ چھوٹا                                                                        | ✅ درمیانے سائز کا، Next.js پر مرکوز                                                                    | ✅ درمیانے سائز کا، Next.js پر مرکوز                                                                    | ✅ Vue ایکو سسٹم میں بڑا                                         |
| **سرور سائیڈ رینڈرنگ اور سرور اجزاء**                       | ✅ جی ہاں، SSR / React سرور اجزاء کے لیے ہموار                                                                                                                                 | ⚠️ پیج لیول پر سپورٹڈ ہے لیکن چائلڈ سرور اجزاء کے لیے کمپوننٹ ٹری پر t-functions منتقل کرنے کی ضرورت ہے | ⚠️ اضافی سیٹ اپ کے ساتھ پیج لیول پر سپورٹڈ ہے، لیکن چائلڈ سرور اجزاء کے لیے کمپوننٹ ٹری پر t-functions منتقل کرنے کی ضرورت ہے | ✅ سپورٹڈ، سیٹ اپ کی ضرورت ہے                                                   | ⚠️ پیج لیول پر سپورٹڈ ہے لیکن چائلڈ سرور اجزاء کے لیے کمپوننٹ ٹری پر t-functions منتقل کرنے کی ضرورت ہے | ⚠️ پیج لیول پر سپورٹڈ ہے لیکن چائلڈ سرور اجزاء کے لیے کمپوننٹ ٹری پر t-functions منتقل کرنے کی ضرورت ہے | ✅ SSR via Nuxt/Vue SSR (no RSC)                                 |
| **ٹریس شیکنگ (صرف استعمال شدہ مواد لوڈ کریں)**              | ✅ جی ہاں، بلڈ ٹائم پر Babel/SWC پلگ انز کے ذریعے فی کمپوننٹ                                                                                                                   | ⚠️ عام طور پر سب لوڈ کرتا ہے (namespaces/code-splitting کے ساتھ بہتر کیا جا سکتا ہے)                    | ⚠️ عام طور پر سب لوڈ کرتا ہے                                                                                                  | ❌ ڈیفالٹ نہیں                                                                  | ⚠️ جزوی                                                                                                 | ⚠️ جزوی                                                                                                 | ⚠️ جزوی (code-splitting/دستی سیٹ اپ کے ساتھ)                     |
| **لیزی لوڈنگ (Lazy loading)**                               | ✅ جی ہاں، فی لوکیل / فی ڈکشنری                                                                                                                                                | ✅ جی ہاں (مثلاً، ڈیمانڈ پر backends/namespaces)                                                        | ✅ جی ہاں (لوکیل بنڈلز کو تقسیم کریں)                                                                                         | ✅ جی ہاں (ڈائنامک کیٹلاگ امپورٹس)                                              | ✅ جی ہاں (فی روٹ/فی لوکیل)، نیم اسپیس مینجمنٹ کی ضرورت ہے                                              | ✅ جی ہاں (فی روٹ/فی لوکیل)، نیم اسپیس مینجمنٹ کی ضرورت ہے                                              | ✅ جی ہاں (غیر مطابقت پذیر لوکیل پیغامات)                        |
| **غیر استعمال شدہ مواد کو صاف کرنا (Purge unused content)** | ✅ جی ہاں، بلڈ ٹائم پر فی ڈکشنری                                                                                                                                               | ❌ نہیں، صرف دستی نیم اسپیس سیگمنٹیشن کے ذریعے                                                          | ❌ نہیں، تمام اعلانیہ پیغامات بنڈل ہو جاتے ہیں                                                                                | ✅ جی ہاں، غیر استعمال شدہ کیز کا پتہ لگایا جاتا ہے اور بلڈ پر چھوڑ دیا جاتا ہے | ❌ نہیں، نیم اسپیس مینجمنٹ کے ساتھ دستی طور پر منظم کیا جا سکتا ہے                                      | ❌ نہیں، نیم اسپیس مینجمنٹ کے ساتھ دستی طور پر منظم کیا جا سکتا ہے                                      | ❌ نہیں، صرف دستی لیزی لوڈنگ کے ذریعے ممکن ہے                    |
| **بڑے پروجیکٹس کا انتظام (Management of Large Projects)**   | ✅ ماڈیولر کی حوصلہ افزائی کرتا ہے، ڈیزائن سسٹم کے لیے موزوں ہے                                                                                                                | ⚠️ اچھی فائل ڈسپلن کی ضرورت ہے                                                                          | ⚠️ مرکزی کیٹلاگ بڑے ہو سکتے ہیں                                                                                               | ⚠️ پیچیدہ ہو سکتا ہے                                                            | ✅ سیٹ اپ کے ساتھ ماڈیولر                                                                               | ✅ سیٹ اپ کے ساتھ ماڈیولر                                                                               | ✅ Vue Router/Nuxt i18n سیٹ اپ کے ساتھ ماڈیولر                   |

## GitHub STARs

گٹ ہب اسٹارز (GitHub stars) کسی پروجیکٹ کی مقبولیت، کمیونٹی کے اعتماد اور طویل مدتی مطابقت کا ایک مضبوط اشارہ ہیں۔ اگرچہ یہ تکنیکی معیار کا براہ راست پیمانہ نہیں ہیں، لیکن یہ ظاہر کرتے ہیں کہ کتنے ڈویلپرز پروجیکٹ کو مفید پاتے ہیں، اس کی پیشرفت پر نظر رکھتے ہیں، اور اسے اپنانے کا احتمال رکھتے ہیں۔ کسی پروجیکٹ کی قدر کا اندازہ لگانے کے لیے، اسٹارز متبادلات کے درمیان کرشن (traction) کا موازنہ کرنے اور ایکو سسٹم کی ترقی کے بارے میں بصیرت فراہم کرنے میں مدد کرتے ہیں۔

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## باہمی مطابقت (Interoperability)

`intlayer` آپ کے `react-intl` ، `react-i18next` ، `next-intl` ، `next-i18next` ، اور `vue-i18n` نیم اسپیسز (namespaces) کو منظم کرنے میں بھی مدد کر سکتا ہے۔

Intlayer کا استعمال کرتے ہوئے، آپ اپنے پسندیدہ i18n لائبریری کے فارمیٹ میں اپنے مواد کا اعلان کر سکتے ہیں، اور intlayer آپ کی پسند کے مقام پر آپ کے نیم اسپیسز تیار کرے گا (مثال کے طور پر: `/messages/{{locale}}/{{namespace}}.json`)۔
