---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "Lingui vs Intlayer: Benchmark & Comparaison 2026"
description: Deux bibliothèques i18n basées sur compiler mesurées sur Next.js et TanStack Start. Taille du bundle, fuite de contenu, taille du composant, hydratation, réactivité du changement de locale et expérience développeur.
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | Benchmark d'Internationalization (i18n) React & Next.js

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui et Intlayer sont les deux bibliothèques de ce benchmark qui s'appuient sur un **compilateur** plutôt que sur un runtime pur. Lingui extrait les messages des macros au moment de la compilation et compile les catalogues par locale. Intlayer compile les dictionnaires par composant et les tree-shake par locale. Sur le papier, ils devraient être proches. Les chiffres montrent où ils divergent.

Les données proviennent de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), une suite open-source qui construit la même application avec chaque bibliothèque et enregistre ce que le navigateur télécharge et exécute réellement.

<TOC/>

> **tl;dr**: Lingui est le plus proche d'Intlayer en termes de JavaScript brut par page : **115-120 KB** vs **118.6 KB** sur TanStack Start une fois le chargement différé configuré, **148.6 KB** vs **141.3 KB** sur Next.js. L'écart s'élargit ailleurs : un composant Lingui compilé isolément pèse **58-153 KB** contre **6-8 KB** pour Intlayer, l'hydratation prend **28-34 ms** contre **11-14 ms**, le fallback pour la locale source fuit **3-15%** des chaînes de caractères `en` dans les pages `fr` dans chaque setup optimisé, et atteindre ce setup optimisé signifie extraire, compiler et sélectionner manuellement les catalogs par route. Intlayer y arrive sans aucune configuration.

## En résumé

- **Lingui** - Basé sur des macros (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, catalogues `.po` / JSON, workflow `lingui extract` + `lingui compile`. Compile les IDs de message en hashes courts, supporte le chargement dynamique de catalogues par locale. Bien établi, framework-agnostique, forte histoire de tooling pour traducteurs autour de `.po`.
- **Intlayer** - Modèle de contenu centré sur les composants. Les dictionnaires `.content.ts` se situent à côté du composant qu'ils servent, un compilateur au moment du build tree-shake et lazy-load par composant et par locale, les types TypeScript stricts sont générés à partir de votre contenu, et les traductions manquantes échouent au moment du build. Livré avec middleware, helpers SEO, un Éditeur Visuel / CMS et traduction assistée par IA.

| Bibliothèque          | Étoiles GitHub                                                                                                                                                                 | Commits Totaux                                                                                                                                                                     | Dernier Commit                                                                                                                                      | Première Version | Version NPM                                                                                                         | Téléchargements NPM                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Avril 2024       | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Dec 2016         | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Les badges se mettent à jour automatiquement. Les snapshots varieront au fil du temps.

## Comparaison des fonctionnalités côte à côte

| Fonctionnalité                                  | Intlayer (`react-intlayer` / `next-intlayer`)                                    | Lingui (`@lingui/core` / `@lingui/react`)                                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Traductions près des composants**             | ✅ Oui, `.content.ts` colocalisé avec chaque composant                           | ⚠️ Chaînes de caractères sources inline dans JSX via macros; traductions dans les catalogues `.po` centralisés           |
| **Intégration TypeScript**                      | ✅ Types stricts auto-générés à partir du contenu                                | ⚠️ Les macros sont typées ; les IDs de message ne le sont pas, les entrées de catalogue manquantes ne sont pas détectées |
| **Détection des traductions manquantes**        | ✅ Erreur TypeScript + erreur/avertissement au moment de la compilation          | ⚠️ `lingui extract` rapporte les statistiques ; le fallback à l'exécution utilise la chaîne source                       |
| **Contenu riche (JSX / Markdown / composants)** | ✅ Support direct                                                                | ✅ `<Trans>` avec composants imbriqués                                                                                   |
| **Support ICU**                                 | ⚠️ WIP                                                                           | ✅ Oui (macros `plural`, `select`, `selectOrdinal`)                                                                      |
| **Formatage (dates, nombres, devises)**         | ✅ `useNumber`, `useDate`, ... (Intl sous le capot)                              | ✅ `i18n.date()`, `i18n.number()`                                                                                        |
| **Routage localisé et middleware**              | ✅ Proxy/middleware intégré, `getMultilingualUrls`                               | ❌ Pas dans le cœur                                                                                                      |
| **SEO helpers (hreflang, sitemap, robots)**     | ✅ Built-in helpers                                                              | ❌ Manual                                                                                                                |
| **Synchronous server components**               | ✅ `useIntlayer` from `next-intlayer/server` works in any child server component | ⚠️ Needs an `I18n` instance per request, passed down or set via `setI18n`                                                |
| **Tree-shaking (ship only used content)**       | ✅ Per component, per locale, automated by the compiler                          | ⚠️ Per locale via `lingui compile`; per route needs manual catalog splitting                                             |
| **Chargement lazy**                             | ✅ `importMode: 'dynamic'` (une ligne de config)                                 | ⚠️ `import()` manuel des catalogues compilés + `i18n.load()` / `i18n.activate()`                                         |
| **Purger le contenu inutilisé**                 | ✅ Les dictionnaires morts sont supprimés au moment du build                     | ✅ `lingui extract --clean` supprime les messages obsolètes                                                              |
| **Tester les traductions manquantes (CLI/CI)**  | ✅ `npx intlayer content test`                                                   | ⚠️ Statistiques de `lingui extract` (pas de code de sortie d'erreur par défaut)                                          |
| **Build pipeline**                              | ✅ Un plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)             | ⚠️ Macro plugin (Babel ou SWC) + `extract` + `compile` étapes                                                            |
| **AI-powered translation**                      | ✅ Intégré, utilise vos propres clés de provider                                 | ❌ Non                                                                                                                   |
| **Visual Editor / CMS**                         | ✅ Visual Editor gratuit + CMS optionnel                                         | ❌ Non (`.po` fonctionne avec un TMS externe)                                                                            |
| **Serveur MCP & Compétences Agent**             | ✅ Oui                                                                           | ❌ Non                                                                                                                   |
| **Écosystème / communauté**                     | ⚠️ Plus petit mais en croissance rapide                                          | ✅ Établi, indépendant du framework                                                                                      |

## Le benchmark

### Ce qui a été mesuré

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construit **la même application** avec chaque bibliothèque : **10 pages** (accueil, à propos, blog, carrières, contact, FAQ, tarification, produits, paramètres, équipe), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), composants identiques et contenu identique. Les pages sont mesurées en `en` et `fr`. Chaque bibliothèque est implémentée dans jusqu'à quatre **stratégies de chargement**, de la configuration naïve à la configuration optimale :

