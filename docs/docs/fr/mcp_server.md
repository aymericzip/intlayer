---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md
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

Le **serveur Intlayer MCP (Model Context Protocol)** offre une assistance IDE alimentée par l'IA, spécialement conçue pour l'écosystème Intlayer. Conçu pour des environnements de développement modernes tels que **Cursor**, **GitHub Copilot workspace**, et tout IDE supportant le protocole MCP, ce serveur vous fournit un support contextuel en temps réel basé sur la configuration de votre projet.

## Pourquoi utiliser le serveur Intlayer MCP ?

En activant le serveur Intlayer MCP dans votre IDE, vous débloquez :

- **Intégration intelligente de la CLI**
  Accédez et exécutez les commandes CLI d'Intlayer directement depuis l'interface de votre IDE. Consultez la liste complète des commandes et options dans la [documentation CLI d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **Documentation contextuelle**
  Le serveur MCP charge et expose la documentation correspondant à la version d'Intlayer que vous utilisez dans votre projet. Cela garantit que les suggestions de code, les options de commande et les explications sont toujours à jour et pertinentes.

- **Développement assisté par IA**
  Grâce à des suggestions et une complétion automatique conscientes du projet, l'assistant IA peut expliquer votre code, recommander l'utilisation de la CLI ou suggérer comment utiliser des fonctionnalités spécifiques d'Intlayer en fonction de vos fichiers actuels.

- **Installation légère et instantanée**
  Aucune maintenance de serveur ni installation lourde requise. Il suffit de configurer votre fichier `.cursor/mcp.json` ou une configuration MCP équivalente, et vous êtes prêt à partir.

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

Cela indique à votre IDE de lancer le serveur MCP d'Intlayer en utilisant `npx`, garantissant qu'il utilise toujours la dernière version disponible sauf si vous la bloquez.

---

## Configuration de VS Code

Pour utiliser le serveur MCP d'Intlayer avec VS Code, vous devez le configurer dans les paramètres de votre espace de travail ou utilisateur.

### Configuration de l'espace de travail

Créez un fichier `.vscode/mcp.json` à la racine de votre projet :

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

### Utilisation du serveur MCP dans VS Code

1. **Activer le mode Agent** : Ouvrez la vue Chat (⌃⌘I sur Mac, Ctrl+Alt+I sur Windows/Linux) et sélectionnez le mode **Agent** dans le menu déroulant.

2. **Accéder aux outils** : Cliquez sur le bouton **Outils** pour voir les outils Intlayer disponibles. Vous pouvez sélectionner/désélectionner des outils spécifiques selon vos besoins.

3. **Référence directe aux outils** : Référencez les outils directement dans vos invites en tapant `#` suivi du nom de l'outil.

4. **Confirmation des outils** : Par défaut, VS Code demandera une confirmation avant d'exécuter les outils. Utilisez les options du bouton **Continuer** pour confirmer automatiquement les outils pour la session en cours, l'espace de travail ou toutes les exécutions futures.

### Gestion du serveur

- Exécutez **MCP : Lister les serveurs** depuis la palette de commandes pour voir les serveurs configurés
- Démarrez, arrêtez ou redémarrez le serveur MCP d'Intlayer selon vos besoins
- Consultez les journaux du serveur pour le dépannage en sélectionnant le serveur et en choisissant **Afficher la sortie**

Pour plus d'informations détaillées sur l'intégration MCP dans VS Code, consultez la [documentation officielle MCP de VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Utilisation du serveur MCP via la CLI

Vous pouvez également exécuter le serveur MCP Intlayer directement depuis la ligne de commande pour des tests, du débogage ou une intégration avec d'autres outils.

### Installer le serveur MCP

Tout d'abord, installez le paquet du serveur MCP globalement ou utilisez-le via npx :

```bash
# Installer globalement
npm install -g @intlayer/mcp

# Ou utiliser directement avec npx (recommandé)
npx @intlayer/mcp
```

### Démarrer le serveur

Pour démarrer le serveur MCP avec l'inspecteur pour le débogage et les tests :

```bash
# Utiliser la commande start intégrée
npm run start

# Ou directement avec npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Cela lancera le serveur MCP avec une interface d'inspecteur qui vous permet de :

- Tester les communications du protocole MCP
- Déboguer les réponses du serveur
- Valider les implémentations des outils et ressources
- Surveiller les performances du serveur

### Utilisation en développement

Pour les besoins de développement et de test, vous pouvez exécuter le serveur en différents modes :

```bash
# Compiler et démarrer en mode développement
npm run dev

# Exécuter avec une configuration personnalisée
node dist/cjs/index.cjs

# Tester les fonctionnalités du serveur
npm test
```

Le serveur exposera des outils et ressources spécifiques à Intlayer qui peuvent être utilisés par tout client compatible MCP, pas seulement Cursor ou d'autres IDE.

---

## Aperçu des fonctionnalités

| Fonctionnalité           | Description                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| Support CLI              | Exécutez les commandes `intlayer`, obtenez des indices d'utilisation et des arguments en ligne            |
| Documentation Versionnée | Détection automatique et chargement de la documentation correspondant à votre version actuelle d'Intlayer |
| Autocomplétion           | Suggestions intelligentes de commandes et de configurations au fur et à mesure de la saisie               |
| Prêt pour les Plugins    | Compatible avec les IDE et outils qui supportent la norme MCP                                             |

---

## Liens Utiles

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)
- [Dépôt GitHub Intlayer](https://github.com/aymericzip/intlayer)

---

## Historique de la Documentation

- 5.5.10 - 2025-06-29 : Historique initial
