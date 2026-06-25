---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: Beste i18n-Lösung für Svelte im Jahr 2026 – Benchmark-Bericht
description: Vergleichen Sie Svelte-Internationalisierungsbibliotheken (i18n) wie svelte-i18n, Paraglide und Intlayer. Detaillierter Leistungsbericht zu Bundle-Größe, Leakage und Reaktivität.
keywords:
  - benchmark
  - i18n
  - intl
  - svelte
  - leistung
  - intlayer
slugs:
  - doc
  - benchmark
  - svelte
author: aymericzip
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-svelte-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "GitHub-Sterne-Vergleich hinzufügen"
  - version: 8.7.12
    date: 2026-01-06
    changes: "Benchmark-Initialisierung"
---

# Svelte i18n-Bibliotheken - Benchmark-Bericht 2026

Diese Seite ist ein Benchmark-Bericht für i18n-Lösungen in Svelte.

## Inhaltsverzeichnis

<Toc/>

## Interaktiver Benchmark

<I18nBenchmark framework="vite-svelte" vertical/>

## Ergebnisreferenz:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Vollständige Benchmark-Daten anzeigen](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md)

Das vollständige Benchmark-Repository finden Sie [hier](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Einleitung

Internationalisierungslösungen gehören zu den schwersten Abhängigkeiten in einer Svelte-App. Das Hauptrisiko besteht darin, unnötige Inhalte zu versenden: Übersetzungen für andere Seiten und andere Sprachen im Bundle einer einzigen Route.

Wenn Ihre App wächst, kann dieses Problem die an den Client gesendeten JavaScript-Mengen schnell explodieren lassen und die Navigation verlangsamen.

In der Praxis kann eine internationalisierte Seite bei am wenigsten optimierten Implementierungen am Ende mehrmals schwerer sein als die Version ohne i18n.

Die andere Auswirkung betrifft die Entwicklererfahrung (DX): Wie Sie Inhalte deklarieren, Typen, Namespace-Organisation, dynamisches Laden und Reaktivität bei Sprachwechseln.

## TL;DR

- **Intlayer**: Die leistungseffizienteste Wahl (v8.7.12) mit dem kleinsten Fußabdruck.
- **Paraglide**: Starker Kandidat für Tree-Shaking, hat aber eine komplexere Entwicklererfahrung und Overhead bei der Reaktivität.
- **svelte-i18n**: Umfassend und Standard für Svelte, bringt aber ein viel größeres Bundle-Gewicht mit sich (~7x Intlayer).

## Testen Sie Ihre App

Um i18n-Leakage-Probleme schnell zu erkennen, habe ich einen kostenlosen Scanner eingerichtet, der [hier](https://intlayer.org/i18n-seo-scanner) verfügbar ist.

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Das Problem

Zwei Hebel sind wesentlich, um die Kosten einer mehrsprachigen App zu begrenzen:

- Inhalte nach Seite / Namespace aufteilen, damit Sie keine ganzen Wörterbücher laden, wenn Sie sie nicht benötigen.
- Das richtige Gebietsschema (Locale) dynamisch laden, nur wenn es benötigt wird.

Verständnis der technischen Einschränkungen dieser Ansätze:

**Dynamisches Laden**

Ohne dynamisches Laden halten die meisten Lösungen Nachrichten ab dem ersten Rendern im Speicher, was für Apps mit vielen Routen und Locales einen erheblichen Overhead bedeutet.

Mit dynamischem Laden akzeptieren Sie einen Kompromiss: weniger initiales JS, aber manchmal eine zusätzliche Anfrage beim Sprachwechsel.

**Inhaltsaufteilung (Splitting)**

Syntaxen, die um `t('a.b.c')` herum aufgebaut sind, sind sehr bequem, fördern aber oft das Beibehalten großer JSON-Objekte zur Laufzeit. Dieses Modell erschwert Tree-Shaking, es sei denn, die Bibliothek bietet eine echte Aufteilungsstrategie pro Seite.

## Methodik

Für diesen Benchmark haben wir die folgenden Bibliotheken verglichen:

- `Base App` (Keine i18n-Bibliothek)
- `svelte-intlayer` (v8.7.12)
- `svelte-i18n` (v4.0.1)
- `@inlang/paraglide-js` (v2.17.0)

Das Framework ist `Svelte` mit einer mehrsprachigen App aus **10 Seiten** und **10 Sprachen**.

Wir haben **vier Ladestrategien** verglichen:

| Strategie             | Ohne Namespaces (global)                   | Mit Namespaces (scoped)                                               |
| :-------------------- | :----------------------------------------- | :-------------------------------------------------------------------- |
| **Statisches Laden**  | **Static**: Alles beim Start im Speicher.  | **Scoped static**: Nach Namespace getrennt; alles beim Start geladen. |
| **Dynamisches Laden** | **Dynamic**: Laden nach Bedarf pro Locale. | **Scoped dynamic**: Granulares Laden pro Namespace und Locale.        |

## Zusammenfassung der Strategien

- **Static**: Einfach; keine Netzwerklatenz nach dem ersten Laden. Nachteil: große Bundle-Größe.
- **Dynamic**: Reduziert das Anfangsgewicht (Lazy-Loading). Ideal, wenn Sie viele Locales haben.
- **Scoped static**: Hält den Code organisiert (logische Trennung) ohne komplexe zusätzliche Netzwerkanfragen.
- **Scoped dynamic**: Bester Ansatz für _Code-Splitting_ und Leistung. Minimiert den Speicherverbrauch, indem nur das geladen wird, was die aktuelle Ansicht und die aktive Locale benötigen.

### Was ich gemessen habe:

Ich habe dieselbe mehrsprachige App in einem echten Browser für jeden Stack ausgeführt und dann notiert, was tatsächlich auf der Leitung angezeigt wurde und wie lange es dauerte. Die Größen werden **nach normaler Webkomprimierung** angegeben, da dies näher daran liegt, was Benutzer herunterladen, als rohe Quellzählungen.

- **Größe der Internationalisierungsbibliothek**: Nach dem Bundeln, Tree-Shaking und der Minifizierung ist die Größe der i18n-Bibliothek die Größe des Providers + Stores-Code in einer leeren Komponente. Sie beinhaltet nicht das Laden von Übersetzungsdateien. Sie beantwortet die Frage, wie teuer die Bibliothek ist, bevor Ihr Inhalt ins Spiel kommt.

- **JavaScript pro Seite**: Für jede Benchmark-Route, wie viel Skript der Browser bei diesem Besuch abruft, gemittelt über die Seiten in der Suite (und über Sprachen, in denen der Bericht diese zusammenfasst). Schwere Seiten sind langsame Seiten.

- **Speicherleck aus anderen Sprachen**: Es ist der Inhalt derselben Seite in einer anderen Sprache, der versehentlich auf die audited Seite geladen würde. Dieser Inhalt ist unnötig und sollte vermieden werden. (z. B. Inhalt der Seite `/fr/about` im Bundle der Seite `/en/about`)

- **Speicherleck aus anderen Routen**: Dieselbe Idee für **andere Bildschirme** in der App: ob deren Kopie mitlädt, wenn Sie nur eine Seite geöffnet haben. (z. B. Inhalt der Seite `/en/about` im Bundle der Seite `/en/contact`). Ein hoher Wert deutet auf schwaches Splitting oder über-breite Bundles hin.

- **Durchschnittliche Komponentenbündelgröße**: Häufige UI-Teile werden **einzeln** gemessen, anstatt sich in einer großen App-Nummer zu verstecken. Es zeigt, ob die Internationalisierung alltägliche Komponenten unauffällig aufbläht. Wenn Ihre Komponente beispielsweise neu gerendert wird, wird sie alle diese Daten aus dem Speicher laden. Das Anhängen eines großen JSON an eine Komponente ist wie das Verbinden mit einem großen Speicher ungenutzter Daten, der die Leistung Ihrer Komponenten verlangsamt.

- **Sprachschalter-Reaktionsfähigkeit**: Ich wechsle die Sprache mit dem eigenen Steuerelement der App und messe, wie lange es dauert, bis sich die Seite klar gewechselt hat, was ein Besucher bemerken würde, nicht ein Lab-Mikro-Schritt.

- **Rendering-Arbeit nach einem Sprachwechsel**: Ein engerer Nachfolger: wie viel Aufwand die Benutzeroberfläche brauchte, um sich für die neue Sprache neu zu streichen, sobald der Wechsel in Gang ist. Nützlich, wenn sich die „gefühlte" Zeit und die Framework-Kosten unterscheiden.

- **Anfängliche Seitenladezeit**: Von der Navigation zum Browser, der die Seite für die von mir getesteten Szenarien vollständig geladen betrachtet. Gut zum Vergleichen kalter Starts.

- **Hydrationisierungszeit**: Wenn die App es offenlegt, wie lange der Client damit verbringt, Server-HTML in etwas zu verwandeln, das Sie tatsächlich anklicken können. Ein Bindestrich in den Tabellen bedeutet, dass diese Implementierung in dieser Benchmark keine zuverlässige Hydrationsfigur bereitgestellt hat.

## GitHub-Sterne

GitHub-Sterne sind ein starker Indikator für die Popularität eines Projekts, das Vertrauen der Community und die langfristige Relevanz. Sie sind zwar kein direktes Maß für die technische Qualität, spiegeln jedoch wider, wie viele Entwickler das Projekt nützlich finden, seinen Fortschritt verfolgen und es wahrscheinlich übernehmen werden. Um den Wert eines Projekts einzuschätzen, helfen Sterne dabei, die Traktion verschiedener Alternativen zu vergleichen und Einblicke in das Wachstum des Ökosystems zu gewinnen.

[![Star History Chart](https://api.star-history.com/chart?repos=kaisermann%2Fsvelte-i18n%2Copral%2Fparaglide-js%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#kaisermann/svelte-i18n&opral/paraglide-js&aymericzip/intlayer)

## Ergebnisse im Detail

### 1 - Zu vermeidende Lösungen

> Im Svelte-Ökosystem gibt es keine eindeutig zu vermeidenden Lösungen.

### 2 - Akzeptable Lösungen

**(Paraglide)** (`@inlang/paraglide-js@2.17.0`):

`Paraglide` bietet einen innovativen, gut durchdachten Ansatz. Im Kontext einer Vite + Svelte App funktioniert das von der Firma beworbene Tree-Shaking wie erwartet, was großartig ist.
Aber im Fall von React + TanStack Start funktionierte das Tree-Shaking nicht wie erwartet, ebenso wenig bei Next.js. Dennoch wäre die Verwendung von Paraglide in einem Svelte- und TanStack Start-Projekt eine genauere Überprüfung wert.
Der Workflow und die DX sind ebenfalls komplexer als bei anderen Optionen.
Persönlich gefällt mir nicht, dass JS-Dateien vor jedem Push neu generiert werden müssen, was ein ständiges Risiko für Merge-Konflikte bei PRs darstellt. Das Tool scheint auch mehr auf Vite als auf Next.js ausgerichtet zu sein.
Schließlich verwendet Paraglide im Vergleich zu anderen Lösungen keinen Store (z. B. Svelte Store), um das aktuelle Gebietsschema zum Rendern des Inhalts abzurufen. Für jeden geparsten Knoten wird das Gebietsschema aus dem localStorage / Cookie usw. angefordert. Dies führt zur Ausführung unnötiger Logik, die sich auf die Reaktivität der Komponenten auswirkt.

> Hinweis zu Paraglide: Die Lösung injiziert Code in Ihre Codebasis für Importe; daher ist die Metrik „lib size“ im Benchmark-Bericht fast 0. Codegenerierung ist eine gute Sache, da die verwendete Funktion nur die notwendige Logik enthält (Präfix überall vs. kein Präfix, Cookie vs. Speicher usw.). Im Vergleich dazu führt Intlayer diese Filterung über Injektionen von Umgebungsvariablen während des Builds durch, um den Bundler zu zwingen, den Inhalt je nach Logik zu tree-shaken. Dank dessen sind Paraglide und Intlayer am Ende 6- bis 10-mal leichtere Lösungen als i18next oder next-intl.

**(svelte-i18n)** (`svelte-i18n@3.4.0`):

Diese Lösung erfüllt alle i18n-Anforderungen in einem Svelte-Projekt. Aber wie bei i18next oder anderen großen i18n-Lösungen ist sie etwas schwer (~15,9 KB, was etwa das 7-fache von `svelte-intlayer` ist).

### 3 - Empfehlungen

**(Intlayer)** (`svelte-intlayer@8.7.12`):

Ich werde `svelte-intlayer` aus Gründen der Objektivität nicht persönlich beurteilen, da es meine eigene Lösung ist.

### Persönliche Anmerkung

Diese Anmerkung ist persönlich und beeinflusst die Benchmark-Ergebnisse nicht. Dennoch sieht man in der i18n-Welt oft einen Konsens um ein Muster wie `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` für übersetzte Inhalte.

In Svelte-Apps ist das Injizieren einer Funktion als `Slot` meiner Meinung nach ein Anti-Pattern. Es fügt außerdem vermeidbare Komplexität und JavaScript-Ausführungs-Overhead hinzu (auch wenn dieser kaum merklich ist).
