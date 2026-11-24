---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrare da svelte-i18n a Intlayer"
description: "Migra un'app Svelte o SvelteKit da svelte-i18n a Intlayer passo dopo passo. Mantieni funzionanti gli store $_, $date e $number con il compat adapter @intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrare da svelte-i18n a Intlayer

## Perché migrare da svelte-i18n a Intlayer?

<AccordionGroup>
<Accordion header="Dimensione del bundle">

svelte-i18n registra interi file di locale all'avvio. Intlayer invia solo i dizionari usati da ogni pagina, **riducendo la dimensione di bundle e pagine fino al 50%**.

</Accordion>
<Accordion header="Manutenibilità">

Le chiavi sono **tipizzate** in base ai tuoi dizionari: le chiavi non valide falliscono al build. Il contenuto può stare accanto ai componenti che lo usano.

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

1. **Compat adapter (consigliato per le app esistenti)**: installa `@intlayer/svelte-i18n`. Espone la stessa API di `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) e serve i messaggi dai dizionari Intlayer. ICU MessageFormat funziona come prima.
2. **Migrazione completa**: sostituisci gradualmente gli store svelte-i18n con `useIntlayer` di `svelte-intlayer` e file `.content.ts` accanto ai tuoi componenti.

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
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Mantieni installato `svelte-i18n`: fornisce i tipi TypeScript.

</Step>
<Step number={2} title="Configurare Intlayer">

Punta il plugin `syncJSON` verso i tuoi file di messaggi esistenti. Con un file per namespace (`src/locales/en/home.json`), ogni file diventa un dizionario:

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` viene risolto nel campo `title` del dizionario `home`. Se usi un unico file per locale (`src/locales/en.json`) con namespace annidati, usa invece `source: ({ locale }) => \`./src/locales/${locale}.json\``: ogni chiave di primo livello diventa un dizionario.

</Step>
<Step number={3} title="Aggiungere il plugin Vite">

`svelteI18nVitePlugin()` esegue il build di Intlayer e crea un alias di `svelte-i18n` verso `@intlayer/svelte-i18n`, senza modifiche ai file sorgente.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Per SvelteKit, aggiungi `svelteI18nVitePlugin()` dopo `sveltekit()` nello stesso array `plugins`.

</Step>
<Step number={4} title="Semplificare la configurazione i18n">

Mantieni `init()`, ma rimuovi `register()` e `addMessages()`: i messaggi provengono dai dizionari Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

I tuoi componenti continuano a funzionare senza modifiche:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Impostare `$locale = 'fr'` cambia la lingua sia per gli store svelte-i18n sia per `useIntlayer`.

## Migrazione completa

<Steps>
<Step number={5} title="Rinomina esplicita degli import (opzionale)" isOptional={true}>

Il plugin Vite gestisce già gli alias. Per rendere esplicita la dipendenza:

| Prima                                        | Dopo                                                   |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Spostare il contenuto in file .content.ts" isOptional={true}>

I nuovi componenti possono usare il contenuto nativo di Intlayer, accanto alle chiamate svelte-i18n esistenti:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
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

| File / pattern                          | Perché non serve più                                          |
| --------------------------------------- | ------------------------------------------------------------- |
| Chiamate `register()` / `addMessages()` | I dizionari sono compilati e caricati da Intlayer.            |
| `waitLocale()` prima del render         | I messaggi sono disponibili non appena la locale è impostata. |

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

- [Compat adapter svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/svelte-i18n.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md)
- [Intlayer con Vite e Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+svelte.md)
- [Intlayer con SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_svelte_kit.md)
- [Editor visuale Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
