# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und React Native

Siehe [Application Template](https://github.com/aymericzip/intlayer-react-native-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine **innovative, Open-Source-Internationalisierungsbibliothek (i18n)**, die die Unterstützung mehrerer Sprachen in modernen Anwendungen vereinfacht. Sie funktioniert in vielen JavaScript/TypeScript-Umgebungen, **einschließlich React Native** (über das `react-intlayer`-Paket).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen.
- Inhalte **dynamisch lokalisieren**, einschließlich **UI-Strings** (und in React für das Web können auch HTML-Metadaten lokalisiert werden, usw.).
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und -umschaltung.

---

## Schritt 1: Abhängigkeiten installieren

Installieren Sie die folgenden Pakete aus Ihrem React Native-Projekt:

```bash packageManager="npm"
npm install intlayer react-intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-native-intlayer
```

### Pakete

- **intlayer**  
  Das Kern-i18n-Toolkit für Konfiguration, Wörterbuchinhalte, Typengenerierung und CLI-Befehle.

- **react-intlayer**  
  React-Integration, die die Kontext-Provider und React-Hooks bereitstellt, die Sie in React Native verwenden, um Sprachen zu erhalten und zu wechseln.

- **react-native-intlayer**  
  React Native-Integration, die das Metro-Plugin für die Integration von Intlayer mit dem React Native-Bundler bereitstellt.

---

## Schritt 2: Eine Intlayer-Konfiguration erstellen

Erstellen Sie im Stammverzeichnis Ihres Projekts (oder an einem beliebigen geeigneten Ort) eine **Intlayer-Konfigurationsdatei**. Sie könnte so aussehen:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Fügen Sie alle weiteren benötigten Sprachen hinzu
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
      // ... Fügen Sie alle weiteren benötigten Sprachen hinzu
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

- Ihre **Liste der unterstützten Sprachen** konfigurieren.
- Eine **Standardsprache** festlegen.
- Später können Sie erweiterte Optionen hinzufügen (z. B. Protokolle, benutzerdefinierte Inhaltsverzeichnisse usw.).
- Siehe die [Intlayer-Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) für weitere Informationen.

## Schritt 3: Das Metro-Plugin hinzufügen

Metro ist ein Bundler für React Native. Es ist der Standard-Bundler für mit dem Befehl `react-native init` erstellte React Native-Projekte. Um Intlayer mit Metro zu verwenden, müssen Sie das Plugin zu Ihrer Datei `metro.config.js` hinzufügen:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Schritt 4: Den Intlayer-Provider hinzufügen

Um die Benutzersprache in Ihrer Anwendung synchronisiert zu halten, müssen Sie Ihre Root-Komponente mit der Komponente `IntlayerProvider` aus `react-intlayer` umschließen.

Umwickeln Sie Ihre **Root**- oder oberste Komponente mit `IntlayerProvider` aus `react-intlayer`.

Außerdem müssen Sie die Funktion `intlayerPolyfill` zu Ihrer Datei `index.js` hinzufügen, um sicherzustellen, dass Intlayer ordnungsgemäß funktioniert.

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
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
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
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
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
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

module.exports = RootLayout;
```

## Schritt 5: Ihren Inhalt deklarieren

Erstellen Sie **Inhaltsdeklarationsdateien** an beliebiger Stelle in Ihrem Projekt (häufig innerhalb von `src/`), unter Verwendung eines der von Intlayer unterstützten Erweiterungsformate:

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
 * Inhaltswörterbuch für unsere "app"-Domain
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      de: "Willkommen!",
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
      de: "Willkommen!",
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
      de: "Willkommen!",
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

        "de": "Willkommen!",
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Für Details zu Inhaltsdeklarationen siehe [Intlayer’s Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

---

## Schritt 4: Verwenden Sie Intlayer in Ihren Komponenten

Umwickeln Sie Ihre **Root**- oder Top-Level-Komponente mit `IntlayerProvider` von `react-intlayer`. Verwenden Sie dann den `useIntlayer`-Hook in untergeordneten Komponenten, um lokalisierte Inhalte zu erhalten.

### Beispiel

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

> Wenn Sie `content.someKey` in stringbasierten Props verwenden (z. B. `title` eines Buttons oder `children` einer `Text`-Komponente), **rufen Sie `content.someKey.value` auf**, um den tatsächlichen String zu erhalten.

---

## (Optional) Schritt 5: Ändern Sie die App-Lokalisierung

Um die Lokalisierung innerhalb Ihrer Komponenten zu wechseln, können Sie die `setLocale`-Methode des `useLocale`-Hooks verwenden:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Wechseln zu Französisch"
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
      title="Wechseln zu Französisch"
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
      title="Wechseln zu Französisch"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

Dies löst ein erneutes Rendern aller Komponenten aus, die Intlayer-Inhalte verwenden, und zeigt nun Übersetzungen für die neue Lokalisierung an.

> Siehe [`useLocale`-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md) für weitere Details.

## TypeScript konfigurieren (falls Sie TypeScript verwenden)

Intlayer generiert Typdefinitionen in einem versteckten Ordner (standardmäßig `.intlayer`), um die Autovervollständigung zu verbessern und Übersetzungsfehler zu erkennen:

```json5
// tsconfig.json
{
  // ... Ihre bestehende TS-Konfiguration
  "include": [
    "src", // Ihr Quellcode
    ".intlayer/types/**/*.ts", // <-- Stellen Sie sicher, dass die automatisch generierten Typen enthalten sind
    // ... alles andere, was Sie bereits einbeziehen
  ],
}
```

Dies ermöglicht Funktionen wie:

- **Autovervollständigung** für Ihre Wörterbuchschlüssel.
- **Typprüfung**, die warnt, wenn Sie auf einen nicht vorhandenen Schlüssel zugreifen oder den Typ nicht übereinstimmen.

---

## Git-Konfiguration

Um zu vermeiden, dass automatisch generierte Dateien von Intlayer in das Repository aufgenommen werden, fügen Sie Folgendes zu Ihrer `.gitignore` hinzu:

```plaintext
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```

---

## Weiterführende Schritte

- **Visueller Editor**: Verwenden Sie den [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md), um Übersetzungen visuell zu verwalten.
- **CMS-Integration**: Sie können auch Ihre Wörterbuchinhalte aus einem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) externalisieren und abrufen.
- **CLI-Befehle**: Erkunden Sie die [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) für Aufgaben wie **Übersetzungen extrahieren** oder **fehlende Schlüssel überprüfen**.

Viel Spaß beim Erstellen Ihrer **React Native**-Apps mit vollständig unterstützter i18n durch **Intlayer**!
