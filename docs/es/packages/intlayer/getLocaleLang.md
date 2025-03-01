# Documentación: Función `getLocaleLang` en `intlayer`

## Descripción

La función `getLocaleLang` extrae el código de idioma de una cadena de configuración regional. Soporta configuraciones regionales con o sin códigos de país. Si no se proporciona una configuración regional, por defecto devuelve una cadena vacía.

## Parámetros

- `locale?: Locales`

  - **Descripción**: La cadena de configuración regional (por ejemplo, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) de la cual se extrae el código de idioma.
  - **Tipo**: `Locales` (opcional)

## Retornos

- **Tipo**: `string`
- **Descripción**: El código de idioma extraído de la configuración regional. Si no se proporciona la configuración regional, devuelve una cadena vacía (`''`).

## Ejemplo de Uso

### Extracción de Códigos de Idioma:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Salida: "en"
getLocaleLang(Locales.ENGLISH); // Salida: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Salida: "fr"
getLocaleLang(Locales.FRENCH); // Salida: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Salida: "en"
getLocaleLang(Locales.ENGLISH); // Salida: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Salida: "fr"
getLocaleLang(Locales.FRENCH); // Salida: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Salida: "en"
getLocaleLang(Locales.ENGLISH); // Salida: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Salida: "fr"
getLocaleLang(Locales.FRENCH); // Salida: "fr"
```

## Casos Especiales

- **No se Proporciona Configuración Regional:**

  - La función devuelve una cadena vacía cuando `locale` es `undefined`.

- **Cadenas de Configuración Regional Malformadas:**
  - Si la `locale` no sigue el formato `language-country` (por ejemplo, `Locales.ENGLISH-US`), la función devuelve de forma segura la parte antes de `'-'` o la cadena completa si no hay `'-'` presente.
