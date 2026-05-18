---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Melhor solução i18n para Vue em 2026 - Relatório de Benchmark
description: Compare bibliotecas de internacionalização (i18n) para Vue como vue-i18n, fluent-vue e Intlayer. Relatório de desempenho detalhado sobre tamanho do bundle, vazamento e reatividade.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - desempenho
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.7.12
    date: 2026-01-06
    changes: "Inicialização do benchmark"
---

# Bibliotecas i18n para Vue — Relatório de Benchmark 2026

Esta página é um relatório de benchmark para soluções i18n no Vue.

## Índice

<Toc/>

## Benchmark Interativo

<I18nBenchmark framework="vite-vue" vertical/>

## Referência de resultados:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Ver dados completos do benchmark](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

Veja o repositório completo do benchmark [aqui](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introdução

As soluções de internacionalização estão entre as dependências mais pesadas em um app Vue. O principal risco é enviar conteúdo desnecessário: traduções para outras páginas e outros locais no bundle de uma única rota.

À medida que seu app cresce, esse problema pode rapidamente explodir o JavaScript enviado ao cliente e tornar a navegação lenta.

Na prática, para as implementações menos otimizadas, uma página internacionalizada pode acabar sendo várias vezes mais pesada do que a versão sem i18n.

O outro impacto é na experiência do desenvolvedor (DX): como você declara conteúdo, tipos, organização de namespaces, carregamento dinâmico e reatividade quando o local muda.

## TL;DR

- **Intlayer**: A solução mais leve (v8.7.12) com escopo (scoping) e carregamento dinâmico integrados.
- **vue-i18n**: O padrão da indústria com um rico ecossistema, mas pode se tornar significativamente mais pesado e difícil de otimizar para code-splitting em aplicações de grande porte.
- **fluent-vue**: Organização de mensagens inovadora, mas carece de segurança de tipos e acaba sendo uma solução extremamente pesada.

## Teste seu app

Para identificar rapidamente problemas de vazamento de i18n, configurei um scanner gratuito disponível [aqui](https://intlayer.org/i18n-seo-scanner).

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## O problema

Duas alavancas são essenciais para limitar o custo de um app multilíngue:

- Dividir o conteúdo por página / namespace para não carregar dicionários inteiros quando não for necessário.
- Carregar o local correto dinamicamente, apenas quando necessário.

Entendendo as limitações técnicas dessas abordagens:

**Carregamento dinâmico**

Sem carregamento dinâmico, a maioria delle soluções mantém as mensagens na memória desde o primeiro render, o que adiciona um overhead significativo para apps com muitas rotas e locais.

Com carregamento dinâmico, você aceita uma troca: menos JS inicial, mas às vezes uma requisição extra ao trocar de idioma.

**Divisão de conteúdo (Splitting)**

Sintaxes construídas em torno de `const { t } = useI18n()` + `t('a.b.c')` são muito convenientes, mas frequentemente incentivam a manutenção de grandes objetos JSON em tempo de execução. Esse modelo torna o tree-shaking difícil, a menos que a biblioteca ofereça uma estratégia real de divisão por página.

## Metodologia

Para este benchmark, comparamos as seguintes bibliotecas:

- `Base App` (Sem biblioteca i18n)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

O framework é `Vue` com um app multilíngue de **10 páginas** e **10 idiomas**.

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

### O que eu medi:

Executei o mesmo app multilíngue em um navegador real para cada stack e anotei o que realmente passou pela rede e quanto tempo as coisas levaram. Os tamanhos são relatados **após a compressão web normal**, pois isso é mais próximo do que as pessoas realmente baixam.

- **Tamanho da biblioteca de internacionalização**: Após bundling, tree-shaking e minificação, o tamanho da biblioteca i18n é o tamanho do código dos providers + composables em um componente vazio. Não inclui o carregamento de arquivos de tradução. Responde o quão "cara" a biblioteca é antes do seu conteúdo entrar em cena.

- **JavaScript por página**: Para cada rota de benchmark, quanto script o navegador puxa para aquela visita, calculado pela média entre as páginas do conjunto (e entre os locais). Páginas pesadas são páginas lentas.

- **Vazamento de outros locais (Leakage)**: É o conteúdo da mesma página, mas em outro idioma, que seria carregado por engano na página auditada. Este conteúdo é desnecessário e deve ser evitado (ex: conteúdo da página `/fr/about` no bundle da página `/en/about`).

- **Vazamento de outras rotas**: A mesma ideia para **outras telas** no app: se os textos delas estão vindo junto quando você abriu apenas uma página (ex: conteúdo da página `/en/about` no bundle da página `/en/contact`). Uma pontuação alta sugere divisão fraca ou bundles excessivamente amplos.

- **Tamanho médio do bundle do componente**: Elementos de UI comuns são medidos **um por um**, em vez de se esconderem dentro de um único número gigante do app. Mostra se a internacionalização infla silenciosamente os componentes do dia a dia. Por exemplo, se o seu componente re-renderiza, ele carregará todos esses dados da memória. Anexar um JSON gigante a qualquer componente é como conectar um grande depósito de dados não utilizados que retardará o desempenho dos seus componentes.

- **Capacidade de resposta à mudança de idioma**: Eu troco o idioma usando o próprio controle do app e cronometro quanto tempo leva até que a página tenha mudado claramente, o que um visitante notaria.

- **Trabalho de renderização após uma mudança de idioma**: Um acompanhamento mais detalhado: quanto esforço a interface levou para redesenhar para o novo idioma assim que a mudança começou. Útil quando o tempo "sentido" e o custo do framework divergem.

- **Tempo inicial de carregamento da página**: Da navegação até o navegador considerar a página totalmente carregada para os cenários que testei. Bom para comparar inicializações a frio.

- **Tempo de hidratação (Hydration)**: O tempo que o cliente gasta transformando o HTML do servidor em uma interface interativa. Um traço nas tabelas significa que aquela implementação não forneceu um número de hidratação confiável neste benchmark.

## Estrelas do GitHub

As estrelas do GitHub são um forte indicador da popularidade de um projeto, da confiança da comunidade e da relevância a longo prazo. Embora não sejam uma medida direta da qualidade técnica, elas refletem quantos desenvolvedores consideram o projeto útil, acompanham seu progresso e têm probabilidade de adotá-lo. Para estimar o valor de um projeto, as estrelas ajudam a comparar a tração entre as alternativas e fornecem insights sobre o crescimento do ecossistema.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Cfluent-vue%2Ffluent-vue%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&fluent-vue/fluent-vue&aymericzip/intlayer)

## Resultados em detalhes

### 1 — Soluções a evitar

> Nenhuma solução clara a evitar no ecossistema Vue.

### 2 — Soluções aceitáveis

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** é sem contestação a biblioteca i18n mais usada para Vue, possui muitos recursos e um ecossistema enorme. Mas, nos bastidores, a solução é bastante pesada. Mesmo que o vue-i18n integre lazy loading para mensagens, falta um recurso de escopo (scoping). No caso de um app Vue SPA clássico, não há problema, mas para um app Nuxt, usando @nuxt/i18n, isso leva à inclusão das mensagens de todas as páginas em uma única. Para um app Nuxt grande com mais de 10 páginas, isso pode se tornar realmente problemático.

O pacote é muito pesado (~24.3kb, o que é cerca de 9× o `vue-intlayer`).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** oferece uma tentativa de inovação através do formato .ftl. A organização das mensagens é ótima, mais fácil de começar. Mas na prática, a falta de segurança de tipos aumenta o risco de erro e pode rapidamente se tornar demorada para debugar. Além disso, essa solução carrega as mensagens usando um plugin vite que força o carregamento de todo o conteúdo em todos os idiomas em cada página. Adicionalmente, é uma solução extremamente pesada (~92.7kb, o que é cerca de 34× o `vue-intlayer`).

### 3 — Recomendações

**(Intlayer)** (`vue-intlayer@8.7.12`):

Eu não julgarei pessoalmente o `vue-intlayer` por uma questão de objetividade, já que é minha própria solução.
