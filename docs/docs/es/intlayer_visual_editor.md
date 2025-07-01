---
createdAt: 2024-08-11
updatedAt: 2025-06-29
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
---

# Documentación del Editor Visual de Intlayer

<iframe title="Editor Visual + CMS para tu aplicación web: Intlayer explicado" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

El Editor Visual de Intlayer es una herramienta que envolverá tu sitio web para interactuar con tus archivos de declaración de contenido utilizando un editor visual.

![Interfaz del Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

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

## Configuración

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
     * Puede ser usado para deshabilitar el editor en entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opcional
     * Por defecto es `8000`.
     * El puerto usado por el servidor del editor visual.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Por defecto es "http://localhost:8000"
     * La URL del servidor del editor para acceder desde la aplicación. Usado para restringir los orígenes que pueden interactuar con la aplicación por razones de seguridad. Si se establece como `'*'`, el editor es accesible desde cualquier origen. Debe configurarse si el puerto cambia o si el editor se aloja en un dominio diferente.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otras configuraciones
  editor: {
    /**
     * Requerido
     * La URL de la aplicación.
     * Esta es la URL que apunta el editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
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
    /**
     * Opcional
     * Por defecto es `true`. Si es `false`, el editor está inactivo y no se puede acceder.
     * Puede usarse para deshabilitar el editor en entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
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

- El editor visual y la aplicación están en ejecución.

- La configuración del [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) está correctamente establecida en tu archivo de configuración de Intlayer.

  - Campos requeridos: - La URL de la aplicación debe coincidir con la que configuraste en la configuración del editor (`applicationURL`).
    bash packageManager="npm"
    npx intlayer-editor start -e development

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

- El editor visual utiliza un iframe para mostrar tu sitio web. Asegúrate de que la Política de Seguridad de Contenidos (CSP) de tu sitio web permita la URL del CMS como `frame-ancestors` ('http://localhost:8000' por defecto). Revisa la consola del editor para detectar cualquier error.

## Historial de la documentación

- 5.5.10 - 2025-06-29: Historial inicial
