---
createdAt: 2025-02-07
updatedAt: 2025-12-13
title: Arquivo de Conteúdo
description: Aprenda como personalizar as extensões para seus arquivos de declaração de conteúdo. Siga esta documentação para implementar condições de forma eficiente em seu projeto.
keywords:
  - Arquivo de Conteúdo
  - Documentação
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Adicionado suporte para formatos ICU e i18next
  - version: 6.0.0
    date: 2025-09-20
    changes: Adição da documentação dos campos
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Arquivo de Conteúdo

<iframe title="i18n, Markdown, JSON… uma única solução para gerenciar tudo | Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## O que é um Arquivo de Conteúdo?

Um arquivo de conteúdo no Intlayer é um arquivo que contém definições de dicionário.
Esses arquivos declaram o conteúdo de texto da sua aplicação, traduções e recursos.
Os arquivos de conteúdo são processados pelo Intlayer para gerar dicionários.

Os dicionários serão o resultado final que sua aplicação importará usando o hook `useIntlayer`.

### Conceitos Chave

#### Dicionário

Um dicionário é uma coleção estruturada de conteúdo organizada por chaves. Cada dicionário contém:

- **Chave**: Um identificador único para o dicionário
- **Conteúdo**: Os valores reais do conteúdo (texto, números, objetos, etc.)
- **Metadados**: Informações adicionais como título, descrição, tags, etc.

#### Arquivo de Conteúdo

Exemplo de arquivo de conteúdo:

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
      pt: "Conteúdo em português",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
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
        stringContent: "Hello World",
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

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
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
        "0": "Sem carros",
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

#### Nós de Conteúdo

Nós de conteúdo são os blocos de construção do conteúdo do dicionário. Eles podem ser:

- **Valores primitivos**: strings, números, booleanos, null, undefined
- **Nós tipados**: Tipos especiais de conteúdo como traduções, condições, markdown, etc.
- **Funções**: Conteúdo dinâmico que pode ser avaliado em tempo de execução [veja Busca por Função](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md)
- **Conteúdo aninhado**: Referências a outros dicionários

#### Tipos de Conteúdo

Intlayer suporta vários tipos de conteúdo através de nós tipados:

- **Conteúdo de Tradução**: Texto multilíngue com valores específicos por localidade [veja Conteúdo de Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation_content.md)
- **Conteúdo Condicional**: Conteúdo condicional baseado em expressões booleanas [veja Conteúdo Condicional](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/condition_content.md)
- **Conteúdo de Enumeração**: Conteúdo que varia com base em valores enumerados [veja Conteúdo de Enumeração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/enumeration_content.md)
- **Conteúdo de Inserção**: Conteúdo que pode ser inserido em outro conteúdo [veja Conteúdo de Inserção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion_content.md)
- **Conteúdo Markdown**: Conteúdo de texto rico em formato Markdown [veja Conteúdo Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown_content.md)
- **Conteúdo Aninhado**: Referências a outros dicionários [veja Conteúdo Aninhado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/nested_content.md)
- **Conteúdo de Gênero**: Conteúdo que varia com base no gênero [veja Conteúdo de Gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender_content.md)
- **Conteúdo de Arquivo**: Referências a arquivos externos [veja Conteúdo de Arquivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/file_content.md)

## Estrutura do Dicionário

Um dicionário no Intlayer é definido pelo tipo `Dictionary` e contém várias propriedades que controlam seu comportamento:

### Propriedades Obrigatórias

#### `key` (string)

O identificador do dicionário. Se múltiplos dicionários tiverem a mesma chave, o Intlayer irá mesclá-los automaticamente.

