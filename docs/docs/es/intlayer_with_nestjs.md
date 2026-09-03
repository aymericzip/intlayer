---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "NestJS i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación NestJS multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Documento inicial"
---

# Traduce tu Nest backend con Intlayer | Internacionalización (i18n)

`express-intlayer` es un middleware poderoso de internacionalización (i18n) para aplicaciones Express, diseñado para hacer que tus servicios backend sean accesibles globalmente proporcionando respuestas localizadas basadas en las preferencias del cliente. Dado que NestJS está construido sobre Express, puedes integrar sin problemas `express-intlayer` en tus aplicaciones NestJS para manejar contenido multilingüe de manera efectiva.

Casos de Uso Prácticos

- **Mostrar Errores del Backend en el Idioma del Usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes front-end como toasts o modals.

- **Recuperación de Contenido Multilingüe**: Para aplicaciones que obtienen contenido de una base de datos, la internacionalización garantiza que pueda servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otro contenido en el idioma preferido por el usuario.

- **Envío de Correos Electrónicos Multilingües**: Ya sea correos transaccionales, campañas de marketing o notificaciones, enviar correos electrónicos en el idioma del destinatario puede aumentar significativamente la participación y la efectividad.

- **Notificaciones Push Multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido del usuario puede mejorar la interacción y retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y accionables.

- **Otras comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, tu aplicación no solo respeta las diferencias culturales sino que también se alinea mejor con las necesidades del mercado global, lo que la convierte en un paso clave para escalar tus servicios en todo el mundo.

## Comenzando

### Crear un nuevo proyecto NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Instalación

Para comenzar a usar `express-intlayer`, instale el paquete usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### Configurar tsconfig.json

Para usar Intlayer con TypeScript, asegúrese de que su `tsconfig.json` esté configurado para soportar módulos ES. Puede hacerlo estableciendo las opciones `module` y `moduleResolution` en `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... otras opciones
  },
}
```

### Configuración

Configure los ajustes de internacionalización creando un archivo `intlayer.config.ts` en la raíz de su proyecto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Declare Su Contenido

Cree y gestione sus declaraciones de contenido para almacenar traducciones:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulta la [documentación de declaración de contenido](/doc/concept/content).

### Configuración del Middleware de Express

Integrar el middleware `express-intlayer` en tu aplicación NestJS para manejar la internacionalización:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Aplicar a todas las rutas
  }
}
```

### Usar Traducciones en Tus Servicios o Controladores

Ahora puedes usar la función `getIntlayer` para acceder a las traducciones en tus servicios o controladores:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // Obtener saludo desde las traducciones
  }
}
```

### Compatibilidad

`express-intlayer` es totalmente compatible con:

- [`react-intlayer`](/doc/packages/react-intlayer) para aplicaciones React
- [`next-intlayer`](/doc/packages/next-intlayer) para aplicaciones Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) para aplicaciones Vite

También funciona sin problemas con cualquier solución de internacionalización en diversos entornos, incluyendo navegadores y solicitudes API. Puedes personalizar el middleware para detectar la configuración regional a través de encabezados o cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

Por defecto, `express-intlayer` interpretará el encabezado `Accept-Language` para determinar el idioma preferido del cliente.

> Para más información sobre configuración y temas avanzados, visita nuestra [documentación](/doc/concept/configuration).

### Configurar TypeScript

`express-intlayer` aprovecha las robustas capacidades de TypeScript para mejorar el proceso de internacionalización. La tipificación estática de TypeScript asegura que cada clave de traducción esté contemplada, reduciendo el riesgo de traducciones faltantes y mejorando el mantenimiento.

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que los tipos autogenerados (por defecto en ./types/intlayer.d.ts) estén incluidos en tu archivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  include: [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacer esto, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar un backend de NestJS?">

NestJS tiene `nestjs-i18n`, que es la opción común y cubre catálogos JSON o YAML con un servicio con alcance de solicitud. La alternativa es `Intlayer` mediante `express-intlayer`, que usa el mismo contenido declarado que tu frontend, está tipado frente a tus diccionarios y viene con traducción con IA y un CMS.

El motivo para internacionalizar el backend en primer lugar es que una gran parte del texto que lee un usuario nunca pasa por el frontend: mensajes de error de la API, correos transaccionales, notificaciones push, SMS y exportaciones a PDF. Estos necesitan el idioma del destinatario, resuelto por solicitud y no por sesión.

Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi servidor NestJS?">

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

Por defecto, `express-intlayer` lee la cabecera `Accept-Language` de la solicitud entrante y elige el idioma declarado más cercano, recurriendo a tu idioma por defecto. Puedes cambiar la fuente con `routing.storage`, por ejemplo una cabecera personalizada o una cookie establecida por tu frontend, de modo que la API responda en el idioma que el usuario seleccionó realmente en lugar del que anuncia su navegador. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

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

<Question title="¿Puedo inyectar traducciones en un servicio o controlador de NestJS?">

Sí. Llama a `getIntlayer("app")` dentro del servicio o el controlador, como se muestra arriba. No hay ningún módulo que registrar por funcionalidad ni ningún token que inyectar, porque el idioma activo procede del contexto de la solicitud que instaló el middleware.

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

Sí, y es la configuración habitual. `express-intlayer` funciona junto a `react-intlayer`, `next-intlayer` y `vite-intlayer` sobre el mismo contenido declarado, así que una etiqueta usada tanto en una respuesta de la API como en una página se declara una sola vez. Consulta [cómo funciona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/how_works_intlayer.md).

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí, bajo la licencia Apache 2.0, uso comercial incluido. El [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) alojado es un servicio de pago opcional que también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
