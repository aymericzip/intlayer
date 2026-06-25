---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Comando CI
description: Aprende a usar el comando Intlayer CI para ejecutar comandos Intlayer con credenciales auto-inyectadas en pipelines CI/CD y monorepos.
keywords:
  - CI
  - CI/CD
  - Automatización
  - Monorepo
  - Credenciales
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "Agregar comando CI"
author: aymericzip
---

# Comando CI

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

El comando CI está diseñado para automatización y pipelines CI/CD. Inyecta automáticamente credenciales desde la variable de entorno `INTLAYER_PROJECT_CREDENTIALS` y puede ejecutar comandos Intlayer en múltiples proyectos en un monorepo.

## Cómo funciona

El comando CI opera en dos modos:

1. **Modo de proyecto único**: Si el directorio de trabajo actual coincide con una de las rutas de proyecto en `INTLAYER_PROJECT_CREDENTIALS`, ejecuta el comando solo para ese proyecto específico.

2. **Modo de iteración**: Si no se detecta un contexto de proyecto específico, itera sobre todos los proyectos configurados y ejecuta el comando para cada uno.

## Variable de entorno

El comando requiere que se establezca la variable de entorno `INTLAYER_PROJECT_CREDENTIALS`. Esta variable debe contener un objeto JSON que mapee las rutas de proyecto a sus credenciales:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Detección del gestor de paquetes

El comando CI detecta automáticamente qué gestor de paquetes se está usando (npm, yarn, pnpm o bun) basándose en la variable de entorno `npm_config_user_agent` y usa el comando apropiado para ejecutar Intlayer.

## Argumentos

- **`<command...>`**: El comando Intlayer a ejecutar (por ejemplo, `fill`, `push`, `build`). Puedes pasar cualquier comando Intlayer y sus argumentos.

  > Ejemplo: `npx intlayer ci fill --verbose`
  >
  > Ejemplo: `npx intlayer ci push`
  >
  > Ejemplo: `npx intlayer ci build`

## Ejemplos

### Ejecutar un comando en modo de proyecto único

Si estás en un directorio de proyecto que coincide con una de las rutas en `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

Esto ejecutará el comando `fill` con las credenciales inyectadas automáticamente para el proyecto `packages/app`.

### Ejecutar un comando en todos los proyectos

Si estás en un directorio que no coincide con ninguna ruta de proyecto, el comando iterará sobre todos los proyectos configurados:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Esto ejecutará el comando `push` para cada proyecto configurado en `INTLAYER_PROJECT_CREDENTIALS`.

### Pasar banderas adicionales

Puedes pasar cualquier bandera al comando Intlayer subyacente:

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### Usar en pipelines CI/CD

En tu configuración CI/CD (por ejemplo, GitHub Actions, GitLab CI), establece `INTLAYER_PROJECT_CREDENTIALS` como secreto:

```yaml
# Ejemplo de GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Llenar diccionarios
    run: npx intlayer ci fill
```

## Acciones de GitHub generadas automáticamente

Cuando ejecutas `intlayer init`, Intlayer detecta tu gestor de paquetes (npm, yarn, pnpm, o bun) y genera automáticamente dos flujos de trabajo de GitHub Actions en `.github/workflows/`, con comandos que coinciden con ese gestor de paquetes:

- **`intlayer-fill.yml`** — En cada pull request, construye los diccionarios y ejecuta `intlayer fill --git-diff --mode complete` para generar traducciones faltantes en los diccionarios modificados, luego confirma el resultado en la rama del PR.
- **`intlayer-test.yml`** — En cada pull request, construye los diccionarios y ejecuta `intlayer test`, fallando la verificación cuando faltan traducciones en las locales requeridas.

Los archivos de flujo de trabajo existentes nunca se sobrescriben. Para omitir la generación automática por completo, ejecuta:

```bash
npx intlayer init --no-github-actions
```

### Proporcionar acceso a IA al flujo de trabajo de relleno

El `intlayer-fill.yml` generado requiere acceso a IA. Hay dos opciones disponibles (configuradas en el bloque `env` del flujo de trabajo):

1. **Tu propia clave de proveedor de IA** — Agrega un secreto `AI_API_KEY` en la configuración de tu repositorio (Settings → Secrets and variables → Actions). El flujo de trabajo la reenvía a través de `--provider`, `--model` y `--api-key`.
2. **Claves de acceso a Intlayer CMS** — Agrega los secretos `INTLAYER_CLIENT_ID` e `INTLAYER_CLIENT_SECRET` e intégralos en la sección `editor` de tu `intlayer.config`. Las claves de acceso a CMS otorgan acceso a IA a través del backend de Intlayer.

El flujo de trabajo `intlayer-test.yml` no requiere acceso a IA.

## Manejo de errores

- Si `INTLAYER_PROJECT_CREDENTIALS` no está establecida, el comando saldrá con un error.
- Si `INTLAYER_PROJECT_CREDENTIALS` no es un JSON válido, el comando saldrá con un error.
- Si una ruta de proyecto no existe, se omitirá con una advertencia.
- Si algún proyecto falla, el comando saldrá con un código de estado distinto de cero.

## Casos de uso

- **Automatización de monorepo**: Ejecutar comandos Intlayer en múltiples proyectos en un monorepo
- **Pipelines CI/CD**: Automatizar la gestión de diccionarios en flujos de trabajo de integración continua
- **Operaciones masivas**: Realizar la misma operación en múltiples proyectos Intlayer a la vez
- **Gestión de secretos**: Gestionar de forma segura las credenciales para múltiples proyectos usando variables de entorno

## Mejores prácticas de seguridad

- Almacena `INTLAYER_PROJECT_CREDENTIALS` como secretos cifrados en tu plataforma CI/CD
- Nunca comprometas las credenciales en el control de versiones
- Usa credenciales específicas del entorno para diferentes entornos de despliegue
- Rota las credenciales regularmente
