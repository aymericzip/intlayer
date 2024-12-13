# Traduction

## Définir les traductions

La fonction `t` dans `intlayer` vous permet de déclarer du contenu dans plusieurs langues. Cette fonction garantit la sécurité des types, en soulevant une erreur si des traductions sont manquantes, ce qui est particulièrement utile dans les environnements TypeScript.

### Utiliser TypeScript

Voici un exemple de déclaration de contenu avec des traductions dans un fichier TypeScript :

```typescript
import { t, type DeclarationContent } from "intlayer";

const multiLangContent = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent;

export default multiLangContent;
```

### Utiliser les modules ECMAScript

Si vous utilisez les modules ECMAScript, la déclaration ressemble à ceci :

```javascript
import { t } from "intlayer";

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### Utiliser les modules CommonJS

Dans une configuration CommonJS, vous pouvez déclarer des traductions comme ceci :

```javascript
const { t } = require("intlayer");

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### Utiliser JSON

Pour les déclarations basées sur JSON, vous pouvez définir des traductions comme suit :

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "en": "Welcome to our application",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
  }
}
```

## Configuration pour les Locales

Pour garantir un traitement approprié des traductions, vous pouvez configurer les locales acceptées dans `intlayer.config.ts`. Cette configuration vous permet de définir les langues que votre application prend en charge :

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Utiliser les traductions dans les composants React

Avec `react-intlayer`, vous pouvez utiliser des traductions dans les composants React. Voici un exemple :

```jsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

Ce composant récupère la traduction correspondante en fonction de la locale actuelle définie dans votre application.

## Objets de contenu personnalisés

`intlayer` prend en charge les objets de contenu personnalisés pour la traduction, vous permettant de définir des structures plus complexes tout en garantissant la sécurité des types. Voici un exemple avec un objet personnalisé :

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title",
        content: "Page Content",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
