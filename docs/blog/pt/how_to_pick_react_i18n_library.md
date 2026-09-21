---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Como escolher a biblioteca de i18n certa para React em 2026"
description: Um guia de decisão para internacionalização em React. Quais perguntas responder antes de comparar react-i18next, react-intl, Lingui, use-intl, Paraglide e Intlayer, e o que cada escolha custa em tamanho de bundle, tipagem e manutenção.
keywords:
  - react i18n
  - react internationalization
  - internacionalização react
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - comparação de bibliotecas i18n
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Como escolher a biblioteca de i18n certa para React

O React não inclui nenhuma primitiva de i18n. A biblioteca que você escolhe no primeiro dia decide como as traduções são armazenadas, como elas chegam ao bundle e quanto trabalho continuará sendo seu nos próximos anos. A maioria das equipes escolhe pela popularidade e depois descobre os trade-offs quando atinge 2.000 chaves.

Este guia segue o caminho inverso: responda a algumas perguntas sobre o seu projeto primeiro e, em seguida, mapeie as respostas para as bibliotecas mais adequadas. O foco aqui é o React puro (Vite, React Router, TanStack Start). O Next.js tem suas próprias restrições, abordadas na [comparação para Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md).

![Ecossistema de bibliotecas de i18n para React](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Índice

<TOC/>

## Seis perguntas a responder antes de comparar bibliotecas

Uma tabela de recursos é inútil sem saber quais linhas importam para você. Analise estes pontos primeiro.

1. **Como a aplicação é renderizada?** Apenas SPA, SSR com hidratação ou React Server Components. Hooks baseados em context funcionam em qualquer lugar em uma SPA. Com RSC, um hook força `"use client"` em todos os componentes que renderizam texto, portanto você também precisará de uma API no lado do servidor.
2. **Quem escreve as traduções?** Desenvolvedores, uma equipe interna usando um TMS, uma agência entregando arquivos ICU ou um pipeline de IA. Isso dita o formato do catálogo mais do que qualquer detalhe de API.
3. **Quantos locales e páginas?** Dois locales e cinco páginas podem se dar ao luxo de enviar tudo. Dez locales e cinquenta rotas não podem, e a estratégia de carregamento se torna o custo principal.
4. **Você precisa de tipos nas chaves?** Um erro de digitação em `t("checkout.totl")` compila em qualquer biblioteca baseada em chaves, a menos que você mesmo configure os tipos. Decida se isso é aceitável.
5. **O que a string contém?** Texto simples, plurais ou frases com um `<Link>` no meio. Conteúdo rico é onde a maioria das APIs se torna complicada.
6. **Quanto tempo o projeto vai durar?** Um protótipo de três meses e um produto de cinco anos não precisam da mesma quantidade de build tooling.

Anote as respostas. Tudo o que segue faz referência a elas.

## O panorama geral em uma imagem

Quinze anos de JavaScript i18n cabem em quatro ondas arquiteturais, e as bibliotecas React que você vai comparar vêm de ondas diferentes.

![História das bibliotecas de i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dicionários em runtime (2011 a 2017): i18next, react-intl">

Catálogos JSON carregados em memória, `t("a.b")` buscado em runtime, ICU ou uma sintaxe personalizada analisada no navegador. Maiores ecossistemas, runtimes mais pesados, tipos são opcionais (opt-in).

</Accordion>
<Accordion header="Macros em tempo de compilação (2018 a 2021): Lingui, typesafe-i18n">

Mensagens extraídas no build, compiladas para catálogos compactos, argumentos tipados. Uma etapa extra de build (`extract`, `compile`) em troca de bundles menores.

</Accordion>
<Accordion header="Server-first (2022 a 2024): use-intl / next-intl">

Projetado em torno de SSR e Server Components. Renderize no servidor, hidrate apenas o que o cliente precisa. Ainda baseado em chaves e centralizado.

</Accordion>
<Accordion header="Compilador e conteúdo colocalizado (2024 a 2026): Paraglide, Intlayer, wuchale">

O conteúdo é compilado em funções com tree-shaking ou dicionários por componente. Tipos são gerados, traduções ausentes quebram o build e a tradução por IA roda via CLI.

</Accordion>
</AccordionGroup>

A [história do JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md) detalha como cada onda respondeu aos problemas da anterior.

## A decisão que mais importa: onde o conteúdo fica e quando ele carrega

Toda biblioteca de i18n para React tem o mesmo formato: uma store, um provider, um hook. O que o provider recebe acaba no bundle do cliente ou no payload de hidratação. Portanto, as duas escolhas estruturais são:

- **Conteúdo centralizado ou com escopo.** Um `en.json` para a aplicação inteira, ou uma declaração por componente (ou por namespace).
- **Import estático ou dinâmico.** Tudo empacotado na inicialização, ou o locale e a rota ativos buscados sob demanda.

O gráfico abaixo estima o payload para uma aplicação teórica de 1 a 10 páginas, traduzida para 1 a 10 locales, com cerca de 30 KB de texto por página.

![Vazamento de conteúdo teórico por arquitetura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Conteúdo centralizado com imports estáticos cresce em ambos os eixos: 10 páginas vezes 10 locales representam 300 KB de texto em cada página. Imports dinâmicos removem o eixo dos locales. O escopo por componente remove o eixo das páginas. Apenas a combinação de ambos mantém o tamanho estável.

Isso não é uma propriedade da biblioteca, é uma propriedade de disciplina. O `react-i18next` pode ter escopo com namespaces e backends lazy. O `use-intl` pode ser dividido por rota. Mas nada impõe isso, e um `<Button>` compartilhado acessando `t("common:cta")` silenciosamente torna o `common` uma dependência de todas as rotas. O [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md) mede isso como "vazamento de outras rotas" e "vazamento de outros locales", e é de onde vem a maior parte da diferença entre as bibliotecas.

Se a sua resposta para a pergunta 3 foi "muitos locales, muitas páginas", dê mais peso a esta seção do que a qualquer preferência de API. O artigo sobre [i18n por componente vs. centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md) aprofunda o lado da manutenção dessa mesma escolha.

## Os candidatos

Os tamanhos das bibliotecas vêm do [benchmark no TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md): provider mais hook em um componente vazio, após bundling, tree-shaking e minificação, 10 páginas e 10 locales. O conteúdo é medido separadamente.

| Biblioteca              | Onda         | Modelo de conteúdo                              | Segurança de tipos                 | Formato de mensagem           | Tamanho da biblioteca                                |
| :---------------------- | :----------- | :---------------------------------------------- | :--------------------------------- | :---------------------------- | :--------------------------------------------------- |
| `react-i18next`         | Runtime      | JSON central, namespaces                        | 2/5 — Opt-in (`CustomTypeOptions`) | i18next (sufixos plurais)     | ~18.4 kB                                             |
| `react-intl` (FormatJS) | Runtime      | JSON central, ICU                               | 2/5 — Opt-in (extração + union)    | ICU                           | ~15.3 kB                                             |
| `use-intl`              | Server-first | JSON central, ICU                               | 2/5 — Opt-in (declaration merging) | ICU                           | ~14.1 kB                                             |
| `@tolgee/react`         | Runtime      | Central, edição em contexto                     | 1/5 — Não                          | ICU                           | ~11.1 kB                                             |
| Lingui                  | Macro        | Texto de origem no código, catálogos compilados | 2/5 — Bom, a partir do compilador  | ICU via macros                | ~11.8 kB                                             |
| Paraglide               | Compilador   | Projeto inlang, funções geradas                 | 3.5/5 — Gerados                    | Próprio                       | Próximo de zero (devido ao código gerado no projeto) |
| Intlayer                | Compilador   | `.content.ts` por componente                    | 5/5 — Gerados, ativo por padrão    | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                              |

> Os números são um snapshot das versões do benchmark e mudam com novos lançamentos. Execute o benchmark na sua própria aplicação antes de decidir apenas pelo tamanho.
> Segurança de tipos: 5/5 significa que chaves, parâmetros e cada locale são verificados sem configuração manual, incluindo formatadores de URL e helpers.

Duas coisas que a tabela não mostra. O `Paraglide` quase não envia biblioteca porque gera código dentro do seu repositório, o que significa uma etapa de regeneração antes de cada commit e conflitos de merge em arquivos gerados. E o `Intlayer` requer um plugin de bundler (`vite-intlayer` ou equivalente), portanto não pode rodar em uma configuração sem build.

## Mapeie suas respostas para uma biblioteca

<AccordionGroup>
<Accordion header="Protótipo, equipe pequena, poucos locales">

Escolha a solução mais simples que funcione e não invista além do necessário. `react-i18next` com um único JSON por locale é adequado, e uma década de respostas no Stack Overflow vai economizar seu tempo. Ignore namespaces até precisar deles. Se o protótipo se transformar em um produto, planeje uma migração para conteúdo com escopo; o [adaptador de compatibilidade do react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-i18next.md) torna isso incremental.

</Accordion>
<Accordion header="As traduções vêm de uma agência ou de um TMS que usa ICU">

O formato do catálogo já está decidido para você. `react-intl` é nativo em ICU e as ferramentas de extração do FormatJS foram criadas para esse pipeline. `use-intl` também lê ICU. `react-i18next` precisa do plugin ICU e de suas próprias chaves de plural caso contrário. O suporte a ICU no Intlayer ainda é parcial, portanto, se você recebe strings em ICU hoje, trate isso como um impedimento até que o suporte seja concluído.

</Accordion>
<Accordion header="Aplicação grande, muitas rotas, orçamento de bundle importa">

Prefira conteúdo com escopo e carregamento dinâmico por padrão, e não por convenção. `Lingui` e `Paraglide` chegam lá através da compilação. O Intlayer alcança isso por meio de declarações por componente, e o compilador envia apenas o que uma rota renderiza. Com `react-i18next` ou `use-intl`, planeje a estratégia de namespaces e lazy-loading no primeiro dia e exija isso em code review, pois as ferramentas não farão isso por você.

</Accordion>
<Accordion header="Type safety é inegociável">

Toda biblioteca baseada em chaves pode ser tipada, mas quase nenhuma vem assim por padrão. Se você não quer manter declaration merging que precisa resistir a namespaces carregados dinamicamente, escolha uma biblioteca onde os tipos são gerados a partir do conteúdo: `Lingui`, `Paraglide` ou Intlayer. O artigo sobre [detecção de traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md) compara o que cada uma detecta em tempo de build.

</Accordion>
<Accordion header="Muito conteúdo rico: markdown, links dentro de frases, componentes por locale">

Nós ricos são onde o `t()` retornando uma string deixa a desejar. `react-i18next` e `Lingui` têm o `<Trans>`, `react-intl` tem tags de rich text, todos eles mais trabalhosos do que o caso de string simples. Os nós de conteúdo do Intlayer aceitam JSX, markdown e objetos aninhados diretamente, o que é a melhor escolha se o seu conteúdo vai além de simples rótulos de UI.

</Accordion>
<Accordion header="As traduções serão produzidas por IA, revisadas por desenvolvedores">

Nesse caso, um JSON centralizado não é mais um requisito, já que não há um TMS para importar arquivos. Conteúdo colocalizado junto com uma CLI que preenche locales ausentes é o caminho mais curto. O comando `fill` do Intlayer roda com sua própria chave de API (OpenAI, Anthropic, Mistral, Gemini) e traduz apenas o que foi alterado. Paraglide e Tolgee oferecem equivalentes hospedados com seus próprios planos.

</Accordion>
<Accordion header="Você pode migrar para o Next.js App Router mais tarde">

O React context não cruza a fronteira entre servidor e cliente. Bibliotecas construídas apenas sobre um hook de cliente (`react-i18next`, `react-intl`) precisarão de uma API de servidor paralela no dia em que você adotar RSC. `use-intl` (como `next-intl`) e Intlayer (como `next-intlayer`) já possuem essa divisão. Leia o [artigo sobre Next.js i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/nextjs.md) antes de padronizar um modelo.

</Accordion>
</AccordionGroup>

## Onde cada biblioteca deixa a desejar

Limites honestos, já que todas as opções têm os seus.

- **`react-i18next`**: a mais pesada do conjunto, formato de plural próprio, tipagem depende da sua própria configuração manual, chaves sem uso acumulam-se silenciosamente.
- **`react-intl`**: DX verbosa (`useIntl()` e depois `formatMessage({ id })`), instância global vinculada a muitos nós.
- **`use-intl`**: simples para começar, difícil de otimizar. Namespaces, carregamento dinâmico e tipagem juntos tornam o desenvolvimento bem mais lento.
- **`Lingui`**: etapa extra de build com `extract` / `compile`, várias sintaxes sobrepostas (`t()`, tagged template, `i18n.t()`, `<Trans>`) que confundem desenvolvedores e assistentes de IA.
- **`Paraglide`**: arquivos gerados no repositório, o tree-shaking não surtiu efeito no benchmark React, e o locale é lido do storage a cada nó em vez de vir de uma store.
- **`Tolgee`**: sem tipos nas chaves, onboarding mais difícil, edição em contexto é o principal diferencial.
- **`Intlayer`**: plugin de build obrigatório, ecossistema menor, suporte parcial a ICU, conteúdo distribuído pela codebase por design, logo exportar um único JSON para um tradutor exige ferramentas.
- **`gt-react`, `lingo.dev`**: não recomendadas no benchmark: erros de cota no build, vendor lock-in e problemas de reatividade que exigiram forçar re-renderizações do provider.

## Como cada opção se parece no código

O mesmo componente, um resumo de carrinho com título e plural, escrito com cada candidata. A parte interessante não é o componente em si, mas onde o conteúdo fica e o que o verificador de tipos sabe sobre ele.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

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
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Plurais são chaves com sufixo resolvidas via `Intl.PluralRules`. `t` é `(key: string) => string` a menos que você declare `CustomTypeOptions`, então `t("titel")` compila sem erros.

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="Inglês">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="Francês">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="Espanhol">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

ICU de ponta a ponta, que é o que a maioria das plataformas de TMS exporta. Tipos em `id` vêm da etapa de extração do `formatjs` mais uma union gerada, não prontos de fábrica.

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="Inglês">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Francês">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Espanhol">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Mesmo formato do `next-intl` sem os bindings do Next.js. Chaves são tipadas depois que você estende `AppConfig` com o tipo das mensagens; dividir namespaces fica por sua conta.

  </Tab>
  <Tab label="Lingui" value="lingui">

  <Tabs group="locale">
  <Tab value="en" label="Inglês">

```po fileName="src/locales/en/messages.po"
msgid "Your cart"
msgstr "Your cart"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# item} other {# items}}"
```

  </Tab>
  <Tab value="fr" label="Francês">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

  </Tab>
  <Tab value="es" label="Espanhol">

```po fileName="src/locales/es/messages.po"
msgid "Your cart"
msgstr "Tu carrito"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# artículo} other {# artículos}}"
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

O idioma de origem fica no componente; outros locales ficam em arquivos `.po` sob IDs em hash após `lingui extract`. Esquecer o `extract` ou `compile` faz o fallback silencioso para o inglês.

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
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Cada mensagem é uma função gerada e tipada, portanto uma chave ausente resulta em erro de import. A pasta `paraglide/` é gerada dentro do seu repositório e regenerada a cada alteração.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Todos os locales em um único arquivo ao lado do componente. Os tipos são gerados no build, de modo que `title` tem autocompletion e um erro de digitação falha no `tsc` sem necessidade de declaration merging. Excluir a pasta exclui as strings.

  </Tab>
</Tabs>

Já usa `react-i18next`, `react-intl` ou `Lingui`? Os adaptadores de compatibilidade ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)) criam aliases para os imports no nível do bundler para que a API existente continue funcionando enquanto você migra componente por componente. O [guia de migração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md) cobre o restante.

## Antes de tomar sua decisão

Uma tabela de funcionalidades mostra o que uma biblioteca faz hoje. Estes pontos mostram como será a convivência com ela no dia a dia.

**Verifique a atividade do repositório.**

Commits, tempo de resposta a issues e se a última versão minor foi lançada este ano. Um bom design sem mantenedores é uma migração à espera de acontecer.

**Não escolha pelo número de downloads no npm.**

A biblioteca mais instalada é a que foi lançada primeiro, não a que melhor se adapta a uma codebase React em 2026. Downloads medem história, não adequação.

![Tier list de bibliotecas de i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Pergunte quem financia o mantenedor e o que eles vendem.**

O `i18next` é apoiado pela Locize. O `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` e Lingui são apoiados pelo Crowdin. Tolgee, Paraglide (inlang) e Intlayer mantêm suas próprias plataformas. Um fornecedor cuja receita depende de traduções hospedadas tem pouco incentivo para tornar a tradução gratuita dentro da sua cadeia de ferramentas. O Intlayer é o único do grupo que oferece tradução por IA via CLI com sua própria chave de API e um CMS que você pode auto-hospedar (self-host).

**Está pronto para agentes de IA?**

Os agentes ainda têm dificuldades com i18n: esquecem locales, inventam chaves e misturam sintaxes de mensagens. A biblioteca oferece [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md) ou um [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md) para que o agente possa listar, preencher e testar conteúdo? E o carregamento de conteúdo é otimizado por padrão, ou alguém precisa revisar namespaces e lazy imports a cada trimestre?

**Type safety pronto para uso.**

Não "pode ser tipado com configuração extra", mas "uma chave errada falha no `tsc` em uma instalação nova". Verifique o que acontece com uma chave inexistente e com um locale que está com uma tradução faltando.

**Detecção de conteúdo não utilizado.**

Os catálogos só aumentam. O build do Intlayer purga campos não utilizados e registra logs (`build.purge`). O Paraglide atinge isso por arquitetura, já que uma função de mensagem não chamada sofre tree-shaking. Todas as outras deixam essa limpeza para você.

**Experiência do desenvolvedor (DX).**

Tempo de configuração até a primeira string traduzida, um [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md) ou [extensão para VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md) que mostra a tradução ao passar o cursor e navega até a declaração, uma [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para preencher, testar e sincronizar (push), um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) ou extrator que retira as strings fixas dos seus componentes para não gerir cada string chave a chave, e uma forma para não-desenvolvedores editarem conteúdo ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)) sem a necessidade de um pull request.

## Perguntas Frequentes

<FAQ>

<Question title="O react-i18next ainda é um bom padrão em 2026?">

Sim para a maioria das equipes. Ele possui o maior ecossistema e o maior número de respostas na internet. Seus custos são reais, mas previsíveis: o runtime mais pesado, formato próprio de plural, além de type safety e escopo que você mesmo precisa configurar e manter.

</Question>

<Question title="Eu preciso de uma biblioteca baseada em compilador?">

Apenas se tamanho de bundle, tipos gerados ou verificações de chaves ausentes em tempo de build estiverem entre seus requisitos. Para uma aplicação pequena com dois locales, uma biblioteca de runtime é mais simples. O artigo sobre [compilador vs. i18n declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md) explica o que os compiladores oferecem e onde podem falhar.

</Question>

<Question title="Posso trocar de biblioteca depois sem reescrever todos os componentes?">

Parcialmente. Bibliotecas baseadas em chaves compartilham formato suficiente para que um adaptador de compatibilidade possa mapear uma API para outra, que é como os adaptadores do Intlayer funcionam. Formatos de mensagem (ICU vs. i18next vs. helpers) não são convertidos automaticamente, então plurais e interpolações são a parte que você precisará ajustar.

</Question>

<Question title="A escolha da biblioteca afeta o SEO?">

Indiretamente. O que os crawlers veem é decidido pelo roteamento, `hreflang`, `<html lang>` e se o texto está no HTML renderizado pelo servidor. Algumas bibliotecas incluem utilitários para isso, a maioria deixa por sua conta. Veja o [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Indo além

- [Benchmark de bibliotecas de i18n: tamanho de bundle, vazamento e tempo de troca de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md) e o [relatório para TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)
- [React i18n: como funciona o modelo de provider e quanto ele custa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/react.md)
- [react-i18next vs react-intl vs Intlayer, recurso por recurso](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md)
- [A história do JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)
- [Compilador vs. i18n declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)
- [i18n por componente vs. centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)
- [Como funciona a otimização de bundle em tempo de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)
- [Configure i18n em uma aplicação Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)
- O mesmo guia para [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_svelte_i18n_library.md) e [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_solid_i18n_library.md)
