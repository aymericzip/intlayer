---
name: intlayer-react
description: Integrates Intlayer internationalization with React applications. Use when the user asks to "setup React i18n", use the "useIntlayer" hook, or configure React Router with Intlayer.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: @intlayer/mcp
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
  version: 8.1.2
---

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
        {content.title}
      </h1>
      {/* Return string (.value) */}
      <img src={content.image.src.value} alt={content.image.alt.value} />
    </div>
  );
};
```
