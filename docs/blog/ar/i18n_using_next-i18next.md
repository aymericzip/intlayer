---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: كيفية تعريب تطبيق Next.js الخاص بك باستخدام next-i18next
description: إعداد i18n باستخدام next-i18next: أفضل الممارسات ونصائح تحسين محركات البحث لتطبيقات Next.js متعددة اللغات، تغطي التعريب، تنظيم المحتوى، والإعداد الفني.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: النسخة الأولية
---

# كيفية تعريب تطبيق Next.js الخاص بك باستخدام next-i18next في عام 2025

## جدول المحتويات

<TOC/>

## ما هو next-i18next؟

**next-i18next** هو حل شائع للتعريب (i18n) لتطبيقات Next.js. بينما تم تصميم حزمة `next-i18next` الأصلية لتعمل مع Pages Router، يوضح لك هذا الدليل كيفية تنفيذ i18next مع **App Router** الحديث باستخدام `i18next` و `react-i18next` مباشرة.

مع هذا النهج، يمكنك:

- **تنظيم الترجمات** باستخدام مساحات الأسماء (مثل `common.json`، `about.json`) لإدارة محتوى أفضل.
- **تحميل الترجمات بكفاءة** عن طريق تحميل مساحات الأسماء المطلوبة فقط لكل صفحة، مما يقلل من حجم الحزمة.
- **دعم مكونات الخادم والعميل** مع التعامل الصحيح مع SSR وhydration.
- **ضمان دعم TypeScript** مع تكوين locale آمن من حيث النوع ومفاتيح الترجمة.
- **تحسين SEO** باستخدام بيانات وصفية مناسبة، وخريطة الموقع، وتعريب ملف robots.txt.

> كبديل، يمكنك أيضًا الرجوع إلى [دليل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_next-intl.md)، أو استخدام [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md) مباشرة.

> اطلع على المقارنة في [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md).

## الممارسات التي يجب اتباعها

قبل أن نبدأ في التنفيذ، إليك بعض الممارسات التي يجب اتباعها:

- **تعيين خصائص HTML `lang` و `dir`**
  في تخطيطك، احسب `dir` باستخدام `getLocaleDirection(locale)` وقم بتعيين `<html lang={locale} dir={dir}>` لضمان سهولة الوصول وتحسين محركات البحث.
- **قسّم الرسائل حسب النطاق**
  نظم ملفات JSON حسب اللغة والنطاق (مثل `common.json`، `about.json`) لتحميل ما تحتاجه فقط.
- **قلل من حجم البيانات المرسلة إلى العميل**
  في الصفحات، أرسل فقط النطاقات المطلوبة إلى `NextIntlClientProvider` (مثل `pick(messages, ['common', 'about'])`).
- **فضل الصفحات الثابتة**
  استخدم الصفحات الثابتة قدر الإمكان لأداء أفضل وتحسين محركات البحث.
- **الدولية في مكونات الخادم**
  مكونات الخادم، مثل الصفحات أو جميع المكونات غير المعلمة كـ `client` هي ثابتة ويمكن تقديمها مسبقًا أثناء وقت البناء. لذلك، سيتعين علينا تمرير دوال الترجمة إليها كخصائص.
- **إعداد أنواع TypeScript**
  للغاتك لضمان سلامة الأنواع في جميع أنحاء تطبيقك.
- **وكيل لإعادة التوجيه**
  استخدم وكيلًا للتعامل مع اكتشاف اللغة والتوجيه وإعادة توجيه المستخدم إلى عنوان URL المناسب مع بادئة اللغة.
- **تعريب بيانات التعريف، خريطة الموقع، robots.txt**
  قم بتعريب بيانات التعريف، خريطة الموقع، robots.txt باستخدام دالة `generateMetadata` المقدمة من Next.js لضمان اكتشاف أفضل من قبل محركات البحث في جميع اللغات.
- **تعريب الروابط**
  عرّب الروابط باستخدام مكون `Link` لإعادة توجيه المستخدم إلى عنوان URL المناسب مع بادئة اللغة. من المهم ضمان اكتشاف صفحاتك في جميع اللغات.
