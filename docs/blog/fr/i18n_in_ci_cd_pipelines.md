---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Automatiser les traductions dans la CI/CD sans livrer de mauvais textes"
description: Trois points d'automatisation i18n, pre-push, pull request et runtime. Comment bloquer un build sur la couverture, auto-compléter en sécurité et éviter la boucle infinie de commits.
keywords:
  - automatiser traductions ci
  - i18n ci cd
  - github actions traductions
  - husky pre-push
  - localisation continue
  - pipeline de traduction
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Automatiser les traductions dans la CI/CD sans livrer de mauvais textes

La traduction manuelle ne résiste pas au rythme des déploiements modernes. Un développeur ajoute une chaîne le vendredi, l'export n'a lieu qu'au sprint suivant, et trois autres langues accumulent déjà du retard. L'automatiser est facile. L'automatiser sans publier silencieusement du contenu brut généré par machine auprès de vos utilisateurs est la vraie question à résoudre.

## Table des matières

<TOC/>

## Nul besoin de migrer pour automatiser

Les pipelines décrits ci-dessous sont indépendants de la bibliothèque utilisée, tout comme l'outillage. Si vos textes sont des catalogues JSON pour i18next, next-intl, react-intl, vue-i18n ou next-translate, le [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) lit et écrit ces fichiers directement sur place :

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

Votre application continue d'importer ce qu'elle importe déjà. Les jobs CI complètent et valident alors vos catalogues existants, et le diff affiché au relecteur est simplement une mise à jour de `locales/fr/checkout.json`, et non une migration d'architecture. Il existe aussi un [plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) pour les flux gettext, ainsi que des [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) pour conserver votre API runtime actuelle.

## Séparer le contrôle de garde (gate) du remplissage (fill)

Deux rôles différents sont trop souvent confondus.

Un **gate** est une vérification bloquante. Il décrète qu'une version ne doit pas être livrée car des locales obligatoires sont incomplètes. Il n'écrit aucun fichier.

Un **fill** est une opération de mutation. Il génère les traductions manquantes et les commite. Il ne fait jamais échouer un build.

Ne faire qu'un fill signifie que rien ne bloque jamais, et que des traductions automatiques non vérifiées partent directement en production. Ne faire qu'un gate signifie que le build devient rouge et qu'un humain doit intervenir pour débloquer la situation à chaque fois. La plupart des équipes souhaitent les deux, associés à des déclencheurs distincts : fill sur une pull request, gate lors du merge sur la branche de release.

## Où positionner l'automatisation

| Étape          | Déclencheur | Idéal pour                                 | Coût                                          |
| :------------- | :---------- | :----------------------------------------- | :-------------------------------------------- |
| Hook pre-push  | Git local   | Retour rapide, aucune minute CI consommée  | S'exécute sur la machine et la clé API du dév |
| Pull request   | Job CI      | Relecture avant merge, centralisation clés | Minutes CI plus appels de modèle par PR       |
| Release branch | Job CI      | Blocage strict sur la couverture           | Économique, aucun appel de modèle             |
| Runtime        | CMS         | Modifications de contenu sans rebuild      | Dépendance hébergée                           |

## Pre-push : la boucle la plus rapide

Husky exécute le remplissage avant que le code ne quitte la machine, afin que les traductions arrivent dans le même push que les chaînes nouvellement introduites.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` restreint le traitement au contenu non encore poussé, évitant que la commande ne prenne une minute à chaque envoi. `--mode complete` remplit uniquement ce qui manque sans réécrire les entrées qui ont déjà une valeur, garantissant qu'une traduction relue ne soit jamais écrasée.

Dans un monorepo, ciblez chaque application :

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

L'inconvénient est réel : chaque développeur a besoin d'une clé API, et le coût incombe à celui qui push. C'est pourquoi la plupart des équipes déplacent cette étape dans la CI dès qu'elles grandissent.

## Pull request : générer là où se fait la relecture

Le même processus dans GitHub Actions, ciblé sur le diff :

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Quatre points clés sont déterminants ici :

- **`fetch-depth: 0`** est indispensable pour que `--git-diff` fonctionne. Un clone superficiel ne dispose pas de base pour calculer le diff, et le remplissage ne traite silencieusement rien.
- **`[skip ci]` dans le message de commit** empêche le workflow de se redéclencher indéfiniment. Sans cela, le commit lance une exécution qui commite à nouveau, la manière la plus rapide de brûler son forfait CI en une nuit.
- **`concurrency` avec `cancel-in-progress`** évite que deux push concurrents n'écrivent dans les mêmes fichiers en même temps.
- **`--git-diff`** restreint la génération aux modifications de la PR. Omettez-le et vous retraduirez tout le catalogue à chaque passage.

Les traductions sont ajoutées sous forme de commit sur la branche de la PR, ce qui permet au relecteur de voir le diff. C'est l'intérêt majeur de le faire ici plutôt qu'après le merge.

## Branche de release : le contrôle bloquant (gate)

Le gate n'a besoin d'aucun modèle et doit être rapide.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Appuyé par un test qui valide la couverture par assertion plutôt que par un simple rapport en console :

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("n'a aucune locale obligatoire manquante", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` affiche un rapport mais se termine avec un code de retour 0, ce qui informe sans bloquer. Utilisez-le en local ; utilisez l'assertion en CI. Plus de précisions dans [détecter les traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md).

