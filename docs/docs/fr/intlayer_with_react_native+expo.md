---
createdAt: 2025-06-18
updatedAt: 2026-08-30
title: "Expo + React Native i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Expo + React Native multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Importer les providers et les hooks directement depuis react-native-intlayer ; react-intlayer n'est plus nécessaire en tant que dépendance directe"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajouter la commande init"
  - version: 6.1.6
    date: 2025-10-02
    changes: "Ajouter la section de débogage"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Traduire votre application Expo et React Native | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table des matières

<TOC/>

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `react-native-localize` ou `i18next`, Intlayer est une solution qui comprend des optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Support complet de React Native">

Intlayer est optimisé pour fonctionner parfaitement avec React Native et Expo en offrant une **portée du contenu au niveau des composants**, une **prise en charge de TypeScript** et toutes les fonctionnalités nécessaires à la mise à l'échelle de l'internationalisation (i18n) dans les applications mobiles.

</Accordion>

<Accordion header="Maintenabilité">

Déclarer le contenu directement au plus près de vos composants **facilite la maintenance** des applications de grande envergure. Vous pouvez dupliquer ou supprimer le dossier d'une fonctionnalité sans le fardeau mental de devoir passer en revue toute votre base de code de contenu. De plus, Intlayer est **entièrement typé** pour garantir l'exactitude de vos traductions.

</Accordion>

<Accordion header="Prêt pour les agents IA">

La colocalisation du contenu **réduit le contexte nécessaire** aux grands modèles de langage (LLM). Intlayer est également livré avec une suite d'outils, tels qu'une **CLI** pour vérifier les traductions manquantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** et des **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)**, afin de rendre l'expérience développeur (DX) encore plus fluide pour les agents IA.

</Accordion>

<Accordion header="Automatisation">

Automatisez les traductions dans votre pipeline CI/CD en utilisant le LLM de votre choix au coût de votre propre fournisseur d'IA. Intlayer propose également un **compilateur** pour automatiser l'extraction de contenu, ainsi qu'une [plateforme web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) pour vous aider à **traduire en arrière-plan**.

</Accordion>

<Accordion header="Performances">

Associer de gros fichiers JSON à vos composants peut ralentir les performances et impacter la réactivité. Intlayer optimise le chargement du contenu directement au moment du **build**.

</Accordion>

<Accordion header="Collaboration avec les non-développeurs">

Bien plus qu'une simple solution i18n, Intlayer propose un **[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** auto-hébergé et un **[CMS complet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** pour gérer votre contenu multilingue en **temps réel**. Cela rend la collaboration avec les traducteurs, concepteurs-rédacteurs et autres membres de l'équipe extrêmement simple. Le contenu peut être stocké localement et/ou à distance.

</Accordion>

<Accordion header="Taille du bundle">

Au lieu de charger de lourds fichiers JSON dans vos pages, ne chargez que le contenu strictement nécessaire. Intlayer vous aide à **réduire la taille de votre bundle et de vos vues jusqu'à 50 %**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Installer les dépendances">

