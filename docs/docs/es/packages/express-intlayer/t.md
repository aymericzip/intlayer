---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Documentación de la función t | express-intlayer
description: Vea cómo usar la función t para el paquete express-intlayer
keywords:
  - t
  - traducción
  - Intlayer
  - Internacionalización
  - Documentación
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Documentación: Función `t` en `express-intlayer`

La función `t` en el paquete `express-intlayer` es la utilidad principal para proporcionar respuestas localizadas en su aplicación Express. Simplifica la internacionalización (i18n) al seleccionar dinámicamente el contenido basado en el idioma preferido del usuario.

---

## Resumen

La función `t` se utiliza para definir y recuperar traducciones para un conjunto dado de idiomas. Determina automáticamente el idioma apropiado para devolver según la configuración de la solicitud del cliente, como el encabezado `Accept-Language`. Si el idioma preferido no está disponible, recurre de manera elegante al locale predeterminado especificado en su configuración.

---

## Características clave

- **Localización dinámica**: Selecciona automáticamente la traducción más adecuada para el cliente.
- **Recurso de reserva al locale predeterminado**: Recurre a un locale predeterminado si el idioma preferido del cliente no está disponible, asegurando la continuidad en la experiencia del usuario.
- **Ligero y rápido**: Diseñado para aplicaciones de alto rendimiento, garantizando una sobrecarga mínima.
- **Soporte de modo estricto**: Hace cumplir la adhesión estricta a los locales declarados para un comportamiento confiable.

---

## Firma de la función

```typescript
t(translations: Record<string, string>): string;
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de locales (por ejemplo, `en`, `fr`, `es-MX`) y los valores son las cadenas traducidas correspondientes.

### Retorna

- Una cadena que representa el contenido en el idioma preferido del cliente.

---

## Carga del manejador de solicitudes de internacionalización

Para garantizar que la funcionalidad de internacionalización proporcionada por `express-intlayer` funcione correctamente, **debe** cargar el middleware de internacionalización al inicio de su aplicación Express. Esto habilita la función `t` y asegura el manejo adecuado de la detección de locales y la traducción.

Coloque el middleware `app.use(intlayer())` **antes de cualquier ruta** en su aplicación para asegurar que todas las rutas se beneficien de la internacionalización:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Cargar el manejador de solicitudes de internacionalización
app.use(intlayer());

// Defina sus rutas después de cargar el middleware
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

// Definir tus rutas después de cargar el middleware
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

// Definir tus rutas después de cargar el middleware
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

### Por qué es necesario

- **Detección de idioma**: El middleware `intlayer` procesa las solicitudes entrantes para detectar el idioma preferido del usuario basándose en encabezados, cookies u otros métodos configurados.
- **Contexto de traducción**: Configura el contexto necesario para que la función `t` opere correctamente, asegurando que las traducciones se devuelvan en el idioma correcto.
- **Prevención de errores**: Sin este middleware, el uso de la función `t` resultará en errores en tiempo de ejecución porque no estará disponible la información necesaria del idioma.

---

## Ejemplos de uso

### Ejemplo básico

Sirve contenido localizado en diferentes idiomas:

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

**Solicitudes del cliente:**

- Un cliente con `Accept-Language: fr` recibirá `Bienvenue!`.
- Un cliente con `Accept-Language: es` recibirá `¡Bienvenido!`.
- Un cliente con `Accept-Language: de` recibirá `Welcome!` (idioma predeterminado).

### Manejo de Errores

Proporciona mensajes de error en varios idiomas:

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

Especifica traducciones para variantes específicas de un idioma:

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

### Mecanismo de Reserva

Si una configuración regional preferida no está disponible, la función `t` recurrirá a la configuración regional predeterminada definida en la configuración:

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

- Si `defaultLocale` es `Locales.CHINESE` y un cliente solicita `Locales.DUTCH`, la traducción devuelta será por defecto el valor de `Locales.CHINESE`.
- Si `defaultLocale` no está definido, la función `t` usará como respaldo el valor de `Locales.ENGLISH`.

---

### Aplicación del Modo Estricto

Configura la función `t` para hacer cumplir la estricta adherencia a los locales declarados:

| Modo        | Comportamiento                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| `strict`    | Todos los locales declarados deben tener traducciones proporcionadas. La ausencia de locales generará errores. |
| `inclusive` | Los locales declarados deben tener traducciones. La ausencia de locales genera advertencias pero se aceptan.   |
| `loose`     | Se acepta cualquier local existente, incluso si no está declarado.                                             |

Ejemplo de configuración:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Tu configuración existente
  internationalization: {
    // ... Tu configuración existente de internacionalización
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
    // ... Su configuración de internacionalización existente
    strictMode: "strict", // Aplicar modo estricto
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Su configuración existente
  internationalization: {
    // ... Su configuración de internacionalización existente
    strictMode: "strict", // Aplicar modo estricto
  },
};

module.exports = config;
```

---

### Integración con TypeScript

La función `t` es segura en cuanto a tipos cuando se usa con TypeScript. Defina un objeto de traducciones con seguridad de tipos:

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
// Traducciones definidas con tipado seguro
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
// Traducciones definidas con tipado seguro
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

| Problema                        | Causa                                        | Solución                                                                 |
| ------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| La función `t` no funciona      | Middleware no cargado                        | Asegúrate de que `app.use(intlayer())` esté agregado antes de las rutas. |
| Error de traducciones faltantes | Modo estricto activado sin todos los locales | Proporciona todas las traducciones requeridas.                           |

---

## Consejos para un Uso Efectivo

1. **Centralizar las Traducciones**: Utilice un módulo centralizado o archivos JSON para gestionar las traducciones y mejorar el mantenimiento.
2. **Validar las Traducciones**: Asegúrese de que cada variante de idioma tenga una traducción correspondiente para evitar retrocesos innecesarios.
3. **Combinar con i18n en el Frontend**: Sincronice con la internacionalización del frontend para una experiencia de usuario fluida en toda la aplicación.
4. **Medir el Rendimiento**: Pruebe los tiempos de respuesta de su aplicación al agregar traducciones para asegurar un impacto mínimo.

---

## Conclusión

1. **Centralizar las traducciones**: Utilice un módulo centralizado o archivos JSON para gestionar las traducciones y mejorar el mantenimiento.
2. **Validar las traducciones**: Asegúrese de que cada variante de idioma tenga una traducción correspondiente para evitar recurrir innecesariamente a valores predeterminados.
3. **Combinar con i18n del frontend**: Sincronice con la internacionalización del frontend para una experiencia de usuario fluida en toda la aplicación.
4. **Medir el rendimiento**: Pruebe los tiempos de respuesta de su aplicación al agregar traducciones para garantizar un impacto mínimo.

---

## Conclusión

La función `t` es una herramienta poderosa para la internacionalización en el backend. Al usarla de manera efectiva, puede crear una aplicación más inclusiva y fácil de usar para una audiencia global. Para un uso avanzado y opciones detalladas de configuración, consulte la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).
