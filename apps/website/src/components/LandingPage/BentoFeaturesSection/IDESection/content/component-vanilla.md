```js
// src/components/component.js
import { getIntlayer } from "intlayer";

const { title, content } = getIntlayer("component");

document.querySelector("h2").textContent = title;
document.querySelector("p").textContent = content;
```
