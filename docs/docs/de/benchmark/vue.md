---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: Beste i18n-Lösung für Vue im Jahr 2026 – Benchmark-Bericht
description: Vergleichen Sie Vue-Internationalisierungsbibliotheken (i18n) wie vue-i18n, fluent-vue und Intlayer. Detaillierter Leistungsbericht zu Bundle-Größe, Leakage und Reaktivität.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - leistung
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: aymericzip
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "GitHub-Sterne-Vergleich hinzufügen"
  - version: 8.7.12
    date: 2026-01-06
    changes: "Benchmark-Initialisierung"
---

# Vue i18n-Bibliotheken - Benchmark-Bericht 2026

Diese Seite ist ein Benchmark-Bericht für i18n-Lösungen in Vue.

## Inhaltsverzeichnis

<Toc/>

## Interaktiver Benchmark

<I18nBenchmark framework="vite-vue" vertical/>

## Ergebnisreferenz:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Vollständige Benchmark-Daten anzeigen](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

Das vollständige Benchmark-Repository finden Sie [hier](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Einleitung

Internationalisierungslösungen gehören zu den schwersten Abhängigkeiten in einer Vue-App. Das Hauptrisiko besteht darin, unnötige Inhalte zu versenden: Übersetzungen für andere Seiten und andere Sprachen im Bundle einer einzigen Route.

Wenn Ihre App wächst, kann dieses Problem die an den Client gesendeten JavaScript-Mengen schnell explodieren lassen und die Navigation verlangsamen.

In der Praxis kann eine internationalisierte Seite bei am wenigsten optimierten Implementierungen am Ende mehrmals schwerer sein als die Version ohne i18n.

Die andere Auswirkung betrifft die Entwicklererfahrung (DX): Wie Sie Inhalte deklarieren, Typen, Namespace-Organisation, dynamisches Laden und Reaktivität bei Sprachwechseln.

## TL;DR

- **Intlayer**: Die leichteste Lösung (v8.7.12) mit nativem Scoping und dynamischem Laden.
- **vue-i18n**: Der Industriestandard mit einem reichen Ökosystem, kann aber in großen Anwendungen deutlich schwerer und schwieriger für Code-Splitting zu optimieren sein.
- **fluent-vue**: Innovative Nachrichtenorganisation, aber es mangelt an Typsicherheit und es erweist sich als extrem schwere Lösung.

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

Syntaxen, die um `const { t } = useI18n()` + `t('a.b.c')` herum aufgebaut sind, sind sehr bequem, fördern aber oft das Beibehalten großer JSON-Objekte zur Laufzeit. Dieses Modell erschwert Tree-Shaking, es sei denn, die Bibliothek bietet eine echte Aufteilungsstrategie pro Seite.

## Methodik

Für diesen Benchmark haben wir die folgenden Bibliotheken verglichen:

- `Base App` (Keine i18n-Bibliothek)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

Das Framework ist `Vue` mit einer mehrsprachigen App aus **10 Seiten** und **10 Sprachen**.

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

Ich habe dieselbe mehrsprachige App in einem echten Browser für jeden Stack ausgeführt und dann notiert, was tatsächlich über die Leitung ging und wie lange die Dinge dauerten. Die Größen werden **nach normaler Webkomprimierung** angegeben, da dies näher an dem liegt, was die Leute tatsächlich herunterladen.

- **Größe der Internationalisierungsbibliothek**: Nach dem Bundling, Tree-Shaking und der Minifizierung ist die Größe der i18n-Bibliothek die Größe des Codes für Provider + Composables in einer leeren Komponente. Das Laden von Übersetzungsdateien ist nicht enthalten. Dies zeigt, wie teuer die Bibliothek ist, bevor Ihre Inhalte ins Spiel kommen.

- **JavaScript pro Seite**: Wie viel Skript der Browser für diesen Besuch bei jeder Benchmark-Route abruft, gemittelt über die Seiten im Test (und über die Locales). Schwere Seiten sind langsame Seiten.

- **Leakage aus anderen Locales**: Dies betrifft den Inhalt derselben Seite, aber in einer anderen Sprache, der versehentlich in die geprüfte Seite geladen würde. Dieser Inhalt ist unnötig und sollte vermieden werden (z. B. Inhalt der Seite `/fr/about` im Bundle der Seite `/en/about`).

- **Leakage von anderen Routen**: Dieselbe Idee für **andere Bildschirme** in der App: ob deren Texte mitgeliefert werden, wenn Sie nur eine Seite geöffnet haben (z. B. Inhalt der Seite `/en/about` im Bundle der Seite `/en/contact`). Eine hohe Punktzahl deutet auf schwaches Splitting oder zu breite Bundles hin.

- **Durchschnittliche Komponenten-Bundle-Größe**: Gängige UI-Elemente werden **einzeln** gemessen, anstatt sich in einer riesigen App-Zahl zu verstecken. Es zeigt, ob die Internationalisierung alltägliche Komponenten heimlich aufbläht. Wenn Ihre Komponente beispielsweise neu gerendert wird, lädt sie all diese Daten aus dem Speicher. Das Anhängen eines riesigen JSON an eine beliebige Komponente ist wie das Anschließen eines großen Speichers ungenutzter Daten, der die Leistung Ihrer Komponenten verlangsamt.

- **Reaktionsfähigkeit bei Sprachwechseln**: Ich wechsle die Sprache über das eigene Steuerelement der App und messe die Zeit, bis die Seite eindeutig umgeschaltet hat – was ein Besucher bemerken würde.

- **Rendering-Arbeit nach einem Sprachwechsel**: Ein detaillierterer Check: Wie viel Aufwand das Interface betrieben hat, um für die neue Sprache neu zu zeichnen, sobald der Wechsel läuft. Nützlich, wenn die „gefühlte“ Zeit und die Framework-Kosten auseinanderklaffen.

- **Erste Seitenladezeit**: Von der Navigation bis zum Zeitpunkt, an dem der Browser die Seite für die von mir getesteten Szenarien als vollständig geladen betrachtet. Gut zum Vergleich von Kaltstarts.

- **Hydrierungszeit (Hydration)**: Die Zeit, die der Client benötigt, um Server-HTML in ein interaktives Interface zu verwandeln. Ein Bindestrich in den Tabellen bedeutet, dass diese Implementierung in diesem Benchmark keine zuverlässigen Hydrierungsdaten geliefert hat.

## GitHub-Sterne

GitHub-Sterne sind ein starker Indikator für die Popularität eines Projekts, das Vertrauen der Community und die langfristige Relevanz. Sie sind zwar kein direktes Maß für die technische Qualität, spiegeln jedoch wider, wie viele Entwickler das Projekt nützlich finden, seinen Fortschritt verfolgen und es wahrscheinlich übernehmen werden. Um den Wert eines Projekts einzuschätzen, helfen Sterne dabei, die Traktion verschiedener Alternativen zu vergleichen und Einblicke in das Wachstum des Ökosystems zu gewinnen.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Cfluent-vue%2Ffluent-vue%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&fluent-vue/fluent-vue&aymericzip/intlayer)

