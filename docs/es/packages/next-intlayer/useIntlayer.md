# Documentación del Hook `useIntlayer` para Next.js

El hook `useIntlayer` está diseñado para aplicaciones Next.js para recuperar y gestionar contenido localizado de manera eficiente. Esta documentación se centra en cómo utilizar el hook dentro de los proyectos Next.js, asegurando prácticas de localización adecuadas.

## Importar `useIntlayer` en Next.js

Dependiendo de si estás trabajando en componentes del lado del cliente o del servidor en una aplicación Next.js, puedes importar el hook `useIntlayer` de la siguiente manera:

- **Componente Cliente:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // Usado en componentes del lado del cliente
  ```

- **Componente Servidor:**

  ```javascript
  import { useIntlayer } from "next-intlayer/server"; // Usado en componentes del lado del servidor
  ```

## Parámetros

1. **`key`**: Un identificador de tipo cadena para la clave del diccionario desde la cual deseas recuperar contenido.
2. **`locale`** (opcional): Una localización específica a usar. Si se omite, el hook utiliza por defecto la localización configurada en el contexto del cliente o servidor.

## Archivos de Declaración de Contenido

Es crucial que todas las claves de contenido estén definidas en archivos de declaración de contenido para evitar errores en tiempo de ejecución y asegurar la seguridad de tipo. Este enfoque también facilita la integración de TypeScript para validación en tiempo de compilación.

Las instrucciones para configurar archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).

## Ejemplo de Uso en Next.js

Aquí te mostramos cómo puedes implementar el hook `useIntlayer` dentro de una página de Next.js para cargar dinámicamente contenido localizado basado en la localización actual de la aplicación:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  return (
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Manejo de Localización de Atributos

Para localizar atributos como `alt`, `title`, `href`, `aria-label`, etc., asegúrate de referenciar correctamente el contenido:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Información Adicional

- **Editor Visual de Intlayer**: Aprende a usar el editor visual para una gestión de contenido más fácil [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

Esta documentación describe el uso del hook `useIntlayer` específicamente dentro de entornos Next.js, proporcionando una solución robusta para gestionar la localización en tus aplicaciones Next.js.
