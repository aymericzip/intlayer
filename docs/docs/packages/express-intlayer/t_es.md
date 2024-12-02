# Documentación: Función `t` en `express-intlayer`

La función `t` del paquete `express-intlayer` es la herramienta principal para proporcionar respuestas localizadas en tu aplicación Express. Simplifica la internacionalización (i18n) seleccionando dinámicamente el contenido en función del idioma preferido del usuario.

---

## Resumen

La función `t` se utiliza para definir y recuperar traducciones para un conjunto de idiomas. Determina automáticamente el idioma apropiado para devolver basándose en los ajustes de la solicitud del cliente, como el encabezado `Accept-Language`. Si el idioma preferido no está disponible, recurre automáticamente al idioma predeterminado especificado en tu configuración.

---

## Características principales

- **Localización dinámica**: Selecciona automáticamente la traducción más adecuada para el cliente.
- **Recurso al idioma predeterminado**: Utiliza un idioma predeterminado si el idioma preferido del cliente no está disponible, asegurando una experiencia continua.
- **Ligero y rápido**: Diseñado para aplicaciones de alto rendimiento con un impacto mínimo.
- **Soporte para modo estricto**: Garantiza la adherencia estricta a los idiomas declarados para un comportamiento confiable.

---

## Firma de la función

```typescript
t(translations: Record<string, string>): string;
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de idioma (por ejemplo, `en`, `fr`, `es-MX`) y los valores son las cadenas traducidas correspondientes.

### Retorna

- Una cadena que representa el contenido en el idioma preferido del cliente.

---

## Carga del controlador de solicitudes de internacionalización

Para que las funcionalidades de internacionalización proporcionadas por `express-intlayer` funcionen correctamente, **debes** cargar el middleware de internacionalización al inicio de tu aplicación Express. Esto habilita la función `t` y asegura una correcta detección del idioma y la gestión de las traducciones.

### Configuración requerida del middleware

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Cargar el controlador de solicitudes de internacionalización
app.use(intlayer());
```

### Ubicación en la aplicación

Coloca el middleware `app.use(intlayer())` **antes de cualquier ruta** en tu aplicación para que todas las rutas se beneficien de la internacionalización:

```typescript
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

### ¿Por qué es necesario?

- **Detección del idioma**: El middleware `intlayer` procesa las solicitudes entrantes para detectar el idioma preferido del usuario a partir de encabezados, cookies u otros métodos configurados.
- **Contexto de traducción**: Configura el contexto necesario para que la función `t` funcione correctamente, garantizando que las traducciones se devuelvan en el idioma apropiado.
- **Prevención de errores**: Sin este middleware, el uso de la función `t` resultará en errores en tiempo de ejecución porque la información del idioma no estará disponible.

---

## Ejemplos de uso

### Ejemplo básico

Ofrecer contenido localizado en diferentes idiomas:

```typescript
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

### Manejo de errores

Proporcionar mensajes de error en varios idiomas:

```typescript
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

### Uso de variantes de idioma

Especificar traducciones para variantes específicas de idioma:

```typescript
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

## Temas avanzados

### Mecanismo de recurso

Si un idioma preferido no está disponible, la función `t` recurrirá al idioma predeterminado definido en la configuración:

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

Por ejemplo:

- Si `defaultLocale` es `Locales.CHINESE` y un cliente solicita `Locales.DUTCH`, la traducción devuelta será la de `Locales.CHINESE`.
- Si `defaultLocale` no está definido, la función `t` recurrirá al valor de `Locales.ENGLISH`.

---

### Aplicación del modo estricto

Configura la función `t` para aplicar un cumplimiento estricto a los idiomas declarados:

| Modo            | Comportamiento                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `strict`        | Todos los idiomas declarados deben tener traducciones proporcionadas. Los idiomas faltantes generan errores. |
| `required_only` | Los idiomas declarados deben tener traducciones. Los idiomas faltantes generan advertencias pero se aceptan. |
| `loose`         | Cualquier idioma existente se acepta, incluso si no está declarado.                                          |

Ejemplo de configuración:

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // Aplica el modo estricto
  },
};
```

---

### Integración con TypeScript

La función `t` es segura en cuanto a tipos cuando se usa con TypeScript. Define un objeto de traducciones con seguridad de tipos:

```typescript
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

---

### Errores comunes y solución de problemas

| Problema                        | Causa                                        | Solución                                                                 |
| ------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| La función `t` no funciona      | Middleware no cargado                        | Asegúrate de que `app.use(intlayer())` esté agregado antes de las rutas. |
| Error de traducciones faltantes | Modo estricto activado sin todos los idiomas | Proporciona todas las traducciones necesarias.                           |

---

## Consejos para un uso efectivo

1. **Centraliza las traducciones**: Usa un módulo centralizado o archivos JSON para gestionar las traducciones y mejorar su mantenibilidad.
2. **Valida las traducciones**: Asegúrate de que cada variante de idioma tenga una traducción correspondiente para evitar recurrir al idioma predeterminado innecesariamente.
3. **Combínalo con i18n frontend**: Sincroniza con la internacionalización del frontend para ofrecer una experiencia fluida al usuario.
4. **Evalúa el rendimiento**: Prueba los tiempos de respuesta de tu aplicación al agregar traducciones para limitar su impacto.

---

## Conclusión

La función `t` es una herramienta poderosa para la internacionalización en el backend. Usándola de manera efectiva, puedes crear una aplicación más inclusiva y amigable para un público global. Para un uso avanzado y opciones de configuración detalladas, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_es.md).
