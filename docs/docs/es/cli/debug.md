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
---

# Depurar comando intlayer

## 1. **Asegúrate de estar usando la versión más reciente**

Ejecuta:

```bash
npx intlayer --version                  # versión actual de intlayer en la localidad
npx intlayer@latest --version           # versión más reciente actual de intlayer
```

## 2. **Verifica si el comando está registrado**

Puedes verificar con:

```bash
npx intlayer --help                     # Muestra la lista de comandos disponibles e información de uso
npx intlayer dictionary build --help    # Muestra la lista de opciones disponibles para un comando
```

## 3. **Reinicia tu terminal**

A veces es necesario reiniciar el terminal para que reconozca nuevos comandos.

## 4. **Limpia la caché de npx (si estás atascado con una versión antigua)**

```bash
npx clear-npx-cache
```
