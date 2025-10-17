import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import type { Locales } from '@intlayer/config/client';
import { type ContentNode, getContent, type KeyPath } from '@intlayer/core';
import { useEditedContentRenderer } from './useEditedContentRenderer';

export interface EditedContentRendererProps {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: Locales;
}

@Component({
  selector: 'app-edited-content-renderer',
  standalone: true,
  imports: [CommonModule],
  template: ` <span [innerHTML]="renderedContent()"></span> `,
})
export class EditedContentRendererComponent {
  @Input() dictionaryKey!: string;
  @Input() keyPath!: KeyPath[];
  @Input() locale?: Locales;

  private fallback = signal('');

  private rawContent = computed(() => {
    return useEditedContentRenderer(
      this.dictionaryKey,
      this.keyPath,
      this.fallback
    );
  });

  /**
   * Object → getContent → string, same as the React version.
   */
  renderedContent = computed(() => {
    const rawContentValue = this.rawContent();

    if (typeof rawContentValue === 'object' && rawContentValue !== null) {
      const transformed = getContent(
        rawContentValue as ContentNode,
        {
          dictionaryKey: this.dictionaryKey,
          keyPath: this.keyPath,
        },
        this.locale
      );

      if (typeof transformed !== 'string') {
        console.error(
          `Incorrect edited content format. Content type: ${typeof transformed}. Expected string. Value ${JSON.stringify(
            transformed
          )}`
        );
        return this.fallback();
      }
      return transformed;
    }

    return rawContentValue() as string;
  });
}
