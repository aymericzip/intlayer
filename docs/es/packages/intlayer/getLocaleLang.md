# Documentación: `getLocaleLang` Función en `intlayer`

## Descripción:

La función `getLocaleLang` extrae el código de idioma de una cadena de localización. Admite localidades con o sin códigos de país. Si no se proporciona ninguna localidad, por defecto devuelve una cadena vacía.

## Parámetros:

- `locale?: Locales`

  - **Descripción**: La cadena de localización (por ejemplo, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) de la que se extrae el código de idioma.
  - **Tipo**: `Locales` (opcional)

## Retornos:

- **Tipo**: `string`
- **Descripción**: El código de idioma extraído de la localidad. Si no se proporciona la localidad, devuelve una cadena vacía (`''`).

## Ejemplo de Uso:

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

## Casos Límite:

- **No se Proporciona Localidad:**

  - La función devuelve una cadena vacía cuando `locale` es `undefined`.

- **Cadenas de Localidad Malformadas:**
  - Si la `locale` no sigue el formato `idioma-país` (por ejemplo, `Locales.ENGLISH-US`), la función devuelve de manera segura la parte antes de `'-'` o la cadena completa si no hay `'-'` presente.
