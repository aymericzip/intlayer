```ts
// src/components/Component.ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-component")
export class MyComponent extends LitElement {
  render() {
    const { title, content } = useIntlayer("component");
    return html`
      <div>
        <h2>${title}</h2>
        <p>${content}</p>
      </div>
    `;
  }
}
```
