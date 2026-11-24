---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar do svelte-i18n para o Intlayer"
description: "Migre uma aplicação Svelte ou SvelteKit do svelte-i18n para o Intlayer passo a passo. Mantenha os stores $_, $date e $number funcionando com o compat adapter @intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrar do svelte-i18n para o Intlayer

## Por que migrar do svelte-i18n para o Intlayer?

<AccordionGroup>
<Accordion header="Tamanho do bundle">

O svelte-i18n registra arquivos de locale inteiros na inicialização. O Intlayer envia apenas os dicionários que cada página usa, o que **reduz o tamanho dos seus bundles e páginas em até 50%**.

</Accordion>
<Accordion header="Manutenibilidade">

As chaves são **tipadas** de acordo com os seus dicionários: chaves inválidas falham no build. O conteúdo pode ficar ao lado dos componentes que o usam.

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

1. **Compat adapter (recomendado para aplicações existentes)**: instale `@intlayer/svelte-i18n`. Ele expõe a mesma API de `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) e serve as mensagens a partir dos dicionários do Intlayer. ICU MessageFormat funciona como antes.
2. **Migração completa**: substitua gradualmente os stores do svelte-i18n por `useIntlayer` de `svelte-intlayer` e arquivos `.content.ts` ao lado dos seus componentes.

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
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Mantenha o `svelte-i18n` instalado: ele fornece os tipos TypeScript.

</Step>
<Step number={2} title="Configurar o Intlayer">

Aponte o plugin `syncJSON` para os seus arquivos de mensagens existentes. Com um arquivo por namespace (`src/locales/en/home.json`), cada arquivo torna-se um dicionário:

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` é resolvido para o campo `title` do dicionário `home`. Se você usa um único arquivo por locale (`src/locales/en.json`) com namespaces aninhados, use `source: ({ locale }) => \`./src/locales/${locale}.json\``: cada chave de primeiro nível torna-se um dicionário.

</Step>
<Step number={3} title="Adicionar o plugin Vite">

`svelteI18nVitePlugin()` executa o build do Intlayer e cria um alias de `svelte-i18n` para `@intlayer/svelte-i18n`, sem alterações nos seus arquivos fonte.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Para SvelteKit, adicione `svelteI18nVitePlugin()` depois de `sveltekit()` no mesmo array `plugins`.

</Step>
<Step number={4} title="Simplificar a configuração i18n">

Mantenha `init()`, mas remova `register()` e `addMessages()`: as mensagens vêm dos dicionários do Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Os seus componentes continuam funcionando sem alterações:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Definir `$locale = 'fr'` muda o idioma tanto dos stores do svelte-i18n quanto do `useIntlayer`.

## Migração completa

<Steps>
<Step number={5} title="Renomeação explícita dos imports (opcional)" isOptional={true}>

O plugin Vite já cuida dos aliases. Para tornar a dependência explícita:

| Antes                                        | Depois                                                 |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Mover o conteúdo para arquivos .content.ts" isOptional={true}>

Novos componentes podem usar conteúdo nativo do Intlayer, ao lado das chamadas do svelte-i18n existentes:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
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

| Arquivo / padrão                        | Por que não é mais necessário                                 |
| --------------------------------------- | ------------------------------------------------------------- |
| Chamadas `register()` / `addMessages()` | Os dicionários são compilados e carregados pelo Intlayer.     |
| `waitLocale()` antes da renderização    | As mensagens ficam disponíveis assim que a locale é definida. |

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

- [Compat adapter do svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/svelte-i18n.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md)
- [Intlayer com Vite e Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+svelte.md)
- [Intlayer com SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_svelte_kit.md)
- [Editor visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
