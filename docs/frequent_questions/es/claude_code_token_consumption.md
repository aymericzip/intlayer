---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: Cómo limitar el consumo de tokens de Claude Code para generar traducciones
description: Por qué traducir con Claude Code consume tokens innecesariamente, qué hace Intlayer en su lugar (filtra claves traducidas, fragmenta JSON, traduce markdown bloque por bloque) y cómo reutilizar tu suscripción a Claude con claude setup-token.
keywords:
  - claude code
  - tokens
  - consumo de tokens
  - setup-token
  - i18n
  - internacionalización
  - traducción
  - fill
  - mcp
  - agente
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Cómo limitar el consumo de tokens de Claude Code para generar traducciones

## Descripción del problema

Pedirle a Claude Code (o a cualquier agente de desarrollo) que traduzca tu contenido es la forma más costosa de hacerlo. En cada ejecución, el agente debe:

- Cargar el archivo JSON o de contenido completo en su contexto, incluso las claves que ya están traducidas.
- Buscar en los archivos relacionados para identificar dónde reside el contenido y cómo está estructurado.
- Determinar qué locales faltan y deben generarse.
- Releer tus instrucciones personalizadas en cada ocasión ("transforma las URLs de este modo", "mantén el nombre de la marca en inglés", "utiliza un tono informal").
- Reescribir el archivo completo, incluidas las partes que no cambiaron.

Todo esto se reenvía en cada turno, por lo que el coste aumenta según `tamaño del contenido × número de locales × número de turnos`, y cualquier desviación en el formato o las claves debe corregirse a mano.

## Qué hace Intlayer en su lugar

La ventaja de Intlayer es que realiza este trabajo fuera del agente, mediante un pipeline especialmente diseñado para la traducción:

- **Filtra las traducciones existentes** para limitar el consumo de tokens. Las claves ya traducidas en tu JSON se descartan, y solo se envían al modelo las faltantes.
- **Traduce markdown bloque por bloque.** Para la documentación, [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-translate.md) y [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-review.md) comparan cada bloque con el documento base y omiten los bloques ya traducidos o sin cambios.
- **Fragmenta tu JSON (chunking)** si es demasiado grande, manteniéndose en la zona óptima de la ventana de contexto.
- **Aplana y reconstruye tu JSON** para optimizar el consumo de tokens.
- **Inserta prompts personalizados** para reglas específicas de tu marca y estilo (`applicationContext`, `--custom-instructions`), de forma que los escribes una sola vez en lugar de repetirlos en cada conversación.
- **Valida la estructura** para garantizar la coherencia y evitar desviaciones de claves, preservando el formato (markdown, HTML, inserciones, plurales).
- **Implementa gestión de reintentos (retry)** cuando la salida presenta un formato incorrecto.
- **Pone en cola y paraleliza solicitudes** entre archivos, fragmentos y locales para acelerar el proceso.

Nada de esto pasa por el contexto del agente. La regla básica: deja que el agente decida **qué** internacionalizar, y deja que Intlayer se encargue de la tarea repetitiva.

## Solución

### 1. Delegar la extracción a `intlayer extract`

En lugar de pedirle al agente que reescriba cada componente a mano, haz que ejecute el comando [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md). Este traslada las cadenas fijas a un archivo `.content` junto al componente sin cargar todo el archivo en el contexto del agente.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Delegar la traducción a `intlayer fill`

Nunca le pidas al agente que traduzca. El comando [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) aplica el pipeline descrito: solo envía las claves faltantes, las fragmenta, procesa los locales en paralelo y escribe el resultado de nuevo en tus archivos de contenido.

```bash
npx intlayer fill
```

Algunos flags permiten mantener la ejecución acotada:

- `--git-diff` (o `--uncommitted`) procesa únicamente los diccionarios modificados en la rama actual.
- `--file` o `--keys` apunta a archivos de contenido específicos.
- `--output-locales fr es` limita la ejecución a los locales que realmente necesitas ahora.
- `--skip-metadata` omite la generación de título, descripción y etiquetas.
- `--data-serialization toon` envía una carga útil más compacta al modelo (menos tokens, salida ligeramente menos predecible).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Traducir markdown con `doc translate` y `doc review`

Pedirle a un agente que traduzca un archivo `.md` implica pegar el documento entero, para cada locale, en cada cambio. Los comandos [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-translate.md) y [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-review.md) operan en su lugar bloque por bloque.

Utiliza `doc translate` cuando el archivo traducido aún no exista. Fragmenta el markdown, lo traduce en paralelo y escribe los archivos de destino:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Utiliza `doc review` cuando el archivo traducido ya exista. Compara cada bloque con el documento base, omite los bloques ya traducidos o sin cambios, y solo envía los divergentes:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Ambos comandos aceptan tus reglas una sola vez, sin necesidad de repetirlas en cada prompt:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Dos modos de `doc review` resultan prácticos cuando el agente necesita intervenir sin requerir llamadas de IA por parte de Intlayer:

- `--mode report` muestra los bloques que requieren atención junto con sus números de línea, de modo que el agente solo toque esos bloques.
- `--mode synthesis` reporta únicamente qué documentos están al día y cuáles tienen bloques pendientes de edición.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Permitir que el agente llame a la CLI mediante el servidor MCP

Con el [servidor MCP de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md), el agente responde basándose en la documentación actualizada y ejecuta `intlayer fill` o `intlayer doc review` por sí mismo en vez de reimplementar la lógica en la conversación.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Instalar las [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md) con `npx intlayer init skills` también evita que el agente adivine la API de Intlayer y vuelva a leer la documentación en cada tarea.

### 5. Reutilizar tu suscripción de Claude con `claude setup-token`

Ejecutar la configuración de i18n en una sesión interactiva de Claude Code conserva todo el historial de la conversación en el contexto. Traslada ese trabajo pesado a una sesión corta en modo headless.

Genera un token de larga duración a partir de tu suscripción de Claude:

```bash
claude setup-token
```

Guárdalo como `CLAUDE_CODE_OAUTH_TOKEN` (en un archivo `.env` o en los secretos de tu CI) y luego reutilízalo en una sesión puntual que ejecute los comandos de Intlayer:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

La sesión solo contendrá ese prompt y la salida del comando, evitando todo el historial previo. El mismo token funciona en la [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) para ejecutar `intlayer fill` en cada pull request.

> El token emitido por `claude setup-token` autentica únicamente a Claude Code. No se puede utilizar como clave de API de Anthropic en `ai.apiKey`. Para la traducción propiamente dicha, `intlayer fill` utiliza tu [cuenta de Intlayer](https://app.intlayer.org) (plan gratuito incluido) o tu propia clave de proveedor configurada en [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#ai-configuration).

## Resumen

| Tarea                         | Quién la realiza             | Tokens en el contexto del agente |
| ----------------------------- | ---------------------------- | -------------------------------- |
| Decidir qué internacionalizar | Claude Code                  | Bajo                             |
| Extraer cadenas               | `intlayer extract`           | Ninguno                          |
| Traducir contenido            | `intlayer fill`              | Ninguno                          |
| Traducir documentación        | `intlayer doc translate`     | Ninguno                          |
| Actualizar documentación      | `intlayer doc review`        | Ninguno                          |
| Ejecutar los comandos         | Claude Code en modo headless | Prompt + salida del comando      |
