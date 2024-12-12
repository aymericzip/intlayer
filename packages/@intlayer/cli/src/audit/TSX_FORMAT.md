```tsx
import React, { type ReactNode } from "react";
import { t, enu, type DeclarationContent } from "intlayer";

export default {
  key: "my-key",
  content: {
    exampleText: t({
      en: "Example of content in English",
      fr: "Example de contenu en français",
      es: "Ejemplo de contenido en español",
    }),
    exampleOfReactNode: t<ReactNode>({
      en: <h1>Example of ReactNode in English</h1>,
      fr: <h1>Example de ReactNode en français</h1>,
      es: <h1>Ejemplo de ReactNode en español</h1>,
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies DeclarationContent;
```