| Stratégie          | Description                                                                              | Qui fait cela                                     |
| ------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **static**         | Tous les catalogues compilés des locales importés et chargés à l'avance                  | Prototypes rapides, code généré par IA            |
| **dynamic**        | Seul le catalogue de la locale active est `import()`é, mais il contient toutes les pages | La plupart des projets                            |
| **scoped-static**  | Un catalogue par route, tous bundlés à l'avance                                          | Rare                                              |
| **scoped-dynamic** | Un catalogue par route + lazy `import()`. Seulement la page actuelle, la locale actuelle | Applications avec un budget de performance strict |

Intlayer n'a pas de variante "scoped" : le compilateur scope le contenu **par composant** automatiquement, donc ses lignes `static` et `dynamic` sont déjà scopées.

Pour chaque build, la suite enregistre :

- **Lib size**: taille gzip d'un composant vide qui importe uniquement la bibliothèque i18n. Le coût fixe du runtime.
- **Page JS**: JavaScript gzip téléchargé par page, moyenné sur toutes les pages et locales.
- **Locale leak %**: part des chaînes traduites trouvées dans le JS téléchargé qui appartiennent à une locale que l'utilisateur n'est **pas** en train de consulter (empreinte digitale sur `en` et `fr`, donc 50% signifie "l'autre locale mesurée est entièrement présente"; avec 10 locales bundlées, le gaspillage réel est plus élevé).
- **Page leak %**: part des chaînes traduites trouvées dans le JS téléchargé qui appartiennent à une page sur laquelle l'utilisateur n'est **pas**.
- **Component avg**: taille gzip moyenne de chaque composant compilé isolément. Montre combien de runtime i18n et de catalog un seul composant entraîne.
- **E2E réactivité** : temps écoulé entre la sélection d'une nouvelle locale et la mise à jour de `html[lang]` dans le DOM (Playwright, 5 itérations).
- **Hydratation** : durée de la phase d'hydratation de React.

