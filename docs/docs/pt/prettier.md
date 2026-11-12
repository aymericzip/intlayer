---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Plugin Prettier x Oxfmt | Ordenar traduções do Intlayer
description: "Ordene os locales de t(), as categorias de plural(), as condições de enu(), os casos de select() e as chaves das suas declarações de conteúdo com prettier-plugin-intlayer. Funciona com Prettier e oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Formatação
  - Ordenar traduções
  - Ordenar locales
  - i18n
  - Internacionalização
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Histórico inicial"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Adicionado o uso com oxfmt"
author: aymericzip
---

# Plugin Prettier x Oxfmt

O `prettier-plugin-intlayer` organiza as chaves das suas traduções em uma ordem fixa a cada formatação do Prettier. Os diffs permanecem pequenos, conflitos de merge tornam-se raros e um locale ausente torna-se fácil de detectar.

```ts
// antes
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// depois
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Instalação

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Requer o Prettier 3 ou superior.

Se o seu projeto já utiliza o Prettier, `intlayer init prettier` instala o plugin e o adiciona à sua configuração automaticamente.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

O oxfmt não consegue carregar plugins de terceiros, por isso a ordenação passa pelo Prettier. Instale o Prettier ao lado do oxfmt. Ele só serve para ordenar as suas declarações de conteúdo; o oxfmt continua formatando o seu projeto.

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Requer o Prettier 3 ou superior. `intlayer init` só configura o plugin em projetos que já usam o Prettier, então configure-o manualmente como mostrado abaixo.

  </Tab>
</Tabs>

## Uso

O plugin funciona com o Prettier e com o [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Adicione o plugin à sua configuração do Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Para aplicá-lo apenas às suas declarações de conteúdo, utilize um override:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

O script de formatação executa duas ferramentas, cada uma com uma única tarefa:

1. **Prettier** ordena as suas declarações de conteúdo com o plugin. O glob o limita aos arquivos `*.content.*`.
2. **oxfmt** formata todo o projeto, incluindo as declarações de conteúdo.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

Mantenha esta ordem. O oxfmt substitui a formatação escrita pelo Prettier pela sua própria, mas nunca reordena as chaves dos objetos, então a ordem é mantida.

Esta configuração tem alguns limites:

- **Formatar ao salvar.** Um editor que formata com o oxfmt não ordena. Execute o script `format` para ordenar.
- **Modo check.** Não use `prettier --check` em arquivos formatados pelo oxfmt: a formatação é diferente, então ele aponta todos os arquivos. Para verificar a ordem na CI, execute o script `format` e faça o job falhar se houver alterações:

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

## O que é ordenado

### `t()`: locales

Os locales fixados aparecem primeiro (`en` por padrão). Os demais locales seguem em ordem alfabética.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: ordem CLDR

As categorias vão da menor quantidade até a alternativa (fallback): `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
});
```

### `enu()`: limites ascendentes

As condições são ordenadas pelo seu número e depois pelo operador (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` fica por último.

```ts
enu({
  "<-1": "Menos de menos um carro",
  "0": "Nenhum carro",
  "2": "Dois carros",
  ">=3": "Muitos carros",
  fallback: "Alguns carros",
});
```

Em tempo de execução, a primeira condição correspondente prevalece. O plugin aplica a nova ordem somente quando cada quantidade continuar resultando no mesmo conteúdo. Quando a ordem determina o resultado, o objeto é mantido exatamente como escrito. Por exemplo, em `{ '<1': …, '<=-2.3': … }` a chave `'<1'` captura qualquer número negativo.

### `select()`: alfabético

Os casos são ordenados alfabeticamente e `fallback` fica por último.

```ts
select({
  draft: "Esta publicação é um rascunho",
  published: "Esta publicação está publicada",
  scheduled: "Esta publicação está agendada",
  fallback: "Status desconhecido",
});
```

Sem uma chave `fallback` ou `other`, o último caso é usado como fallback. Esse caso permanece em último e apenas os casos anteriores a ele são ordenados.

### Arquivos `.content.json`

A forma serializada é ordenada da mesma maneira: `{ "nodeType": "translation", "translation": { … } }`, assim como os nós `plural`, `enumeration` e `select`.

### Traduções idênticas

Nos arquivos `*.content.*`, um `t()` cujas locales contêm todas a mesma string é substituído por essa string. Uma string simples é servida para todas as locales, então o resultado não muda.

```ts
// antes
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// depois
nextjs: "Next.js",
```

Um `t()` com uma única locale, um argumento de tipo (`t<string>()`), um comentário ou valores que não são strings é mantido. Defina `intlayerCollapseIdenticalTranslations: false` para desativar.

### Chaves de conteúdo (opcional)

Com `intlayerSortContentKeys: true`, o plugin também ordena as chaves de `content` do dicionário em ordem alfabética em todos os níveis de aninhamento. Isso se aplica apenas a arquivos `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

A ordenação continua através de cada função utilitária (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) para alcançar os objetos internos. A estrutura interna de cada utilitário preserva sua ordenação. As chaves passadas para `cond()` e `gender()` nunca são reordenadas, pois a última chave serve de fallback. Os campos vizinhos a `content` (`key`, `title`, `locale`…) permanecem inalterados.

## Opções

| Opção                                   | Padrão   | Descrição                                                                                                 |
| --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | Locales mantidos em primeiro lugar em `t()`, nessa ordem. Passe `[]` para ordenar todos os locales.       |
| `intlayerSortContentKeys`               | `false`  | Em arquivos `*.content.*`, também ordena as chaves de conteúdo do dicionário e objetos aninhados.         |
| `intlayerCollapseIdenticalTranslations` | `true`   | Nos arquivos `*.content.*`, substitui um `t()` cujas locales contêm todas a mesma string por essa string. |

## O que permanece intocado

- Objetos contendo spread (`...base`), chave computada (`[key]`), método ou chave duplicada.
- Mapas `plural()` com chave que não pertença às categorias CLDR.
- Mapas `enu()` cuja nova ordem alteraria o conteúdo resolvido.
- Chamadas para qualquer outra função com nome semelhante a um helper, mas recebendo argumento diferente de objeto.

Comentários acompanham a chave à qual pertencem.

## Parsers suportados

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` e `jsonc`. Os blocos `<script>` de arquivos Vue, Svelte e Astro são formatados com esses parsers.

> **Limitação conhecida.** O Prettier executa apenas um plugin por parser. Se outro plugin também substituir os parsers de JavaScript/TypeScript (por exemplo `prettier-plugin-tailwindcss`), apenas o último listado se aplicará a esses arquivos. Restrinja o `prettier-plugin-intlayer` a arquivos `*.content.*` através de um override para evitar esse conflito. Com o oxfmt, as classes do Tailwind são ordenadas pela opção integrada `sortTailwindcss`, então esse conflito não se aplica.
