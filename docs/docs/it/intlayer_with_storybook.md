---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Come configurare Intlayer con Storybook
description: Scopri come rendere multilingue il tuo design system usando Intlayer con Storybook — compila le dichiarazioni di contenuto, aggiungi un selettore di lingua e visualizza l'anteprima dei tuoi componenti in qualsiasi lingua.
keywords:
  - Internazionalizzazione
  - Documentazione
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

# Intlayer con Storybook

## Sommario

<TOC/>

## Cos'è Intlayer?

**Intlayer** è un'innovativa libreria di internazionalizzazione (i18n) open-source progettata per semplificare il supporto multilingue nelle moderne applicazioni web. Funziona a **livello di componente** — ogni componente possiede le proprie dichiarazioni di contenuto — mantenendo le traduzioni collocate insieme al codice che le utilizza.

Con Intlayer puoi:

- **Gestire le traduzioni in modo dichiarativo** con file di contenuto per singolo componente.
- **Ottenere il supporto completo di TypeScript** tramite tipi generati automaticamente e l'autocompletamento dell'IDE.
- **Cambiare lingua a runtime** senza ricaricare la pagina.
- **Tradurre automaticamente** grazie alle integrazioni integrate con i provider di IA.

---

## Perché usare Intlayer con Storybook?

Storybook è lo strumento standard del settore per sviluppare e documentare i componenti dell'interfaccia utente in isolamento. Combinarlo con Intlayer ti permette di:

- **Visualizzare l'anteprima di ogni lingua** direttamente all'interno del canvas di Storybook utilizzando un selettore nella barra degli strumenti.
- **Identificare le traduzioni mancanti** prima che raggiungano la produzione.
- **Documentare componenti multilingue** con contenuti reali e sicuri dal punto di vista dei tipi, anziché utilizzare stringhe codificate rigidamente.

---

## Configurazione passo dopo passo

<Tabs>
<Tab value="Vite Setup">

### Passaggio 1: Installa le dipendenze

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

| Pacchetto        | Ruolo                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| `intlayer`       | Core — configurazione, compilazione dei contenuti, CLI                |
| `react-intlayer` | Binding React — `IntlayerProvider`, hook `useIntlayer`                |
| `vite-intlayer`  | Plugin Vite — osserva e compila i file di dichiarazione dei contenuti |

---

### Passaggio 2: Crea una configurazione Intlayer

Crea `intlayer.config.ts` nella root del tuo progetto (o all'interno del pacchetto del tuo design system):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // aggiungi altre lingue se necessario
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // dove si trovano i tuoi file *.content.ts
  },
};

export default config;
```

> Per l'elenco completo delle opzioni, consulta il [riferimento alla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

---

### Passaggio 3: Aggiungi il plugin Vite a Storybook

L'hook `viteFinal` di Storybook ti consente di estendere la configurazione interna di Vite. Importa e aggiungi il plugin `intlayer()` qui:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …altri addon
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

Il plugin `intlayer()` osserva i tuoi file `*.content.ts` e ricostruisce automaticamente i dizionari ogni volta che cambiano durante lo sviluppo con Storybook.

---

### Passaggio 4: Aggiungi il Decorator `IntlayerProvider` e una Toolbar per la lingua

Il file `preview` di Storybook è il posto giusto per avvolgere ogni story con l' `IntlayerProvider` ed esporre un selettore di lingua nella toolbar:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Avvolgi ogni story nell'IntlayerProvider
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

  // Esponi un selettore di lingua nella toolbar di Storybook
  globalTypes: {
    locale: {
      description: "Lingua attiva",
      defaultValue: "en",
      toolbar: {
        title: "Lingua",
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

> I valori di `locale` devono corrispondere alle lingue dichiarate nel tuo `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

### Passaggio 1: Installa le dipendenze

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

### Passaggio 2: Crea una configurazione Intlayer

Crea `intlayer.config.ts` nella root del tuo progetto:

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

### Passaggio 3: Configura il Webpack di Storybook

Per le configurazioni di Storybook basate su Webpack (ad es. `@storybook/react-webpack5`), estendi la configurazione webpack tramite `webpackFinal` per aggiungere gli alias e il caricatore di Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerWebpackPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      new IntlayerWebpackPlugin(),
    ];
    return baseConfig;
  },
};

export default config;
```

---

### Passaggio 4: Aggiungi il Decorator `IntlayerProvider` e una Toolbar per la lingua

Stessa cosa della configurazione Vite — aggiungi il decorator e il tipo di lingua globale in `.storybook/preview.tsx`:

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
      description: "Lingua attiva",
      defaultValue: "en",
      toolbar: {
        title: "Lingua",
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

## Dichiarazione dei contenuti

Crea un file `*.content.ts` accanto a ogni componente. Intlayer lo rileva automaticamente durante la compilazione.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenuto",
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
      fr: "Copier le contenuto",
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
      fr: "Copier le contenuto",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
```

> Per ulteriori formati di dichiarazione dei contenuti e funzionalità, consulta la [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

---

## Utilizzo di `useIntlayer` in un componente

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
      Copia
    </button>
  );
};
```

`useIntlayer` restituisce il dizionario compilato per la lingua corrente fornita dal `IntlayerProvider` più vicino. Cambiare la lingua nella toolbar di Storybook renderizza automaticamente la story con le traduzioni aggiornate.

---

## Scrivere stories per componenti internazionalizzati

Con il decorator `IntlayerProvider` configurato, le tue stories funzionano esattamente come prima. La toolbar della lingua controlla la lingua attiva per l'intero canvas:

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

/** Story predefinita — cambia la lingua nella toolbar per visualizzare l'anteprima delle traduzioni. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Renderizza il pulsante all'interno di un blocco di codice, un caso d'uso comune nel mondo reale. */
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

> Ogni story eredita la variabile globale `locale` dalla toolbar, consentendoti di verificare ogni lingua senza modificare il codice della story.

---

## Testare le traduzioni nelle stories

Utilizza le funzioni `play` di Storybook per verificare che il testo tradotto correttamente venga visualizzato per una determinata lingua:

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

    // Verifica che il pulsante abbia un nome accessibile non vuoto
    await expect(button).toHaveAccessibleName();
    // Verifica che il pulsante non sia disabilitato
    await expect(button).not.toBeDisabled();
    // Verifica l'accessibilità da tastiera
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Risorse aggiuntive

- [Riferimento alla configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [Documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)
- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md)
- [Documentazione di Storybook](https://storybook.js.org/docs)
