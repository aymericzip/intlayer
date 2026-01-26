---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider Component Documentation | react-intlayer
description: See how to use the IntlayerProvider component for the react-intlayer package
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Init doc
---

# IntlayerProvider Component Documentation

The `IntlayerProvider` component is the primary provider for Intlayer in React applications. It supplies the Intlayer context to all of its child components.

## Usage

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Props

| Prop              | Type                              | Description                                    |
| ----------------- | --------------------------------- | ---------------------------------------------- |
| `locale`          | `LocalesValues`                   | The initial locale to use.                     |
| `defaultLocale`   | `LocalesValues`                   | The default locale to use as a fallback.       |
| `setLocale`       | `(locale: LocalesValues) => void` | A custom function to set the locale.           |
| `disableEditor`   | `boolean`                         | Whether to disable the editor.                 |
| `isCookieEnabled` | `boolean`                         | Whether to enable cookies to store the locale. |
