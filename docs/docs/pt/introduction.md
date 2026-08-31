---
createdAt: 2025-08-23
updatedAt: 2026-08-30
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

## Perguntas Frequentes

<FAQ>

<Question title="Para que serve o Intlayer?">

O Intlayer é uma biblioteca de internacionalização (i18n) para aplicações JavaScript e TypeScript. Você declara o conteúdo de um componente ao lado do próprio componente em um arquivo `.content.ts`, o Intlayer compila essas declarações em dicionários tipados durante o build, e seus componentes os consomem por meio de um hook como `useIntlayer`. Ele abrange traduções, regras de plural, gênero, Markdown, roteamento ciente de locale, metadados de SEO, tradução assistida por IA e um editor visual para colaboradores não desenvolvedores.

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O markup renderizado no servidor resolve seu conteúdo no próprio servidor, e o compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza, descartando chaves e idiomas não utilizados. Os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Posso migrar do i18next, next-intl ou react-i18next sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) ou o [guia de migração do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface de `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` e `Lingui`, porém alimentados pelos dicionários do Intlayer, permitindo que apenas os imports mudem enquanto o código dos componentes permanece idêntico.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus arquivos fonte, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

Para um fluxo de trabalho totalmente automatizado, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) faz o mesmo em tempo de build em código JSX, TSX, Vue e Svelte, gerando os dicionários a cada alteração para que não haja necessidade de manter chaves manualmente. Como opera por análise estática, strings criadas exclusivamente em tempo de execução ficam fora de alcance, necessitando de algumas anotações para diferenciar texto do usuário de lógica interna da aplicação.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um app JavaScript?">

O ecossistema divide-se em três gerações:

- **Bibliotecas de catálogo em tempo de execução**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. As mensagens residem em namespaces JSON carregados em runtime. Maduras e agnósticas de framework, porém sem tipagem estática e enviadas integralmente ao cliente.
- **Bibliotecas de mensagens em tempo de compilação**: `Lingui`, `Paraglide`, `react-intl` e `next-intl` com etapa de extração. Melhor comportamento de bundle e alguma tipagem, mas ainda dependentes de catálogos centralizados.
- **Bibliotecas com camada de conteúdo (Content layer)**: `Intlayer`. O conteúdo é declarado por componente e compilado por componente, unificando tipagem, tree-shaking, ferramentas de desenvolvimento e edição na mesma fonte de verdade.

Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) para a comparação detalhada e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md) para números medidos de tamanho de bundle e desempenho.

</Question>

<Question title="Quais frameworks o Intlayer suporta?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro com qualquer framework de ilhas (islands), React Native com Expo, Lynx, e no backend Express, Fastify, NestJS, Hono, Elysia e AdonisJS. Cada um possui seu próprio guia em [ambientes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/introduction.md).

</Question>

<Question title="Por que declarar conteúdo ao lado do componente em vez de em um JSON central?">

Por três motivos: primeiro, uma página envia apenas as entradas que seus componentes renderizam, em vez de um namespace inteiro, reduzindo drasticamente o tamanho do bundle. Segundo, uma pasta de funcionalidade pode ser copiada, movida ou excluída de forma autônoma, sem precisar caçar chaves órfãs em catálogos compartilhados. Terceiro, um LLM ou agente de IA ao editar um componente enxerga o conteúdo na mesma pasta, tornando o desenvolvimento assistido por IA muito mais assertivo e confiável. Consulte [como funciona o Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/how_works_intlayer.md).

</Question>

<Question title="Como traduzo minha aplicação automaticamente com IA?">

Execute `npx intlayer fill`. A CLI detecta traduções ausentes e as preenche usando o LLM de sua preferência com seu próprio provedor e chave de API, pagando diretamente ao fornecedor de IA. A opção `--git-diff` restringe o processamento apenas ao conteúdo modificado na branch atual, mantendo o custo reduzido no pipeline de CI. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="Como encontro traduções ausentes?">

Execute `npx intlayer test`. O comando falha o build quando algum locale declarado estiver com conteúdo faltando, garantindo que textos não traduzidos nunca cheguem à produção. A [extensão do VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md) exibe os mesmos erros diretamente no editor, e o [plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md) identifica textos hardcoded com a regra `no-raw-text`. Consulte [testando seu conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md).

</Question>

<Question title="Preciso colocar o locale na URL?">

Não. O parâmetro `routing.mode` aceita `"prefix-no-default"` (o padrão: `/about` e `/pt/about`), `"prefix-all"`, `"no-prefix"` e `"search-params"`, enquanto `routing.domains` mapeia cada locale para seu próprio domínio. Qualquer que seja o esquema, `getMultilingualUrls` constrói as alternativas `hreflang` para seus metadados e sitemap. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Como tradutores e editores de conteúdo podem trabalhar sem tocar no código?">

O [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) roda em sua própria infraestrutura e permite que qualquer pessoa clique diretamente nos textos da aplicação em execução para editá-los, salvando as alterações de volta na base de código. O [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) externaliza o conteúdo para que ele possa ser alterado sem novos deploys, com a [sincronização em tempo real (live sync)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/live.md) aplicando as atualizações dinamicamente.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim. O Intlayer é código aberto sob a licença Apache 2.0. A biblioteca, CLI, compilador e editor visual são gratuitos para uso, inclusive em projetos comerciais. O CMS hospedado é um serviço pago opcional que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
