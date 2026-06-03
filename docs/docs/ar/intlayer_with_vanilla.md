---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "تدويل Vanilla JS - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Vanilla JS متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - تدويل
  - وثائق
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 8.4.10
    date: 2026-03-31
    changes: "بدء السجل"
---

# ترجمة موقع Vanilla JS الخاص بك باستخدام Intlayer | التدويل (i18n)

<Tabs defaultTab="code">
  <Tab label="كود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="تجربة" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## جدول المحتويات

<TOC/>

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `i18next` أو `i18n.js`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

** تغطية كاملة لـ Vanilla JS **

تم تحسين Intlayer للعمل بشكل مثالي مع Vanilla JavaScript من خلال تقديم **إدارة محتوى مستقلة عن إطار العمل**، و**دعم TypeScript**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

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

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vanilla JS

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
# إنشاء حزمة مستقلة من intlayer و vanilla-intlayer
# سيتم استيراد هذا الملف في ملف HTML الخاص بك
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# تهيئة intlayer مع ملف التكوين
npx intlayer init --no-gitignore

# بناء القواميس
npx intlayer build
```

```bash packageManager="pnpm"
# إنشاء حزمة مستقلة من intlayer و vanilla-intlayer
# سيتم استيراد هذا الملف في ملف HTML الخاص بك
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# تهيئة intlayer مع ملف التكوين
pnpm intlayer init --no-gitignore

# بناء القواميس
pnpm intlayer build
```

```bash packageManager="yarn"
# إنشاء حزمة مستقلة من intlayer و vanilla-intlayer
# سيتم استيراد هذا الملف في ملف HTML الخاص بك
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# تهيئة ملف تكوين intlayer، و TypeScript إذا تم إعداده، ومتغيرات البيئة
yarn intlayer init --no-gitignore

# بناء القواميس
yarn intlayer build
```

```bash packageManager="bun"
# إنشاء حزمة مستقلة من intlayer و vanilla-intlayer
# سيتم استيراد هذا الملف في ملف HTML الخاص بك
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# تهيئة intlayer مع ملف التكوين
bun x intlayer init --no-gitignore

# بناء القواميس
bun x intlayer build
```

- **intlayer**
  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين والترجمة و[التصريح عن المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) والتحويل والبرمجة النصية و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **vanilla-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيقات JavaScript / TypeScript البحتة. توفر كائناً منفرداً للنشر/الاشتراك (`IntlayerClient`) ومساعدين يعتمدون على الاستدعاءات (`useIntlayer`, `useLocale`, إلخ) بحيث يمكن لأي جزء من تطبيقك التفاعل مع تغييرات اللغة دون الاعتماد على إطار عمل واجهة مستخدم.

> ينتج تصدير الربط (bundling) من واجهة سطر أوامر `intlayer standalone` بناءً محسّناً من خلال تقليم الشجرة (tree-shaking) للحزم غير المستخدمة، واللغات، والمنطق غير الأساسي (مثل عمليات إعادة التوجيه أو البوادئ) الخاصة بتكوينك.

</Step>

<Step number={2} title="تكوين مشروعك">

قم بإنشاء ملف تكوين لتكوين لغات تطبيقك:

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

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL الموطنة، وإعادة توجيه البرامج الوسيطة، وأسماء ملفات تعريف الارتباط، وموقع وامتداد تصريحات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={3} title="استيراد الحزمة في HTML الخاص بك">

بمجرد إنشاء حزمة `intlayer.js` ، يمكنك استيرادها في ملف HTML الخاص بك:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />

    <!-- استيراد الحزمة -->
    <script src="./intlayer.js" defer></script>
    <!-- استيراد البرنامج النصي الرئيسي الخاص بك -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

تكشف الحزمة عن `Intlayer` و `VanillaIntlayer` ككائنات عالمية على `window`.

</Step>

<Step number={4} title="تهيئة Intlayer في نقطة الدخول الخاصة بك">

في ملف `src/main.js` ، قم باستدعاء `installIntlayer()` **قبل** عرض أي محتوى بحيث يكون الكائن المنفرد للغة العالمية جاهزًا.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// يجب استدعاؤه قبل عرض أي محتوى i18n.
installIntlayer();
```

إذا كنت تريد أيضًا استخدام عرض markdown ، فقم باستدعاء `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="التصريح عن المحتوى الخاص بك">

قم بإنشاء وإدارة تصريحات المحتوى الخاصة بك لتخزين الترجمات:

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
      es: "Haga clic en el logotipo de Vite para obtener más información",
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

> يمكن تعريف تصريحات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا ، `./src`). وتطابق امتداد ملف تصريح المحتوى (افتراضيًا ، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> لمزيد من التفاصيل ، راجع [وثائق تصريح المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

</Step>

<Step number={6} title="استخدام Intlayer في JavaScript الخاص بك">

يوفر كائن `window.VanillaIntlayer` مساعدين لواجهة البرمجة: `useIntlayer(key, locale?)` يعيد المحتوى المترجم لمفتاح معين.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// الحصول على المحتوى الأولي للغة الحالية.
// قم بتسلسل .onChange() ليتم إخطارك كلما تغيرت اللغة.
const content = useIntlayer("app").onChange((newContent) => {
  // إعادة عرض أو تعديل عقد DOM المتأثرة فقط
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// العرض الأولي
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> قم بالوصول إلى القيم النهائية كسلاسل من خلال تغليفها في `String()` ، مما يستدعي طريقة `toString()` للعقدة ويعيد النص المترجم.
>
> عندما تحتاج إلى القيمة لسمة HTML أصلية (مثل `alt` و `aria-label`) ، استخدم `.value` مباشرة:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

لتغيير لغة المحتوى الخاص بك ، استخدم وظيفة `setLocale` التي كشفت عنها `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "اللغة");

  const render = (currentLocale) => {
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

  select.addEventListener("change", () => setLocale(select.value));

  // الحفاظ على مزامنة القائمة المنسدلة عند تغير اللغة من مكان آخر
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="تبديل سمات لغة HTML والاتجاه" isOptional={true}>

قم بتحديث سمات `lang` و `dir` لعلامة `<html>` لمطابقة اللغة الحالية لتسهيل الوصول وتحسين محركات البحث.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="تحميل القواميس بكسل لكل لغة" isOptional={true}>

إذا كنت ترغب في تحميل القواميس بكسل (lazy-load) لكل لغة ، يمكنك استخدام `useDictionaryDynamic`. هذا مفيد إذا كنت لا تريد حزم جميع الترجمات في ملف `intlayer.js` الأولي.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> ملاحظة: يتطلب `useDictionaryDynamic` توفر القواميس كملفات ESM منفصلة. يتم استخدام هذا النهج عادةً إذا كان لديك خادم ويب يقدم القواميس.
> </Step>

</Steps>

### تكوين TypeScript

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### امتداد VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer ، يمكنك تثبيت **امتداد Intlayer VS Code** الرسمي.

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد ، راجع [وثائق امتداد Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### اذهب أبعد من ذلك

للذهاب إلى أبعد من ذلك ، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو استضافة محتواك خارجيًا باستخدام [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).
