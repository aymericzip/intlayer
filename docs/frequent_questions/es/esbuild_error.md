---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Error de ESBuild
description: Aprende cómo solucionar errores de ESBuild.
keywords:
  - esbuild
  - error
  - intlayer
  - plugin
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - doc
  - faq
  - esbuild-error
---

# Error de ESBuild

Si encuentras un error de ESBuild durante el proceso de compilación, es probable que el plugin de Intlayer no esté configurado correctamente.

ESBuild es responsable de leer los archivos de declaración de contenido (`.content.{ts,js,mjs,cjs,json}`) y generar los diccionarios correspondientes en la carpeta `.intlayer/dictionary`. Así como de leer el archivo de configuración (`intlayer.config.ts`).

Intlayer proporciona plugins para integrarse con tus empaquetadores. Está diseñado para alias de componentes que están destinados a ejecutarse solo del lado del servidor.

Si estás utilizando un framework como Next.js (Webpack / Turbopack), Vite, React Native, Lynx, etc., Intlayer proporciona un plugin que puedes usar para integrar Intlayer en tu aplicación. Por lo tanto, consulta la documentación específica de tu framework para aprender cómo integrar el plugin.
