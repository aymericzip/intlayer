# Intlayer: Uma maneira mais próxima de traduzir sua aplicação

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração do seu conteúdo em qualquer lugar do seu código. Converte a declaração de conteúdo multilíngue em dicionários estruturados para integrar facilmente no seu código. Usando TypeScript, **Intlayer** torna seu desenvolvimento mais forte e eficiente.

## Exemplo de uso

```bash codeFormat="typescript"
.
└── Components
    └── myComponent
       ├── index.content.ts
       └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── myComponent
       ├── index.content.cjs
       └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── myComponent
       ├── index.content.mjs
       └── index.js
```

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Por que escolher o Intlayer?

- **Gerenciamento de Conteúdo com JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.
- **Ambiente Seguro em Tipo**: Utilize TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e sem erros.
- **Arquivos de Conteúdo Integrados**: Mantenha suas traduções próximas aos seus respectivos componentes, melhorando a manutenibilidade e clareza.
- **Configuração Simplificada**: Comece a usar rapidamente com mínima configuração, especialmente otimizado para projetos Next.js.
- **Suporte a Componentes do Servidor**: Perfeitamente adequado para componentes do servidor Next.js, garantindo uma renderização do lado do servidor suave.
- **Roteamento Aprimorado**: Suporte total para o roteamento de aplicativos Next.js, adaptando-se perfeitamente a estruturas de aplicativos complexas.
- **Interoperabilidade**: Permite interoperabilidade com i18next. (beta)
