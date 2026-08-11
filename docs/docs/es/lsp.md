---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Servidor LSP de Intlayer
description: Descubra cómo el servidor de lenguaje de Intlayer aporta Go-to-Definition, búsqueda de referencias, vistas previas al pasar el cursor, autocompletado de claves y diagnósticos a su IDE y a su agente de IA.
keywords:
  - LSP
  - Servidor de lenguaje
  - Go to Definition
  - Autocompletado
  - Diagnósticos
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "Se añaden búsqueda de referencias, hover, autocompletado y diagnósticos"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Servidor LSP de Intlayer

El **servidor de lenguaje de Intlayer** es una implementación del [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) que hace que su IDE — y su agente de IA — reconozcan Intlayer. Conecta una llamada como `useIntlayer("home")` con el archivo `.content.ts` que la declara, en ambas direcciones.

---

## Funcionalidades

| Funcionalidad                    | Atajo               | Qué hace                                                                                                                 |
| -------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Ir a la definición**           | `F12` / `Cmd+Clic`  | Saltar desde una clave de diccionario o el uso de un campo a su declaración en el archivo de contenido                   |
| **Buscar todas las referencias** | `Mayús+F12`         | Desde un archivo de contenido, listar todos los puntos de llamada que usan esa clave o campo                             |
| **Hover**                        | pasar el cursor     | Previsualizar los campos de un diccionario, o el valor traducido de un campo, sin salir del archivo                      |
| **Autocompletado**               | `"` `'` `` ` `` `.` | Sugerir las claves de diccionario declaradas dentro de un getter, y los campos de contenido tras `.` o al desestructurar |
| **Diagnósticos**                 | automático          | Avisar cuando una clave no está declarada en ningún archivo de contenido                                                 |

Merece la pena conocer dos comportamientos adicionales:

- **Diccionarios fusionados** — una clave repartida entre varios archivos de contenido devuelve un resultado por archivo, de modo que puede navegar a cada declaración.
- **Compatible con monorepos** — el servidor resuelve el `intlayer.config.*` _más cercano_ a cada archivo, de modo que varios proyectos en un mismo espacio de trabajo tienen cada uno sus propios diccionarios.

### Llamadas compatibles

La clave se lee bien desde un argumento posicional de tipo cadena, bien desde un objeto de opciones (`{ namespace }`, `{ id }`).

| Biblioteca                  | Llamadas                                                 |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Esto funciona con todos los paquetes `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`), y con los paquetes adaptadores de compatibilidad que le permiten conservar su sintaxis i18n actual.

> Los diccionarios se leen de la salida de compilación, así que ejecute `npx intlayer build` — o mantenga su servidor de desarrollo en marcha — para darle al servidor algo que resolver.

---

## Instalación

El servidor se distribuye como el binario `intlayer-lsp` dentro de `@intlayer/lsp`:

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

Instálelo globalmente (`npm install -g @intlayer/lsp`) si su editor necesita `intlayer-lsp` en el `PATH` — es el caso del plugin de Claude Code y de cualquier configuración de abajo que invoque el binario directamente.

---

## Configuración

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Instale la [extensión de VS Code de Intlayer](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). El servidor de lenguaje va incluido desde la v8.12.0 y se inicia automáticamente — **no requiere configuración**.

Consulte la [documentación de la extensión de VS Code](https://intlayer.org/doc/vs-code-extension) para conocer sus demás funcionalidades.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) y [Windsurf](https://windsurf.com/) son forks de VS Code y usan el mismo ecosistema de extensiones. Instale la [extensión de VS Code de Intlayer](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) una vez y el servidor se activa automáticamente — **no requiere configuración**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer ofrece un **plugin de Claude Code** alojado en el repositorio de Intlayer. Le da a Claude Code una resolución real de símbolos para sus claves de diccionario en lugar de recurrir a `grep`.

Ponga el binario en su `PATH`, luego registre el marketplace e instale el plugin:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` también habilita el plugin. **Reinicie Claude Code** — los servidores de lenguaje se cargan al arrancar, así que el plugin no tiene efecto hasta entonces.

