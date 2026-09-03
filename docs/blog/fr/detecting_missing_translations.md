---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Comment détecter les traductions manquantes avant vos utilisateurs"
description: Les traductions manquantes échouent en silence. Pourquoi le fallback les dissimule, les quatre niveaux de détection efficaces et comment bloquer un build sur une clé non traduite.
keywords:
  - trouver traductions manquantes
  - clés de traduction manquantes
  - audit i18n
  - chaînes non traduites
  - couverture de traduction
  - lint i18n
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Comment détecter les traductions manquantes avant vos utilisateurs

Une traduction manquante ne déclenche presque jamais d'erreur explicite. Selon votre configuration, elle affiche la chaîne anglaise à un utilisateur japonais, ou imprime `checkout.summary.total` sur une page en production. Dans les deux cas, le code est livré, passe la revue sans encombre, et le problème est découvert par un client plutôt que par vous.

## Table des matières

<TOC/>

## Cela s'applique quelle que soit votre bibliothèque

Rien ici n'est spécifique à une stack particulière. Les niveaux de détection décrits ci-dessous fonctionnent de manière identique sur i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate ou Lingui, car ils résolvent tous les clés et échouent selon la même logique.

L'outillage est tout aussi portable. Si vos messages sont aujourd'hui stockés dans des catalogues JSON, le [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) connecte Intlayer à ces fichiers, vous permettant d'utiliser les commandes d'audit, de remplissage et de test sans déplacer vos contenus ni modifier un seul import :

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // ou "icu" pour next-intl / react-intl
    }),
  ],
};

export default config;
```

Si vous souhaitez également conserver votre API runtime inchangée, les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) créent des alias pour `useTranslation`, `$t` et leurs équivalents au niveau du bundler. Quoi qu'il en soit, considérez les commandes ci-dessous comme une mise en œuvre concrète du principe, et non comme une obligation technique.

## Pourquoi les manques sont invisibles

Toutes les bibliothèques d'i18n résolvent une clé selon la même séquence : rechercher la locale active, se rabattre sur une locale par défaut, et si cela échoue, renvoyer la clé elle-même. C'est cette dernière étape qui pose problème. Il n'y a pas d'erreur, pas d'avertissement en production, et aucun test qui échoue, car rien dans le pipeline ne traite une clé manquante comme anormale.

Le mécanisme de fallback aggrave la situation au lieu de l'arranger. Une page qui s'affiche silencieusement en anglais semble tout à fait correcte à un développeur anglophone et à tous vos tests automatisés. Le bug n'est visible que pour la personne qui ne comprend pas le résultat.

La question n'est donc pas "comment gérer les traductions manquantes au runtime". Mais plutôt "comment rendre impossible le merge d'une traduction manquante".

## Les quatre niveaux où vous pouvez les intercepter

Chaque niveau intercepte des anomalies que les autres ne voient pas. Vous en voudrez plus d'un.

| Niveau         | Intercepte                                    | Ignore                                          |
| :------------- | :-------------------------------------------- | :---------------------------------------------- |
| Types          | Clés qui n'existent pas du tout               | Clé existante mais non traduite en `ja`         |
| Linter         | Chaînes brutes jamais envoyées en traduction  | Clés manquantes dans un catalogue               |
| Audit          | Couverture de locales sur chaque clé déclarée | Textes qui n'ont jamais été rendus traduisibles |
| Tests de rendu | Clés qui se résolvent mais s'affichent mal    | Tout ce qui n'est pas couvert par un test       |

La faille la plus fréquente réside dans la troisième ligne : les équipes savent que leurs clés sont valides, mais rien ne vérifie que les dix-huit locales disposent réellement d'une valeur.

## Niveau 1 : faire de la clé un type, pas une simple chaîne

`t("checkout.summry.total")` est une faute de frappe qui compile parfaitement. Si vos clés sont de simples chaînes, chaque renommage devient un risque en production et chaque suppression laisse une clé orpheline.

Les clés typées transforment cela en erreur de build. `react-i18next` le propose via le declaration merging, `next-intl` l'infère à partir de vos structures de messages, Lingui génère des identifiants à partir du texte source, et Intlayer génère des types stricts à partir des déclarations de contenu. Tous fonctionnent ; ce qui varie est l'effort de configuration nécessaire.

Ce niveau est nécessaire mais insuffisant. Les types décrivent la forme de votre catalogue par défaut. Ils ne garantissent en rien que le coréen contienne une valeur pour cette clé.

## Niveau 2 : linter les chaînes qui ne sont jamais devenues des clés

La traduction introuvable est souvent celle qui n'a jamais été externalisée. Un libellé codé en dur dans un composant échappe à tout audit de catalogue, car pour l'outillage, il n'existe pas.

Le plugin ESLint d'Intlayer résout cela avec `no-raw-text`, complété par `no-unused-content` pour le problème inverse : le contenu déclaré mais qui n'est plus appelé nulle part.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` empêche les catalogues de grossir indéfiniment. Les clés mortes ne cassent pas le code, mais elles gonflent inutilement la facture de vos prestataires de traduction. Retrouvez la liste complète des règles dans la [documentation du plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md).

