---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: Comment traduire votre React Native and Expo – guide i18n 2025
description: Découvrez comment rendre votre site React Native et Expo multilingue. Suivez la documentation pour internationaliser (i18n) et traduire votre site.
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
---

# Traduire votre React Native and Expo avec Intlayer | Internationalisation (i18n)

Voir le [Modèle d'Application](https://github.com/aymericzip/intlayer-react-native-template) sur GitHub.

## Qu'est-ce que Intlayer ?

**Intlayer** est une **bibliothèque d'internationalisation (i18n) innovante et open-source** qui simplifie la prise en charge multilingue dans les applications modernes. Elle fonctionne dans de nombreux environnements JavaScript/TypeScript, **y compris React Native** (via le package `react-intlayer`).

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement.
- **Localiser dynamiquement** le contenu, y compris les **chaînes d'interface utilisateur** (et dans React pour le web, elle peut aussi localiser les métadonnées HTML, etc.).
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamique de la langue.

---

## Étape 1 : Installer les dépendances

Depuis votre projet React Native, installez les packages suivants :

```bash packageManager="npm"
bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
```

### Packages

- **intlayer**  
  La boîte à outils i18n principale pour la configuration, le contenu des dictionnaires, la génération de types et les commandes CLI.

- **react-intlayer**  
  Intégration React qui fournit les fournisseurs de contexte et les hooks React que vous utiliserez dans React Native pour obtenir et changer les locales.

- **react-native-intlayer**  
  Intégration React Native qui fournit le plugin Metro pour intégrer Intlayer avec le bundler React Native.

---

## Étape 2 : Créer une configuration Intlayer

Dans la racine de votre projet (ou à tout autre endroit pratique), créez un fichier de **configuration Intlayer**. Il pourrait ressembler à ceci :

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Dans cette configuration, vous pouvez :

- Configurer votre **liste de locales prises en charge**.
- Définir une locale **par défaut**.
- Plus tard, vous pourrez ajouter des options plus avancées (par exemple, des logs, des répertoires de contenu personnalisés, etc.).
- Consultez la [documentation de configuration d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour plus d'informations.

## Étape 3 : Ajouter le plugin Metro

Metro est un bundler pour React Native. C'est le bundler par défaut pour les projets React Native créés avec la commande `react-native init`. Pour utiliser Intlayer avec Metro, vous devez ajouter le plugin dans votre fichier `metro.config.js` :

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Étape 4 : Ajouter le fournisseur Intlayer

Pour garder synchronisée la langue de l'utilisateur dans toute votre application, vous devez envelopper votre composant racine avec le composant `IntlayerProvider` de `react-intlayer-native`.

> Assurez-vous d'utiliser le fournisseur de `react-native-intlayer` au lieu de `react-intlayer`. L'export de `react-native-intlayer` inclut des polyfills pour l'API web.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
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

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
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

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

module.exports = RootLayout;
```

## Étape 5 : Déclarez Votre Contenu

Créez des fichiers de **déclaration de contenu** n'importe où dans votre projet (généralement dans `src/`), en utilisant l'un des formats d'extension pris en charge par Intlayer :

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- etc.

Exemple (TypeScript avec des nœuds TSX pour React Native) :

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";
import { ReactNode } from "react";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

module.exports = appContent;
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

> Pour plus de détails sur les déclarations de contenu, consultez la [documentation du contenu d’Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

---

## Étape 4 : Utiliser Intlayer dans vos composants

Utilisez le hook `useIntlayer` dans les composants enfants pour obtenir du contenu localisé.

### Exemple

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "intlayer";
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

```jsx fileName="app/(tabs)/index.content.msx" codeFormat="esm"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const HomeScreen = () => {
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

```jsx fileName="app/(tabs)/index.content.csx" codeFormat="commonjs"
const { Image, StyleSheet, Platform } = require("react-native");
const { useIntlayer } = require("react-intlayer");
const { HelloWave } = require("@/components/HelloWave");
const ParallaxScrollView = require("@/components/ParallaxScrollView");
const { ThemedText } = require("@/components/ThemedText");
const { ThemedView } = require("@/components/ThemedView");

const HomeScreen = () => {
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

module.exports = HomeScreen;
```

> Lors de l'utilisation de `content.someKey` dans des props basées sur des chaînes (par exemple, le `title` d'un bouton ou les `children` d'un composant `Text`), **appelez `content.someKey.value`** pour obtenir la chaîne réelle.

---

## (Optionnel) Étape 5 : Changer la langue de l'application

Pour changer la langue depuis vos composants, vous pouvez utiliser la méthode `setLocale` du hook `useLocale` :

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher = () => {
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { View, Text, TouchableOpacity, StyleSheet } = require("react-native");
const { getLocaleName } = require("intlayer");
const { useLocale } = require("react-intlayer");

// Composant pour changer la langue de l'application
const LocaleSwitcher = () => {
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

> Voir la [documentation de `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md) pour plus de détails.

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

```plaintext
# Ignorer les fichiers générés par Intlayer
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

- **Éditeur Visuel** : Utilisez le [Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) pour gérer les traductions visuellement.
- **Intégration CMS** : Vous pouvez également externaliser et récupérer le contenu de votre dictionnaire depuis un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
- **Commandes CLI** : Explorez le [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md) pour des tâches telles que **l'extraction des traductions** ou **la vérification des clés manquantes**.

Profitez de la création de vos applications **React Native** avec une i18n pleinement optimisée grâce à **Intlayer** !

---

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
