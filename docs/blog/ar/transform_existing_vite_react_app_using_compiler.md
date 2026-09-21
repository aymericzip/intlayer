---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "كيفية جعل تطبيق Vite و React الحالي متعدد اللغات (i18n) لاحقاً (دليل i18n لعام 2026)"
description: "دليل عام 2026 لإضافة دعم تعدد اللغات (i18n) إلى تطبيق Vite و React قائم دون إعادة بناء معقدة. استخراج تلقائي للمحتوى، ترجمة بالذكاء الاصطناعي وباقة مصغرة مع Intlayer."
keywords:
  - Vite i18n
  - React i18n
  - تدويل
  - ترجمة تطبيق Vite قائم
  - ترجمة تطبيق React قائم
  - Intlayer
  - متعدد اللغات
  - مترجم
  - ترجمة الذكاء الاصطناعي
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
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

# كيفية جعل تطبيق Vite و React الحالي متعدد اللغات (i18n) لاحقاً (دليل i18n لعام 2026)

يعد تضمين التدويل (i18n) في مشروع Vite و React منذ البداية أمراً بسيطاً نسبياً. ولكن ماذا يحدث عندما يكون لديك بالفعل تطبيق ناضج ويعمل في بيئة الإنتاج بلغة واحدة، وتحتاج إلى جعله متعدد اللغات **لاحقاً**؟

إذا حاولت القيام بذلك باستخدام المكتبات التقليدية مثل `react-i18next` أو `react-intl`، فأنت تدرك حجم المشقة:

- البحث اليدوي عن النصوص الثابتة داخل مئات ملفات JSX و TSX.
- إنشاء ملفات JSON المتداخلة يدوياً وابتكار مفاتيح ترجمة عشوائية (`components.header.title` وغيرها).
- استبدال نصوص الواجهة باستدعاءات دوال الترجمة (`t('...')`).
- إعادة هيكلة التوجيه من جانب العميل، إدارة الحالة ومنطق تبديل اللغة.

في عام 2026، لا يتعين عليك إعادة كتابة التعليمات البرمجية لتطبيقك. باستخدام **Intlayer**، يمكنك إضافة التدويل إلى تطبيق Vite و React القائم في دقائق معدودة، عبر الاستخراج التلقائي، والترجمة المدعومة بالذكاء الاصطناعي، والتكامل السلس مع Vite.

> هل تبحث عن الدليل الفني الشامل خطوة بخطوة لـ Vite و React؟ راجع وثائقنا المخصصة: [ترجمة Vite و React باستخدام Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md).

## جدول المحتويات

<TOC/>

## معضلة التعديل اللاحق: لماذا يصعب جعل التطبيق القائم متعدد اللغات؟

عند إضافة التدويل إلى تطبيق Vite و React موجود مسبقاً، يواجه المطورون ثلاث عقبات رئيسية:

1. **اضطراب الكود البرمجي**: يتطلب الاستخراج اليدوي للنصوص إلى قواميس JSON تعديل كل ملف مكوّن تقريباً. ينتج عن ذلك فوارق Git هائلة ومخاطر تعارضات الدمج وخلل في التخطيط.
2. **عبء إدارة المفاتيح**: ابتكار مفاتيح مثل `dashboard.hero.ctaButton` لكل نص يؤدي إلى إبطاء سير العمل وزيادة العبء الذهني مع كل تعديل في الواجهة.
3. **أعمال الترجمة المرهقة**: بعد استخراج النصوص، يتطلب تعبئة القواميس بـ 5 أو 10 أو 20 لغة عمليات نسخ ولصق لا نهائية أو خدمات ترجمة خارجية مكلفة.

يعالج Intlayer هذه التحديات هندسياً عبر **الاستخراج بمساعدة المترجم**، **القواميس التوضيحية على مستوى المكون**، و**التكامل المباشر مع Vite**.

## الاستخراج التلقائي للمحتوى (وداعاً للبحث اليدوي عن النصوص)

بدلاً من استخراج كل نص يدوي من كود JSX، يوفر Intlayer مسارين فائقَي السهولة:

### الخيار أ: أداة الاستخراج عبر السطر البرمجي (`npx intlayer extract`)

يمكنك تشغيل أداة الاستخراج الخاصة بـ Intlayer مباشرة على كود تطبيقك:

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

يقوم هذا الأمر بفحص مكونات React، واكتشاف النصوص المعروضة للمستخدمين، وإنشاء ملفات تعريف المحتوى (`.content.ts`) تلقائياً بجانب كل مكون. يظل منطق المكونات واضحاً وآمناً برمجياً دون الحاجة إلى كتابة مفتاح ترجمة يدوي واحد.

### الخيار ب: مترجم Intlayer (الاستخراج أثناء البناء)

عند تفعيل مترجم Intlayer في إعداداتك، يمكنك ببساطة الاستمرار في كتابة مكوناتك بنصوص عادية بلغتك الافتراضية. في وقت البناء، يستخرج المترجم النص ويدمج المحتوى المترجم تلقائياً:

```tsx fileName="src/App.tsx"
// اكتب كود React عادي. يستخرج المترجم النصوص تلقائياً
export default function App() {
  return (
    <section>
      <h1>مرحباً بك في منصتنا</h1>
      <p>ابدأ استكشاف الميزات الحديثة اليوم.</p>
    </section>
  );
}
```

في الخلفية، يقوم Intlayer بإنشاء القاموس وربط المكون بالمحتوى المترجم، مما يلغي خطوة إعادة الهيكلة اليدوية بالكامل.