## Niveau 3 : auditer la couverture des locales

C'est ce niveau qui répond à la question fondamentale. Intlayer le fournit sous la forme d'une commande CLI :

```bash packageManager="npm"
npx intlayer content test
```

Elle inspecte vos locales configurées et vos dictionnaires déclarés, puis indique quelles clés manquent dans quelles locales, et dans quel fichier.

Un détail important avant d'intégrer cette commande n'importe où : **la CLI affiche un rapport mais ne renvoie pas de code d'erreur différent de zéro.** Si vous l'ajoutez dans un pipeline en attendant qu'elle bloque le build, vous obtiendrez un build vert avec un pavé de texte que personne ne lira. Pour bloquer le build, utilisez l'API programmatique décrite ci-dessous.

## Niveau 4 : tester par assertion dans la suite de tests

`listMissingTranslations()` vous donne le même audit sous forme de données, ce qui correspond exactement à ce dont vous avez besoin pour un gate de build.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("traductions", () => {
  it("ne présente aucune locale requise manquante", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Trois champs sont renvoyés, et la distinction est fondamentale :

- `missingTranslations` : par clé, quelles locales manquent et dans quel fichier. C'est ce que vous affichez en console si le test échoue.
- `missingLocales` : l'union de toutes les locales manquantes à travers l'ensemble des clés.
- `missingRequiredLocales` : restreint aux `requiredLocales` de votre configuration, ou à toutes les locales si vous n'avez pas défini cette option.

## Les locales obligatoires sont le levier indispensable

Livrer dix-huit langues ne signifie pas qu'elles doivent toutes être complètes à 100% pour pouvoir déployer. La plupart des équipes distinguent un groupe qui bloque la release et un groupe fourni au fil de l'eau.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Sans `requiredLocales`, chaque locale déclarée est requise par défaut et votre build reste rouge jusqu'à ce que la dernière langue soit livrée. C'est la raison pour laquelle les équipes finissent par désactiver la vérification, ce qui est pire que de ne pas en avoir.

## Dépister les manques déjà en production

Les niveaux ci-dessus empêchent les nouveaux manques d'apparaître. Pour une application déjà en ligne, deux approches sont efficaces.

**La pseudolocalisation.** Utilisez une fausse locale où chaque chaîne est modifiée, par exemple `[!!! Ĉĥéçķöũţ !!!]`. Tout ce qui s'affiche en anglais standard est écrit en dur. Elle permet de trouver en dix minutes ce qu'un audit de catalogue est structurellement incapable de voir, car elle teste le rendu réel et non les fichiers de données.

**Crawler votre propre site.** Si vous utilisez des URL localisées, téléchargez un échantillon de pages par locale et cherchez dans le code HTML les chaînes de votre langue par défaut. Une page dans `/ja/` contenant "Add to cart" est soit une traduction manquante, soit un fallback inattendu.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Remplir les manques

Une fois les manques identifiés, `intlayer fill` complète les entrées vides, et l'option `autoFill` peut générer les fichiers par locale au moment où le contenu est déclaré. Voir [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md).

Soyons lucides : les traductions complétées par machine transforment un manque _visible_ en un manque _invisible_. La clé a désormais une valeur, l'audit passe au vert, et personne n'a relu le résultat. Servez-vous-en pour débloquer une livraison, puis confiez la relecture à un humain pour tout ce qu'un utilisateur lit avant de prendre une décision. C'est un échafaudage, pas une fin en soi.

## Erreurs courantes

- **Considérer le fallback comme une fonctionnalité de sécurité.** C'est une stratégie de rendu de secours, pas un filet protecteur. Une page en anglais silencieuse est un bug que personne ne signale.
- **Compter sur le rapport CLI pour bloquer la CI.** `intlayer content test` renvoie toujours un code zéro. Utilisez une assertion dans un test.
- **Rendre toutes les locales obligatoires.** Le contrôle saute à la première livraison bloquée par une langue à moitié traduite.
- **Auditer les catalogues mais jamais la page rendue.** Les chaînes en dur sont par définition invisibles dans un catalogue.
- **Ne tester que la locale par défaut.** C'est la seule langue qui ne risque jamais d'être manquante.
- **Laisser l'auto-complétion machine clore le processus.** Audit au vert mais textes jamais relus.

## Pour aller plus loin

- [Tester son contenu : audit CLI, API programmatique et assertions UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md)
- [Règles du plugin ESLint, dont `no-raw-text` et `no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)
- [autoFill : génération de fichiers de déclaration par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md)
- [Référence de configuration : `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Rapports de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md)
- [Adaptateur de compatibilité i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18next.md)
- [Ce que couvre réellement l'internationalisation](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/what_is_internationalization.md)
- [i18n par composant vs i18n centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md)
