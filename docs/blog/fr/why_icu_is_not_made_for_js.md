---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Pourquoi ICU MessageFormat n'est pas fait pour JavaScript
description: "ICU MessageFormat a été conçu pour Java et C++. Dans le navigateur, une prise en charge complète embarque environ 10 Ko de code de parseur. Découvrez d'où vient ce coût et les alternatives possibles."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - taille de bundle icu
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - pluralisation i18n
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Pourquoi ICU MessageFormat n'est pas fait pour JavaScript

ICU MessageFormat est un standard solide. Il est exhaustif, les traducteurs le connaissent bien et la plupart des systèmes de gestion de traduction (TMS) savent le lire. Le problème réside dans l'environnement d'exécution pour lequel il a été conçu. ICU provient du C++ et de Java, des écosystèmes où un parseur et un formateur complets représentent un coût dérisoire face au reste de l'application. Dans le bundle d'un navigateur, ce coût est payé à chaque chargement de page.

Cet article analyse l'origine d'ICU, explique pourquoi sa syntaxe s'avère lourde pour les pluriels et montre pourquoi une compatibilité intégrale alourdit toute bibliothèque i18n JavaScript. Si vous recherchez directement la syntaxe, consultez d'abord la [référence ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/icu_message_format.md).

- [Référence ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/icu_message_format.md)

<TOC/>

## D'IBM au Consortium Unicode

ICU signifie _International Components for Unicode_. Sa syntaxe de messages est née avec Java : Taligent, une coentreprise réunissant Apple et IBM, a conçu les classes d'internationalisation du JDK 1.1 (1997), notamment `java.text.MessageFormat`. IBM a poursuivi leur développement sous le nom d'ICU4J, les a portées en C/C++ sous l'appellation ICU4C, puis a ouvert le code du projet en 1999. En 2016, ICU est passé sous la gouvernance du Consortium Unicode, qui maintient également CLDR, le référentiel de données linguistiques dont il dépend.

### Cas d'usage d'origine

Le public cible initial était constitué des logiciels pour serveurs et postes de travail : applications d'entreprise Java, produits IBM et, plus tard, systèmes d'exploitation. Les messages étaient stockés dans des fichiers `.properties` Java chargés par `ResourceBundle`, ou dans le format propre de paquets de ressources d'ICU pour le C/C++ :

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

La version originelle du JDK ne gérait pas le mot-clé `plural`. Elle utilisait `choice`, reposant sur des plages numériques (`{0,choice,0#no files|1#one file|1<{0} files}`), ce qui ne convenait qu'aux langues dont les pluriels fonctionnent comme en anglais. ICU a introduit `plural` basé sur les règles CLDR en 2008 (ICU 4.0), puis `select` en 2010 (ICU 4.4).

### La différence avec `.po`

On confond souvent ICU avec gettext, mais ces deux approches relèvent de traditions distinctes. Les fichiers `.po` proviennent de GNU gettext (C, Linux, puis PHP et Python). Une entrée `.po` contient de simples paires `msgid` / `msgstr`, et les pluriels sont choisis via une expression C déclarée dans l'en-tête du fichier (`Plural-Forms: nplurals=2; plural=(n > 1);`). Il n'y a aucun embranchement à l'intérieur du message. À l'inverse, ICU intègre ces embranchements directement au cœur de la chaîne de caractères, ce qui permet à un seul message de combiner `plural`, `select` et mise en forme de nombres.

### Où s'exécute ICU aujourd'hui

ICU4C est embarqué nativement dans Android, iOS, macOS, Windows, Node.js et les moteurs JavaScript de Chrome et Firefox. Les API `Intl` du navigateur reposent en grande partie sur cette base. Le navigateur intègre donc déjà les règles de pluriels et de formatage de dates ou de nombres d'ICU. Ce qu'il ne contient pas, en revanche, c'est le parseur de messages : `Intl.MessageFormat` est encore une proposition TC39 en phase initiale, articulée autour de la nouvelle syntaxe MessageFormat 2 et non rétrocompatible avec ICU MessageFormat 1.

Cette chronologie historique éclaire sa conception :

