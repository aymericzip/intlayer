---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Rellenar Diccionarios
description: Aprende cómo rellenar, auditar y traducir tus diccionarios usando IA.
keywords:
  - Rellenar
  - Auditar
  - Traducir
  - Diccionarios
  - CLI
  - Intlayer
  - IA
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Rellenar / auditar / traducir diccionarios

```bash
npx intlayer fill
```

Este comando analiza tus archivos de declaración de contenido en busca de posibles problemas como traducciones faltantes, inconsistencias estructurales o incompatibilidades de tipo. Si encuentra algún problema, **intlayer fill** propondrá o aplicará actualizaciones para mantener tus diccionarios consistentes y completos.

## Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Argumentos:

**Opciones de lista de archivos:**

- **`-f, --file [files...]`**: Una lista de archivos específicos de declaración de contenido para auditar. Si no se proporciona, se auditarán todos los archivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descubiertos según la configuración de tu archivo.

  > Ejemplo: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtrar diccionarios basados en claves. Si no se proporciona, se auditarán todos los diccionarios.

  > Ejemplo: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Filtrar diccionarios basados en claves (alias de --keys).

  > Ejemplo: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Excluir diccionarios basados en claves. Si no se proporciona, se auditarán todos los diccionarios.

  > Ejemplo: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Excluir diccionarios basados en claves (alias de --excluded-keys).

  > Ejemplo: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Filtrar diccionarios basados en patrones glob para rutas de archivos.

  > Ejemplo: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opciones de salida de entradas:**

- **`--source-locale [sourceLocale]`**: La locale fuente desde la cual traducir. Si no se especifica, se usará la locale por defecto de tu configuración.

- **`--output-locales [outputLocales...]`**: Locales destino a las cuales traducir. Si no se especifica, se usarán todas las locales de tu configuración excepto la locale fuente.

- **`--mode [mode]`**: Modo de traducción: `complete`, `review`. Por defecto es `complete`. `complete` llenará todo el contenido faltante, `review` llenará el contenido faltante y revisará las claves existentes.

**Opciones de Git:**

- **`--git-diff`**: Ejecutar solo en diccionarios que incluyan cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).
- **`--git-diff-base`**: Especificar la referencia base para el git diff (por defecto `origin/main`).
- **`--git-diff-current`**: Especificar la referencia actual para el git diff (por defecto `HEAD`).
- **`--uncommitted`**: Incluir cambios no confirmados.
- **`--unpushed`**: Incluir cambios no enviados.
- **`--untracked`**: Incluir archivos no rastreados.

  > Ejemplo: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ejemplo: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opciones de IA:**

- **`--model [model]`**: El modelo de IA a usar para la traducción (por ejemplo, `gpt-3.5-turbo`).
- **`--provider [provider]`**: El proveedor de IA a usar para la traducción.
- **`--temperature [temperature]`**: Configuración de temperatura para el modelo de IA.
- **`--api-key [apiKey]`**: Proporciona tu propia clave API para el servicio de IA.
- **`--custom-prompt [prompt]`**: Proporciona un prompt personalizado para tus instrucciones de traducción.
- **`--application-context [applicationContext]`**: Proporciona contexto adicional para la traducción por IA.

  > Ejemplo: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Mi aplicación es una tienda de gatos"`

**Opciones de variables de entorno:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file [envFile]`**: Proporciona un archivo de entorno personalizado desde el cual cargar las variables.

  > Ejemplo: `npx intlayer fill --env-file .env.production.local`

  > Ejemplo: `npx intlayer fill --env production`

**Opciones de configuración:**

- **`--base-dir`**: Especifica el directorio base para el proyecto.

  > Ejemplo: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Deshabilita la caché.

  > Ejemplo: `npx intlayer build --no-cache`

**Opciones de preparación:**

- **`--build`**: Construye los diccionarios antes de hacer push para asegurar que el contenido esté actualizado. True forzará la construcción, false la omitirá, undefined permitirá usar la caché de la construcción.

- **`--skip-metadata`**: Omitir el llenado de metadatos faltantes (descripción, título, etiquetas) para los diccionarios.

**Opciones de registro:**

- **`--verbose`**: Habilitar el registro detallado para depuración. (por defecto en true usando CLI)

## Ejemplo:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Este comando traducirá el contenido del inglés al francés y español para todos los archivos de declaración de contenido en el directorio `src/home/` usando el modelo GPT-3.5 Turbo.
