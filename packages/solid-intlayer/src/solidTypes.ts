/**
 * Types valid against both Solid majors. `solid-js` 2 no longer exports the
 * `JSX` namespace (it moved to `@solidjs/web`), so published declarations must
 * never import `JSX` or `JSXElement` from `solid-js`: they derive what they
 * need from `Component` and `ComponentProps`, which both majors export.
 */
import type { Component, ComponentProps, ValidComponent } from 'solid-js';

/**
 * Anything a component can render: `JSX.Element` in Solid 1, `Element` in
 * Solid 2.
 */
export type SolidElement = ReturnType<Component>;

/**
 * Props of the intrinsic element `Tag`. Solid 1 types them in `solid-js`;
 * Solid 2 keeps DOM attribute types in its web runtime, which this package
 * cannot import, so they stay open there.
 */
export type IntrinsicElementProps<Tag extends string> =
  Tag extends ValidComponent
    ? ComponentProps<Tag>
    : { [attribute: string]: any; children?: SolidElement };
