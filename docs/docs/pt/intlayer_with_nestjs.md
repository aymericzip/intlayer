---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Como traduzir seu Nest backend – guia i18n 2025
description: Descubra como tornar seu backend vite multilíngue. Siga a documentação para internacionalizar (i18n) e traduzir.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 5.8.0
    date: 2025-09-09
    changes: Documento inicial
---

# Traduza seu Nest backend com Intlayer | Internacionalização (i18n)

`express-intlayer` é um middleware poderoso de internacionalização (i18n) para aplicações Express, projetado para tornar seus serviços backend acessíveis globalmente, fornecendo respostas localizadas com base nas preferências do cliente. Como o NestJS é construído sobre o Express, você pode integrar perfeitamente o `express-intlayer` em suas aplicações NestJS para lidar efetivamente com conteúdo multilíngue.

## Por que internacionalizar seu backend?

Internacionalizar seu backend é essencial para atender a um público global de forma eficaz. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

### Casos de Uso Práticos

- **Exibir Erros do Backend no Idioma do Usuário**: Quando ocorre um erro, exibir mensagens no idioma nativo do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser exibidas em componentes front-end, como toasts ou modais.

- **Recuperar Conteúdo Multilíngue**: Para aplicações que buscam conteúdo em um banco de dados, a internacionalização garante que você possa fornecer esse conteúdo em vários idiomas. Isso é crucial para plataformas como sites de comércio eletrônico ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos no idioma preferido pelo usuário.

- **Enviar Emails Multilíngues**: Seja para emails transacionais, campanhas de marketing ou notificações, enviar emails no idioma do destinatário pode aumentar significativamente o engajamento e a eficácia.

- **Notificações Push Multilíngues**: Para aplicações móveis, enviar notificações push no idioma preferido do usuário pode melhorar a interação e a retenção. Esse toque pessoal pode fazer com que as notificações pareçam mais relevantes e acionáveis.

- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, se beneficia de estar no idioma do usuário, garantindo clareza e melhorando a experiência geral do usuário.

Ao internacionalizar o backend, sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor às necessidades do mercado global, tornando-se um passo fundamental para escalar seus serviços mundialmente.

## Começando

### Criar um novo projeto NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Instalação

Para começar a usar o `express-intlayer`, instale o pacote usando npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Configurar tsconfig.json

Para usar o Intlayer com TypeScript, certifique-se de que seu `tsconfig.json` esteja configurado para suportar módulos ES. Você pode fazer isso definindo as opções `module` e `moduleResolution` para `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... outras opções
  },
}
```

### Configuração

Configure as definições de internacionalização criando um arquivo `intlayer.config.ts` na raiz do seu projeto:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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
// Configuração do Intlayer usando módulo ES
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
// Configuração do Intlayer usando CommonJS
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      pt: "Olá Mundo!",
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](/doc/concept/content).

### Configuração do Middleware Express

Integre o middleware `express-intlayer` na sua aplicação NestJS para lidar com internacionalização:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Aplicar para todas as rotas
  }
}
```

### Use Traduções em Seus Serviços ou Controladores

Agora você pode usar a função `getIntlayer` para acessar traduções em seus serviços ou controladores:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // Retorna a saudação da camada internacionalizada
  }
}
```

### Compatibilidade

`express-intlayer` é totalmente compatível com:

- [`react-intlayer`](/doc/packages/react-intlayer) para aplicações React
- [`next-intlayer`](/doc/packages/next-intlayer) para aplicações Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) para aplicações Vite

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

Por padrão, o `express-intlayer` interpretará o cabeçalho `Accept-Language` para determinar o idioma preferido do cliente.

> Para mais informações sobre configuração e tópicos avançados, visite nossa [documentação](/doc/concept/configuration).

### Configurar TypeScript

`express-intlayer` aproveita as robustas capacidades do TypeScript para aprimorar o processo de internacionalização. A tipagem estática do TypeScript garante que cada chave de tradução seja considerada, reduzindo o risco de traduções ausentes e melhorando a manutenção.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que os tipos autogerados (por padrão em ./types/intlayer.d.ts) estejam incluídos no seu arquivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  include: [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Inclua os tipos autogerados
  ],
}
```

### Extensão VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial Intlayer para VS Code**.

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam comitados no seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```
