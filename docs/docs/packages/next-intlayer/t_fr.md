# Documentation : Fonction `t` dans `next-intlayer`

La fonction `t` dans le paquet `next-intlayer` est un outil fondamental pour l'internationalisation en ligne au sein de votre application Next.js. Elle permet de définir des traductions directement dans vos composants, facilitant ainsi l'affichage de contenu localisé en fonction de la locale actuelle.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différentes locales directement dans vos composants. En passant un objet contenant les traductions pour chaque locale supportée, `t` retourne la traduction appropriée basée sur le contexte de locale actuel dans votre application Next.js.

---

## Caractéristiques Principales

- **Traductions en Ligne** : Idéal pour les textes rapides en ligne qui ne nécessitent pas une déclaration de contenu séparée.
- **Sélection Automatique de la Locale** : Retourne automatiquement la traduction correspondant à la locale actuelle.
- **Support TypeScript** : Fournit une sécurité de type et l'autocomplétion lorsqu'il est utilisé avec TypeScript.
- **Intégration Facile** : Fonctionne parfaitement dans les composants client et serveur de Next.js.

---

## Signature de la Fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations`: Un objet où les clés sont des codes de locale (par exemple, `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Retourne

- Une chaîne représentant le contenu traduit pour la locale actuelle.

---

## Exemples d'Utilisation

### Utiliser `t` dans un Composant Client

Assurez-vous d'inclure la directive `'use client';` en haut de votre fichier de composant lors de l'utilisation de `t` dans un composant côté client.

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "Ceci est le contenu d'un exemple de composant client",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido de un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### Utiliser `t` dans un Composant Serveur

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "Ceci est le contenu d'un exemple de composant serveur",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### Traductions en Ligne dans les Attributs

La fonction `t` est particulièrement utile pour les traductions en ligne dans les attributs JSX.
Lors de la localisation d'attributs comme `alt`, `title`, `href` ou `aria-label`, vous pouvez utiliser `t` directement dans l'attribut.

```tsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Soumettre",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "Un beau paysage",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Sujets Avancés

### Intégration avec TypeScript

La fonction `t` est sécurisée en types lorsqu'elle est utilisée avec TypeScript, garantissant que toutes les locales requises sont fournies.

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Bienvenue",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Détection de la Locale et Contexte

Dans `next-intlayer`, la locale actuelle est gérée via des fournisseurs de contexte : `IntlayerClientProvider` et `IntlayerServerProvider`. Assurez-vous que ces fournisseurs enveloppent vos composants et que la prop `locale` est correctement passée.

#### Exemple :

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Vos composants ici */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Erreurs Courantes et Dépannage

### `t` Retourne Undefined ou Traduction Incorrecte

- **Cause** : La locale actuelle n'est pas correctement définie, ou la traduction pour la locale actuelle est manquante.
- **Solution** :
  - Vérifiez que `IntlayerClientProvider` ou `IntlayerServerProvider` est correctement configuré avec la `locale` appropriée.
  - Assurez-vous que votre objet de traductions inclut toutes les locales nécessaires.

### Traductions Manquantes dans TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les locales requises, entraînant des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour garantir la complétude de vos traductions.

```typescript
const translations: IConfigLocales<string> = {
  en: "Texte",
  fr: "Texte",
  // es: 'Texto', // Manque 'es' provoquera une erreur TypeScript
};

const text = t(translations);
```

---

## Conseils pour une Utilisation Efficace

1. **Utilisez `t` pour des Traductions Simples en Ligne** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Privilégiez `useIntlayer` pour un Contenu Structuré** : Pour des traductions plus complexes et la réutilisation de contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Fourniture Consistante de la Locale** : Assurez-vous que votre locale est fournie de manière cohérente à travers votre application via les fournisseurs appropriés.
4. **Exploitez TypeScript** : Utilisez les types TypeScript pour détecter les traductions manquantes et assurer la sécurité des types.

---

## Conclusion

La fonction `t` dans `next-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications Next.js. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour un usage plus détaillé et des fonctionnalités avancées, référez-vous à la [documentation de next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_editor_en.md).

---

**Remarque** : N'oubliez pas de configurer correctement vos fournisseurs `IntlayerClientProvider` et `IntlayerServerProvider` pour vous assurer que la locale actuelle est correctement transmise à vos composants. Cela est crucial pour que la fonction `t` retourne les traductions correctes.
