---
docName: roadmap
url: https://intlayer.org/doc/roadmap
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/roadmap.md
createdAt: 2025-03-01
updatedAt: 2025-03-01
title: Fahrplan
description: Entdecken Sie die Roadmap von Intlayer. Sehen Sie alle Funktionen, die Intlayer implementiert hat, und ist dabei, diese zu implementieren.
keywords:
  - Roadmap
  - Intlayer
  - Internationalisierung
  - CMS
  - Inhaltsmanagementsystem
  - Visual Editor
---

# Intlayer: Funktionsübersicht & Roadmap

Intlayer ist eine Lösung für Content-Management und Internationalisierung, die darauf abzielt, die Deklaration, Verwaltung und Aktualisierung von Inhalten in Ihren Anwendungen zu optimieren. Es bietet leistungsstarke Funktionen wie zentrale oder verteilte Inhaltsdeklaration, umfangreiche Internationalisierungsoptionen, Markdown-Unterstützung, bedingte Darstellung, TypeScript/JavaScript/JSON-Integration und mehr. Nachfolgend finden Sie eine umfassende Übersicht über die aktuellen Funktionen von Intlayer sowie die geplanten Roadmap-Features.

---

## Aktuelle Funktionen

### 1. Inhaltsdeklaration

#### Zentralisiert oder verteilt

- **Zentralisiert**: Deklarieren Sie alle Inhalte in einer einzigen, großen Datei am Basis Ihrer Anwendung, ähnlich wie bei i18next, sodass Sie alles an einem Ort verwalten können.
- **Verteilt**: Alternativ können Sie Ihre Inhalte in separate Dateien auf Komponenten- oder Funktionsebene aufteilen, um die Wartbarkeit zu verbessern. Dadurch bleiben Ihre Inhalte in der Nähe des relevanten Codes (Komponenten, Tests, Storybook usw.). Das Entfernen einer Komponente stellt sicher, dass alle zugehörigen Inhalte ebenfalls entfernt werden, wodurch verhindert wird, dass verbleibende Daten Ihren Code verunreinigen.

> Ressourcen:
>
> - [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md)

### 2. Internationalisierung

- Unterstützung für **230 Sprachen und Regionen** (einschließlich regionaler Varianten wie Französisch (Frankreich), Englisch (Kanada), Englisch (UK), Portugiesisch (Portugal) usw.).
- Verwalten Sie Übersetzungen für all diese Regionen einfach an einem Ort.

> Ressourcen:
>
> - [Internationalisierung](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/translation.md)

### 3. Markdown-Unterstützung

- Deklarieren Sie Inhalte mit **Markdown**, sodass Sie Text automatisch mit Absätzen, Überschriften, Links und mehr formatieren können.
- Ideal für Blogbeiträge, Artikel, Dokumentationsseiten oder jede Situation, in der eine reichhaltige Textformatierung erforderlich ist.

> Ressourcen:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/markdown.md)

### 4. Bedingte Darstellung

- Definieren Sie Inhalte, die sich basierend auf spezifischen Bedingungen anpassen, wie z. B. Benutzersprache, Benutzeranmeldestatus oder andere kontextbezogene Variablen.
- Hilft, personalisierte Erlebnisse zu schaffen, ohne Inhalte über mehrere Dateien zu duplizieren.

> Ressourcen:
>
> - [Bedingte Darstellung](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/condition.md)

### 5. Formate für Inhaltsdeklaration

Intlayer unterstützt **TypeScript** (auch JavaScript) und **JSON** für die Deklaration von Inhalten.

- **TypeScript**:

  - Stellt sicher, dass Ihre Inhaltsstruktur korrekt ist und keine Übersetzungen fehlen.
  - Bietet strikte oder flexiblere Validierungsmodi.
  - Ermöglicht dynamisches Abrufen von Daten aus Variablen, Funktionen oder externen APIs.

- **JSON**:

  - Erleichtert die Integration mit externen Tools (wie visuellen Editoren) dank seines standardisierten Formats.

  > Ressourcen:
  >
  > - [Formate für Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/content_extention_customization.md)

---

## Integration mit Frameworks & Umgebungen

### 1. Next.js

#### a. Server- und Client-Komponenten

- Bietet einen **einheitlichen Ansatz für Content-Management** für Server- und Client-Komponenten.
- Bietet einen integrierten Kontext für Server-Komponenten, der die Implementierung im Vergleich zu anderen Lösungen vereinfacht.

#### b. Metadaten, Sitemaps und robots.txt

- Abrufen und dynamisches Einfügen von Inhalten zur Generierung von Metadaten, Sitemaps oder `robots.txt`-Dateien.

#### c. Middleware

- Fügen Sie eine Middleware hinzu, um Benutzer basierend auf ihrer bevorzugten Sprache **weiterzuleiten**.

#### d. Turbopack- und Webpack-Kompatibilität

- Vollständig kompatibel mit dem neuen Next.js Turbopack sowie dem traditionellen Webpack.

> Ressourcen:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)

### 2. Vite

- Ähnlich wie bei Next.js können Sie Intlayer mit Vite integrieren und eine **Middleware** verwenden, um Benutzer basierend auf ihrer bevorzugten Sprache weiterzuleiten.

> Ressourcen:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md)

### 3. Express

- Verwalten Sie Inhalte und internationalisieren Sie Backend-Dienste, die auf Express basieren.
- Personalisieren Sie E-Mails, Fehlermeldungen, Push-Benachrichtigungen und mehr mit lokalisierten Texten.

