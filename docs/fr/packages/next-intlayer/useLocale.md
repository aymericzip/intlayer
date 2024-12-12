# Intégration de Next.js : Documentation du Hook `useLocale` pour `next-intlayer`

Cette section offre une documentation détaillée sur le hook `useLocale` conçu pour les applications Next.js au sein de la bibliothèque `next-intlayer`. Il est conçu pour gérer efficacement les changements de locale et le routage.

## Importation de `useLocale` dans Next.js

Pour utiliser le hook `useLocale` dans votre application Next.js, importez-le comme indiqué ci-dessous :

```javascript
import { useLocale } from "next-intlayer"; // Utilisé pour gérer les locales et le routage dans Next.js
```

## Utilisation

Voici comment implémenter le hook `useLocale` dans un composant Next.js :

```jsx
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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

## Paramètres et Valeurs de Retour

Lorsque vous invoquez le hook `useLocale`, il renvoie un objet contenant les propriétés suivantes :

- **`locale`** : La locale actuelle définie dans le contexte React.
- **`defaultLocale`** : La locale principale définie dans la configuration.
- **`availableLocales`** : Une liste de toutes les locales disponibles telles que définies dans la configuration.
- **`setLocale`** : Une fonction pour changer la locale de l'application et mettre à jour l'URL en conséquence. Elle s'occupe des règles de préfixe, que ce soit d'ajouter la locale au chemin ou non selon la configuration. Utilise `useRouter` de `next/navigation` pour des fonctions de navigation comme `push` et `refresh`.
- **`pathWithoutLocale`** : Une propriété calculée qui retourne le chemin sans la locale. Elle est utile pour comparer les URLs. Par exemple, si la locale actuelle est `fr`, et l'url `fr/my_path`, le chemin sans locale est `/my_path`. Utilise `usePathname` de `next/navigation` pour obtenir le chemin actuel.

## Conclusion

Le hook `useLocale` de `next-intlayer` est un outil crucial pour gérer les locales dans les applications Next.js. Il offre une approche intégrée pour adapter votre application à plusieurs locales en gérant le stockage des locales, la gestion de l'état et les modifications d'URL de manière transparente.

---
