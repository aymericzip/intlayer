```ts
// src/app/component.component.ts
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-component",
  template: `
    <div>
      <h2>{{ content.title }}</h2>
      <p>{{ content.content }}</p>
    </div>
  `,
})
export class MyComponent {
  content = useIntlayer("component");
}
```
