# Documentación: `getHTMLTextDir` Función en `intlayer`

## Descripción:

La función `getHTMLTextDir` determina la dirección del texto (`ltr`, `rtl`, o `auto`) en función de la localidad proporcionada. Está diseñada para ayudar a los desarrolladores a establecer el atributo `dir` en HTML para un renderizado adecuado del texto.

## Parámetros:

- `locale?: Locales`

  - **Descripción**: La cadena de localidad (por ejemplo, `Locales.ENGLISH`, `Locales.ARABIC`) utilizada para determinar la dirección del texto.
  - **Tipo**: `Locales` (opcional)

## Retornos:

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descripción**: La dirección del texto correspondiente a la localidad:
  - `'ltr'` para idiomas de izquierda a derecha.
  - `'rtl'` para idiomas de derecha a izquierda.
  - `'auto'` si la localidad no es reconocida.

## Ejemplo de Uso:

### Determinando la Dirección del Texto:

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Salida: "ltr"
getHTMLTextDir(Locales.FRENCH); // Salida: "ltr"
getHTMLTextDir(Locales.ARABIC); // Salida: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Salida: "ltr"
getHTMLTextDir(Locales.FRENCH); // Salida: "ltr"
getHTMLTextDir(Locales.ARABIC); // Salida: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Salida: "ltr"
getHTMLTextDir(Locales.FRENCH); // Salida: "ltr"
getHTMLTextDir(Locales.ARABIC); // Salida: "rtl"
```

## Casos Especiales:

- **No se Proporcionó Localidad:**

  - La función devuelve `'auto'` cuando `locale` es `undefined`.

- **Localidad No Reconocida:**
  - Para localidades no reconocidas, la función por defecto utiliza `'auto'`.

## Uso en Componentes:

La función `getHTMLTextDir` puede usarse para establecer dinámicamente el atributo `dir` en un documento HTML para un renderizado adecuado del texto basado en la localidad.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

En el ejemplo anterior, el atributo `dir` se establece dinámicamente en función de la localidad.
