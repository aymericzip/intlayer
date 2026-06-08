---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Traduzione
description: Scopri come dichiarare e utilizzare la traduzione nel tuo sito web multilingue. Segui i passaggi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - Traduzione
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Cronologia iniziale"
---

# Traduzione

## Definizione delle Traduzioni

La funzione `t` in `intlayer` ti permette di dichiarare contenuti in più lingue. Questa funzione garantisce la sicurezza dei tipi, generando un errore se mancano delle traduzioni, il che è particolarmente utile negli ambienti TypeScript.

Ecco un esempio di come dichiarare contenuti con traduzioni.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application", // messaggio di benvenuto in inglese
      fr: "Bienvenue dans notre application", // messaggio di benvenuto in francese
      es: "Bienvenido a nuestra aplicación", // messaggio di benvenuto in spagnolo
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
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

## Configurazione delle Locali

Per garantire una corretta gestione delle traduzioni, puoi configurare le località accettate in `intlayer.config.ts`. Questa configurazione ti permette di definire le lingue supportate dalla tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

Questo componente recupera la traduzione corrispondente in base alla locale corrente impostata nella tua applicazione.

## Oggetti di Contenuto Personalizzati

`intlayer` supporta oggetti di contenuto personalizzati per la traduzione, permettendoti di definire strutture più complesse garantendo al contempo la sicurezza dei tipi. Ecco un esempio con un oggetto personalizzato:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

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
} satisfies Dictionary;

export default customContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "custom_content",
  "content": {
    "profileText": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "title": "Page Title",
          "content": "Contenuto della Pagina"
        },
        "fr": {
          "title": "Titre de la Page",
          "content": "Contenu de la Page"
        },
        "es": {
          "title": "Título de la Página",
          "content": "Contenido de la Página"
        }
      }
    }
  }
}
```
