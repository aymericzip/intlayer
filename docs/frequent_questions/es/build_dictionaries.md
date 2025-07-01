---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ¿Cómo construir diccionarios?
description: Aprende cómo construir diccionarios.
keywords:
  - construir
  - diccionarios
  - intlayer
  - comando
  - watch
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - doc
  - faq
  - construir-diccionarios
---

# Construir Diccionarios

## Cómo Construir Diccionarios

Intlayer proporciona una herramienta de línea de comandos para construir diccionarios.

```bash
npx intlayer dictionaries build
```

Este comando:

- Escanea todos los archivos de declaración de contenido (`.content.{ts,tsx,js,mjs,cjs,json,...}`) en tu proyecto.
- Genera diccionarios y los almacena en la carpeta `.intlayer/dictionary`.

### Modo Watch

Si deseas actualizar automáticamente los diccionarios cuando se realicen cambios en los archivos de declaración de contenido, ejecuta el siguiente comando:

```bash
npx intlayer dictionaries build --watch
```

En este modo, Intlayer escaneará y construirá los diccionarios cada vez que se realicen cambios en los archivos de declaración de contenido y actualizará automáticamente la carpeta `.intlayer/dictionary`.

### Usando la extensión de VSCode

También puedes usar la [extensión de Intlayer para VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/es/vs_code_extension.md) para mejorar tu experiencia con Intlayer en VSCode.

### Usando el plugin para tu framework de aplicación favorito

Si estás utilizando un framework como Next.js (Webpack / Turbopack), Vite, React Native, Lynx, etc., Intlayer proporciona un plugin que puedes usar para integrar Intlayer en tu aplicación.

Intlayer construirá los diccionarios antes de la compilación de tu aplicación.
De la misma manera, en modo desarrollo, Intlayer observará los cambios en tus archivos de declaración de contenido y reconstruirá los diccionarios automáticamente.

Por lo tanto, consulta la documentación específica de tu framework para aprender cómo integrar el plugin.
