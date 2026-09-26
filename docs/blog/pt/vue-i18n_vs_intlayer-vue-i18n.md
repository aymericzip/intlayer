---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "vue-i18n vs @intlayer/vue-i18n: Mesma API, Bundle Diferente"
description: O que muda quando uma aplicação Vue 3 mantém suas chamadas vue-i18n, mas as serve através do adaptador de compatibilidade @intlayer/vue-i18n. JavaScript por página, tamanho de runtime, tamanho de componente e vazamento medidos no mesmo código Vite + Vue, além do que o adaptador mantém, ignora e não consegue substituir.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Mesma API, Bundle Diferente

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n` é um adaptador de compatibilidade: expõe a API `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) e a serve a partir de dicionários compilados pelo Intlayer. Seus arquivos `.vue` não mudam. O que `t("footer.github")` está vinculado é que muda.

Este artigo mede essa troca na mesma aplicação Vite + Vue 3, construída uma vez com `vue-i18n` e outra com o adapter. Os números vêm de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Para `vue-i18n` e Intlayer comparados como bibliotecas, leia [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer.md) e o [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer_benchmark.md). Este é sobre o que o adapter muda quando você mantém seus componentes como estão.

<TOC/>

> **tl;dr**: Na mesma aplicação Vite + Vue 3, substituir `vue-i18n` por `@intlayer/vue-i18n` reduziu o JavaScript por página de **134.9 KB para 47.0 KB** gzip (a app sem i18n pesa 41.3 KB), o runtime de **24.3 KB para 7.9 KB**, o componente médio de **196 KB para 8.4 KB**, e o vazamento de strings de páginas estrangeiras de **90% para 0%**, sem editar nenhum arquivo `.vue`. `createI18n({ messages })` continua funcionando como fallback; remova as importações JSON para obter os números acima. Blocos SFC `<i18n>` e `setLocaleMessage()` em runtime são as duas features que não são transportadas.

## O que é `@intlayer/vue-i18n`

`vue-i18n` é um runtime. `createI18n({ messages: { en, fr, ... } })` constrói uma instância global contendo todas as mensagens de todos os locales; `useI18n()` vincula cada componente a ela; `t("footer.github")` percorre a árvore em tempo de renderização. Esse design é o que torna os blocos SFC `<i18n>` e `setLocaleMessage()` possíveis, e é também por isso que o gráfico de dependências de cada componente inclui a árvore inteira.

`@intlayer/vue-i18n` mantém a API e substitui a árvore:

1. **Import aliasing.** `vueI18nVitePlugin()` de `@intlayer/vue-i18n/plugin` envolve `vite-intlayer` e adiciona um `resolve.alias` para que `vue-i18n` seja resolvido para `@intlayer/vue-i18n`. Nenhuma importação é renomeada.
2. **JSON como fonte da verdade.** O plugin `syncJSON` lê seu `locales/{locale}.json` existente com `format: "vue-i18n"` (para que `{name}`, `{0}` interpolação de lista e `"car | cars"` plurais com pipe sejam analisados corretamente) e escreve traduções de volta quando a CLI ou o CMS as atualiza.
3. **Call-site binding.** A passagem de otimização do Intlayer reescreve os locais de chamada `useI18n()` para que o componente receba os dicionários nomeados por suas chaves, na locale ativa, como imports que o bundler pode rastrear e dividir.

