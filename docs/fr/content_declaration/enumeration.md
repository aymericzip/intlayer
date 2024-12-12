# Énumération / Plurialisation

## Comment fonctionne l'énumération

Dans Intlayer, l'énumération est réalisée à l'aide de la fonction `enu`, qui associe des clés spécifiques à leur contenu correspondant. Ces clés peuvent représenter des valeurs numériques, des plages ou des identifiants personnalisés. Lorsqu'elle est utilisée avec React Intlayer ou Next Intlayer, le contenu approprié est automatiquement sélectionné en fonction de la langue de l'application et des règles définies.

## Configuration de l'énumération

Pour configurer l'énumération dans votre projet Intlayer, vous devez créer un module de contenu qui inclut des définitions d'énumération. Voici un exemple d'une énumération simple pour le nombre de voitures :

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Une voiture de moins",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

Dans cet exemple, `enu` associe diverses conditions à du contenu spécifique. Lorsqu'il est utilisé dans un composant React, Intlayer peut automatiquement choisir le contenu approprié en fonction de la variable donnée.

## Utilisation de l'énumération avec React Intlayer

Pour utiliser l'énumération dans un composant React, vous pouvez tirer parti du hook `useIntlayer` du package `react-intlayer`. Ce hook récupère le contenu correct basé sur l'ID spécifié. Voici un exemple de son utilisation :

```javascript
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Sortie : Aucune voiture */}
      <p>{content.numberOfCar(6)}</p> {/* Sortie : Quelques voitures */}
      <p>{content.numberOfCar(20)}</p> {/* Sortie : Quelques voitures */}
    </div>
  );
};

export default CarComponent;
```

Dans cet exemple, le composant ajuste dynamiquement sa sortie en fonction du nombre de voitures. Le contenu correct est choisi automatiquement, selon la plage spécifiée.

## Remarques importantes

- L'ordre de déclaration est crucial dans les énumérations Intlayer. La première déclaration valide est celle qui sera sélectionnée.
- Si plusieurs conditions s'appliquent, assurez-vous qu'elles sont correctement ordonnées pour éviter un comportement inattendu.

## Meilleures pratiques pour l'énumération

Pour garantir que vos énumérations fonctionnent comme prévu, suivez ces meilleures pratiques :

- **Nommage cohérent** : Utilisez des ID clairs et cohérents pour les modules d'énumération afin d'éviter la confusion.
- **Documentation** : Documentez vos clés d'énumération et leurs sorties attendues pour assurer une maintenance future.
- **Gestion des erreurs** : Implémentez une gestion des erreurs pour gérer les cas où aucune énumération valide n'est trouvée.
- **Optimiser les performances** : Pour les grandes applications, réduisez le nombre d'extensions de fichiers surveillées pour améliorer les performances.

## Ressources supplémentaires

Pour des informations plus détaillées sur la configuration et l'utilisation, référez-vous aux ressources suivantes :

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources fournissent des informations supplémentaires sur l'installation et l'utilisation d'Intlayer dans différents environnements et avec divers frameworks.

---
