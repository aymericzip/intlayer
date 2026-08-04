---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Warianty
description: Użyj pola metadanych variant w plikach treści Intlayer, aby zadeklarować nazwane lub strukturalne alternatywy treści — testy A/B, banery sezonowe, teksty z feature flag, rekordy CMS, treść zależną od użytkownika — i przełączać się między nimi w czasie wykonywania bez zmian w kodzie.
keywords:
  - Warianty
  - Testy A/B
  - Feature flagi
  - Treść dynamiczna
  - Rekordy dynamiczne
  - CMS
  - Intlayer
  - Internacjonalizacja
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Wydanie funkcji wariantów"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` akceptuje teraz ciąg znaków lub obiekt — dawne rekordy `meta` / dynamiczne są deklarowane jako warianty obiektowe"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Wariant deklaruje tylko klucze, które nadpisuje; niezadeklarowane warianty powracają do domyślnego wpisu"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Dostawcy przyjmują otaczający prop `variant`; selektory przyjmują uporządkowany łańcuch preferencji"
author: aymericzip
---

# Warianty

**Wariant** to zestaw plików treści, które dzielą ten sam klucz słownika (`key`), lecz każdy ma inną wartość `variant`. Intlayer udostępnia odpowiedni plik na podstawie selektora przekazanego do `useIntlayer`.

Wartość `variant` może przyjmować **dwie formy**:

- **Ciąg znaków** — pojedyncza nazwana alternatywa (testy A/B, banery sezonowe, feature flagi).
- **Obiekt** — strukturalny dyskryminator adresowany zestawem pól (rekordy CMS, treść zależna od użytkownika, dowolna treść z nieprzezroczystym ID jako kluczem). Tożsamością jest cały obiekt: selektor musi dostarczyć **równy** obiekt, aby rozwiązać wpis.

> Forma obiektowa zastępuje dawne pole `meta`. Wszędzie, gdzie wcześniej pisałeś `meta: { id, … }`, napisz `variant: { id, … }` i wybierz ją przez `{ variant: { id, … } }`.

## Warianty nazwane (tekstowe)

Każdy plik reprezentuje jedną nazwaną alternatywę. Pominięcie `variant` (lub ustawienie na `"default"`) oznacza go jako domyślny.

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

### Warianty częściowe

Wariant deklaruje **tylko klucze, które nadpisuje**; reszta jest dziedziczona z wpisu domyślnego.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` odziedziczone

useIntlayer("hero-banner", { variant: "never-declared" });
// → wpis domyślny
```

Dlatego dodajesz plik wariantu tylko tam, gdzie brzmienie faktycznie się różni. Klucz jest rozwiązywany na `null` tylko wtedy, gdy deklaruje warianty, ale nie ma domyślnego wpisu.

### Korzystanie z wariantów nazwanych

#### Wariant domyślny

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → wariant domyślny

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
      // → wariant domyślny

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
      // → wariant domyślny

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
      // → wariant domyślny

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

#### Wariant nazwany

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Wariant nazwany z jawnym locale

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Warianty obiektowe (strukturalne)

Wariant obiektowy adresuje treść dowolnym zestawem par klucz-wartość zadeklarowanych w polu `variant` — co umożliwia modelowanie rekordów CMS, treści zależnej od użytkownika lub dowolnej treści z nieprzezroczystym ID jako kluczem. Tożsamością jest **cały obiekt**: selektor musi dostarczyć równy obiekt, aby wpis został rozwiązany.

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

### Korzystanie z wariantów obiektowych

Przekaż pasujący obiekt do `variant`. Każde pole zadeklarowane w słowniku musi zostać podane i być równe; w przeciwnym razie wynik to `null`. Kolejność pól nie ma znaczenia.

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

#### Z jawnym locale

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Brakujące pole — brak dopasowania

```ts
// Zwraca null: brakuje `userId`, więc obiekt nie pasuje do zadeklarowanego wariantu
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Wariant otaczający

Niektóre wymiary wariantu są stałe przez całą sesję — najemca, typ szkoły, poziom planu. Są rozstrzygane raz i żaden komponent nie powinien przekazywać ich ręcznie.

> Nie opakowuj `useIntlayer` we własny hook, aby je wstrzyknąć. Optymalizacja na etapie budowania przepisuje wyłącznie dosłowne wywołanie `useIntlayer("key")` zaimportowane z pakietu frameworka, więc nic za opakowaniem nie trafi do bundla.

Zamiast tego zadeklaruj wariant raz na dostawcy, dokładnie jak `locale`:

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

Każdy odczyt słownika poniżej dostawcy rozstrzyga się teraz względem tego wariantu, a selektor w miejscu wywołania zawsze wygrywa:

```tsx
useIntlayer("hero-banner");
// → wariant dostawcy

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — zastępuje wariant dostawcy, nie rozszerza go
```

### Formy

Prop `variant` przyjmuje trzy formy:

| Forma                                                     | Znaczenie                                |
| --------------------------------------------------------- | ---------------------------------------- |
| `variant="school1"`                                       | jeden nazwany wariant dla każdego klucza |
| `variant={["school1", "default"]}`                        | uporządkowany łańcuch preferencji        |
| `variant={{ "hero-banner": "school1", default: "base" }}` | jeden wariant na klucz słownika          |

#### Łańcuch preferencji

Łańcuch jest przechodzony od lewej do prawej względem wpisów deklarowanych przez każdy klucz i wygrywa pierwszy zadeklarowany. Gdy żaden nie jest zadeklarowany, używany jest niejawny wpis domyślny — dokładnie tak jak dla pojedynczej wartości.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` nie deklaruje wpisu `school1`, ale deklaruje `school2` → "school2"
// klucz, który nie deklaruje żadnego z nich → wpis domyślny
```

Zatem `["black_friday", "summer"]` czyta się jako „black friday, jeśli ten klucz go ma, w przeciwnym razie summer, w przeciwnym razie domyślny”. Łańcuchy są akceptowane także w miejscu wywołania:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Zauważ, że jest to lustrzane odbicie tablicy przyjmowanej przez **pole** `variant` pliku treści: tam tablica _deklaruje_ jeden wpis na element, tutaj _konsumuje_ je w kolejności priorytetu.

#### Mapa według klucza

Adresuj każdy klucz słownika osobno. Zarezerwowany wpis `default` obejmuje wszystkie klucze niewymienione na liście:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> Na dostawcy zwykły obiekt jest **zawsze** odczytywany jako mapa według klucza, nigdy jako wariant obiektowy — oba są strukturalnie identyczne. Aby ustalić wariant obiektowy globalnie, zagnieźdź go pod wpisem: `variant={{ default: { id: "prod_abc" } }}`.

Ponieważ klucze mapy są sprawdzane względem zadeklarowanych kluczy słowników, literówka — lub wariant obiektowy zapisany wprost, taki jak `variant={{ id: "prod_abc" }}` — jest błędem kompilacji.

## Tryb ładowania

Warianty obiektowe są często ładowane leniwie. Ustaw `importMode` w słowniku, aby to kontrolować:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Zobacz [optymalizację bundla](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md), aby poznać szczegóły trybów `static`, `dynamic` i `fetch`.

## Typowe przypadki użycia

- Testy A/B tekstu sterowane kluczem eksperymentu
- Banery sezonowe lub promocyjne
- Komunikaty z feature flag
- Kampanie marketingowe specyficzne dla locale
- Teksty marketingowe per produkt zarządzane w CMS
- Treść zależna od użytkownika lub konta
- Dowolna treść adresowana nieprzezroczystym ID w czasie wykonywania
