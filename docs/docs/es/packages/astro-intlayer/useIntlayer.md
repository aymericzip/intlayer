---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentación del hook useIntlayer | astro-intlayer
description: Descubre cómo usar el hook useIntlayer en componentes y scripts de cliente de Astro para acceder a contenido localizado.
keywords:
  - useIntlayer
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internacionalización
  - documentación
slugs:
  - doc
  - packages
  - astro-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc inicial"
author: aymericzip
---

# Documentación del hook useIntlayer

El hook `useIntlayer` te permite obtener contenido de diccionario localizado por clave en aplicaciones Astro.

Se puede llamar en dos contextos distintos utilizando la misma ruta de importación:

1. **Servidor / Frontmatter**: Dentro de archivos `.astro`, resuelve automáticamente el contenido utilizando el locale de solicitud almacenado en `Astro.locals.intlayer`.
2. **Navegador / Etiqueta `<script>` del cliente**: En scripts de cliente o componentes de frameworks de UI, resuelve a la implementación del store del lado del cliente (`vanilla-intlayer`).

## Uso

### En el Frontmatter de componentes Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### En bloques `<script>` del cliente

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Parámetros

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: La clave única del diccionario (tal como se define en tus archivos de declaración `.content.ts`).
2. **`localeOrSelector`** (opcional): Un locale específico o un objeto selector (`{ item }`, `{ variant }`, opcionalmente con `locale`). Si se proporciona, anula el locale detectado desde el contexto de la solicitud o el store del cliente.

## Descripción

El hook realiza las siguientes tareas:

1. **Resolución de Locale**:
   - En el servidor, lee el locale activo de `Astro.locals.intlayer` a través de un ámbito `AsyncLocalStorage` inicializado por `astro-intlayer/middleware`.
   - En el navegador, lee el locale activo desde el almacenamiento/store del cliente.
2. **Obtención del diccionario**: Inyecta el contenido del diccionario que coincide con la clave especificada.
3. **Procesamiento de traducción**: Resuelve traducciones (`t()`), enumeraciones, condiciones y markdown en contenido listo para renderizar.

## Documentación relacionada

- [Integración `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useLocale.md)
