---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: كيفية ترجمة تطبيق Angular – دليل i18n 2025
description: اكتشف كيفية جعل موقعك الإلكتروني باستخدام Angular متعدد اللغات. اتبع الوثائق لتدويله (i18n) وترجمته.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية التاريخ
---

# ترجم Angular باستخدام Intlayer | التدويل (i18n)

> هذه الحزمة قيد التطوير. راجع [المشكلة](https://github.com/aymericzip/intlayer/issues/116) لمزيد من المعلومات. أظهر اهتمامك بـ Intlayer لـ Angular من خلال الإعجاب بالمشكلة

<!-- راجع [نموذج التطبيق](https://github.com/aymericzip/intlayer-angular-template) على GitHub. -->

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر تهدف إلى تبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكونات.
- **توطين البيانات الوصفية والمسارات والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** من خلال أنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من ميزات متقدمة** مثل الكشف الديناميكي عن اللغة وتبديلها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Angular

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/webpack
bunx intlayer init
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)، التحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **angular-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Angular. توفر موفري السياق وخطافات التدويل الخاصة بـ Angular.

- **@intlayer/webpack**
  الحزمة التي تدمج Intlayer مع Webpack. تُستخدم بواسطة Angular CLI لبناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغات أخرى خاصة بك
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
      // لغات أخرى خاصة بك
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
      // لغات أخرى خاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Angular الخاص بك

لدمج Intlayer مع Angular CLI، لديك خياران حسب الباني الذي تستخدمه: `esbuild` أو `webpack`.

#### الخيار 1: استخدام esbuild (موصى به)

أولاً، قم بتعديل ملف `angular.json` لاستخدام الباني المخصص esbuild. حدّث تكوين `build`:

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المحلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Angular الخاص بك

لدمج Intlayer مع Angular CLI، لديك خياران حسب الباني الذي تستخدمه: `esbuild` أو `webpack`.

#### الخيار 1: استخدام esbuild (موصى به)

أولاً، عدل ملف `angular.json` لاستخدام الباني المخصص esbuild. حدّث تكوين `build`:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
```

> تأكد من استبدال `your-app-name` باسم مشروعك الفعلي في `angular.json`.

بعد ذلك، أنشئ ملف `esbuild/intlayer-plugin.ts` في جذر مشروعك:

```typescript fileName="esbuild/intlayer-plugin.ts"
import { prepareIntlayer, watch } from "@intlayer/chokidar";
import { getConfiguration, logger } from "@intlayer/config";
import type { Plugin } from "esbuild";

const intlayer: Plugin = {
  name: "intlayer-esbuild-plugin",
  setup(build) {
    const configuration = getConfiguration();
    let isWatching = false;

    build.onStart(async () => {
      logger("تم بدء مكون Intlayer الإضافي لـ esbuild", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("تم تفعيل وضع المراقبة. بدء المراقب...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`خطأ في مكون Intlayer الإضافي لـ esbuild: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> يضمن مكون `intlayer` الخاص بـ esbuild تجهيز Intlayer قبل بدء البناء ومراقبة التغييرات في وضع التطوير.

#### الخيار 2: استخدام Webpack

أولاً، قم بتعديل ملف `angular.json` لاستخدام منشئ Webpack المخصص. حدّث تكوينات `build` و `serve`:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server"
        }
      }
    }
  }
}
```

> تأكد من استبدال `your-app-name` بالاسم الفعلي لمشروعك في ملف `angular.json`.

بعد ذلك، أنشئ ملف `webpack.config.js` في جذر مشروعك:

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> يُستخدم `IntlayerWebpackPlugin` لدمج Intlayer مع Webpack. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يعرّف متغيرات بيئة Intlayer داخل التطبيق. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى لتخزين الترجمات:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
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
      ar: "تهانينا! تطبيقك يعمل. 🎉",
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      ar: "استكشف الوثائق",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      ar: "تعلم من خلال الدروس",
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "وثائق CLI",
    angularLanguageService: t({
      ar: "خدمة لغة Angular",
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "أدوات تطوير Angular",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان داخل تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

### الخطوة 5: استخدام Intlayer في الكود الخاص بك

لاستخدام ميزات التدويل في Intlayer عبر تطبيق Angular الخاص بك، تحتاج إلى استخدام دالة `useIntlayer` داخل مكون. توفر هذه الدالة، المتاحة من `angular-intlayer`، الوصول إلى ترجماتك كإشارات تفاعلية.
`IntlayerProvider` مسجل في جذر التطبيق، لذلك لا تحتاج إلى إضافته إلى مزودي الوحدة النمطية الخاصة بك.

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في فئة المكون الخاص بك:

```typescript fileName="src/app/hello-world.component.ts"
import { Component, signal } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-hello-world",
  standalone: true,
  template: `
    <h1>{{ content().title }}</h1>

    <div class="card">
      <button type="button" (click)="increment()">
        {{ content().count }} {{ count() }}
      </button>
      <p [innerHTML]="content().edit"></p>
    </div>

    <p class="read-the-docs">{{ content().readTheDocs }}</p>
  `,
})
export class HelloWorldComponent {
  content = useIntlayer("helloworld");
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
```

يتم إرجاع محتوى Intlayer كـ `Signal`، لذا يمكنك الوصول إلى القيم عن طريق استدعاء الإشارة في القالب الخاص بك: `content().title`.

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام دالة `setLocale` التي توفرها دالة `useLocale`. هذا يسمح لك بتعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

أنشئ مكونًا للتبديل بين اللغات:

````typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { getLocaleName } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeInfo = useLocale();
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // عرض getLocaleName في القالب
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
ثم، استخدم هذا المكون في ملف `app.component.ts` الخاص بك:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { HelloWorldComponent } from "./hello-world.component";
import { LocaleSwitcherComponent } from "./components/locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HelloWorldComponent, LocaleSwitcherComponent],
  template: `
    <div>
      <app-locale-switcher />
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Angular logo"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
````

### (اختياري) الخطوة 7: إضافة التوجيه المحلي إلى تطبيقك

إضافة التوجيه المحلي في تطبيق Angular تتطلب استخدام Angular Router مع بادئات اللغة (locale prefixes). هذا ينشئ مسارات فريدة لكل لغة، وهو مفيد لتحسين محركات البحث (SEO).

مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

أولاً، تأكد من تثبيت `@angular/router`.

ثم، أنشئ تكوين التوجيه الذي يتعامل مع التوجيه بناءً على اللغة في الملف `app.routes.ts`.

```typescript fileName="src/app/app.routes.ts"
import { Routes } from "@angular/router";
import { configuration, localeFlatMap } from "intlayer";
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root/root.component";

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  localeFlatMap((localizedData) => [
    {
      path: `${localizedData.urlPrefix}`,
      component: RootComponent,
      data: { locale: localizedData.locale },
    },
    {
      path: `${localizedData.urlPrefix}/home`,
      component: HomeComponent,
      data: { locale: localizedData.locale },
    },
  ]),
  { path: "**", redirectTo: `/${defaultLocale}/home` },
];
```

ثم، تحتاج إلى توفير الراوتر في ملف `app.config.ts` الخاص بك.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (اختياري) الخطوة 8: تغيير عنوان URL عند تغيير اللغة

لتحديث عنوان URL تلقائيًا عند تغيير المستخدم للغة، يمكنك تعديل مكون `LocaleSwitcher` لاستخدام موجه Angular:

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });

  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

