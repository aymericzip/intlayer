---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "كيفية جعل تطبيق Next.js الحالي متعدد اللغات (i18n) لاحقاً (دليل i18n لعام 2026)"
description: "دليل عام 2026 لإضافة دعم تعدد اللغات (i18n) إلى تطبيق Next.js قائم دون إعادة بناء شاملة ومعقدة. استخراج تلقائي، ترجمة بالذكاء الاصطناعي وتوجيه فعال مع Intlayer."
keywords:
  - Next.js i18n
  - تدويل
  - ترجمة تطبيق Next.js قائم
  - Next.js 16
  - Intlayer
  - متعدد اللغات
  - React i18n
  - مترجم
  - ترجمة الذكاء الاصطناعي
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# كيفية جعل تطبيق Next.js الحالي متعدد اللغات (i18n) لاحقاً (دليل i18n لعام 2026)

يعد تضمين التدويل (i18n) في مشروع Next.js منذ البداية أمراً بسيطاً نسبياً. ولكن ماذا يحدث عندما يكون لديك بالفعل تطبيق Next.js ناضج ويعمل في بيئة الإنتاج بلغة واحدة، وتحتاج إلى جعله متعدد اللغات **لاحقاً**؟

إذا حاولت القيام بذلك باستخدام المكتبات التقليدية مثل `next-intl` أو `next-i18next`، فأنت تعرف الكابوس الذي ينتظرك:

- البحث اليدوي عن النصوص الثابتة داخل مئات ملفات JSX/TSX.
- إنشاء ملفات JSON المتداخلة يدوياً وابتكار مفاتيح ترجمة عشوائية (`pages.dashboard.header.title` وغيرها).
- استبدال نصوص الواجهة باستدعاءات دوال الترجمة (`t('...')`).
- إعادة تنظيم مجلد `app/` بالكامل ونقله إلى `app/[locale]/...`، مما يؤدي إلى كسر الروابط الحالية وعلامات المرجعية وفهرسة محركات البحث.

في عام 2026، لا يتعين عليك إعادة كتابة التعليمات البرمجية لتطبيقك. باستخدام **Intlayer**، يمكنك إضافة التدويل إلى تطبيق Next.js الحالي في دقائق معدودة، من خلال الاستخراج التلقائي، والترجمة المدعومة بالذكاء الاصطناعي، والتوجيه المرن وغير التداخلي.

> هل تبحث عن الدليل الفني الشامل خطوة بخطوة لـ Next.js 16 App Router؟ راجع وثائقنا المخصصة: [ترجمة Next.js 16 باستخدام Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md).

## جدول المحتويات

<TOC/>

## معضلة التعديل اللاحق: لماذا يصعب جعل التطبيق القائم متعدد اللغات؟

يواجه المطورون ثلاث عقبات رئيسية:

1. **اضطراب الكود المصدري**: استخراج السلاسل النصية يدوياً إلى قواميس JSON يتطلب تعديل كل ملف مكوّن تقريباً.
2. **قيود التوجيه**: المكتبات القديمة تجبرك على نقل الصفحات إلى مجلد `[locale]` ديناميكي.
3. **أعمال الترجمة الشاقة**: ترجمة القواميس إلى عشرات اللغات تتطلب نسخاً ولصقاً لا نهائياً.

يحل Intlayer هذه المشكلات جذرياً بفضل **الاستخراج بمساعدة المترجم**، و**القواميس التصريحية**، و**التوجيه المرن**.

## استخراج المحتوى تلقائياً (وداعاً للبحث اليدوي عن النصوص)

### الخيار أ: أداة الاستخراج عبر سطر الأوامر (`npx intlayer extract`)

يمكنك تشغيل أداة استخراج Intlayer مباشرة على مشروعك:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

يقوم هذا الأمر بفحص مكونات React واستخراج النصوص وإنشاء ملفات تعريف المحتوى (`.content.ts`) بجانب مكوناتك مباشرة مع ضمان أمان الأنواع.

### الخيار ب: مترجم Intlayer (الاستخراج أثناء مرحلة البناء)

مع تفعيل مترجم Intlayer في إعداداتك، يمكنك ببساطة الاستمرار في كتابة مكوناتك بنصوص واضحة بلغتك الافتراضية. أثناء البناء، يستخرج المترجم النص ويدمج المحتوى المترجم تلقائياً:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

