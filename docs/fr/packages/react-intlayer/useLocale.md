# Intégration React : Documentation du Hook `useLocale`

Cette section fournit des détails complets sur le hook `useLocale` de la bibliothèque `react-intlayer`, conçu pour gérer la gestion des paramètres régionaux dans les applications React.

## Importation de `useLocale` dans React

Pour intégrer le hook `useLocale` dans votre application React, importez-le depuis son package respectif :

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Utilisé dans les composants React pour la gestion des paramètres régionaux
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Utilisé dans les composants React pour la gestion des paramètres régionaux
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Utilisé dans les composants React pour la gestion des paramètres régionaux
```

## Vue d'ensemble

Le hook `useLocale` offre un moyen simple d'accéder et de manipuler les paramètres régionaux au sein des composants React. Il permet d'accéder à la langue actuelle, à la langue par défaut, à toutes les langues disponibles, ainsi qu'à des fonctions pour mettre à jour les paramètres régionaux.

## Utilisation

Voici comment utiliser le hook `useLocale` dans un composant React :

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## Paramètres et valeurs de retour

Lorsque vous invoquez le hook `useLocale`, il retourne un objet contenant les propriétés suivantes :

- **`locale`** : La langue actuelle définie dans le contexte React.
- **`defaultLocale`** : La langue principale définie dans la configuration.
- **`availableLocales`** : Une liste de toutes les langues disponibles définies dans la configuration.
- **`setLocale`** : Une fonction pour mettre à jour la langue actuelle dans le contexte de l'application.

## Exemple

Cet exemple montre un composant qui utilise le hook `useLocale` pour afficher un sélecteur de langue, permettant aux utilisateurs de changer dynamiquement la langue de l'application :

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Conclusion

Le hook `useLocale` de `react-intlayer` est un outil essentiel pour gérer les paramètres régionaux dans vos applications React, offrant les fonctionnalités nécessaires pour adapter efficacement votre application à divers publics internationaux.
