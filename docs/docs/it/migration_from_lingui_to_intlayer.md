---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrare da Lingui a Intlayer"
description: "Migra un'app React da Lingui a Intlayer passo dopo passo. Mantieni funzionanti le macro Lingui, useLingui e <Trans> con il compat adapter @intlayer/lingui."
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

# Migrare da Lingui a Intlayer

## Perché migrare da Lingui a Intlayer?

<AccordionGroup>
<Accordion header="Dimensione del bundle">

Lingui carica un catalogo compilato per locale, contenente tutti i messaggi dell'app. Intlayer suddivide il contenuto per dizionario e invia solo ciò che ogni pagina usa, **riducendo la dimensione di bundle e pagine fino al 50%**.

</Accordion>
<Accordion header="Manutenibilità">

I dizionari Intlayer sono **completamente tipizzati** e possono stare accanto ai componenti che li usano. Nessun passaggio `extract` / `compile` da ricordare: i dizionari vengono generati dal plugin del bundler.

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

1. **Compat adapter (consigliato per le app esistenti)**: installa `@intlayer/lingui`. Espone la stessa API di `@lingui/core` e `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) e serve i messaggi dai dizionari Intlayer. Le tue macro (`` t`…` ``, `<Trans>`, `msg`, `plural`) continuano a compilare esattamente come prima.
2. **Migrazione completa**: sostituisci gradualmente le chiamate Lingui con `useIntlayer` e file `.content.ts` accanto ai tuoi componenti.

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

> Mantieni installati `@lingui/core`, `@lingui/react` e il tuo plugin per le macro (`@lingui/babel-plugin-lingui-macro` o `@lingui/swc-plugin`). Le macro continuano a essere eseguite e i package Lingui forniscono i tipi TypeScript.

</Step>
<Step number={2} title="Configurare Intlayer">

Intlayer legge i tuoi cataloghi Lingui come source of truth. Con la struttura predefinita di Lingui (`src/locales/{locale}/messages.po`), punta il plugin `syncPO` verso di essi:

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

<Accordion header="Usare cataloghi JSON">

Con `@lingui/format-json`, usa `syncJSON` con il formato ICU:

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

> Usa id di messaggio espliciti (`t({ id: "hero.title", message: "Welcome" })` o `<Trans id="hero.title">`). Gli id generati dal testo sorgente non vengono risolti nei cataloghi.

</Step>
<Step number={3} title="Sostituire il plugin Vite di Lingui">

Sostituisci `@lingui/vite-plugin` con `@intlayer/lingui/plugin`. Il binding resta `lingui()`: esegue il build di Intlayer e crea alias di `@lingui/core` e `@lingui/react` verso `@intlayer/lingui`, senza modifiche ai file sorgente.

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

> Mantieni il plugin delle macro nel plugin React (Babel o `@lingui/swc-plugin`), così le macro vengono compilate in chiamate `i18n._()` prima che Intlayer le risolva.

</Step>
</Steps>

I tuoi componenti continuano a funzionare senza modifiche:

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

Il cambio di locale passa sempre da `i18n.activate(locale)`, che aggiorna ogni consumer di `useLingui()`.

## Migrazione completa

<Steps>
<Step number={4} title="Rimuovere il caricamento dei cataloghi a runtime" isOptional={true}>

I messaggi ora provengono dai dizionari Intlayer compilati al build. Le chiamate a `i18n.load()` / `i18n.loadAndActivate()` servono solo come fallback e mostrano un avviso in sviluppo. Sostituiscile con `i18n.activate(locale)` ed elimina il passaggio `lingui compile`. Mantieni `lingui extract` per raccogliere i nuovi id di messaggio.

</Step>
<Step number={5} title="Rinomina esplicita degli import (opzionale)" isOptional={true}>

Il plugin Vite gestisce già gli alias. Per rendere esplicita la dipendenza:

| Prima                                              | Dopo                                                  |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Spostare il contenuto in file .content.ts" isOptional={true}>

I nuovi componenti possono usare il contenuto nativo di Intlayer, accanto alle chiamate Lingui esistenti:

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

Le traduzioni completate vengono riscritte nei tuoi cataloghi Lingui. Consulta la [documentazione della CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per la configurazione dell'IA.

</Step>
</Steps>

## Cosa puoi eliminare dopo la migrazione

| File / pattern                                | Perché non serve più                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| `i18n.load()` / import dinamici dei cataloghi | I dizionari sono compilati e caricati da Intlayer.           |
| `lingui compile` e cataloghi `.js` compilati  | Intlayer genera i dizionari direttamente dai tuoi cataloghi. |
| `@lingui/vite-plugin`                         | Sostituito da `lingui()` di `@intlayer/lingui/plugin`.       |

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

- [Compat adapter Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md)
- [Plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md)
- [Intlayer con Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)
- [Editor visuale Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
- [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md)
