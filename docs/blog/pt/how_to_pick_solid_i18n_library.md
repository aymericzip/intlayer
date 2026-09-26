---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "Como escolher a biblioteca de i18n certa para Solid em 2026"
description: Um guia de decisão para internacionalização com SolidJS e SolidStart. Quais perguntas responder antes de comparar @solid-primitives/i18n, solid-i18next, Paraglide, Lingui e Intlayer, e o que cada escolha custa em reatividade, tamanho de bundle e tipagem.
keywords:
  - solidjs i18n
  - solid start i18n
  - internacionalização solid
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - comparação de bibliotecas i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Como escolher a biblioteca de i18n certa para Solid

O modelo de reatividade do Solid muda o que uma biblioteca de i18n precisa fazer. Os componentes são executados apenas uma vez, portanto, uma tradução armazenada em uma `const` durante o setup é uma string estática (frozen string), e uma biblioteca que fornece strings em vez de accessors produzirá uma página que troca de idioma em todos os lugares, exceto nos três componentes onde alguém fez isso. Escolher uma biblioteca para Solid envolve tanto a API quanto a garantia de tornar esse erro difícil de cometer.

Este guia lista as perguntas a serem respondidas primeiro e, em seguida, as mapeia para `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` e Intlayer, tanto para Vite + Solid quanto para SolidStart.

