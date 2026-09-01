---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Acompanhe a exposição de conteúdo e execute testes A/B
description: Descubra como o @intlayer/analytics rastreia visualizações de página/idioma e exposição de conteúdo, e como usá-lo para executar testes A/B em seu conteúdo do Intlayer.
keywords:
  - Analytics
  - Teste A/B
  - Audiência
  - Internacionalização
  - Documentação
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
    changes: "Ativar os analytics por predefinição quando `@intlayer/analytics` está instalado"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — pacote @intlayer/analytics, rastreamento a nível de provider/node, testes A/B, dashboard"
author: aymericzip
---

# Documentação do Intlayer Analytics

O `@intlayer/analytics` é um pacote complementar opcional que informa **qual conteúdo é realmente exibido** aos seus visitantes — qual página, em qual idioma (locale) e qual trecho específico de conteúdo traduzido — para que você possa entender seu público e executar **testes A/B em conteúdos**.

## Índice

<TOC/>

---

## O que ele rastreia

O `@intlayer/analytics` agrupa três tipos de eventos anônimos:

| Evento             | Onde é capturado                           | O que ele te diz                                                                                                                  |
| ------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Nível do Provider (`IntlayerProvider`)     | Qual página e idioma uma sessão visualizou, no carregamento inicial, mudança de rota ou mudança de idioma.                        |
| `content_exposure` | Nível do Node (`useIntlayer` / plugins)    | Qual chave de dicionário / caminho de chave foi realmente resolvido e exibido — e, se parte de um experimento, qual **variante**. |
| `conversion`       | Onde quer que você chame `useConversion()` | Um objetivo alcançado (cadastro, clique, compra...) atribuído à variante A/B a qual a sessão foi exposta.                         |

Os eventos são coletados na memória e enviados como uma **única solicitação em lote (batch request) aproximadamente a cada 20 segundos** — nunca a cada toque de tecla ou renderização — portanto, a análise nunca afeta o tempo de primeira renderização ou adiciona uma requisição por interação.

## Como ele potencializa testes A/B em conteúdo

O Intlayer já permite que você declare [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) de conteúdo (ex: um dicionário `hero-banner` com uma variante `control` e uma `black_friday`). O `@intlayer/analytics` fecha o ciclo:

1. `getVariant(experimentKey, variants)` atribui de forma determinística cada sessão anônima a uma variante — uma função pura do id da sessão e da chave do experimento, portanto a atribuição é **estável durante toda a sessão** e não requer **viagens de ida e volta ao servidor** antes da primeira renderização (sem cintilação, sem mudança de layout).
2. Cada evento `content_exposure` carrega a `variant` que foi mostrada.
3. `useConversion()` permite atribuir um objetivo (ex: `"cta_click"`) a essa variante.
4. O endpoint de resultados de experimentos do painel de controle (dashboard) compara as taxas de conversão por variante, incluindo significância estatística (um teste z).

## Instalação

`@intlayer/analytics` é uma **dependência opcional** de todos os pacotes de framework (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), pelo que a maioria dos projetos já a tem. Instale-a explicitamente se a sua configuração ignorar dependências opcionais (`npm install --no-optional`, …):

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

Instalar o pacote é tudo o que é preciso para ligar os analytics: `analytics.enabled` é `true` por predefinição e o `@intlayer/config` resolve-o para `false` sempre que o pacote não for encontrado no seu projeto. Se você não instalá-lo, todos os pontos de integração se resolvem como uma operação nula (no-op) — veja [Custo zero quando não instalado](#custo-zero-quando-nao-instalado) abaixo.

## Configuração

Os analytics não precisam de configuração para arrancar: estão **ativados por predefinição** e **reutilizam o bloco de configuração `editor` existente** para o endpoint e a chave de projeto.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Também usado como endpoint de ingestão de análises
    clientId: "your-client-id", // Também usado como chave de projeto de análises
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — a URL base para a qual os eventos de analytics são enviados (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — a chave pública do projeto atribuída a todo evento ingerido. Ele também atua como a **chave de ativação**: as análises permanecem totalmente desativadas (e eliminadas pelo tree-shaking, veja abaixo) até que o `clientId` seja configurado.

Se você hospeda o Intlayer por conta própria (self-host), a análise aponta automaticamente para a sua própria instância, já que compartilha o `editor.backendURL`.

### Chamando a API a partir do navegador

O mesmo token dá suporte a um pequeno cliente sem credenciais, de modo que um site estático ou uma SPA pode ler o conteúdo do seu CMS em tempo de execução sem servidor, sem server action e sem nenhum segredo no bundle:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

Ele se autentica a partir de `editor.clientId`: a troca, o cache e a renovação são tratados internamente. Os escopos delimitam o que ele pode acessar: conteúdo de dicionário publicado e ingestão de analytics. Qualquer outra coisa (enviar dicionários, ler um projeto, gastar créditos de IA) precisa de uma credencial real e, portanto, de um servidor ou um usuário autenticado.

### Como desativar

O bloco opcional `analytics` ajusta — ou desliga — a recolha:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Predefinição: true — retira toda a integração do bundle
    flushInterval: 20_000, // Milissegundos entre dois envios em lote
    sampleRate: 1, // Fração de sessões a registar, de 0 (nenhuma) a 1 (todas)
  },
};

