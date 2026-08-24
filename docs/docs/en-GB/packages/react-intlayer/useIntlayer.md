---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer Hook Documentation | react-intlayer
description: See how to use the useIntlayer hook for react-intlayer package
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# React Integration: `useIntlayer` Hook Documentation

This section provides detailed guidance on using the `useIntlayer` hook within React applications, allowing for efficient content localisation.

## Example Usage in React

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Additional Resources

- **Intlayer Visual Editor**: For a more intuitive content management experience, refer to the visual editor documentation [here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md).

This section specifically targets the integration of the `useIntlayer` hook in React applications, simplifying the localisation process and ensuring content consistency across different locales.
