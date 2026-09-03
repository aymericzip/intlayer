---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: next-intl è obsoleto nel 2026?
description: next-intl è diventato il riferimento per Next.js App Router. Tuttavia comporta ancora un aumento del bundle a runtime e la gestione manuale complessa dei namespace.
keywords:
  - next-intl
  - Intlayer
  - Internazionalizzazione
  - i18n
  - Next.js
  - Dimensione bundle
  - Blog
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# next-intl è obsoleto nel 2026?

Quando Vercel ha introdotto l'App Router dismettendo l'i18n nativo del Pages Router, `next-intl` ha prontamente risposto alle esigenze degli sviluppatori. Grazie alla documentazione accurata di Jan Amann e al rapido supporto all'App Router, la libreria è diventata lo standard di riferimento.

Per quale motivo, allora, interrogarsi oggi sulla sua adeguatezza?

**L'architettura web ha compiuto grandi passi negli ultimi tre anni, mentre l'approccio cardine di `next-intl` è rimasto sostanzialmente immutato.**

Mentre Next.js si orientava verso React Server Components (RSC), streaming e ottimizzazioni via compilatore, `next-intl` continua a trattare l'internazionalizzazione come un compito a runtime: distribuisce pesanti oggetti JSON tramite provider client, esegue formattatori ICU nel browser e ricorre alla suddivisione manuale dei namespace per contenere il peso dei bundle.

<TOC/>

## Punti chiave

**Velocità di sviluppo rallentata:**

Negli ultimi 12 mesi, `next-intl` ha contato ~187 commit, concentrati per lo più su allineamenti di compatibilità Next.js e correzioni mirate.

**Costo a runtime per il client:**

L'impiego di `NextIntlClientProvider` combinato con `useTranslations()` aggiunge circa 12.8 KB gzipped (51 KB minificati) prima di renderizzare qualsiasi stringa, circa 3 volte quanto richiesto da `next-intlayer` (4.3 KB).

**Dispersione delle traduzioni pari al 90%:**

Nelle impostazioni consuete, **l'89.8% delle traduzioni trasmesse a una pagina appartiene ad altre sezioni**. Accedere a `/contact` significa scaricare anche i testi di `/pricing` e della dashboard.

**Gestione manuale dei namespace:**

Per evitare bundle sovradimensionati occorre mappare i namespace route per route a mano, aumentando il rischio di discrepanze in produzione.

**Accordo commerciale:**

Come partner ufficiale di Crowdin, il progetto non ha incentivi a integrare uno strumento gratuito di traduzione IA locale nella propria CLI.

## Manutenzione vs. strumenti moderni

Attività di commit registrata negli ultimi dodici mesi:

| Repository            | Stelle                                                                                                                                                 | Commit totali                                                                                                                                                       | Commit / anno                                                                                                                                                      | Ultimo commit                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Attività negli ultimi 12 mesi:

- `amannn/next-intl`: **187 commit** (aggiornamenti di dipendenze e piccole correzioni).
- `aymericzip/intlayer`: **4.343 commit** (sviluppo attivo su compilatori, estensioni IDE, server MCP e motori di traduzione).

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

Una libreria matura può risultare stabile. Tuttavia, l'i18n frontend si è trasformata: i compilatori escludono i testi superflui in fase di build, i modelli LLM automatizzano le traduzioni in CI e gli ambienti di sviluppo sfruttano Language Server (LSP) e agenti intelligenti. Un'architettura basata sul runtime difficilmente recepisce tali vantaggi.

## Misurazione delle performance in Next.js 16 App Router

