# Dokumentation: `getLocaleName` Funktion in `intlayer`

## Beschreibung:

Die `getLocaleName` Funktion gibt den lokalisierten Namen eines bestimmten Gebiets (`targetLocale`) in der angezeigten Sprache (`displayLocale`) zurück. Wenn kein `targetLocale` angegeben ist, wird der Name des `displayLocale` in der eigenen Sprache zurückgegeben.

## Parameter:

- `displayLocale: Locales`

  - **Beschreibung**: Das Gebiet, in dem der Name des Zielgebiets angezeigt wird.
  - **Typ**: Enum oder String, der gültige Gebiete darstellt.

- `targetLocale?: Locales`
  - **Beschreibung**: Das Gebiet, dessen Name lokalisiert werden soll.
  - **Typ**: Optional. Enum oder String, der gültige Gebiete darstellt.

## Rückgaben:

- **Typ**: `string`
- **Beschreibung**: Der lokalisierte Name des `targetLocale` im `displayLocale`, oder der eigene Name des `displayLocale`, wenn `targetLocale` nicht angegeben ist. Wenn keine Übersetzung gefunden wird, wird `"Unknown locale"` zurückgegeben.

## Beispielnutzung:

```typescript
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

getLocaleName("unknown-locale"); // Ausgabe: "Unknown locale"
```

## Grenzfälle:

- **Kein `targetLocale` angegeben:**
  - Die Funktion gibt standardmäßig den eigenen Namen des `displayLocale` zurück.
- **Fehlende Übersetzungen:**
  - Wenn `localeNameTranslations` keinen Eintrag für das `targetLocale` oder das spezifische `displayLocale` enthält, fällt die Funktion auf den `ownLocalesName` zurück oder gibt `"Unknown locale"` zurück.
