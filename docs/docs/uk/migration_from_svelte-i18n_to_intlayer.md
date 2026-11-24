---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Міграція з svelte-i18n на Intlayer"
description: "Покроково перенесіть застосунок Svelte або SvelteKit з svelte-i18n на Intlayer. Stores $_, $date і $number продовжують працювати з compat adapter @intlayer/svelte-i18n."
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

# Міграція з svelte-i18n на Intlayer

## Навіщо переходити з svelte-i18n на Intlayer?

<AccordionGroup>
<Accordion header="Розмір бандла">

svelte-i18n реєструє цілі файли локалей під час запуску. Intlayer віддає лише словники, які використовує кожна сторінка, що **зменшує розмір бандлів і сторінок до 50%**.

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

1. **Compat adapter (рекомендовано для наявних застосунків)**: встановіть `@intlayer/svelte-i18n`. Він надає той самий API, що й `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…), і віддає повідомлення зі словників Intlayer. ICU MessageFormat працює як раніше.
2. **Повна міграція**: поступово замінюйте stores svelte-i18n на `useIntlayer` з `svelte-intlayer` і файли `.content.ts` поруч із компонентами.

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

> Залиште `svelte-i18n` встановленим: він надає типи TypeScript.

</Step>
<Step number={2} title="Налаштування Intlayer">

Вкажіть плагіну `syncJSON` ваші наявні файли повідомлень. За одного файлу на namespace (`src/locales/en/home.json`) кожен файл стає словником:

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

> `$_('home.title')` розв'язується в поле `title` словника `home`. Якщо ви використовуєте один файл на локаль (`src/locales/en.json`) із вкладеними namespaces, натомість вкажіть `source: ({ locale }) => \`./src/locales/${locale}.json\``: кожен ключ верхнього рівня стає словником.

</Step>
<Step number={3} title="Додавання Vite-плагіна">

`svelteI18nVitePlugin()` запускає збірку Intlayer і створює аліас `svelte-i18n` на `@intlayer/svelte-i18n`, без змін у вихідних файлах.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Для SvelteKit додайте `svelteI18nVitePlugin()` після `sveltekit()` у той самий масив `plugins`.

</Step>
<Step number={4} title="Спрощення налаштування i18n">

Залиште `init()`, але видаліть `register()` і `addMessages()`: повідомлення беруться зі словників Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Ваші компоненти продовжують працювати без змін:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Присвоєння `$locale = 'fr'` змінює мову і для stores svelte-i18n, і для `useIntlayer`.

## Повна міграція

<Steps>
<Step number={5} title="Явне перейменування імпортів (необов'язково)" isOptional={true}>

Vite-плагін уже налаштовує аліаси. Щоб зробити залежність явною:

| До                                           | Після                                                  |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Перенесення контенту у файли .content.ts" isOptional={true}>

Нові компоненти можуть використовувати нативний контент Intlayer поруч із наявними викликами svelte-i18n:

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

| Файл / шаблон                          | Чому більше не потрібен                                 |
| -------------------------------------- | ------------------------------------------------------- |
| Виклики `register()` / `addMessages()` | Словники компілює й завантажує Intlayer.                |
| `waitLocale()` перед рендерингом       | Повідомлення доступні одразу після встановлення локалі. |

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

- [Compat adapter для svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/svelte-i18n.md)
- [Плагін sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)
- [Intlayer з Vite та Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+svelte.md)
- [Intlayer з SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_svelte_kit.md)
- [Візуальний редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
