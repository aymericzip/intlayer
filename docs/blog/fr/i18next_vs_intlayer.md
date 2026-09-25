---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs Intlayer: Benchmark & Comparatif 2026"
description: "react-i18next et next-i18next mesurés face à Intlayer sur Next.js et TanStack Start. Taille de bundle, fuites de contenu, réactivité au changement de langue et expérience développeur."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internationalisation
  - i18n
  - Benchmark
  - Taille de bundle
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | Benchmark d'internationalisation (i18n) React & Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` est le framework d'i18n le plus utilisé de l'écosystème JavaScript. À travers `react-i18next` et `next-i18next`, il alimente une grande partie des applications React et Next.js. Intlayer est une alternative basée sur un compilateur, découpée par composant.

Cet article les compare sur des mesures concrètes plutôt que sur des listes de fonctionnalités. Les chiffres proviennent de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), une suite open source qui compile la même application avec chaque bibliothèque et enregistre ce que le navigateur télécharge réellement.

<TOC/>

> **tl;dr**: `i18next` est le runtime le plus lourd du benchmark: **+77 KB gzip par page** sur Next.js dans la configuration naïve, **+22 KB** après l'optimisation complète par namespaces + lazy loading. Intlayer n'ajoute que **+0.3 KB**. Chaque configuration d'i18next en dehors de celle entièrement compartimentée (scoped) envoie **~90% des chaînes des pages distantes**; Intlayer n'envoie **0%** par défaut. Changer de langue avec un backend chargé à la demande prend **123 à 185 ms** avec `react-i18next` contre **3 à 4 ms** avec Intlayer. L'adaptateur `@intlayer/next-i18next` conserve l'API d'i18next et atteint **150.7 KB** par page contre **218.5 KB** pour l'original.

## En résumé

- **i18next / react-i18next / next-i18next** - Mature, riche en plugins, agnostique du framework. Namespaces, détecteurs de langue, backends, ICU via plugin, `<Trans>` pour le contenu enrichi. Le contenu est centralisé dans `locales/{lng}/{ns}.json`. Puissant, mais chaque optimisation (découpage des namespaces, chargement par page, sécurité des types) représente une configuration que vous devez maintenir.
- **Intlayer** - Modèle centré sur les composants. Les dictionnaires `.content.ts` se trouvent à côté du composant qu'ils desservent, un compilateur au build effectue le tree-shaking et les charge à la demande par composant et par locale, des types TypeScript stricts sont générés à partir de votre contenu, et les traductions manquantes provoquent des erreurs au build. Fournit middleware, helpers SEO, un Éditeur Visuel / CMS et la traduction assistée par IA.

| Bibliothèque            | Étoiles GitHub                                                                                                                                                                     | Commits totaux                                                                                                                                                                         | Dernier commit                                                                                                                                          | Première version | Version NPM                                                                                                           | Téléchargements NPM                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Avril 2024       | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Janvier 2012     | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Décembre 2015    | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Novembre 2018    | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Les badges se mettent à jour automatiquement. Les données évoluent au fil du temps.

## Comparaison des fonctionnalités

