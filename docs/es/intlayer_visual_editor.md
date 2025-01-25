# Intlayer Visual Editor Documentation

El Editor Visual de Intlayer es una herramienta que envolverá tu sitio web para interactuar con tus archivos de declaración de contenido usando un editor visual.

![Interfaz del Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

El paquete `intlayer-editor` se basa en Intlayer y está disponible para aplicaciones JavaScript, como React (Create React App), Vite + React, y Next.js.

## Editor visual vs CMS

El editor visual de Intlayer es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios locales. Una vez que se realiza un cambio, el contenido será reemplazado en la base de código. Eso significa que la aplicación será reconstruida y la página se recargará para mostrar el nuevo contenido.

Por el contrario, el [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md) es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios distantes. Una vez que se realiza un cambio, el contenido **no** impactará tu base de código. Y el sitio web mostrará automáticamente el contenido cambiado.

## Integrar Intlayer en tu aplicación

Para más detalles sobre cómo integrar intlayer, consulta la sección relevante a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de instalación](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de instalación](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md).

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de instalación](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md).

## Cómo Funciona el Editor Intlayer

El editor visual en una aplicación que incluye dos cosas:

- Una aplicación frontend que mostrará tu sitio web dentro de un iframe. Si tu sitio web utiliza Intlayer, el editor visual detectará automáticamente tu contenido y te permitirá interactuar con él. Una vez que se realice una modificación, podrás descargar tus cambios.

- Una vez que hayas hecho clic en el botón de descarga, el editor visual enviará una solicitud al servidor para reemplazar tus archivos de declaración de contenido con el nuevo contenido (donde sea que estos archivos estén declarados en tu proyecto).

> Ten en cuenta que por ahora, el Editor Intlayer escribirá tus archivos de declaración de contenido como archivos JSON.

## Instalación

Una vez que Intlayer esté configurado en tu proyecto, simplemente instala `intlayer-editor` como una dependencia de desarrollo:

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## Configuración

### 1. Habilitar el Editor en tu archivo intlayer.config.ts

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... otros ajustes de configuración
  editor: {
    /**
     * Requerido
     * La URL de la aplicación.
     * Esta es la URL a la que se dirige el editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Por defecto `8000`.
     * El puerto del servidor del editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Por defecto "http://localhost:8000"
     * La URL del servidor del editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Opcional
     * Por defecto `true`. Si `false`, el editor está inactivo y no se puede acceder.
     * Se puede utilizar para deshabilitar el editor para entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
   /**
     * Requerido
     * La URL de la aplicación.
     * Esta es la URL a la que se dirige el editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Por defecto `8000`.
     * El puerto del servidor del editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Por defecto "http://localhost:8000"
     * La URL del servidor del editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Opcional
     * Por defecto `true`. Si `false`, el editor está inactivo y no se puede acceder.
     * Se puede utilizar para deshabilitar el editor para entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
   /**
     * Requerido
     * La URL de la aplicación.
     * Esta es la URL a la que se dirige el editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Por defecto `8000`.
     * El puerto del servidor del editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Por defecto "http://localhost:8000"
     * La URL del servidor del editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Opcional
     * Por defecto `true`. Si `false`, el editor está inactivo y no se puede acceder.
     * Se puede utilizar para deshabilitar el editor para entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## Usando el Editor

1. Cuando el editor esté instalado, puedes iniciar el editor utilizando el siguiente comando:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. Luego, abre la URL proporcionada. Por defecto `http://localhost:8000`.

   Puedes ver cada campo indexado por Intlayer al pasar el cursor sobre tu contenido.

   ![Pasando el cursor sobre el contenido](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Si tu contenido está destacado, puedes mantenerlo presionado para mostrar el panel de edición.
