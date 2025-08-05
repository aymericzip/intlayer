---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del Hook useI18n | react-intlayer
description: Aprende cómo usar el hook useI18n en el paquete react-intlayer
keywords:
  - useI18n
  - i18n
  - traducción
  - diccionario
  - Intlayer
  - internacionalización
  - documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
---

# Integración en React: Documentación del Hook `useI18n`

Esta sección proporciona una guía detallada sobre cómo usar el hook `useI18n` dentro de aplicaciones React, permitiendo una localización eficiente del contenido.

## Importando `useI18n` en React

El hook `useI18n` puede ser importado e integrado en aplicaciones React según el contexto de la siguiente manera:

- **Componentes Cliente:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Usar en componentes React del lado del cliente
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Usar en componentes React del lado del cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Usar en componentes React del lado del cliente
  ```

- **Componentes Servidor:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Usar en componentes React del lado del servidor
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Usar en componentes React del lado del servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Usar en componentes React del lado del servidor
  ```

## Parámetros

Este hook acepta dos parámetros:

1. **`namespace`**: Un espacio de nombres del diccionario para delimitar las claves de traducción.
2. **`locale`** (opcional): La configuración regional deseada. Si no se especifica, se usará la configuración regional del contexto por defecto.

## Diccionario

Todas las claves del diccionario deben declararse dentro de archivos de declaración de contenido para mejorar la seguridad de tipos y prevenir errores. [Las instrucciones de configuración se pueden encontrar aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

## Ejemplos de uso en React

Ejemplos de uso del hook `useI18n` dentro de componentes React:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostrar el título */}
      <p>{t("description")}</p> {/* Mostrar la descripción */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostrar el título */}
      <p>{t("description")}</p> {/* Mostrar la descripción */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostrar el título */}
      <p>{t("description")}</p> {/* Mostrar la descripción */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostrar el título */}
      <p>{t("description")}</p> {/* Mostrar la descripción */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostrar el título */}
      <p>{t("description")}</p> {/* Mostrar la descripción */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Manejo de Atributos

Al localizar atributos, accede a los valores de traducción de manera adecuada:

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>

<!-- Para atributos de accesibilidad (por ejemplo, aria-label), usa .value ya que se requieren cadenas puras -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Recursos Adicionales

- **Editor Visual de Intlayer**: Para una experiencia de gestión de contenido más intuitiva, consulta la documentación del editor visual [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

Esta sección cubre específicamente la integración del hook `useI18n` en aplicaciones React, simplificando el proceso de localización y asegurando la consistencia del contenido a través de diferentes locales.

## Historial de la Documentación

- 6.0.0 - 2025-06-29: Escritura inicial de la documentación del hook `useI18n`
