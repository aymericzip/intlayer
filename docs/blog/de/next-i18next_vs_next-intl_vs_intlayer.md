---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next vs next-intl vs Intlayer
description: Vergleich von next-i18next mit next-intl und Intlayer für die Internationalisierung (i18n) einer Next.js-App
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Internationalisierung
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Next.js Internationalisierung (i18n)

![next-i18next VS next-intl VS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.png?raw=true)

Werfen wir einen Blick auf die Gemeinsamkeiten und Unterschiede zwischen drei i18n-Optionen für Next.js: next-i18next, next-intl und Intlayer.

Dies ist kein vollständiges Tutorial. Es ist ein Vergleich, der Ihnen bei der Auswahl helfen soll.

Wir konzentrieren uns auf den **Next.js 13+ App Router** (mit **React Server Components**) und bewerten:

1. **Architektur & Inhaltsorganisation**
2. **TypeScript & Sicherheit**
3. **Umgang mit fehlenden Übersetzungen**
4. **Routing & Middleware**
5. **Performance & Ladeverhalten**
6. **Entwicklererfahrung (DX), Tools & Wartung**
7. **SEO & Skalierbarkeit bei großen Projekten**

> **Kurzfassung**: Alle drei können eine Next.js-App lokalisieren. Wenn Sie **komponentenbezogenen Inhalt**, **strenge TypeScript-Typen**, **Build-Zeit-Prüfungen fehlender Schlüssel**, **tree-shakbare Wörterbücher** und **erstklassige App Router- und SEO-Hilfen** wünschen, ist **Intlayer** die vollständigste und modernste Wahl.

