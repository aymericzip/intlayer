---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl : Même API, Bundle différent"
description: Ce qui change quand les imports de next-intl d'une application Next.js sont servies par l'adaptateur de compatibilité @intlayer/next-intl. Taille du bundle, fuites, taille des composants et hydratation mesurés sur le même code, plus ce que l'adaptateur conserve, ignore et ne peut pas remplacer.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Même API, Bundle différent

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` est un adaptateur de compatibilité : il expose l'API `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, pluriels ICU, `NextIntlClientProvider`...) et la sert à partir de dictionnaires compilés par Intlayer. Le code de l'application ne change pas. Le bundle, lui, change.

Cet article compare les deux sur la même application Next.js, construite une fois avec `next-intl` et une fois avec l'adaptateur. Les chiffres proviennent de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), une suite open-source qui enregistre ce que le navigateur télécharge réellement. Si vous voulez la comparaison `next-intl` vs Intlayer en tant que bibliothèques, consultez [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-intl_vs_intlayer.md). Celui-ci traite de ce que l'adaptateur change lorsque vous conservez vos composants tels qu'ils sont.

<TOC/>

> **tl;dr**: Sur la même application Next.js, remplacer `next-intl` par `@intlayer/next-intl` a réduit le JavaScript par page de **153.6 KB à 147.5 KB** en gzip, le composant moyen de **21.8 KB à 8.1 KB**, la fuite de chaînes de pages étrangères de **~90% à 0%**, et l'hydratation de **14.7 ms à 12.8 ms**, sans modifier aucun composant. Sur TanStack Start, l'équivalent `use-intl` (`@intlayer/use-intl`) a réduit les composants de **76-87 KB à 9-11 KB** et le changement de locale de **7-21 ms à 4-9 ms**. L'adaptateur consomme **8.0 KB** de runtime contre **14.7 KB** pour `next-intl` et **5.5 KB** pour `next-intlayer` natif. La navigation et les middleware sont réimplémentés sur la configuration de routage d'Intlayer; les `pathnames` localisés sont la seule fonctionnalité non reprise.

## Qu'est-ce que `@intlayer/next-intl`

`next-intl` est un runtime : `getRequestConfig` charge un `messages/{locale}.json` par requête, `NextIntlClientProvider` l'envoie au client, et `useTranslations("about")` lit les clés de cet objet au moment du rendu. Chaque optimisation (namespaces, `pick(messages, [...])` par page, lazy loading) est à votre charge.

`@intlayer/next-intl` conserve la première et la dernière partie de cette chaîne et remplace celle du milieu. Vos composants appellent toujours `useTranslations("about")`; ce qu'ils reçoivent provient d'un dictionnaire Intlayer compilé au moment de la construction, limité à ce composant, dans la locale active uniquement.

Trois mécanismes le rendent possible :

1. **Aliasing d'imports.** `createNextIntlPlugin()` depuis `@intlayer/next-intl/plugin` encapsule `withIntlayer` et ajoute des alias Webpack / Turbopack pour que `next-intl`, `next-intl/server`, `next-intl/navigation` et `next-intl/middleware` se résolvent en `@intlayer/next-intl`. Aucun import dans votre codebase n'est renommé.
2. **JSON comme source de vérité.** Le plugin `syncJSON` lit votre `messages/{locale}.json` existant, divise ses clés de niveau supérieur en un dictionnaire par namespace, et réécrit les traductions dans les mêmes fichiers lorsque la CLI ou le CMS les met à jour. Le workflow de vos traducteurs reste inchangé.
3. **Call-site binding.** The Intlayer optimize pass (Babel or SWC) rewrites `useTranslations("about")` into a call that receives the `about` dictionary directly. The component no longer reaches a global message tree; it reaches its own content.

