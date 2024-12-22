# Commencer l’internationalisation (i18n) avec Intlayer et Express

`express-intlayer` est un middleware puissant d'internationalisation (i18n) pour les applications Express, conçu pour rendre vos services backend globalement accessibles en fournissant des réponses localisées en fonction des préférences du client.

## Pourquoi internationaliser votre backend ?

L'internationalisation de votre backend est essentielle pour servir efficacement un public mondial. Elle permet à votre application de livrer du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

### Cas d'utilisation pratiques

- **Afficher les erreurs backend dans la langue de l'utilisateur** : Lorsqu'une erreur se produit, afficher les messages dans la langue maternelle de l'utilisateur améliore la compréhension et réduit la frustration. Cela est particulièrement utile pour les messages d'erreur dynamiques qui pourraient être affichés dans des composants frontend comme des toasts ou des modals.

- **Récupérer du contenu multilingue** : Pour les applications tirant du contenu d'une base de données, l'internationalisation garantit que vous pouvez présenter ce contenu en plusieurs langues. Cela est crucial pour des plateformes comme les sites de commerce électronique ou les systèmes de gestion de contenu qui doivent afficher des descriptions de produits, des articles et d'autres contenus dans la langue préférée par l'utilisateur.

- **Envoyer des e-mails multilingues** : Que ce soit pour des e-mails transactionnels, des campagnes marketing ou des notifications, envoyer des e-mails dans la langue du destinataire peut considérablement augmenter l'engagement et l'efficacité.

- **Notifications push multilingues** : Pour les applications mobiles, envoyer des notifications push dans la langue préférée de l'utilisateur peut améliorer l'interaction et la rétention. Cette touche personnelle peut rendre les notifications plus pertinentes et actionnables.

- **Autres communications** : Toute forme de communication provenant du backend, comme des messages SMS, des alertes système ou des mises à jour de l'interface utilisateur, bénéficie d'être dans la langue de l'utilisateur, garantissant clarté et améliorant l'expérience utilisateur globale.

En internationalisant le backend, votre application respecte non seulement les différences culturelles mais s'aligne mieux sur les besoins du marché mondial, ce qui en fait une étape clé pour étendre vos services à l'échelle mondiale.

## Commencer

### Installation

Pour commencer à utiliser `express-intlayer`, installez le paquet en utilisant npm :

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

Configurez les paramètres d'internationalisation en créant un `intlayer.config.ts` dans la racine de votre projet :

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

### Configuration de l'application Express

Configurez votre application Express pour utiliser `express-intlayer` :

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Routes
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Example of returned error content in English",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// Démarrer le serveur
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Compatibilité

`express-intlayer` est entièrement compatible avec :

- `react-intlayer` pour les applications React
- `next-intlayer` pour les applications Next.js

Il fonctionne également sans problème avec toute solution d'internationalisation à travers divers environnements, y compris les navigateurs et les requêtes API. Vous pouvez personnaliser le middleware pour détecter la locale via des en-têtes ou des cookies :

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // Autres options de configuration
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

Par défaut, `express-intlayer` interprétera l'en-tête `Accept-Language` pour déterminer la langue préférée du client.

> Pour plus d'informations sur la configuration et les sujets avancés, visitez notre [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/concept/configuration).

## Alimenté par TypeScript

`express-intlayer` exploite les capacités robustes de TypeScript pour améliorer le processus d'internationalisation. Le typage statique de TypeScript garantit que chaque clé de traduction est prise en compte, réduisant le risque de traductions manquantes et améliorant la maintenabilité.

> Assurez-vous que les types générés (par défaut à ./types/intlayer.d.ts) sont inclus dans votre fichier tsconfig.json.
