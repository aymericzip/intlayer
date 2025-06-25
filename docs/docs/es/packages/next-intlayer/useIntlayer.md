---
docName: package__next-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación del hook useIntlayer | next-intlayer
description: Descubre cómo usar el hook useIntlayer para el paquete next-intlayer
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
---

# Integración con Next.js: Documentación del Hook `useIntlayer`

El hook `useIntlayer` está diseñado para aplicaciones Next.js para obtener y gestionar contenido localizado de manera eficiente. Esta documentación se centrará en cómo utilizar el hook dentro de proyectos Next.js, asegurando prácticas adecuadas de localización.

## Importando `useIntlayer` en Next.js

Dependiendo de si estás trabajando en componentes del lado del cliente o del servidor en una aplicación Next.js, puedes importar el hook `useIntlayer` de la siguiente manera:

- **Componente Cliente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Usado en componentes del lado del cliente
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Usado en componentes del lado del cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Usado en componentes del lado del cliente
  ```

- **Componente Servidor:**

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

1. **`key`**: Un identificador de cadena para la clave del diccionario de la que deseas recuperar contenido.
2. **`locale`** (opcional): Una localización específica a usar. Si se omite, el hook utiliza por defecto la localización establecida en el contexto del cliente o servidor.

## Archivos de Diccionario

Es crucial que todas las claves de contenido estén definidas dentro de los archivos de declaración de contenido para evitar errores en tiempo de ejecución y garantizar la seguridad de tipos. Este enfoque también facilita la integración con TypeScript para la validación en tiempo de compilación.

Las instrucciones para configurar los archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).

## Ejemplo de Uso en Next.js

Aquí se muestra cómo puedes implementar el hook `useIntlayer` dentro de una página Next.js para cargar dinámicamente contenido localizado basado en la localización actual de la aplicación:

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

## Manejo de Localización de Atributos

Para localizar atributos como `alt`, `title`, `href`, `aria-label`, etc., asegúrate de referenciar el contenido correctamente:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Más Información

- **Editor Visual de Intlayer**: Aprende cómo usar el editor visual para una gestión más sencilla del contenido [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md).

Esta documentación describe el uso del hook `useIntlayer` específicamente dentro de entornos Next.js, proporcionando una solución robusta para gestionar la localización en tus aplicaciones Next.js.
