---
createdAt: 2024-08-12
updatedAt: 2026-08-30
title: Cómo funciona Intlayer
description: Aprenda cómo funciona Intlayer internamente. Comprenda la arquitectura y los componentes que hacen que Intlayer sea potente.
keywords:
  - Intlayer
  - Cómo funciona
  - Arquitectura
  - Componentes
  - Funcionamiento interno
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author: aymericzip
---

# Cómo funciona Intlayer

## Tabla de contenidos

<TOC/>

## Resumen

La idea principal detrás de Intlayer es adoptar una gestión de contenido por componente. Entonces, la idea detrás de Intlayer es permitirte declarar tu contenido en cualquier lugar de tu base de código, como en el mismo directorio que tu componente.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Para ello, el papel de Intlayer es encontrar todos tus `archivos de declaración de contenido`, en todos los formatos diferentes presentes en tu proyecto, y luego generará los `diccionarios` a partir de ellos.

Por lo tanto, hay dos pasos principales:

- Paso de construcción
- Paso de interpretación

### Paso de construcción de diccionarios

El paso de construcción se puede realizar de tres maneras:

- usando la CLI con `npx intlayer build`
- usando [extensión de vscode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)
- usando los plugins de la aplicación como el paquete [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md), o sus equivalentes para [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md). Cuando usas uno de estos plugins, Intlayer construirá automáticamente tus diccionarios cuando inicies (dev) o construyas (prod) tu aplicación.

