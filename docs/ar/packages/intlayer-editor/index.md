# intlayer-editor: حزمة NPM لاستخدام محرر Intlayer المرئي

**Intlayer** هو مجموعة من الحزم مصممة خصيصًا لمطوري JavaScript. إنه متوافق مع الأطر مثل React وExpress.js.

حزمة **`intlayer-editor`** هي حزمة NPM تدمج محرر Intlayer المرئي في مشروع React الخاص بك.

## كيف يعمل محرر Intlayer

يسمح محرر Intlayer بالتفاعل مع قاموس Intlayer البعيد. يمكن تثبيته على جانب العميل وتحويل تطبيقك إلى محرر على غرار CMS لإدارة محتوى موقعك بجميع اللغات المكونة.

![واجهة محرر Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor_ui.png)

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

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript
const config: IntlayerConfig = {
  // ... إعدادات التهيئة الأخرى
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // إذا كان غير صحيح، سيكون المحرر غير نشط ولا يمكن الوصول إليه.
    // معرف العميل والسر المطلوبان لتمكين المحرر.
    // يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
    // يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> إذا لم يكن لديك معرف عميل وسر العميل، يمكنك الحصول عليهما عن طريق إنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://intlayer.org/dashboard/projects).

> لرؤية جميع المعلمات المتاحة، ارجع إلى [وثائق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md)

تستند حزمة `intlayer-editor` إلى Intlayer وهي متاحة لتطبيقات JavaScript، مثل React (Create React App) وVite + React وNext.js.

لمزيد من التفاصيل حول كيفية تثبيت الحزمة، انظر القسم ذي الصلة أدناه:

### التكامل مع Next.js

للتكامل مع Next.js، ارجع إلى [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع Create React App

للتكامل مع Create React App، ارجع إلى [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)

### التكامل مع Vite + React

للتكامل مع Vite + React، ارجع إلى [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md)

### مثال على التكامل

لدمج محرر Intlayer المرئي في مشروع React الخاص بك، اتبع الخطوات التالية:

- استيراد مكون محرر Intlayer في تطبيق React الخاص بك:

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

- استيراد أنماط محرر Intlayer في تطبيق Next.js الخاص بك:

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

عند تثبيت المحرر وتفعيله وبدء تشغيله، يمكنك عرض كل حقل تم فهرسته بواسطة Intlayer عن طريق تمرير المؤشر فوق محتواك.

![تمرير الماوس فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor_hover_content.png)

إذا كان محتواك مركّزًا، يمكنك الضغط عليه لفترة طويلة لعرض درج التحرير.
