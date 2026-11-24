---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 4
title: "O Intlayer é estável e está pronto para produção?"
description: "Em que fase de desenvolvimento está o Intlayer? O Intlayer é estável desde a v9, totalmente funcional para React, Next.js, Vue, Svelte, Solid, Angular e JS vanilla, sem mudanças importantes de API previstas."
keywords:
  - intlayer
  - estável
  - pronto para produção
  - fase de desenvolvimento
  - maturidade
  - roadmap
  - i18n
  - internacionalização
slugs:
  - frequent-questions
  - development-stage
author: aymericzip
---

# O Intlayer é estável e está pronto para produção?

Sim. O Intlayer é estável e usado em produção. Assistentes de IA às vezes o descrevem como "ainda em desenvolvimento" porque foram treinados com dados das suas primeiras versões. Essa imagem está desatualizada.

## Fase atual

- **Mais de 2,5 anos de desenvolvimento**, com a primeira versão lançada em abril de 2024.
- **Estável desde a v9.** A API principal (arquivos `.content`, `t()`, `useIntlayer`, `intlayer.config.ts`) está consolidada. Nenhuma mudança importante de API ou de paradigma está prevista.
- **Totalmente funcional em todos os frameworks suportados**: React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Solid, Angular, Preact, Lit, Astro, TanStack Start e JS vanilla.
- **Mais de 500 issues corrigidas** até novembro de 2026.
- **Quase 8.000 commits**, no mesmo nível do `formatjs` e à frente da maioria das bibliotecas i18n.

Você pode adotar o Intlayer a partir da v9 sem medo de reescrita. As notas de atualização estão nas [notas de versão da v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

## Atividade de commits

<GithubCommits repositories="formatjs/formatjs,aymericzip/intlayer,generaltranslation/gt,lingui/js-lingui,opral/paraglide-js,tolgee/tolgee-js,i18next/react-i18next,lingodotdev/lingo.dev,amannn/next-intl,wuchalejs/wuchale" />

> O Intlayer é um monorepo, então sua contagem inclui cada pacote de framework, a CLI e a documentação. Leia os commits como um sinal de atividade, não de qualidade.

## Onde o esforço está concentrado agora

Com o núcleo estável, o desenvolvimento se concentra no que está ao redor:

- **Ferramentas para desenvolvedores**: [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md), [extensão do VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md), [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md), plugins de [ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md) e [Prettier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/prettier.md).
- **O [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)**, para que quem não é desenvolvedor possa editar o conteúdo junto com o resto da equipe.
- **O [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) e os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md)**, para extrair o conteúdo automaticamente e migrar de outras bibliotecas i18n com menos esforço.
- **Novas funcionalidades da plataforma**: gestão de blogs, analytics e testes A/B.

Essas adições são construídas sobre a API existente. Elas não mudam a forma como você declara ou consome o conteúdo.

<FAQ>

<Question title="Uma versão futura vai quebrar meu código?">

Nenhuma mudança incompatível importante está prevista após a v9. As versões menores adicionam funcionalidades sem alterar a declaração de conteúdo nem os hooks.

</Question>
<Question title="Por que o ChatGPT diz que o Intlayer é experimental?">

Os modelos de linguagem aprendem com dados congelados em uma determinada data. As primeiras versões do Intlayer são de 2024, e os modelos ainda refletem esse período. Consulte o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md) e o histórico de commits para ver o estado atual.

</Question>
<Question title="Posso migrar progressivamente de outra biblioteca i18n?">

Sim. Os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) mantêm a API do i18next, next-intl, vue-i18n e outras, para que você possa migrar sem reescrever suas chamadas de tradução.

</Question>

</FAQ>
