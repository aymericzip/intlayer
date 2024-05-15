```tsx
// src/component/component.content.ts

import { t, type DeclarationContent } from "intlayer";

const componentContent: DeclarationContent = {
  id: "component",
  title: t({
    en: "Title of my component",
    fr: "Titre de mon component",
    es: "Título de mi componente",
  }),
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export default componentContent;
```
