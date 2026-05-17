---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Interesse an Intlayer
description: Entdecken Sie die Vorteile und Vorzüge der Verwendung von Intlayer in Ihren Projekten. Verstehen Sie, warum Intlayer sich von anderen Frameworks abhebt.
keywords:
  - Vorteile
  - Vorzüge
  - Intlayer
  - Framework
  - Vergleich
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "Compiler-Veröffentlichung"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Vergleichstabelle aktualisiert"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initialer Verlauf"
---

# Warum sollten Sie Intlayer in Betracht ziehen?

## Was ist Intlayer?

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht es, Ihre Inhalte überall in Ihrem Code zu deklarieren. Sie wandelt Deklarationen von mehrsprachigen Inhalten in strukturierte Wörterbücher um, die sich leicht in Ihren Code integrieren lassen. Durch die Verwendung von TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

## Warum wurde Intlayer erstellt?

Intlayer wurde entwickelt, um ein häufiges Problem zu lösen, das alle gängigen i18n-Bibliotheken wie `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` und `vue-i18n` betrifft.

Alle diese Lösungen verfolgen einen zentralisierten Ansatz zur Auflistung und Verwaltung Ihrer Inhalte. Zum Beispiel:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Oder hier unter Verwendung von Namespaces:

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

Diese Art von Architektur verlangsamt den Entwicklungsprozess und macht die Codebasis aus mehreren Gründen komplexer in der Wartung:

1. **Für jede neu erstellte Komponente sollten Sie:**
   - Die neue Ressource/den neuen Namespace im Ordner `locales` erstellen
   - Daran denken, den neuen Namespace in Ihre Seite zu importieren
   - Ihren Inhalt übersetzen (oft manuell durch Kopieren/Einfügen von KI-Anbietern)

2. **Für jede Änderung an Ihren Komponenten sollten Sie:**
   - Die zugehörige Ressource/den zugehörigen Namespace suchen (weit entfernt von der Komponente)
   - Ihren Inhalt übersetzen
   - Sicherstellen, dass Ihr Inhalt für jede Locale auf dem neuesten Stand ist
   - Überprüfen, ob Ihr Namespace keine ungenutzten Schlüssel/Werte enthält
   - Sicherstellen, dass die Struktur Ihrer JSON-Dateien für alle Locales identisch ist

Bei professionellen Projekten, die diese Lösungen verwenden, werden häufig Lokalisierungsplattformen eingesetzt, um die Übersetzung Ihrer Inhalte zu verwalten. Dies kann jedoch bei großen Projekten schnell kostspielig werden.

Um dieses Problem zu lösen, verfolgt Intlayer einen Ansatz, bei dem Ihre Inhalte pro Komponente definiert werden und nah an Ihrer Komponente bleiben, so wie wir es oft mit CSS (`styled-components`), Typen, Dokumentation (`storybook`) oder Unit-Tests (`jest`) machen.

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

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Dieser Ansatz ermöglicht es Ihnen:

1. **Die Entwicklungsgeschwindigkeit zu erhöhen**
   - `.content.{{ts|mjs|cjs|json}}` Dateien können mit einer VSCode-Erweiterung erstellt werden
   - KI-Tools zur Autovervollständigung in Ihrer IDE (wie GitHub Copilot) können Ihnen helfen, Ihre Inhalte zu deklarieren, was das Kopieren/Einfügen reduziert

2. **Ihre Codebasis zu bereinigen**
   - Die Komplexität zu reduzieren
   - Die Wartbarkeit zu erhöhen

3. **Ihre Komponenten und die zugehörigen Inhalte einfacher zu duplizieren (Beispiel: Login/Register-Komponenten usw.)**
   - Indem das Risiko verringert wird, die Inhalte anderer Komponenten zu beeinträchtigen
   - Indem Sie Ihre Inhalte ohne externe Abhängigkeiten von einer Anwendung in eine andere kopieren/einfügen

4. **Vermeiden Sie es, Ihre Codebasis mit ungenutzten Schlüsseln/Werten für nicht genutzte Komponenten zu belasten**
   - Wenn Sie eine Komponente nicht verwenden, importiert Intlayer die zugehörigen Inhalte nicht
   - Wenn Sie eine Komponente löschen, werden Sie sich leichter daran erinnern, die zugehörigen Inhalte zu entfernen, da sie sich im selben Ordner befinden

