# Cómo funciona Intlayer

## Resumen

El papel de Intlayer es interpretar archivos de declaración de contenido de JavaScript en diccionarios.

Para esto, Intlayer pasa por varios pasos:

1. Declaración de archivos de contenido

   - Los archivos de contenido pueden definirse en varios formatos, como TypeScript, ECMAScript, CommonJS o JSON.
   - Los archivos de contenido pueden definirse en cualquier parte del proyecto, lo que permite una mejor mantenimiento y escalabilidad. Es importante respetar las convenciones de extensión de archivo para los archivos de contenido. Esta extensión es por defecto `*.content.{js|cjs|mjs|ts|tsx|json}`, pero se puede modificar en el [archivo de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

2. Generación de diccionarios

   - Los diccionarios se generan a partir de archivos de contenido. Por defecto, los diccionarios de intlayer se generan en el directorio `.intlayer/dictionary` del proyecto.
   - Se pueden generar dos tipos de diccionarios: diccionarios de intlayer y diccionarios i18n (beta).

3. Generación de tipos de diccionarios

   - Los tipos de diccionarios se generan a partir de los diccionarios de intlayer. Por defecto, los tipos de diccionarios de intlayer se generan en el directorio `types` del proyecto.

4. Generación de la ampliación del módulo de Intlayer

   - La [ampliación del módulo de Intlayer](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) es una característica de TypeScript que te permite definir tipos adicionales para Intlayer. Esto facilita la experiencia de desarrollo al sugerir argumentos disponibles o argumentos requeridos.
     Entre los tipos generados, se añaden tipos de diccionarios de intlayer o incluso tipos de configuración de idiomas al archivo `types/intlayer.d.ts`, que son utilizados por otros paquetes. Para hacer esto, es necesario que el archivo `tsconfig.json` esté configurado para incluir el directorio `types` del proyecto.

5. Monitoreo de archivos de contenido

   - Los archivos de contenido son monitoreados para ser regenerados cada vez que son modificados.

6. Interpretación de diccionarios
   - Finalmente, los diccionarios son interpretados para ser utilizados en aplicaciones.

## Paquetes

Intlayer está compuesto por varios paquetes, cada uno con un papel específico en el proceso de traducción. Aquí hay una representación gráfica de la estructura de este paquete:

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

El paquete `intlayer` se utiliza en aplicaciones para declarar contenido en archivos de contenido.

### react-intlayer

El paquete `react-intlayer` se utiliza para interpretar los diccionarios de intlayer y hacerlos utilizables en aplicaciones React.

### next-intlayer

El paquete `next-intlayer` se utiliza como una capa sobre `react-intlayer` para hacer utilizables los diccionarios de intlayer en aplicaciones Next.js. Integra características esenciales para hacer que Intlayer funcione en un entorno Next.js, como middleware de traducción, enrutamiento o la configuración del archivo `next.config.js`.

### vite-intlayer

Incluye el plugin de Vite para integrar Intlayer con el [compresor Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar la preferencia de idioma del usuario, gestionar cookies y manejar la redirección de URL.

### react-scripts-intlayer

Incluye los comandos y plugins de `react-scripts-intlayer` para integrar Intlayer con la aplicación basada en Create React App. Estos plugins se basan en [craco](https://craco.js.org/) e incluyen configuración adicional para el [compresor Webpack](https://webpack.js.org/).

### intlayer-editor

El paquete `intlayer-editor` se utiliza para permitir el uso del editor visual. Este paquete, opcional, puede instalarse en aplicaciones y será utilizado por el paquete `react-intlayer`. Consiste en dos partes: el servidor y el cliente.

El cliente contiene elementos de UI que serán utilizados por `react-intlayer`.

El servidor, basado en Express, se utiliza para recibir las solicitudes visuales del editor y gestionar o modificar archivos de contenido.

### intlayer-cli

El paquete `intlayer-cli` puede ser utilizado para generar diccionarios utilizando el comando `npx intlayer build`. Si `intlayer` ya está instalado, el cli se instala automáticamente y este paquete no es necesario.

### @intlayer/core

El paquete `@intlayer/core` es el paquete maestro de Intlayer. Contiene funciones de traducción y gestión de diccionarios. `@intlayer/core` es multiplataforma y es utilizado por otros paquetes para realizar la interpretación de diccionarios.

### @intlayer/config

El paquete `@intlayer/config` se utiliza para configurar los ajustes de Intlayer, como los idiomas disponibles, parámetros de middleware de Next.js o la configuración del editor integrado.

### @intlayer/webpack

El paquete `@intlayer/webpack` se utiliza para proporcionar una configuración de Webpack para trabajar con una aplicación basada en Webpack con Intlayer. El paquete también proporciona un plugin para agregar a una aplicación Webpack existente.

### @intlayer/cli

El paquete `@intlayer/cli` es un paquete NPM que se utiliza para declarar el script relacionado con las interfaces de línea de comandos de intlayer. Asegura la uniformidad de todos los comandos CLI de intlayer. Este paquete es consumido notablemente por los paquetes de [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer-cli/index.md) y [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer/index.md).

### @intlayer/dictionaries-entry

El paquete `@intlayer/dictionaries-entry` es un paquete que solo devuelve la ruta de entrada de los diccionarios de intlayer. Dado que la búsqueda en el sistema de archivos es imposible desde el navegador, utilizar compresores como Webpack o Rollup para recuperar la ruta de entrada de los diccionarios no es posible. Este paquete está diseñado para ser alias.

### @intlayer/chokidar

El paquete `@intlayer/chokidar` se utiliza para monitorear archivos de contenido y regenerar el diccionario modificado en cada modificación.

## Chatea con nuestra documentación inteligente

- [Haz tus preguntas a nuestra documentación inteligente](https://intlayer.org/docs/chat)