## Ergebnisse im Detail

### 1 - Zu vermeidende Lösungen

> Im Vue-Ökosystem gibt es keine eindeutig zu vermeidenden Lösungen.

### 2 - Akzeptable Lösungen

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** ist unbestritten die am häufigsten verwendete i18n-Bibliothek für Vue, sie hat viele Funktionen und ein riesiges Ökosystem. Aber unter der Haube ist die Lösung ziemlich schwer. Selbst wenn vue-i18n Lazy-Loading für Nachrichten integriert, fehlt eine Scoping-Funktion. Bei einer klassischen Vue-SPA-App gibt es kein Problem, aber für eine Nuxt-App, die @nuxt/i18n verwendet, führt dies dazu, dass die Nachrichten aller Seiten in einer einzigen enthalten sind. Für eine große Nuxt-App mit mehr als 10 Seiten kann dies wirklich problematisch werden.

Das Paket ist sehr schwer (~24,3 KB, was etwa das 9-fache von `vue-intlayer` ist).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** bietet einen Innovationsversuch durch das .ftl-Format. Die Nachrichtenorganisation ist großartig und der Einstieg einfacher. In der Praxis erhöht jedoch der Mangel an Typsicherheit das Fehlerrisiko und das Debuggen kann schnell zeitaufwendig werden. Darüber hinaus lädt diese Lösung die Nachrichten über ein Vite-Plugin, das das Laden aller Inhalte in allen Sprachen in jede Seite erzwingt. Zusätzlich ist dies eine extrem schwere Lösung (~92,7 KB, was etwa das 34-fache von `vue-intlayer` ist).

### 3 - Empfehlungen

**(Intlayer)** (`vue-intlayer@8.7.12`):

Ich werde `vue-intlayer` aus Gründen der Objektivität nicht persönlich beurteilen, da es meine eigene Lösung ist.
