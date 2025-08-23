---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: react-i18next vs react-intl vs Intlayer
description: Integration von react-i18next mit next-intl und Intlayer für die Internationalisierung (i18n) einer React-App
keywords:
  - next-intl
  - react-i18next
  - Intlayer
  - Internationalisierung
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - react-i18next-vs-react-intl-vs-intlayer
---

# react-Intl VS react-i18next VS Intlayer | React Internationalisierung (i18n)

Dieser Leitfaden vergleicht drei etablierte i18n-Optionen für **React**: **react-intl** (FormatJS), **react-i18next** (i18next) und **Intlayer**.
Wir konzentrieren uns auf **reine React**-Anwendungen (z. B. Vite, CRA, SPA). Wenn Sie Next.js verwenden, sehen Sie unseren speziellen Next.js-Vergleich.

Wir bewerten:

- Architektur & Inhaltsorganisation
- TypeScript & Sicherheit
- Umgang mit fehlenden Übersetzungen
- Umfangreiche Inhalts- & Formatierungsfunktionen
- Leistung & Ladeverhalten
- Entwicklererfahrung (DX), Tools & Wartung
- SEO/Routing (frameworkabhängig)

> **Kurzfassung**: Alle drei können eine React-App lokalisieren. Wenn Sie **komponentenbezogenen Inhalt**, **strenge TypeScript-Typen**, **Build-Zeit-Prüfungen auf fehlende Schlüssel**, **baumgeschüttelte Wörterbücher** und integrierte redaktionelle Werkzeuge (Visueller Editor/CMS + optionale KI-Übersetzung) wünschen, ist **Intlayer** die vollständigste Wahl für modulare React-Codebasen.

---

## Übergeordnete Positionierung

- **react-intl** — ICU-first, standardkonforme Formatierung (Datum/Zahlen/Pluralformen) mit einer ausgereiften API. Kataloge sind typischerweise zentralisiert; Schlüssel-Sicherheit und Build-Zeit-Validierung liegen größtenteils bei Ihnen.
- **react-i18next** — Extrem beliebt und flexibel; Namespaces, Detektoren und viele Plugins (ICU, Backends). Leistungsstark, aber die Konfiguration kann mit wachsendem Projektumfang umfangreich werden.
- **Intlayer** — Komponentenorientiertes Inhaltsmodell für React, **strenge TS-Typisierung**, **Build-Zeit-Prüfungen**, **Tree-Shaking**, plus **Visueller Editor/CMS** und **KI-unterstützte Übersetzungen**. Funktioniert mit React Router, Vite, CRA usw.

---

## Funktionsmatrix (React-Fokus)

