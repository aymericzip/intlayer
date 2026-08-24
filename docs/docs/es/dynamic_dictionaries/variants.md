---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Variantes
description: Use el campo de metadatos variant en los archivos de contenido de Intlayer para declarar alternativas de contenido con nombre o estructuradas — pruebas A/B, banners de temporada, copia con feature flag, registros de CMS, contenido específico de usuario — y cambiar entre ellas en tiempo de ejecución sin cambios de código.
keywords:
  - Variantes
  - Pruebas A/B
  - Feature Flags
  - Contenido dinámico
  - Registros dinámicos
  - CMS
  - Intlayer
  - Internacionalización
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lanzamiento de la función de variantes"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` ahora acepta una cadena o un objeto — los antiguos `meta` / registros dinámicos se declaran como variantes de objeto"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Una variante declara solo las claves que anula; las variantes no declaradas recurren a la entrada por defecto"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Los proveedores aceptan una prop `variant` ambiental; los selectores aceptan una cadena de preferencia ordenada"
author: aymericzip
---

# Variantes

Una **variante** es un conjunto de archivos de contenido que comparten la misma clave de diccionario (`key`) pero llevan cada uno un valor `variant` diferente. Intlayer sirve el archivo adecuado según el selector pasado a `useIntlayer`.

El valor de `variant` puede adoptar **dos formas**:

- **Una cadena** — una única alternativa con nombre (pruebas A/B, banners de temporada, feature flags).
- **Un objeto** — un discriminador estructurado direccionado por un conjunto de campos (registros de CMS, contenido específico de usuario, cualquier contenido indexado por un ID opaco). El objeto completo es la identidad: el selector debe proporcionar un objeto **igual** para resolver la entrada.

> La forma de objeto sustituye al antiguo campo `meta`. Donde antes escribía `meta: { id, … }`, escriba `variant: { id, … }`, y selecciónela con `{ variant: { id, … } }`.

## Variantes con nombre (cadena)

Cada archivo representa una alternativa con nombre. Omitir `variant` (o establecerlo en `"default"`) lo marca como el valor de reserva.

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

### Variantes parciales

Una variante declara **solo las claves que anula**; el resto se hereda de la entrada por defecto.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` heredado

useIntlayer("hero-banner", { variant: "never-declared" });
// → la entrada por defecto
```

Por lo tanto, solo debe agregar un archivo de variante donde la redacción realmente difiera. Una clave se resuelve en `null` solo cuando declara variantes pero ninguna entrada por defecto.

### Consumir variantes con nombre

#### Variante por defecto

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → variante por defecto

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
      // → variante por defecto

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
      // → variante por defecto

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
      // → variante por defecto

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

#### Variante con nombre

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Variante con nombre con locale explícito

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Variantes de objeto (estructuradas)

Una variante de objeto direcciona el contenido mediante un conjunto arbitrario de pares clave-valor declarados en el campo `variant` — lo que permite modelar registros de CMS, contenido específico de usuario o cualquier contenido cuya clave sea un ID opaco. El **objeto completo** es la identidad: el selector debe proporcionar un objeto igual para que la entrada se resuelva.

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

### Consumir variantes de objeto

Pase el objeto coincidente a `variant`. Cada campo declarado en el diccionario debe proporcionarse e ser igual; de lo contrario el resultado es `null`. El orden de los campos no importa.

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

#### Con locale explícito

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Campo faltante — sin coincidencia

```ts
// Devuelve null: falta `userId`, por lo que el objeto no coincide con la variante declarada
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Variante ambiental

Algunas dimensiones de variante son fijas durante toda una sesión: el inquilino, el tipo de centro, el nivel de plan. Se resuelven una sola vez, y ningún componente debería tener que pasarlas a mano.

> No envuelvas `useIntlayer` en tu propio hook para inyectarlas. La optimización en tiempo de compilación solo reescribe una llamada literal `useIntlayer("key")` importada del paquete del framework, por lo que nada detrás de un wrapper se incluye en el bundle.

En su lugar, declara la variante una sola vez en el proveedor, exactamente igual que `locale`:

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

Cada lectura de diccionario bajo el proveedor se resuelve ahora con esa variante, y un selector en el punto de llamada siempre gana:

```tsx
useIntlayer("hero-banner");
// → la variante del proveedor

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — sustituye la variante del proveedor, no la extiende
```

### Formas

La prop `variant` acepta tres formas:

| Forma                                                     | Significado                                 |
| --------------------------------------------------------- | ------------------------------------------- |
| `variant="school1"`                                       | una variante nombrada para todas las claves |
| `variant={["school1", "default"]}`                        | una cadena de preferencia ordenada          |
| `variant={{ "hero-banner": "school1", default: "base" }}` | una variante por clave de diccionario       |

#### Cadena de preferencia

Una cadena se recorre de izquierda a derecha frente a las entradas que declara cada clave, y gana la primera declarada. Cuando no hay ninguna declarada, se usa la entrada por defecto implícita, exactamente igual que con un valor único.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` no declara una entrada `school1` pero sí declara `school2` → "school2"
// una clave que no declara ninguna de las dos → la entrada por defecto
```

Así, `["black_friday", "summer"]` se lee como «black friday si esta clave la tiene, si no summer, si no por defecto». Las cadenas también se aceptan en el punto de llamada:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Ten en cuenta que esto es la imagen especular del array aceptado por el **campo** `variant` de un archivo de contenido: allí un array _declara_ una entrada por elemento; aquí las _consume_ por orden de prioridad.

#### Mapa por clave

Dirígete a cada clave de diccionario por separado. La entrada reservada `default` cubre todas las claves no listadas:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> En un proveedor, un objeto simple se lee **siempre** como el mapa por clave, nunca como una variante de objeto: ambos son estructuralmente idénticos. Para fijar una variante de objeto globalmente, anídala bajo una entrada: `variant={{ default: { id: "prod_abc" } }}`.

Como las claves del mapa se comprueban contra tus claves de diccionario declaradas, una errata —o una variante de objeto escrita directamente, como `variant={{ id: "prod_abc" }}`— es un error de compilación.

## Modo de carga

Las variantes de objeto suelen cargarse de forma diferida. Establezca `importMode` en el diccionario para controlarlo:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Consulte [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) para detalles sobre los modos `static`, `dynamic` y `fetch`.

## Casos de uso típicos

- Pruebas A/B de texto dirigidas por una clave de experimento
- Banners de temporada o promocionales
- Mensajería con feature flag
- Campañas de marketing específicas por locale
- Copia de marketing por producto gestionada en un CMS
- Contenido específico de usuario o de cuenta
- Cualquier contenido indexado por un ID opaco en tiempo de ejecución
