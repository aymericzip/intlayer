# Intlayer Documentation

Bem-vindo à documentação do Intlayer. Este guia fornece uma visão geral do Intlayer, suas principais características e como utilizar efetivamente esses documentos para aprimorar sua experiência de desenvolvimento.

## Introduction

### What is Intlayer?

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração do seu conteúdo em todo o seu código. Converte a declaração de conteúdo multilíngue em dicionários estruturados para integrar facilmente em seu código. Utilizando TypeScript, **Intlayer** torna seu desenvolvimento mais forte e eficiente.

Intlayer também oferece um editor visual opcional que permite editar e gerenciar seu conteúdo facilmente. Este editor é particularmente útil para desenvolvedores que preferem uma interface visual para gerenciamento de conteúdo ou para equipes que geram conteúdo sem precisar se preocupar com código.

## Example of usage

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */ // Tipo da declaração de conteúdo
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */ // Tipo da declaração de conteúdo
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Main Features

Intlayer oferece uma variedade de recursos adaptados para atender às necessidades do desenvolvimento web moderno. Abaixo estão os principais recursos, com links para documentação detalhada para cada um:

- **Internationalization Support**: Amplie o alcance global de sua aplicação com suporte embutido para internacionalização.
- **Visual Editor**: Melhore seu fluxo de trabalho de desenvolvimento com plugins de editor projetados para o Intlayer. Confira o [Visual Editor Guide](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).
- **Configuration Flexibility**: Personalize sua configuração com extensas opções de configuração detalhadas no [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).
- **Advanced CLI Tools**: Gerencie seus projetos de forma eficiente usando a interface de linha de comando do Intlayer. Explore as capacidades na [CLI Tools Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).
- **Compatibility with i18n**: O Intlayer funciona perfeitamente com outras bibliotecas de internacionalização. Confira o [i18n Guide](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_i18next.md) para mais informações.

### Platforms Supported

Intlayer foi projetado para funcionar perfeitamente com aplicações Next.js e React. Ele também suporta Vite e Create React App.

- **Next.js Integration**: Utilize o poder do Next.js dentro do Intlayer para renderização do lado do servidor e geração de sites estáticos. Detalhes estão disponíveis em nosso [Next.js Integration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).
- **Vite and React Integration**: Aproveite o Vite dentro do Intlayer para renderização do lado do servidor e geração de sites estáticos. Detalhes estão disponíveis em nosso [Vite and React Integration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md).
- **Create React App Integration**: Utilize o poder do Create React App dentro do Intlayer para renderização do lado do servidor e geração de sites estáticos. Detalhes estão disponíveis em nosso [Create React App Integration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md).

### How to Use This Docs

Para aproveitar ao máximo esta documentação:

1. **Navigate to Relevant Sections**: Utilize os links fornecidos acima para ir diretamente para as seções que atendem às suas necessidades.
2. **Interactive Examples**: Onde disponível, utilize exemplos interativos para ver como os recursos funcionam em tempo real.
3. **Feedback and Contributions**: Seu feedback é valioso. Se você tiver sugestões ou correções, considere contribuir para a documentação.