| Funktion                                           | `react-intlayer` (Intlayer)                                                                                                                       | `react-i18next` (i18next)                                                                                                          | `react-intl` (FormatJS)                                                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Übersetzungen in der Nähe der Komponenten**      | ✅ Ja, Inhalte sind mit jeder Komponente zusammengefasst                                                                                          | ❌ Nein                                                                                                                            | ❌ Nein                                                                                                             |
| **TypeScript-Integration**                         | ✅ Fortgeschritten, automatisch generierte strenge Typen                                                                                          | ⚠️ Grundlegend; zusätzliche Konfiguration für Sicherheit                                                                           | ✅ Gut, aber weniger streng                                                                                         |
| **Fehlende Übersetzungs-Erkennung**                | ✅ TypeScript-Fehlerhervorhebung und Build-Zeit Fehler/Warnung                                                                                    | ⚠️ Meistens Fallback-Strings zur Laufzeit                                                                                          | ⚠️ Fallback-Strings                                                                                                 |
| **Reicher Inhalt (JSX/Markdown/Komponenten)**      | ✅ Direkte Unterstützung                                                                                                                          | ⚠️ Eingeschränkt / nur Interpolation                                                                                               | ⚠️ ICU-Syntax, kein echtes JSX                                                                                      |
| **KI-gestützte Übersetzung**                       | ✅ Ja, unterstützt mehrere KI-Anbieter. Nutzbar mit eigenen API-Schlüsseln. Berücksichtigt den Kontext Ihrer Anwendung und den Umfang des Inhalts | ❌ Nein                                                                                                                            | ❌ Nein                                                                                                             |
| **Visueller Editor**                               | ✅ Ja, lokaler visueller Editor + optionales CMS; kann Codebasis-Inhalte auslagern; einbettbar                                                    | ❌ Nein / verfügbar über externe Lokalisierungsplattformen                                                                         | ❌ Nein / verfügbar über externe Lokalisierungsplattformen                                                          |
| **Lokalisierte Routenführung**                     | ✅ Ja, unterstützt lokalisierte Pfade direkt (funktioniert mit Next.js & Vite)                                                                    | ⚠️ Nicht eingebaut, erfordert Plugins (z.B. `next-i18next`) oder benutzerdefinierte Router-Konfiguration                           | ❌ Nein, nur Nachrichtenformatierung, Routing muss manuell erfolgen                                                 |
| **Dynamische Routen-Generierung**                  | ✅ Ja                                                                                                                                             | ⚠️ Plugin/Ökosystem oder manuelle Einrichtung                                                                                      | ❌ Nicht bereitgestellt                                                                                             |
| **Pluralisierung**                                 | ✅ Aufzählungsbasierte Muster                                                                                                                     | ✅ Konfigurierbar (Plugins wie i18next-icu)                                                                                        | ✅ (ICU)                                                                                                            |
| **Formatierung (Daten, Zahlen, Währungen)**        | ✅ Optimierte Formatierer (Intl im Hintergrund)                                                                                                   | ⚠️ Über Plugins oder benutzerdefinierte Intl-Nutzung                                                                               | ✅ ICU-Formatierer                                                                                                  |
| **Inhaltsformat**                                  | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml in Arbeit)                                                                                            | ⚠️ .json                                                                                                                           | ✅ .json, .js                                                                                                       |
| **ICU-Unterstützung**                              | ⚠️ In Arbeit                                                                                                                                      | ⚠️ Über Plugin (i18next-icu)                                                                                                       | ✅ Ja                                                                                                               |
| **SEO-Helfer (hreflang, Sitemap)**                 | ✅ Eingebaute Werkzeuge: Helfer für Sitemap, robots.txt, Metadaten                                                                                | ⚠️ Community-Plugins / manuell                                                                                                     | ❌ Nicht im Kern                                                                                                    |
| **Ökosystem / Community**                          | ⚠️ Kleiner, aber schnell wachsend und reaktiv                                                                                                     | ✅ Größte und ausgereifte                                                                                                          | ✅ Groß                                                                                                             |
| **Server-seitiges Rendering & Server-Komponenten** | ✅ Ja, optimiert für SSR / React Server-Komponenten                                                                                               | ⚠️ Unterstützt auf Seitenebene, aber t-Funktionen müssen im Komponentenbaum für untergeordnete Server-Komponenten übergeben werden | ❌ Nicht unterstützt, t-Funktionen müssen im Komponentenbaum für untergeordnete Server-Komponenten übergeben werden |
| **Tree-shaking (nur genutzte Inhalte laden)**      | ✅ Ja, pro Komponente zur Build-Zeit über Babel/SWC-Plugins                                                                                       | ⚠️ Lädt normalerweise alles (kann mit Namespaces/Code-Splitting verbessert werden)                                                 | ⚠️ Lädt normalerweise alles                                                                                         |
| **Lazy Loading**                                   | ✅ Ja, pro Sprache / pro Wörterbuch                                                                                                               | ✅ Ja (z.B. Backends/Namespaces bei Bedarf)                                                                                        | ✅ Ja (aufgeteilte Sprachpakete)                                                                                    |
| **Bereinigung ungenutzter Inhalte**                | ✅ Ja, pro Wörterbuch zur Build-Zeit                                                                                                              | ❌ Nein, nur durch manuelle Namespace-Segmentierung                                                                                | ❌ Nein, alle deklarierten Nachrichten werden gebündelt                                                             |
| **Verwaltung großer Projekte**                     | ✅ Fördert Modularität, geeignet für Design-Systeme                                                                                               | ⚠️ Benötigt gute Dateidisziplin                                                                                                    | ⚠️ Zentrale Kataloge können sehr groß werden                                                                        |

