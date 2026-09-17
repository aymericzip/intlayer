---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Como escolher a biblioteca de i18n certa para Svelte em 2026"
description: Um guia de decisão para internacionalização com Svelte e SvelteKit. Quais perguntas responder antes de comparar svelte-i18n, Paraglide, typesafe-i18n, wuchale e Intlayer, e o que cada escolha custa em tamanho de bundle, tipagem e segurança em SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - internacionalização svelte
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - comparação de bibliotecas i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Como escolher a biblioteca de i18n certa para Svelte

O Svelte não inclui nada nativo para i18n. Nenhum `$t`, nenhuma primitiva de locale, nenhum formato de mensagem. Todas as opções são de terceiros, e o ecossistema Svelte é onde o i18n em tempo de compilação foi mais longe, portanto os candidatos diferem mais entre si do que no React ou no Vue.

Este guia lista as perguntas a serem respondidas primeiro e, em seguida, mapeia as respostas para `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` e Intlayer, tanto para Vite + Svelte quanto para SvelteKit.

![Ecossistema de bibliotecas de i18n para Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Índice

<TOC/>

## Seis perguntas a responder antes de comparar bibliotecas

1. **Vite SPA ou SvelteKit?** Em uma SPA, uma store no nível de módulo é correta: uma aba, um usuário, um locale. No SvelteKit, esse mesmo singleton é compartilhado entre requisições concorrentes no servidor, e a requisição B é renderizada no idioma da requisição A. A biblioteca fornece um formato por requisição (context, `locals`) ou deixa essa responsabilidade para você.
2. **Quem escreve as traduções?** Desenvolvedores, um TMS, uma agência entregando strings ICU ou um pipeline de IA. O `svelte-i18n` suporta ICU. O Paraglide e o `typesafe-i18n` usam sintaxe própria. Alinhe com o seu fornecedor.
3. **Quantos locales e páginas?** Dois locales e cinco páginas podem enviar tudo no bundle. Dez locales e quarenta rotas não podem, e a diferença entre catálogos em runtime e mensagens compiladas se torna o custo principal.
4. **Você precisa de tipos nas chaves?** `$_("cart.totl")` é uma falha em runtime no `svelte-i18n`. Bibliotecas em tempo de compilação transformam isso em um erro de tipo por construção.
5. **Stores do Svelte 4 ou runes do Svelte 5?** Runes mudam a sintaxe do estado do locale, não o problema de compartilhamento. Mas `$state` em um arquivo `.ts` compila para uma variável simples, então o runtime da biblioteca precisa suportar runes se você estiver no Svelte 5.
6. **Você pode conviver com arquivos gerados no repositório?** Tanto o Paraglide quanto o `typesafe-i18n` geram código JavaScript ou TypeScript na sua árvore de código-fonte. Algumas equipes não veem problema nisso, outras enfrentam conflitos de merge em cada branch paralela.

Anote as respostas. Tudo o que segue faz referência a elas.

## O panorama geral em uma imagem

O i18n no Svelte chegou mais tarde do que no React ou Vue e saltou direto para as ondas de tempo de compilação.

![História das bibliotecas de i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dicionários em runtime (2019 a 2020): svelte-i18n, sveltekit-i18n">

Catálogos JSON, ICU analisado no navegador via `intl-messageformat`, locale em stores no nível de módulo (`$locale`, `$_`). Mais adotado, bem documentado, mas a configuração de SSR fica por sua conta.

</Accordion>
<Accordion header="Tipos gerados (2020 a 2022): typesafe-i18n">

Um gerador monitora seus catálogos e emite accessors tipados (`$LL.cart.total()`). Modelo sólido, arquivos gerados no repositório, e o repositório não teve muitas atualizações recentemente.

</Accordion>
<Accordion header="Compilador e conteúdo colocalizado (2022 a 2026): Paraglide, wuchale, Intlayer">

O Paraglide compila cada mensagem para uma função exportada, permitindo que o bundler faça tree-shaking do que uma rota nunca chama. O `wuchale` extrai strings do markup durante o build. O Intlayer declara conteúdo por componente e gera tipos e dicionários por componente.

</Accordion>
</AccordionGroup>

A [história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md) aborda cada onda em detalhes.

## A decisão que mais importa: onde o conteúdo fica e quando ele é carregado

Duas escolhas estruturais explicam a maior parte da diferença de tamanho de bundle entre as configurações:

- **Conteúdo centralizado ou com escopo.** Um único `locales/en.json` para a aplicação inteira, ou uma declaração por componente.
- **Importação estática ou dinâmica.** Carregar tudo na inicialização, ou buscar o locale ativo (e idealmente a rota ativa) sob demanda.

O gráfico estima o payload para uma aplicação teórica de 1 a 10 páginas, traduzida para 1 a 10 locales, com cerca de 30 KB de texto por página.

![Vazamento teórico de conteúdo por arquitetura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

O `svelte-i18n` fica no canto superior esquerdo por padrão: `register("fr", () => import("./fr.json"))` oferece carregamento dinâmico por locale, mas um catálogo de locale é um único objeto e carregá-lo carrega os textos de todas as páginas. O Paraglide é o caso interessante: como cada mensagem é sua própria exportação, o tree-shaking resolve o eixo das páginas automaticamente, e o [benchmark do Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/svelte.md) confirma que ele funciona conforme anunciado no Vite + Svelte (ao contrário dos benchmarks de React e Next.js). O Intlayer atinge o mesmo resultado por meio de declarações por componente.

Se a sua resposta para a pergunta 3 foi "muitas páginas", dê mais peso a esta seção do que a qualquer preferência de API. O post sobre [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md) aborda o lado da manutenção desse mesmo trade-off.

## Os candidatos

Os tamanhos das bibliotecas são do [benchmark do Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/svelte.md): store mais accessor em um componente vazio, após bundling, tree-shaking e minificação, em uma aplicação de 10 páginas e 10 locales. O conteúdo é medido separadamente.

| Biblioteca      | Onde as mensagens ficam              | Estado do locale                           | Tipagem nas chaves | Formato de mensagem | Divisão por rota (splitting) | Tamanho da biblioteca |
| :-------------- | :----------------------------------- | :----------------------------------------- | :----------------- | :------------------ | :--------------------------- | :-------------------- |
| `svelte-i18n`   | Catálogos JSON por locale            | Store do Svelte no nível de módulo         | União manual       | ICU                 | Não                          | ~16.6 kB              |
| `typesafe-i18n` | Módulos TS gerados                   | Adaptador de store                         | Gerada             | Próprio             | Parcial                      | Pequeno               |
| Paraglide       | Projeto inlang, compilado em funções | Lido por chamada de cookie, URL ou storage | Gerada             | Próprio             | Sim, via tree-shaking        | Quase zero            |
| `wuchale`       | Extraído do markup no build          | Store                                      | N/A (sem chaves)   | Próprio             | Sim                          | Pequeno               |
| Intlayer        | `.content.ts` junto ao componente    | Context mais store, compatível com runes   | Gerada, padrão     | Helpers             | Sim, por componente          | Linha de base         |

> Os números representam um panorama das versões do benchmark. Execute-o na sua própria aplicação antes de decidir apenas pelo tamanho.

O tamanho quase zero da biblioteca do Paraglide é por construção: o runtime é gerado dentro do seu repositório. O Intlayer necessita do `vite-intlayer`, portanto não pode rodar sem uma etapa de build.

## Combine suas respostas com uma biblioteca

<AccordionGroup>
<Accordion header="Vite SPA, equipe pequena, poucos locales">

`svelte-i18n`. É a opção mais documentada, `$_` soa natural no markup, e `register` junto com `waitLocale()` cobre o lazy loading por locale. Bloqueie a primeira renderização com `isLoading` ou você verá um flash de chaves brutas. Se a aplicação puder evoluir para um servidor mais tarde, coloque o locale no context do Svelte desde o primeiro dia em vez de depender da store de módulo; não custa nada agora e evita um bug que só aparece em produção.

</Accordion>
<Accordion header="SvelteKit com roteamento de locale e SSR">

O problema do compartilhamento de estado define esta escolha. O `svelte-i18n` funciona no SvelteKit, mas a configuração por requisição (`hooks.server.ts`, `locals`, `load`, depois `setContext`) fica por sua conta e é fácil de errar em detalhes sutis. O Paraglide inclui uma integração com o SvelteKit que gerencia o roteamento e lê o locale a cada chamada, evitando o problema do singleton. O Intlayer define o locale no context a partir dos dados do `load`. O [post sobre i18n no SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/sveltekit.md) explica a escolha entre `[[lang]]` e `reroute`, que você deve fazer antes de escolher a biblioteca.

</Accordion>
<Accordion header="As traduções vêm de um TMS ou de uma agência entregando ICU">

O `svelte-i18n` é nativo para ICU via `intl-messageformat`, integrando-se diretamente com a maioria dos fornecedores. O Paraglide e o `typesafe-i18n` usam sintaxe própria e precisam de conversão. O suporte a ICU do Intlayer é parcial, portanto, se você recebe strings ICU hoje, trate isso como um fator impeditivo.

</Accordion>
<Accordion header="O tamanho do bundle é a principal restrição">

Tempo de compilação. O tree-shaking do Paraglide funciona no Vite + Svelte e o custo da biblioteca é quase zero. Os dicionários por componente do Intlayer oferecem o mesmo resultado sem arquivos gerados no repositório. O `svelte-i18n` inclui o parser ICU mais todo o catálogo e fica em torno de 4,5× o `svelte-intlayer` no benchmark antes de qualquer conteúdo.

</Accordion>
<Accordion header="Segurança de tipos (type safety) é inegociável">

Qualquer opção, exceto uma configuração pura de `svelte-i18n`, onde a única tipagem é uma união escrita manualmente que rapidamente fica defasada do JSON. `typesafe-i18n`, Paraglide e Intlayer geram tipos a partir do conteúdo. Verifique a atividade do repositório do `typesafe-i18n` antes de adotar em sua codebase. O post sobre [como detectar traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md) compara o que cada um detecta em tempo de build.

</Accordion>
<Accordion header="Você não quer arquivos gerados no repositório">

Isso elimina o Paraglide e o `typesafe-i18n`. O `svelte-i18n` e o Intlayer mantêm sua saída em `node_modules` ou em um diretório de build; com o Intlayer, os arquivos `.content.ts` são código-fonte escrito manualmente, enquanto os dicionários e tipos compilados ficam em `.intlayer/` e são ignorados pelo git.

</Accordion>
<Accordion header="As traduções serão produzidas por IA">

Nesse caso, o JSON centralizado não tem mais consumidores que o justifiquem. Conteúdo colocalizado somado a uma CLI que preenche os locales ausentes é o caminho mais curto. O comando `fill` do Intlayer roda com sua própria chave de API (OpenAI, Anthropic, Mistral, Gemini) e retraduz apenas o que mudou. O ecossistema inlang do Paraglide oferece equivalentes hospedados com planos próprios.

</Accordion>
</AccordionGroup>

## Onde cada biblioteca deixa a desejar

- **`svelte-i18n`**: a mais pesada do grupo, sem tipos de chaves, sem divisão por rota, store no nível de módulo que vaza dados entre requisições no SvelteKit a menos que você configure o context manualmente.
- **`typesafe-i18n`**: processo de watcher obrigatório, arquivos gerados no repositório, e um repositório que não recebe atualizações frequentes recentemente.
- **Paraglide**: arquivos gerados commitados no repositório e regenerados antes de cada push, conflitos de merge em branches paralelas, e o locale é lido de cookies ou storage a cada chamada de mensagem em vez de uma store, o que gera processamento extra na mudança de locale.
- **`wuchale`**: ideia interessante de extração, mas ainda em estágio inicial. O benchmark do React encontrou problemas de reatividade que exigiram forçar re-renderizações do provider, e a documentação é reduzida.
- **Intlayer**: plugin de build obrigatório, ecossistema menor, suporte parcial a ICU, e conteúdo distribuído pela codebase por design, de modo que exportar um único JSON para um tradutor requer ferramentas dedicadas.

## Como cada opção fica no código

O mesmo componente, um resumo de carrinho com título e plural, escrito com cada candidato. A parte interessante não é o markup, mas onde o conteúdo fica, como o locale é armazenado e o que o verificador de tipos sabe.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU via `intl-messageformat`, locale em uma store no nível de módulo. `$_` aceita qualquer string; a única tipagem é uma união que você escreve manualmente.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Cada mensagem é uma função gerada e tipada, eliminada por tree-shaking se nunca for chamada. A pasta `paraglide/` é gerada no seu repositório, e o locale é lido a cada chamada em vez de uma store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Accessors tipados gerados por um processo de watcher. O modelo é sólido; os arquivos gerados ficam no repositório e o projeto tem tido pouca atividade recentemente.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Todos os locales em um único arquivo ao lado do componente. O `useIntlayer` retorna uma store legível, portanto `$content` utiliza a auto-inscrição (auto-subscription) que você já conhece, e o locale é mantido em context (seguro para SSR) em vez de um singleton de módulo.

  </Tab>
</Tabs>

Já utiliza o `svelte-i18n`? O [adaptador de compatibilidade `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/svelte-i18n.md) cria um alias para o pacote no nível do bundler, permitindo que `$_`, `$date`, `$number` e suas chaves simples continuem funcionando enquanto o Intlayer entrega o conteúdo.

## Antes de tomar a decisão

Uma tabela de recursos mostra o que uma biblioteca faz hoje. Estes pontos mostram como será a convivência com ela no dia a dia.

**Verifique a atividade do repositório.**

Commits, tempo de resposta em issues e se a última release minor ocorreu este ano. Um design sólido sem mantenedor é uma migração anunciada.

**Não escolha pelo número de downloads no npm.**

A biblioteca mais instalada é a que foi lançada primeiro, não a que melhor se adapta a uma codebase Svelte em 2026. Downloads medem história, não adequação.

![Tier list das bibliotecas de i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Pergunte quem financia o mantenedor e o que eles vendem.**

O `svelte-i18n` é apoiado pelo Crowdin, assim como o `next-intl` e o `vue-i18n`. O `i18next` é apoiado pelo Locize. Tolgee, Paraglide (inlang) e Intlayer operam suas próprias plataformas. Um fornecedor cuja receita vem da hospedagem de traduções tem pouco interesse em tornar a tradução gratuita dentro da sua toolchain. O Intlayer é o único do grupo que oferece tradução com IA via CLI usando sua própria chave de API e um CMS que você pode auto-hospedar (self-host).

**A biblioteca está pronta para agentes de IA?**

Agentes ainda têm dificuldades com i18n: esquecem locales, inventam chaves e misturam sintaxes de mensagens. A biblioteca fornece [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md) ou um [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md) para que o agente possa listar, preencher e testar o conteúdo? E o carregamento de conteúdo é otimizado por padrão, ou alguém precisa revisar namespaces e imports lazy a cada trimestre?

**Segurança de tipos (type safety) pronta para uso.**

Não apenas "pode ser tipado com configuração extra", mas "uma chave incorreta falha no `tsc` em uma instalação limpa". Verifique o que acontece com uma chave inexistente e com um locale que está com uma tradução ausente.

**Detecção de conteúdo não utilizado.**

Catálogos só crescem. O build do Intlayer remove campos não utilizados e registra essas ocorrências (`build.purge`). O Paraglide atinge isso por arquitetura, já que uma função de mensagem não chamada é eliminada via tree-shaking. As outras opções deixam essa limpeza por sua conta.

**Experiência do desenvolvedor (Developer Experience).**

Tempo de configuração até a primeira string traduzida, um [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md) ou [extensão para VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md) que mostra a tradução ao passar o mouse e navega até a declaração, uma [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para preenchimento, testes e envio (push), e uma forma para não-desenvolvedores editarem o conteúdo ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)) sem a necessidade de um pull request.

## Perguntas Frequentes

<FAQ>

<Question title="O svelte-i18n ainda é a escolha padrão certa em 2026?">

Para uma SPA com Vite e um catálogo pequeno, sim. É a opção mais documentada e a compatibilidade com ICU é importante para muitas equipes. No SvelteKit ou além de algumas dezenas de páginas, seus custos (sem tipos, sem escopo, store compartilhada) começam a se acumular.

</Question>

<Question title="O tree-shaking do Paraglide realmente funciona?">

No Vite + Svelte, sim, o benchmark confirma. No React com TanStack Start ou Next.js ele não teve efeito no mesmo benchmark. Teste na sua própria stack em vez de confiar cegamente em qualquer um dos resultados.

</Question>

<Question title="O uso de runes muda qual biblioteca devo escolher?">

Runes alteram a sintaxe do seu próprio estado de locale, não o problema de compartilhamento. O que importa é se o runtime da biblioteca é compatível com runes no Svelte 5 e se utiliza context em vez de uma store no nível de módulo. Verifique ambos os pontos.

</Question>

<Question title="A escolha da biblioteca afeta o SEO?">

Indiretamente. Os crawlers se importam com roteamento, `hreflang`, `<html lang>` e se o texto está presente no HTML renderizado pelo servidor. Consulte o [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Indo mais além

- [Benchmark de i18n no Svelte: tamanho de bundle, vazamento e tempos de troca de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/svelte.md)
- [i18n no Svelte: stores, runes e a armadilha do nível de módulo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/svelte.md) e [i18n no SvelteKit: roteamento, SSR e estado compartilhado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/sveltekit.md)
- [Adaptador de compatibilidade drop-in para `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/svelte-i18n.md)
- [A história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)
- [i18n baseado em compilador vs declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)
- [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)
- [Como a otimização de bundle funciona em tempo de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)
- [Configurar i18n em uma aplicação Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+svelte.md) e em uma [aplicação SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_svelte_kit.md)
- O mesmo guia para [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_vue_i18n_library.md) e [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_solid_i18n_library.md)
