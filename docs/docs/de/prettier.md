---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier-Plugin | Intlayer-Übersetzungen sortieren
description: "Sortieren Sie die Locales von t(), die Kategorien von plural(), die Bedingungen von enu(), die Fälle von select() und die Schlüssel Ihrer Inhaltsdeklarationen mit prettier-plugin-intlayer."
keywords:
  - Intlayer
  - Prettier
  - Formatierung
  - Übersetzungen sortieren
  - Locales sortieren
  - i18n
  - Internationalisierung
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Initiale Historie"
author: aymericzip
---

# Prettier-Plugin

`prettier-plugin-intlayer` bringt die Schlüssel Ihrer Übersetzungen bei jeder Formatierung durch Prettier in eine feste Reihenfolge. Diffs bleiben übersichtlich, Merge-Konflikte werden seltener und fehlende Locales fallen sofort auf.

```ts
// vorher
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// nachher
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installation

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Erfordert Prettier 3 oder höher.

Wenn Ihr Projekt bereits Prettier verwendet, installiert `intlayer init prettier` das Plugin und trägt es automatisch in Ihre Konfiguration ein.

## Verwendung

Fügen Sie das Plugin zu Ihrer Prettier-Konfiguration hinzu:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Um es nur auf Ihre Inhaltsdeklarationen anzuwenden, verwenden Sie ein Override:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

## Was sortiert wird

### `t()`: Locales

Die festgehefteten (pinned) Locales stehen an erster Stelle (`en` standardmäßig). Die übrigen Locales folgen in alphabetischer Reihenfolge.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR-Reihenfolge

Die Kategorien verlaufen von der kleinsten Menge bis zum Fallback: `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: Aufsteigende Schwellenwerte

Bedingungen werden nach ihrer Zahl und anschließend nach Operator sortiert (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` steht an letzter Stelle.

```ts
enu({
  "<-1": "Weniger als minus ein Auto",
  "0": "Keine Autos",
  "2": "Zwei Autos",
  ">=3": "Viele Autos",
  fallback: "Einige Autos",
});
```

Zur Laufzeit greift die erste zutreffende Bedingung. Das Plugin wendet die neue Reihenfolge nur an, wenn jede Menge weiterhin zu demselben Inhalt aufgelöst wird. Wenn die Reihenfolge das Ergebnis beeinflussen würde, bleibt das Objekt unverändert. Beispielsweise fängt in `{ '<1': …, '<=-2.3': … }` der Schlüssel `'<1'` jede negative Zahl ab.

### `select()`: Alphabetisch

Fälle werden alphabetisch sortiert und `fallback` steht am Ende.

```ts
select({
  draft: "Dieser Beitrag ist ein Entwurf",
  published: "Dieser Beitrag ist veröffentlicht",
  scheduled: "Dieser Beitrag ist geplant",
  fallback: "Unbekannter Status",
});
```

Ohne einen Schlüssel `fallback` oder `other` dient der letzte Fall als Fallback. Dieser Fall bleibt an letzter Stelle und nur die vorangehenden Fälle werden sortiert.

### `.content.json`-Dateien

Die serialisierte Form wird genauso sortiert: `{ "nodeType": "translation", "translation": { … } }` sowie Knoten für `plural`, `enumeration` und `select`.

### Inhaltsschlüssel (Opt-in)

Mit `intlayerSortContentKeys: true` sortiert das Plugin auch die Schlüssel des Wörterbuchs `content` alphabetisch auf jeder Schachtelungsebene. Dies gilt ausschließlich für `*.content.*`-Dateien.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

Die Sortierung durchläuft alle Hilfsfunktionen (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…), um die darin enthaltenen Objekte zu erreichen. Die interne Schlüsselstruktur jedes Helpers behält ihre Ordnung bei. An `cond()` und `gender()` übergebene Schlüssel werden nie umgeordnet, da ihr letzter Schlüssel als Fallback dient. Felder neben `content` (`key`, `title`, `locale`…) bleiben unverändert.

## Optionen

| Option                    | Standard | Beschreibung                                                                                                                     |
| ------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]` | Locales, die in `t()` an erster Stelle gehalten werden, in dieser Reihenfolge. Übergeben Sie `[]`, um alle Locales zu sortieren. |
| `intlayerSortContentKeys` | `false`  | In `*.content.*`-Dateien auch die Inhaltsschlüssel des Wörterbuchs und verschachtelte Objekte sortieren.                         |

## Was unverändert bleibt

- Objekte mit Spread (`...base`), berechnetem Schlüssel (`[key]`), Methode oder doppeltem Schlüssel.
- `plural()`-Maps mit einem Schlüssel, der keine CLDR-Kategorie ist.
- `enu()`-Maps, deren neue Reihenfolge den aufgelösten Inhalt verändern würde.
- Aufrufe anderer Funktionen, die wie ein Helper benannt sind, aber kein Objektargument erhalten.

Kommentare wandern mit dem Schlüssel, zu dem sie gehören.

## Unterstützte Parser

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` und `jsonc`. Die `<script>`-Blöcke von Vue-, Svelte- und Astro-Dateien werden mit diesen Parsern formatiert.

> **Bekannte Einschränkung.** Prettier führt pro Parser nur ein einziges Plugin aus. Wenn ein weiteres Plugin ebenfalls die JavaScript/TypeScript-Parser ersetzt (beispielsweise `prettier-plugin-tailwindcss`), wird nur das zuletzt aufgeführte auf diese Dateien angewendet. Beschränken Sie `prettier-plugin-intlayer` mit einem Override auf `*.content.*`-Dateien, um diesen Konflikt zu vermeiden.
