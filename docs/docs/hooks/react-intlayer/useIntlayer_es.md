# Integración con React: Documentación del Hook `useIntlayer`

Esta sección proporciona una guía detallada sobre cómo utilizar el hook `useIntlayer` dentro de aplicaciones React, permitiendo una localización eficiente del contenido.

## Importar `useIntlayer` en React

El hook `useIntlayer` puede integrarse en aplicaciones React importándolo según el contexto:

- **Componente Cliente:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // Utilizado en componentes React del lado del cliente
  ```

- **Componente Servidor:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // Utilizado en componentes React del lado del servidor
  ```

## Parámetros

El hook acepta dos parámetros:

1. **`key`**: La clave del diccionario para recuperar contenido localizado.
2. **`locale`** (opcional): La localidad deseada. Por defecto, utiliza la localidad del contexto si no se especifica.

## Declaración de Contenido

Todas las claves del diccionario deben declararse dentro de archivos de declaración de contenido para mejorar la seguridad de tipo y evitar errores. Puedes encontrar las instrucciones de configuración [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md).

## Ejemplo de Uso en React

Demostración del uso del hook `useIntlayer` dentro de un componente React:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

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

## Manejo de Atributos

Cuando localices atributos, accede a los valores del contenido de manera adecuada:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Recursos Adicionales

- **Editor Visual de Intlayer**: Para una experiencia de gestión de contenido más intuitiva, consulta la documentación del editor visual [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_editor_en.md).

Esta sección se dirige específicamente a la integración del hook `useIntlayer` en aplicaciones React, simplificando el proceso de localización y asegurando la consistencia del contenido en diferentes localidades.
