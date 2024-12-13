# البدء في التدويل (i18n) باستخدام Intlayer و Next.js باستخدام Page Router

## ما هو Intlayer؟

**Intlayer** هو مكتبة مفتوحة المصدر للتدويل (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. يتكامل Intlayer بسلاسة مع أحدث إطار عمل **Next.js**، بما في ذلك **Page Router** التقليدي.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكونات.
- **تغيير البيانات الوصفية** والمسارات والمحتوى محليًا بشكل ديناميكي.
- **ضمان دعم TypeScript** مع توليد الأنواع تلقائيًا، مما يحسن من الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف وتبديل اللغة ديناميكيًا.

> ملاحظة: Intlayer متوافق مع Next.js 12 و13 و14 و15. إذا كنت تستخدم Next.js App Router، يرجى الرجوع إلى [دليل App Router](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md). بالنسبة لـ Next.js 15، اتبع هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js باستخدام Page Router

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتحديد اللغات المدعومة من قبل تطبيقك:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // أضف اللغات الأخرى هنا
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

للحصول على قائمة كاملة من خيارات التكوين المتاحة، يرجى الرجوع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer مع تكوين Next.js

قم بتعديل تكوين Next.js الخاص بك لدمج Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // تكوين Next.js الحالي الخاص بك
};

export default withIntlayer(nextConfig);
```

### الخطوة 4: تكوين Middleware لاكتشاف اللغة

قم بإعداد Middleware لاكتشاف ومعالجة اللغة المفضلة للمستخدم تلقائيًا:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### الخطوة 5: تحديد مسارات اللغة الديناميكية

قم بتنفيذ التوجيه الديناميكي لتقديم محتوى محلي بناءً على لغة المستخدم.

1. **إنشاء صفحات مخصصة للغة:**

   أعد تسمية ملف الصفحة الرئيسي ليشمل الجزء الديناميكي `[locale]`.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **تحديث `_app.tsx` لمعالجة التدويل:**

   قم بتعديل `_app.tsx` الخاص بك لتضمين مزودي Intlayer.

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **إعداد `getStaticPaths` و `getStaticProps`:**

   في `[locale]/index.tsx` الخاص بك، قم بتعريف المسارات والخصائص لمعالجة اللغات المختلفة.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* المحتوى الخاص بك هنا */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // أضف اللغات الخاصة بك هنا

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### الخطوة 6: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة قواميس المحتوى الخاصة بك لتخزين الترجمات.

```tsx
// src/pages/[locale]/home.content.ts
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

للحصول على مزيد من المعلومات حول إعلان المحتوى، يرجى الرجوع إلى [دليل إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

### الخطوة 7: استخدام المحتوى في كودك

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك لعرض المحتوى المترجم.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@component/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* مكونات إضافية */}
    </div>
  );
};

// ... بقية الكود، بما في ذلك getStaticPaths و getStaticProps

export default HomePage;
```

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // تأكد من أن لديك إعلان المحتوى المقابل

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **ملاحظة:** عند استخدام الترجمات في سمات `string` (مثل `alt` و `title` و `href` و `aria-label`)، قم باستدعاء قيمة الدالة كما يلي:

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (اختياري) الخطوة 8: تدويل بيانات التعريف الخاصة بك

لتدويل البيانات الوصفية مثل عناوين الصفحات والوصف، استخدم دالة `getStaticProps` مع دالة `getTranslationContent` الخاصة بـ Intlayer.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // يمكن استخدام بيانات التعريف في الرأس أو مكونات أخرى حسب الحاجة
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* محتوى إضافي */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... بقية الكود بما في ذلك getStaticPaths
```

### (اختياري) الخطوة 9: تغيير لغة محتواك

للسماح للمستخدمين بتبديل اللغات ديناميكيًا، استخدم دالة `setLocale` المقدمة من `useLocale` hook.

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
      {/* أضف المزيد من الأزرار للغات إضافية */}
    </div>
  );
};

export default LanguageSwitcher;
```

### تكوين TypeScript

يستخدم Intlayer تعزيز الوحدة لتحسين قدرات TypeScript، مما يوفر المزيد من أمان النوع وإكمالًا تلقائيًا أفضل.

1. **تأكد من أن TypeScript تشمل الأنواع التي تم إنشاؤها تلقائيًا:**

   قم بتحديث `tsconfig.json` الخاص بك ليتضمن الأنواع المتولدة تلقائيًا.

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // تكوينات TypeScript الحالية الخاصة بك
     },
     "include": [
       "src",
       "types" // تضمين الأنواع المولدة تلقائيًا
     ]
   }
   ```

2. **مثال على فوائد TypeScript:**

   ![مثال على الإكمال التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![مثال على خطأ الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### تكوين Git

للحفاظ على نظافة مستودعك وتجنب الالتزام بالملفات الناتجة، يُوصى بتجاهل الملفات التي أنشأها Intlayer.

1. **تحديث `.gitignore`:**

   أضف السطور التالية إلى ملف `.gitignore` الخاص بك:

   ```gitignore
   # تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
   .intlayer
   ```

## موارد إضافية

- **وثائق Intlayer:** [مستودع GitHub](https://github.com/aymericzip/intlayer)
- **دليل إعلان المحتوى:** [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md)
- **وثائق التكوين:** [دليل التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md)

باتباع هذا الدليل، يمكنك دمج Intlayer بفعالية في تطبيق Next.js الخاص بك باستخدام Page Router، مما يتيح دعم التدويل القوي والقابل للتوسع لمشاريع الويب الخاصة بك.
