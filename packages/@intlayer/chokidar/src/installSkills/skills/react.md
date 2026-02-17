---
name: intlayer-react
description: Integrates Intlayer internationalization with React component. Use when the user asks to "setup React i18n", create a new translated component, use the "useIntlayer" hook, or configure providers.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, react, vite]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
  version: 8.1.2
---

# Intlayer React Usage

## Core Philosophy

Intlayer promotes **Component-Level Content Declaration**. Instead of a massive global translation file, content is declared in `*.content.ts` files adjacent to the React components that use them.

## Workflow

To create a translated component, you need two files:

1.  **Declaration:** A content file (e.g., `myComponent.content.ts`) defining the dictionary.
2.  **Implementation:** A React component (e.g., `MyComponent.tsx`) using the `useIntlayer` hook.

### 1. Declare Content

Create a content file using `t()` for translations.
**File:** `src/components/MyComponent/myComponent.content.ts`

```typescript
import { t, type Dictionary } from "intlayer";

const content = {
  // The 'key' must be unique and matches what you pass to useIntlayer()
  key: "my-component",
  content: {
    text: t({
      en: "Welcome",
      fr: "Bienvenue",
      es: "Hola",
      // ... All other locales set in intlayer config file
    }),
  },
} satisfies Dictionary;

export default content;
```

# Intlayer React Usage

## Setup

- [Vite and React](https://intlayer.org/doc/environment/vite-and-react.md)
- [Create React App](https://intlayer.org/doc/environment/create-react-app.md)
- [React Router v7](https://intlayer.org/doc/environment/vite-and-react/react-router-v7.md)
- [React Router v7 (fs routes)](https://intlayer.org/doc/environment/vite-and-react/react-router-v7-fs-routes.md)
- [Tanstack Start](https://intlayer.org/doc/environment/tanstack-start.md)
- [React Native and Expo](https://intlayer.org/doc/environment/react-native-and-expo.md)
- [Lynx and React](https://intlayer.org/doc/environment/lynx-and-react.md)

## useIntlayer Hook

```tsx
import { useIntlayer } from "react-intlayer";
const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");
  return (
    <div>
      <h1>
        {/* Return react node */}
        {content.text}
      </h1>
      {/* Return string (.value) */}
      <img src={content.text.value} alt={content.text.value} />
    </div>
  );
};
```

## References

### Environments

- [Vite and React](https://intlayer.org/doc/environment/vite-and-react.md)
- [Create React App](https://intlayer.org/doc/environment/create-react-app.md)
- [Vite and React (React Router v7)](https://intlayer.org/doc/environment/vite-and-react/react-router-v7.md)
- [Vite and React (React Router v7 FS Routes)](https://intlayer.org/doc/environment/vite-and-react/react-router-v7-fs-routes.md)

### Packages

- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [React Intlayer Provider](https://intlayer.org/doc/packages/react-intlayer/IntlayerProvider.md)
- [React Intlayer MarkdownRenderer](https://intlayer.org/doc/packages/react-intlayer/MarkdownRenderer.md)
- [React Intlayer Exports](https://intlayer.org/doc/packages/react-intlayer/exports.md)
- [React Intlayer T](https://intlayer.org/doc/packages/react-intlayer/t.md)
- [React Intlayer useDictionary](https://intlayer.org/doc/packages/react-intlayer/useDictionary.md)
- [React Intlayer useI18n](https://intlayer.org/doc/packages/react-intlayer/useI18n.md)
- [React Intlayer useIntlayer](https://intlayer.org/doc/packages/react-intlayer/useIntlayer.md)
- [React Intlayer useLocale](https://intlayer.org/doc/packages/react-intlayer/useLocale.md)
