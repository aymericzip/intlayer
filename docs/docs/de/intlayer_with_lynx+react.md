---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: "Lynx + React i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Lynx + React-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Anfängliche Historie"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Übersetzen Sie Ihre Lynx and React mobile app mit Intlayer | Internationalisierung (i18n)

Siehe [Application Template](https://github.com/aymericzip/intlayer-lynx-template) auf GitHub.

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „react-native-localize“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>

<Accordion header="Vollständige Lynx-Abdeckung">

Intlayer ist für die perfekte Zusammenarbeit mit Lynx und React optimiert, indem es **Content-Scoping auf Komponentenebene**, **TypeScript-Unterstützung** und alle für die Skalierung der Internationalisierung (i18n) erforderlichen Funktionen bietet.

</Accordion>

<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur den erforderlichen Inhalt. Intlayer hilft **Ihre Bundle- und Seitengröße um bis zu 50 % zu reduzieren**.

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

Intlayer ist mehr als nur eine i18n-Lösung. Es bietet einen **selbstgehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, um Ihnen zu helfen Verwalten Sie Ihre mehrsprachigen Inhalte in **Echtzeit** und gestalten Sie die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern reibungslos. Inhalte können lokal und/oder remote gespeichert werden.

</Accordion>
</AccordionGroup>

---

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie aus Ihrem Lynx-Projekt die folgenden Pakete:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bun x intlayer init
```

### Pakete

- **intlayer**  
  Das Kern-i18n-Toolkit für Konfiguration, Wörterbuchinhalte, Typengenerierung und CLI-Befehle.

- **react-intlayer**  
  React-Integration, die die Kontextanbieter und React-Hooks bereitstellt, die Sie in Lynx verwenden, um Locales zu erhalten und zu wechseln.

- **lynx-intlayer**  
  Lynx-Integration, die das Plugin für die Integration von Intlayer mit dem Lynx-Bundler bereitstellt.

---

</Step>

<Step number={2} title="Eine Intlayer-Konfiguration erstellen">

Erstellen Sie in Ihrem Projektstammverzeichnis (oder an einem beliebigen bequemen Ort) eine **Intlayer-Konfigurationsdatei**. Sie könnte so aussehen:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

Innerhalb dieser Konfiguration können Sie:

- Ihre **Liste unterstützter Locales** konfigurieren.
- Ein **Standard-**Locale festlegen.
- Später können Sie erweiterte Optionen hinzufügen (z. B. Protokolle, benutzerdefinierte Inhaltsverzeichnisse usw.).
- Siehe die [Intlayer-Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) für weitere Informationen.

</Step>

<Step number={3} title="Das Intlayer-Plugin zum Lynx-Bundler hinzufügen">

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

</Step>

<Step number={4} title="Den Intlayer-Provider hinzufügen">

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

</Step>

<Step number={5} title="Ihren Inhalt deklarieren">

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

Beispiel:

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
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

````

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
> Für Details zu Inhaltsdeklarationen siehe [Intlayers Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Verwenden Sie Intlayer in Ihren Komponenten">


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
````

> Wenn Sie `content.someKey` in string-basierten Props verwenden (z. B. `title` eines Buttons oder `children` einer `Text`-Komponente), **rufen Sie `content.someKey.value` auf**, um den tatsächlichen String zu erhalten.

---

</Step>

<Step number={7} title="Ändern Sie die App-Sprache" isOptional={true}>

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

> Siehe [`useLocale` Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md) für weitere Details.

</Step>

</Steps>

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

Um zu vermeiden, dass automatisch generierte Dateien von Intlayer in das Repository aufgenommen werden, fügen Sie Folgendes zu Ihrer `.gitignore` hinzu:

```bash
#  Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```

---

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.
  Für weitere Details zur Verwendung der Erweiterung lesen Sie bitte die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

## Weiterführende Schritte

- **Visueller Editor**: Verwenden Sie den [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), um Übersetzungen visuell zu verwalten.
- **CMS-Integration**: Sie können Ihr Wörterbuch auch externisieren und Inhalte aus einem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) abrufen.
- **CLI-Befehle**: Erkunden Sie die [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) für Aufgaben wie **Übersetzungen extrahieren** oder **fehlende Schlüssel überprüfen**.

---
