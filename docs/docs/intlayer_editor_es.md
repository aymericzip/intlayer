### Documentación del Editor Intlayer

El Editor Intlayer es una herramienta que transforma tu aplicación en un editor visual. Con el Editor Intlayer, tus equipos pueden gestionar el contenido de tu sitio en todos los idiomas configurados.

![Interfaz del Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

El paquete `intlayer-editor` está basado en Intlayer y está disponible para aplicaciones JavaScript, como React (Create React App), Vite + React y Next.js.

Para más detalles sobre cómo instalar el paquete, consulta la sección correspondiente a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de instalación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_es.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de instalación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_es.md).

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de instalación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite+react_es.md).

## Cómo funciona el Editor Intlayer

Cada vez que realizas un cambio con el Editor Intlayer, el servidor inserta automáticamente tus cambios en tus [archivos de declaración Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_es.md), dondequiera que estén declarados en tu proyecto.

De esta forma, no tienes que preocuparte por la ubicación de los archivos o por encontrar tu clave en tu colección de diccionarios.

## Instalación

Una vez que Intlayer esté configurado en tu proyecto, simplemente instala `intlayer-editor` como una dependencia de desarrollo:

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Configuración

### 1. Habilitar el Editor en tu archivo `intlayer.config.ts`

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del editor:

```typescript
const config: IntlayerConfig = {
  // ... otras configuraciones
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si es false, el editor está inactivo y no se puede acceder.
    // Se requiere un ID de cliente y un secreto de cliente para habilitar el editor.
    // Permiten identificar al usuario que edita el contenido.
    // Puedes obtenerlos creando un nuevo cliente en el Panel de Proyectos de Intlayer (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Si no tienes un ID de cliente y un secreto de cliente, puedes obtenerlos creando un nuevo cliente en el [Panel de Proyectos de Intlayer](https://intlayer.org/dashboard/projects).

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_es.md).

### 2. Insertar el Proveedor de Editor de Intlayer en tu aplicación

Para habilitar el editor, inserta el Proveedor de Editor de Intlayer en tu aplicación.

Ejemplo para aplicaciones React JS o Vite + React:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* Tu aplicación */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Ejemplo para aplicaciones Next.js:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>{/* Tu aplicación */}</IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. Agregar las hojas de estilo a tu aplicación

Para mostrar las hojas de estilo del editor, necesitas agregar las hojas de estilo a tu aplicación.

Si se utiliza tailwind, puedes agregar las hojas de estilo a tu archivo `tailwind.config.js`:

```js
// tailwind.config.js
import { tailwindConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindConfig],
  content: [
    ...tailwindConfig.content,
    // ... resto de tu contenido
  ],
  // ...
};
```

De lo contrario, puedes agregar la hoja de estilo de importación en tu aplicación:

```tsx
// app.tsx
import "intlayer-editor/css";
```

O

```css
/* app.css */
@import "intlayer-editor/css";
```

## Uso del Editor

Cuando el editor está instalado, habilitado e iniciado, puedes ver cada campo indexado por Intlayer al pasar el cursor sobre tu contenido.

![Resaltado del contenido](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si tu contenido está resaltado, puedes mantenerlo presionado para mostrar el panel de edición.
