---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: O vue-i18n está obsoleto em 2026?
description: O vue-i18n tem sido o padrão para Vue e Nuxt há dez anos. Contudo, em nossos benchmarks ele se revelou o runtime de i18n mais pesado da web. Entenda o porquê.
keywords:
  - vue-i18n
  - Intlayer
  - Internacionalização
  - i18n
  - Vue
  - Nuxt
  - Tamanho do bundle
  - Blog
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# O vue-i18n está obsoleto em 2026?

No universo Vue, poucas soluções alcançam o nível de utilização do `vue-i18n`. Sob a liderança de Kazupon desde o Vue 2, ele dá suporte ao `@nuxtjs/i18n` e funciona como a alternativa padrão para grande parte das aplicações multilíngues.

Ainda assim, nossos testes de benchmark em 2026 trouxeram um dado surpreendente: **o `vue-i18n` foi o runtime de localização mais pesado entre todos os ecossistemas frontend avaliados.**

Em um projeto simples com Vite + Vue de 31.5 KB, a adoção do `vue-i18n` elevou o JavaScript médio por página para **136.4 KB**, mais que quadruplicando o tamanho transferido.

Por que uma biblioteca feita para um framework reconhecido pela agilidade resultou em uma sobrecarga tão grande? E será que seu modelo estritamente em runtime continua adequado?

<TOC/>

## Principais conclusões

**O runtime mais pesado registrado:**

Com **24.3 KB gzipped (83.2 KB minificados)** antes mesmo de incluir qualquer texto traduzido, o `vue-i18n` é cerca de **9 vezes mais pesado** que a engine do `intlayer` (2.7 KB).

**Aumento de 330% na carga da página:**

O `vue-i18n` fez uma página Vue inicial de 31.5 KB saltar para 136.4 KB. O Intlayer manteve o resultado em 59.3 KB, o que representa **um payload 56% mais leve**.

**Compilador embutido no navegador:**

Por padrão, sem configurar aliases próprios no bundler, o `vue-i18n` envia um compilador completo de mensagens ao navegador para analisar textos dinamicamente.

**Frequência de manutenção:**

No último ano, o `vue-i18n` acumulou ~259 commits, dedicados a correções de bugs e alinhamento com novas versões do Vue.

**Falta de recursos modernos integrados:**

Ausência de suporte de primeiro nível a Language Server (LSP), servidores MCP de IA ou comandos de tradução em linha de comando.

## Manutenção vs. ferramentas atuais

| Repositório           | Estrelas                                                                                                                                               | Total de commits                                                                                                                                                    | Commits / ano                                                                                                                                                      | Último commit                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Histórico do último ano:

- `intlify/vue-i18n`: **259 commits** (manutenção para Vue 3 e Nuxt).
- `aymericzip/intlayer`: **4.343 commits** (trabalho contínuo em otimização de compilação, integrações LSP e suporte a IA).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Uma ferramenta estabelecida garante estabilidade. Mas o desenvolvimento atual aproveita transformações AST no build, eliminação de código inativo e tradução por IA. Um modelo focado no navegador tem dificuldade de acompanhar esses padrões.

## Desempenho em Vite + Vue

