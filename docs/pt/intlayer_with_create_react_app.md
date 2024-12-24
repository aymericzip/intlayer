# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdos.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de locais.

---

## Passo a Passo para Configurar o Intlayer em uma Aplicação React

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

Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na sua Configuração CRA

Altere seus scripts para usar react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

Nota: os scripts do react-intlayer são baseados no craco. Você também pode implementar sua própria configuração com base no plugin craco do intlayer. [Veja um exemplo aqui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Passo 4: Declare Seu Conteúdo

Crie e gerencie seus dicionários de conteúdo:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edite <code>src/App.tsx</code> e salve para recarregar
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

[Veja como declarar seus arquivos de declaração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

### Passo 5: Utilize o Intlayer no seu Código

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* Para usar corretamente o hook useIntlayer, você deve acessar seus dados em um componente filho */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
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

Para mudar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Esta função permite que você defina o idioma da aplicação e atualize o conteúdo de acordo.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Mudar idioma para inglês
    </button>
  );
};
```

### (Opcional) Passo 7: Adicionar Roteamento Localizado à sua aplicação

O objetivo deste passo é criar rotas exclusivas para cada idioma. Isso é útil para SEO e URLs amigáveis para SEO.
Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por padrão, as rotas não são prefixadas para o idioma padrão. Se você quiser prefixar o idioma padrão, pode definir a opção `middleware.prefixDefault` como `true` na sua configuração. Consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md) para mais informações.

Para adicionar roteamento localizado à sua aplicação, você pode criar um componente `LocaleRouter` que envolve as rotas da sua aplicação e lida com o roteamento baseado no idioma. Aqui está um exemplo usando [React Router](https://reactrouter.com/home):

```tsx
// Importando dependências e funções necessárias
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funções utilitárias e tipos do 'intlayer'
import { FC, PropsWithChildren } from "react"; // Tipos do React para componentes funcionais e props
import { IntlayerProvider } from "react-intlayer"; // Provedor para contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de roteamento para gerenciar navegação

// Desestruturando a configuração do Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que lida com a localização e envolve crianças com o contexto apropriado de idioma.
 * Ele gerencia a detecção e validação de idioma com base na URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obter o caminho da URL atual
  const { locale } = useParams<{ locale: Locales }>(); // Extrair o parâmetro de idioma da URL

  // Determinar o idioma atual, com fallback para o padrão se não fornecido
  const currentLocale = locale ?? defaultLocale;

  // Remover o prefixo do idioma do caminho para construir um caminho base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Caminho da URL atual
  );

  /**
   * Se middleware.prefixDefault for true, o idioma padrão deve sempre ser prefixado.
   */
  if (middleware.prefixDefault) {
    // Validar o idioma
    if (!locale || !locales.includes(locale)) {
      // Redirecionar para o idioma padrão com o caminho atualizado
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Substituir a entrada atual do histórico pela nova
        />
      );
    }

    // Envolver crianças com o IntlayerProvider e definir o idioma atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault é false, o idioma padrão não é prefixado.
     * Garantir que o idioma atual seja válido e não o idioma padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Excluir o idioma padrão
        )
        .includes(currentLocale) // Verificar se o idioma atual está na lista de idiomas válidos
    ) {
      // Redirecionar para o caminho sem o prefixo de idioma
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envolver crianças com o IntlayerProvider e definir o idioma atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Um componente de roteamento que configura rotas específicas para cada idioma.
 * Usa o React Router para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Padrão de rota para capturar o idioma (por exemplo, /en/, /fr/) e corresponder a todos os caminhos subsequentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envolve as crianças com gerenciamento de idioma
      />

      {
        // Se a prefixação do idioma padrão estiver desativada, renderize as crianças diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envolve as crianças com gerenciamento de idioma
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Opcional) Passo 8: Mudar a URL quando o idioma mudar

Para mudar a URL quando o idioma muda, você pode usar a prop `onLocaleChange` fornecida pelo hook `useLocale`. Paralelamente, você pode usar os hooks `useLocation` e `useNavigate` do `react-router-dom` para atualizar o caminho da URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Obter o caminho atual da URL. Exemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construir a URL com o idioma atualizado
    // Exemplo: /es/about com o idioma definido para espanhol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Atualizar o caminho da URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Mudar idioma para inglês
    </button>
  );
};
```

### Configurar TypeScript

Intlayer utiliza a extensão de módulo para obter os benefícios do TypeScript e tornar sua base de código mais robusta.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5
// tsconfig.json

{
  // sua configuração personalizada
  "include": [
    "src",
    "types", // <- Inclua os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite comitê-los em seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```
