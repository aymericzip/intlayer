---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt Plugin | Intlayer-Übersetzungen sortieren
description: "Sortieren Sie die Locales von t(), die Kategorien von plural(), die Bedingungen von enu(), die Fälle von select() und die Schlüssel Ihrer Inhaltsdeklarationen mit prettier-plugin-intlayer. Funktioniert mit Prettier und oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
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
  - version: 9.7.1
    date: 2026-11-03
    changes: "oxfmt-Nutzung hinzugefügt"
author: aymericzip
---

# Prettier x Oxfmt Plugin

`prettier-plugin-intlayer` bringt die Schlüssel Ihrer Übersetzungen bei jeder Formatierung durch Prettier in eine feste Reihenfolge. Diffs bleiben übersichtlich, Merge-Konflikte werden seltener und fehlende Locales fallen sofort auf.

```ts
// vorher
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// nachher
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installation

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Erfordert Prettier 3 oder höher.

Wenn Ihr Projekt bereits Prettier verwendet, installiert `intlayer init prettier` das Plugin und trägt es automatisch in Ihre Konfiguration ein.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt kann keine Plugins von Drittanbietern laden, daher läuft die Sortierung über Prettier. Installieren Sie Prettier neben oxfmt. Es dient nur zum Sortieren Ihrer Inhaltsdeklarationen, oxfmt formatiert Ihr Projekt weiterhin.

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

Erfordert Prettier 3 oder höher. `intlayer init` richtet das Plugin nur in Projekten ein, die bereits Prettier verwenden. Konfigurieren Sie es daher wie unten gezeigt von Hand.

  </Tab>
</Tabs>

## Verwendung

Das Plugin funktioniert mit Prettier und mit [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

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

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

Das Format-Skript führt zwei Tools aus, jedes mit einer Aufgabe:

1. **Prettier** sortiert Ihre Inhaltsdeklarationen mit dem Plugin. Der Glob beschränkt es auf `*.content.*`-Dateien.
2. **oxfmt** formatiert das gesamte Projekt, Inhaltsdeklarationen eingeschlossen.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

Behalten Sie diese Reihenfolge bei. oxfmt ersetzt das von Prettier geschriebene Layout durch sein eigenes, ordnet Objektschlüssel aber nie neu, die Sortierung bleibt also erhalten.

Dieses Setup hat einige Grenzen:

- **Formatieren beim Speichern.** Ein Editor, der mit oxfmt formatiert, sortiert nicht. Führen Sie das `format`-Skript aus, um zu sortieren.
- **Check-Modus.** Verwenden Sie `prettier --check` nicht für Dateien, die oxfmt formatiert hat: Die Layouts unterscheiden sich, daher meldet es jede Datei. Um die Reihenfolge in der CI zu prüfen, führen Sie das `format`-Skript aus und lassen Sie den Job bei Änderungen fehlschlagen:

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### Identische Übersetzungen

In `*.content.*`-Dateien wird ein `t()`, dessen Locales alle denselben String enthalten, durch diesen String ersetzt. Ein einfacher String wird für jede Locale ausgeliefert, die Ausgabe ändert sich also nicht.

```ts
// vorher
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// nachher
nextjs: "Next.js",
```

Ein `t()` mit nur einer Locale, einem Typargument (`t<string>()`), einem Kommentar oder Nicht-String-Werten bleibt erhalten. Setzen Sie `intlayerCollapseIdenticalTranslations: false`, um dies zu deaktivieren.

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

| Option                                  | Standard | Beschreibung                                                                                                                     |
| --------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | Locales, die in `t()` an erster Stelle gehalten werden, in dieser Reihenfolge. Übergeben Sie `[]`, um alle Locales zu sortieren. |
| `intlayerSortContentKeys`               | `false`  | In `*.content.*`-Dateien auch die Inhaltsschlüssel des Wörterbuchs und verschachtelte Objekte sortieren.                         |
| `intlayerCollapseIdenticalTranslations` | `true`   | Ersetzt in `*.content.*`-Dateien ein `t()`, dessen Locales alle denselben String enthalten, durch diesen String.                 |

## Was unverändert bleibt

- Objekte mit Spread (`...base`), berechnetem Schlüssel (`[key]`), Methode oder doppeltem Schlüssel.
- `plural()`-Maps mit einem Schlüssel, der keine CLDR-Kategorie ist.
- `enu()`-Maps, deren neue Reihenfolge den aufgelösten Inhalt verändern würde.
- Aufrufe anderer Funktionen, die wie ein Helper benannt sind, aber kein Objektargument erhalten.

Kommentare wandern mit dem Schlüssel, zu dem sie gehören.

## Unterstützte Parser

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` und `jsonc`. Die `<script>`-Blöcke von Vue-, Svelte- und Astro-Dateien werden mit diesen Parsern formatiert.

> **Bekannte Einschränkung.** Prettier führt pro Parser nur ein einziges Plugin aus. Wenn ein weiteres Plugin ebenfalls die JavaScript/TypeScript-Parser ersetzt (beispielsweise `prettier-plugin-tailwindcss`), wird nur das zuletzt aufgeführte auf diese Dateien angewendet. Beschränken Sie `prettier-plugin-intlayer` mit einem Override auf `*.content.*`-Dateien, um diesen Konflikt zu vermeiden. Mit oxfmt werden Tailwind-Klassen über die integrierte Option `sortTailwindcss` sortiert, dieser Konflikt tritt daher nicht auf.
