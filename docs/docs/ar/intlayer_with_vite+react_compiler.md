---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite و React i18n - تحويل تطبيق موجود إلى تطبيق متعدد اللغات (دليل i18n لعام 2026)
description: اكتشف كيفية جعل تطبيق Vite و React الحالي متعدد اللغات باستخدام مترجم Intlayer. اتبع الوثائق لتدويل (i18n) وترجمته باستخدام الذكاء الاصطناعي.
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - Vite
  - React
  - مترجم
  - الذكاء الاصطناعي
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: الإصدار الأولي
---

# كيفية جعل تطبيق Vite و React الحالي متعدد اللغات (i18n) لاحقًا (دليل i18n لعام 2026)

<Tabs defaultTab="video">
  <Tab label="فيديو" value="video">
  
<iframe title="أفضل حل i18n لـ Vite و React؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="كود" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

شاهد [قالب التطبيق](https://github.com/aymericzip/intlayer-vite-react-template) على GitHub.

## جدول المحتويات

<TOC/>

## لماذا يصعب تدويل تطبيق موجود؟

إذا كنت قد حاولت يومًا إضافة لغات متعددة إلى تطبيق تم بناؤه للغة واحدة فقط، فأنت تعرف المعاناة. الأمر ليس مجرد "صعب" - إنه ممل. عليك فحص كل ملف على حدة، ومطاردة كل سلسلة نصية، ونقلها إلى ملفات قاموس منفصلة.

ثم يأتي الجزء الخطير: استبدال كل هذا النص بخطافات الكود (code hooks) دون كسر التخطيط أو المنطق. إنه نوع العمل الذي يوقف تطوير الميزات الجديدة لأسابيع ويشعرك بإعادة هيكلة (refactoring) لا تنتهي.

## ما هو مترجم Intlayer؟

تم بناء **مترجم Intlayer** لتجاوز هذا العمل اليدوي الشاق. بدلاً من استخراج السلاسل يدويًا، يقوم المترجم بذلك نيابة عنك. يقوم بمسح الكود الخاص بك، والعثور على النص، واستخدام الذكاء الاصطناعي لإنشاء القواميس خلف الكواليس.
بعد ذلك، يقوم بتعديل الكود الخاص بك أثناء عملية البناء لحقن خطافات i18n اللازمة. بشكل أساسي، تواصل كتابة تطبيقك كما لو كان بلغة واحدة، ويتولى المترجم التحويل متعدد اللغات تلقائيًا.

> وثائق المترجم: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md

### القيود

نظرًا لأن المترجم يقوم بتحليل الكود وتحويله (إدخال الخطافات وإنشاء القواميس) في **وقت الترجمة (compile time)**، فقد يؤدي ذلك إلى **إبطاء عملية بناء** تطبيقك.

للتخفيف من هذا التأثير أثناء التطوير، يمكنك تكوين المترجم ليعمل في وضع [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) أو تعطيله عندما لا تكون هناك حاجة إليه.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و React

### الخطوة 1: تثبيت التبعيات

ثبّت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والتحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **react-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر مزودي السياق (context providers) والخطافات لتدويل React.

- **vite-intlayer**
  تتضمن مكون Vite الإضافي لدمج Intlayer مع [حزمة Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، ومعالجة إعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // يمكن ضبطه على 'build-only' للحد من التأثير على وضع التطوير
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // لا توجد بادئة comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "هذا التطبيق هو تطبيق خرائط", // ملاحظة: يمكنك تخصيص وصف التطبيق هذا
  },
};

export default config;
```

> **ملاحظة**: تأكد من ضبط `OPEN_AI_API_KEY` في متغيرات البيئة الخاصة بك.

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المترجمة، وإعادة توجيه الوسيط، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، ارجع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف مكون intlayer الإضافي إلى التكوين الخاص بك.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> يُستخدم مكون `intlayer()` الإضافي لـ Vite لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة (aliases) لتحسين الأداء.

> يُستخدم مكون `intlayerCompiler()` الإضافي لـ Vite لاستخراج المحتوى من المكون وكتابة ملفات `.content`.

### الخطوة 4: ترجمة الكود الخاص بك

فقط اكتب مكوناتك بسلاسل نصية ثابتة بلغتك الافتراضية. يتولى المترجم الباقي.

مثال على كيف قد تبدو صفحتك:

<Tabs>
 <Tab value="كود">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="المخرجات">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      ar: {
        viteLogo: "شعار Vite",
        reactLogo: "شعار React",
        title: "Vite + React",
        countButton: "العدد هو",
        editMessage: "عدّل",
        hmrMessage: "واحفظ لاختبار HMR",
        readTheDocs: "انقر على شعارات Vite و React لمعرفة المزيد",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- يُستخدم **`IntlayerProvider`** لتوفير اللغة للمكونات المتداخلة.

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام وظيفة `setLocale` التي يوفرها خطاف `useLocale`. تسمح لك هذه الوظيفة بضبط لغة التطبيق وتحديث المحتوى وفقًا لذلك.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ARABIC)}>
      تغيير اللغة إلى العربية
    </button>
  );
};
```

> لمعرفة المزيد حول خطاف `useLocale` ، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md).

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت إضافة **Intlayer VS Code Extension** الرسمية.

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [وثائق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

### اذهب أبعد من ذلك

للمضي قدمًا، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو جعل محتواك خارجيًا باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).
