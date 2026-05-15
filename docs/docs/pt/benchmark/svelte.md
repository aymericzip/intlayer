---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Melhor solução i18n para Svelte em 2026 - Relatório de Benchmark
description: Compare bibliotecas de internacionalização (i18n) para Svelte como svelte-i18n, Paraglide e Intlayer. Relatório de desempenho detalhado sobre tamanho do bundle, vazamento e reatividade.
keywords:
  - benchmark
  - i18n
  - intl
  - svelte
  - desempenho
  - intlayer
slugs:
  - doc
  - benchmark
  - svelte
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-svelte-template
history:
  - version: 8.7.12
    date: 2026-01-06
    changes: "Inicialização do benchmark"
---

# Bibliotecas i18n para Svelte — Relatório de Benchmark 2026

Esta página é um relatório de benchmark para soluções i18n no Svelte.

## Índice

<Toc/>

## Benchmark Interativo

<I18nBenchmark framework="vite-svelte" vertical/>

## Referência de resultados:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Ver dados completos do benchmark](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md)

Veja o repositório completo do benchmark [aqui](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introdução

As soluções de internacionalização estão entre as dependências mais pesadas em um app Svelte. O principal risco é enviar conteúdo desnecessário: traduções para outras páginas e outros locais no bundle de uma única rota.

À medida que seu app cresce, esse problema pode rapidamente explodir o JavaScript enviado ao cliente e tornar a navegação lenta.

Na prática, para as implementações menos otimizadas, uma página internacionalizada pode acabar sendo várias vezes mais pesada do que a versão sem i18n.

O outro impacto é na experiência do desenvolvedor (DX): como você declara conteúdo, tipos, organização de namespaces, carregamento dinâmico e reatividade quando o local muda.

## TL;DR

- **Intlayer**: A escolha mais eficiente em desempenho (v8.7.12) com o menor footprint.
- **Paraglide**: Forte candidato para tree-shaking, mas possui uma experiência de desenvolvedor mais complexa e overhead de reatividade.
- **svelte-i18n**: Abrangente e padrão para Svelte, mas carrega um peso de bundle muito maior (~7× o Intlayer).

## Teste seu app

Para identificar rapidamente problemas de vazamento de i18n, configurei um scanner gratuito disponível [aqui](https://intlayer.org/i18n-seo-scanner).

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## O problema

Duas alavancas são essenciais para limitar o custo de um app multilíngue:

- Dividir o conteúdo por página / namespace para no carregar dicionários inteiros quando não for necessário.
- Carregar o local correto dinamicamente, apenas quando necessário.

Entendendo as limitações técnicas dessas abordagens:

**Carregamento dinâmico**

Sem carregamento dinâmico, a maioria das soluções mantém as mensagens na memória desde o primeiro render, o que adiciona um overhead significativo para apps com muitas rotas e locais.

Com carregamento dinâmico, você aceita uma troca: menos JS inicial, mas às vezes uma requisição extra ao trocar de idioma.

**Divisão de conteúdo (Splitting)**

Sintaxes construídas em torno de `t('a.b.c')` são muito convenientes, mas frequentemente incentivam a manutenção de grandes objetos JSON em tempo de execução. Esse modelo torna o tree-shaking difícil, a menos que a biblioteca ofereça uma estratégia real de divisão por página.

## Metodologia

Para este benchmark, comparamos as seguintes bibliotecas:

- `Base App` (Sem biblioteca i18n)
- `svelte-intlayer` (v8.7.12)
- `svelte-i18n` (v4.0.1)
- `@inlang/paraglide-js` (v2.17.0)

O framework é `Svelte` com um app multilíngue de **10 páginas** e **10 idiomas**.

Comparamos **quatro estratégias de carregamento**:

| Estratégia                | Sem namespaces (global)                          | Com namespaces (scoped)                                               |
| :------------------------ | :----------------------------------------------- | :-------------------------------------------------------------------- |
| **Carregamento estático** | **Static**: Tudo na memória ao iniciar.          | **Scoped static**: Dividido por namespace; tudo carregado ao iniciar. |
| **Carregamento dinâmico** | **Dynamic**: Carregamento sob demanda por local. | **Scoped dynamic**: Carregamento granular por namespace e local.      |

## Resumo das estratégias

- **Static**: Simples; sem latência de rede após o carregamento inicial. Desvantagem: grande tamanho de bundle.
- **Dynamic**: Reduz o peso inicial (lazy-loading). Ideal quando você tem muitos locais.
- **Scoped static**: Mantém o código organizado (separação lógica) sem requisições de rede extras complexas.
- **Scoped dynamic**: Melhor abordagem para _code splitting_ e desempenho. Minimiza a memória carregando apenas o que a view atual e o local ativo precisam.

## Resultados em detalhes

### 1 — Soluções a evitar

> Nenhuma solução clara a evitar no ecossistema Svelte.

### 2 — Soluções aceitáveis

**(Paraglide)** (`@inlang/paraglide-js@2.17.0`):

O `Paraglide` oferece uma abordagem inovadora e bem pensada. No contexto de um app Vite + Svelte, o tree-shaking que a empresa anuncia funcionou conforme o esperado, o que é excelente.
Mas no caso do React + TanStack Start, o tree-shaking não funcionou como esperado, o mesmo para o Next.js. Dito isso, o uso do Paraglide em um projeto Svelte e TanStack Start valeria uma dupla verificação.
O fluxo de trabalho e a DX também são mais complexos do que outras opções.
Pessoalmente, não gosto de ter que regenerar arquivos JS antes de cada push, o que cria um risco constante de conflito de merge através de PRs. A ferramenta também parece mais focada no Vite do que no Next.js.
Finalmente, em comparação com outras soluções, o Paraglide não usa um store (ex: Svelte store) para recuperar o local atual para renderizar o conteúdo. Para cada nó analisado, ele solicitará o local do localStorage / cookie etc. Isso leva à execução de lógica desnecessária que impacta a reatividade do componente.

> Nota sobre o paraglide: a solução injeta código em sua base de código para importações; como resultado, a métrica 'lib size' no relatório de benchmark é quase 0. A geração de código é algo bom, porque a função utilizada incluirá apenas a lógica necessária (prefixo em todos os lugares vs sem prefixo, cookie vs armazenamento, etc.). Em comparação, o Intlayer realiza essa filtragem via injeções de variáveis de ambiente durante o build para forçar o bundler a fazer tree-shaking do conteúdo dependendo da lógica. Graças a isso, o paraglide e o intlayer acabam sendo soluções de 6 a 10 vezes mais leves que o i18next ou o next-intl.

**(svelte-i18n)** (`svelte-i18n@3.4.0`):

Esta solução atende a todas as necessidades de i18n em um projeto Svelte. Mas, como é o caso do i18next ou de outras grandes soluções de i18n, é um pouco pesada (~15.9kb, o que é cerca de 7× o `svelte-intlayer`).

### 3 — Recomendações

**(Intlayer)** (`svelte-intlayer@8.7.12`):

Eu não julgarei pessoalmente o `svelte-intlayer` por uma questão de objetividade, já que é minha própria solução.

### Nota pessoal

Esta nota é pessoal e não afeta os resultados do benchmark. Ainda assim, no mundo do i18n, você costuma ver consenso em torno de um padrão como `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` para o conteúdo traduzido.

Em apps Svelte, injetar uma função como um `Slot` é, na minha opinião, um antipadrão. Também adiciona complexidade evitável e overhead de execução de JavaScript (mesmo que seja quase imperceptível).
