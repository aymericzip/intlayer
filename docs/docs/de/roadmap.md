---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Fahrplan
description: Entdecken Sie den Fahrplan von Intlayer. Sehen Sie alle Funktionen, die Intlayer implementiert hat und plant zu implementieren.
keywords:
  - Fahrplan
  - Intlayer
  - Internationalisierung
  - CMS
  - Content-Management-System
  - Visueller Editor
slugs:
  - doc
  - roadmap
---

# Intlayer: Funktionsübersicht & Fahrplan

Intlayer ist eine Content-Management- und Internationalisierungslösung, die darauf ausgelegt ist, die Deklaration, Verwaltung und Aktualisierung von Inhalten in Ihren Anwendungen zu vereinfachen. Sie bietet leistungsstarke Funktionen wie zentrale oder verteilte Inhaltsdeklaration, umfangreiche Internationalisierungsoptionen, Markdown-Unterstützung, bedingte Darstellung, TypeScript/JavaScript/JSON-Integration und mehr. Im Folgenden finden Sie einen umfassenden Überblick über die derzeit von Intlayer bereitgestellten Funktionen sowie die geplanten Funktionen im Fahrplan.

---

## Aktuelle Funktionen

### 1. Inhaltsdeklaration

#### Zentralisiert oder verteilt

- **Zentralisiert**: Deklarieren Sie alle Ihre Inhalte in einer einzigen, großen Datei an der Basis Ihrer Anwendung, ähnlich wie bei i18next, sodass Sie alles an einem Ort verwalten können.
- **Verteilt**: Alternativ können Sie Ihre Inhalte in separate Dateien auf Komponenten- oder Feature-Ebene aufteilen, um die Wartbarkeit zu verbessern. Dies hält Ihre Inhalte nahe am relevanten Code (Komponenten, Tests, Storybook usw.). Das Entfernen einer Komponente stellt sicher, dass auch alle zugehörigen Inhalte entfernt werden, wodurch verbleibende Daten vermieden werden, die Ihren Code unnötig verkomplizieren.

> Ressourcen:
>
> - [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md)

### 2. Internationalisierung

- Unterstützung für **230 Sprachen und Regionen** (einschließlich regionaler Varianten wie Französisch (Frankreich), Englisch (Kanada), Englisch (UK), Portugiesisch (Portugal) usw.).
- Verwalten Sie Übersetzungen für all diese Regionen einfach an einem Ort.

> Ressourcen:
>
> - [Internationalisierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md)

### 3. Markdown-Unterstützung

- Deklarieren Sie Inhalte mit **Markdown**, wodurch Sie Text automatisch mit Absätzen, Überschriften, Links und mehr formatieren können.
- Ideal für Blogbeiträge, Artikel, Dokumentationsseiten oder jede Situation, in der eine reichhaltige Textformatierung benötigt wird.

> Ressourcen:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md)

### 4. Unterstützung für externe Dateien

- Importieren Sie Inhalte aus externen Dateien im Textformat, wie TXT, HTML, JSON, YAML oder CSV.
- Verwenden Sie die `file`-Funktion in Intlayer, um externe Dateiinhalte in ein Wörterbuch einzubetten und so eine nahtlose Integration mit dem Intlayer Visual Editor und CMS zu gewährleisten.
- Unterstützt dynamische Inhaltsaktualisierungen, was bedeutet, dass der Inhalt automatisch innerhalb von Intlayer aktualisiert wird, wenn die Quelldatei geändert wird.
- Ermöglicht mehrsprachiges Content-Management durch dynamisches Verknüpfen sprachspezifischer Markdown-Dateien.

> Ressourcen:
>
> - [Dateiinhalt-Einbettung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/file.md)

### 5. Dynamische Inhalte & Funktionsabruf

Intlayer bietet verschiedene Methoden zum Einfügen und Verwalten dynamischer Inhalte, um Flexibilität und Anpassungsfähigkeit bei der Inhaltsbereitstellung zu gewährleisten. Dazu gehören Funktionen für dynamische Inhaltseinfügung, bedingte Darstellung, Enumeration, Verschachtelung und Funktionsabruf.

