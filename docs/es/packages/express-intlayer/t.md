# Documentación: Función `t` en `express-intlayer`

La función `t` en el paquete `express-intlayer` es la utilidad principal para proporcionar respuestas localizadas en tu aplicación Express. Simplifica la internacionalización (i18n) seleccionando dinámicamente el contenido basado en el idioma preferido del usuario.

---

## Descripción General

La función `t` se utiliza para definir y recuperar traducciones para un conjunto dado de idiomas. Determina automáticamente el idioma apropiado para devolver basado en la configuración de la solicitud del cliente, como el encabezado `Accept-Language`. Si el idioma preferido no está disponible, recurre de manera elegante al idioma predeterminado especificado en tu configuración.

---

## Características Clave

- **Localización Dinámica**: Selecciona automáticamente la traducción más adecuada para el cliente.
- **Recurso al Idioma Predeterminado**: Recurre a un idioma predeterminado si el idioma preferido del cliente no está disponible, asegurando continuidad en la experiencia del usuario.
- **Ligero y Rápido**: Diseñado para aplicaciones de alto rendimiento, asegurando un impacto mínimo.
- **Soporte de Modo Estricto**: Impone una adherencia estricta a los idiomas declarados para un comportamiento confiable.

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

Para garantizar que la funcionalidad de internacionalización proporcionada por `express-intlayer` funcione correctamente, **debes** cargar el middleware de internacionalización al inicio de tu aplicación Express. Esto habilita la función `t` y asegura el manejo adecuado de la detección de idioma y traducción.

Coloca el middleware `app.use(intlayer())` **antes de cualquier ruta** en tu aplicación para asegurarte de que todas las rutas se beneficien de la internacionalización:

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
- **Prevención de Errores**: Sin este middleware, usar la función `t` resultará en errores en tiempo de ejecución porque la información de idioma necesaria no estará disponible.

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

Proporcionar mensajes de error en varios idiomas:

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

### Usando Variantes de Idioma

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

## Conclusión

La función `t` es una herramienta poderosa para la internacionalización en el backend. Al usarla de manera efectiva, puedes crear una aplicación más inclusiva y amigable para usuarios globales. Para un uso avanzado y opciones de configuración detalladas, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).
