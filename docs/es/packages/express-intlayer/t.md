# Documentación: `t` Función en `express-intlayer`

La función `t` en el paquete `express-intlayer` es la utilidad central para proporcionar respuestas localizadas en su aplicación Express. Simplifica la internacionalización (i18n) al seleccionar dinámicamente contenido según el idioma preferido del usuario.

---

## Resumen

La función `t` se utiliza para definir y recuperar traducciones para un conjunto dado de idiomas. Determina automáticamente el idioma apropiado para devolver según la configuración de solicitud del cliente, como el encabezado `Accept-Language`. Si el idioma preferido no está disponible, regresa suavemente a la configuración predeterminada especificada en su configuración.

---

## Características Clave

- **Localización Dinámica**: Selecciona automáticamente la traducción más apropiada para el cliente.
- **Retroceso a la Configuración Predeterminada**: Regresa a una configuración predeterminada si el idioma preferido del cliente no está disponible, asegurando continuidad en la experiencia del usuario.
- **Ligero y Rápido**: Diseñado para aplicaciones de alto rendimiento, asegurando una sobrecarga mínima.
- **Soporte para Modo Estricto**: Faz cumplir la adherencia estricta a los idiomas declarados para un comportamiento confiable.

---

## Firma de la Función

```typescript
t(translations: Record<string, string>): string;
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de idioma (por ejemplo, `en`, `fr`, `es-MX`) y los valores son las cadenas traducidas correspondientes.

### Retornos

- Una cadena que representa el contenido en el idioma preferido del cliente.

---

## Cargando el Manejador de Solicitudes de Internacionalización

Para asegurar que la funcionalidad de internacionalización proporcionada por `express-intlayer` funcione correctamente, **debe** cargar el middleware de internacionalización al principio de su aplicación Express. Esto habilita la función `t` y asegura el manejo adecuado de la detección de locales y traducción.

Coloque el middleware `app.use(intlayer())` **antes de cualquier ruta** en su aplicación para garantizar que todas las rutas se beneficien de la internacionalización:

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

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

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

### Por Qué Esto es Requerido

- **Detección de Locales**: El middleware `intlayer` procesa las solicitudes entrantes para detectar el idioma preferido del usuario basado en encabezados, cookies u otros métodos configurados.
- **Contexto de Traducción**: Configura el contexto necesario para que la función `t` opere correctamente, asegurando que las traducciones se devuelvan en el idioma correcto.
- **Prevención de Errores**: Sin este middleware, el uso de la función `t` resultará en errores de tiempo de ejecución porque la información necesaria del idioma no estará disponible.

---

## Ejemplos de Uso

### Ejemplo Básico

Sirva contenido localizado en diferentes idiomas:

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

**Solicitudes de Clientes:**

- Un cliente con `Accept-Language: fr` recibirá `Bienvenue!`.
- Un cliente con `Accept-Language: es` recibirá `¡Bienvenido!`.
- Un cliente con `Accept-Language: de` recibirá `Welcome!` (configuración predeterminada).

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

### Uso de Variantes de Locales

Especificar traducciones para variantes específicas de locales:

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

### Mecanismo de Retroceso

Si un idioma preferido no está disponible, la función `t` regresará a la configuración predeterminada definida en la configuración:

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

- Si `defaultLocale` es `Locales.CHINESE` y un cliente solicita `Locales.DUTCH`, la traducción devuelta se ajustará al valor de `Locales.CHINESE`.
- Si `defaultLocale` no está definido, la función `t` regresará al valor de `Locales.ENGLISH`.

---

### Faz de Cumplimiento del Modo Estricto

Configure la función `t` para hacer cumplir la adherencia estricta a los locales declarados:

| Modo            | Comportamiento                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| `strict`        | Todos los locales declarados deben tener traducciones proporcionadas. Los locales faltantes generarán errores. |
| `required_only` | Los locales declarados deben tener traducciones. Los faltantes generarán advertencias pero serán aceptados.    |
| `loose`         | Cualquier locale existente es aceptado, incluso si no está declarado.                                          |

Ejemplo de configuración:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Su configuración existente
  internationalization: {
    // ... Su configuración de internacionalización existente
    strictMode: "strict", // Hacer cumplir el modo estricto
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Su configuración existente
  internationalization: {
    // ... Su configuración de internacionalización existente
    strictMode: "strict", // Hacer cumplir el modo estricto
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
    strictMode: "strict", // Hacer cumplir el modo estricto
  },
};

module.exports = config;
```

---

### Integración de TypeScript

La función `t` es segura para tipos cuando se usa con TypeScript. Defina un objeto de traducciones seguro para tipos:

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

| Problema                        | Causa                                          | Solución                                                                 |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| `t` función no funciona         | Middleware no cargado                          | Asegúrese de que `app.use(intlayer())` esté agregado antes de las rutas. |
| Error de traducciones faltantes | Modo estricto habilitado sin todos los locales | Proporcione todas las traducciones requeridas.                           |

---

## Consejos para un Uso Efectivo

1. **Centralizar Traducciones**: Utilice un módulo centralizado o archivos JSON para gestionar traducciones y mejorar el mantenimiento.
2. **Validar Traducciones**: Asegúrese de que cada variante de idioma tenga una traducción correspondiente para evitar caer innecesariamente.
3. **Combinar con i18n del Frontend**: Sincronice con la internacionalización del frontend para una experiencia de usuario fluida en toda la aplicación.
4. **Medir Rendimiento**: Pruebe los tiempos de respuesta de su aplicación al agregar traducciones para asegurar un impacto mínimo.

---

## Conclusión

La función `t` es una herramienta poderosa para la internacionalización del backend. Al usarla de manera efectiva, puede crear una aplicación más inclusiva y amigable para un público global. Para un uso avanzado y opciones de configuración detalladas, consulte la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).
