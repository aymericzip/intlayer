---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: import glob, chunk e messaggi a tempo di compilazione"
description: Cosa è realmente specifico di Vite in i18n. Cataloghi lazy con import.meta.glob, perché la suddivisione per route fallisce spesso, limiti HMR e plugin di compilazione.
keywords:
  - vite i18n
  - import.meta.glob
  - vite code splitting
  - lazy load traduzioni
  - vite plugin i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: gli aspetti che riguardano Vite, non il tuo framework

La maggior parte delle guide intitolate "Vite i18n" sono in realtà tutorial su React o Vue che usano incidentalmente Vite. Questo articolo analizza il livello sottostante: come vengono importati i cataloghi, cosa ne fa Rollup e perché il caricamento asincrono (lazy loading) che hai impostato probabilmente non è così asincrono come credi.

## Indice

<TOC/>

## L'import statico è il comportamento predefinito, ed è sincrono

La configurazione più immediata importa ogni catalogo in cima a un modulo:

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Questo include tre cataloghi direttamente nel chunk di ingresso principale, su ogni pagina, per ogni utente. È tollerabile per due lingue e un centinaio di testi. Con dieci lingue diventa il costo inutile più pesante dell'intero bundle.

## `import.meta.glob` e il flag che quasi tutti configurano male

L'importazione globale tramite pattern (glob import) di Vite è la soluzione naturale:

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

Il caricamento lazy è attivo di default: ogni voce è una funzione che restituisce un import dinamico, e Rollup emette un chunk separato per file. L'aggiunta di `{ eager: true }` inietta invece tutti i file all'interno del modulo importatore, vanificando l'ottimizzazione:

```ts
// Tutte le lingue nel chunk iniziale. Quasi mai ciò che si vuole:
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

La trappola è che entrambe le versioni funzionano in sviluppo, poiché Vite serve i singoli moduli non empaquetati. La differenza emerge solo nella cartella `dist`. Verifica con `npx vite build && npx vite preview` e ispeziona il contenuto effettivo dell'entry chunk.

## Lo splitting per route raramente divide i file

Questo è il comportamento che sorprende molti sviluppatori. Strutturi i cataloghi per pagina:

```
locales/en/home.json
locales/en/checkout.json
```

Se due route distinte importano `checkout.json`, Rollup promuove quel file a chunk condiviso caricato su entrambe le pagine. La logica di chunking di Rollup è guidata dal grafo delle dipendenze dei moduli, non dai nomi delle cartelle: qualsiasi modulo accessibile da più punti di ingresso diventa comune. Aggiungere una terza route non cambia nulla, e una quarta potrebbe generare una ripartizione del tutto differente.

La separazione delle lingue per route tiene quindi solo se il grafo delle importazioni è rigorosamente disgiunto. Se la dimensione del bundle è critica, misurala anziché fare supposizioni:

```bash
npx vite build && npx vite-bundle-visualizer
```

Per forzare i confini dei chunk, `build.rollupOptions.output.manualChunks` rappresenta la via d'uscita, al costo di una gestione manuale continuativa.

## I cataloghi non supportano l'Hot Reload (HMR)

Modifichi un componente e Vite lo aggiorna all'istante. Modifichi `locales/fr.json` e, a seconda di come è stato importato, non succede nulla. Il JSON importato dinamicamente non ha un confine HMR integrato, quindi il grafo dei moduli non sa come invalidare i componenti che lo consumano.

Molti sviluppatori aggirano il problema riavviando il dev server a ogni modifica dei testi, senza sapere che è evitabile. La soluzione compete al plugin i18n: deve gestire l'evento HMR e propagare i nuovi messaggi all'app in esecuzione. Quando valuti una libreria, verifica se il relativo plugin per Vite implementa questa logica.

## `define` fissa la lingua in modo immutabile

È allettante risolvere la lingua predefinita durante la compilazione:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` esegue una sostituzione puramente testuale in fase di build. Il valore presente al momento della compilazione è quello che viene distribuito, obbligando a un build separato per ogni lingua. Si tratta di una strategia valida, adottata ad esempio dal sistema i18n nativo di Angular, ma non è adatta se una singola distribuzione deve servire tutte le lingue.

