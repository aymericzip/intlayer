# Introdução à declaração do seu conteúdo

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

O aplicativo buscará arquivos que correspondam ao padrão glob `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` por padrão.

Essas extensões padrão são adequadas para a maioria das aplicações. No entanto, se você tiver requisitos específicos, consulte o [guia de personalização de extensões de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md#content-configuration) para obter instruções sobre como gerenciá-las.

Para uma lista completa de opções de configuração, visite a documentação de configuração.

## Declare Seu Conteúdo

Crie e gerencie seus dicionários:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

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
  externalContent: string;
  insertionContent: string;
  fileContent: string;
  nestedContent: any;
  markdownContent: any;
  jsxContent: any;
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
      fr: "French content",
      es: "Spanish content",
      pt: "Conteúdo em Português",
    }),
    quantityContent: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
    conditionalContent: cond({
      true: "Validação está habilitada",
      false: "Validação está desabilitada",
    }),
    nestedContent: nest(
      "navbar", // A chave do dicionário a ser aninhada
      "login.button" // [Opcional] O caminho para o conteúdo a ser aninhado
    ),
    externalContent: fetch("https://example.com").then((res) => res.json())
    markdownContent: md("# Exemplo de Markdown"),

    /*
     * Disponível apenas usando `react-intlayer` ou `next-intlayer`
     */
    jsxContent: <h1>Meu título</h1>,
  },
} satisfies Dictionary<Content>; // [opcional] Dictionary é genérico e permite fortalecer o formato do seu dicionário
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

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
      pt: "Conteúdo em Português",
    }),
    quantityContent: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
    conditionalContent: cond({
      true: "Validação está habilitada",
      false: "Validação está desabilitada",
    }),
    nestedContent: nest(
      "navbar", // A chave do dicionário a ser aninhada
      "login.button" // [Opcional] O caminho para o conteúdo a ser aninhado
    ),
    markdownContent: md("# Exemplo de Markdown"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponível apenas usando `react-intlayer` ou `next-intlayer`
    jsxContent: <h1>Meu título</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

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
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      pt: "Conteúdo em Português",
    }),
    quantityContent: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
    conditionalContent: cond({
      true: "Validação está habilitada",
      false: "Validação está desabilitada",
    }),
    nestedContent: nest(
      "navbar", // A chave do dicionário a ser aninhada
      "login.button" // [Opcional] O caminho para o conteúdo a ser aninhado
    ),
    markdownContent: md("# Exemplo de Markdown"),
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
        "pt": "Conteúdo em Português",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Nenhum carro",
        "1": "Um carro",
        "<-1": "Menos de menos um carro",
        "-1": "Menos um carro",
        ">5": "Alguns carros",
        ">19": "Muitos carros",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validação está habilitada",
        "false": "Validação está desabilitada",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Exemplo de Markdown",
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

Você pode, sem problemas, imbricar funções dentro de outras.

Exemplo:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "João Silva";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','pt').hiMessage` retorna `['Oi', ' ', 'João Silva']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        pt: "Oi",
      }),
      " ",
      getName(),
    ],
    // Conteúdo composto imbricando condição, enumeração e conteúdo multilíngue
    // `getIntlayer('page','pt').advancedContent(true)(10) retorna 'Vários itens encontrados'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          pt: "Nenhum item encontrado",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          pt: "Um item encontrado",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          pt: "Vários itens encontrados",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        pt: "Nenhum dado válido disponível",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "João Silva";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','pt').hiMessage` retorna `['Oi', ' ', 'João Silva']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        pt: "Oi",
      }),
      " ",
      getName(),
    ],
    // Conteúdo composto imbricando condição, enumeração e conteúdo multilíngue
    // `getIntlayer('page','pt').advancedContent(true)(10) retorna 'Vários itens encontrados'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          pt: "Nenhum item encontrado",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          pt: "Um item encontrado",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          pt: "Vários itens encontrados",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        pt: "Nenhum dado válido disponível",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "João Silva";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','pt').hiMessage` retorna `['Oi', ' ', 'João Silva']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        pt: "Oi",
      }),
      " ",
      getName(),
    ],
    // Conteúdo composto imbricando condição, enumeração e conteúdo multilíngue
    // `getIntlayer('page','pt').advancedContent(true)(10) retorna 'Vários itens encontrados'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          pt: "Nenhum item encontrado",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          pt: "Um item encontrado",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          pt: "Vários itens encontrados",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        pt: "Nenhum dado válido disponível",
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
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
            "pt": "Oi",
          },
        },
        " ",
        "João Silva",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
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
