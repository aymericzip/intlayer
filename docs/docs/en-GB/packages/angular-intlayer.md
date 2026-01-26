---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer Package Documentation
description: Angular-specific integration for Intlayer, providing providers and services for Angular applications.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# angular-intlayer Package

The `angular-intlayer` package provides the necessary tools to integrate Intlayer into Angular applications. It includes providers and services for handling multilingual content.

## Installation

```bash
npm install angular-intlayer
```

## Exports

### Setup

| Function          | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `provideIntlayer` | Function to provide Intlayer in your Angular application. |

### Services

| Service           | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| `IntlayerService` | Service that selects a dictionary by its key and returns its content. |
| `LocaleService`   | Service that returns the current locale and a function to set it.     |

### Components

| Component                   | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `IntlayerMarkdownComponent` | Angular component that renders Markdown content. |