I valori che devono variare in base alla richiesta dell'utente vanno gestiti a runtime, non in `define`.

## Spostare il parsing dei messaggi a tempo di compilazione

Ogni opzione matura in questo ecosistema converge verso il medesimo principio: non analizzare più i messaggi nel browser.

| Plugin                       | Cosa sposta a tempo di compilazione                                        |
| :--------------------------- | :------------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | Compila i messaggi vue-i18n in funzioni di render (bundle solo runtime)    |
| Lingui (macro + plugin)      | Estrae e compila i cataloghi, sostituisce le macro con gli ID messaggio    |
| Paraglide (inlang)           | Compila ciascun messaggio nella propria funzione tree-shakable             |
| `vite-intlayer`              | Genera dizionari per componente, elimina e minifica le chiavi inutilizzate |

Il vantaggio è duplice: il compilatore a runtime non finisce nel bundle e le voci non utilizzate possono essere rimosse staticamente. Il costo associato è che sia il dev server sia la CI devono eseguire il plugin, e un'esecuzione isolata di `tsc` o test runner non basati su Vite richiederanno configurazioni dedicate.

vue-i18n ne è l'esempio più lampante: senza `@intlify/unplugin-vue-i18n` distribuisci un compilatore che invoca internamente `new Function`, sprecando byte e sollevando problemi con la Content Security Policy (CSP).

## SSR: non conservare mai la lingua nello stato del modulo

Se utilizzi il rendering lato server (SSR), tramite un framework o con `vite-plugin-ssr`, la regola ferrea è questa: una variabile a livello di modulo che contiene la lingua corrente viene condivisa tra tutte le richieste concorrenti gestite da quel processo server.

```ts
// Sicuro nel browser. Una fuga di dati tra richieste distinte su un server:
export let currentLocale = "en";
```

Due utenti che interrogano il server contemporaneamente generano una race condition, e uno riceverà la lingua dell'altro. In sviluppo locale questo non si manifesta perché sei l'unico visitatore. Risolvi la lingua per ogni singola richiesta e passala esplicitamente tramite il contesto o l'archiviazione di richiesta del tuo framework.

## Il plugin Vite di Intlayer

Intlayer registra un unico plugin che gestisce la compilazione dei dizionari, il monitoraggio in modalità dev e la pipeline di ottimizzazione:

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

La riscrittura degli import, il purge e la minificazione sono attivi per impostazione predefinita. Le due opzioni chiave si configurano in `intlayer.config.ts`:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // rimuove i campi di contenuto non letti da alcun componente
    minify: true, // rinomina le chiavi in alias compatti
  },
};

export default config;
```

Dato che i contenuti sono dichiarati per componente anziché in file globali monolitici, la fase di purge opera su un grafo di moduli reale, garantendo un'eliminazione sicura dei testi orfani. Il compromesso è quello menzionato: il plugin è richiesto ovunque il codice venga compilato, inclusi ambienti CI e runner di test. Maggiori dettagli nella guida all'[ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md).

## Errori comuni

- **`{ eager: true }` su un glob inteso per il caricamento lazy.** Funziona in locale, spedisce tutte le lingue in produzione.
- **Affidarsi ai nomi delle cartelle per creare i chunk.** Rollup segue gli import, non le directory. Misura il build.
- **Riavviare il dev server per visualizzare un testo aggiornato.** È il sintomo di un handler HMR assente, non un comportamento fisiologico.
- **Inserire la lingua in `define`.** Ti vincola a compilare una build per ogni lingua.
- **Stato della lingua a livello di modulo con SSR.** Genera perdite di dati tra richieste concorrenti impossibili da riprodurre in locale.
- **Valutare le performance sul dev server.** I moduli non empaquetati non riflettono la struttura del bundle di produzione.

## Per approfondire

- [Ottimizzazione del bundle: purge, minificazione e payload finale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md)
- [Report di benchmark tra framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md)
- [Riferimento configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [Configurare Intlayer con Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)
- [Adattatore di compatibilità i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md)
- [React i18n: come funziona il modello a provider](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: funzionamento e punti deboli](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/vue.md)
- [i18n per componente vs centralizzata](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)