1. Dynamische Inhaltseinfügung

   Verwenden Sie die insert-Funktion, um Inhalte mit Platzhaltern ({{name}}, {{age}} usw.) zu definieren.

   Ermöglicht vorlagenähnliche Inhalte, die sich basierend auf Benutzereingaben, API-Antworten oder anderen dynamischen Datenquellen anpassen.

   Funktioniert nahtlos mit TypeScript, ESM, CommonJS und JSON-Konfigurationen.

   Lässt sich einfach mit React Intlayer und Next Intlayer unter Verwendung von useIntlayer integrieren.

2. Bedingte Darstellung

   Definieren Sie Inhalte, die sich basierend auf benutzerspezifischen Bedingungen wie Sprache oder Authentifizierungsstatus anpassen.

   Gestalten Sie personalisierte Erlebnisse, ohne Inhalte in mehreren Dateien zu duplizieren.

3. Aufzählung & Pluralisierung

   Verwenden Sie die enu-Funktion, um Inhaltsvariationen basierend auf numerischen Werten, Bereichen oder benutzerdefinierten Schlüsseln zu definieren.

   Gewährleistet die automatische Auswahl der korrekten Phrase basierend auf einem gegebenen Wert.

   Unterstützt Ordnungsregeln und sorgt so für vorhersehbares Verhalten.

4. Verschachtelung & Unterinhaltsverweise

   Verwenden Sie die Funktion nest, um Inhalte aus einem anderen Wörterbuch zu referenzieren und wiederzuverwenden, wodurch Duplikate reduziert werden.

   Unterstützt strukturierte und hierarchische Inhaltsverwaltung für bessere Wartbarkeit.

5. Funktionsabruf

   Intlayer ermöglicht es, Inhalte als Funktionen zu deklarieren, wodurch sowohl synchrone als auch asynchrone Inhaltsabrufe möglich sind.

   Synchrone Funktionen: Inhalte werden dynamisch zur Build-Zeit generiert.

   Asynchrone Funktionen: Daten werden dynamisch aus externen Quellen (z. B. APIs, Datenbanken) abgerufen.

   Integration: Funktioniert mit TypeScript, ESM und CommonJS, wird jedoch in JSON- oder Remote-Inhaltsdateien nicht unterstützt.

### 6. Inhaltsdeklarationsformate

Intlayer unterstützt **TypeScript** (auch JavaScript) und **JSON** zur Deklaration von Inhalten.

- **TypeScript**:

  - Stellt sicher, dass Ihre Inhaltsstruktur korrekt ist und keine Übersetzungen fehlen.
  - Bietet strenge oder flexiblere Validierungsmodi.
  - Ermöglicht das dynamische Abrufen von Daten aus Variablen, Funktionen oder externen APIs.

- **JSON**:

  - Erleichtert die Integration mit externen Tools (wie visuellen Editoren) aufgrund seines standardisierten Formats.

  > Ressourcen:
  >
  > - [Formate zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_extention_customization.md)

### 7. Bereinigung, Bundle-Optimierung und dynamische Importe

- Intlayer integriert `Babel`- und `SWC`-Plugins, um Ihr Bundle zu optimieren und die Leistung zu verbessern. Es ersetzt Importe, um nur die Wörterbücher zu importieren, die im Bundle verwendet werden.
- Durch Aktivierung der Option ermöglicht Intlayer auch das dynamische Importieren des Wörterbuchinhalts nur für die aktuelle Locale.

> Ressourcen:
>
> - [Build-Konfiguration](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Integration mit Frameworks & Umgebungen

### 1. Next.js

#### a. Server- und Client-Komponenten

- Bietet einen **einheitlichen Ansatz für das Content-Management** sowohl für Server- als auch für Client-Komponenten.
- Stellt einen integrierten Kontext für Server-Komponenten bereit, der die Implementierung im Vergleich zu anderen Lösungen vereinfacht.

#### b. Metadaten, Sitemaps und robots.txt

- Ruft Inhalte dynamisch ab und injiziert sie, um Metadaten, Sitemaps oder `robots.txt`-Dateien zu generieren.

#### c. Middleware

- Fügt eine Middleware hinzu, um **Benutzer basierend auf ihrer bevorzugten Sprache** zu Inhalten weiterzuleiten.

#### d. Turbopack- und Webpack-Kompatibilität

- Vollständig kompatibel mit dem neuen Next.js Turbopack sowie dem traditionellen Webpack.

> Ressourcen:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

### 2. Vite

- Ähnlich wie bei Next.js können Sie Intlayer mit Vite integrieren und eine **Middleware** verwenden, um Benutzer basierend auf ihrer bevorzugten Sprache zu Inhalten weiterzuleiten.

> Ressourcen:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)

