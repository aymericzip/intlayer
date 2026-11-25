---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Wörterbücher mit Schemas validieren (Zod)"
description: "Deklariere Zod-Schemas in intlayer.config.ts und hänge sie an deine Wörterbücher, um jede Locale beim Build zu validieren und den Inhalt im Editor zu typisieren."
keywords:
  - Schema
  - Zod
  - Validierung
  - Wörterbuch
  - Inhaltsdeklaration
  - Typsicherheit
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Initialisierung der Doku"
author: aymericzip
---

# Wörterbücher mit Schemas validieren

Ein Schema beschreibt die erwartete Form des Inhalts eines Wörterbuchs. Du deklarierst es einmal in `intlayer.config.ts`, gibst ihm einen Namen und hängst diesen Namen dann über das Feld `schema` an beliebige Wörterbücher.

Intlayer wird dann:

- **Validieren**: Beim Build der Wörterbücher wird jedes Wörterbuch für jede Locale geprüft, und jeder Fehler wird mit Locale und Feldpfad gemeldet.
- **Typisieren**: Der Inhalt des Wörterbuchs wird in deinem Editor typisiert, sodass ein fehlendes oder falsch typisiertes Feld vor dem Build auffällt.

Schemas sind nützlich, wenn mehrere Wörterbücher dieselbe Struktur teilen müssen (SEO-Metadaten, Produktkarten, CMS-ähnliche Einträge), oder wenn der Inhalt Einschränkungen erfüllen muss, die TypeScript nicht ausdrücken kann, etwa eine maximale Länge für jede Übersetzung.

<Steps>
<Step number={1} title="Schemas in der Konfiguration deklarieren">

Installiere [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Deklariere dann deine Schemas unter dem Schlüssel `schemas`. Jeder Schlüssel ist der Name, auf den deine Wörterbücher verweisen.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Ein Schema an ein Wörterbuch hängen">

Setze das Feld `schema` eines Wörterbuchs auf einen der in der Konfiguration deklarierten Namen.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Dasselbe Schema kann an beliebig viele Wörterbücher gehängt werden.

</Step>
<Step number={3} title="Build ausführen und Bericht lesen">

Die Validierung läuft bei jedem Build der Wörterbücher: mit `npx intlayer build` oder über das Plugin deines Bundlers im Dev- und Build-Modus. Verletzt eine Übersetzung das Schema, gibt Intlayer die Locale, den Feldpfad und die Zod-Meldung aus:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Ein einmaliger Aufruf von `intlayer build` schlägt fehl, wenn das Schema unbekannt ist oder die Validierung fehlschlägt. Im Watch-Modus schließt Intlayer das ungültige Wörterbuch aus, bis sein Inhalt korrigiert ist.

</Step>
</Steps>

## Den Inhalt aus dem Schema typisieren

Die generischen Parameter von `Dictionary` steuern, wie streng TypeScript ein Wörterbuch prüft:

| Deklaration                                             | Feld `schema`                                            | Feld `content`                                  |
| ------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------- |
| `satisfies Dictionary`                                  | Autovervollständigt, ein unbekannter Name ist ein Fehler | Nicht von TypeScript geprüft                    |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Muss `"seo-metadata"` sein                               | Aus dem Schema typisiert                        |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Muss `"seo-metadata"` sein                               | Aus dem Schema und deinem eigenen Typ typisiert |

Mit einem typisierten Schema akzeptiert jedes Feld entweder einen einfachen Wert oder einen Content-Knoten, der diesen Wert erzeugt, `t()` bleibt also erlaubt:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer generiert diese Typen aus deinen Zod-Schemas in `.intlayer/types`, jedes Mal wenn die Wörterbücher gebaut werden. Nur die Form wird typisiert: Einschränkungen wie `.min()`, `.max()` oder `.regex()` werden beim Build geprüft.

## Was validiert wird

Für jede in `internationalization.locales` aufgeführte Locale löst Intlayer den Inhalt des Wörterbuchs für diese Locale auf und validiert dann das Ergebnis. Das Schema beschreibt also den finalen Wert eines Feldes (`title: string`), nicht den `t()`-Knoten, der die Übersetzungen enthält.

- **Fehlende Übersetzungen**: Mit dem Standard-`strictMode` fällt eine fehlende Übersetzung vor der Validierung auf die Standard-Locale zurück. Mit `strictMode: "strict"` lässt eine fehlende Übersetzung ein Pflichtfeld scheitern.
- **Andere Content-Knoten**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` und `insert()` werden zu Funktionen aufgelöst, `md()` oder `html()` zu Knoten. Deklariere diese Felder mit `z.any()` und halte die Einschränkungen auf Feldern, die zu einfachen Werten aufgelöst werden.
- **Nicht validiert**: Inhalt, der von einer Funktion oder einer Promise geliefert wird ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md)), und Wörterbücher, die aus dem [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) geladen werden.

## Eine andere Validierungsbibliothek verwenden

Die Einträge von `schemas` sind nicht an Zod gebunden. Jedes Objekt mit einer Zod-kompatiblen Methode `safeParse(data)` funktioniert, solange sie `{ success: true }` oder `{ success: false, error: { issues } }` zurückgibt, wobei jedes Issue ein Array `path` und eine `message` hat. Die Typisierung des Inhalts wird nur aus Zod-Schemas generiert: Mit einer anderen Bibliothek wird der Inhalt der verknüpften Wörterbücher als `any` typisiert.

## Häufig gestellte Fragen

<FAQ>

<Question title="Stoppt ein Schema-Fehler meinen Build?">

Ein einmaliger Aufruf von `intlayer build` schlägt fehl, wenn ein Wörterbuch seinem Schema nicht entspricht. Im Watch-Modus protokolliert Intlayer die Fehler und schließt das ungültige Wörterbuch aus, bis du es korrigierst und speicherst.

</Question>
<Question title="Können mehrere Wörterbücher dasselbe Schema teilen?">

Ja. Ein Schema wird über seinen Namen referenziert, beliebig viele Wörterbücher können also darauf verweisen. Das ist der Hauptanwendungsfall: eine einheitliche Struktur für alle Seiten-Metadaten, Produkteinträge oder E-Mail-Vorlagen erzwingen.

</Question>
<Question title="Was passiert, wenn der Schema-Name nicht existiert?">

TypeScript meldet es, sobald mindestens ein Schema deklariert ist, da das Feld `schema` nur die deklarierten Namen akzeptiert. Bei JSON-Dateien meldet Intlayer den unbekannten Schemanamen beim Build und weist das Wörterbuch zurück.

</Question>
<Question title="Wird jede Locale validiert oder nur die Standard-Locale?">

Jede in `internationalization.locales` aufgeführte Locale. Der Bericht nennt die fehlerhafte Locale, sodass eine Übersetzung, die nur auf Deutsch zu lang ist, leicht zu finden ist.

</Question>

</FAQ>

## Weiterführend

- [Inhaltsdeklarationsdateien](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
