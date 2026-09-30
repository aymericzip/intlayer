## What

TanStack Start showcase app. Uses `@intlayer/design-system` from its `dist`: rebuild the design system after editing it.

## RTL support

`<html dir>` is set from `getHTMLTextDir(locale)` in `src/routes/__root.tsx`. Check changes on an RTL locale (`ar`).

- Follow the design system RTL rules (`packages/@intlayer/design-system/CLAUDE.md`): logical utilities, `dir="ltr"` islands, `rtl-mirror-icons`.
- Code, shell commands, URLs and external content (showcased site previews, screenshots) stay LTR: add `dir="ltr"`.
- Positions computed in JS (framer-motion `x`, `translateX`, `left`) do not flip on their own:
  - Prefer logical CSS (`insetInlineStart`).
  - Otherwise multiply by a direction factor: `getHTMLTextDir(locale) === 'rtl' ? -1 : 1` with `useLocale()`, or read `getComputedStyle(element).direction` at runtime.
- A new horizontal keyframe loop must flip in RTL: reuse the `--loop-direction` pattern from `apps/website/src/globals.css`.