> Use a convenção de nomenclatura kebab-case (por exemplo, `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

A propriedade `content` contém os dados reais do dicionário e suporta:

- **Valores primitivos**: strings, números, booleanos, null, undefined
- **Nós tipados**: Tipos especiais de conteúdo usando as funções auxiliares do Intlayer
- **Objetos aninhados**: Estruturas de dados complexas
- **Arrays**: Coleções de conteúdo
- **Funções**: Avaliação dinâmica de conteúdo

### Propriedades Opcionais

#### `title` (string)

Título legível para humanos do dicionário que ajuda a identificá-lo em editores e sistemas CMS. Isso é particularmente útil ao gerenciar um grande número de dicionários ou ao trabalhar com interfaces de gerenciamento de conteúdo.

**Exemplo:**

```typescript
{
  key: "about-page-meta",
  title: "Metadados da Página Sobre",
  content: { /* ... */ }
}
```

#### `description` (string)

Descrição detalhada que explica o propósito do dicionário, diretrizes de uso e quaisquer considerações especiais. Essa descrição também é usada como contexto para a geração de traduções assistida por IA, tornando-se valiosa para manter a qualidade e consistência das traduções.

**Exemplo:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Este dicionário gerencia os metadados da Página Sobre",
    "Considere boas práticas para SEO:",
    "- O título deve ter entre 50 e 60 caracteres",
    "- A descrição deve ter entre 150 e 160 caracteres",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Array de strings para categorizar e organizar dicionários. As tags fornecem contexto adicional e podem ser usadas para filtrar, pesquisar ou organizar dicionários em editores e sistemas CMS.

**Exemplo:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Especifica o formatador a ser usado para o conteúdo do dicionário. Isso permite usar diferentes sintaxes de formatação de mensagens.

- `'intlayer'`: O formatador Intlayer padrão.
- `'icu'`: Usa formatação de mensagens ICU.
- `'i18next'`: Usa formatação de mensagens i18next.

**Exemplo:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

Transforma o dicionário em um dicionário por localidade onde cada campo declarado no conteúdo será automaticamente transformado em um nó de tradução. Quando essa propriedade é definida:

- O dicionário é tratado como um dicionário de um único idioma
- Cada campo se torna um nó de tradução para esse idioma específico
- Você NÃO deve usar nós de tradução (`t()`) no conteúdo ao usar essa propriedade
- Se estiver ausente, o dicionário será tratado como um dicionário multilíngue

> Veja [Declaração de Conteúdo por Idioma no Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) para mais informações.

**Exemplo:**

```json
// Dicionário por idioma
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Isto se torna um nó de tradução para 'en'
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

Instruções para preenchimento automático do conteúdo do dicionário a partir de fontes externas. Isso pode ser configurado globalmente em `intlayer.config.ts` ou por dicionário. Suporta múltiplos formatos:

- **`true`**: Ativa o preenchimento automático para todas as localidades
- **`string`**: Caminho para um único arquivo ou modelo com variáveis
- **`object`**: Caminhos de arquivo por localidade

**Exemplos:**

```json
// Ativa para todas as localidades
{
  "autoFill": true
}
// Arquivo único
{
  "autoFill": "./translations/aboutPage.content.json"
}
// Modelo com variáveis
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Configuração detalhada por localidade
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Variáveis disponíveis:**

- `{{locale}}` – Código do idioma (ex.: `fr`, `es`)
- `{{fileName}}` – Nome do arquivo (ex.: `example`)
- `{{key}}` – Chave do dicionário (ex.: `example`)

> Veja [Configuração de Preenchimento Automático no Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md) para mais informações.

##### `priority` (número)

Indica a prioridade do dicionário para resolução de conflitos. Quando múltiplos dicionários possuem a mesma chave, o dicionário com o maior número de prioridade irá sobrescrever os demais. Isso é útil para gerenciar hierarquias de conteúdo e substituições.

**Exemplo:**

```typescript
// Dicionário base
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// Dicionário de substituição
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Bem-vindo ao nosso serviço premium!" }
}
// Isto irá sobrescrever o dicionário base
```

### Propriedades do CMS

##### `version` (string)

Identificador de versão para dicionários remotos. Ajuda a rastrear qual versão do dicionário está sendo usada atualmente, especialmente útil ao trabalhar com sistemas de gerenciamento de conteúdo remotos.

##### `live` (boolean)

Para dicionários remotos, indica se o dicionário deve ser buscado ao vivo em tempo de execução. Quando ativado:

- Requer que `importMode` esteja definido como "live" em `intlayer.config.ts`
- Requer que um servidor ao vivo esteja em execução
- O dicionário será buscado em tempo de execução usando a API de sincronização ao vivo
- Se estiver ao vivo, mas a busca falhar, recai para o valor dinâmico
- Se não estiver ao vivo, o dicionário é transformado em tempo de build para desempenho otimizado

### Propriedades do Sistema (Geradas automaticamente)

Estas propriedades são geradas automaticamente pelo Intlayer e não devem ser modificadas manualmente:

##### `$schema` (string)

Esquema JSON usado para validação da estrutura do dicionário. Adicionado automaticamente pelo Intlayer para garantir a integridade do dicionário.

##### `id` (string)

Para dicionários remotos, este é o identificador único do dicionário no servidor remoto. Usado para buscar e gerenciar conteúdo remoto.

##### `localId` (LocalDictionaryId)

Identificador único para dicionários locais. Gerado automaticamente pelo Intlayer para ajudar a identificar o dicionário e determinar se é local ou remoto, junto com sua localização.

##### `localIds` (LocalDictionaryId[])

Para dicionários mesclados, este array contém os IDs de todos os dicionários que foram mesclados juntos. Útil para rastrear a origem do conteúdo mesclado.

##### `filePath` (string)

O caminho do arquivo do dicionário local, indicando de qual arquivo `.content` o dicionário foi gerado. Ajuda na depuração e no rastreamento da origem.

##### `versions` (string[])

Para dicionários remotos, este array contém todas as versões disponíveis do dicionário. Ajuda a rastrear quais versões estão disponíveis para uso.

##### `autoFilled` (true)

Indica se o dicionário foi preenchido automaticamente a partir de fontes externas. Em caso de conflitos, os dicionários base substituirão os dicionários preenchidos automaticamente.

##### `location` ('distant' | 'locale')

Indica a localização do dicionário:

- `'locale'`: Dicionário local (a partir dos arquivos de conteúdo)
- `'distant'`: Dicionário remoto (a partir de fonte externa)

## Tipos de Nós de Conteúdo

O Intlayer fornece vários tipos especializados de nós de conteúdo que estendem valores primitivos básicos:

### Conteúdo de Tradução (`t`)

Conteúdo multilíngue que varia conforme o locale:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Conteúdo Condicional (`cond`)

Conteúdo que muda com base em condições booleanas:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### Conteúdo de Enumeração (`enu`)

Conteúdo que varia com base em valores enumerados:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Sua solicitação está pendente",
  approved: "Sua solicitação foi aprovada",
  rejected: "Sua solicitação foi rejeitada",
});
```