- **أتمتة الاختبارات والترجمات**
  تساعد أتمتة الاختبارات والترجمات في توفير الوقت لصيانة تطبيقك متعدد اللغات.

> راجع وثيقتنا التي تسرد كل ما تحتاج لمعرفته حول التدويل وتحسين محركات البحث: [التدويل (i18n) مع next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md).

---

## دليل خطوة بخطوة لإعداد i18next في تطبيق Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="عرض توضيحي CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> راجع [قالب التطبيق](https://github.com/aymericzip/next-i18next-template) على GitHub.

إليك هيكل المشروع الذي سنقوم بإنشائه:

```bash
.
├── i18n.config.ts
└── src # مجلد Src اختياري
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (مجموعة مسارات لتجنب تلوث جميع الصفحات برسائل الصفحة الرئيسية)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: إطار العمل الأساسي للتدويل الذي يتولى تحميل الترجمات وإدارتها.
- **react-i18next**: روابط React لـ i18next التي توفر هوكات مثل `useTranslation` لمكونات العميل.
- **i18next-resources-to-backend**: إضافة تتيح التحميل الديناميكي لملفات الترجمة، مما يسمح لك بتحميل مساحات الأسماء التي تحتاجها فقط.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتعريف اللغات المدعومة، اللغة الافتراضية، ودوال المساعدة لتوطين عناوين URL. يعمل هذا الملف كمصدر وحيد للحقيقة لإعداد i18n الخاص بك ويضمن سلامة الأنواع في جميع أنحاء تطبيقك.

يساعد مركزية تكوين اللغة على منع التناقضات ويسهل إضافة أو إزالة اللغات في المستقبل. تضمن دوال المساعدة توليد عناوين URL متسقة لتحسين محركات البحث والتوجيه.

```ts fileName="i18n.config.ts"
// تعريف اللغات المدعومة كمصفوفة ثابتة لضمان سلامة الأنواع
// يجعل التوكيد 'as const' TypeScript يستنتج أنواع حرفية بدلاً من string[]
export const locales = ["en", "fr"] as const;

// استخراج نوع Locale من مصفوفة اللغات
// هذا ينشئ نوع اتحاد: "en" | "fr"
// استخراج نوع Locale من مصفوفة اللغات
// هذا ينشئ نوع اتحاد: "en" | "fr"
export type Locale = (typeof locales)[number];

// تعيين اللغة الافتراضية المستخدمة عند عدم تحديد لغة
export const defaultLocale: Locale = "en";

// اللغات التي تُكتب من اليمين إلى اليسار والتي تحتاج إلى معالجة خاصة لاتجاه النص
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// التحقق مما إذا كانت اللغة تتطلب اتجاه نص من اليمين إلى اليسار
// يُستخدم للغات مثل العربية، العبرية، الفارسية، والأردية
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// إنشاء مسار محلي للغة معينة ومسار معين
// مسارات اللغة الافتراضية لا تحتوي على بادئة (مثلاً "/about" بدلاً من "/en/about")
// اللغات الأخرى تحتوي على بادئة (مثلاً "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// عنوان URL الأساسي للروابط المطلقة (يُستخدم في خرائط المواقع، البيانات الوصفية، إلخ)
const ORIGIN = "https://example.com";

