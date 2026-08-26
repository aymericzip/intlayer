```ts
// src/components/Component.ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
  render() {
    return html`
      <div>
        <h2>Intlayer Compiler</h2>
        <p>
          The Intlayer Compiler extracts automatically the content from the
          components and generates the dictionary files.
        </p>
      </div>
    `;
  }
}
```
