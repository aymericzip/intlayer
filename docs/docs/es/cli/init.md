---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: instalar Intlayer en tu proyecto"
description: "Ejecuta intlayer init para añadir Intlayer a un proyecto existente: detecta tu framework, instala los paquetes y escribe la configuración."
keywords:
  - Inicializar
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init solo instala los paquetes y configura el framework; se añade un subcomando por paso; --interactive falla sin terminal"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Agregar el subcomando init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Agregar opción --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
author: aymericzip
---

# Inicializar Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

El comando `init` instala los paquetes de Intlayer y configura tu framework (archivo de configuración, TypeScript, plugin del bundler, middleware/proxy, providers). Es la forma recomendada de empezar con Intlayer.

Todo lo demás (workflows de CI, skills de IA, servidor MCP, herramientas del editor, reglas de lint, CMS, infraestructura) es opcional: elígelo en la checklist de `--interactive` o ejecuta su subcomando dedicado (ver más abajo).

## Alias:

- `npx intlayer init`

## Argumentos:

- `--project-root [projectRoot]` - Opcional. Especifique el directorio raíz del proyecto. Si no se proporciona, el comando buscará la raíz del proyecto comenzando desde el directorio de trabajo actual.
- `--no-gitignore` - Opcional. Omite la actualización automática del archivo `.gitignore`. Si se establece esta bandera, `.intlayer` no se agregará a `.gitignore`.
- `--no-framework-setup` - Opcional. Solo instala los paquetes, sin tocar los archivos del proyecto.
- `--routing <routing>` - Opcional. Enrutamiento de locales: `prefix-no-default` (por defecto), `prefix-all`, `no-prefix`, `search-params` o `none`.
- `--content <layout>` - Opcional. Cómo se declara el contenido:
  - `multilingual` - `{fileName}.content.{ts,json}` junto al componente, todas las locales en un solo archivo (define `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` junto al componente (define `compiler.output` y `dictionary.locale`).
  - `centralized` - un catálogo `/locales/{locale}.{json,po}` por locale (agrega el plugin `syncJSON` / `syncPO`).
  - `namespaces` - catálogos `/locales/{locale}/{namespace}.{json,po}` (agrega el plugin `syncJSON` / `syncPO`).
- `--content-format <format>` - Opcional, con `--content`. `ts` o `json` para `multilingual` / `per-locale`, `json` o `po` para `centralized` / `namespaces`. Por defecto el primero.
- `--message-format <format>` - Opcional, con `--content centralized` o `namespaces` en JSON. Sintaxis de mensajes de los catálogos: `icu` (por defecto), `i18next`, `vue-i18n` o `intlayer`.
- `-i, --interactive` - Opcional. Elige los pasos en una checklist (paquetes, CI, skills, MCP, VS Code, LSP, lint, CMS, infraestructura, …) en lugar del conjunto por defecto. Necesita un terminal: sin él (agente de IA, CI), el comando falla y lista los subcomandos que ejecutar en su lugar.
- `--no-github-actions` - Opcional. Con `--interactive`, nunca genera los workflows de GitHub Actions, aunque estén seleccionados.

## Qué hace:

El comando `init` realiza las siguientes tareas de configuración:

1. **Valida la estructura del proyecto** - Asegura que se encuentra en un directorio de proyecto válido con un archivo `package.json`.
2. **Instala los paquetes** - Instala los paquetes de Intlayer que faltan para tu stack (p. ej. `react-intlayer`, `vite-intlayer`) y actualiza los que están desactualizados.
3. **Actualiza el `.gitignore`** - Agrega `.intlayer` a su archivo `.gitignore` para excluir los archivos generados del control de versiones (puede omitirse con `--no-gitignore`).
4. **Configura TypeScript** - Actualiza todos los archivos `tsconfig.json` para incluir las definiciones de tipos de Intlayer (`.intlayer/**/*.ts`).
5. **Crea el archivo de configuración** - Genera un `intlayer.config.ts` (para proyectos TypeScript) o `intlayer.config.mjs` (para proyectos JavaScript) con la configuración predeterminada.
6. **Actualiza la configuración del bundler / framework** - Añade el plugin de Intlayer a tu configuración de Vite, Next.js, Nuxt, Astro, …, y genera el middleware/proxy y los providers cuando el framework lo permite.

## Configurar un paso cada vez

Cada paso de la checklist de `--interactive` tiene su propio subcomando. No hacen preguntas cuando sus valores se pasan como flags, así que puedes ejecutarlos desde un agente de IA o un job de CI.

| Comando                                                               | Qué configura                                                                                        |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Instala los paquetes de Intlayer que faltan y actualiza los desactualizados                          |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Archivo de configuración, TypeScript, plugin del bundler, middleware/proxy, providers y `.gitignore` |
| `intlayer init github-actions`                                        | Los workflows de GitHub Actions `fill` y `test`                                                      |
| `intlayer init vscode-extension`                                      | Recomienda la extensión de Intlayer en `.vscode/extensions.json`                                     |
| `intlayer init lsp`                                                   | El servidor de lenguaje de Intlayer en `.vscode/settings.json`                                       |
| `intlayer init eslint`                                                | Las reglas de lint de Intlayer (ESLint / oxlint), si el proyecto ya usa un linter                    |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | La documentación de Intlayer como skills para agentes de IA                                          |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | El servidor MCP de Intlayer                                                                          |
| `intlayer init extension [--browser <chrome/firefox>]`                | Abre la página de la tienda de la extensión de navegador de Intlayer                                 |
| `intlayer init cms`                                                   | Inicia sesión en el CMS de Intlayer desde tu navegador y guarda las credenciales en `.env`           |
| `intlayer init infra --mode <desktop/docker/compose>`                 | La aplicación de escritorio o un stack autoalojado                                                   |

### Desde un agente de IA o un job de CI

El shell de un agente de IA no tiene terminal, así que una pregunta no puede responderse. Usa el comando por defecto y luego los subcomandos que necesites:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Sin terminal:

- `init skills` instala las skills que corresponden a tu stack, salvo si se define `--skills` (p. ej. `--skills Usage Content React`).
- `init skills` e `init mcp` usan la plataforma de IA detectada (Claude Code, Cursor, VS Code, Windsurf, …), salvo si se define `--platform`, y fallan con la lista de plataformas si no se detecta ninguna.
- `init mcp` usa el transporte `stdio`, salvo si se define `--transport`.
- `init infra` requiere `--mode`, e `init extension` solo muestra los enlaces de la tienda, salvo si se define `--browser`.

El servidor MCP siempre se configura dentro del proyecto (para Claude Code, en `.mcp.json`).

## Ejemplos:

### Inicialización básica:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Esto inicializará Intlayer en el directorio actual, detectando automáticamente la raíz del proyecto.

### Inicializar con una raíz de proyecto personalizada:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

Esto inicializará Intlayer en el directorio especificado.

### Inicializar sin actualizar el .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Esto establecerá todos los archivos de configuración pero no modificará su `.gitignore`.

### Configurar la infraestructura (aplicación de escritorio o autoalojamiento):

```bash
npx intlayer init infra
```

Descarga y ejecuta el instalador alojado (`https://intlayer.org/install.sh`, o `install.ps1` en Windows), que pregunta cómo desea ejecutar Intlayer:

- **Aplicación de escritorio** - instala el panel de control nativo en su máquina, conectado a Intlayer Cloud.
- **Docker todo en uno** - panel de control + API + MongoDB + Redis + MinIO en un solo contenedor.
- **Docker Compose** - un contenedor por servicio, para un autoalojamiento escalable.

Omita el menú con `--mode`:

```bash
npx intlayer init infra --mode compose
```

El mismo paso se ofrece mediante `npx intlayer init --interactive`. Consulte la [referencia de `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/infra.md) para conocer la configuración del instalador, y la [guía de autoalojamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md) para ver lo que configura cada modo.

- [referencia de `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/infra.md)
- [guía de autoalojamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md)

## Ejemplo de salida:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Notas:

- El comando es idempotente: puede ejecutarlo varias veces de forma segura. Omitirá los pasos que ya estén configurados.
- Si ya existe un archivo de configuración, no se sobrescribirá.
- Se omiten los archivos de configuración de TypeScript sin una matriz `include` (por ejemplo, configuraciones de estilo de solución con referencias).
- El comando se cerrará con un error si no se encuentra ningún `package.json` en la raíz del proyecto.
