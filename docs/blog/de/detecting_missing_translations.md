---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Fehlende Übersetzungen aufspüren, bevor es Ihre Nutzer tun"
description: Fehlende Übersetzungen schlagen geräuschlos fehl. Warum Fallbacks sie verschleiern, welche vier Erkennungsebenen wirklich funktionieren und wie man Builds bei unübersetzten Schlüsseln abbricht.
keywords:
  - fehlende übersetzungen finden
  - fehlende übersetzungsschlüssel
  - i18n audit
  - unübersetzte zeichenketten
  - übersetzungsabdeckung
  - i18n lint
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Fehlende Übersetzungen aufspüren, bevor es Ihre Nutzer tun

Eine fehlende Übersetzung wirft so gut wie nie einen sichtbaren Fehler. Je nach Setup zeigt sie einem japanischen Nutzer den englischen Text oder gibt `checkout.summary.total` direkt auf der Benutzeroberfläche in Produktion aus. Beides wird deployt, beides besteht jedes Code-Review und beides wird am Ende von Kunden bemerkt statt von Ihnen.

## Inhaltsverzeichnis

<TOC/>

## Dies gilt unabhängig von der verwendeten Bibliothek

Nichts hier ist an einen bestimmten Stack gebunden. Die folgenden Erkennungsebenen funktionieren bei i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate oder Lingui identisch, weil alle Bibliotheken Schlüssel nach demselben Prinzip auflösen und auf dieselbe Weise versagen.

Auch die Werkzeuge lassen sich nahtlos übertragen: Liegen Ihre Nachrichten heute in JSON-Katalogen, verknüpft das [Sync JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) Intlayer mit diesen Dateien. Dadurch erhalten Sie Audit-, Fill- und Test-Befehle, ohne Inhalte zu verschieben oder Imports anzupassen:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // oder "icu" für next-intl / react-intl
    }),
  ],
};

export default config;
```

Möchten Sie auch die gewohnte Runtime-API beibehalten, erstellen [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) Aliasse für `useTranslation`, `$t` und Co. auf Bundler-Ebene. Betrachten Sie die folgenden Befehle als konkrete Umsetzung des Konzepts, nicht als starre Vorgabe.

## Warum fehlende Übersetzungen unsichtbar bleiben

Jede i18n-Bibliothek löst Schlüssel über dieselbe Kette auf: Aktive Locale suchen, auf die Standard-Locale zurückfallen und bei erneutem Misserfolg den Schlüssel selbst als String zurückgeben. Genau dieser letzte Schritt ist das Problem. Es gibt keinen Laufzeitfehler, keine Warnung in Produktion und keinen fehlschlagenden Test, weil kein Glied der Kette einen fehlenden Schlüssel als unnormal einstuft.

Das Fallback-Verhalten verschlimmert die Lage: Eine Seite, die stillschweigend auf Englisch rendert, sieht für einen englischsprachigen Entwickler und für automatisierte Tests völlig in Ordnung aus. Der Fehler ist nur für denjenigen sichtbar, der die Sprache nicht versteht.

Die Frage lautet daher nicht: „Wie fange ich fehlende Übersetzungen zur Laufzeit ab?“, sondern: „Wie stelle ich sicher, dass fehlende Übersetzungen gar nicht erst gemergt werden können?“

## Die vier Ebenen zur Erkennung

Jede Ebene deckt Dinge auf, die den anderen entgehen. Sie sollten mehr als eine davon einsetzen.

| Ebene           | Erkennt                                            | Übersieht                                      |
| :-------------- | :------------------------------------------------- | :--------------------------------------------- |
| Typen           | Schlüssel, die überhaupt nicht existieren          | Schlüssel existiert, ist aber in `ja` leer     |
| Linter          | Fest codierte Texte, die nie externalisiert wurden | Schlüssel, die in einem Katalog fehlen         |
| Audit           | Locale-Abdeckung über alle deklarierten Schlüssel  | Texte, die nie als übersetzbar markiert wurden |
| Rendering-Tests | Schlüssel, die auflösen, aber falsch rendern       | Alles, was nicht von einem Test abgedeckt ist  |

Die häufigste Schwachstelle liegt in der dritten Zeile: Teams wissen, dass ihre Schlüssel syntaktisch existieren, prüfen aber nie, ob tatsächlich alle achtzehn Sprachen mit Inhalten hinterlegt sind.

## Ebene 1: Den Schlüssel zu einem Typen machen, nicht zu einem String

`t("checkout.summry.total")` ist ein Tippfehler, der problemlos kompiliert. Sind Schlüssel reine Strings, birgt jedes Umbenennen ein Produktionsrisiko und jedes Löschen hinterlässt Leichen im Code.

Typisierte Schlüssel machen daraus einen Compiler-Fehler. `react-i18next` unterstützt dies über Declaration Merging, `next-intl` leitet Typen aus Nachrichtenstrukturen ab, Lingui generiert IDs aus Quelltexten und Intlayer erzeugt Typen direkt aus den Deklarationsdateien. Alle Ansätze funktionieren; sie unterscheiden sich lediglich im Aufwand der Konfiguration.

Diese Ebene ist notwendig, aber nicht ausreichend. Typen beschreiben lediglich die Struktur des Standardkatalogs. Sie garantieren nicht, dass im Koreanischen ein Wert hinterlegt ist.

## Ebene 2: Fest codierte Zeichenketten per Linter abfangen

Die Übersetzung, die man nicht findet, ist oft jene, die nie als Schlüssel angelegt wurde. Ein fest codiertes Label in einer Komponente ist für jeden Katalog-Audit unsichtbar, weil der String für die Tools schlicht nicht existiert.

Das ESLint-Plugin von Intlayer deckt dies mit `no-raw-text` ab, ergänzt durch `no-unused-content` für den umgekehrten Fall: deklarierte Inhalte, die nirgendwo mehr referenziert werden.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` verhindert, dass Kataloge ins Unendliche wachsen. Tote Schlüssel stören die Funktion nicht, treiben jedoch Übersetzungskosten unnötig in die Höhe. Die vollständige Regelliste finden Sie in der [ESLint-Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md).

