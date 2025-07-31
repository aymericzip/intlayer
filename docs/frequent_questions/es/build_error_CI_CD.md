---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Error de compilación en CI/CD
description: Aprende cómo solucionar errores de compilación que ocurren en entornos CI/CD.
keywords:
  - compilación
  - error
  - ci
  - cd
  - pipeline
  - intlayer
  - diccionarios
  - next.js
  - prebuild
  - automatización
slugs:
  - doc
  - faq
  - build-error-ci-cd
---

# Error en la compilación en CI/CD

Si obtienes un error como este en Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Aquí algunas soluciones:

## 1. Diccionarios faltantes

Asegúrate de que los diccionarios se construyan en la etapa de compilación.

Es frecuente que la compilación funcione localmente pero no en CI/CD. La razón es que localmente, el directorio `.intlayer` está presente, pero en CI/CD no, ya que está excluido de la compilación.

Puedes solucionarlo agregando un script de precompilación en el `package.json` de tu proyecto.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Se ejecutará antes de la compilación
    "build": "next build",
  },
}
```

> Ten en cuenta que si usas la función `withIntlayer`, o el plugin equivalente para el empaquetador de tu framework, el script de precompilación se ejecutará antes de la compilación.

## 2. Variables de entorno faltantes en tiempo de compilación / ejecución

En un contenedor, o plataforma de despliegue automático, se recomienda excluir el archivo `.env` de la compilación.

```text fileName=".gitignore or .dockerignore"
# Variables de entorno
.env
**/.env
.env.*
**/.env.*
```

Si tus variables de entorno no están disponibles en tiempo de compilación, se generará un error.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Probablemente no esté relacionado con Intlayer. Así que verifica tus variables de entorno en tiempo de compilación en tu plataforma CI/CD.
