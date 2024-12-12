# Traduzione

## Definire Traduzioni

La funzione `t` in `intlayer` permette di dichiarare contenuti in più lingue. Questa funzione garantisce la sicurezza dei tipi, sollevando un errore se mancanti traduzioni, cosa particolarmente utile in ambienti TypeScript.

### Utilizzando TypeScript

Ecco un esempio di come dichiarare contenuti con traduzioni in un file TypeScript:

```typescript
import { t, type DeclarationContent } from "intlayer";

const multiLangContent = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent;

export default multiLangContent;
```

### Utilizzando ECMAScript Modules

Se stai utilizzando i moduli ECMAScript, la dichiarazione appare così:

```javascript
import { t } from "intlayer";

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### Utilizzando CommonJS Modules

In un setup CommonJS, puoi dichiarare traduzioni in questo modo:

```javascript
const { t } = require("intlayer");

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### Utilizzando JSON

Per dichiarazioni basate su JSON, puoi definire traduzioni come segue:

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "en": "Welcome to our application",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
  }
}
```

## Configurazione per Locali

Per garantire una corretta gestione delle traduzioni, puoi configurare i locali accettati in `intlayer.config.ts`. Questa configurazione permette di definire le lingue supportate dalla tua applicazione:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Utilizzare Traduzioni nei Componenti React

Con `react-intlayer`, puoi utilizzare le traduzioni nei componenti React. Ecco un esempio:

```jsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

Questo componente recupera la traduzione corrispondente in base al locale corrente impostato nella tua applicazione.

## Oggetti Contenuto Personalizzati

`intlayer` supporta oggetti contenuto personalizzati per la traduzione, permettendo di definire strutture più complesse garantendo la sicurezza dei tipi. Ecco un esempio con un oggetto personalizzato:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title",
        content: "Page Content",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
