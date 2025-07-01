---
docName: dictionary__per_locale_file
url: https://intlayer.org/doc/concept/per-locale-file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Declaração de Conteúdo `Por Localidade` no Intlayer
description: Descubra como declarar conteúdo por localidade no Intlayer. Siga a documentação para entender os diferentes formatos e casos de uso.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Por-Localidade
  - TypeScript
  - JavaScript
---

# Declaração de Conteúdo `Por Localidade` no Intlayer

O Intlayer suporta duas formas de declarar conteúdo multilíngue:

- Arquivo único com todas as traduções
- Um arquivo por localidade (formato por-localidade)

Essa flexibilidade permite:

- Migração fácil a partir de outras ferramentas de i18n
- Suporte para fluxos de trabalho de tradução automatizados
- Organização clara das traduções em arquivos separados, específicos por localidade

## Arquivo Único com Múltiplas Traduções

Este formato é ideal para:

- Iteração rápida no código.
- Integração perfeita com o CMS.

Esta é a abordagem recomendada para a maioria dos casos de uso. Centraliza as traduções, facilitando a iteração e a integração com o CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Conteúdo do olá mundo com traduções multilíngues
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Conteúdo do olá mundo com traduções multilíngues
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Recomendado: Este formato é o melhor quando se utiliza o editor visual do Intlayer ou se gerenciam traduções diretamente no código.

## Formato Por Localidade

Este formato é útil quando:

- Você deseja versionar ou sobrescrever traduções de forma independente.
- Você está integrando fluxos de trabalho de tradução automática ou humana.

Você também pode dividir as traduções em arquivos individuais por localidade especificando o campo locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Título do meu componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Conteúdo para o componente "hello-world" em inglês
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Título do meu componente" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Conteúdo para o componente "hello-world" em espanhol
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: {
    multilingualContent: "Título do meu componente",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Importante
  "content": {
    "multilingualContent": "Título do meu componente",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Importante
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Importante: Certifique-se de que o campo locale está definido. Ele informa ao Intlayer qual idioma o arquivo representa.

> Nota: Em ambos os casos, o arquivo de declaração de conteúdo deve seguir o padrão de nomenclatura `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` para ser reconhecido pelo Intlayer. O sufixo `.[locale]` é opcional e usado apenas como convenção de nomenclatura.

## Misturando Formatos

Você pode combinar ambas as abordagens de declaração para a mesma chave de conteúdo. Por exemplo:

- Declare seu conteúdo base estaticamente em um arquivo como index.content.ts.
- Adicione ou substitua traduções específicas em arquivos separados, como index.fr.content.ts ou index.content.json.

Esta configuração é especialmente útil quando:

- Você deseja definir a estrutura inicial do conteúdo no código.
- Você planeja enriquecer ou completar traduções posteriormente usando o CMS ou ferramentas automatizadas.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Exemplo

Aqui um arquivo de declaração de conteúdo multilíngue:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Título do meu componente",
    projectName: "Meu projeto",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

O Intlayer mescla automaticamente arquivos multilíngues e por localidade.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // O locale padrão é INGLÊS, então ele retornará o conteúdo em INGLÊS

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Título do meu componente",
//  "projectName": "Meu projeto"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Meu projeto"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Meu projeto"
// }
```

### Geração Automática de Tradução

Use o [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md) para preencher automaticamente as traduções faltantes com base nos seus serviços preferidos.

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
