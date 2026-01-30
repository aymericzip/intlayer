---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - Cómo traducir tu aplicación AdonisJS – guía 2026
description: Descubre cómo hacer que tu backend de AdonisJS sea multilingüe. Sigue la documentación para internacionalizarlo (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Inicializar historial
---

# Traduce tu backend de AdonisJS usando Intlayer | Internacionalización (i18n)

`adonis-intlayer` es un potente paquete de internacionalización (i18n) para aplicaciones AdonisJS, diseñado para hacer que tus servicios de backend sean accesibles globalmente proporcionando respuestas localizadas basadas en las preferencias del cliente.

### Casos de Uso Prácticos

- **Mostrar Errores de Backend en el Idioma del Usuario**: Cuando ocurre un error, mostrar los mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes front-end como avisos (toasts) o modales.

- **Recuperar Contenido Multilingüe**: Para aplicaciones que extraen contenido de una base de datos, la internacionalización garantiza que puedas servir este contenido en varios idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otros contenidos en el idioma preferido por el usuario.

- **Enviar Correos Electrónicos Multilingües**: Ya sean correos transaccionales, campañas de marketing o NOTIFICACIONES, enviar correos electrónicos en el idioma del destinatario puede aumentar significativamente el compromiso y la efectividad.

- **Notificaciones Push Multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido del usuario puede mejorar la interacción y la retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y procesables.

- **Otras Comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, garantizando la claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, tu aplicación no solo respeta las diferencias culturales, sino que también se alinea mejor con las necesidades del mercado global, lo que lo convierte en un paso clave para escalar tus servicios en todo el mundo.

## Primeros Pasos

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Ver la [Plantilla de la Aplicación](https://github.com/aymericzip/intlayer-adonisjs-template) en GitHub.

### Instalación

Para comenzar a usar `adonis-intlayer`, instala el paquete usando npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### Configuración

Configura los ajustes de internacionalización creando un archivo `intlayer.config.ts` en la raíz de tu proyecto:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### Declara Tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación, siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src` o `./app`) y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Configuración de la Aplicación AdonisJS

Configura tu aplicación AdonisJS para usar `adonis-intlayer`.

#### Registrar el middleware

Primero, necesitas registrar el middleware `intlayer` en tu aplicación.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Define tus rutas

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Funciones

`adonis-intlayer` exporta varias funciones para manejar la internacionalización en tu aplicación:

- `t(content, locale?)`: Función de traducción básica.
- `getIntlayer(key, locale?)`: Recupera contenido por clave de tus diccionarios.
- `getDictionary(dictionary, locale?)`: Recupera contenido de un objeto de diccionario específico.
- `getLocale()`: Recupera el idioma actual del contexto de la solicitud.

#### Uso en Controladores

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        es: "Hola desde el controlador",
      })
    );
  }
}
```

### Compatibilidad

`adonis-intlayer` es totalmente compatible con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) para aplicaciones React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md) para aplicaciones Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md) para aplicaciones Vite

También funciona a la perfección con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes de API. Puedes personalizar el middleware para detectar el idioma a través de encabezados o cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Otras opciones de configuración
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

Por defecto, `adonis-intlayer` interpretará el encabezado `Accept-Language` para determinar el idioma preferido del cliente.

> Para más información sobre configuración y temas avanzados, visita nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Configurar TypeScript

`adonis-intlayer` aprovecha las potentes capacidades de TypeScript para mejorar el proceso de internacionalización. El tipado estático de TypeScript garantiza que se tenga en cuenta cada clave de traducción, reduciendo el riesgo de traducciones faltantes y mejorando la mantenibilidad.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que los tipos autogenerados (por defecto en ./types/intlayer.d.ts) estén incluidos en tu archivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones de TypeScript existentes
  "include": [
    // ... Tus configuraciones de TypeScript existentes
    ".intlayer/**/*.ts", // Incluye los tipos autogenerados
  ],
}
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/es/doc/vs-code-extension).

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar subirlos a tu repositorio de Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```
