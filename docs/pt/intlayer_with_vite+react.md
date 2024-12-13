# Começando a Internacionalização (i18n) com Intlayer, Vite e React

## O que é Intlayer?

**Intlayer** é uma biblioteca inovadora de internacionalização (i18n), de código aberto, projetada para simplificar o suporte a múltiplos idiomas em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** utilizando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte TypeScript** com tipos gerados automaticamente, melhorando a autocompletação e a detecção de erros.
- **Beneficiar-se de recursos avançados**, como detecção e mudança dinâmica de localidade.

---

## Guia Passo a Passo para Configurar Intlayer em uma Aplicação Vite e React

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Passo 2: Configuração do seu projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.PORTUGUESE,
      Locales.FRENCH,
      Locales.SPANISH,
      // Seus outros idiomas
    ],
    defaultLocale: Locales.PORTUGUESE,
  },
};

export default config;
```

Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integrar Intlayer na sua Configuração Vite

Adicione o plugin intlayer na sua configuração.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### Passo 4: Declare Seu Conteúdo

Crie e gerencie seus dicionários de conteúdo:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Não se esqueça de importar React se você usar um nó React em seu conteúdo
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
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

> Nota: Se seu arquivo de conteúdo incluir código TSX, você deve considerar importar `import React from "react";` em seu arquivo de conteúdo.

[Veja como declarar seus arquivos de declaração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

### Passo 5: Utilize Intlayer no Seu Código

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
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
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> Nota: Se você quiser usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função, como:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Opcional) Passo 6: Mudar o idioma do seu conteúdo

Para mudar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Esta função permite que você defina a localidade da aplicação e atualize o conteúdo de acordo.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.PORTUGUESE)}>
      Mudar idioma para Português
    </button>
  );
};
```

### (Opcional) Passo 7: Adicionar Roteamento Localizado à sua aplicação

O objetivo deste passo é criar rotas únicas para cada idioma. Isso é útil para SEO e URLs amigáveis.
Exemplo:

```tsx
// /painel
// /es/painel
// /fr/painel
```

> Por padrão, as rotas não são prefixadas para a localidade padrão. Se você quiser prefixar a localidade padrão, pode definir a opção `middleware.prefixDefault` como `true` em sua configuração. Consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md) para mais informações.

Para adicionar roteamento localizado à sua aplicação, você pode criar um componente `LocaleRouter` que encapsula as rotas da sua aplicação e lida com o roteamento baseado na localidade. Aqui está um exemplo usando [React Router](https://reactrouter.com/home):

```tsx
// Importando dependências e funções necessárias
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funções e tipos utilitários de 'intlayer'
import { FC, PropsWithChildren } from "react"; // Tipos React para componentes funcionais e props
import { IntlayerProvider } from "react-intlayer"; // Provedor para contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes Router para gerenciar navegação

// Desestruturando a configuração do Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que lida com localização e encapsula os filhos com o contexto de localidade apropriado.
 * Ele gerencia a detecção e validação de URL com base na localidade.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obtém o caminho da URL atual
  const { locale } = useParams<{ locale: Locales }>(); // Extrai o parâmetro de localidade da URL

  // Determina a localidade atual, retornando à padrão se não fornecido
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo de localidade do caminho para construir um caminho base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Caminho da URL atual
  );

  /**
   * Se middleware.prefixDefault for verdadeiro, a localidade padrão deve sempre ser prefixada.
   */
  if (middleware.prefixDefault) {
    // Valida a localidade
    if (!locale || !locales.includes(locale)) {
      // Redireciona para a localidade padrão com o caminho atualizado
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Substituir a entrada de histórico atual pela nova
        />
      );
    }

    // Encapsula os filhos com o IntlayerProvider e define a localidade atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault é falso, a localidade padrão não é prefixada.
     * Garante que a localidade atual seja válida e não a localidade padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui a localidade padrão
        )
        .includes(currentLocale) // Verifica se a localidade atual está na lista de localidades válidas
    ) {
      // Redireciona para o caminho sem o prefixo da localidade
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Encapsula os filhos com o IntlayerProvider e define a localidade atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Um componente de roteador que configura rotas específicas de localidade.
 * Utiliza o React Router para gerenciar navegação e renderizar componentes localizados.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Padrão da rota para capturar a localidade (por exemplo, /pt/, /fr/) e combinar todos os caminhos subsequentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Encapsula filhos com gerenciamento de localidade
      />

      {
        // Se o prefixo da localidade padrão estiver desativado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Encapsula filhos com gerenciamento de localidade
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Em paralelo, você também pode usar o intLayerMiddlewarePlugin para adicionar roteamento do lado do servidor à sua aplicação. Este plugin irá detectar automaticamente a localidade atual com base na URL e definir o cookie de localidade apropriado. Se nenhuma localidade for especificada, o plugin determinará a localidade mais apropriada com base nas preferências de idioma do navegador do usuário. Se nenhuma localidade for detectada, ele redirecionará para a localidade padrão.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Passo 8: Mudar a URL quando a localidade mudar

Para mudar a URL quando a localidade mudar, você pode usar a prop `onLocaleChange` fornecida pelo hook `useLocale`. Em paralelo, você pode usar os hooks `useLocation` e `useNavigate` do `react-router-dom` para atualizar o caminho da URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Obtém o caminho da URL atual. Exemplo: /fr/sobre
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Constrói a URL com a localidade atualizada
    // Exemplo: /es/sobre com a localidade definida para espanhol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Atualiza o caminho da URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.PORTUGUESE)}>
      Mudar idioma para Português
    </button>
  );
};
```

### Configurar TypeScript

Intlayer usa aumento de módulo para obter benefícios do TypeScript e tornar seu código mais forte.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração TypeScript inclua os tipos gerados automaticamente.

```json5
// tsconfig.json

{
  // sua configuração personalizada
  include: [
    "src",
    "types", // <- Inclua os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendável ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite contabilizá-los em seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```gitignore
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```
