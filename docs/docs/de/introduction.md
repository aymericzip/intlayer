---
createdAt: 2025-08-23
updatedAt: 2026-09-05
title: Einführung
description: Erfahren Sie, wie Intlayer funktioniert. Sehen Sie sich die Schritte an, die Intlayer in Ihrer Anwendung verwendet. Finden Sie heraus, was die verschiedenen Pakete tun.
keywords:
  - Einführung
  - Erste Schritte
  - Intlayer
  - Anwendung
  - Pakete
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer Dokumentation

Willkommen in der offiziellen Intlayer-Dokumentation! Hier finden Sie alles, was Sie benötigen, um Intlayer für all Ihre Anforderungen an die Internationalisierung (i18n) zu integrieren, zu konfigurieren und zu meistern, unabhängig davon, ob Sie mit Next.js, React, Vite, Express oder einer anderen JavaScript-Umgebung arbeiten.

## Einführung

### Was ist Intlayer?

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihrer Inhalte überall in Ihrem Code. Sie konvertiert die Deklaration von mehrsprachigen Inhalten in strukturierte Wörterbücher, um sie einfach in Ihren Code zu integrieren. Durch die Verwendung von TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

Intlayer bietet auch einen optionalen visuellen Editor, mit dem Sie Ihre Inhalte einfach bearbeiten und verwalten können. Dieser Editor ist besonders nützlich für Entwickler, die eine visuelle Schnittstelle für die Inhaltsverwaltung bevorzugen, oder für Teams, die Inhalte generieren, ohne sich um den Code kümmern zu müssen.

### Anwendungsbeispiel

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      de: "Hallo Welt",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "de": "Hallo Welt"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Warum Intlayer gegenüber Alternativen?

Im Vergleich zu gängigen Lösungen wie `next-intl` oder `i18next` ist Intlayer eine Lösung, die integrierte Optimierungen bietet, wie z.B.:

<AccordionGroup>
<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur die erforderlichen Inhalte. Intlayer hilft dabei, **Ihre Bundle- und Seitengrößen um bis zu 50% zu reduzieren**.

</Accordion>

<Accordion header="Wartbarkeit">

Die Lokalisierung der Inhalte Ihrer Anwendung **erleichtert die Wartung** für große Anwendungen. Sie können einen einzelnen Funktionsordner duplizieren oder löschen, ohne die mentale Last, Ihre gesamte Inhalts-Codebase überprüfen zu müssen. Darüber hinaus ist Intlayer **vollständig typisiert** (fully typed), um die Genauigkeit Ihrer Inhalte zu gewährleisten.

</Accordion>

<Accordion header="KI-Agent">

Das gemeinsame Ablegen von Inhalten **reduziert den Kontext**, der von großen Sprachmodellen (LLMs) benötigt wird. Intlayer bietet auch eine Reihe von Tools, wie eine **CLI**, um auf fehlende Übersetzungen zu testen, einen **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**, einen **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)** und **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

</Accordion>

<Accordion header="Automatisierung">

Nutzen Sie die Automatisierung zur Übersetzung in Ihrer CI/CD-Pipeline mit dem LLM Ihrer Wahl auf Kosten Ihres KI-Anbieters. Intlayer bietet auch einen **Compiler** zur Automatisierung der Inhaltsextraktion sowie eine [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), die dabei hilft, **im Hintergrund zu übersetzen**.

</Accordion>

<Accordion header="Leistung">

Die Verbindung von riesigen JSON-Dateien mit Komponenten kann zu Leistungs- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte zum Zeitpunkt des Builds.

</Accordion>

<Accordion header="Skalierung mit Nicht-Entwicklern">

Intlayer ist mehr als nur eine i18n-Lösung. Es bietet einen **selbst gehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)**, um Ihnen bei der Verwaltung Ihrer mehrsprachigen Inhalte in **Echtzeit** zu helfen und die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern nahtlos zu gestalten. Inhalte können lokal und/oder remote gespeichert werden.

