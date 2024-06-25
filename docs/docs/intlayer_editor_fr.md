# Documentation de l'Éditeur Intlayer

L'Éditeur Intlayer est un outil qui transforme votre application en un éditeur visuel. Avec l'Éditeur Intlayer, vos équipes peuvent gérer le contenu de votre site dans toutes les langues configurées.

![Interface de l'Éditeur Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

Le package `intlayer-editor` est basé sur Intlayer et est disponible pour les applications JavaScript, telles que React (Create React App), Vite + React, et Next.js.

Pour plus de détails sur l'installation du package, consultez la section correspondante ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, référez-vous au [guide d'installation](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_nextjs_fr.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, référez-vous au [guide d'installation](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_fr.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, référez-vous au [guide d'installation](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_vite+react_fr.md).

## Comment fonctionne l'Éditeur Intlayer

Chaque fois que vous effectuez une modification à l'aide de l'Éditeur Intlayer, le serveur insère automatiquement vos modifications dans vos [fichiers de déclaration Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/get_started_fr.md), où que ces fichiers soient déclarés dans votre projet.

De cette façon, vous n'avez pas à vous soucier de l'endroit où le fichier est déclaré ou de la recherche de votre clé dans votre collection de dictionnaires.

## Installation

Une fois qu'Intlayer est configuré dans votre projet, installez simplement `intlayer-editor` en tant que dépendance de développement :

```bash
npm install intlayer-editor -D
```

```bash
yarn install intlayer-editor -D
```

```bash
pnpm install intlayer-editor -D
```

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l'éditeur :

```typescript
const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    enabled: process.env.NODE_ENV === "development", // Si false, l'éditeur est inactif et ne peut pas être accessible.
    port: 3000, // Port du backend intlayer-editor
  },
};
```

Pour voir tous les paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_fr.md).

### Commencer à éditer

Pour commencer à éditer, lancez le serveur de l'éditeur en utilisant `npx intlayer-editor start`.

Vous pouvez également créer un script personnalisé dans votre fichier `package.json` :

```json5
{
  scripts: {
    "start:editor": "npx intlayer-editor start",
  },
}
```

Pour démarrer simultanément le serveur Next.js et l'Éditeur Intlayer, vous pouvez utiliser l'outil [concurrently](https://github.com/open-cli-tools/concurrently) :

```json5
{
  scripts: {
    dev: "next dev",
    "start:editor": "npx intlayer-editor start",
    "dev:all": "concurrently \"npm run dev:nextjs\" \"npm run dev:intlayer-editor\"",
  },
}
```

## Utilisation de l'Éditeur

Lorsque l'éditeur est installé, activé et démarré, vous pouvez voir chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

![Survol du contenu](https://github.com/aypineau/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si votre contenu est encadré, vous pouvez maintenir une pression prolongée pour afficher le tiroir de modification.
