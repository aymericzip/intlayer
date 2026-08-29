---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, guide pour le SEO multilingue"
description: "Ce qu'est hreflang, les règles que les moteurs de recherche appliquent, pourquoi x-default est presque toujours incorrect, et comment générer les balises correctes dans Next.js et TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang : le guide pour le SEO multilingue

Vous avez traduit votre app. Vous avez déployé `/en`, `/fr`, `/es`. Et les utilisateurs français atterrissent toujours sur la page anglaise.

La traduction est la moitié facile. La moitié difficile est de dire aux moteurs de recherche que ces pages sont la **même page dans une autre langue**, et non trois documents en concurrence les uns avec les autres. C'est ce que `hreflang` fait, et c'est là que la plupart des sites multilingues perdent silencieusement leur trafic.

---

## Ce qu'hreflang est réellement

Une annotation sur une page disant : _cette URL a des versions équivalentes là-bas, pour ces langues._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Cela vous procure deux choses : la bonne version affichée au bon utilisateur, et vos locales consolidées en un seul cluster au lieu de se faire concurrence en tant que doublons.

Il est important d'être clair sur ce que ce n'est pas. Ce n'est **pas une redirection** — c'est un indice, et Google peut le contourner. Ce n'est **pas un boost de classement** — cela change _quelle_ version se classe, pas _si_ vous vous classez. Et Bing l'ignore complètement, s'appuyant plutôt sur `content-language` et le ciblage géographique.

---

## Où le déclarer

Trois emplacements, tous valides. Choisissez-en un et restez-y — le même cluster déclaré à deux endroits est la façon dont les ensembles s'écartent.

**HTML `<head>`** est le choix habituel. Une mise en garde : les tags injectés après hydratation ne sont pas fiables. Si votre framework ne les ajoute que côté client, le crawler peut ne jamais les voir.

**XML sitemap** est mieux à l'échelle. Dix locales sur 5 000 pages signifie 50 000 éléments `<link>` envoyés aux navigateurs pour rien ; dans un sitemap, cela ne coûte zéro octet à vos pages.

**HTTP `Link` header** est la seule option pour les fichiers non-HTML comme les PDF.

---

## Les règles

### Auto-référence et réciprocité

L'ensemble sur `/fr/about` doit inclure `hreflang="fr"` pointant vers `/fr/about`. Et si `/about` pointe vers `/fr/about`, `/fr/about` doit pointer en retour. Google appelle une référence unidirectionnelle une "no return tag" et la supprime.

En pratique, cela signifie que **chaque page dans un cluster envoie l'ensemble identique de liens**. Les générer à partir d'une liste de locales partagée n'est pas une commodité, c'est la seule façon de rester correct une fois que vous avez plus de deux locales.

### URLs absolues, toujours

