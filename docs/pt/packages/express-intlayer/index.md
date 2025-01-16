# express-intlayer: Pacote JavaScript para internacionalizar (i18n) uma aplicação Express.js

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. Ele é compatível com frameworks como React, Next.js e Express.js.

**O pacote `express-intlayer`** permite que você internacionalize sua aplicação Express.js. Ele fornece um middleware para detectar o idioma preferido do usuário e retorna o dicionário apropriado para o usuário.

## Por que internacionalizar seu backend?

Internacionalizar seu backend é essencial para atender efetivamente a um público global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

### Casos de Uso Práticos

- **Exibindo Erros do Backend na Língua do Usuário**: Quando um erro ocorre, exibir mensagens na língua nativa do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser exibidas em componentes de front-end, como toasts ou modais.

- **Recuperando Conteúdo Multilíngue**: Para aplicações que retiram conteúdo de um banco de dados, a internacionalização garante que você possa servir esse conteúdo em vários idiomas. Isso é crucial para plataformas como sites de comércio eletrônico ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos na língua preferida do usuário.

- **Enviando Emails Multilíngues**: Seja para emails transacionais, campanhas de marketing ou notificações, enviar emails na língua do destinatário pode aumentar significativamente o engajamento e a eficácia.

- **Notificações Push Multilíngues**: Para aplicações móveis, enviar notificações push na língua preferida do usuário pode aumentar a interação e a retenção. Esse toque pessoal pode fazer as notificações parecerem mais relevantes e acionáveis.

- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, se beneficia de estar na língua do usuário, garantindo clareza e melhorando a experiência geral do usuário.

Ao internacionalizar o backend, sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor com as necessidades do mercado global, tornando-se um passo fundamental para escalar seus serviços em todo o mundo.

## Por que integrar o Intlayer?

- **Ambiente Seguro em Tipos**: Aproveite o TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e livres de erros.

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

Configure sua aplicação Express para usar `express-intlayer`:

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
      en: "Exemplo de conteúdo retornado em inglês",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
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
      en: "Exemplo de conteúdo retornado em inglês",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de conteúdo devuelto en español (España)",
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
      en: "Exemplo de conteúdo retornado em inglês",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de conteúdo devuelto en español (España)",
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

Ele também funciona perfeitamente com qualquer solução de internacionalização em diversos ambientes, incluindo navegadores e requisições API. Você pode personalizar o middleware para detectar o locale através de cabeçalhos ou cookies:

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
import { Locales } from "intlayer");

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

Por padrão, `express-intlayer` interpreta o cabeçalho `Accept-Language` para determinar o idioma preferido do cliente.

## Funções fornecidas pelo pacote `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/express-intlayer/t.md)
