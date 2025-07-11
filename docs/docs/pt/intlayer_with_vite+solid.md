---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Traduza seu site Vite e Solid (i18n)
description: Descubra como tornar seu site Vite e Solid multilíngue. Siga a documentação para internacionalizar (i18n) e traduzir.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
# applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
---

# Começando a Internacionalizar (i18n) com Intlayer, Vite e Solid

> Este pacote está em desenvolvimento. Veja a [issue](https://github.com/aymericzip/intlayer/issues/117) para mais informações. Demonstre seu interesse pelo Intlayer para Solid curtindo a issue

<!-- Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-solid-template) no GitHub. -->

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e open-source de internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente, melhorando a autocompletação e a detecção de erros.
- **Beneficie de recursos avançados**, como detecção e troca dinâmica de localidade.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e Solid

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

- **solid-intlayer**
  O pacote que integra o Intlayer com a aplicação Solid. Ele fornece provedores de contexto e hooks para internacionalização em Solid.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), assim como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URL.

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

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desabilitar logs do Intlayer no console e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na Sua Configuração do Vite

Adicione o plugin intlayer na sua configuração.

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

> O plugin Vite `intlayerPlugin()` é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 4: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> As suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação assim que forem incluídas no diretório `contentDir` (por padrão, `./src`). E devem corresponder à extensão do ficheiro de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

### Passo 5: Utilize o Intlayer no Seu Código

[por completar]

### (Opcional) Passo 6: Alterar o idioma do seu conteúdo

[por completar]

### (Opcional) Passo 7: Adicionar Roteamento localizado à sua aplicação

[por completar]

### (Opcional) Passo 8: Alterar a URL quando o idioma mudar

[por completar]

### (Opcional) Passo 9: Alterar os atributos de idioma e direção do HTML

[por completar]

[por completar]

### (Opcional) Passo 10: Criar um Componente de Link Localizado

[por completar]

### Configuração do Git

É recomendado ignorar os ficheiros gerados pelo Intlayer. Isto permite evitar que sejam cometidos no seu repositório Git.

Para isso, pode adicionar as seguintes instruções ao seu ficheiro `.gitignore`:

```plaintext
# Ignorar os ficheiros gerados pelo Intlayer
.intlayer
```

### Extensão para VS Code

Para melhorar a sua experiência de desenvolvimento com o Intlayer, pode instalar a extensão oficial **Intlayer VS Code Extension**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Deteção de erros em tempo real** para traduções em falta.
- **Pré-visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Mais Longe

Para ir mais longe, pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar o seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

---

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
