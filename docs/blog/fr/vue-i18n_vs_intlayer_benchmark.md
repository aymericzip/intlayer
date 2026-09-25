---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer : Benchmark 2026"
description: vue-i18n et Intlayer mesurés sur la même app Vite + Vue 3. Taille de la librairie, JavaScript par page, fuite de contenu, taille des composants et réactivité du changement de locale, avec les chiffres expliqués.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Benchmark d'internationalisation Vue (i18n)

`vue-i18n` est la librairie i18n de référence pour Vue. Intlayer est une alternative basée sur un compilateur, à contenu scopé par composant, avec une intégration Vue (`vue-intlayer`). Nous avons déjà comparé leurs [fonctionnalités et leur expérience développeur](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer.md). Cet article regarde ce que chacune coûte une fois l'application construite.

Les données viennent de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), une suite open-source qui construit la même application avec chaque librairie et enregistre ce que le navigateur télécharge et exécute réellement.

<TOC/>

> **tl;dr** : Sur la même app Vite + Vue 3, `vue-i18n` livre **134,9 KB** de JavaScript gzippé par page contre **41,3 KB** pour l'app sans i18n. Intlayer livre **57,1 KB**. Le runtime de `vue-i18n` pèse à lui seul **24,3 KB gzip** (6x les 3,9 KB d'Intlayer), chaque page embarque **90 % des chaînes des autres pages**, et un composant compilé isolément entraîne **196 KB** parce qu'il est lié à l'arbre global de messages. L'adaptateur `@intlayer/vue-i18n` conserve l'API de `vue-i18n` et a mesuré **47,0 KB** par page.

## En bref

- **vue-i18n** - La librairie i18n de facto pour Vue 2 / Vue 3 et le cœur de `@nuxtjs/i18n`. Messages de style ICU, blocs `<i18n>` dans les SFC, directive `v-t`, formateurs `d()` / `n()`, large écosystème. Les messages sont enregistrés sur une instance globale au `createI18n()` ; le chargement paresseux par locale est un pattern `setLocaleMessage()` manuel, et le découpage par route est à construire vous-même.
- **Intlayer** - Modèle de contenu centré sur les composants. Les dictionnaires `.content.ts` sont placés à côté du composant qu'ils servent, un compilateur au build (`vite-intlayer`) les tree-shake et les charge paresseusement par composant et par locale, des types TypeScript stricts sont générés depuis votre contenu, et les traductions manquantes échouent au build. Fournit des helpers routeur / SEO, un Visual Editor / CMS et une traduction assistée par IA.

| Librairie             | Étoiles GitHub                                                                                                                                                                 | Commits totaux                                                                                                                                                                     | Dernier commit                                                                                                                                      | Première version | Version NPM                                                                                                 | Téléchargements NPM                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Avril 2024       | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Déc. 2016        | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Les badges se mettent à jour automatiquement. Les instantanés varieront avec le temps.

## Comparaison des fonctionnalités côte à côte

