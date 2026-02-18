---
name: intlayer-config
description: Configures Intlayer project settings and environment variables. Use when the user asks to "setup intlayer.config", "configure locales", or "customize Intlayer settings".
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Configuration

Configure Intlayer project settings and environment variables. Check these files to identify which locales are declared for the application, which helps in defining the appropriate content.

Supported configuration files:

- `intlayer.config.{ts|js|json|json5|jsonc|cjs|mjs}`
- `.intlayerrc`

It acts as the central brain for your application's internationalization strategy. It is divided into several specialized sections that control everything from language support to AI-powered translations.

### Internationalization

This section defines your language footprint.

- **Locales**: Define which languages you support (e.g., English, French, Spanish).
- **Default Locale**: Set the fallback language if a user's preference isn't found.

### Routing & middleware

Controls how users navigate between different languages.

### AI & Automation

Intlayer integrates with major AI providers (OpenAI, Anthropic, Gemini, etc.) to automate your workflow.

### Content & Dictionaries

Manages how and where your translation files are handled.

- **Import Mode**: Choose between **Static** (faster performance), **Dynamic** (lazy loading), or **Fetch** (live updates from a CMS).
- **Auto-Transformation**: Automatically convert Markdown or HTML strings into processed components.

### Editor & System

Settings for the visual workflow and internal plumbing.

## References

### Concepts

- [Configuration](references/concept_configuration.md)

### Packages

- [Intlayer getConfiguration](references/packages_intlayer_getConfiguration.md)
