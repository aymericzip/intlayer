---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Depurar comando Intlayer
description: Aprende cómo depurar y solucionar problemas del CLI de Intlayer.
keywords:
  - Depurar
  - Solucionar problemas
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Depurar comando intlayer

## 1. **Asegúrate de estar usando la versión más reciente**

Ejecuta:

```bash packageManager="npm"
npx intlayer --version                  # versión actual de intlayer en la localidad
npx intlayer@latest --version           # versión más reciente actual de intlayer
```

```bash packageManager="yarn"
yarn intlayer --version                  # versión actual de intlayer en la localidad
yarn intlayer@latest --version           # versión más reciente actual de intlayer
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # versión actual de intlayer en la localidad
pnpm intlayer@latest --version           # versión más reciente actual de intlayer
```

```bash packageManager="bun"
bun x intlayer --version                  # versión actual de intlayer en la localidad
bun x intlayer@latest --version           # versión más reciente actual de intlayer
```

## 2. **Verifica si el comando está registrado**

Puedes verificar con:

```bash packageManager="npm"
npx intlayer --help                     # Muestra la lista de comandos disponibles e información de uso
npx intlayer dictionary build --help    # Muestra la lista de opciones disponibles para un comando
```

```bash packageManager="yarn"
yarn intlayer --help                     # Muestra la lista de comandos disponibles e información de uso
yarn intlayer dictionary build --help    # Muestra la lista de opciones disponibles para un comando
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # Muestra la lista de comandos disponibles e información de uso
pnpm intlayer dictionary build --help    # Muestra la lista de opciones disponibles para un comando
```

```bash packageManager="bun"
bun x intlayer --help                     # Muestra la lista de comandos disponibles e información de uso
bun x intlayer dictionary build --help    # Muestra la lista de opciones disponibles para un comando
```

## 3. **Reinicia tu terminal**

A veces es necesario reiniciar el terminal para que reconozca nuevos comandos.

## 4. **Limpia la caché de npx (si estás atascado con una versión antigua)**

```bash
npx clear-npx-cache
```
