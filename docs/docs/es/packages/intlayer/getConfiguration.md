---
docName: package__intlayer__getConfiguration
url: https://intlayer.org/doc/packages/intlayer/getConfiguration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getConfiguration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación de la función getConfiguration | intlayer
description: Descubre cómo usar la función getConfiguration para el paquete intlayer
keywords:
  - getConfiguration
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Documentación: Función `getConfiguration` en `intlayer`

## Descripción

La función `getConfiguration` recupera toda la configuración para la aplicación `intlayer` extrayendo variables de entorno. Esta función proporciona la flexibilidad de usar la misma configuración tanto en el lado del cliente como en el servidor, asegurando consistencia en toda la aplicación.

---

## Parámetros

La función no toma ningún parámetro. En su lugar, utiliza variables de entorno para la configuración.

### Retorna

- **Tipo**: `IntlayerConfig`
- **Descripción**: Un objeto que contiene la configuración completa para `intlayer`. La configuración incluye las siguientes secciones:

  - `internationalization`: Configuraciones relacionadas con locales y modo estricto.
  - `middleware`: Configuraciones relacionadas con la gestión de URL y cookies.
  - `content`: Configuraciones relacionadas con archivos de contenido, directorios y patrones.
  - `editor`: Configuraciones específicas del editor.

Consulta la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para más detalles.

---

## Ejemplo de Uso

### Recuperando la Configuración Completa

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Salida:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Salida:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Salida:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Extrayendo `availableLocales` y `defaultLocale`

La sección `internationalization` de la configuración proporciona configuraciones relacionadas con locales como `locales` (locales disponibles) y `defaultLocale` (idioma de respaldo).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ejemplo de salida: ["en", "fr", "es"]
console.log(defaultLocale); // Ejemplo de salida: "en"
console.log(cookieName); // Salida: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ejemplo de salida: ["en", "fr", "es"]
console.log(defaultLocale); // Ejemplo de salida: "en"
console.log(cookieName); // Salida: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ejemplo de salida: ["en", "fr", "es"]
console.log(defaultLocale); // Ejemplo de salida: "en"
console.log(cookieName); // Salida: "INTLAYER_LOCALE"
```

## Notas

- Asegúrate de que todas las variables de entorno requeridas estén configuradas correctamente antes de llamar a esta función. Las variables faltantes causarán errores durante la inicialización.
- Esta función puede ser utilizada tanto en el lado del cliente como en el servidor, lo que la convierte en una herramienta versátil para gestionar configuraciones de manera unificada.

## Uso en Aplicaciones

La función `getConfiguration` es una utilidad fundamental para inicializar y gestionar la configuración de una aplicación `intlayer`. Al proporcionar acceso a configuraciones como locales, middleware y directorios de contenido, asegura consistencia y escalabilidad en aplicaciones multilingües y orientadas al contenido.
