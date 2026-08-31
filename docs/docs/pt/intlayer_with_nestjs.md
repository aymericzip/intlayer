---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "NestJS i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação NestJS multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
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
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Documento inicial"
---

# Traduza seu Nest backend com Intlayer | Internacionalização (i18n)

`express-intlayer` é um middleware poderoso de internacionalização (i18n) para aplicações Express, projetado para tornar seus serviços backend acessíveis globalmente, fornecendo respostas localizadas com base nas preferências do cliente. Como o NestJS é construído sobre o Express, você pode integrar perfeitamente o `express-intlayer` em suas aplicações NestJS para lidar efetivamente com conteúdo multilíngue.

Casos de Uso Prático

- **Exibição de Erros do Backend no Idioma do Usuário**: Quando ocorre um erro, exibir mensagens no idioma nativo do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser mostradas em componentes front-end como toasts ou modals.

- **Recuperação de Conteúdo Multilíngue**: Para aplicações que buscam conteúdo de um banco de dados, a internacionalização garante que você possa servir esse conteúdo em múltiplos idiomas. Isso é crucial para plataformas como sites de e-commerce ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos no idioma preferido pelo usuário.

- **Envio de E-mails Multilingues**: Seja para e-mails transacionais, campanhas de marketing ou notificações, enviar e-mails no idioma do destinatário pode aumentar significativamente o engajamento e a eficácia.

- **Notificações Push Multilíngues**: Para aplicações móveis, enviar notificações push na língua preferida do utilizador pode melhorar a interação e retenção. Este toque pessoal pode tornar as notificações mais relevantes e acionáveis.

- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, beneficia-se de estar no idioma do usuário, garantindo clareza e melhorando a experiência geral do usuário.

Ao internacionalizar o backend, sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor com as necessidades do mercado global, tornando-se uma etapa fundamental no dimensionamento de seus serviços em todo o mundo.

## Começando

### Criar um novo projeto NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Instalação

Para começar a usar o `express-intlayer`, instale o pacote usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> a flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
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

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um backend NestJS?">

O NestJS possui o `nestjs-i18n`, que é a escolha comum e cobre catálogos JSON ou YAML com um serviço com escopo de requisição. A alternativa é o `Intlayer` através do `express-intlayer`, que utiliza o mesmo conteúdo declarado do seu frontend, é fortemente tipado com base nos seus dicionários e vem com suporte a tradução por IA e CMS.

A razão principal para internacionalizar o backend é que grande parte do texto que um usuário lê nunca passa pelo frontend: mensagens de erro de API, e-mails transacionais, notificações push, SMS e geração de relatórios em PDF. Todos esses textos necessitam do idioma do destinatário, resolvido por requisição em vez de por sessão.

Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do pacote (bundle) do meu servidor NestJS?">

Muito pouco. Os dicionários são compilados com antecedência e apenas os locales declarados são incluídos, eliminando o carregamento de catálogos na inicialização do servidor e leituras de arquivos em disco no caminho das requisições. Isso faz grande diferença em deploys serverless e edge, onde o tamanho do pacote afeta o tempo de inicialização a frio (cold start). Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md).

</Question>

<Question title="Posso migrar do i18next sem reescrever meus handlers?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface do `i18next`, porém alimentados pelos dicionários do Intlayer, permitindo alterar apenas as importações sem modificar o código dos serviços e handlers.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus arquivos fonte, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

No lado frontend do mesmo projeto, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) vai além e gera os dicionários em tempo de build a partir de código JSX, TSX, Vue ou Svelte, fazendo com que as duas partes da aplicação compartilhem a mesma camada de conteúdo sem necessidade de manter chaves manualmente.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Como o Intlayer sabe em qual idioma responder?">

Por padrão, o `express-intlayer` lê o cabeçalho `Accept-Language` da requisição e seleciona o locale declarado mais próximo, recorrendo ao locale padrão caso não haja correspondência. É possível personalizar essa fonte em `routing.storage`, usando por exemplo um cabeçalho customizado ou um cookie definido pelo frontend, garantindo que a API responda no idioma que o usuário realmente selecionou na interface. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="O locale fica isolado por requisição?">

Sim. O middleware isola o escopo do locale ativo para a requisição corrente, de modo que requisições concorrentes em idiomas diferentes nunca interfiram entre si. É isso que torna chamadas a `t()` e `getIntlayer()` seguras para uso em serviços sem precisar passar o argumento de locale manualmente através de cada função.

</Question>

<Question title="Como envio e-mails transacionais no idioma do destinatário?">

Declare o conteúdo do e-mail em um arquivo de conteúdo como qualquer outro texto, e resolva-o com `getIntlayer` informando o locale armazenado no cadastro do destinatário em vez do locale da requisição. Isso é fundamental para filas e jobs em segundo plano, onde o idioma pertence ao registro do usuário e não existe uma requisição HTTP ativa para fornecer o cabeçalho.

</Question>

<Question title="Como internacionalizo mensagens de erro da API?">

Envolva a mensagem com `t()` no ponto em que o erro for construído. O locale ativo da requisição a resolverá automaticamente, fazendo com que o cliente receba uma mensagem pronta para exibição e poupando o frontend de gerenciar um catálogo paralelo de códigos de erro.

</Question>

<Question title="Posso injetar traduções em um serviço ou controller do NestJS?">

Sim. Chame `getIntlayer("app")` dentro do serviço ou controller, conforme mostrado acima. Não é necessário registrar um módulo por funcionalidade ou injetar tokens especiais, pois o locale ativo é obtido diretamente do contexto da requisição configurado pelo middleware.

</Question>

<Question title="Como traduzo o conteúdo do backend automaticamente com IA?">

Execute `npx intlayer fill`, que preenche traduções pendentes com o LLM de sua escolha usando seu provedor e chave de API próprios. Adicione `--git-diff` para traduzir apenas o conteúdo alterado na branch atual. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e valores interpolados no servidor?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md) para valores interpolados, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) para corpos de e-mail e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Tenho autocompletar com TypeScript no servidor?">

Sim. O Intlayer gera os tipos dos seus dicionários em `./types/intlayer.d.ts`, transformando chaves inexistentes em erros de compilação em vez de retornar strings vazias em runtime. Execute `npx intlayer test` no CI para falhar a build quando faltar conteúdo em algum locale declarado.

</Question>

<Question title="O frontend e o backend podem compartilhar o mesmo conteúdo?">

Sim, e essa é a configuração típica. O `express-intlayer` funciona lado a lado com `react-intlayer`, `next-intlayer` e `vite-intlayer` sobre as mesmas declarações de conteúdo, permitindo que um texto usado tanto em uma resposta de API quanto em uma tela seja declarado uma única vez. Consulte [como funciona o Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/how_works_intlayer.md).

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
