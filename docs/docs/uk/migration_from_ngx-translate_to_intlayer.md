---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Міграція з ngx-translate на Intlayer"
description: "Покроково перенесіть Angular-застосунок з ngx-translate на Intlayer. Pipe translate, директива translate і TranslateService продовжують працювати з compat adapter @intlayer/ngx-translate."
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

# Міграція з ngx-translate на Intlayer

## Навіщо переходити з ngx-translate на Intlayer?

<AccordionGroup>
<Accordion header="Без HTTP-завантажувача">

ngx-translate завантажує файли локалей у runtime через `TranslateHttpLoader`, що затримує перший рендер. Intlayer компілює словники під час збірки, тож переклади доступні одразу.

</Accordion>
<Accordion header="Підтримуваність">

Ключі **типізовані** за вашими словниками: неправильні ключі спричиняють помилку під час збірки. Контент може лежати поруч із компонентами, які його використовують.

</Accordion>
<Accordion header="ШІ-агент">

Контент поруч із компонентами **зменшує потрібний контекст** для LLM. Intlayer постачається з **CLI** для пошуку відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP-сервером](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**.

</Accordion>
<Accordion header="Автоматизація">

Перекладайте відсутні повідомлення в CI/CD-пайплайні за допомогою обраної вами LLM або у фоні через [вебплатформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

</Accordion>
<Accordion header="Масштабування з не-розробниками">

Intlayer надає self-hosted **[візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)** і **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)**, щоб перекладачі й копірайтери редагували контент у реальному часі.

</Accordion>
</AccordionGroup>

> Щоб зрозуміти, звідки з'явилися ці бібліотеки, прочитайте [історію i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md).

## Стратегії міграції

1. **Compat adapter (рекомендовано для наявних застосунків)**: встановіть `@intlayer/ngx-translate`. Він надає той самий API, що й `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`), і віддає повідомлення зі словників Intlayer. Ваші шаблони залишаються без змін.
2. **Повна міграція**: поступово замінюйте виклики ngx-translate на `useIntlayer` з `angular-intlayer` і файли `.content.ts` поруч із компонентами.

## Зміст

<TOC/>

## Швидка міграція

<Steps>
<Step number={1} title="Встановлення залежностей">

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

> Прапорець `--interactive` необов'язковий. Використовуйте `intlayer-cli init`, якщо ви ШІ-агент.

Команда визначає ваше середовище та встановлює потрібні packages, наприклад:

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

> Залиште `@ngx-translate/core` встановленим: він надає типи TypeScript. `@ngx-translate/http-loader` можна видалити.

</Step>
<Step number={2} title="Налаштування Intlayer">

Вкажіть плагіну `syncJSON` ваші наявні файли перекладів. За одного файлу на namespace (`src/i18n/en/home.json`) кожен файл стає словником:

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

> `'home.title' | translate` розв'язується в поле `title` словника `home`. Якщо ви використовуєте один файл на локаль (`src/assets/i18n/en.json`) із вкладеними ключами, натомість вкажіть `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: кожен ключ верхнього рівня стає словником.

</Step>
<Step number={3} title="Додавання esbuild-плагіна">

Angular CLI приймає esbuild-плагіни через `@angular-builders/custom-esbuild`. Створіть файл плагінів:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Потім вкажіть його в `angular.json`:

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

Плагін запускає збірку Intlayer і перенаправляє `@ngx-translate/core` на `@intlayer/ngx-translate`, без змін у вихідних файлах.

> Збираєте через Vite (Analog)? Натомість використовуйте `ngxTranslateVitePlugin()` з `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="Видалення HTTP-завантажувача">

Залиште `provideTranslateService()`, але приберіть опцію `loader`: повідомлення беруться зі словників Intlayer.

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

> Переклади більше не проходять через завантажувач, тож `TranslateHttpLoader` і `@ngx-translate/http-loader` можна видалити.

</Step>
</Steps>

Ваші шаблони й сервіси продовжують працювати без змін:

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

## Повна міграція

<Steps>
<Step number={5} title="Явне перейменування імпортів (необов'язково)" isOptional={true}>

esbuild-плагін уже налаштовує аліаси. Щоб зробити залежність явною:

| До                                                              | Після                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Перенесення контенту у файли .content.ts" isOptional={true}>

Нові компоненти можуть використовувати нативний контент Intlayer поруч із наявними викликами ngx-translate. Зареєструйте `provideIntlayer()` з `angular-intlayer` поруч із `provideTranslateService()` в `app.config.ts`, потім:

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
<Step number={7} title="Увімкнення перекладу за допомогою ШІ" isOptional={true}>

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

Заповнені переклади записуються назад у ваші JSON-файли. Налаштування ШІ описано в [документації CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

</Step>
</Steps>

## Що можна видалити після міграції

| Файл / шаблон                                                     | Чому більше не потрібен                              |
| ----------------------------------------------------------------- | ---------------------------------------------------- |
| `TranslateHttpLoader` / власні завантажувачі                      | Словники компілює й завантажує Intlayer.             |
| `@ngx-translate/http-loader`                                      | Файли перекладів більше не завантажуються в runtime. |
| `provideHttpClient()` (якщо використовується лише для перекладів) | З тієї ж причини.                                    |

## Налаштування TypeScript

Додайте згенеровані типи до `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Налаштування Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter для ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/ngx-translate.md)
- [Плагін sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)
- [Intlayer з Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md)
- [Візуальний редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
