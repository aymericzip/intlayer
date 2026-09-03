---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Übersetzungen testen ohne fragile Tests zu schreiben"
description: Was es sich in einer i18n-App zu testen lohnt und was nicht. Provider-basiertes Rendering, Pseudolokalisierung, RTL- und Pluralabdeckung und die Snapshot-Falle.
keywords:
  - übersetzungen testen
  - i18n testing
  - testing library i18n
  - pseudolokalisierung
  - locale provider test
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Übersetzungen testen ohne fragile Tests zu schreiben

Die meisten i18n-Test-Suites scheitern an einem von zwei Problemen. Entweder prüfen sie wörtliche Texte ab, sodass jede Textänderung fünfzig Tests bricht und das Team sie entnervt löscht. Oder sie rendern alles in der Standard-Locale, was keinerlei Aussagekraft über die restlichen siebzehn Sprachen liefert. Beide Ansätze führen zum selben Ergebnis, einer Test-Suite, der niemand mehr vertraut.

## Inhaltsverzeichnis

<TOC/>

## Die Muster sind bibliotheksunabhängig

Jedes unten aufgeführte Muster funktioniert auf jedem i18n-Stack. Ersetzen Sie den Provider durch `I18nextProvider`, `NextIntlClientProvider` oder `IntlProvider` und die Tests bleiben identisch, da sie die gerenderte Ausgabe und nicht die spezifische Bibliotheks-API überprüfen.

Auch die Abdeckungswerkzeuge lassen sich direkt übertragen: Mit dem [Sync JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md), das auf Ihre bestehenden Kataloge verweist, oder einem [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md), der Ihre aktuellen Imports verknüpft, wird die Abdeckungsprüfung direkt gegen Ihr vorhandenes JSON ausgeführt.

## Festlegen, was wirklich getestet werden soll

Übersetzungsqualität lässt sich nicht per Assertion prüfen. Keine Überprüfung kann feststellen, ob das Deutsch idiomatisch klingt, und der Versuch führt lediglich zu einer Test-Suite voller fest codierter Zeichenketten.

Was sich mechanisch testen lässt und sinnvoll ist:

| Lohnenswert zu testen                       | Nicht lohnenswert zu testen             |
| :------------------------------------------ | :-------------------------------------- |
| Jede erforderliche Locale hat einen Wert    | Ob die Formulierung elegant ist         |
| Die richtige Locale erreicht die Komponente | Der exakte Wortlaut jedes Labels        |
| Plurale lösen für jede Kategorie auf        | Ob der Übersetzer sauber gearbeitet hat |
| RTL-Locales setzen Richtung und Spiegelung  | Jeder String in jeder Sprache           |
| Formatierte Daten und Zahlen nutzen Locale  | Interne Korrektheit von `Intl`          |

Die Abdeckungsprüfung gehört in einen datengetriebenen Test, nicht in Komponententests. Dies wird in [Fehlende Übersetzungen aufspüren](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md) behandelt; dieser Beitrag widmet sich dem Rest.

## Unter einem Provider rendern und nach Rollen abfragen

