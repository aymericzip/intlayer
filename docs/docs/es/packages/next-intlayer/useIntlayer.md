---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del Hook useIntlayer | next-intlayer
description: Vea cómo usar el hook useIntlayer para el paquete next-intlayer
keywords:
  - useIntlayer
  - diccionario
  - clave
  - Intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayer
---

# Integración con Next.js: Documentación del Hook `useIntlayer`

El hook `useIntlayer` está diseñado para aplicaciones Next.js para obtener y gestionar contenido localizado de manera eficiente. Esta documentación se centrará en cómo utilizar el hook dentro de proyectos Next.js, asegurando prácticas adecuadas de localización.

## Importando `useIntlayer` en Next.js

Dependiendo de si estás trabajando en componentes del lado del cliente o del lado del servidor en una aplicación Next.js, puedes importar el hook `useIntlayer` de la siguiente manera:

- **Componente del Cliente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Usado en componentes del lado del cliente
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Usado en componentes del lado del cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Usado en componentes del lado del cliente
  ```

- **Componente del Servidor:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Usado en componentes del lado del servidor
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Usado en componentes del lado del servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Usado en componentes del lado del servidor
  ```

## Parámetros

1. **`key`**: Un identificador de cadena para la clave del diccionario desde la cual deseas obtener contenido.
2. **`locale`** (opcional): Un locale específico para usar. Si se omite, el hook usará por defecto el locale establecido en el contexto del cliente o servidor.

## Archivos de Diccionario

Es crucial que todas las claves de contenido estén definidas dentro de archivos de declaración de contenido para evitar errores en tiempo de ejecución y garantizar la seguridad de tipos. Este enfoque también facilita la integración con TypeScript para la validación en tiempo de compilación.

Las instrucciones para configurar archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

## Ejemplo de uso en Next.js

Aquí se muestra cómo puedes implementar el hook `useIntlayer` dentro de una página de Next.js para cargar dinámicamente contenido localizado según la configuración regional actual de la aplicación:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
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

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
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

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Manejo de la Localización de Atributos

Para localizar atributos como `alt`, `title`, `href`, `aria-label`, etc., asegúrese de referenciar el contenido correctamente:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Más Información

- **Editor Visual de Intlayer**: Aprende a usar el editor visual para una gestión de contenido más sencilla [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

Esta documentación describe el uso del hook `useIntlayer` específicamente en entornos Next.js, proporcionando una solución robusta para gestionar la localización en tus aplicaciones Next.js.

## Historial de la Documentación

- 5.5.10 - 2025-06-29: Historial inicial
