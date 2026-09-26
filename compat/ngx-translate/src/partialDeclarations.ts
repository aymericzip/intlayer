import type * as i0 from '@angular/core';

/**
 * Argument types of Angular's partial-declaration functions.
 *
 * The public facade types omit `minVersion`, a field only the linker reads,
 * so each declaration literal is cast to its facade widened with it. The cast
 * vanishes at compile time: the linker still sees a plain object literal.
 */
type WithMinVersion<T> = T & { minVersion: string };

export type FactoryDeclaration = WithMinVersion<
  Parameters<typeof i0.ɵɵngDeclareFactory>[0]
>;
export type InjectableDeclaration = WithMinVersion<
  Parameters<typeof i0.ɵɵngDeclareInjectable>[0]
>;
export type PipeDeclaration = WithMinVersion<
  Parameters<typeof i0.ɵɵngDeclarePipe>[0]
>;
export type DirectiveDeclaration = WithMinVersion<
  Parameters<typeof i0.ɵɵngDeclareDirective>[0]
>;
