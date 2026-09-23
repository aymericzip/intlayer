---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n vs Intlayer
description: Comparação entre vue-i18n e Intlayer para internacionalização (i18n) em apps Vue/Nuxt
keywords:
  - vue-i18n
  - Intlayer
  - Internacionalização
  - i18n
  - Blog
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n VS Intlayer | Internacionalização (i18n) em Vue

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Este guia compara duas opções populares de i18n para **Vue 3** (e **Nuxt**): **vue-i18n** e **Intlayer**.
Focamos nas ferramentas modernas do Vue (Vite, Composition API) e avaliamos:

1. **Arquitetura & organização de conteúdo**
2. **TypeScript & segurança**
3. **Tratamento de traduções faltantes**
4. **Roteamento & estratégia de URL**
5. **Performance & comportamento de carregamento**
6. **Experiência do desenvolvedor (DX), ferramentas & manutenção**
7. **SEO & escalabilidade para grandes projetos**

<TOC/>

> **resumo**: Ambos podem localizar apps Vue. Se você deseja **conteúdo com escopo de componente**, **tipos TypeScript rigorosos**, **verificações de chaves faltantes em tempo de build**, **dicionários otimizados por tree-shaking**, e **helpers integrados para roteamento/SEO** além de **Editor Visual & traduções com IA**, **Intlayer** é a escolha mais completa e moderna.

## Posicionamento em alto nível

- **vue-i18n** - A biblioteca i18n padrão para Vue. Formatação flexível de mensagens (estilo ICU), blocos SFC `<i18n>` para mensagens locais, e um grande ecossistema. Segurança e manutenção em larga escala ficam principalmente por sua conta.
- **Intlayer** - Modelo de conteúdo centrado em componentes para Vue/Vite/Nuxt com **tipagem TS rigorosa**, **verificações em tempo de build**, **tree-shaking**, **helpers para roteador e SEO**, **Editor Visual/CMS** opcional e **traduções assistidas por IA**.

## O que custa em tempo de build

