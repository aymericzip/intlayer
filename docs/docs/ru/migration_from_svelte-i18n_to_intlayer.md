---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Миграция с svelte-i18n на Intlayer"
description: "Пошагово перенесите приложение Svelte или SvelteKit с svelte-i18n на Intlayer. Stores $_, $date и $number продолжают работать с compat adapter @intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Миграция с svelte-i18n на Intlayer

## Зачем переходить с svelte-i18n на Intlayer?

<AccordionGroup>
<Accordion header="Размер бандла">

svelte-i18n регистрирует целые файлы локалей при запуске. Intlayer отдаёт только словари, используемые каждой страницей, что **уменьшает размер бандлов и страниц до 50%**.

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

1. **Compat adapter (рекомендуется для существующих приложений)**: установите `@intlayer/svelte-i18n`. Он предоставляет тот же API, что и `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…), и отдаёт сообщения из словарей Intlayer. ICU MessageFormat работает как раньше.
2. **Полная миграция**: постепенно заменяйте stores svelte-i18n на `useIntlayer` из `svelte-intlayer` и файлы `.content.ts` рядом с компонентами.

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
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Оставьте `svelte-i18n` установленным: он предоставляет типы TypeScript.

</Step>
<Step number={2} title="Настройка Intlayer">

Укажите плагину `syncJSON` ваши существующие файлы сообщений. При одном файле на namespace (`src/locales/en/home.json`) каждый файл становится словарём:

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` разрешается в поле `title` словаря `home`. Если вы используете один файл на локаль (`src/locales/en.json`) с вложенными namespaces, укажите вместо этого `source: ({ locale }) => \`./src/locales/${locale}.json\``: каждый ключ верхнего уровня становится словарём.

</Step>
<Step number={3} title="Добавление Vite-плагина">

`svelteI18nVitePlugin()` запускает сборку Intlayer и создаёт алиас `svelte-i18n` на `@intlayer/svelte-i18n`, без изменений в исходных файлах.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Для SvelteKit добавьте `svelteI18nVitePlugin()` после `sveltekit()` в тот же массив `plugins`.

</Step>
<Step number={4} title="Упрощение настройки i18n">

Оставьте `init()`, но удалите `register()` и `addMessages()`: сообщения берутся из словарей Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Ваши компоненты продолжают работать без изменений:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Присваивание `$locale = 'fr'` меняет язык и для stores svelte-i18n, и для `useIntlayer`.

## Полная миграция

<Steps>
<Step number={5} title="Явное переименование импортов (необязательно)" isOptional={true}>

Vite-плагин уже настраивает алиасы. Чтобы сделать зависимость явной:

| До                                           | После                                                  |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Перенос контента в файлы .content.ts" isOptional={true}>

Новые компоненты могут использовать нативный контент Intlayer рядом с существующими вызовами svelte-i18n:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
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

| Файл / шаблон                         | Почему больше не нужен                           |
| ------------------------------------- | ------------------------------------------------ |
| Вызовы `register()` / `addMessages()` | Словари компилирует и загружает Intlayer.        |
| `waitLocale()` перед рендерингом      | Сообщения доступны сразу после установки локали. |

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

- [Compat adapter для svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/svelte-i18n.md)
- [Плагин sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md)
- [Intlayer с Vite и Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+svelte.md)
- [Intlayer с SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_svelte_kit.md)
- [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
