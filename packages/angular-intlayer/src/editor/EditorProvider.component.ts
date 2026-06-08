import { Component } from '@angular/core';
import { useEditor } from './useEditor';

/**
 * Drop-in Angular equivalent of React's `EditorProvider`.
 *
 * Wrap your root component (or any subtree) with this component to automatically
 * start the Intlayer editor client.  The editor will be started on mount and
 * stopped when this component is destroyed.
 *
 * @example
 * ```html
 * <!-- app.component.html -->
 * <intlayer-editor-provider>
 *   <router-outlet />
 * </intlayer-editor-provider>
 * ```
 *
 * ```ts
 * // app.component.ts
 * import { EditorProviderComponent } from 'angular-intlayer';
 *
 * @Component({
 *   imports: [EditorProviderComponent],
 *   …
 * })
 * export class AppComponent {}
 * ```
 */
@Component({
  selector: 'intlayer-editor-provider',
  standalone: true,
  template: `<ng-content />`,
})
export class EditorProviderComponent {
  constructor() {
    useEditor();
  }
}