> Eine häufige Verwirrung bei Entwicklern ist die Annahme, dass `next-intl` die Next.js-Version von `react-intl` sei. Das ist nicht der Fall – `next-intl` wird von [Amann](https://github.com/amannn) gepflegt, während `react-intl` von [FormatJS](https://github.com/formatjs/formatjs) betreut wird.

---

## Kurz gesagt

- **next-intl** – Leichtgewichtiges, unkompliziertes Nachrichtenformat mit solider Next.js-Unterstützung. Zentralisierte Kataloge sind üblich; die Entwicklererfahrung (DX) ist einfach, aber Sicherheit und großflächige Wartung bleiben größtenteils Ihre Verantwortung.
- **next-i18next** – i18next im Next.js-Gewand. Ausgereiftes Ökosystem und Funktionen über Plugins (z. B. ICU), aber die Konfiguration kann umfangreich sein und Kataloge neigen dazu, mit wachsendem Projekt zentralisiert zu werden.
- **Intlayer** – Komponentenorientiertes Inhaltsmodell für Next.js, **strikte TS-Typisierung**, **Build-Zeit-Prüfungen**, **Tree-Shaking**, **eingebaute Middleware- & SEO-Hilfen**, optionaler **Visueller Editor/CMS** und **KI-unterstützte Übersetzungen**.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> Abzeichen werden automatisch aktualisiert. Schnappschüsse können sich im Laufe der Zeit ändern.

---

## Gegenüberstellung der Funktionen (Fokus auf Next.js)

| Funktion | `next-intlayer` (Intlayer) | `next-intl` | `next-i18next` |

> Abzeichen werden automatisch aktualisiert. Screenshots können sich im Laufe der Zeit ändern.

---

## Gegenüberstellung der Funktionen (Fokus auf Next.js)

| Funktion                                           | `next-intlayer` (Intlayer)                                                                                                                        | `next-intl`                                                                                                                           | `next-i18next`                                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Übersetzungen in der Nähe der Komponenten**      | ✅ Ja, Inhalt ist mit jeder Komponente zusammengefasst                                                                                            | ❌ Nein                                                                                                                               | ❌ Nein                                                                                                                               |
| **TypeScript-Integration**                         | ✅ Fortgeschritten, automatisch generierte strenge Typen                                                                                          | ✅ Gut                                                                                                                                | ⚠️ Grundlegend                                                                                                                        |
| **Erkennung fehlender Übersetzungen**              | ✅ TypeScript-Fehlerhervorhebung und Fehler-/Warnmeldung zur Build-Zeit                                                                           | ⚠️ Laufzeit-Fallback                                                                                                                  | ⚠️ Laufzeit-Fallback                                                                                                                  |
| **Reicher Inhalt (JSX/Markdown/Komponenten)**      | ✅ Direkte Unterstützung                                                                                                                          | ❌ Nicht für komplexe Knoten ausgelegt                                                                                                | ⚠️ Eingeschränkt                                                                                                                      |
| **KI-gestützte Übersetzung**                       | ✅ Ja, unterstützt mehrere KI-Anbieter. Nutzbar mit eigenen API-Schlüsseln. Berücksichtigt den Kontext Ihrer Anwendung und den Umfang des Inhalts | ❌ Nein                                                                                                                               | ❌ Nein                                                                                                                               |
| **Visueller Editor**                               | ✅ Ja, lokaler visueller Editor + optionales CMS; kann Codebasis-Inhalte auslagern; einbettbar                                                    | ❌ Nein / verfügbar über externe Lokalisierungsplattformen                                                                            | ❌ Nein / verfügbar über externe Lokalisierungsplattformen                                                                            |
| **Lokalisierte Routenführung**                     | ✅ Ja, unterstützt lokalisierte Pfade direkt (funktioniert mit Next.js & Vite)                                                                    | ✅ Eingebaut, App Router unterstützt `[locale]` Segment                                                                               | ✅ Eingebaut                                                                                                                          |
| **Dynamische Routen-Generierung**                  | ✅ Ja                                                                                                                                             | ✅ Ja                                                                                                                                 | ✅ Ja                                                                                                                                 |
| **Pluralisierung**                                 | ✅ Aufzählungsbasierte Muster                                                                                                                     | ✅ Gut                                                                                                                                | ✅ Gut                                                                                                                                |
| **Formatierung (Daten, Zahlen, Währungen)**        | ✅ Optimierte Formatierer (Intl im Hintergrund)                                                                                                   | ✅ Gut (Intl-Helfer)                                                                                                                  | ✅ Gut (Intl-Helfer)                                                                                                                  |
| **Inhaltsformat**                                  | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml in Arbeit)                                                                                            | ✅ .json, .js, .ts                                                                                                                    | ⚠️ .json                                                                                                                              |
| **ICU-Unterstützung**                              | ⚠️ In Arbeit                                                                                                                                      | ✅ Ja                                                                                                                                 | ⚠️ Über Plugin (`i18next-icu`)                                                                                                        |
| **SEO-Helfer (hreflang, Sitemap)**                 | ✅ Eingebaute Werkzeuge: Helfer für Sitemap, robots.txt, Metadaten                                                                                | ✅ Gut                                                                                                                                | ✅ Gut                                                                                                                                |
| **Ökosystem / Community**                          | ⚠️ Kleiner, wächst aber schnell und ist reaktiv                                                                                                   | ✅ Gut                                                                                                                                | ✅ Gut                                                                                                                                |
| **Server-seitiges Rendering & Server-Komponenten** | ✅ Ja, optimiert für SSR / React Server-Komponenten                                                                                               | ⚠️ Auf Seitenebene unterstützt, aber t-Funktionen müssen im Komponentenbaum an untergeordnete Server-Komponenten weitergegeben werden | ⚠️ Auf Seitenebene unterstützt, aber t-Funktionen müssen im Komponentenbaum an untergeordnete Server-Komponenten weitergegeben werden |
| **Tree-shaking (nur verwendeten Inhalt laden)**    | ✅ Ja, pro Komponente zur Build-Zeit über Babel/SWC-Plugins                                                                                       | ⚠️ Teilweise                                                                                                                          | ⚠️ Teilweise                                                                                                                          |
| **Lazy Loading**                                   | ✅ Ja, pro Sprache / pro Wörterbuch                                                                                                               | ✅ Ja (pro Route/pro Sprache), benötigt Namespace-Verwaltung                                                                          | ✅ Ja (pro Route/pro Sprache), benötigt Namespace-Verwaltung                                                                          |
| **Bereinigung ungenutzter Inhalte**                | ✅ Ja, pro Wörterbuch zur Build-Zeit                                                                                                              | ❌ Nein, kann manuell mit Namespace-Verwaltung gehandhabt werden                                                                      | ❌ Nein, kann manuell mit Namespace-Verwaltung gehandhabt werden                                                                      |
| **Verwaltung großer Projekte**                     | ✅ Fördert Modularität, geeignet für Design-Systeme                                                                                               | ✅ Modular mit Setup                                                                                                                  | ✅ Modular mit Setup                                                                                                                  |
| **Testen fehlender Übersetzungen (CLI/CI)**        | ✅ CLI: `npx intlayer content test` (CI-freundliches Audit)                                                                                       | ⚠️ Nicht eingebaut; Dokumentation empfiehlt `npx @lingual/i18n-check`                                                                 | ⚠️ Nicht eingebaut; verlässt sich auf i18next-Tools / Laufzeit `saveMissing`                                                          |

---

## Einführung

