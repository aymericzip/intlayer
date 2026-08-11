---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Serveur LSP Intlayer
description: Découvrez comment le serveur de langage Intlayer apporte Go-to-Definition, la recherche de références, les aperçus au survol, l'autocomplétion des clés et les diagnostics à votre EDI et à votre agent IA.
keywords:
  - LSP
  - Serveur de langage
  - Go to Definition
  - Autocomplétion
  - Diagnostics
  - EDI
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
    changes: "Ajout de la recherche de références, du survol, de l'autocomplétion et des diagnostics"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Serveur LSP Intlayer

Le **serveur de langage Intlayer** est une implémentation du [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) qui rend votre EDI — et votre agent IA — conscient d'Intlayer. Il relie un appel comme `useIntlayer("home")` au fichier `.content.ts` qui le déclare, dans les deux sens.

---

## Fonctionnalités

| Fonctionnalité                       | Raccourci                | Description                                                                                                                  |
| ------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Aller à la définition**            | `F12` / `Cmd+Clic`       | Passer d'une clé de dictionnaire ou d'une utilisation de champ à sa déclaration dans le fichier de contenu                   |
| **Rechercher toutes les références** | `Maj+F12`                | Depuis un fichier de contenu, lister tous les sites d'appel qui utilisent cette clé ou ce champ                              |
| **Survol**                           | survoler avec le curseur | Prévisualiser les champs d'un dictionnaire, ou la valeur traduite d'un champ, sans quitter le fichier                        |
| **Autocomplétion**                   | `"` `'` `` ` `` `.`      | Suggérer les clés de dictionnaire déclarées dans un getter, et les champs de contenu après `.` ou lors d'une déstructuration |
| **Diagnostics**                      | automatique              | Avertir lorsqu'une clé n'est déclarée dans aucun fichier de contenu                                                          |

Deux comportements supplémentaires méritent d'être connus :

- **Dictionnaires fusionnés** — une clé répartie sur plusieurs fichiers de contenu renvoie un résultat par fichier, ce qui vous permet de naviguer vers chaque déclaration.
- **Compatible monorepo** — le serveur résout le fichier `intlayer.config.*` le _plus proche_ de chaque fichier, afin que plusieurs projets dans un même espace de travail disposent chacun de leurs propres dictionnaires.

### Appels pris en charge

La clé est lue soit depuis un argument positionnel de type chaîne, soit depuis un objet d'options (`{ namespace }`, `{ id }`).

| Bibliothèque                | Appels                                                   |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Cela fonctionne pour tous les packages `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`), ainsi que pour les packages d'adaptation compat qui vous permettent de conserver votre syntaxe i18n existante.

> Les dictionnaires sont lus depuis la sortie de build : exécutez `npx intlayer build` — ou laissez votre serveur de développement tourner — pour donner au serveur quelque chose à résoudre.

---

## Installation

Le serveur est distribué sous forme du binaire `intlayer-lsp` dans `@intlayer/lsp` :

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

Installez-le plutôt globalement (`npm install -g @intlayer/lsp`) si votre éditeur a besoin de `intlayer-lsp` dans le `PATH` — c'est le cas pour le plugin Claude Code et pour toute configuration ci-dessous qui appelle directement le binaire.

---

## Configuration

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Installez l'[extension VS Code Intlayer](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). Le serveur de langage y est intégré depuis la v8.12.0 et démarre automatiquement — **aucune configuration requise**.

Consultez la [documentation de l'extension VS Code](https://intlayer.org/doc/vs-code-extension) pour ses autres fonctionnalités.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) et [Windsurf](https://windsurf.com/) sont des forks de VS Code et utilisent le même écosystème d'extensions. Installez l'[extension VS Code Intlayer](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) une fois et le serveur s'active automatiquement — **aucune configuration requise**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer fournit un **plugin Claude Code** hébergé dans le dépôt Intlayer. Il donne à Claude Code une véritable résolution des symboles pour vos clés de dictionnaire, au lieu de se rabattre sur `grep`.

Placez le binaire dans votre `PATH`, puis enregistrez la marketplace et installez le plugin :

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` active également le plugin. **Redémarrez Claude Code** — les serveurs de langage sont chargés au démarrage, le plugin n'a donc aucun effet avant cela.

