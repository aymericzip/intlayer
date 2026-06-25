---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Documentación de React Intlayer
description: Guía completa para usar el hook useDictionary en aplicaciones React con Intlayer para un manejo eficiente de contenido localizado sin editor visual.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localización
  - i18n
  - diccionario
  - traducción
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicio del historial"
author: aymericzip
---

# Integración en React: Documentación del Hook `useDictionary`

Esta sección proporciona una guía detallada sobre el uso del hook `useDictionary` en aplicaciones React, permitiendo un manejo eficiente del contenido localizado sin un editor visual.

## Ejemplo de uso en React

A continuación se muestra un ejemplo de cómo usar el hook `useDictionary` en un componente React:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Consejos Adicionales

- **Seguridad de Tipos**: Siempre usa `Dictionary` para definir tus diccionarios y asegurar la seguridad de tipos.
- **Actualizaciones de Localización**: Al actualizar contenido, asegúrate de que todas las locales sean consistentes para evitar traducciones faltantes.

Esta documentación se centra en la integración del hook `useDictionary`, proporcionando un enfoque simplificado para gestionar contenido localizado sin depender de funcionalidades de editores visuales.
