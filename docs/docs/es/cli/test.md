---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Testear traducciones faltantes
description: Aprende cómo probar e identificar traducciones faltantes en tus diccionarios.
keywords:
  - Prueba
  - Traducciones faltantes
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Probar traducciones faltantes

```bash
npx intlayer content test
```

## Alias:

- `npx intlayer test`

Este comando analiza tus archivos de declaración de contenido para identificar traducciones faltantes en todos los locales configurados. Proporciona un informe completo que muestra qué claves de traducción faltan para qué locales, ayudándote a mantener la consistencia en tu contenido multilingüe.

## Ejemplo de salida:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Locales requeridos: en
Locales faltantes: pl, tr, es
Locales requeridos faltantes: -
Total de locales faltantes: 3
Total de locales requeridos faltantes: 0
```

## Argumentos:

**Opciones de configuración:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file [envFile]`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto.

  > Ejemplo: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Deshabilita la caché.

  > Ejemplo: `npx intlayer build --no-cache`

**Opciones de preparación:**

- **`--build`**: Construye los diccionarios antes de hacer push para asegurar que el contenido esté actualizado. True forzará la construcción, false la omitirá, undefined permitirá usar la caché de la construcción.

**Opciones de registro:**

- **`--verbose`**: Activa el registro detallado para depuración. (por defecto es true usando CLI)

  > Ejemplo: `npx intlayer content test --verbose`

## Ejemplo:

```bash
npx intlayer content test --verbose
```

La salida te ayuda a identificar rápidamente qué traducciones necesitan completarse para asegurar que tu aplicación funcione correctamente en todos los locales configurados.