export default config;
```

Desinstalar `@intlayer/analytics` tem o mesmo efeito que `enabled: false`. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para a lista completa de campos.

## Uso

### Rastreamento automático a nível de provider

Nenhuma alteração de código é necessária. Assim que o `@intlayer/analytics` estiver instalado e `editor.clientId` configurado, o `IntlayerProvider` automaticamente:

- inicializa o client de analytics na montagem (mount),
- registra um `page_view` no carregamento inicial,
- registra um `page_view` a cada mudança de idioma,
- inicia o ciclo de limpeza (flush loop) de ~20s e limpa quaisquer eventos restantes na desmontagem / fechamento da aba (via `navigator.sendBeacon`, com fallback para `fetch(..., { keepalive: true })`).

O ponto de entrada varia conforme o framework, mas em todos os casos é o mesmo que você já usa para configurar o Intlayer, então não há nada mais a adicionar:

<Tabs group="framework">
  <Tab label="React" value="react">

    O `IntlayerProvider` monta o provider de analytics internamente.

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

    O `next-intlayer` reexporta o `IntlayerProvider` do React, então o analytics é conectado da mesma forma.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    O plugin `intlayer` registra os hooks de analytics no ciclo de vida do componente raiz.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > Com o Nuxt, o `nuxt-intlayer` instala o plugin por você: não há nada a fazer.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` inicia o analytics a partir do componente que configura o Intlayer.

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

    O `IntlayerProvider` monta o provider de analytics internamente.

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

    O `IntlayerProvider` monta o provider de analytics de forma lazy, para que esse chunk fique fora do caminho crítico.

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

    `provideIntlayer()` já inclui `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > Use `provideIntlayerAnalytics()` isoladamente apenas se você gerenciar os providers individualmente.

  </Tab>
</Tabs>

### Rastreamento automático a nível de node (nó)

Toda vez que o `useIntlayer` resolve um trecho de conteúdo para exibição, o interpretador reporta um evento `content_exposure` para a exata combinação de `dictionaryKey` + caminho da chave + idioma — novamente, nenhuma alteração de código é necessária. Exposições repetidas do mesmo nó dentro de uma janela de flush são aglutinadas em um único evento com uma contagem (`count`), então uma lista renderizada 50 vezes não envia 50 eventos.

### Rastreando conversões para testes A/B

Use `useConversion()` para atribuir um objetivo à variante que a sessão viu:

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
          Começar
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
          Começar
        </button>
      );
    };
    ```

    > `useConversion` é um hook de cliente: marque o componente com `"use client"`.

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
        Começar
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
      Começar
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
          Começar
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
          Começar
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
      template: `<button (click)="onClick()">Começar</button>`,
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

### Resolvendo uma variante no lado do cliente (client-side)

`useExperiment()` atribui a sessão a uma variante e registra a exposição que se torna o denominador da taxa de conversão. Só exiba a subárvore dependente da variante quando `isAssigned` for verdadeiro, para que nenhum visitante veja o controle piscar antes que a atribuição seja resolvida:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` é uma string simples.

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

    `variant` é uma string simples. A atribuição acontece no navegador, então o componente precisa ser um componente cliente.

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

    `variant` e `isAssigned` são `Ref`s.

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

    `variant` e `isAssigned` são stores: leia-as com o prefixo `$`.

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

    `variant` é uma string simples.

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

    `variant` e `isAssigned` são `Accessor`s: chame-os para ler o valor.

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

    `variant` e `isAssigned` são `Signal`s: chame-os para ler o valor.

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

Os pesos são opcionais — passe um por variante para inclinar a divisão, por exemplo `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

O filho então lê a [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md) do dicionário que corresponde:

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

