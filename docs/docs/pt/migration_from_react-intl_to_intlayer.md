---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar do react-intl (FormatJS) para o Intlayer"
description: "Migre uma aplicação React do react-intl para o Intlayer passo a passo. Mantenha useIntl, FormattedMessage e todos os componentes Formatted* funcionando com o compat adapter @intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrar do react-intl (FormatJS) para o Intlayer

## Por que migrar do react-intl para o Intlayer?

<AccordionGroup>
<Accordion header="Tamanho do bundle">

Com o react-intl, todas as mensagens da locale são passadas para o `IntlProvider`, então cada página carrega o catálogo inteiro. O Intlayer envia apenas os dicionários que cada página usa, o que **reduz o tamanho dos seus bundles e páginas em até 50%**.

</Accordion>
<Accordion header="Manutenibilidade">

Os ids de mensagem são **tipados** de acordo com os seus dicionários: ids inválidos falham no build. O conteúdo pode ficar ao lado dos componentes que o usam.

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

1. **Compat adapter (recomendado para aplicações existentes)**: instale `@intlayer/react-intl`. Ele expõe a mesma API de `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) e serve as mensagens a partir dos dicionários do Intlayer. ICU MessageFormat, plurais, selects e tags de rich text funcionam como antes.
2. **Migração completa**: substitua gradualmente as chamadas do react-intl por `useIntlayer` e arquivos `.content.ts` ao lado dos seus componentes.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Mantenha o `react-intl` instalado: ele fornece os tipos TypeScript.

</Step>
<Step number={2} title="Configurar o Intlayer">

Aponte o plugin `syncJSON` para os seus arquivos de mensagens existentes. Os catálogos do react-intl são mapas planos de ids com pontos:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> O primeiro segmento de cada id (`home`) torna-se um dicionário do Intlayer, então cada página carrega apenas os dicionários que usa. Quando o Intlayer escreve as traduções de volta, o arquivo mantém o formato plano.

</Step>
<Step number={3} title="Adicionar o plugin Vite">

`reactIntlVitePlugin()` executa o build do Intlayer e cria um alias de `react-intl` para `@intlayer/react-intl`, sem alterações nos seus arquivos fonte.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Usa outro bundler? Renomeie os imports para `@intlayer/react-intl` (veja o passo 5) e use o plugin do Intlayer para o seu bundler, por exemplo `withIntlayer` de `next-intlayer` para Next.js.

</Step>
<Step number={4} title="Parar de passar mensagens ao IntlProvider">

O `IntlProvider` continua funcionando, mas as mensagens agora são carregadas pelo Intlayer. Remova a prop `messages` e o import do catálogo:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Se `messages` ainda for passado, ele é ignorado e um aviso é exibido em desenvolvimento.

</Step>
</Steps>

Os seus componentes continuam funcionando sem alterações, com ids tipados:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Migração completa

<Steps>
<Step number={5} title="Renomeação explícita dos imports (opcional)" isOptional={true}>

O plugin Vite já cuida dos aliases. Para tornar a dependência explícita:

| Antes                                           | Depois                                                    |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Mover o conteúdo para arquivos .content.ts" isOptional={true}>

Novos componentes podem usar conteúdo nativo do Intlayer, ao lado das chamadas do react-intl existentes:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

As traduções preenchidas são escritas de volta nos seus arquivos JSON. Consulte a [documentação da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para configurar a IA.

</Step>
</Steps>

## O que você pode excluir após a migração

| Arquivo / padrão                            | Por que não é mais necessário                                               |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| Prop `messages` e carregamento do catálogo  | Os dicionários são compilados e carregados pelo Intlayer.                   |
| Etapa `formatjs compile`                    | O Intlayer interpreta as mensagens ICU diretamente dos arquivos JSON.       |
| Geração de ids pelo `babel-plugin-formatjs` | Use ids explícitos com pontos para que cada id corresponda a um dicionário. |

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

- [Compat adapter do react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-intl.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md)
- [Intlayer com Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)
- [Migrar do react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md)
- [Editor visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
