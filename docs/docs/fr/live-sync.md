---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Synchronisation en direct (Live Sync) | Reflétez les changements de contenu du CMS en temps réel
description: Laissez votre application refléter les modifications de contenu du CMS Intlayer en temps réel, sans reconstruction ni redéploiement.
keywords:
  - Synchronisation en direct
  - Live Sync
  - CMS
  - Éditeur Visuel
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Déplacé depuis la documentation du CMS Intlayer vers sa propre page"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Ajout de la documentation sur la synchronisation en direct"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Remplacement du champ `hotReload` par `liveSync`"
author: aymericzip
---

# Synchronisation en direct

La synchronisation en direct permet à votre application de refléter les modifications du contenu CMS en temps réel. Aucune reconstruction ou redéploiement n'est nécessaire. Lorsqu'elle est activée, les mises à jour sont diffusées vers un serveur de synchronisation en direct qui actualise les dictionnaires que votre application utilise.

## Table des matières

<TOC/>

---

## Activer la synchronisation en direct

> La synchronisation en direct nécessite une connexion continue au serveur et est disponible dans le plan entreprise.

Activez la synchronisation en direct en mettant à jour votre configuration Intlayer :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * Active le rechargement à chaud des configurations de langue lorsque des modifications sont détectées.
     * Par exemple, lorsqu'un dictionnaire est ajouté ou mis à jour, l'application met à jour
     * le contenu affiché sur la page.
     *
     * Comme le rechargement à chaud nécessite une connexion continue au serveur,
     * il est uniquement disponible pour les clients du plan `enterprise`.
     *
     * Par défaut : false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * Contrôle la manière dont les dictionnaires sont importés :
     *
     * - "live" : Les dictionnaires sont récupérés dynamiquement via l'API Live Sync.
     *   Remplace useIntlayer par useDictionaryDynamic.
     *
     * Remarque : Le mode live utilise l'API Live Sync pour récupérer les dictionnaires. Si l'appel API
     * échoue, les dictionnaires sont importés dynamiquement.
     * Remarque : Seuls les dictionnaires avec un contenu distant et le drapeau "live" utilisent le mode live.
     * Les autres utilisent le mode dynamique pour des raisons de performance.
     */
    importMode: "fetch",
  },
};

export default config;
```

Démarrez le serveur Live Sync pour envelopper votre application :

Exemple avec Next.js :

```json5 fileName="package.json"
{
  "scripts": {
    // ... autres scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Exemple avec Vite :

```json5 fileName="package.json"
{
  "scripts": {
    // ... autres scripts
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Le serveur Live Sync enveloppe votre application et applique automatiquement le contenu mis à jour dès son arrivée.

Pour recevoir les notifications de changement depuis le CMS, le serveur Live Sync maintient une connexion SSE avec le backend. Lorsque le contenu change dans le CMS, le backend transmet la mise à jour au serveur Live Sync, qui écrit les nouveaux dictionnaires. Votre application reflétera la mise à jour lors de la prochaine navigation ou du rechargement du navigateur, aucune reconstruction n’est nécessaire.

Organigramme (CMS/Backend -> Serveur Live Sync -> Serveur d’application -> Frontend) :

![Schéma logique Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Comment cela fonctionne :

![Schéma du flux Live Sync CMS/Backend/Serveur Live Sync/Serveur d’application/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## Flux de travail en développement (local)

- En développement, tous les dictionnaires distants sont récupérés au démarrage de l'application, ce qui vous permet de tester rapidement les mises à jour.
- Pour tester Live Sync localement avec Next.js, encapsulez votre serveur de développement :

```json5 fileName="package.json"
{
  "scripts": {
    // ... autres scripts
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Pour Vite
  },
}
```

Activez l'optimisation afin qu'Intlayer applique les transformations d'importation Live pendant le développement :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

Cette configuration encapsule votre serveur de développement avec le serveur Live Sync, récupère les dictionnaires distants au démarrage et diffuse les mises à jour du CMS via SSE. Rafraîchissez la page pour voir les changements.

## Notes et contraintes

- Ajoutez l'origine du live sync à la politique de sécurité de votre site (CSP). Assurez-vous que l'URL du live sync est autorisée dans `connect-src` (et `frame-ancestors` si pertinent).
- Live Sync ne fonctionne pas avec une sortie statique. Pour Next.js, la page doit être dynamique pour recevoir les mises à jour à l'exécution (par exemple, utilisez `generateStaticParams`, `generateMetadata`, `getServerSideProps` ou `getStaticProps` de manière appropriée pour éviter les contraintes de statique complète).
- Dans le CMS, chaque dictionnaire possède un indicateur `live`. Seuls les dictionnaires avec `live=true` sont récupérés via l'API de synchronisation en direct ; les autres sont importés dynamiquement et restent inchangés à l'exécution.
- L'indicateur `live` est évalué pour chaque dictionnaire au moment de la compilation. Si le contenu distant n'était pas marqué `live=true` lors de la compilation, vous devez recompiler pour activer la synchronisation en direct pour ce dictionnaire.
- Le serveur de synchronisation en direct doit pouvoir écrire dans `.intlayer`. Dans les conteneurs, assurez-vous d'avoir un accès en écriture à `/.intlayer`.

## Liens utiles

- [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)
- [Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
- [Référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Guide d'auto-hébergement](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md)
