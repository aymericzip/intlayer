---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: Beste i18n-Lösung für TanStack Start im Jahr 2026 - Benchmark-Bericht
description: Vergleichen Sie TanStack Start Internationalisierungs-Bibliotheken wie react-i18next, use-intl und Intlayer. Detaillierter Performance-Bericht zu Bundle-Größe, Leakage und Reaktivität.
keywords:
  - Benchmark
  - i18n
  - intl
  - tanstack
  - Performance
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: aymericzip
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "GitHub-Sterne-Vergleich hinzufügen"
  - version: 8.7.5
    date: 2026-01-06
    changes: "Benchmark initialisiert"
---

# TanStack Start i18n-Bibliotheken - Benchmark-Bericht 2026

Diese Seite ist ein Benchmark-Bericht für i18n-Lösungen auf TanStack Start.

## Inhaltsverzeichnis

<Toc/>

## Interaktiver Benchmark

<I18nBenchmark framework="tanstack" vertical/>

## Ergebnis-Referenz:

<ClickToOpenIframe
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
  width="100%"
  height="600px"
  style="border:none;"
/>

> [Vollständige Benchmark-Daten anzeigen](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md)

Das vollständige Benchmark-Repository finden Sie [hier](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Einführung

Internationalisierungs-Lösungen gehören zu den schwersten Abhängigkeiten in einer React-App. Bei TanStack Start besteht das Hauptrisiko darin, unnötige Inhalte mitzuliefern: Übersetzungen für andere Seiten und andere Sprachen im Bundle einer einzelnen Route.

Wenn Ihre App wächst, kann dieses Problem den an den Client gesendeten JavaScript-Code schnell aufblähen und die Navigation verlangsamen.

In der Praxis kann eine internationalisierte Seite bei den am wenigsten optimierten Implementierungen um ein Vielfaches schwerer sein als die Version ohne i18n.

Ein weiterer Aspekt ist die Developer Experience (DX): Wie deklarieren Sie Inhalte, Typen, Namespace-Organisation, dynamisches Laden und Reaktivität bei Sprachwechseln.

## TL;DR

- **Intlayer**: Bietet die beste Performance und die kleinste Bundle-Größe (v8.7.12) für TanStack Start.
- **react-i18next** & **use-intl**: Ausgereifte Alternativen mit großen Ökosystemen, aber deutlich schwerer und komplexer zu optimieren.
- **Paraglide**: Innovative Tree-shaking-Idee, die in der Praxis nicht funktioniert. Komplexe DX und Reaktivitäts-Overhead in TanStack Start.
- **Vermeiden**: **General Translation (GT)** und **Lingo.dev** aufgrund schwerwiegender Performance-Probleme, AI-Quota-Limits und Vendor-Lock-in.

## Testen Sie Ihre App

Um i18n-Leakage-Probleme schnell zu erkennen, habe ich einen kostenlosen Scanner eingerichtet, den Sie [hier](https://intlayer.org/i18n-seo-scanner) finden.

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Das Problem

Zwei Hebel sind entscheidend, um die Kosten einer mehrsprachigen App zu begrenzen:

- Aufteilung der Inhalte pro Seite / Namespace, um nicht ganze Wörterbücher zu laden, wenn sie nicht benötigt werden.
- Dynamisches Laden der richtigen Sprache nur bei Bedarf.

Die technischen Einschränkungen dieser Ansätze verstehen:

**Dynamisches Laden**

Ohne dynamisches Laden behalten die meisten Lösungen Nachrichten ab dem ersten Rendern im Speicher, was bei Apps mit vielen Routen und Sprachen einen erheblichen Overhead verursacht.

Beim dynamischen Laden gehen Sie einen Kompromiss ein: Weniger initiales JS, aber manchmal eine zusätzliche Anfrage beim Sprachwechsel.

**Content-Splitting (Inhaltsaufteilung)**

Syntaxansätze um `const t = useTranslation()` + `t('a.b.c')` sind sehr bequem, fördern aber oft das Vorhalten großer JSON-Objekte zur Laufzeit. Dieses Modell erschwert das Tree-shaking, es sei denn, die Bibliothek bietet eine echte seitenbasierte Aufteilungsstrategie.

## Methodik

Für diesen Benchmark haben wir die folgenden Bibliotheken verglichen:

- `Base App` (Ohne i18n-Bibliothek)
- `react-intlayer` (v8.7.12)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `@tolgee/react` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

Das Framework ist `TanStack Start` mit einer mehrsprachigen App mit **10 Seiten** und **10 Sprachen**.

Wir haben **vier Ladestrategien** verglichen:

| Strategie             | Ohne Namespaces (global)                      | Mit Namespaces (scoped)                                               |
| :-------------------- | :-------------------------------------------- | :-------------------------------------------------------------------- |
| **Statisches Laden**  | **Statischer**: Alles beim Start im Speicher. | **Scoped static**: Nach Namespace getrennt; alles beim Start geladen. |
| **Dynamisches Laden** | **Dynamic**: Laden bei Bedarf pro Sprache.    | **Scoped dynamic**: Granulares Laden pro Namespace und Sprache.       |

## Strategie-Zusammenfassung

- **Statischer (Static)**: Einfach; keine Netzwerklatenz nach dem ersten Laden. Nachteil: große Bundle-Größe.
- **Dynamic**: Reduziert das Anfangsgewicht (Lazy-Loading). Ideal bei vielen Sprachen.
- **Scoped static**: Hält den Code organisiert (logische Trennung) ohne komplexe zusätzliche Netzwerkanfragen.
- **Scoped dynamic**: Bester Ansatz für _Code-Splitting_ und Performance. Minimiert den Speicherbedarf, indem nur das geladen wird, was der aktuelle View und die aktive Sprache benötigen.

### Was ich gemessen habe:

Ich habe dieselbe mehrsprachige App in einem echten Browser für jeden Stack ausgeführt, dann notiert, was tatsächlich über die Leitung ging und wie lange es dauerte. Die Größen werden **nach normaler Webekomprimierung** angegeben, da dies näher an dem liegt, was Benutzer herunterladen, als rohe Quellzählungen.

- **Größe der Internationalisierungsbibliothek**: Nach Bundling, Tree-Shaking und Minifizierung ist die Größe der i18n-Bibliothek die Größe der Provider (z. B. `NextIntlClientProvider`) + Hooks (z. B. `useTranslations`) Code in einer leeren Komponente. Sie umfasst nicht das Laden von Übersetzungsdateien. Sie beantwortet die Frage, wie teuer die Bibliothek ist, bevor Ihr Inhalt ins Spiel kommt.

- **JavaScript pro Seite**: Für jede Benchmark-Route, wie viel Skript der Browser bei diesem Besuch abruft, gemittelt über die Seiten in der Suite (und über Locales, wo der Bericht sie zusammenführt). Schwere Seiten sind langsame Seiten.

- **Leckage aus anderen Locales**: Es ist der Inhalt derselben Seite, aber in einer anderen Sprache, der versehentlich in die geprüfte Seite geladen würde. Dieser Inhalt ist unnötig und sollte vermieden werden. (z. B. Inhalt der Seite `/fr/about` im Bundle der Seite `/en/about`)

- **Leckage aus anderen Routes**: Dieselbe Idee für **andere Bildschirme** in der App: ob ihre Kopie mitkommen, wenn Sie nur eine Seite öffnen. (z. B. Inhalt der Seite `/en/about` im Bundle der Seite `/en/contact`). Ein hoher Wert deutet auf schwache Aufteilung oder zu breite Bundles hin.

- **Durchschnittliche Komponentenbundel-Größe**: Häufig verwendete UI-Elemente werden **einzeln** gemessen, anstatt sie in einer riesigen App-Nummer zu verbergen. Es zeigt, ob die Internationalisierung alltägliche Komponenten stillschweigend aufbläht. Wenn Ihre Komponente beispielsweise neu gerendert wird, werden alle diese Daten aus dem Speicher geladen. Das Anhängen einer riesigen JSON an eine Komponente ist wie das Verbinden mit einem großen Speicher ungenutzter Daten, die die Leistung Ihrer Komponenten verlangsamen.

- **Responsivität des Sprachwechsels**: Ich wechsle die Sprache mit der eigenen Kontrolle der App und messe, wie lange es dauert, bis die Seite eindeutig gewechselt hat, was ein Besucher bemerken würde, nicht ein Lab-Mikro-Schritt.

- **Rendering-Arbeit nach einem Sprachwechsel**: Eine engere Folgefrage: wie viel Aufwand die Schnittstelle aufgewandt hat, um für die neue Sprache neu zu zeichnen, sobald der Wechsel im Gange ist. Nützlich, wenn die „gefühlte" Zeit und die Framework-Kosten auseinandergehen.

- **Anfängliche Seitenladezeit**: Von der Navigation bis zur Annahme der vollständig geladenen Seite durch den Browser für die getesteten Szenarien. Gut zum Vergleichen von Kaltstart.

- **Hydrationsdauer**: Wenn die App sie offenlegt, wie lange der Client damit verbringt, Server-HTML in etwas Klickbares umzuwandeln. Ein Bindestrich in den Tabellen bedeutet, dass diese Implementierung in diesem Benchmark keine zuverlässige Hydrationszahl bereitgestellt hat.

## GitHub-Sterne

GitHub-Sterne sind ein starker Indikator für die Popularität eines Projekts, das Vertrauen der Community und die langfristige Relevanz. Sie sind zwar kein direktes Maß für die technische Qualität, spiegeln jedoch wider, wie viele Entwickler das Projekt nützlich finden, seinen Fortschritt verfolgen und es wahrscheinlich übernehmen werden. Um den Wert eines Projekts einzuschätzen, helfen Sterne dabei, die Traktion verschiedener Alternativen zu vergleichen und Einblicke in das Wachstum des Ökosystems zu gewinnen.

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs%2Fformatjs%2Ci18next%2Freact-i18next%2Clingui%2Fjs-lingui%2Camannn%2Fnext-intl%2Copral%2Fparaglide-js%2Ctolgee%2Ftolgee-js%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&lingui/js-lingui&amannn/next-intl&opral/paraglide-js&tolgee/tolgee-js&aymericzip/intlayer)

## Ergebnisse im Detail

### 1 - Zu vermeidende Lösungen

Einige Lösungen wie `gt-react` oder `lingo.dev` sollten klar gemieden werden. Sie kombinieren Vendor-Lock-in mit einer Verunreinigung Ihrer Codebasis. Schlimmer noch: Trotz vieler Stunden Arbeit ist es mir nicht gelungen, sie auf TanStack Start zum Laufen zu bringen (ähnlich wie bei Next.js mit `gt-next`).

Aufgetretene Probleme:

**(General Translation)** (`gt-react@latest`):

- Bei einer App von etwa 110 KB kann `gt-react` mehr als 440 KB zusätzlich hinzufügen (Größenordnung gesehen bei der Next.js-Implementierung im selben Benchmark).
- `Quota Exceeded, please upgrade your plan` bereits beim allerersten Build mit General Translation.
- Übersetzungen werden nicht gerendert; ich erhalte den Fehler `Error: <T> used on the client-side outside of <GTProvider>`, was anscheinend ein Bug in der Bibliothek ist.
- Bei der Implementierung von **gt-tanstack-start-react** stieß ich ebenfalls auf ein [Problem](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) mit der Bibliothek: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, was zum Absturz der Anwendung führte. Nach Meldung dieses Problems behob der Maintainer es innerhalb von 24 Stunden.
- Diese Bibliotheken nutzen durch die Funktion `initializeGT()` ein Anti-Pattern, das verhindert, dass das Bundle sauber per Tree-shaking bereinigt wird.

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- AI-Quota überschritten (oder blockierte Server-Abhängigkeit), was Build / Produktion ohne Bezahlung riskant macht.
- Der Compiler überging fast 40 % der übersetzten Inhalte. Ich musste alle `.map`-Aufrufe in flache Komponentenblöcke umschreiben, damit es funktioniert.
- Ihr CLI ist fehleranfällig und setzte die Konfigurationsdatei grundlos zurück.
- Beim Build löschte es die generierten JSONs vollständig, sobald neuer Inhalt hinzugefügt wurde. Dies konnte dazu führen, dass nur wenige Schlüssel hunderte bestehende Schlüssel vernichteten.
- Ich stieß auf Reaktivitätsprobleme mit der Bibliothek auf TanStack Start: Beim Sprachwechsel musste ich ein Re-render des Providers erzwingen, damit es funktioniert.

### 2 - Experimentelle Lösungen

**(Wuchale)** (`wuchale@0.22.11`):

Die Idee hinter `Wuchale` ist interessant, aber noch keine tragfähige Lösung. Ich stieß auf Reaktivitätsprobleme und musste einen Re-render des Providers erzwingen, um die App auf TanStack Start zum Laufen zu bringen. Die Dokumentation ist zudem recht unklar, was den Einstieg erschwert.

### 3 - Akzeptable Lösungen

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` bietet einen innovativen, gut durchdachten Ansatz. Dennoch funktionierte in diesem Benchmark das beworbene Tree-shaking weder für meine Next.js-Implementierung noch für TanStack Start. Der Workflow und die DX sind zudem komplexer als bei anderen Optionen. Persönlich bin ich kein Fan davon, JS-Dateien vor jedem Push neu generieren zu müssen, was ständige Risiken für Merge-Konflikte in PRs birgt.

> Hinweis zu paraglide: Diese Lösung injiziert Code für Importe in Ihre Codebasis, weshalb die Metrik 'lib size' im Benchmark-Bericht fast 0 beträgt. Code-Generierung ist gut, da die verwendete Funktion nur die notwendige Logik enthält (Präfix überall vs. kein Präfix, Cookie vs. Speicher usw.). Im Vergleich dazu führt Intlayer diese Filterung durch Injektion von Umgebungsvariablen im Build durch, um den Bundler zu zwingen, den Inhalt je nach Logik per Tree-shaking zu bereinigen. Dank dessen sind paraglide und intlayer am Ende 6 bis 10 Mal leichtere Lösungen als i18next oder next-intl.

**(Tolgee)** (`@tolgee/react@7.0.0`):

`Tolgee` adressiert viele der oben genannten Probleme. Ich fand den Einstieg schwieriger als bei anderen Tools mit ähnlichen Ansätzen. Es bietet keine Typsicherheit, was es zudem sehr schwer macht, fehlende Schlüssel zur Kompilierzeit zu finden. Ich musste die Tolgee-APIs mit eigenen Funktionen umhüllen, um eine Erkennung fehlender Schlüssel hinzuzufügen.

Auf TanStack Start hatte ich ebenfalls Reaktivitätsprobleme: Beim Sprachwechsel musste ich den Provider zum Re-render zwingen und Locale-Wechsel-Events abonnieren, damit das Laden in einer anderen Sprache korrekt funktionierte.

**(use-intl)** (`use-intl@4.9.1`):

`use-intl` ist derzeit das angesagteste "intl"-Stück im React-Ökosystem (aus der gleichen Familie wie `next-intl`) und wird oft von KI-Assistenten empfohlen, meiner Ansicht nach jedoch fälschlicherweise in einem Performance-orientierten Umfeld. Der Einstieg ist recht einfach. In der Praxis ist der Prozess zur Optimierung und Begrenzung von Leakage jedoch ziemlich komplex. Gleichermaßen verlangsamt die Kombination aus dynamischem Laden + Namespacing + TypeScript-Typen die Entwicklung erheblich.

Bei TanStack Start vermeiden Sie Next.js-spezifische Fallen (`setRequestLocale`, statisches Rendering), aber das Kernproblem bleibt gleich: Ohne strikte Disziplin transportiert das Bundle schnell zu viele Nachrichten, und die Namespace-Wartung pro Route wird mühsam.

**(react-i18next)** (`react-i18next@17.0.2`):

`react-i18next` ist wahrscheinlich die beliebteste Option, da es eine der ersten war, die i18n-Anforderungen für JavaScript-Apps bediente. Es verfügt zudem über ein breites Spektrum an Community-Plugins für spezifische Probleme.

Dennoch teilt es dieselben großen Nachteile wie Stacks, die auf `t('a.b.c')` basieren: Optimierungen sind möglich, aber sehr zeitaufwendig, und große Projekte riskieren schlechte Praktiken (Namespaces + dynamisches Laden + Typen).

Die Nachrichtenformate weichen ebenfalls voneinander ab: `use-intl` verwendet ICU MessageFormat, während `i18next` sein eigenes Format nutzt – was Tooling oder Migrationen kompliziert macht, wenn man sie mischt.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` wird oft gelobt. Persönlich fand ich den Workflow um `lingui extract` / `lingui compile` komplexer als andere Ansätze, ohne einen klaren Vorteil in diesem TanStack Start-Benchmark. Mir fielen zudem inkonsistente Syntaxen auf, die KIs verwirren (z. B. `t()`, `t''`, `i18n.t()`, `<Trans>`).

**(react-intl)** (`react-intl@10.1.1`):

`react-intl` ist eine performante Implementierung des Format.js-Teams. Die DX bleibt wortreich: `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` erhöht die Komplexität, den zusätzlichen JavaScript-Aufwand und bindet die globale i18n-Instanz an viele Knoten im React-Tree.

### 4 - Empfehlungen

Dieser TanStack Start-Benchmark hat kein direktes Äquivalent zu `next-translate` (Next.js-Plugin + `getStaticProps`). Für Teams, die unbedingt eine `t()`-API mit einem ausgereiften Ökosystem wollen, bleiben `react-i18next` und `use-intl` "vernünftige" Entscheidungen, aber stellen Sie sich darauf ein, viel Zeit in die Optimierung zu investieren, um Leakage zu vermeiden.

**(Intlayer)** (`react-intlayer@8.7.12`):

Ich werde `react-intlayer` der Objektivität halber nicht persönlich bewerten, da es meine eigene Lösung ist.

### Persönliche Anmerkung

Diese Anmerkung ist persönlicher Natur und beeinflusst die Benchmark-Ergebnisse nicht. Dennoch sieht man in der i18n-Welt oft einen Konsens um ein Muster wie `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` für übersetzte Inhalte.

In React-Apps ist das Injizieren einer Funktion als `ReactNode` meiner Meinung nach ein Anti-Pattern. Es fügt zudem vermeidbare Komplexität und JavaScript-Ausführungs-Overhead hinzu (selbst wenn es kaum spürbar ist).
