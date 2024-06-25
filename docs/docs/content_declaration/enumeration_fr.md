# Documentation de l'énumération Intlayer

## Vue d'ensemble

L'énumération dans Intlayer permet aux développeurs de définir du contenu structuré avec plusieurs variations basées sur des conditions ou des seuils spécifiques. Cela est utile pour des scénarios tels que la pluralisation, les plages numériques ou l'énumération générale basée sur le contenu. En utilisant les énumérations, vous pouvez créer un contenu dynamique et adaptable aux conditions variables, telles que le changement de langue ou les différents nombres d'éléments.

## Fonctionnement de l'énumération

Dans Intlayer, l'énumération est réalisée grâce à la fonction `enu`, qui associe des clés spécifiques à leur contenu correspondant. Ces clés peuvent représenter des valeurs numériques, des plages ou des identifiants personnalisés. Lorsqu'elle est utilisée avec React Intlayer ou Next Intlayer, le contenu approprié est automatiquement sélectionné en fonction de la locale de l'application et des règles définies.

## Mise en place de l'énumération

Pour configurer l'énumération dans votre projet Intlayer, vous devez créer un module de contenu qui inclut les définitions d'énumération. Voici un exemple d'énumération simple pour le nombre de voitures :

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration: DeclarationContent = {
  id: "car_count",
  numberOfCar: enu({
    "<-1": "Moins d'une voiture",
    "-1": "Moins une voiture",
    "0": "Aucune voiture",
    "1": "Une voiture",
    ">5": "Quelques voitures",
    ">19": "Beaucoup de voitures",
  }),
};

export default carEnumeration;
```

Dans cet exemple, `enu` associe diverses conditions à un contenu spécifique. Lorsqu'il est utilisé dans un composant React, Intlayer peut automatiquement choisir le contenu approprié en fonction de la variable donnée.

## Utilisation de l'énumération avec React Intlayer

Pour utiliser l'énumération dans un composant React, vous pouvez utiliser le hook `useIntlayer` du paquet `react-intlayer`. Ce hook récupère le contenu correct en fonction de l'ID spécifié. Voici un exemple d'utilisation :

```javascript
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

Dans cet exemple, le composant ajuste dynamiquement sa sortie en fonction du nombre de voitures. Le contenu correct est choisi automatiquement, selon la plage spécifiée.

## Notes importantes

- L'ordre de la déclaration est crucial dans les énumérations Intlayer. La première déclaration valide est celle qui sera prise en compte.
- Si plusieurs conditions s'appliquent, assurez-vous qu'elles sont correctement ordonnées pour éviter tout comportement inattendu.

## Meilleures pratiques pour l'énumération

Pour vous assurer que vos énumérations fonctionnent comme prévu, suivez ces meilleures pratiques :

- **Nommage cohérent** : Utilisez des IDs clairs et cohérents pour les modules d'énumération afin d'éviter toute confusion.
- **Documentation** : Documentez vos clés d'énumération et leurs sorties attendues pour garantir la maintenabilité future.
- **Gestion des erreurs** : Implémentez une gestion des erreurs pour gérer les cas où aucune énumération valide n'est trouvée.
- **Optimisation des performances** : Pour les grandes applications, réduisez le nombre d'extensions de fichiers surveillés pour améliorer les performances.

## Ressources supplémentaires

Pour des informations plus détaillées sur la configuration et l'utilisation, consultez les ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_cli_fr.md)
- [Documentation React Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_fr.md)
- [Documentation Next Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_nextjs_fr.md)

Ces ressources fournissent des informations supplémentaires sur la configuration et l'utilisation d'Intlayer dans différents environnements et avec divers frameworks.
