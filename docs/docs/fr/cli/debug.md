---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Déboguer la commande Intlayer
description: Apprenez à déboguer et résoudre les problèmes de la CLI Intlayer.
keywords:
  - Déboguer
  - Résoudre les problèmes
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Déboguer la commande intlayer

## 1. **Assurez-vous d'utiliser la dernière version**

Exécutez :

```bash
npx intlayer --version                  # version locale actuelle d'intlayer
npx intlayer@latest --version           # dernière version disponible d'intlayer
```

## 2. **Vérifiez si la commande est enregistrée**

Vous pouvez vérifier avec :

```bash
npx intlayer --help                     # Affiche la liste des commandes disponibles et les informations d'utilisation
npx intlayer dictionary build --help    # Affiche la liste des options disponibles pour une commande
```

## 3. **Redémarrez votre terminal**

Parfois, un redémarrage du terminal est nécessaire pour reconnaître les nouvelles commandes.

## 4. **Videz le cache de npx (si vous êtes bloqué avec une version plus ancienne)**

```bash
npx clear-npx-cache
```
