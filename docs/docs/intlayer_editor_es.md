# Documentación del Editor Intlayer

El Editor Intlayer es una herramienta que transforma tu aplicación en un editor visual. Con el Editor Intlayer, tus equipos pueden gestionar el contenido de tu sitio en todos los idiomas configurados.

![Interfaz del Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

El paquete `intlayer-editor` está basado en Intlayer y está disponible para aplicaciones JavaScript, como React (Create React App), Vite + React y Next.js.

Para más detalles sobre cómo instalar el paquete, consulta la sección correspondiente a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_es.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_es.md).

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite+react_es.md).

## Cómo Funciona el Editor Intlayer

Cada vez que realizas un cambio usando el Editor Intlayer, el servidor inserta automáticamente tus cambios en tus [archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_es.md), dondequiera que estos archivos estén declarados en tu proyecto.

De esta manera, no tienes que preocuparte por dónde está declarado el archivo o por encontrar tu clave en tu colección de diccionarios.

## Instalación

Una vez que Intlayer esté configurado en tu proyecto, simplemente instala `intlayer-editor` como una dependencia de desarrollo:

```bash
npm install intlayer-editor -D
```

```bash
yarn add intlayer-editor -D
```

```bash
pnpm add intlayer-editor -D
```

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del editor:

```typescript
const config: IntlayerConfig = {
  // ... otros ajustes de configuración
  editor: {
    enabled: process.env.NODE_ENV === "development", // Si es falso, el editor está inactivo y no se puede acceder a él.
    port: 3000, // Puerto del backend de intlayer-editor
  },
};
```

Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_es.md).

### Comenzar a Editar

Para comenzar a editar, lanza el servidor del editor usando `npx intlayer-editor start`.

También puedes crear un script personalizado en tu archivo `package.json`:

```json5
{
  scripts: {
    "start:editor": "npx intlayer-editor start",
  },
}
```

Para iniciar tanto el servidor de Next.js como el Editor Intlayer simultáneamente, puedes usar la herramienta [concurrently](https://github.com/open-cli-tools/concurrently):

```json5
{
  scripts: {
    dev: "next dev",
    "start:editor": "npx intlayer-editor start",
    "dev:all": "concurrently \"npm run dev:nextjs\" \"npm run dev:intlayer-editor\"",
  },
}
```

## Uso del Editor

Cuando el editor está instalado, habilitado e iniciado, puedes ver cada campo indexado por Intlayer al pasar el cursor sobre tu contenido.

![Pasando el cursor sobre el contenido](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si tu contenido está delineado, puedes hacer una pulsación larga para mostrar el cajón de edición.
