---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Variantes
description: Use o campo de metadados variant nos arquivos de conteúdo do Intlayer para declarar alternativas de conteúdo nomeadas ou estruturadas — testes A/B, banners sazonais, texto com feature flag, registros de CMS, conteúdo específico do usuário — e alternar entre elas em tempo de execução sem mudanças de código.
keywords:
  - Variantes
  - Testes A/B
  - Feature Flags
  - Conteúdo dinâmico
  - Registros dinâmicos
  - CMS
  - Intlayer
  - Internacionalização
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lançamento do recurso de variantes"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` agora aceita uma string ou um objeto — os antigos `meta` / registros dinâmicos são declarados como variantes de objeto"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Uma variante declara apenas as chaves que sobrescreve; as variantes não declaradas retornam para a entrada padrão"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Os provedores aceitam uma prop `variant` ambiente; os seletores aceitam uma cadeia de preferência ordenada"
author: aymericzip
---

# Variantes

Uma **variante** é um conjunto de arquivos de conteúdo que compartilham a mesma chave de dicionário (`key`), mas cada um carrega um valor `variant` diferente. O Intlayer serve o arquivo apropriado com base no seletor passado para `useIntlayer`.

O valor de `variant` pode assumir **duas formas**:

- **Uma string** — uma única alternativa nomeada (testes A/B, banners sazonais, feature flags).
- **Um objeto** — um discriminador estruturado endereçado por um conjunto de campos (registros de CMS, conteúdo específico do usuário, qualquer conteúdo cuja chave é um ID opaco). O objeto inteiro é a identidade: o seletor deve fornecer um objeto **igual** para resolver a entrada.

> A forma de objeto substitui o antigo campo `meta`. Onde você antes escrevia `meta: { id, … }`, escreva `variant: { id, … }` e selecione-a com `{ variant: { id, … } }`.

## Variantes nomeadas (string)

Cada arquivo representa uma alternativa nomeada. Omitir `variant` (ou defini-lo como `"default"`) o marca como fallback.

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

### Variantes parciais

Uma variante declara **apenas as chaves que sobrescreve**; o restante é herdado da entrada padrão.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` herdado

useIntlayer("hero-banner", { variant: "never-declared" });
// → a entrada padrão
```

Portanto, adicione um arquivo de variante apenas onde o texto realmente difere. Uma chave é resolvida como `null` apenas quando declara variantes, mas nenhuma entrada padrão.

### Consumir variantes nomeadas

#### Variante padrão

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → variante padrão

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
      // → variante padrão

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
      // → variante padrão

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
      // → variante padrão

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

#### Variante nomeada

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Variante nomeada com locale explícito

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Variantes de objeto (estruturadas)

Uma variante de objeto endereça o conteúdo por um conjunto arbitrário de pares chave-valor declarados no campo `variant` — possibilitando modelar registros de CMS, conteúdo específico do usuário ou qualquer conteúdo cuja chave seja um ID opaco. O **objeto inteiro** é a identidade: o seletor deve fornecer um objeto igual para que a entrada seja resolvida.

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

Passe o objeto correspondente para `variant`. Cada campo declarado no dicionário deve ser fornecido e igual; caso contrário, o resultado é `null`. A ordem dos campos não importa.

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

#### Com locale explícito

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Campo ausente — sem correspondência

```ts
// Retorna null: `userId` está ausente, então o objeto não corresponde à variante declarada
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Variante ambiente

Algumas dimensões de variante são fixas durante toda uma sessão: o inquilino, o tipo de instituição, o nível do plano. São resolvidas uma única vez, e nenhum componente deveria ter de as passar à mão.

> Não envolva `useIntlayer` num hook próprio para as injetar. A otimização em tempo de compilação apenas reescreve uma chamada literal `useIntlayer("key")` importada do pacote do framework, pelo que nada atrás de um wrapper entra no bundle.

Declare antes a variante uma única vez no provedor, exatamente como `locale`:

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

Cada leitura de dicionário abaixo do provedor passa a resolver-se com essa variante, e um seletor no local da chamada ganha sempre:

```tsx
useIntlayer("hero-banner");
// → a variante do provedor

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — substitui a variante do provedor, não a estende
```

### Formas

A prop `variant` aceita três formas:

| Forma                                                     | Significado                               |
| --------------------------------------------------------- | ----------------------------------------- |
| `variant="school1"`                                       | uma variante nomeada para todas as chaves |
| `variant={["school1", "default"]}`                        | uma cadeia de preferência ordenada        |
| `variant={{ "hero-banner": "school1", default: "base" }}` | uma variante por chave de dicionário      |

#### Cadeia de preferência

Uma cadeia é percorrida da esquerda para a direita entre as entradas declaradas por cada chave, e a primeira declarada ganha. Quando nenhuma está declarada, usa-se a entrada padrão implícita — exatamente como para um valor único.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` não declara uma entrada `school1`, mas declara `school2` → "school2"
// uma chave que não declara nenhuma das duas → a entrada padrão
```

Assim, `["black_friday", "summer"]` lê-se como «black friday se esta chave tiver uma, senão summer, senão padrão». As cadeias também são aceites no local da chamada:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Note que esta é a imagem invertida do array aceite pelo **campo** `variant` de um ficheiro de conteúdo: aí um array _declara_ uma entrada por elemento; aqui _consome_-as por ordem de prioridade.

#### Mapa por chave

Enderece cada chave de dicionário separadamente. A entrada reservada `default` cobre todas as chaves não listadas:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> Num provedor, um objeto simples é **sempre** lido como o mapa por chave, nunca como uma variante de objeto — as duas são estruturalmente idênticas. Para fixar uma variante de objeto globalmente, aninhe-a sob uma entrada: `variant={{ default: { id: "prod_abc" } }}`.

Como as chaves do mapa são verificadas contra as suas chaves de dicionário declaradas, um erro de escrita — ou uma variante de objeto escrita diretamente, como `variant={{ id: "prod_abc" }}` — é um erro de compilação.

## Modo de carregamento

As variantes de objeto costumam ser carregadas de forma preguiçosa. Defina `importMode` no dicionário para controlar isso:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Veja [otimização do bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) para detalhes sobre os modos `static`, `dynamic` e `fetch`.

## Casos de uso típicos

- Testes A/B de texto orientados por uma chave de experimento
- Banners sazonais ou promocionais
- Mensagens com feature flag
- Campanhas de marketing específicas por locale
- Texto de marketing por produto gerenciado em um CMS
- Conteúdo específico do usuário ou da conta
- Qualquer conteúdo indexado por um ID opaco em tempo de execução
