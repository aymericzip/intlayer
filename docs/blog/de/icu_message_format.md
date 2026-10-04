---
createdAt: 2026-09-02
updatedAt: 2026-10-03
priority: 8
title: "ICU Message Format: Syntax, Plurale und Select"
description: Eine praktische Referenz zu ICU MessageFormat, Argument-Interpolation, Plural- und Select-Verzweigungen, CLDR-Pluralkategorien pro Sprache und typische Fehler.
keywords:
  - icu message format
  - icu messageformat
  - cldr plural regeln
  - plural kategorien
  - selectordinal
  - i18n pluralisierung
  - nachrichten syntax
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# ICU Message Format: Syntax und typische Stolpersteine

ICU MessageFormat ist eine String-Syntax, mit der eine Übersetzung ihre eigene Verzweigungslogik enthalten kann: Plurale, geschlechtsspezifische Formen sowie Zahlen- und Datumsformatierungen. Der Grundgedanke ist, dass Grammatik in die Hände des Übersetzers gehört und nicht in den Code eines Entwicklers, der `if (count === 1)` schreibt. Dieser Artikel behandelt die Syntax, die sprachabhängigen Besonderheiten, an denen naive Implementierungen scheitern, und wie das JS-Ökosystem damit umgeht.

## Inhaltsverzeichnis

<TOC/>

## Das Problem, ganz konkret

Hier ist der Code, den fast jeder Entwickler zuerst schreibt:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Das funktioniert im Englischen, scheitert jedoch in den meisten anderen Sprachen:

- **Russisch und Polnisch** benötigen drei oder vier Formen, nicht nur zwei.
- **Japanisch** benötigt nur eine, und das angehängte Leerzeichen ist fehl am Platz.
- **Arabisch** benötigt sechs Formen, und die Zahl selbst sollte im Zahlensystem des jeweiligen Locales dargestellt werden.
- **Französisch** verlangt vor bestimmten Satzzeichen ein geschütztes Leerzeichen, das durch `+ " "` zerstört wird.

Das grundlegende Problem besteht darin, dass der Satz in Fragmente zerlegt wurde. Ein Übersetzer sieht `item` und `items` ohne Kontext und kann die Satzstellung nicht anpassen. ICU MessageFormat löst dies, indem der gesamte Satz als zusammenhängender String erhalten bleibt und dem Übersetzer Verzweigungsoperatoren bereitgestellt werden.

## Einfache Argumente

Die kleinste Einheit ist ein Platzhalter in einfachen geschweiften Klammern:

```text
Hello, {name}!
```

Wird beim Formatieren `{ name: "Alice" }` übergeben, erhält man `Hello, Alice!`. Geschweifte Klammern sind die einzigen Sonderzeichen. Um eine wörtliche geschweifte Klammer auszugeben, wird sie in einfache Anführungszeichen gesetzt: `'{'`.

Das ist bereits das gesamte Konzept der "Interpolation". Alles andere in ICU baut darauf auf.

## Plural

`plural` wählt einen Zweig basierend auf einem numerischen Wert aus:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Drei wichtige Punkte:

- **`#`** wird durch den formatierten Wert von `count` ersetzt, passend zum Locale formatiert. So wird `1234` in `en-US` zu `1,234` und in `de-DE` zu `1.234`.
- **`other` ist zwingend erforderlich.** Jede ICU-Implementierung wirft einen Fehler oder schlägt bei der Validierung fehl, wenn `other` fehlt. Es dient als Fallback, wenn keine Kategorie zutrifft.
- **`=0`, `=1`, … treffen auf exakte Werte zu** und werden _vor_ den CLDR-Kategorien geprüft. Nutzen Sie diese für spezifische Texte ("Keine Nachrichten"), nicht als Ersatz für `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` zieht `n` vom Wert ab, bevor sowohl die Kategorieauswahl als auch die Ersetzung von `#` erfolgt. Dies dient Mustern wie "Alice und 3 anderen Personen gefällt das":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

Bei `count: 4` rendert `#` den Wert `3`. `offset` ist nützlich, wird aber je nach Laufzeitumgebung unterschiedlich gut unterstützt. Prüfen Sie dies vorab in Ihrer Umgebung.

## Pluralkategorien sind sprachabhängig