| Fonctionnalité                                      | `vue-intlayer` (Intlayer)                                   | `vue-i18n`                                                                              |
| --------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Traductions près des composants**                 | ✅ Oui, `.content.ts` colocalisé avec chaque composant      | ✅ Via les blocs SFC `<i18n>` (optionnel) ; les catalogues globaux sont l'usage courant |
| **Intégration TypeScript**                          | ✅ Types stricts auto-générés depuis le contenu             | ✅ Bons typages ; la sûreté stricte des clés demande un schéma typé et de la discipline |
| **Détection des traductions manquantes**            | ✅ Erreur TypeScript + erreur/avertissement au build        | ⚠️ Fallback au runtime + avertissement console                                          |
| **Contenu riche (composants / Markdown)**           | ✅ Support direct                                           | ⚠️ Interpolation de composants `<i18n-t>` ; Markdown via plugins externes               |
| **Support ICU**                                     | ⚠️ En cours                                                 | ✅ Oui                                                                                  |
| **Formatage (dates, nombres, devises)**             | ✅ Formateurs basés sur Intl                                | ✅ `d()` / `n()` avec `datetimeFormats` / `numberFormats`                               |
| **Routage localisé**                                | ✅ Helpers pour Vue Router / Nuxt, `getMultilingualUrls`    | ⚠️ Pas dans le cœur (`@nuxtjs/i18n` ou configuration routeur personnalisée)             |
| **Helpers SEO (hreflang, sitemap, robots)**         | ✅ Helpers intégrés                                         | ❌ Pas dans le cœur                                                                     |
| **Tree-shaking (ne livrer que le contenu utilisé)** | ✅ Par composant, par locale, automatisé par le compilateur | ⚠️ Manuel : découper les catalogues, `setLocaleMessage()` par route                     |
| **Chargement paresseux**                            | ✅ `importMode: 'dynamic'` (une ligne de config)            | ✅ `import()` manuel + `setLocaleMessage()`                                             |
| **Purge du contenu inutilisé**                      | ✅ Les dictionnaires morts sont retirés au build            | ❌ Pas intégré                                                                          |
| **Test des traductions manquantes (CLI / CI)**      | ✅ `npx intlayer content test`                              | ⚠️ Tiers (`vue-i18n-extract`)                                                           |
| **Traduction par IA**                               | ✅ Intégrée, utilise vos propres clés de fournisseur        | ❌ Non                                                                                  |
| **Visual Editor / CMS**                             | ✅ Visual Editor gratuit + CMS optionnel                    | ❌ Non (plateformes de localisation externes)                                           |
| **Serveur MCP & Agent Skills**                      | ✅ Oui                                                      | ❌ Non                                                                                  |
| **Écosystème / communauté**                         | ⚠️ Plus petit mais en forte croissance                      | ✅ Large et mature dans l'écosystème Vue                                                |

## Le benchmark

### Ce qui a été mesuré

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construit **la même application Vite + Vue 3** avec chaque librairie : **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), composants identiques et contenu identique. Les pages sont mesurées en `en` et `fr`.

Les deux librairies ont été testées dans la configuration **static**, celle que la plupart des projets Vue livrent : pour `vue-i18n`, le JSON de chaque locale importé et passé à `createI18n({ messages })` ; pour Intlayer, le `importMode: 'static'` par défaut. Dans ce mode Intlayer embarque aussi toutes les locales, mais le compilateur scope toujours le contenu **par composant**, donc une page n'embarque que les dictionnaires des composants qu'elle rend.

Pour chaque build, la suite enregistre :

- **Lib size** : taille gzip d'un composant vide qui importe seulement la librairie i18n. Le coût fixe du runtime.
- **Page JS** : JavaScript gzip téléchargé par page, moyenné sur toutes les pages et locales.
- **Locale leak %** : part des chaînes traduites trouvées dans le JS téléchargé qui appartiennent à une locale que l'utilisateur **ne** consulte **pas** (empreintes sur `en` et `fr`, donc 50 % signifie « l'autre locale mesurée est entièrement présente » ; avec 10 locales embarquées, le gaspillage réel est plus élevé).
- **Page leak %** : part des chaînes traduites trouvées dans le JS téléchargé qui appartiennent à une page sur laquelle l'utilisateur **n'est pas**.
- **Component avg** : taille gzip moyenne de chaque composant compilé isolément. Montre combien de runtime i18n et de catalogue un seul composant entraîne.
- **E2E reactivity** : temps réel entre la sélection d'une nouvelle locale et la mise à jour de `html[lang]` dans le DOM (Playwright, 5 itérations).
- **Page load** : `PerformanceNavigationTiming.duration`.

> Les chiffres ci-dessous viennent du run daté du **2026-09-12** avec `vue-i18n` 11.4.0 et `intlayer` 9.5.0 / 9.5.1. L'application de test est volontairement petite (quelques dizaines de chaînes par locale), donc les pourcentages de fuite décrivent un **pattern** : ils grandissent avec votre contenu alors que le coût du runtime reste fixe.

### Résultats sur Vite + Vue 3