| Fonctionnalité                                     | Intlayer (`react-intlayer` / `next-intlayer`)                                     | i18next (`react-i18next` / `next-i18next`)                                       |
| -------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Traductions proches des composants**             | ✅ Oui, `.content.ts` colocalisé avec chaque composant                            | ❌ Non, centralisé dans `locales/{lng}/{ns}.json`                                |
| **Intégration TypeScript**                         | ✅ Types stricts générés automatiquement à partir du contenu                      | ⚠️ Basique; clés strictes via extension `CustomTypeOptions` et typage ressources |
| **Détection des traductions manquantes**           | ✅ Erreur TypeScript + erreur/avertissement au build                              | ⚠️ Fallback au runtime (`saveMissing`, écho de clé)                              |
| **Contenu riche (JSX / Markdown / composants)**    | ✅ Support direct                                                                 | ⚠️ `<Trans>` avec placeholders indexés                                           |
| **Support ICU**                                    | ⚠️ En cours                                                                       | ⚠️ Via plugin (`i18next-icu`)                                                    |
| **Pluralisation**                                  | ✅ Motifs basés sur les énumérations                                              | ✅ Suffixes `_one` / `_other` (Intl.PluralRules)                                 |
| **Formatage (dates, nombres, devises)**            | ✅ `useNumber`, `useDate`, ... (Intl sous le capot)                               | ⚠️ Formateurs d'interpolation ou `Intl.*` manuel                                 |
| **Routage localisé et middleware**                 | ✅ Proxy/middleware intégré, `getMultilingualUrls`                                | ⚠️ Non natif; middleware personnalisé ou tiers                                   |
| **Helpers SEO (hreflang, sitemap, robots)**        | ✅ Helpers intégrés                                                               | ❌ Manuel                                                                        |
| **Composants serveur synchrones**                  | ✅ `useIntlayer` de `next-intlayer/server` utilisable dans tout composant serveur | ⚠️ `getFixedT` sur la page, puis `t` transmis en props                           |
| **Tree-shaking (n'embarque que le contenu utile)** | ✅ Par composant, par locale, automatisé par le compilateur                       | ⚠️ Manuel: namespaces + liste `ns` par page + backend                            |
| **Lazy loading**                                   | ✅ `importMode: 'dynamic'` (une ligne de config)                                  | ✅ Via plugins backend (`i18next-resources-to-backend`, `i18next-http-backend`)  |
| **Purger le contenu inutilisé**                    | ✅ Dictionnaires orphelins supprimés au build                                     | ❌ Non intégré                                                                   |
| **Test des traductions manquantes (CLI / CI)**     | ✅ `npx intlayer content test`                                                    | ⚠️ `i18next-parser` / outil tiers                                                |
| **Traduction assistée par IA**                     | ✅ Intégrée, utilise vos propres clés d'API                                       | ❌ Non (Locize est un service tiers payant)                                      |
| **Éditeur Visuel / CMS**                           | ✅ Éditeur Visuel gratuit + CMS optionnel                                         | ❌ Non (Locize / plateformes externes)                                           |
| **Serveur MCP et compétences d'agent (Skills)**    | ✅ Oui                                                                            | ❌ Non                                                                           |
| **Écosystème / communauté**                        | ⚠️ Plus récent mais en forte croissance                                           | ✅ Le plus étendu et le plus mature                                              |

## Le benchmark

### Ce qui a été mesuré

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construit **la même application** avec chaque bibliothèque: **10 pages** (accueil, à propos, blog, carrières, contact, FAQ, tarifs, produits, paramètres, équipe), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), des composants et un contenu identiques. Les pages sont mesurées en `en` et en `fr`. Chaque bibliothèque est testée sous un maximum de quatre **stratégies de chargement**, de la configuration naïve à l'optimale:

| Stratégie          | Description                                                                                   | Qui fait cela                              |
| ------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **static**         | Toutes les locales et pages regroupées (`resources` inlinées dans `init()`)                   | Prototypes rapides, code généré par IA     |
| **dynamic**        | Seule la locale active est chargée via un backend, mais tous les namespaces à la fois         | La majorité des projets                    |
| **scoped-static**  | Un namespace par route, tous chargés en amont                                                 | Rare                                       |
| **scoped-dynamic** | Un namespace par route + chargement dynamique via backend. Seulement la page et locale active | Applications avec un budget de perf strict |

Intlayer n'a pas de variante "scoped": le compilateur isole le contenu **par composant** automatiquement, ses lignes `static` et `dynamic` sont donc déjà découpées.

Pour chaque build, la suite enregistre:

- **Lib size**: taille gzip d'un composant vide qui n'importe que la bibliothèque i18n. Le coût fixe du runtime.
- **Page JS**: JavaScript gzip téléchargé par page, en moyenne sur l'ensemble des pages et locales.
- **Locale leak %**: part des chaînes traduites dans le JS téléchargé appartenant à une locale que l'utilisateur ne consulte **pas** (évalué sur `en` et `fr`, donc 50% signifie "l'autre locale mesurée est entièrement présente"; avec 10 locales compilées, le gaspillage réel est bien supérieur).
- **Page leak %**: part des chaînes traduites dans le JS téléchargé appartenant à une page sur laquelle l'utilisateur **n'est pas**.
- **Component avg**: taille gzip moyenne de chaque composant compilé isolément. Indique le poids du runtime i18n injecté dans chaque composant.
- **E2E reactivity**: temps réel entre la sélection d'une nouvelle locale et la mise à jour de `html[lang]` dans le DOM (Playwright, 5 itérations).
- **Hydration**: durée de la phase d'hydratation de React.

> Les données ci-dessous proviennent de l'exécution du **2026-09-12** avec `next-i18next` 16.3.0, `react-i18next` 17.0.13 et `intlayer` 9.5.1. L'application de test est volontairement modeste (quelques dizaines de chaînes par locale), les pourcentages de fuite décrivent donc un **comportement type**: ils augmentent à mesure que votre contenu grandit tandis que le coût du runtime reste fixe.

