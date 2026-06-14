---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Scanner le site web
description: Apprenez à utiliser la commande scan du CLI Intlayer pour mesurer la taille de la page et auditer la santé i18n/SEO de n'importe quel site web.
keywords:
  - Scan
  - SEO
  - i18n
  - Audit
  - CLI
  - Intlayer
  - Taille de page
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.0.0
    date: 2026-06-11
    changes: "Ajout de la commande scan"
author: aymericzip
---

# Scanner le site web

La commande `scan` récupère une URL publique, mesure la taille totale de la page et audite la santé i18n et SEO de la page. Elle produit un rapport avec un score (0–100) couvrant les attributs HTML, les liens canoniques, les balises hreflang, robots.txt, sitemap.xml, les liens internes localisés et le poids des locales dans le bundle JavaScript.

Aucune dépendance supplémentaire n'est requise. Lorsque [puppeteer](https://pptr.dev/) est installé, le scan peut capturer les morceaux de JavaScript chargés à la demande (lazy-loaded) pour une analyse plus précise du bundle ; sinon, il se replie sur l'inspection des scripts chargés directement déclarés dans le HTML.

## Utilisation

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Exemple

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Exemple de sortie :

```
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Options

### `<url>` (requis)

L'URL complète à scanner (par exemple, `https://example.com`).

### `--no-deep`

Désactive le scan approfondi basé sur le rendu.

Par défaut, la commande tente d'utiliser [puppeteer](https://pptr.dev/) pour rendre la page dans un navigateur headless, capturer les morceaux de JavaScript chargés à la demande et mesurer la taille réelle de transfert. Si puppeteer n'est pas installé, la commande se replie automatiquement sur le mode basique.

Passez `--no-deep` pour forcer le mode basique même lorsque puppeteer est disponible.

> Exemple : `npx intlayer scan https://example.com --no-deep`

### `--json`

Affiche le résultat complet du scan sous forme d'objet JSON au lieu d'un rapport formaté. Utile pour une consommation programmatique ou des pipelines CI.

> Exemple : `npx intlayer scan https://example.com --json`

### Options de configuration standard

- **`--base-dir`** — Répertoire de base utilisé pour localiser le fichier `intlayer.config.*`.
- **`-e, --env`** — Environnement cible (par exemple, `development`, `production`).
- **`--env-file`** — Chemin vers un fichier `.env` personnalisé.
- **`--no-cache`** — Désactiver le cache de configuration.
- **`--verbose`** — Activer le journal détaillé (par défaut en mode CLI).
- **`--prefix`** — Préfixe de journal personnalisé.

## Ce qui est vérifié

| Vérification              | Description                                                           | Poids du score |
| ------------------------- | --------------------------------------------------------------------- | -------------- |
| `html lang`               | L'attribut `<html lang="…">` est présent                              | 9              |
| `html dir`                | L'attribut `<html dir="…">` est présent                               | 3              |
| `canonical`               | `<link rel="canonical">` est présent                                  | 10             |
| `hreflang`                | Les balises `<link rel="alternate" hreflang="…">` sont présentes      | 9              |
| `x-default hreflang`      | Une alternative hreflang `x-default` existe                           | 7              |
| `localized links`         | Au moins un lien interne inclut un segment de langue                  | 5              |
| `all links localized`     | Chaque lien interne inclut un segment de langue                       | 5              |
| `current locale`          | La langue de la page peut être détectée                               | 3              |
| `robots.txt present`      | `/robots.txt` renvoie une réponse 200                                 | 10             |
| `robots.txt locale paths` | Aucun chemin de langue n'est bloqué dans robots.txt                   | 10             |
| `sitemap.xml present`     | `/sitemap.xml` renvoie une réponse 200                                | 10             |
| `sitemap locale coverage` | Chaque langue détectée apparaît dans le sitemap                       | 10             |
| `sitemap alternates`      | Le sitemap contient des liens alternatifs `hreflang`                  | 5              |
| `sitemap x-default`       | Le sitemap contient un hreflang `x-default`                           | 5              |
| `unused bundle content`   | Le bundle JS ne contient pas trop de données de langues non utilisées | 9              |

Le score final est la somme pondérée de toutes les vérifications réussies exprimée en pourcentage (0–100).

## Utilisation programmatique de la fonction de scan

La fonction `scan` est également exportée depuis `@intlayer/cli` afin de pouvoir être appelée depuis vos propres scripts :

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Pour un accès de niveau inférieur, `scanWebsite` de `@intlayer/chokidar/scan` renvoie un objet `ScanResult` structuré :

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
