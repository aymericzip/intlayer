---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Plural
description: Erfahren Sie, wie Sie sprachabhängige Pluralinhalte (CLDR-basiert) in Ihrer mehrsprachigen Website deklarieren und verwenden. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - Plural
  - Pluralisierung
  - CLDR
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# Pluralinhalt / Plural in Intlayer

## Wie Plural funktioniert

In Intlayer wird Pluralinhalt über die Funktion `plural` realisiert, die CLDR-Pluralkategorien – `zero`, `one`, `two`, `few`, `many`, `other` – den entsprechenden Inhalten zuordnet. Die richtige Kategorie wird automatisch basierend auf dem aktiven Gebietsschema (Locale) und einem Zählwert ausgewählt, wobei die in die Plattform integrierte [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)-API verwendet wird.

Im Gegensatz zu [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration.md), das Inhalte basierend auf von Ihnen selbst definierten numerischen Bereichen auswählt, delegiert `plural` die Auswahl an CLDR-Regeln. Dies macht es skalierbar für Sprachen mit komplexen Pluralisierungsregeln – wie Russisch, Polnisch, Arabisch oder Walisisch –, ohne dass Sie Modulo-Logik von Hand schreiben müssen.

## Wann man `plural` vs `enu` verwendet

| Anwendungsfall                                                                   | Helfer   |
| -------------------------------------------------------------------------------- | -------- |
| Sprachabhängige grammatikalische Pluralformen (ein Apfel / zwei Äpfel / 5 Äpfel) | `plural` |
| Benutzerdefinierte numerische Bereiche (`<5`, `>=10`) oder Nicht-CLDR-Kategorien | `enu`    |

Wenn Sie nur Englisch oder Deutsch ansprechen (die nur `one` / `other` haben), funktioniert beides. Für jede Sprache mit `few` / `many` / `two`-Unterscheidungen sollten Sie `plural` bevorzugen.

## Pluralinhalt einrichten

Um Pluralinhalt in Ihrem Intlayer-Projekt einzurichten, erstellen Sie ein Inhaltsmodul, das den `plural`-Helfer verwendet. Die Kategorie `other` ist erforderlich und wird als Fallback verwendet, wenn ein Gebietsschema keine spezifischere Kategorie definiert.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "de": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} Stelle",
            "other": "{{count}} Stellen"
          }
        }
      }
    }
  }
}
```

> Die unterstützten Kategorien sind `zero`, `one`, `two`, `few`, `many`, `other`. Sie müssen nur die Kategorien deklarieren, die Ihre Zielsprache verwendet – Intlayer fällt auf `other` zurück, wenn keine spezifische Kategorie passt.
>
> Der Platzhalter `{{count}}` wird automatisch durch die Anzahl ersetzt, die Sie zur Laufzeit übergeben. Sie können auch andere Platzhalter einschließen (siehe [Benutzerdefinierte Platzhalter](#custom-placeholders) unten).

## Pluralinhalt mit React Intlayer verwenden

Um Pluralinhalt in einer React-Komponente zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab und rufen Sie ihn mit einer Anzahl auf. Das aktive Gebietsschema und die Anzahl werden kombiniert, um die passende CLDR-Kategorie auszuwählen.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* Auf Englisch:                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Sie können die zurückgegebene Funktion auf zwei äquivalente Arten aufrufen:

```tsx
totalOpenings(21); // Kurzform: nur Anzahl
totalOpenings({ count: 21 }); // explizite Form
```

## Benutzerdefinierte Platzhalter

Plural-Zeichenfolgen können andere Platzhalter als `{{count}}` enthalten. Übergeben Sie diese in der Objektform zusammen mit `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, du hast {{count}} neue Nachricht",
      other: "{{name}}, du hast {{count}} neue Nachrichten",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, du hast 1 neue Nachricht"

summary({ count: 7, name: "Alice" });
// → "Alice, du hast 7 neue Nachrichten"
```

## CLDR-Kategorien auf einen Blick

Verschiedene Sprachen verwenden unterschiedliche Teilmengen der CLDR-Kategorien. Einige häufige Fälle:

| Sprache                | Verwendete Kategorien                        |
| ---------------------- | -------------------------------------------- |
| Englisch (`en`)        | `one`, `other`                               |
| Französisch (`fr`)     | `one`, `many`, `other`                       |
| Russisch (`ru`)        | `one`, `few`, `many`, `other`                |
| Polnisch (`pl`)        | `one`, `few`, `many`, `other`                |
| Arabisch (`ar`)        | `zero`, `one`, `two`, `few`, `many`, `other` |
| Japanisch / Chinesisch | nur `other`                                  |

Sie müssen sich das nicht merken – deklarieren Sie die Kategorien, für die Sie Übersetzungen haben, und Intlayer wird bei Bedarf auf `other` zurückgreifen.

## Zusätzliche Ressourcen

Weitere detaillierte Informationen zur Konfiguration und Verwendung finden Sie in den folgenden Ressourcen:

- [Dokumentation zur Aufzählung (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration.md)
- [Dokumentation zur Einfügung (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md)
- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Verwendung von Intlayer in verschiedenen Umgebungen und Frameworks.