---

## Tiefgehender Vergleich

### 1) Architektur & Skalierbarkeit

- **react-intl / react-i18next**: Die meisten Setups pflegen **zentralisierte Sprachordner** pro Sprache, manchmal aufgeteilt in **Namespaces** (i18next). Funktioniert anfangs gut, wird aber mit wachsender App zu einer gemeinsam genutzten Oberfläche.
- **Intlayer**: Fördert **pro-Komponente (oder pro-Feature) Wörterbücher**, die **direkt neben der UI** liegen, die sie bedienen. Dies sorgt für klare Verantwortlichkeiten, erleichtert die Duplizierung/Migration von Komponenten und reduziert den Schlüsselwechsel zwischen Teams. Unbenutzte Inhalte sind leichter zu erkennen und zu entfernen.

**Warum das wichtig ist:** Modularer Inhalt spiegelt modulare UI wider. Große React-Codebasen bleiben sauberer, wenn Übersetzungen bei den Komponenten leben, zu denen sie gehören.

---

### 2) TypeScript & Sicherheit

- **react-intl**: Solide Typisierung, aber **keine automatische Schlüsseltypisierung**; Sicherheitsmuster müssen selbst durchgesetzt werden.
- **react-i18next**: Starke Typisierung für Hooks; **strikte Schlüsseltypisierung** erfordert typischerweise zusätzliche Konfiguration oder Generatoren.
- **Intlayer**: **Generiert automatisch strenge Typen** aus Ihrem Inhalt. Die IDE-Autovervollständigung und **Kompilierzeit-Fehler** erkennen Tippfehler und fehlende Schlüssel vor der Laufzeit.

**Warum das wichtig ist:** Das Verschieben von Fehlern nach **links** (zum Build/CI) reduziert Produktionsprobleme und beschleunigt die Feedback-Schleifen für Entwickler.

---

### 3) Umgang mit fehlenden Übersetzungen

- **react-intl / react-i18next**: Standardmäßig **Laufzeit-Fallbacks** (Schlüssel-Echo oder Standardsprache). Sie können Linting/Plugins hinzufügen, aber es ist nicht garantiert, dass dies beim Build passiert.
- **Intlayer**: **Build-Zeit-Erkennung** mit Warnungen oder Fehlern, wenn erforderliche Sprachen/Schlüssel fehlen.

**Warum das wichtig ist:** Ein fehlschlagender CI-Prozess bei fehlenden Strings verhindert, dass „mysteriöses Englisch“ in nicht-englische UIs gelangt.

---

### 4) Reichhaltiger Inhalt & Formatierung

- **react-intl**: Hervorragende **ICU**-Unterstützung für Pluralformen, Auswahlmöglichkeiten, Datums-/Zahlenformate und Nachrichtenkomposition. JSX kann verwendet werden, aber das mentale Modell bleibt nachrichtenorientiert.
- **react-i18next**: Flexible Interpolation und **`<Trans>`** zum Einbetten von Elementen/Komponenten; ICU ist über ein Plugin verfügbar.
- **Intlayer**: Inhaltsdateien können **reiche Knoten** (JSX/Markdown/Komponenten) und **Metadaten** enthalten. Die Formatierung verwendet intern Intl; Pluralmuster sind ergonomisch.

