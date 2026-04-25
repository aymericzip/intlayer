---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Jak nastavit Intlayer se Storybookem
description: Naučte se, jak vytvořit svůj design systém vícejazyčný pomocí Intlayeru se Storybookem — kompilujte deklarace obsahu, přidejte přepínač jazyků a prohlížejte své komponenty v libovolném jazyce.
keywords:
  - Internacionalizace
  - Dokumentace
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
    changes: "Iniciace dokumentace"
---

# Intlayer se Storybookem

## Obsah

<TOC/>

## Co je Intlayer?

**Intlayer** je inovativní open-source knihovna pro internacionalizaci (i18n) navržená pro zjednodušení vícejazyčné podpory v moderních webových aplikacích. Funguje na **úrovni komponent** — každá komponenta vlastní své deklarace obsahu — což udržuje překlady přímo u kódu, který je používá.

S Intlayerem můžete:

- **Spravovat překlady deklarativně** pomocí souborů obsahu pro jednotlivé komponenty.
- **Získat plnou podporu TypeScriptu** díky automaticky generovaným typům a autokompletaci v IDE.
- **Přepínat jazyky za běhu** bez nutnosti obnovení stránky.
- **Překládat automaticky** pomocí integrovaných AI poskytovatelů.

---

## Proč používat Intlayer se Storybookem?

Storybook je standardní nástroj pro vývoj a dokumentaci UI komponent v izolaci. Kombinace s Intlayerem vám umožní:

- **Prohlížet každou lokalitu** přímo v plátně Storybooku pomocí přepínače v nástrojové liště.
- **Zachytit chybějící překlady** ještě než se dostanou do produkce.
- **Dokumentovat vícejazyčné komponenty** se skutečným typově bezpečným obsahem namísto pevně zakódovaných řetězců.

---

## Nastavení krok za krokem

<Tabs>
<Tab value="Vite Setup">

### Krok 1: Instalace závislostí

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

| Balíček          | Role                                                       |
| ---------------- | ---------------------------------------------------------- |
| `intlayer`       | Jádro — konfigurace, kompilace obsahu, CLI                 |
| `react-intlayer` | Vazby pro React — `IntlayerProvider`, hook `useIntlayer`   |
| `vite-intlayer`  | Vite plugin — sleduje a kompiluje soubory deklarace obsahu |

---

### Krok 2: Vytvoření konfigurace Intlayer

Vytvořte `intlayer.config.ts` v kořenovém adresáři vašeho projektu (nebo uvnitř vašeho design-system balíčku):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // přidejte další lokality dle potřeby
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // kde se nacházejí vaše soubory *.content.ts
  },
};

export default config;
```

> Úplný seznam možností naleznete v [referenci konfigurace](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).

---

### Krok 3: Přidání Vite pluginu do Storybooku

Hook `viteFinal` ve Storybooku vám umožní rozšířit interní konfiguraci Vite. Zde importujte a přidejte plugin `intlayer()`:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …další doplňky
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

Plugin `intlayer()` sleduje vaše soubory `*.content.ts` a automaticky znovu sestavuje slovníky, kdykoliv se během vývoje ve Storybooku změní.

---

### Krok 4: Přidání dekorátoru `IntlayerProvider` a nástrojové lišty jazyků

Soubor `preview` ve Storybooku je správným místem pro obalení každého příběhu (story) pomocí `IntlayerProvider` a vystavení přepínače jazyků v nástrojové liště:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Obalte každý příběh do IntlayerProvideru
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

  // Vystavte přepínač jazyků v nástrojové liště Storybooku
  globalTypes: {
    locale: {
      description: "Aktivní jazyk",
      defaultValue: "en",
      toolbar: {
        title: "Lokalizace",
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

> Hodnoty `locale` musí odpovídat jazykům deklarovaným ve vašem `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

### Krok 1: Instalace závislostí

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

### Krok 2: Vytvoření konfigurace Intlayer

Vytvořte `intlayer.config.ts` v kořenovém adresáři vašeho projektu:

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

### Krok 3: Konfigurace Webpacku pro Storybook

U Storybooků založených na Webpacku (např. `@storybook/react-webpack5`) rozšiřte konfiguraci webpacku přes `webpackFinal` a přidejte Intlayer aliasy a loader:

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

### Krok 4: Přidání dekorátoru `IntlayerProvider` a nástrojové lišty jazyků

Stejné jako u nastavení Vite — přidejte dekorátor a globální typ lokality v `.storybook/preview.tsx`:

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
      description: "Aktivní jazyk",
      defaultValue: "en",
      toolbar: {
        title: "Lokalizace",
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

## Deklarování obsahu

Vytvořte soubor `*.content.ts` vedle každé komponenty. Intlayer jej automaticky zachytí během kompilace.

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

> Další formáty deklarace obsahu a funkce naleznete v [dokumentaci deklarace obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md).

---

## Použití `useIntlayer` v komponentě

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
      Copy
    </button>
  );
};
```

`useIntlayer` vrací zkompilovaný slovník pro aktuální lokalitu poskytovanou nejbližším `IntlayerProvider`. Přepnutí jazyka v nástrojové liště Storybooku automaticky znovu vykreslí příběh s aktualizovanými překlady.

---

## Psaní příběhů (stories) pro internacionalizované komponenty

S nastaveným dekorátorem `IntlayerProvider` fungují vaše příběhy přesně jako dříve. Nástrojová lišta jazyků ovládá aktivní jazyk pro celé plátno:

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

/** Výchozí příběh — přepněte jazyk v nástrojové liště pro náhled překladů. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Vykresluje tlačítko uvnitř bloku kódu, což je běžný reálný případ použití. */
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

> Každý příběh dědí globální proměnnou `locale` z nástrojové lišty, takže můžete ověřit každý jazyk bez změny kódu příběhu.

---

## Testování překladů v příbězích

Použijte funkce `play` ve Storybooku k ověření, že se pro daný jazyk vykresluje správný přeložený text:

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
  args: { content: "Ahoj světe" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Ověření, že tlačítko má neprázdný přístupný název
    await expect(button).toHaveAccessibleName();
    // Ověření, že tlačítko není zakázané
    await expect(button).not.toBeDisabled();
    // Ověření přístupnosti přes klávesnici
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Další zdroje

- [Intlayer reference konfigurace](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md)
- [Dokumentace deklarace obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md)
- [Dokumentace Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/index.md)
- [Dokumentace Storybooku](https://storybook.js.org/docs)
