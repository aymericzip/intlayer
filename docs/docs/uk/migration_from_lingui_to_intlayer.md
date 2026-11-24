---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Міграція з Lingui на Intlayer"
description: "Покроково перенесіть React-застосунок з Lingui на Intlayer. Макроси Lingui, useLingui та <Trans> продовжують працювати з compat adapter @intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Міграція з Lingui на Intlayer

## Навіщо переходити з Lingui на Intlayer?

<AccordionGroup>
<Accordion header="Розмір бандла">

Lingui завантажує один скомпільований каталог на локаль з усіма повідомленнями застосунку. Intlayer розбиває контент за словниками й віддає лише те, що використовує кожна сторінка, що **зменшує розмір бандлів і сторінок до 50%**.

</Accordion>
<Accordion header="Підтримуваність">

Словники Intlayer **повністю типізовані** й можуть лежати поруч із компонентами, які їх використовують. Не потрібно пам'ятати про кроки `extract` / `compile`: словники збирає плагін бандлера.

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

1. **Compat adapter (рекомендовано для наявних застосунків)**: встановіть `@intlayer/lingui`. Він надає той самий API, що й `@lingui/core` та `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`), і віддає повідомлення зі словників Intlayer. Ваші макроси (`` t`…` ``, `<Trans>`, `msg`, `plural`) компілюються так само, як і раніше.
2. **Повна міграція**: поступово замінюйте виклики Lingui на `useIntlayer` і файли `.content.ts` поруч із компонентами.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Залиште встановленими `@lingui/core`, `@lingui/react` і плагін макросів (`@lingui/babel-plugin-lingui-macro` або `@lingui/swc-plugin`). Макроси й далі виконуються, а packages Lingui надають типи TypeScript.

</Step>
<Step number={2} title="Налаштування Intlayer">

Intlayer використовує ваші каталоги Lingui як джерело істини. За стандартної структури Lingui (`src/locales/{locale}/messages.po`) вкажіть на них плагін `syncPO`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="Використання JSON-каталогів">

З `@lingui/format-json` використовуйте `syncJSON` із форматом ICU:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Використовуйте явні id повідомлень (`t({ id: "hero.title", message: "Welcome" })` або `<Trans id="hero.title">`). Id, згенеровані з вихідного тексту, не зіставляються з каталогами.

</Step>
<Step number={3} title="Заміна Vite-плагіна Lingui">

Замініть `@lingui/vite-plugin` на `@intlayer/lingui/plugin`. Ім'я залишається `lingui()`: плагін запускає збірку Intlayer і створює аліаси `@lingui/core` та `@lingui/react` на `@intlayer/lingui`, без змін у вихідних файлах.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Залиште плагін макросів у React-плагіні (Babel або `@lingui/swc-plugin`), щоб макроси компілювалися у виклики `i18n._()` до того, як Intlayer їх обробить.

</Step>
</Steps>

Ваші компоненти продовжують працювати без змін:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

Зміна локалі, як і раніше, виконується через `i18n.activate(locale)`, який оновлює всіх споживачів `useLingui()`.

## Повна міграція

<Steps>
<Step number={4} title="Видалення завантаження каталогів у runtime" isOptional={true}>

Тепер повідомлення беруться зі словників Intlayer, скомпільованих під час збірки. Виклики `i18n.load()` / `i18n.loadAndActivate()` слугують лише fallback і виводять попередження в режимі розробки. Замініть їх на `i18n.activate(locale)` і приберіть крок `lingui compile`. Залиште `lingui extract` для збирання нових id повідомлень.

</Step>
<Step number={5} title="Явне перейменування імпортів (необов'язково)" isOptional={true}>

Vite-плагін уже налаштовує аліаси. Щоб зробити залежність явною:

| До                                                 | Після                                                 |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Перенесення контенту у файли .content.ts" isOptional={true}>

Нові компоненти можуть використовувати нативний контент Intlayer поруч із наявними викликами Lingui:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
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

Заповнені переклади записуються назад у ваші каталоги Lingui. Налаштування ШІ описано в [документації CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

</Step>
</Steps>

## Що можна видалити після міграції

| Файл / шаблон                                   | Чому більше не потрібен                                   |
| ----------------------------------------------- | --------------------------------------------------------- |
| `i18n.load()` / динамічні імпорти каталогів     | Словники компілює й завантажує Intlayer.                  |
| `lingui compile` і скомпільовані `.js`-каталоги | Intlayer збирає словники безпосередньо з ваших каталогів. |
| `@lingui/vite-plugin`                           | Замінено на `lingui()` з `@intlayer/lingui/plugin`.       |

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

- [Compat adapter для Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md)
- [Плагін sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md)
- [Intlayer з Vite та React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)
- [Візуальний редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