### Résultats sur Next.js (`next-i18next`)

Sélectionnez les métriques et les bibliothèques qui vous intéressent :

<I18nBenchmark framework="nextjs" vertical/>

| Bibliothèque                      | Stratégie      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | Réactivité E2E | Hydratation |
| --------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (sans i18n)              | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |        16.4 ms |     15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |        15.4 ms |     27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |        16.4 ms |     14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |        15.9 ms |     15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |     16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |     15.9 ms |
| `@intlayer/next-i18next` (compat) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |        10.7 ms |     11.3 ms |
| `@intlayer/next-i18next` (compat) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |        11.9 ms |     10.6 ms |

**Comment interpréter ces données**

- **Coût du runtime.** Le cœur d'i18next plus `react-i18next` représente le runtime le plus lourd: **19.7 KB gzip** pour un composant vide, contre 5.5 KB pour `next-intlayer`.
- **La configuration naïve coûte cher.** Inliner `resources` dans `init()` génère **218.5 KB par page**, soit +77.5 KB par rapport à l'application de base. Chaque page embarque chaque namespace.
- **Optimiser demande beaucoup d'efforts.** Passer à un backend (`dynamic`) fait gagner 49 KB mais laisse fuiter **90% des chaînes des pages distantes** et, dans cette configuration, la moitié des chaînes appartiennent à la mauvaise langue. Ajouter un découpage par namespace sur chaque route (`scoped-dynamic`) permet enfin d'atteindre 0% de fuite à **163.4 KB**, ce qui reste **+22.4 KB par page** de plus qu'Intlayer à 141.3 KB, qui n'a nécessité aucune configuration spécifique.
- **Taille des composants.** Un composant utilisant `useTranslation()` pèse entre 26 et 79 KB selon la configuration; le même composant avec `useIntlayer()` ne pèse que 6.9 KB.
- **L'hydratation** monte à 27.7 ms dans la configuration `dynamic`: l'instance i18next s'initialise et résout son backend côté client avant que React ne puisse hydrater la page.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet, chaque bibliothèque et chaque stratégie, dans le [rapport de benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md).

### Résultats sur TanStack Start (`react-i18next`)

La même application de test sur TanStack Start avec `react-i18next` pur, ce qui isole les dépendances propres à Next.js.

| Bibliothèque        | Stratégie      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | Réactivité E2E | Hydratation |
| ------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (pas i18n) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |     21.6 ms |
| `react-i18next`     | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |        12.9 ms |     85.1 ms |
| `react-i18next`     | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |       123.1 ms |     32.9 ms |
| `react-i18next`     | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |       185.1 ms |     25.2 ms |
| `react-i18next`     | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |        17.6 ms |     11.3 ms |
| **`intlayer`**      | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |     11.5 ms |
| **`intlayer`**      | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |     14.1 ms |

**Comment interpréter ces données**

- L'application `react-i18next` naïve envoie **+69 KB par page** de plus que l'application de base, et l'hydratation prend **85 ms** (4 fois la base) parce que l'arbre complet des ressources est parsé et enregistré côté client avant le premier rendu.
- **Le changement de langue met en lumière la latence du lazy loading.** Lorsque les ressources sont chargées à la demande via un backend, changer de langue nécessite un aller-retour réseau avant que `html[lang]` ne se mette à jour: **123 ms** en `dynamic`, **185 ms** en `scoped-static`. Intlayer met à jour le DOM en **3 à 4 ms** dans les deux cas: le changement de langue est immédiat et ne dépend pas d'une requête réseau.
- La configuration pleinement optimisée `scoped-dynamic` atteint 0% de fuite à 127.2 KB, restant **+8.6 KB** au-dessus de la ligne `dynamic` d'Intlayer, et a nécessité une correspondance routes-namespaces, un backend de ressources et une frontière Suspense par route pour y parvenir.
- La ligne `static` d'Intlayer présente déjà **0% de fuite de page** car seuls les dictionnaires importés par les composants de la page sont inclus dans le bundle. Activer `importMode: 'dynamic'` supprime également la fuite de locale.
- **Taille des composants**: 24 à 27 KB par composant avec `react-i18next` contre 6 à 8 KB avec Intlayer. `useTranslation()` lie chaque composant à l'instance globale d'i18next.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet dans le [rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md).

## Pourquoi un tel écart? Instance globale vs dictionnaires compilés

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` a été pensé en 2012 comme un runtime: une instance globale conserve un dépôt de ressources, des plugins l'enrichissent, et `t()` résout les clés au rendu. C'est ce qui le rend si flexible (n'importe quel framework, backend ou format) et également ce qui le rend lourd:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # doit savoir qu'elle requiert ["common", "about"]
```

