---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Erreur de build en CI/CD
description: Apprenez comment corriger les erreurs de build qui surviennent dans les environnements CI/CD.
keywords:
  - build
  - erreur
  - ci
  - cd
  - pipeline
  - intlayer
  - dictionnaires
  - next.js
  - prébuild
  - automatisation
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# Erreur lors du build en CI/CD

Si vous obtenez une erreur comme celle-ci sur Next.js :

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Voici quelques solutions :

## 1. Dictionnaires manquants

Assurez-vous que les dictionnaires sont construits lors de l'étape de build.

Il est fréquent que le build fonctionne localement mais pas en CI/CD. La raison est qu'en local, le répertoire `.intlayer` est présent, mais en CI/CD, il ne l'est pas car il est exclu du build.

Vous pouvez corriger cela en ajoutant un script de prébuild dans le `package.json` de votre projet.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // S'exécutera avant le build
    "build": "next build",
  },
}
```

> Notez que si vous utilisez la fonction `withIntlayer`, ou le plugin bundler équivalent pour votre framework, le script de prébuild sera exécuté avant le build.

## 2. Variables d'environnement manquantes au moment du build / de l'exécution

Dans un conteneur, ou une plateforme à déploiement automatique, il est recommandé d'exclure le fichier `.env` du build.

```text fileName=".gitignore or .dockerignore"
# Variables d'environnement
.env
**/.env
.env.*
**/.env.*
```

Si vos variables d'environnement ne sont pas disponibles au moment du build, une erreur sera levée.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Cela n'est probablement pas lié à Intlayer. Vérifiez donc vos variables d'environnement au moment du build sur votre plateforme CI/CD.
