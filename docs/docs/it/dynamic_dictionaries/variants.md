---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Varianti
description: Usa il campo di metadati variant nei file di contenuto Intlayer per dichiarare alternative di contenuto con nome o strutturate — test A/B, banner stagionali, testo con feature flag, record di CMS, contenuti specifici per utente — e passare dall'una all'altra a runtime senza modifiche al codice.
keywords:
  - Varianti
  - Test A/B
  - Feature Flag
  - Contenuto dinamico
  - Record dinamici
  - CMS
  - Intlayer
  - Internazionalizzazione
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Rilascio della funzionalità delle varianti"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` ora accetta una stringa o un oggetto — i precedenti `meta` / record dinamici vengono dichiarati come varianti oggetto"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Una variante dichiara solo le chiavi che sovrascrive; le varianti non dichiarate ricadono sulla voce predefinita"
  - version: 9.1.2
    date: 2026-08-04
    changes: "I provider accettano una prop `variant` ambientale; i selettori accettano una catena di preferenza ordinata"
author: aymericzip
---

# Varianti

Una **variante** è un insieme di file di contenuto che condividono la stessa chiave del dizionario (`key`) ma portano ciascuno un valore `variant` diverso. Intlayer serve il file appropriato in base al selettore passato a `useIntlayer`.

Il valore di `variant` può assumere **due forme**:

- **Una stringa** — una singola alternativa con nome (test A/B, banner stagionali, feature flag).
- **Un oggetto** — un discriminatore strutturato indirizzato da un insieme di campi (record di CMS, contenuti specifici per utente, qualsiasi contenuto con chiave un ID opaco). L'intero oggetto è l'identità: il selettore deve fornire un oggetto **uguale** per risolvere la voce.

> La forma a oggetto sostituisce il precedente campo `meta`. Ovunque scrivessi `meta: { id, … }`, scrivi `variant: { id, … }` e selezionala con `{ variant: { id, … } }`.

## Varianti con nome (stringa)

Ogni file rappresenta un'alternativa con nome. Omettere `variant` (o impostarlo su `"default"`) la contrassegna come fallback.

```ts fileName="hero-banner.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "default",
  content: {
    headline: t({
      en: "Build faster with Intlayer",
      fr: "Développez plus vite avec Intlayer",
    }),
    cta: t({ en: "Get started", fr: "Commencer" }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="hero-banner.black-friday.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: t({
      en: "50 % off — today only",
      fr: "−50 % — aujourd'hui seulement",
    }),
    cta: t({ en: "Shop now", fr: "Acheter maintenant" }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Varianti parziali

Una variante dichiara **solo le chiavi che sovrascrive**; il resto viene ereditato dalla voce predefinita.

```ts fileName="hero-banner.summer.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "summer",
  content: {
    headline: t({
      en: "Build faster all summer",
      fr: "Développez plus vite tout l'été",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
useIntlayer("hero-banner", { variant: "summer" });
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` ereditato

useIntlayer("hero-banner", { variant: "never-declared" });
// → la voce predefinita
```

Quindi aggiungi un file variante solo dove la formulazione differisce effettivamente. Una chiave si risolve in `null` solo quando dichiara varianti ma nessuna voce predefinita.

### Consumare varianti con nome

#### Variante predefinita

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → variante predefinita

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → variante predefinita

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Hero.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { headline, cta } = useIntlayer("hero-banner");
    </script>

    <template>
      <section>
        <h1>{{ headline }}</h1>
        <a>{{ cta }}</a>
      </section>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Hero.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("hero-banner");
    </script>

    <section>
      <h1>{$content.headline}</h1>
      <a>{$content.cta}</a>
    </section>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → variante predefinita

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Hero = () => {
      const content = useIntlayer("hero-banner");
      // → variante predefinita

      return (
        <section>
          <h1>{content().headline}</h1>
          <a>{content().cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="hero.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-hero",
      template: `
        <section>
          <h1>{{ content().headline }}</h1>
          <a>{{ content().cta }}</a>
        </section>
      `,
    })
    export class HeroComponent {
      content = useIntlayer("hero-banner");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="hero.js"
    import { useIntlayer } from "vanilla-intlayer";

    const { headline, cta } = useIntlayer("hero-banner");

    document.body.innerHTML = `
      <section>
        <h1>${headline}</h1>
        <a>${cta}</a>
      </section>
    `;
    ```

  </Tab>
</Tabs>

#### Variante con nome

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Variante con nome con locale esplicito

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Varianti oggetto (strutturate)

Una variante oggetto indirizza il contenuto tramite un insieme arbitrario di coppie chiave-valore dichiarate nel campo `variant` — rendendo possibile modellare record di CMS, contenuti specifici per utente o qualsiasi contenuto la cui chiave è un ID opaco. L'**intero oggetto** è l'identità: il selettore deve fornire un oggetto uguale affinché la voce venga risolta.

```ts fileName="product.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abc", userId: "user_123" },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abcd", userId: "user_123" },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Consumare varianti oggetto

Passa l'oggetto corrispondente a `variant`. Ogni campo dichiarato nel dizionario deve essere fornito e uguale; altrimenti il risultato è `null`. L'ordine dei campi non ha importanza.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Product.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product", {
      variant: { id: props.productId, userId: props.userId },
    });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Product.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product", {
      variant: { id: productId, userId },
    });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Product = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: props.productId, userId: props.userId },
      });

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product", {
          variant: { id: this.productId, userId: this.userId },
        });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product", {
      variant: { id: "prod_abcd", userId: "user_123" },
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

