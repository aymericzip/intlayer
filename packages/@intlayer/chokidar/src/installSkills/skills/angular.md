# Intlayer Angular Usage

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

[Angular Documentation](https://intlayer.org/doc/packages/angular-intlayer)
