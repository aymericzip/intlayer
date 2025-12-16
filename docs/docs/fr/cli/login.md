---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Connexion
description: Apprenez à utiliser la commande login de l'Intlayer CLI pour vous authentifier auprès du CMS Intlayer et obtenir des identifiants d'accès.
keywords:
  - CLI
  - Connexion
  - Authentification
  - CMS
  - Intlayer
  - Identifiants
slugs:
  - doc
  - concept
  - cli
  - login
---

# Commande `login` de l'Intlayer CLI

---

## Description

La commande `login` de l'Intlayer CLI vous permet de vous authentifier auprès du CMS Intlayer. Cette commande ouvre automatiquement votre navigateur par défaut pour compléter le processus d'authentification et recevoir les identifiants nécessaires (Client ID et Client Secret) pour utiliser les services Intlayer.

## Utilisation

```bash
npx intlayer login [options]
```

ou

```bash
intlayer login [options]
```

## Options

### `--cms-url <url>`

Spécifie l'URL du CMS Intlayer auquel se connecter pour l'authentification.

- **Type**: `string`
- **Par défaut**: la valeur configurée dans `intlayer.config.*` ou `https://intlayer.org`
- **Exemple**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Options de configuration

Vous pouvez également utiliser les options de configuration communes :

- `--env-file <path>` : Chemin vers le fichier d'environnement
- `-e, --env <env>` : Environnement d'exécution
- `--base-dir <dir>` : Répertoire de base du projet
- `--verbose` : Active la sortie détaillée (par défaut : true)
- `--prefix <prefix>` : Préfixe pour les logs

## Fonctionnement

1. **Démarrage d'un serveur local** : La commande démarre un serveur HTTP local sur un port aléatoire pour recevoir les identifiants depuis le CMS

Spécifiez l'URL du CMS Intlayer auquel se connecter pour l'authentification.

- **Type**: `string`
- **Par défaut**: La valeur configurée dans `intlayer.config.*` ou `https://intlayer.org`
- **Exemple**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Options de configuration

Vous pouvez également utiliser les options de configuration courantes :

- `--env-file <path>` : Chemin vers le fichier d'environnement
- `-e, --env <env>` : Environnement d'exécution
- `--base-dir <dir>` : Répertoire de base du projet
- `--verbose` : Activer la sortie détaillée (par défaut : true)
- `--prefix <prefix>` : Préfixe pour les logs

## Fonctionnement

1. **Démarrage du serveur local** : la commande lance un serveur HTTP local sur un port aléatoire pour recevoir les identifiants depuis le CMS
2. **Ouverture du navigateur** : La commande ouvre automatiquement votre navigateur par défaut à l'URL de connexion du CMS
3. **Authentification** : Complétez l'authentification dans le navigateur en utilisant votre compte Intlayer
4. **Réception des identifiants** : Le serveur local reçoit le Client ID et le Client Secret depuis le CMS
5. **Instructions** : La commande affiche des instructions pour configurer les identifiants dans votre projet

## Sortie

Après une connexion réussie, la commande affichera :

1. **Les identifiants reçus** (Client ID et Client Secret)
2. **Instructions pour le fichier `.env`** :

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Instructions pour le fichier de configuration Intlayer** :

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Configuration manuelle

Si le navigateur ne s'ouvre pas automatiquement, vous pouvez visiter manuellement l'URL affichée dans le terminal.

## Exemples

### Connexion avec une URL CMS personnalisée

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Connexion avec un fichier d'environnement spécifique

```bash
npx intlayer login --env-file .env.production
```

### Connexion en mode verbeux

```bash
npx intlayer login --verbose
```

## Dépannage

### Le navigateur ne s'ouvre pas

Si le navigateur ne s'ouvre pas automatiquement, copiez l'URL affichée dans le terminal et ouvrez-la manuellement dans votre navigateur.

### Problèmes de connexion

Si vous rencontrez des problèmes de connexion, vérifiez :

1. Que l'URL du CMS est correcte
2. Que votre connexion internet fonctionne correctement
3. Qu'aucun pare-feu ne bloque la connexion

### Identifiants non reçus

Si les identifiants ne sont pas reçus :

1. Assurez-vous d'avoir complété le processus d'authentification dans le navigateur
2. Vérifiez que le port local n'est pas bloqué
3. Réessayez la commande

## Étapes suivantes

Après avoir terminé la connexion :

1. Ajoutez les identifiants à votre fichier `.env`
2. Configurez votre fichier `intlayer.config.*` avec les identifiants
3. Utilisez les commandes CLI pour gérer vos dictionnaires :
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/push.md) - Pousser les dictionnaires vers le CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/pull.md) - Récupérer les dictionnaires depuis le CMS
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) - Remplir les traductions manquantes

## Voir aussi

- [Documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md)
- [Configuration d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)
