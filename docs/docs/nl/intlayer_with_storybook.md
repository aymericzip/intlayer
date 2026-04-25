---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Intlayer instellen met Storybook
description: Leer hoe u uw designsysteem meertalig kunt maken met Intlayer en Storybook — compileer inhoudsdeclaraties, voeg een taalschakelaar toe en bekijk uw componenten in elke gewenste taal.
keywords:
  - Internationalisering
  - Documentatie
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
    changes: "Documentatie geïnitialiseerd"
---

# Intlayer met Storybook

## Inhoudsopgave

<TOC/>

## Wat is Intlayer?

**Intlayer** is een innovatieve, open-source internationaliseringsbibliotheek (i18n) die is ontworpen om meertalige ondersteuning in moderne webapplicaties te vereenvoudigen. Het werkt op **componentniveau** — elke component beheert zijn eigen inhoudsdeclaraties — waardoor vertalingen samen met de code worden bewaard die ze gebruikt.

Met Intlayer kunt u:

- **Vertalingen declaratief beheren** met inhoudsbestanden per component.
- **Volledige TypeScript-ondersteuning krijgen** via automatisch gegenereerde types en IDE-automatische aanvulling.
- **Tijdens runtime van taal wisselen** zonder de pagina te herladen.
- **Automatisch vertalen** met ingebouwde AI-provider integraties.

---

## Waarom Intlayer gebruiken met Storybook?

Storybook is de industriestandaard tool voor het in isolatie ontwikkelen en documenteren van UI-componenten. Door het te combineren met Intlayer kunt u:

- **Elke taal bekijken** direct in het Storybook-canvas met behulp van een taalschakelaar in de werkbalk.
- **Ontbrekende vertalingen detecteren** voordat ze de productie bereiken.
- **Meertalige componenten documenteren** met echte, typeveilige inhoud in plaats van hardgecodeerde strings.

---

## Stapsgewijze installatie

<Tabs>
<Tab value="Vite Setup">

### Stap 1: Afhankelijkheden installeren

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

| Pakket           | Rol                                                            |
| ---------------- | -------------------------------------------------------------- |
| `intlayer`       | Core — configuratie, inhoudscompilatie, CLI                    |
| `react-intlayer` | React-bindingen — `IntlayerProvider`, `useIntlayer` hook       |
| `vite-intlayer`  | Vite-plugin — bewaakt en compileert inhoudsdeclaratiebestanden |

---

### Stap 2: Een Intlayer-configuratie aanmaken

Maak `intlayer.config.ts` aan in de root van uw project (of in uw design-system pakket):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // voeg naar behoefte meer talen toe
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // waar uw *.content.ts bestanden staan
  },
};

export default config;
```

> Zie voor de volledige lijst met opties de [configuratiereferentie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md).

---

### Stap 3: De Vite-plugin toevoegen aan Storybook

Met de `viteFinal` hook van Storybook kunt u de interne Vite-configuratie uitbreiden. Importeer en voeg de `intlayer()` plugin daar toe:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …andere addons
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

De `intlayer()` plugin bewaakt uw `*.content.ts` bestanden and bouwt automatisch woordenboeken opnieuw op wanneer ze veranderen tijdens de Storybook-ontwikkeling.

---

### Stap 4: De `IntlayerProvider` decorator en een locale-werkbalk toevoegen

Het `preview` bestand van Storybook is de juiste plek om elke story te omhullen met de `IntlayerProvider` en een taalschakelaar in de werkbalk te tonen:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Omhul elke story met de IntlayerProvider
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

  // Toon een taalschakelaar in de Storybook-werkbalk
  globalTypes: {
    locale: {
      description: "Actieve taal",
      defaultValue: "en",
      toolbar: {
        title: "Taal",
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

> De `locale` waarden moeten overeenkomen met de talen die zijn gedeclareerd in uw `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

### Stap 1: Afhankelijkheden installeren

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

### Stap 2: Een Intlayer-configuratie aanmaken

Maak `intlayer.config.ts` aan in de root van uw project:

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

### Stap 3: Webpack van Storybook configureren

Breid voor op Webpack gebaseerde Storybook-instellingen (bijv. `@storybook/react-webpack5`) de webpack-configuratie uit via `webpackFinal` om de Intlayer-aliassen en loader toe te voegen:

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

### Stap 4: De `IntlayerProvider` decorator en een locale-werkbalk toevoegen

Hetzelfde als de Vite-instelling — voeg de decorator en het globale locale-type toe in `.storybook/preview.tsx`:

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
      description: "Actieve taal",
      defaultValue: "en",
      toolbar: {
        title: "Taal",
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

## Inhoud declareren

Maak een `*.content.ts` bestand aan naast elke component. Intlayer pikt dit automatisch op tijdens de compilatie.

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

> Zie voor meer inhoudsdeclaratieformaten en functies de [documentatie voor inhoudsdeclaratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md).

---

## `useIntlayer` gebruiken in een component

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

`useIntlayer` retourneert het gecompileerde woordenboek voor de huidige taal die wordt geleverd door de dichtstbijzijnde `IntlayerProvider`. Het wisselen van taal in de Storybook-werkbalk herrendert de story automatisch met de bijgewerkte vertalingen.

---

## Stories schrijven voor geïnternationaliseerde componenten

Met de `IntlayerProvider` decorator op zijn plek werken uw stories precies zoals voorheen. De locale-werkbalk regelt de actieve taal voor het hele canvas:

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

/** Default story — wissel van taal in de werkbalk om vertalingen te bekijken. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Rendert de knop in een codeblok, een veelvoorkomend praktijkvoorbeeld. */
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

> Elke story erft de `locale` global van de werkbalk, zodat u elke taal kunt verifiëren zonder story-code te wijzigen.

---

## Vertalingen testen in stories

Gebruik de `play` functies van Storybook om te controleren of de juiste vertaalde tekst wordt gerenderd voor een bepaalde taal:

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
  args: { content: "Hallo wereld" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Controleer of de knop een niet-lege toegankelijke naam heeft
    await expect(button).toHaveAccessibleName();
    // Controleer of de knop niet is uitgeschakeld
    await expect(button).not.toBeDisabled();
    // Controleer toetsenbordtoegankelijkheid
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Aanvullende bronnen

- [Intlayer configuratiereferentie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md)
- [Documentatie voor inhoudsdeclaratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md)
- [Intlayer CLI documentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/index.md)
- [Storybook documentatie](https://storybook.js.org/docs)
