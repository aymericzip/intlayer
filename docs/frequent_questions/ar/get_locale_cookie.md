---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: كيفية استرجاع اللغة من الكوكيز / الرؤوس؟
description: تعلّم كيفية استرجاع اللغة من الكوكيز / الرؤوس.
keywords:
  - الكوكيز
  - الرؤوس
  - intlayer
  - اللغة
  - هوك
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - doc
  - faq
  - get-locale-cookie
---

# كيفية استرجاع اللغة من الكوكيز / الرؤوس

## استخدام الهوكس (مُوصى به)

في معظم حالات الاستخدام، يُنصح باسترجاع اللغة الحالية باستخدام هوك `useLocale` لأنه يتم حله تلقائيًا. هذا يعمل بطريقة مشابهة للـ `useLocale` القابل للاستخدام في Vue.js.

```ts
import { useLocale } from "next-intlayer";
// أو import { useLocale } من "react-intlayer";
// أو import { useLocale } من "vue-intlayer";

// استخدام جانب العميل
const { locale } = useLocale();
```

بالنسبة لمكونات الخادم، يمكنك استيراده من:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

هناك أيضًا هوك `useLocaleCookie` الذي يحل فقط قيمة الكوكيز.

## تكوين الكوكيز يدويًا

يمكنك إعلان اسم كوكيز مخصص كما يلي

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // الافتراضي هو 'intlayer-locale'
  },
};

export default config;
```

استرجاعها كما يلي

### جانب العميل

```ts
// استخدام اسم الكوكيز الافتراضي
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// استخدام اسم كوكيز مخصص
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### جانب الخادم (Next.js)

```ts
import { cookies } from "next/headers";

// استخدام اسم الكوكيز الافتراضي
const locale = cookies().get("intlayer-locale")?.value;

// استخدام اسم كوكيز مخصص
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### إذا لم يتم تعيين اللغة بعد

يتم تعيين اللغة ككوكيز فقط بمجرد أن يختار المستخدم اللغة صراحةً. بشكل افتراضي، للزوار الجدد، يتم تفسير اللغة من حقول الرؤوس.

يمكنك اكتشاف اللغة المفضلة للمستخدم من رؤوس الطلب. فيما يلي مثال على كيفية التعامل مع ذلك:

```ts
/**
 * يكتشف اللغة من رؤوس الطلب
 *
 * رأس accept-language هو الأهم لاكتشاف اللغة.
 * يحتوي على قائمة من رموز اللغات مع قيم الجودة (q-values) التي تشير
 * إلى اللغات المفضلة للمستخدم بترتيب التفضيل.
 *
 * مثال: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US هي اللغة الأساسية (q=1.0 مفترضة)
 * - en هو الخيار الثاني (q=0.9)
 * - fr هو الخيار الثالث (q=0.8)
 * - es هو الخيار الرابع (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * مثال على رؤوس المفاوضة التي ترسلها المتصفحات عادةً
 * تساعد هذه الرؤوس في تحديد اللغة المفضلة للمستخدم
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// مثال على الاستخدام:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
