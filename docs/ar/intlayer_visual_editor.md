# توثيق محرر Intlayer Visual

محرر Intlayer Visual هو أداة ستقوم بتغليف موقع الويب الخاص بك للتفاعل مع ملفات إعلان المحتوى الخاصة بك باستخدام محرر مرئي.

![واجهة محرر Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/ar/assets/visual_editor.gif)

حزمة `intlayer-editor` مستندة إلى Intlayer ومتاحة لتطبيقات JavaScript مثل React (Create React App) وVite + React وNext.js.

## محرر مرئي مقابل نظام إدارة المحتوى

محرر Intlayer Visual هو أداة تسمح لك بإدارة المحتوى الخاص بك في محرر مرئي للقواميس المحلية. بمجرد إجراء تغيير، سيتم استبدال المحتوى في قاعدة الشيفرة. مما يعني أن التطبيق سيتم إعادة بنائه وسيتم إعادة تحميل الصفحة لعرض المحتوى الجديد.

بالمقابل، [نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md) هو أداة تسمح لك بإدارة المحتوى الخاص بك في محرر مرئي للقواميس البعيدة. بمجرد إجراء تغيير، لن يؤثر المحتوى على قاعدة الشيفرة الخاصة بك. وسيقوم الموقع تلقائيًا بعرض المحتوى المتغير.

## دمج Intlayer في تطبيقك

لمزيد من التفاصيل حول كيفية دمج Intlayer، انظر القسم ذي الصلة أدناه:

### الدمج مع Next.js

لدمج مع Next.js، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

### الدمج مع Create React App

لدمج مع Create React App، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md).

### الدمج مع Vite + React

لدمج مع Vite + React، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md).

## كيفية عمل محرر Intlayer

المحرر المرئي في تطبيق يتضمن شيئان:

- تطبيق واجهة أمامية سيعرض موقعك في iframe. إذا كان موقعك يستخدم Intlayer، سيتعرف المحرر المرئي تلقائيًا على المحتوى الخاص بك، وسيسمح لك بالتفاعل معه. بمجرد إجراء تعديل، ستمكن من تنزيل التغييرات الخاصة بك.

- بمجرد النقر على زر التنزيل، سيرسل المحرر المرئي طلبًا إلى الخادم لاستبدال ملفات إعلان المحتوى الخاصة بك بالمحتوى الجديد (أينما تم إعلان هذه الملفات في مشروعك).

> لاحظ أنه في الوقت الحالي، سيكتب محرر Intlayer ملفات إعلان المحتوى الخاصة بك كملفات JSON.

## التثبيت

بمجرد تكوين Intlayer في مشروعك، قم بتثبيت `intlayer-editor` كاعتماد تطوير:

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## التكوين

### 1. تمكين المحرر في ملف intlayer.config.ts الخاص بك

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * مطلوب
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر المرئي.
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
     * الافتراضي هو `true`. إذا كان `false`، فإن المحرر غير مفعل ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات محددة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
   /**
     * مطلوب
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر المرئي.
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
     * الافتراضي هو `true`. إذا كان `false`، فإن المحرر غير مفعل ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات محددة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
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
     * هذا هو عنوان URL المستهدف من قبل المحرر المرئي.
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
     * الافتراضي هو `true`. إذا كان `false`، فإن المحرر غير مفعل ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات محددة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> لرؤية جميع المعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## استخدام المحرر

1. عند تثبيت المحرر، يمكنك بدء المحرر باستخدام الأمر التالي:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. ثم، افتح عنوان URL المقدم. بشكل افتراضي `http://localhost:8000`.

   يمكنك عرض كل حقل فهرسه Intlayer عن طريق تمرير المؤشر فوق المحتوى الخاص بك.

   ![المرور فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/assets/intlayer_editor_hover_content.png)

3. إذا كان المحتوى الخاص بك محددًا، يمكنك الضغط عليه لفترة طويلة لعرض درج التحرير.