Next.js bietet integrierte Unterstützung für internationalisierte Routen (z.B. Lokalisierungssegmente). Diese Funktion übernimmt jedoch nicht automatisch die Übersetzungen. Sie benötigen weiterhin eine Bibliothek, um lokalisierten Inhalt für Ihre Nutzer darzustellen.

Es gibt viele i18n-Bibliotheken, aber in der Next.js-Welt gewinnen heute drei an Bedeutung: next-i18next, next-intl und Intlayer.

---

## Architektur & Skalierbarkeit

- **next-intl / next-i18next**: Standardmäßig **zentralisierte Kataloge** pro Locale (plus **Namespaces** in i18next). Funktioniert anfangs gut, wird aber oft zu einer großen gemeinsamen Oberfläche mit zunehmender Kopplung und Schlüsselwechsel.
- **Intlayer**: Fördert **pro-Komponenten** (oder pro-Feature) Wörterbücher, die **am selben Ort** wie der zugehörige Code liegen. Dies reduziert die kognitive Belastung, erleichtert die Duplizierung/Migration von UI-Teilen und verringert Konflikte zwischen Teams. Unbenutzter Inhalt ist so natürlicherweise leichter zu erkennen und zu entfernen.

**Warum das wichtig ist:** In großen Codebasen oder Design-System-Setups skaliert **modularer Inhalt** besser als monolithische Kataloge.

---

## Bundle-Größen & Abhängigkeiten

Nach dem Erstellen der Anwendung ist das Bundle das JavaScript, das der Browser zum Rendern der Seite lädt. Die Bundle-Größe ist daher wichtig für die Anwendungsleistung.

Zwei Komponenten sind im Kontext eines mehrsprachigen Anwendungs-Bundles wichtig:

- Der Anwendungscode
- Der vom Browser geladene Inhalt

## Anwendungscode

Die Bedeutung des Anwendungscodes ist in diesem Fall minimal. Alle drei Lösungen sind tree-shakable, was bedeutet, dass ungenutzte Teile des Codes nicht im Bundle enthalten sind.

Hier ist ein Vergleich der JavaScript-Bundle-Größe, die der Browser für eine mehrsprachige Anwendung mit den drei Lösungen lädt.

