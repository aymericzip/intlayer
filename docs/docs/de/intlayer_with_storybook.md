---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: So richten Sie Intlayer mit Storybook ein
description: Erfahren Sie, wie Sie Ihr Design-System mit Intlayer und Storybook mehrsprachig gestalten — Inhaltsdeklarationen kompilieren, einen Sprachumschalter hinzufügen und eine Vorschau Ihrer Komponenten in jeder Sprache anzeigen.
keywords:
  - Internationalisierung
  - Dokumentation
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

# Intlayer mit Storybook

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Sie arbeitet auf **Komponentenebene** — jede Komponente besitzt ihre eigenen Inhaltsdeklarationen —, sodass Übersetzungen direkt dort gespeichert werden, wo sie verwendet werden.

Mit Intlayer können Sie:

- **Übersetzungen deklarativ verwalten** mit Inhaltsdateien pro Komponente.
- **Vollständige TypeScript-Unterstützung erhalten** durch automatisch generierte Typen und IDE-Autovervollständigung.
- **Sprachen zur Laufzeit wechseln**, ohne die Seite neu zu laden.
- **Automatisch übersetzen** mit integrierten KI-Anbieter-Integrationen.

---

## Warum Intlayer mit Storybook verwenden?

Storybook ist das Standardwerkzeug der Branche für die isolierte Entwicklung und Dokumentation von UI-Komponenten. Die Kombination mit Intlayer ermöglicht es Ihnen:

- **Jede Sprache direkt in der Storybook-Vorschau anzuzeigen**, indem Sie einen Umschalter in der Toolbar verwenden.
- **Fehlende Übersetzungen zu finden**, bevor sie in die Produktion gelangen.
- **Mehrsprachige Komponenten zu dokumentieren** mit echten, typsicheren Inhalten anstelle von fest kodierten Zeichenfolgen.

---

## Schritt-für-Schritt-Einrichtung

<Tabs>
<Tab value="Vite Setup">

### Schritt 1: Abhängigkeiten installieren

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

| Paket            | Rolle                                                       |
| ---------------- | ----------------------------------------------------------- |
| `intlayer`       | Kern — Konfiguration, Inhaltskompilierung, CLI              |
| `react-intlayer` | React-Bindings — `IntlayerProvider`, `useIntlayer`-Hook     |
| `vite-intlayer`  | Vite-Plugin — überwacht und kompiliert Inhaltsdeklarationen |

---

### Schritt 2: Eine Intlayer-Konfiguration erstellen

Erstellen Sie eine `intlayer.config.ts` im Stammverzeichnis Ihres Projekts (oder innerhalb Ihres Design-System-Pakets):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // weitere Sprachen nach Bedarf hinzufügen
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // Verzeichnis, in dem Ihre *.content.ts Dateien liegen
  },
};

export default config;
```

> Eine vollständige Liste der Optionen finden Sie in der [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

---

### Schritt 3: Das Vite-Plugin zu Storybook hinzufügen

Mit dem `viteFinal`-Hook von Storybook können Sie die interne Vite-Konfiguration erweitern. Importieren und fügen Sie dort das `intlayer()`-Plugin hinzu:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …weitere Addons
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

Das `intlayer()`-Plugin überwacht Ihre `*.content.ts`-Dateien und baut die Wörterbücher automatisch neu auf, sobald sich während der Storybook-Entwicklung etwas ändert.

---

### Schritt 4: Den `IntlayerProvider`-Decorator und eine Sprach-Toolbar hinzufügen

Die `preview`-Datei von Storybook ist der richtige Ort, um jede Story in den `IntlayerProvider` einzubinden und einen Sprachumschalter in der Toolbar bereitzustellen:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Jede Story in den IntlayerProvider einbinden
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

  // Einen Sprachumschalter in der Storybook-Toolbar bereitstellen
  globalTypes: {
    locale: {
      description: "Aktive Sprache",
      defaultValue: "en",
      toolbar: {
        title: "Sprache",
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

> Die `locale`-Werte müssen mit den in Ihrer `intlayer.config.ts` deklarierten Sprachen übereinstimmen.

</Tab>
<Tab value="Webpack Setup">

### Schritt 1: Abhängigkeiten installieren

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

### Schritt 2: Eine Intlayer-Konfiguration erstellen

Erstellen Sie eine `intlayer.config.ts` im Stammverzeichnis Ihres Projekts:

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

### Schritt 3: Storybook-Webpack konfigurieren

Für Webpack-basierte Storybook-Setups (z. B. `@storybook/react-webpack5`) erweitern Sie die Webpack-Konfiguration über `webpackFinal`, um die Intlayer-Aliase und den Loader hinzuzufügen:

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

### Schritt 4: Den `IntlayerProvider`-Decorator und eine Sprach-Toolbar hinzufügen

Genauso wie beim Vite-Setup — fügen Sie den Decorator und den globalen Sprachtyp in `.storybook/preview.tsx` hinzu:

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
      description: "Aktive Sprache",
      defaultValue: "en",
      toolbar: {
        title: "Sprache",
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

## Inhalte deklarieren

Erstellen Sie eine `*.content.ts`-Datei neben jeder Komponente. Intlayer erkennt diese während der Kompilierung automatisch.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
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

```javascript fileName="src/components/CopyButton/CopyButton.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
```

> Weitere Formate und Funktionen zur Inhaltsdeklaration finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

---

## Verwendung von `useIntlayer` in einer Komponente

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
      Kopieren
    </button>
  );
};
```

`useIntlayer` gibt das kompilierte Wörterbuch für die aktuelle Sprache zurück, die vom nächsten `IntlayerProvider` bereitgestellt wird. Ein Wechsel der Sprache in der Storybook-Toolbar rendert die Story automatisch mit den aktualisierten Übersetzungen neu.

---

## Schreiben von Stories für internationalisierte Komponenten

Mit dem eingerichteten `IntlayerProvider`-Decorator funktionieren Ihre Stories genau wie zuvor. Die Sprach-Toolbar steuert die aktive Sprache für die gesamte Vorschau:

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

/** Standard-Story — wechseln Sie die Sprache in der Toolbar, um die Übersetzungen anzuzeigen. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Rendert den Button innerhalb eines Codeblocks, ein häufiger Anwendungsfall in der Praxis. */
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

> Jede Story erbt die globale `locale`-Variable von der Toolbar, sodass Sie jede Sprache überprüfen können, ohne den Story-Code ändern zu müssen.

---

## Übersetzungen in Stories testen

Verwenden Sie die `play`-Funktionen von Storybook, um sicherzustellen, dass der korrekte übersetzte Text für eine bestimmte Sprache gerendert wird:

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

    // Überprüfen, ob der Button einen nicht leeren zugänglichen Namen hat
    await expect(button).toHaveAccessibleName();
    // Überprüfen, ob der Button nicht deaktiviert ist
    await expect(button).not.toBeDisabled();
    // Tastaturzugänglichkeit überprüfen
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Zusätzliche Ressourcen

- [Intlayer Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)
- [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
- [Storybook-Dokumentation](https://storybook.js.org/docs)
