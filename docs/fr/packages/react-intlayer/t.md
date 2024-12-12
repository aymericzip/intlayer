# Documentation: `t` Fonction dans `react-intlayer`

La fonction `t` dans le package `react-intlayer` est un outil fondamental pour l'internationalisation en ligne au sein de votre application React. Elle vous permet de définir des traductions directement dans vos composants, rendant simple l'affichage de contenu localisé en fonction de la locale actuelle.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différentes locales directement dans vos composants. En passant un objet contenant des traductions pour chaque locale supportée, `t` retourne la traduction appropriée en fonction du contexte de la locale actuelle dans votre application React.

---

## Caractéristiques principales

- **Traductions en ligne** : Idéal pour un texte rapide et en ligne qui ne nécessite pas de déclaration de contenu séparée.
- **Sélection automatique de la locale** : Renvoie automatiquement la traduction correspondant à la locale actuelle.
- **Support TypeScript** : Fournit une sécurité de type et un autocomplétion lorsqu'il est utilisé avec TypeScript.
- **Intégration facile** : Fonctionne sans problème au sein des composants React.

---

## Signature de la fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de locale (par exemple, `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Retourne

- Une chaîne représentant le contenu traduit pour la locale actuelle.

---

## Exemples d'utilisation

### Utilisation basique de `t` dans un composant

```tsx
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Traductions en ligne dans des attributs

La fonction `t` est particulièrement utile pour les traductions en ligne dans les attributs JSX. Lorsque vous localisez des attributs comme `alt`, `title`, `href`, ou `aria-label`, vous pouvez utiliser `t` directement dans l'attribut.

```tsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Sujets avancés

### Intégration TypeScript

La fonction `t` est sécurisée par type lorsqu'elle est utilisée avec TypeScript, garantissant que toutes les locales requises sont fournies.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Détection et contexte de locale

Dans `react-intlayer`, la locale actuelle est gérée via le `IntlayerProvider`. Assurez-vous que ce fournisseur enveloppe vos composants et que la prop `locale` est correctement transmise.

#### Exemple :

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Vos composants ici */}
  </IntlayerProvider>
);
```

---

## Erreurs courantes et dépannage

### `t` retourne indéfini ou une traduction incorrecte

- **Cause** : La locale actuelle n'est pas correctement définie, ou la traduction pour la locale actuelle est manquante.
- **Solution** :
  - Vérifiez que le `IntlayerProvider` est correctement configuré avec la `locale` appropriée.
  - Assurez-vous que votre objet de traductions inclut toutes les locales nécessaires.

### Traductions manquantes dans TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les locales requises, ce qui entraîne des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour faire respecter la complétude de vos traductions.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Manque 'es' causera une erreur TypeScript
};

const text = t(translations);
```

---

## Conseils pour une utilisation efficace

1. **Utilisez `t` pour des traductions simples en ligne** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Préférez `useIntlayer` pour un contenu structuré** : Pour des traductions plus complexes et la réutilisation de contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Provision de locale cohérente** : Assurez-vous que votre locale est constamment fournie à travers votre application via le `IntlayerProvider`.
4. **Tirez parti de TypeScript** : Utilisez les types TypeScript pour attraper les traductions manquantes et garantir la sécurité de type.

---

## Conclusion

La fonction `t` dans `react-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications React. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour des usages plus détaillés et des fonctionnalités avancées, référez-vous à la [documentation de react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

---

**Note** : N'oubliez pas de configurer correctement votre `IntlayerProvider` pour garantir que la locale actuelle est correctement transmise à vos composants. Cela est crucial pour que la fonction `t` retourne les traductions correctes.