> Les chiffres ci-dessous proviennent de l'exécution datée du **12-09-2026** avec `@lingui/react` 6.6.0 et `intlayer` 9.5.1. L'application de test est volontairement petite (quelques dizaines de chaînes par locale), donc les pourcentages de fuite décrivent un **motif** : ils augmentent avec votre contenu tandis que le coût d'exécution reste fixe.

### Résultats sur Next.js

Sélectionnez les métriques et les bibliothèques qui vous intéressent :

<I18nBenchmark framework="nextjs" vertical/>

| Library              | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| -------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (sans i18n) | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| Lingui               | static         |       11.9 KB |         207.4 KB |       50.0% |     90.0% |            73.3 KB |        15.3 ms |   15.2 ms |
| Lingui               | dynamic        |       11.9 KB |         145.4 KB |        2.8% |     89.9% |            19.9 KB |        15.7 ms |   12.7 ms |
| Lingui               | scoped-static  |       11.9 KB |         148.2 KB |        2.7% |     89.1% |            20.4 KB |        15.1 ms |   13.1 ms |
| Lingui               | scoped-dynamic |       11.9 KB |         148.6 KB |       14.8% |      0.0% |           152.6 KB |        16.1 ms |   14.8 ms |
| **`next-intlayer`**  | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**  | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |

**Comment le lire**

- **Coût d'exécution.** Un composant vide coûte 11.9 KB gzip avec Lingui, 5.5 KB avec Intlayer. Sur la page complète, la meilleure configuration de Lingui se situe à **+7.3 KB** par rapport à Intlayer (148.6 vs 141.3 KB) ; Intlayer se situe à **+0.3 KB** par rapport à l'app de base.
- **La configuration naïve est coûteuse.** Charger chaque catalog compilé en avant donne **207.4 KB par page**, +66 KB par rapport à l'app de base. La moitié des chaînes empreintes appartiennent à la mauvaise locale, 90% à la mauvaise page.
- **Le chargement dynamique corrige la locale, pas la page.** Avec un catalog par locale, la fuite de page reste à ~90% : l'intégralité du catalog `fr` se charge sur chaque page française. Atteindre 0% de fuite de page requiert la configuration `scoped-dynamic` : un catalog par route, extrait et compilé séparément, sélectionné manuellement dans chaque page.
- **La source-locale fallback fuit.** Même dans les configurations optimisées, **3-15% des chaînes `en` sont incluses dans les pages `fr`**. Les macros Lingui conservent le message source disponible comme fallback, ce qui se retrouve dans le bundle à côté de la traduction. Intlayer résout les fallbacks au moment de la compilation et ne livre que la locale active.
- **La taille du composant explose en `scoped-dynamic`.** Chaque composant compilé isolément fait en moyenne **152.6 KB**, car le catalog de chaque route est accessible depuis le composant qui l'importe. Le même composant avec `useIntlayer()` fait en moyenne **6.9 KB**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet, chaque bibliothèque et chaque stratégie, dans le [rapport de benchmark Next.js](https://intlayer.org/fr/doc/benchmark/nextjs).

### Résultats sur TanStack Start

| Library                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| --------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n)          | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |   21.6 ms |
| Lingui                      | static         |       11.2 KB |         152.2 KB |       50.0% |     90.0% |            58.0 KB |         3.9 ms |   19.9 ms |
| Lingui                      | dynamic        |       11.2 KB |         115.2 KB |        9.3% |      0.0% |            85.5 KB |         5.9 ms |   28.0 ms |
| Lingui                      | scoped-static  |       11.2 KB |         120.8 KB |        4.0% |      0.0% |           147.9 KB |         7.1 ms |   33.9 ms |
| Lingui                      | scoped-dynamic |       11.2 KB |         120.2 KB |        8.6% |      0.0% |            83.7 KB |        42.1 ms |   32.9 ms |
| **`intlayer`**              | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |   11.5 ms |
| **`intlayer`**              | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |   14.1 ms |
| `@intlayer/lingui` (compat) | dynamic        |       10.3 KB |         137.0 KB |        9.9% |      0.0% |            12.8 KB |         2.9 ms |   19.7 ms |

