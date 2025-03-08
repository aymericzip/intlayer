# Commencer avec l'internationalisation (i18n) avec Intlayer et React Native

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une **bibliothèque d'internationalisation (i18n) innovante et open-source** qui simplifie la prise en charge multilingue dans les applications modernes. Elle fonctionne dans de nombreux environnements JavaScript/TypeScript, **y compris React Native** (via le package `react-intlayer`).

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement.
- **Localiser dynamiquement** le contenu, y compris les **chaînes d'interface utilisateur** (et dans React pour le web, elle peut également localiser les métadonnées HTML, etc.).
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de la langue.

> **Important** : Dans React Native, vous ne modifierez pas `<html lang="...">` ni ne vous appuierez sur des plugins Vite. À la place, vous intégrerez l'API `react-intlayer`, coordonnerez éventuellement avec [`I18nManager`](https://reactnative.dev/docs/i18nmanager) pour la prise en charge RTL, et, si vous utilisez React Navigation, adapterez le routeur pour refléter les changements de langue.

---

## Étape 1 : Installer les dépendances

Depuis votre projet React Native, installez les packages suivants :

```bash
npm install intlayer react-intlayer react-native-intlayer
```

```bash
pnpm add intlayer react-intlayer react-native-intlayer
```

```bash
yarn add intlayer react-intlayer react-native-intlayer
```

### Packages

- **intlayer**  
  L'outil i18n principal pour la configuration, le contenu des dictionnaires, la génération de types et les commandes CLI.

- **react-intlayer**  
  Intégration React qui fournit les fournisseurs de contexte et les hooks React que vous utiliserez dans React Native pour obtenir et changer les langues.

- **react-native-intlayer**  
  Intégration React Native qui fournit le plugin Metro pour intégrer Intlayer avec le bundler React Native.

---

## Étape 2 : Créer une configuration Intlayer

Dans la racine de votre projet (ou à tout endroit pratique), créez un fichier de **configuration Intlayer**. Il pourrait ressembler à ceci :

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Ajoutez toutes les autres langues nécessaires
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
      // ... Ajoutez toutes les autres langues nécessaires
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

- Configurer votre **liste de langues prises en charge**.
- Définir une langue **par défaut**.
- Plus tard, vous pourrez ajouter des options avancées (par exemple, journaux, répertoires de contenu personnalisés, etc.).
- Consultez la [documentation de configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus d'informations.

## Étape 3 : Ajouter le plugin Metro

Metro est un bundler pour React Native. C'est le bundler par défaut pour les projets React Native créés avec la commande `react-native init`. Pour utiliser Intlayer avec Metro, vous devez ajouter le plugin à votre fichier `metro.config.js` :

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Étape 4 : Ajouter le fournisseur Intlayer

Pour synchroniser la langue de l'utilisateur dans votre application, vous devez envelopper votre composant racine avec le composant `IntlayerProvider` de `react-intlayer`.

Enveloppez votre composant **racine** ou de niveau supérieur avec `IntlayerProvider` de `react-intlayer`.

De plus, vous devez ajouter la fonction `intlayerPolyfill` à votre fichier `index.js` pour garantir qu'Intlayer fonctionne correctement.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";
import { type FC } from "react";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProviderContent } = require("react-intlayer");
const { intlayerPolyfill } = require("react-native-intlayer");

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

module.exports = RootLayout;
```

## Étape 5 : Déclarer votre contenu

Créez des fichiers de **déclaration de contenu** n'importe où dans votre projet (généralement dans `src/`), en utilisant l'un des formats d'extension pris en charge par Intlayer :

- `.content.ts`
- `.content.mjs`
- `.content.cjs`
- `.content.json`
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
      fr: "Bienvenue!",
      en: "Welcome!",
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
      fr: "Bienvenue!",
      en: "Welcome!",
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
      fr: "Bienvenue!",
      en: "Welcome!",
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

        "fr": "Bienvenue!",
        "en": "Welcome!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Pour plus de détails sur les déclarations de contenu, consultez [la documentation sur le contenu d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md).

---

## Étape 4 : Utiliser Intlayer dans vos composants

Enveloppez votre composant **racine** ou de niveau supérieur avec `IntlayerProvider` de `react-intlayer`. Ensuite, utilisez le hook `useIntlayer` dans les composants enfants pour obtenir le contenu localisé.

### Exemple

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
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

> Lorsque vous utilisez `content.someKey` dans des props basées sur des chaînes (par exemple, le `title` d'un bouton ou les `children` d'un composant `Text`), **appelez `content.someKey.value`** pour obtenir la chaîne réelle.

---

## (Optionnel) Étape 5 : Changer la langue de l'application

Pour changer de langue depuis vos composants, vous pouvez utiliser la méthode `setLocale` du hook `useLocale` :

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Passer au français"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Passer au français"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Passer au français"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

Cela déclenche un nouveau rendu de tous les composants utilisant le contenu d'Intlayer, affichant désormais les traductions pour la nouvelle langue.

> Consultez la [documentation de `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md) pour plus de détails.

## Configurer TypeScript (si vous utilisez TypeScript)

Intlayer génère des définitions de types dans un dossier caché (par défaut `.intlayer`) pour améliorer l'autocomplétion et détecter les erreurs de traduction :

```json5
// tsconfig.json
{
  // ... votre configuration TS existante
  "include": [
    "src", // votre code source
    ".intlayer", // <-- assurez-vous que les types générés automatiquement sont inclus
    // ... tout autre élément que vous incluez déjà
  ],
}
```

Cela permet des fonctionnalités comme :

- **Autocomplétion** pour vos clés de dictionnaire.
- **Vérification des types** qui avertit si vous accédez à une clé inexistante ou si vous faites une erreur de type.

---

## Configuration Git

Pour éviter de commettre les fichiers générés automatiquement par Intlayer, ajoutez ce qui suit à votre `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

## Aller plus loin

- **Éditeur visuel** : Utilisez [l'Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) pour gérer les traductions visuellement.
- **Intégration CMS** : Vous pouvez également externaliser et récupérer votre contenu de dictionnaire depuis un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md).
- **Commandes CLI** : Explorez le [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md) pour des tâches comme **extraire des traductions** ou **vérifier les clés manquantes**.

Amusez-vous à construire vos applications **React Native** avec une i18n pleinement optimisée grâce à **Intlayer** !
