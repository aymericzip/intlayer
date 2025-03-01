# Intégration Next.js : Documentation du Hook `useLocale` pour `next-intlayer`

Cette section offre une documentation détaillée sur le hook `useLocale` conçu pour les applications Next.js dans la bibliothèque `next-intlayer`. Il est conçu pour gérer efficacement les changements de langue et le routage.

## Importer `useLocale` dans Next.js

Pour utiliser le hook `useLocale` dans votre application Next.js, importez-le comme suit :

```javascript
import { useLocale } from "next-intlayer"; // Utilisé pour gérer les langues et le routage dans Next.js
```

## Utilisation

Voici comment implémenter le hook `useLocale` dans un composant Next.js :

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Langue actuelle : {locale}</h1>
      <p>Langue par défaut : {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Langue actuelle : {locale}</h1>
      <p>Langue par défaut : {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Langue actuelle : {locale}</h1>
      <p>Langue par défaut : {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Paramètres et Valeurs de Retour

Lorsque vous invoquez le hook `useLocale`, il retourne un objet contenant les propriétés suivantes :

- **`locale`** : La langue actuelle définie dans le contexte React.
- **`defaultLocale`** : La langue principale définie dans la configuration.
- **`availableLocales`** : Une liste de toutes les langues disponibles définies dans la configuration.
- **`setLocale`** : Une fonction pour changer la langue de l'application et mettre à jour l'URL en conséquence. Elle gère les règles de préfixe, qu'il s'agisse d'ajouter ou non la langue au chemin en fonction de la configuration. Utilise `useRouter` de `next/navigation` pour les fonctions de navigation comme `push` et `refresh`.
- **`pathWithoutLocale`** : Une propriété calculée qui retourne le chemin sans la langue. Elle est utile pour comparer les URLs. Par exemple, si la langue actuelle est `fr`, et l'url `fr/my_path`, le chemin sans langue est `/my_path`. Utilise `usePathname` de `next/navigation` pour obtenir le chemin actuel.

## Conclusion

Le hook `useLocale` de `next-intlayer` est un outil essentiel pour gérer les langues dans les applications Next.js. Il offre une approche intégrée pour adapter votre application à plusieurs langues en gérant le stockage des langues, la gestion des états et les modifications d'URL de manière transparente.
