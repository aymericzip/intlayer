```tsx
// src/component/server/component.content.ts

import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "server-component",
  content: {
    title: t({
      en: "Title of my component",
      fr: "Titre de mon component",
      es: "Título de mi componente",
    }),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
} satisfies Dictionary;

export default componentContent;
```
