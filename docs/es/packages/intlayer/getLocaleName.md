# Documentación: Función `getLocaleName` en `intlayer`

## Descripción

La función `getLocaleName` devuelve el nombre localizado de una localización (`targetLocale`) en la localización de visualización (`displayLocale`). Si no se proporciona un `targetLocale`, devuelve el nombre de la `displayLocale` en su propio idioma.

## Parámetros

- `displayLocale: Locales`

  - **Descripción**: La localización en la que se mostrará el nombre de la localización objetivo.
  - **Tipo**: Enum o cadena que representa localizaciones válidas.

- `targetLocale?: Locales`
  - **Descripción**: La localización cuyo nombre debe ser localizado.
  - **Tipo**: Opcional. Enum o cadena que representa localizaciones válidas.

## Retornos

- **Tipo**: `string`
- **Descripción**: El nombre localizado del `targetLocale` en el `displayLocale`, o el propio nombre del `displayLocale` si no se proporciona `targetLocale`. Si no se encuentra una traducción, devuelve `"Unknown locale"`.

## Ejemplo de Uso

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

## Casos Especiales

- **No se proporciona `targetLocale`:**
  - La función por defecto devuelve el propio nombre del `displayLocale`.
- **Traducciones faltantes:**
  - Si `localeNameTranslations` no contiene una entrada para el `targetLocale` o el `displayLocale` específico, la función recurre al `ownLocalesName` o devuelve `"Unknown locale"`.