Voir [Modèle d'application](https://github.com/aymericzip/intlayer-react-native-template) sur GitHub.

Depuis votre projet React Native, installez les packages suivants :

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

> Le flag `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### Packages

- **intlayer**  
  La boîte à outils i18n principale pour la configuration, le contenu des dictionnaires, la génération de types et les commandes CLI.

- **react-native-intlayer**  
  Intégration React Native qui fournit les fournisseurs de contexte et les hooks React que vous utiliserez pour obtenir et changer les locales, les polyfills React Native et le plugin Metro pour intégrer Intlayer avec le bundler React Native. Il ré-exporte tout depuis `react-intlayer`, vous n'avez donc besoin que de ce seul package dans une application React Native.

</Step>

<Step number={2} title="Créer une configuration Intlayer">

Dans la racine de votre projet (ou à tout autre endroit pratique), créez un fichier de **configuration Intlayer**. Il pourrait ressembler à ceci :

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Si les types Locales ne sont pas disponibles, essayez de définir moduleResolution à "bundler" dans votre tsconfig.json
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Ajoutez toutes les autres locales dont vous avez besoin
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Dans cette configuration, vous pouvez :

- Configurer votre **liste de locales prises en charge**.
- Définir une locale **par défaut**.
- Plus tard, vous pourrez ajouter des options plus avancées (par exemple, des logs, des répertoires de contenu personnalisés, etc.).
- Consultez la [documentation de configuration d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) pour plus d'informations.

</Step>

<Step number={3} title="Ajouter le plugin Metro">

Metro est un bundler pour React Native. C'est le bundler par défaut pour les projets React Native créés avec la commande `react-native init`. Pour utiliser Intlayer avec Metro, vous devez ajouter le plugin dans votre fichier `metro.config.js` :

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Note : `configMetroIntlayer` est une fonction asynchrone. Utilisez `configMetroIntlayerSync` à la place si vous souhaitez l'utiliser de manière synchrone, ou éviter une IIFE (Immediately Invoked Function Expression).
> Note : `configMetroIntlayerSync` ne permet pas de construire les dictionnaires intlayer au démarrage du serveur

</Step>

<Step number={4} title="Ajouter le fournisseur Intlayer">

Pour garder synchronisée la langue de l'utilisateur dans toute votre application, vous devez envelopper votre composant racine avec le composant `IntlayerProvider` de `react-native-intlayer`.

> Importez toujours depuis `react-native-intlayer`. Son `IntlayerProvider` inclut des polyfills pour l'API web utilisée par Intlayer, et le package ré-exporte tous les hooks et utilitaires de `react-intlayer`.

De plus, vous devez ajouter la fonction `intlayerPolyfill` à votre fichier `index.js` pour vous assurer qu'Intlayer puisse fonctionner correctement.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

</Step>

<Step number={5} title="Déclarez Votre Contenu">

Créez des fichiers de **déclaration de contenu** n'importe où dans votre projet (généralement dans `src/`), en utilisant l'un des formats d'extension pris en charge par Intlayer :

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- etc.

> **Expo Router (web) : gardez les fichiers `.content.*` en dehors du répertoire `app/`.** Expo Router traite chaque fichier JavaScript/TypeScript dans `app/` comme une route. Sur le web, sa découverte de routes scanne directement le système de fichiers et **ne respecte pas** le `resolver.blockList` de Metro, donc un `*.content.ts` co-localisé est enregistré comme une route. Un fichier tel que `app/(tabs)/_layout.content.ts` est même analysé comme un layout (la partie `.content` est lue comme un suffixe de plateforme), ce qui entre en conflit avec le vrai `_layout.tsx` et renvoie une erreur :
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Placez vos déclarations dans un répertoire en dehors de `app/` (par exemple `content/` ou `src/content/`). Intlayer découvre les fichiers `.content.*` n'importe où dans le projet et les dictionnaires sont référencés par leur `key`, donc aucune modification d'importation n'est nécessaire. En natif, ce n'est pas requis (le `blockList` de Metro les cache déjà), mais l'utilisation d'un répertoire autre que `app/` permet aux deux plateformes de fonctionner.

Exemple (TypeScript avec des nœuds TSX pour React Native) :

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Dictionnaire de contenu pour notre domaine "app"
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Pour plus de détails sur les déclarations de contenu, consultez la [documentation du contenu d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={6} title="Utiliser Intlayer dans vos composants">

Utilisez le hook `useIntlayer` dans les composants enfants pour obtenir du contenu localisé.

### Exemple

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> Lors de l'utilisation de `content.someKey` dans des props basées sur des chaînes (par exemple, le `title` d'un bouton ou les `children` d'un composant `Text`), **appelez `content.someKey.value`** pour obtenir la chaîne réelle.

> Si votre application existe déjà, vous pouvez utiliser le [Compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md), ainsi que la [commande d'extraction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md), pour transformer des milliers de composants en une seconde.

</Step>

<Step number={7} title="Changer la langue de l'application" isOptional={true}>

Pour changer la langue depuis vos composants, vous pouvez utiliser la méthode `setLocale` du hook `useLocale` :

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

Cela déclenche un nouveau rendu de tous les composants qui utilisent le contenu Intlayer, affichant désormais les traductions pour la nouvelle locale.

> Voir la [documentation de `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) pour plus de détails.

</Step>

</Steps>

## Configurer TypeScript (si vous utilisez TypeScript)

Intlayer génère des définitions de types dans un dossier caché (par défaut `.intlayer`) pour améliorer l'autocomplétion et détecter les erreurs de traduction :

```json5
// tsconfig.json
{
  // ... votre configuration TS existante
  "include": [
    "src", // votre code source
    ".intlayer/types/**/*.ts", // <-- assurez-vous que les types générés automatiquement sont inclus
    // ... tout autre élément que vous incluez déjà
  ],
}
```

C'est ce qui permet des fonctionnalités telles que :

- **Autocomplétion** pour vos clés de dictionnaire.
- **Vérification de type** qui avertit si vous accédez à une clé inexistante ou si le type ne correspond pas.

---

## Configuration Git

Pour éviter de committer les fichiers générés automatiquement par Intlayer, ajoutez ce qui suit à votre `.gitignore` :

```bash
#  Ignorer les fichiers générés par Intlayer
.intlayer
```

---

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**extension officielle Intlayer pour VS Code**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Aller plus loin

- **Éditeur Visuel** : Utilisez le [Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) pour gérer les traductions visuellement.
- **Intégration CMS** : Vous pouvez également externaliser et récupérer le contenu de votre dictionnaire depuis un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
- **Commandes CLI** : Explorez le [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) pour des tâches telles que **l'extraction des traductions** ou **la vérification des clés manquantes**.

