---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "تدويل TanStack Start مع Lingui: دليل الإعداد الكامل لعام 2026"
description: "ترجم تطبيق TanStack Start الخاص بك باستخدام Lingui: وحدات الماكرو، كتالوجات PO، العرض من جانب الخادم (SSR)، توجيه اللغات، hreflang، ملف sitemap و robots.txt، بالإضافة إلى بيانات مقارنة أداء حجم الحزمة الحقيقية."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - التدويل
  - i18n
  - SEO
  - ملفات PO
  - React
  - مدونة
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "النسخة الأولية"
author: aymericzip
---

# كيفية تدويل تطبيق TanStack Start الخاص بك باستخدام Lingui في عام 2026

## جدول المحتويات

<TOC/>

## ما هو Lingui؟

**Lingui** هي مكتبة تدويل (i18n) مصممة حول **وحدات الماكرو (macros)** و**استخراج الرسائل (message extraction)**. تكتب النص المصدر مباشرة داخل مكوناتك (`` t`Hello` ``، `<Trans>Hello</Trans>`)، ويقوم أمر `lingui extract` بجمع كل رسالة في كتالوجات (ملفات PO افتراضياً)، ويقوم المترجمون بملئها، ثم يترجمها مكون Vite الإضافي إلى كود JavaScript مدمج ومضغوط. تستخدم الرسائل تنسيق ICU MessageFormat، لذا فإن صيغ الجمع والاختيارات مدعومة بالكامل.

لا يأتي TanStack Start مع طبقة تدويل مدمجة، لذلك يربط هذا الدليل Lingui به من البداية:

- **وحدات ماكرو مجمعة بواسطة Babel** من خلال `@rolldown/plugin-babel` (مطلوب مع `@vitejs/plugin-react` v6 و Vite 8).
- **توجيه اللغات** مع مقطع اختياري `{-$locale}` (مثل `/about`، `/fr/about`).
- **كتالوج واحد لكل لغة، يتم تحميله عند الطلب**، ونسخة `I18n` خاصة بكل عملية تصيير حتى لا تتشارك طلبات SSR المتزامنة في نفس اللغة مطلقاً.
- **تحسين محركات البحث متعدد اللغات بشكل كامل (SEO)**: وسم `<title>` ووصف مترجم، عنوان URL أساسي (canonical URL)، وسوم `hreflang` مع `x-default`، لغات Open Graph، بيانات JSON-LD، خريطة الموقع (sitemap)، ملف `robots.txt`، التصيير المسبق (pre-rendering) وصفحات 404 مخصصة لكل لغة.

> هل تبحث عن حزمة تقنية أخرى؟ راجع [دليل TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_use-intl.md)، أو [دليل TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_paraglide.md)، أو [دليل TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md).

> هل تستخدم Next.js؟ راجع [دليل Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_nextjs_lingui.md). هل تقارن بين المكتبات؟ اقرأ [Lingui مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/lingui_vs_intlayer.md).

## ماذا يقول اختبار الأداء المقارن عن Lingui على TanStack Start

