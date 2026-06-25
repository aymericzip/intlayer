---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary Hook - React Intlayer Documentation
description: Complete guide for using the useDictionary hook in React applications with Intlayer for efficient handling of localised content without visual editor.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localisation
  - i18n
  - dictionary
  - translation
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initial history"
author: aymericzip
---

# React Integration: `useDictionary` Hook Documentation

This section provides detailed guidance on using the `useDictionary` hook within React applications, enabling efficient handling of localised content without a visual editor.

## Example Usage in React

Below is an example of how to use the `useDictionary` hook in a React component:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Additional Tips

- **Type Safety**: Always use `Dictionary` to define your dictionaries to ensure type safety.
- **Localisation Updates**: When updating content, ensure all locales are consistent to avoid missing translations.

This documentation focuses on the integration of the `useDictionary` hook, providing a streamlined approach to managing localised content without relying on visual editor functionalities.