![Ecossistema de bibliotecas de i18n para Solid](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Índice

<TOC/>

## Seis perguntas a responder antes de comparar bibliotecas

1. **Vite SPA ou SolidStart?** Em uma SPA, o locale pode viver em um signal e nada mais. No SolidStart, o locale precisa ser resolvido no servidor a partir da URL, e tudo o que um crawler precisa ver sem JavaScript (`<html lang>`, `hreflang`) pertence ao `entry-server.tsx`.
2. **Quão reativa a mudança de locale precisa ser?** Um recarregamento completo da página (full page reload) na troca é aceitável para algumas aplicações. Se não for, os valores da biblioteca devem ser signals ou accessors, e sua leitura deve ser rastreada (tracked), não copiada.
3. **Quem escreve as traduções?** Desenvolvedores, um TMS, uma agência entregando strings ICU ou um pipeline de IA. O `solid-i18next` utiliza o formato do i18next. O `@solid-primitives/i18n` aceita qualquer objeto de dicionário que você definir. Alinhe com o seu fornecedor.
4. **Quantos locales e páginas?** Dois locales e cinco páginas podem enviar tudo no bundle. Dez locales e quarenta rotas não podem, e catálogos lazy somados ao scoping tornam-se o custo principal.
5. **Você precisa de tipos nas chaves?** O `@solid-primitives/i18n` os infere a partir do dicionário de origem. O `solid-i18next` requer declaração manual. Bibliotecas em tempo de compilação os geram automaticamente.
6. **Qual a extensão de recursos necessária?** Gerenciamento de cookies, roteamento com prefixo de locale, redirecionamentos, formatters. A opção mais leve não tem nada disso, o que funciona perfeitamente até deixar de atender às suas necessidades.

Anote as respostas. Tudo o que segue faz referência a elas.

## O panorama geral em uma imagem

O Solid é o ecossistema mais jovem aqui e tem o menor número de opções, distribuídas em três ondas.

![História das bibliotecas de i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dicionários em runtime: solid-i18next">

i18next adaptado para Solid. Namespaces, backends, detectores e uma década de plugins. A opção mais pesada do grupo, com os mesmos custos de `t("a.b")` que no React.

</Accordion>
<Accordion header="Primitivas mínimas (2022): @solid-primitives/i18n">

Um dicionário plano próprio, uma função `translator()` que retorna accessors e tipos inferidos a partir do objeto de origem. Muito leve, sem scoping, sem roteamento e sem formatters. O padrão da comunidade.

</Accordion>
<Accordion header="Compilador e conteúdo colocalizado (2024 a 2026): Paraglide, Intlayer, @lingui/solid">

O Paraglide gera uma função por mensagem. O Intlayer declara conteúdo por componente em arquivos `.content.ts` e retorna nós baseados em signals. A integração do Lingui com o Solid chegou em 2026 e traz sua extração baseada em macros.

</Accordion>
</AccordionGroup>

A [história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md) aborda cada onda em detalhes.

## A decisão mais importante: onde o conteúdo fica e quando ele é carregado

Duas escolhas estruturais explicam a maior parte da diferença de bundle entre as abordagens:

- **Conteúdo centralizado ou com escopo (scoped).** Um dicionário para a aplicação inteira ou uma declaração por componente.
- **Importação estática ou dinâmica.** Tudo na inicialização ou o locale ativo (e idealmente a rota ativa) carregado sob demanda.

O gráfico estima o payload para uma aplicação teórica de 1 a 10 páginas, traduzida em 1 a 10 locales, com cerca de 30 KB de texto por página.

![Vazamento teórico de conteúdo por arquitetura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

O `@solid-primitives/i18n` não resolve nenhum dos eixos por padrão: você utiliza `createResource` para carregar um dicionário por locale, obtendo carregamento dinâmico, e o restante fica sob sua responsabilidade. O `solid-i18next` possui namespaces e backends lazy, mas nada impõe o isolamento, de modo que um componente compartilhado importando `common` o torna uma dependência de todas as rotas. O Paraglide atinge a separação por página através de tree-shaking, embora isso não tenha ocorrido na implementação do [benchmark de Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/solid.md). O Intlayer atinge isso por meio de declarações por componente.

Se a sua resposta para a pergunta 4 foi "muitas páginas", dê mais peso a esta seção do que a qualquer preferência de API. O artigo sobre [i18n por componente vs. centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md) aborda o aspecto de manutenção desse mesmo trade-off.

## Os candidatos

Os tamanhos das bibliotecas foram obtidos no [benchmark de Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/solid.md): provider mais accessor em um componente vazio, após empacotamento (bundling), tree-shaking e minificação, em uma aplicação de 10 páginas e 10 locales. O conteúdo é medido separadamente.

| Biblioteca               | Modelo de conteúdo                          | Reatividade na mudança de locale                      | Segurança de tipos                      | Escopo e lazy loading        | Tamanho da biblioteca                           |
| :----------------------- | :------------------------------------------ | :---------------------------------------------------- | :-------------------------------------- | :--------------------------- | :---------------------------------------------- |
| `@solid-primitives/i18n` | Dicionário plano próprio                    | Signal, accessors retornados pelo translator          | 3/5 — Inferidos do dicionário de origem | Nenhum integrado             | ~0,6 kB                                         |
| `solid-i18next`          | Catálogos e namespaces do i18next           | Store, re-render via provider                         | 2/5 — Declaração manual                 | Namespaces, backends lazy    | ~14,9 kB                                        |
| Paraglide                | Projeto inlang, funções geradas             | Lida por chamada de cookie ou storage                 | 3.5/5 — Gerados                         | Tree-shaking (fora do bench) | Quase zero (devido ao código gerado no projeto) |
| `@lingui/solid`          | Texto fonte no código, catálogos compilados | Baseada em signal                                     | 2/5 — Do compilador                     | Por catálogo                 | ~11,8 kB                                        |
| Intlayer                 | Um `.content.ts` por componente             | Nós baseados em signal, sem re-execução do componente | 5/5 — Gerados, ativos por padrão        | Sim, por componente          | ~4,3 kB                                         |

> Os números são uma captura instantânea das versões do benchmark. O tamanho de `@lingui/solid` vem do benchmark TanStack Start. Execute o teste em sua própria aplicação antes de decidir apenas pelo tamanho.
> Segurança de tipos: 5/5 significa que chaves, parâmetros e cada locale são verificados sem configuração manual, incluindo formatadores de URL e helpers.

O tamanho quase zero da biblioteca Paraglide se deve à sua construção: o runtime é gerado dentro do seu repositório. O Intlayer necessita do `vite-intlayer`, portanto não pode ser executado sem uma etapa de build.

## Combine suas respostas com uma biblioteca

<AccordionGroup>
<Accordion header="Vite SPA, catálogo pequeno, você prefere simplicidade máxima">

`@solid-primitives/i18n`. Um dicionário plano, um `translator()` que retorna accessors e tipos inferidos sem configurações extras. É a escolha certa para uma aplicação pequena, e a leitura do código-fonte leva dez minutos. O que você precisará implementar por conta própria: persistência de locale, roteamento, formatters e divisão por rota (code splitting). Se essa lista crescer, esse é o sinal para migrar.

</Accordion>
<Accordion header="Migrando do React com uma codebase baseada em i18next">

O `solid-i18next` permite reutilizar catálogos, namespaces, backends e detectores existentes. É a opção mais pesada e carrega os mesmos custos do `react-i18next`: declaração manual de tipos, otimizações possíveis mas trabalhosas, e um `t()` que retorna uma string, tornando o bug de tradução estática (frozen translation) fácil de ocorrer. Envolva as leituras em JSX ou em um memo e nunca as armazene durante o setup.

</Accordion>
<Accordion header="SolidStart com rotas prefixadas por locale e SSR">

O locale deve vir da URL no servidor para que ambos os lados coincidam; detectá-lo no cliente é tarde demais. O `@solid-primitives/i18n` e o `solid-i18next` deixam a rota `[[locale]]`, os `matchFilters`, o redirecionamento e as tags do `entry-server.tsx` sob sua responsabilidade. O Paraglide possui um plugin Vite que gerencia o roteamento. O Intlayer fornece middlewares e helpers de rota prontos. Qualquer que seja a sua escolha, insira `<html lang>` e `hreflang` em `entry-server.tsx`; o `@solidjs/meta` se aplica no cliente após a hidratação no SolidStart v2. O [artigo sobre i18n no Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/solid.md) detalha essa configuração.

</Accordion>
<Accordion header="A mudança de locale deve ser instantânea e granular">

Escolha uma biblioteca cujos valores sejam signals ou accessors e cujas leituras sejam rastreadas. Os accessors do `@solid-primitives/i18n` e os nós do Intlayer atualizam apenas os nós do DOM que os leem, sem re-executar o componente. O `solid-i18next` re-renderiza através do provider. O Paraglide lê o locale de cookies ou storage a cada chamada de mensagem em vez de usar um signal, o que funciona, mas realiza mais trabalho por nó do que o necessário.

</Accordion>
<Accordion header="Aplicação grande, muitas rotas, orçamento rigoroso de bundle">

Conteúdo com escopo compilado em tempo de build. O Intlayer entrega apenas o que uma rota renderiza. O Paraglide deve alcançar isso via tree-shaking; verifique em seu setup, pois isso não ocorreu no benchmark. Com o `solid-i18next`, planeje a estratégia de namespaces e lazy-loading desde o primeiro dia e garanta sua aplicação em code reviews.

</Accordion>
<Accordion header="Segurança de tipos (type safety) é inegociável">

O `@solid-primitives/i18n` oferece tipos inferidos gratuitamente, o que é mais do que a maioria das bibliotecas React oferece. Para tipos gerados que funcionam com lazy loading e divisão por rota, Paraglide, `@lingui/solid` e Intlayer geram todos a partir do conteúdo. O artigo sobre [detecção de traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md) compara o que cada um detecta em tempo de build.

</Accordion>
<Accordion header="As traduções serão geradas por IA">

Nesse caso, um dicionário centralizado não tem mais justificativa prática. Conteúdo colocalizado somado a uma CLI que preenche os locales ausentes é o caminho mais direto. O comando `fill` do Intlayer funciona com sua própria chave de API (OpenAI, Anthropic, Mistral, Gemini) e retraduz apenas o que foi alterado.

</Accordion>
</AccordionGroup>

## Onde cada biblioteca deixa a desejar

- **`@solid-primitives/i18n`**: sem lazy loading ou escopo além do que você construir manualmente, sem roteamento, sem manipulação de cookies e sem formatters. Excelente para aplicações pequenas, mas rapidamente insuficiente para projetos de grande porte.
- **`solid-i18next`**: a mais pesada do grupo, tipagem manual, formato próprio de plural e `t()` retorna string, fazendo com que as traduções fiquem estáticas se armazenadas no setup.
- **Paraglide**: arquivos gerados commitados no repositório e regenerados antes de cada push, tree-shaking não surtiu efeito no benchmark de Solid, e o locale é lido do storage a cada chamada em vez de vir de um signal.
- **`@lingui/solid`**: novidade em 2026, com pouco histórico em produção até o momento. Herda a etapa de build `extract` / `compile` do Lingui e suas diversas sintaxes concorrentes.
- **Intlayer**: plugin de build obrigatório, ecossistema menor, suporte parcial a ICU e conteúdo distribuído pela codebase por design, exigindo ferramentas para exportar um único JSON para tradutores externos.

## Como cada opção se parece no código

O mesmo componente, um resumo de carrinho com título e plural, escrito com cada uma das opções. Observe onde a tradução é lida: dentro do JSX ela é rastreada, no corpo do setup ela se torna uma string estática.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="Inglês">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export type Dict = typeof en;
```

  </Tab>
  <Tab value="fr" label="Francês">

```ts fileName="src/i18n/fr.ts"
import type { Dict } from "./en";

export const fr: Dict = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="Espanhol">

```ts fileName="src/i18n/es.ts"
import type { Dict } from "./en";

export const es: Dict = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import { createSignal } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Locale = "en" | "fr" | "es";

const dictionaries = {
  en: i18n.flatten(en),
  fr: i18n.flatten(fr),
  es: i18n.flatten(es),
};

export const [locale, setLocale] = createSignal<Locale>("en");
export const dictionary = () => dictionaries[locale()];
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

As chaves são tipadas a partir do objeto em inglês sem necessidade de geração de código (codegen). Não há regras de plural, lazy loading ou roteamento integrados; cada um deve ser implementado por você.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="Inglês">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Francês">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Espanhol">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Catálogos, namespaces e plugins do i18next mantidos como estão. Como `t` retorna uma string, executar `const title = t("cart:title")` no setup congela o valor; mantenha a chamada dentro do JSX.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Cada mensagem é uma função tipada e gerada automaticamente. O locale é lido de cookies ou storage a cada chamada em vez de vir de um signal, portanto a reatividade na troca de idioma precisa ser configurada manualmente.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      pt: "Seu carrinho",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        pt: "{{count}} item",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        pt: "{{count}} itens",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Todos os locales em um único arquivo ao lado do componente. `useIntlayer` retorna nós baseados em signals, de modo que uma alteração de locale atualiza apenas os nós do DOM que os leem. `{content.title}` no JSX é rastreado; `content.title.value` no corpo do setup não é.

  </Tab>
</Tabs>

Em uma base de código i18next existente, o [adaptador de compatibilidade do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md) cria aliases do pacote no nível do bundler para que catálogos e `t()` continuem funcionando enquanto o Intlayer fornece o conteúdo, e o [guia de migração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) cobre os detalhes restantes.

## Antes de tomar sua decisão

Uma tabela de recursos mostra o que a biblioteca faz hoje. Estes pontos indicam como será a experiência de mantê-la no longo prazo.

**Verifique a atividade do repositório.**

Commits, tempo de resposta a issues e se a última versão secundária foi lançada este ano. Uma boa arquitetura sem mantenedores ativos é uma migração futura garantida.

**Não decida pelo número de downloads no npm.**

A biblioteca mais instalada costuma ser a que foi lançada primeiro, não necessariamente a mais adequada para uma base de código Solid em 2026. Downloads medem histórico, não adequação técnica.

![Classificação em lista tier de bibliotecas de i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Identifique quem financia o projeto e qual é o modelo de negócio.**

O `i18next` (por trás do `solid-i18next`) é apoiado pela Locize. O `next-intl`, `vue-i18n`, `svelte-i18n` e Lingui são apoiados pela Crowdin. Tolgee, Paraglide (inlang) e Intlayer operam suas próprias plataformas. Empresas cuja receita depende de hospedagem de traduções têm pouco incentivo para tornar a tradução gratuita dentro da sua cadeia de ferramentas (toolchain). O Intlayer é o único do grupo que oferece tradução com IA pela CLI usando sua própria chave de API e um CMS com opção de auto-hospedagem (self-host).

**A solução é pronta para agentes de IA?**

Agentes de IA ainda enfrentam dificuldades com i18n: esquecem locales, inventam chaves e misturam sintaxes de mensagens. A biblioteca fornece [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md) ou um [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md) para que o agente possa listar, preencher e testar o conteúdo? E o carregamento de conteúdo é otimizado por padrão ou exige revisões manuais de namespaces e lazy imports a cada trimestre?

**Segurança de tipos (type safety) nativa.**

Não apenas "pode ser tipada com configurações extras", mas sim "uma chave incorreta gera erro no `tsc` logo após uma instalação padrão". Verifique o comportamento com chaves inexistentes e com locales que tenham traduções faltando.

**Detecção de conteúdo não utilizado.**

Catálogos apenas acumulam conteúdo ao longo do tempo. O build do Intlayer elimina campos não utilizados e registra essas ocorrências (`build.purge`). O Paraglide alcança isso por arquitetura, já que funções de mensagens não chamadas são eliminadas via tree-shaking. As demais opções deixam essa limpeza a seu encargo.

**Experiência do desenvolvedor (DX).**

Tempo de setup até a primeira string traduzida, suporte a [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md) ou [extensão para VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md) que exibe a tradução no hover e navega até a declaração, uma [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para preencher, testar e sincronizar (push), um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) ou extrator que retira as strings fixas dos seus componentes para não gerir cada string chave a chave, além de alternativas para edição sem pull requests por não desenvolvedores ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)).

## Perguntas frequentes

<FAQ>

<Question title="O @solid-primitives/i18n é suficiente para uma aplicação em produção?">

Para aplicações pequenas, sim, sendo a opção mais leve disponível. Ele deixa de ser suficiente quando você precisa de catálogos lazy por rota, roteamento com locales no SolidStart, persistência em cookies ou formatters, pois tudo isso precisará ser desenvolvido por você.

</Question>

<Question title="Por que minha tradução não atualiza quando o locale muda?">

Porque os componentes do Solid são executados apenas uma vez. Uma tradução atribuída a uma `const` no setup é uma string comum, não uma inscrição reativa. Leia-a dentro do JSX, em um effect ou em um memo, ou escolha uma biblioteca cujos valores sejam accessors para evitar esse erro por padrão.

</Question>

<Question title="Preciso de uma biblioteca baseada em compilador?">

Apenas se tamanho de bundle, tipos gerados automaticamente ou verificação de chaves ausentes em tempo de build forem requisitos essenciais. O artigo [i18n baseado em compilador vs. declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md) explica o que os compiladores oferecem e onde podem falhar.

</Question>

<Question title="A escolha da biblioteca afeta o SEO?">

Indiretamente. Mecanismos de busca dependem de roteamento correto, `hreflang`, `<html lang>` e da presença do texto no HTML renderizado pelo servidor, o que no SolidStart envolve o `entry-server.tsx`. Consulte o [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Indo além

- [Benchmark de i18n para Solid: tamanho de bundle, vazamento e tempo de troca de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/solid.md)
- [Solid i18n: por que as traduções congelam na mudança de locale](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/solid.md)
- [Adaptador de compatibilidade direta com i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md) e o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md)
- [A história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)
- [i18n baseado em compilador vs. declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)
- [i18n por componente vs. centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)
- [Como a otimização de bundle funciona em tempo de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)
- [Configurar i18n em uma aplicação Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+solid.md) e em uma [aplicação SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_solid_start.md)
- O mesmo guia para [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_vue_i18n_library.md) e [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_svelte_i18n_library.md)