Avaliamos um projeto de 10 páginas e 10 idiomas construído com Vite e Vue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Testes executados em navegadores reais com compressão gzip de produção. Informações completas na [documentação do benchmark Vue](https://intlayer.org/pt/doc/benchmark/vue).

### Impacto inicial de cada biblioteca

Sobrecarga antes de adicionar os arquivos de tradução:

| Biblioteca        | Gzipped    | Minificado |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

O runtime do `vue-i18n` sozinho atinge **24.3 KB gzipped**, quase o peso do núcleo do Vue. O Intlayer adiciona meros **2.7 KB**.

### Peso das páginas e dispersão de conteúdo

| Configuração    | JS médio / pág (gz) | Vazamento idioma | Vazamento outras págs | Componente médio (gz) |
| --------------- | ------------------- | ---------------- | --------------------- | --------------------- |
| Base (sem i18n) | 31.5 KB             | 0.0%             | 90.0%                 | 0.9 KB                |
| `vue-i18n`      | **136.4 KB**        | 50.2%            | 90.0%                 | 196.0 KB              |
| Intlayer        | **59.3 KB**         | 51.1%            | **0.0%**              | **6.5 KB**            |

### Conclusões centrais

**Aumento proporcional elevado:**

Como a base do Vue é muito enxuta (~31 KB), o `vue-i18n` multiplica o volume total da página por mais de quatro.

**Vazamento entre páginas:**

Por padrão, **90% das traduções transmitidas** para uma rota pertencem a outras seções. O Intlayer elimina completamente essa perda, atingindo **0.0%**.

**Tamanho de componentes isolados:**

Componentes compilados com escopos locais chegaram a uma média de 196 KB no `vue-i18n` devido à duplicação de catálogos, frente a apenas **6.5 KB** no Intlayer.

## Por que o vue-i18n é pesado?

### Um compilador AST entregue ao navegador

O `vue-i18n` conta com seu próprio compilador de mensagens. Regras de plural e substituições de variáveis são convertidas em Abstract Syntax Trees diretamente em runtime.

Para contornar esse comportamento, é necessário declarar aliases de empacotamento para `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` e pré-compilar os arquivos com `@intlify/unplugin-vue-i18n`. Muitos projetos ignoram essa etapa.

### Funcionalidades monolíticas

O `vue-i18n` agrega módulos de datas e números, mensagens encadeadas, conectores para a Options API legada (`$t`, `v-t`) e proxies reativos. Mesmo precisando apenas de frases simples em `<script setup>`, o pacote inteiro é incorporado.

### Chaves dinâmicas inviabilizam o tree-shaking

Pelo fato de `"home.hero.title"` ser calculada em tempo de execução, os empacotadores não têm como checar o uso das strings. Textos desnecessários continuam no bundle.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

O [compilador do Intlayer](https://intlayer.org/pt/doc/compiler) rastreia com exatidão as propriedades acessadas e retira o conteúdo não utilizado antes de gerar os arquivos do cliente. Consulte [otimização de bundle](https://intlayer.org/pt/doc/concept/bundle-optimization) para entender melhor.

## Experiência do desenvolvedor

### Pastas separadas vs. co-localização

No `vue-i18n`, as mensagens ficam arquivadas em uma pasta `locales/` distante. O Intlayer reúne as declarações de conteúdo junto aos componentes:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/pt.json"
{
  "hero": {
    "title": "Lance em todos os idiomas"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      pt: "Lance em todos os idiomas",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Ao excluir ou renomear `Hero.vue`, seus arquivos de tradução são removidos ou movidos simultaneamente.

### Sugestão de chaves vs. integridade garantida

`DefineLocaleMessage` oferece autocompletar com base no esquema principal. No entanto, não previne ausência de traduções. Se faltar uma chave em `pt.json`, o TypeScript não acusará erro durante a compilação.

No Intlayer, os dicionários passam por validação rigorosa. Ativar o [`strictMode`](https://intlayer.org/pt/doc/concept/configuration) faz com que qualquer texto pendente resulte em erro de compilação.

### Ferramentas para IDEs e IA

| Recurso                    | `vue-i18n`            | Intlayer                                                                    |
| -------------------------- | --------------------- | --------------------------------------------------------------------------- |
| **Extensão VS Code**       | Terceiros (i18n Ally) | ✅ [Extensão oficial](https://intlayer.org/pt/doc/vs-code-extension)        |
| **Language Server (LSP)**  | ❌ Nenhum             | ✅ [LSP dedicado](https://intlayer.org/pt/doc/lsp)                          |
| **Servidor MCP para IA**   | ❌ Nenhum             | ✅ [Servidor MCP integrado](https://intlayer.org/pt/doc/mcp-server)         |
| **Habilidades de Agente**  | ❌ Nenhuma            | ✅ [Skills autônomas](https://intlayer.org/pt/doc/agent_skills)             |
| **CMS Visual em contexto** | ❌ Nenhum             | ✅ [CMS gratuito & Open Source](https://intlayer.org/pt/doc/concept/editor) |

## Estratégias de tradução

O `vue-i18n` não fornece comandos próprios para tradução. É praxe exportar arquivos para plataformas como Crowdin ou Phrase.

O Intlayer incorpora essas soluções nativamente:

**Preenchimento automático por IA local (`intlayer fill`):**

Traduz textos ausentes utilizando suas chaves de API da OpenAI, Anthropic, Mistral ou Gemini.

**CMS visual auto-hospedável:**

Instale o [CMS Intlayer](https://intlayer.org/pt/doc/concept/cms) para capacitar redatores a alterar conteúdos com gravação direta no Git.

**Licença de código aberto:**

Todas as ferramentas operam sob a licença Apache 2.0.

## Em quais momentos o vue-i18n ainda se justifica?

<AccordionGroup>
<Accordion header="Aplicações consolidadas em Nuxt 2/3">

Se o roteamento tem vínculo profundo com o `@nuxtjs/i18n`, refazer a estrutura pode não valer o custo.

</Accordion>
<Accordion header="Regras específicas de ICU">

Para quem depende de regras complexas de mensagens encadeadas ou formatações avançadas de dados.

</Accordion>
<Accordion header="Pequenos projetos experimentais">

Se o volume do bundle não impacta os objetivos da aplicação.

</Accordion>
</AccordionGroup>

## Como melhorar minha configuração atual do vue-i18n?

O Intlayer oferece pacotes de compatibilidade direta que preservam com precisão as assinaturas de funções do `vue-i18n` e `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`). Você não precisa reescrever templates ou composables para usufruir de uma arquitetura leve e otimizada por compilação.

A instalação se completa em um único comando:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

Essa CLI interativa:

1. Instala o pacote de compatibilidade `@intlayer/vue-i18n` ou `@intlayer/nuxt-i18n`.
2. Configura aliases no Vite ou Nuxt para que suas importações e tags habituais apontem para o Intlayer, permitindo desinstalar o `vue-i18n` do `package.json`.
3. Ativa imediatamente diagnósticos do Language Server (LSP), elimina o parser AST de 24 KB do bundle de cliente e desbloqueia fluxos de tradução com IA local sem necessidade de uma refatoração profunda.

Para instruções passo a passo, explore nossos guias dedicados:

- **Compatibilidade direta:** Mantenha seus templates com a [camada de compatibilidade do `vue-i18n`](https://intlayer.org/pt/doc/compatibility/vue-i18n) ou [`@nuxtjs/i18n`](https://intlayer.org/pt/doc/compatibility/nuxtjs-i18n).
- **Guias de migração passo a passo:** Converta arquivos JSON em dicionários estruturados: [a partir do vue-i18n](https://intlayer.org/pt/doc/migration/vue-i18n) ou [a partir do @nuxtjs/i18n](https://intlayer.org/pt/doc/migration/nuxtjs-i18n).
- **Solução mista:** Preserve o `vue-i18n` em tempo de execução enquanto [adota o Intlayer com vue-i18n](https://intlayer.org/pt/blog/intlayer-with-vue-i18n) para ter tipos estritos e tradução por IA local.

Avalie o peso e a dispersão do seu projeto com o [scanner de SEO para i18n gratuito](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Leituras sugeridas

- [Benchmark Vue & Vite i18n: comparativo completo de performance](https://intlayer.org/pt/doc/benchmark/vue)
- [vue-i18n vs Intlayer: comparação técnica detalhada](https://intlayer.org/pt/blog/vue-i18n-vs-intlayer)
- [O next-intl está obsoleto em 2026?](https://intlayer.org/pt/blog/is-next-intl-outdated)
- [Internacionalização baseada em compilador vs declarativa](https://intlayer.org/pt/blog/compiler-vs-declarative-i18n)
