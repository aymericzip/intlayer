---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentation du hook useLocale | astro-intlayer
description: Découvrez comment utiliser le hook useLocale dans les applications Astro pour accéder à la locale actuelle et la gérer.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internationalisation
  - documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc initiale"
author: aymericzip
---

# Documentation du hook useLocale

Le hook `useLocale` de `astro-intlayer` fournit un accès à la locale de requête actuelle, à la locale par défaut configurée et à toutes les locales disponibles dans les applications Astro.

Il se comporte de manière cohérente dans le frontmatter `.astro` rendu côté serveur et dans les blocs `<script>` côté client.

## Utilisation

### Dans le frontmatter de composant (Rendu côté serveur)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>Actuelle : {locale}</span>
      <span>Par défaut : {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### Dans un `<script>` client (Interactif)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## Valeurs de retour

Le hook retourne un objet de type `UseLocaleResult` :

| Propriété          | Type                                   | Description                                                                                |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`                      | La locale active.                                                                          |
| `defaultLocale`    | `DeclaredLocales`                      | La locale de repli par défaut configurée dans `intlayer.config.ts`.                        |
| `availableLocales` | `DeclaredLocales[]`                    | Tableau de toutes les locales supportées configurées pour le projet.                       |
| `setLocale`        | `(locale: LocalesValues) => void`      | Fonction pour mettre à jour la locale. (Interactive dans `<script>`, avertit lors du SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | S'abonne aux changements de locale côté client.                                            |

## Comportement Serveur vs Client

- **Pendant le SSR / Rendu Serveur** : Une requête est rendue une seule fois avec des paramètres fixes. Appeler `setLocale()` pendant un rendu serveur n'a aucun effet et émet un avertissement ; le changement de locale doit être effectué côté client ou en naviguant vers l'URL de la locale cible.
- **Dans les scripts client** : `setLocale` met à jour le store client et met à jour les cookies persistants ou le stockage local selon votre configuration Intlayer.

## Documentation associée

- [Intégration `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useDictionary.md)
