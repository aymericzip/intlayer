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

## Recursos Adicionales

- **Editor Visual de Intlayer**: Para una experiencia de gestión de contenido más intuitiva, consulta la documentación del editor visual [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

Esta sección se enfoca específicamente en la integración del hook `useIntlayer` en aplicaciones React, simplificando el proceso de localización y asegurando la consistencia del contenido en diferentes locales.