## `requiredLocales` rend le gate viable au quotidien

Un contrôle exigeant les dix-huit langues complètes bloque chaque release jusqu'à l'arrivée de la dernière traduction, et finit par être désactivé en moins d'un mois.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Déclarez les langues que vous servez, et n'exigez en bloquant que celles indispensables à la release. Le reste se complète de façon asynchrone sans jamais freiner les déploiements.

## Déporter les traductions hors du dépôt

L'autre stratégie consiste à déclarer une locale dans le code et à gérer le reste à distance via le CMS avec Live Sync. Les modifications de contenu ne requièrent plus aucun rebuild, séparant le rythme éditorial du cycle de déploiement technique.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Ce mode convient particulièrement aux équipes où des contributeurs non-techniques gèrent les textes. Il s'agit d'un compromis : vous gagnez en autonomie éditoriale et perdez la propriété où un checkout Git reflète à lui seul l'état exact de l'application. Consultez la [documentation du CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

Notez que `clientSecret` est un identifiant sensible côté serveur. Il doit rester dans les secrets CI et vos variables d'environnement de serveur, jamais dans un bundle client.

## Les limites réelles

Tout ce qui précède automatise la _couverture_, pas la _qualité_. Une génération automatique transforme une absence visible en un texte présent mais non relu : l'audit devient vert et personne n'a validé le sens.

C'est acceptable pour un outil interne, un changelog ou une locale en bêta. Cela ne l'est pas pour une page de tarification, des mentions légales ou des messages d'erreur de paiement. Pour ces éléments critiques, passez par une relecture humaine et utilisez `--mode complete` afin d'éviter qu'une chaîne validée ne soit écrasée par la suite.

Fournissez du contexte au modèle pour assurer une cohérence :

```ts
ai: {
  applicationContext: "Application de facturation B2B. Ton professionnel. Ne jamais traduire le nom du produit.",
}
```

## Erreurs courantes

- **Oublier `[skip ci]` sur l'auto-commit.** Le job boucle indéfiniment sur lui-même.
- **Clone superficiel avec `--git-diff`.** Pas de base pour comparer, rien n'est rempli sans qu'aucune alerte n'apparaisse.
- **Remplir tout le catalogue à chaque run.** Spécifiez `--git-diff` ou `--unpushed` pour maîtriser les coûts.
- **Utiliser le rapport CLI comme gate.** Le code de retour est 0.
- **Rendre chaque locale obligatoire.** Le check est désactivé dès la première livraison bloquée.
- **Un job de fill sans aucun gate.** Rien n'échoue jamais, et des textes non révisés partent en production.
- **Mettre des clés API de modèle dans le repo.** Elles doivent résider dans les secrets CI, comme `clientSecret`.

## Pour aller plus loin

- [CI/CD : auto-génération de traductions avec Husky, GitHub Actions et le CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md)
- [Tester son contenu et bloquer un build sur la couverture](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md)
- [autoFill : génération de fichiers de déclaration par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md)
- [Référence de configuration : `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Rapports de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md)
- [Adaptateur de compatibilité i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18next.md)
- [Comment détecter les traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md)
- [Comment tester les traductions sans tests fragiles](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_testing_strategies.md)
