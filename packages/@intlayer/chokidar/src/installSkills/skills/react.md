---
name: React
description: React-specific syntax and hooks usage
---

# Intlayer React Usage

## Setup

- [Vite and React](https://intlayer.org/doc/environment/vite-and-react.md)
- [Create React App](https://intlayer.org/doc/environment/create-react-app.md)
- [React Native and Expo](https://intlayer.org/doc/environment/react-native-and-expo.md)
- [Vite and React (React Router v7)](https://intlayer.org/doc/environment/vite-and-react/react-router-v7.md)
- [Lynx and React](https://intlayer.org/doc/environment/lynx-and-react.md)
- [Page Metadata](https://intlayer.org/doc/environment/react-intlayer/page-metadata.md)
- [Sitemap](https://intlayer.org/doc/environment/react-intlayer/sitemap.md)
- [Server Actions](https://intlayer.org/doc/environment/react-intlayer/server-actions.md)

## useIntlayer Hook

```tsx
import { useIntlayer } from "react-intlayer";
const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");
  return (
    <div>
      <h1>{content.title}</h1>
      <img src={content.image.src.value} alt={content.image.alt.value} />
    </div>
  );
};
```

[React Documentation](https://intlayer.org/doc/packages/react-intlayer.md)
