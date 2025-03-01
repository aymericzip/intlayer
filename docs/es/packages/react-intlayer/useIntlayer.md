# Integración con React: Documentación del Hook `useIntlayer`

Esta sección proporciona una guía detallada sobre cómo usar el hook `useIntlayer` dentro de aplicaciones React, permitiendo una localización de contenido eficiente.

## Importando `useIntlayer` en React

El hook `useIntlayer` puede integrarse en aplicaciones React importándolo según el contexto:

- **Componente Cliente:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Usado en componentes React del lado del cliente
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Usado en componentes React del lado del cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Usado en componentes React del lado del cliente
  ```

- **Componente Servidor:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Usado en componentes React del lado del servidor
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Usado en componentes React del lado del servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Usado en componentes React del lado del servidor
  ```

## Parámetros

El hook acepta dos parámetros:

1. **`key`**: La clave del diccionario para recuperar contenido localizado.
2. **`locale`** (opcional): La localización deseada. Por defecto, utiliza la localización del contexto si no se especifica.

## Diccionario

Todas las claves del diccionario deben declararse dentro de los archivos de declaración de contenido para mejorar la seguridad de tipos y evitar errores. Puedes encontrar las instrucciones de configuración [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).

## Ejemplo de Uso en React

Demostración del uso del hook `useIntlayer` dentro de un componente React:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

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

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

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

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

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

## Manejo de Atributos

Al localizar atributos, accede a los valores de contenido de manera adecuada:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Recursos Adicionales

- **Editor Visual de Intlayer**: Para una experiencia de gestión de contenido más intuitiva, consulta la documentación del editor visual [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md).

Esta sección se centra específicamente en la integración del hook `useIntlayer` en aplicaciones React, simplificando el proceso de localización y asegurando la consistencia del contenido en diferentes localizaciones.
