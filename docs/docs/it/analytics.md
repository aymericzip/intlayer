---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Traccia l'esposizione dei contenuti ed esegui test A/B
description: Scopri come @intlayer/analytics traccia le visualizzazioni di pagine/lingue e l'esposizione dei contenuti, e come usarlo per eseguire test A/B sui tuoi contenuti Intlayer.
keywords:
  - Analytics
  - Test A/B
  - Audience
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Abilitare gli analytics per impostazione predefinita quando `@intlayer/analytics` è installato"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — pacchetto @intlayer/analytics, tracciamento a livello provider/nodo, test A/B, dashboard"
author: aymericzip
---

# Documentazione Intlayer Analytics

`@intlayer/analytics` è un pacchetto complementare opzionale che ti indica **quali contenuti vengono effettivamente mostrati** ai tuoi visitatori — in quale pagina, in quale lingua (locale) e quale specifico frammento di contenuto tradotto — così da poter comprendere il tuo pubblico ed eseguire **test A/B sui contenuti**.

## Indice

<TOC/>

---

## Cosa traccia

`@intlayer/analytics` raggruppa tre tipi di eventi anonimi in batch:

| Evento             | Dove viene catturato                             | Cosa ti dice                                                                                                                                       |
| ------------------ | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Livello Provider (`IntlayerProvider`)            | Quale pagina e lingua una sessione ha visualizzato, al caricamento iniziale, al cambio di rotta o al cambio di lingua.                             |
| `content_exposure` | Livello Nodo (`useIntlayer` / plugin interpreti) | Quale chiave del dizionario / percorso della chiave è stato effettivamente risolto e mostrato — e, se parte di un esperimento, quale **variante**. |
| `conversion`       | Ovunque chiami `useConversion()`                 | Un obiettivo raggiunto (registrazione, clic, acquisto...) attribuito alla variante A/B a cui la sessione è stata esposta.                          |

Gli eventi vengono raccolti in memoria e inviati come una **singola richiesta batch all'incirca ogni 20 secondi** — mai a ogni pressione di tasto o rendering — così l'analisi non impatta mai il tempo di primo rendering né aggiunge una richiesta per interazione.

## Come supporta i test A/B sui contenuti

Intlayer ti permette già di dichiarare le [Varianti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) del contenuto (es. un dizionario `hero-banner` con una variante `control` e una `black_friday`). `@intlayer/analytics` chiude il cerchio:

1. `getVariant(experimentKey, variants)` assegna in modo deterministico ogni sessione anonima a una variante — una funzione pura dell'id della sessione e della chiave dell'esperimento, quindi l'assegnazione è **stabile per tutta la sessione** e non richiede **round-trip al server** prima del primo rendering (nessun fastidioso sfarfallio, nessun layout shift).
2. Ogni evento di `content_exposure` trasporta la `variant` che è stata mostrata.
3. `useConversion()` ti permette di attribuire un obiettivo (es. `"cta_click"`) a quella variante.
4. L'endpoint dei risultati degli esperimenti della dashboard confronta i tassi di conversione per variante, includendo la significatività statistica (uno z-test).

## Installazione

`@intlayer/analytics` è una **dipendenza opzionale** di ogni pacchetto di framework (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), quindi la maggior parte dei progetti la possiede già. Installala esplicitamente se la tua configurazione salta le dipendenze opzionali (`npm install --no-optional`, …):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Installare il pacchetto è tutto ciò che serve per attivare gli analytics: `analytics.enabled` vale `true` per impostazione predefinita e `@intlayer/config` lo risolve a `false` ogni volta che il pacchetto non viene trovato nel progetto. Se non la installi, ogni punto di integrazione si risolve in una no-op (nessuna operazione) — vedi [Costo zero quando non installato](#costo-zero-quando-non-installato) di seguito.

## Configurazione

Gli analytics non richiedono alcuna configurazione per partire: sono **abilitati per impostazione predefinita** e **riutilizzano il blocco di configurazione `editor` esistente** per l'endpoint e la chiave di progetto.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Utilizzato anche come endpoint di acquisizione analytics
    clientId: "your-client-id", // Utilizzato anche come chiave progetto analytics
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — l'URL base a cui vengono inviati gli eventi analytics (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — la chiave pubblica del progetto attribuita a ogni evento acquisito. Funge anche da **interruttore di abilitazione**: l'analisi rimane completamente disabilitata (e scartata dal tree-shaking, vedi sotto) finché `clientId` non viene configurato.

Se gestisci Intlayer in self-hosting, le analytics puntano automaticamente alla tua istanza poiché condivide `editor.backendURL`.

### Chiamare l'API dal browser

Lo stesso token supporta un piccolo client senza credenziali, così un sito statico o una SPA può leggere il contenuto del proprio CMS a runtime senza server, senza server action e senza alcun segreto nel bundle:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

Si autentica da solo a partire da `editor.clientId`: lo scambio, la cache e il rinnovo sono gestiti internamente. Gli scope delimitano ciò a cui può accedere: il contenuto dei dizionari pubblicati e l'acquisizione degli analytics. Qualsiasi altra operazione (pubblicare dizionari, leggere un progetto, spendere crediti IA) richiede una credenziale reale, quindi un server o un utente autenticato.

### Come disattivarli

Il blocco opzionale `analytics` regola — o disattiva — la raccolta:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Predefinito: true — esclude l'intera integrazione dal bundle
    flushInterval: 20_000, // Millisecondi tra due invii in batch
    sampleRate: 1, // Frazione di sessioni da registrare, da 0 (nessuna) a 1 (tutte)
  },
};