Wenn wir keinen Formatter in der Anwendung benötigen, ist die Liste der exportierten Funktionen nach dem Tree-Shaking wie folgt:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (Paketgröße ist 180,6 kB -> 78,6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (Paketgröße ist 101,3 kB -> 31,4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (Paketgröße ist 80,7 kB -> 25,5 kB (gzip))

Diese Funktionen sind nur Wrapper um den React-Kontext/-Status, daher ist der Gesamteinfluss der i18n-Bibliothek auf die Paketgröße minimal.

> Intlayer ist etwas größer als `next-intl` und `next-i18next`, da es mehr Logik in der Funktion `useIntlayer` enthält. Dies hängt mit der Integration von Markdown und `intlayer-editor` zusammen.

## Inhalt und Übersetzungen

Dieser Teil wird von Entwicklern oft ignoriert, aber betrachten wir den Fall einer Anwendung, die aus 10 Seiten in 10 Sprachen besteht. Nehmen wir zur Vereinfachung der Berechnung an, dass jede Seite zu 100 % einzigartigen Inhalt enthält (in Wirklichkeit ist viel Inhalt zwischen den Seiten redundant, z. B. Seitentitel, Kopfzeile, Fußzeile usw.).

Ein Benutzer, der die Seite `/fr/about` besuchen möchte, lädt den Inhalt einer Seite in einer bestimmten Sprache. Das Ignorieren der Inhaltsoptimierung würde bedeuten, dass unnötigerweise 8.200 % `((1 + (((10 Seiten - 1) × (10 Sprachen - 1)))) × 100)` des Anwendungsinhalts geladen werden. Sehen Sie das Problem? Selbst wenn dieser Inhalt nur Text ist und Sie wahrscheinlich eher daran denken, die Bilder Ihrer Website zu optimieren, senden Sie unnötigen Inhalt über den Globus und lassen die Computer der Benutzer ihn umsonst verarbeiten.

Zwei wichtige Probleme:

- **Aufteilung nach Route:**

  > Wenn ich mich auf der Seite `/about` befinde, möchte ich nicht den Inhalt der Seite `/home` laden.

- **Aufteilung nach Sprache:**

  > Wenn ich mich auf der Seite `/fr/about` befinde, möchte ich nicht den Inhalt der Seite `/en/about` laden.

Alle drei Lösungen sind sich dieser Probleme bewusst und ermöglichen die Verwaltung dieser Optimierungen. Der Unterschied zwischen den drei Lösungen liegt in der DX (Developer Experience).

`next-intl` und `next-i18next` verwenden einen zentralisierten Ansatz zur Verwaltung von Übersetzungen, der es erlaubt, JSON-Dateien nach Sprache und Unterdateien aufzuteilen. In `next-i18next` nennen wir die JSON-Dateien „Namespaces“; `next-intl` erlaubt das Deklarieren von Nachrichten. In `intlayer` nennen wir die JSON-Dateien „Dictionaries“.

- Im Fall von `next-intl`, ähnlich wie bei `next-i18next`, wird der Inhalt auf Seiten-/Layout-Ebene geladen, und dieser Inhalt wird dann in einen Context-Provider geladen. Das bedeutet, dass der Entwickler die JSON-Dateien, die für jede Seite geladen werden sollen, manuell verwalten muss.

> In der Praxis bedeutet dies, dass Entwickler diese Optimierung oft überspringen und es vorziehen, aus Einfachheitsgründen den gesamten Inhalt im Context-Provider der Seite zu laden.

- Im Fall von `intlayer` wird der gesamte Inhalt in der Anwendung geladen. Anschließend kümmert sich ein Plugin (`@intlayer/babel` / `@intlayer/swc`) darum, das Bundle zu optimieren, indem nur der auf der Seite verwendete Inhalt geladen wird. Der Entwickler muss daher die zu ladenden Wörterbücher nicht manuell verwalten. Dies ermöglicht eine bessere Optimierung, bessere Wartbarkeit und reduziert die Entwicklungszeit.

Da die Anwendung wächst (insbesondere wenn mehrere Entwickler an der Anwendung arbeiten), ist es üblich, dass vergessen wird, nicht mehr verwendete Inhalte aus den JSON-Dateien zu entfernen.

> Beachten Sie, dass in allen Fällen (next-intl, next-i18next, intlayer) alle JSON-Dateien geladen werden.

Deshalb ist der Ansatz von Intlayer leistungsfähiger: Wenn eine Komponente nicht mehr verwendet wird, wird ihr Wörterbuch nicht im Bundle geladen.

Wie die Bibliothek mit Fallbacks umgeht, ist ebenfalls wichtig. Nehmen wir an, die Anwendung ist standardmäßig auf Englisch eingestellt und der Benutzer besucht die Seite `/fr/about`. Wenn Übersetzungen auf Französisch fehlen, wird der englische Fallback berücksichtigt.

Im Fall von `next-intl` und `next-i18next` erfordert die Bibliothek das Laden der JSON-Dateien, die sowohl zur aktuellen Locale als auch zur Fallback-Locale gehören. Somit lädt jede Seite, vorausgesetzt alle Inhalte sind übersetzt, 100 % unnötigen Inhalt. **Im Vergleich dazu verarbeitet `intlayer` das Fallback bereits zur Build-Zeit des Wörterbuchs. Dadurch lädt jede Seite nur den tatsächlich genutzten Inhalt.**

Hier ein Beispiel für die Auswirkung der Bundle-Größenoptimierung mit `intlayer` in einer vite + react Anwendung:

| Optimiertes Bundle                                                                                      | Nicht optimiertes Bundle                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ![optimiertes Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![nicht optimiertes Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

## TypeScript & Sicherheit

<Columns>
  <Column>

**next-intl**

- Solide TypeScript-Unterstützung, aber **Schlüssel sind standardmäßig nicht strikt typisiert**; Sicherheitsmuster müssen manuell gepflegt werden.

  </Column>
  <Column>

**next-i18next**

- Basis-Typen für Hooks; **strikte Schlüsseltypisierung erfordert zusätzliche Werkzeuge/Konfiguration**.

  </Column>
  <Column>

**intlayer**

- **Erzeugt strenge Typen** aus Ihrem Inhalt. **IDE-Autovervollständigung** und **Kompilierzeit-Fehler** erkennen Tippfehler und fehlende Schlüssel vor der Bereitstellung.

  </Column>
</Columns>

**Warum das wichtig ist:** Starke Typisierung verschiebt Fehler **nach links** (CI/Build) statt **nach rechts** (Laufzeit).

---

## Umgang mit fehlenden Übersetzungen

**next-intl**

- Verwendet **Fallbacks zur Laufzeit** (z. B. Anzeige des Schlüssels oder der Standardsprache). Der Build schlägt nicht fehl.

**next-i18next**

- Verwendet **Fallbacks zur Laufzeit** (z. B. Anzeige des Schlüssels oder der Standardsprache). Der Build schlägt nicht fehl.

**intlayer**

- **Erkennung zur Build-Zeit** mit **Warnungen/Fehlern** bei fehlenden Sprachen oder Schlüsseln.

**Warum das wichtig ist:** Das Erkennen von Lücken während des Builds verhindert „mysteriöse Strings“ in der Produktion und entspricht strengen Release-Gates.

---

## Routing, Middleware & URL-Strategie

<Columns>
  <Column>

**next-intl**

- Funktioniert mit **Next.js lokalisiertem Routing** im App Router.

  </Column>
  <Column>

**next-i18next**

- Funktioniert mit **Next.js lokalisiertem Routing** im App Router.

  </Column>
  <Column>

**intlayer**

- Alles Genannte, plus **i18n Middleware** (Locale-Erkennung über Header/Cookies) und **Hilfsmittel** zur Generierung lokalisierter URLs und `<link rel="alternate" hreflang="…">` Tags.

  </Column>
</Columns>

**Warum es wichtig ist:** Weniger benutzerdefinierte Verbindungs-Schichten; **konsistente Benutzererfahrung (UX)** und **sauberes SEO** über alle Sprachen hinweg.

---

## Ausrichtung auf Server Components (RSC)

<Columns>
  <Column>

**next-intl**

- Unterstützt Next.js 13+. Erfordert oft das Weiterreichen von t-Funktionen/Formatierern durch Komponentenbäume in hybriden Setups.

  </Column>
  <Column>

**next-i18next**

- Unterstützt Next.js 13+. Ähnliche Einschränkungen beim Weitergeben von Übersetzungswerkzeugen über Grenzen hinweg.

  </Column>
  <Column>

**intlayer**

- Unterstützt Next.js 13+ und erleichtert die **Server/Client-Grenze** mit einer konsistenten API und RSC-orientierten Providern, wodurch das Hin- und Herschicken von Formatierern oder t-Funktionen vermieden wird.

  </Column>
</Columns>

**Warum es wichtig ist:** Klareres mentales Modell und weniger Randfälle in hybriden Bäumen.

---

## DX, Tools & Wartung

<Columns>
  <Column>

**next-intl**

- Wird häufig mit externen Lokalisierungsplattformen und redaktionellen Workflows kombiniert.

  </Column>
  <Column>

**next-i18next**

- Wird häufig mit externen Lokalisierungsplattformen und redaktionellen Workflows kombiniert.

  </Column>
  <Column>

**intlayer**

- Bietet einen **kostenlosen Visual Editor** und ein **optionales CMS** (Git-freundlich oder externalisiert) sowie eine **VSCode-Erweiterung** und **KI-unterstützte Übersetzungen** mit Ihren eigenen Anbieter-Schlüsseln.

  </Column>
</Columns>

**Warum das wichtig ist:** Senkt die Betriebskosten und verkürzt den Kommunikationszyklus zwischen Entwicklern und Inhaltserstellern.

## Integration mit Lokalisierungsplattformen (TMS)

Große Organisationen verlassen sich oft auf Translation Management Systeme (TMS) wie **Crowdin**, **Phrase**, **Lokalise**, **Localizely** oder **Localazy**.

- **Warum Unternehmen das wichtig finden**
  - **Zusammenarbeit & Rollen**: Mehrere Akteure sind beteiligt: Entwickler, Produktmanager, Übersetzer, Prüfer, Marketingteams.
  - **Skalierung & Effizienz**: kontinuierliche Lokalisierung, kontextbezogene Überprüfung.

- **next-intl / next-i18next**
  - Verwenden typischerweise **zentralisierte JSON-Kataloge**, sodass der Export/Import mit TMS unkompliziert ist.
  - Ausgereifte Ökosysteme und Beispiele/Integrationen für die oben genannten Plattformen.

- **Intlayer**
  - Fördert **dezentralisierte, komponentenbezogene Wörterbücher** und unterstützt **TypeScript/TSX/JS/JSON/MD** Inhalte.
  - Dies verbessert die Modularität im Code, kann jedoch die Plug-and-Play-Integration von TMS erschweren, wenn ein Tool zentralisierte, flache JSON-Dateien erwartet.
  - Intlayer bietet Alternativen: **KI-unterstützte Übersetzungen** (unter Verwendung eigener Anbieter-Schlüssel), einen **Visuellen Editor/CMS** und **CLI/CI** Workflows, um Lücken zu erkennen und vorab zu füllen.

> Hinweis: `next-intl` und `i18next` akzeptieren ebenfalls TypeScript-Kataloge. Wenn Ihr Team Nachrichten in `.ts`-Dateien speichert oder diese nach Features dezentralisiert, können ähnliche Schwierigkeiten mit TMS auftreten. Viele `next-intl`-Setups bleiben jedoch zentralisiert in einem `locales/`-Ordner, was die Umwandlung in JSON für TMS etwas erleichtert.

## Entwicklererfahrung

Dieser Abschnitt bietet einen tiefgehenden Vergleich der drei Lösungen. Anstatt einfache Fälle zu betrachten, wie sie in der „Erste Schritte“-Dokumentation jeder Lösung beschrieben sind, betrachten wir einen realen Anwendungsfall, der einem echten Projekt ähnlicher ist.

### App-Struktur

Die App-Struktur ist wichtig, um eine gute Wartbarkeit Ihres Codes sicherzustellen.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── public
│   └── locales
│       ├── en
│       │  ├── home.json
│       │  └── navbar.json
│       ├── fr
│       │  ├── home.json
│       │  └── navbar.json
│       └── es
│          ├── home.json
│          └── navbar.json
├── next-i18next.config.js
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
├── i18n.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home
    │       └── index.tsx
    │       └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### Vergleich

- **next-intl / next-i18next**: Zentralisierte Kataloge (JSON; Namespaces/Nachrichten). Klare Struktur, gute Integration mit Übersetzungsplattformen, kann jedoch bei wachsender App zu mehr Datei-übergreifenden Änderungen führen.
- **Intlayer**: Pro-Komponenten `.content.{ts|js|json}` Wörterbücher, die direkt bei den Komponenten liegen. Einfachere Wiederverwendung von Komponenten und lokale Nachvollziehbarkeit; fügt Dateien hinzu und setzt auf Build-Zeit-Tools.

#### Einrichtung und Laden von Inhalten

Wie bereits erwähnt, müssen Sie optimieren, wie jede JSON-Datei in Ihren Code importiert wird.
Wie die Bibliothek das Laden von Inhalten handhabt, ist wichtig.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="next-i18next.config.js"
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/_app.tsx"
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { ClientComponent, ServerComponent } from "@components";

export default function HomePage({ locale }: { locale: string }) {
  // Deklariere explizit den Namespace, der von dieser Komponente verwendet wird
  const resources = await loadMessagesFor(locale); // dein Loader (JSON, etc.)

  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: ["common", "about"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

  const { t } = useTranslation("about");

  return (
    <I18nextProvider i18n={i18n}>
      <main>
        <h1>{t("title")}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </I18nextProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Laden Sie nur die für DIESE Seite benötigten Namespaces vor
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "about"])),
    },
  };
};
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Kann aus einer gemeinsamen Konfiguration importiert werden
const locales = ["en", "fr", "es"];

export default getRequestConfig(async ({ locale }) => {
  // Überprüfen Sie, ob der eingehende `locale`-Parameter gültig ist
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import pick from "lodash/pick";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Setze die aktive Anfragelocale für dieses Server-Rendering (RSC)
  unstable_setRequestLocale(locale);

  // Nachrichten werden serverseitig über src/i18n/request.ts geladen
  // (siehe next-intl Dokumentation). Hier senden wir nur einen Teil an den Client,
  // der für Client-Komponenten benötigt wird (Payload-Optimierung).
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations } from "next-intl/server";
import { ClientComponent, ServerComponent } from "@components";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  // Streng serverseitiges Laden (nicht auf den Client hydriert)
  const t = await getTranslations("about");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
```

  </TabItem>
<TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
export default {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### Vergleich

Alle drei unterstützen das Laden von Inhalten und Providern pro Locale.

- Mit **next-intl/next-i18next** laden Sie typischerweise ausgewählte Nachrichten/Namensräume pro Route und platzieren Provider dort, wo sie benötigt werden.

- Mit **Intlayer** wird eine Build-Zeit-Analyse hinzugefügt, um die Nutzung abzuleiten, was manuelle Verkabelung reduzieren und möglicherweise einen einzigen Root-Provider ermöglichen kann.

Wählen Sie je nach Teampräferenz zwischen expliziter Kontrolle und Automatisierung.

### Verwendung in einer Client-Komponente

Nehmen wir ein Beispiel einer Client-Komponente, die einen Zähler rendert.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**Übersetzungen (müssen echtes JSON in `public/locales/...` sein)**

```json fileName="public/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="public/locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Client-Komponente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

const ClientComponentExample = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // next-i18next stellt useNumber nicht bereit; benutze Intl.NumberFormat
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> Vergessen Sie nicht, den Namespace "about" bei den serverSideTranslations der Seite hinzuzufügen  
> Hier verwenden wir die Version React 19.x.x, aber bei niedrigeren Versionen müssen Sie useMemo verwenden, um die Instanz des Formatierers zu speichern, da dies eine ressourcenintensive Funktion ist

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**Übersetzungen (Struktur wiederverwendet; laden Sie sie in die next-intl-Nachrichten, wie Sie möchten)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Client-Komponente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Direkt auf das verschachtelte Objekt zugreifen
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Vergessen Sie nicht, die "about"-Nachricht auf der Client-Seite der Seite hinzuzufügen

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**Inhalt**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ de: "Zähler", en: "Counter", fr: "Compteur" }),
    increment: t({ de: "Erhöhen", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**Client-Komponente**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // gibt Strings zurück
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </TabItem>
</Tab>

#### Vergleich

- **Zahlenformatierung**
  - **next-i18next**: kein `useNumber`; verwendet `Intl.NumberFormat` (oder i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: integriertes `useNumber()`.

- **Schlüssel**
  - Behalte eine verschachtelte Struktur bei (`about.counter.label`) und passe deinen Hook entsprechend an (`useTranslation("about")` + `t("counter.label")` oder `useTranslations("about.counter")` + `t("label")`).

- **Dateiablagen**
  - **next-i18next** erwartet JSON in `public/locales/{lng}/{ns}.json`.
  - **next-intl** ist flexibel; lade Nachrichten wie du es konfigurierst.
  - **Intlayer** speichert Inhalte in TS/JS Wörterbüchern und löst sie über Schlüssel auf.

---

### Verwendung in einer Server-Komponente

Wir betrachten den Fall einer UI-Komponente. Diese Komponente ist eine Server-Komponente und sollte als Kind einer Client-Komponente eingefügt werden können. (Seite (Server-Komponente) -> Client-Komponente -> Server-Komponente). Da diese Komponente als Kind einer Client-Komponente eingefügt werden kann, darf sie nicht asynchron sein.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/pages/about.tsx"
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { t, i18n } = useTranslation("about");
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};
```

> Da die Server-Komponente nicht asynchron sein kann, müssen die Übersetzungen und die Formatierungsfunktion als Props übergeben werden.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  count: number;
  t: (key: string) => string;
};

const ServerComponent = ({ t, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("label")}>{t("increment")}</button>
    </div>
  );
};
```

> Da die Server-Komponente nicht asynchron sein kann, müssen Sie die Übersetzungen und die Formatierungsfunktion als Props übergeben.
>
> - `const t = await getTranslations("about.counter");`
> - `const format = await getFormatter();`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

const ServerComponent = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> Intlayer stellt **server-sichere** Hooks über `next-intlayer/server` bereit. Damit sie funktionieren, verwenden `useIntlayer` und `useNumber` eine hook-ähnliche Syntax, ähnlich wie die Client-Hooks, basieren aber im Hintergrund auf dem Server-Kontext (`IntlayerServerProvider`).

### Metadaten / Sitemap / Robots

Inhalte zu übersetzen ist großartig. Aber oft wird vergessen, dass das Hauptziel der Internationalisierung darin besteht, Ihre Website für die Welt sichtbarer zu machen. I18n ist ein unglaublicher Hebel, um die Sichtbarkeit Ihrer Website zu verbessern.

Hier ist eine Liste von Best Practices bezüglich mehrsprachigem SEO.

- Setzen Sie hreflang-Meta-Tags im `<head>`-Tag
  > Dies hilft Suchmaschinen zu verstehen, welche Sprachen auf der Seite verfügbar sind
- Listen Sie alle Seitenübersetzungen in der sitemap.xml unter Verwendung des XML-Schemas `http://www.w3.org/1999/xhtml` auf
  >
- Vergessen Sie nicht, vorangestellte Seiten in der robots.txt auszuschließen (z. B. `/dashboard` sowie `/fr/dashboard`, `/es/dashboard`)
  >
- Verwenden Sie eine benutzerdefinierte Link-Komponente, um auf die am besten lokalisierte Seite weiterzuleiten (z. B. auf Französisch `<a href="/fr/about">A propos</a>`)
  >

Entwickler vergessen oft, ihre Seiten über verschiedene Sprachversionen hinweg korrekt zu referenzieren.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Dynamisch die korrekte JSON-Datei importieren
  const messages = (
    await import("@/../public/locales/" + locale + "/about.json")
  ).default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Über</h1>; // Überschrift für die "Über"-Seite
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(), // Datum der letzten Änderung
      changeFrequency: "monthly", // Änderungsfrequenz der Seite
      priority: 0.7, // Priorität der Seite im Sitemap
      alternates: { languages }, // Alternative Sprachversionen
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Restlicher Seiten-Code
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monatlich",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Restlicher Seiten-Code
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// Funktion, die alle mehrsprachigen URLs aus einer Liste von URLs extrahiert
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // Verbotene Pfade für alle Sprachversionen
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer stellt eine `getMultilingualUrls`-Funktion bereit, um mehrsprachige URLs für Ihre Sitemap zu generieren.

---

---

## Und der Gewinner ist…

Es ist nicht einfach. Jede Option hat ihre Vor- und Nachteile. So sehe ich das:

<Columns>
  <Column>

**next-intl**

- am einfachsten, leichtgewichtig, weniger Entscheidungen, die dir aufgezwungen werden. Wenn du eine **minimale** Lösung möchtest, mit zentralisierten Katalogen zurechtkommst und deine App **klein bis mittelgroß** ist.

  </Column>
  <Column>

**next-i18next**

- ausgereift, vollgepackt mit Funktionen, viele Community-Plugins, aber höherer Einrichtungsaufwand. Wenn du das **Plugin-Ökosystem von i18next** benötigst (z. B. erweiterte ICU-Regeln über Plugins) und dein Team i18next bereits kennt, und du **mehr Konfiguration** für Flexibilität akzeptierst.

  </Column>
  <Column>

**Intlayer**

- entwickelt für modernes Next.js, mit modularen Inhalten, Typsicherheit, Werkzeugen und weniger Boilerplate. Wenn Sie **komponentenbezogene Inhalte**, **striktes TypeScript**, **Build-Zeit-Garantien**, **Tree-Shaking** und **batteriebetriebene** Routing/SEO/Editor-Werkzeuge schätzen – besonders für den **Next.js App Router**, Design-Systeme und **große, modulare Codebasen**.

  </Column>
</Columns>

Wenn Sie eine minimale Einrichtung bevorzugen und etwas manuelle Verkabelung akzeptieren, ist next-intl eine gute Wahl. Wenn Sie alle Funktionen benötigen und Komplexität kein Problem ist, funktioniert next-i18next. Aber wenn Sie eine moderne, skalierbare, modulare Lösung mit integrierten Werkzeugen wollen, zielt Intlayer darauf ab, Ihnen genau das sofort bereitzustellen.

> **Alternative für Enterprise-Teams**: Wenn Sie eine bewährte Lösung benötigen, die perfekt mit etablierten Lokalisierungsplattformen wie **Crowdin**, **Phrase** oder anderen professionellen Übersetzungsmanagementsystemen zusammenarbeitet, sollten Sie **next-intl** oder **next-i18next** wegen ihres ausgereiften Ökosystems und bewährten Integrationen in Betracht ziehen.

> **Zukünftige Roadmap**: Intlayer plant außerdem die Entwicklung von Plugins, die auf den **i18next**- und **next-intl**-Lösungen aufbauen. Dies bietet Ihnen die Vorteile von Intlayer für Automatisierung, Syntax und Inhaltsverwaltung, während die Sicherheit und Stabilität dieser etablierten Lösungen in Ihrem Anwendungscode erhalten bleibt.

## GitHub-STARS

GitHub-Sterne sind ein starkes Indiz für die Popularität eines Projekts, das Vertrauen der Community und die langfristige Relevanz. Obwohl sie kein direktes Maß für die technische Qualität sind, spiegeln sie wider, wie viele Entwickler das Projekt nützlich finden, seinen Fortschritt verfolgen und es wahrscheinlich übernehmen werden. Zur Einschätzung des Werts eines Projekts helfen Sterne dabei, die Resonanz im Vergleich zu Alternativen zu vergleichen und Einblicke in das Wachstum des Ökosystems zu geben.

[![Stern-Historien-Diagramm](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Fazit

Alle drei Bibliotheken sind im Kern der Lokalisierung erfolgreich. Der Unterschied liegt darin, **wie viel Arbeit Sie investieren müssen**, um eine robuste, skalierbare Einrichtung in **modernem Next.js** zu erreichen:

- Mit **Intlayer** sind **modularer Inhalt**, **striktes TypeScript**, **Build-Zeit-Sicherheit**, **tree-shaken Bundles** und **erstklassiger App Router + SEO-Tools** **Standard**, nicht lästige Pflicht.
- Wenn Ihr Team **Wartbarkeit und Geschwindigkeit** in einer mehrsprachigen, komponentenbasierten Anwendung schätzt, bietet Intlayer heute die **vollständigste** Erfahrung.

Weitere Details finden Sie im Dokument ['Warum Intlayer?'](https://intlayer.org/doc/why).
