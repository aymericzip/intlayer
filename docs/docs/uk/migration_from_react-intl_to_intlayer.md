---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Міграція з react-intl (FormatJS) на Intlayer"
description: "Покроково перенесіть React-застосунок з react-intl на Intlayer. useIntl, FormattedMessage і всі компоненти Formatted* продовжують працювати з compat adapter @intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Міграція з react-intl (FormatJS) на Intlayer

## Навіщо переходити з react-intl на Intlayer?

<AccordionGroup>
<Accordion header="Розмір бандла">

У react-intl усі повідомлення локалі передаються в `IntlProvider`, тож кожна сторінка несе весь каталог. Intlayer віддає лише словники, які використовує кожна сторінка, що **зменшує розмір бандлів і сторінок до 50%**.

</Accordion>
<Accordion header="Підтримуваність">

Id повідомлень **типізовані** за вашими словниками: неправильні id спричиняють помилку під час збірки. Контент може лежати поруч із компонентами, які його використовують.

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

1. **Compat adapter (рекомендовано для наявних застосунків)**: встановіть `@intlayer/react-intl`. Він надає той самий API, що й `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…), і віддає повідомлення зі словників Intlayer. ICU MessageFormat, множина, select і rich text-теги працюють як раніше.
2. **Повна міграція**: поступово замінюйте виклики react-intl на `useIntlayer` і файли `.content.ts` поруч із компонентами.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Залиште `react-intl` встановленим: він надає типи TypeScript.

</Step>
<Step number={2} title="Налаштування Intlayer">

Вкажіть плагіну `syncJSON` ваші наявні файли повідомлень. Каталоги react-intl є пласкими map з id через крапку:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> Перший сегмент кожного id (`home`) стає словником Intlayer, тож кожна сторінка завантажує лише потрібні їй словники. Коли Intlayer записує переклади назад, файл зберігає пласку структуру.

</Step>
<Step number={3} title="Додавання Vite-плагіна">

`reactIntlVitePlugin()` запускає збірку Intlayer і створює аліас `react-intl` на `@intlayer/react-intl`, без змін у вихідних файлах.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Використовуєте інший бандлер? Перейменуйте імпорти на `@intlayer/react-intl` (див. крок 5) і використовуйте плагін Intlayer для вашого бандлера, наприклад `withIntlayer` з `next-intlayer` для Next.js.

</Step>
<Step number={4} title="Більше не передавайте повідомлення в IntlProvider">

`IntlProvider` продовжує працювати, але повідомлення тепер завантажує Intlayer. Видаліть prop `messages` та імпорт каталогу:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Якщо `messages` усе ще передається, його буде проігноровано, а в режимі розробки з'явиться попередження.

</Step>
</Steps>

Ваші компоненти продовжують працювати без змін, з типізованими id:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Повна міграція

<Steps>
<Step number={5} title="Явне перейменування імпортів (необов'язково)" isOptional={true}>

Vite-плагін уже налаштовує аліаси. Щоб зробити залежність явною:

| До                                              | Після                                                     |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Перенесення контенту у файли .content.ts" isOptional={true}>

Нові компоненти можуть використовувати нативний контент Intlayer поруч із наявними викликами react-intl:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

Заповнені переклади записуються назад у ваші JSON-файли. Налаштування ШІ описано в [документації CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

</Step>
</Steps>

## Що можна видалити після міграції

| Файл / шаблон                              | Чому більше не потрібен                                                |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| Prop `messages` і завантаження каталогу    | Словники компілює й завантажує Intlayer.                               |
| Крок `formatjs compile`                    | Intlayer розбирає ICU-повідомлення безпосередньо з JSON-файлів.        |
| Генерація id через `babel-plugin-formatjs` | Використовуйте явні id через крапку, щоб кожен id відповідав словнику. |

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

- [Compat adapter для react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/react-intl.md)
- [Плагін sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)
- [Intlayer з Vite та React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)
- [Міграція з react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_react-i18next_to_intlayer.md)
- [Візуальний редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
