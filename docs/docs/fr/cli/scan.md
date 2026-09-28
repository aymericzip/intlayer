---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan : auditer l'i18n et le SEO d'un site"
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "Détecte la stratégie de routage et la stack i18n (bibliothèques, TMS) ; ajoute des vérifications de réciprocité hreflang, og:locale et sélecteur de langue ; suit les sitemaps de robots.txt, les index de sitemaps et les sitemaps gzippés"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Ajout du drapeau `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Ajout de la commande scan"
author: aymericzip
---

# Scanner le site web

La commande `scan` récupère une URL publique, mesure la taille totale de la page et audite la santé i18n et SEO de la page. Elle produit un rapport avec un score (0–100) couvrant les attributs HTML, les liens canoniques, les balises hreflang et leurs liens de retour, robots.txt, les sitemaps, les liens internes localisés et le poids des locales dans le bundle JavaScript.

Elle indique également la manière dont le site encode la locale dans ses URL (stratégie de routage) ainsi que le framework, la bibliothèque i18n, le système de gestion de traductions (TMS) ou le proxy de traduction utilisé. Les mêmes vérifications alimentent le [scanner SEO i18n en ligne](https://intlayer.org/i18n-seo-scanner) et l'extension Intlayer pour Chrome.

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
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0
  i18n library next-intl
  TMS Crowdin
Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
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

- **`--base-dir`**: Répertoire de base utilisé pour localiser le fichier `intlayer.config.*`.
- **`-e, --env`**: Environnement cible (par exemple, `development`, `production`).
- **`--env-file`**: Chemin vers un fichier `.env` personnalisé.
- **`--no-cache`**: Désactiver le cache de configuration.
- **`--ci`**: Exécute la commande dans chaque projet Intlayer du monorepo (ou uniquement le projet courant si lancée depuis son répertoire). Des identifiants par projet peuvent être injectés via `INTLAYER_PROJECT_CREDENTIALS`, un objet JSON associant chaque chemin de projet à `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Activer le journal détaillé (par défaut en mode CLI).
- **`--prefix`**: Préfixe de journal personnalisé.

## Stratégie de routage

Le motif de locale partagé par les alternatives hreflang de la page révèle la manière dont le site gère le routage de ses locales. Sans balises d'alternatives, seule l'URL analysée est utilisée (faible niveau de confiance).

| Stratégie           | Exemple                                   |
| ------------------- | ----------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                  |
| `prefix-no-default` | `/about` (locale par défaut), `/fr/about` |
| `search-params`     | `/about?lang=fr`                          |
| `subdomain`         | `fr.example.com`                          |
| `domain`            | `example.fr`, `example.de`                |
| `no-prefix`         | Une seule URL pour chaque locale (cookie) |

Les vérifications des liens, des liens canoniques, du fichier robots.txt et du sitemap analysent chaque URL à travers cette stratégie. Par exemple, un lien sans préfixe est correct sur la locale par défaut d'un site en `prefix-no-default`, et un lien sans `?lang=` quitte la locale sur un site en `search-params`.

## Stack détectée

Les frameworks, les bibliothèques i18n (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), les systèmes de gestion de traductions (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) et les proxys de traduction (Weglot, Localize, GTranslate…) sont identifiés à partir du HTML, des ressources chargées et des bundles JavaScript. Le mode approfondi lit également les variables globales window et les cookies.

## Ce qui est vérifié

| Vérification                    | Description                                                                                                       | Poids du score |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------- |
| `html lang`                     | `<html lang>` est présent et correspond à un tag BCP 47 valide                                                    | 9              |
| `html dir`                      | `dir="rtl"` est défini pour les langues écrites de droite à gauche (`ltr` par défaut)                             | 3              |
| `locale signals consistent`     | `<html lang>`, la locale de l'URL et l'entrée hreflang correspondante concordent                                  | 5              |
| `og:locale`                     | `og:locale` est défini et correspond à `<html lang>`                                                              | 3              |
| `canonical`                     | Un lien canonique existe et ne pointe pas vers une autre version linguistique                                     | 10             |
| `hreflang`                      | Les balises hreflang existent, avec des codes valides, des URL absolues, sans doublons et avec une auto-référence | 9              |
| `x-default hreflang`            | Une alternative hreflang `x-default` existe                                                                       | 7              |
| `hreflang alternates link back` | Les alternatives renvoient un code 200, ne sont pas redirigées, pointent en retour et déclarent la langue         | 8              |
| `localized links`               | Les liens internes pointent vers la locale de la page                                                             | 8              |
| `all links keep the locale`     | Aucun lien interne ne change ou ne perd la locale                                                                 | 6              |
| `language switcher`             | Des liens `<a href>` explorables vers les autres versions linguistiques existent                                  | 6              |
| `robots.txt present`            | `/robots.txt` renvoie une réponse 200                                                                             | 10             |
| `robots.txt localized URLs`     | Ni le site ni ses URL localisées ne sont bloqués pour Googlebot                                                   | 8              |
| `sitemap present`               | Un sitemap est trouvé (directives robots.txt `Sitemap:`, `/sitemap.xml`, `/sitemap_index.xml`)                    | 10             |
| `sitemap locale coverage`       | Chaque locale est répertoriée, et les entrées avec alternatives se répertorient elles-mêmes                       | 9              |
| `sitemap alternates`            | Le sitemap contient des liens alternatifs `hreflang`                                                              | 8              |
| `sitemap x-default`             | Le sitemap contient un hreflang `x-default`                                                                       | 7              |
| `unused bundle content`         | Le bundle JS principal n'embarque pas de traductions pour d'autres locales                                        | 8              |

Un avertissement accorde la moitié du poids. Le score final correspond à la somme pondérée des vérifications exécutées, exprimée sous forme de pourcentage (0–100). Les vérifications échouées affichent les premiers problèmes détectés ; utilisez `--json` pour obtenir l'ensemble des détails.

## Utilisation programmatique de la fonction de scan

La fonction `scan` est également exportée depuis `@intlayer/cli` afin de pouvoir être appelée depuis vos propres scripts :

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Pour un accès de niveau inférieur, `scanWebsite` de `@intlayer/engine/scan` renvoie un objet `ScanResult` structuré :

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
