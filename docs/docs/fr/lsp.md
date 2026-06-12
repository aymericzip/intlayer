---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Serveur LSP Intlayer
description: Découvrez comment le serveur de langage Intlayer fournit la fonctionnalité Go-to-Definition et d'autres fonctionnalités de l'EDI pour useIntlayer, getIntlayer et les appels associés dans tous les éditeurs pris en charge.
keywords:
  - LSP
  - Serveur de langage
  - Go to Definition
  - EDI
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
author: aymericzip
---

# Serveur LSP Intlayer

Le **serveur de langage Intlayer (LSP)** est une implémentation du [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) qui améliore votre EDI avec une intelligence prenant en charge Intlayer. Il fournit actuellement la fonctionnalité **Go to Definition** pour les appels de clés de dictionnaire, vous permettant de passer directement de `useIntlayer("my-key")` dans votre composant au fichier `.content.ts` qui le déclare.

---

## Pourquoi utiliser le LSP ?

Lorsque vous utilisez Intlayer, la connexion entre un appel comme `useIntlayer("homepage")` et sa déclaration dans `src/homepage.content.ts` est implicite. Sans outil, vous devez rechercher le fichier manuellement. Le LSP rend ce lien explicite :

**intégration avec les agents IA**

Les agents de codage IA (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) s'appuient sur le serveur de langage pour résoudre les symboles et comprendre les relations entre les fichiers. Avec le LSP Intlayer en cours d'exécution, les agents peuvent suivre `useIntlayer("key")` jusqu'à sa déclaration, leur donnant un contexte précis sur les clés de contenu disponibles, la forme de chaque dictionnaire et les fichiers à lire ou à modifier.

**Aller à la définition**

Placez votre curseur sur n'importe quelle chaîne de clé de dictionnaire dans un appel d'obtention pris en charge et appuyez sur `F12` (ou `Cmd/Ctrl+Clic`). L'éditeur ouvre le fichier de déclaration de contenu et positionne le curseur sur la ligne `key:`.

**Prise en charge des dictionnaires fusionnés**

Une clé peut être répartie sur plusieurs fichiers de contenu (Intlayer les fusionne). Le serveur renvoie un emplacement (`Location`) par fichier source afin que vous puissiez naviguer vers chaque déclaration.

**Fonctionne partout**

