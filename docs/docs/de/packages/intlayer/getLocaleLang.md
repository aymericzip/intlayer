---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleLang Funktionsdokumentation | intlayer
description: Siehe, wie die Funktion getLocaleLang für das intlayer-Paket verwendet wird
keywords:
  - getLocaleLang
  - Übersetzung
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# Dokumentation: `getLocaleLang` Funktion in `intlayer`

## Beschreibung

Die Funktion `getLocaleLang` extrahiert den Sprachcode aus einem Locale-String. Sie unterstützt Locales mit oder ohne Ländercodes. Wenn kein Locale angegeben wird, gibt sie standardmäßig einen leeren String zurück.

## Parameter

- `locale?: Locales`

  - **Beschreibung**: Der Locale-String (z. B. `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), aus dem der Sprachcode extrahiert wird.
  - **Typ**: `Locales` (optional)

## Rückgabewert

- **Typ**: `string`
- **Beschreibung**: Der aus dem Locale extrahierte Sprachcode. Wenn kein Locale angegeben wird, wird ein leerer String (`''`) zurückgegeben.

## Beispielhafte Verwendung

### Sprachcodes extrahieren:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Ausgabe: "en"
getLocaleLang(Locales.ENGLISH); // Ausgabe: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Ausgabe: "fr"
getLocaleLang(Locales.FRENCH); // Ausgabe: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Ausgabe: "en"
getLocaleLang(Locales.ENGLISH); // Ausgabe: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Ausgabe: "fr"
getLocaleLang(Locales.FRENCH); // Ausgabe: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Ausgabe: "en"
getLocaleLang(Locales.ENGLISH); // Ausgabe: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Ausgabe: "fr"
getLocaleLang(Locales.FRENCH); // Ausgabe: "fr"
```

## Randfälle

- **Kein Locale angegeben:**

  - Die Funktion gibt einen leeren String zurück, wenn `locale` `undefined` ist.

- **Fehlerhafte Locale-Strings:**
  - Wenn die `locale` nicht dem Format `Sprache-Land` entspricht (z. B. `Locales.ENGLISH-US`), gibt die Funktion sicher den Teil vor dem `'-'` zurück oder den gesamten String, falls kein `'-'` vorhanden ist.

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
