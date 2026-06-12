---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Introdução
description: Descubra como o Intlayer funciona. Veja os passos que o Intlayer utiliza na sua aplicação. Descubra o que fazem os diferentes pacotes.
keywords:
  - Introdução
  - Começar
  - Intlayer
  - Aplicação
  - Pacotes
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Documentação do Intlayer

Bem-vindo à documentação oficial do Intlayer! Aqui, você encontrará tudo o que precisa para integrar, configurar e dominar o Intlayer para todas as suas necessidades de internacionalização (i18n), quer esteja trabalhando com Next.js, React, Vite, Express ou outro ambiente JavaScript.

## Introdução

### O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização concebida especificamente para desenvolvedores JavaScript. Permite a declaração do seu conteúdo em qualquer lugar do seu código. Converte a declaração de conteúdo multilingue em dicionários estruturados para se integrar facilmente no seu código. Utilizando TypeScript, o **Intlayer** torna o seu desenvolvimento mais robusto e eficiente.

O Intlayer também fornece um editor visual opcional que permite editar e gerenciar facilmente o seu conteúdo. Este editor é particularmente útil para desenvolvedores que preferem uma interface visual para gestão de conteúdo, ou para equipes que geram conteúdo sem se preocuparem com o código.

### Exemplo de utilização

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      pt: "Olá Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "pt": "Olá Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Por que o Intlayer em vez das alternativas?

Em comparação com soluções principais como `next-intl` ou `i18next`, o Intlayer é uma solução que vem com otimizações integradas, tais como:

<AccordionGroup>

<Accordion header="Tamanho do bundle">

Em vez de carregar enormes ficheiros JSON para as suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do seu bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenibilidade">

Manter o conteúdo próximo aos componentes da sua aplicação **facilita a manutenção** para aplicações de grande escala. Você pode duplicar ou apagar uma única pasta de funcionalidade sem o fardo mental de rever toda a sua base de código de conteúdos. Além disso, o Intlayer é **totalmente tipado (fully typed)** para garantir a exatidão dos seus conteúdos.

</Accordion>

<Accordion header="Agente IA">

A co-localização do conteúdo **reduz o contexto necessário** pelos Modelos de Linguagem de Grande Escala (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções em falta, um **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, um **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais suave para agentes de IA.

</Accordion>

<Accordion header="Automatização">

Utilize a automatização para traduzir no seu pipeline CI/CD usando o LLM da sua preferência pelo custo do seu fornecedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Performance">

Conectar ficheiros JSON massivos a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo em tempo de compilação (build time).

</Accordion>

<Accordion header="Colaboração com não-desenvolvedores">

Muito mais do que apenas uma solução de i18n, o Intlayer fornece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) auto-hospedado** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para o ajudar a gerenciar o seu conteúdo multilingue em **tempo real**, tornando a colaboração com tradutores, copywriters e outros membros da equipe perfeitamente fluida. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>
</AccordionGroup>

## Principais características

O Intlayer oferece uma variedade de funcionalidades adaptadas para satisfazer as necessidades do desenvolvimento web moderno. Abaixo estão as principais funcionalidades, com links para a documentação detalhada de cada uma:

- **Suporte de internacionalização**: Melhore o alcance global da sua aplicação com suporte integrado para internacionalização.
- **Editor Visual**: Melhore o seu fluxo de trabalho de desenvolvimento com plugins de editor concebidos para o Intlayer. Consulte o [Guia do Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).
- **Flexibilidade de configuração**: Personalize a sua configuração com opções de configuração abrangentes detalhadas no [Guia de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).
- **Ferramentas CLI avançadas**: Gira os seus projetos de forma eficiente utilizando a interface de linha de comandos do Intlayer. Explore as capacidades na [Documentação de Ferramentas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

## Conceitos principais

### Dicionário

Organize o seu conteúdo multilingue perto do seu código para manter tudo consistente e fácil de manter.

- **[Começar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)**  
  Aprenda os conceitos básicos de como declarar o seu conteúdo no Intlayer.

- **[Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)**  
  Compreenda como as traduções são geradas, armazenadas e utilizadas na sua aplicação.

- **[Enumeração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/enumeration.md)**  
  Gira facilmente conjuntos de dados repetidos ou fixos em vários idiomas.

- **[Condição](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/condition.md)**  
  Aprenda a utilizar a lógica condicional no Intlayer para criar conteúdo dinâmico.

- **[Inserção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md)**
  Descubra como inserir valores numa string utilizando espaços reservados (placeholders).

- **[Busca por Função](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md)**  
  Veja como buscar conteúdo dinamicamente com lógica personalizada para corresponder ao fluxo de trabalho do seu projeto.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md)**  
  Aprenda a utilizar o Markdown no Intlayer para criar conteúdo rico.

- **[Incorporação de Ficheiros](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/file.md)**  
  Descubra como incorporar ficheiros externos no Intlayer para utilizá-los no editor de conteúdo.

- **[Aninhamento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/nesting.md)**  
  Compreenda como aninhar conteúdo no Intlayer para criar estruturas complexas.

### Ambientes e Integrações

Construímos o Intlayer a pensar na flexibilidade, oferecendo integração perfeita nos frameworks e ferramentas de build mais populares:

- **[Intlayer com Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)**
- **[Intlayer com Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)**
- **[Intlayer com Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_14.md)**
- **[Intlayer com Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_page_router.md)**
- **[Intlayer com React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)**
- **[Intlayer com Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)**
- **[Intlayer com React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_react_router_v7.md)**
- **[Intlayer com Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md)**
- **[Intlayer com React Native e Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_react_native+expo.md)**
- **[Intlayer com Lynx e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_lynx+react.md)**
- **[Intlayer com Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+preact.md)**
- **[Intlayer com Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vue.md)**
- **[Intlayer com Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nuxt.md)**
- **[Intlayer com Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+svelte.md)**
- **[Intlayer com SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_svelte_kit.md)**
- **[Intlayer com Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_express.md)**
- **[Intlayer com NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nestjs.md)**
- **[Intlayer com Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_hono.md)**
- **[Intlayer com Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_angular_21.md)**

Cada guia de integração inclui as melhores práticas para utilizar as funcionalidades do Intlayer, como **renderização do lado do servidor (SSR)**, **roteamento dinâmico** ou **renderização no lado do cliente**, para que possa manter uma aplicação rápida, amiga do SEO e altamente escalável.

## Contribuição e Feedback

Valorizamos o poder do código aberto e do desenvolvimento focado na comunidade. Se gostaria de propor melhorias, adicionar um novo guia ou corrigir quaisquer problemas na nossa documentação, sinta-se à vontade para submeter um Pull Request ou abrir uma issue no nosso [repositório GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Pronto para traduzir a sua aplicação de forma mais rápida e eficiente?** Mergulhe na nossa documentação para começar a utilizar o Intlayer hoje mesmo. Experiencie uma abordagem robusta e simplificada à internacionalização que mantém o seu conteúdo organizado e a sua equipe mais produtiva.
