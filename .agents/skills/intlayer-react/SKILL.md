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

- [Vite and React](references/environment_vite-and-react.md)
- [Create React App](references/environment_create-react-app.md)
- [React Router v7](references/environment_vite-and-react_react-router-v7.md)
- [React Router v7 (fs routes)](references/environment_vite-and-react_react-router-v7-fs-routes.md)
- [Tanstack Start](references/environment_tanstack-start.md)
- [React Native and Expo](references/environment_react-native-and-expo.md)
- [Lynx and React](references/environment_lynx-and-react.md)

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

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Vite and React](references/environment_vite-and-react.md)
- [Create React App](references/environment_create-react-app.md)
- [Vite and React (React Router v7)](references/environment_vite-and-react_react-router-v7.md)
- [Vite and React (React Router v7 FS Routes)](references/environment_vite-and-react_react-router-v7-fs-routes.md)

### Packages

- [Intlayer Exports](references/packages_intlayer_exports.md)
- [React Intlayer Provider](references/packages_react-intlayer_IntlayerProvider.md)
- [React Intlayer MarkdownRenderer](references/packages_react-intlayer_MarkdownRenderer.md)
- [React Intlayer Exports](references/packages_react-intlayer_exports.md)
- [React Intlayer T](references/packages_react-intlayer_t.md)
- [React Intlayer useDictionary](references/packages_react-intlayer_useDictionary.md)
- [React Intlayer useI18n](references/packages_react-intlayer_useI18n.md)
- [React Intlayer useIntlayer](references/packages_react-intlayer_useIntlayer.md)
- [React Intlayer useLocale](references/packages_react-intlayer_useLocale.md)