Benchmark su un'applicazione App Router standard composta da 10 route e 10 lingue:

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Eseguito in browser reali con compressione gzip da produzione. Dettagli consultabili nel [report benchmark Next.js](https://intlayer.org/it/doc/benchmark/nextjs).

### Peso base delle librerie

Impatto sul client prima dell'aggiunta dei contenuti:

| Libreria               | Gzipped    | Minificato  |
| ---------------------- | ---------- | ----------- |
| `next-intl@4.9.1`      | 12.8 KB    | 51.0 KB     |
| `next-intlayer@8.7.12` | **4.3 KB** | **13.3 KB** |

### Peso delle pagine e dispersione dei testi

| Configurazione         | JS medio / pag (gz) | Dispersione lingue | Dispersione altre pag | Componente medio (gz) |
| ---------------------- | ------------------- | ------------------ | --------------------- | --------------------- |
| Base (no i18n)         | 150.8 KB            | 0.0%               | 0.0%                  | 0.7 KB                |
| `next-intl` (statico)  | 163.5 KB            | 4.2%               | **89.8%**             | 20.5 KB               |
| `next-intl` (dinamico) | 163.4 KB            | 9.7%               | **89.9%**             | 20.5 KB               |
| `next-intlayer`        | **152.1 KB**        | **0.0%**           | **0.0%**              | **7.2 KB**            |

### Come si genera la dispersione tra pagine

Nei progetti `next-intl` tradizionali il layout principale recupera tutti i messaggi congiuntamente:

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Inviando `messages` al provider del client a monte, l'intero vocabolario viene caricato per ciascuna route. Chi visita `/login` riceve involontariamente anche le traduzioni di FAQ, manuali e area personale.

È possibile ovviare ripartendo i file JSON in più namespace. Mantenere tale mappatura a mano risulta però tedioso e vulnerabile a dimenticanze.

Intlayer supera questo limite tramite analisi statica: il [compilatore Intlayer](https://intlayer.org/it/doc/compiler) pacchettizza solo le voci realmente necessarie per ciascuna route, portando la dispersione tra pagine a **0.0%**.

## Perché next-intl impedisce il tree-shaking

L'API si fonda su chiavi testuali risolte a runtime:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack e Webpack non possono rilevare con sicurezza quali chiavi di `UserProfile` vengano invocate. Per evitare errori, **il bundler include l'intero namespace nel chunk del client**. Con le proprietà destrutturate di Intlayer, il compilatore traccia con esattezza gli accessi ed esclude le voci non pertinenti. Maggiori informazioni nell'[ottimizzazione del bundle](https://intlayer.org/it/doc/concept/bundle-optimization).

## Esperienza di sviluppo

### File JSON isolati vs. co-locazione

Con `next-intl`, i testi sono conservati in cartelle `messages/` lontane dal codice. Intlayer posiziona le definizioni di contenuto a fianco dei rispettivi componenti:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/it.json"
{
  "authModal": {
    "title": "Accedi al tuo account",
    "submitButton": "Continua"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      it: "Accedi al tuo account",
    }),
    submitButton: t({
      en: "Continue",
      it: "Continua",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

Cancellando o rinominando `AuthModal.tsx`, i contenuti collegati vengono aggiornati o rimossi parallelamente.

### Autocompletamento vs. controlli rigidi sui tipi

Arricchire `IntlMessages` in `next-intl` abilita i suggerimenti del codice sulla base della lingua principale:

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

Tuttavia la verifica si limita alla lingua primaria. Se viene rimossa una chiave in `it.json`, TypeScript non produce segnalazioni e la CI risulterà corretta, mentre gli utenti finali visualizzeranno testi mancanti.

Intlayer ricava i tipi da ogni file di contenuto. L'attivazione di [`strictMode`](https://intlayer.org/it/doc/concept/configuration) blocca la compilazione qualora manchi una traduzione in qualunque lingua configurata.

### Strumenti per sviluppatori e IA

| Caratteristica                 | `next-intl` | Intlayer                                                                 |
| ------------------------------ | ----------- | ------------------------------------------------------------------------ |
| **Estensione VS Code**         | ❌ Nessuna  | ✅ [Estensione ufficiale](https://intlayer.org/it/doc/vs-code-extension) |
| **Language Server (LSP)**      | ❌ Nessuno  | ✅ [LSP integrato](https://intlayer.org/it/doc/lsp)                      |
| **Server MCP (per agenti IA)** | ❌ Nessuno  | ✅ [Server MCP incorporato](https://intlayer.org/it/doc/mcp-server)      |
| **Competenze agente (Skill)**  | ❌ Nessuna  | ✅ [Skill pronte](https://intlayer.org/it/doc/agent_skills)              |
| **CMS Visuale in contesto**    | ❌ Nessuno  | ✅ [Gratuito & Open Source](https://intlayer.org/it/doc/concept/editor)  |

LSP e MCP integrati offrono agli assistenti IA una comprensione esaustiva dell'architettura dei contenuti, agevolando completamenti precisi e aggiornamenti rapidi.

## La partnership con Crowdin

`next-intl` vanta una collaborazione ufficiale con Crowdin. La presenza di sponsor è positiva per l'ecosistema aperto, ma orienta la direzione del progetto: concepito per integrarsi con TMS esterni, `next-intl` difficilmente integrerà una funzione di traduzione IA locale gratuita.

Intlayer include tali funzionalità di base:

**Traduzione automatica locale con IA (`intlayer fill`):**

Rileva e traduce le chiavi mancanti sfruttando le tue credenziali API (OpenAI, Anthropic, Mistral o Gemini).

**CMS visuale auto-ospitato:**

Usa il [CMS Intlayer](https://intlayer.org/it/doc/concept/cms) per consentire modifiche editoriali con salvataggio diretto su Git.

**Licenza open source permissiva:**

L'intero progetto è rilasciato sotto licenza Apache 2.0.

## In quali contesti next-intl rimane una scelta valida?

<AccordionGroup>
<Accordion header="Esigenze avanzate di ICU MessageFormat">

Se il sistema fa largo uso di combinazioni di plurali complessi e formattatori articolati, la soluzione ICU di `next-intl` è affidabile.

</Accordion>
<Accordion header="Flussi di lavoro imperniati su Crowdin">

Per le realtà che gestiscono già la traduzione attraverso Crowdin, `next-intl` si inserisce senza attriti.

</Accordion>
<Accordion header="Progetti esistenti con buone prestazioni">

Se l'applicazione attuale risponde ai requisiti e la dimensione del bundle rientra nei limiti prefissati, una migrazione non è indispensabile.

</Accordion>
</AccordionGroup>

## Come migliorare la mia configurazione next-intl esistente?

Intlayer fornisce un pacchetto di compatibilità drop-in che replica fedelmente le firme di funzioni e hook di `next-intl` (come `useTranslations`, `getTranslations` e gli helper di routing). Non è necessario riscrivere componenti o pagine per beneficiare delle ottimizzazioni a livello di compilatore.

L'installazione si completa con un solo comando:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

Questa CLI interattiva:

1. Installa il pacchetto di compatibilità `@intlayer/next-intl`.
2. Configura gli alias del bundler affinché le importazioni (`next-intl`, `next-intl/server`) puntino direttamente a Intlayer, consentendo di rimuovere la vecchia libreria da `package.json`.
3. Attiva immediatamente il supporto del Language Server (LSP), l'eliminazione dei dati ridondanti tra route (tree-shaking completo) e le funzionalità locali di traduzione con IA senza richiedere interventi complessi sul codice.

Per istruzioni passo dopo passo, consulta le nostre guide dedicate:

- **Compatibilità immediata:** Continua a usare i tuoi hook `useTranslations` grazie al [layer di compatibilità next-intl](https://intlayer.org/it/doc/compatibility/next-intl).
- **Guida alla migrazione:** Converti i file JSON tradizionali in strutture tipizzate con la nostra [guida di migrazione next-intl](https://intlayer.org/it/doc/migration/next-intl).
- **Architettura mista:** Mantieni `next-intl` a runtime mentre [utilizzi Intlayer con next-intl](https://intlayer.org/it/blog/intlayer-with-next-intl) per le traduzioni IA locali.

Controlla peso e dispersioni della tua applicazione con l'[analizzatore SEO i18n gratuito](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Approfondimenti

- [Benchmark Next.js i18n: analisi approfondita delle performance](https://intlayer.org/it/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/it/blog/next-i18next-vs-next-intl-vs-intlayer)
- [i18next è obsoleto nel 2026?](https://intlayer.org/it/blog/is-i18next-outdated)
- [I vantaggi dell'internazionalizzazione basata su compilatore](https://intlayer.org/it/blog/compiler-vs-declarative-i18n)
