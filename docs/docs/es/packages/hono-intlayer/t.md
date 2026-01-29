---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Documentación de la Función t | hono-intlayer
description: Vea cómo usar la función t para el paquete hono-intlayer
keywords:
  - t
  - traducción
  - Intlayer
  - Internacionalización
  - Documentación
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicio del historial
---

# Documentación: Función `t` en `hono-intlayer`

La función `t` en el paquete `hono-intlayer` es la utilidad principal para proporcionar respuestas localizadas en su aplicación Hono. Simplifica la internacionalización (i18n) al seleccionar dinámicamente el contenido basado en el idioma preferido del usuario.

---

## Descripción General

La función `t` se utiliza para definir y recuperar traducciones para un conjunto dado de idiomas. Determina automáticamente el idioma apropiado para devolver basándose en la configuración de la solicitud del cliente, como el encabezado `Accept-Language`. Si el idioma preferido no está disponible, recurre elegantemente al idioma predeterminado especificado en su configuración.

---

## Características Clave

- **Localización Dinámica**: Selecciona automáticamente la traducción más adecuada para el cliente.
- **Respaldo al Idioma Predeterminado**: Recurre a un idioma predeterminado si el idioma preferido del cliente no está disponible, asegurando la continuidad en la experiencia del usuario.
- **Ligero y Rápido**: Diseñado para aplicaciones de alto rendimiento, garantizando un impacto mínimo.
- **Soporte de Modo Estricto**: Refuerza el cumplimiento estricto de los idiomas declarados para un comportamiento confiable.

---

## Firma de la Función

```typescript
t(translations: Record<string, string>): string;
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de idioma (por ejemplo, `en`, `fr`, `es-MX`) y los valores son las cadenas traducidas correspondientes.

### Retorno

- Una cadena que representa el contenido en el idioma preferido del cliente.

---

## Carga del Controlador de Solicitudes de Internacionalización

Para asegurar que la funcionalidad de internacionalización proporcionada por `hono-intlayer` funcione correctamente, **debe** cargar el middleware de internacionalización al principio de su aplicación Hono. Esto habilita la función `t` y asegura el manejo adecuado de la detección de idioma y la traducción.

Coloque el middleware `app.use("*", intlayer())` **antes de cualquier ruta** en su aplicación para asegurar que todas las rutas se beneficien de la internacionalización:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Cargar el controlador de solicitudes de internacionalización
app.use("*", intlayer());

// Defina sus rutas después de cargar el middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Cargar el controlador de solicitudes de internacionalización
app.use("*", intlayer());

// Defina sus rutas después de cargar el middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Cargar el controlador de solicitudes de internacionalización
app.use("*", intlayer());

// Defina sus rutas después de cargar el middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Por Qué Esto es Necesario

- **Detección de Idioma**: El middleware `intlayer` procesa las solicitudes entrantes para detectar el idioma preferido del usuario basado en encabezados, cookies u otros métodos configurados.
- **Contexto de Traducción**: Configura el contexto necesario para que la función `t` funcione correctamente, asegurando que las traducciones se devuelvan en el idioma correcto.
- **Prevención de Errores**: Sin este middleware, el uso de la función `t` resultará en errores de ejecución porque la información de idioma necesaria no estará disponible.

---

## Ejemplos de Uso

### Ejemplo Básico

Servir contenido localizado en diferentes idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Solicitudes del Cliente:**

- Un cliente con `Accept-Language: fr` recibirá `Bienvenue!`.
- Un cliente con `Accept-Language: es` recibirá `¡Bienvenido!`.
- Un cliente con `Accept-Language: de` recibirá `Welcome!` (idioma predeterminado).

### Manejo de Errores

Proporcionar mensajes de error en varios idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

---

### Uso de Variantes de Idioma

Especifique traducciones para variantes específicas de idioma:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Temas Avanzados

### Mecanismo de Respaldo

Si un idioma preferido no está disponible, la función `t` recurrirá al idioma predeterminado definido en la configuración:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### Refuerzo del Modo Estricto

Configure la función `t` para reforzar el cumplimiento estricto de los idiomas declarados:

| Modo        | Comportamiento                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `strict`    | Todos los idiomas declarados deben tener traducciones proporcionadas. Los idiomas faltantes lanzarán errores.   |
| `inclusive` | Los idiomas declarados deben tener traducciones. Los idiomas faltantes activan advertencias pero son aceptados. |
| `loose`     | Cualquier idioma existente es aceptado, incluso si no está declarado.                                           |

---

### Integración con TypeScript

La función `t` es segura en cuanto a tipos cuando se usa con TypeScript. Defina un objeto de traducciones seguro:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Errores Comunes y Solución de Problemas

| Problema                        | Causa                                          | Solución                                                                 |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| La función `t` no funciona      | Middleware no cargado                          | Asegúrese de que `app.use("*", intlayer())` se añada antes de las rutas. |
| Error de traducciones faltantes | Modo estricto habilitado sin todos los idiomas | Proporcione todas las traducciones requeridas.                           |

---

## Conclusión

La función `t` es una herramienta poderosa para la internacionalización en el backend. Al usarla de manera efectiva, puede crear una aplicación más inclusiva y fácil de usar para una audiencia global. Para un uso avanzado y opciones de configuración detalladas, consulte la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
