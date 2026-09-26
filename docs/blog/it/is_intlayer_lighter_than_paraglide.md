---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: Intlayer è più leggero di Paraglide?
description: Paraglide sembra quasi gratuito nei benchmark i18n perché il suo codice viene generato nel tuo repository. Ecco dove finisce realmente quel peso, perché la risoluzione della locale per nodo costa e come il caricamento dinamico di Intlayer invia una sola lingua anziché tutte.
keywords:
  - Paraglide
  - Intlayer
  - Internazionalizzazione
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Intlayer è più leggero di Paraglide?

Sì.

`Paraglide` ha la reputazione di essere la soluzione i18n più leggera in circolazione, e a prima vista il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) sembra confermarlo: la dimensione della sua libreria è vicina allo zero. Tuttavia, una dimensione della libreria pari a zero non significa zero byte inviati. Significa solo che i byte si trovano dove la metrica non va a guardare.

<TOC/>

## Punti chiave

**La dimensione della libreria è nascosta, non eliminata:**

Paraglide genera il suo runtime e le funzioni dei messaggi direttamente nella tua codebase. Quel codice viene inviato al browser, ma viene conteggiato come _tuo_ codice, non come codice della libreria.

**Nessun provider non significa un vantaggio gratuito:**

Ogni chiamata a `m.my_key()` risolve la locale in autonomia, leggendo il cookie o lo storage per ciascun nodo renderizzato, invece di leggerlo una sola volta da un contesto.

**Nessun caricamento dinamico:**

Paraglide importa ogni locale di un messaggio nel bundle client. Intlayer con `importMode: 'dynamic'` o `'fetch'` carica solo la lingua effettivamente renderizzata.

**Il tree shaking non è garantito:**

In alcuni dei nostri benchmark, il tree shaking promesso da Paraglide non ha avuto effetto. Verifica il tuo stesso bundle.

## Dove finisce il peso di Paraglide?

Nei report di benchmark, la metrica "dimensione della libreria" misura il provider e gli hook di ciascuna libreria i18n in un componente vuoto, prima che venga aggiunto qualsiasi contenuto.

| Libreria (TanStack Start)     | Dimensione lib (gz) | Dimensione lib (min) |
| ----------------------------- | ------------------- | -------------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB              | 4.5 KB               |
| `react-intlayer@9.5.1`        | 5.0 KB              | 15.2 KB              |

Letto in isolamento, Paraglide vince. Ma Paraglide è un compilatore: legge i tuoi file `messages/*.json` e scrive una cartella `paraglide/` nel tuo repository, contenente un file `runtime.js` (rilevamento della locale, strategie per cookie e storage, localizzazione degli URL) e una funzione JavaScript per ciascun messaggio.