يقوم [اختبار الأداء المقارن للتدويل (i18n benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md) بتشغيل نفس تطبيق TanStack Start المكون من 10 صفحات و 10 لغات مع كل مكتبة رئيسية ويقيس ما يقوم المتصفح بتنزيله بالفعل.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

الأرقام الرئيسية لحزمة `@lingui/core@6.6.0`، المقاسة بتاريخ 2026-09-26 (gzip):

| الإعداد                            | حجم المكتبة | حجم JS لكل صفحة | تسريب اللغات الأخرى | تسريب الصفحات الأخرى |
| :--------------------------------- | ----------: | --------------: | ------------------: | -------------------: |
| بدون تدويل (التطبيق الأساسي)       |           - |        111.0 KB |                  0% |                   0% |
| Lingui (إعداد هذا الدليل)          |     56.7 KB |        115.2 KB |                9.3% |                   0% |
| `@intlayer/lingui` (التوافق)       |      9.8 KB |        136.7 KB |                9.9% |                   0% |
| `react-intlayer` (Intlayer الأصلي) |      4.5 KB |        126.8 KB |                  0% |                   0% |

النقاط الأساسية المستفادة:

- **قم بتحميل كتالوج واحد لكل لغة، عند الطلب.** يحافظ ذلك على حجم الصفحات قريباً من حجم التطبيق الأساسي.
- **وقت التشغيل يظل كبيراً وثقيلاً** (~57 كيلوبايت gzip). محول التوافق `@intlayer/lingui` (الخطوة 16) يحتفظ بوحدات الماكرو الخاصة بك ويقلل حجمه إلى ~10 كيلوبايت.

> اطلع على البيانات الكاملة: [تقرير اختبار أداء TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)، و[مستودع اختبار الأداء](https://github.com/intlayer-org/benchmark-i18n).

## مقارنة الميزات على TanStack Start

كيف يقارن Lingui بالمكتبات الأخرى شائعة الاستخدام في TanStack Start:

| الميزة                                      | `react-intlayer` (Intlayer)              | `use-intl`                        | Paraglide JS                          | Lingui                       |
| ------------------------------------------- | ---------------------------------------- | --------------------------------- | ------------------------------------- | ---------------------------- |
| **الترجمات بجانب المكونات**                 | ✅ في نفس الموضع (Co-located)            | ❌ ملف JSON مركزي                 | ❌ ملف JSON واحد لكل لغة              | ⚠️ النص المصدر داخل المكونات |
| **التكامل مع TypeScript**                   | ✅ أنواع منشأة تلقائياً                  | ✅ عبر `AppConfig`                | ✅ دوال رسائل محددة النوع             | ⚠️ وحدات ماكرو فقط           |
| **اكتشاف الترجمات المفقودة**                | ✅ أخطاء أثناء فحص الأنواع وتحذيرات بناء | ⚠️ استرجاع احتياطي في وقت التشغيل | ⚠️ الرجوع إلى اللغة الأساسية          | ⚠️ الرجوع إلى النص المصدر    |
| **المحتوى الغني (JSX, Markdown)**           | ✅ دعم مباشر                             | ⚠️ وسوم عبر `t.rich`              | ⚠️ نصوص فقط                           | ✅ JSX داخل `<Trans>`        |
| **التوجيه المترجم للغات**                   | ✅ مدمج                                  | ❌ يدوي عبر `{-$locale}`          | ✅ `urlPatterns` + إعادة كتابة الموجه | ❌ يدوي عبر `{-$locale}`     |
| **تبديل اللغة بدون إعادة تحميل**            | ✅ نعم                                   | ✅ نعم                            | ❌ إعادة تحميل الصفحة بالكامل         | ✅ نعم                       |
| **صيغ الجمع (Pluralization)**               | ✅ معتمد على التعداد                     | ✅ ICU                            | ✅ متغيرات (Variants)                 | ✅ ICU                       |
| **ICU MessageFormat**                       | ✅ عبر `format: "icu"`                   | ✅ أصلي                           | ⚠️ عبر إضافة inlang                   | ✅ أصلي                      |
| **تنسيقات المحتوى**                         | ✅ `.ts`, `.json`, `.md`, `.yaml`...     | ⚠️ `.json`                        | ⚠️ inlang JSON                        | ✅ PO, JSON, CSV             |
| **الترجمة بالذكاء الاصطناعي**               | ✅ المزود والمفتاح الخاص بك              | ❌ لا                             | ❌ لا                                 | ❌ لا                        |
| **المحرر المرئي / CMS**                     | ✅ محرر محلي + CMS اختياري               | ❌ منصات خارجية                   | ⚠️ تطبيقات منظومة inlang              | ❌ منصات خارجية              |
| **أدوات مساعدة لـ SEO (hreflang, sitemap)** | ✅ مدمج                                  | ❌ يدوي                           | ⚠️ عناوين URL مترجمة، والباقي يدوي    | ❌ يدوي                      |
| **حجم وقت التشغيل (gzip, benchmark)**       | 4.5 KB                                   | 75.9 KB                           | 1.8 KB                                | 56.7 KB                      |
| **التسريب، أفضل إعداد (لغة / صفحة)**        | 0% / 0%                                  | 0% / 0%                           | 49.7% / 0%                            | 8.6% / 0%                    |
| **الترجمات المفقودة في CI**                 | ✅ `npx intlayer test`                   | ⚠️ غير مدمج                       | ⚠️ غير مدمج                           | ✅ `lingui compile --strict` |

> أرقام حجم وقت التشغيل ونسبة التسريب مأخوذة من [اختبار أداء TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md). يتم قياس التسريب بناءً على أفضل إعداد لكل مكتبة.

> أدلة أخرى لـ TanStack Start: [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_use-intl.md)، و[Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_paraglide.md)، و[Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md).

## ممارسات يجب عليك اتباعها

- **قم بضبط `lang` و `dir` في وسم `<html>`** من لغة المسار، بحيث تكون صحيحة في كود HTML المُنشأ على الخادم.
- **احتفظ بعنوان URL واحد لكل لغة** باستخدام بادئة، بحيث تكون كل نسخة لغوية قابلة للفهرسة.
- **أنشئ نسخة `I18n` واحدة لكل لغة**، ولا تقم أبداً بتعديل نسخة عامة مشتركة أثناء SSR: حيث يمكن لطلبين متزامنين الكتابة فوق لغة بعضهما البعض.
- **قم بتحميل الكتالوج النشط فقط**، ولا تستورد جميع الكتالوجات دفعة واحدة في كود العميل.
- **اختر أسلوب ماكرو واحداً** (`useLingui` + `t` في المكونات، و `msg` للواصفات الكسولة) والتزم به. خلط `t` و `i18n._` و `i18n.t` و `<Trans>` يجعل الكود أكثر صعوبة في القراءة للمطورين ومساعدي الذكاء الاصطناعي.
- **قم بتشغيل `lingui extract` في CI** حتى لا يتم شحن رسالة جديدة أبداً دون ترجمة.
- **ترجم بياناتك الوصفية (Metadata)**، وأعلن عن `canonical` و `hreflang` و `x-default` في كل صفحة.
- **أنشئ ملف sitemap و robots.txt متعددي اللغات**، وقم بالتصيير المسبق لكل لغة.
- **استخدم روابط حقيقية لمبدل اللغات**، حتى تتمكن برامج الزحف من اكتشاف كل لغة.

> راجع دليلنا حول [التدويل وتحسين محركات البحث (SEO)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md) و[دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md).

## دليل خطوة بخطوة لإعداد Lingui في تطبيق TanStack Start

إليك هيكل المشروع الذي سنقوم بإنشائه:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # يتم إنشاؤه بواسطة `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # الوسيط للطلبات (إعادة توجيه اللغة)
    ├── i18n
    │   ├── config.ts           # اللغات، دوال مساعدة للعناوين
    │   ├── lingui.ts           # محمل الكتالوجات، نسخ I18n
    │   ├── negotiateLocale.ts  # تحليل ترويسة Accept-Language
    │   └── seo.ts              # منشئ head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # تخطيط اللغة + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # صفحة 404 مترجمة
```

<Steps>
<Step number={1} title="تثبيت التبعيات">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: وقت التشغيل، `I18nProvider` ووحدات الماكرو (`@lingui/core/macro`، `@lingui/react/macro`).
- **@lingui/cli**: أمر `lingui extract` لجمع الرسائل في كتالوجات.
- **@lingui/vite-plugin**: يقوم بتجميع كتالوجات `.po` عند الاستيراد، لذلك لا يلزم تشغيل `lingui compile`.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: لتحويل وحدات الماكرو في وقت البناء.

</Step>
<Step number={2} title="مركزية إعدادات اللغات">

تظل اللغة الافتراضية بدون بادئة (`/about`)، بينما تحصل اللغات الأخرى على بادئة (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="تكوين Lingui">

يعيد تكوين Lingui استخدام نفس قائمة اللغات، بحيث لا يحدث أي تعارض بين الكتالوجات والموجه وخريطة الموقع.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

أضف نصوص الاستخراج البرمجية (extraction scripts):

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

يفشل أمر `i18n:check` في CI إذا كان أحد المكونات يحتوي على رسالة لم يتم استخراجها وتضمينها في الـ commit.

</Step>
<Step number={4} title="تكوين Vite">

مع `@vitejs/plugin-react` v6، لم يعد Babel مدمجاً بشكل افتراضي. يقوم `@rolldown/plugin-babel` بتشغيل إضافة ماكرو Lingui، وتعالج `linguiTransformerBabelPreset` فقط الملفات التي تستورد وحدات ماكرو، مما يحافظ على سرعة عمليات البناء.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="تحميل الكتالوجات لكل لغة">

تتيح السلسلة النصية القالبية (template literal) داخل `import()` لـ Vite إنشاء **مقطع برمجي (chunk) منفصل لكل كتالوج**، وتقوم إضافة Lingui بتجميع ملف `.po` بداخله. يقوم الزائر باللغة الفرنسية بتنزيل الكتالوج الفرنسي فقط.

الرسائل المجمعة هي بيانات عادية، لذا يمكن إرجاعها بواسطة محمل المسار (route loader)، وتسلسلها داخل كود HTML، وإعادة استخدامها عند الترطيب (hydration).

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

لكي يقبل TypeScript استيراد ملفات `.po`، أعلن عن الوحدة مرة واحدة:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="إنشاء المستند الجذري (Root Document)">

يقرأ المسار الجذري معلمة اللغة الاختيارية لضبط `lang` و `dir` على وسم `<html>` المُصيّر على الخادم.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="إنشاء مسار تخطيط اللغة (Locale Layout Route)">

يُنشئ المجلد `{-$locale}` مقطع مسار اختياري: يتطابق كل من `/about` و `/fr/about` مع `/{-$locale}/about`. يرفض التخطيط البادئات غير المعروفة، ويحمل كتالوج اللغة الحالية، ويوفر نسخة `I18n` مخصصة.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="استخدام الترجمات في صفحاتك">

اكتب النص المصدر داخل المكون. تحوله وحدات الماكرو إلى معرّفات رسائل في وقت البناء، ويلتقطه أمر `lingui extract`.

- `<Trans>` لمحتوى JSX، بما في ذلك العناصر المتداخلة؛
- `useLingui().t` للنصوص العادية (الخصائص والسمات)؛
- `<Plural>` لصيغ الجمع بتنسيق ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> يتم تخزين الاستيراد الديناميكي `import()` للكتالوج مؤقتاً بواسطة نظام الوحدات، لذلك فإن استدعاء `loadI18n` في عدة محملات لا يعيد تنزيل الكتالوج مرتين.

</Step>
<Step number={9} title="استخراج وترجمة رسائلك">

قم بتشغيل عملية الاستخراج. يكتب Lingui كل رسالة في كتالوج كل لغة:

```bash
npm run i18n:extract
```

ثم قم بترجمة حقل `msgstr` لكل مدخل:

<Tabs group="locale">
 <Tab value='fr' label='الفرنسية'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='الإسبانية'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> افتراضياً، تكون معرّفات الرسائل عبارة عن تجزئة (hash) للنص المصدر: يؤدي تغيير النص الإنجليزي إلى إنشاء رسالة جديدة. استخدم معرّفات صريحة (`<Trans id="about.title">About us</Trans>`) للنصوص التي تتغير بشكل متكرر.

</Step>
<Step number={10} title="بناء مكون رابط مترجم (Localized Link)" isOptional={true}>

يعيش كل مسار تحت `{-$locale}`، لذلك يجب أن تحمل الروابط معلمة اللغة الحالية.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

قم بإنشاء مبدل اللغة كـ **روابط**، حتى تجد برامج الزحف جميع الإصدارات اللغوية. يُبقي `to="."` على الصفحة الحالية ويستبدل معلمة اللغة. يقوم محمل تخطيط اللغة بعد ذلك بجلب الكتالوج الجديد.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="تدويل بياناتك الوصفية (Metadata)" isOptional={true}>

يمكن لكل إصدار لغوي أن يتصدر نتائج البحث بشكل مستقل، شريطة أن تكشف كل صفحة عن وسم `<title>` ووصف مترجمين، ورابط أساسي يشير إلى نفسه (self-referencing canonical)، ورابط `hreflang` واحد لكل لغة بالإضافة إلى `x-default`، ولغات Open Graph، وبيانات JSON-LD مع `inLanguage`. تتم ترجمة البيانات الوصفية في المحمل (الخطوة 8)، وتبني هذه الدالة المساعدة بقية العناصر:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={13} title="تدويل خريطة الموقع (Sitemap) وملف robots.txt" isOptional={true}>

تسرد خريطة الموقع كل عنوان URL لكل لغة، ويعلن كل مدخل عن جميع بدائله باستخدام `xhtml:link`. يحظر ملف `robots.txt` المسارات الخاصة في كل لغة ويشير إلى خريطة الموقع. احذف `public/robots.txt` إذا كان قالب البداية قد أنشأ واحداً.

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={14} title="التصيير المسبق لكل لغة (Pre-render Every Locale)" isOptional={true}>

قم بإدراج كل مسار مترجم حتى يقوم TanStack Start بالتصيير المسبق لجميع الإصدارات اللغوية في وقت البناء:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="إعادة توجيه الزوار لأول مرة ومعالجة صفحات 404" isOptional={true}>

يقوم وسيط الطلبات (request middleware) بتوجيه الزائر الذي يدخل على `/` إلى لغته المفضلة (ملف تعريف الارتباط أولاً، ثم `Accept-Language`). لا تتم إعادة توجيه الروابط العميقة أبداً، بحيث تحصل برامج الزحف وعناوين URL المشتركة دائماً على الصفحة المطلوبة بدقة.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

بالنسبة لصفحات 404، يقوم مسار شامل (catch-all) بتصيير `notFoundComponent` المترجم الخاص بالتخطيط. ضع عليه علامة `noindex`: حيث يقوم React 19 برفع وسم `<meta>` تلقائياً إلى داخل `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="احتفظ بوحدات الماكرو الخاصة بك وخفف وقت التشغيل باستخدام Intlayer" isOptional={true}>

يحافظ محول التوافق [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md) على الكود المصدري دون أي تعديل: يتم تجميع وحدات الماكرو تماماً كما كانت من قبل، وتتم خدمة استدعاءات `i18n._()` و `useLingui()` و `<Trans>` الناتجة عن طريق قواميس Intlayer المجمعة. في اختبار الأداء، ينخفض وقت التشغيل من **~56.7 كيلوبايت إلى ~9.8 كيلوبايت** gzip.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

أضف الإضافة بعد تحويل الماكرو، بحيث يتم توجيه `@lingui/core` و `@lingui/react` بالاسم المستعار (alias) إلى المحول:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

تتم مزامنة الكتالوجات باستخدام [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) (كتالوجات JSON) أو [إضافة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) (كتالوجات PO). راجع الإعداد الكامل في [دليل توافق Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md)، والمقارنة المفصلة في [Lingui مقابل @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/lingui_vs_intlayer-lingui.md).

</Step>
<Step number={17} title="أتمتة ترجماتك باستخدام Intlayer" isOptional={true}>

يقوم Lingui باستخراج الرسائل، ولكن ملء عشرات الكتالوجات يدوياً هو ما يستهلك معظم الوقت. Intlayer **مجاني** و**مفتوح المصدر**، وتعمل أدواته جنباً إلى جنب مع Lingui:

- **الترجمة باستخدام الذكاء الاصطناعي** باستخدام مفتاح API والمزود الخاص بك. راجع [الملء التلقائي (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md) و[واجهة سطر الأوامر (CLI)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).
- **الاحتفاظ بملفات PO** كمصدر وحيد للحقيقة باستخدام [إضافة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md).
- **اختبار الترجمات المفقودة** في CI. راجع [اختبار ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md).
- **تدقيق موقعك المنشور** للتحقق من عدم وجود `hreflang` مفقود أو روابط أساسية غير صحيحة أو تسريب للغات باستخدام [أمر scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/scan.md).

</Step>
</Steps>

## الأسئلة الشائعة

<FAQ>

<Question title="هل يعمل Lingui مع TanStack Start؟">

نعم. لا يحتوي Lingui على تكامل مخصص لـ TanStack Start، ولكن إضافة Vite وإضافة ماكرو Babel تعملان كما هما. النقطتان الأساسيتان اللتان يجب ضبطهما هما تشغيل وحدات الماكرو عبر `@rolldown/plugin-babel` (لم يعد Vite 8 و `@vitejs/plugin-react` v6 يشتملان على Babel)، وإنشاء نسخة `I18n` منفصلة لكل لغة بدلاً من تفعيل نسخة عامة واحدة أثناء SSR.

</Question>
<Question title="لماذا لا نستخدم كائن i18n العام من @lingui/core؟">

على الخادم، تعالج عملية واحدة العديد من الطلبات في نفس الوقت. يؤدي استدعاء `i18n.activate("fr")` على كائن مشترك إلى تبديل لغة طلب آخر يتم تصييره باللغة الإنجليزية بالتوازي. ينشئ `setupI18n` نسخة معزولة لكل لغة، وهو أمر آمن ومضمون.

</Question>
<Question title="هل أحتاج إلى تشغيل lingui compile؟">

لا. تقوم إضافة `@lingui/vite-plugin` بتجميع كتالوجات `.po` تلقائياً عند استيرادها. تحتاج فقط إلى تشغيل `lingui extract` لجمع الرسائل الجديدة.

</Question>
<Question title="كيف أترجم عنوان الصفحة والوصف التعريفي (meta description) باستخدام Lingui؟">

أعلن عنها باستخدام ماكرو `msg`، وترجمها في محمل المسار (route loader) باستخدام ``i18n._(msg`...`)``. يُرجع المحمل نصوصاً عادية، بحيث تظل دالة `head()` متزامنة ويتم تسلسل القيم للترطيب. توضح الخطوة 8 والخطوة 12 الإعداد الكامل.

</Question>
<Question title="ما هو حجم Lingui في حزمة TanStack Start؟">

يقيس [اختبار الأداء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md) حوالي ~56.7 كيلوبايت gzip لوقت التشغيل. مع تحميل كتالوج واحد لكل لغة عند الطلب، تزن الصفحات حوالي ~115 كيلوبايت مقارنة بـ 111 كيلوبايت بدون تدويل. يؤدي استيراد جميع الكتالوجات بشكل ثابت إلى زيادة الحجم إلى حوالي ~152 كيلوبايت.

</Question>
<Question title="هل يمكنني الاحتفاظ بوحدات ماكرو Lingui والترحيل إلى Intlayer؟">

نعم. يحافظ محول [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md) على وحدات الماكرو ويستبدل وقت التشغيل فقط. يمكنك بعد ذلك نقل المكونات إلى `useIntlayer` واحداً تلو الآخر. راجع [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md).

</Question>

</FAQ>
