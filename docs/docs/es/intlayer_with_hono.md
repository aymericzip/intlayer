---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: "Hono i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Hono multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Añadir comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicio del historial"
author: aymericzip
---

# Traduzca su sitio web backend Hono usando Intlayer | Internacionalización (i18n)

`hono-intlayer` es un potente middleware de internacionalización (i18n) para aplicaciones Hono, diseñado para hacer que sus servicios de backend sean accesibles globalmente al proporcionar respuestas localizadas basadas en las preferencias del cliente.

### Casos de Uso Prácticos

- **Mostrar Errores de Backend en el Idioma del Usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes front-end como toasts o modales.

- **Recuperar Contenido Multilingüe**: Para aplicaciones que extraen contenido de una base de datos, la internacionalización asegura que pueda servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otro contenido en el idioma preferido por el usuario.

- **Enviar Correos Electrónicos Multilingües**: Ya sean correos electrónicos transaccionales, campañas de marketing o notificaciones, enviar correos electrónicos en el idioma del destinatario puede aumentar significativamente el compromiso y la efectividad.

- **Notificaciones Push Multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido de un usuario puede mejorar la interacción y la retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y accionables.

- **Otras Comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando la claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, su aplicación no solo respeta las diferencias culturales, sino que también se alinea mejor con las necesidades del mercado global, lo que lo convierte en un paso clave para escalar sus servicios en todo el mundo.

