# Cómo Funciona Intlayer

## Visión General

El rol de Intlayer es interpretar archivos de declaración de contenido en JavaScript en diccionarios.

Para esto, Intlayer pasa por varios pasos:

1. Declaración de archivos de contenido

   - Los archivos de contenido pueden definirse en varios formatos, como TypeScript, ECMAScript, CommonJS o JSON.
   - Los archivos de contenido pueden definirse en cualquier lugar del proyecto, lo que permite una mejor mantenimiento y escalabilidad. Es importante respetar las convenciones de extensión de archivo para archivos de contenido. Esta extensión es por defecto `*.content.{js|cjs|mjs|ts|tsx|json}`, pero puede modificarse en el [archivo de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

2. Generación de diccionarios

   - Los diccionarios se generan a partir de archivos de contenido. Por defecto, los diccionarios de intlayer se generan en el directorio `.intlayer/dictionary` del proyecto.
   - Se pueden generar dos tipos de diccionarios: diccionarios de intlayer y diccionarios i18n (beta).

3. Generación de tipos de diccionario

   - Los tipos de diccionario se generan a partir de diccionarios de intlayer. Por defecto, los tipos de diccionario de intlayer se generan en el directorio `.intlayer/types` del proyecto.

4. Generación de la ampliación de módulo de Intlayer

   - La [ampliación de módulo](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) de Intlayer es una característica de TypeScript que permite definir tipos adicionales para Intlayer. Esto facilita la experiencia de desarrollo al sugerir argumentos disponibles o requeridos.
     Entre los tipos generados, los tipos de diccionario de intlayer o incluso tipos de configuración de idioma se añaden al archivo `types/intlayer.d.ts`, y son utilizados por otros paquetes. Para hacer esto, es necesario que el archivo `tsconfig.json` esté configurado para incluir el directorio `.intlayer/types` del proyecto.

5. Monitoreo de archivos de contenido

   - Los archivos de contenido se monitorean para ser regenerados cada vez que son modificados.

6. Interpretación de diccionarios
   - Finalmente, los diccionarios se interpretan para ser utilizados en aplicaciones.

## Paquetes

Intlayer está compuesto por varios paquetes, cada uno con un rol específico en el proceso de traducción. Aquí hay una representación gráfica de la estructura de este paquete:

![paquetes de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

El paquete `intlayer` se utiliza en aplicaciones para declarar contenido en archivos de contenido.

### react-intlayer

El paquete `react-intlayer` se utiliza para interpretar diccionarios de intlayer y hacerlos utilizables en aplicaciones React.

### next-intlayer

El paquete `next-intlayer` se utiliza como una capa sobre `react-intlayer` para hacer diccionarios de intlayer utilizables en aplicaciones Next.js. Integra características esenciales para hacer que Intlayer funcione en un entorno Next.js, como middleware de traducción, enrutamiento o la configuración del archivo `next.config.js`.

### intlayer-editor

El paquete `intlayer-editor` se utiliza para permitir el uso del editor visual. Este paquete, opcional, se puede instalar en aplicaciones y será utilizado por el paquete `react-intlayer`.
Consta de dos partes: el servidor y el cliente.

El cliente contiene elementos de UI que serán utilizados por `react-intlayer`.

El servidor, basado en Express, se utiliza para recibir las solicitudes visuales del editor y gestionar o modificar archivos de contenido.

### intlayer-cli

El paquete `intlayer-cli` se puede utilizar para generar diccionarios utilizando el comando `npx intlayer build`. Si `intlayer` ya está instalado, el cli se instala automáticamente y este paquete no es necesario.

### @intlayer/core

El paquete `@intlayer/core` es el paquete maestro de Intlayer. Contiene funciones de gestión de traducción y diccionario. `@intlayer/core` es multiplataforma y es utilizado por otros paquetes para realizar la interpretación de diccionarios.

### @intlayer/config

El paquete `@intlayer/config` se utiliza para configurar la configuración de Intlayer, como idiomas disponibles, parámetros de middleware de Next.js o configuraciones del editor integrado.

### @intlayer/webpack

El paquete `@intlayer/webpack` se utiliza para añadir complementos de compilación a Next.js y React.

### @intlayer/cli

El paquete `@intlayer/cli` se utiliza para asegurar la uniformidad de todos los comandos CLI de intlayer.

### @intlayer/dictionaries-entry

El paquete `@intlayer/dictionaries-entry` es un paquete que solo devuelve la ruta de entrada de los diccionarios de intlayer. Dado que la búsqueda en el sistema de archivos es imposible desde el navegador, utilizar agrupadores como Webpack o Rollup para recuperar la ruta de entrada de los diccionarios no es posible. Este paquete tiene como objetivo ser alias.

### @intlayer/chokidar

El paquete `@intlayer/chokidar` se utiliza para monitorear archivos de contenido y regenerar el diccionario modificado en cada modificación.
