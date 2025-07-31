---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - حزمة محرر الترجمة المرئية
description: حزمة محرر مرئي لـ Intlayer توفر واجهة بديهية لإدارة الترجمات وتحرير المحتوى التعاوني بمساعدة الذكاء الاصطناعي.
keywords:
  - intlayer
  - محرر
  - مرئي
  - ترجمة
  - تعاوني
  - ذكاء اصطناعي
  - NPM
  - واجهة
slugs:
  - doc
  - package
  - intlayer-editor
---

# intlayer-editor: حزمة NPM لاستخدام محرر Intlayer المرئي

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافاسكريبت. وهي متوافقة مع أُطُر العمل مثل React وExpress.js.

حزمة **`intlayer-editor`** هي حزمة NPM تدمج محرر Intlayer المرئي في مشروع React الخاص بك.

## كيف يعمل محرر Intlayer

يسمح محرر intlayer بالتفاعل مع قاموس Intlayer البعيد. يمكن تثبيته على جانب العميل وتحويل تطبيقك إلى محرر يشبه نظام إدارة المحتوى (CMS) لإدارة محتوى موقعك بجميع اللغات المُعدة.

![واجهة محرر Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### التهيئة

في ملف تهيئة Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript
const config: IntlayerConfig = {
  // ... إعدادات التهيئة الأخرى
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // إذا كانت القيمة false، يكون المحرر غير نشط ولا يمكن الوصول إليه.
    // معرف العميل والسر السري للعميل مطلوبان لتمكين المحرر.
    // يسمحان بتحديد المستخدم الذي يقوم بتحرير المحتوى.
    // يمكن الحصول عليهما بإنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> إذا لم يكن لديك معرف عميل وسر عميل، يمكنك الحصول عليهما بإنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://intlayer.org/dashboard/projects).

> للاطلاع على جميع المعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

حزمة `intlayer-editor` مبنية على Intlayer ومتاحة لتطبيقات جافا سكريبت، مثل React (Create React App)، Vite + React، وNext.js.

لمزيد من التفاصيل حول كيفية تثبيت الحزمة، راجع القسم المناسب أدناه:

### التكامل مع Next.js

للتكامل مع Next.js، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع Create React App

للتكامل مع Create React App، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)

### التكامل مع Vite + React

للتكامل مع Vite + React، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md)

### مثال على التكامل

لدمج محرر Intlayer المرئي في مشروع React الخاص بك، اتبع الخطوات التالية:

- استورد مكون محرر Intlayer في تطبيق React الخاص بك:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* محتوى تطبيقك هنا */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- استورد أنماط محرر Intlayer في تطبيق Next.js الخاص بك:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## استخدام المحرر

عند تثبيت المحرر وتمكينه وتشغيله، يمكنك عرض كل حقل مفهرس بواسطة Intlayer عن طريق تحريك المؤشر فوق المحتوى الخاص بك.

![التحويم فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

إذا كان المحتوى الخاص بك محددًا بإطار، يمكنك الضغط المطول عليه لعرض درج التحرير.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ
