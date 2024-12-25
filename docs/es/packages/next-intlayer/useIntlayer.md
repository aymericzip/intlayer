# Next.js Integración: Documentación del Hook `useIntlayer`

El hook `useIntlayer` está diseñado para aplicaciones Next.js para obtener y gestionar contenido localizado de manera eficiente. Esta documentación se centrará en cómo utilizar el hook dentro de proyectos Next.js, asegurando prácticas de localización adecuadas.

## Importando `useIntlayer` en Next.js

Dependiendo de si estás trabajando en componentes del lado del cliente o del servidor en una aplicación Next.js, puedes importar el hook `useIntlayer` de la siguiente manera:

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

1. **`key`**: Un identificador de cadena para la clave del diccionario desde la que deseas recuperar contenido.
2. **`locale`** (opcional): Un locale específico para usar. Si se omite, el hook se ajusta al locale establecido en el contexto del cliente o del servidor.

## Archivos de Declaración de Contenido

Es crucial que todas las claves de contenido estén definidas dentro de archivos de declaración de contenido para prevenir errores en tiempo de ejecución y asegurar la seguridad de tipos. Este enfoque también facilita la integración con TypeScript para la validación en tiempo de compilación.

Las instrucciones para configurar archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).

## Ejemplo de Uso en Next.js

Aquí se muestra cómo puedes implementar el hook `useIntlayer` dentro de una página de Next.js para cargar dinámicamente contenido localizado según el locale actual de la aplicación:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample"; // Ejemplo del Componente del Cliente
import { ServerComponentExample } from "@components/ServerComponentExample"; // Ejemplo del Componente del Servidor
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale); // Obtener contenido de la página de inicio

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
import { ClientComponentExample } from "@components/ClientComponentExample"; // Ejemplo del Componente del Cliente
import { ServerComponentExample } from "@components/ServerComponentExample"; // Ejemplo del Componente del Servidor
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale); // Obtener contenido de la página de inicio

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
} = require("@components/ClientComponentExample"); // Ejemplo del Componente del Cliente
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample"); // Ejemplo del Componente del Servidor
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale); // Obtener contenido de la página de inicio

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
  const content = useIntlayer("component-content"); // Obtener contenido del componente

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
  const content = useIntlayer("component-content"); // Obtener contenido del componente

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
  const content = useIntlayer("component-content"); // Obtener contenido del componente

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
  const content = useIntlayer("component-content"); // Obtener contenido del componente

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
  const content = useIntlayer("component-content"); // Obtener contenido del componente

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
  const content = useIntlayer("component-content"); // Obtener contenido del componente

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Manejo de la Localización de Atributos

Para localizar atributos como `alt`, `title`, `href`, `aria-label`, etc., asegúrate de referenciar el contenido correctamente:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} /> // Localización de atributo alt
```

## Información Adicional

- **Editor Visual de Intlayer**: Aprende cómo utilizar el editor visual para una gestión de contenido más sencilla [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

Esta documentación describe el uso del hook `useIntlayer` específicamente dentro de entornos Next.js, proporcionando una solución robusta para gestionar la localización en tus aplicaciones Next.js.
