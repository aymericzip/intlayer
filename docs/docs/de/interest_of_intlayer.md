---
createdAt: 2024-08-14
updatedAt: 2026-08-30
title: Bedeutung von Intlayer
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
  - version: 8.11.2
    date: 2026-05-31
    changes: "Abschnitt 'Warum Intlayer gegenüber Alternativen' hinzugefügt"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Compiler-Veröffentlichung"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Vergleichstabelle aktualisiert"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Warum sollten Sie Intlayer in Betracht ziehen?

## Was ist Intlayer?

**Intlayer** ist eine Internationalisierungsbibliothek (i18n), die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht es Ihnen, Ihre Inhalte überall direkt in Ihrem Code zu deklarieren. Sie wandelt Deklarationen von mehrsprachigen Inhalten in strukturierte Wörterbücher um, die sich einfach in Ihren Code integrieren lassen. Durch die Verwendung von TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu führenden Lösungen wie `next-intl` oder `i18next` bietet Intlayer integrierte Optimierungen wie:

<AccordionGroup>

<Accordion header="Bundle-Größe">

Anstatt massive JSON-Dateien in Ihre Seiten zu laden, laden Sie nur die tatsächlich benötigten Inhalte. Intlayer hilft Ihnen dabei, **Ihre Bundle- und Seitengrößen um bis zu 50 % zu reduzieren**.

</Accordion>

<Accordion header="Wartbarkeit">

Die Kapselung der Inhalte Ihrer Anwendung auf Komponentenebene **erleichtert die Wartung** bei großen Projekten erheblich. Sie können einen einzelnen Feature-Ordner duplizieren oder löschen, ohne die mentale Last zu tragen, Ihre gesamte Inhalts-Codebasis überprüfen zu müssen. Zudem ist Intlayer **vollständig typisiert**, um die Richtigkeit Ihrer Übersetzungen zu garantieren.

</Accordion>

<Accordion header="KI-Agenten">

Die Zusammenlegung von Code und Inhalt (Co-location) **reduziert den benötigten Kontext** für Large Language Models (LLMs). Intlayer bietet zudem ein Paket von Werkzeugen wie eine **CLI** zum Testen auf fehlende Übersetzungen, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)** und **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

</Accordion>

<Accordion header="Funktionsumfang">

Intlayer bietet eine Reihe zusätzlicher Funktionen, die andere i18n-Lösungen nicht haben, wie [Markdown-Unterstützung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md), [Laden von externen Inhalten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md), [Laden von Dateiinhalten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/file.md), [Live-Inhaltsaktualisierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live.md), einen [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) und mehr.

</Accordion>

<Accordion header="Automatisierung">

Nutzen Sie die Automatisierung für Übersetzungen in Ihrer CI/CD-Pipeline mit dem LLM Ihrer Wahl zum Preis Ihres KI-Anbieters. Intlayer bietet auch einen **Compiler** zur automatischen Inhaltsextraktion sowie eine [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) zur Unterstützung von **Übersetzungen im Hintergrund**.

</Accordion>

<Accordion header="Performance">

Das Laden massiver JSON-Dateien in Komponenten kann zu Performance- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte bereits zur Build-Zeit.

</Accordion>

<Accordion header="Skalierung mit Nicht-Entwicklern">

Mehr als nur eine i18n-Lösung bietet Intlayer einen **selbstgehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)** und ein **[vollwertiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)**, mit dem Sie Ihre mehrsprachigen Inhalte in **Echtzeit** verwalten können. Dies macht die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern nahtlos. Inhalte können lokal und/oder remote gespeichert werden.

</Accordion>

<Accordion header="Cross-Framework-Design">

Wenn Sie verschiedene Frameworks für verschiedene Teile Ihrer Anwendung verwenden (z. B. React, React-native, Vue, Angular, Svelte usw.), bietet Intlayer eine Möglichkeit, **eine gemeinsame Syntax und Implementierung über alle gängigen Frontend-Frameworks hinweg zu nutzen**. Sie können Ihre Inhaltsdeklaration auch in Ihrem Designsystem, Ihren Apps, dem Backend usw. teilen.

