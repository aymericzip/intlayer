# Documentation: `getLocaleName` Function in `intlayer`

## Descripción:

La función `getLocaleName` devuelve el nombre localizado de una localidad dada (`targetLocale`) en la localidad de visualización (`displayLocale`). Si no se proporciona `targetLocale`, devuelve el nombre del `displayLocale` en su propio idioma.

## Parámetros:

- `displayLocale: Locales`

  - **Descripción**: La localidad en la que se mostrará el nombre de la localidad objetivo.
  - **Tipo**: Enum o cadena que representa localidades válidas.

- `targetLocale?: Locales`
  - **Descripción**: La localidad cuyo nombre se va a localizar.
  - **Tipo**: Opcional. Enum o cadena que representa localidades válidas.

## Retornos:

- **Tipo**: `string`
- **Descripción**: El nombre localizado de la `targetLocale` en el `displayLocale`, o el propio nombre de `displayLocale` si no se proporciona `targetLocale`. Si no se encuentra traducción, devuelve `"Unknown locale"`.

## Ejemplo de Uso:

```typescript
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

## Casos Limítrofes:

- **No se proporciona `targetLocale`:**
  - La función devuelve por defecto el propio nombre de `displayLocale`.
- **Faltan traducciones:**
  - Si `localeNameTranslations` no contiene una entrada para `targetLocale` o el `displayLocale` específico, la función recurre a `ownLocalesName` o devuelve `"Unknown locale"`.
