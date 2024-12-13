# وثائق محرر Intlayer

محرر Intlayer هو أداة تحول تطبيقك إلى محرر بصري. مع محرر Intlayer، يمكن لفرقك إدارة محتوى موقعك بجميع اللغات المكونة.

![واجهة محرر Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/assets/intlayer_editor_ui.png)

حزمة `intlayer-editor` تعتمد على Intlayer ومتاحة لتطبيقات JavaScript، مثل React (Create React App)، Vite + React، و Next.js.

## التكامل

لمزيد من التفاصيل حول كيفية تثبيت الحزمة، راجع القسم ذي الصلة أدناه:

### التكامل مع Next.js

للتكامل مع Next.js، يرجى الاطلاع على [دليل التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع Create React App

للتكامل مع Create React App، يرجى الاطلاع على [دليل التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md).

### التكامل مع Vite + React

للتكامل مع Vite + React، يرجى الاطلاع على [دليل التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md).

## كيف يعمل محرر Intlayer

في كل مرة تقوم بإجراء تغيير باستخدام محرر Intlayer، يقوم الخادم تلقائيًا بإدخال تغييراتك في [ملفات إعلان Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md)، في أي مكان يتم فيه إعلان هذه الملفات في مشروعك.

بهذه الطريقة، لا يتعين عليك القلق بشأن مكان إعلان الملف أو العثور على مفتاحك في مجموعة القاموس الخاصة بك.

## التثبيت

بمجرد تكوين Intlayer في مشروعك، قم ببساطة بتثبيت `intlayer-editor` كاعتماد تطويري:

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## التهيئة

### 1. تفعيل المحرر في ملف intlayer.config.ts الخاص بك

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript
const config: IntlayerConfig = {
  // ... إعدادات التكوين الأخرى
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // إذا كانت القيمة false، يكون المحرر غير نشط ولا يمكن الوصول إليه.
    // معرف العميل والسر المطلوبين لتفعيل المحرر.
    // يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
    // يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> إذا لم يكن لديك معرف عميل وسر عميل، يمكنك الحصول عليهما عن طريق إنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://intlayer.org/dashboard/projects).

> لرؤية جميع المعلمات المتاحة، يرجى الرجوع إلى [وثائق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### 2. إدراج مزود محرر Intlayer في تطبيقك

لتفعيل المحرر، تحتاج إلى إدراج مزود محرر Intlayer في تطبيقك.

مثال لتطبيقات React JS أو Vite + React:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* تطبيقك */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

مثال لتطبيقات Next.js:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>{/* تطبيقك */}</IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. إضافة أنماط إلى تطبيقك

لعرض أنماط المحرر، تحتاج إلى إضافة الأنماط إلى تطبيقك.

إذا تم استخدام Tailwind، يمكنك إضافة أنماط إلى ملف `tailwind.config.js` الخاص بك:

```js
// tailwind.config.js
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... بقية المحتوى الخاص بك
  ],
  // ...
};
```

بخلاف ذلك، يمكنك استيراد الأنماط في تطبيقك:

```tsx
// app.tsx
import "intlayer-editor/css";
```

أو

```css
/* app.css */
@import "intlayer-editor/css";
```

## استخدام المحرر

عندما يتم تثبيت المحرر، وتفعيله، وبدء تشغيله، يمكنك عرض كل حقل مفهرس بواسطة Intlayer عن طريق التمرير فوق محتواك بمؤشر الماوس.

![التمرير فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/assets/intlayer_editor_hover_content.png)

إذا كان محتواك محددًا، يمكنك الضغط لفترة طويلة عليه لعرض درج التعديل.
