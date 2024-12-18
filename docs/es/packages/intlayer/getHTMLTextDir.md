# Documentación: `getHTMLTextDir` Función en `intlayer`

## Descripción:

La función `getHTMLTextDir` determina la dirección del texto (`ltr`, `rtl` o `auto`) según el `locale` proporcionado. Está diseñada para ayudar a los desarrolladores a establecer el atributo `dir` en HTML para un renderizado de texto adecuado.

## Parámetros:

- `locale?: Locales`

  - **Descripción**: La cadena del locale (por ejemplo, `Locales.ENGLISH`, `Locales.ARABIC`) utilizada para determinar la dirección del texto.
  - **Tipo**: `Locales` (opcional)

## Retorna:

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descripción**: La dirección del texto correspondiente al locale:
  - `'ltr'` para idiomas de izquierda a derecha.
  - `'rtl'` para idiomas de derecha a izquierda.
  - `'auto'` si el locale no es reconocido.

## Ejemplo de Uso:

### Determinación de la Dirección del Texto:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Salida: "ltr"
getHTMLTextDir(Locales.FRENCH); // Salida: "ltr"
getHTMLTextDir(Locales.ARABIC); // Salida: "rtl"
```

## Casos Límite:

- **Ningún Locale Proporcionado:**

  - La función retorna `'auto'` cuando `locale` es `undefined`.

- **Locale No Reconocido:**
  - Para locales no reconocidos, la función por defecto a `'auto'`.

## Uso en Componentes:

La función `getHTMLTextDir` puede ser utilizada para establecer dinámicamente el atributo `dir` en un documento HTML para un renderizado de texto adecuado basado en el locale.

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

En el ejemplo anterior, el atributo `dir` se establece dinámicamente según el locale.
