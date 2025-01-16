# intlayer-editor: Paquete NPM para usar el editor visual de Intlayer

**Intlayer** es un conjunto de paquetes diseñado específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React, y Express.js.

El paquete **`intlayer-editor`** es un paquete NPM que integra el editor visual de Intlayer en tu proyecto de React.

## Cómo Funciona el Editor de Intlayer

El editor de intlayer permite interactuar con el diccionario distante de Intlayer. Se puede instalar en el lado del cliente y transformar tu aplicación en un editor similar a un CMS para gestionar el contenido de tu sitio en todos los idiomas configurados.

![Interfaz del Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/assets/intlayer_editor_ui.png)

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### Configuración

En tu archivo de configuración de Intlayer, puedes personalizar la configuración del editor:

```typescript
const config: IntlayerConfig = {
  // ... otras configuraciones
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si es falso, el editor está inactivo y no se puede acceder.
    // El ID del cliente y el secreto del cliente son necesarios para habilitar el editor.
    // Permiten identificar al usuario que está editando el contenido.
    // Se pueden obtener creando un nuevo cliente en el panel de control de Intlayer - Proyectos (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Si no tienes un ID de cliente y un secreto de cliente, puedes obtenerlos creando un nuevo cliente en el [Panel de Control de Intlayer - Proyectos](https://intlayer.org/dashboard/projects).

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md)

El paquete `intlayer-editor` está basado en Intlayer y está disponible para aplicaciones de JavaScript, como React (Create React App), Vite + React y Next.js.

Para más detalles sobre cómo instalar el paquete, consulta la sección relevante a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md)

### Ejemplo de integración

Para integrar el editor visual de Intlayer en tu proyecto de React, sigue estos pasos:

- Importa el componente del editor de Intlayer en tu aplicación de React:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* Tu contenido de App aquí */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Importa los estilos del editor de Intlayer en tu aplicación de Next.js:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## Usando el Editor

Cuando el editor está instalado, habilitado y iniciado, puedes ver cada campo indexado por Intlayer pasando el cursor sobre tu contenido.

![Pasando el cursor sobre el contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/assets/intlayer_editor_hover_content.png)

Si tu contenido está resaltado, puedes presionar prolongadamente para mostrar el panel de edición.
