---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: جعل المكون متعدد اللغات (مكتبة i18n) في React و Next.js
description: تعلم كيفية إعلان واسترجاع المحتوى المحلي لبناء مكون React أو Next.js متعدد اللغات باستخدام Intlayer.
keywords:
  - i18n
  - component
  - react
  - multilingual
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# كيفية جعل المكون متعدد اللغات (i18n) باستخدام Intlayer

يوضح هذا الدليل الخطوات الأساسية لجعل مكون واجهة المستخدم متعدد اللغات في إعدادين شائعين:

- React (Vite/SPA)
- Next.js (App Router)

ستقوم أولاً بإعلان المحتوى الخاص بك، ثم استرجاعه في مكونك.

## 1) إعلان المحتوى الخاص بك (مشترك بين React و Next.js)

قم بإنشاء ملف إعلان المحتوى بالقرب من مكونك. هذا يحافظ على الترجمات قريبة من مكان استخدامها ويمكّن من الأمان النوعي.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

يدعم JSON أيضًا إذا كنت تفضل ملفات التكوين.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) استرجع محتواك

### الحالة أ — تطبيق React (Vite/SPA)

الطريقة الافتراضية: استخدم `useIntlayer` للاسترجاع بواسطة المفتاح. هذا يحافظ على مكونات خفيفة ومكتوبة بأنواع.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

التصيير على جانب الخادم أو خارج المزود: استخدم `react-intlayer/server` ومرر `locale` صريحًا عند الحاجة.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

بديل: يمكن لـ `useDictionary` قراءة كائن معلن بالكامل إذا كنت تفضل تجميع البنية في موقع الاستدعاء.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### الحالة ب — Next.js (موجه التطبيق)

يفضل استخدام مكونات الخادم لأمان البيانات والأداء. استخدم `useIntlayer` من `next-intlayer/server` في ملفات الخادم، و`useIntlayer` من `next-intlayer` في مكونات العميل.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

نصيحة: للحصول على بيانات وصفية للصفحة وتحسين محركات البحث، يمكنك أيضًا جلب المحتوى باستخدام `getIntlayer` وإنشاء روابط متعددة اللغات عبر `getMultilingualUrls`.

## لماذا نهج مكونات Intlayer هو الأفضل

- **التجميع**: تعيش إعلانات المحتوى بالقرب من المكونات، مما يقلل الانحراف ويحسن إعادة الاستخدام عبر أنظمة التصميم.
- **سلامة النوع**: المفاتيح والهياكل ذات أنواع قوية؛ تظهر الترجمات المفقودة أثناء وقت البناء بدلاً من وقت التشغيل.
- **الخادم أولاً**: يعمل بشكل أصلي في مكونات الخادم لأمان وأداء أفضل؛ تبقى الخطافات الخاصة بالعميل سهلة الاستخدام.
- **إزالة الشجرة (Tree-shaking)**: يتم تجميع المحتوى المستخدم فقط بواسطة المكون، مما يحافظ على صغر حجم الحمولة في التطبيقات الكبيرة.
- **تجربة المطور والأدوات**: تتضمن طبقة وسيطة مدمجة، ومساعدات تحسين محركات البحث، وترجمات اختيارية عبر المحرر المرئي/الذكاء الاصطناعي لتبسيط العمل اليومي.

راجع المقارنات والأنماط في الملخص الموجه لـ Next.js: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## الأدلة والمراجع ذات الصلة

- إعداد React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- بداية TanStack: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- إعداد Next.js: https://intlayer.org/doc/environment/nextjs
- لماذا Intlayer مقابل next-intl مقابل next-i18next - https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

تتضمن هذه الصفحات إعدادًا شاملاً، ومزودين، والتوجيه، ومساعدات تحسين محركات البحث.
