---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite e React i18n - Transforme uma aplicação existente em uma aplicação multilíngue (guia i18n 2026)
description: Descubra como tornar sua aplicação Vite e React existente multilíngue usando o Compilador Intlayer. Siga a documentação para internacionalização (i18n) e traduza-a com IA.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vite
  - React
  - Compilador
  - IA
slugs:
  - doc
  - ambiente
  - vite-e-react
  - compilador
  - IA
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Lançamento inicial
---

# Como tornar multilíngue (i18n) uma aplicação Vite e React existente depois de pronta (guia i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">
  
<iframe title="A melhor solução i18n para Vite e React? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação usando o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-vite-react-template) no GitHub.

## Índice

<TOC/>

## Por que é difícil internacionalizar uma aplicação existente?

Se você já tentou adicionar vários idiomas a um app que foi construído para apenas um, você conhece a dor. Não é apenas "difícil" — é tedioso. Você tem que vasculhar cada arquivo, caçar cada string de texto e movê-las para arquivos de dicionário separados.

Depois vem a parte arriscada: substituir todo esse texto por hooks de código sem quebrar o layout ou a lógica. É o tipo di trabalho que interrompe o desenvolvimento de novas funcionalidades por semanas e parece uma refatoração interminável.

## O que é o Compilador Intlayer?

O **Compilador Intlayer** foi criado para pular esse trabalho braçal manual. Em vez de você extrair strings manualmente, o compilador faz isso por você. Ele escaneia seu código, encontra o texto e usa IA para gerar os dicionários nos bastidores.
Depois, ele modifica seu código durante o build para injetar os hooks de i18n necessários. Basicamente, você continua escrevendo seu app como se fosse de um único idioma, e o compilador cuida da transformação multilíngue automaticamente.

> Doc Compilador: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)

### Limitações

Como o compilador realiza análise e transformação de código (inserindo hooks e gerando dicionários) em **tempo de compilação**, ele pode **reduzir a velocidade do processo di build** da sua aplicação.

Para mitigar esse impacto durante o desenvolvimento, você pode configurar o compilador para rodar no modo [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) ou desativá-lo quando não for necessário.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e React

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  O pacote que integra o Intlayer com a aplicação React. Ele fornece provedores de contexto e hooks para internacionalização no React.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar o idioma preferido do usuário, gerenciar cookies e lidar com redirecionamento de URL.

### Passo 2: Configurar Seu Projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // Pode ser definido como 'build-only' para limitar o impacto no modo dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sem prefixo comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Este é um app de mapas", // Nota: você pode personalizar esta descrição do app
  },
};

export default config;
```

> **Nota**: Certifique-se de ter sua `OPEN_AI_API_KEY` definida em suas variáveis de ambiente.

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Passo 3: Integrar o Intlayer na sua Configuração do Vite

Adicione o plugin intlayer na sua configuração.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> O plugin Vite `intlayer()` é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

> O plugin Vite `intlayerCompiler()` é usado para extrair conteúdo do componente e escrever os arquivos `.content`.

### Passo 4: Compilar seu código

Basta escrever seus componentes com strings hardcoded no seu idioma padrão. O compilador cuida do resto.

Exemplo de como sua página pode ficar:

<Tabs>
 <Tab value="Código">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Logo Vite" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="Logo React" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          a contagem é {count}
        </button>
        <p>
          Edite <code>src/App.tsx</code> e salve para testar HMR
        </p>
      </div>
      <p className="read-the-docs">
        Clique nos logos do Vite e React para saber mais
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Saída">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      pt: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "a contagem é",
        editMessage: "Editar",
        hmrMessage: "e salve para testar HMR",
        readTheDocs: "Clique nos logos do Vite e React para saber mais",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** é usado para fornecer o idioma aos componentes aninhados.

### (Opcional) Passo 6: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Esta função permite que você defina o idioma da aplicação e atualize o conteúdo adequadamente.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Alterar idioma para Inglês
    </button>
  );
};
```

> Para aprender mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite commitá-los no seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar arquivos gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão Oficial do Intlayer para VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Pré-visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão do Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Indo Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
