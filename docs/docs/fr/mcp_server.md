---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: Documentation du serveur MCP
description: Découvrez les fonctionnalités et la configuration du serveur MCP pour optimiser la gestion et les opérations de votre serveur.
keywords:
  - Serveur MCP
  - Gestion de serveur
  - Optimisation
  - Intlayer
  - Documentation
  - Configuration
  - Fonctionnalités
---

# Serveur MCP Intlayer

Le **Serveur Intlayer MCP (Model Context Protocol)** offre une assistance IDE alimentée par l'IA, adaptée à l'écosystème Intlayer. Conçu pour les environnements de développement modernes comme **Cursor**, **GitHub Copilot workspace**, et tout IDE prenant en charge le protocole MCP, ce serveur vous fournit une assistance contextuelle et en temps réel basée sur la configuration de votre projet.

## Pourquoi utiliser le Serveur Intlayer MCP ?

En activant le Serveur Intlayer MCP dans votre IDE, vous bénéficiez de :

- **Intégration CLI intelligente**  
  Accédez et exécutez les commandes CLI d'Intlayer directement depuis l'interface de votre IDE. Consultez la liste complète des commandes et options dans la [documentation CLI d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **Documentation contextuelle**  
  Le serveur MCP charge et expose la documentation correspondant à la version d'Intlayer que vous utilisez dans votre projet. Cela garantit que les suggestions de code, les options de commande et les explications sont toujours à jour et pertinentes.

- **Développement assisté par IA**  
  Avec des suggestions et des autocomplétions adaptées au projet, l'assistant IA peut expliquer votre code, recommander l'utilisation de la CLI ou suggérer comment utiliser des fonctionnalités spécifiques d'Intlayer en fonction de vos fichiers actuels.

- **Configuration légère et instantanée**  
  Pas de maintenance serveur ou d'installation lourde requise. Configurez simplement votre fichier `.cursor/mcp.json` ou une configuration MCP équivalente et vous êtes prêt à commencer.

---

## Configuration de Cursor

Dans la racine de votre projet, ajoutez le fichier de configuration `.cursor/mcp.json` suivant :

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

Cela indique à votre IDE de lancer le serveur MCP Intlayer en utilisant `npx`, garantissant qu'il utilise toujours la dernière version disponible, sauf si vous la fixez.

---

## Configuration de VS Code

Pour utiliser le Serveur Intlayer MCP avec VS Code, vous devez le configurer dans vos paramètres de workspace ou utilisateur.

### Configuration du Workspace

Créez un fichier `.vscode/mcp.json` dans la racine de votre projet :

```json
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

### Utilisation du Serveur MCP dans VS Code

1. **Activer le mode Agent** : Ouvrez la vue Chat (⌃⌘I sur Mac, Ctrl+Alt+I sur Windows/Linux) et sélectionnez le mode **Agent** dans le menu déroulant.

2. **Accéder aux outils** : Cliquez sur le bouton **Tools** pour voir les outils Intlayer disponibles. Vous pouvez sélectionner/désélectionner des outils spécifiques selon vos besoins.

3. **Référence directe aux outils** : Référez-vous directement aux outils dans vos invites en tapant `#` suivi du nom de l'outil.

4. **Confirmation des outils** : Par défaut, VS Code demandera une confirmation avant d'exécuter les outils. Utilisez les options du bouton **Continue** pour confirmer automatiquement les outils pour la session en cours, le workspace ou toutes les futures invocations.

### Gestion du Serveur

- Exécutez **MCP: List Servers** depuis la palette de commandes pour voir les serveurs configurés.
- Démarrez, arrêtez ou redémarrez le serveur MCP Intlayer selon vos besoins.
- Consultez les journaux du serveur pour le dépannage en sélectionnant le serveur et en choisissant **Show Output**.

Pour plus d'informations sur l'intégration MCP dans VS Code, consultez la [documentation officielle MCP de VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Utilisation du Serveur MCP via CLI

Vous pouvez également exécuter le serveur MCP Intlayer directement depuis la ligne de commande pour tester, déboguer ou l'intégrer à d'autres outils.

### Installer le Serveur MCP

Tout d'abord, installez le package du serveur MCP globalement ou utilisez-le via npx :

```bash
# Installer globalement
npm install -g @intlayer/mcp

# Ou utiliser directement avec npx (recommandé)
npx @intlayer/mcp
```

### Démarrer le Serveur

Pour démarrer le serveur MCP avec l'inspecteur pour le débogage et les tests :

```bash
# Utiliser la commande start intégrée
npm run start

# Ou directement avec npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Cela lancera le serveur MCP avec une interface d'inspection qui vous permet de :

- Tester les communications du protocole MCP
- Déboguer les réponses du serveur
- Valider les implémentations d'outils et de ressources
- Surveiller les performances du serveur

### Utilisation en Développement

Pour le développement et les tests, vous pouvez exécuter le serveur dans divers modes :

```bash
# Construire et démarrer en mode développement
npm run dev

# Exécuter avec une configuration personnalisée
node dist/cjs/index.cjs

# Tester les fonctionnalités du serveur
npm test
```

Le serveur exposera des outils et ressources spécifiques à Intlayer qui peuvent être consommés par tout client compatible MCP, pas seulement Cursor ou d'autres IDE.

---

## Aperçu des fonctionnalités

| Fonctionnalité    | Description                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Support CLI       | Exécutez les commandes `intlayer`, obtenez des indices d'utilisation et des arguments en ligne            |
| Docs versionnées  | Détection automatique et chargement de la documentation correspondant à votre version actuelle d'Intlayer |
| Autocomplétion    | Suggestions intelligentes de commandes et de configurations au fur et à mesure que vous tapez             |
| Prêt pour plugins | Compatible avec les IDE et outils prenant en charge la norme MCP                                          |

---

## Liens utiles

- [Documentation CLI d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)
- [Dépôt GitHub Intlayer](https://github.com/aymericzip/intlayer)

---
