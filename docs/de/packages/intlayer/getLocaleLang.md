---
docName: package__intlayer__getLocaleLang
url: /doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Dokumentation der t-Funktion | intlayer
description: Erfahren Sie, wie Sie die t-Funktion für das intlayer-PakegetLocaleLang verwenden
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

## Rückgabewerte

- **Typ**: `string`
- **Beschreibung**: Der aus dem Locale extrahierte Sprachcode. Wenn kein Locale angegeben wird, gibt die Funktion einen leeren String (`''`) zurück.

## Beispielverwendung

### Extrahieren von Sprachcodes:

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

## Sonderfälle

- **Kein Locale angegeben:**

  - Die Funktion gibt einen leeren String zurück, wenn `locale` `undefined` ist.

- **Fehlerhafte Locale-Strings:**
  - Wenn das `locale` nicht dem Format `language-country` entspricht (z. B. `Locales.ENGLISH-US`), gibt die Funktion sicher den Teil vor `'-'` oder den gesamten String zurück, wenn kein `'-'` vorhanden ist.
