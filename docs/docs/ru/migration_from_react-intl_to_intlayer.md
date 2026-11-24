---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Миграция с react-intl (FormatJS) на Intlayer"
description: "Пошагово перенесите React-приложение с react-intl на Intlayer. useIntl, FormattedMessage и все компоненты Formatted* продолжают работать с compat adapter @intlayer/react-intl."
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

# Миграция с react-intl (FormatJS) на Intlayer

## Зачем переходить с react-intl на Intlayer?

<AccordionGroup>
<Accordion header="Размер бандла">

В react-intl все сообщения локали передаются в `IntlProvider`, поэтому каждая страница несёт весь каталог. Intlayer отдаёт только словари, используемые каждой страницей, что **уменьшает размер бандлов и страниц до 50%**.

</Accordion>
<Accordion header="Поддерживаемость">

Id сообщений **типизированы** по вашим словарям: неверные id приводят к ошибке при сборке. Контент может лежать рядом с компонентами, которые его используют.

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

1. **Compat adapter (рекомендуется для существующих приложений)**: установите `@intlayer/react-intl`. Он предоставляет тот же API, что и `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…), и отдаёт сообщения из словарей Intlayer. ICU MessageFormat, плюрализация, select и rich text-теги работают как раньше.
2. **Полная миграция**: постепенно заменяйте вызовы react-intl на `useIntlayer` и файлы `.content.ts` рядом с компонентами.

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

> Оставьте `react-intl` установленным: он предоставляет типы TypeScript.

</Step>
<Step number={2} title="Настройка Intlayer">

Укажите плагину `syncJSON` ваши существующие файлы сообщений. Каталоги react-intl представляют собой плоские map с id через точку:

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

> Первый сегмент каждого id (`home`) становится словарём Intlayer, поэтому каждая страница загружает только нужные ей словари. Когда Intlayer записывает переводы обратно, файл сохраняет плоскую структуру.

</Step>
<Step number={3} title="Добавление Vite-плагина">

`reactIntlVitePlugin()` запускает сборку Intlayer и создаёт алиас `react-intl` на `@intlayer/react-intl`, без изменений в исходных файлах.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Используете другой бандлер? Переименуйте импорты в `@intlayer/react-intl` (см. шаг 5) и используйте плагин Intlayer для вашего бандлера, например `withIntlayer` из `next-intlayer` для Next.js.

</Step>
<Step number={4} title="Больше не передавайте сообщения в IntlProvider">

`IntlProvider` продолжает работать, но сообщения теперь загружает Intlayer. Удалите prop `messages` и импорт каталога:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Если `messages` всё ещё передаётся, он игнорируется, а в режиме разработки выводится предупреждение.

</Step>
</Steps>

Ваши компоненты продолжают работать без изменений, с типизированными id:

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

## Полная миграция

<Steps>
<Step number={5} title="Явное переименование импортов (необязательно)" isOptional={true}>

Vite-плагин уже настраивает алиасы. Чтобы сделать зависимость явной:

| До                                              | После                                                     |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Перенос контента в файлы .content.ts" isOptional={true}>

Новые компоненты могут использовать нативный контент Intlayer рядом с существующими вызовами react-intl:

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

| Файл / шаблон                              | Почему больше не нужен                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| Prop `messages` и загрузка каталога        | Словари компилирует и загружает Intlayer.                                 |
| Шаг `formatjs compile`                     | Intlayer разбирает ICU-сообщения напрямую из JSON-файлов.                 |
| Генерация id через `babel-plugin-formatjs` | Используйте явные id через точку, чтобы каждый id соответствовал словарю. |

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

- [Compat adapter для react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/react-intl.md)
- [Плагин sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md)
- [Intlayer с Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)
- [Миграция с react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_react-i18next_to_intlayer.md)
- [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
