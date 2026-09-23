---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Mesma API, Bundle Diferente"
description: O que muda quando as importações next-intl de um aplicativo Next.js são servidas pelo adaptador de compatibilidade @intlayer/next-intl. Tamanho do bundle, vazamento, tamanho do componente e hidratação medidos no mesmo código, além do que o adaptador mantém, ignora e não pode substituir.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Mesma API, Bundle Diferente

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` é um adaptador de compatibilidade: expõe a API `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, plurais ICU, `NextIntlClientProvider`...) e a serve a partir de dicionários compilados pelo Intlayer. O código da aplicação não muda. O bundle muda.

Este artigo compara os dois na mesma aplicação Next.js, construída uma vez com `next-intl` e outra com o adaptador. Os números vêm de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), uma suite open-source que registra o que o navegador realmente baixa. Se você quiser a comparação `next-intl` vs Intlayer como bibliotecas, leia [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer). Este é sobre o que o adaptador muda quando você mantém seus componentes como estão.

<TOC/>

> **tl;dr**: No mesmo aplicativo Next.js, trocar `next-intl` por `@intlayer/next-intl` reduziu o JavaScript por página de **153.6 KB para 147.5 KB** gzip, o componente médio de **21.8 KB para 8.1 KB**, vazamento de strings de página estrangeira de **~90% para 0%**, e hidratação de **14.7 ms para 12.8 ms**, sem editar nenhum componente. No TanStack Start, o equivalente `use-intl` (`@intlayer/use-intl`) reduziu componentes de **76-87 KB para 9-11 KB** e alternância de localidade de **7-21 ms para 4-9 ms**. O adaptador custa **8.0 KB** de runtime versus **14.7 KB** para `next-intl` e **5.5 KB** para `next-intlayer` nativo. Navegação e middleware são re-implementados na configuração de roteamento do Intlayer; nomes de caminho localizados (`pathnames`) são o único recurso não transferido.

## O que é `@intlayer/next-intl`

`next-intl` é um runtime: `getRequestConfig` carrega um `messages/{locale}.json` por requisição, `NextIntlClientProvider` o envia para o cliente, e `useTranslations("about")` lê chaves daquele objeto no tempo de renderização. Cada otimização (namespaces, `pick(messages, [...])` por página, lazy loading) é sua responsabilidade escrever.

`@intlayer/next-intl` mantém a primeira e última parte dessa cadeia e substitui o meio. Seus componentes ainda chamam `useTranslations("about")`; o que eles recebem vem de um dicionário Intlayer compilado no tempo de construção, escopo para aquele componente, apenas na locale ativa.

Três mecanismos fazem isso funcionar:

1. **Import aliasing.** `createNextIntlPlugin()` de `@intlayer/next-intl/plugin` encapsula `withIntlayer` e adiciona aliases do Webpack / Turbopack para que `next-intl`, `next-intl/server`, `next-intl/navigation` e `next-intl/middleware` sejam resolvidos para `@intlayer/next-intl`. Nenhuma importação em sua codebase é renomeada.
2. **JSON como fonte de verdade.** O plugin `syncJSON` lê seus `messages/{locale}.json` existentes, divide suas chaves de nível superior em um dicionário por namespace e escreve as traduções de volta nos mesmos arquivos quando a CLI ou o CMS as atualiza. O fluxo de trabalho de seus tradutores permanece inalterado.
3. **Call-site binding.** A otimização do Intlayer (Babel ou SWC) reescreve `useTranslations("about")` em uma chamada que recebe o dicionário `about` diretamente. O componente não alcança mais uma árvore de mensagens global; ele alcança seu próprio conteúdo.

