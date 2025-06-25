# intlayer-editor: حزمة NPM لاستخدام محرر Intlayer المرئي

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وReact وExpress.js.

حزمة **`intlayer-editor`** هي حزمة NPM تدمج محرر Intlayer المرئي في مشروع React الخاص بك.

## كيف يعمل محرر Intlayer

يسمح محرر Intlayer بالتفاعل مع قاموس Intlayer البعيد. يمكن تثبيته على جانب العميل وتحويل تطبيقك إلى محرر يشبه CMS لإدارة محتوى موقعك بجميع اللغات المُعدة.

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

### التكوين

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript
const config: IntlayerConfig = {
  // ... إعدادات التكوين الأخرى
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // إذا كانت القيمة false، فإن المحرر غير نشط ولا يمكن الوصول إليه.
    // معرف العميل والسر الخاص بالعميل مطلوبان لتفعيل المحرر.
    // يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
    // يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> إذا لم يكن لديك معرف عميل وسر خاص بالعميل، يمكنك الحصول عليهما عن طريق إنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://intlayer.org/dashboard/projects).

> لرؤية جميع المعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md)

حزمة `intlayer-editor` تعتمد على Intlayer ومتاحة لتطبيقات JavaScript، مثل React (Create React App)، Vite + React، وNext.js.

لمزيد من التفاصيل حول كيفية تثبيت الحزمة، راجع القسم المناسب أدناه:

### التكامل مع Next.js

للتكامل مع Next.js، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع Create React App

للتكامل مع Create React App، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)

### التكامل مع Vite + React

للتكامل مع Vite + React، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md)

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
          <IntlayerEditor>{/* محتوى التطبيق الخاص بك هنا */}</IntlayerEditor>
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

عندما يتم تثبيت المحرر وتفعيله وتشغيله، يمكنك عرض كل حقل مفهرس بواسطة Intlayer عن طريق التمرير فوق المحتوى الخاص بك باستخدام المؤشر.

![التمرير فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

إذا كان المحتوى الخاص بك محددًا، يمكنك الضغط عليه مطولًا لعرض درج التحرير.
