---
docName: intlayer_visual_editor
url: https://intlayer.org/doc/concept/editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: محرر المرئي لِانتلاير | تحرير محتوىك باستخدام محرر المرئي
description: اكتشف كيفية استخدام محرر Intlayer لإدارة موقعك الإلكتروني متعدد اللغات. اتبع الخطوات في هذه الوثيقة عبر الإنترنت لإعداد مشروعك في بضع دقائق.
keywords:
  - محرر
  - تدويل
  - وثائق
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# وثائق محرر Intlayer البصري

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

محرر Intlayer البصري هو أداة تتيح لك التفاعل مع ملفات إعلان المحتوى الخاصة بموقعك باستخدام محرر بصري.

![واجهة محرر Intlayer البصري](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

حزمة `intlayer-editor` تعتمد على Intlayer ومتاحة لتطبيقات JavaScript، مثل React (Create React App)، Vite + React، و Next.js.

## المحرر البصري مقابل CMS

محرر Intlayer البصري هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر بصري للقواميس المحلية. بمجرد إجراء تغيير، سيتم استبدال المحتوى في قاعدة الكود. هذا يعني أن التطبيق سيتم إعادة بنائه وستتم إعادة تحميل الصفحة لعرض المحتوى الجديد.

على النقيض من ذلك، فإن [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر بصري للقواميس البعيدة. بمجرد إجراء تغيير، لن يؤثر المحتوى على قاعدة الكود الخاصة بك. وسيعرض الموقع تلقائيًا المحتوى الذي تم تغييره.

## دمج Intlayer في تطبيقك

لمزيد من التفاصيل حول كيفية دمج Intlayer، راجع القسم المناسب أدناه:

### الدمج مع Next.js

لدمج مع Next.js، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md).

### الدمج مع Create React App

لدمج مع Create React App، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md).

### الدمج مع Vite + React

لدمج مع Vite + React، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md).

## كيفية عمل محرر Intlayer

المحرر البصري في تطبيق يتضمن شيئين:

- تطبيق واجهة أمامية يعرض موقعك داخل iframe. إذا كان موقعك يستخدم Intlayer، سيكتشف المحرر البصري محتواك تلقائيًا، وسيسمح لك بالتفاعل معه. بمجرد إجراء تعديل، ستتمكن من تنزيل تغييراتك.

- بمجرد النقر على زر التنزيل، سيرسل المحرر البصري طلبًا إلى الخادم لاستبدال ملفات إعلان المحتوى الخاصة بك بالمحتوى الجديد (أينما تم إعلان هذه الملفات في مشروعك).

> لاحظ أنه في الوقت الحالي، سيكتب محرر Intlayer ملفات إعلان المحتوى الخاصة بك كملفات JSON.

## التثبيت

بمجرد تكوين Intlayer في مشروعك، قم ببساطة بتثبيت `intlayer-editor` كاعتماد تطوير:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## التكوين

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * مطلوب
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر البصري.
     * مثال: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * اختياري
     * الافتراضي هو `true`. إذا كان `false`، فإن المحرر غير نشط ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات محددة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * اختياري
     * الافتراضي هو `8000`.
     * منفذ خادم المحرر.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * اختياري
     * الافتراضي هو "http://localhost:8000"
     * عنوان URL لخادم المحرر.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * مطلوب
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر البصري.
     * مثال: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * اختياري
     * الافتراضي هو `true`. إذا كان `false`، فإن المحرر غير نشط ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات محددة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * اختياري
     * الافتراضي هو `8000`.
     * منفذ خادم المحرر.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * اختياري
     * الافتراضي هو "http://localhost:8000"
     * عنوان URL لخادم المحرر.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * مطلوب
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر البصري.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * اختياري
     * الافتراضي هو `8000`.
     * منفذ خادم المحرر.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * اختياري
     * الافتراضي هو "http://localhost:8000"
     * عنوان URL لخادم المحرر.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * اختياري
     * الافتراضي هو `true`. إذا كان `false`، فإن المحرر غير نشط ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات محددة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> لمشاهدة جميع المعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## استخدام المحرر

1. عند تثبيت المحرر، يمكنك بدء تشغيله باستخدام الأمر التالي:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **لاحظ أنه يجب تشغيل تطبيقك بالتوازي.** يجب أن يتطابق عنوان URL للتطبيق مع الذي قمت بتعيينه في تكوين المحرر (`applicationURL`).

2. ثم افتح عنوان URL المقدم. الافتراضي هو `http://localhost:8000`.

   يمكنك عرض كل حقل مفهرس بواسطة Intlayer عن طريق التمرير فوق المحتوى الخاص بك باستخدام المؤشر.

   ![التمرير فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. إذا تم تحديد محتواك، يمكنك الضغط عليه مطولاً لعرض درج التعديل.

## التصحيح

إذا واجهت أي مشاكل مع المحرر البصري، تحقق من التالي:

- المحرر البصري والتطبيق يعملان.

- تم إعداد [تكوين المحرر](https://intlayer.org/doc/concept/configuration#editor-configuration) بشكل صحيح في ملف تكوين Intlayer الخاص بك.

  - الحقول المطلوبة:
    - يجب أن يتطابق عنوان URL للتطبيق مع الذي قمت بتعيينه في تكوين المحرر (`applicationURL`).

- يستخدم المحرر البصري iframe لعرض موقعك. تأكد من أن سياسة أمان المحتوى (CSP) لموقعك تسمح بعنوان URL الخاص بـ CMS كـ `frame-ancestors` ('http://localhost:8000' افتراضيًا). تحقق من وحدة تحكم المحرر لأي خطأ.
