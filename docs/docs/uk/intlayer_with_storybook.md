---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Як налаштувати Intlayer зі Storybook
description: Дізнайтеся, як зробити вашу систему дизайну багатомовною за допомогою Intlayer та Storybook — компілюйте декларації вмісту, додавайте перемикач локалей та переглядайте свої компоненти будь-якою мовою.
keywords:
  - Інтернаціоналізація
  - Документація
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
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Intlayer зі Storybook

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим кодом, розроблена для спрощення багатомовної підтримки в сучасних веб-додатках. Вона працює на **рівні компонентів** — кожен компонент має власні декларації вмісту — що дозволяє зберігати переклади разом із кодом, який їх використовує.

З Intlayer ви можете:

- **Керувати перекладами декларативно** за допомогою файлів вмісту для кожного компонента.
- **Отримувати повну підтримку TypeScript** завдяки автоматично згенерованим типам та автодоповненню в IDE.
- **Перемикати локалі під час виконання** без перезавантаження сторінки.
- **Перекладати автоматично** за допомогою вбудованих інтеграцій з AI-провайдерами.

---

## Чому варто використовувати Intlayer зі Storybook?

Storybook — це галузевий стандартний інструмент для ізольованої розробки та документування компонентів інтерфейсу. Поєднання його з Intlayer дозволяє вам:

- **Переглядати кожну локаль** безпосередньо в канвасі Storybook за допомогою перемикача на панелі інструментів.
- **Виявляти відсутні переклади** до того, як вони потраплять у продакшн.
- **Документувати багатомовні компоненти** з реальним, безпечним щодо типів вмістом замість жорстко закодованих рядків.

---

## Покрокове налаштування

<Tabs>
<Tab value="Vite Setup">

### Крок 1: Встановлення залежностей

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

| Пакет            | Роль                                                        |
| ---------------- | ----------------------------------------------------------- |
| `intlayer`       | Ядро — конфігурація, компіляція вмісту, CLI                 |
| `react-intlayer` | Зв’язки React — `IntlayerProvider`, хук `useIntlayer`       |
| `vite-intlayer`  | Плагін Vite — відстежує та компілює файли декларації вмісту |

---

### Крок 2: Створення конфігурації Intlayer

Створіть `intlayer.config.ts` у корені вашого проекту (або всередині пакету вашої дизайн-системи):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // додайте більше локалей за потреби
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // місцезнаходження ваших файлів *.content.ts
  },
};

export default config;
```

> Повний список опцій дивіться в [довіднику з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

---

### Крок 3: Додавання плагіна Vite до Storybook

Хук `viteFinal` у Storybook дозволяє розширити внутрішню конфігурацію Vite. Імпортуйте та додайте плагін `intlayer()` туди:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …інші аддони
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

Плагін `intlayer()` відстежує ваші файли `*.content.ts` та автоматично перебудовує словники щоразу, коли вони змінюються під час розробки в Storybook.

---

### Крок 4: Додавання декоратора `IntlayerProvider` та панелі інструментів локалей

Файл `preview` у Storybook — це ідеальне місце, щоб обгорнути кожну історію в `IntlayerProvider` та додати перемикач локалей на панель інструментів:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Обгортаємо кожну історію в IntlayerProvider
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

  // Додаємо перемикач локалей на панель інструментів Storybook
  globalTypes: {
    locale: {
      description: "Активна локаль",
      defaultValue: "en",
      toolbar: {
        title: "Локаль",
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

> Значення `locale` повинні відповідати локалям, оголошеним у вашому `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

### Крок 1: Встановлення залежностей

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

### Крок 2: Створення конфігурації Intlayer

Створіть `intlayer.config.ts` у корені вашого проекту:

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

### Крок 3: Налаштування Webpack для Storybook

Для налаштувань Storybook на базі Webpack (наприклад, `@storybook/react-webpack5`) розширте конфігурацію webpack через `webpackFinal`, щоб додати аліаси та завантажувач Intlayer:

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

### Крок 4: Додавання декоратора `IntlayerProvider` та панелі інструментів локалей

Те саме, що і для Vite — додайте декоратор та глобальний тип локалі в `.storybook/preview.tsx`:

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
      description: "Активна локаль",
      defaultValue: "en",
      toolbar: {
        title: "Локаль",
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

## Оголошення вмісту

Створіть файл `*.content.ts` поруч із кожним компонентом. Intlayer автоматично знайде його під час компіляції.

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

> Для отримання додаткової інформації про формати оголошення вмісту та функції дивіться [документацію з оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

---

## Використання `useIntlayer` у компоненті

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
      Копіювати
    </button>
  );
};
```

`useIntlayer` повертає скомпільований словник для поточної локалі, наданої найближчим `IntlayerProvider`. Перемикання локалі в панелі інструментів Storybook автоматично оновить історію з актуальними перекладами.

---

## Написання історій (Stories) для інтернаціоналізованих компонентів

З налаштованим декоратором `IntlayerProvider` ваші історії працюють так само, як і раніше. Панель інструментів локалей керує активною локаллю для всього канвасу:

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

/** Стандартна історія — змініть локаль на панелі інструментів, щоб переглянути переклади. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Відображає кнопку всередині блоку коду, поширений випадок використання в реальному житті. */
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

> Кожна історія успадковує глобальну змінну `locale` з панелі інструментів, тому ви можете перевірити кожну локаль, не змінюючи код самої історії.

---

## Тестування перекладів в історіях

Використовуйте функції `play` у Storybook, щоб переконатися, що відображається правильний перекладений текст для певної локалі:

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

    // Перевірка, чи має кнопка непусту доступну назву
    await expect(button).toHaveAccessibleName();
    // Перевірка, чи кнопка не заблокована
    await expect(button).not.toBeDisabled();
    // Перевірка доступності з клавіатури
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Додаткові ресурси

- [Довідник з конфігурації Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [Документація з оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)
- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація Storybook](https://storybook.js.org/docs)
