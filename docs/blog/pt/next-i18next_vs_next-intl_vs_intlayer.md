---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next vs next-intl vs Intlayer
description: Comparar next-i18next com next-intl e Intlayer para a internacionalização (i18n) de uma aplicação Next.js
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Internacionalização
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Internacionalização (i18n) no Next.js

Vamos analisar as semelhanças e diferenças entre três opções de i18n para Next.js: next-i18next, next-intl e Intlayer.

Este não é um tutorial completo. É uma comparação para ajudar você a escolher.

Focamos no **Next.js 13+ App Router** (com **React Server Components**) e avaliamos:

1. **Arquitetura e organização de conteúdo**
2. **TypeScript e segurança**
3. **Tratamento de traduções ausentes**
4. **Roteamento e middleware**
5. **Desempenho e comportamento de carregamento**
6. **Experiência do desenvolvedor (DX), ferramentas e manutenção**
7. **SEO e escalabilidade para grandes projetos**

> **resumo**: Todos os três podem localizar uma aplicação Next.js. Se você deseja **conteúdo com escopo por componente**, **tipos TypeScript rigorosos**, **verificações de chaves ausentes em tempo de build**, **dicionários otimizados por tree-shaking** e **suporte nativo ao App Router + helpers de SEO**, **Intlayer** é a escolha mais completa e moderna.