**Comment le lire**

- **Sur le JavaScript par page, Lingui gagne de justesse.** Le `dynamic` de Lingui s'élève à **115.2 KB**, 3.4 KB sous les 118.6 KB d'Intlayer. Les catalogues compilés de Lingui avec des IDs hachés sont compacts, et le routeur TanStack Start divise les routes suffisamment bien pour que la fuite de page soit déjà à 0% dans la ligne `dynamic`.
- **Tout ce qui concerne la taille de la page va dans l'autre sens.** L'hydratation prend **28-34 ms** avec Lingui contre **11-14 ms** avec Intlayer : `i18n.load()` + `i18n.activate()` s'exécutent sur le client avant que React puisse hydrater. Les composants compilés isolément pèsent **58-148 KB** contre **6-8 KB**. La fuite de locale n'atteint jamais 0% (4-9%) en raison du fallback de locale source.
- **Le changement de locale dans la configuration optimisée est lent.** `scoped-dynamic` Lingui prend **42 ms** pour mettre à jour `html[lang]` : le nouveau catalogue de route doit être récupéré, chargé et activé avant que le changement soit visible. Intlayer bascule en **3-4 ms** dans les deux modes.
- **La ligne `static` d'Intlayer a déjà 0% de fuite de page** car seuls les dictionnaires importés par les composants de la page sont regroupés. Une ligne de config (`importMode: 'dynamic'`) supprime aussi la fuite de locale.
- **`@intlayer/lingui`** conserve la syntaxe des macros de Lingui et les sert à partir des dictionnaires Intlayer. Il échange une taille de page plus importante (137 KB, puisque le runtime des macros reste) pour des composants plus petits (12.8 KB) et une hydratation plus rapide que Lingui natif. C'est une étape de migration, pas la destination.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet dans le [rapport de benchmark TanStack Start](https://intlayer.org/fr/doc/benchmark/tanstack).

## Pourquoi l'écart ? Deux compilateurs, deux unités de travail

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Les deux bibliothèques compilent. La différence est **ce qu'** elles compilent.

**Lingui compile des catalogues.** Les macros dans votre source sont extraites dans un fichier `.po` par locale, puis compilées dans un module JS par locale. L'unité est la **locale**. Diviser davantage, par route ou par composant, signifie créer plusieurs catalogues, configurer `lingui.config.ts` pour extraire chacun d'un ensemble différent de fichiers, et charger le bon dans chaque route. L'instance `I18n` au runtime est globale ; chaque appel `useLingui()` souscrit le composant à celle-ci.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # lingui compile output
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer compile les dictionnaires.** Chaque fichier `.content.ts` est un dictionnaire lié à une clé ; le compilateur résout quel composant importe quelle clé et émet, par dictionnaire et par locale, exactement le JSON dont ce composant a besoin. L'unité est le **composant**. La portée de la route est une conséquence : une page n'importe que les dictionnaires des composants qu'elle rend.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

