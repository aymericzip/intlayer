# Intégration React : Documentation du Hook `useDictionary`

Cette section fournit des guides détaillés sur l'utilisation du hook `useDictionary` dans les applications React, permettant une gestion efficace du contenu localisé sans éditeur visuel.

## Importation de `useDictionary` dans React

Le hook `useDictionary` peut être intégré dans les applications React en l'importation en fonction du contexte :

- **Composant Client :**

  ```javascript
  import { useDictionary } from "next-intlayer"; // Utilisé dans les composants React côté client
  ```

- **Composant Serveur :**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // Utilisé dans les composants React côté serveur
  ```

## Paramètres

Le hook accepte deux paramètres :

1. **`dictionary`** : Un objet dictionnaire déclaré contenant le contenu localisé pour des clés spécifiques.
2. **`locale`** (optionnel) : La locale souhaitée. Par défaut, cela correspond à la locale du contexte actuel si non spécifié.

## Déclaration du Contenu

Tous les objets dictionnaires doivent être déclarés dans des fichiers de contenu structurés pour garantir la sécurité des types et éviter les erreurs d'exécution. Vous pouvez trouver les instructions de configuration [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md). Voici un exemple de déclaration de contenu :

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## Exemple d'Utilisation dans React

Voici un exemple de la façon d'utiliser le hook `useDictionary` dans un composant React :

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## Intégration Serveur

Si vous utilisez le hook `useDictionary` en dehors de `IntlayerServerProvider`, la locale doit être fournie explicitement comme paramètre lors du rendu du composant :

```tsx
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## Remarques sur les Attributs

Contrairement aux intégrations utilisant des éditeurs visuels, des attributs comme `buttonTitle.value` ne s'appliquent pas ici. Accédez plutôt directement aux chaînes localisées telles que déclarées dans votre contenu.

```tsx
<button title={content.title}>{content.content}</button>
```

## Conseils Supplémentaires

- **Sécurité des Types** : Utilisez toujours `DeclarationContent` pour définir vos dictionnaires afin de garantir la sécurité des types.
- **Mises à Jour de Localisation** : Lorsque vous mettez à jour le contenu, assurez-vous que toutes les locales sont cohérentes pour éviter les traductions manquantes.

Cette documentation se concentre sur l'intégration du hook `useDictionary`, offrant une approche simplifiée pour gérer le contenu localisé sans se fier aux fonctionnalités des éditeurs visuels.