**Warum das wichtig ist:** Komplexe UI-Texte (Links, fettgedruckte Teile, Inline-Komponenten) sind einfacher zu handhaben, wenn die Bibliothek React-Knoten sauber unterstützt.

---

### 5) Leistung & Ladeverhalten

- **react-intl / react-i18next**: Sie verwalten typischerweise **Katalogaufteilung** und **Lazy Loading** manuell (Namespaces/dynamische Importe). Effektiv, erfordert aber Disziplin.
- **Intlayer**: **Entfernt ungenutzte Wörterbücher** automatisch (Tree-shaking) und unterstützt **Lazy Loading pro Wörterbuch/pro Sprache** direkt out-of-the-box.

**Warum das wichtig ist:** Kleinere Bundles und weniger ungenutzte Strings verbessern die Start- und Navigationsleistung.

---

### 6) DX, Tooling & Wartung

- **react-intl / react-i18next**: Breites Community-Ökosystem; für redaktionelle Workflows verwendet man üblicherweise externe Lokalisierungsplattformen.
- **Intlayer**: Bietet einen **kostenlosen Visual Editor** und ein **optionales CMS** (Inhalte in Git behalten oder auslagern). Außerdem gibt es eine **VSCode-Erweiterung** für die Inhaltserstellung und **KI-unterstützte Übersetzung** mit eigenen Anbieter-Schlüsseln.

**Warum das wichtig ist:** Eingebaute Werkzeuge verkürzen den Kreislauf zwischen Entwicklern und Inhaltserstellern — weniger Klebecode, weniger Abhängigkeiten von Drittanbietern.

---

## Wann welches wählen?

- **Wählen Sie react-intl**, wenn Sie eine **ICU-first** Nachrichtenformatierung mit einer einfachen, standardkonformen API wünschen und Ihr Team damit vertraut ist, Kataloge und Sicherheitsprüfungen manuell zu pflegen.
- **Wählen Sie react-i18next**, wenn Sie die **Vielfalt des i18next-Ökosystems** (Detektoren, Backends, ICU-Plugin, Integrationen) benötigen und mehr Konfiguration für mehr Flexibilität akzeptieren.
- **Wählen Sie Intlayer**, wenn Sie **komponentenbezogenen Inhalt**, **striktes TypeScript**, **Build-Zeit-Garantien**, **Tree-Shaking** und **inklusive redaktionelle Werkzeuge** schätzen – besonders für **große, modulare** React-Anwendungen.

---

## Praktische Migrationshinweise (react-intl / react-i18next → Intlayer)

- **Schrittweise migrieren**: Beginnen Sie mit einer Funktion oder Route; behalten Sie während der Umstellung die alten Kataloge parallel bei.
- **Pro-Komponenten-Wörterbücher übernehmen**: Platzieren Sie Inhalte zusammen mit den Komponenten, um die Kopplung zu reduzieren.
- **Strenge Prüfungen aktivieren**: Lassen Sie Build-Zeit-Fehler fehlende Schlüssel/Locales frühzeitig in der CI anzeigen.
- **Bundles messen**: Erwarten Sie Reduzierungen, da ungenutzte Strings entfernt werden.

---

## Fazit

Alle drei Bibliotheken lokalisieren React effektiv. Der Unterschied liegt darin, wie viel **Infrastruktur** Sie aufbauen müssen, um eine **sichere, skalierbare** Umgebung zu erreichen:

- Mit **Intlayer** sind **modularer Inhalt**, **strikte TS-Typisierung**, **Build-Zeit-Sicherheit**, **baumgeschüttelte Bundles** und **redaktionelle Werkzeuge** Standard — keine lästige Pflicht.
- Wenn Ihr Team **Wartbarkeit und Geschwindigkeit** in mehrsprachigen, komponentenbasierten React-Anwendungen schätzt, bietet Intlayer heute den **vollständigsten** Entwickler- und Inhaltsworkflow.
