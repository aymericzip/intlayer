---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrando de next-i18next para Intlayer | Internacionalização (i18n)"
description: "Aprenda como migrar sua aplicação Next.js de next-i18next para Intlayer — passo a passo, sem quebrar seu código existente. Use o adaptador de compatibilidade @intlayer/next-i18next para uma transição perfeita."
keywords:
  - next-i18next
  - react-i18next
  - i18next
  - intlayer
  - migração
  - internacionalização
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrando de next-i18next para Intlayer

## Por que migrar de next-i18next para Intlayer?

<AccordionGroup>

<Accordion header="Tamanho do pacote (Bundle size)">

Em vez de carregar enormes arquivos JSON em suas páginas, carregue apenas o conteúdo necessário. Intlayer ajuda você a **reduzir o tamanho do pacote e da página em até 50%**.

</Accordion>

<Accordion header="Manutenibilidade">

Criar escopos para o conteúdo da sua aplicação torna aplicações em larga escala **fáceis de manter**. Você pode duplicar ou excluir um diretório de recursos inteiro sem o esforço mental de revisar toda a sua base de código de conteúdo. Além disso, Intlayer é **fortemente tipado** para garantir a precisão do seu conteúdo.

Intlayer também é a solução **desenvolvida mais ativamente** no ecossistema i18n — problemas são corrigidos rapidamente, novos adaptadores de frameworks são lançados regularmente e a API principal é continuamente refinada com base em feedback do mundo real em produção.

</Accordion>

<Accordion header="Agentes de IA">

A co-localização do conteúdo **reduz o contexto necessário** para Modelos de Linguagem de Grande Escala (LLMs). O Intlayer também oferece um conjunto de ferramentas como uma **CLI** para testar traduções ausentes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)** e **[Habilidades de Agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)** para tornar a Experiência do Desenvolvedor (DX) muito mais suave para agentes de IA.

</Accordion>

<Accordion header="Automação">

Automatize as traduções em seu pipeline de CI/CD usando o LLM de sua preferência pelo custo do seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para auxiliar com **tradução em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar enormes arquivos JSON aos componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do conteúdo no momento do build (build time).

</Accordion>

<Accordion header="Escalabilidade com não desenvolvedores">

Muito mais que apenas uma solução i18n, o Intlayer fornece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** auto-hospedável e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, tornando perfeita a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>

</AccordionGroup>

---

## Estratégias de Migração

Como o `next-i18next` encapsula `react-i18next` e `i18next` sob o capô, existem duas estratégias complementares para migrar para o Intlayer:

1. **Adaptador de Compatibilidade (Recomendado para apps existentes)** — Instale `@intlayer/next-i18next`, `@intlayer/react-i18next` e `@intlayer/i18next`. Esses pacotes expõem **exatamente as mesmas APIs** dos originais, mas delegam todo o trabalho de tradução para o Intlayer. Mantenha intactas suas chamadas para `useTranslation`, `appWithTranslation`, `serverSideTranslations` e roteamento de páginas do Next.js — a única coisa que muda é sua configuração e inicialização.

2. **Migração Completa** — Substitua gradualmente as APIs do `next-i18next` por hooks nativos do Intlayer (`useIntlayer`) e co-localize seu conteúdo em arquivos `.content.ts` junto de seus componentes.

Este guia cobre primeiro a **Estratégia 1** (adaptador de compatibilidade drop-in) e, em seguida, detalha a migração completa opcional.

---

## Índice

<TOC/>

---

## Migração Rápida

As etapas a seguir são o mínimo necessário para executar seu aplicativo Next.js Pages Router no Intlayer, sem alterar o código de nenhuma página ou componente.

<Steps>

<Step number={1} title="Instale as Dependências">

Instale os pacotes principais do Intlayer e os adaptadores de compatibilidade:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> a flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Você pode manter com segurança o `next-i18next`, `react-i18next` e `i18next` instalados durante a migração até que os aliases sejam resolvidos.

</Step>

<Step number={2} title="Configure o Intlayer">

O comando `intlayer init` cria um arquivo inicial `intlayer.config.ts`. Atualize-o para corresponder aos seus locales existentes e direcione o plugin `syncJSON` para seus arquivos de mensagens `next-i18next` (tipicamente localizados em `public/locales`):

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Adicione todos os seus locales existentes aqui
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // Corresponde à sintaxe de espaço reservado do i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** mapeia um locale e namespace (`key`) para o caminho de seu arquivo JSON. **`location`** diz ao observador (watcher) do Intlayer qual pasta monitorar para alterações. A opção `format: 'i18next'` garante que os espaços reservados do `next-i18next` sejam interpretados corretamente.

</Step>

<Step number={3} title="Atualize a Configuração do Next.js">

Envolva o seu arquivo `next.config.ts` (ou `.js`) existente com `createNextI18nPlugin` de `@intlayer/next-i18next/plugin`. Este wrapper aplica `withIntlayer` **e simultaneamente** injeta aliases de `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`, para que suas chamadas a `import { useTranslation } from 'next-i18next'` sejam redirecionadas de forma transparente no momento do build. Nenhuma alteração de código-fonte é necessária.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// A importação de configuração i18n de next-i18next.config.js pode ser removida
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // O Intlayer cuida do roteamento i18n nativo do Next.js por baixo dos panos,
  // portanto, você não precisa mais passar o objeto i18n aqui.
};

