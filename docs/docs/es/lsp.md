---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Servidor LSP de Intlayer
description: Aprenda cómo el servidor de lenguaje de Intlayer proporciona la función Ir a la definición y otras características de IDE para useIntlayer, getIntlayer y llamadas relacionadas en todos los editores compatibles.
keywords:
  - LSP
  - Servidor de Lenguaje
  - Ir a la definición
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
---

# Servidor LSP de Intlayer

El **Servidor de Lenguaje de Intlayer (LSP)** es una implementación del [Protocolo de Servidor de Lenguaje (LSP)](https://microsoft.github.io/language-server-protocol/) que mejora su IDE con inteligencia adaptada a Intlayer. Actualmente proporciona **Ir a la definición (Go to Definition)** para llamadas a claves de diccionario, lo que le permite saltar directamente desde `useIntlayer("my-key")` en su componente al archivo `.content.ts` que lo declara.

---

## ¿Por qué usar el LSP?

Cuando utiliza Intlayer, la conexión entre una llamada como `useIntlayer("homepage")` y su declaración en `src/homepage.content.ts` es implícita. Sin herramientas, debe buscar el archivo manualmente. El LSP hace que ese enlace sea explícito:

**Sensibilización de agentes de IA**

Los agentes de codificación de IA (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) dependen del servidor de lenguaje para resolver símbolos y comprender las relaciones entre archivos. Con el LSP de Intlayer en funcionamiento, los agentes pueden seguir `useIntlayer("key")` hasta su declaración, lo que les brinda un contexto preciso sobre las claves de contenido disponibles, la estructura de cada diccionario y qué archivos leer o editar.

**Ir a la definición**

Coloque el cursor sobre cualquier cadena de clave de diccionario dentro de una llamada de obtención admitida y presione `F12` (o `Cmd/Ctrl+Clic`). El editor abre el archivo de declaración de contenido y posiciona el cursor en la línea `key:`.

**Soporte de diccionarios fusionados**

Una clave se puede dividir en varios archivos de contenido (Intlayer los fusiona). El servidor devuelve una ubicación (`Location`) por archivo de origen para que pueda navegar a cada declaración.

**Funciona en todas partes**

Es compatible con todos los paquetes `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Llamadas de obtención admitidas

El servidor detecta las siguientes llamadas a funciones y extrae el primer argumento de cadena literal como la clave del diccionario:

| Función       | Ejemplo                       |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

Se ignoran los genéricos de TypeScript y los argumentos adicionales; solo importa la cadena de la clave.

> `useDictionary` y `getDictionary` reciben un objeto `Dictionary` ya importado como su primer argumento en lugar de una clave de cadena, por lo que no se benefician de Ir a la definición y no son rastreados por el servidor.

---

## Instalación

El servidor LSP se distribuye como parte de `@intlayer/lsp`:

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

El paquete expone el binario `intlayer-lsp`, que los editores utilizan como ejecutable del servidor.

---

## Configuración como un plugin de Claude Code

El LSP de Intlayer está disponible como un **plugin de Claude Code** alojado directamente en el repositorio de GitHub de Intlayer. Instalarlo le da a Claude Code una sensibilidad nativa de Ir a la definición para todas sus llamadas a `useIntlayer` / `getIntlayer`.

### 1. Instalar el binario del servidor de lenguaje

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Esto coloca el binario `intlayer-lsp` en su PATH, que es lo que invoca la entrada `lspServers` del plugin.

### 2. Registrar el marketplace de Intlayer e instalar el plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code agregará `"intlayer-lsp@intlayer": true` a sus `enabledPlugins` y encenderá automáticamente el servidor de lenguaje en los tipos de archivos compatibles (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Habilitar la herramienta LSP (si aún no está activa)

Algunas versiones de Claude Code requieren que se establezca la bandera de función LSP. Agregue lo siguiente a su archivo `~/.claude/settings.json` si Ir a la definición no funciona después de la instalación:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Reinicie Claude Code; ahora usará `goToDefinition`, `findReferences` y otras operaciones de LSP al navegar por su código de Intlayer en lugar de recurrir a `grep`.

---

## Configuración en VS Code (a través de la extensión — recomendado)

Si tiene instalada la **extensión Intlayer de VS Code**, el servidor de lenguaje se inicia automáticamente. No se requiere configuración adicional.

> Consulte la [documentación de la extensión de VS Code](https://intlayer.org/doc/vs-code-extension) para conocer la instalación y otras características.

---

## Configuración manual en VS Code

Si no está utilizando la extensión de Intlayer, puede conectar el servidor de lenguaje manualmente utilizando una extensión de cliente LSP genérica como [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) o escribiendo su propia extensión pequeña. El enfoque recomendado es utilizar la extensión de Intlayer.

Como referencia, el servidor se inicia a través del binario `intlayer-lsp` sobre stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

La extensión de Intlayer lee estas configuraciones para iniciar el servidor. Si depende únicamente de la extensión, no se necesitan configuraciones manuales.

---

## Configuración en Cursor

[Cursor](https://www.cursor.com/) es una bifurcación de VS Code con características de IA integradas. Utiliza el mismo ecosistema de extensiones, por lo que la **extensión Intlayer de VS Code** funciona sin ninguna configuración adicional; instálela una vez y Cursor la detectará automáticamente.

Si prefiere una configuración manual, Cursor también lee `.vscode/settings.json` desde la raíz del espacio de trabajo, por lo que el fragmento de VS Code anterior se aplica directamente.

---

## Configuración en Windsurf

[Windsurf](https://windsurf.com/) (de Codeium) es otro editor basado en VS Code. Instale la extensión de Intlayer desde el mercado de VS Code y el servidor de lenguaje se activará automáticamente, exactamente como lo hace en VS Code y Cursor.

Para la configuración manual, cree `.vscode/settings.json` en la raíz del proyecto:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Configuración en Zed

[Zed](https://zed.dev/) tiene soporte LSP nativo a través de sus configuraciones de idioma. Agregue una entrada en su configuración de usuario de Zed (`~/.config/zed/settings.json`):

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

El marcador de posición `"..."` le dice a Zed que mantenga sus servidores de lenguaje predeterminados junto con el de Intlayer.

---

## Configuración para CLIs de agentes de IA (Claude Code, Codex, etc.)

**Claude Code** tiene soporte de primer nivel para plugins de LSP; siga la [configuración del plugin de Claude Code](#configuración-como-un-plugin-de-claude-code) anterior para obtener la experiencia completa de Ir a la definición directamente en sus sesiones de terminal.

**OpenAI Codex** y otras herramientas basadas en terminal aún no actúan como clientes LSP; leen y escriben archivos directamente en lugar de mantener una sesión de servidor de lenguaje persistente. Para esas herramientas, el valor de tener el LSP ejecutándose surge de manera indirecta: cuando el servidor está activo en un editor complementario (VS Code, Cursor, Windsurf, ...), el índice en vivo del editor está disponible para cualquier agente de IA que pueda consultarlo a través del contexto proporcionado por el editor (por ejemplo, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Si está trabajando puramente en una terminal sin un editor abierto, puede iniciar el servidor de lenguaje en segundo plano para que esté listo para cualquier editor que se conecte más tarde al mismo espacio de trabajo:

```bash
# Mantener el servidor activo en segundo plano
npx @intlayer/lsp &
```

---

## Configuración manual en Neovim

Usando [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), registre una configuración de servidor personalizada:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Inicie el servidor con npx para que no necesite una instalación global
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Después de reiniciar Neovim, presionar `gd` sobre una clave de Intlayer invocará Ir a la definición.

---

## Configuración manual en otros editores

Cualquier editor que admita el Protocolo de Servidor de Lenguaje puede usar `@intlayer/lsp`. El servidor:

- **Transporte** – Node.js IPC / stdio (estándar)
- **Ejecutable** – `npx @intlayer/lsp` (o el binario `intlayer-lsp` instalado localement)
- **Capacidades** – `definitionProvider: true`, `textDocumentSync: Incremental`

Consulte la documentación de LSP de su editor para conocer el formato de configuración exacto (por ejemplo, `languageserver.json` para [coc.nvim](https://github.com/neoclide/coc.nvim), o la configuración del cliente LSP en [Helix](https://helix-editor.com)).

### Ejemplo: coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### Ejemplo: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## Cómo funciona

Cuando se inicia el servidor, este resuelve la configuración de Intlayer desde la raíz del espacio de trabajo utilizando `getConfiguration()`. Esto le proporciona las rutas `build` y `system` necesarias para encontrar los diccionarios compilados.

En cada solicitud de **Ir a la definición**:

1. El servidor lee el texto completo del documento abierto.
2. Escanea llamadas de obtención (`useIntlayer`, `getIntlayer`, etc.) utilizando una expresión regular.
3. Comprueba si la posición del cursor cae dentro de una de esas llamadas.
4. Si es así, extrae la clave del diccionario (grupo de captura 3 de la expresión regular) y llama a `getUnmergedDictionaries()` para ubicar cada archivo de contenido que declara esa clave.
5. Lee cada archivo correspondiente y busca la línea exacta que contiene `key: "<key>"` para posicionar el cursor con precisión.
6. Devuelve una matriz de objetos `Location` — uno por archivo de origen.

La configuración se resuelve de manera diferida y se almacena en caché por sesión; se restablece en cada solicitud de `initialize` (por ejemplo, cuando abre una nueva carpeta de espacio de trabajo).

---

## Resolución de problemas

| Síntoma                                      | Causa probable                           | Solución                                                                                                   |
| -------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Ir a la definición no hace nada              | El servidor no se está ejecutando        | Compruebe que `@intlayer/lsp` esté instalado y que el editor lo esté iniciando                             |
| Raíz de espacio de trabajo incorrecta        | Múltiples carpetas de espacio de trabajo | Asegúrese de que la carpeta que contiene `intlayer.config.ts` sea la primera carpeta de espacio de trabajo |
| No se encuentran definiciones para una clave | Configuración no resuelta                | Verifique que `intlayer.config.ts` (o `.js`) exista en la raíz del espacio de trabajo                      |
| El servidor se bloquea al iniciar            | Versión de Node.js demasiado antigua     | Requiere Node.js ≥ 14.18                                                                                   |
