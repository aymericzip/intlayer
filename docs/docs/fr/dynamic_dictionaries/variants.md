---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Variantes
description: Utilisez le champ de métadonnées variant dans les fichiers de contenu Intlayer pour déclarer des alternatives de contenu nommées ou structurées — tests A/B, bannières saisonnières, contenu sous feature flag, enregistrements de CMS, contenu propre à un utilisateur — et basculer entre elles à l'exécution sans changement de code.
keywords:
  - Variantes
  - Tests A/B
  - Feature Flags
  - Contenu dynamique
  - Enregistrements dynamiques
  - CMS
  - Intlayer
  - Internationalisation
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Sortie de la fonctionnalité des variantes"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` accepte désormais une chaîne ou un objet — les anciens `meta` / enregistrements dynamiques se déclarent comme variantes objet"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Une variante déclare uniquement les clés qu'elle remplace ; les variantes non déclarées se rabattent sur l'entrée par défaut"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Les fournisseurs acceptent une prop `variant` ambiante ; les sélecteurs acceptent une chaîne de préférence ordonnée"
author: aymericzip
---

# Variantes

Une **variante** est un ensemble de fichiers de contenu qui partagent la même clé de dictionnaire (`key`) mais portent chacun une valeur `variant` différente. Intlayer sert le fichier approprié en fonction du sélecteur passé à `useIntlayer`.

La valeur `variant` peut prendre **deux formes** :

- **Une chaîne** — une seule alternative nommée (tests A/B, bannières saisonnières, feature flags).
- **Un objet** — un discriminant structuré adressé par un ensemble de champs (enregistrements de CMS, contenu propre à un utilisateur, tout contenu indexé par un identifiant opaque). L'objet entier constitue l'identité : le sélecteur doit fournir un objet **égal** pour résoudre l'entrée.

> La forme objet remplace l'ancien champ `meta`. Partout où vous écriviez `meta: { id, … }`, écrivez `variant: { id, … }`, et sélectionnez-la avec `{ variant: { id, … } }`.

## Variantes nommées (chaîne)

Chaque fichier représente une alternative nommée. Omettre `variant` (ou le définir sur `"default"`) le marque comme valeur par défaut (fallback).

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

### Variantes partielles

Une variante déclare **uniquement les clés qu'elle remplace** ; le reste est hérité de l'entrée par défaut.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` hérité

useIntlayer("hero-banner", { variant: "never-declared" });
// → l'entrée par défaut
```

Ainsi, vous n'ajoutez un fichier de variante que là où la formulation diffère réellement. Une clé se résout en `null` uniquement lorsqu'elle déclare des variantes mais aucune entrée par défaut.

### Consommer des variantes nommées

#### Variante par défaut

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → variante par défaut

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
      // → variante par défaut

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
      // → variante par défaut

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
      // → variante par défaut

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

#### Variante nommée

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Variante nommée avec locale explicite

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Variantes objet (structurées)

Une variante objet adresse le contenu par un ensemble arbitraire de paires clé-valeur déclarées dans le champ `variant` — permettant de modéliser des enregistrements de CMS, du contenu propre à un utilisateur ou tout contenu dont la clé est un identifiant opaque. L'**objet entier** constitue l'identité : le sélecteur doit fournir un objet égal pour que l'entrée soit résolue.

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

### Consommer des variantes objet

Passez l'objet correspondant à `variant`. Chaque champ déclaré sur le dictionnaire doit être fourni et égal ; sinon le résultat est `null`. L'ordre des champs n'a pas d'importance.

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

#### Avec une locale explicite

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Champ manquant — aucune correspondance

```ts
// Renvoie null : `userId` est manquant, donc l'objet ne correspond pas à la variante déclarée
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Variante ambiante

Certaines dimensions de variante sont fixes pour toute une session — le locataire, le type d'établissement, le niveau d'abonnement. Elles sont résolues une seule fois, et aucun composant ne devrait avoir à les passer à la main.

> N'encapsulez pas `useIntlayer` dans votre propre hook pour les injecter. L'optimisation à la compilation ne réécrit qu'un appel littéral `useIntlayer("key")` importé depuis le paquet du framework : rien derrière un wrapper n'est intégré au bundle.

Déclarez plutôt la variante une seule fois sur le fournisseur, exactement comme `locale` :

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

Chaque lecture de dictionnaire sous le fournisseur se résout désormais avec cette variante, et un sélecteur au point d'appel l'emporte toujours :

```tsx
useIntlayer("hero-banner");
// → la variante du fournisseur

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — remplace la variante du fournisseur, elle ne l'étend pas
```

### Formes

La prop `variant` accepte trois formes :

| Forme                                                     | Signification                            |
| --------------------------------------------------------- | ---------------------------------------- |
| `variant="school1"`                                       | une variante nommée pour toutes les clés |
| `variant={["school1", "default"]}`                        | une chaîne de préférence ordonnée        |
| `variant={{ "hero-banner": "school1", default: "base" }}` | une variante par clé de dictionnaire     |

#### Chaîne de préférence

Une chaîne est parcourue de gauche à droite parmi les entrées déclarées par chaque clé, et la première déclarée l'emporte. Si aucune ne l'est, l'entrée par défaut implicite est utilisée — exactement comme pour une valeur unique.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` ne déclare pas d'entrée `school1` mais déclare `school2` → "school2"
// une clé qui ne déclare ni l'une ni l'autre → l'entrée par défaut
```

Ainsi `["black_friday", "summer"]` se lit « black friday si cette clé en a une, sinon summer, sinon par défaut ». Les chaînes sont également acceptées au point d'appel :

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Notez qu'il s'agit de l'image inverse du tableau accepté par le **champ** `variant` d'un fichier de contenu : là, un tableau _déclare_ une entrée par élément ; ici, il les _consomme_ par ordre de priorité.

#### Table par clé

Adressez chaque clé de dictionnaire séparément. L'entrée réservée `default` couvre toutes les clés non listées :

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> Sur un fournisseur, un objet simple est **toujours** lu comme la table par clé, jamais comme une variante objet — les deux sont structurellement identiques. Pour fixer une variante objet globalement, imbriquez-la sous une entrée : `variant={{ default: { id: "prod_abc" } }}`.

Comme les clés de la table sont vérifiées par rapport à vos clés de dictionnaire déclarées, une faute de frappe — ou une variante objet écrite directement, telle que `variant={{ id: "prod_abc" }}` — est une erreur de compilation.

## Mode de chargement

Les variantes objet sont souvent chargées de façon différée. Définissez `importMode` sur le dictionnaire pour contrôler ce comportement :

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Voir [optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) pour les détails sur les modes `static`, `dynamic` et `fetch`.

## Cas d'usage typiques

- Tests A/B de texte pilotés par une clé d'expérience
- Bannières saisonnières ou promotionnelles
- Messages sous feature flag
- Campagnes marketing spécifiques à une locale
- Texte marketing par produit géré dans un CMS
- Contenu propre à un utilisateur ou à un compte
- Tout contenu indexé par un identifiant opaque à l'exécution