Das Kernmuster besteht darin, die Komponente innerhalb eines Locale-Providers zu mounten und nach Rolle oder Test-ID statt nach Text abzufragen.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("rendert die Überschrift der Zusammenfassung auf Französisch", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Die Abfrage `getByRole("heading")` übersteht Textänderungen problemlos. `getByText("Récapitulatif")` bricht dagegen sofort. Verwenden Sie den exakten Text nur dann, wenn der String selbst Gegenstand des Tests ist, was selten der Fall ist.

Für Attribute wie `aria-label` benötigen Sie den Roh-String anstelle eines renderbaren Knotens. In React stellen Einträge von `useIntlayer` dafür ein `.value`-Feld bereit.

## Tests über Locales hinweg parametrisieren

Ein einziger Testrumpf, ausgeführt über alle Locales, ist wertvoller als separate Tests pro Sprache.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("rendert ohne Fallback auf den Schlüssel", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Ein gerenderter Schlüssel bedeutet, dass die Auflösung fehlgeschlagen ist.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("setzt die korrekte Textrichtung", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

Die erste Assertion ist ein unkomplizierter allgemeiner Gewinn: Wenn ein Nachschlagen fehlschlägt und die Bibliothek den Schlüssel rendert, enthält das DOM ein Format wie `cart.summary.title`. Das fängt eine ganze Klasse von Fehlern ab, ohne eine einzige Zeichenkette benennen zu müssen.

## Pseudolokalisierung findet, was Kataloge übersehen

Fügen Sie eine Test-Locale hinzu, die jede Zeichenkette transformiert, beispielsweise `Checkout` zu `[!!! Çĥéçķöũţ !!!]`. Rendern Sie die Seite anschließend in dieser Sprache.

Alles, was weiterhin in reinem Englisch erscheint, ist fest im Quellcode codiert. Keine katalogbasierte Prüfung kann das erkennen, da der String für die Tools schlicht nicht existiert. Die Klammern erfüllen einen zweiten Zweck: Sie verlängern den Text um rund 30 Prozent, wodurch Layout-Probleme sichtbar werden, bevor sie auf Deutsch auftreten.

Dies sollte idealerweise als visueller Durchlauf oder End-to-End-Test laufen und nicht als Unit-Test, da Fehler rein optischer Natur sind.

## Plurale erfordern Tests pro Kategorie, nicht pro Sprache

Pluralfehler bleiben oft unbemerkt, weil Englisch nur zwei Formen kennt und die meisten Entwickler nur diese ausführen. Polnisch hat vier, Arabisch sechs.

```ts fileName="plural.test.ts"
// Arabisch deckt zero, one, two, few, many, other ab.
describe.each([0, 1, 2, 3, 11, 100])("anzahl %i", (count) => {
  it("erzeugt einen nicht-leeren String auf Arabisch", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Wählen Sie Zahlenwerte, die jede CLDR-Kategorie Ihrer komplexesten Zielsprache abdecken, statt überall nur 1 und 2 zu prüfen. `Intl.PluralRules` verrät, in welche Kategorie eine Zahl fällt, sodass Sie die Stichproben ableiten können. Mehr dazu im [Beitrag zum ICU-Message-Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/icu_message_format.md).

## Die Snapshot-Falle

Snapshots und i18n harmonieren schlecht. Ein Snapshot einer lokalisierten Komponente speichert jeden enthaltenen String ab. Korrigiert ein Übersetzer einen Tippfehler im Portugiesischen, schlägt ein zuvor grüner Test fehl, in einer Datei, die kein Reviewer verständlich beurteilen kann. Nach dem dritten Vorfall führt jemand `-u` aus, ohne das Diff zu lesen, und Snapshots verlieren jeden Nutzen.

Wenn Sie Snapshots nutzen möchten, erstellen Sie diese nur in einer einzigen Locale und betrachten Sie sie als strukturelle, nicht inhaltliche Prüfung. Alles Sprachspezifische gehört in explizite Assertions.

## Die Verhandlung testen, nicht nur das Rendern

Der häufigste i18n-Fehler in Produktion ist kein fehlender String. Es ist die Auswahl der falschen Locale: Eine URL lautet `/fr/`, der Client liest `navigator.language`, und beide widersprechen sich.

Testen Sie die Auflösungsreihenfolge direkt als reine Funktion, unabhängig von Komponenten:

```ts fileName="locale-resolution.test.ts"
it("bevorzugt die URL gegenüber der gespeicherten Einstellung", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("fällt auf den Header zurück, wenn die URL kein Präfix hat", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

Dies ist der wertvollste i18n-Test, der in den meisten Projekten fehlt, und er benötigt kein DOM.

## Was wo ausgeführt werden sollte

- **Unit**: Locale-Verhandlung, Formatierer, Pluralkategorien. Schnell, ohne DOM.
- **Komponente**: Ein Provider-basiertes Rendering pro Locale mit Prüfung auf Rollen und Abwesenheit von Rohschlüsseln.
- **Abdeckung**: Ein datengetriebener Test, der sicherstellt, dass keine erforderlichen Locales fehlen.
- **Visuell oder E2E**: Pseudolokalisierungsdurchlauf und eine RTL-Seite, da diese Fehler optischer Natur sind.

Führen Sie die ersten drei in der Pipeline bei jedem Commit aus. Letzteres eignet sich hervorragend für nächtliche Builds.

## Häufige Fehler

- **Prüfung auf exakten Wortlaut überall.** Führt dazu, dass die Test-Suite innerhalb weniger Monate gelöscht wird.
- **Snapshots von lokalisierten Komponenten.** Übersetzer brechen Builds und Reviewer winken Änderungen ungesehen durch.
- **Nur die Standard-Locale testen.** Die einzige Sprache, die unmöglich fehlen kann.
- **Nur 1 und 2 für Plurale testen.** Übergeht Kategorien, die im Englischen nicht existieren.
- **Die i18n-Bibliothek wegmocken.** Dann testen Sie lediglich, dass Ihr Mock Strings zurückgibt.
- **Verhandlung nie testen.** Das häufigste Problem im Produktivbetrieb und das am einfachsten zu testende.

## Weiterführende Ressourcen

- [Inhalte testen: CLI-Audit, programmatische API und UI-Assertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md)
- [ESLint-Plugin: Erkennung harter Strings und ungenutzter Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)
- [Formatierer und Locale-Dienstprogramme, einschließlich `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md)
- [Benchmark-Berichte über Frameworks hinweg](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md)
- [Drop-in react-i18next-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-i18next.md)
- [Fehlende Übersetzungen aufspüren](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md)
- [ICU-Message-Format: Plurale, Select und Formatierungs-Skelette](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/icu_message_format.md)