| Librairie                     | Stratégie | Lib size (gz) | Lib size (min) | Page JS moy. (gz) | Locale leak | Page leak | Component moy. (gz) | Réactivité E2E | Page load |
| ----------------------------- | --------- | ------------: | -------------: | ----------------: | ----------: | --------: | ------------------: | -------------: | --------: |
| **base** (sans i18n)          | -         |        0,0 KB |         0,0 KB |           41,3 KB |       0,0 % |         - |              1,1 KB |         1,8 ms |   10,8 ms |
| `vue-i18n`                    | static    |       24,3 KB |        83,2 KB |          134,9 KB |      50,0 % |    90,0 % |            196,0 KB |         2,8 ms |   13,6 ms |
| **`vue-intlayer`**            | static    |    **3,9 KB** |    **11,1 KB** |       **57,1 KB** |      56,8 % | **0,0 %** |          **7,7 KB** |     **4,5 ms** |   13,8 ms |
| `@intlayer/vue-i18n` (compat) | static    |        7,9 KB |        23,2 KB |           47,0 KB |      15,0 % |     0,0 % |              8,4 KB |         1,5 ms |    9,3 ms |

> La colonne page-leak de l'app de base est laissée vide : sans librairie i18n, l'empreinte capte des chaînes codées en dur dans les chunks partagés et le chiffre n'a pas de sens.

**Comment le lire**

- **Coût du runtime.** `vue-i18n` est l'un des runtimes les plus lourds de tout le benchmark : **24,3 KB gzip / 83,2 KB minifié** pour un composant vide qui l'importe seulement. `vue-intlayer` coûte 3,9 KB gzip. Cet écart est payé sur chaque page, quel que soit le nombre de chaînes.
- **JavaScript par page.** L'app sans i18n pèse 41,3 KB. `vue-i18n` fait plus que la tripler à **134,9 KB** ; Intlayer atterrit à **57,1 KB**, +15,8 KB, dont l'essentiel vient des dix locales embarquées (voir le point suivant).
- **Fuite.** Avec `createI18n({ messages: { en, fr, ... } })`, chaque page livre toutes les locales et les chaînes de toutes les pages : **50 % de fuite de locale** (sur les deux locales mesurées) et **90 % de fuite de page**. Le mode `static` d'Intlayer embarque aussi toutes les locales (d'où un chiffre de fuite de locale comparable) mais a **0 % de fuite de page** : une page ne tire que les dictionnaires des composants qu'elle rend. Passer à `importMode: 'dynamic'` supprime aussi la fuite de locale ; cette configuration ne faisait pas partie de ce run Vue.
- **La taille des composants est là où l'architecture se voit.** Un composant appelant `useI18n()` compile à **196 KB** en moyenne, parce que `t()` est lié à l'instance globale qui contient tous les messages de toutes les locales. Le même composant avec `useIntlayer()` compile à **7,7 KB** : il n'atteint que son propre dictionnaire.
- **La réactivité** n'est un problème pour aucun des deux (2-5 ms). Le système de réactivité de Vue rend le changement de locale peu coûteux une fois les messages en mémoire.
- **`@intlayer/vue-i18n`**, l'adaptateur drop-in, conserve l'API de `vue-i18n` et a mesuré **47,0 KB par page** et **8,4 KB par composant**, sans toucher au code de l'application.

> Pour référence, le même run a mesuré `fluent-vue` à 171,8 KB par page, 29,7 KB de runtime et 217 KB par composant.

## Pourquoi cet écart ? Instance globale vs dictionnaires compilés

`vue-i18n` est un runtime. `createI18n()` construit une instance globale contenant un arbre de messages par locale ; `useI18n()` lie chaque composant à celle-ci ; `t("footer.github")` cherche la clé au moment du rendu. C'est ce qui rend possibles les blocs SFC `<i18n>`, `v-t` et le chargement de messages au runtime, et c'est aussi pourquoi le graphe de dépendances de chaque composant inclut l'arbre entier :

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # un fichier par locale, toutes les pages dedans
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Optimiser signifie que **vous** découpez `en.json` en fichiers par route, que **vous** appelez `setLocaleMessage()` dans un guard du routeur, et que **vous** maintenez la correspondance route → fichier à jour quand les composants bougent. Le runtime ne peut pas le faire pour vous parce qu'il n'a aucune idée des clés qu'un composant va demander.

Intlayer déplace cette connaissance vers le build. Le contenu est déclaré à côté du composant, et `vite-intlayer` résout quel composant importe quel dictionnaire :

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

Le compilateur émet, par dictionnaire et par locale, exactement le JSON dont ce composant a besoin, et supprime les dictionnaires que rien n'importe. Le scoping par route est une conséquence du scoping par composant, pas une tâche.

