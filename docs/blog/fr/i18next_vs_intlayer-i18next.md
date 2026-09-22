---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs @intlayer/i18next : Même API, Bundle Différent"
description: Ce qui change lorsqu'une application React ou Next.js conserve ses appels à i18next, react-i18next et next-i18next mais les exécute via les adaptateurs @intlayer/i18next. JavaScript par page, taille des composants, fuite de chaînes et hydratation mesurés sur le même code, ainsi que ce que les adaptateurs conservent, ignorent et ne peuvent pas remplacer.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Adaptateur de compatibilité
  - Migration
  - Internationalisation
  - i18n
  - Benchmark
  - Taille de bundle
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Même API, Bundle Différent

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next` et `@intlayer/next-i18next` sont des adaptateurs de compatibilité. Ils exposent l'API `i18next` que votre code utilise déjà (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) et la distribuent à partir de dictionnaires compilés par Intlayer. Les composants ne changent pas. Le runtime sous-jacent, lui, change.

Cet article mesure ce remplacement sur la même application Next.js, construite une fois avec `next-i18next` et une fois avec `@intlayer/next-i18next`. Les chiffres proviennent de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Pour comparer `i18next` et Intlayer en tant que bibliothèques distinctes, consultez [i18next vs Intlayer](https://intlayer.org/fr/blog/i18next-vs-intlayer). Celui-ci se concentre sur ce que l'adaptateur transforme lorsque vous conservez votre code tel quel.

<TOC/>

> **tl;dr** : Sur la même application Next.js, remplacer `next-i18next` par `@intlayer/next-i18next` fait passer le JavaScript par page de **218.5 Ko à 150.7 Ko** gzip (configuration naïve) et surpasse la configuration `next-i18next` entièrement optimisée (163.4 Ko) de **12.7 Ko**. Le composant moyen passe de **78.5 Ko à 9.7 Ko**, la fuite de chaînes vers d'autres pages passe de **~90% à 0%**, l'hydratation de **15.6 ms à 11.3 ms**, et le runtime de **19.7 Ko à 9.4 Ko**. Aucun composant n'a été modifié, un seul fichier de provider l'a été. Les plugins `i18next` (backends, détecteurs de langue) sont acceptés mais ne font rien : il n'y a plus rien à charger ni à détecter au runtime.

## Ce qu'est `@intlayer/i18next`

`i18next` est un runtime. `i18n.init({ resources })` ou un plugin backend charge `locales/{lng}/{ns}.json` dans une instance globale ; `useTranslation("about")` y abonne le composant ; `t("title")` recherche la clé au moment du rendu. Les namespaces, le lazy loading, les listes de namespaces par page et la sécurité de typage sont entièrement à votre charge en matière de configuration et de maintenance.

Les adaptateurs conservent l'API et remplacent l'instance :

1. **Alias d'importation.** `createNextI18nPlugin()` depuis `@intlayer/next-i18next/plugin` (ou `withI18next`) enveloppe `withIntlayer` et ajoute des alias Webpack / Turbopack pour que `next-i18next`, `react-i18next` et `i18next` renvoient vers leurs équivalents `@intlayer/*`. Sur Vite, `reactI18nextVitePlugin()` depuis `@intlayer/react-i18next/plugin` fait de même. Aucun import n'a besoin d'être renommé.
2. **JSON comme source de vérité.** Le plugin `syncJSON` lit vos fichiers existants `locales/{lng}/{ns}.json` avec `format: "i18next"` (ainsi `{{name}}`, l'imbrication `$t()`, les suffixes `_one` / `_other` et de contexte sont correctement analysés) et réécrit les traductions lorsque le CLI ou le CMS les met à jour.
3. **Liaison sur le site d'appel.** La passe d'optimisation d'Intlayer réécrit `useTranslation("about")` en un appel qui reçoit directement le dictionnaire `about`, dans la locale active. Le composant cesse d'interroger le store global.

```tsx fileName="components/About.tsx"
// Votre code, inchangé
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Ce que le compilateur émet (simplifié)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Cette réécriture est précisément ce qui fait basculer les colonnes de taille des composants et de fuite de page ci-dessous.

## Ce que les adaptateurs conservent, ignorent et ne remplacent pas

| API `i18next`                                                                   | Avec `@intlayer/*`                                                                                                       |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Conservé. Lié au dictionnaire `ns` au moment du build ; clés typées selon votre contenu                               |
| `t("key", { name })`, `{{interpolation}}`, imbrication `$t(key)`                | ✅ Conservé                                                                                                              |
| Pluriels `key_one` / `key_other`, contexte `key_male`, `returnObjects`          | ✅ Conservé. Pluriels évalués avec `Intl.PluralRules`                                                                    |
| `<Trans>` avec `components`, balises numérotées `<1>...</1>`, `values`          | ✅ Conservé                                                                                                              |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Conservé                                                                                                              |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Conservé. `changeLanguage` pilote la locale d'Intlayer                                                                |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Conservé                                                                                                              |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` appelle le `init` du plugin et s'arrête là ; les backends et détecteurs n'ont rien à charger ni à détecter    |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` est **ignoré** avec un avertissement en dev ; supprimez les imports JSON pour obtenir les gains de bundle |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Rend un `IntlayerProvider` ; la prop `i18n` est ignorée. Sur App Router, transmettez la locale (voir ci-dessous)      |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Renvoie la structure attendue et ne charge rien. Inoffensif à garder, sûr à supprimer                                 |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Conservé                                                                                                              |
| `next-i18next.config.js`                                                        | ⚠️ Non lu. Les locales proviennent de `intlayer.config.ts`                                                               |
| `useTranslation()` sans namespace spécifié                                      | ✅ Fonctionne avec le dictionnaire global `translation` du fichier complet (`splitKeys: false`)                          |

## Le benchmark

### Ce qui a été mesuré

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construit **la même application** avec chaque configuration : **10 pages** (accueil, à propos, blog, carrières, contact, FAQ, tarifs, produits, paramètres, équipe), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), des composants identiques et un contenu identique. Les pages sont mesurées en `en` et `fr`.

`next-i18next` a été testé avec quatre stratégies de chargement, depuis le JSON de chaque locale importé dans `resources` (`static`) jusqu'à un namespace par route, chargé paresseusement via un backend (`scoped-dynamic`). L'adaptateur a été construit sur **les mêmes composants que la configuration naïve**, avec uniquement `next.config.ts`, `intlayer.config.ts` et le fichier de provider modifiés. Il ne propose aucune variante "scopée" manuelle : le compilateur scope le contenu par composant.

Pour chaque build, la suite enregistre :

- **Taille de la lib** : taille gzip d'un composant vide qui n'importe que la bibliothèque i18n.
- **JS par page** : moyenne du JavaScript gzip téléchargé par page sur toutes les pages et locales.
- **% de fuite de locale** : part des chaînes traduites dans le JS téléchargé qui appartiennent à une locale que l'utilisateur **ne consulte pas**.
- **% de fuite de page** : part des chaînes traduites dans le JS téléchargé qui appartiennent à une page sur laquelle l'utilisateur **ne se trouve pas**.
- **Moyenne composant** : taille moyenne gzip de chaque composant compilé isolément.
- **Réactivité E2E** : temps réel mesuré entre le choix d'une nouvelle locale et la mise à jour de `html[lang]` dans le DOM (Playwright, 5 itérations).
- **Hydratation** : durée de la phase d'hydratation de React.

> Les chiffres ci-dessous proviennent de l'exécution du **12/09/2026** avec `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) et `@intlayer/next-i18next` 9.5.1. L'application de test est volontairement compacte (quelques dizaines de chaînes par locale), les pourcentages de fuite décrivent donc une **tendance** : ils croissent avec votre contenu tandis que le coût du runtime reste fixe.

### Résultats sur Next.js

Sélectionnez les métriques et les bibliothèques qui vous intéressent :

<I18nBenchmark framework="nextjs" vertical/>

| Configuration                | Stratégie      | Taille lib (gz) | JS page moy (gz) | Fuite locale | Fuite page | Composant moy (gz) | Réactivité E2E | Hydratation |
| ---------------------------- | -------------- | --------------: | ---------------: | -----------: | ---------: | -----------------: | -------------: | ----------: |
| **base** (sans i18n)         | -              |          0.0 Ko |         141.0 Ko |         0.0% |       0.0% |             0.9 Ko |        13.4 ms |     11.8 ms |
| `next-i18next`               | static         |         19.7 Ko |         218.5 Ko |         0.0% |      89.8% |            78.5 Ko |        16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |         19.7 Ko |         169.5 Ko |        50.0% |      89.8% |            26.1 Ko |        15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |         19.7 Ko |         220.1 Ko |         0.0% |      89.8% |            78.9 Ko |        16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |         19.7 Ko |         163.4 Ko |         0.0% |       0.0% |            27.1 Ko |        15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |      **9.4 Ko** |     **150.7 Ko** |     **0.0%** |   **0.0%** |         **9.7 Ko** |    **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |      **9.4 Ko** |     **150.7 Ko** |     **0.0%** |   **0.0%** |         **9.7 Ko** |    **11.9 ms** | **10.6 ms** |
| `next-intlayer` (natif)      | static         |          5.5 Ko |         141.3 Ko |         0.0% |       0.0% |             8.5 Ko |        15.5 ms |     16.9 ms |
| `next-intlayer` (natif)      | dynamic        |          5.5 Ko |         141.3 Ko |         0.0% |       0.0% |             6.9 Ko |        15.3 ms |     15.9 ms |

**Comment l'interpréter**

- **68 Ko de moins par page par rapport à la configuration naïve.** `resources: { en, fr, ... }` expédie chaque locale et chaque namespace sur chaque page : **218.5 Ko**. Le build avec adaptateur pour les mêmes composants tombe à **150.7 Ko**. Il surpasse également la meilleure configuration de `next-i18next` (163.4 Ko, un namespace par route, chargé à la demande) de 12.7 Ko, car le runtime `i18next` pèse à lui seul 19.7 Ko contre 9.4 Ko.
- **La fuite passe à 0% sans toucher au moindre composant.** Chaque configuration de `next-i18next` sauf la version entièrement découpée expédie ~90% de chaînes d'autres pages. La ligne `dynamic` est plus pénalisante qu'il n'y paraît : elle n'élimine pas la fuite de page et introduit **50% de fuite de locale**, car le backend par locale rapatrie toujours l'intégralité du namespace `translation`. L'adaptateur atteint 0% / 0% directement sur le code d'origine.
- **Composants : 8x plus légers.** Un composant utilisant `useTranslation()` compilé isolément pèse en moyenne **78.5 Ko** avec `resources` inliné et **26-27 Ko** avec un backend, car `t` reste lié au store global. Avec l'adaptateur, il n'affiche plus que **9.7 Ko**.
- **Hydratation et basculement plus rapides.** L'hydratation passe de 15.6 ms à **11.3 ms** (et de 27.7 ms dans la configuration `dynamic`, où l'appel backend se situe sur le chemin critique). Le basculement de locale passe de 15-16 ms à **11-12 ms**.
- **L'adaptateur n'est pas le runtime natif.** `next-intlayer` atteint **141.3 Ko**, soit +0.3 Ko par rapport à l'application de base. L'adaptateur supporte la surface d'API de `i18next` (dialecte d'interpolation, résolution des pluriels et contextes, analyse des balises `<Trans>`) en surcouche du cœur d'Intlayer : 9.4 Ko et +9.4 Ko par page par rapport au natif. Il constitue une passerelle, non une fin en soi.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet, chaque bibliothèque et chaque stratégie, dans le [rapport de benchmark Next.js](https://intlayer.org/fr/doc/benchmark/nextjs).

> L'adaptateur `react-i18next` sur Vite / TanStack Start n'a pas été inclus dans ce cycle de test. La référence pour `react-i18next` sur TanStack Start se trouve dans [i18next vs Intlayer](https://intlayer.org/fr/blog/i18next-vs-intlayer) : 127-184 Ko par page et 123-185 ms de temps de basculement de locale quand le backend est différé.

## Pourquoi ces écarts de métriques

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Rien n'a changé dans le dossier `components/` : les gains proviennent donc exclusivement de la cible à laquelle `useTranslation` est relié.

**Avec `i18next`**, la liaison s'établit avec l'instance globale. Tout ce qui y a été chargé (toutes les locales en `static`, l'ensemble du namespace de la locale active en `dynamic`) est accessible depuis chaque composant appelant `useTranslation()`. Le bundler ne peut pas découper plus finement que ce que l'instance retient, et le runtime ne peut pas anticiper les clés demandées au rendu.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # toutes les chaînes de chaque page
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

Tout ce que l'instance contient est expédié sur chaque page, et le gaspillage croît sur deux axes, les pages et les locales :

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**Avec `@intlayer/next-i18next`**, la liaison s'opère directement avec le dictionnaire. `syncJSON` convertit chaque fichier de namespace en dictionnaire ; la passe d'optimisation transmet au composant le dictionnaire correspondant sous forme d'un import que le bundler peut tracer et séparer par page et par locale.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # inchangé, toujours source de vérité
│   └── fr/translation.json
├── .intlayer/                        # généré : un dictionnaire par namespace, par locale
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← inchangé
```

Le fichier `i18n/i18n.ts` et son import de `resources` deviennent du code mort. C'est là que résident les 68 Ko d'économie.

## Migration en trois étapes

<Steps>
<Step number={1} title="Installation">

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

La commande détecte `i18next` / `react-i18next` / `next-i18next`, installe `intlayer`, le package de framework (`next-intlayer` ou `react-intlayer`), l'adaptateur `@intlayer/*` correspondant ainsi que `@intlayer/sync-json-plugin`, et pré-remplit `intlayer.config.ts`. Laissez les packages d'origine installés : ils servent de peer dependencies et fournissent les définitions de types.

</Step>
<Step number={2} title="Pointer Intlayer vers vos fichiers de locales">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // dialecte i18next : {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Un fichier par namespace : `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Si vous disposez d'un unique fichier `translation.json` par locale (le namespace par défaut d'i18next), définissez `splitKeys: false` afin que le fichier complet reste un seul dictionnaire et qu'un appel simple à `useTranslation()` continue de fonctionner.

</Step>
<Step number={3} title="Ajouter le plugin">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

Sur l'App Router, les composants clients obtiennent leur locale via le segment `[locale]`. L'`I18nextProvider` de l'adaptateur ne prenant aucune locale en paramètre, remplacez-le une seule fois dans votre fichier de provider :

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Tous les composants enfants continuent d'appeler `useTranslation()` sans modification.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` enveloppe `vite-intlayer` et crée les alias pour `react-i18next` et `i18next`. Pour un projet sans React, `i18nextVitePlugin()` depuis `@intlayer/i18next/plugin` crée l'alias pour `i18next` seul.

</Tab>
</Tabs>

</Step>
</Steps>

### Ce que vous pouvez supprimer par la suite

| Fichier / modèle                                       | Raison                                                                             |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` et les imports JSON       | Ignorés par l'adaptateur. C'est ici que se trouvaient les 68 Ko                    |
| `i18next-http-backend`, `i18next-resources-to-backend` | Plus rien à récupérer au runtime                                                   |
| `i18next-browser-languagedetector`                     | La détection de locale dépend du routage d'Intlayer (préfixe URL, cookie, en-tête) |
| `serverSideTranslations()` dans `getStaticProps`       | Renvoie une structure vide ; inoffensif, mais inutile                              |
| `next-i18next.config.js`                               | Non lu. Les locales sont déclarées dans `intlayer.config.ts`                       |
| Listes `ns: [...]` par page                            | Le compilateur sélectionne les namespaces par composant                            |

### Ce que vous gagnez au-delà des octets

- **Clés typées.** `useTranslation("about")` est typé d'après le dictionnaire compilé `about` ; `t("does.not.exist")` déclenche une erreur TypeScript au lieu de renvoyer la chaîne de clé.
- **`npx intlayer test`** bloque la CI en cas de clé manquante dans n'importe quelle langue. **`npx intlayer fill`** traduit automatiquement les clés manquantes avec votre propre clé d'API (OpenAI, Anthropic, Mistral, Gemini...) et les réécrit dans `locales/{lng}/{ns}.json`.
- **Éditeur visuel et CMS** opèrent sur le même JSON, permettant aux équipes éditoriales de modifier le contenu via une interface pendant que les fichiers se mettent à jour.
- **Transition progressive vers `.content.ts`.** Chaque composant peut basculer indépendamment de `useTranslation("about")` à `useIntlayer("about")` avec un fichier de contenu dédié. Fichiers JSON et `.content.ts` coexistent naturellement.

## Limites à connaître avant de démarrer

<AccordionGroup>
<Accordion header="Les backends et détecteurs sont inertes">

`i18n.use(HttpBackend)` appelle l'init du plugin et rien d'autre. Si votre application dépendait de la récupération de traductions depuis un CMS au runtime, ce flux disparaît ; utilisez le [CMS d'Intlayer](https://intlayer.org/fr/doc/concept/cms) ou les commandes `intlayer pull` / `push` à la place. La détection de locale devient la configuration de routage d'Intlayer (préfixe d'URL, cookie, en-tête).

</Accordion>
<Accordion header="resources est ignoré, pas fusionné">

Contrairement à certains autres adaptateurs, `@intlayer/i18next` n'utilise pas les `resources` inline comme solution de repli. Chaque clé doit exister dans les dictionnaires synchronisés, ce que vérifie `intlayer test`.

</Accordion>
<Accordion header="L'App Router nécessite la modification du provider">

Un seul fichier, montré ci-dessus. Le Pages Router avec `appWithTranslation` ne nécessite rien.

</Accordion>
<Accordion header="next-i18next.config.js n'est pas lu">

`localePath`, `fallbackLng`, `reloadOnPrerender` et autres n'ont aucun équivalent ; les locales et le fallback proviennent de `intlayer.config.ts`.

</Accordion>
<Accordion header="L'adaptateur n'est pas gratuit">

9.4 KB de runtime et +9.4 KB par page par rapport à `next-intlayer`. Une fois que chaque composant a migré vers `useIntlayer`, supprimez-le.

</Accordion>
</AccordionGroup>

## Quand choisir quelle solution ?

<AccordionGroup>
<Accordion header="Rester sur i18next">

Votre application dépend de backends au runtime (traductions servies par un CMS au moment de la requête), de l'écosystème de plugins, ou d'une cible non-React non couverte par les adaptateurs.

</Accordion>
<Accordion header="Utiliser @intlayer/*">

Vous utilisez `react-i18next` / `next-i18next` et souhaitez économiser 68 KB, avoir des composants 8x plus petits, 0% de fuite, des clés typées et des vérifications CI sans réécriture. C'est le point d'entrée pour une codebase `i18next` existante.

</Accordion>
<Accordion header="Passer en natif (next-intlayer / react-intlayer)">

Pour les nouveaux projets, ou une fois que l'adaptateur a fait son travail. Il possède le runtime le plus léger (5.5 KB, +0.3 KB par page) et débloque les Server Components synchrones et les fichiers `.content.ts` par composant. Commencez avec [Intlayer avec Next.js](https://intlayer.org/fr/doc/environment/nextjs) ou [avec Vite et React](https://intlayer.org/fr/doc/environment/vite-and-react).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="D'où viennent les 68 KB ?">

De `resources: { en, fr, ... }`. La configuration naive de `next-i18next` importe le JSON de chaque locale dans `init()`, de sorte que chaque page transporte chaque namespace dans chaque langue : **218.5 KB** par page. L'adaptateur n'embarque jamais ce bloc ; il fournit à chaque composant le dictionnaire qu'il nomme, dans la locale active.

</Question>

<Question title="Mes composants <Trans> continuent-ils de fonctionner ?">

Oui, avec `components`, les balises numérotées `<1>...</1>` et les `values`. De même pour `{{interpolation}}`, l'imbrication `$t(key)`, les pluriels `key_one` / `key_other` (évalués avec `Intl.PluralRules`), les suffixes de contexte et `returnObjects`.

</Question>

<Question title="Que faire si j'utilise un seul fichier translation.json par locale ?">

Définissez `splitKeys: false` dans le plugin `syncJSON`. L'ensemble du fichier reste un dictionnaire unique et un simple appel à `useTranslation()` continue de s'y résoudre.

</Question>

<Question title="Est-ce la même chose que de migrer vers Intlayer ?">

Non, c'est la passerelle. L'adaptateur conserve l'API `i18next` et coûte 9.4 KB de runtime ; `next-intlayer` natif coûte 5.5 KB et apporte les Server Components synchrones et les fichiers `.content.ts` colocalisés. Vous pouvez migrer composant par composant, car les dictionnaires JSON et `.content.ts` coexistent.

</Question>

<Question title="Les traducteurs peuvent-ils continuer à travailler comme aujourd'hui ?">

Oui. `locales/{lng}/{ns}.json` reste la source de vérité : `syncJSON` le lit avec le dialecte i18next et réécrit les traductions lorsque la CLI ou le CMS les met à jour.

</Question>

</FAQ>

## Comparatifs associés

Même série d'adaptateurs :

- [next-intl vs @intlayer/next-intl](https://intlayer.org/fr/blog/next-intl-vs-intlayer-next-intl)
- [Lingui vs @intlayer/lingui](https://intlayer.org/fr/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/fr/blog/vue-i18n-vs-intlayer-vue-i18n)

Les bibliothèques comparées directement :

- [i18next vs Intlayer](https://intlayer.org/fr/blog/i18next-vs-intlayer), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/fr/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/fr/blog/react-i18next-vs-react-intl-vs-intlayer)
- [Is i18next outdated?](https://intlayer.org/fr/blog/is-i18next-outdated)

Documentation de référence :

- Compat adapters: [i18next](https://intlayer.org/fr/doc/compatibility/i18next), [react-i18next](https://intlayer.org/fr/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/fr/doc/compatibility/next-i18next)
- Migration guides: [i18next](https://intlayer.org/fr/doc/migration/i18next), [react-i18next](https://intlayer.org/fr/doc/migration/react-i18next), [next-i18next](https://intlayer.org/fr/doc/migration/next-i18next)
- [Next.js benchmark report](https://intlayer.org/fr/doc/benchmark/nextjs) and [TanStack Start benchmark report](https://intlayer.org/fr/doc/benchmark/tanstack)
- [Bundle optimization](https://intlayer.org/fr/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/fr/doc/compiler)
- [Visual Editor](https://intlayer.org/fr/doc/concept/editor), [CMS](https://intlayer.org/fr/doc/concept/cms) and [AI translation](https://intlayer.org/fr/doc/concept/auto-fill)

## Conclusion

`i18next` constitue le runtime le plus lourd de ce benchmark, et les adaptateurs en retirent la majeure partie sans vous obliger à quitter son API. Sur la même application Next.js, cela représente **68 Ko de moins par page** par rapport à la configuration naïve, **12.7 Ko de moins** que la version la plus optimisée à la main, des **composants 8x plus légers**, **0% de fuite** et **4 ms d'hydratation**, le tout en échange d'un fichier de configuration, d'une ligne de plugin et d'un ajustement de provider. Les backends et détecteurs deviennent sans effet, `resources` est ignoré plutôt que fusionné, et le runtime natif `next-intlayer` conserve 9 Ko d'avance supplémentaire en légèreté.

L'ensemble des données brutes, des applications de test et des scripts est disponible dans le [dépôt Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Vous pouvez le reproduire vous-même.

Consultez le document [Pourquoi Intlayer ?](https://intlayer.org/fr/doc/why) pour en savoir plus.