Hier passieren die meisten Fehler. Die Kategorienamen `zero`, `one`, `two`, `few`, `many`, `other` sind keine universellen Platzhalter für jede Sprache. Jedes Locale verwendet eine _Teilmenge_, die durch die [CLDR-Pluralregeln](https://cldr.unicode.org/index/cldr-spec/plural-rules) definiert ist, und diese Regeln folgen grammatikalischen Prinzipien, nicht rein numerischer Intuition.

| Sprache     | Tag  | Verwendete Kategorien            | Anzahl |
| ----------- | ---- | -------------------------------- | ------ |
| Japanisch   | `ja` | other                            | 1      |
| Chinesisch  | `zh` | other                            | 1      |
| Englisch    | `en` | one, other                       | 2      |
| Deutsch     | `de` | one, other                       | 2      |
| Französisch | `fr` | one, many, other                 | 3      |
| Tschechisch | `cs` | one, few, many, other            | 4      |
| Polnisch    | `pl` | one, few, many, other            | 4      |
| Russisch    | `ru` | one, few, many, other            | 4      |
| Arabisch    | `ar` | zero, one, two, few, many, other | 6      |
| Walisisch   | `cy` | zero, one, two, few, many, other | 6      |

Zwei oft überraschende Konsequenzen:

- **`one` bedeutet nicht zwangsläufig "1".** Im Russischen deckt `one` Zahlen wie 1, 21, 31, 101 ab: jede Zahl, die auf 1 endet, außer jene auf 11. Im Französischen fällt `0` unter `one`.
- **Das Hinzufügen einer Kategorie zur englischen Quelle bewirkt nichts.** Die englische Vorlage benötigt lediglich `one` und `other`. Die polnische Übersetzung verlangt vier Zweige, und diese Struktur gehört in den polnischen String, nicht in den englischen. Jedes Format, das alle Locales in dieselbe Schlüsselstruktur zwingt, führt hier zu Konflikten.

Das tatsächliche Verhalten einer Laufzeitumgebung lässt sich direkt testen:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

`Intl.PluralRules` stellt CLDR-Daten in allen modernen Browsern und in Node bereit. Bibliotheken mit CLDR-Unterstützung rufen intern fast immer diese API auf.

## select und selectordinal

`select` verzweigt basierend auf einem beliebigen String: einem Geschlecht, einer Rolle, einem Status oder einem Tarifmodell.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Schlüssel werden exakt verglichen, und `other` ist auch hier obligatorisch. `select` ist das richtige Werkzeug, sobald der Satzbau von einem Enum-Wert abhängt, da Sprachen sich darin unterscheiden, welche Enums grammatikalische Auswirkungen haben.

`selectordinal` funktioniert analog zu `plural`, nutzt jedoch die **ordinalen** Pluralregeln, die sich von den kardinalen unterscheiden:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

Das Englische nutzt vier ordinale Kategorien (1st, 2nd, 3rd, 4th), obwohl es nur zwei kardinale kennt. Genau wegen dieser Asymmetrie sind beide Operatoren getrennt.

## Zahlen-, Datums- und Zeitargumente

ICU kann interpolierte Werte direkt formatieren:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

Der moderne Standard ist das **Skeleton**, eingeführt mit ICU 60 und gekennzeichnet durch das Präfix `::`. Skeletons sind wesentlich ausdrucksstärker als herkömmliche Bezeichner:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

Die Unterstützung von Skeletons variiert im Ökosystem. FormatJS unterstützt sie vollständig, während andere Runtimes nur die herkömmlichen Formate wie `number, currency` oder `date, long` akzeptieren. Prüfen Sie die Unterstützung von `::` in Ihrer Zielumgebung.

## Schachtelung und Lesbarkeit

ICU ist modular aufgebaut. Ein Plural-Zweig kann ein Select enthalten, das wiederum ein weiteres Plural enthalten kann:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Dies ist das klassische ICU-Beispiel und zugleich das beste Argument gegen übermäßige Schachtelung. Ab zwei Ebenen schleichen sich bei Übersetzern leicht Klammerfehler ein, und TMS-Editoren stoßen an ihre Grenzen. Schachteln Sie maximal zwei Ebenen. Wird eine dritte nötig, teilen Sie den Satz besser in zwei Meldungen auf.

## Wie JS-Bibliotheken mit ICU umgehen

| Bibliothek            | ICU-Unterstützung     | Was tatsächlich geschrieben wird                                               |
| --------------------- | --------------------- | ------------------------------------------------------------------------------ |
| react-intl (FormatJS) | Nativ, vollständig    | ICU-Strings, inklusive Skeletons und Rich-Text-Tags                            |
| next-intl             | Nativ                 | ICU-Strings über `intl-messageformat` von FormatJS                             |
| i18next               | Plugin erforderlich   | Suffix-Schlüssel `key_one` / `key_other` und `{{name}}`; ICU via `i18next-icu` |
| vue-i18n              | Partiell / proprietär | `{name}`-Interpolation und durch Pipes getrennte Pluralzweige                  |
| Angular (`$localize`) | Teilmenge             | ICU `plural` / `select` in Templates, exportiert nach XLIFF                    |

Einige Klarstellungen zur Tabelle:

- **Die Standard-Syntax von i18next ist kein ICU**, was kein Nachteil sein muss. Suffix-Schlüssel (`item_one`, `item_few`) bilden `Intl.PluralRules`-Kategorien ab und lassen sich in flachem JSON oft leichter bearbeiten. `select` und verschachtelte Logik fehlen jedoch, sodass man entweder `i18next-icu` benötigt oder die Logik im Code abbildet.
- **Die Pipe-Plurale von vue-i18n** verwenden standardmäßig eine regellose Zuordnung pro Locale anstelle echter CLDR-Kategorien. Das funktioniert, legt die Pluralregel jedoch in die App-Konfiguration statt in die Daten.
- **FormatJS ist die Referenz** im JavaScript-Bereich. Spricht man von "ICU MessageFormat" in JS, ist meist die FormatJS-Spezifikation gemeint.
- **Volle ICU-Unterstützung verursacht Bundle-Kosten.** Der Parser und das Skeleton-Handling fügen rund 10 KB komprimiertes JavaScript hinzu. Siehe [warum ICU nicht für JavaScript gemacht ist](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/why_icu_is_not_made_for_js.md).

## Wie Intlayer das Problem löst

Intlayer verzichtet auf eine String-DSL. Verzweigungsoperatoren sind typisierte Funktionen in Inhaltsdeklarationsdateien, sodass jedes Locale nur die Kategorien definiert, die seine Grammatik erfordert:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      de: plural({
        one: "{{count}} Stelle",
        other: "{{count}} Stellen",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Polnisches Locale → "5 ofert"
```

Die Zuordnung zu ICU-Konzepten ist direkt:

| ICU-Konstrukt                    | Intlayer                                               |
| -------------------------------- | ------------------------------------------------------ |
| `{name}`                         | `insert("Hello {{name}}")` oder automatische Erkennung |
| `{count, plural, …}`             | `plural({ one, few, many, other })`                    |
| `{value, select, …}`             | `select({ draft, published, fallback })`               |
| Geschlechterzweig in `select`    | `gender({ male, female, fallback })`                   |
| Boolescher Zweig in `select`     | `cond({ true, false })`                                |
| Numerische Bereiche (Nicht-CLDR) | `enu({ "0": …, ">5": …, fallback: … })`                |
| `{n, number, ::currency/EUR}`    | `useCurrency()(1234.5, { currency: "EUR" })`           |

`plural` delegiert die Kategorieauswahl an `Intl.PluralRules`, wodurch die oben genannte CLDR-Tabelle unverändert greift. Formatierungen bleiben getrennt: Zahlen, Daten, Währungen und Listen werden über [Formatierungs-Hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) verarbeitet, anstatt in der Nachricht fest verdrahtet zu sein.

- [Formatierungs-Hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md)

Einschränkungen im Überblick:

- Intlayer benötigt einen Build-Schritt: Der Compiler extrahiert Deklarationen zur Build-Zeit. Wer reines JSON zur Laufzeit laden möchte, nutzt ein anderes Modell.
- `plural` kann derzeit kein verschachteltes `t()` in seinen Zweigen enthalten: Man schachtelt `plural` innerhalb von `t()`, nicht umgekehrt.
- Das Ökosystem ist jünger als das von i18next, mit weniger fertigen TMS-Integrationen und StackOverflow-Antworten.

Wer aus einer Codebasis mit vorhandenen ICU-Strings migriert, kann den [react-intl-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-intl.md) nutzen. Dieser verarbeitet `plural`, `select`, `selectordinal`, `#` sowie die klassischen Argumente `number`, `date` und `time`. Skeletons und `offset:` werden von diesem Resolver nicht abgedeckt. Der [i18next-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next.md) löst die Suffix-Form (`key_one`, `key_male`) wiederum über `Intl.PluralRules` auf.

- [react-intl-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-intl.md)
- [i18next-Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next.md)

## Typische Fehler

- **Plurallogik in JS fest codieren.** `count === 1 ? a : b` erzeugt bei 8 von 10 Sprachen in der obigen Tabelle fehlerhafte Ausgaben. Ist der ternäre Operator erst einmal im Code, kann kein Übersetzer mehr eingreifen.
- **Übersetzte Fragmente aneinanderhängen.** Wortstellung, Beugung und Satzzeichenabstände sind vom Locale abhängig. Belassen Sie Sätze stets im Ganzen.
- **`other` weglassen.** Dies ist eine Vorgabe der Spezifikation, keine optionale Konvention. Die meisten Parser verwerfen die Nachricht; andere rendern schlicht gar nichts.
- **Annehmen, dass Kategorien allgemeingültig sind.** Dass eine englische Quelle `one` und `other` nutzt, bedeutet nicht, dass die polnische Datei nur zwei Zweige hat. Jedes Locale muss seine eigenen Zweige deklarieren dürfen. Siehe [Inhaltsdeklaration pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md).
- **`=1` statt `one` verwenden.** `=1` trifft ausschließlich auf den exakten Wert 1 zu. Im Russischen benötigt 21 die Kategorie `one`, für die `=1` niemals greifen würde.
- **`#` außerhalb eines Pluralzweigs platzieren.** Es hat nur innerhalb von `plural` oder `selectordinal` eine Sonderbedeutung. Überall sonst bleibt es ein simples Rautezeichen.
- **Vergessen, dass `#` bereits formatiert ist.** Wenn die unformatierte Zahl benötigt wird, sollte das Argument namentlich interpoliert werden.

## Weiterführende Links

- [Warum ICU nicht für JavaScript gemacht ist](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/why_icu_is_not_made_for_js.md)
- [Pluralinhalte in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md)
- [Select-basierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/select.md)
- [Einfüge-Platzhalter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md)
- [Benchmark von i18n-Bibliotheken](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/react-i18next_vs_react-intl_vs_intlayer.md)
- [Was ist Internationalisierung?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/what_is_internationalization.md)
