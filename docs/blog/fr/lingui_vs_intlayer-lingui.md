---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 8
title: "Lingui vs @intlayer/lingui : Mêmes Macros, Nouveau Runtime"
description: Ce qui change lorsqu'une application React conserve ses macros Lingui mais les distribue via l'adaptateur de compatibilité @intlayer/lingui. Taille des composants, hydratation, fuites et JavaScript par page mesurés sur le même code TanStack Start, y compris les points où l'adaptateur est en retrait.
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Adaptateur de compatibilité
  - Migration
  - Internationalisation
  - i18n
  - Benchmark
  - Taille de bundle
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Mêmes Macros, Nouveau Runtime

`@intlayer/lingui` est un adaptateur de compatibilité pour `@lingui/core` et `@lingui/react`. Vos appels `` t`...` ``, `<Trans>`, `useLingui()` et `i18n._()` restent strictement identiques ; les macros continuent de compiler ; ce qui change, c'est l'origine des messages à l'exécution. Au lieu d'un unique catalogue compilé par locale, chaque point d'appel est lié à un dictionnaire Intlayer compilé spécifiquement pour lui.

Cet article mesure ce remplacement sur la même application TanStack Start, compilée une première fois avec Lingui et une seconde fois avec l'adaptateur. Les chiffres proviennent de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Pour comparer les deux bibliothèques en tant que telles, consultez [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer.md). Cet article se concentre sur les apports de l'adaptateur et les cas où il n'apporte pas de gain.

<TOC/>

> **tl;dr** : Sur la même application TanStack Start, `@intlayer/lingui` a réduit la taille moyenne des composants de **85,5 Ko à 12,8 Ko** gzip, l'hydratation de **28 ms à 19,7 ms**, et le changement de locale de **5,9 ms à 2,9 ms**, sans modifier les macros. Dans la configuration naïve (tous les catalogues chargés au démarrage), il a également éliminé **90 % de fuite de page** et 12 Ko par page. En revanche, dans la configuration avec lazy loading, il charge **137 Ko par page contre 115 Ko** pour Lingui classique : l'adaptateur résout l'ICU au runtime là où Lingui distribue des tableaux de tokens précompilés. La fuite de locale source (~9-10 %) est identique des deux côtés, car elle provient du repli de secours `message` directement embarqué dans les composants, et non du runtime. L'adaptateur est un plugin Vite ; il a été mesuré sur TanStack Start.

## Qu'est-ce que `@intlayer/lingui` ?

Lingui est constitué d'un compilateur et d'un runtime. Les macros de votre code source sont extraites vers un catalogue `.po` (ou JSON) par locale, compilées en un module JS par locale, puis injectées dans une instance globale `I18n` via `i18n.load()` + `i18n.activate()`. Chaque appel à `useLingui()` s'abonne à cette instance ; chaque appel à `_()` recherche son identifiant dans le catalogue actif.

`@intlayer/lingui` conserve les macros et l'API tout en remplaçant la recherche dans le catalogue :

1. **Alias d'import.** Le plugin `lingui()` issu de `@intlayer/lingui/plugin` enveloppe `vite-intlayer` et injecte des alias `resolve.alias` pour faire pointer `@lingui/core` et `@lingui/react` vers `@intlayer/lingui`. Vos imports restent inchangés.
2. **Catalogues comme source de vérité.** Le plugin `syncJSON` (ou `syncPO` pour les fichiers `.po`) lit vos catalogues existants et les convertit en dictionnaires Intlayer, tout en réécrivant les traductions lorsque la CLI ou le CMS les met à jour. Avec `splitKeys: "key-prefix"`, un catalogue plat d'identifiants à points (`footer.github`, `hero.title`) devient un ensemble de petits dictionnaires découpés par préfixe au lieu d'un seul fichier de 244 Ko.
3. **Liaison au point d'appel.** La passe d'optimisation d'Intlayer collecte les identifiants passés à `_`, `t` et `<Trans>` dans chaque fichier, et transmet les dictionnaires correspondants au composant. `<Trans id="hero.title">` se lie de manière autonome ; `useLingui()` se lie à chaque préfixe exploité dans le fichier. Les identifiants sans point (identifiants hashés, `mockBanner`) basculent sur le dictionnaire de secours unique `messages` de Lingui.