// إنشاء عنوان URL مطلق مع بادئة اللغة
// يُستخدم في بيانات SEO الوصفية، خرائط المواقع، وعناوين URL القانونية
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// يُستخدم لضبط ملف تعريف الارتباط الخاص باللغة في المتصفح
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // سنة واحدة
    "SameSite=Lax",
  ].join("; ");
}
```

### الخطوة 3: مركزية مساحات أسماء الترجمة

قم بإنشاء مصدر واحد للحقيقة لكل مساحة أسماء (namespace) تعرضها تطبيقك. إعادة استخدام هذه القائمة يحافظ على تزامن كود الخادم والعميل وأدوات التطوير ويفتح إمكانية التحقق القوي من نوع المفاتيح الخاصة بالمترجمين.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### الخطوة 4: تعيين نوع قوي لمفاتيح الترجمة باستخدام TypeScript

قم بتعزيز `i18next` للإشارة إلى ملفات اللغة الرسمية الخاصة بك (عادةً الإنجليزية). يقوم TypeScript بعد ذلك باستنتاج المفاتيح الصحيحة لكل مساحة أسماء، بحيث يتم التحقق من استدعاءات `t()` بشكل كامل.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> نصيحة: خزّن هذا التعريف تحت مجلد `src/types` (قم بإنشاء المجلد إذا لم يكن موجودًا). يتضمن Next.js بالفعل مجلد `src` في ملف `tsconfig.json`، لذا يتم التقاط هذا التوسيع تلقائيًا. إذا لم يكن كذلك، أضف التالي إلى ملف `tsconfig.json` الخاص بك:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

مع هذا الإعداد يمكنك الاعتماد على الإكمال التلقائي وفحوصات وقت الترجمة:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// صحيح، مع تحديد النوع: t("counter.increment")
// خطأ، خطأ في الترجمة: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### الخطوة 5: إعداد تهيئة i18n على جانب الخادم

قم بإنشاء دالة تهيئة على جانب الخادم تقوم بتحميل الترجمات لمكونات الخادم. تنشئ هذه الدالة نسخة منفصلة من i18next للعرض على جانب الخادم، مما يضمن تحميل الترجمات قبل العرض.

تحتاج مكونات الخادم إلى نسخة خاصة بها من i18next لأنها تعمل في سياق مختلف عن مكونات العميل. يمنع تحميل الترجمات مسبقًا على الخادم ظهور محتوى غير مترجم مؤقتًا ويحسن تحسين محركات البحث (SEO) من خلال ضمان رؤية محركات البحث للمحتوى المترجم.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// تكوين تحميل الموارد الديناميكي لـ i18next
// تقوم هذه الدالة باستيراد ملفات الترجمة بصيغة JSON بشكل ديناميكي بناءً على اللغة والمساحة الاسمية
// مثال: locale="fr"، namespace="about" -> يستورد "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * تهيئة نسخة i18next للعرض على جانب الخادم
 *
 * @returns نسخة i18next مهيأة وجاهزة للاستخدام على جانب الخادم
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // إنشاء نسخة جديدة من i18next (مستقلة عن نسخة جانب العميل)
  const i18n = createInstance();

  // التهيئة مع تكامل React وموفر الخلفية
  await i18n
    .use(initReactI18next) // تمكين دعم React hooks
    .use(backend) // تمكين تحميل الموارد الديناميكي
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // تحميل مساحات الأسماء المحددة فقط لتحسين الأداء
      defaultNS: "common", // مساحة الاسم الافتراضية عند عدم التحديد
      interpolation: { escapeValue: false }, // عدم الهروب من HTML (React يتولى حماية XSS)
      react: { useSuspense: false }, // تعطيل Suspense لتوافق SSR
      returnNull: false, // إرجاع سلسلة فارغة بدلاً من null للمفاتيح المفقودة
      initImmediate: false, // تأجيل التهيئة حتى يتم تحميل الموارد (تسريع SSR)
    });
  return i18n;
}
```

### الخطوة 6: إنشاء مزود i18n على جانب العميل

قم بإنشاء مزود مكون للعميل يلف تطبيقك بسياق i18next. يستقبل هذا المزود الترجمات المحملة مسبقًا من الخادم لمنع وميض المحتوى غير المترجم (FOUC) وتجنب جلب البيانات المكرر.

