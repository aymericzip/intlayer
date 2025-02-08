# Documentation: `getEnumeration` Fonction dans `intlayer`

## Description

La fonction `getEnumeration` récupère le contenu correspondant à une quantité spécifique basée sur des conditions prédéfinies dans un objet d'énumération. Les conditions sont définies comme des clés, et leur priorité est déterminée par leur ordre dans l'objet.

## Paramètres:

- `enumerationContent: QuantityContent<Content>`

  - **Description**: Un objet où les clés représentent des conditions (par exemple, `<=`, `<`, `>=`, `=`) et les valeurs représentent le contenu correspondant. L'ordre des clés définit leur priorité de correspondance.
  - **Type**: `QuantityContent<Content>`
    - `Content` peut être de n'importe quel type.

- `quantity: number`

  - **Description**: La valeur numérique utilisée pour correspondre aux conditions dans `enumerationContent`.
  - **Type**: `number`

## Retourne:

- **Type**: `Content`
- **Description**: Le contenu correspondant à la première condition correspondante dans `enumerationContent`. Si aucune correspondance n'est trouvée, cela retourne par défaut en fonction de l'implémentation (par exemple, erreur ou contenu de sauvegarde).

## Exemple d'utilisation:

### Utilisation de base:

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Vous avez moins de -2.3",
    "<1": "Vous avez moins d'un",
    "2": "Vous avez deux",
    ">=3": "Vous avez trois ou plus",
  },
  2
);

console.log(content); // Output: "Vous avez deux"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Vous avez moins d'un",
    "2": "Vous avez deux",
    ">=3": "Vous avez trois ou plus",
  },
  2
);

console.log(content); // Output: "Vous avez deux"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Vous avez moins d'un",
    "2": "Vous avez deux",
    ">=3": "Vous avez trois ou plus",
  },
  2
);

console.log(content); // Output: "Vous avez deux"
```

### Priorité des conditions:

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Vous avez moins de quatre",
    "2": "Vous avez deux",
  },
  2
);

console.log(content); // Output: "Vous avez moins de quatre"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Vous avez moins de quatre",
    "2": "Vous avez deux",
  },
  2
);

console.log(content); // Output: "Vous avez moins de quatre"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Vous avez moins de quatre",
    "2": "Vous avez deux",
  },
  2
);

console.log(content); // Output: "Vous avez moins de quatre"
```

## Cas limites:

- **Aucune condition correspondante:**

  - Si aucune condition ne correspond à la quantité fournie, la fonction retournera soit `undefined` soit gérera explicitement le scénario par défaut/de sauvegarde.

- **Conditions ambiguës:**

  - Si les conditions se chevauchent, la première condition correspondante (selon l'ordre de l'objet) prend la priorité.

- **Clés invalides:**

  - La fonction suppose que toutes les clés dans `enumerationContent` sont valides et peuvent être analysées comme des conditions. Des clés invalides ou mal formatées peuvent entraîner des comportements inattendus.

- **Application de TypeScript:**
  - La fonction garantit que le type `Content` est cohérent à travers toutes les clés, permettant une sécurité de type dans le contenu récupéré.

## Notes

- L'utilitaire `findMatchingCondition` est utilisé pour déterminer la condition appropriée basée sur la quantité donnée.