```tsx fileName="src/components/Hero.tsx"
// Votre code, inchangé
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="Ce que le compilateur génère (simplifié)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

Le composant n'accède plus à l'instance globale ni au catalogue monolithique sous-jacent. Il cible directement `hero`. C'est l'explication directe de la division par 7 de la taille des composants dans le tableau ci-dessous.

## Ce que l'adaptateur conserve, ignore et ne remplace pas

| API Lingui                                                | Avec `@intlayer/lingui`                                                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Macros `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ Conservé. Gardez `@lingui/babel-plugin-lingui-macro` ou `@lingui/swc-plugin` dans le build avant Intlayer |
| `useLingui()` → `{ i18n, _, t }`                          | ✅ Conservé. Fonctionne aussi hors provider (locale dérivée de `react-intlayer`)                             |
| `i18n._(id, values)`, `i18n.t()`                          | ✅ Conservé. Résout aussi bien les identifiants explicites que hashés                                        |
| Pluriels ICU, `select`, `selectordinal`, `#`              | ✅ Conservé, via le résolveur ICU d'Intlayer                                                                 |
| `i18n.date()`, `i18n.number()`, `formats`                 | ✅ Conservé, s'appuie sur `Intl` natif                                                                       |
| `I18nProvider`                                            | ✅ Conservé. Enveloppe un `IntlayerProvider` ; écoute `i18n.on("change")` pour que `activate()` re-rende     |
| `i18n.activate(locale)`                                   | ✅ Conservé                                                                                                  |
| `i18n.load(locale, messages)` / `loadAndActivate()`       | ⚠️ Accepté comme **secours au runtime**. Les dictionnaires compilés prévalent ; avertissement dev suggéré    |
| `setupI18n({ messages, missing })`                        | ⚠️ `messages` fusionnés comme solution de repli ; `missing` est ignoré                                       |
| `lingui extract` / `lingui compile`                       | ✅ Votre workflow reste intact. Pointez `syncPO` / `syncJSON` sur les catalogues extraits                    |
| `defaultComponent` sur `I18nProvider`                     | ⚠️ Stocké dans le contexte, non appliqué lors du rendu                                                       |
| Next.js                                                   | ❌ Le plugin enveloppe `vite-intlayer`. Vite, TanStack Start et React Router uniquement                      |

## Le benchmark

### Ce qui a été mesuré

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compile **la même application** dans chaque configuration : **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), des composants identiques et un contenu rigoureusement équivalent. Les pages sont mesurées en `en` et en `fr`.

Lingui a été évalué selon quatre stratégies de chargement, depuis l'import initial de tous les catalogues compilés (`static`) jusqu'à un catalogue par route chargé à la demande (`scoped-dynamic`). L'adaptateur a été testé sur les **mêmes composants**, en modifiant uniquement `vite.config.ts` et `intlayer.config.ts`. Sa ligne `static` regroupe toutes les locales ; sa ligne `dynamic` (`importMode: 'dynamic'`) charge la locale active à la demande. Il n'existe pas de variante "scoped" : la passe d'optimisation découpe automatiquement par point d'appel.

Pour chaque build, les métriques suivantes sont enregistrées :

- **Lib size** : taille gzip d'un composant vide important uniquement la bibliothèque d'i18n.
- **Page JS** : JavaScript gzip téléchargé par page, calculé en moyenne sur l'ensemble des pages et des locales.
- **Locale leak %** : part des chaînes traduites dans le JS téléchargé appartenant à une locale que l'utilisateur ne consulte **pas**.
- **Page leak %** : part des chaînes traduites dans le JS téléchargé appartenant à une page sur laquelle l'utilisateur ne se trouve **pas**.
- **Component avg** : taille gzip moyenne de chaque composant compilé isolément.
- **E2E reactivity** : temps réel mesuré entre la sélection d'une nouvelle locale et la mise à jour de `html[lang]` dans le DOM (Playwright, 5 itérations).
- **Hydration** : durée de la phase d'hydratation React.

> Les chiffres ci-dessous sont issus du benchmark du **2026-09-12** avec `@lingui/react` 6.6.0 et `@intlayer/lingui` 9.5.1. L'application de test reste volontairement compacte (quelques dizaines de chaînes par langue) : les pourcentages de fuite reflètent donc une **tendance structurelle** qui s'amplifie avec le volume de contenu tandis que le coût runtime reste fixe.

### Résultats sur TanStack Start

