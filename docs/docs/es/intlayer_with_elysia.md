---
createdAt: 2026-08-23
updatedAt: 2026-08-24
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
    date: 2026-08-24
    changes: "Alinea la guía con la plantilla de Elysia (tipado del contexto, setup de Bun, scripts)"
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

> Elysia está pensado para el runtime **Bun**. `elysia-intlayer` se apoya en `AsyncLocalStorage` (en lugar de la librería `cls-hooked` que usan los plugins de Intlayer basados en Node) precisamente porque Bun no implementa `async_hooks.createHook`.

### Configuración

Configura los ajustes de internacionalización creando un archivo `intlayer.config.ts` en la raíz de tu proyecto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Locale por defecto usada como fallback si no se encuentra la locale solicitada.
     */
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
      es: "Ejemplo de contenido devuelto en español",
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
        "es": "Ejemplo de contenido devuelto en español"
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
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Cargar el plugin de internacionalización
  .use(intlayer())
  // Rutas
  .get("/", ({ intlayer }) => ({
    // Locale utilizada para esta solicitud, negociada por `Accept-Language` o leída del almacenamiento
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> El plugin registra su contexto mediante un `derive` **global**, que Elysia tipa como `Partial<{ intlayer: IntlayerContext }>`. El valor siempre está presente en tiempo de ejecución para las rutas registradas después de `.use(intlayer())`, así que usa la aserción non-null (`intlayer!.locale`) — u optional chaining — para satisfacer a TypeScript en modo `strict`.

El contexto de la ruta expone:

| Propiedad         | Descripción                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `locale`          | El locale a usar para esta request; `locale_storage` tiene prioridad sobre `locale_detected`. |
| `locale_storage`  | El locale solicitado explícitamente por el cliente mediante una cookie o un header.           |
| `locale_detected` | El locale negociado a partir de los headers de la request.                                    |
| `defaultLocale`   | El locale configurado como fallback en `intlayer.config.ts`.                                  |
| `t`               | Una función de traducción.                                                                    |
| `getIntlayer`     | Una función para recuperar diccionarios por clave.                                            |
| `getDictionary`   | Una función para procesar objetos de diccionario.                                             |

Los mismos helpers también se exportan de forma standalone. Resuelven la petición actual a través de `AsyncLocalStorage`, por lo que puedes llamarlos sin desestructurar el contexto:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> El contexto de la request se libera una vez que la respuesta se ha mapeado, de modo que los helpers independientes nunca se resuelven contra una request ya finalizada. Cuando se llaman fuera de una request gestionada por el plugin, recurren al locale por defecto configurado.

### Ejecutar tu aplicación

Añade los scripts de Intlayer a tu `package.json`. `intlayer build` compila tus declaraciones de contenido en el directorio `.intlayer` y genera los tipos de TypeScript:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Luego arranca el servidor:

```bash
bun run dev
```

Prueba la negociación de locale con `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` no es estrictamente necesario antes de `bun run src/index.ts`: el plugin también prepara los diccionarios cuando arranca la aplicación Elysia. Ejecutarlo por adelantado mantiene los tipos generados sincronizados para tu editor y evita el coste del build en la primera petición.

### Compatibilidad

`elysia-intlayer` es totalmente compatible con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) para aplicaciones React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md) para aplicaciones Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md) para aplicaciones Vite

También funciona sin problemas con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes de API.

Por defecto, el plugin resuelve la locale en este orden:

1. La cookie `INTLAYER_LOCALE`.
2. El header `x-intlayer-locale`.
3. La negociación del header `Accept-Language`.

Puedes personalizar la cookie y el header usados para la detección de la locale:

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