L'instance ne peut pas anticiper les clés qu'un composant demandera, elle conserve donc tous les namespaces que vous lui demandez de charger. Optimiser signifie que **vous** devez découper les catalogues en namespaces, **vous** devez lister les namespaces nécessaires à chaque page, et **vous** devez maintenir cette liste à jour quand les composants se déplacent.

La facture augmente sur deux axes à la fois, les pages et les locales :

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Comme le soulignent les [notes du benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "maintenir la sécurité des types et savoir exactement quel namespace inclure sur quelle page est un cauchemar".

Intlayer élimine l'instance. Le contenu est déclaré à côté du composant, et le compilateur résout le graphe de dépendances au build:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` identifie quel composant importe quel dictionnaire, n'embarque que ceux-ci, uniquement pour la locale active, et exclut ceux qui ne sont pas référencés. Le modèle "scoped-dynamic" devient le résultat direct du build plutôt qu'une discipline manuelle imposée à l'équipe.

> Pour obtenir les chiffres de la ligne `dynamic`, définissez `dictionary.importMode: 'dynamic'` dans `intlayer.config.ts`. Consultez la [documentation sur l'optimisation de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md).

## Expérience développeur

### Configuration

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

Il faut y ajouter un `I18nProvider` côté client qui recrée l'instance avec les mêmes options, un `generateStaticParams`, et une liste de `namespaces` sur chaque page.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### Composant client

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> La page affichant ce composant doit charger le namespace `about`, et `t("counter.label")` reste une simple chaîne de caractères non typée à moins d'étendre `CustomTypeOptions`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

`label` et `increment` sont strictement typés; une faute de frappe déclenche une erreur TypeScript, et une valeur française manquante génère une erreur au build.

</Tab>
</Tabs>

### Composant serveur synchrone

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

La page appelle `i18n.getFixedT(locale, "about")` et fait descendre `t` et `locale` en tant que props.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## Gardez l'API d'i18next, profitez des performances d'Intlayer

Il n'est pas nécessaire de réécrire vos composants pour bénéficier des résultats du benchmark ci-dessus. `@intlayer/i18next`, `@intlayer/react-i18next` et `@intlayer/next-i18next` sont des adaptateurs prêts à l'emploi: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, pluriels `_one` / `_other`, suffixes de contexte et `returnObjects` continuent de fonctionner, alimentés par les dictionnaires Intlayer compilés.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

Dans le benchmark, la version adaptée de la même application Next.js est passée de **218.5 KB à 150.7 KB** par page, de **78.5 KB à 9.7 KB** par composant, de **~90% de fuite de page à 0%**, et d'une hydratation de 15.6 ms à 11.3 ms, sans modifier le code de l'application. Vos fichiers existants `locales/{lng}/{ns}.json` peuvent rester la source de vérité grâce au plugin de synchronisation JSON.

Consultez les guides de migration: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-i18next_to_intlayer.md).

## Quand choisir quelle solution?

<AccordionGroup>
<Accordion header="Choisir i18next">

Si vous avez besoin de son écosystème de plugins (détecteurs, backends, ICU, Locize), si vous traduisez aussi en dehors de React (services Node, vanilla JS, autres frameworks), si votre équipe le maîtrise déjà, ou si une plateforme de traduction externe exige `locales/{lng}/{ns}.json`. Prévoyez le temps de découper vos catalogues en namespaces, de configurer un backend et de maintenir la table routes-namespaces si la performance compte.

</Accordion>
<Accordion header="Choisir Intlayer">

Vous voulez **du contenu découpé par composant**, **un typage TypeScript strict**, **des erreurs au build en cas de clé manquante**, **du tree-shaking et lazy loading sans effort**, un changement de langue instantané, des composants serveur synchrones et des outils éditoriaux intégrés ([Éditeur Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), [traduction IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md), [serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)). Particulièrement pertinent pour les codebases modulaires et les design systems.

</Accordion>
<Accordion header="Choisir les adaptateurs @intlayer/*-i18next">

Vous utilisez déjà i18next et souhaitez obtenir les gains de bundle et de réactivité sans refactoriser vos composants. Vos fichiers `locales/{lng}/{ns}.json` restent la source de vérité. Mesuré côte à côte dans [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18next_vs_intlayer-i18next.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Pourquoi i18next est-il tellement plus lourd que les autres bibliothèques ?">

Il a été conçu comme un runtime indépendant du framework : une instance globale, un pipeline de plugins, un magasin de ressources, un résolveur de clés. Cette flexibilité est compilée dans chaque bundle. Un composant vide qui n'importe que la bibliothèque coûte **19.7 KB gzip** avec `next-i18next` contre **5.5 KB** avec `next-intlayer`, et ce coût est payé sur chaque page quel que soit le poids de votre contenu.

</Question>

<Question title="Le lazy loading avec un backend résout-il le problème ?">

Il réduit les octets, pas la latence. Passer à `i18next-resources-to-backend` économise ~49 KB par page mais ajoute un aller-retour réseau lors du changement de langue : **123 ms** dans la configuration `dynamic` et **185 ms** dans `scoped-static`, contre **3-4 ms** avec Intlayer. L'hydratation grimpe aussi à 27.7 ms car l'instance résout son backend avant que React ne puisse hydrater.

</Question>

<Question title="Puis-je atteindre 0% de fuite avec i18next ?">

Oui, avec `scoped-dynamic` : un namespace par route, un backend de ressources et une table de correspondance pages-namespaces maintenue à la main. On arrive à 163.4 KB par page sur Next.js, soit toujours **+22 KB** par rapport aux 141.3 KB d'Intlayer qui n'a nécessité aucune configuration. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md).

</Question>

<Question title="Dois-je réécrire mes composants pour migrer ?">

Non. `@intlayer/i18next`, `@intlayer/react-i18next` et `@intlayer/next-i18next` conservent `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, les pluriels `_one` / `_other`, les suffixes de contexte et `returnObjects`. Une seule ligne de plugin dans `next.config.ts` ou `vite.config.ts`. Guide pas à pas dans le [guide de migration next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-i18next_to_intlayer.md).

</Question>

<Question title="Qu'advient-il de mes plugins i18next ?">

Les backends et détecteurs de langue sont acceptés mais inertes : il n'y a plus rien à charger ou détecter au runtime. La détection de locale devient la configuration de routage d'Intlayer (préfixe d'URL, cookie, en-tête). Si votre application récupère des traductions depuis un CMS au moment de la requête, utilisez le [CMS d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) ou `intlayer pull` / `push` à la place.

</Question>

</FAQ>

## Comparaisons associées

Même benchmark, autres bibliothèques :

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/react-i18next_vs_react-intl_vs_intlayer.md)

Pour aller plus loin sur i18next :

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18next_vs_intlayer-i18next.md), les adaptateurs mesurés sur la même application
- [i18next est-il dépassé?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_i18next_outdated.md)
- [Utiliser Intlayer avec i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/intlayer_with_i18next.md) et [avec react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/intlayer_with_react-i18next.md)
- [Comment internationaliser une application Next.js avec next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-i18next.md)

Documentation de référence :

- [Rapport de benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md) et [rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)
- Adaptateurs de compatibilité : [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/next-i18next.md)
- Guides de migration : [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-i18next_to_intlayer.md)
- [Optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et [le compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md)
- [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md)
- [i18n pilotée par compilateur vs déclarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md)

## Étoiles GitHub

Les étoiles GitHub reflètent la popularité d'un projet, la confiance de la communauté et sa pérennité. Bien qu'elles ne mesurent pas directement la qualité technique, elles montrent combien de développeurs trouvent le projet utile, suivent ses avancées et sont susceptibles de l'adopter.

[![Graphique d'historique des étoiles](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Conclusion

`i18next` a gagné sa place: il s'exécute partout, propose un plugin pour chaque besoin et bénéficie de plus d'une décennie de maintenance. Le benchmark met toutefois en lumière le coût d'une architecture centrée sur le runtime. La configuration déployée par la majorité des équipes ajoute **+70 à 77 KB gzip par page**, laisse fuiter **~90% du contenu des autres pages**, et un changement de langue avec chargement dynamique prend **plus de 100 ms**. Atteindre 0% de fuite reste envisageable, mais impose un backend, un namespace par route et une table de correspondance maintenue manuellement, tout en restant **+9 à 22 KB** plus lourd qu'Intlayer.

Intlayer délègue ce travail au compilateur. Dictionnaires par composant, lazy loading par locale et purge du contenu inutile deviennent des artéfacts de build plutôt que des conventions complexes. Sur la même application: **+0.3 KB par page**, **0% de fuite**, des composants **3 à 10 fois plus légers** et un basculement de langue en **3 à 4 ms**.

Toutes les données brutes, applications de test et scripts sont disponibles dans le [dépôt Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Testez-le par vous-même.

Consultez la documentation ['Pourquoi Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) pour en savoir plus.
