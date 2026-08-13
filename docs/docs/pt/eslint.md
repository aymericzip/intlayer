---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Plugin ESLint | Regras de lint para o Intlayer
description: Detecte strings hardcoded e chamadas dinâmicas que o compilador do Intlayer não consegue otimizar, com eslint-plugin-intlayer. Funciona com ESLint e oxlint, em React, Vue, Svelte, Angular e Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Internacionalização
  - no-raw-text
  - Strings hardcoded
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Histórico inicial"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` detecta os dois tipos de erro de i18n que o TypeScript não consegue ver:

1. **Texto hardcoded** que nunca chegou a um dicionário.
2. **Chamadas dinâmicas** que passam na verificação de tipos e executam, mas que o compilador do Intlayer não consegue otimizar.

Chaves de dicionário desconhecidas, caminhos de campo desconhecidos e locales ausentes já são erros de compilação, por isso o plugin não os repete.

## Instalação

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Requer ESLint 9 ou posterior (flat config).

## Uso

O plugin funciona tanto no ESLint quanto no [oxlint](https://oxc.rs) — as mesmas regras, as mesmas opções.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Ou ative as regras uma a uma:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Duas ressalvas: o suporte a plugins JS do oxlint ainda está em alpha, e o oxlint não suporta parsers personalizados — portanto arquivos `.vue`, `.svelte`, `.astro` e templates Angular não são analisados lá. Rode o oxlint sobre seus arquivos JS/TS/JSX e mantenha o ESLint para o resto.

  </Tab>
</Tabs>

### Configurações

| Configuração    | `no-raw-text`                  | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ------------------------------ | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                           | error                   | error                     | off                      |
| `strict`        | error (+ literais fora do JSX) | error                   | error                     | error                    |
| `contract-only` | off                            | error                   | error                     | off                      |

`recommended` mantém `no-raw-text` em `warn` de propósito: apontá-lo para uma codebase existente traz à tona todas as strings não traduzidas de uma vez, o que não deveria quebrar seu build no primeiro dia.

`enforce-adapter-import` está desativada por padrão — ative-a explicitamente se quiser.

## Regras

### `no-raw-text`

Reporta texto voltado ao usuário que não está declarado em um dicionário. Usa a mesma detecção do `intlayer extract`, então nomes de marca, classes CSS e identificadores técnicos são ignorados.

```jsx
// ✗ Reportado
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Correto
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Arquivos de declaração de conteúdo (`*.content.ts`, …) são ignorados.

Para corrigir um arquivo inteiro de uma vez, rode `npx intlayer extract` e deixe o compilador mover as strings para um dicionário por você.

**Opções**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atributos cujo valor é texto voltado ao usuário.
      // Padrão: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementos cujo conteúdo nunca é texto voltado ao usuário.
      // Padrão: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Expressões regulares para texto que nunca deve ser reportado.
      ignorePatterns: ["^Powered by"],

      // Também reportar literais de string fora do markup. Padrão: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Exige que a chave do dicionário seja um literal de string.

O compilador só consegue pré-carregar um dicionário quando consegue ler a chave diretamente no ponto da chamada. Com uma chave computada, ele pula silenciosamente a otimização e empacota todos os dicionários.

```typescript
// ✗ Reportado
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Uma variável continua não sendo um literal
const key = "home";
useIntlayer(key);

// ✓ Correto
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Isso se aplica a `useIntlayer`, `getIntlayer` e a cada adaptador compat (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Exige que o campo lido de um dicionário seja conhecido estaticamente.

O compilador remove campos cujo uso não enxerga. Um acesso computado é invisível para ele, então a leitura pode retornar `undefined` em tempo de execução.

```typescript
// ✗ Reportado
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Correto
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Prefere o adaptador compat `@intlayer/*` ao pacote original. O original só resolve para o Intlayer quando o alias do bundler está configurado; o adaptador sempre resolve. Corrigível automaticamente com `--fix`.

```typescript
// ✗ Reportado
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Correto
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Frameworks

Todas as regras funcionam em todas as integrações do Intlayer, inclusive dentro de templates Vue, Svelte e Angular. Você só precisa informar ao ESLint qual parser lê cada tipo de arquivo.

| Framework                 | Arquivos          | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Templates Angular         | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Instale apenas os parsers de que seu projeto precisa.

> **Limitação conhecida.** Em templates Vue e Angular, uma expressão como `{{ content[key] }}` não é verificada por `no-dynamic-field-access`. Leituras dinâmicas escritas no bloco de script são detectadas normalmente.
