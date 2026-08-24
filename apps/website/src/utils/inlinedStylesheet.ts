/**
 * Marks a `<style>` element that `scripts/inline-critical-css.ts` substituted
 * for a stylesheet `<link>` in a prerendered page.
 *
 * Both halves of that swap need the same marker: the build step writes it, and
 * `__root.tsx` reads it back in the browser to decide whether the `<link>`
 * still has to be rendered. Keeping it here means neither side can drift.
 *
 * An attribute rather than an id because a page may carry more than one
 * stylesheet, and every substituted element has to be findable without any two
 * of them colliding.
 */
export const INLINED_STYLESHEET_ATTRIBUTE = 'data-inlined-stylesheet';

/**
 * True when the document already carries its stylesheets inline.
 *
 * Always false on the server, so server-rendered markup keeps emitting the
 * `<link>` — that is what the build step looks for, and what any route the
 * prerender did not cover continues to be served with.
 */
export const hasInlinedStylesheet = (): boolean =>
  typeof document !== 'undefined' &&
  document.querySelector(`[${INLINED_STYLESHEET_ATTRIBUTE}]`) !== null;