### (اختياري) الخطوة 9: تبديل سمات اللغة والاتجاه في وسم HTML

عندما يدعم تطبيقك عدة لغات، من الضروري تحديث سمات `lang` و `dir` في وسم `<html>` لتتوافق مع اللغة الحالية.

يمكنك إنشاء خدمة للتعامل مع هذا تلقائيًا.

````typescript fileName="src/app/services/i18n-html-attributes.service.ts"
import { Injectable, effect } from "@angular/core";
import { useLocale } from "angular-intlayer";
import { getHTMLTextDir } from "intlayer";

@Injectable({
  providedIn: "root",
})
export class I18nHtmlAttributesService {
  private localeInfo = useLocale();

  constructor() {
    effect(() => {
      const newLocale = this.localeInfo.locale();
      if (newLocale) {
        document.documentElement.lang = newLocale;
ثم قم بحقن وتهيئة هذه الخدمة في المكون الرئيسي `AppComponent` الخاص بك:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... استيرادات أخرى
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ...
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init();
  }
}
````

### (اختياري) الخطوة 10: إنشاء توجيه رابط محلي

لضمان أن تتوافق تنقلات تطبيقك مع اللغة الحالية، يمكنك إنشاء توجيه مخصص. يقوم هذا التوجيه تلقائيًا بإضافة بادئة اللغة الحالية إلى عناوين URL الداخلية.

```typescript fileName="src/app/directives/localized-link.directive.ts"
import { Directive, Input, HostBinding, inject } from "@angular/core";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";

@Directive({
  selector: "a[appLocalizedLink]",
  standalone: true,
})
export class LocalizedLinkDirective {
  @Input("href") originalHref: string = "";

  private localeInfo = useLocale();

  @HostBinding("href")
  get localizedHref(): string {
    const locale = this.localeInfo.locale();
    const isExternalLink = /^https?:\/\//.test(this.originalHref);
    if (isExternalLink || !this.originalHref) {
      return this.originalHref;
    }

    return getLocalizedUrl(this.originalHref, locale);
  }
}
```

لاستخدامها، أضف التوجيه `appLocalizedLink` إلى علامات الرابط الخاصة بك وتأكد من استيراده في المكون الخاص بك.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>الرئيسية</a> `,
})
export class AppComponent {}
```

### (اختياري) الخطوة 11: عرض Markdown

يدعم Intlayer عرض محتوى Markdown. لتحويل Markdown إلى HTML غني، يمكنك دمج [markdown-it](https://github.com/markdown-it/markdown-it).

أولاً، قم بتثبيت `markdown-it`:

```bash
npm install markdown-it
# وأنواعها
npm install -D @types/markdown-it
```

بعد ذلك، قم بتكوين `INTLAYER_MARKDOWN_TOKEN` في ملف `app.config.ts` الخاص بك.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export const appConfig: ApplicationConfig = {
  providers: [provideIntlayerMarkdown(md)],
};
```

By default, Intlayer will return the rendered HTML as a string. If you use `[innerHTML]` to bind it, be aware of the security implications (XSS). Always ensure your content is from a trusted source.

For more complex scenarios, you can create a pipe to safely render the HTML.

### تكوين TypeScript

يستخدم Intlayer توسيع الوحدات (module augmentation) للاستفادة من TypeScript وجعل قاعدة الشيفرة الخاصة بك أقوى.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف الفوري عن الأخطاء** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### التعمق أكثر

للتعمق أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج المحتوى الخاص بك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---
