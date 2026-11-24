---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "الترحيل من ngx-translate إلى Intlayer"
description: "رحّل تطبيق Angular من ngx-translate إلى Intlayer خطوة بخطوة. تستمر أنبوب translate وتوجيه translate وTranslateService في العمل مع compat adapter ‏@intlayer/ngx-translate."
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# الترحيل من ngx-translate إلى Intlayer

## لماذا الترحيل من ngx-translate إلى Intlayer؟

<AccordionGroup>
<Accordion header="بدون محمّل HTTP">

يجلب ngx-translate ملفات الـ locale وقت التشغيل عبر `TranslateHttpLoader`، مما يؤخر العرض الأول. يصرّف Intlayer القواميس وقت البناء، فتكون الترجمات متاحة فورًا.

</Accordion>
<Accordion header="سهولة الصيانة">

المفاتيح **مُنمَّطة** وفق قواميسك: تفشل المفاتيح غير الصالحة أثناء البناء. يمكن وضع المحتوى بجوار المكوّنات التي تستخدمه.

</Accordion>
<Accordion header="وكيل الذكاء الاصطناعي">

المحتوى الموضوع بجوار المكوّنات **يقلل السياق المطلوب** للنماذج اللغوية الكبيرة. يوفر Intlayer أداة **CLI** لاختبار الترجمات الناقصة، و**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**، و**[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)** و**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**.

</Accordion>
<Accordion header="الأتمتة">

ترجم الرسائل الناقصة في خط CI/CD باستخدام النموذج اللغوي الذي تختاره، أو في الخلفية عبر [منصة الويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

</Accordion>
<Accordion header="التوسع مع غير المطورين">

يوفر Intlayer **[محررًا مرئيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)** قابلًا للاستضافة الذاتية و**[CMS كاملًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)** ليتمكن المترجمون وكتّاب المحتوى من تعديل المحتوى في الوقت الفعلي.

</Accordion>
</AccordionGroup>

> لفهم أصل هذه المكتبات، اقرأ [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md).

## استراتيجيات الترحيل

1. **Compat adapter (موصى به للتطبيقات القائمة)**: ثبّت `@intlayer/ngx-translate`. يعرض نفس واجهة API الخاصة بـ `@ngx-translate/core` (`provideTranslateService` و`TranslateService` و`TranslatePipe` و`TranslateDirective` و`TranslateModule`) ويقدم الرسائل من قواميس Intlayer. تبقى قوالبك دون تغيير.
2. **الترحيل الكامل**: استبدل استدعاءات ngx-translate تدريجيًا بـ `useIntlayer` من `angular-intlayer` وملفات `.content.ts` بجوار مكوّناتك.

## جدول المحتويات

<TOC/>

## الترحيل السريع

<Steps>
<Step number={1} title="تثبيت الاعتماديات">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> الخيار `--interactive` اختياري. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

يكتشف الأمر بيئتك ويثبّت الحزم المطلوبة، على سبيل المثال:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> أبقِ `@ngx-translate/core` مثبّتًا: فهو يوفر أنواع TypeScript. يمكن إزالة `@ngx-translate/http-loader`.

</Step>
<Step number={2} title="إعداد Intlayer">

وجّه إضافة `syncJSON` إلى ملفات الترجمة الحالية. مع ملف واحد لكل namespace ‏(`src/i18n/en/home.json`)، يصبح كل ملف قاموسًا:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> يُحلّ `'home.title' | translate` إلى الحقل `title` من القاموس `home`. إذا كنت تستخدم ملفًا واحدًا لكل locale ‏(`src/assets/i18n/en.json`) مع مفاتيح متداخلة، فاستخدم بدلًا من ذلك `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: يصبح كل مفتاح من المستوى الأعلى قاموسًا.

</Step>
<Step number={3} title="إضافة إضافة esbuild">

يقبل Angular CLI إضافات esbuild عبر `@angular-builders/custom-esbuild`. أنشئ ملف إضافات:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

ثم أشر إليه في `angular.json`:

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

تشغّل الإضافة بناء Intlayer وتحلّ `@ngx-translate/core` إلى `@intlayer/ngx-translate`، دون أي تغيير في ملفات المصدر.

> تبني باستخدام Vite (Analog)؟ استخدم بدلًا من ذلك `ngxTranslateVitePlugin()` من `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="إزالة محمّل HTTP">

أبقِ `provideTranslateService()`، لكن احذف الخيار `loader`: تأتي الرسائل من قواميس Intlayer.

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> لم تعد الترجمات تمر عبر محمّل، لذا يمكن إزالة `TranslateHttpLoader` و`@ngx-translate/http-loader`.

</Step>
</Steps>

تستمر قوالبك وخدماتك في العمل دون تغيير:

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## الترحيل الكامل

<Steps>
<Step number={5} title="إعادة تسمية الـ imports صراحةً (اختياري)" isOptional={true}>

تتولى إضافة esbuild الأسماء المستعارة بالفعل. لجعل الاعتمادية صريحة:

| قبل                                                             | بعد                                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="نقل المحتوى إلى ملفات .content.ts" isOptional={true}>

يمكن للمكوّنات الجديدة استخدام محتوى Intlayer الأصلي جنبًا إلى جنب مع استدعاءات ngx-translate الحالية. سجّل `provideIntlayer()` من `angular-intlayer` بجوار `provideTranslateService()` في `app.config.ts`، ثم:

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
```

</Step>
<Step number={7} title="تفعيل الترجمة بالذكاء الاصطناعي" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

تُكتب الترجمات المكتملة في ملفات JSON الخاصة بك. راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) لإعداد الذكاء الاصطناعي.

</Step>
</Steps>

## ما يمكنك حذفه بعد الترحيل

| الملف / النمط                                      | لماذا لم يعد مطلوبًا                      |
| -------------------------------------------------- | ---------------------------------------- |
| `TranslateHttpLoader` / المحمّلات المخصصة            | يصرّف Intlayer القواميس ويحمّلها.          |
| `@ngx-translate/http-loader`                       | لا مزيد من جلب ملفات الترجمة وقت التشغيل. |
| `provideHttpClient()` (إن كان يُستخدم للترجمات فقط) | السبب نفسه.                              |

## إعداد TypeScript

أدرج الأنواع المولّدة في `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## إعداد Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [ngx-translate compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/ngx-translate.md)
- [إضافة sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)
- [Intlayer مع Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_angular_21.md)
- [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