| Configuration          | Stratégie      | Lib size (gz) | Page JS moy (gz) | Fuite locale | Fuite page | Composant moy (gz) | Réactivité E2E | Hydratation |
| ---------------------- | -------------- | ------------: | ---------------: | -----------: | ---------: | -----------------: | -------------: | ----------: |
| **base** (sans i18n)   | -              |        0,0 Ko |         111,0 Ko |         0,0% |       0,0% |             0,7 Ko |         8,1 ms |     21,6 ms |
| Lingui                 | static         |       11,2 Ko |         152,2 Ko |        50,0% |      90,0% |            58,0 Ko |         3,9 ms |     19,9 ms |
| Lingui                 | dynamic        |       11,2 Ko |     **115,2 Ko** |         9,3% |       0,0% |            85,5 Ko |         5,9 ms |     28,0 ms |
| Lingui                 | scoped-static  |       11,2 Ko |         120,8 Ko |         4,0% |       0,0% |           147,9 Ko |         7,1 ms |     33,9 ms |
| Lingui                 | scoped-dynamic |       11,2 Ko |         120,2 Ko |         8,6% |       0,0% |            83,7 Ko |        42,1 ms |     32,9 ms |
| **`@intlayer/lingui`** | static         |   **10,3 Ko** |         140,5 Ko |        50,0% |   **0,0%** |        **14,9 Ko** |     **3,3 ms** | **11,3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10,3 Ko** |         137,0 Ko |         9,9% |   **0,0%** |        **12,8 Ko** |     **2,9 ms** | **19,7 ms** |
| `intlayer` (natif)     | static         |        5,0 Ko |         125,8 Ko |        50,0% |       0,0% |             8,1 Ko |         3,2 ms |     11,5 ms |
| `intlayer` (natif)     | dynamic        |        5,0 Ko |         118,6 Ko |         0,0% |       0,0% |             6,3 Ko |         3,6 ms |     14,1 ms |

**Comment analyser ces résultats**

- **Composants : 7x plus légers.** C'est l'atout majeur de l'adaptateur. Un composant Lingui compilé de manière isolée pèse en moyenne **58 à 148 Ko** selon la stratégie, car `useLingui()` atteint l'instance globale et l'ensemble des catalogues qui y sont chargés. Le même composant avec l'adaptateur n'occupe que **12,8 à 14,9 Ko** : il n'importe que ses propres dictionnaires et le résolveur ICU.
- **Hydratation : 8 à 14 ms plus rapide.** `i18n.load()` + `i18n.activate()` s'exécutent côté client avant que React ne puisse hydrater ; plus la configuration de Lingui est segmentée, plus ce processus s'allonge (28 à 34 ms). Avec l'adaptateur, les dictionnaires sont injectés sous forme d'imports statiques déjà positionnés dans le chunk de page : **11,3 ms** en mode `static`, **19,7 ms** en mode `dynamic`.
- **Changement de locale : 2x plus rapide, sans rupture.** La configuration optimisée `scoped-dynamic` de Lingui met **42 ms** pour mettre à jour `html[lang]`, car le catalogue de la route doit être téléchargé, injecté et activé avant que le changement ne devienne visible. L'adaptateur reste à **2,9-3,3 ms** dans les deux modes.
- **La configuration naïve est assainie sans effort.** Lingui statique charge l'intégralité des catalogues sur chaque page : 152,2 Ko et 90 % de fuite de page. L'adaptateur statique affiche 140,5 Ko et 0 % de fuite de page, pour les mêmes composants.
- **Poids par page : Lingui l'emporte en mode `dynamic`, de 22 Ko.** C'est le point à garder à l'esprit. Lingui compile les messages en tableaux de tokens dès le build et n'embarque qu'un runtime minimaliste de 11 Ko qui se contente de les parcourir. L'adaptateur embarque le résolveur ICU d'Intlayer (environ 15 Ko de `@intlayer/core` supplémentaires par rapport au mode natif), la couche d'adaptation (~10 Ko) et `react-intlayer` (~6 Ko). Sur cette application, cela représente **137,0 Ko contre 115,2 Ko**. Si la taille brute par page est votre priorité absolue et que vous exploitez déjà Lingui avec lazy loading, l'adaptateur n'améliorera pas cette métrique.
- **La fuite de locale est identique des deux côtés.** 9,3 % pour Lingui, 9,9 % pour l'adaptateur en mode `dynamic`. Cela provient directement du code des composants : `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` contient la chaîne anglaise de secours, tout comme la sortie des macros si ce champ n'est pas purgé. Ce contenu anglais se retrouve dans le chunk `fr`, quel que soit l'outil assurant la traduction. Intlayer natif (`.content.ts`, sans source inline) garantit quant à lui 0 %.