## Ebene 3: Auditierung der Locale-Abdeckung

Diese Ebene beantwortet die eigentliche Kernfrage. Intlayer stellt dafür einen CLI-Befehl bereit:

```bash packageManager="npm"
npx intlayer content test
```

Der Befehl liest die konfigurierten Sprachen sowie deklarierte Wörterbücher ein und meldet präzise, welchen Schlüsseln welche Sprachen in welcher Datei fehlen.

Ein wichtiges Detail für Ihre Pipelines: **Die CLI gibt einen Bericht aus, beendet sich aber stets mit dem Exit-Code 0.** Wer den Befehl unbedarft in die CI einbindet, erhält grüne Builds mit Textausgaben, die niemand liest. Für Schrankenfunktionen (Gates) nutzen Sie stattdessen die nachfolgend beschriebene programmatische API.

## Ebene 4: Zusicherungen (Assertions) in der Test-Suite

`listMissingTranslations()` liefert dasselbe Audit als strukturiertes Datenobjekt, perfekt geeignet für eine CI-Schranke.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("hat keine fehlenden erforderlichen Locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Drei Felder werden zurückgegeben:

- `missingTranslations`: Aufgeschlüsselt nach Schlüssel, welche Sprachen in welcher Datei fehlen. Dies gibt man bei Testfehlern aus.
- `missingLocales`: Die Gesamtmenge aller fehlenden Sprachen über alle Schlüssel hinweg.
- `missingRequiredLocales`: Beschränkt auf die in der Konfiguration definierten `requiredLocales`, oder alle Sprachen, falls nicht separat konfiguriert.

## `requiredLocales` macht Prüfungen praxistauglich

Achtzehn Sprachen anzubieten bedeutet nicht, dass stets alle achtzehn komplett sein müssen, um deployen zu können. Die meisten Teams unterscheiden zwischen einer unverzichtbaren Stufe, die Releases blockiert, und Sprachen, die nachgeliefert werden.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Ohne `requiredLocales` gilt jede definierte Sprache als verpflichtend, und der Build bleibt rot, bis die letzte Übersetzung vorliegt. Das führt fast immer dazu, dass die Prüfung entnervt abgeschaltet wird.

## Lücken aufspüren, die bereits in Produktion sind

Die obigen Ebenen verhindern neue Lücken. Für bereits ausgelieferte Anwendungen helfen zwei Ansätze:

**Pseudolokalisierung.** Nutzen Sie eine Test-Locale, in der alle Zeichenketten transformiert werden, z. B. `[!!! Ĉĥéçķöũţ !!!]`. Alles, was weiterhin in reinem Englisch erscheint, ist im Code fest verdrahtet. Dies deckt in zehn Minuten auf, was ein Katalog-Audit technisch unmöglich sehen kann.

**Die eigene Website crawlen.** Bei lokalisierten URLs ruft man Stichproben pro Sprache ab und durchsucht das HTML nach Texten der Standardsprache. Eine Seite unter `/ja/`, die „Add to cart“ enthält, weist entweder auf eine fehlende Übersetzung oder ein unbemerktes Fallback hin.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Lücken schließen

Sind Lücken lokalisiert, füllt `intlayer fill` leere Einträge automatisch auf, während die Option `autoFill` sprachspezifische Dateien direkt bei der Deklaration von Inhalten generieren kann. Siehe [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md).

Man sollte sich darüber im Klaren sein: Maschinell gefüllte Übersetzungen machen eine _sichtbare_ Lücke zu einer _unsichtbaren_. Der Schlüssel besitzt nun Inhalt, der Audit wird grün, gelesen hat den Text jedoch niemand. Nutzen Sie dies, um Releases zu entblocken, und lassen Sie Texte vor Kaufentscheidungen stets durch Menschen gegenlesen.

## Häufige Fehler

- **Fallbacks als Sicherheitsfeature begreifen.** Es ist eine Notfallstrategie, kein Sicherheitsnetz. Eine stillschweigend englische Seite ist ein unbemerkter Fehler.
- **CLI-Berichte zur Build-Sicherung nutzen.** `intlayer content test` beendet sich mit 0. Nutzen Sie Test-Assertions.
- **Jede Sprache zwingend vorschreiben.** Die Prüfung fliegt raus, sobald sie den ersten Release aufhält.
- **Kataloge prüfen, aber nie die gerenderte Seite.** Fest codierte Strings sind im Katalog per Definition unsichtbar.
- **Nur die Standardsprache in Tests abdecken.** Das ist die einzige Sprache, die unmöglich fehlen kann.
- **Den Prozess mit maschinellem Befüllen abschließen.** Grüner Audit, unüberprüfte Texte.

## Weiterführende Ressourcen

- [Inhalte testen: CLI-Audit, programmatische API und UI-Assertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md)
- [ESLint-Plugin-Regeln, einschließlich `no-raw-text` und `no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)
- [autoFill: Generierung sprachspezifischer Deklarationsdateien](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md)
- [Konfigurationsreferenz: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Benchmark-Berichte über Frameworks hinweg](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md)
- [i18next-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next.md)
- [Was Internationalisierung wirklich umfasst](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/what_is_internationalization.md)
- [Komponentenbasierte vs. zentralisierte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/per-component_vs_centralized_i18n.md)
