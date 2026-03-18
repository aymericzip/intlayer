import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-content-selector-wrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <intlayer-content-selector-wrapper
      [attr.key-path]="keyPathJson"
      [attr.dictionary-key]="dictionaryKey"
    >
      <ng-content></ng-content>
    </intlayer-content-selector-wrapper>
  `,
})
export class ContentSelectorWrapperComponent {
  @Input() dictionaryKey!: string;
  @Input() keyPath!: any[];

  get keyPathJson() {
    return JSON.stringify(this.keyPath);
  }
}