> Uma confusão comum feita por desenvolvedores é pensar que `next-intl` é a versão Next.js do `react-intl`. Não é — `next-intl` é mantido por [Amann](https://github.com/amannn), enquanto `react-intl` é mantido por [FormatJS](https://github.com/formatjs/formatjs).

---

## Em resumo

- **next-intl** - Formatação de mensagens leve e direta com suporte sólido ao Next.js. Catálogos centralizados são comuns; a experiência do desenvolvedor (DX) é simples, mas a segurança e a manutenção em larga escala permanecem principalmente sob sua responsabilidade.
- **next-i18next** - i18next com aparência de Next.js. Ecossistema maduro e recursos via plugins (por exemplo, ICU), mas a configuração pode ser verbosa e os catálogos tendem a se centralizar conforme os projetos crescem.
- **Intlayer** - Modelo de conteúdo centrado em componentes para Next.js, **tipagem TS rigorosa**, **verificações em tempo de build**, **tree-shaking**, **middleware e helpers de SEO integrados**, **Editor Visual/CMS** opcional e **traduções assistidas por IA**.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> Os distintivos são atualizados automaticamente. As capturas de tela podem variar ao longo do tempo.

---

## Comparação de Recursos Lado a Lado (focado em Next.js)

| Recurso                                                     | `next-intlayer` (Intlayer)                                                                                                                       | `next-intl`                                                                                                                    | `next-i18next`                                                                                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Traduções Próximas aos Componentes**                      | ✅ Sim, conteúdo localizado junto a cada componente                                                                                              | ❌ Não                                                                                                                         | ❌ Não                                                                                                                         |
| **Integração com TypeScript**                               | ✅ Avançada, tipos estritos gerados automaticamente                                                                                              | ✅ Boa                                                                                                                         | ⚠️ Básica                                                                                                                      |
| **Detecção de Tradução Ausente**                            | ✅ Destaque de erro no TypeScript e erro/aviso em tempo de compilação                                                                            | ⚠️ Retorno em tempo de execução                                                                                                | ⚠️ Retorno em tempo de execução                                                                                                |
| **Conteúdo Rico (JSX/Markdown/componentes)**                | ✅ Suporte direto                                                                                                                                | ❌ Não projetado para nós ricos                                                                                                | ⚠️ Limitado                                                                                                                    |
| **Tradução com IA**                                         | ✅ Sim, suporta múltiplos provedores de IA. Usável com suas próprias chaves de API. Considera o contexto da sua aplicação e o escopo do conteúdo | ❌ Não                                                                                                                         | ❌ Não                                                                                                                         |
| **Editor Visual**                                           | ✅ Sim, Editor Visual local + CMS opcional; pode externalizar conteúdo da base de código; incorporável                                           | ❌ Não / disponível via plataformas externas de localização                                                                    | ❌ Não / disponível via plataformas externas de localização                                                                    |
| **Roteamento Localizado**                                   | ✅ Sim, suporta caminhos localizados nativamente (funciona com Next.js & Vite)                                                                   | ✅ Integrado, App Router suporta segmento `[locale]`                                                                           | ✅ Integrado                                                                                                                   |
| **Geração Dinâmica de Rotas**                               | ✅ Sim                                                                                                                                           | ✅ Sim                                                                                                                         | ✅ Sim                                                                                                                         |
| **Pluralização**                                            | ✅ Padrões baseados em enumeração                                                                                                                | ✅ Bom                                                                                                                         | ✅ Bom                                                                                                                         |
| **Formatação (datas, números, moedas)**                     | ✅ Formatadores otimizados (Intl por trás dos panos)                                                                                             | ✅ Bom (helpers do Intl)                                                                                                       | ✅ Bom (helpers do Intl)                                                                                                       |
| **Formato do Conteúdo**                                     | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml em desenvolvimento)                                                                                  | ✅ .json, .js, .ts                                                                                                             | ⚠️ .json                                                                                                                       |
| **Suporte ICU**                                             | ⚠️ Em desenvolvimento                                                                                                                            | ✅ Sim                                                                                                                         | ⚠️ Via plugin (`i18next-icu`)                                                                                                  |
| **Auxiliares de SEO (hreflang, sitemap)**                   | ✅ Ferramentas integradas: auxiliares para sitemap, robots.txt, metadados                                                                        | ✅ Bom                                                                                                                         | ✅ Bom                                                                                                                         |
| **Ecossistema / Comunidade**                                | ⚠️ Menor, mas crescendo rápido e reativo                                                                                                         | ✅ Bom                                                                                                                         | ✅ Bom                                                                                                                         |
| **Renderização do lado servidor & Componentes de Servidor** | ✅ Sim, otimizado para SSR / Componentes de Servidor React                                                                                       | ⚠️ Suportado a nível de página, mas é necessário passar funções t na árvore de componentes para componentes filhos de servidor | ⚠️ Suportado a nível de página, mas é necessário passar funções t na árvore de componentes para componentes filhos de servidor |
| **Tree-shaking (carregar apenas o conteúdo usado)**         | ✅ Sim, por componente no momento da build via plugins Babel/SWC                                                                                 | ⚠️ Parcial                                                                                                                     | ⚠️ Parcial                                                                                                                     |
| **Carregamento preguiçoso (Lazy loading)**                  | ✅ Sim, por localidade / por dicionário                                                                                                          | ✅ Sim (por rota/por localidade), necessita gerenciamento de namespace                                                         | ✅ Sim (por rota/por localidade), necessita gerenciamento de namespace                                                         |
| **Remover conteúdo não utilizado**                          | ✅ Sim, por dicionário em tempo de build                                                                                                         | ❌ Não, pode ser gerenciado manualmente com gerenciamento de namespace                                                         | ❌ Não, pode ser gerenciado manualmente com gerenciamento de namespace                                                         |
| **Gerenciamento de Grandes Projetos**                       | ✅ Incentiva modularidade, adequado para design-system                                                                                           | ✅ Modular com configuração                                                                                                    | ✅ Modular com configuração                                                                                                    |
| **Testando Traduções Ausentes (CLI/CI)**                    | ✅ CLI: `npx intlayer content test` (auditoria amigável para CI)                                                                                 | ⚠️ Não embutido; a documentação sugere `npx @lingual/i18n-check`                                                               | ⚠️ Não embutido; depende das ferramentas do i18next / runtime `saveMissing`                                                    |

---

## Introdução

Next.js oferece suporte embutido para roteamento internacionalizado (ex.: segmentos de localidade). Mas essa funcionalidade não realiza traduções por si só. Você ainda precisa de uma biblioteca para renderizar conteúdo localizado para seus usuários.

Existem muitas bibliotecas i18n, mas no universo Next.js hoje, três estão ganhando destaque: next-i18next, next-intl e Intlayer.

---

## Arquitetura & escalabilidade

- **next-intl / next-i18next**: Por padrão, utilizam **catálogos centralizados** por localidade (além de **namespaces** no i18next). Funciona bem no início, mas frequentemente se torna uma grande área compartilhada com aumento do acoplamento e da rotatividade de chaves.
- **Intlayer**: Incentiva dicionários **por componente** (ou por funcionalidade) **co-localizados** com o código que atendem. Isso reduz a carga cognitiva, facilita a duplicação/migração de partes da interface e diminui conflitos entre equipes. Conteúdo não utilizado é naturalmente mais fácil de identificar e eliminar.