```vue fileName="src/components/Footer.vue"
<!-- Seu código, inalterado -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="O que o compilador emite (simplificado)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

O componente não alcança mais a árvore global de mensagens. Ele alcança `footer`. É por isso que a coluna de tamanho do componente abaixo cai de 196 KB para 8 KB.

## O que o adaptador mantém, ignora e não substitui

| `vue-i18n` API                                                      | Com `@intlayer/vue-i18n`                                                                                                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Mantido. As chaves de `t` são digitadas em relação aos seus dicionários                                                                              |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Mantido. `{name}`, `{0}` e plurais separados por pipe são resolvidos como antes                                                                      |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Mantido. `datetimeFormats` / `numberFormats` de `createI18n()` são respeitados, apoiados pelo `Intl` nativo                                          |
| `i18n.global.locale.value = "fr"`                                   | ✅ Mantido. Uma `WritableComputedRef` apoiada pelo cliente Intlayer; a reatividade funciona como antes                                                  |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Mantido. Registrado em `app.config.globalProperties` por `app.use(i18n)`                                                                             |
| `v-t` directive                                                     | ✅ Mantido                                                                                                                                              |
| `legacy: true`                                                      | ✅ Aceito                                                                                                                                               |
| `createI18n({ messages })`                                          | ⚠️ `messages` são usados como um **fallback em runtime** com um aviso de dev. Remova as importações JSON para ganhos no bundle                          |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Aviso e sem ação. O carregamento de mensagens em runtime é substituído por dicionários em build-time                                                 |
| SFC `<i18n>` custom blocks                                          | ❌ Não lido. Mova essas mensagens para o JSON de locale (ou um `.content.ts` próximo ao componente)                                                     |
| `@nuxtjs/i18n`                                                      | ⚠️ Adapter separado, veja a [documentação de compatibilidade Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/nuxtjs-i18n.md) |

## O benchmark

### O que foi medido

O [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite constrói **a mesma aplicação Vite + Vue 3** com cada setup: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idênticos e conteúdo idêntico. As páginas são medidas em `en` e `fr`.

Ambas foram construídas na configuração **static**, a que a maioria dos projetos Vue faz deploy: para `vue-i18n`, todo o JSON de cada locale é importado e passado para `createI18n({ messages })`; para o adapter, os mesmos componentes com `vite.config.ts` e `intlayer.config.ts` alterados e a importação de `messages` removida. O `vue-intlayer` nativo é incluído como referência.

Para cada build, a suite registra:

- **Tamanho da lib**: tamanho gzip (e minificado) de um componente vazio que apenas importa a biblioteca i18n.
- **Page JS**: JavaScript gzip baixado por página, média de todas as páginas e locales.
- **Locale leak %**: compartilhamento de strings traduzidas no JS baixado que pertencem a um locale que o usuário **não está** visualizando.
- **Page leak %**: compartilhamento de strings traduzidas no JS baixado que pertencem a uma página em que o usuário **não está**.
- **Component avg**: tamanho gzip médio de cada componente compilado isoladamente.
- **E2E reactivity**: tempo decorrido entre selecionar uma nova locale e `html[lang]` ser atualizado no DOM (Playwright, 5 iterações).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Os números abaixo vêm da execução datada de **2026-09-12** com `vue-i18n` 11.4.0 e `@intlayer/vue-i18n` 9.5.1. A aplicação de teste é deliberadamente pequena (algumas dezenas de strings por locale), então as porcentagens de vazamento descrevem um **padrão**: elas crescem com seu conteúdo enquanto o custo de runtime permanece fixo.

### Resultados em Vite + Vue 3

Escolha as métricas e as bibliotecas que importam para você:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (sem i18n)      | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (nativo)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> A coluna page-leak da aplicação base é deixada em branco: sem biblioteca i18n, a coleta de impressões digitais detecta strings codificadas em chunks compartilhados e o número não é significativo.

**Como ler**

- **88 KB a menos por página, mesmos componentes.** `vue-i18n` leva a aplicação de 41.3 KB para **134.9 KB**. O build do adaptador dos mesmos componentes chega a **47.0 KB**, 5.7 KB acima da aplicação base. A maior parte da diferença é os 74.9 KB de `src/locales` que `createI18n({ messages })` puxa para cada página e o adaptador nunca agrupa como um bloco.
- **O runtime encolhe 3x.** Um componente vazio que apenas importa `vue-i18n` custa **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`, o compilador de mensagens e o runtime. O adapter custa **7.9 KB / 23.2 KB**, a maior parte sendo o core do Intlayer mais a superfície da API `vue-i18n`.
- **Componentes: 23x menores.** Um componente `useI18n()` compilado em isolamento tem uma média de **196 KB**, porque `t` está vinculado à instância que contém todas as mensagens de cada locale. Com o adapter, o mesmo componente tem uma média de **8.4 KB**: ele alcança seu próprio dicionário.
- **Vazamento.** `vue-i18n` fornece cada locale e as strings de cada página em cada página: 50% de vazamento de locale (nas duas locales com fingerprint; com dez locales agrupadas o desperdício real é maior), 90% de vazamento de página. O adapter reduz o vazamento de página para **0%** porque cada componente importa apenas seus dicionários. O vazamento de locale fica em 15% nesta execução `static`; `importMode: 'dynamic'` é a configuração que o remove, e essa configuração não fazia parte desta execução do Vue.
- **Reatividade e carregamento de página.** A troca de locale é barata para ambas (1.5-2.8 ms); o sistema de reatividade do Vue torna isso possível uma vez que as mensagens estão na memória. O carregamento de página vai de 13.6 ms para **9.3 ms**, alinhado com 88 KB a menos de JavaScript para fazer parse.
- **Sobre as linhas nativas.** `vue-intlayer` nesta execução agrupou cada locale em modo `static` e chegou a 57.1 KB com um runtime de 3.9 KB; os dicionários sincronizados do adaptador carregavam menos strings de locales estrangeiros, daí a figura mais baixa por página. O runtime nativo permanece o mais leve dos três, e seu modelo `.content.ts` é onde os blocos SFC `<i18n>` encontram seu equivalente.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa, cada biblioteca e cada estratégia, no [relatório de benchmark do Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/vue.md).