</Accordion>
</AccordionGroup>

## Warum wurde Intlayer entwickelt?

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

Diese Art von Architektur verlangsamt den Entwicklungsprozess und macht die Codebasis aus mehreren Gründen komplexer zu warten:

1. **Für jede neu erstellte Komponente müssen Sie:**
   - Die neue Ressource/den Namespace im Ordner `locales` erstellen
   - Daran denken, den neuen Namespace in Ihrer Seite zu importieren
   - Ihre Inhalte übersetzen (oft manuell per Copy-Paste von KI-Anbietern)

2. **Für jede an Ihren Komponenten vorgenommene Änderung müssen Sie:**
   - Nach der zugehörigen Ressource/dem Namespace suchen (weit entfernt von der Komponente)
   - Ihre Inhalte übersetzen
   - Sicherstellen, dass Ihre Inhalte für jede Sprache auf dem neuesten Stand sind
   - Überprüfen, ob Ihr Namespace keine ungenutzten Schlüssel/Werte enthält
   - Sicherstellen, dass die Struktur Ihrer JSON-Dateien für alle Sprachen gleich ist

Bei professionellen Projekten, die diese Lösungen nutzen, werden häufig Lokalisierungsplattformen eingesetzt, um die Übersetzung Ihrer Inhalte zu verwalten. Dies kann jedoch bei großen Projekten schnell kostspielig werden.

Um dieses Problem zu lösen, verfolgt Intlayer einen Ansatz, der Ihre Inhalte pro Komponente kapselt und Ihre Inhalte in der Nähe Ihrer Komponente hält, so wie wir es oft mit CSS (`styled-components`), Typen, Dokumentation (`storybook`) oder Unit-Tests (`jest`) tun.

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
   - `.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`-Dateien können mithilfe einer VSCode-Erweiterung erstellt werden
   - KI-Autovervollständigungswerkzeuge in Ihrer IDE (wie GitHub Copilot) können Ihnen bei der Deklaration Ihrer Inhalte helfen und so Copy-Paste reduzieren

2. **Ihre Codebasis sauber zu halten**
   - Komplexität reduzieren
   - Wartbarkeit erhöhen

3. **Ihre Komponenten und die zugehörigen Inhalte einfacher zu duplizieren (Beispiel: Login-/Registrierungs-Komponenten usw.)**
   - Durch Begrenzung des Risikos, dass sich die Inhalte anderer Komponenten ändern
   - Durch Kopieren/Einfügen Ihrer Inhalte von einer Anwendung in eine andere ohne externe Abhängigkeiten

4. **Die Codebasis nicht mit ungenutzten Schlüsseln/Werten für ungenutzte Komponenten zu belasten**
   - Wenn Sie eine Komponente nicht verwenden, importiert Intlayer die zugehörigen Inhalte nicht
   - Wenn Sie eine Komponente löschen, denken Sie leichter daran, die zugehörigen Inhalte zu entfernen, da sie sich im selben Ordner befinden

5. **Die Denkbelastung für KI-Agenten bei der Deklaration Ihrer mehrsprachigen Inhalte zu reduzieren**
   - Der KI-Agent muss nicht Ihre gesamte Codebasis scannen, um zu wissen, wo er Ihre Inhalte implementieren soll
   - Übersetzungen können einfach durch KI-Autovervollständigungswerkzeuge in Ihrer IDE (wie GitHub Copilot) durchgeführt werden

6. **Die Ladeleistung zu optimieren**
   - Wenn eine Komponente per Lazy-Loading geladen wird, werden die zugehörigen Inhalte gleichzeitig geladen

## Zusätzliche Funktionen von Intlayer