</Accordion>
</AccordionGroup>

## Hauptfunktionen

Intlayer bietet eine Vielzahl von Funktionen, die auf die Bedürfnisse der modernen Webentwicklung zugeschnitten sind. Im Folgenden finden Sie die wichtigsten Funktionen mit Links zur detaillierten Dokumentation für jede:

- **Internationalisierungsunterstützung**: Verbessern Sie die globale Reichweite Ihrer Anwendung mit integrierter Unterstützung für die Internationalisierung.
- **Visueller Editor**: Verbessern Sie Ihren Entwicklungs-Workflow mit Editor-Plugins, die für Intlayer entwickelt wurden. Lesen Sie den [Visueller Editor Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).
- **Konfigurationsflexibilität**: Passen Sie Ihr Setup mit umfangreichen Konfigurationsoptionen an, die im [Konfigurationshandbuch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) detailliert beschrieben sind.
- **Erweiterte CLI-Tools**: Verwalten Sie Ihre Projekte effizient mit der Befehlszeilenschnittstelle von Intlayer. Entdecken Sie die Möglichkeiten in der [CLI-Tools-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md).

## Kernkonzepte

### Wörterbuch

Organisieren Sie Ihre mehrsprachigen Inhalte nah an Ihrem Code, um alles konsistent und wartbar zu halten.

- **[Erste Schritte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)**  
  Erlernen Sie die Grundlagen der Deklaration Ihrer Inhalte in Intlayer.

- **[Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md)**  
  Verstehen Sie, wie Übersetzungen generiert, gespeichert und in Ihrer Anwendung verwendet werden.

- **[Aufzählung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration.md)**  
  Verwalten Sie einfach wiederkehrende oder feste Datensätze in verschiedenen Sprachen.

- **[Bedingung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/condition.md)**  
  Erfahren Sie, wie Sie bedingte Logik in Intlayer verwenden, um dynamische Inhalte zu erstellen.

- **[Einfügen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md)**
  Entdecken Sie, wie Sie Werte mithilfe von Einfügeplatzhaltern in eine Zeichenfolge einfügen.

- **[Funktionsabruf](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md)**  
  Sehen Sie, wie Sie Inhalte mit benutzerdefinierter Logik dynamisch abrufen, um sie an den Workflow Ihres Projekts anzupassen.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md)**  
  Erfahren Sie, wie Sie Markdown in Intlayer verwenden, um reichhaltige Inhalte zu erstellen.

- **[Datei-Einbettungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/file.md)**  
  Entdecken Sie, wie Sie externe Dateien in Intlayer einbetten können, um sie im Inhalts-Editor zu verwenden.

- **[Verschachtelung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/nesting.md)**  
  Verstehen Sie, wie Sie Inhalte in Intlayer verschachteln, um komplexe Strukturen zu erstellen.

### Umgebungen & Integrationen

Wir haben Intlayer mit Blick auf Flexibilität entwickelt und bieten eine nahtlose Integration in beliebte Frameworks und Build-Tools:

- **[Intlayer mit Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)**
- **[Intlayer mit Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)**
- **[Intlayer mit Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_14.md)**
- **[Intlayer mit Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_page_router.md)**
- **[Intlayer mit Next.js ohne Locale in der URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_no_locale_path.md)**
- **[Intlayer mit Next.js (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_compiler.md)**
- **[Intlayer mit Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md)**
- **[Intlayer mit Tanstack Start + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack+solid.md)**
- **[Intlayer mit Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)**
- **[Intlayer mit Vite + React (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react_compiler.md)**
- **[Intlayer mit React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_router_v7.md)**
- **[Intlayer mit React Router v7 (fs-routes)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_router_v7_fs_routes.md)**
- **[Intlayer mit React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)**
- **[Intlayer mit React Native und Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_native+expo.md)**
- **[Intlayer mit Lynx und React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_lynx+react.md)**
- **[Intlayer mit Astro](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro.md)**
- **[Intlayer mit Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_react.md)**
- **[Intlayer mit Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_vue.md)**
- **[Intlayer mit Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_svelte.md)**
- **[Intlayer mit Astro + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_solid.md)**
- **[Intlayer mit Astro + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_preact.md)**
- **[Intlayer mit Astro + Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_lit.md)**
- **[Intlayer mit Astro + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_vanilla.md)**
- **[Intlayer mit Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vue.md)**
- **[Intlayer mit Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nuxt.md)**
- **[Intlayer mit Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+svelte.md)**
- **[Intlayer mit SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_svelte_kit.md)**
- **[Intlayer mit Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+solid.md)**
- **[Intlayer mit SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_solid_start.md)**
- **[Intlayer mit Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+preact.md)**
- **[Intlayer mit Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_21.md)**
- **[Intlayer mit Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_19.md)**
- **[Intlayer mit Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_analog.md)**
- **[Intlayer mit Vite + Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+lit.md)**
- **[Intlayer mit Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vanilla.md)**
- **[Intlayer mit Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vanilla.md)**
- **[Intlayer mit htmx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_htmx.md)**
- **[Intlayer mit Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_express.md)**
- **[Intlayer mit NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nestjs.md)**
- **[Intlayer mit Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_fastify.md)**
- **[Intlayer mit Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_hono.md)**
- **[Intlayer mit AdonisJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_adonisjs.md)**
- **[Intlayer mit Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_elysia.md)**
- **[Intlayer mit Storybook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_storybook.md)**
- **[Intlayer mit next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_next-intl.md)**
- **[Intlayer mit next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_next-i18next.md)**

Jeder Integrationsleitfaden enthält Best Practices für die Verwendung der Funktionen von Intlayer, wie z. B. **Serverseitiges Rendering**, **Dynamisches Routing** oder **Clientseitiges Rendering**, damit Sie eine schnelle, SEO-freundliche und hochgradig skalierbare Anwendung aufrechterhalten können.

## Beitrag & Feedback

Wir schätzen die Kraft von Open-Source und Community-gesteuerter Entwicklung. Wenn Sie Verbesserungen vorschlagen, einen neuen Leitfaden hinzufügen oder Probleme in unseren Dokumenten beheben möchten, können Sie gerne einen Pull Request einreichen oder ein Issue in unserem [GitHub-Repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs) öffnen.

**Bereit, Ihre Anwendung schneller und effizienter zu übersetzen?** Tauchen Sie in unsere Dokumentation ein, um noch heute mit Intlayer zu beginnen. Erleben Sie einen robusten, optimierten Ansatz zur Internationalisierung, der Ihre Inhalte organisiert und Ihr Team produktiver macht.

## Häufig gestellte Fragen

<FAQ>

<Question title="Wofür wird Intlayer verwendet?">

Intlayer ist eine Internationalisierungsbibliothek (i18n) für JavaScript- und TypeScript-Anwendungen. Sie deklarieren den Inhalt einer Komponente neben dieser Komponente in einer `.content.ts`-Datei, Intlayer kompiliert diese Deklarationen zur Build-Zeit in typisierte Wörterbücher, und Ihre Komponenten lesen sie über einen Hook wie `useIntlayer`. Es deckt Übersetzung, Pluralregeln, Genus, Markdown, Locale-bewusstes Routing, SEO-Metadaten, KI-gestützte Übersetzung und einen visuellen Editor für Nicht-Entwickler ab.

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

<Question title="Welche verschiedenen Lösungen gibt es, um eine JavaScript-App zu internationalisieren?">

Das Feld fällt in drei Generationen:

- **Katalogbibliotheken zur Laufzeit**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Nachrichten liegen in JSON-Namespaces, die zur Laufzeit geladen werden. Ausgereift und Framework-unabhängig, aber untypisiert und vollständig ausgeliefert.
- **Message-Bibliotheken zur Compile-Zeit**: `Lingui`, `Paraglide`, `react-intl` und `next-intl` mit einem Extraktionsschritt. Besseres Bundle-Verhalten und etwas Typisierung, weiterhin zentrale Kataloge.
- **Content-Layer-Bibliotheken**: `Intlayer`. Inhalte werden pro Komponente deklariert und pro Komponente kompiliert, sodass Typisierung, Tree-Shaking, Werkzeuge und Bearbeitung aus derselben Quelle stammen.

Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md) für den detaillierten Vergleich und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md) für gemessene Bundle- und Performance-Zahlen.