Profitez de la création de vos applications **React Native** avec une i18n pleinement optimisée grâce à **Intlayer** !

---

### Débogage

React Native peut être moins stable que React Web, donc faites particulièrement attention à l'alignement des versions.

Intlayer cible principalement l'API Web Intl ; sur React Native, vous devez inclure les polyfills appropriés.

Checklist :

- Utilisez les dernières versions de `intlayer` et `react-native-intlayer`.
- Activez le polyfill Intlayer.
- Si vous utilisez `getLocaleName` ou d'autres utilitaires basés sur l'API Intl, importez ces polyfills tôt (par exemple dans `index.js` ou `App.tsx`) :

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Vérifiez votre configuration Metro (resolver aliases, asset plugins, chemins `tsconfig`) si les modules ne se résolvent pas.

---

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application React Native ou Expo ?">

- **`i18n-js`** associé à `expo-localization` : l'association historique, un simple objet de messages sans typage.
- **`react-i18next`** : le standard de l'écosystème React, avec des espaces de noms JSON chargés à l'exécution.
- **`Intlayer`** : contenu déclaré à côté de chaque composant et compilé par le plugin Metro au moment du build, entièrement typé, avec traduction par IA, un éditeur visuel et un CMS.

Sur mobile, l'argument de la taille est plus fort que sur le web, car tout est inclus dans le bundle de l'application plutôt que récupéré par page. Compiler le contenu par composant garde les langues inutilisées et les clés inutilisées hors du bundle. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille du bundle de mon application ?">

Bien moins qu'un catalogue d'exécution, ce qui compte plus sur mobile que sur le web car tout est inclus dans le bundle de l'application plutôt que récupéré par page. Le plugin Metro résout les appels `useIntlayer` vers les entrées exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées n'atteignent jamais le binaire. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md).

</Question>

<Question title="Puis-je migrer depuis `i18n-js` ou `react-i18next` sans réécrire mes composants ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration i18n-js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18n-js.md) ou le [guide de migration react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `react-i18next` et `react-intl`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des composants.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos fichiers source, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

Pour un pipeline entièrement automatisé, le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) fait la même chose au moment du build sur du code source JSX, TSX, Vue et Svelte, en générant les dictionnaires à chaque changement, de sorte qu'il n'y a aucune clé à maintenir à la main. Il fonctionne par analyse statique : les chaînes qui n'existent qu'à l'exécution restent hors de portée, et il a besoin de quelques annotations pour distinguer le texte destiné aux utilisateurs de la logique applicative.

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Intlayer fonctionne-t-il avec Expo et le bundler Metro ?">

Oui. L'étape 3 ajoute le plugin Metro, qui compile vos fichiers `.content.ts` et régénère les types à l'enregistrement, si bien que Fast Refresh prend en compte les modifications de contenu comme n'importe quel autre changement de source. Il fonctionne à la fois dans Expo Go et dans les builds de développement.

</Question>

<Question title="Comment détecter la langue de l'appareil ?">

Lisez-la depuis `expo-localization` et transmettez-la au provider Intlayer comme locale initiale, puis persistez le choix explicite de l'utilisateur. Intlayer se replie sur votre locale par défaut lorsque la langue de l'appareil ne fait pas partie des locales déclarées, si bien que l'application n'affiche jamais une chaîne vide.

</Question>

<Question title="Comment changer la langue de l'application à l'exécution ?">

L'étape 7 le couvre. `useLocale` expose la locale active, les locales déclarées et un setter, et les composants qui lisent du contenu se réaffichent immédiatement, si bien que la langue change sans redémarrer l'application.

</Question>

<Question title="Comment prendre en charge les langues de droite à gauche telles que l'arabe ou l'hébreu ?">

Utilisez `getHTMLTextDir` pour savoir si la locale active est de droite à gauche, et appliquez-le via le `I18nManager` de React Native. Gardez à l'esprit que React Native nécessite un rechargement pour un basculement complet de la mise en page RTL, la plupart des applications invitent donc l'utilisateur une seule fois lorsqu'il sélectionne une langue RTL.

</Question>

<Question title="Comment traduire l'application automatiquement avec l'IA ?">

Lancez `npx intlayer fill`, qui remplit les traductions manquantes avec le LLM de votre choix en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution au contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et le texte enrichi ?">

Oui : les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md), le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Comment les traducteurs peuvent-ils modifier le contenu sans toucher au code ?">

Via l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), qui tourne sur votre propre infrastructure et permet à quiconque de modifier le texte sur place sur l'application en cours d'exécution, ou le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), qui externalise le contenu afin qu'il puisse changer sans déploiement.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le CMS hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
