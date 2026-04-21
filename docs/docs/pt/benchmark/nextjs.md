---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Melhor solução i18n para Next.js em 2026 - Relatório de Benchmark
description: Compare bibliotecas de internacionalização (i18n) para Next.js como next-intl, next-i18next e Intlayer. Relatório detalhado de desempenho sobre tamanho do bundle, vazamento e reatividade.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - desempenho
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Início do benchmark"
---

# Bibliotecas i18n para Next.js — Relatório de Benchmark 2026

Esta página é um relatório de benchmark para soluções i18n no Next.js.

## Índice

<Toc/>

## Benchmark Interativo

<I18nBenchmark framework="nextjs" vertical/>

## Referência de resultados:

<iframe 
  src="https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-nextjs.md

Veja o repositório completo do benchmark [aqui](https://github.com/intlayer-org/benchmark-i18n).

## Introdução

As bibliotecas de internacionalização têm um impacto pesado na sua aplicação. O principal risco é carregar conteúdo para cada página e cada idioma quando o usuário visita apenas uma página.

À medida que sua aplicação cresce, o tamanho do bundle pode crescer exponencialmente, o que pode prejudicar visivelmente o desempenho.

Como exemplo, nos piores casos, uma vez internacionalizada, sua página pode acabar ficando quase 4 vezes maior.

Outro impacto das bibliotecas i18n é o desenvolvimento mais lento. Transformar componentes em conteúdo multilíngue em todos os idiomas consome muito tempo.

Como o problema é difícil, existem muitas soluções — algumas focadas na DX (experiência do desenvolvedor), outras no desempenho ou escalabilidade, e assim por diante.

O Intlayer tenta otimizar em todas essas dimensões.

## Teste sua aplicação

Para trazer à tona esses problemas, construí um scanner gratuito que você pode experimentar [aqui](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## O problema

Existem duas formas principais de limitar o impacto de uma aplicação multilíngue no seu bundle:

- Dividir seu JSON (ou conteúdo) entre arquivos / variáveis / namespaces para que o bundler possa aplicar tree-shaking no conteúdo não utilizado para uma determinada página
- Carregar dinamicamente o conteúdo da sua página apenas no idioma do usuário

Limitações técnicas para essas abordagens:

**Carregamento dinâmico**

Mesmo quando você declara rotas como `[locale]/page.tsx`, com Webpack ou Turbopack, e mesmo que `generateStaticParams` seja definido, o bundler não trata `locale` como uma constante estática. Isso significa que ele pode puxar conteúdo para todos os idiomas em cada página. A principal forma de limitar isso é carregar o conteúdo através de um import dinâmico (ex: `import('./locales/${locale}.json')`).

O que acontece no momento do build é que o Next.js emite um bundle JS por localidade (ex: `./locales_pt_12345.js`). Após o site ser enviado para o cliente, quando a página é executada, o navegador realiza uma requisição HTTP extra para o arquivo JS necessário (ex: `./locales_pt_12345.js`).

> Outra forma de abordar o mesmo problema é usar `fetch()` para carregar o JSON dinamicamente. É assim que o `Tolgee` funciona quando o JSON reside em `/public`, ou o `next-translate`, que depende do `getStaticProps` para carregar o conteúdo. O fluxo é o mesmo: o navegador faz uma requisição HTTP extra para carregar o recurso.

**Divisão de conteúdo (Content splitting)**

Se você usar uma sintaxe como `const t = useTranslation()` + `t('meu-objeto.meu-subobjeto.minha-chave')`, o JSON inteiro geralmente precisa estar no bundle para que a biblioteca possa analisá-lo e resolver a chave. Grande parte desse conteúdo é enviado mesmo quando não é utilizado na página.

Para mitigar isso, algumas bibliotecas pedem que você declare por página quais namespaces carregar — ex: `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

Em contrapartida, o `Paraglide` adiciona um passo extra antes do build para transformar o JSON em símbolos planos como `const en_my_var = () => 'meu valor'`. Em teoria, isso permite o tree-shaking de conteúdo não utilizado na página. Como veremos, esse método ainda tem seus compromissos.

Finalmente, o `Intlayer` aplica uma otimização no momento do build para que `useIntlayer('minha-chave')` seja substituído diretamente pelo conteúdo correspondente.

## Metodologia

Para este benchmark, comparamos as seguintes bibliotecas:

- `Base App` (Sem biblioteca i18n)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

Utilizei a versão `16.2.4` do `Next.js` com o App Router.

Construí uma aplicação multilíngue com **10 páginas** e **10 idiomas**.

Comparei **quatro estratégias de carregamento**:

| Estratégia                | Sem namespaces (global)                               | Com namespaces (escopado)                                             |
| :------------------------ | :---------------------------------------------------- | :-------------------------------------------------------------------- |
| **Carregamento estático** | **Static**: Tudo na memória ao iniciar.               | **Scoped static**: Dividido por namespace; tudo carregado ao iniciar. |
| **Carregamento dinâmico** | **Dynamic**: Carregamento sob demanda por localidade. | **Scoped dynamic**: Carregamento granular por namespace e localidade. |

## Resumo das estratégias

- **Static**: Simples; sem latência de rede após o carregamento inicial. Desvantagem: tamanho grande do bundle.
- **Dynamic**: Reduz o peso inicial (lazy-loading). Ideal quando se tem muitas localidades.
- **Scoped static**: Mantém o código organizado (separação lógica) sem requisitos complexos de rede extras.
- **Scoped dynamic**: Melhor abordagem para _code splitting_ e desempenho. Minimiza a memória carregando apenas o que a visualização atual e a localidade ativa precisam.

### O que eu medi:

Executei a mesma aplicação multilíngue em um navegador real para cada stack e anotei o que realmente aparecia na rede e quanto tempo as coisas levavam. Os tamanhos são relatados **após a compressão web normal**, porque isso é mais próximo do que as pessoas realmente baixam.

- **Tamanho da biblioteca de internacionalização**: Após o bundling, tree-shaking e minificação, o tamanho da biblioteca i18n é o tamanho dos provedores (ex: `NextIntlClientProvider`) + código dos hooks (ex: `useTranslations`) em um componente vazio. Não inclui o carregamento dos arquivos de tradução. Responde a quão cara é a biblioteca antes de seu conteúdo entrar em cena.

- **JavaScript por página**: Para cada rota de benchmark, quanto script o navegador puxa para aquela visita, com média entre as páginas da suíte (e entre localidades onde o relatório as agrupa). Páginas pesadas são páginas lentas.

- **Vazamento de outras localidades (Leakage)**: É o conteúdo da mesma página, mas em outro idioma, que seria carregado por engano na página auditada. Este conteúdo é desnecessário e deve ser evitado (ex: conteúdo da página `/fr/about` no bundle da página `/en/about`).

- **Vazamento de outras rotas**: A mesma ideia para **outras telas** na aplicação: se os textos delas estão presentes quando você abriu apenas uma página (ex: conteúdo da página `/en/about` no bundle da página `/en/contact`). Uma pontuação alta sugere divisão fraca ou bundles excessivamente amplos.

- **Tamanho médio do bundle por componente**: Peças comuns da UI são medidas **uma por uma** em vez de se esconderem dentro de um número gigante da aplicação. Isso mostra se a internacionalização infla silenciosamente os componentes do dia a dia. Por exemplo, se seu componente renderizar novamente, ele carregará todos esses dados da memória. Anexar um JSON gigante a qualquer componente é como conectar um grande depósito de dados não utilizados que diminuirá o desempenho dos seus componentes.

- **Responsividade ao trocar de idioma**: Eu troco o idioma usando o controle da própria aplicação e cronometro quanto tempo leva até que a página tenha mudado claramente — o que um visitante notaria, não um micro-passo de laboratório.

- **Trabalho de renderização após uma mudança de idioma**: Um acompanhamento mais específico: quanto esforço a interface levou para redesenhar para o novo idioma uma vez que a mudança está em andamento. Útil quando o tempo "sentido" e o custo do framework divergem.

- **Tempo de carregamento inicial da página**: Da navegação até o navegador considerar a página totalmente carregada para os cenários que testei. Bom para comparar arranques a frio (cold starts).

- **Tempo de hidratação (Hydration)**: Quando a aplicação o expõe, quanto tempo o cliente gasta transformando o HTML do servidor em algo que você pode realmente clicar. Um traço nas tabelas significa que aquela implementação não forneceu um valor de hidratação confiável neste benchmark.

## Resultados em detalhe

### 1 — Soluções a evitar

Algumas soluções, como `gt-next` ou `lingo.dev`, devem claramente ser evitadas. Elas combinam o aprisionamento tecnológico (vendor lock-in) com a poluição da sua base de código. Apesar de passar muitas horas tentando implementá-las, nunca consegui fazê-las funcionar — nem no TanStack Start nem no Next.js.

Problemas encontrados:

**(General Translation)** (`gt-next@6.16.5`):

- Para uma aplicação de 110kb, o `gt-react` adiciona mais de 440kb extras.
- `Quota Exceeded, please upgrade your plan` logo no primeiro build com a General Translation.
- Traduções não são renderizadas; recebo o erro `Error: <T> used on the client-side outside of <GTProvider>`, o que parece ser um bug na biblioteca.
- Ao implementar o **gt-tanstack-start-react**, também encontrei um [problema](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) com a biblioteca: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, que fazia a aplicação falhar. Após relatar esse problema, o mantenedor corrigiu-o em 24 horas.
- A biblioteca bloqueia a renderização estática das páginas do Next.js.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- Cota de IA excedida, bloqueando a build inteiramente — então você não pode lançar para produção sem pagar.
- O compilador estava perdendo quase 40% do conteúdo traduzido. Tive que reescrever todos os `.map` em blocos de componentes planos para fazer funcionar.
- A CLI deles é instável e costumava resetar o arquivo de configuração sem motivo.
- No build, ele apagava totalmente os JSONs gerados quando um novo conteúdo era adicionado. Como resultado, um punhado de chaves poderia apagar mais de 300 chaves existentes.

### 2 — Soluções experimentais

**(Wuchale)** (`wuchale@0.22.11`):

A ideia por trás do `Wuchale` é interessante, mas ainda não é viável. Encontrei problemas de reatividade e tive que forçar a re-renderização do provedor para fazer a aplicação funcionar. A documentação também é bastante incerta, o que torna a integração mais difícil.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

O `Paraglide` oferece uma abordagem inovadora e bem pensada. Mesmo assim, neste benchmark, o tree-shaking anunciado pela empresa não funcionou para minhas configurações de Next.js ou TanStack Start. O fluxo de trabalho e o DX são mais complexos do que outras opções.
Pessoalmente, não gosto de ter que regenerar arquivos JS antes de cada push, o que cria um risco constante de conflito de merge via PRs. A ferramenta também parece mais focada no Vite do que no Next.js.
Finalmente, em comparação com outras soluções, o Paraglide não usa store (ex: React context) para recuperar a localidade atual para renderizar o conteúdo. Para cada nó analisado, ele solicitará a localidade do localStorage / cookie etc. Isso leva à execução de lógica desnecessária que impacta a reatividade do componente.

### 3 — Soluções aceitáveis

**(Tolgee)** (`tolgee@7.0.0`):

O `Tolgee` resolve muitos dos problemas mencionados anteriormente. Achei mais difícil de adotar do que ferramentas semelhantes. Ele não fornece segurança de tipos (type safety), o que também torna mais difícil encontrar chaves ausentes no momento da compilação. Tive que envolver as funções do Tolgee com as minhas para adicionar a detecção de chaves ausentes.

**(Next Intl)** (`next-intl@4.9.1`):

O `next-intl` é a opção mais badalada e a que os agentes de IA mais recomendam — mas, na minha visão, erradamente. Começar é fácil. Na prática, otimizar para limitar o vazamento é complexo. Combinar carregamento dinâmico + namespaces + tipos TypeScript retarda muito o desenvolvimento. O pacote também é bastante pesado (~13kb para `NextIntlClientProvider` + `useTranslations`, que é mais de 2x o `next-intlayer`). O **next-intl** costumava bloquear a renderização estática das páginas do Next.js. Ele fornece um auxiliar chamado `setRequestLocale()`. Isso parece ter sido parcialmente resolvido para arquivos centralizados como `en.json` / `fr.json`, mas a renderização estática ainda quebra quando o conteúdo é dividido em namespaces como `en/shared.json` / `fr/shared.json` / `es/shared.json`.

**(Next I18next)** (`next-i18next@16.0.5`):

O `next-i18next` é provavelmente a opção mais popular porque foi uma das primeiras soluções de i18n para aplicações JavaScript. Possui muitos plugins da comunidade. Compartilha os mesmos grandes pontos negativos que o `next-intl`. O pacote é especialmente pesado (~18kb para `I18nProvider` + `useTranslation`, cerca de 3x o `next-intlayer`).

Os formatos de mensagem também diferem: o `next-intl` usa ICU MessageFormat, enquanto o `i18next` usa seu próprio formato.

**(Next International)** (`next-international@1.3.1`):

O `next-international` também aborda os problemas acima, mas não difere muito do `next-intl` ou `next-i18next`. Inclui `scopedT()` para traduções específicas de um namespace — mas usá-lo não tem praticamente impacto no tamanho do bundle.

**(Lingui)** (`@lingui/core@5.3.0`):

O `Lingui` é frequentemente elogiado. Pessoalmente, achei o fluxo de trabalho `lingui extract` / `lingui compile` mais complexo que as alternativas, sem uma vantagem clara. Também notei sintaxes inconsistentes que confundem as IAs (ex: `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 — Recomendações

**(Next Translate)** (`next-translate@3.1.2`):

O `next-translate` é minha recomendação principal se você gosta de uma API no estilo `t()`. É elegante via `next-translate-plugin`, carregando namespaces através de `getStaticProps` com um carregador Webpack / Turbopack. É também a opção mais leve aqui (~2.5kb). Para os namespaces, definir os namespaces por página ou rota na configuração é bem pensado e mais fácil de manter do que as principais alternativas como **next-intl** ou **next-i18next**. Na versão `3.1.2`, notei que a renderização estática não funcionava; o Next.js recorria à renderização dinâmica.

**(Intlayer)** (`next-intlayer@8.7.5`):

Não serei eu a julgar pessoalmente o `next-intlayer` por uma questão de objetividade, já que é a minha própria solução.

### Nota pessoal

Esta nota é pessoal e não afeta os resultados do benchmark. No mundo da internacionalização, muitas vezes vemos um consenso em torno do padrão `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

Em aplicações React, injetar uma função como um `ReactNode` é, na minha visão, um antipadrão. Também adiciona uma complexidade evitável e uma sobrecarga de execução de JavaScript (mesmo que quase imperceptível).