Claude Code démarre ensuite le serveur sur les fichiers `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` et `.svelte`, et utilise `goToDefinition`, `findReferences` et `hover` lors de la navigation dans votre code.

Si Go-to-Definition ne fait toujours rien, votre version de Claude Code conditionne peut-être l'outil LSP à un drapeau :

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed prend en charge nativement le LSP. Ajoutez le serveur à vos paramètres utilisateur :

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

L'espace réservé `"..."` conserve les serveurs de langage par défaut de Zed aux côtés de celui d'Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

Avec [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), enregistrez une configuration de serveur personnalisée :

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

Après avoir redémarré Neovim, `gd` sur une clé de dictionnaire lance Aller à la définition et `gr` lance Rechercher les références.

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
  <Tab label="Autres éditeurs" value="other">

Tout éditeur compatible LSP peut exécuter `@intlayer/lsp`. Pointez-le vers :

- **Exécutable** — `npx @intlayer/lsp`, ou le binaire `intlayer-lsp`
- **Transport** — stdio (standard)
- **Capacités** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (caractères déclencheurs `"` `'` `` ` `` `.`), diagnostics poussés, `textDocumentSync: Incremental`
- **Motifs de racine** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Consultez la documentation LSP de votre éditeur pour le format de configuration exact.

  </Tab>
</Tabs>

---

## Remarque sur les agents IA en terminal

**Claude Code** agit comme un véritable client LSP — voir l'onglet ci-dessus.

**OpenAI Codex** et la plupart des autres outils en terminal ne sont pas des clients LSP : ils lisent et écrivent les fichiers directement. Lancer le serveur seul ne les aide pas ; l'intérêt vient de son activation dans un éditeur compagnon dont l'agent peut interroger l'index (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Fonctionnement

Pour chaque fichier, le serveur localise le fichier `intlayer.config.*` le plus proche et charge la configuration de ce projet afin de trouver les dictionnaires compilés. La configuration, les dictionnaires et la liste des fichiers sources sont mis en cache avec de courtes durées de vie, et invalidés dès qu'un fichier de contenu surveillé change.

Lors d'une requête, le serveur analyse le document (via [oxc](https://oxc.rs/)) et examine la position du curseur :

1. **Sur une chaîne de clé** (`useIntlayer("home")`) → renvoie tous les fichiers de contenu déclarant cette clé, positionnés sur leur ligne `key:`.
2. **Sur l'utilisation d'un champ** (`content.title`, une propriété déstructurée, `t('path.to.field')`, `<Trans>`, …) → remonte la variable jusqu'à son dictionnaire et renvoie le champ correspondant dans les fichiers de contenu.
3. **Depuis un fichier de contenu** → effectue la recherche inverse, en parcourant les sources du projet à la recherche des sites d'appel de cette clé ou de ce champ.

---

## Dépannage

| Symptôme                                        | Cause probable                      | Solution                                                                          |
| ----------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| Rien ne se passe du tout                        | Le serveur ne tourne pas            | Vérifiez que `@intlayer/lsp` est installé et que votre éditeur le lance           |
| Fonctionne dans l'éditeur, pas dans Claude Code | Plugin installé en cours de session | Redémarrez Claude Code — les serveurs de langage se chargent au démarrage         |
| Aucune définition trouvée pour une clé          | Dictionnaires non construits        | Exécutez `npx intlayer build`, ou démarrez votre serveur de développement         |
| Toutes les clés signalées comme non déclarées   | Configuration non résolue           | Vérifiez qu'un `intlayer.config.ts` (ou `.js`) existe à la racine de votre projet |
| Mauvais projet utilisé dans un monorepo         | Configuration par package manquante | Ajoutez un `intlayer.config.*` à chaque package qui déclare son propre contenu    |
| Le serveur plante au démarrage                  | Version de Node.js trop ancienne    | Nécessite Node.js ≥ 14.18                                                         |

Dans VS Code, le serveur écrit ses journaux dans **Affichage → Sortie → « Intlayer LSP »** — utile pour confirmer quelle configuration a été résolue et combien de dictionnaires ont été trouvés.