export default withIntlayer(nextConfig);
```

> **O arquivo `next-i18next.config.js` não é mais necessário.** O Intlayer compila todos os dicionários no **momento do build** (build-time), lidando com a detecção de locale, roteamento e carregamento de dicionário de maneira integrada.
>
> Você prefere usar o plugin `withIntlayer` puro do `next-intlayer/server`? Fazer isso compila dicionários, mas **não adiciona** os aliases de `next-i18next` / `react-i18next` / `i18next` — você precisaria renomear as importações para `@intlayer/*` manualmente nesse caso (veja o Passo 4).

</Step>

</Steps>

Isso é tudo para a migração rápida. Seu aplicativo Next.js agora está rodando no Intlayer, mantendo todas as suas chamadas `useTranslation`, `serverSideTranslations` e `appWithTranslation` intactas.

> **Chaves de tradução tipadas — automaticamente.** Uma vez que o Intlayer compila seus dicionários, `useTranslation` e `getFixedT` tornam-se tipados no seu conteúdo real. As chaves serão autocompletadas na sua IDE e caminhos inválidos resultarão em erros do TypeScript em tempo de compilação — nenhuma configuração extra é necessária.
>
> ```tsx
> // Pages Router — 'about' é um namespace de dicionário registrado
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autocompletar
> t("does.not.exist"); // ✗ Erro de TypeScript
>
> // getStaticProps / getServerSideProps (instância do i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ tipado
> ```

---

## Migração Completa

As etapas a seguir são opcionais e podem ser feitas gradativamente. Elas desbloqueiam o conjunto completo das funcionalidades do Intlayer: editor visual, CMS, arquivos de conteúdo tipados, automação de tradução por IA e muito mais.

<Steps>

<Step number={4} title="Renomeie Explícitamente as Importações (Opcional)" isOptional={true}>

O plugin do Intlayer já lida com o aliasing (apelido) a nível do bundler. Se preferir tornar a dependência explícita nos seus arquivos de código-fonte, você pode renomear as importações manualmente:

| Antes                                                                          | Depois                                                            |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

Essas são **substituições diretas** (drop-in) — nenhuma alteração de assinaturas de chamadas, argumentos ou tipos de retorno é necessária.

</Step>

<Step number={5} title="Habilite a Automação de Tradução por IA" isOptional={true}>

Com o Intlayer configurado, você pode usar a CLI para preencher traduções ausentes automaticamente:

```bash packageManager="npm"
# Testar traduções ausentes (adicionar ao CI)
npx intlayer test

# Preencher traduções ausentes usando IA
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Adicione a configuração de IA ao seu `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // padrão
    // model: "gpt-4o-mini",   // padrão
  },
};

export default config;
```

> Verifique a [Documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para explorar todas as opções disponíveis.

</Step>

</Steps>

---

## O que pode ser excluído pós-migração

Uma vez que o adaptador de compatibilidade esteja implementado, o seguinte boilerplate padrão do `next-i18next` pode ser excluído:

| Arquivo / Padrão                                  | Por que não é mais necessário                                                                                                                                  |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                          | O Intlayer gerencia internamente o roteamento, carregamento do dicionário e locales com base no `intlayer.config.ts`.                                          |
| `next-i18next` em `package.json`                  | Totalmente substituído por `@intlayer/next-i18next` e aliases.                                                                                                 |
| Pacotes de idiomas JSON (`public/locales/*.json`) | Pacotes JSON são necessários apenas se você continuar a usar o plugin `syncJSON`. Uma vez migrado para arquivos `.content.ts`, você pode remover a pasta JSON. |

Quando você estiver pronto para ir mais além, o Intlayer **descobre automaticamente todos os arquivos `.content.ts` e `.content.json` em qualquer lugar da sua base de código** (por padrão, em qualquer lugar sob `./src`). Basta colocar um arquivo `my-component.content.ts` ao lado de seu `MyComponent.tsx`, e o Intlayer o detectará em tempo de build sem necessidade de configuração adicional — não são necessários imports, registros ou um arquivo index central. Isso torna a co-localização das traduções com páginas e componentes totalmente fluida.

---

## Configuração do TypeScript

O Intlayer usa aumento de módulo (module augmentation) para fornecer IntelliSense completo no TypeScript (autocompletar) para as chaves de tradução. Certifique-se de que o seu arquivo `tsconfig.json` inclua os tipos gerados automaticamente:

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes de TypeScript
  "include": [
    // ... Suas configurações existentes de TypeScript
    ".intlayer/**/*.ts", // Inclui os tipos gerados automaticamente
  ],
}
```

---

## Configuração do Git

Adicione o diretório gerado pelo Intlayer ao seu `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora arquivos gerados pelo Intlayer
.intlayer
```

---

## Explore Além

- **Editor Visual** — Gerencie traduções visualmente no seu navegador: [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- **CMS** — Externalize o conteúdo e gerencie remotamente: [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
- **Extensão para VS Code** — Obtenha autocompletar de tradução e detecção de erros em tempo real: [Extensão do VS Code para o Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)
- **Referência da CLI** — Lista completa de comandos da CLI: [CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- **Intlayer com Next.js (Pages Router)** — Guia completo de configuração com Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_page_router.md)
