# Bien démarrer l'internationalisation (i18n) avec Intlayer et Express

`express-intlayer` est un middleware puissant d'internationalisation (i18n) pour les applications Express, conçu pour rendre vos services backend globalement accessibles en fournissant des réponses localisées basées sur les préférences du client.

## Pourquoi Internationaliser Votre Backend ?

Internationaliser votre backend est essentiel pour servir efficacement un public mondial. Cela permet à votre application de délivrer du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes issues de différents milieux linguistiques.

### Cas Pratiques

- **Affichage des Erreurs de Backend dans la Langue de l'Utilisateur** : Lorsqu'une erreur se produit, afficher des messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Cela est particulièrement utile pour les messages d'erreur dynamiques qui pourraient être affichés dans des composants frontend tels que les toasts ou les modales.

- **Récupération de Contenu Multilingue** : Pour les applications extrayant du contenu d'une base de données, l'internationalisation garantit que vous pouvez servir ce contenu dans plusieurs langues. Cela est crucial pour des plateformes comme les sites de commerce électronique ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et autres contenus dans la langue préférée de l'utilisateur.

- **Envoi d'Emails Multilingues** : Qu'il s'agisse d'emails transactionnels, de campagnes de marketing ou de notifications, envoyer des emails dans la langue du destinataire peut augmenter significativement l'engagement et l'efficacité.

- **Notifications Push Multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée de l'utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et actionnables.

- **Autres Communications** : Toute forme de communication depuis le backend, comme les messages SMS, les alertes système ou les mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, assurant la clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application respecte non seulement les différences culturelles mais s'aligne également mieux avec les besoins du marché mondial, constituant ainsi une étape clé dans l'expansion de vos services à l'échelle mondiale.

## Premiers Pas

### Installation

Pour commencer à utiliser `express-intlayer`, installez le package via npm :

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### Configuration

Configurez les paramètres d'internationalisation en créant un `intlayer.config.ts` à la racine de votre projet :

```typescript
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Configuration de l'Application Express

Configurez votre application Express pour utiliser `express-intlayer` :

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Charge le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Routes
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Exemple de contenu renvoyé en anglais",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Exemple de contenu d'erreur renvoyé en anglais",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// Démarrage du serveur
app.listen(3000, () => {
  console.info(`Écoute sur le port 3000`);
});
```

### Compatibilité

`express-intlayer` est totalement compatible avec :

- `react-intlayer` pour les applications React.
- `next-intlayer` pour les applications Next.js.

Il fonctionne également de manière transparente avec toute solution d'internationalisation dans divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter la locale via les en-têtes ou les cookies :

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // Autres options de configuration
  middleware: {
    headerName: "mon-header-de-localité",
    cookieName: "mon-cookie-de-localité",
  },
};
```

> Pour plus d'informations sur la configuration et les sujets avancés, visitez notre [documentation](https://intlayer.org/doc/concept/configuration).

Par défaut, `express-intlayer` interprétera l'en-tête `Accept-Language` pour déterminer la langue préférée du client.

## Propulsé par TypeScript

`express-intlayer` tire parti des capacités robustes de TypeScript pour améliorer le processus d'internationalisation. La typage statique de TypeScript assure que chaque clé de traduction est prise en compte, réduisant le risque de traductions manquantes et améliorant la maintenance.

> Assurez-vous que les types générés (par défaut à ./types/intlayer.d.ts) sont inclus dans votre fichier tsconfig.json.
