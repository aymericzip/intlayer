# express-intlayer: Pacote JavaScript para internacionalizar (i18n) uma aplicação Express.js

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, Next.js e Express.js.

**O pacote `express-intlayer`** permite que você internacionalize sua aplicação Express.js. Ele fornece um middleware para detectar o idioma preferido do usuário e retorna o dicionário apropriado para o usuário.

## Por que Internacionalizar seu Backend?

Internacionalizar seu backend é essencial para atender de forma eficaz a um público global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

### Casos de Uso Práticos

- **Exibir Erros do Backend no Idioma do Usuário**: Quando ocorre um erro, exibir mensagens no idioma nativo do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser exibidas em componentes do front-end, como toasts ou modais.

- **Recuperar Conteúdo Multilíngue**: Para aplicações que buscam conteúdo de um banco de dados, a internacionalização garante que você possa servir esse conteúdo em vários idiomas. Isso é crucial para plataformas como sites de e-commerce ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos no idioma preferido pelo usuário.

- **Enviar E-mails Multilíngues**: Seja para e-mails transacionais, campanhas de marketing ou notificações, enviar e-mails no idioma do destinatário pode aumentar significativamente o engajamento e a eficácia.

- **Notificações Push Multilíngues**: Para aplicativos móveis, enviar notificações push no idioma preferido do usuário pode melhorar a interação e a retenção. Esse toque pessoal pode fazer com que as notificações pareçam mais relevantes e acionáveis.

- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, se beneficia ao estar no idioma do usuário, garantindo clareza e melhorando a experiência geral do usuário.

Ao internacionalizar o backend, sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor às necessidades do mercado global, tornando-se um passo fundamental para escalar seus serviços mundialmente.

## Por que integrar o Intlayer?

- **Ambiente Seguro para Tipos**: Aproveite o TypeScript para garantir que todas as definições de conteúdo sejam precisas e livres de erros.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Configurar o Intlayer

O Intlayer fornece um arquivo de configuração para configurar seu projeto. Coloque este arquivo na raiz do seu projeto.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Exemplo de uso

Configure sua aplicação Express para usar o `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Carregar manipulador de requisições de internacionalização
app.use(intlayer());

// Rotas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      pt: "Exemplo de conteúdo retornado em português",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Carregar manipulador de requisições de internacionalização
app.use(intlayer());

// Rotas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      pt: "Exemplo de conteúdo retornado em português",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Carregar manipulador de requisições de internacionalização
app.use(intlayer());

// Rotas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      pt: "Exemplo de conteúdo retornado em português",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Compatibilidade

`express-intlayer` é totalmente compatível com:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/index.md) para aplicações React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/index.md) para aplicações Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/vite-intlayer/index.md) para aplicações Vite

Ele também funciona perfeitamente com qualquer solução de internacionalização em vários ambientes, incluindo navegadores e requisições de API. Você pode personalizar o middleware para detectar o idioma por meio de cabeçalhos ou cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Outras opções de configuração
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Outras opções de configuração
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Outras opções de configuração
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Por padrão, o `express-intlayer` interpretará o cabeçalho `Accept-Language` para determinar o idioma preferido do cliente.

## Funções fornecidas pelo pacote `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt-PT/packages/express-intlayer/t.md)