5. **Reduzieren Sie die kognitiven Kosten für KI-Agenten bei der Deklaration Ihrer mehrsprachigen Inhalte**
   - Der KI-Agent muss nicht Ihre gesamte Codebasis scannen, um zu wissen, wo er Ihre Inhalte implementieren muss
   - Übersetzungen können einfach durch KI-Tools zur Autovervollständigung in Ihrer IDE (wie GitHub Copilot) erstellt werden

6. **Optimieren Sie die Ladeleistung**
   - Wenn eine Komponente per Lazy-Loading geladen wird, werden die zugehörigen Inhalte gleichzeitig geladen

## Zusätzliche Funktionen von Intlayer

| Funktion                                                                                                                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Framework-übergreifende Unterstützung**<br><br>Intlayer ist mit allen gängigen Frameworks und Bibliotheken kompatibel, einschließlich Next.js, React, Vite, Vue.js, Nuxt, Preact, Express und mehr.                                                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript-gestütztes Inhaltsmanagement**<br><br>Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten. <br><br> - [Inhaltsdeklaration](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **Compiler**<br><br>Der Intlayer-Compiler extrahiert automatisch den Inhalt aus den Komponenten und generiert die Wörterbuchdateien.<br><br> - [Compiler](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Inhaltsdeklarationsdatei pro Locale**<br><br>Beschleunigen Sie Ihre Entwicklung, indem Sie Ihre Inhalte einmal deklarieren, bevor sie automatisch generiert werden.<br><br> - [Inhaltsdeklarationsdatei pro Locale](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Typsichere Umgebung**<br><br>Nutzen Sie TypeScript, um sicherzustellen, dass Ihre Inhaltsdefinitionen und Ihr Code fehlerfrei sind, und profitieren Sie gleichzeitig von der IDE-Autovervollständigung.<br><br> - [TypeScript-Konfiguration](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Vereinfachtes Setup**<br><br>Starten Sie schnell mit minimaler Konfiguration. Passen Sie Einstellungen für Internationalisierung, Routing, KI, Build und Inhaltsverwaltung mühelos an. <br><br> - [Erkunden Sie die Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Vereinfachter Inhaltsabruf**<br><br>Sie müssen Ihre `t`-Funktion nicht für jedes Inhaltselement aufrufen. Rufen Sie alle Ihre Inhalte direkt mit einem einzigen Hook ab.<br><br> - [React-Integration](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Konsistente Implementierung von Server-Komponenten**<br><br>Perfekt geeignet für Next.js-Server-Komponenten. Verwenden Sie dieselbe Implementierung sowohl für Client- als auch für Server-Komponenten; es ist nicht erforderlich, Ihre `t`-Funktion an jede Server-Komponente weiterzugeben. <br><br> - [Server-Komponenten](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Organisierte Codebasis**<br><br>Halten Sie Ihre Codebasis organisierter: 1 Komponente = 1 Wörterbuch im selben Ordner. Übersetzungen in der Nähe ihrer jeweiligen Komponenten verbessern die Wartbarkeit und Klarheit. <br><br> - [Wie Intlayer funktioniert](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Erweitertes Routing**<br><br>Volle Unterstützung für App-Routing, das sich nahtlos an komplexe Anwendungsstrukturen anpasst, für Next.js, React, Vite, Vue.js usw.<br><br> - [Erkunden Sie die Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown-Unterstützung**<br><br>Importieren und interpretieren Sie Locale-Dateien und Remote-Markdown für mehrsprachige Inhalte wie Datenschutzrichtlinien, Dokumentationen usw. Interpretieren Sie Markdown-Metadaten und machen Sie sie in Ihrem Code zugänglich.<br><br> - [Inhaltsdateien](https://intlayer.org/doc/concept/content/file)                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Kostenloser visueller Editor & CMS**<br><br>Ein kostenloser visueller Editor und ein CMS stehen für Content-Autoren zur Verfügung, wodurch eine Lokalisierungsplattform überflüssig wird. Halten Sie Ihre Inhalte mit Git synchron oder externalisieren Sie sie ganz oder teilweise mit dem CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable Inhalt**<br><br>Tree-shakable Inhalt, der die Größe des endgültigen Bundles reduziert. Lädt Inhalte pro Komponente und schließt ungenutzte Inhalte aus Ihrem Bundle aus. Unterstützt Lazy Loading, um die Ladeeffizienz der App zu verbessern. <br><br> - [Optimierung des App-Builds](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Statisches Rendering**<br><br>Blockiert statisches Rendering nicht. <br><br> - [Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **KI-gestützte Übersetzung**<br><br>Verwandeln Sie Ihre Website mit nur einem Klick in 231 Sprachen mithilfe der fortschrittlichen KI-gestützten Übersetzungstools von Intlayer unter Verwendung Ihres eigenen KI-Anbieters/API-Schlüssels. <br><br> - [CI/CD-Integration](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Auto fill](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP-Server-Integration**<br><br>Bietet einen MCP-Server (Model Context Protocol) für die IDE-Automatisierung, der eine nahtlose Inhaltsverwaltung und i18n-Workflows direkt in Ihrer Entwicklungsumgebung ermöglicht. <br><br> - [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/de/mcp_server.md)                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode-Erweiterung**<br><br>Intlayer bietet eine VSCode-Erweiterung, die Ihnen hilft, Ihre Inhalte und Übersetzungen zu verwalten, Ihre Wörterbücher zu erstellen, Ihre Inhalte zu übersetzen und vieles mehr. <br><br> - [VSCode-Erweiterung](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilität**<br><br>Ermöglicht die Interoperabilität mit react-i18next, next-i18next, next-intl und react-intl. <br><br> - [Intlayer und react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer und next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer und next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                 |
| Testen fehlender Übersetzungen (CLI/CI)                                                                                   | ✅ CLI: npx intlayer content test (CI-freundliches Audit)                                                                                                                                                                                                                                                                                                                                                                                     |

## Vergleich von Intlayer mit anderen Lösungen

| Funktion                                            | `intlayer`                                                                                                                                         | `react-i18next`                                                                                                     | `react-intl` (FormatJS)                                                                                                                    | `lingui`                                                            | `next-intl`                                                                                                         | `next-i18next`                                                                                                      | `vue-i18n`                                                            |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Übersetzungen in der Nähe von Komponenten**       | ✅ Ja, Inhalt bei jeder Komponente angesiedelt                                                                                                     | ❌ Nein                                                                                                             | ❌ Nein                                                                                                                                    | ❌ Nein                                                             | ❌ Nein                                                                                                             | ❌ Nein                                                                                                             | ✅ Ja – unter Verwendung von `Single File Components` (SFCs)          |
| **TypeScript-Integration**                          | ✅ Fortgeschritten, automatisch generierte strikte Typen                                                                                           | ⚠️ Grundlegend; zusätzliche Konfiguration für Sicherheit                                                            | ✅ Gut, aber weniger strikt                                                                                                                | ⚠️ Typisierungen, benötigt Konfiguration                            | ✅ Gut                                                                                                              | ⚠️ Grundlegend                                                                                                      | ✅ Gut (Typen verfügbar; Schlüsselsicherheit benötigt Setup)          |
| **Erkennung fehlender Übersetzungen**               | ✅ TypeScript-Fehlerhervorhebung und Build-Zeit-Fehler/-Warnung                                                                                    | ⚠️ Meistens Fallback-Strings zur Laufzeit                                                                           | ⚠️ Fallback-Strings                                                                                                                        | ⚠️ Benötigt zusätzliche Konfiguration                               | ⚠️ Laufzeit-Fallback                                                                                                | ⚠️ Laufzeit-Fallback                                                                                                | ⚠️ Laufzeit-Fallback/-Warnungen (konfigurierbar)                      |
| **Reichhaltiger Inhalt (JSX/Markdown/Komponenten)** | ✅ Direkte Unterstützung                                                                                                                           | ⚠️ Eingeschränkt / nur Interpolation                                                                                | ⚠️ ICU-Syntax, kein echtes JSX                                                                                                             | ⚠️ Eingeschränkt                                                    | ❌ Nicht für reichhaltige Knoten konzipiert                                                                         | ⚠️ Eingeschränkt                                                                                                    | ⚠️ Eingeschränkt (Komponenten über `<i18n-t>`, Markdown über Plugins) |
| **KI-gestützte Übersetzung**                        | ✅ Ja, unterstützt mehrere KI-Anbieter. Nutzbar mit Ihren eigenen API-Schlüsseln. Berücksichtigt den Kontext Ihrer Anwendung und den Inhaltsumfang | ❌ Nein                                                                                                             | ❌ Nein                                                                                                                                    | ❌ Nein                                                             | ❌ Nein                                                                                                             | ❌ Nein                                                                                                             | ❌ Nein                                                               |
| **Visueller Editor**                                | ✅ Ja, lokaler visueller Editor + optionales CMS; kann Codebasis-Inhalte externalisieren; einbettbar                                               | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                                                          | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                                                                                 | ❌ Nein / über externe Lokalisierungsplattformen verfügbar          | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                                                          | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                                                          | ❌ Nein / über externe Lokalisierungsplattformen verfügbar            |
| **Lokalisiertes Routing**                           | ✅ Ja, unterstützt lokalisierte Pfade out-of-the-box (funktioniert mit Next.js & Vite)                                                             | ⚠️ Kein integriertes, erfordert Plugins (z. B. `next-i18next`) oder benutzerdefinierte Router-Konfiguration         | ❌ Nein, nur Nachrichtenformatierung, Routing muss manuell erfolgen                                                                        | ⚠️ Kein integriertes, erfordert Plugins oder manuelle Konfiguration | ✅ Integriert, App Router unterstützt `[locale]`-Segment                                                            | ✅ Integriert                                                                                                       | ✅ Integriert                                                         |
| **Dynamische Routengenerierung**                    | ✅ Ja                                                                                                                                              | ⚠️ Plugin/Ökosystem oder manuelles Setup                                                                            | ❌ Nicht bereitgestellt                                                                                                                    | ⚠️ Plugin/manuell                                                   | ✅ Ja                                                                                                               | ✅ Ja                                                                                                               | ❌ Nicht bereitgestellt (Nuxt i18n bietet dies)                       |
| **Pluralisierung**                                  | ✅ Aufzählungsbasierte Muster                                                                                                                      | ✅ Konfigurierbar (Plugins wie i18next-icu)                                                                         | ✅ (ICU)                                                                                                                                   | ✅ (ICU/messageformat)                                              | ✅ Gut                                                                                                              | ✅ Gut                                                                                                              | ✅ Integrierte Pluralregeln                                           |
| **Formatierung (Daten, Zahlen, Währungen)**         | ✅ Optimierte Formatierer (Intl unter der Haube)                                                                                                   | ⚠️ Über Plugins oder benutzerdefinierte Intl-Verwendung                                                             | ✅ ICU-Formatierer                                                                                                                         | ✅ ICU/CLI-Helfer                                                   | ✅ Gut (Intl-Helfer)                                                                                                | ✅ Gut (Intl-Helfer)                                                                                                | ✅ Integrierte Datums-/Zahlenformatierer (Intl)                       |
| **Inhaltsformat**                                   | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                   | ⚠️ .json                                                                                                            | ✅ .json, .js                                                                                                                              | ⚠️ .po, .json                                                       | ✅ .json, .js, .ts                                                                                                  | ⚠️ .json                                                                                                            | ✅ .json, .js                                                         |
| **ICU-Unterstützung**                               | ⚠️ WIP                                                                                                                                             | ⚠️ Über Plugin (i18next-icu)                                                                                        | ✅ Ja                                                                                                                                      | ✅ Ja                                                               | ✅ Ja                                                                                                               | ⚠️ Über Plugin (`i18next-icu`)                                                                                      | ⚠️ Über benutzerdefinierten Formatierer/Compiler                      |
| **SEO-Helfer (hreflang, sitemap)**                  | ✅ Integrierte Tools: Helfer für sitemap, robots.txt, Metadaten                                                                                    | ⚠️ Community-Plugins/manuell                                                                                        | ❌ Nicht im Kern                                                                                                                           | ❌ Nicht im Kern                                                    | ✅ Gut                                                                                                              | ✅ Gut                                                                                                              | ❌ Nicht im Kern (Nuxt i18n bietet Helfer)                            |
| **Ökosystem / Community**                           | ⚠️ Kleiner, aber wächst schnell und reaktiv                                                                                                        | ✅ Größte und ausgereifte                                                                                           | ✅ Groß                                                                                                                                    | ⚠️ Kleiner                                                          | ✅ Mittelgroß, auf Next.js fokussiert                                                                               | ✅ Mittelgroß, auf Next.js fokussiert                                                                               | ✅ Groß im Vue-Ökosystem                                              |
| **Serverseitiges Rendering & Server-Komponenten**   | ✅ Ja, optimiert für SSR / React Server-Komponenten                                                                                                | ⚠️ Unterstützt auf Seitenebene, muss aber t-Funktionen im Komponentenbaum für Server-Komponenten-Kinder weitergeben | ⚠️ Unterstützt auf Seitenebene mit zusätzlichem Setup, muss aber t-Funktionen im Komponentenbaum für Server-Komponenten-Kinder weitergeben | ✅ Unterstützt, Setup erforderlich                                  | ⚠️ Unterstützt auf Seitenebene, muss aber t-Funktionen im Komponentenbaum für Server-Komponenten-Kinder weitergeben | ⚠️ Unterstützt auf Seitenebene, muss aber t-Funktionen im Komponentenbaum für Server-Komponenten-Kinder weitergeben | ✅ SSR über Nuxt/Vue SSR (kein RSC)                                   |
| **Tree-shaking (nur genutzte Inhalte laden)**       | ✅ Ja, pro Komponente zur Build-Zeit über Babel/SWC-Plugins                                                                                        | ⚠️ Lädt normalerweise alles (kann mit Namespaces/Code-Splitting verbessert werden)                                  | ⚠️ Lädt normalerweise alles                                                                                                                | ❌ Nicht standardmäßig                                              | ⚠️ Teilweise                                                                                                        | ⚠️ Teilweise                                                                                                        | ⚠️ Teilweise (mit Code-Splitting/manuellem Setup)                     |
| **Lazy Loading**                                    | ✅ Ja, pro Locale / pro Wörterbuch                                                                                                                 | ✅ Ja (z. B. Backends/Namespaces bei Bedarf)                                                                        | ✅ Ja (geteilte Locale-Bundles)                                                                                                            | ✅ Ja (dynamische Katalogimporte)                                   | ✅ Ja (pro Route/pro Locale), benötigt Namespace-Management                                                         | ✅ Ja (pro Route/pro Locale), benötigt Namespace-Management                                                         | ✅ Ja (asynchrone Locale-Nachrichten)                                 |
| **Unbenutzte Inhalte bereinigen**                   | ✅ Ja, pro Wörterbuch zur Build-Zeit                                                                                                               | ❌ Nein, nur über manuelle Namespace-Segmentierung                                                                  | ❌ Nein, alle deklarierten Nachrichten werden gebündelt                                                                                    | ✅ Ja, ungenutzte Schlüssel werden beim Build erkannt und verworfen | ❌ Nein, kann manuell mit Namespace-Management verwaltet werden                                                     | ❌ Nein, kann manuell mit Namespace-Management verwaltet werden                                                     | ❌ Nein, nur über manuelles Lazy-Loading möglich                      |
| **Verwaltung großer Projekte**                      | ✅ Fördert Modularität, geeignet für Design-Systeme                                                                                                | ⚠️ Benötigt gute Dateidisziplin                                                                                     | ⚠️ Zentrale Kataloge können groß werden                                                                                                    | ⚠️ Kann komplex werden                                              | ✅ Modular mit Setup                                                                                                | ✅ Modular mit Setup                                                                                                | ✅ Modular mit Vue Router/Nuxt i18n Setup                             |

---

## GitHub-Sterne

GitHub-Sterne sind ein starker Indikator für die Popularität eines Projekts, das Vertrauen der Community und die langfristige Relevanz. Sie sind zwar kein direktes Maß für die technische Qualität, spiegeln jedoch wider, wie viele Entwickler das Projekt nützlich finden, seinen Fortschritt verfolgen und es wahrscheinlich übernehmen werden. Um den Wert eines Projekts einzuschätzen, helfen Sterne dabei, die Traktion verschiedener Alternativen zu vergleichen und Einblicke in das Wachstum des Ökosystems zu gewinnen.

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## Interoperabilität

`intlayer` kann auch dabei helfen, Ihre `react-intl`, `react-i18next`, `next-intl`, `next-i18next` und `vue-i18n` Namespaces zu verwalten.

Mit `intlayer` können Sie Ihren Inhalt im Format Ihrer bevorzugten i18n-Bibliothek deklarieren, und intlayer generiert Ihre Namespaces an dem Ort Ihrer Wahl (Beispiel: `/messages/{{locale}}/{{namespace}}.json`).
