# Introdução à Internacionalização (i18n) com Intlayer, Vite e React

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e React

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **react-intlayer**
  O pacote que integra o Intlayer com a aplicação React. Ele fornece provedores de contexto e hooks para internacionalização no React.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URL.

### Passo 2: Configuração do seu projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Seus outros idiomas
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
      Locales.SPANISH,
      // Seus outros idiomas
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
      Locales.SPANISH,
      // Seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão de suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na Configuração do Vite

Adicione o plugin intlayer à sua configuração.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> O plugin `intlayerPlugin()` do Vite é usado para integrar o Intlayer com o Vite. Ele garante a construção de arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 4: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      pt: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      pt: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      pt: "a contagem é ",
    }),

    edit: t<ReactNode>({
      // Não se esqueça de importar React se você usar um nó React no seu conteúdo
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
      pt: (
        <>
          Edite <code>src/App.tsx</code> e salve para testar o HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      pt: "Clique nos logotipos do Vite e React para saber mais",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "pt": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "pt": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "pt": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "pt": "a contagem é "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "pt": "Edite src/App.tsx e salve para testar o HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "pt": "Clique nos logotipos do Vite e React para saber mais"
      }
    }
  }
}
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{ts,tsx,js,jsx,mjs,cjs}`). Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md). Se o seu arquivo de conteúdo incluir código TSX, você deve considerar importar `import React from "react";` no seu arquivo de conteúdo.

### Passo 5: Utilize o Intlayer no Seu Código

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

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
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
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

> Para aprender mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayer.md).

### Configure o TypeScript

O Intlayer utiliza a ampliação de módulos para obter os benefícios do TypeScript e tornar sua base de código mais robusta.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // sua configuração personalizada
  "include": [
    "src",
    "types", // <- Inclua os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os arquivos gerados pelo Intlayer. Isso evita que você os adicione ao seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```

### Vá Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md).
