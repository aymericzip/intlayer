## What

TanStack Start marketing + docs site (deployed at intlayer.org). Uses `@intlayer/design-system` from its `dist`: rebuild the design system after editing it.

## RTL support

`<html dir>` is set from `getHTMLTextDir(locale)` in `src/routes/__root.tsx`. Check changes on an RTL locale (`/ar`).

- Follow the design system RTL rules (`packages/@intlayer/design-system/CLAUDE.md`).
