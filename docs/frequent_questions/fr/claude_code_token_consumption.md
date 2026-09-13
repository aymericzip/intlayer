---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: Comment limiter la consommation de tokens de Claude Code pour générer des traductions
description: Pourquoi traduire avec Claude Code consomme inutilement des tokens, ce qu'Intlayer fait à la place (filtre les clés traduites, découpe le JSON, traduit le markdown bloc par bloc), et comment réutiliser votre abonnement Claude avec claude setup-token.
keywords:
  - claude code
  - tokens
  - consommation de tokens
  - setup-token
  - i18n
  - internationalisation
  - traduction
  - fill
  - mcp
  - agent
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Comment limiter la consommation de tokens de Claude Code pour générer des traductions

## Description du problème

Demander à Claude Code (ou à tout agent de code) de traduire votre contenu est la façon la plus coûteuse de procéder. À chaque exécution, l'agent doit :

- Charger l'intégralité du fichier JSON ou de contenu dans son contexte, même les clés déjà traduites.
- Parcourir les fichiers associés pour déterminer où se trouve le contenu et comment il est structuré.
- Identifier quelles locales sont manquantes et doivent être générées.
- Relire vos instructions personnalisées à chaque fois ("transformer les URLs de cette façon", "conserver le nom de marque en anglais", "utiliser le tutoiement").
- Réécrire l'ensemble du fichier, y compris les parties qui n'ont pas changé.

Tout cela est réémis à chaque tour, ce qui fait croître le coût selon `taille du contenu × nombre de locales × nombre de tours`, et tout écart de formatage ou de clé doit être vérifié manuellement.

## Ce qu'Intlayer fait à la place

L'intérêt d'Intlayer est d'effectuer ce travail en dehors de l'agent, avec un pipeline spécialement conçu pour la traduction :

- **Filtre les traductions existantes** pour limiter l'utilisation de tokens. Les clés déjà traduites dans votre JSON sont ignorées, et seules les clés manquantes sont envoyées au modèle.
- **Traduit le markdown bloc par bloc.** Pour la documentation, [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-translate.md) et [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-review.md) comparent chaque bloc avec le document de base et ignorent les blocs déjà traduits ou inchangés.
- **Découpe votre JSON (chunking)** s'il est trop volumineux, afin de rester dans la partie optimale de la fenêtre de contexte.
- **Aplatit et reconstruit votre JSON** pour optimiser la consommation de tokens.
- **Insère des prompts personnalisés** pour les règles spécifiques liées à votre marque et à votre terminologie (`applicationContext`, `--custom-instructions`), vous permettant ainsi de les écrire une seule fois au lieu de les répéter à chaque conversation.
- **Valide la structure** pour garantir la cohérence, prévenir la dérive des clés, et préserver le formatage (markdown, HTML, insertions, pluriels).
- **Gère les nouvelles tentatives (retry)** lorsque la réponse est malformée.
- **Met en file d'attente et踟 parallélise les requêtes** sur les fichiers, les morceaux et les locales pour augmenter la vitesse.

Rien de tout cela ne transite par le contexte de l'agent. La règle d'or : laissez l'agent décider **quoi** internationaliser, et laissez Intlayer se charger du travail répétitif.

## Solution

### 1. Déléguer l'extraction à `intlayer extract`

Au lieu de demander à l'agent de réécrire chaque composant à la main, laissez-le exécuter la commande [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md). Elle déplace les chaînes codées en dur vers un fichier `.content` à côté du composant sans charger tout le fichier dans le contexte de l'agent.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Déléguer la traduction à `intlayer fill`

Ne demandez jamais à l'agent de traduire. La commande [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) applique le pipeline décrit ci-dessus : elle n'envoie que les clés manquantes, les découpe en morceaux, traite les locales en parallèle et réécrit le résultat dans vos fichiers de contenu.

```bash
npx intlayer fill
```

