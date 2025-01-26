# Énumération / Plurielisation

## Comment fonctionne l'Énumération

Dans Intlayer, l'énumération est réalisée grâce à la fonction `enu`, qui associe des clés spécifiques à leur contenu correspondant. Ces clés peuvent représenter des valeurs numériques, des plages ou des identifiants personnalisés. Lorsqu'elle est utilisée avec React Intlayer ou Next Intlayer, le contenu approprié est automatiquement sélectionné en fonction de la locale de l'application et des règles définies.

## Configuration de l'Énumération

Pour configurer l'énumération dans votre projet Intlayer, vous devez créer un module de contenu qui inclut des définitions d'énumération. Voici un exemple d'une énumération simple pour le nombre de voitures :

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
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
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures"
    }
  }
}
```

Dans cet exemple, `enu` associe diverses conditions à un contenu spécifique. Lorsqu'il est utilisé dans un composant React, Intlayer peut automatiquement choisir le contenu approprié en fonction de la variable donnée.

## Utiliser l'Énumération avec React Intlayer

Pour utiliser l'énumération dans un composant React, vous pouvez utiliser le hook `useIntlayer` du package `react-intlayer`. Ce hook récupère le contenu correct en fonction de l'ID spécifié. Voici un exemple de la façon de l'utiliser :

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Sortie : Aucune voiture */}
      <p>{content.numberOfCar(6)}</p> {/* Sortie : Quelques voitures */}
      <p>{content.numberOfCar(20)}</p> {/* Sortie : Beaucoup de voitures */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Sortie : Aucune voiture */}
      <p>{content.numberOfCar(6)}</p> {/* Sortie : Quelques voitures */}
      <p>{content.numberOfCar(20)}</p> {/* Sortie : Beaucoup de voitures */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Sortie : Aucune voiture */}
      <p>{content.numberOfCar(6)}</p> {/* Sortie : Quelques voitures */}
      <p>{content.numberOfCar(20)}</p> {/* Sortie : Beaucoup de voitures */}
    </div>
  );
};

module.exports = CarComponent;
```

Dans cet exemple, le composant ajuste dynamiquement sa sortie en fonction du nombre de voitures. Le contenu correct est choisi automatiquement, selon la plage spécifiée.

## Remarques Importantes

- L'ordre de déclaration est crucial dans les énumérations Intlayer. La première déclaration valide est celle qui sera retenue.
- Si plusieurs conditions s'appliquent, assurez-vous qu'elles sont correctement ordonnées pour éviter un comportement inattendu.

## Bonnes Pratiques pour l'Énumération

Pour garantir que vos énumérations fonctionnent comme prévu, suivez ces bonnes pratiques :

- **Nommage Cohérent** : Utilisez des ID clairs et cohérents pour les modules d'énumération afin d'éviter toute confusion.
- **Documentation** : Documentez vos clés d'énumération et leurs sorties attendues pour assurer une maintenabilité future.
- **Gestion des Erreurs** : Implémentez une gestion des erreurs pour gérer les cas où aucune énumération valide n'est trouvée.
- **Optimiser les Performances** : Pour les grandes applications, réduisez le nombre d'extensions de fichiers surveillées pour améliorer les performances.

## Ressources Supplémentaires

Pour des informations plus détaillées sur la configuration et l'utilisation, référez-vous aux ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources fournissent des informations supplémentaires sur la configuration et l'utilisation d'Intlayer dans différents environnements et avec divers frameworks.
