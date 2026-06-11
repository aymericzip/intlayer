---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrando de i18next para Intlayer | Internacionalização (i18n)"
description: "Aprenda como migrar sua aplicação JavaScript/TypeScript de i18next para Intlayer — passo a passo, sem quebrar seu código existente. Use o adaptador de compatibilidade @intlayer/i18next para uma transição perfeita."
keywords:
  - i18next
  - intlayer
  - migração
  - internacionalização
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Migrando de i18next para Intlayer

## Por que migrar de i18next para Intlayer?

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

Existem duas estratégias complementares para migrar do `i18next` para o Intlayer:

1. **Adaptador de Compatibilidade (Recomendado para apps existentes)** — Instale `@intlayer/i18next`. Este pacote expõe **exatamente a mesma API** do `i18next`, mas delega todo o trabalho de tradução, por baixo dos panos, ao Intlayer. Mantenha suas chamadas existentes de `i18next.t()`, `i18next.changeLanguage()` e `createInstance()` intactas — a única coisa que muda é o caminho de importação e a inicialização.

2. **Migração Completa** — Substitua gradualmente as APIs do `i18next` pelas ferramentas nativas do Intlayer, e co-localize seu conteúdo em arquivos `.content.ts` próximos aos seus componentes.

Este guia cobre a **Estratégia 1** (adaptador de compatibilidade) primeiro, depois discute a migração completa opcional.

---

## Índice

<TOC/>

---

## Migração Rápida

As etapas a seguir são o mínimo necessário para executar seu aplicativo `i18next` existente no Intlayer, sem fazer alterações na sua base de código.

<Steps>

<Step number={1} title="Instale as Dependências">

Instale o pacote principal do Intlayer e o adaptador de compatibilidade:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> Você pode manter o `i18next` instalado com segurança — o adaptador de compatibilidade o utiliza como uma `devDependency` / `peerDependency` para tipos TypeScript.

</Step>

<Step number={2} title="Configure o Intlayer">

O comando `intlayer init` cria um arquivo inicial `intlayer.config.ts`. Atualize-o para corresponder aos seus locales existentes e aponte o plugin `syncJSON` para os seus arquivos de mensagens:

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mapeia um locale para o caminho de seu arquivo JSON. **`location`** diz ao observador (watcher) do Intlayer qual pasta monitorar para alterações. A opção `format: 'i18next'` garante que espaços reservados como `{{name}}` sejam interpretados corretamente.

</Step>

<Step number={3} title="Atualize o Alias do Bundler (Opcional)">

Se você usa um empacotador (Vite, Webpack, esbuild), você pode injetar um alias de módulo para que `import ... from 'i18next'` resolva automaticamente para `@intlayer/i18next`. Isso remove a necessidade de alterar os caminhos de importação manualmente em toda a sua base de código.

**Para Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> O `i18nextVitePlugin()` encapsula o plugin `intlayer()` do `vite-intlayer` e adiciona automaticamente o alias de `i18next` → `@intlayer/i18next` para você. Usar o plugin `intlayer()` comum do `vite-intlayer` compila os dicionários, mas **não** adiciona o alias — você teria que renomear as importações para `@intlayer/i18next` manualmente nesse caso (veja o próximo passo).

</Step>

</Steps>

Isso é tudo para a migração rápida. Seu aplicativo agora está rodando no Intlayer, mantendo todas as suas importações e a API do `i18next` intactas.

---

## Migração Completa

As etapas a seguir são opcionais e podem ser feitas gradativamente. Elas desbloqueiam o conjunto completo das funcionalidades do Intlayer: editor visual, CMS, arquivos de conteúdo tipados, automação de tradução por IA e muito mais.

<Steps>

<Step number={4} title="Renomeie Explícitamente as Importações (Opcional)" isOptional={true}>

Se você preferir tornar a dependência explícita nos seus arquivos-fonte ou não usar um plugin de bundler para criar alias nas importações, você pode renomear os caminhos de importação manualmente:

| Antes                                      | Depois                                               |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
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

Uma vez que o adaptador de compatibilidade esteja implementado, o seguinte boilerplate padrão do `i18next` pode ser excluído:

| Arquivo / Padrão                              | Por que não é mais necessário                                                                                                                                  |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chamadas a `i18next.init()`                   | O Intlayer inicializa tudo automaticamente; não há passo de carregamento em tempo de execução.                                                                 |
| `i18next.use(...)`                            | O Intlayer não usa plugins de i18next, backends ou detectores de idiomas.                                                                                      |
| Pacotes de idiomas em JSON (`locales/*.json`) | Pacotes JSON são necessários apenas se você continuar a usar o plugin `syncJSON`. Uma vez migrado para arquivos `.content.ts`, você pode remover a pasta JSON. |

Quando você estiver pronto para ir mais além, o Intlayer **descobre automaticamente todos os arquivos `.content.ts` e `.content.json` em qualquer lugar da sua base de código** (por padrão, em qualquer lugar sob `./src`). Basta colocar um arquivo `my-component.content.ts` ao lado de sua lógica, e o Intlayer o detectará em tempo de build sem necessidade de configuração adicional — não são necessários imports, registros ou um arquivo index central. Isso torna a co-localização das traduções totalmente simples e integrada.

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
