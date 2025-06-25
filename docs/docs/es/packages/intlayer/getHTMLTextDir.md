---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación de la función getHTMLTextDir | intlayer
description: Descubre cómo usar la función getHTMLTextDir para el paquete intlayer
keywords:
  - getHTMLTextDir
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Documentación: Función `getHTMLTextDir` en `intlayer`

## Descripción

La función `getHTMLTextDir` determina la dirección del texto (`ltr`, `rtl` o `auto`) basada en la configuración regional proporcionada. Está diseñada para ayudar a los desarrolladores a establecer el atributo `dir` en HTML para un renderizado adecuado del texto.

## Parámetros

- `locale?: Locales`

  - **Descripción**: La cadena de configuración regional (por ejemplo, `Locales.ENGLISH`, `Locales.ARABIC`) utilizada para determinar la dirección del texto.
  - **Tipo**: `Locales` (opcional)

## Retornos

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descripción**: La dirección del texto correspondiente a la configuración regional:
  - `'ltr'` para idiomas de izquierda a derecha.
  - `'rtl'` para idiomas de derecha a izquierda.
  - `'auto'` si la configuración regional no es reconocida.

## Ejemplo de Uso

### Determinando la Dirección del Texto

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

## Casos Especiales

- **No se Proporciona Configuración Regional:**

  - La función retorna `'auto'` cuando `locale` es `undefined`.

- **Configuración Regional No Reconocida:**
  - Para configuraciones regionales no reconocidas, la función por defecto retorna `'auto'`.

## Uso en Componentes:

La función `getHTMLTextDir` puede ser utilizada para establecer dinámicamente el atributo `dir` en un documento HTML para un renderizado adecuado del texto basado en la configuración regional.

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

En el ejemplo anterior, el atributo `dir` se establece dinámicamente basado en la configuración regional.
