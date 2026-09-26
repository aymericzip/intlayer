---
createdAt: 2024-03-07
updatedAt: 2026-09-06
priority: 8
title: "Come rendere multilingue (i18n) un'applicazione Vite e React esistente a posteriori (Guida i18n 2026)"
description: "La guida 2026 per rendere multilingue (i18n) un'app Vite e React esistente senza refactoring complessi. Scopri l'estrazione automatica, traduzione AI e bundle ottimizzati con Intlayer."
keywords:
  - Vite i18n
  - React i18n
  - Internazionalizzazione
  - Tradurre app Vite esistente
  - Tradurre app React esistente
  - Intlayer
  - Multilingue
  - Compilatore
  - Traduzione AI
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# Come rendere multilingue (i18n) un'applicazione Vite e React esistente a posteriori (Guida i18n 2026)

Aggiungere l'internazionalizzazione (i18n) a un progetto Vite e React fin dal primo giorno è relativamente semplice. Ma cosa succede quando hai già un'applicazione matura e in produzione in una sola lingua e devi renderla multilingue **a posteriori**?

Con librerie tradizionali come `react-i18next` o `react-intl`, il processo è spesso estenuante:

- Cercare manualmente stringhe hardcoded in centinaia di file JSX e TSX.
- Creare file JSON nidificati e inventare chiavi di traduzione arbitrarie (`components.header.title`, ecc.).
- Sostituire il testo JSX con chiamate a hook (`t('...')`).
- Ristrutturare il routing lato client, la gestione dello stato e la logica di cambio lingua.

Nel 2026 non devi riscrivere il tuo codice. Con **Intlayer**, puoi integrare l'internazionalizzazione in un'applicazione Vite e React esistente in pochi minuti grazie all'estrazione automatica, alla traduzione con IA e a un'integrazione fluida.

> Cerchi la guida tecnica completa passo-passo per Vite e React? Consulta la nostra documentazione: [Tradurre Vite e React con Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md).

## Indice

<TOC/>

## Il dilemma del retrofit: Perché internazionalizzare un'app esistente è difficile

Tre ostacoli principali affrontano gli sviluppatori durante l'internazionalizzazione di un'app Vite e React:

1. **Interruzione del codice**: L'estrazione manuale delle stringhe nei dizionari JSON richiede la modifica di quasi tutti i componenti. Questo genera enormi diff git, conflitti di merge e possibili regressioni di layout.
2. **Manutenzione delle chiavi**: Inventare chiavi come `dashboard.hero.ctaButton` per ogni testo rallenta lo sviluppo e aggiunge carico cognitivo a ogni modifica dell'interfaccia.
3. **Lavoro noioso di traduzione**: Una volta estratte le stringhe, tradurle in 5, 10 o 20 lingue comporta noiosi copia-incolla o costosi servizi di localizzazione esterni.

Intlayer risolve questi problemi a livello architetturale con **estrazione assistita dal compilatore**, **dizionari dichiarativi a livello di componente** e **integrazione nativa con Vite**.

## Estrazione automatica dei contenuti (senza ricerca manuale)

Invece di estrarre manualmente ogni testo dal tuo JSX, Intlayer propone due percorsi senza attrito:

### Opzione A: Lo strumento CLI di estrazione (`npx intlayer extract`)

Puoi eseguire lo strumento di estrazione di Intlayer direttamente sulla tua codebase:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

Questo comando analizza i tuoi componenti React, individua i testi visibili e genera automaticamente file di dichiarazione dei contenuti (`.content.ts`) accanto a ciascun componente. La logica rimane dichiarativa, pulita e con tipizzazione sicura, senza dover scrivere chiavi a mano.

### Opzione B: Il compilatore Intlayer (Estrazione al build)

Con il compilatore Intlayer abilitato nella configurazione, continui a scrivere i componenti con testo semplice nella tua lingua predefinita. In fase di build, il compilatore estrae i testi e inietta i contenuti localizzati in modo del tutto trasparente:

```tsx fileName="src/App.tsx"
// Scrivi normale codice React. Il compilatore estrae il testo automaticamente
export default function App() {
  return (
    <section>
      <h1>Benvenuto sulla nostra piattaforma</h1>
      <p>Inizia a scoprire le nostre funzionalità moderne oggi stesso.</p>
    </section>
  );
}
```

Dietro le quinte, Intlayer crea il dizionario e collega il componente al rispettivo contenuto localizzato, eliminando completamente la necessità di refactoring manuale.

