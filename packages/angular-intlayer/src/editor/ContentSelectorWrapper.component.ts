import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { isSameKeyPath, type NodeProps } from '@intlayer/core';
import { ContentSelectorComponent } from '../UI/ContentSelector.component';
import { useEditorEnabled } from './editorEnabled';
import { useFocusDictionary } from './focusDictionary';
import { useEditor } from './useEditor';

/**
 * Combine your NodeProps (which include dictionaryKey & keyPath)
 * with any other div-like attributes.
 */
export interface ContentSelectorWrapperProps extends NodeProps {
  [key: string]: any;
}

@Component({
  selector: 'app-content-selector-wrapper',
  standalone: true,
  imports: [CommonModule, ContentSelectorComponent],
  template: `
    <app-content-selector
      *ngIf="enabled()"
      (press)="handleSelect()"
      [isSelecting]="isSelected()"
    >
      <ng-content></ng-content>
    </app-content-selector>
    <ng-content *ngIf="!enabled()"></ng-content>
  `,
})
export class ContentSelectorWrapperComponent {
  @Input() dictionaryKey!: string;
  @Input() keyPath!: any[];

  // pull in the editor state & focus API
  private focusDictionary = useFocusDictionary();
  private editorEnabled = useEditorEnabled();

  constructor() {
    useEditor();
  }

  // compute whether this node is the current focus
  isSelected = computed(() => {
    const focusedContent = this.focusDictionary.focusedContent();
    return (
      focusedContent?.dictionaryKey === this.dictionaryKey &&
      (focusedContent.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(focusedContent.keyPath ?? [], this.keyPath)
    );
  });

  enabled = computed(() => this.editorEnabled.enabled());

  // when the selector is clicked, update focus
  handleSelect() {
    this.focusDictionary.setFocusedContent({
      dictionaryKey: this.dictionaryKey,
      keyPath: this.keyPath,
    });
  }
}