Claude Code inicia entonces el servidor en archivos `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` y `.svelte`, y usa `goToDefinition`, `findReferences` y `hover` al navegar por su código.

Si Go-to-Definition sigue sin hacer nada, puede que su versión de Claude Code limite la herramienta LSP tras una bandera:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed tiene soporte LSP nativo. Añada el servidor a sus ajustes de usuario:

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

El marcador `"..."` mantiene los servidores de lenguaje por defecto de Zed junto al de Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

Con [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), registre una configuración de servidor personalizada:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Iniciar el servidor con npx para no necesitar una instalación global
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

Tras reiniciar Neovim, `gd` sobre una clave de diccionario ejecuta Ir a la definición y `gr` ejecuta Buscar referencias.

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="Otros editores" value="other">

Cualquier editor compatible con LSP puede ejecutar `@intlayer/lsp`. Apúntelo a:

- **Ejecutable** — `npx @intlayer/lsp`, o el binario `intlayer-lsp`
- **Transporte** — stdio (estándar)
- **Capacidades** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (caracteres desencadenantes `"` `'` `` ` `` `.`), diagnósticos push, `textDocumentSync: Incremental`
- **Patrones de raíz** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Consulte la documentación LSP de su editor para el formato de configuración exacto.

  </Tab>
</Tabs>

---

## Nota sobre los agentes de IA en terminal

**Claude Code** actúa como un cliente LSP real — vea la pestaña anterior.

**OpenAI Codex** y la mayoría de las demás herramientas de terminal no son clientes LSP: leen y escriben archivos directamente. Ejecutar el servidor por sí solo no les ayuda; el valor viene de tenerlo activo en un editor acompañante cuyo índice el agente pueda consultar (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Cómo funciona

Para cada archivo, el servidor localiza el `intlayer.config.*` más cercano y carga la configuración de ese proyecto para encontrar los diccionarios compilados. La configuración, los diccionarios y la lista de archivos fuente se cachean con TTL cortos, y se invalidan cuando cambia un archivo de contenido vigilado.

En cada petición, el servidor analiza el documento (mediante [oxc](https://oxc.rs/)) e inspecciona la posición del cursor:

1. **Sobre una cadena de clave** (`useIntlayer("home")`) → devuelve todos los archivos de contenido que declaran esa clave, situados en su línea `key:`.
2. **Sobre el uso de un campo** (`content.title`, una propiedad desestructurada, `t('path.to.field')`, `<Trans>`, …) → resuelve la variable hasta su diccionario y devuelve el campo correspondiente dentro de los archivos de contenido.
3. **Desde un archivo de contenido** → ejecuta la búsqueda inversa, recorriendo las fuentes del proyecto en busca de los puntos de llamada de esa clave o campo.

---

## Solución de problemas

| Síntoma                                      | Causa probable                       | Solución                                                                         |
| -------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| No ocurre absolutamente nada                 | El servidor no está en ejecución     | Compruebe que `@intlayer/lsp` está instalado y que su editor lo lanza            |
| Funciona en el editor, no en Claude Code     | Plugin instalado a mitad de sesión   | Reinicie Claude Code — los servidores de lenguaje se cargan al arrancar          |
| No se encuentran definiciones para una clave | Diccionarios sin compilar            | Ejecute `npx intlayer build`, o inicie su servidor de desarrollo                 |
| Todas las claves marcadas como no declaradas | Configuración no resuelta            | Verifique que existe un `intlayer.config.ts` (o `.js`) en la raíz de su proyecto |
| Se usa el proyecto equivocado en un monorepo | Falta configuración por paquete      | Añada un `intlayer.config.*` a cada paquete que declare su propio contenido      |
| El servidor falla al arrancar                | Versión de Node.js demasiado antigua | Requiere Node.js ≥ 14.18                                                         |

En VS Code, el servidor registra en **Ver → Salida → «Intlayer LSP»** — útil para confirmar qué configuración se resolvió y cuántos diccionarios se encontraron.