```html
<!-- Silencieusement ignoré -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Correct -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

La raison mérite d'être comprise plutôt que mémorisée. `hreflang` est une référence croisée entre documents : les moteurs de recherche construisent un cluster indexé par URL, partagé sur chaque page du cluster. Un chemin relatif n'a de sens que relatif au document dans lequel il se trouve, il ne peut donc pas l'exprimer. Il ne peut pas non plus franchir un host — et une variante le fait très souvent, quand une locale vit sur `example.fr` ou `fr.example.com`. Dans un sitemap ou un en-tête HTTP, il n'y a pas de document de base pour résoudre quoi que ce soit.

Cela a une conséquence directe dans le code. `getLocalizedUrl("/about", "fr")` retourne `/fr/about` — relatif en entrée, relatif en sortie. Pour `hreflang` vous devez le fournir avec une URL absolue :

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ abandonné
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

La seule exception est un framework qui résout les valeurs relatives pour vous avant le rendu : Next.js développe les `alternates` relatifs par rapport à `metadataBase`. D'accord — mais la règle s'applique au **HTML émis**, donc vérifiez avec `curl`, pas l'inspecteur DevTools.

### Codes de langue

ISO 639-1 pour la langue, ISO 3166-1 Alpha 2 pour la région optionnelle : `fr`, `fr-CA`, `pt-BR`.

Deux pièges attrapent presque tout le monde. Une région seule est invalide — `hreflang="ca"` est le catalan, pas le Canada ; vous avez besoin de `en-CA` ou `fr-CA`. Et `en-UK` n'existe pas : le code pays pour le Royaume-Uni est `GB`, donc c'est `en-GB`.

N'ajoutez une région que si vous servez réellement du contenu différent dans cette région — des prix différents, des mentions légales différentes. `fr` et `fr-FR` sur un contenu identique est du bruit.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Un concept qui est le plus souvent oublié, et mal compris, est `x-default` — moins de 30% des applications l'implémentent correctement.

Il s'agit de la solution de secours pour les utilisateurs dont la langue ne correspond à aucune entrée de votre ensemble. Un locuteur néerlandais sur un site proposant l'anglais, le français et l'espagnol ne correspond à aucune entrée ; sans `x-default`, Google choisit à votre place.

Ce que les gens comprennent mal, c'est ce que cela signifie. `x-default` n'est **pas « la version en anglais »** et **pas « la locale par défaut »**, même s'il pointe généralement vers celle-ci. Cela signifie _la page pour les utilisateurs que cet ensemble ne couvre pas_. C'est pourquoi il est légitime — et souvent mieux — de la pointer vers une page de sélection de langue ou vers une page d'accueil avec redirection géographique plutôt que vers `/en`. Si vous n'avez pas une telle page, votre langue principale est la réponse sensée.

Deux choses à bien comprendre : `x-default` est une entrée supplémentaire dans l'ensemble, pas un remplacement de celle qui se référence elle-même, et comme toute autre entrée, elle doit apparaître de manière identique sur chaque page du cluster.

---

## Le piège du canonical

Chaque page localisée doit être **son propre canonical** :

```html
<!-- On https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Pointer le canonical de chaque locale vers la version anglaise à la place :

```html
<!-- On https://example.com/fr/about — supprime la page -->
<link rel="canonical" href="https://example.com/about" />
```

indique que la page française est un doublon qui ne doit pas être indexé, tandis que `hreflang` indique que c'est la page à servir aux utilisateurs français. Les signaux se contredisent, le canonical l'emporte, et vos pages françaises sortent de l'index.

**Le canonical est auto-référenciel par locale. `hreflang` décrit le cluster.**

---

## Choisir une structure d'URL

`hreflang` annote les URLs, donc la structure vient en premier.

| Structure            | Exemple           | Compromis                                                                      |
| -------------------- | ----------------- | ------------------------------------------------------------------------------ |
| **Sous-répertoires** | `example.com/fr/` | Un seul domaine, autorité partagée — signal géo plus faible                    |
| **Sous-domaines**    | `fr.example.com`  | Facile d'ajouter ou de supprimer une locale — peut ressembler à un site séparé |
| **ccTLDs**           | `example.fr`      | Signal pays le plus fort — autorité construite par domaine                     |

Les sous-répertoires sont le bon choix par défaut pour la plupart des projets. Recourez aux ccTLDs uniquement lorsque vous opérez réellement comme des entreprises distinctes par pays.

La seule structure à éviter : servir différentes langues à la **même URL** en fonction de `Accept-Language` ou de l'IP. Les crawlers ne voient qu'une version et indexent une version ; tout le reste est invisible.

> Intlayer couvre les trois via `routing.mode` et `routing.domains`. Voir [domaines personnalisés](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/custom_domains.md) et la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

---

## Implémentation

Écrire ces balises à la main ne survivra pas au contact avec une deuxième locale. Dérivez-les plutôt de votre liste de locales.

<Steps>

<Step number={1} title="Émettre le cluster sur chaque page">

Même ensemble partout, canonical par locale, URLs absolues, `x-default` inclus.

