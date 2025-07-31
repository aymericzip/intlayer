---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - Paquete de Editor Visual de Traducción
description: Paquete de editor visual para Intlayer que proporciona una interfaz intuitiva para gestionar traducciones y edición colaborativa de contenido con asistencia de IA.
keywords:
  - intlayer
  - editor
  - visual
  - traducción
  - colaborativo
  - IA
  - NPM
  - interfaz
slugs:
  - doc
  - package
  - intlayer-editor
---

# intlayer-editor: Paquete NPM para usar el editor visual de Intlayer

**Intlayer** es una suite de paquetes diseñada específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

El paquete **`intlayer-editor`** es un paquete NPM que integra el editor visual de Intlayer en tu proyecto React.

## Cómo Funciona el Editor Intlayer

El editor intlayer permite interactuar con el diccionario remoto de Intlayer. Puede instalarse en el lado del cliente y transformar tu aplicación en un editor tipo CMS para gestionar el contenido de tu sitio en todos los idiomas configurados.

![Interfaz del Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Instalación

Instala el paquete necesario usando tu gestor de paquetes preferido:

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

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del editor:

```typescript
const config: IntlayerConfig = {
  // ... otros ajustes de configuración
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Si es falso, el editor está inactivo y no se puede acceder a él.
    // Se requieren el ID de cliente y el secreto de cliente para habilitar el editor.
    // Permiten identificar al usuario que está editando el contenido.
    // Se pueden obtener creando un nuevo cliente en el Panel de Intlayer - Proyectos (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Si no tienes un ID de cliente y un secreto de cliente, puedes obtenerlos creando un nuevo cliente en el [Panel de Intlayer - Proyectos](https://intlayer.org/dashboard/projects).

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

El paquete `intlayer-editor` está basado en Intlayer y está disponible para aplicaciones JavaScript, como React (Create React App), Vite + React y Next.js.

Para más detalles sobre cómo instalar el paquete, consulta la sección correspondiente a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)

### Ejemplo de integración

Para integrar el editor visual de Intlayer en tu proyecto React, sigue estos pasos:

- Importa el componente del editor Intlayer en tu aplicación React:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>
            {/* El contenido de tu aplicación aquí */}
          </IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Importa los estilos del editor Intlayer en tu aplicación Next.js:

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

## Uso del Editor

Cuando el editor está instalado, habilitado y en funcionamiento, puedes ver cada campo indexado por Intlayer al pasar el cursor sobre tu contenido.

![Pasar el cursor sobre el contenido](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si tu contenido está delineado, puedes mantenerlo presionado para mostrar el panel de edición.

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