```tsx fileName="app/[locale]/about/page.tsx"
// Votre code, inchangé
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="What the compiler emits (simplified)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Cette réécriture explique pourquoi les colonnes taille des composants et fuite de page ci-dessous se déplacent : une page récupère uniquement les dictionnaires des composants qu'elle rend, et uniquement dans la locale servie.

## Ce que l'adaptateur conserve, ignore et ne remplace pas

| API `next-intl`                                                      | Avec `@intlayer/next-intl`                                                                                                                                |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Conservé. Lié au dictionnaire `ns` au moment de la compilation. Les clés sont typées par rapport à votre contenu.                                      |
| `getTranslations({ locale, namespace })`                             | ✅ Conservé                                                                                                                                               |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Conservé. Les pluriels ICU, `select`, `selectordinal`, `#`, `{ts, date, long}` s'exécutent via le résolveur ICU d'Intlayer                             |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Conservé                                                                                                                                               |
| `useFormatter()`                                                     | ✅ Conservé. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` font le pont vers `Intl` natif                                                 |
| `NextIntlClientProvider`                                             | ✅ Conservé. Les props `messages`, `timeZone` et `now` sont **acceptés mais ignorés** (un avertissement dev vous l'indique)                               |
| `getMessages()`                                                      | ✅ Conservé pour la compatibilité; plus nécessaire                                                                                                        |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ Non nécessaire. Les dictionnaires sont compilés au moment de la construction; il n'y a pas de chargement de messages par requête                       |
| `defineRouting()`                                                    | ✅ Conservé. Les champs omis (`locales`, `defaultLocale`, `localePrefix`) sont lus depuis `intlayer.config.ts`                                            |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Conservé. Réimplémenté sur la config de routage d'Intlayer ; l'argument `routing` est accepté mais ignoré                                              |
| `pathnames` (noms de routes localisés)                               | ❌ Accepté pour le typage, **non interpolé**. Conservez les chemins simples ou déplacez ce mapping vers Intlayer's `rewrite`                              |
| `createMiddleware()`                                                 | ✅ Conservé. Retourne le proxy d'Intlayer ; définit le cookie `NEXT_LOCALE` afin que `useLocale()` et votre sélecteur de langue continuent de fonctionner |
| `NEXT_LOCALE` cookie                                                 | ✅ Lu par défaut (sauf si vous configurez `routing.storage` vous-même)                                                                                    |
| `useTranslations()` nu sans namespace                                | ⚠️ Fonctionne, mais le site d'appel n'est pas lié : il se résout via le registre runtime. Passez un namespace pour obtenir les gains de bundle            |

## Le benchmark

### Ce qui a été mesuré

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construit **la même application** avec chaque configuration : **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), des composants identiques et un contenu identique. Les pages sont mesurées en `en` et `fr`.

`next-intl` a été construit avec quatre stratégies de chargement, de la configuration naïve (chargement entier de `messages/{locale}.json`) à la configuration optimale (un namespace par route + `pick()` par page). L'adaptateur a été construit sur **les mêmes composants que la configuration naïve**, avec seulement `next.config.ts` et `intlayer.config.ts` modifiés. Il n'a pas de variante "scoped" : le compilateur scopes le contenu par composant, donc ses lignes `static` et `dynamic` sont déjà scoped.

Pour chaque build, la suite enregistre :

- **Lib size** : taille gzip d'un composant vide qui importe uniquement la bibliothèque i18n. Le coût fixe du runtime.
- **Page JS** : JavaScript gzip téléchargé par page, en moyenne sur toutes les pages et locales.
- **Fuite locale %** : part des chaînes traduites trouvées dans le JS téléchargé appartenant à une locale que l'utilisateur **ne consulte pas**.
- **Fuite page %** : part des chaînes traduites trouvées dans le JS téléchargé appartenant à une page sur laquelle l'utilisateur **n'est pas**.
- **Composant moy** : taille gzip moyenne de chaque composant compilé isolément. Montre combien de runtime i18n et de catalogue un seul composant entraîne.
- **Réactivité E2E** : temps écoulé entre la sélection d'une nouvelle locale et la mise à jour de `html[lang]` dans le DOM (Playwright, 5 itérations).
- **Hydratation** : durée de la phase d'hydratation React.

> Les chiffres ci-dessous proviennent de l'exécution datée du **2026-09-12** avec `next-intl` / `use-intl` 4.14.2 et `@intlayer/*` 9.5.1. L'application de test est volontairement petite (quelques dizaines de chaînes par locale), donc les pourcentages de fuite décrivent un **modèle** : ils augmentent avec votre contenu tandis que le coût d'exécution reste fixe.

### Résultats sur Next.js

Sélectionnez les métriques et les bibliothèques qui vous intéressent :

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Comment le lire**

- **Mêmes composants, 6 KB de moins par page.** L'adapter build de l'application naïve atterrit à **147.5 KB**, sous chaque configuration `next-intl` y compris la plus optimisée (153.6 KB). Le runtime lui-même est la différence : 8.0 KB versus 14.7 KB, payés sur chaque page.
- **La fuite passe à 0% sans toucher à un composant.** La configuration naïve de `next-intl` expédie ~90% des chaînes de pages étrangères sur chaque page. Atteindre 0% avec `next-intl` signifie les setups `scoped-*` : un namespace par route, et `pick(messages, [...])` dans chaque page. L'adapter atteint 0% à partir du code naïf car la passe d'optimisation lie chaque `useTranslations("ns")` à son propre dictionnaire.
- **Les composants rétrécissent 2.7x.** Un composant compilé en isolation fait en moyenne **21.8 KB** avec `next-intl` (il atteint le provider et l'arborescence des messages) et **8.1 KB** avec l'adapter. Dans le setup `scoped-static` de `next-intl`, ce nombre monte _à_ 80 KB, car le fichier namespace de chaque route devient accessible à partir de la page qui le sélectionne.
- **L'hydratation est 2 ms plus rapide** (12.8 vs 14.7 ms) : il n'y a pas d'objet de message à désérialiser de la charge utile RSC avant que React puisse hydrater.
- **L'adaptateur n'est pas le runtime natif.** `next-intlayer` s'élève à **141.3 KB**, +0.3 KB par rapport à l'app de base, avec un runtime de 5.5 KB. L'adaptateur transporte la surface API de `next-intl` (`useFormatter`, `t.rich`, le résolveur ICU) au-dessus du noyau d'Intlayer, d'où 8.0 KB et +6 KB par page. C'est le pont, pas la destination.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet, chaque bibliothèque et chaque stratégie, dans le [rapport de benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md).

### Résultats sur TanStack Start (`use-intl`)

`use-intl` est le noyau framework-agnostique de `next-intl`. Son adaptateur, `@intlayer/use-intl`, suit le même design avec un plugin Vite (`@intlayer/use-intl/plugin`).

| Configuration            | Stratégie      | Taille lib (gz) | JS page moy (gz) | Fuite locale | Fuite page | Composant moy (gz) | Réactivité E2E | Hydratation |
| ------------------------ | -------------- | --------------: | ---------------: | -----------: | ---------: | -----------------: | -------------: | ----------: |
| **base** (pas i18n)      | -              |          0.0 KB |         111.0 KB |         0.0% |       0.0% |             0.7 KB |         8.1 ms |     21.6 ms |
| `use-intl`               | static         |         14.1 KB |         179.8 KB |        50.0% |      89.8% |            76.0 KB |         6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |         14.1 KB |         119.4 KB |         0.0% |      89.8% |            75.9 KB |         7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |         14.1 KB |         128.7 KB |         0.0% |       0.0% |            87.1 KB |        20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |         14.1 KB |         128.7 KB |         0.0% |       0.0% |            87.1 KB |        13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |      **7.3 KB** |         135.8 KB |        49.7% |   **0.0%** |        **10.9 KB** |     **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |      **7.3 KB** |     **129.7 KB** |     **0.0%** |   **0.0%** |         **9.3 KB** |     **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |          5.0 KB |         125.8 KB |        50.0% |       0.0% |             8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |          5.0 KB |         118.6 KB |         0.0% |       0.0% |             6.3 KB |         3.6 ms |     14.1 ms |

**Comment le lire**

- **Les octets par page sont équivalents à l'`use-intl` optimisé.** `@intlayer/use-intl` en mode `dynamic` (129.7 KB) est dans les 1 KB de `use-intl`'s `scoped-dynamic` (128.7 KB), et 10 KB _au-dessus_ du `dynamic` simple de `use-intl` (119.4 KB). Cette ligne `dynamic` simple fuit toujours 90 % des chaînes de pages étrangères ; le nombre d'octets est faible car le contenu de l'application de test est petit. Le 0% de l'adapter reste plat à mesure que le contenu augmente.
- **Les composants sont 7-9x plus petits.** Les composants `use-intl` font en moyenne **76-87 KB** dans chaque stratégie, car `useTranslations` est lié à l'objet de messages complet du provider. L'adaptateur fait en moyenne **9-11 KB**.
- **Le changement de locale est plus rapide.** Les configurations `use-intl` optimisées prennent **13-21 ms** pour mettre à jour `html[lang]`; l'adaptateur prend **4-9 ms**. Moins de composants se re-rendent, et rien n'est re-sélectionné dans un arbre de messages.
- **`static` conserve chaque locale.** La ligne `static` de l'adaptateur affiche une fuite de locale de 49.7%, la même que celle d'Intlayer natif en mode `static` : toutes les locales sont bundlées, seuls les dictionnaires de la page le sont. Une ligne de config (`importMode: 'dynamic'`) la supprime.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet dans le [rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md).

## Pourquoi les nombres changent

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Rien dans le composant n'a changé, donc les gains proviennent entièrement de ce à quoi `useTranslations` est lié.

**Avec `next-intl`**, la liaison est le fournisseur. `NextIntlClientProvider` reçoit l'objet `messages` complet pour la locale ; chaque `useTranslations("about")` le lit depuis celui-ci. Le bundler voit un composant important un hook qui lit un contexte, et ne peut pas savoir que seule la branche `about` est utilisée. Les routes ci-dessous partagent toutes le même objet message, donc la colonne page-leak affiche ~90% jusqu'à ce que vous divisiez le fichier vous-même, et le gaspillage augmente sur deux axes à la fois, les pages et les locales :

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # tous les namespaces, toutes les pages
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**Avec `@intlayer/next-intl`**, la liaison est le dictionnaire. `syncJSON` transforme `messages/en.json` en un dictionnaire par clé de niveau supérieur ; le compilateur résout quel composant appelle `useTranslations("about")` et lui transmet `about` directement, dans la locale active, en tant qu'import que le bundler peut tracer et diviser.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # inchangé, toujours la source de vérité
│   └── fr.json
├── .intlayer/                        # généré : un dictionnaire par namespace, par locale
└── src
    ├── middleware.ts                 # createMiddleware() retourne maintenant le proxy d'Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (pas de prop messages)
        └── about/page.tsx            # useTranslations("about")  ← inchangé
```

`src/i18n.ts` et la prop `messages` disparaissent. Tout le reste est identique.

## Migration en trois étapes

<Steps>
<Step number={1} title="Installer">

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

La commande détecte `next-intl` et installe `intlayer`, `next-intlayer`, `@intlayer/next-intl` et `@intlayer/sync-json-plugin`. Gardez `next-intl` installé : c'est une dépendance pair de l'adaptateur et il fournit les types.

</Step>
<Step number={2} title="Pointez Intlayer vers vos messages">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" regroupe toutes les locales ; "dynamic" charge celle active à la demande
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // Placeholders ICU : {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` reste à sa place. Chaque clé de haut niveau devient un dictionnaire ; `useTranslations("about")` mappe au dictionnaire `about`.

</Step>
<Step number={3} title="Encapsuler next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` compose `withIntlayer` (surveillance du contenu, compilation des dictionnaires, la passe d'optimisation) et les alias `next-intl` → `@intlayer/next-intl` pour Webpack et Turbopack. Compilez, et les chiffres dans les tableaux ci-dessus sont les vôtres.

</Step>
</Steps>

### Ce que vous pouvez supprimer ensuite

| Fichier / motif                               | Raison                                                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `getRequestConfig` dans `src/i18n.ts`         | Aucun chargement de message par requête. Conservez le fichier uniquement s'il exporte également des helpers `createNavigation` |
| `messages={...}` sur `NextIntlClientProvider` | L'adaptateur lit la sortie compilée ; la prop est ignorée et enregistre un avertissement en développement                      |
| `await getMessages()` dans les layouts        | Même raison                                                                                                                    |
| Per-page `pick(messages, [...])`              | Le compilateur effectue le picking, par composant                                                                              |

### Ce que vous gagnez au-delà des bytes

- **Typed keys.** `useTranslations("about")` est typé par rapport au dictionnaire compilé `about`. `t("does.not.exist")` est une erreur TypeScript, pas un fallback à l'exécution.
- **`npx intlayer test`** échoue dans CI quand une locale est manquante d'une clé. **`npx intlayer fill`** traduit les clés manquantes avec le fournisseur de votre choix (OpenAI, Anthropic, Mistral, Gemini...) en utilisant votre propre clé, et écrit le résultat dans `messages/{locale}.json`.
- **Visual Editor et CMS** fonctionnent sur les mêmes dictionnaires, donc les non-développeurs peuvent éditer `messages/fr.json` via une UI et le fichier se met à jour.
- **Migration progressive vers `.content.ts`.** N'importe quel composant peut passer de `useTranslations("about")` à `useIntlayer("about")` avec un fichier de contenu co-localisé, un par un. Les dictionnaires JSON et `.content.ts` coexistent et fusionnent.

## Limites à connaître avant de commencer

<AccordionGroup>
<Accordion header="La configuration de routage se déplace dans intlayer.config.ts">

`createNavigation(routing)` et `createMiddleware(routing)` conservent leur signature mais ignorent l'argument : les locales, la locale par défaut et la stratégie de préfixe proviennent de la configuration `routing` d'Intlayer. Si vous utilisez les `pathnames` localisés de `next-intl` (`/about` vers `/a-propos`), l'adaptateur ne les interpole pas ; `routing.rewrite` d'Intlayer couvre ce cas mais constitue un changement distinct.

</Accordion>
<Accordion header="useTranslations() sans namespace n'est pas lié">

La passe d'optimisation a besoin d'un namespace statique pour savoir quel dictionnaire importer. Un appel nu fonctionne toujours, via un registre d'exécution qui référence chaque dictionnaire, ce qui correspond exactement à la fuite que vous essayiez de supprimer. Passez le namespace.

</Accordion>
<Accordion header="L'adaptateur n'est pas gratuit">

8.0 KB de runtime contre 5.5 KB pour `next-intlayer`, et +6-7 KB par page par rapport au build natif. Il paie pour la surface d'API de `next-intl`. Si vous atteignez le point où chaque composant a été migré vers `useIntlayer`, supprimez l'adaptateur.

</Accordion>
<Accordion header="messages, timeZone et now sur le provider sont ignorés">

Les formateurs s'appuient sur l'API native `Intl` et seule la locale influence leur résultat. Si vous comptez sur un fuseau horaire forcé ou un `now` fixe pour des dates stables à l'hydratation, gérez-le au niveau du site d'appel. Consultez [formatage de dates, heures et nombres](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/date_time_number_formatting_locales.md).

</Accordion>
</AccordionGroup>

## Quand utiliser quoi?

<AccordionGroup>
<Accordion header="Rester sur next-intl">

Votre application est petite, votre bundle n'est pas une préoccupation, et votre équipe est à l'aise avec la gestion des namespaces et de `pick()` par page.

</Accordion>
<Accordion header="Utiliser @intlayer/next-intl">

Vous utilisez déjà `next-intl` aujourd'hui et souhaitez bénéficier des gains de bundle, de fuite et d'hydratation, des clés typées et des outils CLI / CMS sans réécriture. C'est le point d'entrée recommandé pour toute codebase `next-intl` existante.

</Accordion>
<Accordion header="Passer en natif (next-intlayer)">

Pour les nouveaux projets, ou une fois que l'adaptateur a fait son travail. C'est le plus léger des trois (5.5 KB, +0.3 KB par page) et il débloque les composants serveur synchrones, les fichiers `.content.ts` par composant et l'ensemble des fonctionnalités. Commencez avec [Intlayer avec Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Le code de mon application reste-t-il vraiment intact ?">

Sur Next.js, oui pour les composants : le build de benchmark n'a modifié que `next.config.ts` et `intlayer.config.ts`. `getRequestConfig` dans `src/i18n.ts`, la prop `messages` sur le provider et les appels `pick()` par page deviennent du code mort que vous pouvez supprimer par la suite.

</Question>

<Question title="Qu'advient-il des messages ICU ?">

Ils continuent de fonctionner. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` et `{ts, date, long}` sont résolus par le résolveur ICU d'Intlayer. Consultez [format de message ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md).

</Question>

<Question title="Pourquoi l'adaptateur est-il plus lourd que next-intlayer natif ?">

Il transporte la surface d'API de `next-intl` au-dessus du cœur d'Intlayer : `useFormatter`, `t.rich`, le résolveur ICU, les helpers de navigation. Cela représente 8.0 KB contre 5.5 KB, et +6 KB par page. C'est le pont, pas la destination.

</Question>

<Question title="Puis-je migrer composant par composant ?">

Oui. N'importe quel composant peut passer de `useTranslations("about")` à `useIntlayer("about")` avec un fichier `.content.ts` co-localisé. Les dictionnaires JSON et `.content.ts` coexistent et fusionnent, il n'y a donc pas de rupture brutale.

</Question>

<Question title="Les pathnames localisés fonctionnent-ils ?">

Pas via les `pathnames` de `next-intl` : l'adaptateur les accepte pour le typage mais ne les interpole pas. Utilisez plutôt `routing.rewrite` d'Intlayer, qui émet les littéraux localisés dans le registre de types.

</Question>

</FAQ>

## Comparaisons connexes

Même série d'adaptateurs :

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer-vue-i18n.md)

Les bibliothèques comparées directement :

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-intl_vs_intlayer.md), même benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md)
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_next-intl_outdated.md)

Documentation de référence :

- [Compat adapter: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/next-intl.md)
- [Guide de migration : next-intl vers Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-intl_to_intlayer.md)
- [Rapport de benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md) et [rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)
- [Optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et [le compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) et [traduction par IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md)

## Conclusion

`@intlayer/next-intl` fait une chose : elle change ce à quoi `useTranslations` est lié, d'un provider contenant chaque message à un dictionnaire compilé pour ce composant. Sur la même application Next.js, cela représente **6 KB par page**, **2,7x plus petits composants**, **0% de fuite** et **2 ms d'hydratation**, avant même que quelqu'un n'ouvre un fichier de composant. La navigation et les middlewares conservent leur API au-dessus de la configuration de routage d'Intlayer, et le runtime natif `next-intlayer` reste encore plus léger.

Toutes les données brutes, les applications de test et les scripts se trouvent dans le [référentiel Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Exécutez-le vous-même.

Reportez-vous à la [documentation « Why Intlayer? »](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) pour plus de détails.
