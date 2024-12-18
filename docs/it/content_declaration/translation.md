````markdown
# Traduzione

## Definizione delle Traduzioni

La funzione `t` in `intlayer` consente di dichiarare contenuti in più lingue. Questa funzione garantisce la sicurezza dei tipi, sollevando un errore se mancano traduzioni, utile in ambienti TypeScript.

### Utilizzando TypeScript

Ecco un esempio di come dichiarare contenuti con traduzioni in un file TypeScript:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent<Content>;
```
````

### Utilizzando Moduli ECMAScript

Se stai utilizzando moduli ECMAScript, la dichiarazione appare così:

```javascript
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Utilizzando Moduli CommonJS

In un setup CommonJS, puoi dichiarare traduzioni in questo modo:

```javascript
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Utilizzando JSON

Per dichiarazioni basate su JSON, puoi definire traduzioni come segue:

```json
{
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Configurazione per le Lingue

Per garantire una corretta gestione delle traduzioni, puoi configurare le lingue accettate in `intlayer.config.ts`. Questa configurazione consente di definire le lingue supportate dalla tua applicazione:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Utilizzo delle Traduzioni nei Componenti React

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

Questo componente recupera la traduzione corrispondente in base alla lingua corrente impostata nella tua applicazione.

## Oggetti di Contenuto Personalizzati

`intlayer` supporta oggetti di contenuto personalizzati per la traduzione, consentendo di definire strutture più complesse garantendo la sicurezza dei tipi. Ecco un esempio con un oggetto personalizzato:

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