### 3. Express

- Verwalten Sie Inhalte und internationalisieren Sie Backend-Dienste, die auf Express basieren.
- Personalisieren Sie E-Mails, Fehlermeldungen, Push-Benachrichtigungen und mehr mit lokalisiertem Text.

> Ressourcen:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_express.md)

### 4. React Native

- Integrieren Sie Intlayer mit React Native, um Inhalte zu verwalten und Ihre mobilen Anwendungen zu internationalisieren.
- Unterstützt sowohl iOS- als auch Android-Plattformen.

> Ressourcen:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_native.md)

### 5. Lynx

- Integrieren Sie Intlayer mit Lynx, um Inhalte zu verwalten und Ihre mobilen Anwendungen zu internationalisieren.
- Unterstützt sowohl iOS- als auch Android-Plattformen.

> Ressourcen:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_lynx.md)

### 6. Vue

- Integrieren Sie Intlayer mit Vue, um Inhalte zu verwalten und Ihre Vite / Vue.js-Anwendungen zu internationalisieren.

> Ressourcen:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vue.md)

### 7. Nuxt

- Integrieren Sie Intlayer mit Nuxt, um Inhalte zu verwalten und Ihre Nuxt- / Vue.js-Anwendungen zu internationalisieren.
- Unterstützt sowohl Server- als auch Client-Komponenten.
- Integriert Routing und Middleware, um Benutzer basierend auf ihrer bevorzugten Sprache zu Inhalten weiterzuleiten.

> Ressourcen:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nuxt.md)

### 8. Preact

- Integrieren Sie Intlayer mit Preact, um Inhalte zu verwalten und Ihre Preact-Anwendungen zu internationalisieren.

> Ressourcen:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_preact.md)

---

## Visuelle Editoren und CMS

### 1. Lokaler visueller Editor

- Ein **kostenloser, lokaler visueller Editor**, mit dem Sie Ihre Anwendungsinhalte bearbeiten können, indem Sie Elemente direkt auf der Seite auswählen.
- Integriert KI-Funktionen zur Unterstützung bei:
  - Generierung oder Korrektur von Übersetzungen
  - Überprüfung von Syntax und Rechtschreibung
  - Vorschlägen für Verbesserungen
- Kann lokal gehostet oder auf einem entfernten Server bereitgestellt werden.

> Ressourcen:
>
> - [Visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remote)

- Eine **gehostete CMS**-Lösung, die es Ihnen ermöglicht, Anwendungsinhalte online zu verwalten, ohne Ihren Code zu berühren.
- Bietet KI-unterstützte Funktionen zum Deklarieren von Inhalten, Verwalten von Übersetzungen und Korrigieren von Syntax- oder Rechtschreibfehlern.
- Interagieren Sie mit Ihren Inhalten über Ihre Live-Anwendungsoberfläche.

> Ressourcen:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

---

## IDE-Erweiterungen

- Erweiterungen für gängige IDEs, die eine **grafische Benutzeroberfläche** zur Verwaltung von lokalen und entfernten Übersetzungen bieten.
- Funktionen können das automatische Generieren von Inhaltsdeklarationsdateien für Komponenten, die direkte Integration mit dem Intlayer CMS und Echtzeitvalidierung umfassen.

---

## MCP-Server

- Ein **MCP-Server**, der es Ihnen ermöglicht, Ihre Inhalte und Übersetzungen mit einem integrierten Werkzeug in Ihrer IDE zu verwalten.

---

## Intlayer CLI

- **Übersetzung und Dateigenerierung**: Führen Sie Prüfungen Ihrer Inhaltsdateien durch, um fehlende Übersetzungen zu generieren und Inkonsistenzen zu überprüfen.
- **Remote-Interaktion**: Schieben Sie Ihre lokalen Inhalte zum entfernten CMS oder ziehen Sie entfernte Inhalte, um sie in Ihre lokale Anwendung zu integrieren.
- **Dokumentübersetzung und -überprüfung**: Übersetzen und überprüfen Sie Ihre Dokumentation / Dateien usw.

