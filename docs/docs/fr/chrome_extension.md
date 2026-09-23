---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Extension Chrome, Scanner i18n & SEO
description: Inspectez la configuration i18n de n'importe quel site web avec l'extension Chrome Intlayer. Détectez le framework, la bibliothèque i18n, les locales, les balises hreflang et SEO, et lancez un audit SEO i18n complet.
keywords:
  - Extension Chrome
  - Scanner i18n
  - Vérificateur hreflang
  - SEO multilingue
  - Intlayer
  - Localisation
  - Outils de développement
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Historique initial"
author: aymericzip
---

# Extension Chrome : Scanner i18n & SEO

## Aperçu

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) est l'extension Chrome officielle pour **Intlayer**. Ouvrez-la sur n'importe quel site web pour voir comment le site gère l'internationalisation : quel framework et quelle bibliothèque i18n il utilise, quelles locales il expose et si ses balises SEO multilingues sont correctement configurées.

Elle fonctionne sur tous les sites web, qu'ils utilisent Intlayer ou non.

![Extension Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

Lien de l'extension : [https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## Fonctionnalités

- **Détection des technologies** : identifie le framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) et la bibliothèque i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Chaque détection affiche les indices qui l'ont déclenchée, comme une variable globale, un cookie ou un marqueur DOM.
- **Locales** : liste les locales trouvées dans l'attribut `lang`, les balises hreflang et `og:locale`, le préfixe de locale dans l'URL, ainsi que les cookies ou entrées de stockage de locale.
- **Balises SEO i18n** : vérifie `html lang`, `html dir`, le lien canonique, les balises hreflang, `x-default`, `og:locale` et le ratio de liens internes localisés.
- **Audit complet** : exécute le même audit que le [Scanner SEO i18n](https://intlayer.org/i18n-seo-scanner) et affiche un score en direct.

## Installation

Installez [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) depuis le Chrome Web Store, puis épinglez-la à votre barre d'outils.

L'extension fonctionne dans Chrome et dans tout navigateur basé sur Chromium prenant en charge les extensions du Chrome Web Store (Edge, Brave, Arc, Opera).

## Utilisation

### Inspecter une page

1. Ouvrez le site web que vous souhaitez inspecter.
2. Cliquez sur l'icône **Intlayer i18n Scanner** dans la barre d'outils.
3. La popup affiche les sections **Technologies détectées**, **Locales** et **Balises SEO i18n** pour la page actuelle.

La détection s'exécute localement dans votre navigateur, uniquement sur l'onglet actif.

### Lancer un audit complet

![Score d'audit de l'extension Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Faites défiler jusqu'à la section **Audit complet** et cliquez sur **Lancer l'audit i18n complet**. Les résultats s'affichent au fur et à mesure que chaque vérification se termine, regroupés en :

- **Page** : attributs `html lang` et `dir`, locale actuelle, balises hreflang, `x-default`, lien canonique, liens internes localisés, sélecteur de langue, icônes de drapeau et contenu de locale inutilisé inclus dans le bundle JavaScript.
- **Robots.txt** : présence et vérification que les chemins de locale restent explorables.
- **Sitemap** : présence, chaque locale listée, liens alternatifs et `x-default`.
- **Domaine** : nombre de locales découvertes sur l'ensemble du site.

Chaque vérification est marquée comme réussie, avertissement ou échouée, et le score résume la santé SEO i18n globale de la page.

## Confidentialité et autorisations

L'extension demande des autorisations minimales :

- **activeTab** et **scripting** : le détecteur ne s'exécute que sur l'onglet que vous consultez, et uniquement lorsque vous ouvrez la popup.
- **back.intlayer.org** : utilisé uniquement lorsque vous lancez un audit complet. L'URL de la page actuelle est envoyée à l'API Intlayer pour être analysée.

Aucun historique de navigation n'est collecté et rien ne fonctionne en arrière-plan.

## FAQ

<FAQ>

<Question title="Le site web doit-il utiliser Intlayer ?">

Non. L'extension inspecte n'importe quel site web, quel que soit le framework ou la bibliothèque i18n utilisé.

</Question>
<Question title="Pourquoi une technologie n'est-elle pas détectée ?">

La détection repose sur ce que la page expose dans le navigateur : variables globales, cookies, balises meta et marqueurs DOM. Certaines versions de production suppriment ces marqueurs, une bibliothèque peut donc être utilisée sans laisser de trace visible.

</Question>
<Question title="Comment corriger les problèmes détectés par l'audit ?">

La plupart des vérifications correspondent à un paramètre de routage ou de métadonnées. Avec Intlayer, hreflang, canonique, `x-default`, liens localisés, sitemap et robots.txt sont générés à partir de votre [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md). Consultez le guide d'intégration correspondant à votre framework, par exemple [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md) ou [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Outils associés

- [Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)
- [Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)
- [Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)
