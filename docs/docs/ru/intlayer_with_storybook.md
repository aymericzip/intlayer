---
createdAt: 2026-03-20
updatedAt: 2026-05-31
title: "Storybook i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Storybook. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Intlayer со Storybook

## Содержание

<TOC/>

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как «storybook-react-i18next» или «i18next», Intlayer — это решение со встроенными оптимизациями, такими как:

<AccordionGroup>

<Accordion header="Полный сборник рассказов">

Intlayer оптимизирован для идеальной работы с Storybook, предлагая **многоязычные декораторы историй**, **переключение языковых стандартов** и все функции, необходимые для масштабирования интернационализации (i18n) в вашей дизайн-системе.

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных файлов JSON на свои страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер бандла и страниц до 50 %**.

</Accordion>

<Accordion header="Удобство обслуживания">

Определение области содержимого вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить отдельную папку функций, не утруждав себя мысленным бременем проверки всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="Агент ИИ">

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[навыки агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

</Accordion>

<Accordion header="Автоматизация">

Используйте автоматизацию для перевода в своем конвейере CI/CD, используя LLM по вашему выбору за счет вашего поставщика ИИ. Intlayer также предлагает **компилятор** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), которая помогает **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность">

Подключение больших файлов JSON к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента во время сборки (build time).

</Accordion>

<Accordion header="Масштабирование с помощью не-разработчиками">

Intlayer — это больше, чем просто решение i18n. Он предоставляет **автономный [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** и **[полный CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, чтобы помочь вам управлять многоязычным контентом в **реальном времени**, упрощая сотрудничество с переводчиками, копирайтерами и другими членами команды. Контент может храниться локально и/или удаленно.

</Accordion>
</AccordionGroup>

---

## Зачем использовать Intlayer со Storybook?

Storybook - это отраслевой стандарт для разработки и документирования компонентов пользовательского интерфейса в изоляции. Совмещение его с Intlayer позволяет:

- **Предварительно просматривать каждый язык** прямо в Storybook с помощью переключателя в панели инструментов.
- **Обнаруживать недостающие переводы** до того, как они попадут в продакшн.
- **Документировать многоязычные компоненты** с использованием реального, типизированного контента вместо жестко закодированных строк.

---

## Пошаговая настройка

<Tabs>
<Tab value="Vite Setup">

<Steps>

<Step number={1} title="Установка зависимостей">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Пакет            | Роль                                                              |
| ---------------- | ----------------------------------------------------------------- |
| `intlayer`       | Ядро - конфигурация, компиляция контента, CLI                     |
| `react-intlayer` | Привязки React - `IntlayerProvider`, хук `useIntlayer`            |
| `vite-intlayer`  | Плагин Vite - отслеживает и компилирует файлы деклараций контента |

---

</Step>

<Step number={2} title="Создание конфигурации Intlayer">

Создайте `intlayer.config.ts` в корне вашего проекта (или внутри вашего пакета дизайн-системы):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // добавьте другие языки по мере необходимости
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // где хранятся ваши файлы *.content.ts
  },
};

export default config;
```

> Полный список опций см. в [справочнике по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

---

</Step>

<Step number={3} title="Добавление плагина Vite в Storybook">

Хук `viteFinal` в Storybook позволяет расширить внутреннюю конфигурацию Vite. Импортируйте и добавьте туда плагин `intlayer()`:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …другие аддоны
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

Плагин `intlayer()` отслеживает ваши файлы `*.content.ts` и автоматически перестраивает словари при любых изменениях во время разработки в Storybook.

---

</Step>

<Step number={4} title="Добавление декоратора `IntlayerProvider` и переключателя языков">

Файл `preview` в Storybook - подходящее место для обертывания каждой истории в `IntlayerProvider` и добавления переключателя языков в панель инструментов:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Оборачиваем каждую историю в IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Добавляем переключатель языков в панель инструментов Storybook
  globalTypes: {
    locale: {
      description: "Активный язык",
      defaultValue: "en",
      toolbar: {
        title: "Язык",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> Значения `locale` должны соответствовать языкам, объявленным в вашем `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

</Step>

<Step number={1} title="Установка зависимостей">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

</Step>

<Step number={2} title="Создание конфигурации Intlayer">

Создайте `intlayer.config.ts` в корне вашего проекта:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

</Step>

<Step number={3} title="Настройка Webpack в Storybook">

Для настроек Storybook на базе Webpack (например, `@storybook/react-webpack5`) расширьте конфигурацию webpack через `webpackFinal`, чтобы добавить алиасы и загрузчик Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

---

</Step>

<Step number={4} title="Добавление декоратора `IntlayerProvider` и переключателя языков">

Аналогично настройке Vite - добавьте декоратор и глобальный тип языка в `.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Активный язык",
      defaultValue: "en",
      toolbar: {
        title: "Язык",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

</Step>

</Steps>

## Объявление контента

Создайте файл `*.content.ts` рядом с каждым компонентом. Intlayer автоматически подхватит его во время компиляции.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

> Более подробную информацию о форматах объявлений контента и функциях см. в [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

---

## Использование `useIntlayer` в компоненте

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Копировать
    </button>
  );
};
```

`useIntlayer` возвращает скомпилированный словарь для текущего языка, предоставленного ближайшим `IntlayerProvider`. Переключение языка в панели инструментов Storybook автоматически перерисовывает историю с обновленными переводами.

---

## Написание историй для интернационализированных компонентов

С настроенным декоратором `IntlayerProvider` ваши истории работают так же, как и раньше. Панель инструментов управляет активным языком для всего холста:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** История по умолчанию - переключите язык в панели инструментов, чтобы просмотреть переводы. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Отрисовывает кнопку внутри блока кода - распространенный случай использования. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Каждая история наследует глобальный параметр `locale` из панели инструментов, поэтому вы можете проверить каждый язык без изменения кода самой истории.

---

## Тестирование переводов в историях

Используйте функции `play` в Storybook, чтобы подтвердить правильность отображения переведенного текста для заданного языка:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Проверяем, что у кнопки есть непустое доступное имя
    await expect(button).toHaveAccessibleName();
    // Проверяем, что кнопка не отключена
    await expect(button).not.toBeDisabled();
    // Проверяем доступность клавиатуры
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Дополнительные ресурсы

- [Справочник по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
- [Документация по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md)
- [Документация CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
- [Документация Storybook](https://storybook.js.org/docs)