export default config;
```

Disinstallare `@intlayer/analytics` ha lo stesso effetto di `enabled: false`. Consulta il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per l'elenco completo dei campi.

## Utilizzo

### Tracciamento automatico a livello di provider

Non sono richieste modifiche al codice. Una volta installato `@intlayer/analytics` e configurato `editor.clientId`, `IntlayerProvider` automaticamente:

- inizializza il client analytics al montaggio (mount),
- registra un `page_view` al caricamento iniziale,
- registra un `page_view` ad ogni cambio di lingua (locale),
- avvia il ciclo di svuotamento (flush) di ~20s e svuota eventuali eventi rimanenti allo smontaggio / chiusura della scheda (tramite `navigator.sendBeacon`, con fallback su `fetch(..., { keepalive: true })`).

Il punto di ingresso cambia in base al framework, ma in ogni caso è lo stesso che usi già per configurare Intlayer, quindi non c'è nulla in più da aggiungere:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` monta internamente il provider degli analytics.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer` ri-esporta l'`IntlayerProvider` di React, quindi gli analytics vengono collegati allo stesso modo.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    Il plugin `intlayer` registra gli hook degli analytics nel ciclo di vita del componente radice.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > Con Nuxt, `nuxt-intlayer` installa il plugin per te: non c'è nulla da fare.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` avvia gli analytics dal componente che configura Intlayer.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` monta internamente il provider degli analytics.

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` monta il provider degli analytics in modo lazy, così il chunk resta fuori dal percorso critico.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` include già `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > Usa `provideIntlayerAnalytics()` da solo solo se gestisci i provider singolarmente.

  </Tab>
</Tabs>

### Tracciamento automatico a livello di nodo

Ogni volta che `useIntlayer` risolve un pezzo di contenuto da mostrare, l'interprete riporta un evento di `content_exposure` per quell'esatto `dictionaryKey` + percorso della chiave + lingua — di nuovo, nessuna modifica al codice richiesta. Le esposizioni ripetute dello stesso nodo entro una finestra di flush vengono riunite in un singolo evento con un conteggio (`count`), così un elenco che esegue 50 re-rendering non invia 50 eventi.

### Tracciare le conversioni per i test A/B

Usa `useConversion()` per attribuire un obiettivo alla variante che una sessione ha visto:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "react-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Inizia ora
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Inizia ora
        </button>
      );
    };
    ```

    > `useConversion` è un hook client: contrassegna il componente con `"use client"`.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        Inizia ora
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      Inizia ora
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Inizia ora
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Inizia ora
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">Inizia ora</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### Risolvere una variante lato client

`useExperiment()` assegna la sessione a una variante e registra l'esposizione che diventa il denominatore del tasso di conversione. Mostra il sottoalbero dipendente dalla variante solo quando `isAssigned` è vero, così nessun visitatore vede il breve lampeggio del controllo prima che l'assegnazione sia risolta:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` è una semplice stringa.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` è una semplice stringa. L'assegnazione avviene nel browser, quindi il componente deve essere un componente client.

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` e `isAssigned` sono `Ref`.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` e `isAssigned` sono store: leggili con il prefisso `$`.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` è una semplice stringa.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` e `isAssigned` sono `Accessor`: chiamali per leggere il valore.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` e `isAssigned` sono `Signal`: chiamali per leggere il valore.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

