---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Analytique Intlayer | Suivre l'exposition du contenu et exécuter des tests A/B
description: Découvrez comment @intlayer/analytics suit les vues de pages/locales et l'exposition du contenu, et comment l'utiliser pour exécuter des tests A/B sur votre contenu Intlayer.
keywords:
  - Analytique
  - Tests A/B
  - Audience
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — package @intlayer/analytics, suivi au niveau du provider/node, tests A/B, dashboard"
author: aymericzip
---

# Documentation Analytique Intlayer

`@intlayer/analytics` est un package compagnon optionnel qui vous indique **quel contenu est réellement affiché** à vos visiteurs — quelle page, dans quelle locale, et quel élément de contenu traduit spécifique — afin que vous puissiez comprendre votre audience et exécuter des **tests A/B sur le contenu**.

## Table des matières

<TOC/>

---

## Ce qu'il suit

`@intlayer/analytics` regroupe trois types d'événements anonymes en lots :

| Événement          | Capturé où                                           | Ce qu'il vous indique                                                                                                                        |
| ------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Niveau Provider (`IntlayerProvider`)                 | Quelle page et locale une session a consulté, lors du chargement initial, du changement de route ou du changement de locale.                 |
| `content_exposure` | Niveau Nœud (`useIntlayer` / plugins d'interpréteur) | Quelle clé de dictionnaire / chemin de clé a été réellement résolu et affiché — et, si faisant partie d'une expérience, quelle **variante**. |
| `conversion`       | Partout où vous appelez `useConversion()`            | Un objectif atteint (inscription, clic, achat…) attribué à la variante A/B à laquelle la session a été exposée.                              |

Les événements sont collectés en mémoire et envoyés sous forme d'une **seule requête groupée (batch) environ toutes les 20 secondes** — jamais à chaque frappe au clavier ou rendu — donc l'analytique n'impacte jamais le temps de premier rendu et n'ajoute pas une requête par interaction.

## Comment cela propulse les tests A/B sur le contenu

Intlayer vous permet déjà de déclarer des [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) de contenu (par exemple un dictionnaire `hero-banner` avec une variante `control` et une variante `black_friday`). `@intlayer/analytics` boucle la boucle :

1. `getVariant(experimentKey, variants)` attribue de manière déterministe chaque session anonyme à une variante — une fonction pure de l'ID de session et de la clé d'expérience, donc l'attribution est **stable dans toute la session** et ne nécessite **aucun aller-retour serveur** avant le premier rendu (pas de scintillement, pas de décalage de mise en page).
2. Chaque événement `content_exposure` transporte la `variant` qui a été affichée.
3. `useConversion()` vous permet d'attribuer un objectif (par exemple `"cta_click"`) à cette variante.
4. L'endpoint des résultats d'expérience du tableau de bord compare les taux de conversion par variante, y compris la signification statistique (un test z).

## Installation

`@intlayer/analytics` est une dépendance **peer, optionnelle** — jamais installée automatiquement par un package de framework. Ajoutez-la aux côtés de `intlayer` :

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Si vous ne l'installez pas, chaque point d'intégration se résout en une opération vide (no-op) — voir [Zéro coût quand non installé](#zero-cout-quand-non-installe) ci-dessous.

## Configuration

Analytics **réutilise le bloc de configuration `editor` existant** — il n'y a pas de schéma de configuration `analytics` séparé à remplir :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Également utilisé comme endpoint d'ingestion d'analytique
    clientId: "your-client-id", // Aussi utilisé comme clé de projet analytique
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — l'URL de base vers laquelle les événements analytiques sont envoyés (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — la clé de projet publique attribuée à chaque événement ingéré. Elle agit également comme **interrupteur d'activation** : l'analytique reste complètement désactivée (et éliminée du code par tree-shaking, voir ci-dessous) jusqu'à ce que `clientId` soit configuré.

Si vous auto-hébergez (self-host) Intlayer, l'analytique pointe automatiquement vers votre propre instance puisqu'elle partage `editor.backendURL`.

## Support des frameworks

Analytics est intégré dans le `IntlayerProvider` partagé de `react-intlayer`, il est donc disponible dès aujourd'hui partout où ce provider est utilisé :

| Framework                                                | Statut                                                                                                           |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Disponible                                                                                                    |
| Next.js (`next-intlayer`)                                | ✅ Disponible (via `react-intlayer`)                                                                             |
| React Native / Expo (`react-native-intlayer`)            | ✅ Disponible (via `react-intlayer`)                                                                             |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Planifié — même client, liaisons au niveau du provider suivant le modèle de déploiement de `@intlayer/editor` |

## Utilisation

### Suivi automatique au niveau du provider

Aucune modification de code n'est requise. Une fois que `@intlayer/analytics` est installé et que `editor.clientId` est configuré, `IntlayerProvider` effectue automatiquement les actions suivantes :

- initialise le client d'analytique au montage (mount),
- enregistre un `page_view` au chargement initial,
- enregistre un `page_view` à chaque changement de locale,
- démarre la boucle de flush d'environ 20s et vide tous les événements restants au démontage / fermeture d'onglet (via `navigator.sendBeacon`, avec un repli vers `fetch(..., { keepalive: true })`).

### Suivi automatique au niveau des nœuds

Chaque fois que `useIntlayer` résout un élément de contenu pour l'affichage, l'interpréteur signale un événement `content_exposure` pour ce(tte) `dictionaryKey` + chemin de clé + locale exacte — là encore, aucune modification de code n'est requise. Les expositions répétées du même nœud dans une fenêtre de flush sont fusionnées en un seul événement avec un `count`, donc une liste qui se re-rend 50 fois n'envoie pas 50 événements.

### Suivi des conversions pour les tests A/B

Utilisez `useConversion()` pour attribuer un objectif à la variante qu'une session a vue :

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      Commencer
    </button>
  );
};
```

### Résolution d'une variante côté client

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Confidentialité & performance

- **Anonyme par conception** : les sessions sont identifiées par un ID rotatif ; le backend ne stocke jamais qu'un **hash SHA-256** de cet ID — jamais l'ID brut, jamais une adresse IP.
- **La localisation est approximative (coarse)** : uniquement un code pays, dérivé des en-têtes de géolocalisation CDN (`cf-ipcountry`, `x-vercel-ip-country`, …) — aucune IP n'est lue ou stockée.
- **Les URL excluent les paramètres de recherche** par défaut, les chaînes de requête (query strings) ne sont donc jamais capturées.
- **Échantillonnage (Sampling)** : `sampleRate` vous permet de conserver seulement une fraction des événements d'exposition de contenu sur les applications à fort trafic.
- **En lots (Batched)** : une requête environ toutes les 20 secondes (`flushInterval`), ou plus tôt si le tampon se remplit (`maxBufferSize`) — jamais une requête par événement.

### Zéro coût quand non installé

`@intlayer/analytics` suit exactement le même modèle de dépendance optionnelle que `@intlayer/editor` :

- chaque point d'intégration charge le package via un **`import()` dynamique enveloppé dans un `try/catch`** — une application qui n'installe jamais `@intlayer/analytics` ne paie aucun coût en taille de bundle ou à l'exécution, et ne voit jamais d'erreur ;
- une variable d'environnement au moment de la compilation (`INTLAYER_ANALYTICS_ENABLED`), définie automatiquement à `'false'` par `@intlayer/config` chaque fois que `editor.clientId` n'est pas configuré, permet aux bundlers d'**éliminer le code mort (dead-code-eliminate)** de toute l'intégration ;
- l'analytique est désactivée à l'intérieur de l'iframe de prévisualisation de l'éditeur/CMS Intlayer, afin que les sessions d'éditeur ne soient jamais comptées comme du vrai trafic.

## Tableau de bord : Page Analytique

Une fois que votre projet a collecté des événements, la page **Analytics** dans le [tableau de bord Intlayer](https://app.intlayer.org/analytics) (visible dans la barre latérale une fois qu'un projet est sélectionné) affiche :

- **Utilisateurs actifs** — visiteurs uniques sur la fenêtre glissante sélectionnée (7 / 30 / 90 jours).
- **Utilisateurs aujourd'hui** et **utilisateurs au cours des 7 derniers jours**.
- **Pages vues** sur la fenêtre sélectionnée.
- Un **graphique d'évolution** des visiteurs uniques quotidiens.
- Des onglets de répartition par **Locales** et par **Emplacement (Location)**, classant votre audience par locale et par pays.

## Référence API Backend

Tous les endpoints de lecture nécessitent une authentification ; l'ingestion est publique et attribuée par `clientId` dans le corps (body).

| Méthode | Endpoint                                    | Description                                                                     |
| ------- | ------------------------------------------- | ------------------------------------------------------------------------------- |
| `POST`  | `/api/analytics/events`                     | Ingérer un lot d'événements (public, attribué par `clientId` dans le body).     |
| `GET`   | `/api/analytics/overview`                   | Totaux de pages/locales pour le projet authentifié.                             |
| `GET`   | `/api/analytics/audience?days=30`           | Visiteurs uniques, pages vues, série quotidienne, répartitions locale + pays.   |
| `GET`   | `/api/analytics/content-stats`              | Totaux d'exposition par contenu, groupés par clé de dictionnaire/chemin/locale. |
| `GET`   | `/api/analytics/experiments/:experimentKey` | Taux de conversion par variante et signification statistique pour un test A/B.  |

Vous pouvez également appeler ces endpoints de manière programmatique avec le [SDK CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) :

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## Liens utiles

- [Dictionnaires dynamiques - Collections et variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md)
- [Intlayer CMS - SDK CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)
- [Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
- [Référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Guide d'auto-hébergement (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md)
