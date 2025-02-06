```typescript
import { t, enu, type DeclarationContent } from "intlayer";

export default {
  key: "my-key",
  content: {
    exampleText: t({
      en: "Example of content in English",
      fr: "Example de contenu en français",
      es: "Ejemplo de contenido en español",
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
} satisfies Dictionary;
```
