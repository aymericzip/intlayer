---
createdAt: 2024-08-14
updatedAt: 2025-08-20
title: Interesse an Intlayer
description: Entdecken Sie die Vorteile und Nutzen der Verwendung von Intlayer in Ihren Projekten. Verstehen Sie, warum Intlayer sich unter anderen Frameworks hervorhebt.
keywords:
  - Vorteile
  - Nutzen
  - Intlayer
  - Framework
  - Vergleich
slugs:
  - doc
  - why
history:
  - version: 5.8.0
    date: 2025-08-19
    changes: Aktualisierung Vergleichstabelle
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# Warum sollten Sie Intlayer in Betracht ziehen?

## Was ist Intlayer?

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihres Inhalts überall in Ihrem Code. Sie wandelt Deklarationen mehrsprachiger Inhalte in strukturierte Wörterbücher um, um sie einfach in Ihren Code zu integrieren. Durch die Verwendung von TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

## Warum wurde Intlayer erstellt?

Intlayer wurde entwickelt, um ein häufiges Problem zu lösen, das alle gängigen i18n-Bibliotheken wie `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` und `vue-i18n` betrifft.

Alle diese Lösungen verfolgen einen zentralisierten Ansatz, um Ihre Inhalte aufzulisten und zu verwalten. Zum Beispiel:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Oder hier mit Namespaces:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Diese Art von Architektur verlangsamt den Entwicklungsprozess und macht den Codebestand aus mehreren Gründen komplexer zu warten:

1. **Für jede neu erstellte Komponente sollten Sie:**
   - Die neue Ressource/den neuen Namespace im Ordner `locales` anlegen
   - Daran denken, den neuen Namespace in Ihrer Seite zu importieren
   - Ihre Inhalte übersetzen (oft manuell durch Kopieren/Einfügen von KI-Anbietern)

2. **Für jede Änderung an Ihren Komponenten sollten Sie:**
   - Nach der zugehörigen Ressource/dem Namespace suchen (weit entfernt von der Komponente)
   - Ihre Inhalte übersetzen
   - Sicherstellen, dass Ihre Inhalte für jede Locale aktuell sind
   - Überprüfen, dass Ihr Namespace keine ungenutzten Schlüssel/Werte enthält
   - Sicherstellen, dass die Struktur Ihrer JSON-Dateien für alle Locales gleich ist

Bei professionellen Projekten, die diese Lösungen verwenden, werden häufig Lokalisierungsplattformen eingesetzt, um die Übersetzung Ihrer Inhalte zu verwalten. Dies kann jedoch bei großen Projekten schnell kostspielig werden.

Um dieses Problem zu lösen, verfolgt Intlayer einen Ansatz, bei dem Ihre Inhalte pro Komponente abgegrenzt und nahe bei Ihrer Komponente gehalten werden, ähnlich wie wir es oft mit CSS (`styled-components`), Typen, Dokumentation (`storybook`) oder Unit-Tests (`jest`) tun.

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Übersetzungsinhalt für die Komponente
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Dieser Ansatz ermöglicht es Ihnen:

1. **Die Entwicklungsgeschwindigkeit zu erhöhen**
   - `.content.{{ts|mjs|cjs|json}}` Dateien können mit einer VSCode-Erweiterung erstellt werden
   - Autovervollständigungs-KI-Tools in Ihrer IDE (wie GitHub Copilot) können Ihnen helfen, Ihren Inhalt zu deklarieren, wodurch Copy/Paste reduziert wird

2. **Reduzieren Sie die Komplexität Ihres Codebestands**

3. **Erhöhen Sie die Wartbarkeit Ihres Codebestands**

4. **Duplizieren Sie Ihre Komponenten und deren zugehörigen Inhalte einfacher (Beispiel: Login/Register-Komponenten usw.)**
   - Indem Sie das Risiko minimieren, den Inhalt anderer Komponenten zu beeinflussen
   - Indem Sie Ihre Inhalte von einer Anwendung in eine andere ohne externe Abhängigkeiten kopieren/einfügen

5. **Vermeiden Sie es, Ihren Codebestand mit ungenutzten Schlüsseln/Werten für ungenutzte Komponenten zu verschmutzen**
   - Wenn Sie eine Komponente nicht verwenden, müssen Sie deren Inhalt nicht importieren
   - Wenn Sie eine Komponente löschen, erinnern Sie sich leichter daran, den zugehörigen Inhalt zu entfernen, da dieser im selben Ordner vorhanden ist

