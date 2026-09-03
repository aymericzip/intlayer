---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: next-intl est-il obsolète en 2026 ?
description: next-intl est devenu le choix privilégié pour Next.js App Router. Pourtant, il impose encore un surpoids de bundle runtime et une gestion manuelle fastidieuse des namespaces.
keywords:
  - next-intl
  - Intlayer
  - Internationalisation
  - i18n
  - Next.js
  - Taille de bundle
  - Blog
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# next-intl est-il obsolète en 2026 ?

Lorsque Vercel a introduit l'App Router et retiré l'i18n native du Pages Router, `next-intl` s'est rapidement imposé. Grâce à une documentation soignée de Jan Amann et un support précoce de l'App Router, la bibliothèque est devenue la référence par défaut de la communauté.

Pourquoi alors s'interroger sur son adéquation aujourd'hui ?

**L'écosystème frontend s'est profondément transformé ces trois dernières années, alors que le modèle fondamental de `next-intl` est resté statique.**

Tandis que Next.js adoptait les React Server Components (RSC), le streaming et l'optimisation par le compilateur, `next-intl` traite toujours l'internationalisation comme une tâche d'exécution : transmission de volumineux objets JSON aux providers clients, analyseurs ICU embarqués dans les scripts du navigateur et gestion manuelle des namespaces pour tenter de réduire la taille des bundles.

<TOC/>

## Points clés

**Ralentissement des évolutions :**

Sur les 12 derniers mois, `next-intl` a enregistré environ 187 commits, principalement dédiés aux ajustements de compatibilité Next.js et aux correctifs de maintenance.

**Coût runtime côté client :**

Monter `NextIntlClientProvider` avec `useTranslations()` ajoute environ 12.8 Ko gzippés (51 Ko minifiés) avant même d'afficher le premier mot, soit environ 3 fois plus que `next-intlayer` (4.3 Ko).

**Fuite de contenu de près de 90% :**

Dans les configurations habituelles, **89.8% des données de traduction chargées sur une page appartiennent à d'autres routes**. Arriver sur `/contact` télécharge également les textes de `/pricing` et `/dashboard`.

**Gestion manuelle des namespaces :**

Éviter le gonflement des bundles impose de découper manuellement chaque namespace par page, augmentant le risque d'oublis en production.

**Partenariat commercial :**

En tant que partenaire officiel de Crowdin, la bibliothèque a peu d'intérêt à concevoir une commande de traduction IA locale et gratuite directement dans la CLI.

## Maintenance ou outillage moderne

Activité des commits sur les douze derniers mois :

| Répertoire            | Étoiles                                                                                                                                                | Commits totaux                                                                                                                                                      | Commits / an                                                                                                                                                       | Dernier commit                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Activité sur les 12 derniers mois :

- `amannn/next-intl` : **187 commits** (essentiellement montées de dépendances et correctifs légers).
- `aymericzip/intlayer` : **4 343 commits** (développement continu sur les compilateurs, extensions IDE, serveurs MCP et moteurs de traduction).

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

Une bibliothèque établie peut être stable. Mais l'i18n frontend progresse : les compilateurs retirent les traductions non référencées au moment du build, les LLMs automatisent la localisation en CI et les développeurs s'appuient sur des serveurs LSP et des agents IA. Une architecture cantonnée au runtime peine à suivre ce rythme.

## Mesure des performances sur Next.js 16 App Router

