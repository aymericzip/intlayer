---
createdAt: 2026-07-08
updatedAt: 2026-07-08
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

O `@intlayer/analytics` é uma dependência **peer e opcional** — nunca instalada automaticamente por um pacote de framework. Adicione-o junto com o `intlayer`:

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

Se você não instalá-lo, todos os pontos de integração se resolvem como uma operação nula (no-op) — veja [Custo zero quando não instalado](#custo-zero-quando-nao-instalado) abaixo.

## Configuração

O Analytics **reutiliza o bloco de configuração `editor` existente** — não há um esquema de configuração `analytics` separado para preencher:

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

## Suporte a Frameworks

O Analytics está conectado ao `IntlayerProvider` compartilhado do `react-intlayer`, portanto, está disponível hoje em qualquer lugar em que esse provider seja usado:

| Framework                                                | Status                                                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Disponível                                                                                      |
| Next.js (`next-intlayer`)                                | ✅ Disponível (via `react-intlayer`)                                                               |
| React Native / Expo (`react-native-intlayer`)            | ✅ Disponível (via `react-intlayer`)                                                               |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Planejado — mesmo client, bindings em nível de provider seguindo o padrão do `@intlayer/editor` |

## Uso

### Rastreamento automático a nível de provider

Nenhuma alteração de código é necessária. Assim que o `@intlayer/analytics` estiver instalado e `editor.clientId` configurado, o `IntlayerProvider` automaticamente:

- inicializa o client de analytics na montagem (mount),
- registra um `page_view` no carregamento inicial,
- registra um `page_view` a cada mudança de idioma,
- inicia o ciclo de limpeza (flush loop) de ~20s e limpa quaisquer eventos restantes na desmontagem / fechamento da aba (via `navigator.sendBeacon`, com fallback para `fetch(..., { keepalive: true })`).

### Rastreamento automático a nível de node (nó)

Toda vez que o `useIntlayer` resolve um trecho de conteúdo para exibição, o interpretador reporta um evento `content_exposure` para a exata combinação de `dictionaryKey` + caminho da chave + idioma — novamente, nenhuma alteração de código é necessária. Exposições repetidas do mesmo nó dentro de uma janela de flush são aglutinadas em um único evento com uma contagem (`count`), então uma lista renderizada 50 vezes não envia 50 eventos.

### Rastreando conversões para testes A/B

Use `useConversion()` para atribuir um objetivo à variante que a sessão viu:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
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

### Resolvendo uma variante no lado do cliente (client-side)

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Privacidade e desempenho

- **Anônimo por design (Anonymous by design)**: as sessões são identificadas por um id rotativo; o backend apenas armazena um **hash SHA-256** desse id — nunca o id bruto, nunca um endereço IP.
- **A localização é aproximada**: apenas um código de país, derivado de cabeçalhos de geolocalização do CDN (`cf-ipcountry`, `x-vercel-ip-country`, ...) — nenhum IP é lido ou armazenado.
- **URLs excluem parâmetros de busca** por padrão, então strings de query (query strings) nunca são capturadas.
- **Amostragem (Sampling)**: `sampleRate` permite que você mantenha apenas uma fração dos eventos de exposição de conteúdo em aplicativos de alto tráfego.
- **Em Lotes (Batched)**: uma requisição aproximadamente a cada 20 segundos (`flushInterval`), ou mais cedo se o buffer encher (`maxBufferSize`) — nunca uma requisição por evento.

### Custo zero quando não instalado

O `@intlayer/analytics` segue exatamente o mesmo padrão de dependência opcional do `@intlayer/editor`:

- cada ponto de integração carrega o pacote através de um **`import()` dinâmico envolto em `try/catch`** — um aplicativo que nunca instala o `@intlayer/analytics` nunca paga um custo de tamanho de bundle ou tempo de execução, e nunca vê um erro;
- uma variável de ambiente em tempo de compilação (`INTLAYER_ANALYTICS_ENABLED`), definida automaticamente como `'false'` pelo `@intlayer/config` sempre que o `editor.clientId` não estiver configurado, permite que os bundlers **eliminem o código morto (dead-code-eliminate)** de toda a integração;
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

## Links úteis

- [Dicionários Dinâmicos - Coleções & Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
- [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- [Referência de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Guia de Auto-hospedagem (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md)