| Funktion                                                                                                                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Cross-Framework-Unterstützung**<br><br>Intlayer ist kompatibel mit allen gängigen Frameworks und Bibliotheken, einschließlich Next.js, React, Vite, Vue.js, Nuxt, Preact, Express und mehr.                                                                                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript-gestütztes Inhaltsmanagement**<br><br>Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.<br><br> - [Inhaltsdeklaration](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **Compiler**<br><br>Der Intlayer-Compiler extrahiert automatisch Inhalte aus Ihren Komponenten und generiert die Wörterbuchdateien.<br><br> - [Compiler](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Inhaltsdeklarationsdatei pro Sprache**<br><br>Beschleunigen Sie Ihre Entwicklung, indem Sie Ihre Inhalte vor der automatischen Generierung einmal deklarieren.<br><br> - [Inhaltsdeklarationsdatei pro Sprache](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Typsichere Umgebung**<br><br>Nutzen Sie TypeScript, um sicherzustellen, dass Ihre Inhaltsdefinitionen und Ihr Code fehlerfrei sind, während Sie gleichzeitig von der IDE-Autovervollständigung profitieren.<br><br> - [TypeScript-Konfiguration](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Vereinfachtes Setup**<br><br>Schnell einsatzbereit mit minimaler Konfiguration. Passen Sie Einstellungen für Internationalisierung, Routing, KI, Build und Inhaltsverarbeitung mit Leichtigkeit an.<br><br> - [Erkunden Sie die Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Vereinfachtes Abrufen von Inhalten**<br><br>Sie müssen Ihre `t`-Funktion nicht für jedes Inhaltselement einzeln aufrufen. Rufen Sie alle Ihre Inhalte direkt mit einem einzigen Hook ab.<br><br> - [React-Integration](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Konsistente Implementierung für Server-Komponenten**<br><br>Perfekt geeignet für Next.js-Server-Komponenten: Nutzen Sie dieselbe Implementierung sowohl für Client- als auch für Server-Komponenten. Das Weiterreichen Ihrer `t`-Funktion durch die Server-Komponenten entfällt.<br><br> - [Server-Komponenten](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Organisierte Codebasis**<br><br>Halten Sie Ihre Codebasis organisierter: 1 Komponente = 1 Wörterbuch im selben Ordner. Übersetzungen in der Nähe der jeweiligen Komponenten verbessern die Wartbarkeit und Klarheit.<br><br> - [Wie Intlayer funktioniert](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Erweitertes Routing**<br><br>Volle Unterstützung von App-Routing, das sich nahtlos an komplexe Anwendungsstrukturen für Next.js, React, Vite, Vue.js usw. anpasst.<br><br> - [Erkunden Sie die Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown-Unterstützung**<br><br>Importieren und interpretieren Sie lokale Dateien und Remote-Markdown für mehrsprachige Inhalte wie Datenschutzrichtlinien, Dokumentationen usw. Interpretieren Sie Markdown-Metadaten und machen Sie sie in Ihrem Code zugänglich.<br><br> - [Inhaltsdateien](https://intlayer.org/doc/concept/content/file)                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Kostenloser visueller Editor & CMS**<br><br>Ein kostenloser visueller Editor und ein CMS stehen für Texter zur Verfügung, sodass keine externe Lokalisierungsplattform erforderlich ist. Synchronisieren Sie Ihre Inhalte über Git oder lagern Sie sie ganz oder teilweise in das CMS aus.<br><br> - [Intlayer-Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer-CMS](https://intlayer.org/doc/concept/cms)                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable Inhalte**<br><br>Tree-shakable Inhalte, die die Größe des finalen Bundles reduzieren. Lädt Inhalte pro Komponente und schließt ungenutzte Inhalte aus Ihrem Bundle aus. Unterstützt Lazy Loading zur Steigerung der Ladeeffizienz der App.<br><br> - [Optimierung des App-Builds](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Statisches Rendering**<br><br>Blockiert kein statisches Rendering.<br><br> - [Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **KI-gestützte Übersetzung**<br><br>Übersetzen Sie Ihre Website mit nur einem Klick in 231 Sprachen mithilfe der fortschrittlichen KI-gestützten Übersetzungstools von Intlayer unter Verwendung Ihres eigenen KI-Anbieters/API-Schlüssels.<br><br> - [CI/CD-Integration](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer-CLI](https://intlayer.org/doc/concept/cli) <br> - [Automatisches Ausfüllen](https://intlayer.org/doc/concept/auto-fill)            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP-Server-Integration**<br><br>Bietet einen MCP-Server (Model Context Protocol) für die IDE-Automatisierung, der ein nahtloses Inhaltsmanagement und i18n-Workflows direkt in Ihrer Entwicklungsumgebung ermöglicht.<br><br> - [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/de/mcp_server.md)                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode-Erweiterung**<br><br>Intlayer bietet eine VSCode-Erweiterung zur Verwaltung Ihrer Inhalte und Übersetzungen, zum Erstellen von Wörterbüchern, zum Übersetzen von Inhalten und mehr.<br><br> - [VSCode-Erweiterung](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilität**<br><br>Ermöglicht die Interoperabilität mit react-i18next, next-i18next, next-intl und react-intl.<br><br> - [Intlayer und react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer und next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer und next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer Compat-Adapter](https://intlayer.org/doc/compatibility) |
| Fehlende Übersetzungen testen (CLI/CI)                                                                                    | ✅ CLI: npx intlayer content test (CI-freundlicher Audit)                                                                                                                                                                                                                                                                                                                                                                                                             |

## Vergleich von Intlayer mit anderen Lösungen

| Funktion                                            | `intlayer`                                                                                                                                      | `react-i18next`                                                                                                                        | `react-intl` (FormatJS)                                                                                                                                       | `lingui`                                                                    | `next-intl`                                                                                                                            | `next-i18next`                                                                                                                         | `vue-i18n`                                                            |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Übersetzungen nahe den Komponenten**              | ✅ Ja, Inhalte liegen direkt bei jeder Komponente                                                                                               | ❌ Nein                                                                                                                                | ❌ Nein                                                                                                                                                       | ❌ Nein                                                                     | ❌ Nein                                                                                                                                | ❌ Nein                                                                                                                                | ✅ Ja – bei Verwendung von `Single File Components` (SFCs)            |
| **TypeScript-Integration**                          | ✅ Fortschrittlich, automatisch generierte strenge Typen                                                                                        | ⚠️ Grundlegend; zusätzliches Setup für Typsicherheit erforderlich                                                                      | ✅ Gut, aber weniger streng                                                                                                                                   | ⚠️ Typdefinitionen, benötigt Konfiguration                                  | ✅ Gut                                                                                                                                 | ⚠️ Grundlegend                                                                                                                         | ✅ Gut (Typen verfügbar; Schlüsselsicherheit erfordert Setup)         |
| **Erkennung fehlender Übersetzungen**               | ✅ TypeScript-Fehlerhervorhebung und Fehler/Warnung zur Build-Zeit                                                                              | ⚠️ Meistens Fallback-Strings zur Laufzeit                                                                                              | ⚠️ Fallback-Strings                                                                                                                                           | ⚠️ Erfordert zusätzliche Konfiguration                                      | ⚠️ Laufzeit-Fallback                                                                                                                   | ⚠️ Laufzeit-Fallback                                                                                                                   | ⚠️ Laufzeit-Fallback/Warnungen (konfigurierbar)                       |
| **Reichhaltige Inhalte (JSX/Markdown/Komponenten)** | ✅ Direkte Unterstützung                                                                                                                        | ⚠️ Eingeschränkt / nur Interpolation                                                                                                   | ⚠️ ICU-Syntax, kein echtes JSX                                                                                                                                | ⚠️ Eingeschränkt                                                            | ❌ Nicht für reichhaltige Knoten ausgelegt                                                                                             | ⚠️ Eingeschränkt                                                                                                                       | ⚠️ Eingeschränkt (Komponenten über `<i18n-t>`, Markdown über Plugins) |
| **KI-gestützte Übersetzung**                        | ✅ Ja, unterstützt mehrere KI-Anbieter. Nutzbar mit eigenen API-Schlüsseln. Berücksichtigt den Kontext Ihrer Anwendung und des Inhaltsspektrums | ❌ Nein                                                                                                                                | ❌ Nein                                                                                                                                                       | ❌ Nein                                                                     | ❌ Nein                                                                                                                                | ❌ Nein                                                                                                                                | ❌ Nein                                                               |
| **Visueller Editor**                                | ✅ Ja, lokaler visueller Editor + optionales CMS; kann Inhalte der Codebasis auslagern; einbettbar                                              | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                                                                             | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                                                                                                    | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                  | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                                                                             | ❌ Nein / über externe Lokalisierungsplattformen verfügbar                                                                             | ❌ Nein / über externe Lokalisierungsplattformen verfügbar            |
| **Lokalisiertes Routing**                           | ✅ Ja, unterstützt lokalisierte Pfade von Haus aus (funktioniert mit Next.js & Vite)                                                            | ⚠️ Kein integriertes Routing, erfordert Plugins (z.B. `next-i18next`) oder benutzerdefinierte Router-Konfiguration                     | ❌ Nein, nur Nachrichtenformatierung, Routing muss manuell erfolgen                                                                                           | ⚠️ Kein integriertes Routing, erfordert Plugins oder manuelle Konfiguration | ✅ Integriert, App Router unterstützt `[locale]`-Segment                                                                               | ✅ Integriert                                                                                                                          | ✅ Integriert                                                         |
| **Dynamische Routengenerierung**                    | ✅ Ja                                                                                                                                           | ⚠️ Plugin/Ökosystem oder manuelles Setup                                                                                               | ❌ Nicht bereitgestellt                                                                                                                                       | ⚠️ Plugin/manuell                                                           | ✅ Ja                                                                                                                                  | ✅ Ja                                                                                                                                  | ❌ Nicht bereitgestellt (Nuxt i18n bietet dies)                       |
| **Pluralisierung**                                  | ✅ Enumerationsbasierte Muster                                                                                                                  | ✅ Konfigurierbar (Plugins wie i18next-icu)                                                                                            | ✅ (ICU)                                                                                                                                                      | ✅ (ICU/messageformat)                                                      | ✅ Gut                                                                                                                                 | ✅ Gut                                                                                                                                 | ✅ Integrierte Pluralregeln                                           |
| **Formatierung (Datum, Zahlen, Währungen)**         | ✅ Optimierte Formatierer (Intl unter der Haube)                                                                                                | ⚠️ Über Plugins oder benutzerdefinierte Intl-Verwendung                                                                                | ✅ ICU-Formatierer                                                                                                                                            | ✅ ICU/CLI-Hilfsprogramme                                                   | ✅ Gut (Intl-Hilfsprogramme)                                                                                                           | ✅ Gut (Intl-Hilfsprogramme)                                                                                                           | ✅ Integrierte Datums-/Zahlenformatierer (Intl)                       |
| **Inhaltsformat**                                   | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml in Arbeit)                                                                                          | ⚠️ .json                                                                                                                               | ✅ .json, .js                                                                                                                                                 | ⚠️ .po, .json                                                               | ✅ .json, .js, .ts                                                                                                                     | ⚠️ .json                                                                                                                               | ✅ .json, .js                                                         |
| **ICU-Unterstützung**                               | ⚠️ In Arbeit                                                                                                                                    | ⚠️ Über Plugin (i18next-icu)                                                                                                           | ✅ Ja                                                                                                                                                         | ✅ Ja                                                                       | ✅ Ja                                                                                                                                  | ⚠️ Über Plugin (`i18next-icu`)                                                                                                         | ⚠️ Über benutzerdefinierten Formatierer/Compiler                      |
| **SEO-Hilfen (hreflang, sitemap)**                  | ✅ Integrierte Werkzeuge: Hilfen für Sitemap, robots.txt, Metadaten                                                                             | ⚠️ Community-Plugins/manuell                                                                                                           | ❌ Nicht im Kern                                                                                                                                              | ❌ Nicht im Kern                                                            | ✅ Gut                                                                                                                                 | ✅ Gut                                                                                                                                 | ❌ Nicht im Kern (Nuxt i18n bietet Hilfen)                            |
| **Ökosystem / Community**                           | ⚠️ Kleiner, aber wächst schnell und reagiert schnell                                                                                            | ✅ Am größten und ausgereiftesten                                                                                                      | ✅ Groß                                                                                                                                                       | ⚠️ Kleiner                                                                  | ✅ Mittlerweile beachtlich, Next.js-fokussiert                                                                                         | ✅ Mittlerweile beachtlich, Next.js-fokussiert                                                                                         | ✅ Groß im Vue-Ökosystem                                              |
| **Serverseitiges Rendering & Server-Komponenten**   | ✅ Ja, optimiert für SSR / React Server Components                                                                                              | ⚠️ Auf Seitenebene unterstützt, aber t-Funktionen müssen im Komponentenbaum für untergeordnete Server-Komponenten weitergegeben werden | ⚠️ Auf Seitenebene mit zusätzlichem Setup unterstützt, aber t-Funktionen müssen im Komponentenbaum für untergeordnete Server-Komponenten weitergegeben werden | ✅ Unterstützt, Setup erforderlich                                          | ⚠️ Auf Seitenebene unterstützt, aber t-Funktionen müssen im Komponentenbaum für untergeordnete Server-Komponenten weitergegeben werden | ⚠️ Auf Seitenebene unterstützt, aber t-Funktionen müssen im Komponentenbaum für untergeordnete Server-Komponenten weitergegeben werden | ✅ SSR über Nuxt/Vue SSR (kein RSC)                                   |
| **Tree-shaking (nur genutzte Inhalte laden)**       | ✅ Ja, pro Komponente zur Build-Zeit über Babel/SWC-Plugins                                                                                     | ⚠️ Lädt normalerweise alles (kann durch Namespaces/Code-Splitting verbessert werden)                                                   | ⚠️ Lädt normalerweise alles                                                                                                                                   | ❌ Nicht standardmäßig                                                      | ⚠️ Teilweise                                                                                                                           | ⚠️ Teilweise                                                                                                                           | ⚠️ Teilweise (mit Code-Splitting/manuellem Setup)                     |
| **Lazy Loading**                                    | ✅ Ja, pro Sprache / pro Wörterbuch                                                                                                             | ✅ Ja (z.B. On-Demand-Backends/Namespaces)                                                                                             | ✅ Ja (aufgeteilte Sprachbundles)                                                                                                                             | ✅ Ja (dynamische Katalog-Importe)                                          | ✅ Ja (pro Route/pro Sprache), erfordert Namespace-Management                                                                          | ✅ Ja (pro Route/pro Sprache), erfordert Namespace-Management                                                                          | ✅ Ja (asynchrone Sprachnachrichten)                                  |
| **Ungenutzte Inhalte entfernen**                    | ✅ Ja, pro Wörterbuch zur Build-Zeit                                                                                                            | ❌ Nein, nur über manuelle Namespace-Segmentierung                                                                                     | ❌ Nein, alle deklarierten Nachrichten werden gebündelt                                                                                                       | ✅ Ja, ungenutzte Schlüssel werden erkannt und beim Build verworfen         | ❌ Nein, kann manuell durch Namespace-Management gelöst werden                                                                         | ❌ Nein, kann manuell durch Namespace-Management gelöst werden                                                                         | ❌ Nein, nur über manuelles Lazy Loading möglich                      |
| **Management großer Projekte**                      | ✅ Fördert Modularität, ideal für Design-Systeme                                                                                                | ⚠️ Erfordert gute Dateidisziplin                                                                                                       | ⚠️ Zentrale Kataloge können sehr groß werden                                                                                                                  | ⚠️ Kann komplex werden                                                      | ✅ Modular mit entsprechendem Setup                                                                                                    | ✅ Modular mit entsprechendem Setup                                                                                                    | ✅ Modular mit Vue Router/Nuxt i18n-Setup                             |

## GitHub-Sterne

GitHub-Sterne sind ein starker Indikator für die Popularität eines Projekts, das Vertrauen der Community und seine langfristige Relevanz. Sie sind zwar kein direktes Maß für die technische Qualität, spiegeln jedoch wider, wie viele Entwickler das Projekt nützlich finden, seine Fortschritte verfolgen und es wahrscheinlich übernehmen werden. Zur Einschätzung des Projektwerts helfen Sterne dabei, das Interesse gegenüber Alternativen zu vergleichen, und bieten Einblicke in das Wachstum des Ökosystems.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## Interoperabilität

`intlayer` kann Ihnen auch dabei helfen, Ihre Namespaces für `react-intl`, `react-i18next`, `next-intl`, `next-i18next` und `vue-i18n` zu verwalten.

Durch die Verwendung von `intlayer` können Sie Ihre Inhalte im Format Ihrer bevorzugten i18n-Bibliothek deklarieren, und Intlayer generiert Ihre Namespaces am Speicherort Ihrer Wahl (Beispiel: `/messages/{{locale}}/{{namespace}}.json`).

Wenn Sie die API Ihrer aktuellen i18n-Bibliothek weiterhin verwenden möchten, stellt `intlayer` außerdem **Compat-Adapter** bereit: Pakete, die exakt dieselbe API wie `react-i18next`, `next-intl`, `react-intl`, `vue-i18n` und weitere bereitstellen, jedoch aus Intlayer-Wörterbüchern bedient werden. So können Sie schrittweise migrieren, ohne Ihren Code neu zu schreiben. Siehe die [Dokumentation der Compat-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md).

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine JavaScript-App zu internationalisieren?">

Drei Generationen existieren nebeneinander:

- **Katalogbibliotheken zur Laufzeit**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`, `svelte-i18n`. JSON-Namespaces, die zur Laufzeit geladen werden. Ausgereift, Framework-unabhängig, untypisiert und vollständig an die Seite ausgeliefert.
- **Message-Bibliotheken zur Compile-Zeit**: `Lingui`, `Paraglide` sowie `next-intl` oder `react-intl` mit einem Extraktionsschritt. Besseres Bundle-Verhalten und teilweise Typisierung, weiterhin ein zentraler Katalog.
- **Content-Layer-Bibliotheken**: `Intlayer`. Inhalte werden pro Komponente deklariert und kompiliert, sodass Typisierung, Tree-Shaking, Bearbeitungswerkzeuge und KI-Übersetzung alle aus denselben Deklarationen stammen.

</Question>

<Question title="Wie viel trägt i18n zu meiner Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Serverseitig gerendertes Markup löst seinen Inhalt auf dem Server auf, und der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden. [Dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Kann ich von `i18next`, `next-intl` oder `react-i18next` migrieren, ohne meine Komponenten neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md) oder dem [next-intl-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` und `Lingui` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Komponentencode nicht.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Quelldateien, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Siehe den [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md).

Für eine vollständig automatisierte Pipeline macht der [Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) dasselbe zur Build-Zeit auf JSX-, TSX-, Vue- und Svelte-Quellcode und generiert die Wörterbücher bei jeder Änderung, sodass es keine von Hand zu pflegenden Schlüssel gibt. Er arbeitet mit statischer Analyse, sodass Strings, die nur zur Laufzeit existieren, unerreichbar bleiben, und er braucht einige Annotationen, um für den Nutzer sichtbaren Text von Anwendungslogik zu unterscheiden.

</Question>

<Question title="Welches Editor- und KI-Agenten-Tooling ist verfügbar?">

Fünf Bausteine, alle optional:

- **[VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)**: von einem `useIntlayer`-Schlüssel zur Inhaltsdatei springen, die ihn deklariert, Inhalte aus einer Komponente extrahieren und build, fill, test, push und pull über die Befehlspalette oder einen eigenen Intlayer-Tab ausführen.
- **[LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**: dieselbe Wahrnehmung in jedem Editor, der LSP spricht, mit „Gehe zu Definition“, „Alle Referenzen suchen“, Hover-Vorschauen eines übersetzten Werts, Autovervollständigung von Schlüsseln und Feldern sowie einer Warnung, wenn ein Schlüssel nirgends deklariert ist. Es löst außerdem `i18next`-, `react-i18next`-, `next-intl`- und `use-intl`-Aufrufe auf, was bei der Migration hilft.
- **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)**: stellt die Intlayer-Dokumentation und -CLI für Cursor, VS Code, Claude Desktop, Claude Code und ChatGPT bereit, sodass ein Assistent aus der aktuellen Doku antwortet statt zu raten und Befehle wie `intlayer fill` selbst ausführen kann.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**: fokussierte Skills wie `intlayer-config`, `intlayer-cli` und `intlayer-content` sowie eines pro Framework, die einem Agenten Ihr Routing-Setup und die Inhaltsknoten-Typen beibringen.
- **[ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)**: `no-raw-text` markiert fest kodierte Strings, mit weiteren Regeln für statische Wörterbuchschlüssel und ungenutzte Inhalte.

</Question>

<Question title="Wie unterscheidet sich Intlayer von next-intl?">

`next-intl` ist eine Message-Ebene für Next.js: Sie behalten JSON-Message-Dateien pro Locale und lesen sie über `useTranslations`. Intlayer ist eine Inhaltsebene: Deklarationen liegen neben der Komponente, werden aus der Deklaration selbst typisiert und pro Komponente kompiliert, sodass eine Seite nur ausliefert, was sie rendert. Intlayer deckt außerdem ab, was `next-intl` Ihnen überlässt, nämlich KI-Übersetzung, einen visuellen Editor, ein CMS und Prüfungen fehlender Übersetzungen in der CI. Wenn Sie die `next-intl`-API behalten möchten, bedient sie der [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) aus Intlayer-Wörterbüchern.

</Question>

<Question title="Wie unterscheidet sich Intlayer von i18next und react-i18next?">

`i18next` löst String-Schlüssel zur Laufzeit gegen Namespaces auf, was bedeutet, dass ein umbenannter oder falsch geschriebener Schlüssel still fehlschlägt und jeder Namespace, den eine Seite berührt, vollständig heruntergeladen wird. Intlayer löst Inhalte zur Build-Zeit gegen generierte Typen auf, sodass ein falscher Schlüssel ein Compile-Fehler ist und nur die Einträge, die eine Komponente rendert, ins Bundle gelangen. `i18next` hat das größere Plugin-Ökosystem und eine längere Erfolgsgeschichte; Intlayer hat Typisierung, Bundle-Größe sowie die Bearbeitungs- und Automatisierungswerkzeuge. Siehe den [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md) oder den [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md).

</Question>

<Question title="Ist Intlayer schneller oder leichter als die Alternativen?">

Bei Bundle- und Seitengröße ja: Kataloge, die eine Seite nicht rendert, nicht zu laden, senkt Bundle- und Seitengröße gegenüber Namespace-basierten Setups um bis zu 50 %. Der [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md) veröffentlicht die Methode und die Zahlen pro Framework, darunter [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md), [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/vue.md) und [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/svelte.md), sodass Sie sie reproduzieren können, statt der Behauptung blind zu vertrauen.

</Question>

<Question title="Lohnt es sich, eine bestehende App zu migrieren?">

Es hängt davon ab, was heute schmerzt. Wenn Ihr Problem die Bundle-Größe, still fehlende Übersetzungen oder Übersetzer sind, die ohne Entwickler nicht arbeiten können, zahlt sich die Migration aus. Wenn Ihre Kataloge klein und stabil sind, ist der Gewinn geringer. In jedem Fall muss die Migration keine Neuentwicklung sein: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) behalten Ihre aktuelle API, und das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre vorhandenen JSON-Dateien als Single Source of Truth, während beide Ebenen nebeneinander bestehen.

</Question>

<Question title="Was bietet Intlayer, das andere i18n-Bibliotheken nicht bieten?">

[Markdown-Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md), [aus einer externen Quelle abgerufene Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), das Laden von Dateiinhalten, [Live-Inhaltsaktualisierungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live.md), ein [visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), ein [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), ein [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md), der Inhalte aus vorhandenen Komponenten extrahiert, [Inhaltsvarianten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/variants.md) für A/B-Tests, [Analytik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/analytics.md) zur Inhaltsexposition, ein [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md), ein [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md) und [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md).

</Question>

<Question title="Kann ich Intlayer nur als Übersetzungsmanager nutzen und meine aktuelle Bibliothek behalten?">

Ja. Intlayer kann Ihre Namespaces im Format und am Ort erzeugen, den Ihre aktuelle Bibliothek erwartet, zum Beispiel `/messages/{locale}/{namespace}.json`, sodass Sie die KI-Übersetzung, den Editor und die CI-Prüfungen erhalten, während Ihr Anwendungscode weiterhin seine bestehende i18n-Bibliothek verwendet.

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
