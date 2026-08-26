---
createdAt: 2026-07-08
updatedAt: 2026-08-22
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
  - version: 9.3.3
    date: 2026-08-22
    changes: "Activer les analytics par défaut dès que `@intlayer/analytics` est installé"
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

`@intlayer/analytics` est une **dépendance optionnelle** de chaque package de framework (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …) : la plupart des projets l'ont donc déjà. Installez-la explicitement si votre configuration ignore les dépendances optionnelles (`npm install --no-optional`, …) :

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

Installer le package suffit à activer l'analytique : `analytics.enabled` vaut `true` par défaut, et `@intlayer/config` le résout à `false` dès que le package est introuvable dans votre projet. Si vous ne l'installez pas, chaque point d'intégration se résout en une opération vide (no-op) — voir [Zéro coût quand non installé](#zero-cout-quand-non-installe) ci-dessous.

## Configuration

L'analytique ne nécessite aucune configuration pour démarrer : elle est **activée par défaut** et **réutilise le bloc de configuration `editor` existant** pour son endpoint et sa clé de projet.

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

### Désactiver l'analytique

Le bloc optionnel `analytics` permet d'ajuster — ou de désactiver — la collecte :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Par défaut : true — exclut toute l'intégration du bundle
    flushInterval: 20_000, // Millisecondes entre deux envois groupés
    sampleRate: 1, // Fraction des sessions enregistrées, de 0 (aucune) à 1 (toutes)
  },
};

export default config;
```

Désinstaller `@intlayer/analytics` produit le même effet que `enabled: false`. Consultez la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour la liste complète des champs.

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

  </Tab>
  <Tab label="Angular" value="angular">

`variant` et `isAssigned` sont des `Signal`s — appelez-les pour lire la valeur.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Les poids sont optionnels — passez-en un par variante pour biaiser la répartition, par exemple `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

L'enfant lit ensuite la [Variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/variants.md) du dictionnaire qui correspond :

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> Lire la variante dans un **composant enfant** est ce qui fait que cela fonctionne en dehors de React : dans Vue, Svelte, Solid et Angular, le sélecteur passé à `useIntlayer` est capturé lors de la configuration du composant, donc la lecture doit se faire dans un composant qui ne se monte qu'une fois la variante connue.

Si l'expérience couvre une page entière plutôt qu'un seul dictionnaire, remontez la variante sur le fournisseur à la place — voir [Variante ambiante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/variants.md#ambient-variant). Chaque `useIntlayer` ci-dessous se résout alors contre celle-ci sans modification du site d'appel.

Si vous avez besoin de l'assignment brut en dehors d'un composant, accédez directement au client :

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` assigne uniquement — il n'enregistre pas l'exposition. Préférez `useExperiment()`, sinon le taux de conversion n'a pas de dénominateur.

## Confidentialité & performance

- **Anonyme par conception** : les sessions sont identifiées par un ID rotatif ; le backend ne stocke jamais qu'un **hash SHA-256** de cet ID — jamais l'ID brut, jamais une adresse IP.
- **La localisation est approximative (coarse)** : uniquement un code pays, dérivé des en-têtes de géolocalisation CDN (`cf-ipcountry`, `x-vercel-ip-country`, …) — aucune IP n'est lue ou stockée.
- **Les URL excluent les paramètres de recherche** par défaut, les chaînes de requête (query strings) ne sont donc jamais capturées.
- **Échantillonnage (Sampling)** : `sampleRate` vous permet de conserver seulement une fraction des événements d'exposition de contenu sur les applications à fort trafic.
- **En lots (Batched)** : une requête environ toutes les 20 secondes (`flushInterval`), ou plus tôt si le tampon se remplit (`maxBufferSize`) — jamais une requête par événement.

### Zéro coût quand non installé

`@intlayer/analytics` suit exactement le même modèle de dépendance optionnelle que `@intlayer/editor` :

- chaque point d'intégration charge le package via un **`import()` dynamique enveloppé dans un `try/catch`** — une application qui n'installe jamais `@intlayer/analytics` ne paie aucun coût en taille de bundle ou à l'exécution, et ne voit jamais d'erreur ;
- une variable d'environnement au moment de la compilation (`INTLAYER_ANALYTICS_ENABLED`), définie automatiquement à `'false'` par `@intlayer/config` dès que le package n'est pas installé, que `analytics.enabled` vaut `false` ou que `editor.clientId` n'est pas configuré, permet aux bundlers d'**éliminer le code mort (dead-code-eliminate)** de toute l'intégration ;
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

> **Côté serveur uniquement.** `createIntlayerCMS()` s'authentifie avec `clientId` + `clientSecret`, et le secret n'est jamais disponible dans le navigateur — ce snippet émettrait des requêtes non authentifiées s'il s'exécutait là. Conservez-le dans un gestionnaire de route, une action serveur ou un script.

## Liens utiles

- [Dictionnaires dynamiques - Collections et variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md)
- [Intlayer CMS - SDK CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)
- [Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
- [Référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Guide d'auto-hébergement (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md)