Prend en charge tous les packages `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Appels d'obtention pris en charge

Le serveur détecte les appels de fonction suivants et extrait le premier argument de type chaîne littérale comme clé de dictionnaire :

| Fonction      | Exemple                       |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

Les génériques TypeScript et les arguments supplémentaires sont ignorés — seule la chaîne de clé compte.

> `useDictionary` et `getDictionary` prennent un objet `Dictionary` déjà importé comme premier argument plutôt qu'une clé sous forme de chaîne, de sorte qu'ils ne bénéficient pas de la fonctionnalité Go-to-Definition et ne sont pas suivis par le serveur.

---

## Installation

Le serveur LSP est distribué dans le cadre de `@intlayer/lsp` :

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

Le package expose le binaire `intlayer-lsp`, que les éditeurs utilisent comme exécutable du serveur.

---

## Configuration en tant que plugin Claude Code

Le LSP Intlayer est disponible en tant que **plugin Claude Code** hébergé directement dans le dépôt GitHub Intlayer. L'installer donne à Claude Code une sensibilisation native à la fonctionnalité Go-to-Definition pour tous vos appels `useIntlayer` / `getIntlayer`.

### 1. Installer le binaire du serveur de langage

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Cela place le binaire `intlayer-lsp` dans votre variable d'environnement PATH, ce qui est invoqué par l'entrée `lspServers` du plugin.

### 2. Enregistrer le marketplace Intlayer et installer le plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code ajoutera `"intlayer-lsp@intlayer": true` à vos `enabledPlugins` et démarrera automatiquement le serveur de langage sur les types de fichiers pris en charge (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Activer l'outil LSP (si non déjà actif)

Certaines versions de Claude Code nécessitent que le feature flag LSP soit défini. Ajoutez ce qui suit à votre fichier `~/.claude/settings.json` si Go-to-Definition ne fonctionne pas après l'installation :

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Redémarrez Claude Code — il utilisera désormais `goToDefinition`, `findReferences` et d'autres opérations LSP lors de la navigation dans votre base de code Intlayer au lieu de revenir à `grep`.

---

## Configuration dans VS Code (via l'extension — recommandé)

Si l'**extension VS Code Intlayer** est installée, le serveur de langage démarre automatiquement. Aucune configuration supplémentaire n'est requise. Le LSP est directement intégré dans l'extension VSCode depuis la v8.12.0.

> Voir la [documentation de l'extension VS Code](https://intlayer.org/doc/vs-code-extension) pour l'installation et d'autres fonctionnalités.

---

## Configuration manuelle dans VS Code

Si vous n'utilisez pas l'extension Intlayer, vous pouvez connecter le serveur de langage manuellement à l'aide d'une extension cliente LSP générique telle que [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) ou en écrivant votre propre petite extension. L'approche recommandée consiste à utiliser l'extension Intlayer.

Pour référence, le serveur se lance via le binaire `intlayer-lsp` sur stdio :

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

L'extension Intlayer lit ces paramètres pour lancer le serveur. Si vous comptez uniquement sur l'extension, aucun paramètre manuel n'est nécessaire.

---

## Configuration dans Cursor

[Cursor](https://www.cursor.com/) est un fork de VS Code avec des fonctionnalités d'IA intégrées. Il utilise le même écosystème d'extensions, donc l'**extension VS Code Intlayer** fonctionne sans aucune configuration supplémentaire — installez-la une fois et Cursor la récupère automatiquement.

Si vous préférez une configuration manuelle, Cursor lit également `.vscode/settings.json` depuis la racine de l'espace de travail, donc le snippet VS Code ci-dessus s'applique directement.

---

## Configuration dans Windsurf

[Windsurf](https://windsurf.com/) (par Codeium) est un autre éditeur basé sur VS Code. Installez l'extension Intlayer depuis le VS Code Marketplace et le serveur de langage s'active automatiquement, exactement comme dans VS Code et Cursor.

Pour une configuration manuelle, créez `.vscode/settings.json` à la racine du projet :

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Configuration dans Zed

[Zed](https://zed.dev/) prend en charge nativement le LSP via ses paramètres de langage. Ajoutez une entrée dans vos paramètres utilisateur Zed (`~/.config/zed/settings.json`) :

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

L'espace réservé `"..."` indique à Zed de conserver ses serveurs de langage par défaut aux côtés de celui d'Intlayer.

---

## Configuration pour les CLI d'agents IA (Claude Code, Codex, etc.)

**Claude Code** dispose d'un support de plugin LSP de premier ordre — suivez la [configuration du plugin Claude Code](#configuration-en-tant-que-plugin-claude-code) ci-dessus pour obtenir l'expérience complète de Go-to-Definition directement dans vos sessions de terminal.

**OpenAI Codex** et les autres outils basés sur le terminal ne fonctionnent pas encore comme des clients LSP — ils lisent et écrivent des fichiers directement plutôt que de maintenir une session de serveur de langage persistante. Pour ces outils, la valeur d'avoir le LSP en cours d'exécution vient indirectement : lorsque le serveur est actif dans un éditeur compagnon (VS Code, Cursor, Windsurf, …), l'index en direct de l'éditeur est disponible pour tout agent IA qui peut l'interroger via le contexte fourni par l'éditeur (par exemple, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Si vous travaillez uniquement dans un terminal sans éditeur ouvert, vous pouvez démarrer le serveur de langage en arrière-plan afin qu'il soit prêt pour tout éditeur qui se connectera ultérieurement au même espace de travail :

```bash
# Garder le serveur actif en arrière-plan
npx @intlayer/lsp &
```

---

## Configuration manuelle dans Neovim

En utilisant [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), enregistrez une configuration de serveur personnalisée :

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Lancer le serveur avec npx pour éviter une installation globale
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

Après avoir redémarré Neovim, appuyer sur `gd` sur une clé Intlayer invoquera Go to Definition.

---

## Configuration manuelle dans d'autres éditeurs

Tout éditeur prenant en charge le Language Server Protocol peut utiliser `@intlayer/lsp`. Le serveur :

- **Transport** – Node.js IPC / stdio (standard)
- **Exécutable** – `npx @intlayer/lsp` (ou le binaire `intlayer-lsp` installé localement)
- **Capacités** – `definitionProvider: true`, `textDocumentSync: Incremental`

Consultez la documentation LSP de votre éditeur pour le format de configuration exact (par exemple, `languageserver.json` pour [coc.nvim](https://github.com/neoclide/coc.nvim), ou les paramètres client LSP dans [Helix](https://helix-editor.com)).

### Exemple : coc.nvim

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

### Exemple : Helix

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

## Comment ça fonctionne

Lorsque le serveur démarre, il résout la configuration Intlayer à partir de la racine de l'espace de travail en utilisant `getConfiguration()`. Cela lui donne les chemins `build` et `system` nécessaires pour trouver les dictionnaires compilés.

Sur chaque requête **Go to Definition** :

1. Le serveur lit le texte complet du document ouvert.
2. Il recherche les appels d'obtention (`useIntlayer`, `getIntlayer`, etc.) à l'aide d'une expression régulière.
3. Il vérifie si la position du curseur se situe à l'intérieur de l'un de ces appels.
4. Si c'est le cas, il extrait la clé de dictionnaire (groupe de capture 3 de la regex) et appelle `getUnmergedDictionaries()` pour localiser chaque fichier de contenu qui déclare cette clé.
5. Il lit chaque fichier correspondant et trouve la ligne exacte contenant `key: "<key>"` pour positionner le curseur précisément.
6. Il renvoie un tableau d'objets `Location` — un par fichier source.

La configuration est résolue de manière paresseuse et mise en cache par session ; elle se réinitialise à chaque requête `initialize` (par exemple, lorsque vous ouvrez un nouveau dossier d'espace de travail).

---

## Dépannage

| Symptôme                                     | Cause probable                         | Solution                                                                                              |
| -------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Go to Definition ne fait rien                | Le serveur ne tourne pas               | Vérifiez que `@intlayer/lsp` est installé et que l'éditeur le lance                                   |
| Mauvaise racine d'espace de travail détectée | Plusieurs dossiers d'espace de travail | Assurez-vous que le dossier contenant `intlayer.config.ts` est le premier dossier d'espace de travail |
| Définitions introuvables pour une clé        | Configuration non résolue              | Vérifiez que `intlayer.config.ts` (ou `.js`) existe à la racine de l'espace de travail                |
| Le serveur plante au démarrage               | Version de Node.js trop ancienne       | Nécessite Node.js ≥ 14.18                                                                             |