Benchmark réalisé sur une application App Router standard avec 10 routes et 10 langues :

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tests exécutés dans de vrais navigateurs avec compression gzip de production. Détails dans le [rapport de benchmark Next.js](https://intlayer.org/fr/doc/benchmark/nextjs).

### Empreinte de base des bibliothèques

Poids côté client avant d'ajouter le moindre texte :

| Bibliothèque           | Gzippé     | Minifié     |
| ---------------------- | ---------- | ----------- |
| `next-intl@4.9.1`      | 12.8 Ko    | 51.0 Ko     |
| `next-intlayer@8.7.12` | **4.3 Ko** | **13.3 Ko** |

### Poids des pages et fuites de données

| Configuration           | JS moyen / page (gz) | Fuite de langues | Fuite autres pages | Composant moyen (gz) |
| ----------------------- | -------------------- | ---------------- | ------------------ | -------------------- |
| Base (sans i18n)        | 150.8 Ko             | 0.0%             | 0.0%               | 0.7 Ko               |
| `next-intl` (statique)  | 163.5 Ko             | 4.2%             | **89.8%**          | 20.5 Ko              |
| `next-intl` (dynamique) | 163.4 Ko             | 9.7%             | **89.9%**          | 20.5 Ko              |
| `next-intlayer`         | **152.1 Ko**         | **0.0%**         | **0.0%**           | **7.2 Ko**           |

### Origine des fuites entre pages

Dans les architectures `next-intl` classiques, le layout racine charge la totalité des messages dès le départ :

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Puisque `messages` est fourni au client provider à la racine, le navigateur reçoit l'intégralité du dictionnaire sur chaque URL. Ouvrir la page `/login` oblige l'utilisateur à télécharger les textes de la FAQ, de la documentation et du tableau de bord.

Il est possible de contourner cela en découpant les fichiers JSON en plusieurs namespaces chargés au cas par cas. Mais maintenir manuellement cette correspondance route par route s'avère lourd et fragile.

Intlayer règle ce problème par analyse statique : le [compilateur Intlayer](https://intlayer.org/fr/doc/compiler) inclut exclusivement les textes réellement appelés sur chaque route, ramenant la fuite entre pages à **0.0%**.

## Pourquoi next-intl résiste au tree-shaking

L'API s'appuie sur des résolutions de chaînes textuelles au runtime :

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack et Webpack ne peuvent pas déterminer quelles clés du namespace `UserProfile` sont effectivement invoquées pendant l'exécution. Pour prévenir les erreurs de clés manquantes, **le bundler est forcé d'intégrer tout le namespace dans le bundle client**. Grâce à la déstructuration d'Intlayer, le compilateur sait quelles propriétés sont utilisées et retire les champs superflus. Consultez [l'optimisation de bundle](https://intlayer.org/fr/doc/concept/bundle-optimization) pour approfondir.

## Expérience développeur

### Fichiers JSON isolés ou co-localisation

Avec `next-intl`, les textes se trouvent dans des fichiers JSON regroupés dans un dossier `messages/`. Intlayer propose de co-localiser les déclarations de contenu juste à côté des composants :

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/fr.json"
{
  "authModal": {
    "title": "Connectez-vous à votre compte",
    "submitButton": "Continuer"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      fr: "Connectez-vous à votre compte",
    }),
    submitButton: t({
      en: "Continue",
      fr: "Continuer",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

En supprimant ou restructurant `AuthModal.tsx`, ses contenus associés sont immédiatement réorganisés ou retirés.

### Autocomplétion ou contraintes de typage strictes

L'extension de `IntlMessages` dans `next-intl` assure l'autocomplétion basée sur votre fichier linguistique de référence :

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

Cependant, seule la langue principale est contrôlée. Si une clé disparaît de `fr.json`, TypeScript ne signale aucune erreur. Votre CI passe alors au vert, tandis que vos utilisateurs francophones voient des textes manquants.

Intlayer dérive les types de l'ensemble des déclarations de contenu. Activer le [`strictMode`](https://intlayer.org/fr/doc/concept/configuration) bloque le build dès qu'une traduction manque dans n'importe quelle langue configurée.

### Outillage et assistants IA

| Fonctionnalité                   | `next-intl` | Intlayer                                                                 |
| -------------------------------- | ----------- | ------------------------------------------------------------------------ |
| **Extension VS Code**            | ❌ Aucune   | ✅ [Extension officielle](https://intlayer.org/fr/doc/vs-code-extension) |
| **Serveur de langage (LSP)**     | ❌ Aucun    | ✅ [LSP intégré](https://intlayer.org/fr/doc/lsp)                        |
| **Serveur MCP (pour agents IA)** | ❌ Aucun    | ✅ [Serveur MCP inclus](https://intlayer.org/fr/doc/mcp-server)          |
| **Compétences agents (Skills)**  | ❌ Aucune   | ✅ [Compétences documentées](https://intlayer.org/fr/doc/agent_skills)   |
| **CMS visuel en contexte**       | ❌ Aucun    | ✅ [Gratuit et open source](https://intlayer.org/fr/doc/concept/editor)  |

L'intégration d'un serveur LSP et d'un serveur MCP permet aux assistants de code intelligents de parcourir le graphe de contenu, de compléter les chaînes multilingues et d'actualiser les dictionnaires avec précision.

## Le partenariat avec Crowdin et l'outillage

`next-intl` est officiellement partenaire de Crowdin. Les partenariats commerciaux soutiennent l'open source, mais influencent logiquement la feuille de route : conçu pour interagir avec des solutions TMS externes, `next-intl` n'a pas vocation à intégrer un outil de traduction IA gratuit et local.

Intlayer fournit ces mécanismes nativement :

**Auto-remplissage local par IA (`intlayer fill`) :**

Identifie et traduit automatiquement les clés manquantes avec vos propres clés API (OpenAI, Anthropic, Mistral ou Gemini).

**CMS visuel auto-hébergeable :**

Utilisez le [CMS Intlayer](https://intlayer.org/fr/doc/concept/cms) pour permettre aux équipes éditoriales de modifier les contenus avec validation directe dans Git.

**Licence open source permissive :**

L'ensemble de l'écosystème est sous licence Apache 2.0.

## Dans quels cas next-intl reste-t-il adapté ?

<AccordionGroup>
<Accordion header="Besoins ICU MessageFormat élaborés">

Si votre application exploite des logiques complexes de pluriels imbriqués et de sélecteurs ordinaux, l'intégration ICU de `next-intl` est éprouvée.

</Accordion>
<Accordion header="Processus Crowdin déjà en place">

Pour les organisations dont le pipeline est déjà connecté à Crowdin, `next-intl` s'intègre naturellement.

</Accordion>
<Accordion header="Applications stables et fonctionnelles">

Si votre base de code donne satisfaction et que le poids du bundle respecte vos contraintes, une migration n'est pas impérative.

</Accordion>
</AccordionGroup>

## Comment améliorer ma configuration next-intl existante ?

Intlayer propose un package de compatibilité direct qui reproduit exactement les signatures de fonctions et hooks de `next-intl` (tels que `useTranslations`, `getTranslations` ou les utilitaires de navigation). Vous n'avez pas besoin de réécrire vos composants pour bénéficier des optimisations au niveau du compilateur.

L'installation s'effectue en une seule commande :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Cette CLI interactive :

1. Installe le package de compatibilité `@intlayer/next-intl`.
2. Configure les alias du bundler afin que vos imports habituels (`next-intl`, `next-intl/server`) pointent directement vers Intlayer, vous permettant de retirer l'ancienne bibliothèque de votre `package.json`.
3. Active immédiatement le support du serveur de langage (LSP), l'élimination des fuites de données entre routes (tree-shaking complet) et les flux de traduction IA locale sans refactorisation massive.

Pour des instructions détaillées étape par étape, consultez nos guides dédiés :

- **Couche de compatibilité directe :** Gardez vos hooks `useTranslations` existants grâce à la [couche d'adaptation `next-intl`](https://intlayer.org/fr/doc/compatibility/next-intl).
- **Migration assistée :** Transformez vos fichiers JSON vers des dictionnaires typés via notre [guide de migration next-intl](https://intlayer.org/fr/doc/migration/next-intl).
- **Approche hybride :** Conservez `next-intl` pour l'exécution tout en [utilisant Intlayer avec next-intl](https://intlayer.org/fr/blog/intlayer-with-next-intl) pour automatiser vos traductions locales par IA.

Évaluez le volume de chargement et les fuites de votre application Next.js grâce au [scanner SEO i18n gratuit](https://intlayer.org/i18n-seo-scanner) :

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Pour aller plus loin

- [Benchmark Next.js i18n : analyse comparative détaillée](https://intlayer.org/fr/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer : comparatif exhaustif](https://intlayer.org/fr/blog/next-i18next-vs-next-intl-vs-intlayer)
- [i18next est-il obsolète en 2026 ?](https://intlayer.org/fr/blog/is-i18next-outdated)
- [Pourquoi choisir une internationalisation basée sur la compilation](https://intlayer.org/fr/blog/compiler-vs-declarative-i18n)
