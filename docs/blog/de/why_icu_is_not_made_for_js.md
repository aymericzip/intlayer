---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Warum ICU MessageFormat nicht für JavaScript gemacht ist
description: "ICU MessageFormat wurde für Java und C++ entwickelt. Im Browser erfordert vollständige Unterstützung rund 10 KB Parser-Code. Woher diese Kosten kommen und welche Alternativen es gibt."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - icu bundle-größe
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - i18n pluralisierung
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Warum ICU MessageFormat nicht für JavaScript gemacht ist

ICU MessageFormat ist ein bewährter Standard. Er ist vollständig, Übersetzer kennen ihn und die meisten Translation-Management-Systeme (TMS) können ihn verarbeiten. Das Problem ist die Laufzeitumgebung, für die er ursprünglich konzipiert wurde. ICU stammt aus C++ und Java, wo ein vollständiger Message-Parser und Formatter im Verhältnis zum restlichen Programm kaum ins Gewicht fällt. In einem Browser-Bundle hingegen wird dieser Preis bei jedem Seitenaufruf bezahlt.

Dieser Beitrag beleuchtet, woher ICU stammt, warum seine Syntax bei Pluralen sperrig ist und warum vollständige Kompatibilität jede JavaScript-i18n-Bibliothek aufbläht. Wenn Sie die Syntax selbst nachschlagen möchten, lesen Sie zuerst die [ICU Message Format Referenz](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/icu_message_format.md).

- [ICU Message Format Referenz](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/icu_message_format.md)

<TOC/>

## Von IBM zum Unicode-Konsortium

ICU steht für _International Components for Unicode_. Die Message-Syntax begann in Java: Taligent, ein Joint Venture von Apple und IBM, entwickelte die Internationalisierungsklassen für JDK 1.1 (1997), einschließlich `java.text.MessageFormat`. IBM entwickelte sie als ICU4J weiter, portierte sie als ICU4C nach C/C++ und stellte das Projekt 1999 als Open Source bereit. 2016 ging ICU an das Unicode-Konsortium über, das auch CLDR verwaltet, die Lokaldatenbasis, auf der ICU aufbaut.

### Wofür es ursprünglich eingesetzt wurde

Die Zielgruppe waren Server- und Desktop-Anwendungen: Java-Unternehmenssoftware, IBM-Produkte und später Betriebssysteme. Nachrichten wurden in Java `.properties`-Dateien hinterlegt und über `ResourceBundle` geladen, oder in ICUs eigenem Resource-Bundle-Format für C/C++ bereitgestellt:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

Die ursprüngliche JDK-Version bot kein `plural`. Sie verwendete `choice` mit numerischen Wertebereichen (`{0,choice,0#no files|1#one file|1<{0} files}`), was nur zu Sprachen passte, deren Pluralregeln dem Englischen ähneln. ICU ergänzte `plural` auf Basis von CLDR-Regeln im Jahr 2008 (ICU 4.0) und führte `select` 2010 (ICU 4.4) ein.

### Nicht zu verwechseln mit `.po`

ICU wird häufig mit gettext verwechselt, beide entstammen jedoch unterschiedlichen Traditionen. `.po`-Dateien stammen aus GNU gettext (C, Linux, später PHP und Python). Ein `.po`-Eintrag enthält einfache `msgid` / `msgstr`-Paare, und Plurale werden über einen C-Ausdruck im Dateiheader ermittelt (`Plural-Forms: nplurals=2; plural=(n > 1);`). Es gibt keine Verzweigungen innerhalb der Nachricht. ICU bettet Verzweigungen direkt in die Zeichenkette ein, sodass eine einzige Nachricht `plural`, `select` und Zahlenformatierung flexibel kombinieren kann.

### Wo ICU heute läuft

ICU4C ist in Android, iOS, macOS, Windows, Node.js und den JavaScript-Engines von Chrome und Firefox integriert. Die `Intl`-APIs moderner Browser basieren weitgehend darauf. Der Browser kennt die Pluralregeln, Datums- und Zahlenformatierungen von ICU also bereits ab Werk. Was ihm fehlt, ist der Message-Parser: `Intl.MessageFormat` befindet sich als TC39-Proposal noch in einem frühen Stadium, basiert auf der neueren MessageFormat 2-Syntax und ist nicht abwärtskompatibel mit ICU MessageFormat 1.

Diese Entwicklungsgeschichte erklärt das Design:

- **Fokus auf Server- und Desktop-Runtimes.** Das Parsen eines Message-Strings zur Laufzeit ist dort performant, und die Bibliothek ist global im Betriebssystem installiert, anstatt von jedem Besucher heruntergeladen zu werden.
- **Eine DSL innerhalb eines Strings.** Verzweigungen, Formatierungen für Zahlen und Datumsangaben sowie Verschachtelungen teilen sich eine Syntax, die Übersetzer ohne Programmierkenntnisse bearbeiten können.
- **Kompromisslose Vollständigkeit.** Jeder erdenkliche grammatikalische Fall wird durch eigene Operatoren abgedeckt.

