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
author: aymericzip
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

<AccordionGroup>
<Accordion header="تغطية كاملة لـ Vanilla JS">

تم تحسين Intlayer للعمل بشكل مثالي مع Vanilla JavaScript من خلال تقديم **إدارة محتوى مستقلة عن إطار العمل**، و**دعم TypeScript**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

</Accordion>

<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

</Accordion>

<Accordion header="قابلية الصيانة">

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

</Accordion>

<Accordion header="وكيل الذكاء الاصطناعي">

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

</Accordion>

<Accordion header="التشغيل الآلي">

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

</Accordion>

<Accordion header="أداء">

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

</Accordion>

<Accordion header="التحجيم مع عدم وجود مطور">

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

</Accordion>
</AccordionGroup>

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

> يمكن تعريف تصريحات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا ، `./src`). وتطابق امتداد ملف تصريح المحتوى (افتراضيًا ، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
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

</Step>

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

## الأسئلة الشائعة

<FAQ>

<Question title="هل يمكنني استخدام Intlayer بدون أي مجمع أو إطار عمل؟">

نعم. هذا الدليل مخصص تحديدًا لهذه الحالة. تقوم بتضمين حزمة `vanilla-intlayer` مباشرة في HTML، وتهيئتها، وقراءة المحتوى عبر `useIntlayer` أو `getIntlayer`.

</Question>

<Question title="كم يضيف i18n إلى حجم صفحتي؟">

أقل بكثير من الكتالوجات التقليدية، لأن الصفحة لا تُحمل أبدًا لغة لا تعرضها. يتم تسليم المحتوى بتنسيقات محسنة. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

</Question>

<Question title="هل يمكنني الترحيل من i18next دون إعادة كتابة برامجي النصية؟">

إلى حد كبير نعم. اتبع [دليل ترحيل i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md).

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا. راجع [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء وينشئ القواميس عند كل تغيير.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل موقع JavaScript عادي؟">

- **كائنات القاموس اليدوية**: بدون أنواع أو أدوات تحقق.
- **`i18next`**: مكتبة شائعة لوقت التشغيل.
- **`Intlayer`**: إعلان في ملف المحتوى، تجميع اختياري وقت البناء، أنواع، محرر مرئي، ونظام CMS.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

</Question>

<Question title="كيف أقرأ الترجمة وأدخلها في الـ DOM؟">

استدعِ `useIntlayer` بمفتاح القاموس وقم بتعيين القيمة يدويًا لعقدة DOM، كما هو موضح في الخطوة 6.

</Question>

<Question title="كيف يتم اكتشاف لغة الزائر؟">

من المصادر المحددة في `routing.storage`: عادةً ملفات تعريف الارتباط أولاً، ثم ترويسة `Accept-Language`، والعودة إلى اللغة الافتراضية. انظر [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Question>

<Question title="كيف أدعم اللغات من اليمين إلى اليسار؟">

توضح الخطوة 8 ذلك. تُرجع `getHTMLTextDir` القيمة `ltr` أو `rtl` أو `auto`، مما يتيح لك تعيين سمتي `lang` و `dir` على عنصر `html` أو `body`.

</Question>

<Question title="هل يتعين على الزوار تنزيل كل اللغات؟">

لا، إذا كنت لا تريد ذلك. تغطي الخطوة 9 التحميل الكسول للقواميس حسب اللغة، بحيث تقوم الصفحة بتحميل اللغة النشطة فقط.

</Question>

<Question title="كيف أترجم التطبيق تلقائياً باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`. يملأ هذا الأمر الترجمات المفقودة باستخدام نموذج اللغة الذي تختاره مع مزودك ومفتاح API الخاص بك، ويحد `--git-diff` العملية على الملفات المعدلة. انظر [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

</Question>

<Question title="هل يدعم Intlayer صيغ الجمع والجنس والنصوص المنسقة؟">

نعم: [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)، [المحتوى القائم على النوع الاجتماعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، الشروط، [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)، والمنسقات للأرقام والتواريخ والعملات.

</Question>

<Question title="كيف يمكن للمترجمين تحرير المحتوى دون لمس الكود؟">

من خلال [المحرر المرئي (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، الذي يسمح لأي شخص بتحرير النصوص مباشرة على التطبيق قيد التشغيل، أو عبر [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، الذي يفصل المحتوى ليتم تحديثه دون الحاجة لإعادة نشر الكود.

</Question>

<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. الـ CMS السحابي المستضاف هو خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>