**Por que isso importa:** Em grandes bases de código ou configurações de sistemas de design, **conteúdo modular** escala melhor do que catálogos monolíticos.

---

## Tamanhos de bundle e dependências

Após a construção da aplicação, o bundle é o JavaScript que o navegador irá carregar para renderizar a página. Portanto, o tamanho do bundle é importante para o desempenho da aplicação.

Dois componentes são importantes no contexto de um bundle de aplicação multilíngue:

- O código da aplicação
- O conteúdo carregado pelo navegador

## Código da Aplicação

A importância do código da aplicação é mínima neste caso. As três soluções são tree-shakable, o que significa que as partes não utilizadas do código não são incluídas no bundle.

Aqui está uma comparação do tamanho do bundle JavaScript carregado pelo navegador para uma aplicação multilíngue com as três soluções.

Se não precisarmos de nenhum formatador na aplicação, a lista de funções exportadas após o tree-shaking será:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (O tamanho do bundle é 180,6 kB -> 78,6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (O tamanho do bundle é 101,3 kB -> 31,4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (O tamanho do bundle é 80,7 kB -> 25,5 kB (gzip))

Estas funções são apenas wrappers em torno do contexto/estado do React, portanto o impacto total da biblioteca i18n no tamanho do bundle é mínimo.

> Intlayer é ligeiramente maior que `next-intl` e `next-i18next` porque inclui mais lógica na função `useIntlayer`. Isso está relacionado à integração com markdown e `intlayer-editor`.

## Conteúdo e Traduções

Esta parte é frequentemente ignorada pelos desenvolvedores, mas vamos considerar o caso de uma aplicação composta por 10 páginas em 10 idiomas. Vamos supor que cada página integre 100% de conteúdo único para simplificar o cálculo (na realidade, muito conteúdo é redundante entre páginas, por exemplo, título da página, cabeçalho, rodapé, etc.).

Um usuário que deseja visitar a página `/fr/about` carregará o conteúdo de uma página em um determinado idioma. Ignorar a otimização do conteúdo significaria carregar 8.200% `((1 + (((10 páginas - 1) × (10 idiomas - 1)))) × 100)` do conteúdo da aplicação desnecessariamente. Você vê o problema? Mesmo que esse conteúdo permaneça texto, e enquanto você provavelmente prefere pensar em otimizar as imagens do seu site, você está enviando conteúdo inútil pelo mundo todo e fazendo os computadores dos usuários processarem isso sem necessidade.

Dois problemas importantes:

- **Divisão por rota:**

  > Se eu estiver na página `/about`, não quero carregar o conteúdo da página `/home`

- **Divisão por localidade:**

  > Se eu estiver na página `/fr/about`, não quero carregar o conteúdo da página `/en/about`

Novamente, as três soluções estão cientes desses problemas e permitem gerenciar essas otimizações. A diferença entre as três soluções é a DX (Experiência do Desenvolvedor).

`next-intl` e `next-i18next` usam uma abordagem centralizada para gerenciar traduções, permitindo dividir o JSON por localidade e por sub-arquivos. No `next-i18next`, chamamos os arquivos JSON de 'namespaces'; o `next-intl` permite declarar mensagens. No `intlayer`, chamamos os arquivos JSON de 'dicionários'.

- No caso do `next-intl`, assim como no `next-i18next`, o conteúdo é carregado no nível da página/layout, e então esse conteúdo é carregado em um provedor de contexto. Isso significa que o desenvolvedor deve gerenciar manualmente os arquivos JSON que serão carregados para cada página.

> Na prática, isso implica que os desenvolvedores frequentemente pulam essa otimização, preferindo carregar todo o conteúdo no provedor de contexto da página para simplificar.

- No caso do `intlayer`, todo o conteúdo é carregado na aplicação. Depois, um plugin (`@intlayer/babel` / `@intlayer/swc`) cuida de otimizar o bundle carregando apenas o conteúdo usado na página. Portanto, o desenvolvedor não precisa gerenciar manualmente os dicionários que serão carregados. Isso permite uma melhor otimização, melhor manutenção e reduz o tempo de desenvolvimento.

À medida que a aplicação cresce (especialmente quando vários desenvolvedores trabalham na aplicação), é comum esquecer de remover conteúdo que não é mais utilizado dos arquivos JSON.

> Note que todos os JSON são carregados em todos os casos (next-intl, next-i18next, intlayer).

É por isso que a abordagem do Intlayer é mais performática: se um componente não é mais utilizado, seu dicionário não é carregado no bundle.

Como a biblioteca lida com os fallbacks também é importante. Vamos considerar que a aplicação está em inglês por padrão, e o usuário visita a página `/fr/about`. Se as traduções estiverem faltando em francês, consideraremos o fallback para o inglês.

No caso do `next-intl` e do `next-i18next`, a biblioteca exige o carregamento do JSON relacionado ao idioma atual, mas também ao idioma de fallback. Assim, considerando que todo o conteúdo foi traduzido, cada página carregará 100% de conteúdo desnecessário. **Em comparação, o `intlayer` processa o fallback no momento da construção do dicionário. Portanto, cada página carregará apenas o conteúdo utilizado.**

Aqui está um exemplo do impacto da otimização do tamanho do bundle usando `intlayer` em uma aplicação vite + react:

| Bundle otimizado                                                                             | Bundle não otimizado                                                                                             |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ![pacote otimizado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png) | ![pacote não otimizado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png) |

---

## TypeScript e segurança

<Columns>
  <Column>

**next-intl**

- Suporte sólido ao TypeScript, mas **as chaves não são estritamente tipadas por padrão**; você precisará manter os padrões de segurança manualmente.

  </Column>
  <Column>

**next-i18next**

- Tipagens básicas para hooks; **tipagem estrita das chaves requer ferramentas/configurações extras**.

  </Column>
  <Column>

**intlayer**

- **Gera tipos estritos** a partir do seu conteúdo. **Autocompletação na IDE** e **erros em tempo de compilação** detectam erros de digitação e chaves ausentes antes do deploy.

  </Column>
</Columns>

**Por que isso importa:** Tipagem forte desloca falhas para a **esquerda** (CI/build) em vez da **direita** (tempo de execução).

---

## Tratamento de traduções ausentes

**next-intl**

- Depende de **fallbacks em tempo de execução** (ex.: mostrar a chave ou o locale padrão). A build não falha.

**next-i18next**

- Depende de **fallbacks em tempo de execução** (ex.: mostrar a chave ou o locale padrão). A build não falha.

**intlayer**

- **Detecção em tempo de build** com **avisos/erros** para locais ou chaves ausentes.

**Por que isso importa:** Detectar lacunas durante a build evita “strings misteriosas” em produção e está alinhado com gates rigorosos de release.

---

## Roteamento, middleware e estratégia de URL

<Columns>
  <Column>

**next-intl**

- Funciona com **roteamento localizado do Next.js** no App Router.

  </Column>
  <Column>

**next-i18next**

- Funciona com **roteamento localizado do Next.js** no App Router.

  </Column>
  <Column>

**intlayer**

- Tudo o que foi mencionado acima, além de **middleware i18n** (detecção de local via headers/cookies) e **helpers** para gerar URLs localizadas e tags `<link rel="alternate" hreflang="…">`.

  </Column>
</Columns>

**Por que isso importa:** Menos camadas de integração personalizadas; **UX consistente** e **SEO limpo** entre os locais.

---

## Alinhamento com Server Components (RSC)

<Columns>
  <Column>

**next-intl**

- Suporta Next.js 13+. Frequentemente requer passar funções t/formatadores através das árvores de componentes em configurações híbridas.

  </Column>
  <Column>

**next-i18next**

- Suporta Next.js 13+. Restrições semelhantes ao passar utilitários de tradução através de fronteiras.

  </Column>
  <Column>

**intlayer**

- Suporta Next.js 13+ e suaviza a **fronteira servidor/cliente** com uma API consistente e provedores orientados para RSC, evitando o transporte de formatadores ou funções t.

  </Column>
</Columns>

**Por que isso importa:** Modelo mental mais limpo e menos casos extremos em árvores híbridas.

---

## DX, ferramentas e manutenção

<Columns>
  <Column>

**next-intl**

- Comumente emparelhado com plataformas externas de localização e fluxos editoriais.

  </Column>
  <Column>

**next-i18next**

- Comumente emparelhado com plataformas externas de localização e fluxos editoriais.

  </Column>
  <Column>

**intlayer**

- Fornece um **Editor Visual gratuito** e um **CMS opcional** (compatível com Git ou externalizado), além de uma **extensão para VSCode** e **traduções assistidas por IA** usando suas próprias chaves de provedor.

  </Column>
</Columns>

**Por que isso importa:** Reduz o custo operacional e encurta o ciclo entre desenvolvedores e autores de conteúdo.

## Integração com plataformas de localização (TMS)

Grandes organizações frequentemente dependem de Sistemas de Gerenciamento de Tradução (TMS) como **Crowdin**, **Phrase**, **Lokalise**, **Localizely** ou **Localazy**.

- **Por que as empresas se importam**
  - **Colaboração e papéis**: Vários atores estão envolvidos: desenvolvedores, gerentes de produto, tradutores, revisores, equipes de marketing.
  - **Escala e eficiência**: localização contínua, revisão em contexto.

- **next-intl / next-i18next**
  - Normalmente usam **catálogos JSON centralizados**, portanto a exportação/importação com TMS é direta.
  - Ecossistemas maduros e exemplos/integrações para as plataformas mencionadas.

- **Intlayer**
  - Incentiva **dicionários descentralizados por componente** e suporta conteúdo em **TypeScript/TSX/JS/JSON/MD**.
  - Isso melhora a modularidade no código, mas pode dificultar a integração plug-and-play com TMS quando a ferramenta espera arquivos JSON centralizados e planos.
  - O Intlayer oferece alternativas: **traduções assistidas por IA** (usando suas próprias chaves de provedor), um **Editor Visual/CMS** e fluxos de trabalho **CLI/CI** para detectar e preencher lacunas.

> Nota: `next-intl` e `i18next` também aceitam catálogos em TypeScript. Se sua equipe armazena mensagens em arquivos `.ts` ou as descentraliza por funcionalidade, você pode enfrentar atritos semelhantes com TMS. No entanto, muitas configurações do `next-intl` permanecem centralizadas em uma pasta `locales/`, o que facilita um pouco a refatoração para JSON para TMS.

## Experiência do Desenvolvedor

Esta parte faz uma comparação profunda entre as três soluções. Em vez de considerar casos simples, como descrito na documentação de 'primeiros passos' para cada solução, consideraremos um caso de uso real, mais semelhante a um projeto real.

### Estrutura do aplicativo

A estrutura do aplicativo é importante para garantir uma boa manutenção da sua base de código.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── public
│   └── locales
│       ├── en
│       │  ├── home.json
│       │  └── navbar.json
│       ├── fr
│       │  ├── home.json
│       │  └── navbar.json
│       └── es
│          ├── home.json
│          └── navbar.json
├── next-i18next.config.js
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
├── i18n.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home
    │       └── index.tsx
    │       └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### Comparação

- **next-intl / next-i18next**: Catálogos centralizados (JSON; namespaces/mensagens). Estrutura clara, integra-se bem com plataformas de tradução, mas pode levar a mais edições entre arquivos conforme as aplicações crescem.
- **Intlayer**: Dicionários `.content.{ts|js|json}` por componente, localizados junto aos componentes. Facilita o reuso de componentes e o raciocínio local; adiciona arquivos e depende de ferramentas em tempo de build.

#### Configuração e Carregamento de Conteúdo

Como mencionado anteriormente, você deve otimizar a forma como cada arquivo JSON é importado no seu código.
A forma como a biblioteca lida com o carregamento de conteúdo é importante.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="next-i18next.config.js"
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/_app.tsx"
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { ClientComponent, ServerComponent } from "@components";

export default function HomePage({ locale }: { locale: string }) {
  // Declare explicitamente o namespace usado por este componente
  const resources = await loadMessagesFor(locale); // seu carregador (JSON, etc.)

  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: ["common", "about"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

  const { t } = useTranslation("about");

  return (
    <I18nextProvider i18n={i18n}>
      <main>
        <h1>{t("title")}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </I18nextProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Pré-carregue apenas os namespaces necessários para ESTA página
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "about"])),
    },
  };
};
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Pode ser importado de uma configuração compartilhada
const locales = ["en", "fr", "es"];