</Question>

<Question title="Welche Frameworks unterstützt Intlayer?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro mit jedem Island-Framework, React Native mit Expo, Lynx sowie auf dem Server Express, Fastify, NestJS, Hono, Elysia und AdonisJS. Jedes hat seinen eigenen Leitfaden unter [Umgebungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/introduction.md).

</Question>

<Question title="Warum Inhalte neben der Komponente deklarieren statt in einer zentralen JSON-Datei?">

Drei Gründe. Eine Seite liefert nur die Einträge aus, die ihre Komponenten rendern, statt eines ganzen Namespace, was die Bundle-Größe senkt. Ein Feature-Ordner kann in einem Stück kopiert oder gelöscht werden, ohne einen gemeinsamen Katalog nach verwaisten Schlüsseln zu durchsuchen. Und ein LLM oder ein Agent, der eine Komponente bearbeitet, sieht ihren Inhalt im selben Ordner, weshalb die Zusammenlegung KI-gestützte Arbeit zuverlässig macht. Siehe [wie Intlayer funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/how_works_intlayer.md).

</Question>

<Question title="Wie übersetze ich meine App automatisch mit KI?">

Führen Sie `npx intlayer fill` aus. Die CLI erkennt fehlende Übersetzungen und füllt sie mit dem LLM Ihrer Wahl, unter Verwendung Ihres eigenen Anbieters und API-Schlüssels, sodass Sie den KI-Anbieter direkt bezahlen. `--git-diff` beschränkt den Lauf auf die im Branch geänderten Inhalte, was ihn in der CI günstig hält. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Wie finde ich fehlende Übersetzungen?">

Führen Sie `npx intlayer test` aus. Es schlägt fehl, wenn einer deklarierten Locale Inhalt fehlt, sodass ein unübersetzter String nie in die Produktion gelangt. Die [VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md) zeigt dieselben Fehler inline an, und das [ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md) markiert fest kodierte Strings mit seiner Regel `no-raw-text`. Siehe [Testen Ihrer Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md).

</Question>

<Question title="Muss ich die Locale in die URL aufnehmen?">

Nein. `routing.mode` akzeptiert `"prefix-no-default"` (die Voreinstellung, `/about` und `/fr/about`), `"prefix-all"`, `"no-prefix"` und `"search-params"`, und `routing.domains` ordnet jede Locale ihrer eigenen Domain zu. Unabhängig vom Schema erstellt `getMultilingualUrls` die `hreflang`-Alternativen für Ihre Metadaten und Sitemap. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Wie können Übersetzer und Inhaltsredakteure arbeiten, ohne den Code anzufassen?">

Der [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) läuft auf Ihrer eigenen Infrastruktur und lässt jeden auf den Text Ihrer laufenden App klicken, um ihn zu bearbeiten, wobei die Änderung zurück in die Codebasis geschrieben wird. Das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) lagert Inhalte aus, sodass sie sich ohne Deployment ändern können, wobei der [Live-Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live.md) Aktualisierungen zur Laufzeit anwendet.

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja. Intlayer ist Open Source unter der Apache-2.0-Lizenz, und die Bibliothek, die CLI, der Compiler und der visuelle Editor sind kostenlos nutzbar, kommerzielle Projekte eingeschlossen. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst und kann auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden.

</Question>

</FAQ>