## Por que os números se movem

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nada em `src/components/` mudou, então os ganhos vêm do que `useI18n` está vinculado.

**Com `vue-i18n`**, a ligação é a instância global. `createI18n({ messages: { en, fr, ... } })` é uma importação que contém tudo; cada componente que chama `useI18n()` pode acessar tudo isso, então o bundler não consegue dividir abaixo da instância. Otimizar significa que _você_ divide `en.json` por rota, chama `setLocaleMessage()` em um router guard, e mantém o mapa rota-para-arquivo correto conforme os componentes se movem. O desperdício cresce em dois eixos simultaneamente, páginas e idiomas:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # strings de todas as páginas
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**Com `@intlayer/vue-i18n`**, a binding é o dicionário. `syncJSON` transforma cada chave de nível superior de `en.json` em um dicionário; a passagem de otimização entrega ao componente os que seus nomes de chaves, importando o rastreamento do bundler e dividindo por página.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # inalterado, ainda a fonte da verdade
│   └── fr.json
├── .intlayer/                     # gerado: um dicionário por chave de nível superior, por locale
└── src
    ├── i18n.ts                    # createI18n({})   ← importação de messages removida
    ├── main.ts                    # app.use(i18n)    ← inalterado
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← inalterado
```

A importação `messages` em `i18n.ts` é a única linha a deletar. Isso são 88 KB.

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

O comando detecta `vue-i18n`, instala `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` e `@intlayer/sync-json-plugin`, e preenche previamente `intlayer.config.ts`. Mantenha `vue-i18n` instalado: é uma peer dependency e fornece os tipos.

</Step>
<Step number={2} title="Aponte Intlayer para seus arquivos de localização">

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
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // dialeto vue-i18n: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` permanece onde está. Cada chave de nível superior (`footer`, `hero`...) torna-se um dicionário.