export default getRequestConfig(async ({ locale }) => {
  // Valida se o parâmetro `locale` recebido é válido
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import pick from "lodash/pick";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Define o locale ativo da requisição para esta renderização no servidor (RSC)
  unstable_setRequestLocale(locale);

  // As mensagens são carregadas no servidor via src/i18n/request.ts
  // (veja a documentação do next-intl). Aqui, enviamos apenas um subconjunto para o cliente
  // que é necessário para os componentes cliente (otimização do payload).
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations } from "next-intl/server";
import { ClientComponent, ServerComponent } from "@components";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  // Carregamento estritamente do lado do servidor (não hidratado no cliente)
  const t = await getTranslations("about");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
```

  </TabItem>
<TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
export default {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### Comparação

Todos os três suportam carregamento de conteúdo e provedores por localidade.

- Com **next-intl/next-i18next**, normalmente você carrega mensagens/namespaces selecionados por rota e coloca os providers onde necessário.

- Com **Intlayer**, adiciona uma análise em tempo de build para inferir o uso, o que pode reduzir a configuração manual e permitir um único provider raiz.

Escolha entre controle explícito e automação com base na preferência da equipe.

### Uso em um componente cliente

Vamos pegar um exemplo de um componente cliente que renderiza um contador.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**Traduções (devem ser JSON reais em `public/locales/...`)**

```json fileName="public/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="public/locales/fr/about.json"
{
  "counter": {
    "label": "Contador",
    "increment": "Incrementar"
  }
}
```

**Componente cliente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

export default function ClientComponentExample() {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // next-i18next não expõe useNumber; use Intl.NumberFormat
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
}
```

> Não se esqueça de adicionar o namespace "about" na função serverSideTranslations da página  
> Aqui usamos a versão do React 19.x.x, mas para versões inferiores, será necessário usar useMemo para armazenar a instância do formatador, pois é uma função pesada

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**Traduções (mesma estrutura; carregue-as nas mensagens do next-intl conforme preferir)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Componente cliente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export default function ClientComponentExample() {
  // Escopo diretamente para o objeto aninhado
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
}
```

> Não esqueça de adicionar a mensagem "about" na mensagem do cliente da página

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**Conteúdo**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ pt: "Contador", en: "Counter", fr: "Compteur" }),
    increment: t({ pt: "Incrementar", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**Componente cliente**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

export default function ClientComponentExample() {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // retorna strings
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
}
```

  </TabItem>
</Tab>

#### Comparação

- **Formatação de números**
  - **next-i18next**: não possui `useNumber`; usa `Intl.NumberFormat` (ou i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: `useNumber()` embutido.

- **Chaves**
  - Mantenha uma estrutura aninhada (`about.counter.label`) e escopo seu hook de acordo (`useTranslation("about")` + `t("counter.label")` ou `useTranslations("about.counter")` + `t("label")`).

- **Localização dos arquivos**
  - **next-i18next** espera JSON em `public/locales/{lng}/{ns}.json`.
  - **next-intl** é flexível; carrega mensagens conforme sua configuração.
  - **Intlayer** armazena conteúdo em dicionários TS/JS e resolve por chave.

---

### Uso em um componente servidor

Vamos considerar o caso de um componente de interface do usuário (UI). Este componente é um componente de servidor e deve ser capaz de ser inserido como filho de um componente cliente. (página (componente de servidor) -> componente cliente -> componente de servidor). Como este componente pode ser inserido como filho de um componente cliente, ele não pode ser assíncrono.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/pages/about.tsx"
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { t, i18n } = useTranslation("about");
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  count: number;
  t: (key: string) => string;
};

const ServerComponent = ({ t, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("label")}>{t("increment")}</button>
    </div>
  );
};
```

> Como o componente do servidor não pode ser assíncrono, você precisa passar as traduções e a função formatadora como props.
>
> - `const t = await getTranslations("about.counter");`
> - `const format = await getFormatter();`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

const ServerComponent = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> O Intlayer expõe hooks **seguros para o servidor** via `next-intlayer/server`. Para funcionar, `useIntlayer` e `useNumber` usam uma sintaxe semelhante a hooks, parecida com os hooks do cliente, mas dependem, nos bastidores, do contexto do servidor (`IntlayerServerProvider`).

### Metadados / Sitemap / Robots

Traduzir conteúdo é ótimo. Mas as pessoas geralmente esquecem que o principal objetivo da internacionalização é tornar seu site mais visível para o mundo. I18n é uma alavanca incrível para melhorar a visibilidade do seu site.

Aqui está uma lista de boas práticas relacionadas ao SEO multilíngue.

- definir meta tags hreflang na tag `<head>`
  > Isso ajuda os motores de busca a entender quais idiomas estão disponíveis na página
- liste todas as traduções das páginas no sitemap.xml usando o esquema XML `http://www.w3.org/1999/xhtml`
  >
