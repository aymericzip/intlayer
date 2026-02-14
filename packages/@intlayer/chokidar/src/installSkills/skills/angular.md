---
name: intlayer-angular
description: Integrates Intlayer internationalization with Angular applications. Use when the user asks to "setup Angular i18n", implement "ContentSelectorWrapperComponent", or use the "useIntlayer" composable in Angular.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: @intlayer/mcp
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
  version: 8.1.2
---

# Intlayer Angular Usage

## Setup

- [Angular](https://intlayer.org/doc/environment/angular.md)

## useIntlayer Composable

```typescript
import { Component } from "@angular/core";
import { useIntlayer, ContentSelectorWrapperComponent } from "angular-intlayer";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [ContentSelectorWrapperComponent],
  template: `
    <div>
      <h1>
        <!-- Render the visual editor -->
        <app-content-selector-wrapper
          [dictionaryKey]="content().title.dictionaryKey"
          [keyPath]="content().title.keyPath"
        >
          {{ content().title }}
        </app-content-selector-wrapper>
      </h1>
      <h1>
        <!-- Render as string -->
        {{ content().title }}
      </h1>
      <img
        [src]="content().image.src.value"
        [alt]="content().image.alt.value"
      />
    </div>
  `,
})
export class ExampleComponent {
  content = useIntlayer("my-dictionary-key");
}
```

[Angular Documentation](https://intlayer.org/doc/packages/angular-intlayer.md)
