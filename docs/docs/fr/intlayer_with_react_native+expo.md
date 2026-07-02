---
createdAt: 2025-06-18
updatedAt: 2026-06-25
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

La colocalisation du contenu **réduit le contexte nécessaire** aux grands modèles de langage (LLM). Intlayer est également livré avec une suite d'outils, tels qu'une **CLI** pour vérifier les traductions manquantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** et des **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, afin de rendre l'expérience développeur (DX) encore plus fluide pour les agents IA.

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
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
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

---

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

---

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

---

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