> Pour retirer aussi les locales inutilisées, mettez `dictionary.importMode: 'dynamic'` dans `intlayer.config.ts`. Voir la [doc d'optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md).

## Expérience développeur

### Configuration

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

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

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Composant

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` est une chaîne tant que vous ne typez pas vous-même le schéma des messages ; une faute de frappe affiche la clé.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
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

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` et `increment` sont typés ; une faute de frappe est une erreur TypeScript, une valeur française manquante est une erreur de build.

### Chargement paresseux par locale

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Ensuite appelez `loadLocaleMessages()` depuis un guard du routeur, et découpez vous-même `locales/{locale}.json` par route si vous voulez un scoping par page.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Gardez l'API de vue-i18n, obtenez la sortie d'Intlayer

`@intlayer/vue-i18n` est un adaptateur drop-in : `useI18n()`, `t()`, `d()`, `n()`, l'interpolation `{name}` et `{0}`, les pluriels à pipe (`"car | cars"`), `v-t` et `i18n.global.locale` continuent de fonctionner, servis depuis des dictionnaires Intlayer compilés par `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

Dans le benchmark, le build compat de la même app est passé de **134,9 KB à 47,0 KB** par page et de **196 KB à 8,4 KB** par composant, sans toucher aux composants. Vos `locales/{locale}.json` existants peuvent rester la source de vérité grâce au plugin de synchronisation JSON.

Voir le [guide de migration vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_vue-i18n_to_intlayer.md) et la [doc de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/vue-i18n.md). Les utilisateurs de Nuxt ont le même chemin via la [compatibilité `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/nuxtjs-i18n.md).

## Quand choisir lequel ?

- **Choisissez vue-i18n** si vous voulez l'approche Vue standard, si vous dépendez des messages ICU ou des blocs SFC `<i18n>`, si vous utilisez déjà `@nuxtjs/i18n`, ou si une plateforme de traduction attend du JSON centralisé. Prévoyez le temps de découper les catalogues et de charger paresseusement par route si la taille du bundle compte.
- **Choisissez Intlayer** si vous voulez du **contenu scopé par composant**, du **TypeScript strict**, des **erreurs de clés manquantes au build**, du **tree-shaking et du chargement paresseux sans effort**, et un outillage éditorial intégré (Visual Editor, CMS, traduction IA, serveur MCP). Particulièrement pertinent pour les grandes bases de code Vue / Nuxt modulaires et les design systems.
- **Choisissez `@intlayer/vue-i18n`** si vous êtes déjà sur `vue-i18n` et voulez les gains de bundle sans réécriture.

## Comparaisons associées

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-intl_vs_intlayer.md) (même benchmark)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18next_vs_intlayer.md) (même benchmark)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer.md) (même benchmark)
- [vue-i18n vs Intlayer (fonctionnalités & DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer.md)
- [vue-i18n est-il dépassé ?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_vue-i18n_outdated.md)

## Étoiles GitHub

Les étoiles GitHub sont un indicateur fort de la popularité d'un projet, de la confiance de la communauté et de sa pertinence à long terme. Bien qu'elles ne mesurent pas directement la qualité technique, elles reflètent combien de développeurs trouvent le projet utile, suivent ses progrès et sont susceptibles de l'adopter.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusion

`vue-i18n` est mature, flexible et profondément intégré à Vue. Le benchmark montre ce que son design centré sur le runtime coûte sur un build Vite : un **runtime de 24 KB gzip**, **134,9 KB par page** pour une app qui pèse 41 KB sans i18n, **90 % de contenu d'autres pages** sur chaque page, et des composants qui atteignent chacun **196 KB** parce qu'ils dépendent de l'arbre global de messages.

Intlayer déplace le travail dans le compilateur. Les dictionnaires par composant et la purge du contenu mort sont des sorties du build, pas des conventions. Sur la même app : **3,9 KB de runtime**, **57,1 KB par page**, **0 % de fuite de page**, des composants **25x plus petits**. Et si une réécriture n'est pas envisageable, `@intlayer/vue-i18n` fait l'essentiel du chemin sans toucher aux composants.

Toutes les données brutes, les apps de test et les scripts sont dans le [dépôt Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Lancez-le vous-même.

Consultez la [doc « Pourquoi Intlayer ? »](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) pour plus de détails.