Keine dieser Entscheidungen war falsch. Sie gingen lediglich von einer Laufzeitumgebung aus, die der Browser nicht bietet.

## Plurale sind unnötig sperrig

Das am weitesten verbreitete ICU-Konstrukt ist zugleich das unübersichtlichste. Eine Zählung mit Null-Fall sieht folgendermaßen aus:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

Das erfordert den Argumentnamen, das Schlüsselwort `plural`, ein Fall-Label pro Zweig, geschachtelte geschweifte Klammern und `#` als Sonderzeichen, das nur innerhalb von Pluralzweigen gültig ist. Kommt ein grammatikalisches Geschlecht hinzu, verschachtelt sich die Nachricht weiter:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Neun von fünfzehn Zeilen bestehen rein aus Syntaxstruktur. Da das Polnische für jede dieser drei Geschlechtsvarianten vier Pluralzweige verlangt, gerät der übersetzte Text zu einer unübersichtlichen Klammeransammlung, bei der eine einzige fehlende `}`-Klammer die gesamte Nachricht unbrauchbar macht, oft erst unbemerkt zur Laufzeit.

In JavaScript lässt sich dieselbe Struktur als reine Datenstruktur abbilden: ein Objekt, dessen Schlüssel den Pluralkategorien entsprechen, typsicher geprüft durch TypeScript und den Editor, ohne dass ein Parser zwischen Datei und Wert geschaltet werden muss.

## Vollständigkeit treibt die Kosten

ICU deckt enorm viele Spezialfälle ab:

- `plural` mit exakten Übereinstimmungen (`=0`) und `offset:`
- `selectordinal` mit eigener CLDR-Ordinaltabelle
- `select` mit beliebiger Verschachtelungstiefe
- Argumente für `number`, `date` und `time`, sowohl im klassischen Format (`number, currency`) als auch als Skeletons (`::currency/EUR compact-short`)
- Maskierungs- und Anführungszeichenregeln (`'{'`, `''`)
- Rich-Text-Tags in einigen Implementierungen (`<b>…</b>`)

Eine Bibliothek, die 1:1 ICU-Kompatibilität verspricht, muss all das ausliefern, weil sie zur Build-Zeit nicht vorhersehen kann, welche Syntaxfeatures Ihre Texte nutzen. Konkret bedeutet das:

1. **Einen Parser**, der die Zeichenkette in einen AST überführt und Syntaxfehler auflöst.
2. **Einen Skeleton-Parser** für die `::`-Syntax von Zahlen und Daten, der eine eigene kleine Grammatik darstellt.
3. **Einen Formatter**, der den AST durchläuft und jeden Knoten auf `Intl.PluralRules`, `Intl.NumberFormat` und `Intl.DateTimeFormat` abbildet.

Der dritte Teil ist kompakt, da modernes JavaScript die CLDR-Logik über `Intl` ohnehin mitbringt. Die ersten beiden Komponenten existieren einzig, um eine textuelle Syntax einzulesen. In `intl-messageformat` von FormatJS, der Referenzimplementierung für `react-intl` und `next-intl`, entspricht das rund **10 KB komprimiertem JavaScript**, das an jeden Benutzer übertragen wird, noch bevor der erste eigene Text geladen ist.

Die meisten Webanwendungen nutzen nur einen Bruchteil: `{name}`-Interpolation und einige wenige `plural`-Blöcke. Dennoch laden sie den kompletten Parser für Skeletons, Ordinalzahlen und Offsets herunter, da ein zur Laufzeit geparster String dem Bundler keine statische Analyse erlaubt.

## next-intl stieß auf dasselbe Problem

Diese Problematik ist keineswegs rein theoretischer Natur. `next-intl`, eine der populärsten ICU-basierten Bibliotheken, zog dieselbe Konsequenz. In Version 4.8 (Januar 2026) führte das Projekt eine experimentelle `precompile`-Option ein. Diese parst ICU-Nachrichten bereits während des Builds in einen kompakten AST und ersetzt den Laufzeit-Parser durch einen schlanken Evaluator. Laut Projektangaben lassen sich dadurch **rund 9 KB komprimiertes JavaScript einsparen**.

Dieser Kompromiss zeigt jedoch die Grenzen des Ansatzes: `t.raw` funktioniert mit Vorkompilierung nicht mehr, da der rohe ICU-String zur Laufzeit nicht mehr existiert. Sobald der Browser den Text nicht mehr selbst parst, liefern Sie im Grunde kein ICU mehr aus. Sie liefern ein kompiliertes Format, während die String-Syntax lediglich als Quellformat dient.

