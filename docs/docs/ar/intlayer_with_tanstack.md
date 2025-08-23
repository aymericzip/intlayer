---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: البدء مع Intlayer في TanStack Start (React)
description: أضف التدويل (i18n) إلى تطبيق TanStack Start الخاص بك باستخدام Intlayer - قواميس على مستوى المكونات، عناوين URL محلية، وبيانات وصفية صديقة لمحركات البحث.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - جافا سكريبت
slugs:
  - doc
  - environment
  - tanstack-start
---

# البدء بالتدويل (i18n) مع Intlayer و TanStack Start (React)

## ما هو Intlayer؟

**Intlayer** هو مجموعة أدوات مفتوحة المصدر للتدويل (i18n) لتطبيقات React. يوفر لك:

- **قواميس محلية للمكونات** مع أمان TypeScript.
- **بيانات وصفية ومسارات ديناميكية** (جاهزة لتحسين محركات البحث).
- **تبديل اللغة أثناء التشغيل** (ومساعدات لاكتشاف/حفظ اللغة).
- **مكون إضافي لـ Vite** لتحويلات وقت البناء + تجربة تطوير محسنة.

يوضح هذا الدليل كيفية توصيل Intlayer بمشروع **TanStack Start** (الذي يستخدم Vite تحت الغطاء وTanStack Router للتوجيه/SSR).

---

## الخطوة 1: تثبيت التبعيات

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: النواة (الإعدادات، القواميس، CLI/التحويلات).
- **react-intlayer**: `<IntlayerProvider>` + هوكس لـ React.
- **vite-intlayer**: مكون Vite الإضافي، بالإضافة إلى وسيط اختياري لاكتشاف اللغة/إعادة التوجيه (يعمل في التطوير و SSR/المعاينة؛ انقل إلى `dependencies` لـ SSR في الإنتاج).

---

## الخطوة 2: تكوين Intlayer

قم بإنشاء ملف `intlayer.config.ts` في جذر مشروعك:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // يمكنك أيضًا تعديل: contentDir، contentFileExtensions، خيارات الوسيط، إلخ.
};

export default config;
```

تكون نسخ CommonJS/ESM متطابقة مع مستندك الأصلي إذا كنت تفضل `cjs`/`mjs`.

> المرجع الكامل للإعدادات: راجع وثائق تكوين Intlayer.

---

## الخطوة 3: إضافة مكون Vite الإضافي (والوسيط الاختياري)

**يستخدم TanStack Start Vite**، لذا أضف مكون(ات) Intlayer الإضافي إلى ملف `vite.config.ts` الخاص بك:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // اختياري ولكنه موصى به لاكتشاف اللغة، ملفات تعريف الارتباط وإعادة التوجيه:
    intLayerMiddlewarePlugin(),
  ],
});
```

> إذا قمت بنشر SSR، انقل `vite-intlayer` إلى `dependencies` حتى يعمل الوسيط في الإنتاج.

---

## الخطوة 4: إعلان المحتوى الخاص بك

ضع قواميسك في أي مكان تحت `./src` (المجلد الافتراضي `contentDir`). مثال:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ar: "شعار Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ar: "شعار React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),
    title: t({
      ar: "TanStack Start + React",
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({
      ar: "العدد هو ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t<ReactNode>({
      ar: (
        <>
          حرر <code>src/routes/index.tsx</code> واحفظ لاختبار HMR
        </>
      ),
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      ar: "انقر على الشعارات لمعرفة المزيد",
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS variants تعمل بنفس الطريقة كما في مستندك الأصلي.

> محتوى TSX؟ لا تنسَ `import React from "react"` إذا كانت إعداداتك تحتاج ذلك.

---

## الخطوة 5: لف TanStack Start باستخدام Intlayer

مع TanStack Start، فإن **المسار الجذري** هو المكان المناسب لتعيين المزودين.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // مثال على استخدام قاموس على المستوى الأعلى:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">الرئيسية</RouterLink>
        <RouterLink to="/about">حول</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

ثم استخدم المحتوى الخاص بك في الصفحات:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> سمات السلسلة النصية (`alt`، `title`، `aria-label`، …) تحتاج إلى `.value`:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (اختياري) الخطوة 6: تبديل اللغة (العميل)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>الإنجليزية</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>الفرنسية</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>الإسبانية</button>
    </div>
  );
}
```

---

## (اختياري) الخطوة 7: التوجيه المحلي (عناوين URL صديقة لتحسين محركات البحث)

لديك **نموذجان جيدان** مع TanStack Start. اختر واحدًا.

قم بإنشاء مجلد مقطع ديناميكي `src/routes/$locale/` بحيث تكون عناوين URL الخاصة بك `/:locale/...`. في تخطيط `$locale`، تحقق من صحة `params.locale`، وقم بتعيين `<IntlayerProvider locale=...>`، وقم بعرض `<Outlet />`. هذا النهج مباشر، ولكنك ستقوم بتركيب بقية مساراتك تحت `$locale`، وستحتاج إلى شجرة إضافية بدون بادئة إذا لم ترغب في إضافة بادئة اللغة الافتراضية.

---

## (اختياري) الخطوة 8: تحديث عنوان URL عند تبديل اللغة

مع النمط أ (المسار الأساسي)، يعني تبديل اللغات **التنقل إلى مسار أساسي مختلف**:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // يحافظ على التاريخ
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>الإنجليزية</button>
      <button onClick={() => change(Locales.FRENCH)}>الفرنسية</button>
      <button onClick={() => change(Locales.SPANISH)}>الإسبانية</button>
    </div>
  );
}
```

---

## (اختياري) الخطوة 9: `<html lang>` و `dir` (مستند TanStack Start)

يوفر TanStack Start **مستند** (هيكل HTML الجذري) يمكنك تخصيصه. قم بتعيين `lang` و `dir` لتحسين إمكانية الوصول وSEO:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* إذا كنت تحسب اللغة على الخادم، قم بتمريرها إلى المستند؛ وإلا سيصححها العميل بعد التحميل */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

لتصحيح جانب العميل، يمكنك أيضًا الاحتفاظ بالهوك الصغير الخاص بك:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## (اختياري) الخطوة 10: مكون الرابط المحلي

يوفر TanStack Router مكون `<Link/>`، ولكن إذا كنت بحاجة إلى عنصر `<a>` عادي يضيف بادئة تلقائية لعناوين URL الداخلية:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> إذا كنت تستخدم النمط أ (basepath)، فإن `<Link to="/about" />` الخاص بـ TanStack يحل بالفعل إلى `/fr/about` عبر `basepath`، لذا فإن استخدام رابط مخصص هو أمر اختياري.

---

## TypeScript

قم بتضمين الأنواع التي تم إنشاؤها بواسطة Intlayer:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

تجاهل الملفات الناتجة عن Intlayer:

```gitignore
.intlayer
```

---

## امتداد VS Code

- **امتداد Intlayer لـ VS Code** → الإكمال التلقائي، الأخطاء، المعاينات المضمنة، الإجراءات السريعة.
  السوق: `intlayer.intlayer-vs-code-extension`

---

## التقدم أكثر

- المحرر المرئي
- وضع CMS
- اكتشاف اللغة على الحافة / المحولات

---

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات                      |
| ------- | ---------- | ------------------------------ |
| 1.0.0   | 2025-08-11 | تمت إضافة تكييف TanStack Start |
