# Intégration React : Documentation du Hook `useLocale`

Cette section fournit des détails complets sur le hook `useLocale` de la bibliothèque `react-intlayer`, conçu pour gérer la gestion des locales dans les applications React.

## Importation de `useLocale` dans React

Pour intégrer le hook `useLocale` dans votre application React, importez-le depuis son package respectif :

```javascript
import { useLocale } from "react-intlayer"; // Utilisé dans les composants React pour la gestion des locales
```

## Aperçu

Le hook `useLocale` offre un moyen facile d'accéder et de manipuler les paramètres de locale dans les composants React. Il donne accès à la locale actuelle, à la locale par défaut, à toutes les locales disponibles et à des fonctions pour mettre à jour les paramètres de locale.

## Utilisation

Voici comment vous pouvez utiliser le hook `useLocale` dans un composant React :

```jsx
import React from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale actuelle : {locale}</h1>
      <p>Locale par défaut : {defaultLocale}</p>
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

Lorsque vous invoquez le hook `useLocale`, il renvoie un objet contenant les propriétés suivantes :

- **`locale`** : La locale actuelle telle que définie dans le contexte React.
- **`defaultLocale`** : La locale principale définie dans la configuration.
- **`availableLocales`** : Une liste de toutes les locales disponibles telles que définies dans la configuration.
- **`setLocale`** : Une fonction pour mettre à jour la locale actuelle dans le contexte de l'application.

## Exemple

Cet exemple montre un composant qui utilise le hook `useLocale` pour afficher un sélecteur de locale, permettant aux utilisateurs de changer dynamiquement la locale de l'application :

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale); // Met à jour la locale
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
}

export default LocaleSelector;
```

## Conclusion

Le hook `useLocale` de `react-intlayer` est un outil essentiel pour gérer les locales dans vos applications React, fournissant la fonctionnalité nécessaire pour adapter votre application à divers publics internationaux de manière efficace.

---
