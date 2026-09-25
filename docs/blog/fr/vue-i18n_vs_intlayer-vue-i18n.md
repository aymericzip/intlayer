---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "vue-i18n vs @intlayer/vue-i18n: Même API, Bundle différent"
description: Ce qui change quand une application Vue 3 garde ses appels vue-i18n mais les exécute via l'adaptateur de compatibilité @intlayer/vue-i18n. JavaScript par page, taille d'exécution, taille de composant et fuites mesurées sur le même code Vite + Vue, plus ce que l'adaptateur conserve, ignore et ne peut pas remplacer.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Même API, Bundle différent

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n` est un adaptateur de compatibilité : il expose l'API `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) et la sert à partir des dictionnaires compilés par Intlayer. Vos fichiers `.vue` ne changent pas. Ce à quoi `t("footer.github")` est lié, si.

Cet article mesure ce changement sur la même application Vite + Vue 3, compilée une fois avec `vue-i18n` et une fois avec l'adaptateur. Les chiffres proviennent de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Pour `vue-i18n` et Intlayer comparés en tant que bibliothèques, lisez [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer.md) et le [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer_benchmark.md). Celui-ci porte sur ce que l'adaptateur change lorsque vous conservez vos composants tels qu'ils sont.

<TOC/>

> **tl;dr**: Sur la même app Vite + Vue 3, remplacer `vue-i18n` par `@intlayer/vue-i18n` a réduit le JavaScript par page de **134.9 KB à 47.0 KB** gzip (l'app sans i18n pèse 41.3 KB), le runtime de **24.3 KB à 7.9 KB**, le composant moyen de **196 KB à 8.4 KB**, et les fuites de chaînes de caractères cross-page de **90% à 0%**, sans éditer aucun fichier `.vue`. `createI18n({ messages })` continue de fonctionner comme fallback ; supprimez les imports JSON pour obtenir les chiffres ci-dessus. Les blocs SFC `<i18n>` et le `setLocaleMessage()` au runtime sont les deux features qui ne sont pas supportées.

## Ce qu'est `@intlayer/vue-i18n`

`vue-i18n` est un runtime. `createI18n({ messages: { en, fr, ... } })` construit une instance globale contenant chaque message de chaque locale ; `useI18n()` lie chaque composant à celle-ci ; `t("footer.github")` parcourt l'arborescence au moment du rendu. Cette conception est ce qui rend possible les blocs SFC `<i18n>` et `setLocaleMessage()`, et c'est aussi pourquoi le graphe de dépendances de chaque composant inclut l'arborescence entière.

`@intlayer/vue-i18n` conserve l'API et remplace l'arborescence :

1. **Import aliasing.** `vueI18nVitePlugin()` provenant de `@intlayer/vue-i18n/plugin` enveloppe `vite-intlayer` et ajoute un `resolve.alias` afin que `vue-i18n` se résolve en `@intlayer/vue-i18n`. Aucune importation n'est renommée.
2. **JSON as source of truth.** The `syncJSON` plugin reads your existing `locales/{locale}.json` with `format: "vue-i18n"` (so `{name}`, `{0}` list interpolation and `"car | cars"` pipe plurals are parsed correctly) and writes translations back when the CLI or the CMS updates them.
3. **Call-site binding.** The Intlayer optimize pass rewrites `useI18n()` call sites so the component receives the dictionaries its keys name, in the active locale, as imports the bundler can trace and split.

```vue fileName="src/components/Footer.vue"
<!-- Votre code, inchangé -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Ce que le compilateur émet (simplifié)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

Le composant n'accède plus à l'arborescence globale des messages. Il accède à `footer`. C'est pourquoi la colonne taille du composant ci-dessous chute de 196 KB à 8 KB.

## Ce que l'adaptateur conserve, ignore et ne remplace pas

| `vue-i18n` API                                                      | Avec `@intlayer/vue-i18n`                                                                                                                                |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Conservé. Les clés `t` sont typées par rapport à vos dictionnaires                                                                                    |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Conservé. `{name}`, `{0}` et les pluriels séparés par des pipes se résolvent comme avant                                                              |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Conservé. Les `datetimeFormats` / `numberFormats` issus de `createI18n()` sont respectés, soutenus par `Intl` natif                                   |
| `i18n.global.locale.value = "fr"`                                   | ✅ Conservé. Une `WritableComputedRef` soutenue par le client d'Intlayer ; la réactivité se comporte comme avant                                         |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Conservé. Enregistré sur `app.config.globalProperties` par `app.use(i18n)`                                                                            |
| `v-t` directive                                                     | ✅ Conservé                                                                                                                                              |
| `legacy: true`                                                      | ✅ Accepté                                                                                                                                               |
| `createI18n({ messages })`                                          | ⚠️ `messages` sont utilisés comme **fallback à l'exécution** avec un avertissement de développement. Supprimez les imports JSON pour les gains de bundle |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Avertissement et ne fait rien. Le chargement des messages à l'exécution est remplacé par des dictionnaires au moment de la compilation                |
| SFC `<i18n>` custom blocks                                          | ❌ Non lu. Déplacez ces messages dans le JSON de localisation (ou un `.content.ts` à côté du composant)                                                  |
| `@nuxtjs/i18n`                                                      | ⚠️ Adaptateur séparé, voir la [documentation de compatibilité Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/nuxtjs-i18n.md) |

## Le benchmark

### Ce qui a été mesuré

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construit **la même application Vite + Vue 3** avec chaque configuration : **10 pages** (accueil, à propos, blog, carrières, contact, FAQ, tarification, produits, paramètres, équipe), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), des composants identiques et un contenu identique. Les pages sont mesurées en `en` et `fr`.

Les deux ont été construits dans la configuration **statique**, celle que la plupart des projets Vue livrent : pour `vue-i18n`, chaque JSON de locale importé et passé à `createI18n({ messages })`; pour l'adaptateur, les mêmes composants avec `vite.config.ts` et `intlayer.config.ts` modifiés et l'import `messages` supprimé. Le natif `vue-intlayer` est inclus pour référence.

Pour chaque build, la suite enregistre :

- **Lib size** : taille gzip (et minifiée) d'un composant vide qui importe uniquement la bibliothèque i18n.
- **Page JS** : JavaScript gzip téléchargé par page, moyenné sur toutes les pages et locales.
- **Locale leak %** : part des chaînes traduites dans le JS téléchargé qui appartiennent à une locale que l'utilisateur n'est **pas** en train de consulter.
- **Page leak %** : part des chaînes traduites dans le JS téléchargé qui appartiennent à une page sur laquelle l'utilisateur n'est **pas**.
- **Component avg** : taille gzip moyenne de chaque composant compilé de manière isolée.
- **E2E reactivity** : temps écoulé entre la sélection d'une nouvelle locale et la mise à jour de `html[lang]` dans le DOM (Playwright, 5 itérations).
- **Page load** : `PerformanceNavigationTiming.duration`.

> Les chiffres ci-dessous proviennent de l'exécution datée du **12-09-2026** avec `vue-i18n` 11.4.0 et `@intlayer/vue-i18n` 9.5.1. L'application de test est volontairement petite (quelques dizaines de chaînes par locale), donc les pourcentages de fuite décrivent un **modèle** : ils augmentent avec votre contenu tandis que le coût d'exécution reste fixe.

### Résultats sur Vite + Vue 3

Sélectionnez les métriques et les bibliothèques qui vous intéressent :

<I18nBenchmark framework="vite-vue" vertical/>

| Configuration            | Stratégie | Taille Lib (gz) | Taille Lib (min) | Moyenne Page JS (gz) | Fuite de locale | Fuite de page | Moyenne Component (gz) | Réactivité E2E | Chargement de page |
| ------------------------ | --------- | --------------: | ---------------: | -------------------: | --------------: | ------------: | ---------------------: | -------------: | -----------------: |
| **base** (no i18n)       | -         |          0.0 KB |           0.0 KB |              41.3 KB |            0.0% |             - |                 1.1 KB |         1.8 ms |            10.8 ms |
| `vue-i18n`               | static    |         24.3 KB |          83.2 KB |             134.9 KB |           50.0% |         90.0% |               196.0 KB |         2.8 ms |            13.6 ms |
| **`@intlayer/vue-i18n`** | static    |      **7.9 KB** |      **23.2 KB** |          **47.0 KB** |       **15.0%** |      **0.0%** |             **8.4 KB** |     **1.5 ms** |         **9.3 ms** |
| `vue-intlayer` (native)  | static    |          3.9 KB |          11.1 KB |              57.1 KB |           56.8% |          0.0% |                 7.7 KB |         4.5 ms |            13.8 ms |
| `vue-intlayer` (native)  | dynamic   |          3.9 KB |          11.1 KB |              59.8 KB |           50.0% |          0.0% |                 6.5 KB |         4.0 ms |            15.8 ms |

> La colonne page-leak de l'application de base est laissée vide : sans bibliothèque i18n, l'empreinte digitale détecte les chaînes codées en dur dans les chunks partagés et le nombre n'est pas significatif.

**Comment le lire**

- **88 KB de moins par page, mêmes composants.** `vue-i18n` prend l'application de 41.3 KB à **134.9 KB**. La build de l'adaptateur des mêmes composants atterrit à **47.0 KB**, 5.7 KB au-dessus de l'application de base. La plupart de la différence est les 74.9 KB de `src/locales` que `createI18n({ messages })` intègre dans chaque page et que l'adaptateur ne regroupe jamais en bloc.
- **Le runtime se réduit 3x.** Un composant vide qui importe seulement `vue-i18n` coûte **24.3 KB gzip / 83.2 KB minifié** : `@intlify/core-base`, le compilateur de messages et le runtime. L'adapter coûte **7.9 KB / 23.2 KB**, la plupart étant le core d'Intlayer plus la surface API `vue-i18n`.
- **Composants : 23x plus petits.** Un composant `useI18n()` compilé en isolation fait en moyenne **196 KB**, parce que `t` est lié à l'instance qui contient chaque message de chaque locale. Avec l'adapter, le même composant fait en moyenne **8.4 KB** : il accède à son propre dictionnaire.
- **Fuite.** `vue-i18n` envoie chaque locale et les strings de chaque page sur chaque page : 50% de fuite de locale (sur les deux locales avec empreinte ; avec dix locales bundlées, le vrai gaspillage est plus élevé), 90% de fuite de page. L'adapter réduit la fuite de page à **0%** parce que chaque composant n'importe que ses dictionnaires. La fuite de locale s'élève à 15% dans cette exécution `static` ; `importMode: 'dynamic'` est le paramètre qui la supprime, et cette configuration ne faisait pas partie de cette exécution Vue.
- **Réactivité et chargement de page.** Le changement de locale est peu coûteux pour les deux (1,5-2,8 ms) ; le système de réactivité de Vue le rend possible une fois que les messages sont en mémoire. Le chargement de page passe de 13,6 ms à **9,3 ms**, en ligne avec 88 KB de JavaScript en moins à analyser.
- **À propos des lignes natives.** `vue-intlayer` dans cette exécution a regroupé chaque locale en mode `static` et a atteint 57,1 KB avec un runtime de 3,9 KB ; les dictionnaires synchronisés de l'adaptateur contenaient moins de chaînes de locale étrangère, d'où la figure inférieure par page. Le runtime natif reste le plus léger des trois, et son modèle `.content.ts` est l'équivalent des blocs SFC `<i18n>`.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet, chaque bibliothèque et chaque stratégie, dans le [rapport de benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md).

## Pourquoi les chiffres changent

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Rien dans `src/components/` n'a changé, donc les gains proviennent de ce à quoi `useI18n` est lié.

**Avec `vue-i18n`**, la liaison est l'instance globale. `createI18n({ messages: { en, fr, ... } })` est une seule importation qui contient tout ; chaque composant qui appelle `useI18n()` peut y accéder en entier, donc le bundler ne peut pas diviser en dessous de l'instance. L'optimisation signifie que _vous_ divisez `en.json` par route, appelez `setLocaleMessage()` dans un garde de routeur, et gardez la carte route-vers-fichier correcte au fur et à mesure que les composants se déplacent. Le gaspillage augmente sur deux axes à la fois, les pages et les locales :

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # chaînes de caractères de chaque page
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**Avec `@intlayer/vue-i18n`**, la liaison est le dictionnaire. `syncJSON` transforme chaque clé de premier niveau de `en.json` en dictionnaire; la passe d'optimisation fournit au composant ceux dont les clés sont nommées, en tant qu'imports que le bundler trace et divise par page.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # inchangé, toujours la source de vérité
│   └── fr.json
├── .intlayer/                     # généré: un dictionnaire par clé de premier niveau, par locale
└── src
    ├── i18n.ts                    # createI18n({})   ← import messages supprimé
    ├── main.ts                    # app.use(i18n)    ← inchangé
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← inchangé
```

L'import `messages` dans `i18n.ts` est la seule ligne à supprimer. C'est les 88 KB.

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

La commande détecte `vue-i18n`, installe `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` et `@intlayer/sync-json-plugin`, et pré-remplit `intlayer.config.ts`. Gardez `vue-i18n` installé : c'est une peer dependency et elle fournit les types.

</Step>
<Step number={2} title="Pointer Intlayer vers vos fichiers de locale">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" regroupe chaque locale ; "dynamic" charge celle active à la demande
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // dialecte vue-i18n : {name}, {0}, "voiture | voitures"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` reste à sa place. Chaque clé de haut niveau (`footer`, `hero`...) devient un dictionnaire.

</Step>
<Step number={3} title="Ajouter le plugin et supprimer l'importation des messages">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Avant : createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` enveloppe `vite-intlayer` (surveillance du contenu, compilation du dictionnaire, l'étape d'optimisation) et crée un alias de `vue-i18n` vers l'adaptateur. La suppression de l'importation `messages` est ce qui réduit les 88 KB ; la laisser conserve le fonctionnement de l'application mais expédie les deux.

</Step>
</Steps>

### Ce que vous pouvez supprimer par la suite

| Fichier / pattern                                | Pourquoi                                                                                 |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `import en from "./locales/en.json"` et consorts | Utilisé uniquement comme fallback par l'adaptateur. C'est là que venaient les 88 KB      |
| `setLocaleMessage()` dans les gardes de router   | Sans effet. Le chargement par route est maintenant le travail du compilateur             |
| `@intlify/unplugin-vue-i18n`                     | Non nécessaire : il précompile les messages et les blocs SFC que l'adaptateur ne lit pas |
| Blocs SFC `<i18n>`                               | Non lus ; déplacez-les vers le JSON des locales ou vers un `.content.ts` par composant   |

### Ce que vous gagnez au-delà des octets

- **Clés typées.** `t("footer.github")` est typé par rapport au dictionnaire `footer` compilé ; un mauvais chemin est une erreur TypeScript au lieu que la clé soit rendue comme texte.
- **`npx intlayer test`** échoue dans CI si une clé manque dans n'importe quelle locale. **`npx intlayer fill`** traduit les clés manquantes avec votre propre clé de fournisseur (OpenAI, Anthropic, Mistral, Gemini...) et les réécrit dans `locales/{locale}.json`.
- **Visual Editor et CMS** opèrent sur le même JSON, donc les non-développeurs éditent via une interface utilisateur et les fichiers se mettent à jour.
- **Passage progressif à `.content.ts`.** Tout composant peut passer de `useI18n()` à `useIntlayer("footer")` avec un fichier de contenu co-localisé. Les dictionnaires JSON et `.content.ts` coexistent et fusionnent.

## Limitations à connaître avant de commencer

<AccordionGroup>
<Accordion header="Les blocs SFC <i18n> ne sont pas lus">

Si vos messages se trouvent dans des composants, ils doivent être déplacés vers les fichiers de locale, ou vers un fichier `.content.ts`, ce qui est la même idée avec des types générés.

</Accordion>
<Accordion header="Le chargement de messages au runtime a disparu">

`setLocaleMessage()` et `mergeLocaleMessage()` affichent un avertissement et retournent. Les traductions récupérées depuis un CMS au runtime nécessitent le [CMS d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), ou les commandes `intlayer pull` / `push`.

</Accordion>
<Accordion header="messages est une solution de repli, pas gratuite">

Garder les imports JSON dans `createI18n()` conserve les 75 KB dans le bundle. Supprimez-les une fois que `intlayer test` réussit.

</Accordion>
<Accordion header="L'adaptateur n'est pas le runtime natif">

7.9 KB contre 3.9 KB pour `vue-intlayer`. Une fois que chaque composant est passé à `useIntlayer`, supprimez-le.

</Accordion>
</AccordionGroup>

## Quand utiliser quoi ?

<AccordionGroup>
<Accordion header="Rester sur vue-i18n">

Votre application dépend des blocs SFC `<i18n>`, des flux `setLocaleMessage()` au runtime, ou 90 KB par page n'est pas une préoccupation pour votre public.

</Accordion>
<Accordion header="Utiliser @intlayer/vue-i18n">

Vous utilisez `vue-i18n` et souhaitez économiser 88 KB, avoir des composants 23x plus petits, 0% de fuite de page, des clés typées et des vérifications CI sans modifier un seul fichier `.vue`. C'est le point d'entrée pour une codebase `vue-i18n` existante.

</Accordion>
<Accordion header="Passer en natif (vue-intlayer)">

Pour les nouveaux projets, ou une fois que l'adaptateur a fait son travail. Il possède le runtime le plus léger (3.9 KB) et le modèle `.content.ts` par composant qui remplace les blocs `<i18n>` par du contenu typé. Commencez avec [Intlayer avec Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md) ou [avec Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Dois-je modifier mes fichiers .vue ?">

Non. Le build de benchmark n'a modifié que `vite.config.ts`, `intlayer.config.ts` et une ligne dans `src/i18n.ts`, l'import de `messages`. Chaque appel à `useI18n()`, `$t`, `v-t` et l'Options API reste tel quel.

</Question>

<Question title="Pourquoi la taille des composants est-elle 23x plus petite ?">

Parce que `useI18n()` ne fait plus référence à l'instance globale. `createI18n({ messages })` contient tous les messages de chaque locale, donc un composant compilé isolément embarque 196 KB. Avec l'adaptateur, il n'accède qu'à son propre dictionnaire : 8.4 KB.

</Question>

<Question title="Qu'en est-il du formatage avec d() et n() ?">

Conservé. Les configurations `datetimeFormats` et `numberFormats` passées à `createI18n()` sont respectées, prises en charge par l'API native `Intl`. Consultez [formatage de dates, heures et nombres](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/date_time_number_formatting_locales.md).

</Question>

<Question title="Fonctionne-t-il avec Nuxt ?">

`@intlayer/vue-i18n` cible Vite + Vue. Pour `@nuxtjs/i18n`, utilisez l'[adaptateur de compatibilité Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/nuxtjs-i18n.md), et consultez [Intlayer avec Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md) pour l'installation native.

</Question>

<Question title="Puis-je migrer composant par composant ?">

Oui. N'importe quel composant peut passer de `useI18n()` à `useIntlayer("footer")` avec un fichier de contenu colocalisé. Les dictionnaires JSON et `.content.ts` coexistent et fusionnent.

</Question>

</FAQ>

## Comparaisons associées

Même série d'adaptateurs :

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-intl_vs_intlayer-next-intl.md)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer-lingui.md)

Les bibliothèques comparées directement :

- [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer.md), features et DX
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer_benchmark.md)
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_vue-i18n_outdated.md)
- [How to pick a Vue i18n library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_vue_i18n_library.md)

Documentation de référence :

- [Compat adapter: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/vue-i18n.md) and [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/nuxtjs-i18n.md)
- [Guide de migration : vue-i18n vers Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_vue-i18n_to_intlayer.md)
- [Rapport de benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md)
- [Optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et [le compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) et [traduction par IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md)

## Conclusion

`@intlayer/vue-i18n` change ce à quoi `useI18n()` est lié : d'une instance globale contenant chaque message de chaque locale à un dictionnaire compilé pour ce composant. Sur la même application Vite + Vue 3 qui est **88 KB moins lourde par page**, un **runtime 3x plus petit**, des **composants 23x plus petits** et **0% de fuite de page**, pour un fichier de configuration, une ligne de plugin et une importation supprimée. Les blocs SFC `<i18n>` et le chargement de messages au runtime sont les deux choses qu'il ne gère pas, et le runtime `vue-intlayer` natif reste moitié moins volumineux.

Toutes les données brutes, les applications de test et les scripts se trouvent dans le [référentiel Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Exécutez-le vous-même.

Reportez-vous à la [documentation 'Pourquoi Intlayer ?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) pour plus de détails.
