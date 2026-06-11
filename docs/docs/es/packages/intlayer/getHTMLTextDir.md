---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función getHTMLTextDir | intlayer
description: Vea cómo usar la función getHTMLTextDir para el paquete intlayer
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
slugs:
  - doc
  - packages
  - intlayer
  - getHTMLTextDir
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Documentación: Función `getHTMLTextDir` en `intlayer`

## Descripción

La función `getHTMLTextDir` determina la dirección del texto (`ltr`, `rtl` o `auto`) según la configuración regional proporcionada. Está diseñada para ayudar a los desarrolladores a establecer el atributo `dir` en HTML para una correcta representación del texto.

## Parámetros

- `locale?: Locales`
  - **Descripción**: La cadena de configuración regional (por ejemplo, `Locales.ENGLISH`, `Locales.ARABIC`) utilizada para determinar la dirección del texto.
  - **Tipo**: `Locales` (opcional)

## Retorna

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descripción**: La dirección del texto correspondiente a la configuración regional:
  - `'ltr'` para idiomas de izquierda a derecha.
  - `'rtl'` para idiomas de derecha a izquierda.
  - `'auto'` si la configuración regional no es reconocida.

## Ejemplo de uso

### Determinando la dirección del texto

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Salida: "ltr"
getHTMLTextDir(Locales.FRENCH); // Salida: "ltr"
getHTMLTextDir(Locales.ARABIC); // Salida: "rtl"
```

## Casos Especiales

- **No se Proporciona Configuración Regional:**
  - La función devuelve `'auto'` cuando `locale` es `undefined`.

- **Configuración Regional No Reconocida:**
  - Para locales no reconocidos, la función utiliza `'auto'` por defecto.

## Uso en Componentes:

La función `getHTMLTextDir` puede usarse para establecer dinámicamente el atributo `dir` en un documento HTML para un renderizado correcto del texto basado en la configuración regional.

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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

En el ejemplo anterior, el atributo `dir` se establece dinámicamente según la configuración regional.
