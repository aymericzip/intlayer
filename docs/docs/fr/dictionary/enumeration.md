---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Énumération
description: Découvrez comment déclarer et utiliser des énumérations dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - Énumération
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Énumération / Plurielisation

## Comment fonctionne l'énumération

Dans Intlayer, l'énumération est réalisée grâce à la fonction `enu`, qui associe des clés spécifiques à leur contenu correspondant. Ces clés peuvent représenter des valeurs numériques, des plages ou des identifiants personnalisés. Lorsqu'elle est utilisée avec React Intlayer ou Next Intlayer, le contenu approprié est automatiquement sélectionné en fonction de la locale de l'application et des règles définies.

## Configuration de l'énumération

Pour configurer une énumération dans votre projet Intlayer, vous devez créer un module de contenu qui inclut les définitions d'énumération. Voici un exemple d'une énumération simple pour le nombre de voitures :

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Moins d'une voiture en dessous de moins un",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
      "fallback": "Valeur de secours", // Optionnel
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Moins d'une voiture en dessous de moins un",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
      "fallback": "Valeur de secours", // Optionnel
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Moins d'une voiture en dessous de moins un",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
      "fallback": "Valeur de secours", // Optionnel
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Moins d'une voiture en dessous de moins un",
        "-1": "Moins une voiture",
        "0": "Aucune voiture",
        "1": "Une voiture",
        ">5": "Quelques voitures",
        ">19": "Beaucoup de voitures",
        "fallback": "Valeur de secours" // Optionnel
      }
    }
  }
}
```

Dans cet exemple, `enu` associe différentes conditions à un contenu spécifique. Lorsqu'il est utilisé dans un composant React, Intlayer peut automatiquement choisir le contenu approprié en fonction de la variable donnée.

> L'ordre de déclaration est important dans les énumérations Intlayer. La première déclaration valide est celle qui sera prise en compte. Si plusieurs conditions s'appliquent, assurez-vous qu'elles sont ordonnées correctement pour éviter un comportement inattendu.

> Si aucun fallback n'est déclaré, la fonction retournera `undefined` si aucune clé ne correspond.

## Utilisation des énumérations avec React Intlayer

Pour utiliser une énumération dans un composant React, vous pouvez utiliser le hook `useIntlayer` du package `react-intlayer`. Ce hook récupère le contenu correct en fonction de l'ID spécifié. Voici un exemple d'utilisation :

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Résultat : Aucune voiture
        }
      </p>
      <p>
        {
          numberOfCar(6) // Résultat : Quelques voitures
        }
      </p>
      <p>
        {
          numberOfCar(20) // Résultat : Beaucoup de voitures
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Résultat : Valeur de secours
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Résultat : Pas de voitures
        }
      </p>
      <p>
        {
          numberOfCar(6) // Résultat : Quelques voitures
        }
      </p>
      <p>
        {
          numberOfCar(20) // Résultat : Beaucoup de voitures
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Résultat : Valeur de secours
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Résultat : Pas de voitures
        }
      </p>
      <p>
        {
          numberOfCar(6) // Résultat : Quelques voitures
        }
      </p>
      <p>
        {
          numberOfCar(20) // Résultat : Beaucoup de voitures
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Résultat : Valeur de secours
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

Dans cet exemple, le composant ajuste dynamiquement sa sortie en fonction du nombre de voitures. Le contenu correct est choisi automatiquement, selon la plage spécifiée.

## Ressources supplémentaires

Pour des informations plus détaillées sur la configuration et l'utilisation, consultez les ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources fournissent des informations complémentaires sur la configuration et l'utilisation d'Intlayer dans différents environnements et avec divers frameworks.
