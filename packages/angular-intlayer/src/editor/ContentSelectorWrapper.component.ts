import { CommonModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/common';
import { Component, computed, Input, type OnInit } from '@angular/core';
import type { NodeProps } from '@intlayer/core/interpreter';
import { isSameKeyPath } from '@intlayer/core/utils';
import { defineIntlayerElements, MessageKey } from '@intlayer/editor';
import { NodeType } from '@intlayer/types/nodeType';
import { useEditorEnabled } from './editorEnabled';
import { useFocusDictionary } from './focusDictionary';
import { getEditorStateManager } from './installIntlayerEditor';

@Component({
  selector: 'app-content-selector-wrapper',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ng-container *ngIf="enabled(); else plainContent">
      <intlayer-content-selector
        [attr.is-selecting]="isSelected() || null"
        (intlayer:press)="handlePress()"
        (intlayer:hover)="handleHover()"
        (intlayer:unhover)="handleUnhover()"
      >
        <ng-content></ng-content>
      </intlayer-content-selector>
    </ng-container>
    <ng-template #plainContent>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class ContentSelectorWrapperComponent implements OnInit {
  @Input() dictionaryKey!: string;
  @Input() keyPath!: any[];

  private focusDictionary = useFocusDictionary();
  private editorEnabled = useEditorEnabled();
  private manager = getEditorStateManager();

  ngOnInit() {
    defineIntlayerElements();
  }

  get filteredKeyPath() {
    return this.keyPath.filter((key) => key.type !== NodeType.Translation);
  }

  isSelected = computed(() => {
    const focused = this.focusDictionary.focusedContent();
    return (
      focused?.dictionaryKey === this.dictionaryKey &&
      (focused.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(focused.keyPath ?? [], this.filteredKeyPath)
    );
  });

  enabled = computed(() => this.editorEnabled.enabled());

  handlePress() {
    this.focusDictionary.setFocusedContent?.({
      dictionaryKey: this.dictionaryKey,
      keyPath: this.filteredKeyPath,
    });
  }

  handleHover() {
    this.manager?.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      { dictionaryKey: this.dictionaryKey, keyPath: this.filteredKeyPath }
    );
  }

  handleUnhover() {
    this.manager?.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      null
    );
  }
}
