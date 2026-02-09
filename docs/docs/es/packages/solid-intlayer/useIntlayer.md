---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del hook useIntlayer | solid-intlayer
description: Muestra cómo usar el hook useIntlayer del paquete solid-intlayer
keywords:
  - useIntlayer
  - diccionario
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Documentación del hook useIntlayer

El hook `useIntlayer` permite recuperar contenido localizado de un diccionario usando su clave. En Solid, este hook devuelve una función reactiva **accessor** que se actualiza siempre que cambia la locale.

## Uso

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Descripción

El hook realiza las siguientes tareas:

1. **Detección del locale**: Utiliza el locale actual del contexto `IntlayerProvider`.
2. **Inyección del diccionario**: Inyecta automáticamente el contenido del diccionario correspondiente a la clave proporcionada, usando las declaraciones optimizadas generadas por el compilador de Intlayer.
3. **Reactividad**: Devuelve un accessor de Solid (`Accessor<T>`) que se reevalúa automáticamente cuando cambia el estado global del locale.
4. **Procesamiento de traducción**: resuelve el contenido en función de la locale detectada, procesando cualquier definición `t()`, `enu()`, etc., encontrada dentro del diccionario.

## Parámetros

- **key**: La clave única del diccionario (tal como se define en tus archivos de declaración de contenido).
- **locale** (opcional): Anular la locale actual.

## Devuelve

Una función accessor (`() => Content`) que devuelve el contenido localizado.
