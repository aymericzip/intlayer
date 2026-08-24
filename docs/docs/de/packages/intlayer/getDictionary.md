---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionary Function Documentation | intlayer
description: Erfahren Sie, wie Sie die getDictionary-Funktion für das intlayer-Paket verwenden
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentation: `getDictionary`-Funktion in `intlayer`

## Beschreibung

Die Funktion `getDictionary` interpretiert ein Dictionary-**Objekt, das Sie selbst übergeben**, und gibt seinen aufgelösten Inhalt für ein bestimmtes Locale zurück. Sie durchläuft den Inhalt in einem einzigen Durchgang und wendet bei Bedarf jedes Interpreter-Plugin an, wobei `t()`-Übersetzungen, Enumerationen, Bedingungen, Einfügungen, Verschachtelung, Markdown, HTML und Datei-Knoten aufgelöst werden.

Im Gegensatz zu [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayer.md), das ein Dictionary anhand eines Schlüssels in der generierten Registry nachschlägt, nimmt `getDictionary` das Dictionary selbst entgegen. Dies macht es zum richtigen Werkzeug für Inhalte, die zur Laufzeit erstellt, von einer API oder einem CMS abgerufen oder inline in einem Test deklariert werden.

**Hauptfunktionen:**

- Funktioniert mit jedem Objekt, das der Dictionary-Struktur folgt (`{ key, content }`)
- Akzeptiert auch eine qualifizierte Dictionary-Gruppe (Collections, Varianten) zusammen mit einem Selector
- Vollständig typisiert: Das zurückgegebene Objekt spiegelt den `content` wider, den Sie übergeben haben
- Akzeptiert benutzerdefinierte Interpreter-Plugins

---

## Funktionssignatur

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Erforderlich
  localeOrSelector?: LocalesValues | DictionarySelector, // Optional
  plugins?: Plugins[]                                // Optional
): DeepTransformContent<...>
```

---

## Parameter

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Beschreibung**: Das zu interpretierende Wörterbuch (oder die qualifizierte Wörterbuchgruppe).
  - **Typ**: `Dictionary | QualifiedDictionaryGroup`
  - **Erforderlich**: Ja

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Beschreibung**: Das Locale zur Interpretation des Inhalts oder ein Selector-Objekt (`{ item }`, `{ variant }`, optional mit `locale`). Siehe [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md).
  - **Typ**: `LocalesValues | DictionarySelector`
  - **Erforderlich**: Nein (Optional) — wird standardmäßig auf das konfigurierte `defaultLocale` gesetzt.

- `plugins: Plugins[]`
  - **Beschreibung**: Ein Array von Node-Transformern, die definieren, wie erkannte Knoten interpretiert werden. Wenn weggelassen, wird der Standard-Satz von Interpreter-Plugins verwendet.
  - **Typ**: `Plugins[]`
  - **Erforderlich**: Nein (Optional)

### Rückgabewerte

- **Typ**: Der interpretierte Inhalt des Wörterbuchs.
- **Beschreibung**: Der `content`, den Sie übergeben haben, mit jedem aufgelösten Intlayer-Knoten für das angeforderte Gebietsschema. Für eine Sammlungsgruppe ohne einen `item`-Selector wird ein geordnetes Array interpretierter Einträge zurückgegeben; `null` wird zurückgegeben, wenn der Selector nichts anvisiert.

---

## Beispielverwendung

### Grundlegende Verwendung

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        de: "Hallo",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "de"
);

console.log(content.greeting); // "Hallo"
```

### Interpretation von zur Laufzeit abgerufenem Inhalt

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Mit einem Selector

```typescript
import { getDictionary } from "intlayer";

// Eine qualifizierte Wörterbuchgruppe wird in einen einzelnen Eintrag aufgelöst…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …oder in ein geordnetes Array, wenn kein `item` angegeben wird
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Verwandte Funktionen

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayer.md): Gleiche Interpretation, aber das Dictionary wird nach Schlüssel in der generierten Registry gesucht.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getDictionaryAsync.md): Gegenstück für Pro-Locale-Loader-Maps.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useDictionary.md): Das React Hook-Äquivalent, das das Locale vom Provider ausliest.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
