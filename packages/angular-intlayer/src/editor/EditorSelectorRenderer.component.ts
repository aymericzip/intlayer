import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type { NodeProps } from '@intlayer/core';
import { ContentSelectorWrapperComponent } from './ContentSelectorWrapper.component';
import { EditedContentRendererComponent } from './EditedContentRenderer.component';

/**
 * Combine your NodeProps (which include dictionaryKey & keyPath)
 * with any other div-like attributes.
 */
export interface EditorSelectorRendererProps extends NodeProps {
  [key: string]: any;
}

@Component({
  selector: 'app-editor-selector-renderer',
  standalone: true,
  imports: [
    CommonModule,
    ContentSelectorWrapperComponent,
    EditedContentRendererComponent,
  ],
  template: `
    <app-content-selector-wrapper
      [dictionaryKey]="dictionaryKey"
      [keyPath]="keyPath"
    >
      <app-edited-content-renderer
        [dictionaryKey]="dictionaryKey"
        [keyPath]="keyPath"
      >
        <ng-content></ng-content>
      </app-edited-content-renderer>
    </app-content-selector-wrapper>
  `,
})
export class EditorSelectorRendererComponent {
  @Input() dictionaryKey!: string;
  @Input() keyPath!: any[];
}
