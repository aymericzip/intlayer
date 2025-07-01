---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Commande Intlayer non définie
description: Apprenez comment résoudre l'erreur de commande intlayer non définie.
keywords:
  - intlayer
  - commande
  - non définie
  - erreur
  - vscode
  - extension
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - doc
  - faq
  - commande-intlayer-non-definie
---

# Commande Intlayer non définie

## Vue d'ensemble

L'interface en ligne de commande (CLI) Intlayer offre un moyen pratique de gérer votre contenu intlayer, y compris la construction de dictionnaires, la poussée des traductions, et plus encore. Cependant, elle n'est pas indispensable au fonctionnement de votre projet. Si vous utilisez le plugin de bundler (comme `withIntlayer()` pour Next.js ou `intlayerPlugin()` pour Vite), Intlayer construira automatiquement les dictionnaires lors de la compilation de l'application ou au démarrage du serveur de développement. En mode développement, il surveillera également les modifications et reconstruira automatiquement les fichiers de déclaration de contenu.

Vous pouvez accéder aux commandes intlayer de différentes manières :

- En utilisant directement la commande CLI `intlayer`
- En utilisant l'[extension VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)
- En utilisant le SDK `@intlayer/cli`

## Problème

Lorsque vous essayez d'utiliser la commande `intlayer`, vous pouvez rencontrer cette erreur :

```bash
'intlayer' n'est pas reconnu en tant que commande interne ou externe,
un programme exécutable ou un fichier de commandes.
```

## Solutions

Essayez ces solutions dans l'ordre :

1. **Vérifiez que la commande est installée**

```bash
npx intlayer -h
```

Sortie attendue :

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            affiche le numéro de version
    -h, --help               affiche l'aide pour la commande

Commands:
    dictionary|dictionaries  Opérations sur les dictionnaires
    configuration|config     Opérations de configuration
    help [command]           affiche l'aide pour la commande
```

2. **Installez globalement le paquet intlayer-cli**

```bash
npm install intlayer-cli -g -g
```

> Il ne devrait pas être nécessaire de le faire si vous avez déjà installé le package `intlayer`

3. **Installez le package globalement**

```bash
npm install intlayer -g
```

4. **Redémarrez votre terminal**
   Parfois, un redémarrage du terminal est nécessaire pour reconnaître les nouvelles commandes.

5. **Nettoyez et réinstallez**
   Si les solutions ci-dessus ne fonctionnent pas :

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Vérifiez les fichiers d'installation**
   Si le problème persiste, vérifiez que ces fichiers existent :

   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (devrait contenir un champ `bin` pointant vers `./dist/cjs/cli.cjs`)

7. **Vérifiez la variable d'environnement PATH**
   Assurez-vous que le répertoire global des binaires npm est dans votre PATH :

```bash
# Pour les systèmes Unix (macOS/Linux)
echo $PATH
# Devrait inclure quelque chose comme /usr/local/bin ou ~/.npm-global/bin

# Pour Windows
echo %PATH%
# Devrait inclure le répertoire global bin de npm
```

8. **Utilisez npx avec le chemin complet**
   Si la commande n'est toujours pas trouvée, essayez d'utiliser npx avec le chemin complet :

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Vérifiez les installations conflictuelles**

```bash
# Listez tous les packages installés globalement
npm list -g --depth=0

# Supprimez toutes installations globales conflictuelles
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Puis réinstallez
npm install -g intlayer
```

10. **Vérifiez les versions de Node.js et npm**
    Assurez-vous d'utiliser des versions compatibles :

```bash
node --version
npm --version
```

    Si vous utilisez une version obsolète, envisagez de mettre à jour Node.js et npm.

11. **Vérifiez les problèmes de permissions**  
    Si vous rencontrez des erreurs de permission :

    ```bash
    # Pour les systèmes basés sur Unix
    sudo npm install -g intlayer

    # Ou changez le répertoire par défaut de npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Ajoutez à votre ~/.profile ou ~/.bashrc :
    export PATH=~/.npm-global/bin:$PATH
    ```
