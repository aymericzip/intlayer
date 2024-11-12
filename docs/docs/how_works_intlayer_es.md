# Cómo funciona Intlayer

## Visión General

El rol de Intlayer es interpretar los archivos de declaración de contenido de JavaScript en diccionarios.

Para ello Intlayer realiza varias pasos:

1. Declaración de archivos de contenido

   - Los archivos de contenido se pueden definir en diferentes formatos, como TypeScript, ECMAScript, CommonJS o JSON.
   - Los archivos de contenido se pueden definir en cualquier lugar del proyecto, lo que permite una mejor gestión de la mantenimiento y la escalabilidad. Es importante respetar las convenciones de extensión de archivos de contenido. Esta extensión por defecto es `*.content.{js|cjs|mjs|ts|tsx|json}`, pero puede ser modificada en el [archivo de configuración](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/configuration_es.md).

2. Generación de diccionarios

   - Los diccionarios se generan a partir de los archivos de contenido. Por defecto, los diccionarios intlayer se generan en el directorio `.intlayer/dictionary` del proyecto.
   - Dos tipos de diccionarios pueden ser generados: los diccionarios intlayer y los diccionarios i18n (beta).

3. Generación de tipos de diccionarios

   - Los tipos de diccionarios se generan a partir de los diccionarios intlayer. Por defecto, los tipos de diccionarios intlayer se generan en el directorio `.intlayer/types` del proyecto.

4. Generación de la augmentación de módulos de Intlayer

   - Intlayer [augmentación de módulos](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) es una característica de TypeScript que le permite definir tipos adicionales para Intlayer. Esto facilita la experiencia de desarrollo al sugerir argumentos disponibles o requeridos.
     Entre los tipos generados, los tipos de diccionarios intlayer o incluso los tipos de configuración de idioma se agregan al archivo `types/intlayer.d.ts`, y se utilizan por otros paquetes. Para hacer esto, es necesario que el archivo `tsconfig.json` esté configurado para incluir el directorio `.intlayer/types` del proyecto.

5. Monitoreo de archivos de contenido

   - Los archivos de contenido se monitorean para ser regenerados cada vez que se modifican.

6. Interpretación de diccionarios
   - Los diccionarios finalmente se interpretan para ser usados en aplicaciones.

## Paquetes

Intlayer se compone de varios paquetes, cada uno con un rol específico en el proceso de traducción. Aquí hay una representación gráfica de la estructura de este paquete:

![paquetes de intlayer](https://github.com/intlayer-org/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

El paquete `intlayer` se utiliza en aplicaciones para declarar contenido en archivos de contenido.

### react-intlayer

El paquete `react-intlayer` se utiliza para interpretar diccionarios intlayer y hacerlos usables en aplicaciones React.

### next-intlayer

El paquete `next-intlayer` se utiliza como una capa sobre `react-intlayer` para hacer diccionarios intlayer usables en aplicaciones Next.js. Integra características esenciales para hacer Intlayer funcionar en un entorno Next.js, como middleware de traducción, rutas o la configuración del archivo `next.config.js`.

### intlayer-editor

El paquete `intlayer-editor` se utiliza para permitir el uso del editor visual. Este paquete, opcional se puede instalar en aplicaciones y se utilizará por el paquete `react-intlayer`.
Consiste en dos partes: el servidor y el cliente.

El cliente contiene elementos UI que se utilizarán por `react-intlayer`.

El servidor, basado en Express, se utiliza para recibir las solicitudes del editor visual y administrar o modificar archivos de contenido.

### intlayer-cli

El paquete `intlayer-cli` se puede utilizar para generar diccionarios utilizando el comando `npx intlayer build`. Si `intlayer` ya está instalado, el paquete de la CLI se instala automáticamente y este paquete no es necesario.

### @intlayer/core

El paquete `@intlayer/core` es el paquete maestro de Intlayer. Contiene funciones de traducción y gestión de diccionarios. `@intlayer/core` es multiplataforma y se utiliza por otros paquetes para realizar la interpretación de diccionarios.

### @intlayer/config

El paquete `@intlayer/config` se utiliza para configurar la configuración de Intlayer, como idiomas disponibles, parámetros de middleware de Next.js o la configuración del editor integrado.

### @intlayer/webpack

El paquete `@intlayer/webpack` se utiliza para agregar complementos de compilación a Next.js y React.

### @intlayer/cli

El paquete `@intlayer/cli` se utiliza para garantizar la uniformidad de todos los comandos de CLI de intlayer.

### @intlayer/dictionaries-entry

El paquete `@intlayer/dictionaries-entry` es un paquete que solo devuelve la ruta de entrada de los diccionarios intlayer. Dado que la búsqueda de sistema de archivos es imposible desde el navegador, utilizar los bundlers como Webpack o Rollup para recuperar la ruta de entrada de los diccionarios no es posible. Este paquete pretende ser aliasado.

### @intlayer/chokidar

El paquete `@intlayer/chokidar` se utiliza para monitorear los archivos de contenido y regenerar el diccionario modificado en cada modificación.
