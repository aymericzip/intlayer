# Cómo Funciona Intlayer

## Descripción General

El rol de Intlayer es interpretar archivos de declaración de contenido en JavaScript en diccionarios.

Para esto, Intlayer pasa por varios pasos:

1. Declaración de archivos de contenido

   - Los archivos de contenido pueden definirse en varios formatos, como TypeScript, ECMAScript, CommonJS o JSON.
   - Los archivos de contenido pueden definirse en cualquier lugar del proyecto, lo que permite un mejor mantenimiento y escalabilidad. Es importante respetar las convenciones de extensión de archivo para los archivos de contenido. Esta extensión es por defecto `*.content.{js|cjs|mjs|ts|tsx|json}`, pero puede modificarse en el [archivo de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

2. Generación de diccionarios

   - Los diccionarios se generan a partir de los archivos de contenido. Por defecto, los diccionarios de Intlayer se generan en el directorio `.intlayer/dictionary` del proyecto.
   - Se pueden generar dos tipos de diccionarios: diccionarios de Intlayer y diccionarios de i18n (beta).

3. Generación de tipos de diccionario

   - Los tipos de diccionario se generan a partir de los diccionarios de Intlayer. Por defecto, los tipos de diccionario de Intlayer se generan en el directorio `types` del proyecto.

4. Generación de la ampliación del módulo Intlayer

   - La [ampliación del módulo](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) de Intlayer es una característica de TypeScript que permite definir tipos adicionales para Intlayer. Esto facilita la experiencia de desarrollo al sugerir argumentos disponibles o requeridos.
     Entre los tipos generados, los tipos de diccionario de Intlayer o incluso los tipos de configuración de idioma se añaden al archivo `types/intlayer.d.ts` y son utilizados por otros paquetes. Para esto, es necesario que el archivo `tsconfig.json` esté configurado para incluir el directorio `types` del proyecto.

5. Monitoreo de archivos de contenido

   - Los archivos de contenido son monitoreados para ser regenerados cada vez que se modifican.

6. Interpretación de diccionarios
   - Finalmente, los diccionarios son interpretados para ser utilizados en aplicaciones.

## Paquetes

Intlayer está compuesto por varios paquetes, cada uno con un rol específico en el proceso de traducción. Aquí hay una representación gráfica de la estructura de este paquete:

![paquetes de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

El paquete `intlayer` se utiliza en aplicaciones para declarar contenido en archivos de contenido.

### react-intlayer

El paquete `react-intlayer` se utiliza para interpretar diccionarios de Intlayer y hacerlos utilizables en aplicaciones React.

### next-intlayer

El paquete `next-intlayer` se utiliza como una capa sobre `react-intlayer` para hacer que los diccionarios de Intlayer sean utilizables en aplicaciones Next.js. Integra características esenciales para hacer que Intlayer funcione en un entorno Next.js, como middleware de traducción, enrutamiento o la configuración del archivo `next.config.js`.

### vite-intlayer

Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar la configuración de idioma preferida del usuario, gestionar cookies y manejar la redirección de URLs.

### react-scripts-intlayer

Incluye los comandos y plugins de `react-scripts-intlayer` para integrar Intlayer con aplicaciones basadas en Create React App. Estos plugins están basados en [craco](https://craco.js.org/) e incluyen configuración adicional para el empaquetador [Webpack](https://webpack.js.org/).

### intlayer-editor

El paquete `intlayer-editor` se utiliza para permitir el uso del editor visual. Este paquete, opcional, puede instalarse en aplicaciones y será utilizado por el paquete `react-intlayer`.
Consiste en dos partes: el servidor y el cliente.

El cliente contiene elementos de interfaz de usuario que serán utilizados por `react-intlayer`.

El servidor, basado en Express, se utiliza para recibir solicitudes visuales del editor y gestionar o modificar archivos de contenido.

### intlayer-cli

El paquete `intlayer-cli` puede utilizarse para generar diccionarios usando el comando `npx intlayer build`. Si `intlayer` ya está instalado, el cli se instala automáticamente y este paquete no es necesario.

### @intlayer/core

El paquete `@intlayer/core` es el paquete maestro de Intlayer. Contiene funciones de traducción y gestión de diccionarios. `@intlayer/core` es multiplataforma y es utilizado por otros paquetes para realizar la interpretación de diccionarios.

### @intlayer/config

El paquete `@intlayer/config` se utiliza para configurar los ajustes de Intlayer, como los idiomas disponibles, los parámetros del middleware de Next.js o la configuración del editor integrado.

### @intlayer/webpack

El paquete `@intlayer/webpack` se utiliza para proporcionar una configuración de Webpack que permita trabajar con una aplicación basada en Webpack con Intlayer. El paquete también proporciona un plugin para añadir a una aplicación existente de Webpack.

### @intlayer/cli

El paquete `@intlayer/cli` es un paquete de NPM que se utiliza para declarar los scripts relacionados con las interfaces de línea de comandos de Intlayer. Garantiza la uniformidad de todos los comandos CLI de Intlayer. Este paquete es consumido notablemente por los paquetes [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer-cli/index.md) y [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer/index.md).

### @intlayer/dictionaries-entry

El paquete `@intlayer/dictionaries-entry` es un paquete que solo devuelve la ruta de entrada de los diccionarios de Intlayer. Dado que la búsqueda en el sistema de archivos es imposible desde el navegador, usar empaquetadores como Webpack o Rollup para recuperar la ruta de entrada de los diccionarios no es posible. Este paquete tiene como objetivo ser alias.

### @intlayer/chokidar

El paquete `@intlayer/chokidar` se utiliza para monitorear archivos de contenido y regenerar el diccionario modificado en cada modificación.

### @intlayer/editor

El paquete `@intlayer/editor` proporciona las utilidades relacionadas con el editor de diccionarios. Incluye notablemente la API para interconectar una aplicación con el editor de Intlayer y utilidades para manipular diccionarios. Este paquete es multiplataforma.

### @intlayer/editor-react

El paquete `@intlayer/editor-react` proporciona estados, contextos, hooks y componentes para interconectar una aplicación React con el editor de Intlayer.

## Chatea con nuestra documentación inteligente

- [Haz tus preguntas a nuestra documentación inteligente](https://intlayer.org/es/docs/chat)
