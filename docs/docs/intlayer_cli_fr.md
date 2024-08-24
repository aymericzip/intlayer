# Paquet intlayer-cli

## Installer le package

Installez les packages nécessaires en utilisant npm :

```bash
npm install intlayer-cli
```

```bash
yarn install intlayer-cli
```

```bash
pnpm install intlayer-cli
```

## Package intlayer-cli

Le package `intlayer-cli` a pour but de transcrire vos déclarations [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme_fr.md) en dictionnaires.

Ce package transcrira tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json}`. [Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme_fr.md).

Pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interpréteurs tels que [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/readme_fr.md) ou [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/readme_fr.md).

## Support des fichiers de configuration

Intlayer accepte plusieurs formats de fichiers de configuration :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Pour voir comment configurer les locales disponibles, ou d'autres paramètres, référez-vous à la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_fr.md).

## Exécuter les commandes intlayer

Pour construire vos dictionnaires, vous pouvez exécuter les commandes :

```bash
npx intlayer transpile
```

ou en mode surveillance

```bash
npx intlayer watch
```

## Utiliser les commandes intlayer dans votre `package.json` :

```json
"scripts": {
  "transpile": "npx intlayer transpile",
  "transpile:watch": "npx intlayer watch"
}
```
