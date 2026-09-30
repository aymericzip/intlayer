## What

Chrome extension (Vite + React popup) that inspects the i18n setup of the current website and runs an Intlayer scan through the backend. UI built with `@intlayer/design-system`.

## RTL support

The popup sets `document.documentElement.dir = getHTMLTextDir(locale)` in `src/popup/App.tsx`. Check changes with an RTL locale (`ar`).

- Follow the design system RTL rules (`packages/@intlayer/design-system/CLAUDE.md`): logical utilities, `dir="ltr"` islands, `rtl-mirror-icons`.
- Data read from the inspected page (URLs, hostnames, HTML tags, locale codes, `hreflang` values, code) stays LTR: add `dir="ltr"`.
- Positions computed in JS do not flip on their own: prefer logical CSS (`insetInlineStart`), otherwise read `getComputedStyle(element).direction` at runtime.
- Content scripts run inside the inspected page: never assume its `dir`, and set `dir` explicitly on any injected UI.
