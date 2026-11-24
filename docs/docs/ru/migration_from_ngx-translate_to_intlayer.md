---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Миграция с ngx-translate на Intlayer"
description: "Пошагово перенесите Angular-приложение с ngx-translate на Intlayer. Pipe translate, директива translate и TranslateService продолжают работать с compat adapter @intlayer/ngx-translate."
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

# Миграция с ngx-translate на Intlayer

## Зачем переходить с ngx-translate на Intlayer?

<AccordionGroup>
<Accordion header="Без HTTP-загрузчика">

ngx-translate загружает файлы локалей в runtime через `TranslateHttpLoader`, что задерживает первый рендер. Intlayer компилирует словари при сборке, поэтому переводы доступны сразу.

</Accordion>
<Accordion header="Поддерживаемость">

Ключи **типизированы** по вашим словарям: неверные ключи приводят к ошибке при сборке. Контент может лежать рядом с компонентами, которые его используют.

</Accordion>
<Accordion header="ИИ-агент">

Контент рядом с компонентами **уменьшает необходимый контекст** для LLM. Intlayer поставляется с **CLI** для поиска недостающих переводов, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**, **[MCP-сервером](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)** и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**.

</Accordion>
<Accordion header="Автоматизация">

Переводите недостающие сообщения в CI/CD-пайплайне с помощью выбранной вами LLM или в фоне через [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

</Accordion>
<Accordion header="Масштабирование с не-разработчиками">

Intlayer предоставляет self-hosted **[визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)** и **[полноценную CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)**, чтобы переводчики и копирайтеры редактировали контент в реальном времени.

</Accordion>
</AccordionGroup>

> Чтобы понять, откуда появились эти библиотеки, прочитайте [историю i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md).

## Стратегии миграции

1. **Compat adapter (рекомендуется для существующих приложений)**: установите `@intlayer/ngx-translate`. Он предоставляет тот же API, что и `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`), и отдаёт сообщения из словарей Intlayer. Ваши шаблоны остаются без изменений.
2. **Полная миграция**: постепенно заменяйте вызовы ngx-translate на `useIntlayer` из `angular-intlayer` и файлы `.content.ts` рядом с компонентами.

## Содержание

<TOC/>

## Быстрая миграция

<Steps>
<Step number={1} title="Установка зависимостей">

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

> Флаг `--interactive` необязателен. Используйте `intlayer-cli init`, если вы ИИ-агент.

Команда определяет ваше окружение и устанавливает нужные packages, например:

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

> Оставьте `@ngx-translate/core` установленным: он предоставляет типы TypeScript. `@ngx-translate/http-loader` можно удалить.

</Step>
<Step number={2} title="Настройка Intlayer">

Укажите плагину `syncJSON` ваши существующие файлы переводов. При одном файле на namespace (`src/i18n/en/home.json`) каждый файл становится словарём:

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

> `'home.title' | translate` разрешается в поле `title` словаря `home`. Если вы используете один файл на локаль (`src/assets/i18n/en.json`) с вложенными ключами, укажите вместо этого `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: каждый ключ верхнего уровня становится словарём.

</Step>
<Step number={3} title="Добавление esbuild-плагина">

Angular CLI принимает esbuild-плагины через `@angular-builders/custom-esbuild`. Создайте файл плагинов:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Затем укажите его в `angular.json`:

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

Плагин запускает сборку Intlayer и перенаправляет `@ngx-translate/core` на `@intlayer/ngx-translate`, без изменений в исходных файлах.

> Собираете через Vite (Analog)? Используйте вместо этого `ngxTranslateVitePlugin()` из `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="Удаление HTTP-загрузчика">

Оставьте `provideTranslateService()`, но уберите опцию `loader`: сообщения берутся из словарей Intlayer.

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

> Переводы больше не проходят через загрузчик, поэтому `TranslateHttpLoader` и `@ngx-translate/http-loader` можно удалить.

</Step>
</Steps>

Ваши шаблоны и сервисы продолжают работать без изменений:

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

## Полная миграция

<Steps>
<Step number={5} title="Явное переименование импортов (необязательно)" isOptional={true}>

esbuild-плагин уже настраивает алиасы. Чтобы сделать зависимость явной:

| До                                                              | После                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Перенос контента в файлы .content.ts" isOptional={true}>

Новые компоненты могут использовать нативный контент Intlayer рядом с существующими вызовами ngx-translate. Зарегистрируйте `provideIntlayer()` из `angular-intlayer` рядом с `provideTranslateService()` в `app.config.ts`, затем:

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
<Step number={7} title="Включение перевода с помощью ИИ" isOptional={true}>

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

Заполненные переводы записываются обратно в ваши JSON-файлы. Настройка ИИ описана в [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

</Step>
</Steps>

## Что можно удалить после миграции

| Файл / шаблон                                                  | Почему больше не нужен                           |
| -------------------------------------------------------------- | ------------------------------------------------ |
| `TranslateHttpLoader` / собственные загрузчики                 | Словари компилирует и загружает Intlayer.        |
| `@ngx-translate/http-loader`                                   | Файлы переводов больше не загружаются в runtime. |
| `provideHttpClient()` (если используется только для переводов) | По той же причине.                               |

## Настройка TypeScript

Добавьте сгенерированные типы в `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Настройка Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter для ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/ngx-translate.md)
- [Плагин sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md)
- [Intlayer с Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_angular_21.md)
- [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
