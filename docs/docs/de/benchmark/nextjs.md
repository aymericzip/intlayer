---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Beste i18n-Lösung für Next.js im Jahr 2026 - Benchmark-Bericht
description: Vergleichen Sie Next.js Internationalisierungs-Software (i18n) wie next-intl, next-i18next und Intlayer. Detaillierter Performance-Bericht zu Bundle-Größe, Leakage und Reaktivität.
keywords:
  - Benchmark
  - i18n
  - intl
  - nextjs
  - Performance
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Benchmark initialisiert"
---

# Next.js i18n-Bibliotheken — Benchmark-Bericht 2026

Diese Seite ist ein Benchmark-Bericht für i18n-Lösungen auf Next.js.

## Inhaltsverzeichnis

<Toc/>

## Interaktiver Benchmark

<I18nBenchmark framework="nextjs" vertical/>

## Ergebnis-Referenz:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md

Das vollständige Benchmark-Repository finden Sie [hier](https://github.com/intlayer-org/benchmark-i18n).

## Einführung

Internationalisierungs-Bibliotheken haben einen starken Einfluss auf Ihre Anwendung. Das Hauptrisiko besteht darin, Inhalte für jede Seite und jede Sprache zu laden, wenn der Benutzer nur eine einzige Seite besucht.

Wenn Ihre App wächst, kann die Bundle-Größe exponentiell zunehmen, was die Performance spürbar beeinträchtigen kann.

Beispielsweise kann Ihre Seite nach der Internationalisierung bei den schlimmsten Beispielen fast viermal größer sein.

Ein weiterer Effekt von i18n-Bibliotheken ist die langsamere Entwicklung. Die Umwandlung von Komponenten in mehrsprachige Inhalte über verschiedene Sprachen hinweg ist zeitaufwendig.

Da das Problem komplex ist, gibt es viele Lösungen – einige konzentrieren sich auf die DX (Developer Experience), andere auf Performance oder Skalierbarkeit usw.

Intlayer versucht, über all diese Dimensionen hinweg zu optimieren.

## Testen Sie Ihre App

Um diese Probleme aufzudecken, habe ich einen kostenlosen Scanner entwickelt, den Sie [hier](https://intlayer.org/i18n-seo-scanner) ausprobieren können.

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Das Problem

Es gibt zwei wesentliche Möglichkeiten, die Auswirkungen einer mehrsprachigen App auf Ihr Bundle zu begrenzen:

- Aufteilung Ihres JSONs (oder Inhalts) auf Dateien / Variablen / Namespaces, damit der Bundler ungenutzte Inhalte für eine bestimmte Seite herausfiltern (Tree-shaking) kann.
- Dynamisches Laden Ihrer Seiteninhalte nur in der Sprache des Benutzers.

Technische Einschränkungen für diese Ansätze:

**Dynamisches Laden**

Auch wenn Sie Routen wie `[locale]/page.tsx` deklarieren, behandeln Webpack oder Turbopack `locale` nicht als statische Konstante, selbst wenn `generateStaticParams` definiert ist. Das bedeutet, dass Inhalte für alle Sprachen in jede Seite gezogen werden können. Der Hauptweg, dies zu begrenzen, besteht darin, Inhalte über einen dynamischen Import zu laden (z. B. `import('./locales/${locale}.json')`).

Beim Build-Vorgang erzeugt Next.js ein JS-Bundle pro Sprache (z. B. `./locales_fr_12345.js`). Wenn die Seite im Client ausgeführt wird, stellt der Browser eine zusätzliche HTTP-Anfrage für die benötigte JS-Datei (z. B. `./locales_fr_12345.js`).

> Ein anderer Weg, dasselbe Problem zu lösen, ist die Verwendung von `fetch()`, um JSON dynamisch zu laden. So arbeitet `Tolgee`, wenn JSON unter `/public` liegt, oder `next-translate`, das sich auf `getStaticProps` zum Laden von Inhalten verlässt. Der Ablauf ist derselbe: Der Browser stellt eine zusätzliche HTTP-Anfrage, um das Asset zu laden.

**Content-Splitting (Inhaltsaufteilung)**

Wenn Sie eine Syntax wie `const t = useTranslation()` + `t('mein-objekt.mein-unterobjekt.mein-schluessel')` verwenden, muss normalerweise das gesamte JSON im Bundle enthalten sein, damit die Bibliothek den Schlüssel auflösen kann. Ein Großteil dieses Inhalts wird also mitgeliefert, auch wenn er auf der Seite nicht verwendet wird.

Um dies abzumildern, verlangen einige Bibliotheken, dass Sie pro Seite deklarieren, welche Namespaces geladen werden sollen – z. B. `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

Im Gegensatz dazu fügt `Paraglide` vor dem Build einen zusätzlichen Schritt hinzu, um JSON in flache Symbole wie `const en_my_var = () => 'mein wert'` umzuwandeln. Theoretisch ermöglicht dies das Tree-shaking ungenutzter Inhalte auf der Seite. Wie wir sehen werden, hat diese Methode dennoch Nachteile.

Schließlich wendet `Intlayer` eine Build-Optimierung an, sodass `useIntlayer('mein-key')` direkt durch den entsprechenden Inhalt ersetzt wird.

## Methodik

Für diesen Benchmark haben wir die folgenden Bibliotheken verglichen:

- `Base App` (Ohne i18n-Bibliothek)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

Ich habe `Next.js` Version `16.2.4` mit dem App Router verwendet.

Ich habe eine mehrsprachige App mit **10 Seiten** und **10 Sprachen** erstellt.

Ich habe **vier Ladestrategien** verglichen:

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

Ich habe dieselbe mehrsprachige Anwendung in einem echten Browser für jedes Framework ausgeführt und dokumentiert, was tatsächlich über das Netzwerk übertragen wurde und wie lange die Vorgänge dauerten. Die Größenangaben beziehen sich auf den Zustand **nach normaler Web-Komprimierung**, da dies näher an dem liegt, was Benutzer tatsächlich herunterladen.

- **Größe der Internationalisierungs-Bibliothek**: Nach dem Bundling, Tree-shaking und Minifizieren entspricht die Größe der i18n-Bibliothek der Größe der Provider (z. B. `NextIntlClientProvider`) + dem Code der Hooks (z. B. `useTranslations`) in einer leeren Komponente – ohne das Laden von Übersetzungsdateien. Dies beantwortet die Frage, wie "teuer" die Bibliothek ist, bevor Ihre Inhalte hinzukommen.

- **JavaScript pro Seite**: Für jede Benchmark-Route die Menge an Skripten, die der Browser für diesen Besuch abruft, gemittelt über alle Seiten der Suite (und über die Sprachen hinweg). Schwere Seiten sind langsame Seiten.

- **Leakage von anderen Sprachen**: Dies ist der Inhalt derselben Seite, aber in einer anderen Sprache, der fälschlicherweise in die untersuchte Seite geladen wird. Dieser Inhalt ist unnötig und sollte vermieden werden (z. B. Inhalt der `/fr/about`-Seite im Bundle der `/en/about`-Seite).

- **Leakage von anderen Routen**: Das gleiche Konzept für **andere Ansichten** in der App: ob deren Texte mitgeliefert werden, obwohl Sie nur eine einzige Seite geöffnet haben (z. B. Inhalt der `/en/about`-Seite im Bundle der `/en/contact`-Seite). Ein hoher Wert deutet auf schwaches Splitting oder zu weit gefasste Bundles hin.

- **Durchschnittliche Bundle-Größe pro Komponente**: Gängige UI-Elemente werden **einzeln** gemessen, anstatt in einer riesigen App-Zahl unterzugehen. Es zeigt, ob die Internationalisierung alltägliche Komponenten heimlich aufbläht. Wenn Ihre Komponente beispielsweise neu gerendert wird, lädt sie all diese Daten aus dem Speicher. Das Anhängen eines riesigen JSONs an eine Komponente ist wie der Anschluss eines großen Speichers für ungenutzte Daten, der die Performance Ihrer Komponenten verlangsamt.

- **Reaktionszeit beim Sprachwechsel**: Ich wechsle die Sprache über das eigene Steuerelement der App und messe die Zeit, bis die Seite sichtlich umgeschaltet hat – das, was ein Besucher bemerken würde, kein technischer Mikroschritt.

- **Render-Arbeit nach einem Sprachwechsel**: Eine detailliertere Untersuchung: Wie viel Aufwand die Oberfläche betreiben musste, um nach dem Umschalten die neue Sprache zu zeichnen. Nützlich, wenn die "gefühlte" Zeit und die Framework-Kosten auseinanderklaffen.

- **Initiale Seitenladezeit**: Von der Navigation bis zu dem Zeitpunkt, an dem der Browser die Seite für die von mir getesteten Szenarien als vollständig geladen betrachtet. Gut zum Vergleich von Kaltstarts (Cold Starts).

- **Hydrierungszeit**: Sofern die App dies ausgibt: Wie lange der Client benötigt, um Server-HTML in etwas Interaktives zu verwandeln. Ein Bindestrich in den Tabellen bedeutet, dass diese Implementierung in diesem Benchmark keinen zuverlässigen Hydrierungswert geliefert hat.

## Ergebnisse im Detail

### 1 — Zu vermeidende Lösungen

Einige Lösungen wie `gt-next` oder `lingo.dev` sollten klar vermieden werden. Sie kombinieren Vendor-Lock-in mit einer Verunreinigung Ihrer Codebasis. Trotz vieler Stunden Arbeit ist es mir nicht gelungen, sie zum Laufen zu bringen – weder auf TanStack Start noch auf Next.js.

Aufgetretene Probleme:

**(General Translation)** (`gt-next@6.16.5`):

- Bei einer 110-KB-App fügt `gt-react` mehr als 440 KB hinzu.
- `Quota Exceeded, please upgrade your plan` bereits beim allerersten Build mit General Translation.
- Übersetzungen werden nicht gerendert; ich erhalte den Fehler `Error: <T> used on the client-side outside of <GTProvider>`, was anscheinend ein Bug in der Bibliothek ist.
- Bei der Implementierung von **gt-tanstack-start-react** stieß ich ebenfalls auf ein [Problem](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) mit der Bibliothek: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, was zum Absturz der Anwendung führte. Nach Meldung dieses Problems behob der Maintainer es innerhalb von 24 Stunden.
- Die Bibliothek blockiert das statische Rendering von Next.js-Seiten.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- AI-Quota überschritten, was den Build komplett blockiert – man kann also nicht ohne Bezahlung produktiv gehen.
- Der Compiler überging fast 40 % der übersetzten Inhalte. Ich musste alle `.map`-Aufrufe in flache Komponentenblöcke umschreiben, damit es funktioniert.
- Ihr CLI ist fehleranfällig und setzte die Konfigurationsdatei grundlos zurück.
- Beim Build löschte es die generierten JSONs vollständig, sobald neuer Inhalt hinzugefügt wurde. Dies konnte dazu führen, dass eine Handvoll Schlüssel mehr als 300 bestehende Schlüssel vernichtete.

### 2 — Experimentelle Lösungen

**(Wuchale)** (`wuchale@0.22.11`):

Die Idee hinter `Wuchale` ist interessant, aber noch nicht reif für den Einsatz. Ich stieß auf Reaktivitätsprobleme und musste den Provider-Re-render erzwingen, um die App zum Laufen zu bringen. Die Dokumentation ist zudem recht unklar, was den Einstieg erschwert.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` bietet einen innovativen, gut durchdachten Ansatz. Dennoch funktionierte in diesem Benchmark das beworbene Tree-shaking für meine Next.js- oder TanStack Start-Setups nicht. Der Workflow und die DX sind komplexer als bei anderen Optionen.
Persönlich missfällt mir die Notwendigkeit, JS-Dateien vor jedem Push neu zu generieren, was ein ständiges Risiko für Merge-Konflikte in PRs darstellt. Das Tool scheint zudem stärker auf Vite als auf Next.js ausgerichtet zu sein.
Schließlich nutzt Paraglide im Vergleich zu anderen Lösungen keinen Store (z. B. React Context), um die aktuelle Sprache für das Rendering abzurufen. Für jeden geparsten Node wird die Sprache aus dem localStorage / Cookie etc. angefragt. Dies führt zur Ausführung unnötiger Logik, die die Reaktivität der Komponenten beeinträchtigt.

### 3 — Akzeptable Lösungen

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` adressiert viele der oben genannten Probleme. Ich fand es schwieriger zu adoptieren als ähnliche Tools. Es bietet keine Typsicherheit, was es zudem erschwert, fehlende Schlüssel zur Kompilierzeit zu finden. Ich musste die Tolgee-Funktionen mit eigenen Funktionen umhüllen, um eine Erkennung fehlender Schlüssel hinzuzufügen.

**(Next Intl)** (`next-intl@4.9.1`):

`next-intl` ist die derzeit angesagteste Option und diejenige, die KI-Assistenten am häufigsten empfehlen, meiner Ansicht nach jedoch fälschlicherweise. Der Einstieg ist einfach. In der Praxis ist die Optimierung zur Begrenzung von Leakage komplex. Die Kombination aus dynamischem Laden + Namespacing + TypeScript-Typen verlangsamt die Entwicklung enorm. Das Paket ist zudem recht schwer (~13 KB für `NextIntlClientProvider` + `useTranslations`, mehr als doppelt so viel wie `next-intlayer`). **next-intl** blockierte früher das statische Rendering von Next.js-Seiten. Es bietet einen Helper namens `setRequestLocale()`. Dies scheint für zentralisierte Dateien wie `en.json` / `fr.json` teilweise gelöst zu sein, aber das statische Rendering bricht immer noch ab, wenn Inhalte in Namespaces wie `en/shared.json` / `fr/shared.json` / `es/shared.json` aufgeteilt sind.

**(Next I18next)** (`next-i18next@16.0.5`):

`next-i18next` ist wahrscheinlich die beliebteste Option, da es eine der ersten i18n-Lösungen für JavaScript-Apps war. Es gibt viele Community-Plugins. Es teilt die gleichen großen Nachteile wie `next-intl`. Das Paket ist besonders schwer (~18 KB für `I18nProvider` + `useTranslation`, etwa dreimal so viel wie `next-intlayer`).

Die Nachrichtenformate unterscheiden sich ebenfalls: `next-intl` verwendet ICU MessageFormat, während `i18next` sein eigenes Format nutzt.

**(Next International)** (`next-international@1.3.1`):

`next-international` geht die oben genannten Probleme ebenfalls an, unterscheidet sich aber nicht wesentlich von `next-intl` oder `next-i18next`. Es enthält `scopedT()` für Namespace-spezifische Übersetzungen, aber dessen Verwendung hat praktisch keinen Einfluss auf die Bundle-Größe.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` wird oft gelobt. Persönlich fand ich den `lingui extract` / `lingui compile` Workflow komplexer als Alternativen, ohne einen klaren Vorteil. Mir fielen zudem inkonsistente Syntaxen auf, die KIs verwirren (z. B. `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 — Empfehlungen

**(Next Translate)** (`next-translate@3.1.2`):

`next-translate` ist meine Hauptempfehlung, wenn Sie eine API im `t()`-Stil bevorzugen. Es ist durch das `next-translate-plugin` elegant gelöst und lädt Namespaces über `getStaticProps` mit einem Webpack / Turbopack Loader. Es ist zudem die leichteste Option hier (~2,5 KB). Für das Namespacing ist die Definition pro Seite oder Route in der Konfiguration gut durchdacht und einfacher zu warten als die Hauptalternativen wie **next-intl** oder **next-i18next**. In Version `3.1.2` stellte ich fest, dass das statische Rendering nicht funktionierte; Next.js fiel auf dynamisches Rendering zurück.

**(Intlayer)** (`next-intlayer@8.7.5`):

Ich werde `next-intlayer` der Objektivität halber nicht persönlich bewerten, da es meine eigene Lösung ist.

### Persönliche Anmerkung

Diese Anmerkung ist persönlicher Natur und beeinflusst die Benchmark-Ergebnisse nicht. In der i18n-Welt sieht man oft einen Konsens um das Muster `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

In React-Apps ist das Injizieren einer Funktion als `ReactNode` meiner Meinung nach ein Anti-Pattern. Es fügt zudem vermeidbare Komplexität und JavaScript-Ausführungs-Overhead hinzu (wenn auch kaum spürbar).
