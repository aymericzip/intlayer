---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: Começando com Intlayer no TanStack Start (React)
description: Adicione i18n ao seu app TanStack Start usando Intlayer-dicionários a nível de componente, URLs localizadas e metadados otimizados para SEO.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# Começando a Internacionalizar (i18n) com Intlayer e TanStack Start (React)

## O que é Intlayer?

**Intlayer** é um kit de ferramentas i18n open-source para apps React. Ele oferece:

- **Dicionários locais por componente** com segurança em TypeScript.
- **Metadados e rotas dinâmicas** (prontas para SEO).
- **Troca de localidade em tempo de execução** (e auxiliares para detectar/persistir localidades).
- **Plugin Vite** para transformações em tempo de build + experiência de desenvolvimento (DX).

Este guia mostra como integrar o Intlayer em um projeto **TanStack Start** (que usa Vite por baixo dos panos e TanStack Router para roteamento/SSR).

---

## Passo 1: Instalar Dependências

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: núcleo (configuração, dicionários, CLI/transformações).
- **react-intlayer**: `<IntlayerProvider>` + hooks para React.
- **vite-intlayer**: plugin Vite, além de middleware opcional para detecção/redirecionamento de localidade (funciona em dev e SSR/preview; mover para `dependencies` para SSR em produção).

---

## Passo 2: Configurar o Intlayer

Crie o arquivo `intlayer.config.ts` na raiz do seu projeto:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // Você também pode ajustar: contentDir, contentFileExtensions, opções de middleware, etc.
};

export default config;
```

As variantes CommonJS/ESM são idênticas ao seu documento original caso prefira `cjs`/`mjs`.

> Referência completa da configuração: veja a documentação de configuração do Intlayer.

---

## Passo 3: Adicionar o Plugin Vite (e middleware opcional)

**TanStack Start usa Vite**, então adicione o(s) plugin(s) do Intlayer no seu `vite.config.ts`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // Opcional, mas recomendado para detecção de localidade, cookies e redirecionamentos:
    intLayerMiddlewarePlugin(),
  ],
});
```

> Se você fizer deploy SSR, mova `vite-intlayer` para `dependencies` para que o middleware funcione em produção.

---

## Passo 4: Declare Seu Conteúdo

Coloque seus dicionários em qualquer lugar dentro de `./src` (padrão `contentDir`). Exemplo:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      pt: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      pt: "Logo React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),
    title: t({
      pt: "TanStack Start + React",
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({
      pt: "a contagem é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t<ReactNode>({
      pt: (
        <>
          Edite <code>src/routes/index.tsx</code> e salve para testar HMR
        </>
      ),
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      pt: "Clique nos logos para saber mais",
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

As variantes JSON/ESM/CJS funcionam da mesma forma que no seu documento original.

> Conteúdo TSX? Não esqueça de `import React from "react"` se sua configuração precisar disso.

---

## Passo 5: Envolver TanStack Start com Intlayer

Com TanStack Start, sua **rota raiz** é o lugar certo para configurar os providers.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // Exemplo de uso de um dicionário no nível superior:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/about">Sobre</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

Então use seu conteúdo nas páginas:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> Atributos de string (`alt`, `title`, `aria-label`, …) precisam de `.value`:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (Opcional) Passo 6: Troca de Idioma (Cliente)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>Inglês</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Francês</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Espanhol</button>
    </div>
  );
}
```

---

## (Opcional) Passo 7: Roteamento Localizado (URLs amigáveis para SEO)

Você tem **dois bons padrões** com TanStack Start. Escolha um.

Crie uma pasta de segmento dinâmico `src/routes/$locale/` para que suas URLs sejam `/:locale/...`. No layout `$locale`, valide o `params.locale`, defina `<IntlayerProvider locale=...>`, e renderize um `<Outlet />`. Essa abordagem é direta, mas você montará o restante das suas rotas abaixo de `$locale`, e precisará de uma árvore extra sem prefixo se você _não_ quiser o prefixo da localidade padrão.

---

## (Opcional) Passo 8: Atualizar a URL ao trocar de idioma

Com o Padrão A (basepath), trocar de idioma significa **navegar para um basepath diferente**:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // preserva o histórico
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Opcional) Passo 9: `<html lang>` e `dir` (Documento TanStack Start)

TanStack Start expõe um **Document** (estrutura raiz HTML) que você pode personalizar. Defina `lang` e `dir` para acessibilidade/SEO:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* Se você calcular o locale no servidor, passe-o para o Document; caso contrário, o cliente corrigirá após a hidratação */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

Para correção no lado do cliente, você também pode manter seu pequeno hook:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## (Opcional) Passo 10: Componente Link localizado

O TanStack Router fornece um `<Link/>`, mas se você precisar de uma `<a>` simples que prefixe automaticamente URLs internas:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> Se você usar o Padrão A (basepath), o `<Link to="/about" />` do TanStack já resolve para `/fr/about` via `basepath`, então um link personalizado é opcional.

---

## TypeScript

Inclua os tipos gerados pelo Intlayer:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Ignore os artefatos gerados pelo Intlayer:

```gitignore
.intlayer
```

---

## Extensão VS Code

- **Extensão Intlayer para VS Code** → autocompletar, erros, pré-visualizações inline, ações rápidas.
  Marketplace: `intlayer.intlayer-vs-code-extension`

---

## Ir Além

- Editor Visual
- Modo CMS
- Detecção de localidade na edge / adaptadores

---

## Histórico da Documentação

| Versão | Data       | Alterações                             |
| ------ | ---------- | -------------------------------------- |
| 1.0.0  | 2025-08-11 | Adaptação do TanStack Start adicionada |
