---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: Editor Visual Intlayer | Edita tu contenido utilizando un editor visual
description: Descubre cómo usar el Editor Intlayer para gestionar tu sitio web multilingüe. Sigue los pasos en esta documentación en línea para configurar tu proyecto en pocos minutos.
keywords:
  - Editor
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author: aymericzip
---

# Documentación del Editor Visual de Intlayer

<iframe title="Editor Visual + CMS para tu aplicación web: Intlayer explicado" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

El Editor Visual de Intlayer es una herramienta que envolverá tu sitio web para interactuar con tus archivos de declaración de contenido utilizando un editor visual.

![Interfaz del Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

El paquete `intlayer-editor` está basado en Intlayer y está disponible para aplicaciones JavaScript, como React (Create React App), Vite + React y Next.js.

## Editor visual vs CMS

El Editor Visual de Intlayer es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios locales. Una vez que se realiza un cambio, el contenido será reemplazado en la base de código. Esto significa que la aplicación se reconstruirá y la página se recargará para mostrar el nuevo contenido.

En contraste, el [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios remotos. Una vez que se realiza un cambio, el contenido **no** impactará tu base de código. Y el sitio web mostrará automáticamente el contenido modificado.

## Integrar Intlayer en tu aplicación

Para más detalles sobre cómo integrar Intlayer, consulta la sección correspondiente a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md).

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md).

## Cómo funciona el Editor de Intlayer

El editor visual en una aplicación incluye dos cosas:

- Una aplicación frontend que mostrará tu sitio web en un iframe. Si tu sitio web utiliza Intlayer, el editor visual detectará automáticamente tu contenido y te permitirá interactuar con él. Una vez que se realice una modificación, podrás descargar tus cambios.

- Una vez que hagas clic en el botón de descarga, el editor visual enviará una solicitud al servidor para reemplazar tus archivos de declaración de contenido con el nuevo contenido (donde sea que estos archivos estén declarados en tu proyecto).

> Ten en cuenta que por ahora, el Editor de Intlayer escribirá tus archivos de declaración de contenido como archivos JSON.

## Instalación

Una vez que Intlayer esté configurado en tu proyecto, simplemente instala `intlayer-editor` como una dependencia de desarrollo:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

Con el flag `--with`, puedes iniciar el editor en paralelo con otro comando:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Configuración

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del editor:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... otras configuraciones
  editor: {
    /**
     * Requerido
     * La URL de la aplicación.
     * Esta es la URL que apunta el editor visual.
     * Ejemplo: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Por defecto es `true`. Si es `false`, el editor está inactivo y no se puede acceder.
     * Puede usarse para deshabilitar el editor en entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opcional
     * Por defecto es `8000`.
     * El puerto del servidor del editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Por defecto es "http://localhost:8000"
     * La URL del servidor del editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Usando el Editor

1. Cuando el editor esté instalado, puedes iniciarlo usando el siguiente comando:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Nota: debes ejecutar tu aplicación en paralelo.** La URL de la aplicación debe coincidir con la que configuraste en la configuración del editor (`applicationURL`).

   > **Nota que el comando se reexporta mediante el paquete `intlayer`. Puedes usar `npx intlayer editor start` en su lugar.**

2. Luego, abre la URL proporcionada. Por defecto `http://localhost:8000`.

   Puedes ver cada campo indexado por Intlayer pasando el cursor sobre tu contenido.

   ![Pasando el cursor sobre el contenido](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Si tu contenido está delineado, puedes mantenerlo presionado para mostrar el cajón de edición.

## Configuración del entorno

El editor puede configurarse para usar un archivo de entorno específico. Esto es útil cuando quieres usar el mismo archivo de configuración para desarrollo y producción.

Para usar un archivo de entorno específico, puedes usar la bandera `--env-file` o `-f` al iniciar el editor:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Ten en cuenta que el archivo de entorno debe estar ubicado en el directorio raíz de tu proyecto.

O puedes usar la bandera `--env` o `-e` para especificar el entorno:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Depuración

Si encuentras algún problema con el editor visual, verifica lo siguiente:

- Que el editor visual y la aplicación estén en ejecución.

- Que la configuración del [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) esté correctamente establecida en tu archivo de configuración de Intlayer.
  - Campos requeridos:
    - La URL de la aplicación debe coincidir con la que configuraste en la configuración del editor (`applicationURL`).

- El editor visual utiliza un iframe para mostrar tu sitio web. Asegúrate de que la Política de Seguridad de Contenidos (CSP) de tu sitio web permita la URL del CMS como `frame-ancestors` (`http://localhost:8000` por defecto). Revisa la consola del editor para detectar cualquier error.

## Preguntas frecuentes

<FAQ>

<Question title="¿Cuál es la diferencia entre el editor visual y el CMS?">

El editor visual edita diccionarios locales y escribe el cambio de vuelta en tu base de código, así que pasa por tu revisión y despliegue habituales. El [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) edita diccionarios remotos, que cambian en el sitio en ejecución sin un despliegue. El editor encaja con el contenido del que son responsables los desarrolladores; el CMS encaja con el contenido del que es responsable un equipo de marketing.

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

<Question title="¿Dónde se ejecuta el editor visual?">

En tu propia infraestructura. Carga tu aplicación en un iframe y se comunica con un servidor de editor local, así que tu contenido nunca sale de tu entorno. Eso es lo que lo hace utilizable en proyectos que no pueden enviar textos a un servicio alojado.

</Question>

<Question title="¿Los editores necesitan saber programar?">

No. Abren el sitio, hacen clic en un fragmento de texto y lo editan en su sitio. El editor resuelve qué entrada de diccionario respalda ese texto y escribe el cambio en el archivo de contenido correcto, así que un traductor no necesita encontrar el archivo ni conocer la clave.

</Question>

<Question title="¿Editar a través del editor visual cambia mis archivos fuente?">

Sí, esa es la intención. El cambio aterriza en el archivo de declaración de contenido de tu base de código, así que aparece como un diff normal que puedes revisar y confirmar, y la aplicación se reconstruye para mostrarlo.

</Question>

<Question title="El editor muestra una página en blanco o se niega a cargar mi sitio. ¿Qué debería comprobar?">

El editor muestra tu aplicación en un iframe, así que tu Content Security Policy tiene que permitir el origen del editor como `frame-ancestors`, que es `http://localhost:8000` por defecto. Confirma también que el `applicationURL` de tu configuración del editor coincide con la URL desde la que se sirve realmente tu aplicación. La consola del editor informa de ambos fallos.

</Question>

<Question title="¿Puedo usar el editor visual en producción?">

Está diseñado para desarrollo y staging, donde es aceptable una recompilación tras una edición. Para editar contenido en un sitio en vivo sin un despliegue, usa el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) y sus diccionarios remotos en su lugar.

</Question>

<Question title="¿El editor visual es gratuito?">

Sí. El editor visual forma parte del proyecto de código abierto, bajo la licencia Apache 2.0, uso comercial incluido. Solo el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) alojado es un servicio de pago, y también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