## Pourquoi les chiffres évoluent, et pourquoi un indicateur stagne

Deux paramètres déterminent ces mesures : **la portée de liaison des composants** et **le format de transport des messages**.

**Liaison.** Avec Lingui, l'unité de base est la locale. Le fichier `messages.mjs` pour `fr` forme un module unique ; tout composant important l'instance associée peut accéder à l'ensemble du fichier, empêchant le bundler de segmenter plus finement. Avec l'adaptateur, l'unité de base devient le point d'appel : `hero` et `footer` sont des imports distincts, découpés et chargés à la demande par composant. Cela explique le gain sur la taille des composants, l'hydratation et les fuites de page.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # sortie de compilation lingui, un par locale
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # généré : un dictionnaire par préfixe d'id, par locale
└── src
    ├── locales
    │   ├── en/messages.json             # inchangé, source de vérité préservée
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← inchangé
```

**Format.** L'étape de compilation de Lingui convertit `{count, plural, one {# item} other {# items}}` en un tableau de tokens ; le runtime n'analyse jamais la syntaxe ICU. L'adaptateur préserve le message sous forme de texte brut et l'analyse via le résolveur ICU d'Intlayer. Cela représente un coût fixe d'environ 15 Ko payé une seule fois par page, expliquant pourquoi la ligne `dynamic` cède du terrain sur le volume brut tout en dominant sur toutes les autres mesures. Intlayer natif évite ce surcoût car ses dictionnaires `.content.ts` utilisent des nœuds `enu()` / `insert()` résolus dès la compilation.

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

La commande identifie Lingui, analyse `lingui.config.ts` pour choisir `syncPO` (catalogues `.po`) ou `syncJSON` (catalogues JSON), installe `intlayer`, `react-intlayer`, `@intlayer/lingui` ainsi que le plugin de synchronisation adéquat, puis substitue `@lingui/vite-plugin` par le plugin d'adaptation dans `vite.config.ts`. Conservez `@lingui/core`, `@lingui/react` et votre plugin de macros : les macros continuent de compiler et l'adaptateur réutilise les types de Lingui.

</Step>
<Step number={2} title="Connecter Intlayer à vos catalogues">

Pour les catalogues JSON (`format: "minimal"` dans `lingui.config.ts`) :

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
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Regroupe les identifiants par premier segment : `footer.github` → dictionnaire `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

Pour les catalogues `.po`, remplacez `syncJSON` par `syncPO` depuis `@intlayer/sync-po-plugin` avec le même schéma `source` assorti d'une extension `.po`. Consultez la [documentation du plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md).

L'option `splitKeys: "key-prefix"` est précisément ce qui permet d'alléger drastiquement les composants. Le catalogue conserve sa structure linéaire ; le découpage s'applique uniquement aux dictionnaires compilés, et la synchronisation inverse fusionne automatiquement les clés.

</Step>
<Step number={3} title="Ajout du plugin">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Conservez votre plugin de macros ; il doit s'exécuter avant la passe Intlayer
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` intègre `vite-intlayer` (surveillance des contenus, compilation des dictionnaires, passe d'optimisation) et crée des alias redirigeant `@lingui/core` et `@lingui/react` vers l'adaptateur. Compilez, et bénéficiez immédiatement de ces performances.

</Step>
</Steps>

### Ce que vous pouvez supprimer ensuite

| Fichier / pattern                                    | Raison                                                                                               |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Les dictionnaires sont importés par les composants qui les utilisent. `i18n.load()` devient un repli |
| `i18n.load()` / `i18n.loadAndActivate()`             | Conservez `i18n.activate(locale)` ; supprimez le chargement manuel des catalogues                    |
| `lingui compile` dans le script de build             | Uniquement si vous utilisez JSON ou `.po` comme source et n'importez plus de modules compilés        |

### Ce que vous gagnez au-delà des octets

- **Détection des traductions manquantes.** `npx intlayer test` interrompt la CI dès qu'une clé est absente dans une langue ; `lingui extract` se limite à des statistiques indicatives.
- **`npx intlayer fill`** traduit automatiquement les entrées manquantes via le fournisseur de votre choix (OpenAI, Anthropic, Mistral, Gemini...) et les réinjecte directement dans vos catalogues.
- **Éditeur Visuel et CMS** interagissent directement avec ces mêmes dictionnaires : vos fichiers `.po` et JSON peuvent ainsi être enrichis via une interface graphique par des profils non techniques.
- **Transition progressive vers `.content.ts`.** Un composant peut passer à tout moment de `useLingui()` à `useIntlayer("hero")` avec un fichier de contenu dédié. Les deux types de dictionnaires coexistent et s'associent naturellement.

## Limites à connaître avant de démarrer

- **Le surcoût par page en mode `dynamic`.** Comme évoqué plus haut : comptez environ +20 Ko par page par rapport à une configuration Lingui avec lazy loading sur une petite application. Cet écart n'augmente pas avec le volume de contenu (il dépend du résolveur, non des catalogues), mais ne diminue pas non plus.
- **Persistance de la fuite de la locale source.** Les descripteurs de messages et les macros compilées intègrent le texte anglais d'origine comme valeur de secours. Pour supprimer totalement cette fuite, il convient de purger le champ `message` ou de migrer vers des fichiers `.content.ts`.
- **`i18n.load()` agit comme secours, pas comme solution cible.** Si vous continuez d'importer les catalogues compilés tout en appelant `load()`, vous cumulerez l'ancien bundle et le nouveau. Supprimez ces imports.
- **Réservé à l'écosystème Vite.** Il n'existe pas de plugin Next.js pour `@intlayer/lingui`. Les projets Next.js sous Lingui ont intérêt à se tourner directement vers [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md).
- **`defaultComponent` n'est pas appliqué.** Si vous l'utilisez pour encapsuler systématiquement chaque `<Trans>`, ajoutez ce conteneur de manière explicite.

## Quand choisir chaque solution ?

- **Conservez Lingui** si vous exploitez déjà une configuration `scoped-dynamic`, que votre seule contrainte concerne le poids strict par page, et qu'un délai de 42 ms au changement de langue et de 30 ms à l'hydratation reste convenable pour votre produit.
- **Adoptez `@intlayer/lingui`** si vous utilisez Lingui et recherchez des composants plus légers, une hydratation et un changement de langue accélérés, 0 % de fuite de page en configuration naïve, des clés typées, des vérifications en CI et l'auto-complétion par IA, sans retoucher à vos macros. C'est la transition idéale pour un projet existant.
- **Passez au mode natif (`react-intlayer`)** lorsque vous entamez la refonte de vos composants. C'est l'unique solution du tableau affichant **0 % de fuite de locale**, un runtime de 5 Ko et seulement +7,6 Ko par page par rapport à l'application de base.

## Comparatifs associés

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer.md) (comparatif direct des deux bibliothèques sur le même benchmark)
- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-intl_vs_intlayer-next-intl.md) (série sur les adaptateurs de compatibilité)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18next_vs_intlayer-i18next.md) (série sur les adaptateurs de compatibilité)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer-vue-i18n.md) (série sur les adaptateurs de compatibilité)
- [Documentation de l'adaptateur de compatibilité : Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md)
- [Compilateur vs i18n déclaratif](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md)

## Conclusion

`@intlayer/lingui` redéfinit la façon dont un point d'appel Lingui est lié à ses traductions : au lieu de cibler une instance globale et son catalogue monolithique, il s'associe à un dictionnaire compilé spécifiquement pour le composant. Sur la même application TanStack Start, cela permet d'obtenir des **composants 7x plus légers**, une **hydratation accélérée de 8 à 14 ms**, un **changement de langue 2x plus rapide** sans blocage de 42 ms, le tout sans modifier la moindre macro. L'adaptateur ne modifie pas les valeurs par défaut embarquées dans vos composants (la fuite de langue source reste donc présente) et analyse l'ICU au runtime (la configuration dynamique embarque environ 20 Ko de plus par page que Lingui pur). Évaluez précisément vos priorités de performance avant d'opérer votre choix.

L'ensemble des données brutes, des applications de test et des scripts est accessible dans le [dépôt Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Vous pouvez reproduire ces mesures vous-même.

Consultez la [documentation 'Pourquoi Intlayer ?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) pour approfondir ces concepts.