- **Il cible des environnements serveur et desktop.** Dans ces contextes, parser une chaîne de caractères au runtime a un impact négligeable, et la bibliothèque est installée une fois pour toutes sur le système plutôt que téléchargée par chaque internaute.
- **Il constitue un DSL imbriqué dans une chaîne.** Embranchements, mise en forme numérique, dates et hiérarchies vivent au sein d'une même syntaxe qu'un traducteur peut éditer sans manipuler de code.
- **Il vise l'exhaustivité.** Chaque subtilité grammaticale utile à un traducteur dispose d'un opérateur dédié.

Aucun de ces choix n'est une erreur en soi. Ils supposaient simplement un environnement qui n'est pas celui du navigateur web.

## Des pluriels verbeux

Le mécanisme ICU le plus courant est également le plus verbeux. Un décompte incluant un cas zéro s'écrit de la façon suivante :

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

On observe le nom de l'argument, le mot-clé `plural`, une étiquette par branche, des accolades imbriquées et le symbole `#`, qui agit comme un token réservé aux blocs de pluriel. Ajoutez un sujet soumis au genre et le message démultiplie ses niveaux :

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Neuf des quinze lignes ne servent qu'à la structure syntaxique. Le polonais nécessitant quatre branches de pluriel pour chacune de ces trois branches de genre, la chaîne traduite devient un bloc dense d'accolades où une seule accolade fermante manquante corrompt l'ensemble du message, souvent uniquement au runtime.

En JavaScript, cette même structure peut s'exprimer directement sous forme de données brutes : un objet dont les clés sont des catégories de pluriel, validé par le système de types et l'éditeur de code, sans aucun parseur intermédiaire entre le fichier et la valeur finale.

## Exhaustif, et c'est bien là le coût

ICU gère de nombreux aspects :

