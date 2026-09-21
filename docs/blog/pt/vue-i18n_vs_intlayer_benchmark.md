---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: Benchmark 2026"
description: vue-i18n e Intlayer medidos na mesma app Vite + Vue 3. Tamanho da biblioteca, JavaScript por página, vazamento de conteúdo, tamanho dos componentes e reatividade da troca de locale, com os números explicados.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Benchmark de internacionalização (i18n) para Vue

`vue-i18n` é a biblioteca i18n de referência para Vue. Intlayer é uma alternativa baseada em compilador, com conteúdo delimitado por componente, com uma integração Vue (`vue-intlayer`). Já comparamos suas [funcionalidades e experiência de desenvolvimento](https://intlayer.org/blog/vue-i18n-vs-intlayer). Este artigo analisa quanto cada uma custa depois que a app é compilada.

Os dados vêm do [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), uma suíte open-source que compila a mesma aplicação com cada biblioteca e registra o que o navegador realmente baixa e executa.

<TOC/>

> **tl;dr**: Na mesma app Vite + Vue 3, `vue-i18n` entrega **134,9 KB** de JavaScript gzipado por página contra **41,3 KB** para a app sem i18n. Intlayer entrega **57,1 KB**. O runtime do `vue-i18n` sozinho pesa **24,3 KB gzip** (6x os 3,9 KB do Intlayer), cada página carrega **90% das strings de outras páginas**, e um componente compilado isoladamente arrasta **196 KB** porque está preso à árvore global de mensagens. O adaptador `@intlayer/vue-i18n` mantém a API do `vue-i18n` e mediu **47,0 KB** por página.

## Em resumo

- **vue-i18n** - A biblioteca i18n de facto para Vue 2 / Vue 3 e o núcleo do `@nuxtjs/i18n`. Mensagens no estilo ICU, blocos `<i18n>` em SFC, diretiva `v-t`, formatadores `d()` / `n()`, grande ecossistema. As mensagens são registradas em uma instância global no `createI18n()`; o lazy loading por locale é um padrão manual com `setLocaleMessage()`, e a divisão por rota fica por sua conta.
- **Intlayer** - Modelo de conteúdo centrado em componentes. Os dicionários `.content.ts` ficam ao lado do componente que servem, um compilador em tempo de build (`vite-intlayer`) faz tree-shaking e lazy loading por componente e por locale, tipos TypeScript estritos são gerados a partir do seu conteúdo, e traduções ausentes falham no build. Inclui helpers de roteamento / SEO, um Visual Editor / CMS e tradução assistida por IA.

| Biblioteca            | Estrelas GitHub                                                                                                                                                                | Commits totais                                                                                                                                                                     | Último commit                                                                                                                                       | Primeira versão | Versão NPM                                                                                                  | Downloads NPM                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Abril 2024      | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Dez 2016        | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Os badges são atualizados automaticamente. Os snapshots vão variar com o tempo.

## Comparação de funcionalidades lado a lado

| Funcionalidade                                  | `vue-intlayer` (Intlayer)                                   | `vue-i18n`                                                                        |
| ----------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Traduções perto dos componentes**             | ✅ Sim, `.content.ts` colocado junto a cada componente      | ✅ Via blocos SFC `<i18n>` (opcional); catálogos globais são a configuração comum |
| **Integração TypeScript**                       | ✅ Tipos estritos gerados automaticamente do conteúdo       | ✅ Boas tipagens; segurança estrita de chaves exige schema tipado e disciplina    |
| **Detecção de traduções ausentes**              | ✅ Erro TypeScript + erro/aviso em tempo de build           | ⚠️ Fallback em runtime + aviso no console                                         |
| **Conteúdo rico (componentes / Markdown)**      | ✅ Suporte direto                                           | ⚠️ Interpolação de componentes `<i18n-t>`; Markdown via plugins externos          |
| **Suporte a ICU**                               | ⚠️ Em andamento                                             | ✅ Sim                                                                            |
| **Formatação (datas, números, moedas)**         | ✅ Formatadores baseados em Intl                            | ✅ `d()` / `n()` com `datetimeFormats` / `numberFormats`                          |
| **Roteamento localizado**                       | ✅ Helpers para Vue Router / Nuxt, `getMultilingualUrls`    | ⚠️ Não é core (`@nuxtjs/i18n` ou configuração de roteador personalizada)          |
| **Helpers de SEO (hreflang, sitemap, robots)**  | ✅ Helpers integrados                                       | ❌ Não é core                                                                     |
| **Tree-shaking (entregar só o conteúdo usado)** | ✅ Por componente, por locale, automatizado pelo compilador | ⚠️ Manual: dividir catálogos, `setLocaleMessage()` por rota                       |
| **Lazy loading**                                | ✅ `importMode: 'dynamic'` (uma linha de config)            | ✅ `import()` manual + `setLocaleMessage()`                                       |
| **Purga de conteúdo não usado**                 | ✅ Dicionários mortos são descartados no build              | ❌ Não integrado                                                                  |
| **Teste de traduções ausentes (CLI / CI)**      | ✅ `npx intlayer content test`                              | ⚠️ De terceiros (`vue-i18n-extract`)                                              |
| **Tradução com IA**                             | ✅ Integrada, usa suas próprias chaves de provedor          | ❌ Não                                                                            |
| **Visual Editor / CMS**                         | ✅ Visual Editor gratuito + CMS opcional                    | ❌ Não (plataformas externas de localização)                                      |
| **Servidor MCP e Agent Skills**                 | ✅ Sim                                                      | ❌ Não                                                                            |
| **Ecossistema / comunidade**                    | ⚠️ Menor mas crescendo rápido                               | ✅ Grande e maduro no ecossistema Vue                                             |

## O benchmark

### O que foi medido

A suíte [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila **a mesma aplicação Vite + Vue 3** com cada biblioteca: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idênticos e conteúdo idêntico. As páginas são medidas em `en` e `fr`.

Ambas as bibliotecas foram testadas na configuração **static**, a que a maioria dos projetos Vue entrega: para `vue-i18n`, o JSON de cada locale importado e passado para `createI18n({ messages })`; para Intlayer, o `importMode: 'static'` padrão. Nesse modo o Intlayer também empacota todos os locales, mas o compilador ainda delimita o conteúdo **por componente**, então uma página só carrega os dicionários dos componentes que renderiza.

Para cada build, a suíte registra:

- **Lib size**: tamanho gzip de um componente vazio que só importa a biblioteca i18n. O custo fixo do runtime.
- **Page JS**: JavaScript gzip baixado por página, em média sobre todas as páginas e locales.
- **Locale leak %**: parcela de strings traduzidas encontradas no JS baixado que pertencem a um locale que o usuário **não** está vendo (fingerprint em `en` e `fr`, então 50% significa "o outro locale medido está totalmente presente"; com 10 locales empacotados, o desperdício real é maior).
- **Page leak %**: parcela de strings traduzidas encontradas no JS baixado que pertencem a uma página em que o usuário **não** está.
- **Component avg**: tamanho gzip médio de cada componente compilado isoladamente. Mostra quanto runtime i18n e catálogo um único componente arrasta.
- **E2E reactivity**: tempo real entre selecionar um novo locale e `html[lang]` ser atualizado no DOM (Playwright, 5 iterações).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Os números abaixo vêm da execução datada de **2026-09-12** com `vue-i18n` 11.4.0 e `intlayer` 9.5.0 / 9.5.1. A aplicação de teste é deliberadamente pequena (algumas dezenas de strings por locale), então as porcentagens de vazamento descrevem um **padrão**: elas crescem com o seu conteúdo enquanto o custo do runtime permanece fixo.

### Resultados em Vite + Vue 3

| Biblioteca                    | Estratégia | Lib size (gz) | Lib size (min) | Page JS méd. (gz) | Locale leak | Page leak | Component méd. (gz) | Reatividade E2E | Page load |
| ----------------------------- | ---------- | ------------: | -------------: | ----------------: | ----------: | --------: | ------------------: | --------------: | --------: |
| **base** (sem i18n)           | -          |        0,0 KB |         0,0 KB |           41,3 KB |        0,0% |         - |              1,1 KB |          1,8 ms |   10,8 ms |
| `vue-i18n`                    | static     |       24,3 KB |        83,2 KB |          134,9 KB |       50,0% |     90,0% |            196,0 KB |          2,8 ms |   13,6 ms |
| **`vue-intlayer`**            | static     |    **3,9 KB** |    **11,1 KB** |       **57,1 KB** |       56,8% |  **0,0%** |          **7,7 KB** |      **4,5 ms** |   13,8 ms |
| `@intlayer/vue-i18n` (compat) | static     |        7,9 KB |        23,2 KB |           47,0 KB |       15,0% |      0,0% |              8,4 KB |          1,5 ms |    9,3 ms |

> A coluna page-leak da app base é deixada em branco: sem biblioteca i18n, o fingerprinting captura strings hard-coded em chunks compartilhados e o número não é significativo.

**Como ler**

- **Custo do runtime.** `vue-i18n` é um dos runtimes mais pesados de todo o benchmark: **24,3 KB gzip / 83,2 KB minificado** para um componente vazio que apenas o importa. `vue-intlayer` custa 3,9 KB gzip. Essa diferença é paga em cada página, independentemente de quantas strings você tem.
- **JavaScript por página.** A app sem i18n pesa 41,3 KB. `vue-i18n` mais que triplica para **134,9 KB**; Intlayer fica em **57,1 KB**, +15,8 KB, a maior parte vinda dos dez locales empacotados (veja o próximo ponto).
- **Vazamento.** Com `createI18n({ messages: { en, fr, ... } })`, cada página entrega todos os locales e as strings de todas as páginas: **50% de vazamento de locale** (nos dois locales com fingerprint) e **90% de vazamento de página**. O modo `static` do Intlayer também empacota todos os locales (daí o número comparável de vazamento de locale) mas tem **0% de vazamento de página**: uma página só puxa os dicionários dos componentes que renderiza. Trocar para `importMode: 'dynamic'` remove também o vazamento de locale; essa configuração não fez parte desta execução Vue.
- **O tamanho dos componentes é onde a arquitetura aparece.** Um componente que chama `useI18n()` compila para **196 KB** em média, porque `t()` está preso à instância global que contém todas as mensagens de todos os locales. O mesmo componente com `useIntlayer()` compila para **7,7 KB**: ele só alcança o seu próprio dicionário.
- **Reatividade** não é problema para nenhum dos dois (2-5 ms). O sistema de reatividade do Vue torna a troca de locale barata uma vez que as mensagens estão em memória.
- **`@intlayer/vue-i18n`**, o adaptador drop-in, mantém a API do `vue-i18n` e mediu **47,0 KB por página** e **8,4 KB por componente**, com o código da aplicação intocado.

> Para referência, a mesma execução mediu `fluent-vue` em 171,8 KB por página, 29,7 KB de runtime e 217 KB por componente.

## Por que a diferença? Instância global vs. dicionários compilados

`vue-i18n` é um runtime. `createI18n()` constrói uma instância global que contém uma árvore de mensagens por locale; `useI18n()` vincula cada componente a ela; `t("footer.github")` procura a chave no momento do render. É isso que torna possíveis os blocos SFC `<i18n>`, `v-t` e o carregamento de mensagens em runtime, e é também por isso que o grafo de dependências de cada componente inclui a árvore inteira:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # um arquivo por locale, todas as páginas dentro
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Otimizar significa que **você** divide `en.json` em arquivos por rota, **você** chama `setLocaleMessage()` em um guard do roteador, e **você** mantém o mapa rota-arquivo correto conforme os componentes se movem. O runtime não pode fazer isso por você porque não faz ideia de quais chaves um componente vai pedir.

Intlayer move esse conhecimento para o build. O conteúdo é declarado ao lado do componente, e `vite-intlayer` resolve qual componente importa qual dicionário:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

O compilador emite, por dicionário e por locale, exatamente o JSON de que aquele componente precisa, e descarta os dicionários que nada importa. A delimitação por rota é uma consequência da delimitação por componente, não uma tarefa.

> Para descartar também os locales não usados, defina `dictionary.importMode: 'dynamic'` em `intlayer.config.ts`. Veja a [doc de otimização de bundle](https://intlayer.org/doc/concept/bundle-optimization).

## Experiência de desenvolvimento

### Configuração

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Componente

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` é uma string até que você mesmo tipe o schema de mensagens; um erro de digitação renderiza a chave.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` e `increment` são tipados; um erro de digitação é um erro TypeScript, um valor em francês ausente é um erro de build.

### Lazy loading por locale

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Depois chame `loadLocaleMessages()` a partir de um guard do roteador, e divida você mesmo `locales/{locale}.json` por rota se quiser delimitação por página.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Mantenha a API do vue-i18n, obtenha a saída do Intlayer

`@intlayer/vue-i18n` é um adaptador drop-in: `useI18n()`, `t()`, `d()`, `n()`, a interpolação `{name}` e `{0}`, plurais com pipe (`"car | cars"`), `v-t` e `i18n.global.locale` continuam funcionando, servidos a partir de dicionários Intlayer compilados pelo `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

No benchmark, o build compat da mesma app passou de **134,9 KB para 47,0 KB** por página e de **196 KB para 8,4 KB** por componente, com os componentes intocados. Seus `locales/{locale}.json` existentes podem continuar sendo a fonte de verdade através do plugin de sincronização JSON.

Veja o [guia de migração do vue-i18n](https://intlayer.org/doc/migration/vue-i18n) e a [doc de compatibilidade](https://intlayer.org/doc/compatibility/vue-i18n). Usuários de Nuxt têm o mesmo caminho pela [compatibilidade `@nuxtjs/i18n`](https://intlayer.org/doc/compatibility/nuxtjs-i18n).

## Quando escolher qual?

- **Escolha vue-i18n** se você quer a abordagem Vue padrão, depende de mensagens ICU ou blocos SFC `<i18n>`, já usa `@nuxtjs/i18n`, ou uma plataforma de tradução espera JSON centralizado. Reserve tempo para dividir catálogos e fazer lazy loading por rota se o tamanho do bundle importa.
- **Escolha Intlayer** se você quer **conteúdo delimitado por componente**, **TypeScript estrito**, **erros de chaves ausentes em tempo de build**, **tree-shaking e lazy loading sem esforço**, e ferramentas editoriais integradas (Visual Editor, CMS, tradução por IA, servidor MCP). Especialmente relevante para bases de código Vue / Nuxt grandes e modulares e para design systems.
- **Escolha `@intlayer/vue-i18n`** se você já está no `vue-i18n` e quer os ganhos de bundle sem uma reescrita.

## Comparações relacionadas

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (mesmo benchmark)
- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (mesmo benchmark)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (mesmo benchmark)
- [vue-i18n vs Intlayer (funcionalidades e DX)](https://intlayer.org/blog/vue-i18n-vs-intlayer)
- [O vue-i18n está ultrapassado?](https://intlayer.org/blog/is-vue-i18n-outdated)

## Estrelas no GitHub

As estrelas no GitHub são um forte indicador da popularidade de um projeto, da confiança da comunidade e da relevância a longo prazo. Embora não sejam uma medida direta da qualidade técnica, refletem quantos desenvolvedores acham o projeto útil, acompanham seu progresso e tendem a adotá-lo.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusão

`vue-i18n` é maduro, flexível e profundamente integrado ao Vue. O benchmark mostra o que seu design runtime-first custa em um build Vite: um **runtime de 24 KB gzip**, **134,9 KB por página** para uma app que pesa 41 KB sem i18n, **90% de conteúdo de outras páginas** em cada página, e componentes que chegam cada um a **196 KB** porque dependem da árvore global de mensagens.

Intlayer move o trabalho para o compilador. Dicionários por componente e purga de conteúdo morto são saídas do build, não convenções. Na mesma app: **3,9 KB de runtime**, **57,1 KB por página**, **0% de vazamento de página**, componentes **25x menores**. E se uma reescrita não está na mesa, `@intlayer/vue-i18n` chega à maior parte do caminho com os componentes intocados.

Todos os dados brutos, as apps de teste e os scripts estão no [repositório Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Execute você mesmo.

Consulte a [doc "Por que Intlayer?"](https://intlayer.org/doc/why) para mais detalhes.