## Primeros Pasos

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-hono-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Ver la [Plantilla de la Aplicación](https://github.com/aymericzip/intlayer-hono-template) en GitHub.

### Instalación

Para comenzar a usar `hono-intlayer`, instale el paquete usando npm:

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

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

### Configuración

Configure los ajustes de internacionalización creando un `intlayer.config.ts` en la raíz de su proyecto:

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

### Declare Su Contenido

Cree y gestione sus declaraciones de contenido para almacenar traducciones:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm"]}
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

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
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

> Sus declaraciones de contenido pueden definirse en cualquier lugar de su aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Configuración de la Aplicación Hono

Configure su aplicación Hono para usar `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Cargar el controlador de solicitudes de internacionalización
app.use("*", intlayer());

// Rutas
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Compatibilidad

`hono-intlayer` es totalmente compatible con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) para aplicaciones React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md) para aplicaciones Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md) para aplicaciones Vite

También funciona a la perfección con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes de API. Puede personalizar el middleware para detectar el idioma a través de encabezados o cookies:

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

Por defecto, `hono-intlayer` interpretará el encabezado `Accept-Language` para determinar el idioma preferido del cliente.

> Para más información sobre configuración y temas avanzados, visite nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Configurar TypeScript

`hono-intlayer` aprovecha las sólidas capacidades de TypeScript para mejorar el proceso de internacionalización. El tipado estático de TypeScript asegura que se tenga en cuenta cada clave de traducción, reduciendo el riesgo de falta de traducciones y mejorando la mantenibilidad.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrese de que los tipos autogenerados (por defecto en ./types/intlayer.d.ts) se incluyan en su archivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Sus configuraciones de TypeScript existentes
  "include": [
    // ... Sus configuraciones de TypeScript existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Extensión de VS Code

Para mejorar su experiencia de desarrollo con Intlayer, puede instalar la extensión oficial **Intlayer VS Code Extension**.

[Instalar desde el VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulte la [documentación de la extensión Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto le permite evitar subirlos a su repositorio de Git.

Para hacer esto, puede añadir las siguientes instrucciones a su archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar un backend de Hono?">

Hono no tiene ninguna capa de i18n propia, así que las opciones son una biblioteca genérica como `i18next` conectada manualmente a un middleware, o `Intlayer` mediante `hono-intlayer`, que registra el middleware por ti, resuelve el idioma por solicitud y comparte el mismo contenido declarado que tu frontend.

El motivo para internacionalizar el backend en primer lugar es que una gran parte del texto que lee un usuario nunca pasa por el frontend: mensajes de error de la API, correos transaccionales, notificaciones push, SMS y exportaciones a PDF. Estos necesitan el idioma del destinatario, resuelto por solicitud y no por sesión.

Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi servidor Hono?">

Muy poco. Los diccionarios se compilan con antelación y solo se incluyen los idiomas que declaras, así que no hay carga de catálogos al arrancar ni lecturas de archivos en la ruta de la solicitud. Eso importa sobre todo en despliegues serverless y edge, donde el tamaño del bundle determina el tiempo de arranque en frío. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md).

</Question>

<Question title="¿Puedo migrar desde `i18next` sin reescribir mis manejadores?">

Sí, y hay dos caminos. Puedes migrar el contenido de forma progresiva con la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md). O puedes mantener tu API actual por completo: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `i18next`, pero servida por diccionarios de Intlayer, así que cambian los imports y el código de los manejadores no.

</Question>

<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

</Question>

<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus archivos fuente, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. Consulta el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md).

En el lado del frontend del mismo proyecto, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) va más allá y genera los diccionarios en tiempo de compilación a partir de tu código JSX, TSX, Vue o Svelte, de modo que las dos mitades de la aplicación comparten una única capa de contenido sin claves mantenidas a mano.

</Question>

<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>

<Question title="¿Cómo sabe Intlayer en qué idioma responder?">

Por defecto, `hono-intlayer` lee la cabecera `Accept-Language` de la solicitud entrante y elige el idioma declarado más cercano, recurriendo a tu idioma por defecto. Puedes cambiar la fuente con `routing.storage`, por ejemplo una cabecera personalizada o una cookie establecida por tu frontend, de modo que la API responda en el idioma que el usuario seleccionó realmente en lugar del que anuncia su navegador. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿El idioma está aislado por solicitud?">

Sí. El middleware limita el idioma activo al alcance de la solicitud, así que dos solicitudes concurrentes en idiomas distintos nunca leen el idioma de la otra. Eso es lo que hace seguro llamar a `t()` y `getIntlayer()` desde un servicio sin propagar un argumento de idioma por cada función.

</Question>

<Question title="¿Cómo envío correos transaccionales en el idioma del destinatario?">

Declara el contenido del correo en un archivo de contenido como cualquier otro contenido y luego resuélvelo con `getIntlayer` para el idioma almacenado del destinatario en lugar del idioma de la solicitud. Esto importa para los trabajos y las colas, donde el idioma pertenece al registro del usuario y no hay ninguna solicitud entrante de la que leer una cabecera.

</Question>

<Question title="¿Cómo localizo los mensajes de error de la API?">

Envuelve el mensaje en `t()` en el punto donde se construye el error. El idioma activo de la solicitud lo resuelve, así que el cliente recibe un mensaje que puede mostrar directamente, y tu frontend no necesita un catálogo paralelo de códigos de error.

</Question>

<Question title="¿Funciona en entornos de ejecución edge como Cloudflare Workers, Deno o Bun?">

Hono apunta a todos ellos, e Intlayer resuelve el contenido a partir de diccionarios compilados en tiempo de compilación en lugar de leer archivos de catálogo del disco en tiempo de ejecución, que es lo que suele fallar en los entornos de ejecución edge. Mantén `dictionary.importMode` en su valor por defecto `"static"` para que el contenido se empaquete con el worker.

</Question>

<Question title="¿Cómo traduzco el contenido del backend automáticamente con IA?">

Ejecuta `npx intlayer fill`, que rellena las traducciones que faltan con el LLM de tu elección usando tu propio proveedor y tu clave de API. Añade `--git-diff` para traducir solo el contenido modificado en la rama. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Intlayer admite plurales, género y valores interpolados en el servidor?">

Sí: [formas plurales](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md), [contenido según el género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md), condiciones, [inserciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md) para valores interpolados, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md) para cuerpos de correo, y [formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) para números, fechas y monedas.

</Question>

<Question title="¿Obtengo autocompletado de TypeScript en el servidor?">

Sí. Intlayer genera los tipos de tus diccionarios en `./types/intlayer.d.ts`, así que una clave que no existe es un error de compilación en lugar de una cadena vacía en tiempo de ejecución. Ejecuta `npx intlayer test` en CI para hacer fallar la build cuando a un idioma declarado le falta contenido.

</Question>

<Question title="¿Pueden el frontend y el backend compartir el mismo contenido?">

Sí, y es la configuración habitual. `hono-intlayer` funciona junto a `react-intlayer`, `next-intlayer` y `vite-intlayer` sobre el mismo contenido declarado, así que una etiqueta usada tanto en una respuesta de la API como en una página se declara una sola vez. Consulta [cómo funciona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/how_works_intlayer.md).

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí, bajo la licencia Apache 2.0, uso comercial incluido. El [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) alojado es un servicio de pago opcional que también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
