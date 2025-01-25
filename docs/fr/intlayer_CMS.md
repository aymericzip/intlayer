# Intlayer Système de Gestion de Contenu (CMS) Documentation

Le CMS Intlayer est une application qui vous permet d'externaliser votre contenu d'un projet Intlayer.

Pour cela, Intlayer introduit le concept de 'dictionnaires distants'.

## Comprendre les dictionnaires distants

Intlayer fait la différence entre les dictionnaires 'locaux' et 'distants'.

- Un dictionnaire 'local' est un dictionnaire qui est déclaré dans votre projet Intlayer. Comme le fichier de declaration d'un bouton, ou votre barre de navigation. L'externalisation de votre contenu n'a pas de sens dans ce cas car ce contenu n'est pas censé changer souvent.

- Un dictionnaire 'distant' est un dictionnaire qui est géré via le CMS Intlayer. Il peut être utile de permettre à votre équipe de gérer votre contenu directement sur votre site web, et a également pour but d'utiliser les fonctionnalités de test A/B et l'optimisation automatique SEO.

## Éditeur visuel vs CMS

L'[Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour les dictionnaires locaux. Une fois qu'un changement est effectué, le contenu sera remplacé dans le code de base. Cela signifie que l'application sera reconstruite et que la page sera rechargée pour afficher le nouveau contenu.

En revanche, le CMS Intlayer est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour les dictionnaires distants. Une fois qu'un changement est effectué, le contenu **n'**impactera **pas** votre code de base. Et le site web affichera automatiquement le contenu modifié.

## Intégration

Pour plus de détails sur la façon d'installer le package, consultez la section pertinente ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, référez-vous au [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, référez-vous au [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, référez-vous au [guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md).

## Configuration

### 1. Activer l'Éditeur dans votre fichier intlayer.config.ts

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l'éditeur :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * L'ID de client et le secret de client sont nécessaires pour activer l'éditeur.
     * Ils permettent d'identifier l'utilisateur qui édite le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Optionnel
     * Par défaut `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * L'ID de client et le secret de client sont nécessaires pour activer l'éditeur.
     * Ils permettent d'identifier l'utilisateur qui édite le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Optionnel
     * Par défaut `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * L'ID de client et le secret de client sont nécessaires pour activer l'éditeur.
     * Ils permettent d'identifier l'utilisateur qui édite le contenu.
     * Ils peuvent être obtenus en créant un nouveau client dans le tableau de bord Intlayer - Projets (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Optionnel
     * Par défaut `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Si vous n'avez pas d'ID de client et de secret de client, vous pouvez les obtenir en créant un nouveau client dans le [tableau de bord Intlayer - Projets](https://intlayer.org/dashboard/projects).

> Pour voir tous les paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Utilisation du CMS

Lorsque l'éditeur est installé, vous pouvez voir chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

![Survol du contenu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si votre contenu est délimité, vous pouvez le maintenir enfoncé pour afficher le tiroir d'édition.