> Ressourcen:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)

---

## Umgebungen

- Verwenden Sie **Umgebungsvariablen**, um Intlayer in Produktions-, Test- und lokalen Umgebungen unterschiedlich zu konfigurieren.
- Definieren Sie, welchen visuellen Editor oder welches Remote-CMS-Projekt Sie je nach Umgebung ansprechen möchten.

---

## Hot Content Updates

- Wenn Sie Remote-Wörterbücher und das Intlayer CMS verwenden, können Sie den Inhalt Ihrer Anwendung **dynamisch aktualisieren**, ohne neu bereitstellen zu müssen.

> Ressourcen:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

---

## Kommende Funktionen

### 1. A/B-Tests & Personalisierung

- **Multivariate Tests**: Testen Sie verschiedene Versionen eines bestimmten Inhalts, um zu sehen, welche am besten abschneidet (z. B. höhere Klickrate).
- **Datengetriebene Personalisierung**: Zeigen Sie unterschiedliche Inhalte basierend auf demografischen Daten der Nutzer (Geschlecht, Alter, Standort usw.) oder anderen Verhaltensmustern an.
- **Automatisierte Iteration**: Ermöglichen Sie es der KI, automatisch mehrere Versionen zu testen und entweder den besten Performer auszuwählen oder Optionen zur Genehmigung durch den Administrator vorzuschlagen.

### 2. Versionierung

- Stellen Sie frühere Versionen Ihrer Inhalte mit **Content-Versionierung** wieder her.
- Verfolgen Sie Änderungen im Laufe der Zeit und kehren Sie bei Bedarf zu früheren Zuständen zurück.

### 3. Automatische Übersetzung

- Für Remote-CMS-Nutzer: **Ein-Klick-Übersetzungserstellung** für jede unterstützte Sprache.
- Das System würde Übersetzungen im Hintergrund generieren und Sie anschließend zur Validierung oder Bearbeitung auffordern.

### 4. SEO-Verbesserungen

- Werkzeuge zur **Analyse von Schlüsselwörtern**, der Suchintention der Nutzer und aufkommenden Trends.
- Vorschläge für verbesserten Inhalt zur besseren Platzierung und zur Verfolgung der langfristigen Leistung.

### 5. Kompatibilität mit weiteren Frameworks

- Es wird daran gearbeitet, **Solid, Svelte, Angular** und weitere zu unterstützen.
- Ziel ist es, Intlayer mit **jeder JavaScript-basierten Anwendung** kompatibel zu machen.

---

## Fazit

- Das System würde im Hintergrund Übersetzungen generieren und Sie dann zur Validierung oder Bearbeitung auffordern.

### 4. SEO-Verbesserungen

- Werkzeuge zur **Analyse von Schlüsselwörtern**, der Suchintention der Nutzer und aufkommenden Trends.
- Vorschläge für verbesserten Inhalt zur besseren Platzierung und Verfolgung der langfristigen Leistung.

### 5. Kompatibilität mit weiteren Frameworks

- Es wird daran gearbeitet, **Solid, Svelte, Angular** und weitere zu unterstützen.
- Ziel ist es, Intlayer mit **jeder JavaScript-basierten Anwendung** kompatibel zu machen.

---

## Fazit

Intlayer strebt danach, eine All-in-One-Lösung für Content-Management und Internationalisierung zu sein. Der Fokus liegt auf Flexibilität (zentralisierte oder verteilte Dateien), breiter Sprachunterstützung, einfacher Integration mit modernen Frameworks und Bundlern sowie leistungsstarken KI-gesteuerten Funktionen. Mit der Einführung neuer Fähigkeiten wie A/B-Tests, Versionierung und automatisierten Übersetzungen wird Intlayer weiterhin Content-Workflows vereinfachen und Benutzererlebnisse auf verschiedenen Plattformen verbessern.

Bleiben Sie gespannt auf kommende Releases und zögern Sie nicht, die bestehenden Funktionen zu erkunden, um zu sehen, wie Intlayer Ihre Content-Management-Prozesse heute zentralisieren und optimieren kann!

---

## Dokumentationshistorie

- 5.5.10 - 2025-06-30: Unterstützung für Preact und Nuxt hinzugefügt, MCP-Server, CLI aktualisiert
- 5.5.10 - 2025-06-29: Historie initialisiert