- não esqueça de excluir as páginas prefixadas do robots.txt (ex.: `/dashboard`, e `/fr/dashboard`, `/es/dashboard`)
  >
- use um componente Link personalizado para redirecionar para a página mais localizada (ex.: em francês `<a href="/fr/about">A propos</a>`)
  >

Os desenvolvedores frequentemente esquecem de referenciar corretamente suas páginas entre os diferentes locais.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa dinamicamente o arquivo JSON correto
  const messages = (
    await import("@/../public/locales/" + locale + "/about.json")
  ).default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Sobre</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Resto do código da página
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Resto do código da página
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Configuração do arquivo robots.txt para controlar o acesso dos robôs de busca
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // Bloqueia URLs multilíngues do dashboard
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer fornece uma função `getMultilingualUrls` para gerar URLs multilíngues para seu sitemap.

---

---

## E o vencedor é…

Não é simples. Cada opção tem seus prós e contras. Aqui está como eu vejo:

<Columns>
  <Column>

**next-intl**

- a mais simples, leve, com menos decisões impostas a você. Se você quer uma solução **mínima**, está confortável com catálogos centralizados, e seu app é **pequeno a médio porte**.

  </Column>
  <Column>

**next-i18next**

- madura, cheia de recursos, muitos plugins da comunidade, mas com custo de configuração mais alto. Se você precisa do **ecossistema de plugins do i18next** (por exemplo, regras avançadas ICU via plugins) e sua equipe já conhece o i18next, aceitando **mais configuração** para flexibilidade.

  </Column>
  <Column>