In questo caso viene generato un file `src/App.content.ts` con la seguente struttura:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    benvenutoSullaNostraPiattaforma: t({
      it: "Benvenuto sulla nostra piattaforma",
    }),
    iniziaAScoprireLeNostreFunzionalita: t({
      it: "Inizia a scoprire le nostre funzionalità moderne oggi stesso.",
    }),
  },
};

export default content;
```

## Traduzione con IA tramite il tuo LLM preferito

Una volta estratti i contenuti, tradurli in decine di lingue non dovrebbe richiedere giorni. Intlayer include una CLI integrata per la traduzione con intelligenza artificiale collegabile a OpenAI, Anthropic, DeepSeek o Mistral con le tue chiavi API:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

Configura le tue lingue e il provider IA in `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ITALIAN,
    ],
    defaultLocale: Locales.ITALIAN,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Moderna applicazione SaaS e dashboard creata con Vite e React",
  },
};

export default config;
```

Eseguendo `npx intlayer fill`, i tuoi file di dichiarazione vengono completati con traduzioni di qualità per tutte le lingue configurate:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    benvenutoSullaNostraPiattaforma: t({
      it: "Benvenuto sulla nostra piattaforma",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    iniziaAScoprireLeNostreFunzionalita: t({
      it: "Inizia a scoprire le nostre funzionalità moderne oggi stesso.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

Fornendo l'`applicationContext` al modello linguistico, le traduzioni preservano il contesto tecnico, il tono del brand e le sfumature grammaticali molto meglio degli strumenti generici.

Per verificare che non sia rimasto alcun testo non tradotto:

```bash
npx intlayer test
```

## Integrazione con Vite e configurazione del Provider

Integrare Intlayer in Vite richiede solo l'aggiunta del plugin in `vite.config.ts` e l'inclusione del componente radice in `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> A partire da Intlayer v9, il compilatore è incluso direttamente nel plugin `intlayer()` e si attiva automaticamente quando `compiler.enabled` è impostato in `intlayer.config.ts`.

Avvolgi la tua applicazione con `IntlayerProvider` nel componente principale:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Cambio dinamico della lingua

Cambia lingua ovunque nella tua applicazione utilizzando l'hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## SEO Multilingue (Sitemap e Robots.txt)

Intlayer include formattatori come `generateSitemap` e `getMultilingualUrls` per generare sitemap e robots.txt multilingue compatibili con i motori di ricerca per deployment statici con Vite:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("File SEO generati con successo.");
```

Aggiungi uno script `prebuild` nel tuo `package.json` per eseguire questa generazione prima di `vite build`:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Approfondimento: Pronto per la guida passo-passo completa?

Questa guida ha offerto una panoramica concettuale per internazionalizzare un'app Vite e React esistente nel 2026 senza complicazioni architetturali.

Se desideri configurare passo dopo passo ogni dettaglio, compresi il supporto avanzato a TypeScript, i dizionari dinamici e l'editor visivo, visita la nostra guida ufficiale:

👉 **[Guida completa per tradurre Vite e React con Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)**

## Domande Frequenti (FAQ)

<FAQ>

<Question title="Posso rendere multilingue la mia app Vite e React senza riscrivere manualmente tutti i testi?">

Sì. Puoi utilizzare `npx intlayer extract` per rilevare ed estrarre automaticamente i testi in file di dichiarazione localizzati, oppure utilizzare il compilatore Intlayer che trasforma i componenti durante il build permettendoti di continuare a scrivere normale codice JSX.

</Question>
<Question title="In che modo Intlayer riduce la dimensione del bundle Vite rispetto a react-i18next o react-intl?">

Intlayer definisce i dizionari a livello di singolo componente e ottimizza le inclusioni tramite macro in fase di build. I tuoi bundle ricevono solo i campi usati dai componenti renderizzati nella pagina, anziché interi file JSON. Inoltre, i dizionari dinamici caricano le lingue solo su richiesta.

</Question>
<Question title="Posso usare l'IA per tradurre i miei componenti esistenti in più lingue?">

Sì. La CLI di Intlayer offre il comando `npx intlayer fill`, che si collega ai principali provider di intelligenza artificiale (OpenAI, Anthropic, Mistral, DeepSeek) per tradurre in modo contestuale tutte le lingue configurate.

</Question>
<Question title="Posso migrare da react-i18next o react-intl senza riscrivere i componenti?">

Sì. Intlayer fornisce adattatori di compatibilità per `react-i18next` e `react-intl`, oltre a plugin dedicati per sincronizzare i tuoi file di traduzione JSON esistenti (`sync-json`).

</Question>

</FAQ>
