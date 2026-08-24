---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para construir una aplicación Elysia multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Traduce tu sitio web backend de Elysia usando Intlayer | Internacionalización (i18n)

`elysia-intlayer` es un potente plugin de internacionalización (i18n) para aplicaciones Elysia, diseñado para hacer que tus servicios backend sean globalmente accesibles proporcionando respuestas localizadas basadas en las preferencias del cliente.

> Ver implementación del package en GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Casos de Uso Prácticos

- **Mostrar Errores del Backend en el Idioma del Usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes front-end como toasts o modals.
- **Recuperar Contenido Multilingüe**: Para aplicaciones que obtienen contenido de una base de datos, la internacionalización asegura que puedas servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de e-commerce o sistemas de gestión de contenidos que necesitan mostrar descripciones de productos, artículos y otro contenido en el idioma preferido por el usuario.
- **Enviar Correos Electrónicos Multilingües**: Ya sea para correos transaccionales, campañas de marketing o notificaciones, enviar correos electrónicos en el idioma del destinatario puede aumentar significativamente el engagement y la efectividad.
- **Notificaciones Push Multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido del usuario puede mejorar la interacción y retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y accionables.
- **Otras Comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, tu aplicación no solo respeta las diferencias culturales sino que también se alinea mejor con las necesidades del mercado global, lo que la convierte en un paso clave para escalar tus servicios en todo el mundo.

## Primeros pasos

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Ver [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-elysia-template) en GitHub.

### Instalación

Para comenzar a usar `elysia-intlayer`, instala el paquete usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará tu entorno e instalará los paquetes requeridos. Por ejemplo:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### Configuración

Configura los ajustes de internacionalización creando un archivo `intlayer.config.ts` en la raíz de tu proyecto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Declara tu contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/index.content.json" contentDeclarationFormat="json"
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

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y que coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Configuración de la Aplicación Elysia

Configura tu aplicación Elysia para usar `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Cargar el plugin de internacionalización
  .use(intlayer())
  // Rutas
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

El plugin también inyecta un objeto `intlayer` en el contexto de la ruta. Prefierelo cuando quieras una dependencia explícita en lugar de los helpers independientes:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // Locale utilizada para esta solicitud, negociada por `Accept-Language` o leída del almacenamiento
  locale: intlayer.locale,
  greeting: intlayer.t({
    es: "Hola",
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> El contexto de la ruta expone `locale`, `defaultLocale`, `locale_storage` (locale explícitamente establecida por el cliente), `locale_detected` (locale negociada desde los headers), `t`, `getIntlayer` y `getDictionary`.

### Compatibilidad

`elysia-intlayer` es totalmente compatible con:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md)>) para aplicaciones React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md)>) para aplicaciones Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md)>) para aplicaciones Vite

También funciona sin problemas con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes de API. Puedes personalizar el middleware para detectar la locale a través de encabezados o cookies:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Otras opciones de configuración
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

De forma predeterminada, `elysia-intlayer` interpretará el encabezado `Accept-Language` para determinar el idioma preferido del cliente.

> Para más información sobre configuración y temas avanzados, visita nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Configura TypeScript

`elysia-intlayer` aprovecha las robustas capacidades de TypeScript para mejorar el proceso de internacionalización. El tipado estático de TypeScript garantiza que cada clave de traducción se contabilice, reduciendo el riesgo de traducciones faltantes y mejorando la mantenibilidad.

Asegúrate de que los tipos autogenerados (por defecto en ./types/intlayer.d.ts) estén incluidos en tu archivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones TypeScript existentes
  "include": [
    // ... Tus configuraciones TypeScript existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar confirmarlos en tu repositorio de Git.

Para hacer esto, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```
