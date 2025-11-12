---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Je rencontre une erreur liée aux sous-paquets `@intlayer/*`
description: Résoudre une erreur liée aux sous-paquets `@intlayer/*`.
keywords:
  - @intlayer/*
  - sous-paquets
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Je rencontre une erreur liée aux sous-paquets `@intlayer/*`

Ce problème survient généralement après une mise à jour des paquets Intlayer.

Exemple de message d'erreur :

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERREUR  Aucune exportation correspondante dans "node_modules/@intlayer/config/dist/esm/client.mjs" pour l'import "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Raison

Les paquets de base tels que `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` réutilisent les mêmes sous-paquets que `@intlayer/config`, `@intlayer/core`, `@intlayer/types` afin d'éviter la duplication de code.

Entre deux versions, les exports des sous-paquets ne sont pas garantis d’être les mêmes. Pour limiter ce problème, intlayer fixe la version des sous-paquets à la version du paquet principal.

> Ex : `intlayer@1.0.0` utilise `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (À l’exception de `@intlayer/swc`), les sous-paquets `@intlayer/*` ne sont pas destinés à être utilisés directement. Nous recommandons donc de ne pas les installer directement.

## Résolution

1. Assurez-vous que les versions du paquet principal et des sous-paquets sont identiques.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Mauvaise version, cela devrait être 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Essayez de supprimer le fichier de verrouillage (lockfile) et le dossier node_modules, puis réinstallez les dépendances.

Parfois, le gestionnaire de paquets conserve une ancienne version des sous-paquets dans le fichier de verrouillage en cache. Pour résoudre ce problème, vous pouvez essayer de supprimer le fichier de verrouillage et le dossier node_modules, puis réinstaller les dépendances.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Vérifiez l'installation globale

Nous recommandons d’installer `intlayer` ou `intlayer-cli` globalement pour accéder aux commandes CLI. Si la version globale n’est pas la même que la version locale, le gestionnaire de paquets peut considérer la mauvaise version.

**Vérifier si un paquet est installé globalement**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Résoudre les conflits potentiels de dépendances globales**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Essayez de nettoyer le cache

Pour certains environnements comme docker, github actions, ou les plateformes d’hébergement web comme Vercel, un cache peut être présent. Vous pouvez essayer de nettoyer le cache et de réessayer l’installation.

Vous pouvez également essayer de nettoyer le cache de votre gestionnaire de paquets avec la commande suivante :

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
