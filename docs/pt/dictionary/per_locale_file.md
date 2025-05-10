# Intlayer suporta duas maneiras de declarar conteúdo multilíngue:

- Arquivo único com todas as traduções
- Um arquivo por localidade (formato por localidade)

Essa flexibilidade permite:

- Migração fácil de outras ferramentas de i18n
- Suporte para fluxos de trabalho de tradução automatizados
- Organização clara das traduções em arquivos separados e específicos por localidade

## Arquivo Único com Múltiplas Traduções

Este formato é ideal para:

- Iteração rápida no código.
- Integração perfeita com o CMS.

Esta é a abordagem recomendada para a maioria dos casos de uso. Centraliza as traduções, facilitando a iteração e integração com o CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      pt: "Título do meu componente",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      pt: "Título do meu componente",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      pt: "Título do meu componente",
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
        "pt": "Título do meu componente",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Recomendado: Este formato é o melhor ao usar o editor visual do Intlayer ou ao gerenciar traduções diretamente no código.

## Formato Por Localidade

Este formato é útil quando:

- Você deseja versionar ou substituir traduções de forma independente.
- Está integrando fluxos de trabalho de tradução automática ou humana.

Você também pode dividir as traduções em arquivos individuais por localidade especificando o campo de localidade:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Title of my component" },
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
    multilingualContent: "Title of my component",
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
    "multilingualContent": "Title of my component",
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

> Importante: Certifique-se de que o campo de localidade esteja definido. Ele informa ao Intlayer qual idioma o arquivo representa.

> Nota: Em ambos os casos, o arquivo de declaração de conteúdo deve seguir o padrão de nomenclatura `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` para ser reconhecido pelo Intlayer. O sufixo `.[locale]` é opcional e usado apenas como convenção de nomenclatura.

## Misturando Formatos

Você pode misturar ambas as abordagens para a mesma chave de conteúdo. Por exemplo:

Declare conteúdo padrão ou base de forma estática (por exemplo, `index.content.ts`)

Adicione ou substitua conteúdo específico por localidade em `index.content.json`, `index.fr.content.ts`, etc.

Isso é especialmente útil quando:

- Você deseja declarar seu conteúdo base de forma estática no código e preencher automaticamente com traduções no CMS.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Exemplo

Aqui está um arquivo de declaração de conteúdo multilíngue:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Title of my component",
    projectName: "My project",
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
        "pt": "Título do meu componente",
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

const intlayer = getIntlayer("hello-world"); // O idioma padrão é INGLÊS, então retornará o conteúdo em INGLÊS

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### Geração Automática de Traduções

Use o [CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md) para preencher automaticamente traduções ausentes com base nos seus serviços preferidos.