```tsx fileName="app/[locale]/about/page.tsx"
// Seu código, inalterado
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="O que o compilador emite (simplificado)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Essa reescrita é por isso que as colunas de tamanho de componente e vazamento de página abaixo se movem: uma página apenas puxa os dicionários dos componentes que renderiza, e apenas na localidade sendo servida.

## O que o adaptador mantém, ignora e não substitui

| `next-intl` API                                                      | Com `@intlayer/next-intl`                                                                                                                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Mantido. Vinculado ao dicionário `ns` em tempo de construção. As chaves são tipadas em relação ao seu conteúdo.                                                 |
| `getTranslations({ locale, namespace })`                             | ✅ Mantido                                                                                                                                                         |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Mantido. Plurais ICU, `select`, `selectordinal`, `#`, `{ts, date, long}` executados através do resolvedor ICU do Intlayer                                       |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Mantido                                                                                                                                                         |
| `useFormatter()`                                                     | ✅ Mantido. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` conectam ao `Intl` nativo                                                                |
| `NextIntlClientProvider`                                             | ✅ Mantido. Os props `messages`, `timeZone` e `now` são **aceitos mas ignorados** (um aviso de desenvolvimento o informa)                                          |
| `getMessages()`                                                      | ✅ Mantido para compatibilidade; não é mais necessário                                                                                                             |
| `getRequestConfig()` em `src/i18n.ts`                                | ⚠️ Não necessário. Os dicionários são compilados em tempo de build; não há carregamento de mensagens por requisição                                                |
| `defineRouting()`                                                    | ✅ Mantido. Os campos omitidos (`locales`, `defaultLocale`, `localePrefix`) são lidos de `intlayer.config.ts`                                                      |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Mantido. Re-implementado na configuração de roteamento do Intlayer; o argumento `routing` é aceito mas ignorado                                                 |
| `pathnames` (nomes de rotas localizadas)                             | ❌ Aceito para digitação, **não interpolado**. Mantenha pathnames simples ou mova esse mapeamento para `rewrite` do Intlayer                                       |
| `createMiddleware()`                                                 | ✅ Mantido. Retorna o proxy do Intlayer; define o cookie `NEXT_LOCALE` para que `useLocale()` e seu comutador continuem funcionando                                |
| `NEXT_LOCALE` cookie                                                 | ✅ Lido por padrão (a menos que você configure `routing.storage` por conta própria)                                                                                |
| Bare `useTranslations()` com nenhum namespace                        | ⚠️ Funciona, mas o local da chamada não está vinculado: ele se resolve através do registro de tempo de execução. Passe um namespace para obter os ganhos de bundle |

## O benchmark

### O que foi medido

A suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) constrói **a mesma aplicação** com cada setup: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idênticos e conteúdo idêntico. As páginas são medidas em `en` e `fr`.

`next-intl` foi construído em quatro estratégias de carregamento, da configuração ingênua (arquivo `messages/{locale}.json` carregado integralmente) até a ótima (um namespace por rota + `pick()` por página). O adapter foi construído sobre **os mesmos componentes da configuração ingênua**, com apenas `next.config.ts` e `intlayer.config.ts` alterados. Não possui uma variante "scoped": o compilador faz o escopo do conteúdo por componente, portanto suas linhas `static` e `dynamic` já estão no escopo.

Para cada build, a suite registra:

- **Lib size**: tamanho gzip da biblioteca i18n de um componente vazio que apenas importa a biblioteca. O custo fixo do runtime.
- **Page JS**: JavaScript gzip baixado por página, calculado em média em todas as páginas e locales.
- **Locale leak %**: compartilha de strings traduzidas encontradas no JS baixado que pertencem a uma locale que o usuário **não** está visualizando.
- **Page leak %**: compartilha de strings traduzidas encontradas no JS baixado que pertencem a uma página na qual o usuário **não** está.
- **Component avg**: tamanho gzip médio de cada componente compilado isoladamente. Mostra quanto runtime i18n e catálogo um único componente carrega.
- **E2E reactivity**: tempo de parede entre selecionar uma nova locale e `html[lang]` atualizar no DOM (Playwright, 5 iterações).
- **Hydration**: duração da fase de hydration do React.

> Os números abaixo vêm da execução datada de **2026-09-12** com `next-intl` / `use-intl` 4.14.2 e `@intlayer/*` 9.5.1. A aplicação de teste é deliberadamente pequena (algumas dezenas de strings por locale), então os percentuais de vazamento descrevem um **padrão**: eles crescem com seu conteúdo enquanto o custo de runtime permanece fixo.

### Resultados no Next.js

Escolha as métricas e bibliotecas do seu interesse:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (sem i18n)       | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Como ler**

- **Mesmos componentes, 6 KB menos por página.** A compilação do adapter da aplicação ingênua chega a **147.5 KB**, abaixo de todas as configurações `next-intl`, incluindo a totalmente otimizada (153.6 KB). O próprio runtime é a diferença: 8.0 KB versus 14.7 KB, pagos em cada página.
- **Vazamento vai a 0% sem tocar em um componente.** A configuração ingênua de `next-intl` envia ~90% de strings de páginas estrangeiras em cada página. Atingir 0% com `next-intl` significa as configurações `scoped-*`: um namespace por rota, e `pick(messages, [...])` em cada página. O adapter atinge 0% a partir do código ingênuo porque a passagem de otimização vincula cada `useTranslations("ns")` ao seu próprio dicionário.
- **Componentes encolhem 2.7x.** Um componente compilado isoladamente tem média de **21.8 KB** com `next-intl` (ele atinge o provider e a árvore de mensagens) e **8.1 KB** com o adapter. Na configuração `scoped-static` do `next-intl` esse número sobe _para_ 80 KB, porque o arquivo de namespace de cada rota fica acessível a partir da página que o seleciona.
- **Hidratação é 2 ms mais rápida** (12.8 vs 14.7 ms): não há objeto de mensagem para desserializar do payload RSC antes do React poder hidratar.
- **O adapter não é o runtime nativo.** `next-intlayer` fica em **141.3 KB**, +0.3 KB sobre a app base, com um runtime de 5.5 KB. O adapter carrega a superfície de API do `next-intl` (`useFormatter`, `t.rich`, o resolver ICU) no topo do core do Intlayer, daí 8.0 KB e +6 KB por página. É a ponte, não o destino.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa, cada biblioteca e cada estratégia, no [relatório de benchmark do Next.js](https://intlayer.org/pt/doc/benchmark/nextjs).

### Resultados em TanStack Start (`use-intl`)

`use-intl` é o core agnóstico de framework do `next-intl`. Seu adapter, `@intlayer/use-intl`, segue o mesmo design com um plugin Vite (`@intlayer/use-intl/plugin`).

| Configuração             | Estratégia     | Tamanho da biblioteca (gz) | JS médio da página (gz) | Vazamento de localidade | Vazamento de página | Componente médio (gz) | Reatividade E2E |  Hidratação |
| ------------------------ | -------------- | -------------------------: | ----------------------: | ----------------------: | ------------------: | --------------------: | --------------: | ----------: |
| **base** (sem i18n)      | -              |                     0.0 KB |                111.0 KB |                    0.0% |                0.0% |                0.7 KB |          8.1 ms |     21.6 ms |
| `use-intl`               | static         |                    14.1 KB |                179.8 KB |                   50.0% |               89.8% |               76.0 KB |          6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |                    14.1 KB |                119.4 KB |                    0.0% |               89.8% |               75.9 KB |          7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |                    14.1 KB |                128.7 KB |                    0.0% |                0.0% |               87.1 KB |         20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |                    14.1 KB |                128.7 KB |                    0.0% |                0.0% |               87.1 KB |         13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |                 **7.3 KB** |                135.8 KB |                   49.7% |            **0.0%** |           **10.9 KB** |      **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |                 **7.3 KB** |            **129.7 KB** |                **0.0%** |            **0.0%** |            **9.3 KB** |      **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |                     5.0 KB |                125.8 KB |                   50.0% |                0.0% |                8.1 KB |          3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |                     5.0 KB |                118.6 KB |                    0.0% |                0.0% |                6.3 KB |          3.6 ms |     14.1 ms |

**Como ler**

- **Bytes por página são equivalentes ao `use-intl` otimizado.** `@intlayer/use-intl` em modo `dynamic` (129.7 KB) está dentro de 1 KB do `scoped-dynamic` (128.7 KB) do `use-intl`, e 10 KB _acima_ do `dynamic` simples (119.4 KB) do `use-intl`. Essa linha `dynamic` simples ainda vaza 90% das strings de páginas estrangeiras; a contagem de bytes é baixa porque o conteúdo da aplicação de teste é pequeno. O 0% do adapter é o que permanece constante conforme o conteúdo cresce.
- **Os componentes são 7-9x menores.** Os componentes `use-intl` têm em média **76-87 KB** em todas as estratégias, porque `useTranslations` está vinculado ao objeto de mensagens completo do provedor. O adapter tem em média **9-11 KB**.
- **A alternância de locale é mais rápida.** As configurações otimizadas de `use-intl` levam **13-21 ms** para atualizar `html[lang]`; o adapter leva **4-9 ms**. Menos componentes são re-renderizados, e nada é re-selecionado de uma árvore de mensagens.
- **`static` mantém cada locale.** A linha `static` do adapter mostra 49,7% de vazamento de locale, o mesmo que o Intlayer nativo em modo `static`: todos os locales são agrupados, apenas os dicionários da página. Uma linha de configuração (`importMode: 'dynamic'`) remove isso.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa no [relatório de benchmark do TanStack Start](https://intlayer.org/pt/doc/benchmark/tanstack).

## Por que os números mudam

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nada no componente mudou, então os ganhos vêm inteiramente do que `useTranslations` está vinculado.

**Com `next-intl`**, a vinculação é o provedor. `NextIntlClientProvider` recebe o objeto `messages` inteiro para a localidade; cada `useTranslations("about")` lê a partir dele. O bundler vê um componente importando um hook que lê um contexto, e não pode saber que apenas a ramificação `about` é usada. As rotas abaixo compartilham o mesmo objeto de mensagens, então a coluna page-leak lê ~90% até você dividir o arquivo você mesmo, e o desperdício cresce em dois eixos ao mesmo tempo, páginas e idiomas:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # cada namespace, cada página
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**Com `@intlayer/next-intl`**, a vinculação é o dicionário. `syncJSON` transforma `messages/en.json` em um dicionário por chave de nível superior; o compilador resolve qual componente chama `useTranslations("about")` e lhe passa `about` diretamente, na locale ativa, como um import que o bundler pode rastrear e dividir.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # inalterado, ainda a fonte da verdade
│   └── fr.json
├── .intlayer/                        # gerado: um dicionário por namespace, por locale
└── src
    ├── middleware.ts                 # createMiddleware() agora retorna o proxy do Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (sem prop messages)
        └── about/page.tsx            # useTranslations("about")  ← inalterado
```

`src/i18n.ts` e a prop `messages` desaparecem. Tudo o resto é idêntico.

## Migração em três passos

<Steps>
<Step number={1} title="Instalar">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

O comando detecta `next-intl` e instala `intlayer`, `next-intlayer`, `@intlayer/next-intl` e `@intlayer/sync-json-plugin`. Mantenha `next-intl` instalado: é uma dependência peer do adaptador e fornece os tipos.

</Step>
<Step number={2} title="Aponte o Intlayer para suas mensagens">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" agrupa todas as locales; "dynamic" carrega a ativa sob demanda
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // Placeholders ICU: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` permanece onde está. Cada chave de nível superior torna-se um dicionário; `useTranslations("about")` mapeia para o dicionário `about`.

</Step>
<Step number={3} title="Envolver next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` compõe `withIntlayer` (monitoramento de conteúdo, compilação de dicionário, a otimização) e os aliases `next-intl` → `@intlayer/next-intl` para Webpack e Turbopack. Faça o build, e os números nas tabelas acima são seus.

</Step>
</Steps>

### O que você pode deletar depois

| Arquivo / padrão                             | Por quê                                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `getRequestConfig` em `src/i18n.ts`          | Sem carregamento de mensagens por requisição. Mantenha o arquivo apenas se ele também exportar helpers `createNavigation` |
| `messages={...}` no `NextIntlClientProvider` | O adapter lê a saída compilada; a prop é ignorada e registra um aviso em desenvolvimento                                  |
| `await getMessages()` em layouts             | Mesmo motivo                                                                                                              |
| `pick(messages, [...])` por página           | O compilador faz a seleção, por componente                                                                                |

### O que você ganha além de bytes

- **Chaves tipadas.** `useTranslations("about")` é tipado contra o dicionário compilado `about`. `t("does.not.exist")` é um erro TypeScript, não um fallback em tempo de execução.
- **`npx intlayer test`** falha no CI quando um locale está faltando uma chave. **`npx intlayer fill`** traduz as chaves ausentes com o provedor de sua escolha (OpenAI, Anthropic, Mistral, Gemini...) usando sua própria chave, e escreve o resultado de volta em `messages/{locale}.json`.
- **Visual Editor e CMS** funcionam nos mesmos dicionários, portanto, não-desenvolvedores podem editar `messages/fr.json` através de uma UI e o arquivo é atualizado.
- **Migração incremental para `.content.ts`.** Qualquer componente pode alternar de `useTranslations("about")` para `useIntlayer("about")` com um arquivo de conteúdo co-localizado, um de cada vez. Os dicionários JSON e `.content.ts` coexistem e se mesclam.

## Limites a conhecer antes de começar

<AccordionGroup>
<Accordion header="A configuração de roteamento se move para intlayer.config.ts">

`createNavigation(routing)` e `createMiddleware(routing)` mantêm sua assinatura mas ignoram o argumento: idiomas, idioma padrão e estratégia de prefixo vêm da configuração `routing` do Intlayer. Se você usa os `pathnames` localizados do `next-intl` (`/about` para `/a-propos`), o adaptador não os interpola; o `routing.rewrite` do Intlayer cobre esse caso mas é uma mudança separada.

</Accordion>
<Accordion header="useTranslations() sem namespace não é vinculado">

A etapa de otimização precisa de um namespace estático para saber qual dicionário importar. Uma chamada sem namespace ainda funciona através de um registro em tempo de execução que faz referência a cada dicionário, o que é exatamente o vazamento que você estava tentando remover. Passe o namespace.

</Accordion>
<Accordion header="O adaptador não é gratuito">

8.0 KB de tempo de execução versus 5.5 KB para `next-intlayer`, e +6-7 KB por página em relação ao build nativo. Ele paga pela superfície de API do `next-intl`. Se você atingir o ponto em que cada componente foi migrado para `useIntlayer`, remova o adaptador.

</Accordion>
<Accordion header="messages, timeZone e now no provider são ignorados">

Os formatadores são baseados no `Intl` nativo e apenas o idioma influencia sua saída. Se você depende de um fuso horário forçado ou de um `now` fixo para datas estáveis na hidratação, lide com isso no local da chamada. Veja [formatação de data, hora e número](https://intlayer.org/pt/blog/date-time-number-formatting-locales).

</Accordion>
</AccordionGroup>

## Quando usar qual?

<AccordionGroup>
<Accordion header="Fique no next-intl">

Seu aplicativo é pequeno, seu bundle não é uma preocupação e sua equipe lida bem gerenciando namespaces e `pick()` por página.

</Accordion>
<Accordion header="Use @intlayer/next-intl">

Você já está no `next-intl` hoje e quer os ganhos de bundle, vazamento e hidratação, chaves tipadas e as ferramentas de CLI / CMS sem uma reescrita. Este é o ponto de entrada recomendado para qualquer base de código `next-intl` existente.

</Accordion>
<Accordion header="Vá para o nativo (next-intlayer)">

Para novos projetos, ou assim que o adaptador tiver cumprido seu papel. É o mais leve dos três (5.5 KB, +0.3 KB por página) e desbloqueia componentes de servidor síncronos, arquivos `.content.ts` por componente e o conjunto completo de recursos. Comece com [Intlayer com Next.js](https://intlayer.org/pt/doc/environment/nextjs).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="O código da minha aplicação realmente permanece intocado?">

No Next.js, sim para componentes: a compilação do benchmark alterou apenas `next.config.ts` e `intlayer.config.ts`. `getRequestConfig` em `src/i18n.ts`, a prop `messages` no provider e as chamadas `pick()` por página tornam-se código morto que você pode excluir depois.

</Question>

<Question title="O que acontece com as mensagens ICU?">

Elas continuam funcionando. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` e `{ts, date, long}` são resolvidos pelo resolvedor ICU do Intlayer. Veja [formato de mensagem ICU](https://intlayer.org/pt/blog/icu-message-format).

</Question>

<Question title="Por que o adaptador é mais pesado que o next-intlayer nativo?">

Ele carrega a superfície da API do `next-intl` sobre o núcleo do Intlayer: `useFormatter`, `t.rich`, o resolvedor ICU, os helpers de navegação. Isso representa 8.0 KB contra 5.5 KB, e +6 KB por página. É a ponte, não o destino.

</Question>

<Question title="Posso migrar componente por componente?">

Sim. Qualquer componente pode mudar de `useTranslations("about")` para `useIntlayer("about")` com um arquivo `.content.ts` colocalizado. Dicionários JSON e `.content.ts` coexistem e se fundem.

</Question>

<Question title="Os pathnames localizados funcionam?">

Não através dos `pathnames` do `next-intl`: o adaptador os aceita para tipagem, mas não os interpola. Use em vez disso `routing.rewrite` do Intlayer, que emite os literais localizados no registro de tipos.

</Question>

</FAQ>

## Related comparisons

Mesma série de adaptadores:

- [i18next vs @intlayer/i18next](https://intlayer.org/pt/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/pt/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/pt/blog/vue-i18n-vs-intlayer-vue-i18n)

As bibliotecas comparadas diretamente:

- [next-intl vs Intlayer](https://intlayer.org/pt/blog/next-intl-vs-intlayer), mesmo benchmark
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/pt/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/pt/blog/is-next-intl-outdated)

Documentação de referência:

- [Compat adapter: next-intl](https://intlayer.org/pt/doc/compatibility/next-intl)
- [Guia de migração: next-intl para Intlayer](https://intlayer.org/pt/doc/migration/next-intl)
- [Relatório de benchmark do Next.js](https://intlayer.org/pt/doc/benchmark/nextjs) e [relatório de benchmark do TanStack Start](https://intlayer.org/pt/doc/benchmark/tanstack)
- [Otimização de bundle](https://intlayer.org/pt/doc/concept/bundle-optimization) e [o compilador Intlayer](https://intlayer.org/pt/doc/compiler)
- [Editor Visual](https://intlayer.org/pt/doc/concept/editor), [CMS](https://intlayer.org/pt/doc/concept/cms) e [tradução por IA](https://intlayer.org/pt/doc/concept/auto-fill)

## Conclusão

`@intlayer/next-intl` faz uma coisa: muda o que `useTranslations` está vinculado, de um provider que contém todas as mensagens para um dicionário compilado para esse componente. No mesmo app Next.js que vale **6 KB por página**, **componentes 2,7x menores**, **0% de vazamento** e **2 ms de hidratação**, antes de qualquer pessoa abrir um arquivo de componente. Navigation e middleware mantêm sua API no topo da configuração de roteamento do Intlayer, e o runtime nativo `next-intlayer` permanece ainda mais leve.

Todos os dados brutos, os apps de teste e os scripts estão no [repositório Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Execute você mesmo.

Consulte o [doc 'Por que Intlayer?'](https://intlayer.org/doc/why) para mais detalhes.