```bash
src/paraglide/
├── runtime.js      # rilevamento locale, strategie, helper per URL
├── server.js
├── messages.js     # riesporta ogni messaggio
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Poiché questo codice si trova nella tua cartella `src/` e lo importi con un percorso relativo, il bundler lo attribuisce alla tua applicazione e non a un pacchetto in `node_modules`. La colonna della dimensione della libreria mostra quasi nulla, mentre la stessa logica viene comunque inclusa nel bundle della tua pagina.

Generare codice non è un'idea sbagliata in sé: il runtime generato include solo la logica richiesta dalla tua configurazione (strategia di prefisso, cookie vs. local storage, ecc.). Intlayer ottiene lo stesso risultato in modo diverso, iniettando variabili d'ambiente in fase di build in modo che il bundler elimini i rami che la tua configurazione non utilizza. Entrambi gli approcci risultano da 3 a 10 volte più leggeri rispetto a `i18next` o `next-intl`.

Il confronto equo non riguarda quindi la dimensione della libreria. Riguarda **il JavaScript effettivamente inviato per pagina**.

## Peso per pagina, misurato

Applicazione TanStack Start, 10 pagine, misurata sulle route `en` e `fr`, compressa con gzip:

| Configurazione                     | Media JS pag (gz) | Sopra la base | Perdita di locale | Perdita altre pagine |
| ---------------------------------- | ----------------- | ------------- | ----------------- | -------------------- |
| Base (senza i18n)                  | 111.0 KB          | -             | 0.0%              | 0.0%                 |
| `paraglide` (qualsiasi strategia)  | 125.1 KB          | +14.1 KB      | 49.7%             | 0.0%                 |
| `intlayer` (`importMode: static`)  | 125.8 KB          | +14.8 KB      | 50.0%             | 0.0%                 |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**      | **+7.6 KB**   | **0.0%**          | **0.0%**             |

Next.js 16 App Router, stessa applicazione:

| Configurazione    | Media JS pag (gz) | Sopra la base |
| ----------------- | ----------------- | ------------- |
| Base (senza i18n) | 141.0 KB          | -             |
| `paraglide-next`  | 155.3 KB          | +14.3 KB      |
| `next-intlayer`   | **141.3 KB**      | **+0.3 KB**   |

<I18nBenchmark framework="tanstack" vertical/>

> Dati completi nel [report di benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) e nel [report di benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md). Ogni bundle può essere ispezionato nel [repository del benchmark](https://github.com/intlayer-org/benchmark-i18n).

Due aspetti emergono con evidenza:

- In modalità `static`, Intlayer invia praticamente lo stesso contenuto di Paraglide (125.8 KB contro 125.1 KB). È quanto ci si aspetta: entrambi includono tutte le lingue dei messaggi utilizzati da una pagina.
- Paraglide rimane a 125.1 KB con qualsiasi strategia, poiché è privo di una modalità dinamica. Ogni riga nella tabella precedente corrisponde alla variante statica.

## Nessun Provider: un'idea all'apparenza ottima che non lo è

Paraglide non necessita di provider. Si importa un messaggio e lo si invoca:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Nessun contesto, nessun wrapper, nessun hook. Sembra più semplice. Ma la locale deve pur essere ricavata da qualche parte. Ogni funzione di messaggio generata assomiglia grossomodo a questo (versione semplificata):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // risolto a ogni invocazione

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...un ramo per ogni locale
};
```

E `getLocale()` scansiona le strategie configurate (cookie, local storage, URL, locale di base) per trovare la locale attiva. Pertanto, ogni nodo di testo renderizzato (`<>{m.my_key()}</>`) esegue la propria risoluzione della lingua, inclusa la lettura di `document.cookie` nel browser. Una pagina con 200 stringhe tradotte risolve la locale 200 volte per render, e di nuovo a ogni re-render.

Una libreria basata su provider legge la lingua **una sola volta**, la memorizza in un contesto (o in un segnale, o in uno store), e ogni nodo legge un valore già presente in memoria. Il provider costa poche centinaia di byte. Eliminarlo consuma cicli di CPU a ogni render, come dimostrato nel benchmark: i tempi di caricamento pagina e di cambio lingua di Paraglide sono costantemente inferiori rispetto a quelli di Intlayer su TanStack Start (22.1 ms contro 14.6 ms nel caricamento pagina, 4.3 ms contro 3.2 ms nella reattività E2E).

## Esperienza di sviluppo (DX)

La fonte di verità di Paraglide è il formato JSON, ma non si importa mai il file JSON direttamente. Si importa il file `.js` generato:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/it.json"
{
  "hero_title": "Pubblica la tua app in ogni lingua"
}
```

```tsx fileName="Hero.tsx"
// Esiste solo dopo che il compilatore lo ha rigenerato a partire dal JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      it: "Pubblica la tua app in ogni lingua",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Questo ciclo di lavoro comporta dei compromessi:

