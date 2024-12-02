# Documentation : Fonction `t` dans `react-intlayer`

La fonction `t` du package `react-intlayer` est un outil fondamental pour l'internationalisation en ligne dans vos applications React. Elle vous permet de définir des traductions directement dans vos composants, facilitant ainsi l'affichage de contenu localisé en fonction de la langue active.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différentes langues directement dans vos composants. En passant un objet contenant les traductions pour chaque langue supportée, `t` retourne la traduction appropriée en fonction du contexte de langue actuel dans votre application React.

---

## Principales caractéristiques

- **Traductions en ligne** : Idéal pour les textes rapides qui ne nécessitent pas de déclaration de contenu séparée.
- **Sélection automatique de la langue** : Retourne automatiquement la traduction correspondant à la langue active.
- **Support TypeScript** : Offre une sécurité de type et l'autocomplétion lorsqu'elle est utilisée avec TypeScript.
- **Intégration facile** : Fonctionne parfaitement dans les composants React.

---

## Signature de la fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de langue (par exemple, `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Retourne

- Une chaîne représentant le contenu traduit pour la langue active.

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

### Traductions en ligne dans les attributs

La fonction `t` est particulièrement utile pour traduire en ligne les attributs JSX comme `alt`, `title`, `href` ou `aria-label`.

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

### Intégration avec TypeScript

La fonction `t` est sûre avec TypeScript, garantissant que toutes les langues requises sont fournies.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Détection et contexte de la langue

Dans `react-intlayer`, la langue active est gérée via le `IntlayerProvider`. Assurez-vous que ce fournisseur englobe vos composants et que la propriété `locale` est correctement passée.

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

### `t` retourne une valeur indéfinie ou incorrecte

- **Cause** : La langue actuelle n'est pas correctement définie, ou la traduction pour la langue actuelle est manquante.
- **Solution** :
  - Vérifiez que le `IntlayerProvider` est correctement configuré avec la langue appropriée.
  - Assurez-vous que votre objet de traductions inclut toutes les langues nécessaires.

### Traductions manquantes en TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les langues requises, provoquant des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour garantir la complétude des traductions.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Oublier 'es' entraînera une erreur TypeScript
};

const text = t(translations);
```

---

## Conseils pour une utilisation efficace

1. **Utilisez `t` pour des traductions simples en ligne** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Privilégiez `useIntlayer` pour un contenu structuré** : Pour des traductions plus complexes et une réutilisation de contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Consistance dans la gestion des langues** : Assurez-vous que la langue est fournie de manière cohérente dans votre application via le `IntlayerProvider`.
4. **Exploitez TypeScript** : Utilisez les types TypeScript pour détecter les traductions manquantes et garantir une sécurité de type.

---

## Conclusion

La fonction `t` dans `react-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications React. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour une utilisation plus détaillée et des fonctionnalités avancées, consultez la [documentation de react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_editor_en.md).

---

**Remarque** : Assurez-vous de configurer correctement votre `IntlayerProvider` pour garantir que la langue active est bien transmise à vos composants. Cela est crucial pour que la fonction `t` retourne les bonnes traductions.
