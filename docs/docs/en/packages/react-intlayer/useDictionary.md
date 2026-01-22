---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useDictionary Hook Documentation | react-intlayer
description: See how to use the useDictionary hook for react-intlayer package
keywords:
  - useDictionary
  - dictionary
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# useDictionary Hook Documentation

The `useDictionary` hook allows you to process an object that looks like a dictionary (containing keys and content) and handle translations, enumerations, etc., within it. Unlike `useIntlayer`, which is designed to work with generated dictionary declarations, `useDictionary` is more flexible and can be used with any object that follows the dictionary structure.

## Usage

```tsx
import { useDictionary } from "react-intlayer";
import { t } from "intlayer";

const MyComponent = () => {
  const content = useDictionary({
    key: "my_key",
    content: {
      myTranslation: t({
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  });

  return (
    <div>
      <p>{content.myTranslation}</p>
    </div>
  );
};
```

## Description

The hook performing the following tasks:

1. **Locale Detection**: It uses the current locale from the `IntlayerProvider` context.
2. **Translation Processing**: it resolves the content based on the detected locale, processing any `t()`, `enu()`, etc., definitions found within the object.
3. **Flexible Content**: It works directly with the object passed to it, making it ideal for dynamic content or objects that are not part of the standard pre-built dictionaries.
