---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
- **[Intlayer mit React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)**
- **[Intlayer mit Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)**
- **[Intlayer mit React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_router_v7.md)**
- **[Intlayer mit Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md)**
- **[Intlayer mit React Native und Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_native+expo.md)**
- **[Intlayer mit Lynx und React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_lynx+react.md)**
- **[Intlayer mit Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+preact.md)**
- **[Intlayer mit Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vue.md)**
- **[Intlayer mit Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nuxt.md)**
- **[Intlayer mit Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+svelte.md)**
- **[Intlayer mit SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_svelte_kit.md)**
- **[Intlayer mit Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_express.md)**
- **[Intlayer mit NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nestjs.md)**
- **[Intlayer mit Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_hono.md)**
- **[Intlayer mit Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_21.md)**

Jeder Integrationsleitfaden enthält Best Practices für die Verwendung der Funktionen von Intlayer, wie z. B. **Serverseitiges Rendering**, **Dynamisches Routing** oder **Clientseitiges Rendering**, damit Sie eine schnelle, SEO-freundliche und hochgradig skalierbare Anwendung aufrechterhalten können.

## Beitrag & Feedback

Wir schätzen die Kraft von Open-Source und Community-gesteuerter Entwicklung. Wenn Sie Verbesserungen vorschlagen, einen neuen Leitfaden hinzufügen oder Probleme in unseren Dokumenten beheben möchten, können Sie gerne einen Pull Request einreichen oder ein Issue in unserem [GitHub-Repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs) öffnen.

**Bereit, Ihre Anwendung schneller und effizienter zu übersetzen?** Tauchen Sie in unsere Dokumentation ein, um noch heute mit Intlayer zu beginnen. Erleben Sie einen robusten, optimierten Ansatz zur Internationalisierung, der Ihre Inhalte organisiert und Ihr Team produktiver macht.

### Warum Intlayer gegenüber Alternativen?

Im Vergleich zu gängigen Lösungen wie `next-intl` oder `i18next` ist Intlayer eine Lösung, die integrierte Optimierungen bietet, wie z.B.:

**Bundle-Größe**

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur die erforderlichen Inhalte. Intlayer hilft dabei, **Ihre Bundle- und Seitengrößen um bis zu 50% zu reduzieren**.

**Wartbarkeit**

Die Lokalisierung der Inhalte Ihrer Anwendung **erleichtert die Wartung** für große Anwendungen. Sie können einen einzelnen Funktionsordner duplizieren oder löschen, ohne die mentale Last, Ihre gesamte Inhalts-Codebase überprüfen zu müssen. Darüber hinaus ist Intlayer **vollständig typisiert** (fully typed), um die Genauigkeit Ihrer Inhalte zu gewährleisten.

**KI-Agent**

Das gemeinsame Ablegen von Inhalten **reduziert den Kontext**, der von großen Sprachmodellen (LLMs) benötigt wird. Intlayer bietet auch eine Reihe von Tools, wie eine **CLI**, um auf fehlende Übersetzungen zu testen, einen **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**, einen **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)** und **[Agenten-Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

**Automatisierung**

Nutzen Sie die Automatisierung zur Übersetzung in Ihrer CI/CD-Pipeline mit dem LLM Ihrer Wahl auf Kosten Ihres KI-Anbieters. Intlayer bietet auch einen **Compiler** zur Automatisierung der Inhaltsextraktion sowie eine [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), die dabei hilft, **im Hintergrund zu übersetzen**.

**Leistung**

Die Verbindung von riesigen JSON-Dateien mit Komponenten kann zu Leistungs- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte zum Zeitpunkt des Builds.

**Skalierung mit Nicht-Entwicklern**

Intlayer ist mehr als nur eine i18n-Lösung. Es bietet einen **selbst gehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)**, um Ihnen bei der Verwaltung Ihrer mehrsprachigen Inhalte in **Echtzeit** zu helfen und die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern nahtlos zu gestalten. Inhalte können lokal und/oder remote gespeichert werden.
