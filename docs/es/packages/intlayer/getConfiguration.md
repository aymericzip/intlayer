# Documentación: `getConfiguration` Función en `intlayer`

## Descripción:

La función `getConfiguration` recupera la configuración completa para la aplicación `intlayer` extrayendo variables de entorno. Esta función proporciona la flexibilidad de utilizar la misma configuración tanto en el lado del cliente como en el servidor, asegurando consistencia en toda la aplicación.

---

## Parámetros:

La función no toma ningún parámetro. En su lugar, utiliza variables de entorno para la configuración.

### Retornos:

- **Tipo**: `IntlayerConfig`
- **Descripción**: Un objeto que contiene la configuración completa para `intlayer`. La configuración incluye las siguientes secciones:

  - `internationalization`: Configuraciones relacionadas con los locales y el modo estricto.
  - `middleware`: Configuraciones relacionadas con la gestión de URL y cookies.
  - `content`: Configuraciones relacionadas con archivos de contenido, directorios y patrones.
  - `editor`: Configuraciones específicas del editor.

Consulte la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más detalles.

---

## Ejemplo de Uso:

### Recuperando la Configuración Completa:

```typescript
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

### Extrayendo `availableLocales` y `defaultLocale`:

La sección `internationalization` de la configuración proporciona configuraciones relacionadas con los locales como `locales` (locales disponibles) y `defaultLocale` (idioma de reserva).

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ejemplo de salida: ["en", "fr", "es"]
console.log(defaultLocale); // Ejemplo de salida: "en"
console.log(cookieName); // Salida: "INTLAYER_LOCALE"
```

## Notas:

- Asegúrese de que todas las variables de entorno requeridas estén configuradas correctamente antes de llamar a esta función. Las variables faltantes causarán errores durante la inicialización.
- Esta función se puede utilizar tanto en el lado del cliente como en el servidor, lo que la convierte en una herramienta versátil para gestionar configuraciones de manera unificada.

## Uso en Aplicaciones:

La función `getConfiguration` es una utilidad fundamental para inicializar y gestionar la configuración de una aplicación `intlayer`. Al proporcionar acceso a configuraciones como locales, middleware y directorios de contenido, asegura consistencia y escalabilidad en aplicaciones multilingües y orientadas al contenido.
