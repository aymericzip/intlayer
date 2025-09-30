---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Hacer un componente multilingüe (biblioteca i18n) en React y Next.js
description: Aprende a declarar y recuperar contenido localizado para construir un componente multilingüe de React o Next.js con Intlayer.
keywords:
  - i18n
  - componente
  - react
  - multilingüe
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Cómo hacer un componente multilingüe (i18n) con Intlayer

Esta guía muestra los pasos mínimos para hacer que un componente de interfaz sea multilingüe en dos configuraciones comunes:

- React (Vite/SPA)
- Next.js (App Router)

Primero declararás tu contenido y luego lo recuperarás en tu componente.

## 1) Declara tu contenido (compartido para React y Next.js)

Crea un archivo de declaración de contenido cerca de tu componente. Esto mantiene las traducciones cerca del lugar donde se usan y habilita la seguridad de tipos.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

También se admite JSON si prefieres archivos de configuración.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Recupera tu contenido

### Caso A — Aplicación React (Vite/SPA)

Enfoque por defecto: usa `useIntlayer` para recuperar por clave. Esto mantiene los componentes ligeros y tipados.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Renderizado en servidor o fuera del provider: usa `react-intlayer/server` y pasa un `locale` explícito cuando sea necesario.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Alternativa: `useDictionary` puede leer un objeto declarado completo si prefieres colocar la estructura en el punto de uso.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Caso B — Next.js (App Router)

Prefiere componentes de servidor por seguridad y rendimiento. Usa `useIntlayer` de `next-intlayer/server` en archivos de servidor, y `useIntlayer` de `next-intlayer` en componentes cliente.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Consejo: Para metadatos de página y SEO, también puedes obtener contenido con `getIntlayer` y generar URLs multilingües con `getMultilingualUrls`.

## Por qué el enfoque de componentes de Intlayer es el mejor

- Colocación: Las declaraciones de contenido viven cerca de los componentes, reduciendo la deriva y mejorando la reutilización en los sistemas de diseño.
- Seguridad de tipos: Las claves y estructuras están fuertemente tipadas; las traducciones faltantes aparecen en tiempo de build en lugar de en tiempo de ejecución.
- Server-first: Funciona de forma nativa en componentes de servidor para mejor seguridad y rendimiento; los hooks de cliente siguen siendo ergonómicos.
- Tree-shaking: Solo se incluye el contenido usado por el componente, manteniendo cargas pequeñas en aplicaciones grandes.
- DX y herramientas: Middleware incorporado, asistentes de SEO y traducciones opcionales mediante Editor Visual/IA agilizan el trabajo diario.

## Guías y referencias relacionadas

- Configuración React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack Start: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Configuración Next.js: https://intlayer.org/doc/environment/nextjs
- Por qué Intlayer vs. next-intl vs. next-i18next: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer
