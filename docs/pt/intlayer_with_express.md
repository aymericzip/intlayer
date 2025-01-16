# Começando a internacionalizar (i18n) com Intlayer e Express

`express-intlayer` é um poderoso middleware de internacionalização (i18n) para aplicações Express, projetado para tornar seus serviços de backend globalmente acessíveis, fornecendo respostas localizadas com base nas preferências do cliente.

## Por que Internacionalizar Seu Backend?

Internacionalizar seu backend é essencial para atender efetivamente a uma audiência global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance de sua aplicação tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

### Casos de Uso Práticos

- **Exibindo Erros de Backend na Língua do Usuário**: Quando um erro ocorre, exibir mensagens na língua nativa do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser mostradas em componentes de front-end como toasts ou modais.

- **Recuperando Conteúdo Multilíngue**: Para aplicações que puxam conteúdo de um banco de dados, a internacionalização assegura que você possa oferecer esse conteúdo em várias línguas. Isso é crucial para plataformas como sites de e-commerce ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos na língua preferida do usuário.

- **Enviando E-mails Multilíngues**: Seja para e-mails transacionais, campanhas de marketing ou notificações, enviar e-mails na língua do destinatário pode aumentar significativamente o engajamento e a eficácia.

- **Notificações Push Multilíngues**: Para aplicações móveis, enviar notificações push na língua preferida do usuário pode melhorar a interação e a retenção. Esse toque pessoal pode fazer com que as notificações pareçam mais relevantes e acionáveis.

- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, se beneficia de estar na língua do usuário, garantindo clareza e melhorando a experiência geral do usuário.

Ao internacionalizar o backend, sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor às necessidades do mercado global, tornando-se um passo fundamental para escalar seus serviços em todo o mundo.

## Começando

### Instalação

Para começar a usar `express-intlayer`, instale o pacote usando npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Configuração

Configure as definições de internacionalização criando um `intlayer.config.ts` na raiz do seu projeto:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### Configuração da Aplicação Express

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

// Carregar o manipulador de requisições de internacionalização
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

// Carregar o manipulador de requisições de internacionalização
app.use(intlayer());

// Rotas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Exemplo de conteúdo retornado em inglês",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
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

Ele também funciona perfeitamente com qualquer solução de internacionalização em diversos ambientes, incluindo navegadores e requisições de API. Você pode personalizar o middleware para detectar o idioma através de cabeçalhos ou cookies:

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

Por padrão, `express-intlayer` interpretará o cabeçalho `Accept-Language` para determinar a língua preferida do cliente.

> Para mais informações sobre configuração e tópicos avançados, visite nossa [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Desenvolvido com TypeScript

`express-intlayer` aproveita as robustas capacidades do TypeScript para aprimorar o processo de internacionalização. A tipagem estática do TypeScript garante que cada chave de tradução esteja contabilizada, reduzindo o risco de traduções faltantes e melhorando a manutenibilidade.

> Certifique-se de que os tipos gerados (por padrão em ./types/intlayer.d.ts) estejam incluídos no seu arquivo tsconfig.json.