1. Declaración de archivos de contenido
   - Los archivos de contenido pueden definirse en varios formatos, como TypeScript, ECMAScript, CommonJS o JSON.
   - Los archivos de contenido pueden definirse en cualquier lugar del proyecto, lo que permite un mejor mantenimiento y escalabilidad. Es importante respetar las convenciones de extensión de archivo para los archivos de contenido. Esta extensión es por defecto `*.content.{js|cjs|mjs|ts|tsx|json}`, pero puede modificarse en el [archivo de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

2. Generación de `diccionarios`
   - Los diccionarios se generan a partir de los archivos de contenido. Por defecto, los diccionarios de Intlayer se generan en el directorio `.intlayer/dictionaries` del proyecto.
   - Esos diccionarios se generan en diferentes formatos para satisfacer todas las necesidades y optimizar el rendimiento de la aplicación.

3. Generación de tipos de diccionario

Basado en tus `diccionarios`, Intlayer generará tipos para hacerlos utilizables en tu aplicación.

- Los tipos de diccionario se generan a partir de los `archivos de declaración de contenido` de Intlayer. Por defecto, los tipos de diccionario de Intlayer se generan en el directorio `.intlayer/types` del proyecto.

- La [ampliación de módulos](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) de Intlayer es una característica de TypeScript que te permite definir tipos adicionales para Intlayer. Esto facilita la experiencia de desarrollo al sugerir argumentos disponibles o requeridos.
  Entre los tipos generados, los tipos de diccionario de Intlayer o incluso los tipos de configuración de idioma se añaden al archivo `types/intlayer.d.ts`, y son utilizados por otros paquetes. Para hacer esto, es necesario que el archivo `tsconfig.json` esté configurado para incluir el directorio `types` del proyecto.

### Paso de interpretación de diccionarios

Usando Intlayer, accederás a tu contenido en tu aplicación usando el hook `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Este hook gestionará la detección del idioma por ti y devolverá el contenido para el idioma actual. Usando este hook, también podrás interpretar markdown, gestionar pluralización y más.

> Para ver todas las características de Intlayer, puedes leer la [documentación de diccionarios](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

## Contenido remoto

Intlayer te permite declarar contenido localmente y luego exportarlo al CMS para que sea editable por tu equipo no técnico.

Así podrás enviar y recibir contenido del CMS a tu aplicación, de manera similar a lo que haces con Git para tu código.

Para los diccionarios externalizados que usan el CMS, Intlayer realiza una operación básica de fetch para recuperar los diccionarios remotos y los combina con los locales. Si está configurado en tu proyecto, Intlayer gestionará automáticamente la obtención del contenido desde el CMS cuando la aplicación inicie (dev) o se construya (prod).

## Editor visual

Intlayer también proporciona un editor visual para permitirte editar tu contenido de manera visual. Este [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) está disponible en el paquete externo `intlayer-editor`.

![editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- El servidor es una aplicación Express simple que escucha las solicitudes del cliente y recupera el contenido de tu aplicación, como los `dictionaries` y la configuración para hacerlo accesible en el lado del cliente.
- Por otro lado, el cliente es una aplicación React que se utiliza para interactuar con tu contenido usando una interfaz visual.

- El servidor es una aplicación simple de Express que escucha las solicitudes del cliente y recupera el contenido de tu aplicación, como los `dictionaries` y la configuración para hacerlo accesible en el lado del cliente.
- Por otro lado, el cliente es una aplicación React que se usa para interactuar con tu contenido mediante una interfaz visual.
  Cuando llamas a tu contenido usando `useIntlayer` y el editor está habilitado, automáticamente envuelve tus cadenas con un objeto Proxy llamado `IntlayerNode`. Este nodo utiliza `window.postMessage` para comunicarse con un iframe envuelto que contiene la interfaz del editor visual.  
  En el lado del editor, este escucha estos mensajes y simula una interacción real con tu contenido, permitiéndote editar el texto directamente en el contexto de tu aplicación.

## Optimización de la construcción de la aplicación

Para optimizar el tamaño del bundle de tu aplicación, Intlayer proporciona dos plugins para optimizar la construcción de tu aplicación: los plugins `@intlayer/babel` y `@intlayer/swc`.
Los plugins de Babel y SWC funcionan analizando el Árbol de Sintaxis Abstracta (AST) de tu aplicación para reemplazar las llamadas a las funciones de Intlayer con código optimizado. Este proceso hace que tu paquete final sea más ligero en producción al asegurar que solo se importen los diccionarios que realmente se usan, optimizando la división en fragmentos y reduciendo el tamaño del bundle.

Los plugins de Babel y SWC funcionan analizando el Árbol de Sintaxis Abstracta (AST) de tu aplicación para reemplazar las llamadas a funciones de Intlayer con código optimizado. Este proceso hace que tu bundle final sea más ligero en producción al garantizar que solo se importen los diccionarios que se utilizan realmente, optimizando el chunking y reduciendo el tamaño del bundle.

En modo de desarrollo, Intlayer utiliza una importación estática centralizada para los diccionarios para simplificar la experiencia de desarrollo.

Al activar la opción `importMode = "dynamic"` en la configuración `dictionary` de la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md), Intlayer usará la importación dinámica para cargar los diccionarios. Esta opción está desactivada por defecto para evitar el procesamiento asíncrono al renderizar la aplicación.

> `@intlayer/babel` está disponible por defecto en el paquete `vite-intlayer`,

> `@intlayer/swc` no está instalado por defecto en el paquete `next-intlayer` ya que los plugins SWC aún son experimentales en Next.js.

Para ver cómo configurar la construcción de tu aplicación, puedes leer la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Paquetes

Intlayer está compuesto por varios paquetes, cada uno con un rol específico en el proceso de traducción. Aquí hay una representación gráfica de la estructura de este paquete:

![paquetes de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

El paquete `intlayer` se utiliza en aplicaciones para declarar contenido en archivos de contenido.

### react-intlayer

El paquete `react-intlayer` se utiliza para interpretar los diccionarios de Intlayer y hacerlos utilizables en aplicaciones React.

### next-intlayer

El paquete `next-intlayer` se utiliza como una capa sobre `react-intlayer` para hacer que los diccionarios de Intlayer sean utilizables en aplicaciones Next.js. Integra características esenciales para que Intlayer funcione en un entorno Next.js, como middleware de traducción, enrutamiento o la configuración del archivo `next.config.js`.

### vue-intlayer

El paquete `vue-intlayer` se utiliza para interpretar los diccionarios de Intlayer y hacerlos utilizables en aplicaciones Vue.

### nuxt-intlayer

El paquete `nuxt-intlayer` es un módulo de Nuxt para hacer que los diccionarios de Intlayer sean utilizables en aplicaciones Nuxt. Integra características esenciales para que Intlayer funcione en un entorno Nuxt, como middleware de traducción, enrutamiento o la configuración del archivo `nuxt.config.js`.

### svelte-intlayer

El paquete `svelte-intlayer` se utiliza para interpretar los diccionarios de Intlayer y hacerlos utilizables en aplicaciones Svelte.

### solid-intlayer (WIP)

El paquete `solid-intlayer` se utiliza para interpretar los diccionarios de Intlayer y hacerlos utilizables en aplicaciones Solid.js.

### preact-intlayer

El paquete `preact-intlayer` se utiliza para interpretar los diccionarios de Intlayer y hacerlos utilizables en aplicaciones Preact.

### angular-intlayer (WIP)

El paquete `angular-intlayer` se utiliza para interpretar los diccionarios de Intlayer y hacerlos utilizables en aplicaciones Angular.

### express-intlayer

El paquete `express-intlayer` se utiliza para usar Intlayer en un backend de Express.js.

### react-native-intlayer

El paquete `react-native-intlayer` proporciona herramientas que integran plugins para que Intlayer funcione con el empaquetador Metro.

### lynx-intlayer

El paquete `lynx-intlayer` proporciona herramientas que integran plugins para que Intlayer funcione con el empaquetador Lynx.

### vite-intlayer

Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar redirecciones de URL.

### react-scripts-intlayer

Incluye los comandos y plugins de `react-scripts-intlayer` para integrar Intlayer con aplicaciones basadas en Create React App. Estos plugins están basados en [craco](https://craco.js.org/) e incluyen configuración adicional para el empaquetador [Webpack](https://webpack.js.org/).

### intlayer-editor

El paquete `intlayer-editor` se utiliza para permitir el uso del editor visual. Este paquete, opcional, puede instalarse en aplicaciones y será utilizado por el paquete `react-intlayer`.
Consiste en dos partes: el servidor y el cliente.

El cliente contiene elementos de interfaz de usuario que serán utilizados por `react-intlayer`.

El servidor, basado en Express, se utiliza para recibir solicitudes del editor visual y gestionar o modificar archivos de contenido.

### intlayer-cli

El paquete `intlayer-cli` puede ser utilizado para generar diccionarios usando el comando `npx intlayer dictionaries build`. Si `intlayer` ya está instalado, la CLI se instala automáticamente y este paquete no es necesario.

### @intlayer/core

El paquete `@intlayer/core` es el paquete principal de Intlayer. Contiene funciones de traducción y gestión de diccionarios. `@intlayer/core` es multiplataforma y es utilizado por otros paquetes para realizar la interpretación de diccionarios.

### @intlayer/config

El paquete `@intlayer/config` se utiliza para configurar los ajustes de Intlayer, como los idiomas disponibles, los parámetros del middleware de Next.js o los ajustes del editor integrado.

### @intlayer/webpack

El paquete `@intlayer/webpack` se utiliza para proporcionar una configuración de Webpack que permita que una aplicación basada en Webpack funcione con Intlayer. El paquete también proporciona un plugin para añadir a una aplicación existente de Webpack.

### @intlayer/cli

El paquete `@intlayer/cli` es un paquete de NPM que se utiliza para declarar los scripts relacionados con las interfaces de línea de comandos de Intlayer. Garantiza la uniformidad de todos los comandos CLI de Intlayer. Este paquete es consumido notablemente por los paquetes [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer-cli/index.md) y [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer/index.md).

### @intlayer/mcp

El paquete `@intlayer/mcp` proporciona un servidor MCP (Model Context Protocol) que ofrece asistencia para IDE potenciada por IA, adaptada al ecosistema Intlayer. Carga automáticamente la documentación e integra con la CLI de Intlayer.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Los paquetes `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` y `@intlayer/dynamic-dictionaries-entry` devuelven la ruta de entrada de los diccionarios de Intlayer. Dado que buscar en el sistema de archivos desde el navegador es imposible, no es posible usar empaquetadores como Webpack o Rollup para obtener la ruta de entrada de los diccionarios. Estos paquetes están diseñados para ser aliasados, lo que permite la optimización del empaquetado en varios empaquetadores como Vite, Webpack y Turbopack.

### @intlayer/engine

El paquete `@intlayer/engine` se utiliza para monitorizar archivos de contenido y regenerar el diccionario modificado en cada modificación.

### @intlayer/editor

El paquete `@intlayer/editor` proporciona las utilidades relacionadas con el editor de diccionarios. Incluye notablemente la API para conectar una aplicación con el editor de Intlayer, y utilidades para manipular diccionarios. Este paquete es multiplataforma.

### @intlayer/editor-react

El paquete `@intlayer/editor-react` proporciona estados, contextos, hooks y componentes para conectar una aplicación React con el editor de Intlayer.

### @intlayer/babel

El paquete `@intlayer/babel` proporciona herramientas que optimizan el empaquetado de diccionarios para aplicaciones basadas en Vite y Webpack.

### @intlayer/swc

El paquete `@intlayer/swc` proporciona herramientas que optimizan el empaquetado de diccionarios para aplicaciones Next.js.

### @intlayer/api

El paquete `@intlayer/api` es un SDK de API para interactuar con el backend.

### @intlayer/design-system

El paquete `@intlayer/design-system` se utiliza para compartir elementos de diseño entre el CMS y el editor visual.

### @intlayer/backend

El paquete `@intlayer/backend` exporta tipos de backend y eventualmente ofrecerá el backend como un paquete independiente en el futuro.

## Chatea con nuestra documentación inteligente

- [Haz tus preguntas a nuestra documentación inteligente](https://intlayer.org/es/doc/chat)

## Preguntas frecuentes

<FAQ>

<Question title="¿Cuándo se construyen los diccionarios, en tiempo de compilación o en tiempo de ejecución?">

En tiempo de compilación. El plugin del empaquetador, o `npx intlayer build`, escanea tus archivos `.content.ts`, los resuelve en diccionarios en la carpeta `.intlayer` y genera los tipos de TypeScript correspondientes. En tiempo de ejecución tus componentes solo leen el resultado, así que no se produce ningún análisis ni carga de archivos en la ruta de la solicitud.

</Question>

<Question title="¿Cuánto añade la i18n al tamaño de mi bundle?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El marcado renderizado en el servidor resuelve su contenido en el servidor, y el compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar. Los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

</Question>

<Question title="¿Puedo migrar desde `i18next`, `next-intl` o `react-i18next` sin reescribir mis componentes?">

Sí, y hay dos caminos. Puedes migrar el contenido de forma progresiva con la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md) o la [guía de migración de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md). O puedes mantener tu API actual por completo: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` y `Lingui`, pero servida por diccionarios de Intlayer, así que cambian los imports y el código de los componentes no.

</Question>

<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

</Question>

<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus archivos fuente, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. Consulta el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md).