</Step>
<Step number={3} title="Adicionar o plugin e remover a importação de mensagens">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Antes: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` encapsula `vite-intlayer` (observação de conteúdo, compilação de dicionário, a passagem de otimização) e cria um alias de `vue-i18n` para o adaptador. Remover a importação de `messages` é o que reduz os 88 KB; deixá-la ativa mantém a aplicação funcionando mas envia ambos.

</Step>
</Steps>

### O que você pode deletar depois

| Arquivo / padrão                                 | Por quê                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `import en from "./locales/en.json"` e similares | Usado apenas como fallback pelo adapter. É aqui que estava os 88 KB                  |
| `setLocaleMessage()` em route guards             | Sem efeito. O carregamento por rota agora é responsabilidade do compiler             |
| `@intlify/unplugin-vue-i18n`                     | Não necessário: pré-compila mensagens e blocos SFC que o adapter não lê              |
| Blocos SFC `<i18n>`                              | Não são lidos; mova-os para o JSON de locale ou para um `.content.ts` por componente |

### O que você ganha além de bytes

- **Chaves tipadas.** `t("footer.github")` é tipado contra o dicionário `footer` compilado; um caminho incorreto é um erro de TypeScript em vez da chave renderizada como texto.
- **`npx intlayer test`** falha no CI se houver uma chave faltando em qualquer locale. **`npx intlayer fill`** traduz as chaves faltando com sua chave de provider (OpenAI, Anthropic, Mistral, Gemini...) e as escreve de volta em `locales/{locale}.json`.
- **Visual Editor e CMS** operam no mesmo JSON, então desenvolvedores não profissionais editam através de uma UI e os arquivos são atualizados.
- **Migração incremental para `.content.ts`.** Qualquer componente pode mudar de `useI18n()` para `useIntlayer("footer")` com um arquivo de conteúdo co-localizado. Dicionários JSON e `.content.ts` coexistem e fazem merge.

## Limites a conhecer antes de começar

<AccordionGroup>
<Accordion header="Blocos SFC <i18n> não são lidos">

Se suas mensagens estão dentro dos componentes, elas precisam ser movidas para os arquivos de idioma ou para um arquivo `.content.ts`, que é a mesma ideia com tipos gerados.

</Accordion>
<Accordion header="O carregamento de mensagens em tempo de execução foi descontinuado">

`setLocaleMessage()` e `mergeLocaleMessage()` exibem um aviso e retornam. Traduções obtidas de um CMS em tempo de execução precisam do [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) ou dos comandos `intlayer pull` / `push`.

</Accordion>
<Accordion header="messages é um fallback, não gratuito">

Manter as importações JSON no `createI18n()` mantém os 75 KB no bundle. Remova-as assim que o `intlayer test` passar com sucesso.

</Accordion>
<Accordion header="O adaptador não é o runtime nativo">

7.9 KB contra 3.9 KB para o `vue-intlayer`. Assim que cada componente tiver migrado para o `useIntlayer`, remova-o.

</Accordion>
</AccordionGroup>

## Quando usar qual?

<AccordionGroup>
<Accordion header="Permanecer no vue-i18n">

Sua aplicação depende dos blocos SFC `<i18n>`, de fluxos `setLocaleMessage()` em tempo de execução, ou 90 KB por página não é uma preocupação para o seu público.

</Accordion>
<Accordion header="Usar @intlayer/vue-i18n">

Você está no `vue-i18n` e deseja os 88 KB economizados, componentes 23 vezes menores, 0% de vazamento de página, chaves tipadas e verificações no CI sem editar um arquivo `.vue`. Este é o ponto de entrada para uma base de código `vue-i18n` existente.

</Accordion>
<Accordion header="Tornar-se nativo (vue-intlayer)">

Para novos projetos, ou assim que o adaptador cumprir seu papel. Possui o runtime mais leve (3.9 KB) e o modelo `.content.ts` por componente que substitui blocos `<i18n>` por conteúdo tipado. Comece com [Intlayer com Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vue.md) ou [com Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nuxt.md).

</Accordion>
</AccordionGroup>

## Perguntas Frequentes

<FAQ>

<Question title="Preciso editar meus arquivos .vue?">

Não. A compilação do benchmark modificou apenas o `vite.config.ts`, `intlayer.config.ts` e uma linha em `src/i18n.ts`, a importação de `messages`. Todas as chamadas para `useI18n()`, `$t`, `v-t` e Options API permaneceram inalteradas.

</Question>

<Question title="Por que o tamanho do componente é 23 vezes menor?">

Porque o `useI18n()` deixa de acessar a instância global. O `createI18n({ messages })` contém todas as mensagens de todos os idiomas, então um componente compilado isoladamente arrasta 196 KB. Com o adaptador, ele acessa apenas seu próprio dicionário: 8.4 KB.

</Question>

<Question title="E quanto à formatação com d() e n()?">

Mantida. As configurações `datetimeFormats` e `numberFormats` passadas para `createI18n()` são respeitadas, suportadas pela API nativa `Intl`. Consulte [formatação de data, hora e número](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/date_time_number_formatting_locales.md).

</Question>

<Question title="Funciona com Nuxt?">

O `@intlayer/vue-i18n` é voltado para Vite + Vue. Para `@nuxtjs/i18n`, use o [adaptador de compatibilidade Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/nuxtjs-i18n.md) e veja [Intlayer com Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nuxt.md) para a configuração nativa.

</Question>

<Question title="Posso migrar componente por componente?">

Sim. Qualquer componente pode mudar de `useI18n()` para `useIntlayer("footer")` com um arquivo de conteúdo co-localizado. Dicionários JSON e `.content.ts` coexistem e se mesclam.

</Question>

</FAQ>

## Comparações relacionadas

Mesma série de adaptadores:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-intl_vs_intlayer-next-intl.md)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer-lingui.md)

Bibliotecas comparadas diretamente:

- [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer.md), features and DX
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer_benchmark.md)
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/is_vue-i18n_outdated.md)
- [How to pick a Vue i18n library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_vue_i18n_library.md)

Documentação de referência:

- [Compat adapter: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/vue-i18n.md) and [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/nuxtjs-i18n.md)
- [Guia de migração: vue-i18n para Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_vue-i18n_to_intlayer.md)
- [Relatório de benchmark do Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/vue.md)
- [Otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e [o compilador Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)
- [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) e [tradução por IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md)

## Conclusão

`@intlayer/vue-i18n` muda o que `useI18n()` está vinculado: de uma instância global contendo todas as mensagens de cada locale para um dicionário compilado para esse componente. No mesmo app Vite + Vue 3 que é **88 KB menor por página**, um **runtime 3x menor**, **componentes 23x menores** e **0% vazamento de página**, para um arquivo de config, uma linha de plugin e um import deletado. Blocos SFC `<i18n>` e carregamento de mensagens em tempo de execução são as duas coisas que não carrega, e o runtime `vue-intlayer` nativo permanece com metade do tamanho.

Todos os dados brutos, os aplicativos de teste e os scripts estão no [repositório Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Execute você mesmo.

Consulte a [documentação 'Por que Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) para mais detalhes.
