---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: كيفية تكوين التوجيه بناءً على النطاق؟
description: تعلّم كيفية تكوين التوجيه بناءً على النطاق.
keywords:
  - النطاق
  - التوجيه
  - intlayer
  - التكوين
  - الوسيط
  - react-router
  - vue-router
  - next.js
  - vite
  - الإطار
slugs:
  - frequent-questions
  - domain-routing
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# كيف أقوم بتكوين **التوجيه بناءً على النطاق** مع Intlayer بدلاً من مسارات `/[locale]/`؟

## إجابة مختصرة

التوجيه بناءً على النطاق أبسط من التوجيه بناءً على المسار (`example.com/[locale]/`) لأنه يمكنك تخطي كل تكوين الوسيط والتوجيه. فقط قم بنشر تطبيقك على كل نطاق لغة واضبط متغير بيئة واحد لكل نطاق.

## خطوة بخطوة

1. **انشر مرة واحدة لكل نطاق** (`example.com`، `exemple.fr`، `ejemplo.es`، …).
2. لكل نشر، قم بتعيين `LOCALE` (ومتغيرات بيئة Intlayer المعتادة) إلى اللغة التي يجب أن يخدمها النطاق.
3. أشر إلى هذا المتغير كـ `defaultLocale` في ملف `intlayer.config.[ts|js]` الخاص بك.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 النطاق يحدد اللغة
  },
  // ... بقية التكوين الخاص بك
};

export default config;
```

هذا كل شيء - يعمل بنفس الطريقة مع **Next.js**، **Vite + React**، **Vite + Vue**، إلخ.

## ماذا لو كان كل النطاقات تشير إلى نفس النشر؟

إذا كانت جميع النطاقات تشير إلى نفس حزمة التطبيق، فستحتاج إلى اكتشاف المضيف أثناء وقت التشغيل وتمرير اللغة يدويًا عبر المزود.

### لـ Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname();
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### لـ Vue

```ts
ts;
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname());
app.mount("#app");
```

استبدل `getLocaleFromHostname()` بمنطق البحث الخاص بك.

## تحديث مبدل اللغة الخاص بك

عند استخدام التوجيه المعتمد على النطاق، يعني تغيير اللغة التنقل إلى نطاق آخر:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## فوائد التوجيه المعتمد على النطاق

1. **تكوين أبسط**: لا حاجة لتكوين `intlayerProxy`، `generateStaticParams`، `react-router`، أو `vue-router`
2. **تحسين محركات البحث (SEO)**: لكل لغة نطاق خاص بها
3. **عناوين URL أنظف**: لا يوجد بادئة للغة في المسار
4. **صيانة أسهل**: كل نشر للغة مستقل