تحتاج مكونات العميل إلى نسخة i18next خاصة بها تعمل في المتصفح. من خلال قبول الموارد المحملة مسبقًا من الخادم، نضمن تهيئة سلسة ونمنع وميض المحتوى. كما يدير المزود تغييرات اللغة وتحميل المساحات الاسمية بشكل ديناميكي.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// تكوين تحميل الموارد الديناميكي للعميل
// نفس النمط كما في جانب الخادم، لكن هذه النسخة تعمل في المتصفح
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // الموارد المحملة مسبقًا من الخادم (تمنع وميض المحتوى غير المترجم - FOUC)
  // التنسيق: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * مزود i18n على جانب العميل يلف التطبيق بسياق i18next
 * يستقبل الموارد المحملة مسبقًا من الخادم لتجنب إعادة جلب الترجمات
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // إنشاء مثيل i18n مرة واحدة باستخدام المُهيئ الكسول useState
  // هذا يضمن إنشاء المثيل مرة واحدة فقط، وليس في كل عملية إعادة عرض
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // إذا تم توفير الموارد (من الخادم)، استخدمها لتجنب جلب الترجمات من جانب العميل
        // هذا يمنع ظهور محتوى غير منسق مؤقتًا (FOUC) ويحسن أداء التحميل الأولي
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // منع إرجاع قيم غير معرفة
      });

    return i18nInstance;
  });

  // تحديث اللغة عند تغيير خاصية locale
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // التأكد من تحميل جميع المساحات الاسمية المطلوبة على جانب العميل
  // استخدام join("|") كاعتماد لمقارنة المصفوفات بشكل صحيح
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // توفير نسخة i18n لجميع المكونات الفرعية عبر سياق React
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### الخطوة 7: تعريف مسارات اللغات الديناميكية

قم بإعداد التوجيه الديناميكي للغات عن طريق إنشاء مجلد `[locale]` في مجلد التطبيق الخاص بك. هذا يسمح لـ Next.js بالتعامل مع التوجيه بناءً على اللغة حيث تصبح كل لغة جزءًا من عنوان URL (مثل `/en/about`، `/fr/about`).

استخدام المسارات الديناميكية يمكّن Next.js من إنشاء صفحات ثابتة لجميع اللغات أثناء وقت البناء، مما يحسن الأداء وتحسين محركات البحث (SEO). يقوم مكون التخطيط بتعيين سمات HTML `lang` و `dir` بناءً على اللغة، وهو أمر حيوي للوصولية وفهم محركات البحث.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// تعطيل المعاملات الديناميكية - يجب معرفة جميع اللغات في وقت البناء
// هذا يضمن التوليد الثابت لجميع مسارات اللغات
export const dynamicParams = false;

