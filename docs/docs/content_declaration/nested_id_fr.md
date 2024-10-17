# Commencer avec les identifiants imbriqués

Les identifiants imbriqués dans `intlayer` vous permettent de déclarer des structures de contenu complexes de manière efficace. En introduisant des identifiants imbriqués, vous pouvez organiser le contenu en une structure hiérarchique, conduisant à une meilleure performance et une gestion plus facile dans les applications à grande échelle.

## Déclaration des identifiants imbriqués

Pour déclarer des identifiants imbriqués dans votre fichier de contenu, vous créez une structure avec des nœuds internes contenant du contenu supplémentaire et des identifiants uniques. Cette configuration est idéale pour les scénarios où le contenu est vaste ou très organisé. Voici un exemple typique de structure d'identifiant imbriqué :

```typescript
import type { DeclarationContent } from "intlayer";

const nestedContent = {
  key: "parent_id",
  content: {
    text: "Ceci est le nœud parent",

    nestedContent: {
      id: "child_id",
      text: "Ceci est le nœud enfant",
    },
  },
} satisfies DeclarationContent;

export default nestedContent;
```

Dans cet exemple, le `parent_id` contient un nœud de contenu imbriqué avec un `id` de `child_id`. Cette structure permet à `intlayer` de créer des dictionnaires séparés pour chaque identifiant, offrant une flexibilité dans la gestion du contenu.

## Utilisation des identifiants imbriqués dans React

Pour utiliser des identifiants imbriqués dans un composant React, vous pouvez utiliser le hook `useIntlayer` pour accéder au contenu à partir d'un identifiant donné. Cette approche vous permet d'extraire des morceaux de contenu spécifiques en faisant référence à leurs identifiants uniques. Voici un exemple de comment récupérer du contenu avec des identifiants imbriqués :

```javascript
import { useIntlayer } from "react-intlayer";

// Afficher le contenu dans un composant React
function MyComponent() {
  // Accéder au contenu parent
  const parentContent = useIntlayer("parent_id");

  // Accéder au contenu enfant
  const childContent = useIntlayer("child_id");

  return (
    <div>
      <p>{parentContent.text}</p> {/* Sortie: Ceci est le nœud parent */}
      <p>{childContent.text}</p> {/* Sortie: Ceci est le nœud enfant */}
    </div>
  );
}

export default MyComponent;
```

Dans cet exemple, le hook `useIntlayer` récupère le contenu basé sur les identifiants spécifiés. Vous pouvez ensuite afficher le contenu comme requis, avec la flexibilité d'accéder indépendamment au contenu parent et enfant.

## Principaux avantages des identifiants imbriqués

Les identifiants imbriqués offrent plusieurs avantages :

- **Performance améliorée** : En divisant un contenu volumineux en structures plus petites et organisées, vous réduisez la charge sur votre application, conduisant à une meilleure performance.
- **Flexibilité** : La structure hiérarchique vous permet d'accéder à des parties spécifiques du contenu, offrant une plus grande flexibilité dans la conception de l'application.
- **Évolutivité** : À mesure que les applications se développent, les identifiants imbriqués facilitent la gestion des structures de contenu complexes sans perdre en organisation ou en performance.

## Utilisation avancée des identifiants imbriqués

Pour optimiser davantage la performance des identifiants imbriqués, vous pouvez déclarer plusieurs niveaux d'imbrication ou utiliser des identifiants uniques supplémentaires au sein de la structure. Voici un exemple avec une imbrication plus profonde :

```typescript
import type { DeclarationContent } from "intlayer";

const deeplyNestedContent = {
  key: "level_1",
  content: {
    text: "Contenu de niveau 1",

    nestedContent: {
      id: "level_2",
      text: "Contenu de niveau 2",

      nestedContent: {
        id: "level_3",
        text: "Contenu de niveau 3",
      },
    },
  },
} satisfies DeclarationContent;

export default deeplyNestedContent;
```

Dans cet exemple, la structure du contenu comporte trois niveaux d'imbrication, chacun avec un identifiant unique. Cette conception vous permet de récupérer du contenu à n'importe quel niveau de la hiérarchie, offrant une flexibilité significative dans la gestion du contenu.

## Conclusion

Les identifiants imbriqués dans `intlayer` offrent un outil puissant pour organiser et gérer des structures de contenu complexes de manière à optimiser la performance et l'évolutivité. En suivant les exemples et les directives de cette documentation, vous pouvez construire des déclarations de contenu efficaces qui sont faciles à maintenir et à étendre à mesure que votre application se développe.
