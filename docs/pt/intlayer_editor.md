# Documentação do Editor Intlayer

O Editor Intlayer é uma ferramenta que transforma sua aplicação em um editor visual. Com o Editor Intlayer, suas equipes podem gerenciar o conteúdo do seu site em todos os idiomas configurados.

![Interface do Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

O pacote `intlayer-editor` é baseado no Intlayer e está disponível para aplicações JavaScript, como React (Create React App), Vite + React e Next.js.

## Integração

Para mais detalhes sobre como instalar o pacote, veja a seção relevante abaixo:

### Integração com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md).

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md).

## Como o Editor Intlayer Funciona

Cada vez que você faz uma alteração usando o Editor Intlayer, o servidor automaticamente insere suas alterações nos seus [arquivos de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md), onde quer que esses arquivos sejam declarados em seu projeto.

Dessa forma, você não precisa se preocupar sobre onde o arquivo é declarado ou sobre encontrar sua chave na sua coleção de dicionários.

## Instalação

Uma vez que o Intlayer está configurado em seu projeto, basta instalar `intlayer-editor` como uma dependência de desenvolvimento:

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Configuração

### 1. Habilite o Editor em seu arquivo intlayer.config.ts

Em seu arquivo de configuração do Intlayer, você pode personalizar as configurações do editor:

```typescript
const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se false, o editor está inativo e não pode ser acessado.
    // O ID do cliente e o segredo do cliente são necessários para habilitar o editor.
    // Eles permitem identificar o usuário que está editando o conteúdo.
    // Eles podem ser obtidos criando um novo cliente no Painel Intlayer - Projetos (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Se você não tiver um ID de cliente e segredo do cliente, pode obtê-los criando um novo cliente no [Painel Intlayer - Projetos](https://intlayer.org/dashboard/projects).

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### 2. Insira o Provedor do Editor Intlayer em sua aplicação

Para habilitar o editor, você precisa inserir o Provedor do Editor Intlayer em sua aplicação.

Exemplo para aplicações React JS ou Vite + React:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* Sua aplicação */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Exemplo para aplicações Next.js:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>{/* Sua aplicação */}</IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. Adicione as folhas de estilo à sua aplicação

Para exibir os estilos do editor, você precisa adicionar as folhas de estilo à sua aplicação.

Se o tailwind for usado, você pode adicionar as folhas de estilo ao seu arquivo `tailwind.config.js`:

```js
// tailwind.config.js
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... restante do seu conteúdo
  ],
  // ...
};
```

Caso contrário, você pode importar as folhas de estilo em sua aplicação:

```tsx
// app.tsx
import "intlayer-editor/css";
```

Ou

```css
/* app.css */
@import "intlayer-editor/css";
```

## Usando o Editor

Quando o editor está instalado, habilitado e iniciado, você pode visualizar cada campo indexado pelo Intlayer ao passar o cursor sobre seu conteúdo.

![Passando o mouse sobre o conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se o seu conteúdo estiver contornado, você pode pressionar longamente para exibir o painel de edição.