/**
 * توليد المعاملات الثابتة لجميع اللغات في وقت البناء
 * سيقوم Next.js بعمل عرض مسبق للصفحات لكل لغة يتم إرجاعها هنا
 * مثال: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * مكون التخطيط الجذري الذي يتعامل مع سمات HTML الخاصة باللغة
 * يضبط سمة lang واتجاه النص (ltr/rtl) بناءً على اللغة
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // التحقق من صحة اللغة من معلمات URL
  // إذا تم توفير لغة غير صالحة، يتم الرجوع إلى اللغة الافتراضية
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // تحديد اتجاه النص بناءً على اللغة
  // اللغات التي تُكتب من اليمين إلى اليسار مثل العربية تحتاج إلى dir="rtl" لعرض النص بشكل صحيح
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### الخطوة 8: إنشاء ملفات الترجمة الخاصة بك

قم بإنشاء ملفات JSON لكل لغة ومساحة أسماء. تتيح لك هذه البنية تنظيم الترجمات بشكل منطقي وتحميل ما تحتاجه فقط لكل صفحة.

تنظيم الترجمات حسب مساحة الاسم (مثل `common.json`، `about.json`) يتيح تقسيم الكود ويقلل من حجم الحزمة. تقوم بتحميل الترجمات اللازمة فقط لكل صفحة، مما يحسن الأداء.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/ar/home.json"
{
  "title": "الرئيسية",
  "description": "وصف صفحة الرئيسية",
  "welcome": "مرحبًا",
  "greeting": "مرحبًا بالعالم!",
  "aboutPage": "صفحة حول",
  "documentation": "التوثيق"
}
```

```json fileName="src/locales/ar/about.json"
{
  "title": "حول",
  "description": "وصف صفحة حول",
  "counter": {
    "label": "عداد",
    "increment": "زيادة",
    "description": "انقر على الزر لزيادة العداد"
  }
}
```

### الخطوة 9: استخدام الترجمات في صفحاتك

قم بإنشاء مكون صفحة يقوم بتهيئة i18next على الخادم ويمرر الترجمات إلى مكونات الخادم والعميل على حد سواء. هذا يضمن تحميل الترجمات قبل العرض ويمنع وميض المحتوى.

تهيئة جانب الخادم تقوم بتحميل الترجمات قبل عرض الصفحة، مما يحسن SEO ويمنع ظهور محتوى غير منسق (FOUC). من خلال تمرير الموارد المحملة مسبقًا إلى مزود العميل، نتجنب جلب البيانات المكرر ونضمن تهيئة سلسة.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * صفحة مكونة على الخادم تتعامل مع تهيئة i18n
 * تقوم بتحميل الترجمات مسبقًا على الخادم وتمريرها إلى مكونات العميل
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // تحديد مساحات الأسماء الخاصة بالترجمة التي تحتاجها هذه الصفحة
  // إعادة استخدام القائمة المركزية لضمان سلامة النوع والإكمال التلقائي
  const pageNamespaces = allNamespaces;

  // تهيئة i18next على الخادم مع مساحات الأسماء المطلوبة
  // هذا يقوم بتحميل ملفات JSON الخاصة بالترجمة على جانب الخادم
  const i18n = await initI18next(locale, pageNamespaces);

  // الحصول على دالة ترجمة ثابتة لمساحة الأسماء "about"
  // تقوم getFixedT بقفل مساحة الأسماء، لذا يمكن استخدام t("title") بدلاً من t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // استخراج حزم الترجمة من كائن i18n
  // يتم تمرير هذه البيانات إلى I18nProvider لتهيئة الترجمة على جانب العميل
  // يمنع ظهور المحتوى غير المترجم مؤقتًا (FOUC) ويتجنب التحميل المكرر
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### الخطوة 10: استخدام الترجمات في مكونات العميل

يمكن لمكونات العميل استخدام الخطاف `useTranslation` للوصول إلى الترجمات. يوفر هذا الخطاف الوصول إلى دالة الترجمة ومثيل i18n، مما يتيح لك ترجمة المحتوى والوصول إلى معلومات اللغة.

تحتاج مكونات العميل إلى خطافات React للوصول إلى الترجمات. يتكامل الخطاف `useTranslation` بسلاسة مع i18next ويوفر تحديثات تفاعلية عند تغيير اللغة.

> تأكد من أن الصفحة/المزود تتضمن فقط المساحات الاسمية التي تحتاجها (مثل `about`).  
> إذا كنت تستخدم React أقل من الإصدار 19، قم بتخزين مؤقت للمهيئات الثقيلة مثل `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * مثال على مكون عميل يستخدم React hooks للترجمات
 * يمكنه استخدام hooks مثل useState و useEffect و useTranslation
 */
