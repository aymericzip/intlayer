---
createdAt: 2025-06-07
updatedAt: 2025-07-10
title: Documentation du serveur MCP
description: Explorez les fonctionnalités et la configuration du serveur MCP pour optimiser la gestion et les opérations de votre serveur.
keywords:
  - Serveur MCP
  - Gestion de serveur
  - Optimisation
  - Intlayer
  - Documentation
  - Configuration
  - Fonctionnalités
slugs:
  - doc
  - mcp-server
---

# Serveur MCP Intlayer

Le **serveur MCP (Model Context Protocol) Intlayer** fournit une assistance IDE alimentée par l'IA, adaptée à l'écosystème Intlayer.

## Où puis-je l'utiliser ?

- Sur des environnements de développement modernes comme **Cursor**, **VS Code**, et tout IDE supportant le protocole MCP.
- Sur votre assistant IA préféré comme **Claude Desktop**, **Gemini**, **ChatGPT**, etc.

## Pourquoi utiliser le serveur MCP Intlayer ?

En activant le serveur MCP Intlayer dans votre IDE, vous débloquez :

- **Documentation contextuelle**
  Le serveur MCP charge et expose la documentation d'Intlayer. Pour accélérer votre configuration, vos migrations, etc.
  Cela garantit que les suggestions de code, les options de commande et les explications sont toujours à jour et pertinentes.

- **Intégration intelligente de la CLI**
  Accédez et exécutez les commandes CLI d'Intlayer directement depuis l'interface de votre IDE. En utilisant le serveur MCP, vous pouvez laisser votre assistant IA exécuter des commandes comme `intlayer dictionaries build` pour mettre à jour vos dictionnaires, ou `intlayer dictionaries fill` pour compléter vos traductions manquantes.

  > Consultez la liste complète des commandes et options dans la [documentation CLI d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

---

## Configuration dans Cursor

Suivez la [documentation officielle](https://docs.cursor.com/context/mcp) pour configurer le serveur MCP dans Cursor.

À la racine de votre projet, ajoutez le fichier de configuration `.cursor/mcp.json` suivant :

### Serveur local (stdio) (recommandé)

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Serveur distant (SSE)

Pour vous connecter à un serveur MCP Intlayer distant utilisant les Server-Sent Events (SSE), vous pouvez configurer votre client MCP pour se connecter au service hébergé.

> **Note :** Le serveur distant n’intègre pas les outils CLI. Le serveur distant est uniquement destiné à la documentation et au contexte.

> **Note :** En raison des coûts d'hébergement du serveur, la disponibilité du serveur distant ne peut être garantie. Nous recommandons d'utiliser la méthode de transport du serveur local (stdio) pour une expérience la plus fiable.

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Cela indique à votre IDE de lancer le serveur MCP Intlayer en utilisant `npx`, garantissant qu'il utilise toujours la dernière version disponible à moins que vous ne la fixiez.

---

## Configuration dans VS Code

Suivez la [documentation officielle](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) pour configurer le serveur MCP dans VS Code.

Pour utiliser le serveur MCP Intlayer avec VS Code, vous devez le configurer dans les paramètres de votre espace de travail ou utilisateur.

### Serveur local (stdio) (recommandé)

Créez un fichier `.vscode/mcp.json` à la racine de votre projet :

```json filename=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Serveur distant (SSE)

Pour se connecter à un serveur MCP Intlayer distant utilisant les Server-Sent Events (SSE), vous pouvez configurer votre client MCP pour se connecter au service hébergé.

> **Note :** Le serveur distant n'intègre pas les outils CLI. Le serveur distant est uniquement destiné à la documentation et au contexte.

> **Note :** En raison des coûts d'hébergement du serveur, la disponibilité du serveur distant ne peut être garantie. Nous recommandons d'utiliser la méthode de transport du serveur local (stdio) pour une expérience la plus fiable.

```json filename=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## Configuration dans ChatGPT

### Serveur distant (SSE)

Suivez la [documentation officielle](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) pour configurer le serveur MCP dans ChatGPT.

1 - Allez sur le [tableau de bord des prompts](https://platform.openai.com/prompts)  
2 - Cliquez sur "+ Create"  
3 - Cliquez sur "Tools (Create or +)"  
4 - Sélectionnez "MCP Server"  
5 - Cliquez sur "Add new"  
6 - Remplissez les champs suivants :

- URL : https://mcp.intlayer.org
- Label : Serveur MCP Intlayer
- Name : intlayer-mcp-server
- Authentication : None

7 - Cliquez sur "Save"

> **Note :** Le serveur distant n’intègre pas les outils CLI. Le serveur distant est uniquement destiné à la documentation et au contexte.

> **Note :** En raison des coûts d'hébergement du serveur, la disponibilité du serveur distant ne peut être garantie. Nous recommandons d'utiliser la méthode de transport du serveur local (stdio) pour une expérience la plus fiable.

---

## Configuration dans Claude Desktop

Suivez la [documentation officielle](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) pour configurer le serveur MCP dans Claude Desktop.

Chemin du fichier de configuration :

- macOS : `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows : `%APPDATA%\Claude\claude_desktop_config.json`

### Serveur local (stdio) (recommandé)

```json filename="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## Utilisation du serveur MCP via CLI

Vous pouvez également exécuter le serveur MCP Intlayer directement depuis la ligne de commande pour les tests, le débogage ou l'intégration avec d'autres outils.

```bash
# Installer globalement
npm install -g @intlayer/mcp

# Ou utiliser directement avec npx (recommandé)
npx @intlayer/mcp
```

---

## Historique de la documentation

| Version | Date       | Modifications                                |
| ------- | ---------- | -------------------------------------------- |
| 5.5.12  | 2025-07-11 | Ajout de la configuration de ChatGPT         |
| 5.5.12  | 2025-07-10 | Ajout de la configuration de Claude Desktop  |
| 5.5.12  | 2025-07-10 | Ajout du transport SSE et du serveur distant |
| 5.5.10  | 2025-06-29 | Historique initial                           |
