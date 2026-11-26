---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Validar dicionários com schemas (Zod)"
description: "Declare schemas Zod no intlayer.config.ts e associe-os aos seus dicionários para validar cada locale no build e tipar o conteúdo no seu editor."
keywords:
  - Schema
  - Zod
  - Validação
  - Dicionário
  - Declaração de conteúdo
  - Segurança de tipos
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Inicialização da doc"
author: aymericzip
---

# Validar dicionários com schemas

Um schema descreve a forma esperada do conteúdo de um dicionário. Você o declara uma única vez em `intlayer.config.ts`, dá um nome a ele e depois associa esse nome a qualquer dicionário com o campo `schema`.

O Intlayer então:

- **Valida** o dicionário para cada locale quando constrói os dicionários, e reporta cada erro com o seu locale e o caminho do campo.
- **Tipa** o conteúdo do dicionário no seu editor, para que um campo ausente ou com tipo errado seja detectado antes do build.

Os schemas são úteis quando vários dicionários precisam compartilhar a mesma estrutura (metadados de SEO, cards de produto, entradas no estilo CMS), ou quando o conteúdo precisa respeitar restrições que o TypeScript não consegue expressar, como um tamanho máximo para cada tradução.

<Steps>
<Step number={1} title="Declarar os schemas na configuração">

Instale o [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Depois declare seus schemas na chave `schemas`. Cada chave é o nome que você vai referenciar nos seus dicionários.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Associar um schema a um dicionário">

Defina o campo `schema` de um dicionário com um dos nomes declarados na configuração.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

O mesmo schema pode ser associado a quantos dicionários você precisar.

</Step>
<Step number={3} title="Fazer o build e ler o relatório">

A validação é executada sempre que o Intlayer constrói os dicionários: com `npx intlayer build`, ou pelo plugin do seu bundler em modo dev e build. Se uma tradução não respeitar o schema, o Intlayer exibe o locale, o caminho do campo e a mensagem do Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Uma execução avulsa de `intlayer build` falha se o esquema for desconhecido ou se a validação falhar. No modo watch, o Intlayer exclui o dicionário inválido até que seu conteúdo seja corrigido.

</Step>
</Steps>

<AccordionGroup>
<Accordion header="Metadados Markdown">

Valide os campos do frontmatter, como `title`, `description`, `date` e `tags`, antes de renderizar o Markdown. Os campos obrigatórios e os tipos esperados são verificados durante a compilação dos dicionários. Metadados incorretos são relatados com o idioma e o caminho do campo.

</Accordion>
<Accordion header="Metadados SEO da página">

Valide os metadados usados para apresentar títulos e descrições de páginas, URLs canônicas, imagens sociais e diretivas de indexação. Um esquema pode exigir títulos de 1 a 60 caracteres, limitar descrições a 160 caracteres e verificar URLs. Conteúdo inválido em um idioma é rejeitado antes de causar um erro na apresentação da página.

</Accordion>
<Accordion header="Conteúdo estruturado compartilhado">

Associe o mesmo esquema a dicionários que compartilham uma estrutura, como produtos, itens de navegação ou modelos de e-mail. Um campo ausente ou um valor do tipo errado invalida o dicionário durante a compilação e ajuda a impedir que conteúdo inconsistente chegue à aplicação.

</Accordion>
</AccordionGroup>

## Tipar o conteúdo a partir do schema

Os parâmetros genéricos de `Dictionary` controlam o nível de verificação do TypeScript sobre um dicionário:

| Declaração                                              | Campo `schema`                                 | Campo `content`                                 |
| ------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| `satisfies Dictionary`                                  | Autocompletado, um nome desconhecido é um erro | Não verificado pelo TypeScript                  |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Deve ser `"seo-metadata"`                      | Tipado a partir do schema                       |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Deve ser `"seo-metadata"`                      | Tipado a partir do schema e do seu próprio tipo |

Com um schema tipado, cada campo aceita um valor simples ou um nó de conteúdo que produz esse valor, então `t()` continua permitido:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> O Intlayer gera esses tipos a partir dos seus schemas Zod em `.intlayer/types` sempre que constrói os dicionários. Apenas a forma é tipada: restrições como `.min()`, `.max()` ou `.regex()` são verificadas no build.

## O que é validado

Para cada locale listado em `internationalization.locales`, o Intlayer resolve o conteúdo do dicionário para esse locale e depois valida o resultado. O schema descreve, portanto, o valor final de um campo (`title: string`), e não o nó `t()` que contém as traduções.

- **Traduções ausentes**: com o `strictMode` padrão, uma tradução ausente usa o locale padrão como fallback antes da validação. Com `strictMode: "strict"`, uma tradução ausente faz um campo obrigatório falhar.
- **Outros nós de conteúdo**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` e `insert()` são resolvidos em funções, e `md()` ou `html()` em nós. Declare esses campos com `z.any()` e mantenha as restrições nos campos que se resolvem em valores simples.
- **Não validado**: o conteúdo fornecido por uma função ou uma Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md)), e os dicionários obtidos do [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Usar outra biblioteca de validação

As entradas de `schemas` não estão presas ao Zod. Qualquer objeto que exponha um método `safeParse(data)` compatível com o Zod funciona, desde que retorne `{ success: true }` ou `{ success: false, error: { issues } }`, em que cada issue tem um array `path` e uma `message`. A tipagem do conteúdo só é gerada a partir de schemas Zod: com outra biblioteca, o conteúdo dos dicionários associados é tipado como `any`.

## Perguntas frequentes

<FAQ>

<Question title="Um erro de schema interrompe o meu build?">

Uma execução avulsa de `intlayer build` falha se um dicionário não corresponder ao seu esquema. No modo watch, o Intlayer registra os erros e exclui o dicionário inválido até que você o corrija e salve.

</Question>
<Question title="Vários dicionários podem compartilhar o mesmo schema?">

Sim. Um schema é referenciado pelo nome, então qualquer número de dicionários pode apontar para ele. Esse é o principal caso de uso: impor uma mesma estrutura a todos os metadados de página, entradas de produto ou templates de email.

</Question>
<Question title="O que acontece se o nome do schema não existir?">

O TypeScript aponta o erro assim que pelo menos um schema é declarado, porque o campo `schema` aceita apenas os nomes declarados. Em arquivos JSON, o Intlayer informa o nome de esquema desconhecido durante o build e rejeita o dicionário.

</Question>
<Question title="Todos os locales são validados, ou apenas o padrão?">

Todos os locales listados em `internationalization.locales`. O relatório indica o locale com falha, então é fácil encontrar uma tradução longa demais apenas em alemão.

</Question>

</FAQ>

## Relacionado

- [Arquivos de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)
- [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)
- [CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