6. **Reduzieren Sie die Denkaufwand für KI-Agenten, um Ihre mehrsprachigen Inhalte zu deklarieren**
   - Der KI-Agent muss nicht Ihren gesamten Codebestand durchsuchen, um zu wissen, wo Ihr Inhalt implementiert werden soll
   - Übersetzungen können einfach mit Autovervollständigungs-KI-Tools in Ihrer IDE (wie GitHub Copilot) durchgeführt werden

7. **Optimieren Sie die Ladeleistung**
   - Wenn eine Komponente lazy geladen wird, wird ihr zugehöriger Inhalt gleichzeitig geladen

## Zusätzliche Funktionen von Intlayer

| Funktion                                                                                                                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Framework-übergreifende Unterstützung**<br><br>Intlayer ist kompatibel mit allen wichtigen Frameworks und Bibliotheken, einschließlich Next.js, React, Vite, Vue.js, Nuxt, Preact, Express und mehr.                                                                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true)       | **JavaScript-gesteuertes Content-Management**<br><br>Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten. <br><br> - [Inhaltsdeklaration](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Pro-Lokale Inhaltsdeklarationsdatei**<br><br>Beschleunigen Sie Ihre Entwicklung, indem Sie Ihre Inhalte einmalig deklarieren, bevor die automatische Generierung erfolgt.<br><br> - [Pro-Lokale Inhaltsdeklarationsdatei](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Typsicheres Umfeld**<br><br>Nutzen Sie TypeScript, um sicherzustellen, dass Ihre Inhaltsdefinitionen und Ihr Code fehlerfrei sind, und profitieren Sie gleichzeitig von der Autovervollständigung in der IDE.<br><br> - [TypeScript-Konfiguration](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Vereinfachte Einrichtung**<br><br>Starten Sie schnell mit minimaler Konfiguration. Passen Sie Einstellungen für Internationalisierung, Routing, KI, Build und Inhaltsverwaltung mühelos an.<br><br> - [Next.js-Integration erkunden](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Vereinfachte Inhaltsabfrage**<br><br>Sie müssen Ihre `t`-Funktion nicht für jeden einzelnen Inhalt aufrufen. Rufen Sie alle Ihre Inhalte direkt mit einem einzigen Hook ab.<br><br> - [React-Integration](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Konsistente Implementierung von Server-Komponenten**<br><br>Perfekt geeignet für Next.js Server-Komponenten, verwenden Sie dieselbe Implementierung sowohl für Client- als auch für Server-Komponenten, ohne Ihre `t`-Funktion an jede Server-Komponente weitergeben zu müssen. <br><br> - [Server-Komponenten](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Organisierte Codebasis**<br><br>Halten Sie Ihre Codebasis besser organisiert: 1 Komponente = 1 Wörterbuch im selben Ordner. Übersetzungen, die nahe bei ihren jeweiligen Komponenten liegen, verbessern die Wartbarkeit und Klarheit. <br><br> - [Wie Intlayer funktioniert](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Erweitertes Routing**<br><br>Volle Unterstützung des App-Routings, die sich nahtlos an komplexe Anwendungsstrukturen anpasst, für Next.js, React, Vite, Vue.js usw.<br><br> - [Next.js-Integration erkunden](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown-Unterstützung**<br><br>Importieren und interpretieren Sie Lokalisierungsdateien und entfernte Markdown-Dateien für mehrsprachige Inhalte wie Datenschutzrichtlinien, Dokumentationen usw. Interpretieren Sie Markdown-Metadaten und machen Sie sie in Ihrem Code zugänglich.<br><br> - [Inhaltsdateien](https://intlayer.org/doc/concept/content/file)                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Kostenloser visueller Editor & CMS**<br><br>Ein kostenloser visueller Editor und CMS stehen Content-Autoren zur Verfügung, wodurch keine Lokalisierungsplattform mehr benötigt wird. Halten Sie Ihre Inhalte mit Git synchronisiert oder externalisieren Sie sie ganz oder teilweise mit dem CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable Inhalte**<br><br>Tree-shakable Inhalte, die die Größe des finalen Bundles reduzieren. Lädt Inhalte pro Komponente und schließt ungenutzte Inhalte aus Ihrem Bundle aus. Unterstützt Lazy Loading, um die Ladeeffizienz der App zu verbessern. <br><br> - [App-Build-Optimierung](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Statisches Rendering**<br><br>Blockiert das statische Rendering nicht. <br><br> - [Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **KI-gestützte Übersetzung**<br><br>Verwandeln Sie Ihre Website mit nur einem Klick in 231 Sprachen mithilfe der fortschrittlichen KI-gestützten Übersetzungswerkzeuge von Intlayer unter Verwendung Ihres eigenen KI-Anbieters/API-Schlüssels. <br><br> - [CI/CD-Integration](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Automatisches Ausfüllen](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP-Server-Integration**<br><br>Stellt einen MCP (Model Context Protocol) Server für IDE-Automatisierung bereit, der nahtloses Content-Management und i18n-Workflows direkt in Ihrer Entwicklungsumgebung ermöglicht. <br><br> - [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode-Erweiterung**<br><br>Intlayer bietet eine VSCode-Erweiterung, die Ihnen hilft, Ihre Inhalte und Übersetzungen zu verwalten, Ihre Wörterbücher zu erstellen, Ihre Inhalte zu übersetzen und mehr. <br><br> - [VSCode-Erweiterung](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilität**<br><br>Ermöglicht die Interoperabilität mit react-i18next, next-i18next, next-intl und react-intl. <br><br> - [Intlayer und react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer und next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer und next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                                   |

## Vergleich von Intlayer mit anderen Lösungen

| Funktion                                           | Intlayer                                                                                                                                   | React-i18next / i18next                                                         | React-Intl (FormatJS)                                   | LinguiJS                                                | next-intl                                               | next-i18next                                            | vue-i18n                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| **Übersetzungen in der Nähe der Komponenten**      | Ja, Inhalte sind mit jeder Komponente zusammengefasst                                                                                      | Nein                                                                            | Nein                                                    | Nein                                                    | Nein                                                    | Nein                                                    | Ja - Verwendung von `Single File Components` (SFCs)                |
| **TypeScript-Integration**                         | Fortgeschritten, automatisch generierte strenge Typen                                                                                      | Grundlegend; zusätzliche Konfiguration für Sicherheit                           | Gut, aber weniger strikt                                | Typen, benötigt Konfiguration                           | Gut                                                     | Grundlegend                                             | Gut (Typen verfügbar; Schlüssel-Sicherheit benötigt Einrichtung)   |
| **Fehlende Übersetzungs-Erkennung**                | Fehler/Warnung zur Build-Zeit                                                                                                              | Meist Fallback-Strings zur Laufzeit                                             | Fallback-Strings                                        | Benötigt zusätzliche Konfiguration                      | Laufzeit-Fallback                                       | Laufzeit-Fallback                                       | Laufzeit-Fallback/Warnungen (konfigurierbar)                       |
| **Reicher Inhalt (JSX/Markdown/Komponenten)**      | Direkte Unterstützung, sogar React-Knoten                                                                                                  | Eingeschränkt / nur Interpolation                                               | ICU-Syntax, kein echtes JSX                             | Eingeschränkt                                           | Nicht für reiche Knoten ausgelegt                       | Eingeschränkt                                           | Eingeschränkt (Komponenten über `<i18n-t>`, Markdown über Plugins) |
| **KI-gestützte Übersetzung**                       | Ja, unterstützt mehrere KI-Anbieter. Nutzbar mit eigenen API-Schlüsseln. Berücksichtigt den Kontext Ihrer Anwendung und des Inhaltsumfangs | Nein                                                                            | Nein                                                    | Nein                                                    | Nein                                                    | Nein                                                    | Nein                                                               |
| **Visueller Editor**                               | Ja, lokaler visueller Editor + optionales CMS; kann Codebasis-Inhalte auslagern; einbettbar                                                | Nein / verfügbar über externe Lokalisierungsplattformen                         | Nein / verfügbar über externe Lokalisierungsplattformen | Nein / verfügbar über externe Lokalisierungsplattformen | Nein / verfügbar über externe Lokalisierungsplattformen | Nein / verfügbar über externe Lokalisierungsplattformen | Nein / verfügbar über externe Lokalisierungsplattformen            |
| **Lokalisierte Routenführung**                     | Eingebaut, Middleware-Unterstützung                                                                                                        | Plugins oder manuelle Konfiguration                                             | Nicht eingebaut                                         | Plugin/manuelle Konfiguration                           | Eingebaut                                               | Eingebaut                                               | Manuell über Vue Router (wird von Nuxt i18n verwaltet)             |
| **Dynamische Routen-Generierung**                  | Ja                                                                                                                                         | Plugin/Ökosystem oder manuelle Einrichtung                                      | Nicht bereitgestellt                                    | Plugin/manuell                                          | Ja                                                      | Ja                                                      | Nicht bereitgestellt (wird von Nuxt i18n bereitgestellt)           |
| **Pluralisierung**                                 | Aufzählungsbasierte Muster; siehe Dokumentation                                                                                            | Konfigurierbar (Plugins wie i18next-icu)                                        | Fortgeschritten (ICU)                                   | Fortgeschritten (ICU/messageformat)                     | Gut                                                     | Gut                                                     | Fortgeschritten (eingebaute Pluralregeln)                          |
| **Formatierung (Daten, Zahlen, Währungen)**        | Optimierte Formatierer (Intl im Hintergrund)                                                                                               | Über Plugins oder benutzerdefinierte Intl-Nutzung                               | Erweiterte ICU-Formatierer                              | ICU/CLI-Helfer                                          | Gut (Intl-Helfer)                                       | Gut (Intl-Helfer)                                       | Eingebaute Datums-/Zahlenformatierer (Intl)                        |
| **Inhaltsformat**                                  | .tsx, .ts, .js, .json, .md, .txt                                                                                                           | .json                                                                           | .json, .js                                              | .po, .json                                              | .json, .js, .ts                                         | .json                                                   | .json, .js                                                         |
| **ICU-Unterstützung**                              | In Arbeit (native ICU)                                                                                                                     | Über Plugin (i18next-icu)                                                       | Ja                                                      | Ja                                                      | Ja                                                      | Über Plugin (i18next-icu)                               | Über benutzerdefinierten Formatter/Compiler                        |
| **SEO-Helfer (hreflang, Sitemap)**                 | Eingebaute Werkzeuge: Helfer für Sitemap, **robots.txt**, Metadaten                                                                        | Community-Plugins/Manuell                                                       | Nicht Kernfunktion                                      | Nicht Kernfunktion                                      | Gut                                                     | Gut                                                     | Nicht Kernfunktion (Nuxt i18n stellt Helfer bereit)                |
| **Ökosystem / Gemeinschaft**                       | Klein, aber schnell wachsend und reaktiv                                                                                                   | Größte und am weitesten entwickelte                                             | Groß, unternehmensorientiert                            | Wachsend, kleiner                                       | Mittelgroß, Next.js-fokussiert                          | Mittelgroß, Next.js-fokussiert                          | Groß im Vue-Ökosystem                                              |
| **Server-seitiges Rendering & Server-Komponenten** | Ja, optimiert für SSR / React Server-Komponenten                                                                                           | Unterstützt, einige Konfiguration erforderlich                                  | Unterstützt in Next.js                                  | Unterstützt                                             | Volle Unterstützung                                     | Volle Unterstützung                                     | SSR über Nuxt/Vue SSR (kein RSC)                                   |
| **Tree-shaking (nur verwendete Inhalte laden)**    | Ja, pro Komponente zur Build-Zeit über Babel/SWC-Plugins                                                                                   | Lädt normalerweise alles (kann mit Namespaces/Code-Splitting verbessert werden) | Lädt normalerweise alles                                | Nicht standardmäßig                                     | Teilweise                                               | Teilweise                                               | Teilweise (mit Code-Splitting/manuellem Setup)                     |
| **Lazy Loading**                                   | Ja, pro Locale/pro Komponente                                                                                                              | Ja (z.B. Backends/Namespaces bei Bedarf)                                        | Ja (aufgeteilte Locale-Bündel)                          | Ja (dynamische Katalogimporte)                          | Ja (pro Route/pro Locale)                               | Ja (pro Route/pro Locale)                               | Ja (asynchrone Locale-Nachrichten)                                 |
| **Verwaltung großer Projekte**                     | Fördert Modularität, geeignet für Design-Systeme                                                                                           | Benötigt gute Dateidisziplin                                                    | Zentrale Kataloge können groß werden                    | Kann komplex werden                                     | Modular mit Setup                                       | Modular mit Setup                                       | Modular mit Vue Router/Nuxt i18n Setup                             |