Para una canalización totalmente automatizada, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) hace lo mismo en tiempo de compilación sobre código JSX, TSX, Vue y Svelte, generando los diccionarios en cada cambio para que no haya ninguna clave que mantener a mano. Funciona por análisis estático, así que las cadenas que solo existen en tiempo de ejecución quedan fuera de su alcance, y necesita unas pocas anotaciones para distinguir el texto visible para el usuario de la lógica de la aplicación.

</Question>

<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>

<Question title="¿Qué es la carpeta .intlayer y debería incluirla en el control de versiones?">

Es la salida generada: los diccionarios compilados y los tipos generados. Deriva de tus archivos de contenido, así que debería aparecer en `.gitignore` y reconstruirse en tu paso de build, exactamente igual que una carpeta `dist`.

</Question>

<Question title="¿Cómo se determina el idioma activo?">

De las fuentes listadas en `routing.storage`, en este orden: el prefijo de la URL cuando `routing.mode` usa uno, luego una cookie, luego la cabecera `Accept-Language` y luego tu idioma por defecto. Un idioma que el usuario elige explícitamente se conserva, de modo que sobrevive a la siguiente visita. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿Cuál es la diferencia entre los diccionarios locales y los remotos?">

Un diccionario local se declara en tu base de código y se compila con tu aplicación. Un diccionario remoto se gestiona en el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) y se resuelve en tiempo de ejecución, de modo que puede cambiar sin un despliegue. Ambos se leen a través de los mismos hooks, y el contenido remoto recurre a la declaración local cuando no está disponible.