Quelques options permettent de restreindre l'exécution :

- `--git-diff` (ou `--uncommitted`) traite uniquement les dictionnaires modifiés dans la branche actuelle.
- `--file` ou `--keys` cible des fichiers de contenu spécifiques.
- `--output-locales fr es` restreint l'exécution aux locales dont vous avez réellement besoin pour le moment.
- `--skip-metadata` ignore la génération du titre, de la description et des tags.
- `--data-serialization toon` transmet une charge utile plus compacte au modèle (moins de tokens, sortie légèrement moins prévisible).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Traduire le markdown avec `doc translate` et `doc review`

Demander à un agent de traduire un fichier `.md` oblige à coller le document complet, pour chaque locale, à chaque modification. Les commandes [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-translate.md) et [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-review.md) opèrent plutôt bloc par bloc.

Utilisez `doc translate` lorsque le fichier traduit n'existe pas encore. Elle découpe le markdown, le traduit en parallèle et écrit les fichiers cibles :

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Utilisez `doc review` lorsque le fichier traduit existe déjà. Elle compare chaque bloc au document de base, ignore les blocs déjà traduits ou inchangés, et n'envoie que les blocs divergents :

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Les deux commandes acceptent vos règles une seule fois, au lieu de les répéter dans chaque invite :

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Deux modes de `doc review` sont utiles lorsque l'agent doit rester dans la boucle sans aucun appel IA de la part d'Intlayer :

- `--mode report` affiche les blocs nécessitant une attention avec les numéros de ligne, afin que l'agent ne modifie que ces blocs.
- `--mode synthesis` affiche uniquement les documents qui sont à jour et ceux qui contiennent encore des blocs à modifier.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Laisser l'agent appeler le CLI via le serveur MCP

Grâce au [serveur MCP Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md), l'agent s'appuie sur la documentation à jour et exécute lui-même `intlayer fill` ou `intlayer doc review` au lieu de réimplémenter la logique dans la conversation.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Installer les [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md) avec `npx intlayer init skills` évite également à l'agent de deviner l'API Intlayer et de relire la documentation à chaque tâche.

### 5. Réutiliser votre abonnement Claude avec `claude setup-token`

Exécuter la configuration i18n dans votre session interactive Claude Code conserve tout l'historique de la conversation dans le contexte. Déplacez plutôt cette charge vers une courte session headless.

Générez un token longue durée depuis votre abonnement Claude :

```bash
claude setup-token
```

Enregistrez-le en tant que `CLAUDE_CODE_OAUTH_TOKEN` (dans un fichier `.env` ou dans les secrets de votre CI), puis réutilisez-le pour une session unique qui exécute les commandes Intlayer :

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

La session ne contient que ce prompt et la sortie de la commande, sans tout l'historique de votre conversation. Le même token fonctionne dans la [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) pour exécuter `intlayer fill` sur chaque pull request.

> Le token généré par `claude setup-token` authentifie uniquement Claude Code. Il ne peut pas être utilisé comme clé API Anthropic dans `ai.apiKey`. Pour la traduction elle-même, `intlayer fill` utilise votre [compte Intlayer](https://app.intlayer.org) (offre gratuite incluse) ou votre propre clé de fournisseur configurée dans [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#ai-configuration).

## Résumé

| Tâche                          | Responsable                  | Tokens dans le contexte de l'agent |
| ------------------------------ | ---------------------------- | ---------------------------------- |
| Décider quoi internationaliser | Claude Code                  | Faible                             |
| Extraire les chaînes           | `intlayer extract`           | Aucun                              |
| Traduire le contenu            | `intlayer fill`              | Aucun                              |
| Traduire la documentation      | `intlayer doc translate`     | Aucun                              |
| Mettre à jour la documentation | `intlayer doc review`        | Aucun                              |
| Exécuter les commandes         | Claude Code en mode headless | Prompt + sortie de la commande     |
