---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleName Funktionsdokumentation | intlayer
description: Siehe, wie die Funktion getLocaleName im intlayer-Paket verwendet wird
keywords:
  - getLocaleName
  - Übersetzung
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleName
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initialer Verlauf
---

# Dokumentation: `getLocaleName` Funktion in `intlayer`

## Beschreibung

Die Funktion `getLocaleName` gibt den lokalisierten Namen einer gegebenen Locale (`targetLocale`) in der Anzeigelocale (`displayLocale`) zurück. Wenn keine `targetLocale` angegeben ist, gibt sie den Namen der `displayLocale` in deren eigener Sprache zurück.

## Parameter

- `displayLocale: Locales`

  - **Beschreibung**: Die Locale, in der der Name der Ziel-Locale angezeigt wird.
  - **Typ**: Enum oder String, der gültige Locales repräsentiert.

- `targetLocale?: Locales`
  - **Beschreibung**: Die Locale, deren Name lokalisiert werden soll.
  - **Typ**: Optional. Enum oder String, der gültige Locales repräsentiert.

## Rückgabewert

- **Typ**: `string`
- **Beschreibung**: Der lokalisierte Name der `targetLocale` in der `displayLocale` oder der eigene Name der `displayLocale`, wenn keine `targetLocale` angegeben ist. Wenn keine Übersetzung gefunden wird, gibt sie `"Unbekannte Locale"` zurück.

## Beispielhafte Verwendung

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Ausgabe: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Ausgabe: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Ausgabe: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Ausgabe: "English"

getLocaleName(Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Ausgabe: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Ausgabe: "French"

getLocaleName(Locales.CHINESE); // Ausgabe: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Ausgabe: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Ausgabe: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Ausgabe: "Chinese"

getLocaleName("unknown-locale"); // Ausgabe: "Unbekannte Locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Ausgabe: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Ausgabe: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Ausgabe: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Ausgabe: "English"

getLocaleName(Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Ausgabe: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Ausgabe: "French"

getLocaleName(Locales.CHINESE); // Ausgabe: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Ausgabe: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Ausgabe: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Ausgabe: "Chinese"

getLocaleName("unknown-locale"); // Ausgabe: "Unbekannte Locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Ausgabe: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Ausgabe: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Ausgabe: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Ausgabe: "English"

getLocaleName(Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Ausgabe: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Ausgabe: "French"

getLocaleName(Locales.CHINESE); // Ausgabe: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Ausgabe: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Ausgabe: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Ausgabe: "Chinese"

getLocaleName("unknown-locale"); // Ausgabe: "Unbekannte Locale"
```

## Randfälle

- **Kein `targetLocale` angegeben:**
  - Die Funktion gibt standardmäßig den eigenen Namen von `displayLocale` zurück.
- **Fehlende Übersetzungen:**
  - Wenn `localeNameTranslations` keinen Eintrag für das `targetLocale` oder das spezifische `displayLocale` enthält, greift die Funktion auf den `ownLocalesName` zurück oder gibt `"Unbekannte Sprache"` zurück.
