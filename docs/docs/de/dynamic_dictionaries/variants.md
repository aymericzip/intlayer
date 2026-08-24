---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Varianten
description: Verwenden Sie das variant-Metadatenfeld in Intlayer-Inhaltsdateien, um benannte oder strukturierte Inhaltsalternativen zu deklarieren — A/B-Tests, saisonale Banner, Feature-Flag-Texte, CMS-Datensätze, benutzerspezifische Inhalte — und zur Laufzeit ohne Codeänderungen zwischen ihnen zu wechseln.
keywords:
  - Varianten
  - A/B-Tests
  - Feature-Flags
  - Dynamischer Inhalt
  - Dynamische Datensätze
  - CMS
  - Intlayer
  - Internationalisierung
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Veröffentlichung der Varianten-Funktion"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` akzeptiert jetzt einen String oder ein Objekt — die früheren `meta` / dynamischen Datensätze werden als Objekt-Varianten deklariert"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Eine Variante deklariert nur die Schlüssel, die sie überschreibt; nicht deklarierte Varianten fallen auf den Standardeintrag zurück"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Provider akzeptieren eine ambiente `variant`-Prop; Selektoren akzeptieren eine geordnete Präferenzkette"
author: aymericzip
---

# Varianten

Eine **Variante** ist eine Gruppe von Inhaltsdateien, die denselben Wörterbuch-`key` teilen, aber jeweils einen anderen `variant`-Wert tragen. Intlayer liefert die passende Datei basierend auf dem an `useIntlayer` übergebenen Selektor.

Der `variant`-Wert kann **zwei Formen** annehmen:

- **Ein String** — eine einzelne benannte Alternative (A/B-Tests, saisonale Banner, Feature-Flags).
- **Ein Objekt** — ein strukturierter Diskriminator, der über eine Reihe von Feldern adressiert wird (CMS-Datensätze, benutzerspezifische Inhalte, beliebige Inhalte mit einer opaken ID als Schlüssel). Das gesamte Objekt ist die Identität: Der Selektor muss ein **gleiches** Objekt liefern, um den Eintrag aufzulösen.

> Die Objektform ersetzt das frühere `meta`-Feld. Überall, wo Sie zuvor `meta: { id, … }` geschrieben haben, schreiben Sie `variant: { id, … }` und wählen es mit `{ variant: { id, … } }` aus.

## Benannte (String-)Varianten

Jede Datei stellt eine benannte Alternative dar. Das Weglassen von `variant` (oder das Setzen auf `"default"`) markiert sie als Fallback.

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

### Teilvarianten

Eine Variante deklariert **nur die Schlüssel, die sie überschreibt**; der Rest wird vom Standardeintrag geerbt.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` geerbt

useIntlayer("hero-banner", { variant: "never-declared" });
// → der Standardeintrag
```

Fügen Sie also nur dort eine Varianten-Datei hinzu, wo der Wortlaut tatsächlich abweicht. Ein Schlüssel wird nur dann in `null` aufgelöst, wenn er Varianten deklariert, aber keinen Standardeintrag.

### Benannte Varianten verwenden

#### Standardvariante

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → Standardvariante

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
      // → Standardvariante

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
      // → Standardvariante

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
      // → Standardvariante

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

#### Benannte Variante

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Benannte Variante mit explizitem Locale

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Objekt-Varianten (strukturiert)

Eine Objekt-Variante adressiert Inhalte über eine beliebige Menge von Schlüssel-Wert-Paaren, die im `variant`-Feld deklariert sind — wodurch sich CMS-Datensätze, benutzerspezifische Inhalte oder beliebige Inhalte mit einer opaken ID als Schlüssel modellieren lassen. Das **gesamte Objekt** ist die Identität: Der Selektor muss ein gleiches Objekt liefern, damit der Eintrag aufgelöst wird.

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

### Objekt-Varianten verwenden

Übergeben Sie das passende Objekt an `variant`. Jedes im Wörterbuch deklarierte Feld muss angegeben und gleich sein; andernfalls ist das Ergebnis `null`. Die Reihenfolge der Felder spielt keine Rolle.

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

#### Mit explizitem Locale

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Fehlendes Feld — keine Übereinstimmung