An diesem Punkt stellt sich die berechtigte Frage: Wenn der Browser die Zeichenkette gar nicht parst, warum sollten Entwickler und Übersetzer sie dann noch in dieser fehleranfälligen Syntax verfassen?

## Wie ein JavaScript-nativer Ansatz aussieht

JavaScript bringt die anspruchsvollen Komponenten bereits mit. `Intl.PluralRules` weiß, dass das Polnische vier Kardinalkategorien und das Englische vier Ordinalkategorien besitzt. `Intl.NumberFormat` und `Intl.DateTimeFormat` beherrschen Währungen, Einheiten, kompakte Notationen und Kalender. Was bleibt, ist das Auswählen eines Zweigs und das Einsetzen von Werten, was auf Basis strukturierter Daten nur wenige Zeilen Code beansprucht.

Genau dieses Modell verfolgt Intlayer. Verzweigungen sind Funktionen in einer typsicheren Inhaltsdeklaration, und jede Sprache deklariert präzise die grammatikalischen Kategorien, die sie benötigt:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      de: plural({
        one: "{{count}} ungelesene Nachricht",
        other: "{{count}} ungelesene Nachrichten",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Polnische Locale → "5 nieprzeczytanych wiadomości"
```

Die Vorteile gegenüber ICU auf einen Blick:

- **Kein Parser im Bundle.** Die Struktur liegt bereits als fertiges Objekt vor, wenn sie den Browser erreicht. `plural` ermittelt den passenden Schlüssel über das ohnehin vorhandene `Intl.PluralRules`.
- **Fehler werden beim Build erkannt.** Fehlende Zweige oder Tippfehler bei Schlüsseln lösen TypeScript-Fehler aus und fallen nicht erst im Produktivbetrieb auf.
- **Formatierung bleibt außerhalb der Nachricht.** Zahlen, Datumsangaben und Währungen werden über [Formatter-Hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) formatiert, die `Intl` direkt ansteuern, ganz ohne Skeleton-Parser.
- **Ungenutzte Features kosten keinen Speicherplatz.** Verwendet kein Text `gender`, entfernt der Bundler die Funktion vollständig via Tree-Shaking.

- [Formatter-Hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md)

Es gibt auch nachvollziehbare Nachteile: Ein Build-Schritt ist zwingend erforderlich, Inhaltsdateien sind Code statt einfacher Textdateien, und einige TMS-Werkzeuge erwarten klassische ICU-Strings und können TypeScript-Deklarationen nicht ohne Weiteres verarbeiten.

## Wann ICU weiterhin die richtige Wahl ist

ICU bleibt das bevorzugte Format, wenn:

- **Ihre Übersetzungs-Pipeline fest darauf aufgebaut ist.** Zahlreiche TMS-Tools importieren und exportieren ICU-Strings, und Übersetzer sind im Umgang mit der Syntax geschult.
- **Nachrichten plattformübergreifend geteilt werden.** Wenn derselbe Übersetzungskatalog eine iOS-App, eine Android-App und eine Webanwendung versorgt, spricht viel für einen gemeinsamen Standard.
- **Bereits ein umfangreicher Bestand an ICU-Texten existiert.** Das Umschreiben tausender Textbausteine rechtfertigt den Aufwand allein selten.

Im letzten Fall müssen Sie sich nicht zwischen einer kompletten Neuentwicklung und einem schweren Parser entscheiden. Intlayers [react-intl Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-intl.md) liest bestehende ICU-Nachrichten (`plural`, `select`, `selectordinal`, `#`, klassische Formate `number` / `date` / `time`), sodass Sie schrittweise migrieren können und ICU-Kosten nur dort anfallen, wo alte Bestandsnachrichten sie noch erfordern.

- [react-intl Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-intl.md)

## Fazit

ICU MessageFormat hat ein reales Problem gelöst: Grammatik gehört in die Hände von Übersetzern und nicht in `if (count === 1)`-Verzweigungen im Anwendungscode. Gelöst wurde dies für Umgebungen, in denen ein String-Parser keine Rolle spielt. Im Webbrowser bedeutet vollständige Kompatibilität jedoch, dass Parser-Code für Funktionen mitgeschleppt wird, die die meisten Anwendungen nie benötigen. Selbst ICU-basierte Bibliotheken gehen deshalb dazu über, Nachrichten vorab zu kompilieren.

JavaScript bringt mit `Intl` alle nötigen CLDR-Regeln bereits mit. Was ein modernes i18n-Format benötigt, ist die strukturierte Verzweigungslogik, und diese lässt sich ideal als typsichere Datenstruktur abbilden.

## Weiterführende Links

- [ICU Message Format: Syntax, Plurale und Select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/icu_message_format.md)
- [Plural-Inhalte in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md)
- [Select-basierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/select.md)
- [i18n-Bibliotheken im Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md)
- [Ist next-intl veraltet?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_next-intl_outdated.md)
