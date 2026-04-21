---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Melhor solução i18n para TanStack Start em 2026 - Relatório de Benchmark
description: Compare bibliotecas de internacionalização para TanStack Start como react-i18next, use-intl e Intlayer. Relatório detalhado de desempenho sobre tamanho do bundle, vazamento e reatividade.
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - desempenho
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Início do benchmark"
---

# Bibliotecas i18n para TanStack Start — Relatório de Benchmark 2026

Esta página é um relatório de benchmark para soluções i18n no TanStack Start.

## Índice

<Toc/>

## Benchmark Interativo

<I18nBenchmark framework="tanstack" vertical/>

## Referência de resultados:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md

Veja o repositório completo do benchmark [aqui](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introdução

As soluções de internacionalização estão entre as dependências mais pesadas em uma aplicação React. No TanStack Start, o principal risco é enviar conteúdo desnecessário: traduções para outras páginas e outras localidades no bundle de uma única rota.

À medida que sua aplicação cresce, esse problema pode rapidamente explodir o JavaScript enviado para o cliente e retardar a navegação.

Na prática, para as implementações menos otimizadas, uma página internacionalizada pode acabar ficando várias vezes mais pesada do que a versão sem i18n.

O outro impacto é na experiência do desenvolvedor: como você declara o conteúdo, tipos, organização de namespaces, carregamento dinâmico e reatividade quando a localidade muda.

## Teste sua aplicação

Para detectar rapidamente problemas de vazamento de i18n, configurei um scanner gratuito disponível [aqui](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## O problema

Duas alavancas são essenciais para limitar o custo de uma aplicação multilíngue:

- Dividir o conteúdo por página / namespace para não carregar dicionários inteiros quando não precisar deles
- Carregar a localidade correta dinamicamente, apenas quando necessário

Entendendo as limitações técnicas dessas abordagens:

**Carregamento dinâmico**

Sem o carregamento dinâmico, a maioria das soluções mantém as mensagens na memória desde a primeira renderização, o que adiciona uma sobrecarga significativa para aplicações com muitas rotas e localidades.

Com o carregamento dinâmico, você aceita um compromisso: menos JS inicial, mas às vezes uma requisição extra ao mudar o idioma.

**Divisão de conteúdo (Content splitting)**

As sintaxes construídas em torno de `const t = useTranslation()` + `t('a.b.c')` são muito convenientes, mas muitas vezes incentivam a manutenção de grandes objetos JSON em tempo de execução. Esse modelo torna o tree-shaking difícil, a menos que a biblioteca ofereça uma estratégia real de divisão por página.

## Metodologia

Para este benchmark, comparamos as seguintes bibliotecas:

- `Base App` (Sem biblioteca i18n)
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

O framework é o `TanStack Start` com uma aplicação multilíngue de **10 páginas** e **10 idiomas**.

Comparamos **quatro estratégias de carregamento**:

| Estratégia                | Sem namespaces (global)                               | Com namespaces (escopado)                                             |
| :------------------------ | :---------------------------------------------------- | :-------------------------------------------------------------------- |
| **Carregamento estático** | **Static**: Tudo na memória ao iniciar.               | **Scoped static**: Dividido por namespace; tudo carregado ao iniciar. |
| **Carregamento dinâmico** | **Dynamic**: Carregamento sob demanda por localidade. | **Scoped dynamic**: Carregamento granular por namespace e localidade. |

## Resumo das estratégias

- **Static**: Simples; sem latência de rede após o carregamento inicial. Desvantagem: tamanho grande do bundle.
- **Dynamic**: Reduz o peso inicial (lazy-loading). Ideal quando se tem muitas localidades.
- **Scoped static**: Mantém o código organizado (separação lógica) sem requisitos complexos de rede extras.
- **Scoped dynamic**: Melhor abordagem para _code splitting_ e desempenho. Minimiza a memória carregando apenas o que a visualização atual e a localidade ativa precisam.

## Resultados em detalhe

### 1 — Soluções a evitar

Algumas soluções, como `gt-react` ou `lingo.dev`, são claramente opções das quais se deve afastar. Elas combinam o aprisionamento tecnológico com a poluição da sua base de código. Pior: apesar de passar muitas horas tentando implementá-las, nunca consegui fazê-las funcionar corretamente no TanStack Start (semelhante ao Next.js com `gt-next`).

Problemas encontrados:

**(General Translation)** (`gt-react@latest`):

- Para uma app de cerca de 110kb, o `gt-react` pode adicionar mais de 440kb extras (ordem de grandeza vista na implementação do Next.js no mesmo benchmark).
- `Quota Exceeded, please upgrade your plan` logo no primeiro build com a General Translation.
- Traduções não são renderizadas; recebo o erro `Error: <T> used on the client-side outside of <GTProvider>`, o que parece ser um bug na biblioteca.
- Ao implementar o **gt-tanstack-start-react**, também encontrei um [problema](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) com a biblioteca: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, que fazia a aplicação falhar. Após relatar esse problema, o mantenedor corrigiu-o em 24 horas.
- Essas bibliotecas usam um antipadrão através da função `initializeGT()`, impedindo que o bundle seja limpo corretamente via tree-shaking.

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- Cota de IA excedida (ou dependência de servidor bloqueada), tornando o build / produção arriscado sem pagar.
- O compilador estava perdendo quase 40% do conteúdo traduzido. Tive que reescrever todos os `.map` em blocos de componentes planos para fazer funcionar.
- A CLI deles é instável e costumava resetar o arquivo de configuração sem motivo.
- No build, ele apagava totalmente os JSONs gerados quando havia novo conteúdo adicionado. Como resultado, você poderia terminar com apenas algumas chaves apagando centenas de chaves existentes.
- Encontrei problemas de reatividade com a biblioteca no TanStack Start: na mudança de localidade tive que forçar a re-renderização do provedor para fazer funcionar.

### 2 — Soluções experimentais

**(Wuchale)** (`wuchale@0.22.11`):

A ideia por trás do `Wuchale` é interessante, mas ainda não é uma solução viável. Encontrei problemas de reatividade com a biblioteca e tive que forçar a re-renderização do provedor para fazer a aplicação funcionar no TanStack Start. A documentazione é também bastante incerta, o que torna a integração mais difícil.

### 3 — Soluções aceitáveis

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

O `Paraglide` oferece uma abordagem inovadora e bem pensada. Mesmo assim, neste benchmark, o tree-shaking anunciado pela empresa não funcionou para minha implementação no Next.js ou para o TanStack Start. O fluxo de trabalho e o DX também são mais complexos do que outras opções. Pessoalmente, não sou fã de ter que regenerar arquivos JS antes de cada push, o que cria um risco constante de conflitos de merge para os desenvolvedores via PRs.

**(Tolgee)** (`tolgee@7.0.0`):

O `Tolgee` resolve muitos dos problemas mencionados anteriormente. Achei mais difícil de começar com ele do que com outras ferramentas com abordagens semelhantes. Ele não fornece segurança de tipos, o que também torna muito difícil encontrar chaves ausentes no momento da compilação. Tive que envolver as APIs do Tolgee com as minhas para adicionar a detecção de chaves ausentes.

No TanStack Start também tive problemas de reatividade: na mudança de localidade, tive que forçar o provedor a renderizar novamente e me inscrever em eventos de mudança de localidade para que o carregamento em outro idioma se comportasse corretamente.

**(use-intl)** (`use-intl@4.9.1`):

O `use-intl` é a peça "intl" mais badalada no ecossistema React (mesma família do `next-intl`) e é frequentemente recomendada por agentes de IA, mas, na minha visão, erroneamente em um ambiente focado em desempenho. Começar é bastante simples. Na prática, o processo para otimizar e limitar o vazamento é bastante complexo. Da mesma forma, combinar carregamento dinâmico + namespaces + tipos TypeScript retarda muito o desenvolvimento.

No TanStack Start, você evita as armadilhas específicas do Next.js (`setRequestLocale`, renderização estática), mas o problema principal é o mesmo: sem uma disciplina rigorosa, o bundle rapidamente carrega muitas mensagens e a manutenção de namespaces por rota torna-se penosa.

**(react-i18next)** (`react-i18next@17.0.2`):

O `react-i18next` é provavelmente a opção mais popular porque foi uma das primeiras a atender às necessidades de i18n de aplicações JavaScript. Também possui um amplo conjunto de plugins da comunidade para problemas específicos.

Ainda assim, compartilha os mesmos grandes pontos negativos que as stacks baseadas em `t('a.b.c')`: as otimizações são possíveis, mas consomem muito tempo, e grandes projetos correm o risco de cair em más práticas (namespaces + carregamento dinâmico + tipos).

Os formatos de mensagem também divergem: o `use-intl` usa ICU MessageFormat, enquanto o `i18next` usa seu próprio formato — o que complica o ferramental ou migrações se você os misturar.

**(Lingui)** (`@lingui/core@5.3.0`):

O `Lingui` é frequentemente elogiado. Pessoalmente, achei o fluxo de trabalho em torno de `lingui extract` / `lingui compile` mais complexo do que outras abordagens, sem uma vantagem clara neste benchmark do TanStack Start. Também notei sintaxes inconsistentes que confundem as IAs (ex: `t()`, `t''`, `i18n.t()`, `<Trans>`).

**(react-intl)** (`react-intl@10.1.1`):

O `react-intl` é uma implementação de alto desempenho da equipe do Format.js. O DX permanece prolixo: `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` adiciona complexidade, trabalho extra de JavaScript e vincula a instância global de i18n a muitos nós na árvore React.

### 4 — Recomendações

Este benchmark do TanStack Start não possui um equivalente direto do `next-translate` (plugin Next.js + `getStaticProps`). Para as equipes que realmente desejam uma API `t()` com um ecossistema maduro, o `react-i18next` e o `use-intl` continuam sendo escolhas "razoáveis", mas espere investir muito tempo otimizando para evitar vazamentos.

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`):

Não serei eu a julgar pessoalmente o `react-intlayer` por uma questão de objetividade, já que é a minha própria solução.

### Nota pessoal

Esta nota é pessoal e não afeta os resultados do benchmark. Ainda assim, no mundo da internacionalização, muitas vezes vemos um consenso em torno de um padrão como `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` para conteúdo traduzido.

Em aplicações React, injetar uma função como um `ReactNode` é, na minha visão, um antipadrão. Também adiciona uma complexidade evitabile e uma sobrecarga de execução de JavaScript (mesmo que quase imperceptível).
