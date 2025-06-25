---
docName: package__express-intlayer__t
url: /doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: Documentación de la función t | express-intlayer
description: Descubre cómo usar la función t para el paquete express-intlayer
keywords:
  - t
  - traducción
  - Intlayer
  - Internacionalización
  - Documentación
  - Express
  - JavaScript
  - React
---

# Documentación: Función `t` en `express-intlayer`

La función `t` en el paquete `express-intlayer` es la utilidad principal para proporcionar respuestas localizadas en tu aplicación Express. Simplifica la internacionalización (i18n) seleccionando dinámicamente el contenido basado en el idioma preferido del usuario.

---

## Descripción General

La función `t` se utiliza para definir y recuperar traducciones para un conjunto dado de idiomas. Determina automáticamente el idioma apropiado para devolver según la configuración de la solicitud del cliente, como el encabezado `Accept-Language`. Si el idioma preferido no está disponible, recurre de manera elegante al idioma predeterminado especificado en tu configuración.

---

## Características Clave

- **Localización Dinámica**: Selecciona automáticamente la traducción más adecuada para el cliente.
- **Recurso al Idioma Predeterminado**: Recurre a un idioma predeterminado si el idioma preferido del cliente no está disponible, asegurando continuidad en la experiencia del usuario.
- **Ligero y Rápido**: Diseñado para aplicaciones de alto rendimiento, asegurando un impacto mínimo.
- **Soporte para Modo Estricto**: Impone una adherencia estricta a los idiomas declarados para un comportamiento confiable.

---

## Firma de la Función

```typescript
t(translations: Record<string, string>): string;
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de idioma (por ejemplo, `en`, `fr`, `es-MX`) y los valores son las cadenas traducidas correspondientes.

### Retorna

- Una cadena que representa el contenido en el idioma preferido del cliente.

---

## Cargando el Manejador de Solicitudes de Internacionalización

Para garantizar que la funcionalidad de internacionalización proporcionada por `express-intlayer` funcione correctamente, **debes** cargar el middleware de internacionalización al principio de tu aplicación Express. Esto habilita la función `t` y asegura un manejo adecuado de la detección de idioma y la traducción.

Coloca el middleware `app.use(intlayer())` **antes de cualquier ruta** en tu aplicación para garantizar que todas las rutas se beneficien de la internacionalización:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Cargar el manejador de solicitudes de internacionalización
app.use(intlayer());

// Define tus rutas después de cargar el middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Cargar el manejador de solicitudes de internacionalización
app.use(intlayer());

// Define tus rutas después de cargar el middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Cargar el manejador de solicitudes de internacionalización
app.use(intlayer());

// Define tus rutas después de cargar el middleware
app.get("/", (_req, res) => {
  res.send(
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
- **Contexto de Traducción**: Configura el contexto necesario para que la función `t` opere correctamente, asegurando que las traducciones se devuelvan en el idioma correcto.
- **Prevención de Errores**: Sin este middleware, el uso de la función `t` resultará en errores en tiempo de ejecución porque la información de idioma necesaria no estará disponible.

---

## Ejemplos de Uso

### Ejemplo Básico

Servir contenido localizado en diferentes idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
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

Proporcionar mensajes de error en múltiples idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Uso de Variantes de Idioma

Especificar traducciones para variantes específicas de idioma:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
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

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
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

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
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

### Mecanismo de Recurso

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

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Por ejemplo:

- Si `defaultLocale` es `Locales.CHINESE` y un cliente solicita `Locales.DUTCH`, la traducción devuelta será el valor de `Locales.CHINESE`.
- Si `defaultLocale` no está definido, la función `t` recurrirá al valor de `Locales.ENGLISH`.

---

### Aplicación del Modo Estricto

Configura la función `t` para imponer una adherencia estricta a los idiomas declarados:

| Modo        | Comportamiento                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `strict`    | Todos los idiomas declarados deben tener traducciones proporcionadas. Los idiomas faltantes generarán errores.  |
| `inclusive` | Los idiomas declarados deben tener traducciones. Los idiomas faltantes generan advertencias pero son aceptados. |
| `loose`     | Cualquier idioma existente es aceptado, incluso si no está declarado.                                           |

Ejemplo de Configuración:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Tu configuración existente
  internationalization: {
    // ... Tu configuración de internacionalización existente
    strictMode: "strict", // Aplicar modo estricto
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Tu configuración existente
  internationalization: {
    // ... Tu configuración de internacionalización existente
    strictMode: "strict", // Aplicar modo estricto
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Tu configuración existente
  internationalization: {
    // ... Tu configuración de internacionalización existente
    strictMode: "strict", // Aplicar modo estricto
  },
};

module.exports = config;
```

---

### Integración con TypeScript

La función `t` es segura en tipos cuando se utiliza con TypeScript. Define un objeto de traducciones con tipos seguros:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Errores Comunes y Solución de Problemas

| Problema                        | Causa                                          | Solución                                                              |
| ------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| La función `t` no funciona      | Middleware no cargado                          | Asegúrate de que `app.use(intlayer())` se agregue antes de las rutas. |
| Error de traducciones faltantes | Modo estricto habilitado sin todos los idiomas | Proporciona todas las traducciones requeridas.                        |

---

## Consejos para un Uso Efectivo

1. **Centraliza las Traducciones**: Usa un módulo centralizado o archivos JSON para gestionar las traducciones y mejorar el mantenimiento.
2. **Valida las Traducciones**: Asegúrate de que cada variante de idioma tenga una traducción correspondiente para evitar recurrir innecesariamente.
3. **Combina con i18n en el Frontend**: Sincroniza con la internacionalización del frontend para una experiencia de usuario fluida en toda la aplicación.
4. **Evalúa el Rendimiento**: Prueba los tiempos de respuesta de tu aplicación al agregar traducciones para asegurar un impacto mínimo.

---

## Conclusión

La función `t` es una herramienta poderosa para la internacionalización en el backend. Al usarla de manera efectiva, puedes crear una aplicación más inclusiva y amigable para usuarios globales. Para un uso avanzado y opciones de configuración detalladas, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).
