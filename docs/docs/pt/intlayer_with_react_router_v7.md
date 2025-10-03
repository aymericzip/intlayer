---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: Começando a Internacionalizar (i18n) com Intlayer no React Router v7
description: Aprenda como adicionar internacionalização (i18n) à sua aplicação React Router v7 usando Intlayer. Siga este guia completo para tornar seu app multilíngue com roteamento sensível à localidade.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Roteamento por Localidade
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# Começando a Internacionalizar (i18n) com Intlayer e React Router v7

Este guia demonstra como integrar o **Intlayer** para uma internacionalização perfeita em projetos React Router v7 com roteamento sensível à localidade, suporte a TypeScript e práticas modernas de desenvolvimento.

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e open-source de internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte a TypeScript** com tipos gerados automaticamente, melhorando o autocompletar e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade.
- **Habilitar roteamento sensível à localidade** com o sistema de roteamento baseado em configuração do React Router v7.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação React Router v7

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

- **react-intlayer**
  O pacote que integra o Intlayer com a aplicação React. Ele fornece provedores de contexto e hooks para internacionalização em React.

- **vite-intlayer**
  Inclui o plugin do Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URL.

### Passo 2: Configuração do seu projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // Sempre prefixar o idioma padrão nas URLs
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configuração do Intlayer
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

module.exports = config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento via middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desabilitar logs do Intlayer no console, e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Configurar Rotas do React Router v7

Configure sua configuração de rotas com rotas que reconhecem o idioma:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // Página raiz - redireciona para o idioma
    route("/:lang", "routes/[lang]/page.tsx"), // Página inicial localizada
    route("/:lang?/about", "routes/[lang]/about/page.tsx"), // Página sobre localizada
  ]),
] satisfies RouteConfig;
```

### Passo 4: Integrar Intlayer na sua Configuração Vite

Adicione o plugin intlayer na sua configuração:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> O plugin Vite `intlayer()` é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 5: Criar Componentes de Layout

Configure seu layout raiz e layouts específicos para cada localidade:

#### Layout Raiz

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Passo 6: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 e Intlayer para construir aplicações multilíngues com facilidade.",
    }),
    aboutLink: t({
      en: "Saiba Mais Sobre Nós",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "Início",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./app`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

### Passo 7: Crie Componentes Sensíveis ao Locale

Crie um componente `LocalizedLink` para navegação sensível ao idioma:

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:");

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### Passo 8: Utilize o Intlayer nas Suas Páginas

Acesse seus dicionários de conteúdo em toda a sua aplicação:

#### Página de Redirecionamento Raiz

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### Página Inicial Localizada

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md).

### Passo 9: Crie um Componente de Seletor de Idioma

Crie um componente para permitir que os usuários mudem de idioma:

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">Escolha o idioma: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> Para saber mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md).

### Passo 10: Adicionar Gerenciamento de Atributos HTML (Opcional)

Crie um hook para gerenciar os atributos lang e dir do HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Então use-o no seu componente raiz:

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // importa o hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // chama o hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Passo 11: Compile e Execute Sua Aplicação

Construa os dicionários de conteúdo e execute sua aplicação:

```bash packageManager="npm"
# Construir dicionários do Intlayer
npm run intlayer:build

# Iniciar servidor de desenvolvimento
npm run dev
```

```bash packageManager="pnpm"
# Construir dicionários do Intlayer
pnpm intlayer:build

# Iniciar servidor de desenvolvimento
pnpm dev
```

```bash packageManager="yarn"
# Construir dicionários do Intlayer
yarn intlayer:build

# Iniciar servidor de desenvolvimento
yarn dev
```

### Passo 12: Configurar TypeScript (Opcional)

O Intlayer utiliza a ampliação de módulos para aproveitar os benefícios do TypeScript e tornar sua base de código mais robusta.

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... suas configurações existentes do TypeScript
  },
  include: [
    // ... seus includes existentes
    ".intlayer/**/*.ts", // Incluir os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam commitados no seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

---

## Implantação em Produção

Ao implantar sua aplicação:

1. **Compile sua aplicação:**

   ```bash
   npm run build
   ```

2. **Compile os dicionários do Intlayer:**

   ```bash
   npm run intlayer:build
   ```

3. **Mova `vite-intlayer` para as dependências** se estiver usando middleware em produção:
   ```bash
   npm install vite-intlayer --save
   ```

Sua aplicação agora suportará:

- **Estrutura de URL**: `/en`, `/en/about`, `/tr`, `/tr/about`
- **Detecção automática de localidade** baseada nas preferências do navegador
- **Roteamento sensível à localidade** com React Router v7
- **Suporte a TypeScript** com tipos gerados automaticamente
- **Renderização do lado servidor** com tratamento adequado da localidade

## Extensão VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial Intlayer para VS Code**.

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Avançar

Para avançar, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

---

## Referências da Documentação

- [Documentação Intlayer](https://intlayer.org)
- [Documentação React Router v7](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md)
- [Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md)
- [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

Este guia abrangente fornece tudo o que você precisa para integrar o Intlayer com o React Router v7 para uma aplicação totalmente internacionalizada com roteamento sensível à localidade e suporte a TypeScript.

## Histórico da Documentação

| Versão | Data       | Alterações                      |
| ------ | ---------- | ------------------------------- |
| 5.8.2  | 2025-09-04 | Adicionado para React Router v7 |
