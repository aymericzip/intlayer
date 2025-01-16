# intlayer-editor: Pacote NPM para usar o editor visual Intlayer

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O pacote **`intlayer-editor`** é um pacote NPM que integra o editor visual Intlayer ao seu projeto React.

## Como o Editor Intlayer Funciona

O editor intlayer permite interagir com o dicionário remoto do Intlayer. Ele pode ser instalado no lado do cliente e transformar sua aplicação em um editor semelhante a um CMS para gerenciar o conteúdo do seu site em todos os idiomas configurados.

![Interface do Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Instalação

Instale o pacote necessário usando o seu gerenciador de pacotes preferido:

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
    // O ID do cliente e o segredo do cliente são necessários para ativar o editor.
    // Eles permitem identificar o usuário que está editando o conteúdo.
    // Podem ser obtidos criando um novo cliente no Painel do Intlayer - Projetos (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Se você não possui um ID de cliente e um segredo do cliente, pode obtê-los criando um novo cliente no [Painel do Intlayer - Projetos](https://intlayer.org/dashboard/projects).

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md)

O pacote `intlayer-editor` é baseado no Intlayer e está disponível para aplicações JavaScript, como React (Create React App), Vite + React e Next.js.

Para mais detalhes sobre como instalar o pacote, veja a seção relevante abaixo:

### Integração com Next.js

Para integração com o Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md)

### Exemplo de integração

Para integrar o editor visual Intlayer ao seu projeto React, siga estas etapas:

- Importar o componente do editor Intlayer em sua aplicação React:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* Conteúdo do seu App aqui */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Importar os estilos do editor Intlayer na sua aplicação Next.js:

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

Quando o editor está instalado, habilitado e iniciado, você pode visualizar cada campo indexado pelo Intlayer ao passar o cursor sobre seu conteúdo.

![Passando o cursor sobre o conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se o seu conteúdo estiver destacado, você pode pressioná-lo longamente para exibir o painel de edição.
