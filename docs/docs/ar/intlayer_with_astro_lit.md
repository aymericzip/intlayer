---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: ترجمة Astro + Lit i18n - كيفية ترجمة تطبيق Astro + Lit في عام 2026
description: تعرف على كيفية إضافة التدويل (i18n) إلى موقع Astro + Lit الخاص بك باستخدام Intlayer. اتبع هذا الدليل لجعل موقعك متعدد اللغات.
keywords:
  - التدويل
  - توثيق
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "التوثيق الأولي لـ Astro + Lit"
---

# ترجمة موقع Astro + Lit الخاص بك باستخدام Intlayer | التدويل (i18n)

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

باستخدام Intlayer، يمكنك:

- **إدارة الترجمات بسهولة**: باستخدام قواميس تعريفية على مستوى المكون.
- **توطين الميتا داتا والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript**: من خلال أنواع مولدة تلقائيًا لتعزيز الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**: مثل الكشف الديناميكي عن اللغة وتبديل اللغة.

---

## دليل خطوة بخطوة لتهيئة Intlayer في Astro + Lit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

تحقق من [نموذج التطبيق](https://github.com/aymericzip/intlayer-astro-template) على GitHub.

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  الحزمة الأساسية التي توفر أدوات i18n لإدارة التكوين، الترجمات، [تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، التحويل، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **astro-intlayer**
  تتضمن إضافة تكامل Astro لربط Intlayer بـ [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف لغة المستخدم المفضلة، وإدارة ملفات تعريف الارتباط (cookies)، والتعامل مع إعادة توجيه الروابط.

- **lit**
  حزمة Lit الأساسية لبناء مكونات ويب (Web Components) سريعة وخفيفة.

- **lit-intlayer**
  حزمة لدمج Intlayer في تطبيقات Lit. توفر خطافات (hooks) تعتمد على `ReactiveController` (`useIntlayer`, `useLocale`, إلخ) والتي تؤدي تلقائيًا إلى إعادة رندر LitElement عند تغيير اللغة.

- **@astrojs/lit**
  إضافة Astro الرسمية التي تتيح استخدام عناصر Lit المخصصة (custom elements) داخل صفحات Astro.

### الخطوة 2: تهيئة مشروعك

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ARABIC,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> من خلال ملف التكوين هذا، يمكنك تهيئة الروابط المترجمة، وإعادة توجيه الوسيط، وأسماء الكوكيز، وموقع وامتدادات تعريفات المحتوى، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Astro الخاص بك

أضف إضافة `intlayer` وتكامل Lit إلى تكوين Astro الخاص بك.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> تُستخدم إضافة `intlayer()` لدمج Intlayer مع Astro. وهي تضمن إنشاء ملفات تعريف المحتوى ومراقبتها في وضع التطوير. وتعرّف متغيرات بيئة Intlayer داخل تطبيق Astro وتوفر أسماء مستعارة لتحسين الأداء.

> يتيح تكامل `lit()` استخدام العناصر المخصصة (custom elements) لـ Lit داخل صفحات Astro.

### الخطوة 4: تعريف المحتوى الخاص بك

أنشئ وأدِر تعريفات المحتوى لتخزين الترجمات:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ar: "مرحبا بالعالم",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      ar: "مرحبا بكم في موقع Astro + Lit متعدد اللغات الخاص بي.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> يمكن تعريف تعريفات المحتوى في أي مكان في تطبيقك، طالما أنها مدرجة في `contentDir` (افتراضيًا `./src`) وتطابق امتداد ملف تعريف المحتوى (افتراضيًا `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> لمزيد من المعلومات، راجع [توثيق تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 5: استخدام المحتوى في Astro

يمكنك استهلاك القواميس مباشرة في ملفات `.astro` الخاصة بك باستخدام المساعدين الأساسيين المصدرين من `intlayer`. يجب عليك أيضًا إضافة ميتا داتا SEO (مثل hreflang وروابط canonical) لكل صفحة. يتم استيراد عناصر Lit المخصصة عبر وسم `<script>` للعميل وتوضع في المتن (body).

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- رابط Canonical -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- روابط Hreflang -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- عنصر Lit مخصص — يستلم اللغة المكتشفة من الخادم كخاصية (property) -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> **ملاحظة حول إعداد التوجيه:**
> تعتمد بنية الدليل التي تستخدمها على إعداد `middleware.routing` في `intlayer.config.ts`:
>
> - **`prefix-no-default` (افتراضي):** يحافظ على اللغة الافتراضية في الجذر (بدون بادئة) ويضيف بادئات للغات الأخرى. استخدم `[...locale]` لتغطية جميع الحالات.
> - **`prefix-all`:** تحصل جميع الروابط على بادئة لغة. يمكنك استخدام `[locale]` القياسي إذا كنت لا تحتاج إلى معالجة الجذر بشكل منفصل.
> - **`search-param` أو `no-prefix`:** لا يلزم وجود أدلة لغة. يتم التعامل مع اللغة عبر معلمات الاستعلام أو ملفات تعريف الارتباط.

### الخطوة 6: إنشاء عنصر Lit مخصص

أنشئ عنصر Lit مخصصًا. استدعِ `installIntlayer` في `connectedCallback` باستخدام خاصية `locale` المحملة من الخادم لتهيئة singleton الترجمة في جانب العميل.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // التهيئة باللغة المكتشفة من الخادم
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div dir=${currentLocale === "ar" ? "rtl" : "ltr"}>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- يتم رندر مبدل اللغة داخل LitElement -->
        <div class="locale-switcher">
          <span class="switcher-label">تغيير اللغة:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> يتم تمرير خاصية `locale` من صفحة Astro (اكتشاف الخادم) وتستخدم لتهيئة `installIntlayer` في `connectedCallback` ، مما يحدد اللغة الأولية لجميع خطافات `ReactiveController` داخل العنصر.

> يتم تسجيل `useIntlayer` كـ `ReactiveController`. ويطلب تلقائيًا إعادة رندر العنصر عند تغيير اللغة، لذلك لا توجد حاجة لمنطق اشتراك (subscription logic) إضافي.

### الخطوة 7: إضافة مبدل اللغة

تتوفر وظيفة تغيير اللغة مباشرة داخل طريقة `render()` للعنصر المخصص لـ Lit (انظر الخطوة 6 أعلاه). وهي تستخدم `useLocale` من `lit-intlayer` وتنتقل إلى الرابط المترجم عندما يختار المستخدم لغة جديدة:

```typescript fileName="src/components/lit/LitDemo.ts"
// داخل فئة LitElement ، بعد تهيئة useLocale في الخطوة 6:

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // الانتقال إلى الرابط المترجم عند تغيير اللغة
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">تغيير اللغة:</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **ملاحظة حول تفاعلية Lit:**
> تقوم `useLocale` بإرجاع `ReactiveController`. عند استدعاء `setLocale` ، يطلب المتحكم تلقائيًا إعادة رندر، مما يؤدي إلى تحديث حالة الزر النشط دون معالجة DOM يدويًا.

> **ملاحظة حول الاستمرارية:**
> يضمن استخدام `onLocaleChange` لإعادة التوجيه عبر `window.location.href` زيارة الرابط الجديد للغة، مما يسمح لوسيط Intlayer بتعيين كوكيز اللغة وتذكر تفضيلات المستخدم في الزيارات المستقبلية.

### الخطوة 8: خريطة الموقع وRobots.txt

توفر Intlayer أدوات لإنشاء خريطة موقع مترجمة وملفات robots.txt ديناميكيًا.

#### خريطة الموقع (Sitemap)

أنشئ `src/pages/sitemap.xml.ts` لإنشاء خريطة موقع تتضمن جميع مساراتك المترجمة.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

أنشئ `src/pages/robots.txt.ts` للتحكم في زحف محركات البحث.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### تكوين TypeScript

تستخدم Intlayer تقنية توسيع الوحدات (module augmentation) للاستفادة من TypeScript، مما يجعل برمجتك أكثر قوة. إذا كنت تستخدم صيغة الـ decorators ، فتأكد من تفعيل `experimentalDecorators` في خيارات المترجم (compiler options).

![الإكمال التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ في الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // مطلوب لدعم decorators في Lit
  },
  include: [
    // ... تكوين TypeScript الحالي الخاص بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي تنشئها Intlayer. هذا يتجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، أضف التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```bash
# تجاهل الملفات المولدة بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **إكمال تلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينة مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من المعلومات حول استخدام الإضافة، راجع [توثيق إضافة VS Code](https://intlayer.org/doc/vs-code-extension).

---

### تعمق أكثر

إذا كنت تريد معرفة المزيد، يمكنك أيضًا تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو استخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) لإخراج محتواك خارجيًا.
