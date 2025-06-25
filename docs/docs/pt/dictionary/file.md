---
docName: dictionary__file
url: https://intlayer.org/doc/concept/content/file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Arquivo
description: Aprenda a incorporar arquivos externos no seu dicionário de conteúdo usando a função `file`. Esta documentação explica como o Intlayer vincula e gerencia dinamicamente o conteúdo dos arquivos.
keywords:
  - Arquivo
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

## Como Funciona a Incorporação de Arquivos

No Intlayer, a função `file` permite incorporar o conteúdo de arquivos externos em um dicionário. Essa abordagem garante que o Intlayer reconheça o arquivo de origem, permitindo uma integração perfeita com o Editor Visual e CMS do Intlayer. Diferentemente dos métodos diretos de leitura de arquivos como `import`, `require` ou `fs`, o uso de `file` associa o arquivo ao dicionário, permitindo que o Intlayer rastreie e atualize o conteúdo dinamicamente quando o arquivo for editado.

## Configurando o Conteúdo do Arquivo

Para incorporar o conteúdo de arquivos no seu projeto Intlayer, utilize a função `file` em um módulo de conteúdo. Abaixo estão exemplos demonstrando diferentes implementações.

### Implementação em TypeScript

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

### Implementação em Módulo ECMAScript (ESM)

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

### Implementação em CommonJS

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

### Configuração em JSON

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Usando Conteúdo de Arquivo no React Intlayer

Para usar o conteúdo de arquivo incorporado em um componente React, importe e utilize o hook `useIntlayer` do pacote `react-intlayer`. Isso recupera o conteúdo da chave especificada e permite que ele seja exibido dinamicamente.

```tsx fileName="**/*.tsx" codeFormat="typescript"
// Exemplo de uso do conteúdo de arquivo no React
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
// Exemplo de uso do conteúdo de arquivo no React com ESM
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
// Exemplo de uso do conteúdo de arquivo no React com CommonJS
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Exemplo de Markdown Multilíngue

Para suportar arquivos Markdown editáveis em várias línguas, você pode usar `file` em combinação com `t()` e `md()` para definir diferentes versões de idioma de um arquivo de conteúdo Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        pt: file("src/components/test.pt.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        pt: file("src/components/test.pt.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        pt: file("src/components/test.pt.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Essa configuração permite que o conteúdo seja recuperado dinamicamente com base na preferência de idioma do usuário. Quando usado no Editor Visual ou CMS do Intlayer, o sistema reconhecerá que o conteúdo vem dos arquivos Markdown especificados e garantirá que eles permaneçam editáveis.

## Como o Intlayer Lida com Conteúdo de Arquivo

A função `file` é baseada no módulo `fs` do Node.js para ler o conteúdo do arquivo especificado e inseri-lo no dicionário. Quando usada em conjunto com o Editor Visual ou CMS do Intlayer, o Intlayer pode rastrear a relação entre o dicionário e o arquivo. Isso permite que o Intlayer:

- Reconheça que o conteúdo se origina de um arquivo específico.
- Atualize automaticamente o conteúdo do dicionário quando o arquivo vinculado for editado.
- Garanta a sincronização entre o arquivo e o dicionário, preservando a integridade do conteúdo.

## Recursos Adicionais

Para mais detalhes sobre como configurar e usar a incorporação de arquivos no Intlayer, consulte os seguintes recursos:

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)
- [Documentação de Conteúdo Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md)
- [Documentação de Conteúdo de Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)

Esses recursos fornecem mais informações sobre incorporação de arquivos, gerenciamento de conteúdo e integração do Intlayer com várias estruturas.
