---
createdAt: 2025-06-18
updatedAt: 2026-06-25
title: "Expo + React Native i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Expo + React Native-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Provider und Hooks direkt aus react-native-intlayer importieren; react-intlayer wird nicht mehr als direkte Abhängigkeit benötigt"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initiale Historie"
author: aymericzip
---

# Übersetzen Sie Ihre Expo und React Native App | Internationalisierung (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
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

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „react-native-localize" oder „i18next" ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>

<Accordion header="Vollständige React Native-Abdeckung">

Intlayer ist für die perfekte Zusammenarbeit mit React Native und Expo optimiert, indem es **Content-Scoping auf Komponentenebene**, **TypeScript-Unterstützung** und alle Funktionen bietet, die für die Skalierung der Internationalisierung (i18n) in mobilen Apps erforderlich sind.

</Accordion>

<Accordion header="Wartbarkeit">

Durch die Festlegung des Inhaltsbereichs Ihrer Anwendung wird die Wartung für umfangreiche Anwendungen erleichtert. Sie können einen einzelnen Feature-Ordner duplizieren oder löschen, ohne die mentale Belastung durch die Überprüfung Ihrer gesamten Inhaltscodebasis auf sich nehmen zu müssen. Darüber hinaus ist Intlayer **vollständig typisiert (fully typed)**, um die Genauigkeit Ihrer Inhalte sicherzustellen.

</Accordion>

<Accordion header="KI-Agent">

Durch die gemeinsame Platzierung von Inhalten **reduziert sich der von Large Language Models (LLMs) benötigte Kontext**. Intlayer verfügt außerdem über eine Reihe von Tools, wie zum Beispiel eine **CLI** zum Testen auf fehlende Übersetzungen,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** und **[agent Fähigkeiten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

</Accordion>

<Accordion header="Automatisierung">

Nutzen Sie die Automatisierung, um Ihre CI/CD-Pipeline mit dem LLM Ihrer Wahl auf Kosten Ihres KI-Anbieters zu übersetzen. Intlayer bietet außerdem einen **Compiler** zur Automatisierung der Inhaltsextraktion sowie eine [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) zur Unterstützung der **Übersetzung im Hintergrund**.

</Accordion>

<Accordion header="Leistung">

Das Verbinden großer JSON-Dateien mit Komponenten kann zu Leistungs- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte zur Erstellungszeit.

</Accordion>

<Accordion header="Skalierung mit Nicht-Entwickler">

Intlayer ist mehr als nur eine i18n-Lösung. Es bietet einen **selbstgehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, um Ihnen zu helfen, Ihre mehrsprachigen Inhalte in **Echtzeit** zu verwalten und die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern reibungslos zu gestalten. Inhalte können lokal und/oder remote gespeichert werden.

</Accordion>

<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur den erforderlichen Inhalt. Intlayer hilft **Ihre Bundle- und Ansichtsgrößen um bis zu 50 % zu reduzieren**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-react-native-template) auf GitHub.

Installieren Sie aus Ihrem React Native-Projekt die folgenden Pakete:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> Das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt Ihre Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

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

### Pakete

- **intlayer**  
  Das Kern-i18n-Toolkit für Konfiguration, Wörterbuchinhalte, Typgenerierung und CLI-Befehle.

- **react-native-intlayer**  
  React Native-Integration, die die Kontext-Provider und React-Hooks bereitstellt, die Sie zum Abrufen und Wechseln von Lokalisierungen verwenden, die React Native-Polyfills sowie das Metro-Plugin für die Integration von Intlayer mit dem React Native-Bundler. Alle Exporte aus `react-intlayer` werden erneut exportiert, sodass Sie in einer React Native-App nur dieses eine Paket benötigen.

---

</Step>

<Step number={2} title="Erstellen Sie eine Intlayer-Konfiguration">

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

</Step>

<Step number={3} title="Fügen Sie das Metro-Plugin hinzu">

Metro ist ein Bundler für React Native. Es ist der Standard-Bundler für React Native-Projekte, die mit dem Befehl `react-native init` erstellt wurden. Um Intlayer mit Metro zu verwenden, müssen Sie das Plugin zu Ihrer `metro.config.js`-Datei hinzufügen:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Hinweis: `configMetroIntlayer` ist eine Promise-Funktion. Verwenden Sie stattdessen `configMetroIntlayerSync`, wenn Sie sie synchron verwenden möchten, oder vermeiden Sie IFFE (Immediately Invoked Function Expression).
> Hinweis: `configMetroIntlayerSync` erlaubt es nicht, Intlayer-Wörterbücher beim Serverstart zu erstellen.

</Step>

