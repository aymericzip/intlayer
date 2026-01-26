---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: إعادة كتابة روابط URL مخصصة
description: تعرّف على كيفية تكوين واستخدام إعادة كتابة روابط URL المخصصة في Intlayer لتحديد مسارات خاصة بكل لغة.
keywords:
  - إعادة كتابة روابط URL مخصصة
  - Routing
  - Internationalization
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: تنفيذ إعادة كتابة URL مركزية مع مُنسقين مخصصين لكل إطار عمل واستخدام الـ hook المسمى useRewriteURL.
---

# تنفيذ إعادة كتابة روابط URL مخصصة

يدعم Intlayer إعادة كتابة روابط URL المخصصة، مما يتيح لك تحديد مسارات خاصة بكل لغة تختلف عن بنية `/locale/path` الافتراضية. هذا يسمح بعناوين URL مثل `/about` للإنجليزية و`/a-propos` للفرنسية مع الحفاظ على منطق التطبيق الداخلي بصيغته المعيارية.

## التكوين

يتم تكوين عمليات إعادة الكتابة المخصصة في قسم `routing` من ملف `intlayer.config.ts` الخاص بك باستخدام مُنسِّقات خاصة بكل إطار عمل. توفّر هذه المُنسِّقات الصياغة الصحيحة للراوتر الذي تفضّله.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-no-default",
        rewrite: nextjsRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="راوتر React" value="reactrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { reactRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: reactRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="موجّه TanStack Router" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: tanstackRouterRewrite({
          "/$locale/about": {
            fr: "/$locale/a-propos",
            es: "/$locale/acerca-de",
          },
          "/$locale/products/$id": {
            fr: "/$locale/produits/$id",
            es: "/$locale/productos/$id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="موجّه Vue Router" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (إعدادات أخرى)
      routing: {
        mode: "prefix-all",
        rewrite: vueRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="SvelteKit" value="sveltekit">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { svelteKitRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: svelteKitRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="موجّه Solid" value="solidrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { solidRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: solidRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Nuxt" value="nuxt">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nuxtRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // إعدادات إضافية
      routing: {
        mode: "prefix-all",
        rewrite: nuxtRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
</Tabs>

### المنسقات المتاحة

- `nextjsRewrite`: لـ Next.js App Router. يدعم `[slug]`، `[...slug]` (1+)، و`[[...slug]]` (0+).
- `svelteKitRewrite`: لـ SvelteKit. يدعم `[slug]`، `[...path]` (0+)، و`[[optional]]` (0-1).
- `reactRouterRewrite`: لـ React Router. يدعم `:slug` و`*` (0+).
- `vueRouterRewrite`: لـ Vue Router 4. يدعم `:slug`، `:slug?` (0-1)، `:slug*` (0+)، و`:slug+` (1+).
- `solidRouterRewrite`: لـ Solid Router. يدعم `:slug` و`*slug` (0+).
- `tanstackRouterRewrite`: لـ TanStack Router. يدعم `$slug` و `*` (0+).
- `nuxtRewrite`: لـ Nuxt 3. يدعم `[slug]` و `[...slug]` (0+).
- `viteRewrite`: مُنسّق عام لأي مشروع قائم على Vite. يوحّد صياغة إعداد البروكسي الخاص بـ Vite.

### أنماط متقدمة

يقوم Intlayer داخليًا بتوحيد هذه الأنماط إلى صيغة موحّدة، مما يسمح بمطابقة المسارات وتوليدها بشكل متقدم:

- **مقاطع اختيارية**: `[[optional]]` (SvelteKit) أو `:slug?` (Vue/React) مدعومة.
- **مطابقة شاملة (صفر أو أكثر)**: `[[...slug]]` (Next.js)، `[...path]` (SvelteKit/Nuxt)، أو `*` (React/TanStack) تسمح بمطابقة عدة مقاطع.
- **مطابقة شاملة إلزامية (واحد أو أكثر)**: `[...slug]` (Next.js) أو `:slug+` (Vue) تضمن وجود مقطع واحد على الأقل.

## تصحيح URL على جانب العميل: `useRewriteURL`

لضمان أن يعكس شريط عنوان المتصفح دائمًا عنوان URL المحلي "الجميل"، توفر Intlayer الـ hook `useRewriteURL`. يقوم هذا الـ hook بتحديث الـ URL بصمت باستخدام `window.history.replaceState` عندما يصل المستخدم إلى مسار canonical.

### الاستخدام في الأطر

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // يصحح تلقائيًا /fr/about إلى /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // يصحح تلقائيًا /fr/about إلى /fr/a-propos

      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="Vue" value="vue">
  
    ```vue
    <script setup>
    import { useRewriteURL } from "vue-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
  <Tab label="Solid" value="solid">
  
    ```tsx
    import { useRewriteURL } from "solid-intlayer";

    const Layout = (props) => {
      useRewriteURL();
      return <>{props.children}</>;
    };
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    ```svelte
    <script>
    import { useRewriteURL } from "svelte-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
</Tabs>

## تكامل Router و Proxies

وكلاء الخادم الخاصين بـ Intlayer (Vite و Next.js) يتعاملون تلقائيًا مع إعادة الكتابة المخصصة لضمان تناسق SEO.

1. **إعادة الكتابة الداخلية**: عندما يزور المستخدم /fr/a-propos، يقوم الوكيل داخليًا بتعيينه إلى /fr/about حتى يتطابق الإطار الخاص بك مع المسار الصحيح.
2. **إعادة التوجيه الموثوقة**: إذا كتب المستخدم يدويًا /fr/about، يصدر الوكيل إعادة توجيه 301/302 إلى /fr/a-propos، مما يضمن أن محركات البحث تؤرشف نسخة واحدة فقط من الصفحة.

### تكامل Next.js

يتم التعامل مع تكامل Next.js بالكامل عبر الـ middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### التكامل مع Vite

بالنسبة لـ SolidJS و Vue و Svelte، يقوم ملحق Vite `intlayerProxy` بإدارة عمليات إعادة الكتابة أثناء التطوير.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## الميزات الرئيسية

### 1. إعادة كتابة متعددة السياقات

يقوم كل مُنسق بإنشاء `RewriteObject` يحتوي على قواعد متخصصة لمستهلكين مختلفين:

- `url`: مُحسّن لتوليد عناوين URL على جانب العميل (يزيل مقاطع اللغة).
- `nextjs`: يحافظ على `[locale]` لوسيط Next.js.
- `vite`: يحافظ على `:locale` لوكلاء Vite.

### 2. التطبيع التلقائي للأنماط

يقوم Intlayer داخليًا بتطبيع كافة تراكيب الأنماط (مثل تحويل `[param]` إلى `:param`) بحيث يظل التطابق متسقًا بغض النظر عن إطار العمل المصدر.

### 3. عناوين URL المعتمدة في تحسين محركات البحث (SEO)

من خلال فرض إعادة التوجيه من المسارات canonical إلى الأسماء المستعارة الجذابة (pretty aliases)، يمنع Intlayer مشكلات المحتوى المكرر ويحسّن اكتشاف الموقع.

## الأدوات الأساسية

- `getLocalizedUrl(url, locale)`: ينشئ عنوان URL مخصّصًا للّغة مع مراعاة قواعد إعادة الكتابة.
- `getCanonicalPath(path, locale)`: يُرجع المسار الداخلي canonical المقابل لعنوان URL المخصّص للّغة.
- `getRewritePath(pathname, locale)`: يكشف ما إذا كان اسم المسار بحاجة إلى تصحيح ليطابق اسمه المحلي الأكثر جاذبية (prettier localized alias).