C'est pourquoi le pattern `scoped-dynamic` est une sortie de build pour Intlayer et une configuration de projet pour Lingui. L'écart se creuse sur deux axes à la fois, les pages et les locales :

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> Pour obtenir les numéros de la ligne `dynamic`, définissez `dictionary.importMode: 'dynamic'` dans `intlayer.config.ts`. Voir la [documentation d'optimisation du bundle](https://intlayer.org/doc/fr/concept/bundle-optimization).

## Expérience développeur

### Configuration

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Puis ajoutez `@lingui/babel-plugin-lingui-macro` (ou `@lingui/swc-plugin`) au bundler, exécutez `lingui extract` après avoir modifié la source, `lingui compile` avant de construire, et enveloppez l'arborescence dans `<I18nProvider i18n={i18n}>`.

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

Ajoutez `intlayer()` à `vite.config.ts` (ou `withIntlayer()` à `next.config.ts`) et enveloppez l'arborescence dans `<IntlayerProvider>`. Aucune étape d'extraction ou de compilation : les dictionnaires sont construits lors de l'exécution du bundler.

</Tab>
</Tabs>
### Composant

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

Le texte anglais se trouve dans le composant ; le texte français se trouve dans `src/locales/fr/messages.po` sous un ID haché, après l'exécution de `lingui extract`. Oublier de l'exécuter ou d'exécuter `compile` bascule silencieusement vers l'anglais.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ fr: "Compteur", en: "Counter" }),
    increment: t({ fr: "Incrémenter", en: "Increment" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

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

Les deux locales se trouvent dans un seul fichier à côté du composant. Une valeur `fr` manquante est une erreur de build, une clé incorrecte est une erreur TypeScript.

</Tab>
</Tabs>
### En dehors des composants

Métadonnées, loaders, fonctions serveur : partout sans arborescence React.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`À propos de nous`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Une nouvelle instance `I18n` par appel, le bon catalogue chargé manuellement, et `msg` + `i18n._()` au lieu de `t`. Comme le [benchmark le note](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), savoir quand utiliser `t`, `` t` ` ``, `i18n.t()`, `msg` ou `<Trans>` « n'est pas intuitif ».

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Conservez les macros Lingui, obtenez les dictionnaires Intlayer

`@intlayer/lingui` est un adaptateur prêt à l'emploi pour `@lingui/core` et `@lingui/react`. Les macros continuent de se compiler comme avant ; le runtime `i18n._()` qu'elles compilent est servi à partir des dictionnaires Intlayer, avec des plugins de synchronisation `.po` qui maintiennent vos catalogues existants comme source de vérité. Les pluriels et sélections ICU s'affichent de manière identique.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Conservez `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` dans la build, exécutées avant le compilateur Intlayer. Consultez la [documentation de compatibilité Lingui](https://intlayer.org/doc/compatibility/lingui).

## Quand choisir quoi ?

<AccordionGroup>
<Accordion header="Choisir Lingui">

Vous voulez **ICU MessageFormat** avec des macros typées, vos traducteurs travaillent en **`.po`** avec un pipeline TMS existant, vous préférez les chaînes sources en ligne dans JSX, et votre équipe est à l'aise avec la gestion du workflow extraction / compilation / division des catalogues. Son JS par page est compétitif une fois le lazy loading configuré.

</Accordion>
<Accordion header="Choisir Intlayer">

Vous voulez du **contenu scopé au composant**, du **TypeScript strict**, des **erreurs de clés manquantes au build**, du **tree-shaking et lazy loading sans effort**, des composants légers, une hydratation rapide, un changement de locale instantané, et des outils éditoriaux intégrés ([Visual Editor](https://intlayer.org/fr/doc/concept/editor), [CMS](https://intlayer.org/fr/doc/concept/cms), [traduction par IA](https://intlayer.org/fr/doc/concept/auto-fill), [serveur MCP](https://intlayer.org/fr/doc/mcp-server)). Particulièrement pertinent pour les codebases modulaires volumineuses et les design systems.

</Accordion>
<Accordion header="Choisir @intlayer/lingui">

Vous utilisez déjà Lingui et souhaitez migrer vers les dictionnaires Intlayer progressivement sans toucher aux macros. Vos catalogues `.po` restent la source de vérité grâce au [plugin de synchronisation PO](https://intlayer.org/fr/doc/compatibility/lingui). Mesuré côte à côte dans [Lingui vs @intlayer/lingui](https://intlayer.org/fr/blog/lingui-vs-intlayer-lingui).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Lingui compile également. Pourquoi la sortie est-elle si différente ?">

Parce que l'unité de compilation diffère. Lingui compile **un catalogue par locale** : tout ce qui est en dessous (catalogues par route, lazy loading, exclusion du fallback du bundle) relève de la configuration. Intlayer compile **un dictionnaire par composant**, donc le découpage par route découle directement du build. C'est pourquoi un composant Lingui compilé isolément pèse 58-153 KB contre 6-8 KB pour Intlayer.

</Question>

<Question title="Pourquoi la fuite de locale n'atteint-elle jamais 0% avec Lingui ?">

Les macros gardent le message source disponible comme solution de repli (fallback) au runtime, de sorte que la chaîne anglaise est envoyée à côté de sa traduction. Le benchmark mesure **3-15% de chaînes `en` dans les pages `fr`** dans chaque configuration optimisée. Intlayer résout les fallbacks au build et ne livre que la locale active.

</Question>

<Question title="Le JavaScript par page de Lingui est-il vraiment compétitif ?">

Oui, et sur TanStack Start il l'emporte d'un cheveu : 115.2 KB en `dynamic` contre 118.6 KB pour Intlayer. Les catalogues compilés avec des identifiants hachés sont compacts. Le coût apparaît ailleurs : hydratation à 28-34 ms contre 11-14 ms, et un changement de locale à **42 ms** dans la configuration `scoped-dynamic`.

</Question>

<Question title="Dois-je renoncer aux macros pour migrer ?">

Non. `@intlayer/lingui` permet de compiler `` t`...` ``, `<Trans>`, `msg`, `plural`, `select` et `selectOrdinal` comme avant ; seul le mécanisme de résolution sous-jacent de `i18n._()` change. Conservez `@lingui/babel-plugin-lingui-macro` ou `@lingui/swc-plugin` dans le build. Voir la [documentation de compatibilité Lingui](https://intlayer.org/fr/doc/compatibility/lingui).

</Question>

<Question title="Qu'en est-il des étapes d'extraction et de compilation ?">

Elles restent nécessaires pour les macros, mais disparaissent pour le contenu propre à Intlayer. Les dictionnaires `.content.ts` sont créés lors de l'exécution du bundler, sans commande CLI distincte, et [`intlayer test`](https://intlayer.org/fr/doc/concept/cli) fait échouer la CI en cas de clé manquante au lieu de basculer silencieusement sur la chaîne source.

</Question>

</FAQ>

## Comparaisons associées

Même benchmark, autres bibliothèques :

- [next-intl vs Intlayer](https://intlayer.org/fr/blog/next-intl-vs-intlayer)
- [i18next vs Intlayer](https://intlayer.org/fr/blog/i18next-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/fr/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/fr/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/fr/blog/react-i18next-vs-react-intl-vs-intlayer)

Pour aller plus loin :

- [Lingui vs @intlayer/lingui](https://intlayer.org/fr/blog/lingui-vs-intlayer-lingui), l'adaptateur mesuré sur la même application
- [Compiler-driven vs declarative i18n](https://intlayer.org/fr/blog/compiler-vs-declarative-i18n)
- [Per-component vs centralized i18n](https://intlayer.org/fr/blog/per-component-vs-centralized-i18n)
- [ICU message format explained](https://intlayer.org/fr/blog/icu-message-format)

Documentation de référence :

- [Rapport de benchmark Next.js](https://intlayer.org/fr/doc/benchmark/nextjs) et [rapport de benchmark TanStack Start](https://intlayer.org/fr/doc/benchmark/tanstack)
- [Compat adapter: Lingui](https://intlayer.org/fr/doc/compatibility/lingui)
- [Optimisation du bundle](https://intlayer.org/fr/doc/concept/bundle-optimization) et [le compilateur Intlayer](https://intlayer.org/fr/doc/compiler)

## Étoiles GitHub

Les stars GitHub sont un indicateur fort de la popularité d'un projet, de la confiance de la communauté et de sa pertinence à long terme. Bien que ce ne soit pas une mesure directe de la qualité technique, ils reflètent le nombre de développeurs qui trouvent le projet utile, suivent sa progression et sont susceptibles de l'adopter.

[![Star History Chart](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Conclusion

Lingui est la plus forte bibliothèque runtime-plus-compiler dans ce benchmark. Ses catalogs compilés et hashés lui donnent du JavaScript par page dans quelques KB de Intlayer, et même légèrement en dessous sur TanStack Start. Si les bytes par page étaient la seule métrique, ce serait une égalité.

Ce n'est pas le cas. Le compilateur de Lingui s'arrête à la locale ; tout ce qui est en dessous (catalogs par route, chargement différé, exclusion de la fallback du bundle) est configuration, et le benchmark montre le coût de cette limite : composants **10-20x plus volumineux**, hydratation **2-3x plus lente**, **3-15% de fuite de locale** qui ne disparaît jamais, et un changement de locale de **42 ms** dans la configuration optimisée. Le compilateur d'Intlayer fonctionne au niveau du composant, donc ces chiffres sont **6-8 KB**, **11-14 ms**, **0%** et **3-4 ms** sans aucune configuration.

Toutes les données brutes, les applications de test et les scripts se trouvent dans le [référentiel Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Exécutez-le vous-même.

Consultez le [document 'Pourquoi Intlayer ?'](https://intlayer.org/doc/fr/why) pour plus de détails.
