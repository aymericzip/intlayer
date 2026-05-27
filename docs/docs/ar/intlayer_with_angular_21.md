---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - كيفية ترجمة تطبيق Angular 21 (Vite) في 2026
description: اكتشف كيف تجعل موقع Angular الخاص بك متعدد اللغات. اتبع الوثائق لتدويله (i18n) وترجمته.
keywords:
  - تدويل
  - وثائق
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات Solid useIntlayer للوصول المباشر إلى الخصائص"
  - version: 8.0.0
    date: 2026-01-26
    changes: "إصدار نسخة مستقرة"
  - version: 8.0.0
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "التاريخ الأولي"
---

# ترجم موقع Angular 21 (Vite) الخاص بك باستخدام Intlayer | التدويل (i18n)

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مفتوحة المصدر ومبتكرة مصممة لتبسيط دعم تعدد اللغات في تطبيقات الويب الحديثة.

باستخدام Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس تصريحية على مستوى المكونات.
- **توطين البيانات الوصفية ديناميكيًا** والمسارات والمحتوى.
- **ضمان دعم TypeScript** مع أنواع مُنشأة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الاكتشاف الديناميكي للغة والتبديل بينها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Angular

<Tabs defaultTab="code">
  <Tab label="الرمز" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="عرض تجريبي" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-angular-21-template) على GitHub.

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
bun x intlayer init
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[تصريح المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **angular-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Angular. توفر مزودي السياق والخطافات للتدويل في Angular.

- **@angular-builders/custom-esbuild**
  مطلوبة لتخصيص تكوين esbuild الخاص بـ Angular CLI.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // اللغات الأخرى الخاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المترجمة، وإعادة التوجيه للبرمجيات الوسيطة، وأسماء ملفات تعريف الارتباط، وموقع وامتداد تصريحات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Angular الخاص بك

لدمج Intlayer مع Angular CLI، تحتاج إلى استخدام باني مخصص (custom builder). يفترض هذا الدليل أنك تستخدم Vite/esbuild (الافتراضي لمشاريع Angular 21).

أولاً، قم بتعديل `angular.json` الخاص بك لاستخدام باني esbuild المخصص. قم بتحديث تكوينات `build` و `serve`:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> تأكد من استبدال `your-app-name` بالاسم الفعلي لمشروعك في `angular.json`.

بعد ذلك، قم بإنشاء ملف `esbuild.plugins.ts` في جذر مشروعك:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> تقوم وظيفة `intlayerEsbuildPlugin` بتكوين esbuild مع Intlayer. حيث تقوم بإدخال الإضافة (plugin) للتعامل مع ملفات تصريح المحتوى وتعد إعدادات الأداء الأمثل.

> **مستخدمو NX**: تقوم أدوات بناء Angular الخاصة بـ NX بتحميل ملفات المكونات الإضافية عبر دقة ESM الأصلية لـ Node ولا تقوم بترجمة ملفات المكونات الإضافية TypeScript تلقائيًا. استخدم ملف `.mjs` بدلاً من ذلك وقم بتحديث مرجع `plugins` في `angular.json` وفقًا لذلك:
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> ثم في `angular.json` قم بالإشارة إلى `"./esbuild.plugins.mjs"` بدلاً من `"./esbuild.plugins.ts"`.

### الخطوة 4: صرح عن محتواك

أنشئ وأدِر تصريحات محتواك لتخزين الترجمات:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> يمكن تحديد تصريحات المحتوى الخاصة بك في أي مكان في تطبيقك طالما أنها مضمنة في دليل `contentDir` (افتراضيًا، `./src`). وتطابق امتداد ملف تصريح المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> لمزيد من التفاصيل، راجع [وثائق تصريح المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 5: استخدم Intlayer في كودك

لاستخدام ميزات التدويل الخاصة بـ Intlayer في جميع أنحاء تطبيق Angular الخاص بك، يجب عليك توفير Intlayer في تكوين التطبيق.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // أضف مزود Intlayer هنا
  ],
};
```

بعد ذلك، يمكنك استخدام وظيفة `useIntlayer` داخل أي مكون.

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

وفي القالب الخاص بك:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

يتم إرجاع محتوى Intlayer كـ `Signal`، لذا يمكنك الوصول إلى القيم باستدعاء الإشارة: `content().title`.

### (اختياري) الخطوة 6: تغيير لغة محتواك

لتغيير لغة محتواك، يمكنك استخدام وظيفة `setLocale` التي توفرها وظيفة `useLocale`. يتيح لك هذا تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

قم بإنشاء مكون للتبديل بين اللغات:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

ثم، استخدم هذا المكون في `app.component.ts` الخاص بك:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

### تكوين TypeScript

يستخدم Intlayer تعزيز الوحدة (Module Augmentation) للحصول على فوائد TypeScript وجعل قاعدة كودك أكثر قوة.

![إكمال تلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ ترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المُنشأة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع المُنشأة تلقائيًا
  ],
}
```

### تكوين Git

يُوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك هذا تجنب الالتزام بها (commit) في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```bash
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة تطويرك مع Intlayer، يمكنك تثبيت **إضافة Intlayer VS Code Extension** الرسمية.

[تثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [وثائق إضافة Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### اذهب أبعد من ذلك

للذهاب إلى أبعد من ذلك، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو الاستعانة بمصادر خارجية لمحتواك باستخدام [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---