في هذه الحالة، ينشئ ملف إعلان `src/App.content.ts` بالهيكل التالي:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    marhabanBikaFiManasatina: t({
      ar: "مرحباً بك في منصتنا",
    }),
    ibdaIstikshafAlmizat: t({
      ar: "ابدأ استكشاف الميزات الحديثة اليوم.",
    }),
  },
};

export default content;
```

## الترجمة المدعومة بالذكاء الاصطناعي مع نموذجك المفضل

بمجرد استخراج المحتوى، لا ينبغي أن تستغرق ترجمته إلى عشرات اللغات أياماً طويلة. يحتوي Intlayer على سطر أوامر مدمج للترجمة بالذكاء الاصطناعي يتصل مباشرة مع OpenAI أو Anthropic أو DeepSeek أو Mistral باستخدام مفاتيح API الخاصة بك:

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

قم بتهيئة اللغات ومزود الذكاء الاصطناعي في `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ARABIC,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "تطبيق SaaS ولوحة تحكم حديثة مبنية بواسطة Vite و React",
  },
};

export default config;
```

يؤدي تشغيل `npx intlayer fill` إلى ملء ملفات المحتوى بترجمات عالية الجودة لجميع اللغات المحددة:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    marhabanBikaFiManasatina: t({
      ar: "مرحباً بك في منصتنا",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    ibdaIstikshafAlmizat: t({
      ar: "ابدأ استكشاف الميزات الحديثة اليوم.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

نظراً لأن Intlayer يمرر سياق التطبيق `applicationContext` إلى النموذج، فإن الترجمات الناتجة تحافظ على المصطلحات التقنية وهوية العلامة التجارية والتفاصيل النحوية بصورة أدق بكثير من الأدوات العادية.

للتحقق من اكتمال كافة النصوص قبل النشر في بيئة الإنتاج:

```bash
npx intlayer test
```

## التكامل مع Vite وإعداد الـ Provider

يتطلب دمج Intlayer في Vite مجرد إضافة المكوّن الإضافي إلى `vite.config.ts` وإحاطة المكون الرئيسي بـ `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> بدءاً من Intlayer v9، أصبح المترجم مدمجاً مباشرة في إضافة `intlayer()` ويتم تفعيله تلقائياً عند ضبط `compiler.enabled` في `intlayer.config.ts`.

أحط تطبيقك بـ `IntlayerProvider` في المكون الجذر:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### تغيير اللغة ديناميكياً

قم بتبديل اللغة بسهولة في أي مكان داخل تطبيقك باستخدام خطاف `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## تحسين محركات البحث متعدد اللغات (Sitemap و Robots.txt)

يتضمن Intlayer أدوات مساعدة مثل `generateSitemap` و `getMultilingualUrls` لإنشاء ملفات `sitemap.xml` و `robots.txt` متعددة اللغات ومتوافقة مع محركات البحث لمشاريع Vite الثابتة:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("تم إنشاء ملفات SEO بنجاح.");
```

أضف خطاف `prebuild` في `package.json` لتشغيل هذا السكربت قبل تنفيذ `vite build`:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## تعمق أكثر: هل أنت مستعد للتنفيذ خطوة بخطوة؟

قدم هذا الدليل نظرة عامة وشاملة حول كيفية إضافة التدويل إلى تطبيق Vite و React قائم في عام 2026 دون تعقيدات بنية الكود.

إذا كنت مستعداً لتهيئة كل جزء من تطبيقك بالتفصيل، بما في ذلك أمان الأنواع الكامل مع TypeScript والقواميس الديناميكية والمحرر المرئي، تفضل بالانتقال إلى دليلنا التفصيلي:

👉 **[الدليل الكامل لترجمة Vite و React باستخدام Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md)**

## الأسئلة الشائعة (FAQ)

<FAQ>

<Question title="هل يمكنني جعل تطبيق Vite و React متعدد اللغات دون إعادة كتابة كل النصوص يدوياً؟">

نعم. يمكنك تشغيل `npx intlayer extract` لاكتشاف النصوص الثابتة واستخراجها تلقائياً في ملفات تعريف محتوى محلية، أو استخدام مترجم Intlayer لتحويل المكونات أثناء البناء مع استمرارك في كتابة JSX القياسي.

</Question>
<Question title="كيف يقلل Intlayer من حجم حزمة Vite مقارنة بـ react-i18next أو react-intl؟">

يستخدم Intlayer تعريفات القواميس على مستوى المكون والتحسين باستخدام الماكرو أثناء البناء. لا تتلقى الحزم سوى النصوص المحددة التي تحتاجها المكونات المعروضة على الصفحة بدلاً من استيراد ملفات JSON ضخمة. كما تتيح القواميس الديناميكية تحميل اللغات عند الطلب فقط.

</Question>
<Question title="هل يمكنني استخدام الذكاء الاصطناعي لترجمة المكونات الحالية إلى لغات متعددة؟">

نعم. يتضمن سطر أوامر Intlayer أمر `npx intlayer fill` الذي يتصل بمزود الذكاء الاصطناعي المفضل لديك (OpenAI, Anthropic, Mistral, DeepSeek) لتوليد ترجمات متوافقة مع السياق لجميع اللغات المطلوبة.

</Question>
<Question title="هل يمكنني الترحيل من react-i18next أو react-intl دون إعادة كتابة المكونات؟">

نعم. يوفر Intlayer محولات توافق لـ `react-i18next` و `react-intl`، بالإضافة إلى إضافات لمزامنة ملفات ترجمة JSON الحالية في الاتجاهين (`sync-json`).

</Question>

</FAQ>