**Intlayer**

- construído para o Next.js moderno, com conteúdo modular, segurança de tipos, ferramentas e menos código repetitivo. Se você valoriza **conteúdo com escopo de componente**, **TypeScript rigoroso**, **garantias em tempo de build**, **tree-shaking** e ferramentas de roteamento/SEO/editor **com tudo incluído** - especialmente para **Next.js App Router**, sistemas de design e **bases de código grandes e modulares**.

  </Column>
</Columns>

Se você prefere uma configuração mínima e aceita algum trabalho manual, next-intl é uma boa escolha. Se você precisa de todos os recursos e não se importa com a complexidade, next-i18next funciona. Mas se você quer uma solução moderna, escalável e modular com ferramentas integradas, Intlayer pretende oferecer isso pronto para uso.

> **Alternativa para equipes empresariais**: Se você precisa de uma solução comprovada que funcione perfeitamente com plataformas de localização estabelecidas como **Crowdin**, **Phrase** ou outros sistemas profissionais de gerenciamento de tradução, considere **next-intl** ou **next-i18next** pelo seu ecossistema maduro e integrações comprovadas.

> **Roteiro futuro**: O Intlayer também planeja desenvolver plugins que funcionem sobre as soluções **i18next** e **next-intl**. Isso lhe dará as vantagens do Intlayer para automação, sintaxe e gerenciamento de conteúdo, mantendo a segurança e estabilidade fornecidas por essas soluções consolidadas no código da sua aplicação.

## Estrelas no GitHub (GitHub STARs)

As estrelas no GitHub são um forte indicador da popularidade de um projeto, da confiança da comunidade e da relevância a longo prazo. Embora não sejam uma medida direta da qualidade técnica, refletem quantos desenvolvedores consideram o projeto útil, acompanham seu progresso e provavelmente o adotam. Para estimar o valor de um projeto, as estrelas ajudam a comparar a tração entre alternativas e fornecem insights sobre o crescimento do ecossistema.

[![Gráfico do Histórico de Estrelas](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Conclusão

Todas as três bibliotecas têm sucesso na localização principal. A diferença é **quanto trabalho você deve fazer** para alcançar uma configuração robusta e escalável no **Next.js moderno**:

- Com o **Intlayer**, **conteúdo modular**, **TS rigoroso**, **segurança em tempo de compilação**, **pacotes otimizados por tree-shaking** e **App Router de primeira classe + ferramentas de SEO** são **padrões**, não tarefas.
- Se sua equipe valoriza **manutenibilidade e velocidade** em um aplicativo multi-idioma orientado a componentes, o Intlayer oferece a experiência **mais completa** atualmente.

Consulte o documento ['Por que Intlayer?'](https://intlayer.org/doc/why) para mais detalhes.
