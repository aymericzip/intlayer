---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Plugin ESLint | Regras de lint para o Intlayer
description: Detecte strings codificadas diretamente, chamadas dinâmicas que o compilador do Intlayer não consegue otimizar e conteúdo de dicionário não utilizado com eslint-plugin-intlayer. Compatível com ESLint e oxlint, no React, Vue, Svelte, Angular e Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internacionalização
  - no-raw-text
  - Strings codificadas diretamente
  - Traduções não utilizadas
  - Conteúdo morto
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

O `eslint-plugin-intlayer` detecta os tipos de erros de i18n que o TypeScript não consegue identificar:

1. **Texto codificado diretamente (hardcoded)** que nunca chegou a um dicionário.
2. **Chamadas dinâmicas** que passam na verificação de tipos e são executadas, mas que o compilador do Intlayer não consegue otimizar.
3. **Conteúdo morto** — dicionários e campos que nada no projeto lê (ativação opcional).

Chaves de dicionário desconhecidas, caminhos de campos desconhecidos e idiomas ausentes já são erros de compilação, portanto o plugin não os repete.

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

Requer o ESLint 9 ou superior (flat config).

## Utilização

O plugin funciona tanto no ESLint quanto no [oxlint](https://oxc.rs) — com as mesmas regras e as mesmas opções.

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
      "intlayer/no-unused-content": "warn",
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

Duas ressalvas: o suporte a plugins JS no oxlint ainda está em versão alfa e o oxlint não suporta parsers customizados — portanto, arquivos `.vue`, `.svelte`, `.astro` e templates do Angular não são verificados lá. Execute o oxlint nos seus arquivos JS/TS/JSX e mantenha o ESLint para o restante.

O `no-unused-content` foi omitido acima de propósito: ele precisa do diretório de trabalho e do caminho do arquivo analisado a partir do contexto da regra, o que a ponte alfa de plugins JS não garante. Execute-o no ESLint.

  </Tab>
</Tabs>

### Configurações

| Configuração    | `no-raw-text`                  | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ------------------------------ | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                           | error                   | error                     | off                      | off                 |
| `strict`        | error (+ literais fora de JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                            | error                   | error                     | off                      | off                 |

A configuração `recommended` mantém deliberadamente `no-raw-text` como `warn`: apontá-la para uma base de código existente traz à tona todas as strings não traduzidas de uma só vez, o que não deve quebrar a sua compilação logo no primeiro dia.

O `enforce-adapter-import` fica desativado por padrão — ative-o explicitamente se desejar.

O `no-unused-content` fica desativado em todas as configurações, inclusive na `strict`. É a única regra que lê sua configuração do Intlayer e percorre seus arquivos de código no disco; portanto, ativá-la deve ser uma escolha consciente e não algo imposto por uma predefinição.

## Regras

### `no-raw-text`

Reporta texto voltado ao usuário que não esteja declarado em um dicionário. Ele usa a mesma detecção do `intlayer extract`, portanto nomes de marcas, classes CSS e identificadores técnicos são ignorados.

```jsx
// ✗ Reportado
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Correto
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Arquivos de declaração de conteúdo (`*.content.ts`, …) são ignorados.

Para corrigir um arquivo inteiro de uma só vez, execute `npx intlayer extract` e deixe o compilador mover as strings para um dicionário para você.

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

      // Expressões regulares para textos que nunca devem ser reportados.
      ignorePatterns: ["^Powered by"],

      // Também reportar literais de string fora do markup. Padrão: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Exige que a chave do dicionário seja uma string literal.

O compilador só consegue pré-carregar um dicionário quando pode ler a chave diretamente no local da chamada. Com uma chave calculada, ele pula silenciosamente a otimização e inclui todos os dicionários no bundle.

```typescript
// ✗ Reportado
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Uma variável ainda não é um literal
const key = "home";
useIntlayer(key);

// ✓ Correto
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Isso se aplica ao `useIntlayer`, `getIntlayer` e a todos os adaptadores de compatibilidade (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Exige que o campo lido de um dicionário seja conhecido estaticamente.

O compilador remove campos que não são identificados como utilizados. Um acesso computado é invisível para ele, portanto a leitura pode retornar `undefined` em tempo de execução.

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

Prefere o adaptador de compatibilidade `@intlayer/*` ao pacote original. O original só é resolvido para o Intlayer quando o alias do empacotador está configurado; o adaptador sempre funciona. Corrigível automaticamente com `--fix`.

```typescript
// ✗ Reportado
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Correto
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Desativada por padrão.** Reporta conteúdo que nada em seu projeto lê, além de chaves de dicionário declaradas em mais de um local.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Reportado se nenhum chamador no projeto solicitar "home"
  content: {
    title: t({ pt: "Título", en: "Title" }),

    // ✗ Reportado se nada ler `hero`
    hero: {
      subtitle: t({ pt: "Subtítulo", en: "Subtitle" }),
    },
  },
};
```

Ao contrário das outras regras, esta não pode responder apenas com base no arquivo analisado — um campo só é considerado não utilizado em relação ao projeto inteiro. Na primeira declaração de conteúdo de uma execução do linter, ela carrega a sua configuração do Intlayer, busca os arquivos de código declarados por essa configuração (`build.traversePattern`, `compiler.transformPattern`) e executa o mesmo analisador de uso que alimenta o `@intlayer/lsp` e o tachado de "não utilizado" na extensão do VS Code. O resultado é armazenado em cache por `cacheTtl` milissegundos, para que a varredura ocorra uma vez por execução e não a cada arquivo.

**Opções**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Reportar chaves de dicionário que nada referencia. Padrão: true
      reportUnusedDictionaries: true,

      // Reportar campos de conteúdo que nada lê. Padrão: true
      reportUnusedFields: true,

      // Reportar chaves declaradas em mais de um lugar. Padrão: true
      reportDuplicateKeys: true,

      // Expressões regulares para caminhos de campos que nunca devem ser reportados.
      ignoreFields: ["^meta"],

      // Raiz do projeto a partir de onde a verificação começa. Padrão: diretório de trabalho do ESLint
      baseDir: process.cwd(),

      // Tempo de reutilização de uma varredura de projeto, em ms. Padrão: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Diminua `cacheTtl` ao executar o lint a partir de um servidor de editor de longa duração e quiser que as alterações apareçam mais rápido; defina `baseDir` quando uma única execução de lint cobrir vários projetos Intlayer em um monorepo.

> **Tende ao silêncio.** Um falso positivo aqui apagaria uma tradução; portanto, nada é reportado quando o dicionário é consumido de uma forma que a análise não consiga rastrear: o objeto de conteúdo passado por completo, uma função de tradução vinculada a partir dele (`const t = useTranslations("home")`), uma declaração acessada por importação direta (`useDictionary(myDictionary)`), um `nest()` de outro dicionário ou uma lista de campos tornada não exaustiva por um spread. Componentes de arquivo único (`.vue`, `.svelte`, `.astro`) são considerados como usuários de todos os campos dos dicionários mencionados, pois seus blocos de script não são analisados aqui.

O `reportDuplicateKeys` lê os dicionários não mesclados que o build grava em `.intlayer/`, portanto permanece em silêncio até que o projeto tenha sido construído pelo menos uma vez. Duas declarações compartilhando uma chave são mescladas, o que é um padrão válido — o aviso existe porque um campo definido em ambos os lados mantém silenciosamente apenas um dos dois valores.

O analisador é carregado a partir do `@intlayer/lsp`, distribuído como ESM. A regra requer, portanto, uma versão do Node compatível com `require()` em módulos ES — Node 20.19+ ou 22.12+. Em versões anteriores, ela não reporta nada em vez de falhar a execução do lint.

## Frameworks

Todas as regras funcionam em todas as integrações do Intlayer, inclusive dentro de templates Vue, Svelte e Angular. Você só precisa informar ao ESLint qual parser lê cada tipo de arquivo.

| Framework                 | Arquivos          | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Templates do Angular      | `.component.html` | `@angular-eslint/template-parser` |
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

> **Limitação conhecida.** Em templates do Vue e Angular, uma expressão como `{{ content[key] }}` não é verificada pelo `no-dynamic-field-access`. Leituras dinâmicas escritas no bloco script são identificadas normalmente.