> Ler a variante em um **componente filho** é o que faz isso funcionar fora do React: no Vue, Svelte, Solid e Angular, o seletor passado para `useIntlayer` é capturado quando o componente é configurado, então a leitura precisa acontecer em um componente que só é montado depois que a variante é conhecida.

Se o experimento cobrir uma página inteira em vez de um único dicionário, eleve a variante para o provider — veja [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md#ambient-variant). Todo `useIntlayer` abaixo então se resolve contra ela sem alteração no local de chamada.

Se você precisar da atribuição bruta fora de um componente, acesse o client diretamente:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` apenas atribui — ele não registra a exposição. Prefira `useExperiment()`, caso contrário a taxa de conversão não terá denominador.

## Privacidade e desempenho

- **Anônimo por design (Anonymous by design)**: as sessões são identificadas por um id rotativo; o backend apenas armazena um **hash SHA-256** desse id — nunca o id bruto, nunca um endereço IP.
- **A localização é aproximada**: apenas um código de país, derivado de cabeçalhos de geolocalização do CDN (`cf-ipcountry`, `x-vercel-ip-country`, ...) — nenhum IP é lido ou armazenado.
- **URLs excluem parâmetros de busca** por padrão, então strings de query (query strings) nunca são capturadas.
- **Amostragem (Sampling)**: `sampleRate` permite que você mantenha apenas uma fração dos eventos de exposição de conteúdo em aplicativos de alto tráfego.
- **Em Lotes (Batched)**: uma requisição aproximadamente a cada 20 segundos (`flushInterval`), ou mais cedo se o buffer encher (`maxBufferSize`) — nunca uma requisição por evento.

### Custo zero quando não instalado

O `@intlayer/analytics` segue exatamente o mesmo padrão de dependência opcional do `@intlayer/editor`:

- cada ponto de integração carrega o pacote através de um **`import()` dinâmico envolto em `try/catch`** — um aplicativo que nunca instala o `@intlayer/analytics` nunca paga um custo de tamanho de bundle ou tempo de execução, e nunca vê um erro;
- uma variável de ambiente em tempo de compilação (`INTLAYER_ANALYTICS_ENABLED`), definida automaticamente como `'false'` pelo `@intlayer/config` sempre que o pacote não está instalado, `analytics.enabled` é `false` ou `editor.clientId` não está configurado, permite aos bundlers **eliminar como código morto (dead-code-eliminate)** toda a integração;
- as análises são desativadas dentro do iframe de visualização do editor/CMS do Intlayer, para que as sessões de edição nunca sejam contabilizadas como tráfego real.

## Dashboard: Página Analytics

Depois que seu projeto coletar eventos, a página **Analytics** no [dashboard do Intlayer](https://app.intlayer.org/analytics) (visível na barra lateral após selecionar um projeto) mostra:

- **Usuários ativos** — visitantes distintos ao longo da janela móvel selecionada (7 / 30 / 90 dias).
- **Usuários hoje** e **usuários nos últimos 7 dias**.
- **Visualizações de página** na janela selecionada.
- Um **gráfico de evolução** de visitantes distintos diários.
- Abas de detalhamento de **Idiomas (Locales)** e **Localização (Location)**, classificando seu público por idioma e país.

## Referência da API do Backend

Todos os endpoints de leitura exigem autenticação; a ingestão de dados é pública e atribuída via `clientId`.

| Método | Endpoint                                    | Descrição                                                                    |
| ------ | ------------------------------------------- | ---------------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | Ingerir um lote de eventos (público, atribuído pelo `clientId` no corpo).    |
| `GET`  | `/api/analytics/overview`                   | Totais de páginas/idiomas para o projeto autenticado.                        |
| `GET`  | `/api/analytics/audience?days=30`           | Visitantes distintos, page views, série diária, detalhamento idioma + país.  |
| `GET`  | `/api/analytics/content-stats`              | Totais de exposição por conteúdo, agrupados por chave/caminho/idioma.        |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Taxas de conversão por variante e significância estatística para testes A/B. |

Você também pode chamá-los programaticamente usando o [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

> **Apenas no lado do servidor.** `createIntlayerCMS()` se autentica com `clientId` + `clientSecret`, e o segredo nunca fica disponível no navegador: este trecho emitiria requisições não autenticadas se fosse executado ali. Mantenha-o em um route handler, uma server action ou um script.

## Links úteis

- [Dicionários Dinâmicos - Coleções & Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
- [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- [Referência de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Guia de Auto-hospedagem (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md)