> Ressourcen:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_express.md)

---

## Visuelle Editoren und CMS

### 1. Lokaler visueller Editor

- Ein **kostenloser, lokaler visueller Editor**, mit dem Sie die Inhalte Ihrer Anwendung direkt durch Auswahl von Elementen auf der Seite bearbeiten können.
- Integriert KI-Funktionen, um:
  - Übersetzungen zu generieren oder zu korrigieren
  - Syntax und Rechtschreibung zu überprüfen
  - Verbesserungen vorzuschlagen
- Kann lokal gehostet oder auf einem Remote-Server bereitgestellt werden.

> Ressourcen:
>
> - [Visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remote)

- Eine **gehostete CMS-Lösung**, die es Ihnen ermöglicht, Anwendungsinhalte online zu verwalten, ohne Ihren Code zu berühren.
- Bietet KI-unterstützte Funktionen zur Deklaration von Inhalten, Verwaltung von Übersetzungen und Behebung von Syntax- oder Rechtschreibfehlern.
- Interagieren Sie mit Ihren Inhalten über Ihre Live-Anwendungsschnittstelle.

> Ressourcen:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md)

---

## Intlayer CLI

- **Audit und Übersetzungsgenerierung**: Führen Sie Audits Ihrer Inhaltsdateien durch, um fehlende Übersetzungen zu generieren oder ungenutzte zu identifizieren.
- **Remote-Interaktion**: Veröffentlichen Sie Ihre lokalen Inhalte im Remote-CMS oder holen Sie Remote-Inhalte ab, um sie in Ihre lokale Anwendung zu integrieren.
- Nützlich für **CI/CD-Pipelines**, um sicherzustellen, dass Ihre Inhalte immer mit Ihrem Code synchronisiert sind.

> Ressourcen:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)

---

## Umgebungen

- Verwenden Sie **Umgebungsvariablen**, um Intlayer unterschiedlich für Produktions-, Test- und lokale Umgebungen zu konfigurieren.
- Definieren Sie, welches Projekt des visuellen Editors oder des Remote-CMS je nach Umgebung angesprochen werden soll.

---

## Live-Inhaltsaktualisierungen

- Bei Verwendung von Remote-Wörterbüchern und dem Intlayer CMS können Sie die Inhalte Ihrer Anwendung **sofort aktualisieren**, ohne eine erneute Bereitstellung vornehmen zu müssen.

> Ressourcen:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md)

---

## Roadmap: Zukünftige Funktionen

### 1. A/B-Tests & Personalisierung

- **Multivariate Tests**: Testen Sie verschiedene Versionen eines Inhalts, um herauszufinden, welche am besten funktioniert (z. B. höhere Klickrate).
- **Datengetriebene Personalisierung**: Zeigen Sie unterschiedliche Inhalte basierend auf Benutzerdemografie (Geschlecht, Alter, Standort usw.) oder anderen Verhaltensmustern an.
- **Automatisierte Iteration**: Ermöglichen Sie KI, mehrere Versionen automatisch zu testen und entweder die beste auszuwählen oder Optionen zur Genehmigung vorzuschlagen.

### 2. Versionierung

- Stellen Sie frühere Versionen Ihrer Inhalte mit **Inhaltsversionierung** wieder her.
- Verfolgen Sie Änderungen im Laufe der Zeit und kehren Sie bei Bedarf zu früheren Zuständen zurück.

### 3. Automatische Übersetzung

- Für Remote-CMS-Benutzer: **Ein-Klick-Übersetzungsgenerierung** für jede unterstützte Sprache.
- Das System würde Übersetzungen im Hintergrund generieren und Sie dann zur Validierung oder Bearbeitung auffordern.

### 4. SEO-Verbesserungen

- Tools zur **Analyse von Schlüsselwörtern**, Benutzerabsichten und aufkommenden Trends.
- Vorschläge für verbesserte Inhalte zur besseren Platzierung und Verfolgung der langfristigen Leistung.

### 5. Kompatibilität mit weiteren Frameworks

- Es wird daran gearbeitet, **Vue, Solid, Svelte, Angular** und mehr zu unterstützen.
- Ziel ist es, Intlayer mit **jeder JavaScript-basierten Anwendung** kompatibel zu machen.

### 6. IDE-Erweiterungen

- Erweiterungen für wichtige IDEs, um eine **grafische Oberfläche** für die Verwaltung lokaler und Remote-Übersetzungen bereitzustellen.
- Funktionen könnten die automatische Generierung von Inhaltsdeklarationsdateien für Komponenten, die direkte Integration mit dem Intlayer CMS und die Echtzeitvalidierung umfassen.

---

## Fazit

Intlayer soll eine All-in-One-Lösung für Content-Management und Internationalisierung sein. Es konzentriert sich auf Flexibilität (zentrale oder verteilte Dateien), umfassende Sprachunterstützung, einfache Integration mit modernen Frameworks und Bundlern sowie leistungsstarke KI-gestützte Funktionen. Mit neuen Funktionen wie A/B-Tests, Versionierung und automatisierten Übersetzungen wird Intlayer weiterhin Content-Workflows vereinfachen und Benutzererlebnisse auf verschiedenen Plattformen verbessern.

Bleiben Sie auf dem Laufenden über kommende Veröffentlichungen und erkunden Sie die vorhandenen Funktionen, um zu sehen, wie Intlayer Ihnen helfen kann, Ihre Content-Management-Prozesse heute zu zentralisieren und zu optimieren!
