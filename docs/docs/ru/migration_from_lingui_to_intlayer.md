---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Миграция с Lingui на Intlayer"
description: "Пошагово перенесите React-приложение с Lingui на Intlayer. Макросы Lingui, useLingui и <Trans> продолжают работать с compat adapter @intlayer/lingui."
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

# Миграция с Lingui на Intlayer

## Зачем переходить с Lingui на Intlayer?

<AccordionGroup>
<Accordion header="Размер бандла">

Lingui загружает один скомпилированный каталог на локаль со всеми сообщениями приложения. Intlayer разбивает контент по словарям и отдаёт только то, что использует каждая страница, что **уменьшает размер бандлов и страниц до 50%**.

</Accordion>
<Accordion header="Поддерживаемость">

Словари Intlayer **полностью типизированы** и могут лежать рядом с компонентами, которые их используют. Не нужно помнить о шагах `extract` / `compile`: словари собирает плагин бандлера.

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

1. **Compat adapter (рекомендуется для существующих приложений)**: установите `@intlayer/lingui`. Он предоставляет тот же API, что и `@lingui/core` и `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`), и отдаёт сообщения из словарей Intlayer. Ваши макросы (`` t`…` ``, `<Trans>`, `msg`, `plural`) компилируются точно так же, как раньше.
2. **Полная миграция**: постепенно заменяйте вызовы Lingui на `useIntlayer` и файлы `.content.ts` рядом с компонентами.

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

> Оставьте установленными `@lingui/core`, `@lingui/react` и плагин макросов (`@lingui/babel-plugin-lingui-macro` или `@lingui/swc-plugin`). Макросы по-прежнему выполняются, а packages Lingui предоставляют типы TypeScript.

</Step>
<Step number={2} title="Настройка Intlayer">

Intlayer использует ваши каталоги Lingui как источник истины. При стандартной структуре Lingui (`src/locales/{locale}/messages.po`) укажите на них плагин `syncPO`:

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

<Accordion header="Использование JSON-каталогов">

С `@lingui/format-json` используйте `syncJSON` с форматом ICU:

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

> Используйте явные id сообщений (`t({ id: "hero.title", message: "Welcome" })` или `<Trans id="hero.title">`). Id, сгенерированные из исходного текста, не сопоставляются с каталогами.

</Step>
<Step number={3} title="Замена Vite-плагина Lingui">

Замените `@lingui/vite-plugin` на `@intlayer/lingui/plugin`. Имя остаётся `lingui()`: плагин запускает сборку Intlayer и создаёт алиасы `@lingui/core` и `@lingui/react` на `@intlayer/lingui`, без изменений в исходных файлах.

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

> Оставьте плагин макросов в React-плагине (Babel или `@lingui/swc-plugin`), чтобы макросы компилировались в вызовы `i18n._()` до того, как Intlayer их обработает.

</Step>
</Steps>

Ваши компоненты продолжают работать без изменений:

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

Смена локали по-прежнему выполняется через `i18n.activate(locale)`, который обновляет всех потребителей `useLingui()`.

## Полная миграция

<Steps>
<Step number={4} title="Удаление загрузки каталогов в runtime" isOptional={true}>

Теперь сообщения берутся из словарей Intlayer, скомпилированных при сборке. Вызовы `i18n.load()` / `i18n.loadAndActivate()` служат лишь fallback и выводят предупреждение в режиме разработки. Замените их на `i18n.activate(locale)` и уберите шаг `lingui compile`. Оставьте `lingui extract` для сбора новых id сообщений.

</Step>
<Step number={5} title="Явное переименование импортов (необязательно)" isOptional={true}>

Vite-плагин уже настраивает алиасы. Чтобы сделать зависимость явной:

| До                                                 | После                                                 |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Перенос контента в файлы .content.ts" isOptional={true}>

Новые компоненты могут использовать нативный контент Intlayer рядом с существующими вызовами Lingui:

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

Заполненные переводы записываются обратно в ваши каталоги Lingui. Настройка ИИ описана в [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

</Step>
</Steps>

## Что можно удалить после миграции

| Файл / шаблон                                      | Почему больше не нужен                                 |
| -------------------------------------------------- | ------------------------------------------------------ |
| `i18n.load()` / динамические импорты каталогов     | Словари компилирует и загружает Intlayer.              |
| `lingui compile` и скомпилированные `.js`-каталоги | Intlayer собирает словари напрямую из ваших каталогов. |
| `@lingui/vite-plugin`                              | Заменён на `lingui()` из `@intlayer/lingui/plugin`.    |

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

- [Compat adapter для Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md)
- [Плагин sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md)
- [Intlayer с Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)
- [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
