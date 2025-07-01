---
docName: package__express-intlayer
url: https://intlayer.org/doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do Pacote | express-intlayer
description: Veja como usar o pacote express-intlayer
keywords:
  - Intlayer
  - express-intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
---

# express-intlayer: Pacote JavaScript para internacionalizar (i18n) uma aplicação Express.js

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, Next.js e Express.js.

**O pacote `express-intlayer`** permite que você internacionalize sua aplicação Express.js. Ele fornece um middleware para detectar a localidade preferida do usuário e retorna o dicionário apropriado para o usuário.

## Por que Internacionalizar Seu Backend?

Internacionalizar seu backend é essencial para atender eficazmente a um público global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

### Casos de Uso Práticos

- **Exibir Erros do Backend no Idioma do Usuário**: Quando ocorre um erro, exibir mensagens no idioma nativo do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser exibidas em componentes de front-end, como toasts ou modais.

- **Recuperar Conteúdo Multilíngue**: Para aplicações que buscam conteúdo de um banco de dados, a internacionalização garante que você possa fornecer esse conteúdo em vários idiomas. Isso é crucial para plataformas como sites de comércio eletrônico ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos no idioma preferido pelo usuário.

- **Enviar Emails Multilíngues**: Seja para emails transacionais, campanhas de marketing ou notificações, enviar emails no idioma do destinatário pode aumentar significativamente o engajamento e a eficácia.

- **Notificações Push Multilíngues**: Para aplicações móveis, enviar notificações push no idioma preferido do usuário pode melhorar a interação e a retenção. Esse toque pessoal pode fazer com que as notificações pareçam mais relevantes e acionáveis.

- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, se beneficia de estar no idioma do usuário, garantindo clareza e aprimorando a experiência geral do usuário.

Ao internacionalizar o backend, sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor às necessidades do mercado global, tornando-se um passo fundamental para escalar seus serviços mundialmente.

## Por que integrar o Intlayer?

- **Ambiente com Tipagem Segura**: Aproveite o TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e livres de erros.

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
// Configuração do Intlayer para internacionalização
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
// Configuração do Intlayer para internacionalização
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Exemplo de uso

Configure sua aplicação Express para usar `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Carregar o manipulador de requisições de internacionalização
app.use(intlayer());

// Rotas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemplo de conteúdo retornado em francês",
      "es-ES": "Exemplo de conteúdo retornado em espanhol (Espanha)",
      "es-MX": "Exemplo de conteúdo retornado em espanhol (México)",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escutando na porta 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Carregar o manipulador de requisição de internacionalização
app.use(intlayer());

// Rotas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemplo de conteúdo retornado em francês",
      "es-MX": "Exemplo de conteúdo retornado em espanhol (México)",
      "es-ES": "Exemplo de conteúdo retornado em espanhol (Espanha)",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escutando na porta 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Carregar o manipulador de requisição de internacionalização
app.use(intlayer());

// Rotas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escutando na porta 3000`));
```

### Compatibilidade

`express-intlayer` é totalmente compatível com:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/index.md) para aplicações React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/index.md) para aplicações Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/index.md) para aplicações Vite

Também funciona perfeitamente com qualquer solução de internacionalização em diversos ambientes, incluindo navegadores e requisições API. Você pode personalizar o middleware para detectar o locale através de headers ou cookies:

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

javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
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

Por padrão, o `express-intlayer` interpretará o header `Accept-Language` para determinar o idioma preferido do cliente.

## Funções fornecidas pelo pacote `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/express-intlayer/t.md)

## Histórico da documentação

- 5.5.10 - 2025-06-29: Histórico inicial