</Question>

<Question title="¿Intlayer funciona sin TypeScript?">

Sí. Los archivos de contenido se pueden escribir en TypeScript, JavaScript, ESM, CommonJS o JSON. TypeScript es lo que desbloquea los tipos generados y el autocompletado, así que es la configuración recomendada, pero no es obligatorio.

</Question>

<Question title="¿Cómo comparten el mismo contenido el renderizado en el servidor y el renderizado en el cliente?">

El servidor resuelve el contenido de los componentes renderizados en el servidor directamente, así que no se envía ningún diccionario al cliente para ese marcado. Los componentes de cliente leen los mismos diccionarios a través del proveedor, que recibe el idioma resuelto en el servidor, de modo que el primer renderizado del cliente coincide con el HTML del servidor y no parpadea con un idioma distinto.

</Question>

<Question title="¿Cómo evita Intlayer una discrepancia de hidratación en el idioma?">

El idioma se resuelve una sola vez en el servidor y se pasa al proveedor, en lugar de detectarse de nuevo en el navegador. Como el cliente parte del mismo idioma que renderizó el servidor, el marcado coincide, que es lo que suele romperse con la detección del idioma en el lado del cliente.

</Question>

<Question title="¿Necesito reconstruir cuando añado una traducción?">

En desarrollo, no: el plugin vigila tus archivos de contenido y reconstruye los diccionarios afectados al guardar. En producción los diccionarios forman parte de la build, a menos que el contenido sea remoto, en cuyo caso el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) y la [sincronización en vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/live.md) aplican el cambio sin un despliegue.

</Question>

</FAQ>
