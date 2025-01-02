# Intlayer: A closer way to translate your application

**Intlayer** is an internationalization library designed specifically for JavaScript developers. It allow the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, **Intlayer** make your development stronger and more efficient.

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

## Why Choose Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.
- **Simplified Setup**: Get up and running quickly with minimal configuration, especially optimized for Next.js projects.
- **Server Component Support**: Perfectly suited for Next.js server components, ensuring smooth server-side rendering.
- **Enhanced Routing**: Full support for Next.js app routing, adapting seamlessly to complex application structures.
- **Interoperability**: Allow interoperability with [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-intl.md), and [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-intl.md).
