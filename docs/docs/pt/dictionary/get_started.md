---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dicionário | Primeiros Passos
description: Descubra como declarar e usar dicionários no seu site multilíngue. Siga os passos nesta documentação online para configurar seu projeto em poucos minutos.
keywords:
  - Primeiros Passos
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
---

# Primeiros Passos na declaração do seu conteúdo

<iframe title="i18n, Markdown, JSON… uma única solução para gerenciar tudo | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Extensões de arquivos

Por padrão, o Intlayer monitora todos os arquivos com as seguintes extensões para declarações de conteúdo:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

A aplicação irá buscar arquivos que correspondam ao padrão glob `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` por padrão.

Essas extensões padrão são adequadas para a maioria das aplicações. No entanto, se você tiver requisitos específicos, consulte o [guia de personalização de extensões de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#content-configuration) para instruções sobre como gerenciá-las.

Para uma lista completa de opções de configuração, visite a documentação de configuração.

## Declare Seu Conteúdo

Crie e gerencie seus dicionários:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Olá Mundo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "Conteúdo em francês",
      es: "Conteúdo em espanhol",
    }),
    quantityContent: enu({
      "<-1": "Menos que menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
    conditionalContent: cond({
      true: "Validação está ativada",
      false: "Validação está desativada",
    }),
    insertionContent: insert("Olá {{name}}!"),
    nestedContent: nest(
      "navbar", // A chave do dicionário para aninhar
      "login.button" // [Opcional] O caminho para o conteúdo a ser aninhado
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Exemplo de Markdown"),

    /*
     * Disponível apenas usando `react-intlayer` ou `next-intlayer`
     */
    jsxContent: <h1>Meu título</h1>,
  },
} satisfies Dictionary<Content>; // [opcional] Dictionary é genérico e permite reforçar a formatação do seu dicionário
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Olá Mundo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Menos que menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
    conditionalContent: cond({
      true: "Validação está ativada",
      false: "Validação está desativada",
    }),
    insertionContent: insert("Olá {{name}}!"),
    nestedContent: nest(
      "navbar", // A chave do dicionário para aninhar
      "login.button" // [Opcional] O caminho para o conteúdo a ser aninhado
    ),
    markdownContent: md("# Exemplo de Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponível apenas usando `react-intlayer` ou `next-intlayer`
    jsxContent: <h1>Meu título</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Olá Mundo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      pt: "Conteúdo em português",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Menos que menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
    conditionalContent: cond({
      true: "Validação está ativada",
      false: "Validação está desativada",
    }),
    insertionContent: insert("Olá {{name}}!"),
    nestedContent: nest(
      "navbar", // A chave do dicionário para aninhar
      "login.button" // [Opcional] O caminho para o conteúdo a ser aninhado
    ),
    markdownContent: md("# Exemplo de Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponível apenas usando `react-intlayer` ou `next-intlayer`
    jsxContent: <h1>Meu título</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Olá Mundo",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Nenhum carro",
        "1": "Um carro",
        "<-1": "Menos que menos um carro",
        "-1": "Menos um carro",
        ">5": "Alguns carros",
        ">19": "Muitos carros",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validação está ativada",
        "false": "Validação está desativada",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Olá {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Exemplo de Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Meu título"],
      },
    },
  },
}
```

## Imbricação de funções

Você pode, sem problema, imbricar funções dentro de outras.

Exemplo:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` retorna `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Conteúdo composto imbricando condição, enumeração e conteúdo multilíngue
    // `getIntlayer('page','en').advancedContent(true)(10)` retorna 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` retorna `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Conteúdo composto imbricando condição, enumeração e conteúdo multilíngue
    // `getIntlayer('page','en').advancedContent(true)(10)` retorna 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` retorna `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Conteúdo composto imbricando condição, enumeração e conteúdo multilíngue
    // `getIntlayer('page','en').advancedContent(true)(10) retorna 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi",
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "pt": "Nenhum item encontrado",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "pt": "Um item encontrado",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "pt": "Vários itens encontrados",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
            "pt": "Nenhum dado válido disponível",
          },
        },
      },
    },
  },
}
```

## Recursos Adicionais

Para mais detalhes sobre o Intlayer, consulte os seguintes recursos:

- [Documentação de Declaração de Conteúdo por Localidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/per_locale_file.md)
- [Documentação de Conteúdo de Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)
- [Documentação de Conteúdo de Enumeração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/enumeration.md)
- [Documentação de Conteúdo de Condição](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/condition.md)
- [Documentação de Conteúdo de Inserção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md)
- [Documentação de Conteúdo de Arquivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/file.md)
- [Documentação de Conteúdo de Aninhamento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/nesting.md)
- [Documentação de Conteúdo Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md)
- [Documentação de Conteúdo de Busca por Função](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md)

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
