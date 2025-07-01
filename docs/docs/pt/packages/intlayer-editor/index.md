---
docName: package__intlayer-editor
url: https://intlayer.org/doc/package/intlayer-editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer-editor/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - Pacote Visual de Editor de Tradução
description: Pacote de editor visual para Intlayer que fornece uma interface intuitiva para gerenciar traduções e edição colaborativa de conteúdo com assistência de IA.
keywords:
  - intlayer
  - editor
  - visual
  - tradução
  - colaborativo
  - IA
  - NPM
  - interface
---

# intlayer-editor: Pacote NPM para usar o editor visual Intlayer

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O pacote **`intlayer-editor`** é um pacote NPM que integra o editor visual Intlayer ao seu projeto React.

## Como o Editor Intlayer Funciona

O editor Intlayer permite interagir com o dicionário remoto do Intlayer. Ele pode ser instalado no lado do cliente e transformar sua aplicação em um editor semelhante a um CMS para gerenciar o conteúdo do seu site em todos os idiomas configurados.

![Interface do Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### Configuração

No seu arquivo de configuração do Intlayer, você pode personalizar as configurações do editor:

```typescript
const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se falso, o editor está inativo e não pode ser acessado.
    // Client ID e client secret são necessários para habilitar o editor.
    // Eles permitem identificar o usuário que está editando o conteúdo.
    // Podem ser obtidos criando um novo cliente no Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Se você não possui um client ID e client secret, pode obtê-los criando um novo cliente no [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

O pacote `intlayer-editor` é baseado no Intlayer e está disponível para aplicações JavaScript, como React (Create React App), Vite + React e Next.js.

Para mais detalhes sobre como instalar o pacote, veja a seção relevante abaixo:

### Integração com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)

### Exemplo de integração

Para integrar o editor visual Intlayer no seu projeto React, siga estes passos:

- Importe o componente do editor Intlayer na sua aplicação React:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>
            {/* O conteúdo da sua aplicação aqui */}
          </IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Importe os estilos do editor Intlayer na sua aplicação Next.js:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## Usando o Editor

Quando o editor está instalado, ativado e iniciado, você pode visualizar cada campo indexado pelo Intlayer passando o cursor sobre o seu conteúdo.

![Passando o cursor sobre o conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se o seu conteúdo estiver contornado, você pode pressioná-lo por um tempo para exibir a gaveta de edição.

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
