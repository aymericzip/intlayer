---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: i18n Hono - Como traduzir sua aplicação Hono – guia 2026
description: Descubra como tornar seu back-end Hono multilíngue. Siga a documentação para internacionalizar (i18n) e traduzi-lo.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Hono
  - JavaScript
  - Back-end
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Adicionar comando init
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicialização do histórico
---

# Traduza seu site back-end Hono usando Intlayer | Internacionalização (i18n)

`hono-intlayer` é um poderoso middleware de internacionalização (i18n) para aplicações Hono, projetado para tornar seus serviços de back-end acessíveis globalmente, fornecendo respostas localizadas com base nas preferências do cliente.

### Casos de Uso Práticos

- **Exibindo Erros de Back-end no Idioma do Usuário**: Quando ocorre um erro, a exibição de mensagens no idioma nativo do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser mostradas em componentes front-end como toasts ou modais.

- **Recuperando Conteúdo Multilíngue**: Para aplicações que extraem conteúdo de um banco de dados, a internacionalização garante que você possa servir esse conteúdo em vários idiomas. Isso é crucial para plataformas como sites de comércio eletrônico ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos no idioma de preferência do usuário.

- **Enviando E-mails Multilíngues**: Sejam e-mails transacionais, campanhas de marketing ou notificações, enviar e-mails no idioma do destinatário pode aumentar significativamente o engajamento e a eficácia.

- **Notificações Push Multilíngues**: Para aplicações móveis, enviar notificações push no idioma de preferência de um usuário pode melhorar a interação e a retenção. Esse toque pessoal pode fazer com que as notificações pareçam mais relevantes e acionáveis.

- **Outras Comunicações**: Qualquer forma de comunicação do back-end, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, beneficia-se de estar no idioma do usuário, garantindo clareza e aprimorando a experiência geral do usuário.

Ao internacionalizar o back-end, sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor com as necessidades do mercado global, tornando-se um passo fundamental na expansão de seus serviços em todo o mundo.

## Primeiros Passos

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-hono-template) on GitHub.

### Instalação

Para começar a usar o `hono-intlayer`, instale o pacote usando o npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
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
      Locales.PORTUGUESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pt: "Exemplo de conteúdo retornado em português",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que sejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

### Configuração da Aplicação Hono

Configure sua aplicação Hono para usar o `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Carregar manipulador de solicitação de internacionalização
app.use("*", intlayer());

// Rotas
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pt: "Exemplo de conteúdo retornado em português",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Compatibilidade

O `hono-intlayer` é totalmente compatível com:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/index.md) para aplicações React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/index.md) para aplicações Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/index.md) para aplicações Vite

Ele também funciona perfeitamente com qualquer solução de internacionalização em vários ambientes, incluindo navegadores e solicitações de API. Você pode personalizar o middleware para detectar a localidade por meio de cabeçalhos ou cookies:

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

Por padrão, o `hono-intlayer` interpretará o cabeçalho `Accept-Language` para determinar o idioma de preferência do cliente.

> Para mais informações sobre configuração e tópicos avançados, visite nossa [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Configurar TypeScript

O `hono-intlayer` aproveita as capacidades robustas do TypeScript para aprimorar o processo de internacionalização. A tipagem estática do TypeScript garante que cada chave de tradução seja considerada, reduzindo o risco de traduções ausentes e melhorando a manutenibilidade.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que os tipos gerados automaticamente (por padrão em ./types/intlayer.d.ts) estejam incluídos no seu arquivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Incluir os tipos gerados automaticamente
  ],
}
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial do Intlayer para VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erro em tempo real** para traduções ausentes.
- **Pré-visualizações in-line** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite evitar o commit deles no seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```
