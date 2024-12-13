# تكامل Next.js: توثيق `useIntlayer` Hook

إن `useIntlayer` hook مصمم لتطبيقات Next.js لجلب وإدارة المحتوى المترجم بكفاءة. ستركز هذه الوثيقة على كيفية استخدام الـ hook ضمن مشاريع Next.js، مع ضمان ممارسات الترجمة الصحيحة.

## استيراد `useIntlayer` في Next.js

اعتمادًا على ما إذا كنت تعمل على مكونات جانب العميل أو جانب الخادم في تطبيق Next.js، يمكنك استيراد الـ `useIntlayer` hook كما يلي:

- **مكون العميل:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // مستخدم في مكونات جانب العميل
  ```

- **مكون الخادم:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // مستخدم في مكونات جانب الخادم
  ```

## المعلمات

1. **`key`**: معرف نصي لمفتاح القاموس الذي تريد استرداد المحتوى منه.
2. **`locale`** (اختياري): لغة محددة للاستخدام. إذا تم حذفها، الافتراضي للـ hook هو اللغة المحددة في سياق العميل أو الخادم.

## ملفات إعلان المحتوى

من الضروري أن يتم تعريف جميع مفاتيح المحتوى ضمن ملفات إعلان المحتوى لتجنب أخطاء وقت التشغيل وضمان أمان النوع. تسهل هذه الطريقة أيضًا تكامل TypeScript للتحقق من صحة الوقت الخاص بالتحويل.

تعليمات حول إعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

## مثال على الاستخدام في Next.js

إليك كيفية تنفيذ الـ `useIntlayer` hook ضمن صفحة Next.js لتحميل المحتوى المترجم ديناميكيًا بناءً على اللغة الحالية للتطبيق:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## التعامل مع ترجمة الخصائص

لتعريب الخصائص مثل `alt`، `title`، `href`، `aria-label`، وما إلى ذلك، تأكد من الإشارة إلى المحتوى بشكل صحيح:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## مزيد من المعلومات

- **محرر Intlayer المرئي**: تعرف على كيفية استخدام المحرر المرئي لإدارة المحتوى بسهولة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

ت outlines الوثيقة استخدام الـ `useIntlayer` hook بشكل خاص ضمن بيئات Next.js، مما يوفر حلاً قويًا لإدارة الترجمة عبر تطبيقات Next.js الخاصة بك.
