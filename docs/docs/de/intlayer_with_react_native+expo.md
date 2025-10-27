---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: Wie Sie Ihre React Native and Expo übersetzen – i18n-Leitfaden 2025
description: Entdecken Sie, wie Sie Ihre React Native und Expo Website mehrsprachig gestalten. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# Übersetzen Sie Ihre React Native and Expo mit Intlayer | Internationalisierung (i18n)

Siehe [Application Template](https://github.com/aymericzip/intlayer-react-native-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine **innovative, Open-Source-Internationalisierungsbibliothek (i18n)**, die die mehrsprachige Unterstützung in modernen Anwendungen vereinfacht. Sie funktioniert in vielen JavaScript/TypeScript-Umgebungen, **einschließlich React Native** (über das Paket `react-intlayer`).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **TypeScript-Unterstützung sicherstellen** durch automatisch generierte Typen.
- **Inhalte dynamisch lokalisieren**, einschließlich **UI-Strings** (und in React für Web kann es auch HTML-Metadaten usw. lokalisieren).
- **Von erweiterten Funktionen profitieren**, wie dynamische Lokalerkennung und -umschaltung.

---

## Schritt 1: Abhängigkeiten installieren

Installieren Sie in Ihrem React Native Projekt die folgenden Pakete:

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

### Pakete

- **intlayer**  
  Das Kern-i18n-Toolkit für Konfiguration, Wörterbuchinhalte, Typgenerierung und CLI-Befehle.

- **react-intlayer**  
  React-Integration, die die Context-Provider und React-Hooks bereitstellt, die Sie in React Native verwenden, um Lokalisierungen zu erhalten und zu wechseln.

- **react-native-intlayer**  
  React Native-Integration, die das Metro-Plugin bereitstellt, um Intlayer mit dem React Native-Bundler zu integrieren.

---

## Schritt 2: Erstellen Sie eine Intlayer-Konfiguration

In Ihrem Projektstammverzeichnis (oder an einem beliebigen anderen Ort) erstellen Sie eine **Intlayer-Konfigurationsdatei**. Sie könnte wie folgt aussehen:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
/**
 * Falls die Locales-Typen nicht verfügbar sind, versuchen Sie, in Ihrer tsconfig.json die moduleResolution auf "bundler" zu setzen
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Fügen Sie hier weitere benötigte Sprachen hinzu
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
      // ... Fügen Sie hier weitere benötigte Sprachversionen hinzu
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

Innerhalb dieser Konfiguration können Sie:

- Ihre **Liste der unterstützten Sprachversionen** konfigurieren.
- Eine **Standard**-Sprache festlegen.
- Später können Sie erweiterte Optionen hinzufügen (z. B. Protokolle, benutzerdefinierte Inhaltsverzeichnisse usw.).
- Siehe die [Intlayer Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) für weitere Informationen.

## Schritt 3: Fügen Sie das Metro-Plugin hinzu

Metro ist ein Bundler für React Native. Es ist der Standard-Bundler für React Native-Projekte, die mit dem Befehl `react-native init` erstellt wurden. Um Intlayer mit Metro zu verwenden, müssen Sie das Plugin zu Ihrer `metro.config.js`-Datei hinzufügen:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Schritt 4: Fügen Sie den Intlayer-Provider hinzu

Um die Benutzersprache in Ihrer Anwendung synchron zu halten, müssen Sie Ihre Root-Komponente mit der `IntlayerProvider`-Komponente von `react-intlayer-native` umschließen.

> Stellen Sie sicher, dass Sie den Provider von `react-native-intlayer` anstelle von `react-intlayer` verwenden. Der Export von `react-native-intlayer` enthält Polyfills für die Web-API.

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

// Funktion, um die Gerätesprache zu ermitteln
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

## Schritt 5: Deklarieren Sie Ihren Inhalt

Erstellen Sie **Content-Deklarations**-Dateien an beliebiger Stelle in Ihrem Projekt (häufig innerhalb von `src/`), unter Verwendung eines der von Intlayer unterstützten Dateiendungen:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- usw.

Beispiel (TypeScript mit TSX-Knoten für React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Inhaltswörterbuch für unsere "app"-Domäne
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
// Inhalt für die "app"-Domäne
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
// Inhalt für die "app"-Domäne
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

> Für Details zu Inhaltsdeklarationen siehe [Intlayer’s Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

---

## Schritt 4: Verwenden Sie Intlayer in Ihren Komponenten

Verwenden Sie den `useIntlayer` Hook in untergeordneten Komponenten, um lokalisierten Inhalt zu erhalten.

### Beispiel

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
import { useIntlayer } from "intlayer";
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

> Wenn Sie `content.someKey` in stringbasierten Props verwenden (z. B. im `title` eines Buttons oder als `children` einer `Text`-Komponente), **rufen Sie `content.someKey.value` auf**, um den tatsächlichen String zu erhalten.

---

## (Optional) Schritt 5: Ändern der App-Sprache

Um die Sprache innerhalb Ihrer Komponenten zu wechseln, können Sie die `setLocale`-Methode des `useLocale`-Hooks verwenden:

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

Dies löst ein erneutes Rendern aller Komponenten aus, die Intlayer-Inhalte verwenden, und zeigt nun Übersetzungen für die neue Sprache an.

> Siehe die [`useLocale`-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md) für weitere Details.

## TypeScript konfigurieren (wenn Sie TypeScript verwenden)

Intlayer generiert Typdefinitionen in einem versteckten Ordner (standardmäßig `.intlayer`), um die Autovervollständigung zu verbessern und Übersetzungsfehler zu erkennen:

```json5
// tsconfig.json
{
  // ... Ihre bestehende TS-Konfiguration
  "include": [
    "src", // Ihr Quellcode
    ".intlayer/types/**/*.ts", // <-- sicherstellen, dass die automatisch generierten Typen eingeschlossen sind
    // ... alles andere, was Sie bereits einschließen
  ],
}
```

Dies ermöglicht Funktionen wie:

- **Autovervollständigung** für Ihre Wörterbuchschlüssel.
- **Typprüfung**, die warnt, wenn Sie auf einen nicht existierenden Schlüssel zugreifen oder der Typ nicht übereinstimmt.

---

## Git-Konfiguration

Um zu vermeiden, dass automatisch generierte Dateien von Intlayer committet werden, fügen Sie Folgendes zu Ihrer `.gitignore` hinzu:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

---

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Verwendung der Erweiterung siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

## Weiterführende Informationen

- **Visueller Editor**: Verwenden Sie den [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), um Übersetzungen visuell zu verwalten.
- **CMS-Integration**: Sie können auch Ihre Wörterbuchinhalte aus einem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern und abrufen.
- **CLI-Befehle**: Erkunden Sie die [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) für Aufgaben wie das **Extrahieren von Übersetzungen** oder das **Überprüfen fehlender Schlüssel**.

Viel Spaß beim Erstellen Ihrer **React Native**-Apps mit voll ausgestatteter i18n durch **Intlayer**!

---
