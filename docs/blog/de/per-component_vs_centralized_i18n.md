---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Per-Komponente vs. Zentralisiertes i18n: Ein neuer Ansatz mit Intlayer
description: Eine eingehende Analyse der Internationalisierungsstrategien in React, die zentralisierte, per-key- und per-component-Ansätze vergleicht und Intlayer vorstellt.
keywords:
  - i18n
  - React
  - Internationalisierung
  - Intlayer
  - Optimierung
  - Bundle-Größe
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# Per-Komponente vs. Zentralisiertes i18n

Der Per-Komponenten-Ansatz ist kein neues Konzept. Zum Beispiel unterstützt `vue-i18n` im Vue-Ökosystem [SFC-i18n (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html). Nuxt bietet auch [Übersetzungen pro Komponente](https://i18n.nuxtjs.org/docs/guide/per-component-translations), und Angular verwendet ein ähnliches Muster über seine [Feature Modules](https://v17.angular.io/guide/feature-modules).

Selbst in einer Flutter-App findet man häufig folgendes Muster:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- Übersetzungen befinden sich hier
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

In der React-Welt sehen wir jedoch hauptsächlich verschiedene Ansätze, die ich in drei Kategorien zusammenfassen werde:

<Columns>
  <Column>

**Zentralisierter Ansatz** (i18next, next-intl, react-intl, lingui)

- (ohne Namespaces) betrachtet eine einzelne Quelle zum Abrufen von Inhalten. Standardmäßig lädst du den Inhalt aller Seiten, wenn deine App startet.

  </Column>
  <Column>

Granularer Ansatz (intlayer, inlang)

- Feingranulares Abrufen von Inhalten pro Schlüssel oder pro Komponente.

  </Column>
</Columns>

> In diesem Blog werde ich mich nicht auf compiler-basierte Lösungen konzentrieren, die ich bereits hier behandelt habe: [Compiler vs deklaratives i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md).
> Beachte, dass compiler-basierte i18n (z. B. Lingui) lediglich die Extraktion und das Laden von Inhalten automatisiert. Unter der Haube teilen sie oft dieselben Einschränkungen wie andere Ansätze.

> Beachte, je feiner du das Abrufen deiner Inhalte gestaltest, desto höher ist das Risiko, zusätzlichen State und Logik in deine Komponenten einzufügen.

Granulare Ansätze sind flexibler als zentralisierte, aber oft ein Kompromiss. Selbst wenn diese Bibliotheken "tree shaking" bewerben, lädst du in der Praxis häufig eine Seite in jeder Sprache.

Grob gesagt lässt sich die Entscheidung folgendermaßen zusammenfassen:

- Wenn deine Anwendung mehr Seiten als Sprachen hat, solltest du einen granularen Ansatz bevorzugen.
- Wenn du mehr Sprachen als Seiten hast, solltest du zu einem zentralisierten Ansatz tendieren.

Natürlich sind die Autor:innen der Bibliotheken sich dieser Einschränkungen bewusst und bieten Workarounds an. Dazu gehören: Aufteilen in Namespaces, dynamisches Laden von JSON-Dateien (`await import()`), oder das Entfernen/Bereinigen von Inhalten zur Build-Zeit.

Gleichzeitig sollten Sie wissen, dass das dynamische Laden Ihrer Inhalte zusätzliche Anfragen an Ihren Server verursacht. Jeder zusätzliche `useState` oder hook bedeutet eine zusätzliche Serveranfrage.

> Um dieses Problem zu lösen, schlägt Intlayer vor, mehrere Inhaltsdefinitionen unter demselben Key zu gruppieren; Intlayer wird diese Inhalte dann zusammenführen.

Trotz dieser Ansätze ist klar, dass der zentralisierte Ansatz der populärste ist.

### Warum ist der zentralisierte Ansatz so beliebt?

- Erstens war i18next die erste Lösung, die weit verbreitet wurde und einer Philosophie folgte, die von PHP- und Java-Architekturen (MVC) inspiriert ist und auf einer strikten Trennung der Verantwortlichkeiten beruht (Inhalte vom Code getrennt zu halten). Sie erschien 2011 und etablierte ihre Standards noch vor der massiven Verschiebung hin zu komponentenbasierten Architekturen (wie React).
- Sobald eine Bibliothek einmal weit verbreitet ist, wird es schwierig, das Ökosystem auf andere Muster umzustellen.
- Ein zentralisierter Ansatz erleichtert zudem die Arbeit mit Translation Management Systems wie Crowdin, Phrase oder Localized.
- Die Logik hinter einem per-Komponente-Ansatz ist komplexer als die eines zentralisierten Ansatzes und erfordert mehr Entwicklungszeit, insbesondere wenn Probleme wie die Identifikation, wo sich der Inhalt befindet, gelöst werden müssen.

### Ok, aber warum nicht einfach beim zentralisierten Ansatz bleiben?

Lass mich erklären, warum das problematisch für deine App sein kann:

- **Unbenutzte Daten:**
  Wenn eine Seite geladen wird, lädst du häufig den Inhalt aller anderen Seiten mit. (In einer 10-seitigen App sind das 90 % unbenutzter Inhalte, die geladen werden). Lädst du ein Modal per Lazy Loading? Der i18n‑Bibliothek ist das egal — sie lädt die Strings trotzdem zuerst.
- **Performance:**
  Bei jedem Re-Render wird jede einzelne deiner Komponenten mit einer riesigen JSON-Payload hydriert, was die Reaktivität deiner App mit wachsender Größe beeinträchtigt.
- **Wartung:**
  Das Pflegen großer JSON-Dateien ist mühsam. Du musst zwischen Dateien springen, um eine Übersetzung einzufügen, und sicherstellen, dass keine Übersetzungen fehlen und keine **verwaisten Schlüssel (orphan keys)** zurückbleiben.
- **Design-System:**
  Das führt zu Inkompatibilitäten mit Design-Systemen (z. B. einer `LoginForm`-Komponente) und erschwert die Duplizierung von Komponenten über verschiedene Apps hinweg.

**"Aber wir haben Namespaces erfunden!"**

Sicher, und das ist ein großer Fortschritt. Schauen wir uns den Vergleich der Hauptbundle-Größe eines Vite + React + React Router v7 + Intlayer-Setups an. Wir haben eine 20-seitige Anwendung simuliert.

Das erste Beispiel enthält keine pro-Locale lazy geladenen Übersetzungen und keine Namespace-Aufteilung. Das zweite enthält Content-Purging + dynamisches Laden der Übersetzungen.

| Optimiertes Bundle                                                                                                            | Nicht optimiertes Bundle                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| ![nicht optimiertes Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![optimiertes Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Also dank Namespaces sind wir von dieser Struktur zu dieser übergegangen:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

Zu dieser:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Nun müssen Sie genau steuern, welcher Teil des App-Inhalts geladen werden soll und wo. Folglich überspringt die große Mehrheit der Projekte diesen Teil aufgrund der Komplexität (siehe beispielsweise den [next-i18next-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_using_next-i18next.md), um die Herausforderungen zu sehen, die das (bloße) Befolgen guter Praktiken mit sich bringt).

Dementsprechend landen diese Projekte beim zuvor beschriebenen Problem des massiven JSON-Ladens.

> Beachten Sie, dass dieses Problem nicht spezifisch für i18next ist, sondern alle oben aufgeführten zentralisierten Ansätze betrifft.

Ich möchte daran erinnern, dass nicht alle granularen Ansätze dieses Problem lösen. Beispielsweise laden `vue-i18n SFC`- oder `inlang`-Ansätze die Übersetzungen pro Locale nicht automatisch lazy, sodass du das Bundle-Größenproblem einfach gegen ein anderes eintauschst.

Zudem wird es ohne eine saubere Separation of concerns deutlich schwieriger, deine Übersetzungen für die Überprüfung durch Übersetzer zu extrahieren und bereitzustellen.

### Wie Intlayers komponentenbasierter Ansatz dieses Problem löst

Intlayer geht in mehreren Schritten vor:

1. **Deklaration:** Deklariere deinen Content überall in deiner Codebase mit `*.content.{ts|jsx|cjs|json|json5|...}`-Dateien. Das stellt die Separation of concerns sicher und hält den Content colocated. Eine Content-Datei kann pro Locale oder mehrsprachig sein.
2. **Verarbeitung:** Intlayer führt einen Build-Schritt aus, um JS-Logik zu verarbeiten, fehlende Übersetzungs-Fallbacks zu behandeln, TypeScript-Typen zu generieren, doppelte Inhalte zu verwalten, Inhalte aus Ihrem CMS abzurufen und mehr.
3. **Bereinigung:** Beim Build Ihrer App entfernt Intlayer ungenutzte Inhalte (ähnlich wie Tailwind bei der Verwaltung Ihrer Klassen), indem der Inhalt wie folgt ersetzt wird:

**Deklaration:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    de: { title: "Mein Titel" },
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**Verarbeitung:** Intlayer baut das Wörterbuch basierend auf der `.content` Datei und generiert:

```json5
// .intlayer/dynamic_dictionary/en/my-key.json
{
  "key": "my-key",
  "content": { "title": "My title" },
}
```

**Ersetzung:** Intlayer transformiert Ihre Komponente während des Build-Prozesses der Anwendung.

**- Statischer Import-Modus:**

```tsx
// Representation of the component in JSX-like syntax
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Dynamischer Import-Modus:**

```tsx
// Representation of the component in JSX-like syntax
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // Gleiches für andere Sprachen
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` verwendet einen Suspense-ähnlichen Mechanismus, um die lokalisierte JSON nur bei Bedarf zu laden.

**Wesentliche Vorteile dieses pro-Komponenten-Ansatzes:**

- Wenn Sie Ihre Content-Deklaration nahe bei Ihren components halten, verbessert das die Wartbarkeit (z. B. das Verschieben einer Komponente in eine andere App oder ein Design-System. Das Löschen des Komponenten-Ordners entfernt ebenfalls die zugehörigen Inhalte, wie Sie es wahrscheinlich bereits für Ihre `.test`- und `.stories`-Dateien tun)

- Ein pro-Komponenten-Ansatz verhindert, dass AI-Agenten durch all Ihre verschiedenen Dateien springen müssen. Er fasst alle Übersetzungen an einem Ort zusammen und begrenzt so die Komplexität der Aufgabe sowie die Anzahl der verwendeten Tokens.

### Einschränkungen

Natürlich bringt dieser Ansatz Kompromisse mit sich:

- Es ist schwieriger, sich mit anderen l10n-Systemen und zusätzlichem Tooling zu verbinden.
- Es entsteht ein Lock-in (was bei jeder i18n-Lösung aufgrund ihrer spezifischen Syntax im Grunde bereits der Fall ist).

Aus diesem Grund versucht Intlayer, ein vollständiges Toolset für i18n bereitzustellen (100% kostenlos und OSS), einschließlich AI-Übersetzung unter Verwendung Ihres eigenen AI-Providers und API-Keys. Intlayer stellt außerdem Tooling bereit, um Ihr JSON zu synchronisieren — dieses funktioniert wie die Message-Formatter von ICU / vue-i18n / i18next, um Inhalte in deren spezifische Formate zu überführen.