```ts
// Gibt null zurück: `userId` fehlt, daher passt das Objekt nicht zur deklarierten Variante
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Ambiente Variante

Manche Variantendimensionen stehen für eine ganze Sitzung fest — der Mandant, der Schultyp, die Tarifstufe. Sie werden einmal aufgelöst, und keine Komponente sollte sie von Hand durchreichen müssen.

> Kapseln Sie `useIntlayer` nicht in einen eigenen Hook, um sie einzuschleusen. Die Optimierung zur Bauzeit schreibt nur einen literalen `useIntlayer("key")`-Aufruf um, der aus dem Framework-Paket importiert wurde — hinter einem Wrapper wird nichts gebündelt.

Deklarieren Sie die Variante stattdessen einmal am Provider, genau wie `locale`:

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
    <Tabs>
      <Tab label="Intlayer >=9.4" value=">=9.4">

        ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
        import { IntlayerProvider } from "next-intlayer/server";

        export default async function Layout({ children, params }) {
          const { locale } = await params;
          const schoolType = await getSchoolType();

          return (
            <IntlayerProvider locale={locale} variant={schoolType}>
              {children}
            </IntlayerProvider>
          );
        }
        ```

      </Tab>
      <Tab label="Intlayer <9.4" value="<9.4">

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
    </Tabs>

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

Jeder Wörterbuchzugriff unterhalb des Providers wird nun gegen diese Variante aufgelöst, und ein Selektor an der Aufrufstelle gewinnt immer:

```tsx
useIntlayer("hero-banner");
// → die Variante des Providers

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — ersetzt die Provider-Variante, sie wird nicht erweitert
```

### Formen

Die `variant`-Prop akzeptiert drei Formen:

| Form                                                      | Bedeutung                                  |
| --------------------------------------------------------- | ------------------------------------------ |
| `variant="school1"`                                       | eine benannte Variante für jeden Schlüssel |
| `variant={["school1", "default"]}`                        | eine geordnete Präferenzkette              |
| `variant={{ "hero-banner": "school1", default: "base" }}` | eine Variante pro Wörterbuchschlüssel      |

#### Präferenzkette

Eine Kette wird von links nach rechts gegen die von jedem Schlüssel deklarierten Einträge geprüft; der erste deklarierte gewinnt. Ist keiner deklariert, wird der implizite Standardeintrag verwendet — genau wie bei einem Einzelwert.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` deklariert keinen `school1`-Eintrag, aber `school2` → "school2"
// ein Schlüssel, der keinen von beiden deklariert → der Standardeintrag
```

`["black_friday", "summer"]` liest sich also als „black friday, falls dieser Schlüssel eine hat, sonst summer, sonst Standard“. Ketten werden auch an der Aufrufstelle akzeptiert:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Beachten Sie, dass dies das Spiegelbild des Arrays ist, das das `variant`-**Feld** einer Inhaltsdatei akzeptiert: dort _deklariert_ ein Array einen Eintrag je Element, hier _konsumiert_ es sie in Prioritätsreihenfolge.

#### Zuordnung je Schlüssel

Sprechen Sie jeden Wörterbuchschlüssel einzeln an. Der reservierte Eintrag `default` deckt alle nicht aufgeführten Schlüssel ab:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> An einem Provider wird ein einfaches Objekt **immer** als Zuordnung je Schlüssel gelesen, nie als Objektvariante — beide sind strukturell identisch. Um eine Objektvariante global festzulegen, verschachteln Sie sie unter einem Eintrag: `variant={{ default: { id: "prod_abc" } }}`.

Da die Schlüssel der Zuordnung gegen Ihre deklarierten Wörterbuchschlüssel geprüft werden, ist ein Tippfehler — oder eine direkt geschriebene Objektvariante wie `variant={{ id: "prod_abc" }}` — ein Compilerfehler.

## Lademodus

Objekt-Varianten werden oft verzögert geladen. Setzen Sie `importMode` im Wörterbuch, um dies zu steuern:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) für Details zu den Modi `static`, `dynamic` und `fetch`.

## Typische Anwendungsfälle

- A/B-Texttests, gesteuert durch einen Experiment-Schlüssel
- Saisonale oder Werbebanner
- Feature-Flag-gesteuerte Nachrichten
- Locale-spezifische Marketingkampagnen
- Produktspezifische Marketingtexte, die in einem CMS verwaltet werden
- Benutzer- oder kontospezifische Inhalte
- Beliebige Inhalte, die durch eine opake Laufzeit-ID adressiert werden
