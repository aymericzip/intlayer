---
docName: intlayer_with_lynx_react
url: /doc/environment/lynx-and-react
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_lynx+react.md
createdAt: 2025-03-09
updatedAt: 2025-03-09
title: Übersetzen Sie Ihre Lynx- und React-Mobile-App (i18n)
description: Entdecken Sie, wie Sie Ihre mit Lynx und React unter Verwendung des Page Router erstellte Website mehrsprachig gestalten können. Befolgen Sie die Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
---

# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer, Lynx und React

[Application Template](https://github.com/aymericzip/intlayer-lynx-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine **innovative, Open-Source-Internationalisierungsbibliothek (i18n)**, die die Unterstützung mehrerer Sprachen in modernen Anwendungen vereinfacht. Es funktioniert in vielen JavaScript/TypeScript-Umgebungen, **einschließlich Lynx** (über das `react-intlayer`-Paket).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen.
- **Inhalte dynamisch lokalisieren**, einschließlich **UI-Strings** (und in React für das Web können auch HTML-Metadaten usw. lokalisiert werden).
- **Von erweiterten Funktionen profitieren**, wie dynamische Lokalerkennung und -umschaltung.

---

## Schritt 1: Abhängigkeiten installieren

Installieren Sie aus Ihrem Lynx-Projekt die folgenden Pakete:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### Pakete

- **intlayer**  
  Das Kern-i18n-Toolkit für Konfiguration, Wörterbuchinhalte, Typengenerierung und CLI-Befehle.

- **react-intlayer**  
  React-Integration, die die Kontextanbieter und React-Hooks bereitstellt, die Sie in Lynx verwenden, um Locales zu erhalten und zu wechseln.

- **lynx-intlayer**  
  Lynx-Integration, die das Plugin für die Integration von Intlayer mit dem Lynx-Bundler bereitstellt.

---

## Schritt 2: Eine Intlayer-Konfiguration erstellen

Erstellen Sie in Ihrem Projektstammverzeichnis (oder an einem beliebigen bequemen Ort) eine **Intlayer-Konfigurationsdatei**. Sie könnte so aussehen:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Fügen Sie alle weiteren benötigten Locales hinzu
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
      // ... Fügen Sie alle weiteren benötigten Locales hinzu
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

- Ihre **Liste unterstützter Locales** konfigurieren.
- Ein **Standard-**Locale festlegen.
- Später können Sie erweiterte Optionen hinzufügen (z. B. Protokolle, benutzerdefinierte Inhaltsverzeichnisse usw.).
- Siehe die [Intlayer-Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) für weitere Informationen.

## Schritt 3: Das Intlayer-Plugin zum Lynx-Bundler hinzufügen

Um Intlayer mit Lynx zu verwenden, müssen Sie das Plugin zu Ihrer `lynx.config.ts`-Datei hinzufügen:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... andere Plugins
    pluginIntlayerLynx(),
  ],
});
```

## Schritt 4: Den Intlayer-Provider hinzufügen

Um die Benutzersprache in Ihrer Anwendung synchronisiert zu halten, müssen Sie Ihre Root-Komponente mit der `IntlayerProvider`-Komponente aus `react-intlayer` umschließen.

Außerdem müssen Sie die Datei `intlayerPolyfill` hinzufügen, um sicherzustellen, dass Intlayer ordnungsgemäß funktioniert.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## Schritt 5: Ihren Inhalt deklarieren

Erstellen Sie **Inhaltsdeklarationsdateien** an beliebiger Stelle in Ihrem Projekt (häufig innerhalb von `src/`), indem Sie eines der von Intlayer unterstützten Erweiterungsformate verwenden:

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

Beispiel (TypeScript mit TSX-Knoten für Lynx):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      de: "auf Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      de: "Tippen Sie auf das Logo und haben Sie Spaß!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        de: "Bearbeiten",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        de: "um Aktualisierungen zu sehen!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      de: "auf Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      de: "Tippen Sie auf das Logo und haben Sie Spaß!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        de: "Bearbeiten",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        de: "um Aktualisierungen zu sehen!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      de: "auf Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      de: "Tippen Sie auf das Logo und haben Sie Spaß!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        de: "Bearbeiten",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        de: "um Aktualisierungen zu sehen!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "de": "auf Lynx",
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "de": "Tippen Sie auf das Logo und haben Sie Spaß!",
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "de": "Bearbeiten",
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "de": "um Updates zu sehen!",
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> Für Details zu Inhaltsdeklarationen siehe [Intlayers Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

---

## Schritt 4: Verwenden Sie Intlayer in Ihren Komponenten

Verwenden Sie den `useIntlayer` Hook in untergeordneten Komponenten, um lokalisierte Inhalte zu erhalten.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    // nur Hintergrund
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Wenn Sie `content.someKey` in string-basierten Props verwenden (z. B. `title` eines Buttons oder `children` einer `Text`-Komponente), **rufen Sie `content.someKey.value` auf**, um den tatsächlichen String zu erhalten.

---

## (Optional) Schritt 5: Ändern Sie die App-Sprache

Um die Sprache innerhalb Ihrer Komponenten zu wechseln, können Sie die `setLocale`-Methode des `useLocale` Hooks verwenden:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Dies löst ein erneutes Rendern aller Komponenten aus, die Intlayer-Inhalte verwenden, und zeigt nun Übersetzungen für die neue Sprache an.

> Siehe [`useLocale` Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md) für weitere Details.

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
- **Typprüfung**, die warnt, wenn Sie auf einen nicht existierenden Schlüssel zugreifen oder den Typ nicht übereinstimmen.

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
- **CMS-Integration**: Sie können Ihr Wörterbuch auch externisieren und Inhalte aus einem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) abrufen.
- **CLI-Befehle**: Erkunden Sie die [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) für Aufgaben wie **Übersetzungen extrahieren** oder **fehlende Schlüssel überprüfen**.
