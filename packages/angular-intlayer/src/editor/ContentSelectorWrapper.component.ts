import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  Input,
  type OnInit,
  signal,
} from '@angular/core';
import { isSameKeyPath } from '@intlayer/core/utils';
import { MessageKey } from '@intlayer/types/messageKey';
import { NodeType } from '@intlayer/types/nodeType';
import { useFocusDictionary } from './focusDictionary';
import {
  getEditorStateManager,
  installIntlayerEditor,
} from './installIntlayerEditor';

@Component({
  selector: 'app-content-selector-wrapper',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ng-container *ngIf="isInIframe(); else plainContent">
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
  private manager = getEditorStateManager();

  readonly isInIframe = signal(
    typeof window !== 'undefined' && window.self !== window.top
  );

  ngOnInit() {
    if (this.isInIframe()) {
      installIntlayerEditor();
    }
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

  handlePress() {
    this.focusDictionary.setFocusedContent?.({
      dictionaryKey: this.dictionaryKey,
      keyPath: this.filteredKeyPath,
    });
  }

  handleHover() {
    this.manager?.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      {
        dictionaryKey: this.dictionaryKey,
        keyPath: this.filteredKeyPath,
      }
    );
  }

  handleUnhover() {
    this.manager?.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      null
    );
  }
}