I pesi sono opzionali — passane uno per variante per alterare la suddivisione, ad esempio `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

Il figlio legge quindi la [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md) del dizionario che corrisponde:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> Leggere la variante in un **componente figlio** è ciò che fa funzionare tutto questo al di fuori di React: in Vue, Svelte, Solid e Angular, il selettore passato a `useIntlayer` viene catturato quando il componente viene configurato, quindi la lettura deve avvenire in un componente che si monta solo dopo che la variante è nota.

Se l'esperimento copre un'intera pagina anziché un singolo dizionario, solleva la variante fino al provider — vedi [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md#ambient-variant). Ogni `useIntlayer` sottostante si risolverà quindi rispetto ad essa senza modifiche al punto di chiamata.

Se hai bisogno dell'assegnazione grezza al di fuori di un componente, accedi direttamente al client:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` si limita ad assegnare — non registra l'esposizione. Preferisci `useExperiment()`, altrimenti il tasso di conversione non avrà un denominatore.

## Privacy e prestazioni

- **Anonimo by design**: le sessioni sono identificate da un id a rotazione; il backend memorizza sempre e solo un **hash SHA-256** di quell'id — mai l'id non elaborato, mai un indirizzo IP.
- **La localizzazione è approssimativa**: solo un codice paese, derivato dalle intestazioni di geolocalizzazione della CDN (`cf-ipcountry`, `x-vercel-ip-country`, ...) — nessun IP viene letto o memorizzato.
- **Gli URL escludono i parametri di ricerca** per impostazione predefinita, quindi le query string non vengono mai catturate.
- **Campionamento (Sampling)**: `sampleRate` ti permette di conservare solo una frazione degli eventi di esposizione dei contenuti nelle app ad alto traffico.
- **In batch**: una richiesta circa ogni 20 secondi (`flushInterval`), o prima se il buffer si riempie (`maxBufferSize`) — mai una richiesta per evento.

### Costo zero quando non installato

`@intlayer/analytics` segue esattamente lo stesso pattern di dipendenza opzionale di `@intlayer/editor`:

- ogni punto di integrazione carica il pacchetto tramite un **`import()` dinamico racchiuso in `try/catch`** — un'app che non installa mai `@intlayer/analytics` non paga un costo in termini di bundle-size o runtime, e non vede mai un errore;
- una variabile d'ambiente in fase di compilazione (`INTLAYER_ANALYTICS_ENABLED`), impostata automaticamente a `'false'` da `@intlayer/config` quando il pacchetto non è installato, `analytics.enabled` è `false` oppure `editor.clientId` non è configurato, consente ai bundler di **eliminare come codice morto (dead-code-eliminate)** l'intera integrazione;
- le analytics sono disabilitate all'interno dell'iframe di anteprima di Intlayer editor/CMS, in modo che le sessioni dell'editor non contino mai come vero traffico.

## Dashboard: Pagina Analytics

Una volta che il tuo progetto ha raccolto eventi, la pagina **Analytics** nella [dashboard di Intlayer](https://app.intlayer.org/analytics) (visibile nella barra laterale una volta selezionato un progetto) mostra:

- **Utenti attivi** — visitatori distinti nella finestra mobile selezionata (7 / 30 / 90 giorni).
- **Utenti di oggi** e **utenti negli ultimi 7 giorni**.
- **Visualizzazioni di pagina** nella finestra selezionata.
- Un **grafico di evoluzione** dei visitatori distinti giornalieri.
- Schede di ripartizione per **Lingue (Locales)** e **Posizione (Location)**, classificando il tuo pubblico per lingua e per nazione.

## Riferimento API Backend

Tutti gli endpoint di lettura richiedono l'autenticazione; l'acquisizione è pubblica e attribuita dal `clientId`.

| Metodo | Endpoint                                    | Descrizione                                                                          |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------ |
| `POST` | `/api/analytics/events`                     | Ingerisci un batch di eventi (pubblico, attribuito da `clientId` nel body).          |
| `GET`  | `/api/analytics/overview`                   | Totali pagina/lingua per il progetto autenticato.                                    |
| `GET`  | `/api/analytics/audience?days=30`           | Visitatori distinti, visualizzazioni pagina, serie giornaliera, ripartizioni.        |
| `GET`  | `/api/analytics/content-stats`              | Totali esposizione per contenuto, raggruppati per chiave dizionario/percorso/lingua. |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Tassi di conversione per variante e significatività statistica per test A/B.         |

Puoi anche richiamare questi endpoint in modo programmatico con il [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

> **Solo lato server.** `createIntlayerCMS()` si autentica con `clientId` + `clientSecret`, e il segreto non è mai disponibile nel browser: questo snippet emetterebbe richieste non autenticate se venisse eseguito lì. Mantienilo in un route handler, una server action o uno script.

## Link utili

- [Dizionari Dinamici - Collezioni & Varianti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
- [Riferimento Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [Guida Self-Hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md)