- `plural` avec correspondances exactes (`=0`) et décalages (`offset:`)
- `selectordinal`, avec sa table ordinale CLDR dédiée
- `select`, imbricable sans limite de profondeur
- Arguments `number`, `date` et `time`, avec les formats historiques (`number, currency`) ou les skeletons (`::currency/EUR compact-short`)
- Règles d'échappement et de guillemets (`'{'`, `''`)
- Balises rich-text dans certaines implémentations (`<b>…</b>`)

Une bibliothèque revendiquant une compatibilité ICU intégrale (1:1) doit tout embarquer, car elle ne peut pas anticiper au moment du build les fonctionnalités requises par vos messages. Concrètement, cela implique :

1. **Un parseur** qui convertit la chaîne en AST, en gérant les erreurs d'accolades mal formées.
2. **Un parseur de skeletons** pour la syntaxe `::` des nombres et dates, qui représente un micro-langage en soi.
3. **Un formateur** qui parcourt l'AST et associe chaque nœud à `Intl.PluralRules`, `Intl.NumberFormat` et `Intl.DateTimeFormat`.

La troisième composante est légère, car le JavaScript moderne intègre déjà la logique CLDR dans `Intl`. En revanche, les deux premières n'existent que pour interpréter une syntaxe textuelle. Dans `intl-messageformat` de FormatJS, l'implémentation de référence sur laquelle reposent `react-intl` et `next-intl`, cela représente environ **10 Ko de JavaScript compressé** envoyé à chaque visiteur, avant même la moindre ligne de vos propres traductions.

La plupart des applications n'exploitent qu'une fraction de ces possibilités : une interpolation `{name}` et quelques blocs `plural`. Elles téléchargent pourtant l'intégralité du parseur pour les skeletons, ordinaux et décalages, faute pour le bundler de pouvoir analyser statiquement ce qui est réellement utilisé dans une chaîne parsée au runtime.

## next-intl face au même constat

Cette analyse ne relève pas de la théorie. `next-intl`, l'une des bibliothèques basées sur ICU les plus répandues, est parvenue au même constat. Dans sa version 4.8 (janvier 2026), le projet a introduit une option expérimentale `precompile`. Celle-ci analyse les messages ICU au moment du build pour produire un AST compact et remplace le parseur au runtime par un évaluateur minimal. Le projet indique avoir ainsi **retiré environ 9 Ko de JavaScript compressé** grâce à cette option.

Ce compromis met toutefois en lumière les limites de l'exercice : `t.raw` devient inopérant avec la précompilation, car la chaîne ICU brute n'existe plus au runtime. Dès l'instant où le navigateur ne parse plus la chaîne, vous n'expédiez plus réellement de l'ICU. Vous livrez une représentation compilée, et la syntaxe textuelle n'est plus qu'un format d'écriture initial.

La question se pose alors légitimement : si le navigateur ne lit jamais cette chaîne, pourquoi développeurs et traducteurs devraient-ils continuer à l'écrire ?

## À quoi ressemble une approche native en JavaScript

JavaScript fournit déjà les parties les plus complexes. `Intl.PluralRules` sait que le polonais compte quatre catégories cardinales et que l'anglais en possède quatre ordinales. `Intl.NumberFormat` et `Intl.DateTimeFormat` prennent en charge les devises, les unités, les notations compactes et les calendriers. Choisir une branche et injecter des valeurs ne demande plus qu'une poignée de lignes de code dès lors que la structure est un objet de données et non une chaîne de caractères.

C'est précisément l'architecture retenue par Intlayer. Les embranchements sont définis par des fonctions dans une déclaration de contenu typée, où chaque locale ne déclare que les catégories exigées par sa propre grammaire :

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      fr: plural({
        one: "{{count}} message non lu",
        other: "{{count}} messages non lus",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Locale polonaise → "5 nieprzeczytanych wiadomości"
```

Les différences majeures avec ICU :

- **Aucun parseur dans le bundle.** La structure est déjà un objet JavaScript lorsqu'elle parvient au navigateur. La fonction `plural` sélectionne la clé adéquate via `Intl.PluralRules`, déjà fourni par l'environnement.
- **Les erreurs sont détectées au build.** Une branche manquante ou une faute de frappe dans une clé constitue une erreur de typage statique, évitant ainsi les dysfonctionnements découverts en production.
- **Le formatage reste distinct du message.** Les nombres, dates et devises transitent par des [hooks de formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) qui exploitent directement `Intl`, éliminant le besoin de parser des skeletons.
- **Les fonctionnalités inutilisées ne coûtent rien.** Si aucun message n'utilise `gender`, le bundler supprime automatiquement le code correspondant par tree-shaking.

- [Hooks de formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md)

Cette approche comporte aussi ses exigences : elle nécessite une étape de build, les fichiers de contenu prennent la forme de code plutôt que de chaînes plates, et certains outils de TMS conçus exclusivement pour ICU ne lisent pas nativement une déclaration de contenu TypeScript.

## Quand ICU reste le choix pertinent

ICU demeure la solution la plus indiquée lorsque :

- **Votre pipeline de traduction repose entièrement sur lui.** De nombreux outils TMS importent et exportent des chaînes ICU, et les équipes de traduction sont rompues à cette syntaxe.
- **Les messages sont partagés entre plusieurs plateformes.** Alimenter une application iOS, une application Android et une application web avec un catalogue unique est un argument de poids pour conserver un format unifié.
- **Vous possédez déjà une base volumineuse de messages ICU.** Réécrire des milliers de messages justifie rarement l'effort à lui seul.

Dans cette dernière situation, vous n'êtes pas contraint de choisir entre une réécriture intégrale et la conservation d'un parseur lourd. L'[adaptateur de compatibilité react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-intl.md) d'Intlayer sait interpréter les chaînes ICU existantes (`plural`, `select`, `selectordinal`, `#`, formats historiques `number` / `date` / `time`), vous permettant de migrer progressivement tout en limitant le surcoût d'ICU aux seuls messages historiques qui en ont encore besoin.

- [Adaptateur de compatibilité react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-intl.md)

## Conclusion

ICU MessageFormat a répondu à un véritable défi : la gestion de la grammaire incombe aux traducteurs, et non à des conditions du type `if (count === 1)` disséminées dans le code applicatif. Cette solution s'est épanouie dans des environnements où le coût d'un parseur textuel est négligeable. Dans le navigateur web, garantir une compatibilité totale impose d'expédier un parseur pour des fonctionnalités superflues pour la plupart des projets, au point que les bibliothèques basées sur ICU précompilent désormais leurs messages pour y échapper.

JavaScript propose déjà les règles CLDR au travers d'`Intl`. Ce que l'on attend d'un format i18n moderne se résume à une structure de choix conditionnels, et celle-ci peut être exprimée sous forme de données typées.

## Pour aller plus loin

- [ICU Message Format : syntaxe, pluriels et select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/icu_message_format.md)
- [Contenu pluriel dans Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md)
- [Contenu basé sur select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/select.md)
- [Benchmark des bibliothèques i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md)
- [next-intl est-il dépassé ?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_next-intl_outdated.md)
