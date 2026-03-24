---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - كيفية ترجمة تطبيق Vanilla JS في عام 2026
description: اكتشف كيفية جعل موقع الويب الخاص بك باستخدام Vite و Vanilla JS متعدد اللغات. اتبع التوثيق للتدويل (i18n) والترجمة.
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
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# ترجم موقع الويب الخاص بك باستخدام Vite و Vanilla JS باستخدام Intlayer | التدويل (i18n)

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط الدعم متعدد اللغات في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **توطين البيانات الوصفية والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** مع أنواع يتم إنشاؤها تلقائيًا، مما يحسن من الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف عن اللغة وتبديلها ديناميكيًا.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و Vanilla JS

### الخطوة 1: تثبيت الاعتماديات

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
bunx intlayer init
```

- **intlayer**
  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، التحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **vanilla-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيقات JavaScript / TypeScript الصرفة. توفر نموذجًا مفردًا للنشر/الاشتراك (`IntlayerClient`) ومساعدين قائمين على رد الاتصال (`useIntlayer` و `useLocale` وما إلى ذلك) بحيث يمكن لأي جزء من تطبيقك التفاعل مع تغييرات اللغة دون الاعتماد على إطار عمل واجهة المستخدم.

- **vite-intlayer**
  تتضمن ملحق Vite لدمج Intlayer مع [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى برمجية وسيطة لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، ومعالجة إعادة توجيه عناوين URL.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتهيئة لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL الموطنة، وإعادة توجيه البرمجيات الوسيطة، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، ارجع إلى [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف ملحق intlayer إلى التكوين الخاص بك.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> يستخدم ملحق Vite `intlayer()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، فإنه يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: تهيئة Intlayer في نقطة الدخول الخاصة بك

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

### الخطوة 5: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      fr: "Cliqueز sur le logo Vite pour en savoir plus",
      es: "انقر على شعار Vite لمعرفة المزيد",
    }),
  },
};

module.exports = appContent;
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

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). وتتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 6: استخدام Intlayer في JavaScript الخاص بك

تعكس `vanilla-intlayer` واجهة برمجة تطبيقات `react-intlayer`: `useIntlayer(key, locale?)` تعيد المحتوى المترجم مباشرة. قم بربط `.onChange()` مع النتيجة للاشتراك في تغييرات اللغة — المعادل الصريح لإعادة العرض في React.

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

### (اختياري) الخطوة 7: تغيير لغة المحتوى الخاص بك

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

### (اختياري) الخطوة 8: عرض محتوى Markdown و HTML

يدعم Intlayer إعلانات المحتوى `md()` و `html()`. في vanilla JS، يتم إدراج المخرج المترجم كـ HTML خام عبر `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

### (اختياري) الخطوة 9: إضافة التوجيه الموطن إلى تطبيقك

لإنشاء مسارات فريدة لكل لغة (مفيد لتحسين محركات البحث)، يمكنك استخدام `intlayerProxy` في تكوين Vite الخاص بك لاكتشاف اللغة من جانب الخادم.

أولاً، أضف `intlayerProxy` إلى تكوين Vite الخاص بك:

> لاحظ أنه لاستخدام `intlayerProxy` في الإنتاج، تحتاج إلى نقل `vite-intlayer` من `devDependencies` إلى `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // يجب وضعه أولاً
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // يجب وضعه أولاً
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // يجب وضعه أولاً
    intlayer(),
  ],
});
```

### (اختياري) الخطوة 10: تغيير عنوان URL عند تغيير اللغة

لتحديث عنوان URL للمتصفح عند تغيير اللغة، استدعِ `useRewriteURL()` بعد تثبيت Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// يعيد كتابة عنوان URL فورًا وعند كل تغيير لاحق للغة.
// يعيد وظيفة إلغاء الاشتراك للتنظيف.
const stopRewriteURL = useRewriteURL();
```

### (اختياري) الخطوة 11: تبديل سمات لغة HTML والاتجاه

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

### (اختياري) الخطوة 12: تحميل القواميس ببطء حسب اللغة

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

> يتم جلب حزمة كل لغة فقط عندما تصبح تلك اللغة نشطة ويتم تخزين النتيجة مؤقتًا — التبديلات اللاحقة لنفس اللغة تكون فورية.

### (اختياري) الخطوة 13: استخراج محتوى مكوناتك

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
bunx intlayer extract
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