في الكواليس، يقوم Intlayer ببناء القاموس وربط المكوّن بمحتواه المترجم، مما يلغي خطوة إعادة البناء اليدوية تماماً.

في هذه الحالة، سيتم إنشاء ملف `src/app/page.content.ts` بالمحتوى التالي:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## ترجمة مدعومة بالذكاء الاصطناعي مع نموذج LLM المفضل لديك

بمجرد استخراج المحتوى، يمكنك ترجمته في ثوانٍ عبر OpenAI أو Anthropic أو DeepSeek أو Mistral باستخدام مفاتيح API الخاصة بك:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "لوحة تحكم SaaS للإنتاجية والتعاون الجماعي",
  },
};

export default config;
```

يؤدي تشغيل الأمر `npx intlayer fill` إلى ملء ملفات تعريف المحتوى `.content.ts` تلقائياً بالترجمات لجميع اللغات المحددة:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      ar: "مرحباً بكم في منصتنا",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      ar: "ابدأ باستكشاف ميزاتنا الحديثة اليوم.",
    }),
  },
};

export default content;
```

نظراً لأن Intlayer يزود النموذج اللغوي (LLM) بـ `applicationContext` عالي المستوى، فإن الترجمات الناتجة تحافظ على الفروق الدقيقة والمصطلحات التقنية وصوت العلامة التجارية والسياق اللغوي بشكل أفضل بكثير من الأدوات الآلية التقليدية.

للتحقق من عدم تفويت أي نصوص قبل الإطلاق في الإنتاج:

```bash
npx intlayer test
```

## إضافة توجيه متعدد اللغات دون كسر الروابط الحالية

يوفر Intlayer خيارات توجيه متعددة:

- **معلمات البحث / وضع ملفات تعريف الارتباط (`search-params`)**: احتفظ بهيكل المجلدات كما هو (`/app/page.tsx`) دون الانتقال إلى `[locale]`.
- **وضع البادئة (`prefix` / `prefix-all-locales`)**: دعم الروابط الصديقة لمحركات البحث (SEO) بسهولة تامة.

قم بتهيئة تكامل Next.js في ثوانٍ:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

قم بتغليف التخطيط الجذري (root layout) بـ `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## تحسين محركات البحث متعدد اللغات (SEO)

توليد البيانات الوصفية المترجمة وعلامات `hreflang` لضمان الظهور العالمي في محركات البحث:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## تعمق أكثر: هل أنت مستعد للبدء خطوة بخطوة؟

قدم هذا الدليل نظرة شاملة على كيفية تحويل تطبيق Next.js الحالي إلى تطبيق متعدد اللغات في عام 2026. للاطلاع على الدليل الفني المفصل خطوة بخطوة، بما في ذلك البرمجيات الوسيطة والتوليد الثابت (`generateStaticParams`) ومكونات الخادم، تفضل بزيارة توثيقنا الرسمي:

👉 **[الدليل الكامل لترجمة Next.js 16 مع Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)**

## الأسئلة الشائعة (FAQ)

<FAQ>

<Question title="هل يمكنني جعل تطبيق Next.js متعدد اللغات دون نقل الملفات إلى app/[locale]؟">

نعم. يدعم Intlayer وضع `routing.mode: "search-params"` والكشف عبر الكوكيز أو الترويسات مع الحفاظ على هيكل المجلدات وروابط URL كما هي تماماً.

</Question>
<Question title="هل يجب علي استبدال جميع النصوص البرمجية يدوياً؟">

لا. يمكنك استخدام `npx intlayer extract` أو مترجم Intlayer لاستخراج النصوص تلقائياً.

</Question>
<Question title="كيف يقلل Intlayer حجم الحزمة مقارنة بـ next-intl؟">

من خلال تعريف القواميس لكل مكوّن واستخدام وحدات الماكرو أثناء البناء لتحميل النصوص المطلوبة فقط للصفحة المعروضة.

</Question>
<Question title="هل يمكنني استخدام الذكاء الاصطناعي لترجمة المكونات الحالية؟">

نعم. يتصل أمر `npx intlayer fill` بمزود الذكاء الاصطناعي الذي تختاره لتوليد ترجمات دقيقة تراعي السياق.

</Question>
</FAQ>