#### Con locale esplicito

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Campo mancante — nessuna corrispondenza

```ts
// Restituisce null: manca `userId`, quindi l'oggetto non corrisponde alla variante dichiarata
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Variante ambientale

Alcune dimensioni di variante sono fisse per un'intera sessione: il tenant, il tipo di istituto, il livello di piano. Vengono risolte una sola volta e nessun componente dovrebbe doverle passare a mano.

> Non incapsulare `useIntlayer` in un hook personalizzato per iniettarle. L'ottimizzazione in fase di build riscrive solo una chiamata letterale `useIntlayer("key")` importata dal pacchetto del framework, quindi nulla dietro un wrapper finisce nel bundle.

Dichiara invece la variante una sola volta sul provider, esattamente come `locale`:

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "react-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerServerProvider } from "next-intlayer/server";
    import { IntlayerClientProvider } from "next-intlayer";

    export default async function Layout({ children, params }) {
      const { locale } = await params;
      const schoolType = await getSchoolType();

      return (
        <IntlayerServerProvider locale={locale} variant={schoolType}>
          <IntlayerClientProvider locale={locale} variant={schoolType}>
            {children}
          </IntlayerClientProvider>
        </IntlayerServerProvider>
      );
    }
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```ts fileName="main.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { createApp } from "vue";
    import { installIntlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    installIntlayer(app, { locale: "en", variant: schoolType });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="+layout.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { setupIntlayer } from "svelte-intlayer";

    export let schoolType: string;

    setupIntlayer("en", schoolType);
    </script>

    <slot />
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "preact-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "solid-intlayer";

    export const App = (props) => (
      <IntlayerProvider locale={props.locale} variant={props.schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="app.config.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { ApplicationConfig } from "@angular/core";
    import { provideIntlayer } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer("en", true, schoolType)],
    };
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="main.js"
    import { installIntlayer } from "vanilla-intlayer";

    installIntlayer({ locale: "en", variant: schoolType });
    ```

  </Tab>
</Tabs>

Ogni lettura di dizionario sotto il provider si risolve ora con quella variante, e un selettore nel punto di chiamata vince sempre:

```tsx
useIntlayer("hero-banner");
// → la variante del provider

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — sostituisce la variante del provider, non la estende
```

### Forme

La prop `variant` accetta tre forme:

| Forma                                                     | Significato                             |
| --------------------------------------------------------- | --------------------------------------- |
| `variant="school1"`                                       | una variante denominata per ogni chiave |
| `variant={["school1", "default"]}`                        | una catena di preferenza ordinata       |
| `variant={{ "hero-banner": "school1", default: "base" }}` | una variante per chiave di dizionario   |

#### Catena di preferenza

Una catena viene percorsa da sinistra a destra tra le voci dichiarate da ciascuna chiave e vince la prima dichiarata. Quando nessuna è dichiarata, si usa la voce predefinita implicita, esattamente come per un valore singolo.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` non dichiara una voce `school1` ma dichiara `school2` → "school2"
// una chiave che non dichiara nessuna delle due → la voce predefinita
```

Quindi `["black_friday", "summer"]` si legge come «black friday se questa chiave ne ha una, altrimenti summer, altrimenti predefinita». Le catene sono accettate anche nel punto di chiamata:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Nota che questa è l'immagine speculare dell'array accettato dal **campo** `variant` di un file di contenuto: lì un array _dichiara_ una voce per elemento, qui le _consuma_ in ordine di priorità.

#### Mappa per chiave

Indirizza ogni chiave di dizionario separatamente. La voce riservata `default` copre tutte le chiavi non elencate:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> Su un provider un oggetto semplice è **sempre** letto come mappa per chiave, mai come variante oggetto: le due sono strutturalmente identiche. Per fissare una variante oggetto a livello globale, annidala sotto una voce: `variant={{ default: { id: "prod_abc" } }}`.

Poiché le chiavi della mappa sono verificate rispetto alle chiavi di dizionario dichiarate, un refuso — o una variante oggetto scritta direttamente, come `variant={{ id: "prod_abc" }}` — è un errore di compilazione.

## Modalità di caricamento

Le varianti oggetto sono spesso caricate in modo differito. Imposta `importMode` sul dizionario per controllarlo:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) per i dettagli sulle modalità `static`, `dynamic` e `fetch`.

## Casi d'uso tipici

- Test A/B di testo guidati da una chiave di esperimento
- Banner stagionali o promozionali
- Messaggistica con feature flag
- Campagne di marketing specifiche per locale
- Testo di marketing per prodotto gestito in un CMS
- Contenuti specifici per utente o account
- Qualsiasi contenuto indicizzato da un ID opaco a runtime
