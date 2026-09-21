---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Como escolher a biblioteca de i18n certa para Vue em 2026"
description: Um guia de decisão para internacionalização em Vue e Nuxt. Quais perguntas responder antes de comparar vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide e Intlayer, e o que cada escolha custa em bundle size, tipagem e SSR payload.
keywords:
  - vue i18n
  - internacionalização vue
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - comparação de bibliotecas i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Como escolher a biblioteca de i18n certa para Vue

"Vue i18n" é tanto um termo genérico quanto o nome da biblioteca que quase todo mundo instala. Isso é conveniente e enganoso ao mesmo tempo: `vue-i18n` é um bom padrão, mas não é a única opção, e as perguntas que deveriam guiar essa escolha (SSR ou não, quantas páginas, quem escreve as traduções) raramente são feitas antes do `npm install`.

Este guia faz essas perguntas primeiro e, em seguida, mapeia as respostas para as bibliotecas mais adequadas, tanto para Vite + Vue puro quanto para Nuxt.

![Ecossistema de bibliotecas Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Índice

<TOC/>

## Seis perguntas a responder antes de comparar bibliotecas

1. **Vite SPA ou Nuxt?** Em uma SPA, o custo do catálogo é um problema de bundle JS. No Nuxt, é também um problema de payload HTML, porque as mensagens são serializadas no estado de SSR e hidratadas. A maioria dos relatos de que "vue-i18n é lento" vem de aplicações Nuxt por esse motivo.
2. **Quem escreve as traduções?** Desenvolvedores, um TMS, uma agência entregando strings ICU ou um pipeline de IA. O `vue-i18n` usa sua própria sintaxe de plural separada por barras verticais (pipe), não ICU. Isso importa se as strings vêm de fora.
3. **Quantos locales e páginas?** Dois locales e cinco páginas podem carregar tudo de uma vez. Dez locales e quarenta rotas não podem, e a estratégia de carregamento se torna o custo principal.
4. **Você precisa de tipagem nas chaves?** `t("cart.totl")` compila no `vue-i18n` a menos que você passe um schema genérico de mensagens, e esse schema entra em conflito com catálogos carregados sob demanda (lazy loading).
5. **O que o conteúdo contém?** Apenas labels de UI, ou markdown, links no meio de frases e blocos específicos por locale. Conteúdo rico é onde o retorno de string simples do `t()` se torna incômodo.
6. **A CSP é uma restrição?** A build padrão do `vue-i18n` compila mensagens no navegador com `new Function`. Builds runtime-only precisam do `@intlify/unplugin-vue-i18n` para pré-compilar em tempo de build.

Anote as respostas. Tudo o que se segue faz referência a elas.

## O panorama geral

O ecossistema Vue tem menos bibliotecas de i18n do que o React, e elas vêm de diferentes ondas arquiteturais.

![História das bibliotecas JavaScript de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dicionários em runtime (2015 a 2019): vue-i18n, @nuxt/i18n">

O `vue-i18n` surgiu em 2015 e tem sido o padrão desde então. O `@nuxt/i18n` o encapsula com roteamento por locale, tags de SEO e lazy loading por locale. As mensagens são compiladas em funções de renderização, em tempo de build se você adicionar o unplugin, ou no navegador caso contrário.

</Accordion>
<Accordion header="Formatos alternativos (2020): fluent-vue">

Os arquivos `.ftl` do Mozilla Fluent trouxeram uma sintaxe de mensagem mais amigável com variantes que compreendem regras gramaticais. Não há tipagem de chaves, e o plugin do Vite carrega todos os locales em todas as páginas.

</Accordion>
<Accordion header="Compiladores e conteúdo colocalizado (2024 a 2026): Paraglide, Intlayer">

O Paraglide gera uma função por mensagem e permite que o bundler faça o tree-shaking do restante. O Intlayer declara o conteúdo por componente em arquivos `.content.ts`, gera tipos e entrega apenas o que uma rota realmente renderiza.

</Accordion>
</AccordionGroup>

A [história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md) aborda cada onda em detalhes.

## A decisão que mais importa: onde o conteúdo fica e quando ele carrega

Duas escolhas estruturais explicam a maior parte da diferença de bundle entre as abordagens:

- **Conteúdo centralizado ou delimitado por escopo (scoped).** Um único `locales/en.json` para o app inteiro, ou uma declaração por componente.
- **Import estático ou dinâmico.** Tudo na inicialização, ou o locale ativo (e idealmente a rota ativa) carregado sob demanda.

O gráfico estima o payload para uma aplicação teórica de 1 a 10 páginas, traduzida em 1 a 10 locales, com cerca de 30 KB de texto por página.

![Vazamento teórico de conteúdo por arquitetura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

O `vue-i18n` suporta o eixo dinâmico: usar `setLocaleMessage` após um `import()` significa que você deixa de enviar nove locales que ninguém lê. O que ele não oferece é o eixo por página. Um catálogo de locale é um objeto único, e carregá-lo carrega os textos de todas as páginas. Em uma SPA, ninguém percebe. No Nuxt, com o `@nuxtjs/i18n` e mais de dez páginas, cada rota carrega as strings de todas as outras rotas duas vezes: no chunk JS e no SSR payload.

O [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/vue.md) mede isso como "vazamento de outras rotas" e "vazamento de outros locales". Se sua resposta para a pergunta 3 foi "muitas páginas", esta seção tem mais peso do que qualquer preferência de API. O artigo sobre [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md) aborda o lado de manutenção desse mesmo trade-off.

## Os candidatos

Os tamanhos das bibliotecas são do [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/vue.md): plugin mais composable em um componente vazio, após bundling, tree-shaking e minificação, em um app de 10 páginas e 10 locales. O conteúdo é medido separadamente.

| Biblioteca     | Modelo de conteúdo                                           | Segurança de tipos                   | Formato de mensagem                 | Divisão por rota       | Tamanho da biblioteca                           |
| :------------- | :----------------------------------------------------------- | :----------------------------------- | :---------------------------------- | :--------------------- | :---------------------------------------------- |
| `vue-i18n`     | Catálogos centrais por locale, blocos `<i18n>` opcionais SFC | 2/5 — Opcional via generic de schema | Próprio (plurais pipe)              | Não                    | ~24.3 kB                                        |
| `@nuxtjs/i18n` | O mesmo que `vue-i18n`, além de roteamento e tags de SEO     | 2/5 — O mesmo                        | O mesmo                             | Não, apenas por locale | ~24.3 kB                                        |
| `fluent-vue`   | Arquivos `.ftl` (Mozilla Fluent)                             | 1/5 — Nenhuma                        | Fluent                              | Não                    | ~29.7 kB                                        |
| Paraglide      | Projeto inlang, funções geradas                              | 3.5/5 — Gerada                       | Próprio                             | Via tree-shaking       | Quase zero (devido ao código gerado no projeto) |
| Intlayer       | Um `.content.ts` por componente                              | 5/5 — Gerada, ativa por padrão       | Intlayer (+ ICU, i18next, vue-i18n) | Sim, por componente    | ~3.9 kB                                         |

> Os números são um retrato nas versões do benchmark. Execute-o em sua própria aplicação antes de decidir apenas pelo tamanho.
> Segurança de tipos: 5/5 significa que chaves, parâmetros e cada locale são verificados sem configuração manual, incluindo formatadores de URL e helpers.

O tamanho quase zero da biblioteca do Paraglide é por construção: o runtime é gerado dentro do seu repositório, o que significa uma etapa de regeneração antes de cada push e conflitos de merge em arquivos gerados. O Intlayer precisa do `vite-intlayer` (ou do módulo Nuxt), portanto não pode rodar sem uma etapa de build.

## Combine suas respostas com uma biblioteca

<AccordionGroup>
<Accordion header="Vite SPA, equipe pequena, poucos locales">

`vue-i18n` no modo Composition (`legacy: false`), com `@intlify/unplugin-vue-i18n` para enviar a build runtime-only. Carregue locales sob demanda com `import()`. Isso atende à maioria das aplicações pequenas e as respostas da comunidade estão em toda parte. Blocos `<i18n>` no SFC colocalizam mensagens com o componente, o que ajuda, mas as ferramentas de extração e TMS ao redor deles são mais limitadas do que para catálogos JSON, então decida com antecedência qual formato a equipe usará.

</Accordion>
<Accordion header="Nuxt com roteamento por locale, sitemap e hreflang">

O `@nuxtjs/i18n` oferece a estratégia de roteamento, as tags `hreflang` e a detecção de locale sem necessidade de código adicional, e isso por si só já o justifica para sites de conteúdo com poucas páginas. Seu limite é o catálogo por locale: passando de dez páginas ou mais, o SSR payload carrega o texto de todas as rotas. Se esse for o seu caso, configure o `vue-i18n` manualmente com mensagens por rota ou migre para conteúdo delimitado por escopo (scoped). O [artigo sobre Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/nuxt.md) detalha a escolha da estratégia de roteamento primeiro.

</Accordion>
<Accordion header="Traduções vêm de um TMS ou agência entregando ICU">

A sintaxe de plural do `vue-i18n` (`"no item | one item | {count} items"`) não é ICU e não é portátil. Os tradutores precisam ser informados sobre isso, e uma exportação de TMS não vai gerá-la. Combine o formato antes que o primeiro catálogo exista ou escolha uma biblioteca cujo formato seja compatível com seu fornecedor. O suporte a ICU do Intlayer é parcial, portanto, se você recebe strings ICU hoje, trate isso também como um ponto decisivo.

</Accordion>
<Accordion header="Aplicação grande, muitas rotas, orçamento restrito de bundle ou SSR payload">

Prefira conteúdo delimitado por escopo (scoped) compilado em tempo de build. O Paraglide atinge isso por meio de tree-shaking, que funciona conforme prometido no Vite. O Intlayer atinge isso por meio de declarações por componente e entrega apenas o que a rota renderiza. Com `vue-i18n`, você pode dividir mensagens por rota manualmente, mas nada força essa estrutura e um componente compartilhado importando um namespace global anula essa separação silenciosamente.

</Accordion>
<Accordion header="Segurança de tipos (type safety) é inegociável">

O `vue-i18n` pode ser tipado passando um schema genérico para `createI18n`. Funciona, mas quebra no momento em que os catálogos são carregados sob demanda, porque o schema descreve mensagens que podem ainda não estar disponíveis. Se você não quiser manter isso manualmente, escolha uma biblioteca cujos tipos são gerados a partir do próprio conteúdo: Paraglide ou Intlayer. O artigo sobre [detecção de traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md) compara o que cada uma captura em tempo de build.

</Accordion>
<Accordion header="O conteúdo vai além de labels de UI">

Páginas em markdown, frases com um `<RouterLink>` no meio, componentes específicos por locale. O `vue-i18n` possui o `<i18n-t>` para interpolação de componentes, que funciona mas é prolixo. Os nós de conteúdo do Intlayer aceitam markdown, HTML e objetos aninhados diretamente, o que se adapta melhor quando a aplicação tem muito conteúdo.

</Accordion>
<Accordion header="As traduções serão produzidas por IA">

Nesse caso, o JSON centralizado não tem mais consumidor que o justifique. Conteúdo colocalizado junto com uma CLI que preenche os locales ausentes é o caminho mais curto. O comando `fill` do Intlayer executa usando sua própria chave de API (OpenAI, Anthropic, Mistral, Gemini) e retraduz apenas o que mudou.

</Accordion>
</AccordionGroup>

## Onde cada biblioteca deixa a desejar

- **`vue-i18n`**: a mais pesada do conjunto, formato de plural próprio, tipos são opcionais e frágeis com lazy loading, sem divisão automática por rota, chaves não utilizadas acumulam silenciosamente. Deixar `legacy: true` em um app Vue 3 mantém a camada de compatibilidade do Vue 2 e perde a tipagem de `useI18n()`.
- **`@nuxtjs/i18n`**: herda todos os pontos acima, e o SSR payload carrega as strings de todas as páginas assim que o projeto passa de uma dúzia de rotas.
- **`fluent-vue`**: excelente sintaxe de mensagem, sem tipagem de chaves, e o plugin do Vite carrega todo o conteúdo em todos os idiomas em todas as páginas. A mais pesada no benchmark.
- **Paraglide**: arquivos gerados commitados no repositório, regeneração antes de cada push, e o locale é lido de cookie ou storage a cada chamada de mensagem em vez de uma store reativa, o que gera processamento extra na troca de locale.
- **Intlayer**: plugin de build obrigatório, ecossistema menor, suporte parcial a ICU, e conteúdo distribuído pela codebase por design, exigindo ferramentas para exportar um JSON único para um tradutor.

## Como cada opção se parece no código

O mesmo componente, um resumo de carrinho com um título e um plural, escrito com cada candidata. A parte interessante não é o template, mas onde o conteúdo fica e o que o `vue-tsc` sabe sobre ele.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Inglês">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="Francês">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="Espanhol">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Plurais separados por pipe são o formato próprio do vue-i18n, não ICU. O `t` aceita qualquer string, a menos que você passe um schema genérico de mensagens para `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="Inglês">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="Francês">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="Espanhol">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

A sintaxe do Fluent lida muito bem com plurais e variantes gramaticais. Os IDs de mensagem são strings sem tipagem, e o plugin do Vite agrupa todos os locales em todas as páginas.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Inglês">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Francês">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Espanhol">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Cada mensagem é uma função gerada e tipada, de modo que uma chave ausente resulta em erro de importação. A pasta `paraglide/` é gerada dentro do seu repositório e regenerada a cada alteração.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      pt: "Seu carrinho",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      pt: plural({ one: "{{count}} item", other: "{{count}} itens" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Todos os locales em um único arquivo ao lado do componente. Os tipos são gerados no build, então `title` tem autocompletion e um erro de digitação falha o `vue-tsc`. `<title />` renderiza um nó que o editor visual pode selecionar; `{{ items(props.count) }}` retorna a string simples.

  </Tab>
</Tabs>

Já está usando `vue-i18n`? O [adaptador de compatibilidade `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/vue-i18n.md) cria um alias do pacote no nível do bundler, permitindo que `useI18n()`, `$t`, plurais pipe e `v-t` continuem funcionando enquanto o Intlayer fornece o conteúdo. O [guia de migração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_vue-i18n_to_intlayer.md) explica como remover o adaptador posteriormente, e há também um [guia específico para Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_nuxtjs_i18n_to_intlayer.md).

## Antes de tomar sua decisão

Uma tabela de funcionalidades mostra o que uma biblioteca faz hoje. Estes pontos mostram como será o dia a dia trabalhando com ela.

**Verifique a atividade do repositório.**

Commits, tempo de resposta em issues e se a última release minor foi lançada este ano. Um design sólido sem mantenedor ativo é uma migração futura garantida.

**Não escolha apenas pelo número de downloads no npm.**

A biblioteca mais instalada é aquela lançada primeiro, não necessariamente a que melhor atende a uma codebase Vue em 2026. Downloads medem histórico, não adequação.

![Tier list de bibliotecas JavaScript de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Pergunte quem financia o mantenedor e o que eles vendem.**

O `vue-i18n` é apoiado pelo Crowdin, assim como o `next-intl` e o `svelte-i18n`. O `i18next` é apoiado pelo Locize. Tolgee, Paraglide (inlang) e Intlayer operam suas próprias plataformas. Um fornecedor cuja receita vem da hospedagem de traduções tem pouco interesse em tornar a tradução gratuita dentro do seu toolchain. O Intlayer é o único do grupo que oferece tradução por IA via CLI com sua própria chave de API e um CMS que você pode auto-hospedar.

**Está pronta para agentes de IA?**

Agentes ainda enfrentam desafios com i18n: esquecem locales, inventam chaves e misturam sintaxes de mensagens. A biblioteca oferece [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md) ou um [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md) para que o agente possa listar, preencher e testar o conteúdo? E o carregamento de conteúdo é otimizado por padrão, ou alguém precisa revisar namespaces e imports dinâmicos a cada trimestre?

**Segurança de tipos pronta para uso (out of the box).**

Não "pode ser tipado com configurações adicionais", mas "uma chave incorreta falha o `tsc` em uma instalação limpa". Verifique o que acontece com uma chave inexistente e com um locale que esteja sem uma tradução.

**Detecção de conteúdo não utilizado.**

Catálogos só crescem. O build do Intlayer remove campos não utilizados e registra essas ocorrências (`build.purge`). O Paraglide atinge isso por arquitetura, já que uma função de mensagem não chamada é eliminada via tree-shaking. As demais bibliotecas deixam essa limpeza por sua conta.

**Experiência de desenvolvimento (Developer Experience).**

Tempo de configuração até a primeira string traduzida, um [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md) ou [extensão do VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md) que mostra a tradução ao passar o mouse e navega até a declaração, uma [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para preencher, testar e enviar (push), um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) ou extrator que retira as strings fixas dos seus componentes para não gerir cada string chave a chave, além de uma forma para não desenvolvedores editarem conteúdo ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)) sem a necessidade de um pull request.

## Perguntas Frequentes

<FAQ>

<Question title="O vue-i18n ainda é o padrão ideal em 2026?">

Para a maioria das aplicações Vue, sim. O ecossistema é o maior, a documentação é completa e os custos são previsíveis: um runtime pesado, um formato de plural personalizado e uma divisão por rota que você mesmo precisa construir e manter.

</Question>

<Question title="Devo usar o @nuxtjs/i18n ou configurar o vue-i18n manualmente no Nuxt?">

Use o módulo, a menos que seu roteamento seja atípico ou sua aplicação tenha pouquíssimas páginas. Fazer a configuração manual significa recriar rotas por locale, middlewares, `hreflang` e o sitemap por conta própria, e esses itens são mais trabalhosos do que parecem.

</Question>

<Question title="Preciso de uma biblioteca baseada em compilador?">

Apenas se tamanho de bundle, SSR payload, tipos gerados ou validação de chaves ausentes em tempo de build forem requisitos reais. O artigo sobre [i18n baseado em compilador vs declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md) explica o que os compiladores oferecem e onde podem falhar.

</Question>

<Question title="A escolha da biblioteca afeta o SEO?">

Indiretamente. Os mecanismos de busca priorizam roteamento, `hreflang`, `<html lang>` e se o texto está presente no HTML renderizado pelo servidor. Consulte o [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Indo além

- [Benchmark Vue i18n: tamanho de bundle, vazamento de conteúdo e tempos de troca de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/vue.md)
- [Vue i18n: como o vue-i18n funciona e seus pontos fracos](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/vue.md) e o [artigo sobre Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer, funcionalidade por funcionalidade](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer.md) e o [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer_benchmark.md)
- [O vue-i18n está desatualizado?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/is_vue-i18n_outdated.md)
- [A história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)
- [i18n baseado em compilador vs declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)
- [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)
- [Configurar i18n em uma aplicação Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vue.md) e em uma [aplicação Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nuxt.md)
- O mesmo guia para [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_svelte_i18n_library.md) e [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_solid_i18n_library.md)