<Step number={4} title="Fügen Sie den Intlayer-Provider hinzu">

Um die Benutzersprache in Ihrer gesamten Anwendung synchron zu halten, müssen Sie Ihre Root-Komponente mit der `IntlayerProvider`-Komponente aus `react-native-intlayer` umschließen.

> Importieren Sie immer aus `react-native-intlayer`. Dessen `IntlayerProvider` enthält Polyfills für die von Intlayer verwendete Web-API, und das Paket exportiert alle Hooks und Utilities aus `react-intlayer` erneut.

Außerdem müssen Sie die Funktion `intlayerPolyfill` zu Ihrer `index.js`-Datei hinzufügen, um sicherzustellen, dass Intlayer ordnungsgemäß funktioniert.

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

<Step number={5} title="Deklarieren Sie Ihren Inhalt">

Erstellen Sie **Content-Deklarations**-Dateien an beliebiger Stelle in Ihrem Projekt (häufig innerhalb von `src/`), unter Verwendung eines der von Intlayer unterstützten Dateiendungen:

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
- usw.

> **Expo Router (Web): Behalten Sie `.content.*`-Dateien außerhalb des `app/`-Verzeichnisses.** Expo Router behandelt jede JavaScript/TypeScript-Datei innerhalb von `app/` als Route. Im Web scannt die Routen-Erkennung direkt das Dateisystem und **ignoriert** Metros `resolver.blockList`, sodass eine am selben Ort befindliche `*.content.ts` als Route registriert wird. Eine Datei wie `app/(tabs)/_layout.content.ts` wird sogar als Layout geparst (der `.content`-Teil wird als Plattform-Suffix gelesen), was mit der echten `_layout.tsx` kollidiert und folgenden Fehler auslöst:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Platzieren Sie Ihre Deklarationen in einem Verzeichnis außerhalb von `app/` (zum Beispiel `content/` oder `src/content/`). Intlayer entdeckt `.content.*`-Dateien überall im Projekt, und Wörterbücher werden über ihren `key` referenziert, sodass keine Import-Änderungen erforderlich sind. Nativ ist dies nicht erforderlich (Metros `blockList` verbirgt sie bereits), aber die Verwendung eines Verzeichnisses außerhalb von `app/` sorgt dafür, dass beide Plattformen funktionieren.

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

> Für Details zu Inhaltsdeklarationen siehe [Intlayer's Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Verwenden Sie Intlayer in Ihren Komponenten">

Verwenden Sie den `useIntlayer` Hook in untergeordneten Komponenten, um lokalisierten Inhalt zu erhalten.

### Beispiel

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

> Wenn Sie `content.someKey` in stringbasierten Props verwenden (z. B. im `title` eines Buttons oder als `children` einer `Text`-Komponente), **rufen Sie `content.someKey.value` auf**, um den tatsächlichen String zu erhalten.

> Wenn Ihre App bereits existiert, können Sie den [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) sowie den [Extraktionsbefehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) verwenden, um Tausende von Komponenten in einer Sekunde zu transformieren.

---

</Step>

<Step number={7} title="Ändern der App-Sprache" isOptional={true}>

Um die Sprache innerhalb Ihrer Komponenten zu wechseln, können Sie die `setLocale`-Methode des `useLocale`-Hooks verwenden:

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

Dies löst ein erneutes Rendern aller Komponenten aus, die Intlayer-Inhalte verwenden, und zeigt nun Übersetzungen für die neue Sprache an.

> Siehe die [`useLocale`-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md) für weitere Details.

</Step>

</Steps>

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
- **CLI-Befehle**: Erkunden Sie die [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) für Aufgaben wie das **Extrahieren von Übersetzungen** oder das **Überprüfen fehlender Schlüssel**.

Viel Spaß beim Erstellen Ihrer **React Native**-Apps mit voll ausgestatteter i18n durch **Intlayer**!

---

### Debug

React Native kann weniger stabil sein als React Web, daher sollten Sie besonders auf die Versionierung achten.

Intlayer zielt hauptsächlich auf die Web Intl API ab; bei React Native müssen Sie die entsprechenden Polyfills einbinden.

Checkliste:

- Verwenden Sie die neuesten Versionen von `intlayer` und `react-native-intlayer`.
- Aktivieren Sie das Intlayer Polyfill.
- Wenn Sie `getLocaleName` oder andere auf der Intl-API basierende Utilities verwenden, importieren Sie diese Polyfills frühzeitig (zum Beispiel in `index.js` oder `App.tsx`):

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

- Überprüfen Sie Ihre Metro-Konfiguration (Resolver Aliases, Asset Plugins, `tsconfig` Paths), wenn Module nicht aufgelöst werden können.

---
