```tsx
// src/component/client/component.content.ts

import { t, type DeclarationContent } from "intlayer";

const componentContent: DeclarationContent = {
  id: "component",
  title: t({
    en: "Title of my component",
    fr: "Titre de mon component",
    es: "Título de mi componente",
  }),
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export default componentContent;
```
