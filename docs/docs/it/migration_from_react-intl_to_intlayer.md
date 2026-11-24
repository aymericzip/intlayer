---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrare da react-intl (FormatJS) a Intlayer"
description: "Migra un'app React da react-intl a Intlayer passo dopo passo. Mantieni funzionanti useIntl, FormattedMessage e tutti i componenti Formatted* con il compat adapter @intlayer/react-intl."
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

# Migrare da react-intl (FormatJS) a Intlayer

## Perché migrare da react-intl a Intlayer?

<AccordionGroup>
<Accordion header="Dimensione del bundle">

Con react-intl, tutti i messaggi della locale vengono passati a `IntlProvider`, quindi ogni pagina porta con sé l'intero catalogo. Intlayer invia solo i dizionari usati da ogni pagina, **riducendo la dimensione di bundle e pagine fino al 50%**.

</Accordion>
<Accordion header="Manutenibilità">

Gli id dei messaggi sono **tipizzati** in base ai tuoi dizionari: gli id non validi falliscono al build. Il contenuto può stare accanto ai componenti che lo usano.

</Accordion>
<Accordion header="Agente IA">

Il contenuto co-locato **riduce il contesto necessario** agli LLM. Intlayer include una **CLI** per verificare le traduzioni mancanti, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, un **[server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)** e delle **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**.

</Accordion>
<Accordion header="Automazione">

Traduci i messaggi mancanti nella tua pipeline CI/CD con l'LLM che preferisci, oppure in background con la [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

</Accordion>
<Accordion header="Scalare con i non sviluppatori">

Intlayer fornisce un **[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)** self-hosted e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** perché traduttori e copywriter possano modificare i contenuti in tempo reale.

</Accordion>
</AccordionGroup>

> Per capire da dove vengono queste librerie, leggi [la storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md).

## Strategie di migrazione

1. **Compat adapter (consigliato per le app esistenti)**: installa `@intlayer/react-intl`. Espone la stessa API di `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) e serve i messaggi dai dizionari Intlayer. ICU MessageFormat, plurali, select e tag rich text funzionano come prima.
2. **Migrazione completa**: sostituisci gradualmente le chiamate react-intl con `useIntlayer` e file `.content.ts` accanto ai tuoi componenti.

## Indice

<TOC/>

## Migrazione rapida

<Steps>
<Step number={1} title="Installare le dipendenze">

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

> Il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente IA.

Il comando rileva il tuo ambiente e installa i package necessari, ad esempio:

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

> Mantieni installato `react-intl`: fornisce i tipi TypeScript.

</Step>
<Step number={2} title="Configurare Intlayer">

Punta il plugin `syncJSON` verso i tuoi file di messaggi esistenti. I cataloghi react-intl sono mappe piatte di id con punti:

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

> Il primo segmento di ogni id (`home`) diventa un dizionario Intlayer, quindi ogni pagina carica solo i dizionari che usa. Quando Intlayer riscrive le traduzioni, il file mantiene la sua forma piatta.

</Step>
<Step number={3} title="Aggiungere il plugin Vite">

`reactIntlVitePlugin()` esegue il build di Intlayer e crea un alias di `react-intl` verso `@intlayer/react-intl`, senza modifiche ai file sorgente.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Usi un altro bundler? Rinomina gli import in `@intlayer/react-intl` (vedi passo 5) e usa il plugin Intlayer per il tuo bundler, ad esempio `withIntlayer` di `next-intlayer` per Next.js.

</Step>
<Step number={4} title="Smettere di passare i messaggi a IntlProvider">

`IntlProvider` continua a funzionare, ma ora i messaggi sono caricati da Intlayer. Rimuovi la prop `messages` e l'import del catalogo:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Se `messages` viene ancora passato, viene ignorato e in sviluppo viene mostrato un avviso.

</Step>
</Steps>

I tuoi componenti continuano a funzionare senza modifiche, con id tipizzati:

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

## Migrazione completa

<Steps>
<Step number={5} title="Rinomina esplicita degli import (opzionale)" isOptional={true}>

Il plugin Vite gestisce già gli alias. Per rendere esplicita la dipendenza:

| Prima                                           | Dopo                                                      |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Spostare il contenuto in file .content.ts" isOptional={true}>

I nuovi componenti possono usare il contenuto nativo di Intlayer, accanto alle chiamate react-intl esistenti:

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
<Step number={7} title="Attivare la traduzione con IA" isOptional={true}>

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

Le traduzioni completate vengono riscritte nei tuoi file JSON. Consulta la [documentazione della CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per la configurazione dell'IA.

</Step>
</Steps>

## Cosa puoi eliminare dopo la migrazione

| File / pattern                                   | Perché non serve più                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------- |
| Prop `messages` e caricamento del catalogo       | I dizionari sono compilati e caricati da Intlayer.                     |
| Passaggio `formatjs compile`                     | Intlayer analizza i messaggi ICU direttamente dai file JSON.           |
| Generazione degli id con `babel-plugin-formatjs` | Usa id espliciti con punti perché ogni id corrisponda a un dizionario. |

## Configurare TypeScript

Includi i tipi generati nel tuo `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Configurazione Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-intl.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md)
- [Intlayer con Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)
- [Migrare da react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md)
- [Editor visuale Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
