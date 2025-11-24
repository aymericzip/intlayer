---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Commandes Live Sync
description: Apprenez à utiliser Live Sync pour refléter les modifications de contenu CMS en temps réel.
keywords:
  - Live Sync
  - CMS
  - Runtime
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# Commandes Live Sync

Live Sync permet à votre application de refléter les modifications de contenu CMS en temps réel. Aucune reconstruction ou redéploiement n'est nécessaire. Lorsqu'il est activé, les mises à jour sont transmises à un serveur Live Sync qui actualise les dictionnaires que votre application lit. Voir [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) pour plus de détails.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Arguments :

**Options de configuration :**

- **`--base-dir`** : Spécifie le répertoire de base pour le projet. Pour récupérer la configuration intlayer, la commande recherchera le fichier `intlayer.config.{ts,js,json,cjs,mjs}` dans le répertoire de base.

- **`--no-cache`** : Désactive le cache.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`

**Options de journalisation :**

- **`--verbose`** : Active la journalisation détaillée pour le débogage. (activé par défaut via la CLI)