const ClientComponent = () => {
  // يوفر hook useTranslation الوصول إلى دالة الترجمة ونسخة i18n
  // تحديد مساحة الاسم لتحميل الترجمات الخاصة بمساحة الاسم "about" فقط
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // إنشاء منسق أرقام يتوافق مع اللغة المحلية
  // i18n.language يوفر اللغة الحالية (مثل "en"، "fr")
  // Intl.NumberFormat يقوم بتنسيق الأرقام وفقًا لاتفاقيات اللغة المحلية
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* تنسيق الرقم باستخدام تنسيق خاص بالمنطقة */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### الخطوة 11: استخدام الترجمات في مكونات الخادم

لا يمكن لمكونات الخادم استخدام React hooks، لذلك تستقبل الترجمات عبر props من مكونات الوالد الخاصة بها. هذه الطريقة تحافظ على تزامن مكونات الخادم وتسمح بتضمينها داخل مكونات العميل.

يجب أن تكون مكونات الخادم التي قد تكون متداخلة تحت حدود العميل متزامنة. من خلال تمرير السلاسل المترجمة ومعلومات اللغة كلProps، نتجنب العمليات غير المتزامنة ونضمن العرض الصحيح.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // دالة الترجمة التي يتم تمريرها من مكون الخادم الأب
  // لا يمكن لمكونات الخادم استخدام hooks، لذا تأتي الترجمات عبر props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * مثال على مكون خادم - يستقبل الترجمات عبر الخصائص (props)
 * يمكن تضمينه داخل مكونات العميل (مكونات خادم غير متزامنة)
 * لا يمكنه استخدام React hooks، لذا يجب أن تأتي كل البيانات من الخصائص أو العمليات غير المتزامنة
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // تنسيق الرقم على جانب الخادم باستخدام locale
  // يتم تشغيل هذا على الخادم أثناء SSR، مما يحسن تحميل الصفحة الأولي
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* استخدام دالة الترجمة الممررة كخاصية */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (اختياري) الخطوة 12: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك في Next.js، الطريقة الموصى بها هي استخدام عناوين URL التي تحتوي على بادئة locale وروابط Next.js. المثال أدناه يقرأ locale الحالي من المسار، ويزيله من اسم المسار، ويعرض رابطًا واحدًا لكل locale متاح.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="محدد اللغة">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "الصفحة الحالية" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (اختياري) الخطوة 13: بناء مكون رابط محلي

إعادة استخدام عناوين URL المحلية عبر تطبيقك يحافظ على اتساق التنقل وصديق لمحركات البحث (SEO). قم بتغليف `next/link` في مساعد صغير يضيف بادئة للمسارات الداخلية باستخدام اللغة النشطة مع ترك عناوين URL الخارجية بدون تغيير.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> نصيحة: نظرًا لأن `LocalizedLink` هو بديل جاهز، قم بالترحيل تدريجيًا عن طريق تبديل الاستيرادات وترك المكون يتعامل مع عناوين URL الخاصة باللغات.

### (اختياري) الخطوة 14: الوصول إلى اللغة النشطة داخل Server Actions

غالبًا ما تحتاج Server Actions إلى اللغة الحالية للبريد الإلكتروني أو التسجيل أو التكامل مع أطراف ثالثة. قم بدمج ملف تعريف الارتباط الخاص باللغة الذي يحدده البروكسي الخاص بك مع رأس `Accept-Language` كخيار احتياطي.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// مثال على إجراء خادم يستخدم اللغة الحالية
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // استخدام اللغة للتأثيرات الجانبية المحلية (البريد الإلكتروني، إدارة علاقات العملاء، إلخ)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> نظرًا لأن المساعد يعتمد على ملفات تعريف الارتباط (cookies) ورؤوس (headers) Next.js، فإنه يعمل في معالجات المسارات (Route Handlers)، والإجراءات الخادمة (Server Actions)، وسياقات الخادم فقط الأخرى.

### (اختياري) الخطوة 15: تدويل بيانات التعريف الخاصة بك

ترجمة المحتوى أمر مهم، لكن الهدف الرئيسي من التدويل هو جعل موقعك الإلكتروني أكثر ظهورًا للعالم. التدويل (I18n) هو رافعة مذهلة لتحسين ظهور موقعك الإلكتروني من خلال تحسين محركات البحث (SEO) بشكل صحيح.

تساعد بيانات التعريف الدولية بشكل صحيح محركات البحث على فهم اللغات المتاحة في صفحاتك. وهذا يشمل تعيين علامات hreflang في بيانات التعريف، وترجمة العناوين والوصفات، وضمان تعيين عناوين URL القانونية (canonical URLs) بشكل صحيح لكل لغة.

إليك قائمة بالممارسات الجيدة المتعلقة بتحسين محركات البحث متعددة اللغات:

- تعيين علامات hreflang في وسم `<head>` لمساعدة محركات البحث على فهم اللغات المتاحة في الصفحة
- سرد جميع ترجمات الصفحة في ملف sitemap.xml باستخدام مخطط XML الخاص بـ `http://www.w3.org/1999/xhtml`
- لا تنسَ استبعاد الصفحات ذات البادئات من ملف robots.txt (مثلًا: `/dashboard`، `/fr/dashboard`، `/es/dashboard`)
- استخدم مكون Link مخصص لإعادة التوجيه إلى الصفحة الأكثر تخصيصًا للغة (مثلًا، بالفرنسية `<a href="/fr/about">À propos</a>`)

غالبًا ما ينسى المطورون الإشارة بشكل صحيح إلى صفحاتهم عبر اللغات المختلفة. دعونا نصحح ذلك:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * توليد بيانات SEO الوصفية لكل نسخة لغة من الصفحة
 * تعمل هذه الدالة لكل لغة أثناء وقت البناء
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // استيراد ملف الترجمة ديناميكيًا لهذه اللغة
  // يستخدم للحصول على العنوان والوصف المترجمين للبيانات الوصفية
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // إنشاء خريطة hreflang لجميع اللغات
  // يساعد محركات البحث على فهم البدائل اللغوية
  // التنسيق: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // عنوان URL القانوني لهذا الإصدار من اللغة
      canonical: absoluteUrl(locale, "/about"),
      // بدائل اللغة لتحسين محركات البحث (علامات hreflang)
      // "x-default" يحدد النسخة الافتراضية للغة
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>حول</h1>;
}
```

### (اختياري) الخطوة 16: تعريب خريطة الموقع الخاصة بك

قم بإنشاء خريطة موقع تتضمن جميع إصدارات اللغات لصفحاتك. هذا يساعد محركات البحث على اكتشاف وفهرسة جميع إصدارات اللغات لمحتواك.

تضمن خريطة الموقع المعربة بشكل صحيح أن محركات البحث يمكنها العثور على جميع إصدارات اللغات لصفحاتك وفهرستها. هذا يحسن من ظهورك في نتائج البحث الدولية.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * الحصول على خريطة لجميع اللغات ومساراتها المحلية
 *
 * مثال على الناتج:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// إنشاء خريطة الموقع مع جميع المتغيرات اللغوية لتحسين SEO
// حقل alternates يخبر محركات البحث عن نسخ اللغة المختلفة
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (اختياري) الخطوة 17: تعريب ملف robots.txt الخاص بك

قم بإنشاء ملف robots.txt يتعامل بشكل صحيح مع جميع إصدارات اللغات لمساراتك المحمية. هذا يضمن أن محركات البحث لا تقوم بفهرسة صفحات المسؤول أو لوحة التحكم بأي لغة.

تكوين ملف robots.txt بشكل صحيح لجميع اللغات يمنع محركات البحث من فهرسة الصفحات الحساسة بأي لغة. هذا أمر بالغ الأهمية للأمان والخصوصية.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// إنشاء مسارات لجميع اللغات (مثلاً /admin، /fr/admin، /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (اختياري) الخطوة 18: إعداد Middleware لتوجيه اللغة

قم بإنشاء وكيل (proxy) لاكتشاف اللغة المفضلة للمستخدم تلقائيًا وإعادة توجيهه إلى عنوان URL مع بادئة اللغة المناسبة. هذا يحسن تجربة المستخدم من خلال عرض المحتوى بلغته المفضلة.

يضمن الـ Middleware إعادة توجيه المستخدمين تلقائيًا إلى لغتهم المفضلة عند زيارة موقعك. كما يحفظ تفضيل المستخدم في ملف تعريف ارتباط (cookie) للزيارات المستقبلية.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// تعبير نمطي لمطابقة الملفات التي تحتوي على امتدادات (مثل .js، .css، .png)
// يستخدم لاستبعاد الأصول الثابتة من توجيه اللغة
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * استخراج اللغة من رأس Accept-Language
 * يتعامل مع صيغ مثل "fr-CA"، "en-US"، إلخ.
 * يرجع إلى اللغة الافتراضية إذا لم تكن لغة المتصفح مدعومة
 */
const pickLocale = (accept: string | null) => {
  // الحصول على تفضيل اللغة الأول (مثل "fr-CA" من "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // استخراج رمز اللغة الأساسي (مثل "fr" من "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // التحقق مما إذا كنا ندعم هذه اللغة، وإلا استخدام الافتراضية
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * وكيل Next.js لاكتشاف اللغة والتوجيه
 * يعمل عند كل طلب قبل عرض الصفحة
 * يعيد التوجيه تلقائيًا إلى عناوين URL مع بادئة اللغة عند الحاجة
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // تخطي الوكيل للملفات الداخلية في Next.js، ومسارات API، والملفات الثابتة
  // يجب ألا تكون هذه الملفات مسبوقة ببادئة اللغة
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // التحقق مما إذا كان عنوان URL يحتوي بالفعل على بادئة لغة
  // مثال: "/fr/about" أو "/en" ستُرجع true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // إذا لم يكن هناك بادئة لغة، اكتشف اللغة وأعد التوجيه
  if (!hasLocale) {
    // حاول الحصول على اللغة من الكوكيز أولاً (تفضيل المستخدم)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // استخدم لغة الكوكيز إذا كانت صالحة، وإلا اكتشفها من رؤوس المتصفح
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // استنساخ URL لتعديل مسار الصفحة
    const url = request.nextUrl.clone();
    // أضف بادئة اللغة إلى مسار الصفحة
    // تعامل مع المسار الجذري بشكل خاص لتجنب وجود شرطتين مائلتين متتاليتين
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // إنشاء استجابة إعادة التوجيه وتعيين ملف تعريف الارتباط للغة
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // تطابق جميع المسارات باستثناء:
    // - مسارات API (/api/*)
    // - ملفات Next.js الداخلية (/_next/*)
    // - الملفات الثابتة (/static/*)
    // - الملفات التي تحتوي على امتدادات (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (اختياري) الخطوة 19: أتمتة ترجماتك باستخدام Intlayer

Intlayer هي مكتبة **مجانية** و**مفتوحة المصدر** مصممة لمساعدتك في عملية التوطين في تطبيقك. بينما يتولى i18next تحميل الترجمات وإدارتها، يساعد Intlayer في أتمتة سير عمل الترجمة.

إدارة الترجمات يدويًا يمكن أن تكون مستهلكة للوقت وعرضة للأخطاء. يقوم Intlayer بأتمتة اختبار الترجمات، وإنشائها، وإدارتها، مما يوفر عليك الوقت ويضمن الاتساق عبر تطبيقك.

يسمح لك Intlayer بـ:

- **إعلان المحتوى الخاص بك في أي مكان تريده في قاعدة الكود الخاصة بك**
  يتيح Intlayer إعلان المحتوى الخاص بك في أي مكان تريده في قاعدة الكود باستخدام ملفات `.content.{ts|js|json}`. هذا سيسمح بتنظيم أفضل لمحتواك، مما يضمن قابلية قراءة وصيانة أفضل لقاعدة الكود الخاصة بك.

- **اختبار الترجمات المفقودة**
  يوفر Intlayer دوال اختبار يمكن دمجها في خط أنابيب CI/CD الخاص بك، أو في اختبارات الوحدة الخاصة بك. تعرّف على المزيد حول [اختبار الترجمات الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md).

- **أتمتة ترجماتك**،  
  يوفر Intlayer واجهة سطر أوامر (CLI) وامتداد VSCode لأتمتة ترجماتك. يمكن دمجه في خط أنابيب CI/CD الخاص بك. تعرّف على المزيد حول [أتمتة ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).  
  يمكنك استخدام **مفتاح API الخاص بك، ومزود الذكاء الاصطناعي الذي تختاره**. كما يوفر ترجمات واعية للسياق، راجع [ملء المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md).

- **ربط المحتوى الخارجي**
- **قم بأتمتة ترجماتك**،  
  يوفر Intlayer أداة CLI وامتداد VSCode لأتمتة ترجماتك. يمكن دمجه في خط أنابيب CI/CD الخاص بك. تعرّف على المزيد حول [أتمتة ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).  
  يمكنك استخدام **مفتاح API الخاص بك، ومزود الذكاء الاصطناعي الذي تختاره**. كما يوفر ترجمات واعية للسياق، راجع [ملء المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md).

- **ربط المحتوى الخارجي**  
  يتيح لك Intlayer ربط محتواك بنظام إدارة محتوى خارجي (CMS). لجلبه بطريقة محسّنة وإدراجه في موارد JSON الخاصة بك. تعرّف على المزيد حول [جلب المحتوى الخارجي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/function_fetching.md).

- **المحرر المرئي**  
  يقدم Intlayer محررًا مرئيًا مجانيًا لتحرير محتواك باستخدام محرر مرئي. تعرّف على المزيد حول [التحرير المرئي لترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

والمزيد. لاكتشاف جميع الميزات التي يوفرها Intlayer، يرجى الرجوع إلى [أهمية توثيق Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).
