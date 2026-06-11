---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "تدويل Vite + Vanilla JS - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Vite + Vanilla JS متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
applicationShowcase: https://intlayer-vite-vanilla.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 8.4.10
    date: 2026-03-23
    changes: "التاريخ الأولي"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# ترجم موقع الويب الخاص بك باستخدام Vite و Vanilla JS باستخدام Intlayer | التدويل (i18n)

<Tabs defaultTab="code">
  <Tab label="كود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="تجربة" value="demo">

<iframe
  src="https://intlayer-vite-vanilla.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة - intlayer-vite-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## جدول المحتويات

<TOC/>

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `i18next` أو `i18n.js`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

** تغطية كاملة للفيت **

تم تحسين Intlayer للعمل بشكل مثالي مع Vite من خلال تقديم **إدارة المحتوى المحايدة لإطار العمل**، و**دعم TypeScript**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

**حجم البندل**

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

** الصيانة **

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

** وكيل الذكاء الاصطناعي **

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[مهارات الوكيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

**الأتمتة**

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

**أداء**

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

**التحجيم مع عدم وجود مطور**

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و Vanilla JS

<Steps>

<Step number={1} title="تثبيت الاعتماديات">

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**
  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، التحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **vanilla-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيقات JavaScript / TypeScript الصرفة. توفر نموذجًا مفردًا للنشر/الاشتراك (`IntlayerClient`) ومساعدين قائمين على رد الاتصال (`useIntlayer` و `useLocale` وما إلى ذلك) بحيث يمكن لأي جزء من تطبيقك التفاعل مع تغييرات اللغة دون الاعتماد على إطار عمل واجهة المستخدم.

- **vite-intlayer**
  تتضمن ملحق Vite لدمج Intlayer مع [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى برمجية وسيطة لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، ومعالجة إعادة توجيه عناوين URL.

</Step>

<Step number={2} title="تكوين مشروعك">

قم بإنشاء ملف تكوين لتهيئة لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL الموطنة، وإعادة توجيه البرمجيات الوسيطة، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، ارجع إلى [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={3} title="دمج Intlayer في تكوين Vite الخاص بك">

أضف ملحق intlayer إلى التكوين الخاص بك.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> يستخدم ملحق Vite `intlayer()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، فإنه يوفر أسماء مستعارة لتحسين الأداء.

</Step>

<Step number={4} title="تهيئة Intlayer في نقطة الدخول الخاصة بك">

استدعِ `installIntlayer()` **قبل** عرض أي محتوى بحيث يكون نموذج اللغة العالمي المفرد جاهزًا.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// يجب استدعاؤه قبل عرض أي محتوى i18n.
installIntlayer();

// استيراد وتشغيل وحدات التطبيق الخاصة بك.
import "./app.js";
```

إذا كنت تستخدم أيضًا إعلانات محتوى `md()` (Markdown)، فقم بتثبيت عرض Markdown أيضًا:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

</Step>

<Step number={5} title="إعلان المحتوى الخاص بك">

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "انقر على شعار Vite لمعرفة المزيد",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "انقر على شعار Vite لمعرفة المزيد"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). وتتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

</Step>

<Step number={6} title="استخدام Intlayer في JavaScript الخاص بك">

تعكس `vanilla-intlayer` واجهة برمجة تطبيقات `react-intlayer`: `useIntlayer(key, locale?)` تعيد المحتوى المترجم مباشرة. قم بربط `.onChange()` مع النتيجة للاشتراك في تغييرات اللغة - المعادل الصريح لإعادة العرض في React.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// الحصول على المحتوى الأولي للغة الحالية.
// ربط .onChange() ليتم إعلامك متى تغيرت اللغة.
const content = useIntlayer("app").onChange((newContent) => {
  // إعادة العرض أو تصحيح عقد DOM المتأثرة فقط
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// العرض الأولي
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> الوصول إلى القيم الطرفية كسلاسل من خلال تغليفها في `String()`، والتي تستدعي طريقة `toString()` للعقدة وتعيد النص المترجم.
>
> عندما تحتاج إلى قيمة لسمة HTML أصلية (مثل `alt` و `aria-label`)، استخدم `.value` مباشرة:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

لتغيير لغة المحتوى الخاص بك، استخدم وظيفة `setLocale` التي كشفت عنها `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value as any));

  // الحفاظ على مزامنة القائمة المنسدلة عند تغيير اللغة من مكان آخر
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="عرض محتوى Markdown و HTML" isOptional={true}>

يدعم Intlayer إعلانات المحتوى `md()` و `html()`. في vanilla JS، يتم إدراج المخرج المترجم كـ HTML خام عبر `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

ترجمة وحقن HTML:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` تستدعي `toString()` على `IntlayerNode` التي تعيد سلسلة Markdown الخام. مررها إلى `compileMarkdown` للحصول على سلسلة HTML، ثم قم بضبطها عبر `innerHTML`.

> [!WARNING]
> استخدم `innerHTML` فقط مع المحتوى الموثوق به. إذا كان markdown يأتي من إدخال المستخدم، فقم بتطهيره أولاً (مثل استخدام DOMPurify). يمكنك تثبيت عارض تطهير ديناميكيًا:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

</Step>

<Step number={9} title="إضافة التوجيه الموطن إلى تطبيقك" isOptional={true}>

لإنشاء مسارات فريدة لكل لغة (مفيد لتحسين محركات البحث)، يمكنك استخدام `intlayerProxy` في تكوين Vite الخاص بك لاكتشاف اللغة من جانب الخادم.

أولاً، أضف `intlayerProxy` إلى تكوين Vite الخاص بك:

> لاحظ أنه لاستخدام `intlayerProxy` في الإنتاج، تحتاج إلى نقل `vite-intlayer` من `devDependencies` إلى `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // يجب وضعه أولاً
    intlayer(),
  ],
});
```

</Step>

<Step number={10} title="تغيير عنوان URL عند تغيير اللغة" isOptional={true}>

لتحديث عنوان URL للمتصفح عند تغيير اللغة، استدعِ `useRewriteURL()` بعد تثبيت Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// يعيد كتابة عنوان URL فورًا وعند كل تغيير لاحق للغة.
// يعيد وظيفة إلغاء الاشتراك للتنظيف.
const stopRewriteURL = useRewriteURL();
```

</Step>

<Step number={11} title="تبديل سمات لغة HTML والاتجاه" isOptional={true}>

قم بتحديث سمات `lang` و `dir` لعلامة `<html>` لتتوافق مع اللغة الحالية لسهولة الاستخدام وتحسين محركات البحث.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={12} title="تحميل القواميس ببطء حسب اللغة" isOptional={true}>

للتطبيقات الكبيرة، قد ترغب في تقسيم قاموس كل لغة إلى قطعة خاصة به. استخدم `useDictionaryDynamic` جنبًا إلى جنب مع `import()` الديناميكي من Vite:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> يتم جلب حزمة كل لغة فقط عندما تصبح تلك اللغة نشطة ويتم تخزين النتيجة مؤقتًا - التبديلات اللاحقة لنفس اللغة تكون فورية.

</Step>

<Step number={13} title="استخراج محتوى مكوناتك" isOptional={true}>

إذا كان لديك كود موجود مسبقًا، فقد يستغرق تحويل آلاف الملفات وقتًا طويلاً.

لتسهيل هذه العملية، يقترح Intlayer [مترجمًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) / [مستخرجًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) لتحويل مكوناتك واستخراج المحتوى.

لإعداده، يمكنك إضافة قسم `compiler` في ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... بقية التكوين الخاص بك
  compiler: {
    /**
     * يشير إلى ما إذا كان يجب تمكين المترجم.
     */
    enabled: true,

    /**
     * يحدد مسار ملفات المخرجات
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * يشير إلى ما إذا كان يجب حفظ المكونات بعد تحويلها.
     * بهذه الطريقة، يمكن تشغيل المترجم مرة واحدة فقط لتحويل التطبيق، ثم يمكن إزالته.
     */
    saveComponents: false,

    /**
     * بادئة مفتاح القاموس
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='أمر Extract'>

قم بتشغيل المستخرج لتحويل مكوناتك واستخراج المحتوى

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='مترجم Babel'>

قم بتحديث `vite.config.ts` الخاص بك لتضمين ملحق `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // يضيف ملحق المترجم
  ],
});
```

```bash packageManager="npm"
npm run build # أو npm run dev
```

```bash packageManager="pnpm"
pnpm run build # أو pnpm run dev
```

```bash packageManager="yarn"
yarn build # أو yarn dev
```

```bash packageManager="bun"
bun run build # أو bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (اختياري) خريطة الموقع و robots.txt (توليد وقت البناء)

يوفّر Intlayer الدالتين `generateSitemap` و`getMultilingualUrls` لتنسيق مخرجات جاهزة للزحّافات (`sitemap.xml` متعدد اللغات و`robots.txt`) وكتابتها تلقائياً إلى `public/`. عادةً تشغّل سكربت Node صغير **قبل** Vite (مثلاً خطافات npm `predev` / `prebuild`).

#### خريطة الموقع

يولّد مولّد خرائط المواقع إعدادات اللغات ويضيف البيانات الوصفية المناسبة.

> تدعم الخريطة مساحة الاسم `xhtml:link` (hreflang). بدلاً من قائمة عناوين مسطحة، يربط Intlayer بين جميع النسخ اللغوية لكل صفحة في الاتجاهين (مثل `/about` و`/fr/about` أو `/about?lang=fr` وفقًا لوضع التوجيه).

#### Robots.txt

استخدم `getMultilingualUrls` لتشمل قواعد `Disallow` كل المتغيرات المحلية للمسارات الحساسة.

#### 1. أضف `generate-seo.mjs` في جذر المشروع

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

يجب تثبيت حزمة `intlayer`. عيّن `SITE_URL` في بيئة الإنتاج (مثلاً في CI).

> يُفضّل `generate-seo.mjs` لـ ESM في Node. إن استخدمت `generate-seo.js` ففعّل `"type": "module"` في `package.json` أو ESM بطريقة أخرى.

#### 2. شغّل السكربت قبل Vite

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

عدّل الأوامر إن كنت تستخدم pnpm أو yarn. يمكن استدعاء السكربت من CI أيضاً.

### تكوين TypeScript

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي يتم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```bash
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### ملحق VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **ملحق Intlayer VS Code الرسمي**.

[تثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الملحق:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الملحق، ارجع إلى [توثيق ملحق Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### اذهب أبعد من ذلك

للذهاب أبعد من ذلك، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو استخراج محتواك باستخدام [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).
