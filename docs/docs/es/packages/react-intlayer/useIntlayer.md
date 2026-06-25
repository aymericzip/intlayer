---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del Hook useIntlayer | react-intlayer
description: Vea cómo usar el hook useIntlayer para el paquete react-intlayer
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
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author: aymericzip
---

# Integración con React: Documentación del Hook `useIntlayer`

Esta sección proporciona una guía detallada sobre cómo usar el hook `useIntlayer` dentro de aplicaciones React, permitiendo una localización eficiente del contenido.

## Ejemplo de uso en React

Demostración del hook `useIntlayer` dentro de un componente React:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1> {/* Título del componente del servidor */}
      <p>{content.description}</p>{" "}
      {/* Descripción del componente del servidor */}
    </div>
  );
};
```

## Recursos Adicionales

- **Editor Visual de Intlayer**: Para una experiencia de gestión de contenido más intuitiva, consulta la documentación del editor visual [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

Esta sección se enfoca específicamente en la integración del hook `useIntlayer` en aplicaciones React, simplificando el proceso de localización y asegurando la consistencia del contenido en diferentes locales.
