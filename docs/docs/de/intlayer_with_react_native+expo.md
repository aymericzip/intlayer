---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: Expo + React Native i18n - Vollständiger Leitfaden zur Übersetzung React Native
description: Beste Lösung für Bundle-Größe, SEO, Performance & Wartbarkeit. Machen Sie Ihre Expo and React Native mobile App 2026 mehrsprachig, LLM-Übersetzung, Agent Skills & MCP.
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
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initiale Historie"
---

# Übersetzen Sie Ihre Expo und React Native App | Internationalisierung (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Application Template](https://github.com/aymericzip/intlayer-react-native-template) auf GitHub.

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „react-native-localize“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

**Vollständige React Native-Abdeckung**

Intlayer ist für die perfekte Zusammenarbeit mit React Native und Expo optimiert, indem es **Content-Scoping auf Komponentenebene**, **TypeScript-Unterstützung** und alle Funktionen bietet, die für die Skalierung der Internationalisierung (i18n) in mobilen Apps erforderlich sind.

**Wartbarkeit**

Durch die Festlegung des Inhaltsbereichs Ihrer Anwendung wird die Wartung für umfangreiche Anwendungen erleichtert. Sie können einen einzelnen Feature-Ordner duplizieren oder löschen, ohne die mentale Belastung durch die Überprüfung Ihrer gesamten Inhaltscodebasis auf sich nehmen zu müssen. Darüber hinaus ist Intlayer **vollständig typisiert (fully typed)**, um die Genauigkeit Ihrer Inhalte sicherzustellen.

**KI-Agent**

Durch die gemeinsame Platzierung von Inhalten **reduziert sich der von Large Language Models (LLMs) benötigte Kontext**. Intlayer verfügt außerdem über eine Reihe von Tools, wie zum Beispiel eine **CLI** zum Testen auf fehlende Übersetzungen,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** und **[agent Fähigkeiten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

**Automatisierung**

Nutzen Sie die Automatisierung, um Ihre CI/CD-Pipeline mit dem LLM Ihrer Wahl auf Kosten Ihres KI-Anbieters zu übersetzen. Intlayer bietet außerdem einen **Compiler** zur Automatisierung der Inhaltsextraktion sowie eine [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) zur Unterstützung der **Übersetzung im Hintergrund**.

**Leistung**

Das Verbinden großer JSON-Dateien mit Komponenten kann zu Leistungs- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte zur Erstellungszeit.

**Skalierung mit Nicht-Entwickler**

Intlayer ist mehr als nur eine i18n-Lösung. Es bietet einen **selbstgehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, um Ihnen zu helfen Verwalten Sie Ihre mehrsprachigen Inhalte in **Echtzeit** und gestalten Sie die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern reibungslos. Inhalte können lokal und/oder remote gespeichert werden.

**Bundle-Größe**

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur den erforderlichen Inhalt. Intlayer hilft **Ihre Bundle- und Ansichtsgrößen um bis zu 50 % zu reduzieren**.

## Schritt 1: Abhängigkeiten installieren

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-react-native-template) auf GitHub.

Installieren Sie aus Ihrem React Native-Projekt die folgenden Pakete:

„bash packageManager="npm"
NPM Install Intlayer React-Intlayer
npm install --save-dev reagieren-native-intlayer
Npx-Intlayer-Init
„

„bash packageManager="pnpm"
pnpm fügt Intlayer React-Intlayer hinzu
pnpm add --save-dev reagieren-native-intlayer
pnpm intlayer init
„

````bash packageManager="yarn"
Garn Zwischenschicht hinzufügen React-Intlayer
Garn hinzufügen --save-dev reagieren-native-intlayer
Garnzwischenschicht init
„

```bash packageManager="bun"
Brötchen Zwischenschicht Reagieren-Zwischenschicht hinzufügen
Brötchen hinzufügen --dev reagieren-native-intlayer
Brötchen x Zwischenschicht init
„

### Pakete

- **Zwischenschicht**
  Das zentrale i18n-Toolkit für Konfiguration, Wörterbuchinhalt, Typgenerierung und CLI-Befehle.

- **react-intlayer**
  React-Integration, die die Kontextanbieter und React-Hooks bereitstellt, die Sie in React Native zum Abrufen und Wechseln von Gebietsschemas verwenden.

- **react-native-intlayer**
  React Native-Integration, die das Metro-Plugin für die Integration von Intlayer mit dem React Native-Bundler bereitstellt.

---

## Schritt 1: Abhängigkeiten installieren

Installieren Sie in Ihrem React Native Projekt die folgenden Pakete:

```bash packageManager="npm"
bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
````

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
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

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Für Details zu Inhaltsdeklarationen siehe [Intlayer’s Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

---

## Schritt 4: Verwenden Sie Intlayer in Ihren Komponenten

Verwenden Sie den `useIntlayer` Hook in untergeordneten Komponenten, um lokalisierten Inhalt zu erhalten.

### Beispiel

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
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

> Wenn Sie `content.someKey` in stringbasierten Props verwenden (z. B. im `title` eines Buttons oder als `children` einer `Text`-Komponente), **rufen Sie `content.someKey.value` auf**, um den tatsächlichen String zu erhalten.

> Wenn Ihre App bereits existiert, können Sie den [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) sowie den [Extraktionsbefehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) verwenden, um Tausende von Komponenten in einer Sekunde zu transformieren.

---

## (Optional) Schritt 5: Ändern der App-Sprache

Um die Sprache innerhalb Ihrer Komponenten zu wechseln, können Sie die `setLocale`-Methode des `useLocale`-Hooks verwenden:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

```bash
#  Ignoriere die von Intlayer generierten Dateien
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
- **CLI-Befehle**: Erkunden Sie die [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) für Aufgaben wie das **Extrahieren von Übersetzungen** oder das **Überprüfen fehlender Schlüssel**.

Viel Spaß beim Erstellen Ihrer **React Native**-Apps mit voll ausgestatteter i18n durch **Intlayer**!

---