Antes das tabelas de recursos, a parte medida. [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila a mesma aplicação Vite + Vue 3 (10 páginas, 10 idiomas) com cada biblioteca e registra o que o navegador baixa:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

O runtime do `vue-i18n` sozinho pesa **6x** o do Intlayer, cada página carrega **90% de strings de páginas externas**, e um componente compilado isoladamente arrasta **196 KB** porque `useI18n()` o vincula à árvore global de mensagens. A execução completa, com tempos de reatividade e carregamento de página, está no [benchmark vue-i18n vs Intlayer](https://intlayer.org/pt/blog/vue-i18n-vs-intlayer-benchmark).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa no [relatório de benchmark do Vue](https://intlayer.org/pt/doc/benchmark/vue).

## Comparação de Recursos Lado a Lado (focada em Vue)

| Recurso                                            | **Intlayer**                                                                          | **vue-i18n**                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Traduções próximas aos componentes**             | ✅ Sim, conteúdo colocalizado por componente (ex.: `MyComp.content.ts`)               | ✅ Sim, via blocos SFC `<i18n>` (opcional)                                                   |
| **Integração com TypeScript**                      | ✅ Avançada, tipos **estritos** gerados automaticamente e autocompletar de chaves     | ✅ Boas tipagens; **segurança estrita de chaves requer configuração/disciplinas adicionais** |
| **Detecção de tradução ausente**                   | ✅ Avisos/erros em **tempo de build** e exposição no TS                               | ⚠️ Fallbacks/avisos em tempo de execução                                                     |
| **Conteúdo rico (componentes/Markdown)**           | ✅ Suporte direto para nós ricos e arquivos de conteúdo Markdown                      | ⚠️ Limitado (componentes via `<i18n-t>`, Markdown via plugins externos)                      |
| **Tradução com IA**                                | ✅ Fluxos de trabalho integrados usando suas próprias chaves de provedores de IA      | ❌ Não integrado                                                                             |
| **Editor Visual / CMS**                            | ✅ Editor Visual gratuito e CMS opcional                                              | ❌ Não integrado (use plataformas externas)                                                  |
| **Roteamento localizado**                          | ✅ Auxiliares para Vue Router/Nuxt para gerar caminhos localizados, URLs e `hreflang` | ⚠️ Não é parte do núcleo (use Nuxt i18n ou configuração personalizada do Vue Router)         |
| **Geração dinâmica de rotas**                      | ✅ Sim                                                                                | ❌ Não fornecido (Nuxt i18n fornece)                                                         |
| **Pluralização e formatação**                      | ✅ Padrões de enumeração; formatadores baseados em Intl                               | ✅ Mensagens no estilo ICU; formatadores Intl                                                |
| **Formatos de conteúdo**                           | ✅ `.ts`, `.js`, `.json`, `.md`, `.txt` (YAML em desenvolvimento)                     | ✅ `.json`, `.js` (além de blocos SFC `<i18n>`)                                              |
| **Suporte ICU**                                    | ⚠️ Em desenvolvimento                                                                 | ✅ Sim                                                                                       |
| **Auxiliares de SEO (sitemap, robots, metadados)** | ✅ Auxiliares integrados (independente de framework)                                  | ❌ Não faz parte do núcleo (Nuxt i18n/comunidade)                                            |
| **SSR/SSG**                                        | ✅ Funciona com Vue SSR e Nuxt; não bloqueia a renderização estática                  | ✅ Funciona com Vue SSR/Nuxt                                                                 |
| **Tree-shaking (enviar apenas o conteúdo usado)**  | ✅ Por componente em tempo de build                                                   | ⚠️ Parcial; requer divisão manual de código/mensagens assíncronas                            |
| **Carregamento preguiçoso (Lazy loading)**         | ✅ Por localidade / por dicionário                                                    | ✅ Suporte a mensagens de localidade assíncronas                                             |
| **Purgar conteúdo não utilizado**                  | ✅ Sim (em tempo de build)                                                            | ❌ Não incorporado                                                                           |
| **Manutenção em projetos grandes**                 | ✅ Incentiva estrutura modular, amigável a design systems                             | ✅ Possível, mas requer disciplina rigorosa de arquivos/namespace                            |
| **Ecossistema / comunidade**                       | ⚠️ Menor, mas crescendo rapidamente                                                   | ✅ Grande e madura no ecossistema Vue                                                        |

## Comparação detalhada

<AccordionGroup>
<Accordion header="1) Arquitetura e escalabilidade">

- **vue-i18n**: Configurações comuns usam **catálogos centralizados** por localidade (opcionalmente divididos em arquivos/namespace). Blocos SFC `<i18n>` permitem mensagens locais, mas as equipes frequentemente retornam a catálogos compartilhados conforme os projetos crescem. Consulte [i18n por componente vs centralizado](https://intlayer.org/pt/blog/per-component-vs-centralized-i18n).
- **Intlayer**: Promove **dicionários por componente** armazenados ao lado do componente que atendem. Isso reduz conflitos entre equipes, mantém o conteúdo descobrível e limita naturalmente a deriva/chaves não utilizadas.

**Por que isso importa:** Em grandes aplicativos Vue ou sistemas de design, **conteúdo modular** escala melhor do que catálogos monolíticos.

</Accordion>
<Accordion header="2) TypeScript e segurança">

- **vue-i18n**: Bom suporte a TS; **tipagem estrita de chaves** normalmente requer esquemas/genéricos personalizados e convenções cuidadosas.
- **Intlayer**: **Gera tipos estritos** a partir do seu conteúdo, oferecendo **autocompletar no IDE** e **erros em tempo de compilação** para erros de digitação/chaves ausentes.

**Por que isso importa:** Tipagem forte detecta problemas **antes** da execução.

</Accordion>
<Accordion header="3) Tratamento de traduções ausentes">

- **vue-i18n**: Avisos/falhas em **tempo de execução** (ex.: fallback para localidade ou chave). Consulte [detecção de traduções ausentes](https://intlayer.org/pt/blog/detecting-missing-translations).
- **Intlayer**: Detecção em **tempo de build** com avisos/erros entre localidades e chaves., mais `npx intlayer test` no CI.

**Por que isso importa:** Aplicação em tempo de build mantém a interface de produção limpa e consistente.

</Accordion>
<Accordion header="4) Estratégia de roteamento e URLs (Vue Router/Nuxt)">

- **Ambos** podem funcionar com rotas localizadas. Consulte o [guia de hreflang](https://intlayer.org/pt/blog/hreflang-guide-multilingual-seo).
- **Intlayer** fornece auxiliares para **gerar caminhos localizados**, **gerenciar prefixos de localidade** e emitir **`<link rel="alternate" hreflang>`** para SEO. Com Nuxt, complementa o roteamento do framework.

**Por que isso importa:** Menos camadas personalizadas e **SEO mais limpo** entre localidades.

</Accordion>
<Accordion header="5) Desempenho e comportamento de carregamento">

- **vue-i18n**: Suporta mensagens de localidade assíncronas; evitar sobrecarregamento é sua responsabilidade (divida os catálogos com cuidado). O benchmark acima comprova com números: 134.9 KB contra 57.1 KB por página.
- **Intlayer**: **Elimina código morto** na build e **carrega preguiçosamente por dicionário/localidade**. Conteúdo não utilizado não é enviado.

**Por que isso importa:** Pacotes menores e inicialização mais rápida para apps Vue multilíngues.

</Accordion>
<Accordion header="6) Experiência do desenvolvedor e ferramentas">

- **vue-i18n**: Documentação madura e comunidade consolidada; normalmente você dependerá de **plataformas externas de localização** para fluxos editoriais.
- **Intlayer**: Oferece um **Editor Visual gratuito**, **CMS** opcional (compatível com Git ou externalizado), uma **extensão para VSCode**, utilitários **CLI/CI** e **traduções assistidas por IA** usando suas próprias chaves de provedor., um **servidor MCP**

**Por que isso importa:** Menor custo operacional e um ciclo de desenvolvimento–conteúdo mais curto.

</Accordion>
<Accordion header="7) SEO, SSR e SSG">

- **Ambos** funcionam com Vue SSR e Nuxt. Consulte [internacionalização e SEO](https://intlayer.org/pt/blog/SEO-and-i18n).
- **Intlayer**: Adiciona **auxiliares de SEO** (sitemaps/metadados/`hreflang`) que são independentes de framework e funcionam bem com builds Vue/Nuxt.

**Por que isso importa:** SEO internacional sem configurações personalizadas complexas.

</Accordion>
</AccordionGroup>

## Por que Intlayer? (Problema & abordagem)

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

A maioria das pilhas i18n (incluindo **vue-i18n**) começa a partir de **catálogos centralizados**:

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="Um arquivo por idioma" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="Uma pasta por idioma" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

Essa pasta continua crescendo, um namespace por recurso, em cada idioma:

```txt
locales
├── EN
│   ├── blog.json
│   ├── about.json
│   ├── auth.json
│   ├── blog.json
│   ├── cart.json
│   ├── categories.json
│   ├── contact.json
│   ├── dashboard.json
│   ├── errors.json
│   ├── faq.json
│   ├── footer.json
│   ├── form.json
│   ├── home.json
│   ├── language.json
│   ├── navbar.json
│   ├── ... 65 files
│   └── validation.json
└── ES
```

Isso frequentemente desacelera o desenvolvimento conforme os apps crescem:

1. **Para um novo componente** você cria/edita catálogos remotos, conecta namespaces e traduz (frequentemente via copiar/colar manual de ferramentas de IA).
2. **Ao modificar componentes** você procura chaves compartilhadas, traduz, mantém as localidades sincronizadas, remove chaves obsoletas e alinha as estruturas JSON.

**Intlayer** delimita o conteúdo **por componente** e mantém-no **junto ao código**, como já fazemos com CSS, histórias, testes e documentação:

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

Cada arquivo de idioma precisa ser editado manualmente, e a chave é uma string simples: um erro de digitação é renderizado como `componentExample.greting` em produção.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

Todos os idiomas ficam em um único arquivo tipado ao lado do componente.

</Tab>
</Tabs>

Esta abordagem:

- **Acelera o desenvolvimento** (declare uma vez; IDE/IA completa automaticamente).
- **Limpa a base de código** (1 componente = 1 dicionário).
- **Facilita duplicação/migração** (copie um componente e seu conteúdo juntos).
- **Evita chaves mortas** (componentes não usados não importam conteúdo).
- **Otimiza o carregamento** (componentes carregados sob demanda trazem seu conteúdo junto).

## Funcionalidades adicionais do Intlayer (relevantes para Vue)

- **Suporte multiplataforma**: Funciona com Vue, Nuxt, Vite, React, Express e mais.
- **Gerenciamento de conteúdo baseado em JavaScript**: Declare no código com total flexibilidade.
- **Arquivo de declaração por localidade**: Defina todas as localidades e deixe as ferramentas gerarem o restante.
- **Ambiente com tipagem segura**: Configuração forte de TS com autocompletar.
- **Recuperação simplificada de conteúdo**: Um único hook/composable para buscar todo o conteúdo de um dicionário.
- **Base de código organizada**: 1 componente = 1 dicionário na mesma pasta.
- **Roteamento aprimorado**: Auxiliares para caminhos e metadados localizados do **Vue Router/Nuxt**.
- **Suporte a Markdown**: Importe Markdown remoto/local por localidade; exponha frontmatter para o código.
- **Editor Visual gratuito e CMS opcional**: Criação de conteúdo sem plataforma de localização paga; sincronização amigável ao Git.
- **Conteúdo tree-shakable**: Envia apenas o que é usado; suporta carregamento preguiçoso.
- **Compatível com renderização estática**: Não bloqueia SSG.
- **Traduções com IA**: Traduza para 231 idiomas usando seu próprio provedor de IA/chave de API.
- **Servidor MCP & extensão VSCode**: Automatize fluxos de trabalho i18n e autoria dentro do seu IDE.
- **Interoperabilidade**: Integrações com **vue-i18n**, **react-i18next** e **react-intl** quando necessário.

## Quando escolher qual?

<AccordionGroup>
<Accordion header="Escolher vue-i18n">

Você quer a **abordagem padrão do Vue**, sente-se confortável gerenciando catálogos e namespaces por conta própria, e seu app é de **pequeno a médio porte** (ou você já depende do Nuxt i18n). Blocos SFC `<i18n>` e `setLocaleMessage()` em tempo de execução são recursos que o Intlayer deliberadamente não replica.

</Accordion>
<Accordion header="Escolher Intlayer">

Você valoriza **conteúdo no escopo do componente**, **TypeScript estrito**, **garantias em tempo de compilação**, **tree-shaking** e ferramentas integradas de roteamento, SEO e edição, especialmente para **grandes bases de código modulares em Vue/Nuxt** e design systems. Comece com [Intlayer com Vue](https://intlayer.org/pt/doc/environment/vite-and-vue) ou [com Nuxt](https://intlayer.org/pt/doc/environment/nuxt-and-vue).

</Accordion>
<Accordion header="Escolher @intlayer/vue-i18n">

Você está no `vue-i18n` hoje e deseja os ganhos no bundle sem editar um único arquivo `.vue`. O [adaptador de compatibilidade](https://intlayer.org/pt/doc/compatibility/vue-i18n) mantém `createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t` e `v-t`, servindo-os a partir de dicionários compilados. Medido lado a lado em [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/pt/blog/vue-i18n-vs-intlayer-vue-i18n).

</Accordion>
</AccordionGroup>

## Interoperabilidade com vue-i18n

`intlayer` também pode ajudar a gerenciar seus namespaces `vue-i18n`.

Usando `intlayer`, você pode declarar seu conteúdo no formato de sua biblioteca i18n favorita, e intlayer gerará seus namespaces no local de sua escolha (exemplo: `/messages/{{locale}}/{{namespace}}.json`). Consulte a [documentação de compatibilidade do vue-i18n](https://intlayer.org/pt/doc/compatibility/vue-i18n) e o [adaptador Nuxt i18n](https://intlayer.org/pt/doc/compatibility/nuxtjs-i18n).

## FAQ

<FAQ>

<Question title="O Intlayer é um substituto para o vue-i18n ou uma camada adicional?">

Ambos, dependendo de como você o adota. O `vue-intlayer` é um runtime nativo com seu próprio composable `useIntlayer()`. O `@intlayer/vue-i18n` é um adaptador de compatibilidade que mantém a API do `vue-i18n` e substitui o que está vinculado a ela, permitindo migrar sem alterar componentes e avançar arquivo por arquivo depois.

</Question>

<Question title="O que acontece com meus blocos SFC <i18n>?">

O adaptador não os lê. Mova essas mensagens para seu JSON de idioma, ou para um `.content.ts` ao lado do componente, o que representa a mesma ideia com tipos gerados. Esse é o único recurso do `vue-i18n` que não é suportado.

</Question>

<Question title="O Intlayer funciona com Nuxt?">

Sim. [Intlayer com Nuxt](https://intlayer.org/pt/doc/environment/nuxt-and-vue) cobre roteamento multilíngue, middleware de detecção de idioma e geração de sitemaps. Se você usa `@nuxtjs/i18n`, o [adaptador de compatibilidade Nuxt i18n](https://intlayer.org/pt/doc/compatibility/nuxtjs-i18n) é o caminho de migração.

</Question>

<Question title="Posso manter meus locales/{locale}.json como a fonte da verdade?">

Sim. O [plugin de sincronização JSON](https://intlayer.org/pt/doc/compatibility/vue-i18n) os lê no dialeto do `vue-i18n` (`{name}`, `{0}`, plurais em pipe `"car | cars"`) e grava as traduções de volta quando a CLI ou o CMS os atualiza.

</Question>

<Question title="O ICU funciona com o Intlayer no Vue?">

O suporte nativo a ICU está em desenvolvimento. O adaptador `@intlayer/vue-i18n` resolve a sintaxe de mensagens do próprio `vue-i18n`, incluindo plurais em pipe e interpolação nomeada e de lista. Para o modelo de pluralização do Intlayer, consulte [conteúdo de enumeração](https://intlayer.org/pt/doc/concept/content/enumeration).

</Question>

</FAQ>

## GitHub STARs

As estrelas do GitHub são um forte indicador da popularidade de um projeto, da confiança da comunidade e da relevância a longo prazo. Embora não sejam uma medida direta da qualidade técnica, refletem quantos desenvolvedores acham o projeto útil, acompanham seu progresso e provavelmente o adotarão. Para estimar o valor de um projeto, as estrelas ajudam a comparar a tração entre as alternativas e fornecem informações sobre o crescimento do ecossistema.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusão

Tanto o **vue-i18n** quanto o **Intlayer** localizam bem aplicações Vue. A diferença está em **quanto você precisa construir por conta própria** para alcançar uma configuração robusta e escalável:

- Com **Intlayer**, **conteúdo modular**, **TS rigoroso**, **segurança em tempo de build**, **bundles otimizados por tree-shaking** e **ferramentas para router/SEO/editor** vêm **prontos para usar**.
- Se sua equipe prioriza **manutenibilidade e velocidade** em um app Vue/Nuxt multi-local, orientado a componentes, o Intlayer oferece a experiência **mais completa** atualmente.

## Leituras adicionais

- [vue-i18n vs Intlayer benchmark](https://intlayer.org/pt/blog/vue-i18n-vs-intlayer-benchmark), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/pt/blog/vue-i18n-vs-intlayer-vue-i18n), the adapter on the same app
- [Is vue-i18n outdated?](https://intlayer.org/pt/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/pt/blog/how-to-pick-vue-i18n-library)
- [Using Intlayer with vue-i18n](https://intlayer.org/pt/blog/intlayer-with-vue-i18n)
- [Vue benchmark report](https://intlayer.org/pt/doc/benchmark/vue)
- [Migration guide: vue-i18n to Intlayer](https://intlayer.org/pt/doc/migration/vue-i18n)
- [Bundle optimization](https://intlayer.org/pt/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/pt/doc/compiler)

Refer to ['Why Intlayer?' doc](https://intlayer.org/pt/doc/why) for more details.
