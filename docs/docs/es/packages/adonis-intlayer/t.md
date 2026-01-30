---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentación de la función t | adonis-intlayer
description: Vea cómo usar la función t para el paquete adonis-intlayer
keywords:
  - t
  - traducción
  - Intlayer
  - Internacionalización
  - Documentación
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentación inicial
---

# Documentación: Función `t` en `adonis-intlayer`

La función `t` en el paquete `adonis-intlayer` es la utilidad principal para proporcionar respuestas localizadas en su aplicación AdonisJS. Simplifica la internacionalización (i18n) al seleccionar dinámicamente el contenido basado en el idioma preferido del usuario.

---

## Resumen

La función `t` se utiliza para definir y recuperar traducciones para un conjunto dado de idiomas. Determina automáticamente el idioma apropiado para devolver basándose en la configuración de la solicitud del cliente, como el encabezado `Accept-Language`. Si el idioma preferido no está disponible, recurre con elegancia al locale predeterminado especificado en su configuración.

---

## Características Clave

- **Localización Dinámica**: Selecciona automáticamente la traducción más adecuada para el cliente.
- **Respaldo al Locale Predeterminado**: Recurre a un locale predeterminado si el idioma preferido del cliente no está disponible, garantizando la continuidad en la experiencia del usuario.
- **Contexto Asíncrono**: Funciona a la perfección dentro del ciclo de vida de la solicitud de AdonisJS utilizando Async Local Storage.
- **Soporte de TypeScript**: Aplique seguridad de tipos para sus traducciones.

---

## Firma de la Función

```typescript
t(translations: Record<string, any>): any;
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de locale (por ejemplo, `en`, `fr`, `es`) y los valores son el contenido traducido correspondiente.

### Retornos

- El contenido que representa el idioma preferido del cliente.

---

## Carga del Middleware

Para asegurar que la función `t` funcione correctamente, **debe** registrar el middleware `intlayer` en su aplicación AdonisJS.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Ejemplos de Uso

### Ejemplo Básico

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue !",
    es: "¡Bienvenido!",
  });
});
```

### Uso en Controladores

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour desde el controlador",
      })
    );
  }
}
```

---

## Temas Avanzados

### Mecanismo de Respaldo

Si un locale preferido no está disponible, la función `t` recurrirá al locale predeterminado definido en su archivo `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Integración con TypeScript

La función `t` es segura en cuanto a tipos cuando se utiliza con diccionarios definidos. Para más detalles, consulte la [documentación de TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).
