# Documentación: `getLocaleName` Función en `intlayer`

## Descripción:

La función `getLocaleName` devuelve el nombre localizado de un locale dado (`targetLocale`) en el locale de visualización (`displayLocale`). Si no se proporciona un `targetLocale`, devuelve el nombre del `displayLocale` en su propio idioma.

## Parámetros:

- `displayLocale: Locales`

  - **Descripción**: El locale en el que se mostrará el nombre del locale objetivo.
  - **Tipo**: Enum o cadena que representa locales válidos.

- `targetLocale?: Locales`
  - **Descripción**: El locale cuyo nombre se va a localizar.
  - **Tipo**: Opcional. Enum o cadena que representa locales válidos.

## Retornos:

- **Tipo**: `string`
- **Descripción**: El nombre localizado del `targetLocale` en el `displayLocale`, o el propio nombre del `displayLocale` si no se proporciona `targetLocale`. Si no se encuentra ninguna traducción, devuelve `"Unknown locale"`.

## Ejemplo de Uso:

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Salida: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Salida: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Salida: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Salida: "English"

getLocaleName(Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Salida: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Salida: "French"

getLocaleName(Locales.CHINESE); // Salida: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Salida: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Salida: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Salida: "Chinese"

getLocaleName("unknown-locale"); // Salida: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Salida: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Salida: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Salida: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Salida: "English"

getLocaleName(Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Salida: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Salida: "French"

getLocaleName(Locales.CHINESE); // Salida: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Salida: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Salida: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Salida: "Chinese"

getLocaleName("unknown-locale"); // Salida: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Salida: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Salida: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Salida: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Salida: "English"

getLocaleName(Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Salida: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Salida: "French"

getLocaleName(Locales.CHINESE); // Salida: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Salida: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Salida: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Salida: "Chinese"

getLocaleName("unknown-locale"); // Salida: "Unknown locale"
```

## Casos de Uso:

- **No se proporciona `targetLocale`:**
  - La función devuelve por defecto el nombre del `displayLocale`.
- **Traducciones faltantes:**
  - Si `localeNameTranslations` no contiene una entrada para el `targetLocale` o el `displayLocale` específico, la función vuelve al `ownLocalesName` o devuelve `"Unknown locale"`.
