---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Commande inconnue
description: Apprenez comment corriger l'erreur de commande inconnue.
keywords:
  - inconnu
  - commande
  - erreur
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - redémarrer
  - local
slugs:
  - doc
  - faq
  - unknown-command
---

# erreur : commande inconnue fill / build / etc

Si `npx intlayer fill --verbose` affiche :

```
error: unknown command 'fill'
```

mais que vous êtes sûr que la commande `fill` _devrait_ exister, voici les étapes pour résoudre ce problème :

## 1. **Assurez-vous d'utiliser la dernière version**

Exécutez :

```bash
npx intlayer --version                  # version locale actuelle d'intlayer
npx intlayer@latest --version           # dernière version disponible d'intlayer
```

Cela force `npx` à récupérer la version la plus récente. Ensuite, essayez de nouveau :

```bash
npx intlayer@latest build --verbose
```

## 2. **Vérifiez si la commande est enregistrée**

Vous pouvez vérifier avec :

```bash
npx intlayer --help                     # fournit des informations liées aux commandes
```

Voyez si la commande apparaît dans la liste des commandes.

Allez dans le dépôt, et confirmez que votre commande est exportée et enregistrée dans le point d'entrée CLI. Intlayer utilise `commander` comme framework.

Code concernant la CLI :
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Redémarrez votre terminal**

Parfois, un redémarrage du terminal est nécessaire pour reconnaître les nouvelles commandes.

## 5. **Si vous développez `intlayer`, reconstruisez-le et liez-le**

Si vous développez `intlayer` localement :

```bash
# Dans le répertoire intlayer
npm install
npm run build
npm link
```

Puis dans un autre terminal :

```bash
intlayer fill --verbose
```

Cela utilise la version locale sur laquelle vous travaillez.

## 6. **Videz le cache npx (si vous êtes bloqué avec une version plus ancienne)**

```bash
npx clear-npx-cache
```

Ou supprimez manuellement les paquets intlayer mis en cache :

```bash
rm -rf ~/.npm/_npx
```

Vérifiez l'équivalent si vous utilisez pnpm, yarn, bun ou un autre gestionnaire de paquets
