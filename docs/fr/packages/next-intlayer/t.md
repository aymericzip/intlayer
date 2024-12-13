# Documentation: `t` Fonction dans `next-intlayer`

La fonction `t` du package `next-intlayer` est un outil fondamental pour l'internationalisation en ligne dans votre application Next.js. Elle vous permet de définir des traductions directement au sein de vos composants, ce qui facilite l'affichage de contenu localisé en fonction du paramètre régional actuel.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différents paramètres régionaux directement dans vos composants. En passant un objet contenant des traductions pour chaque paramètre régional pris en charge, `t` renvoie la traduction appropriée en fonction du contexte du paramètre régional actuel dans votre application Next.js.

---

## Caractéristiques principales

- **Traductions en ligne** : Idéal pour du texte rapide et en ligne qui ne nécessite pas de déclaration de contenu séparée.
- **Sélection automatique du paramètre régional** : Renvoie automatiquement la traduction correspondant au paramètre régional actuel.
- **Support TypeScript** : Fournit la sécurité de type et l'autocomplétion lorsque utilisé avec TypeScript.
- **Intégration facile** : Fonctionne sans problème dans les composants client et serveur dans Next.js.

---

## Signature de la fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de région (par exemple, `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Renvoie

- Une chaîne représentant le contenu traduit pour le paramètre régional actuel.

---

## Exemples d'utilisation

### Utilisation de `t` dans un composant client

Assurez-vous d'inclure la directive `'use client';` en haut de votre fichier composant lors de l'utilisation de `t` dans un composant côté client.

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### Utilisation de `t` dans un composant serveur

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### Traductions en ligne dans les attributs

La fonction `t` est particulièrement utile pour les traductions en ligne dans les attributs JSX. Lorsque vous localisez des attributs comme `alt`, `title`, `href` ou `aria-label`, vous pouvez utiliser `t` directement dans l'attribut.

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

La fonction `t` est sans danger pour le type lorsqu'elle est utilisée avec TypeScript, garantissant que tous les paramètres régionaux requis sont fournis.

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Détection et contexte du paramètre régional

Dans `next-intlayer`, le paramètre régional actuel est géré par des fournisseurs de contexte : `IntlayerClientProvider` et `IntlayerServerProvider`. Assurez-vous que ces fournisseurs enveloppent vos composants et que le paramètre `locale` est correctement passé.

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

## Erreurs courantes et dépannage

### `t` Renvoie une traduction indéfinie ou incorrecte

- **Cause** : Le paramètre régional actuel n'est pas correctement défini, ou la traduction pour le paramètre régional actuel est manquante.
- **Solution** :
  - Vérifiez que le `IntlayerClientProvider` ou le `IntlayerServerProvider` est correctement configuré avec le `locale` approprié.
  - Assurez-vous que votre objet de traductions inclut tous les paramètres régionaux nécessaires.

### Traductions manquantes en TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les paramètres régionaux requis, entraînant des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour imposer la complétude de vos traductions.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Manquant 'es' causera une erreur TypeScript
};

const text = t(translations);
```

---

## Conseils pour une utilisation efficace

1. **Utilisez `t` pour des traductions en ligne simples** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Préférez `useIntlayer` pour du contenu structuré** : Pour des traductions plus complexes et la réutilisation de contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Fourniture cohérente du paramètre régional** : Assurez-vous que votre paramètre régional est fourni de manière cohérente dans toute votre application via les fournisseurs appropriés.
4. **Exploitez TypeScript** : Utilisez les types TypeScript pour capturer les traductions manquantes et garantir la sécurité des types.

---

## Conclusion

La fonction `t` dans `next-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications Next.js. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour des usages plus détaillés et des fonctionnalités avancées, consultez la [documentation next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

---

**Note** : N'oubliez pas de configurer correctement votre `IntlayerClientProvider` et `IntlayerServerProvider` pour garantir que le paramètre régional actuel est correctement transmis à vos composants. Cela est crucial pour que la fonction `t` renvoie les traductions correctes.
