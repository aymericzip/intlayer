# Serveur MCP Intlayer

Le **Serveur MCP (Model Context Protocol) Intlayer** offre une assistance IDE alimentée par l'IA, adaptée à l'écosystème [Intlayer](https://github.com/aymericzip/intlayer). Conçu pour des environnements de développement modernes comme **Cursor**, **GitHub Copilot workspace**, et tout IDE prenant en charge le protocole MCP, ce serveur vous fournit un support contextuel et en temps réel basé sur la configuration de votre projet.

## Pourquoi utiliser le Serveur MCP Intlayer ?

En activant le Serveur MCP Intlayer dans votre IDE, vous bénéficiez de :

- **Intégration CLI intelligente**  
  Accédez et exécutez les commandes CLI Intlayer directement depuis l'interface de votre IDE. Consultez la liste complète des commandes et options dans la [documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

- **Documentation contextuelle**  
  Le serveur MCP charge et expose la documentation correspondant à la version d'Intlayer que vous utilisez dans votre projet. Cela garantit que les suggestions de code, les options de commande et les explications sont toujours à jour et pertinentes.

- **Développement assisté par l'IA**  
  Avec des suggestions et des autocomplétions adaptées au projet, l'assistant IA peut expliquer votre code, recommander l'utilisation de la CLI ou suggérer comment utiliser des fonctionnalités spécifiques d'Intlayer en fonction de vos fichiers actuels.

- **Configuration légère et instantanée**  
  Pas de maintenance serveur ou d'installation lourde requise. Configurez simplement votre fichier `.cursor/mcp.json` ou un fichier de configuration MCP équivalent, et vous êtes prêt à commencer.

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

## 🛠 Aperçu des fonctionnalités

| Fonctionnalité       | Description                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| 🧠 Support CLI       | Exécutez les commandes `intlayer`, obtenez des indices d'utilisation et des arguments en ligne            |
| 📘 Docs versionnées  | Détection automatique et chargement de la documentation correspondant à votre version actuelle d'Intlayer |
| 🛎 Autocomplétion    | Suggestions intelligentes de commandes et de configurations au fur et à mesure que vous tapez             |
| 🧩 Prêt pour plugins | Compatible avec les IDE et outils prenant en charge le standard MCP                                       |

---

## 📎 Liens utiles

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)
- [Dépôt GitHub Intlayer](https://github.com/aymericzip/intlayer)

---