### Conteúdo de Inserção (`insert`)

Conteúdo que pode ser inserido em outros conteúdos:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Este texto pode ser inserido em qualquer lugar");
```

### Conteúdo Aninhado (`nest`)

Referências a outros dicionários:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Conteúdo Markdown (`md`)

Conteúdo de texto rico em formato Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Bem-vindo\n\nEste é um texto em **negrito** com [links](https://example.com)"
);
```

### Conteúdo por Gênero (`gender`)

Conteúdo que varia com base no gênero:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Ele é um desenvolvedor",
  female: "Ela é uma desenvolvedora",
  other: "Eles são desenvolvedores",
});
```

### Conteúdo de Arquivo (`file`)

Referências a arquivos externos:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Criando Arquivos de Conteúdo

### Estrutura Básica de Arquivo de Conteúdo

Um arquivo de conteúdo exporta um objeto padrão que satisfaz o tipo `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Conteúdo da Página de Boas-Vindas",
  description:
    "Conteúdo para a página principal de boas-vindas, incluindo a seção principal e recursos",
  tags: ["página", "boas-vindas", "página-inicial"],
  content: {
    hero: {
      title: t({
        pt: "Bem-vindo à Nossa Plataforma",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        pt: "Crie aplicações incríveis com facilidade",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          pt: "Começar",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          pt: "Registrar-se",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          pt: "Fácil de Usar",
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          pt: "Interface intuitiva para todos os níveis de habilidade",
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### Arquivo de Conteúdo JSON

Você também pode criar arquivos de conteúdo no formato JSON:

```json
{
  "key": "welcome-page",
  "title": "Conteúdo da Página de Boas-Vindas",
  "description": "Conteúdo para a página principal de boas-vindas",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Ficheiros de Conteúdo por Localidade

Para dicionários por localidade, especifique a propriedade `locale`:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Welcome to Our Platform",
      subtitle: "Build amazing applications with ease",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Extensões de Arquivos de Conteúdo

O Intlayer permite que você personalize as extensões dos seus arquivos de declaração de conteúdo. Essa personalização oferece flexibilidade para gerenciar projetos em larga escala e ajuda a evitar conflitos com outros módulos.

### Extensões Padrão

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

Essas extensões padrão são adequadas para a maioria das aplicações. No entanto, quando você tem necessidades específicas, pode definir extensões personalizadas para otimizar o processo de build e reduzir o risco de conflitos com outros componentes.

> Para personalizar as extensões de arquivo que o Intlayer usa para identificar arquivos de declaração de conteúdo, você pode especificá-las no arquivo de configuração do Intlayer. Essa abordagem é benéfica para projetos em larga escala, onde limitar o escopo do processo de monitoramento melhora o desempenho do build.

## Conceitos Avançados

### Mesclagem de Dicionários

Quando múltiplos dicionários possuem a mesma chave, o Intlayer os mescla automaticamente. O comportamento da mesclagem depende de vários fatores:

- **Prioridade**: Dicionários com valores de `priority` mais altos substituem aqueles com valores mais baixos
- **Auto-preenchimento vs Base**: Dicionários base substituem dicionários auto-preenchidos
- **Localização**: Dicionários locais substituem dicionários remotos (quando as prioridades são iguais)

### Segurança de Tipos

O Intlayer oferece suporte completo ao TypeScript para arquivos de conteúdo:

```typescript
// Defina seu tipo de conteúdo
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Use-o no seu dicionário
export default {
  key: "welcome-page",
  content: {
    // O TypeScript fornecerá autocompletar e verificação de tipos
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Imbricação de Nós

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
          es: "Não foram encontrados artigos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Foi encontrado um artigo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Foram encontrados múltiplos artigos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "Não há dados válidos disponíveis",
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
          en: "Múltiplos itens encontrados",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "Nenhum dado válido disponível",
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
        en: "Oi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Conteúdo composto imbricando condição, enumeração e conteúdo multilíngue
    // `getIntlayer('page','en').advancedContent(true)(10) retorna 'Múltiplos itens encontrados'`
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
            en: "Olá",
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
          },
        },
      },
    },
  },
}
```

### Melhores Práticas

1. **Convenções de Nomenclatura**:
   - Use kebab-case para as chaves do dicionário (`"about-page-meta"`)
   - Agrupe conteúdos relacionados sob o mesmo prefixo de chave

2. **Organização do Conteúdo**:
   - Mantenha conteúdos relacionados juntos no mesmo dicionário
   - Use objetos aninhados para organizar estruturas de conteúdo complexas
   - Aproveite as tags para categorização
   - Use o `autoFill` para preencher automaticamente as traduções faltantes

3. **Desempenho**:
   - Ajuste a configuração de conteúdo para limitar o escopo dos arquivos monitorados
   - Use dicionários ao vivo apenas quando atualizações em tempo real forem necessárias (por exemplo, testes A/B, etc.)
   - Garanta que o plugin de transformação de build (`@intlayer/swc` ou `@intlayer/babel`) esteja habilitado para otimizar o dicionário durante o build
