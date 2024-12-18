# Tradução

## Definindo Traduções

A função `t` no `intlayer` permite declarar conteúdo em múltiplas línguas. Esta função garante segurança de tipo, levantando um erro se alguma tradução estiver faltando, o que é particularmente útil em ambientes TypeScript.

### Usando TypeScript

Aqui está um exemplo de como declarar conteúdo com traduções em um arquivo TypeScript:

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
      pt: "Bem-vindo ao nosso aplicativo",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Usando Módulos ECMAScript

Se você estiver usando módulos ECMAScript, a declaração fica assim:

```javascript
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      pt: "Bem-vindo ao nosso aplicativo",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Usando Módulos CommonJS

Em uma configuração CommonJS, você pode declarar traduções assim:

```javascript
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      pt: "Bem-vindo ao nosso aplicativo",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Usando JSON

Para declarações baseadas em JSON, você pode definir traduções da seguinte forma:

```json
{
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "pt": "Bem-vindo ao nosso aplicativo",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Configuração para Locales

Para garantir um manuseio adequado das traduções, você pode configurar os locales aceitos no `intlayer.config.ts`. Esta configuração permite que você defina as línguas que seu aplicativo suporta:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
    ],
  },
};

export default config;
```

## Usando Traduções em Componentes React

Com `react-intlayer`, você pode usar traduções em componentes React. Aqui está um exemplo:

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

Este componente busca a tradução correspondente com base no locale atual definido em seu aplicativo.

## Objetos de Conteúdo Personalizados

`intlayer` suporta objetos de conteúdo personalizados para tradução, permitindo que você defina estruturas mais complexas enquanto garante segurança de tipo. Aqui está um exemplo com um objeto personalizado:

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
      pt: {
        title: "Título da Página",
        content: "Conteúdo da Página",
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