<Tabs>

<Tab label="Next.js" value="nextjs">

L'API Metadata expose `alternates.languages`, et `getMultilingualUrls` construit l'enregistrement complet à partir de vos locales configurées :

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) retourne:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Configuration complète : [Guide i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

La fonction `head` de la route construit les liens. `localeMap` itère vos locales configurées, donc ajouter une locale à la config l'ajoute partout à la fois :

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    // Récupère la locale des paramètres, ou utilise la locale par défaut
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` s'exécute sur le serveur, donc les balises se retrouvent dans le HTML initial. Configuration complète : [Guide i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Ou déplacez-le tout dans le sitemap">

À grande échelle, gardez les annotations hors de vos pages entièrement. `generateSitemap` émet des alternates `xhtml:link` par entrée, en lisant les locales et le mode de routage depuis votre config :

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Deux options à connaître :

- `xhtmlLinks` (par défaut `true`) — les alternates sont émis uniquement lorsque les URL localisées diffèrent réellement. En mode `no-prefix`, chaque locale partage une seule URL, donc ils sont ignorés sauf si `routing.domains` donne à chaque locale son propre nom de domaine.
- `entryPerLocale` (défaut `false`) — par défaut une entrée `<url>` unique porte tous les alternates. Les deux formes sont valides, mais seule une URL listée en tant que `<loc>` compte comme _soumise_ dans Search Console ; les locales en alternates uniquement restent découvrables mais non attribuées à aucun sitemap. L'activation de cette option donne à chaque URL localisée sa propre entrée avec l'ensemble complet des alternates répétés. Cela multiplie les entrées par le nombre de locales, donc surveillez la limite de 50 000 URLs / 50 MB et divisez en un index de sitemap au-delà.

</Step>

<Step number={3} title="Vérifiez ce que reçoit le crawler">

`hreflang` échoue silencieusement, donc vérifiez-le plutôt que de supposer.

Lisez la source, pas l'inspecteur — `curl https://example.com/fr/about | grep hreflang` montre ce qu'un crawler reçoit; DevTools affiche le DOM après l'exécution de JavaScript. Puis suivez chaque alternate et confirmez qu'il pointe en retour avec l'ensemble identique, et qu'aucun d'eux ne redirige. Le rapport International Targeting de Search Console capture le reste sur tout le site.

Pour un crawl spécifique multilingue, le [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) vérifie les tags manquants, les alternates cassés et les conflits canoniques dans vos pages localisées.

</Step>

</Steps>

---

## Liste de contrôle

- [ ] Chaque locale a une URL distincte et crawlable
- [ ] Chaque page se référence elle-même, et chaque référence est réciproque
- [ ] L'ensemble identique est livré sur chaque page du cluster
- [ ] Toutes les valeurs `href` sont absolues dans le HTML émis
- [ ] Les codes sont ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, pas `en-UK`)
- [ ] `x-default` est présent et pointe où les utilisateurs non appariés doivent aller
- [ ] Le canonical est auto-référentiel par locale
- [ ] Les tags sont rendus côté serveur, pas injectés après hydratation
- [ ] Déclarés exactement à un seul endroit
- [ ] Pas de redirects alternates

---

## Conclusion

`hreflang` est simple et inflexible. Une balise de retour manquante, une URL relative, un canonical inter-locales, et le cluster est rejeté sans erreur nulle part. Chacun de ces problèmes provient de la rédaction manuelle des tags.

Dérivez l'ensemble à partir d'une liste de locale unique, rendez-le côté serveur, gardez la canonical auto-référentielle, et accordez à `x-default` l'attention qu'il mérite. Faites cela une fois et la correction cesse d'être quelque chose que vous devez maintenir.

### Aller plus loin

- [SEO et Internationalization](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md) — l'image plus large du SEO multilingue
- [SEO et i18n dans Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Guide i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)
- [Guide i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md)
- [Domaines personnalisés par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/custom_domains.md)
- [Référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