- Ogni modifica a un file JSON richiede una rigenerazione prima che l'importazione si risolva o che i tipi vengano aggiornati.
- La cartella generata `paraglide/` deve essere inclusa nel repository (generando conflitti di merge sui file generati in ogni PR che modifica testi) oppure ignorata (richiedendo un passaggio di generazione prima di ogni type check, test e job di CI).
- Ogni stringa diventa una chiamata a funzione. Le costanti diventano ovunque `m.key()`, anche nei punti in cui basterebbe un valore statico.

## Tree Shaking: verifica il tuo bundle

La promessa fondamentale di Paraglide è che i messaggi non utilizzati vengono eliminati tramite tree shaking, poiché ogni messaggio rappresenta un export separato. Nel benchmark Svelte + Vite, questo funziona come pubblicizzato.

In altri contesti, non è stato così. Nel nostro test su [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md), le pagine di Paraglide pesano 14 KB in più rispetto all'applicazione di base, mentre `next-intlayer` aggiunge solo 0.3 KB. Test precedenti su TanStack Start hanno mostrato che anche i messaggi di altre pagine finivano nel bundle della route.

Il tree shaking dipende dal tuo bundler (Turbopack, Rolldown, Rollup), da come vengono importati i messaggi (`import { m }` vs. `import * as m`) e dall'analisi dei side effect. Se scegli Paraglide per le sue dimensioni ridotte, apri il visualizzatore del bundle e controlla che tali promesse si mantengano nella tua applicazione.

## Nessun caricamento dinamico

Questo è il limite strutturale. Paraglide non prevede un meccanismo per caricare una sola lingua alla volta: ogni funzione di messaggio importa staticamente l'implementazione di ciascuna lingua, cosicché tutte le lingue finiscono nel bundle inviato al client.

Con 2 lingue, metà del payload delle traduzioni viene sprecato, in linea con il ~50% di perdita di locale misurato in precedenza. Con 10 lingue, il 90%. Con 30 lingue, il 97%.

Passare al caricamento dinamico non risolverebbe il problema: disponendo di una funzione per ciascun messaggio, caricare ogni funzione in modalità lazy comporterebbe migliaia di richieste di rete.

Intlayer consente di scegliere la strategia, a livello globale o per dizionario:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Cosa viene inviato al client                               | vs. Paraglide                        |
| ------------ | ---------------------------------------------------------- | ------------------------------------ |
| `static`     | Tutte le lingue dei dizionari utilizzati dalla pagina      | Teoricamente lo stesso contenuto     |
| `dynamic`    | Solo la lingua attiva, caricata on demand per dizionario   | **N volte più leggero** con N lingue |
| `fetch`      | Solo la lingua attiva, recuperata tramite la Live Sync API | **N volte più leggero** con N lingue |

Grazie alla [trasformazione in fase di build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e alla modalità `importMode: 'static'`, Intlayer carica, in teoria, esattamente lo stesso contenuto di Paraglide. Con `'dynamic'` o `'fetch'`, carica solo ciò che la lingua corrente richiede: per un'applicazione in N lingue, il payload delle traduzioni è N volte inferiore rispetto a Paraglide.

## Quando Paraglide è ancora adatto

<AccordionGroup>
<Accordion header="Svelte + Vite con poche lingue">

Se il tuo stack è Svelte con Vite e supporti due o tre lingue, il tree shaking funziona come promesso e il sovraccarico delle lingue rimane minimo.

</Accordion>
<Accordion header="Workflow inlang esistente">

Se il tuo team utilizza già l'ecosistema inlang (Fink, Sherlock, plugin per i formati dei messaggi), Paraglide vi si integra in modo nativo.

</Accordion>
</AccordionGroup>

## Provalo sulla tua applicazione

Verifica il payload e le perdite di locale della tua applicazione in produzione con l'[i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) gratuito:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Per configurare Intlayer:

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

## Ulteriori letture

- [Benchmark i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)
- [Benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md)
- [Ottimizzazione del bundle e `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md)
- [Come scegliere una libreria i18n per React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_react_i18n_library.md)
- [Perché scegliere l'internazionalizzazione guidata da compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)
