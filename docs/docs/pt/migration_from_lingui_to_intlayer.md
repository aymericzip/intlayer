---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar do Lingui para o Intlayer"
description: "Migre uma aplicação React do Lingui para o Intlayer passo a passo. Mantenha suas macros do Lingui, useLingui e <Trans> funcionando com o compat adapter @intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrar do Lingui para o Intlayer

## Por que migrar do Lingui para o Intlayer?

<AccordionGroup>
<Accordion header="Tamanho do bundle">

O Lingui carrega um catálogo compilado por locale, com todas as mensagens da aplicação. O Intlayer divide o conteúdo por dicionário e envia apenas o que cada página usa, o que **reduz o tamanho dos seus bundles e páginas em até 50%**.

</Accordion>
<Accordion header="Manutenibilidade">

Os dicionários do Intlayer são **totalmente tipados** e podem ficar ao lado dos componentes que os usam. Sem etapas `extract` / `compile` para lembrar: os dicionários são gerados pelo plugin do bundler.

</Accordion>
<Accordion header="Agente de IA">

O conteúdo co-localizado **reduz o contexto necessário** para os LLMs. O Intlayer inclui uma **CLI** para testar traduções em falta, um **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, um **[servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**.

</Accordion>
<Accordion header="Automação">

Traduza as mensagens em falta no seu pipeline de CI/CD com o LLM da sua escolha, ou em segundo plano com a [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

</Accordion>
<Accordion header="Escalar com não desenvolvedores">

O Intlayer oferece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** self-hosted e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para que tradutores e redatores editem o conteúdo em tempo real.

</Accordion>
</AccordionGroup>

> Para entender de onde vêm essas bibliotecas, leia [a história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md).

## Estratégias de migração

1. **Compat adapter (recomendado para aplicações existentes)**: instale `@intlayer/lingui`. Ele expõe a mesma API de `@lingui/core` e `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) e serve as mensagens a partir dos dicionários do Intlayer. As suas macros (`` t`…` ``, `<Trans>`, `msg`, `plural`) continuam compilando exatamente como antes.
2. **Migração completa**: substitua gradualmente as chamadas do Lingui por `useIntlayer` e arquivos `.content.ts` ao lado dos seus componentes.

## Índice

<TOC/>

## Migração rápida

<Steps>
<Step number={1} title="Instalar dependências">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> O flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

O comando detecta o seu ambiente e instala os packages necessários, por exemplo:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Mantenha instalados `@lingui/core`, `@lingui/react` e o seu plugin de macros (`@lingui/babel-plugin-lingui-macro` ou `@lingui/swc-plugin`). As macros continuam sendo executadas, e os packages do Lingui fornecem os tipos TypeScript.

</Step>
<Step number={2} title="Configurar o Intlayer">

O Intlayer lê os seus catálogos do Lingui como source of truth. Com a estrutura padrão do Lingui (`src/locales/{locale}/messages.po`), aponte o plugin `syncPO` para eles:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="Usar catálogos JSON">

Com `@lingui/format-json`, use `syncJSON` com o formato ICU:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Use ids de mensagem explícitos (`t({ id: "hero.title", message: "Welcome" })` ou `<Trans id="hero.title">`). Ids gerados a partir do texto fonte não são resolvidos nos catálogos.

</Step>
<Step number={3} title="Substituir o plugin Vite do Lingui">

Troque `@lingui/vite-plugin` por `@intlayer/lingui/plugin`. O binding continua sendo `lingui()`: ele executa o build do Intlayer e cria aliases de `@lingui/core` e `@lingui/react` para `@intlayer/lingui`, sem alterações nos seus arquivos fonte.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Mantenha o plugin de macros no plugin React (Babel ou `@lingui/swc-plugin`), para que as macros sejam compiladas em chamadas `i18n._()` antes de o Intlayer resolvê-las.

</Step>
</Steps>

Os seus componentes continuam funcionando sem alterações:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

A troca de locale continua passando por `i18n.activate(locale)`, que atualiza cada consumidor de `useLingui()`.

## Migração completa

<Steps>
<Step number={4} title="Remover o carregamento de catálogos em runtime" isOptional={true}>

As mensagens agora vêm dos dicionários do Intlayer compilados no build. As chamadas a `i18n.load()` / `i18n.loadAndActivate()` servem apenas como fallback e exibem um aviso em desenvolvimento. Substitua-as por `i18n.activate(locale)` e remova a etapa `lingui compile`. Mantenha `lingui extract` para coletar novos ids de mensagem.

</Step>
<Step number={5} title="Renomeação explícita dos imports (opcional)" isOptional={true}>

O plugin Vite já cuida dos aliases. Para tornar a dependência explícita:

| Antes                                              | Depois                                                |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Mover o conteúdo para arquivos .content.ts" isOptional={true}>

Novos componentes podem usar conteúdo nativo do Intlayer, ao lado das chamadas do Lingui existentes:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

</Step>
<Step number={7} title="Ativar a tradução com IA" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
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

As traduções preenchidas são escritas de volta nos seus catálogos do Lingui. Consulte a [documentação da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para configurar a IA.

</Step>
</Steps>

## O que você pode excluir após a migração

| Arquivo / padrão                               | Por que não é mais necessário                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| `i18n.load()` / imports dinâmicos de catálogos | Os dicionários são compilados e carregados pelo Intlayer.               |
| `lingui compile` e catálogos `.js` compilados  | O Intlayer gera os dicionários diretamente a partir dos seus catálogos. |
| `@lingui/vite-plugin`                          | Substituído por `lingui()` de `@intlayer/lingui/plugin`.                |

## Configurar o TypeScript

Inclua os tipos gerados no seu `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Configuração do Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter do Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)
- [Plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md)
- [Intlayer com Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)
- [Editor visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- [CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
