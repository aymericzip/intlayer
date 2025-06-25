---
docName: package__next-intlayer__t
url: /doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentação da função t | next-intlayer
description: Veja como usar a função t para o pacote next-intlayer
keywords:
  - t
  - tradução
  - Intlayer
  - next-intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `t` no `next-intlayer`

A função `t` no pacote `next-intlayer` é uma ferramenta fundamental para internacionalização inline dentro da sua aplicação Next.js. Ela permite definir traduções diretamente nos seus componentes, facilitando a exibição de conteúdo localizado com base no idioma atual.

---

## Visão Geral

A função `t` é usada para fornecer traduções para diferentes idiomas diretamente nos seus componentes. Ao passar um objeto contendo traduções para cada idioma suportado, `t` retorna a tradução apropriada com base no contexto de idioma atual na sua aplicação Next.js.

---

## Principais Recursos

- **Traduções Inline**: Ideal para textos rápidos e inline que não exigem uma declaração de conteúdo separada.
- **Seleção Automática de Idioma**: Retorna automaticamente a tradução correspondente ao idioma atual.
- **Suporte ao TypeScript**: Oferece segurança de tipos e autocompletar quando usado com TypeScript.
- **Integração Fácil**: Funciona perfeitamente em componentes cliente e servidor no Next.js.

---

## Assinatura da Função

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de idioma (por exemplo, `en`, `fr`, `es`) e os valores são as strings traduzidas correspondentes.

### Retorna

- Uma string representando o conteúdo traduzido para o idioma atual.

---

## Exemplos de Uso

### Usando `t` em um Componente Cliente

Certifique-se de incluir a diretiva `'use client';` no topo do arquivo do componente ao usar `t` em um componente do lado do cliente.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un exemplo de componente cliente",
      pt: "Este é o conteúdo de um exemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el conteúdo d un exemplo de componente cliente",
      pt: "Este é o conteúdo de um exemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el conteúdo d un exemplo de componente cliente",
      pt: "Este é o conteúdo de um exemplo de componente cliente",
    })}
  </p>
);
```

### Usando `t` em um Componente Servidor

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el conteúdo de un exemplo de componente servidor",
      pt: "Este é o conteúdo de um exemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el conteúdo de un exemplo de componente servidor",
      pt: "Este é o conteúdo de um exemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el conteúdo de un exemplo de componente servidor",
      pt: "Este é o conteúdo de um exemplo de componente servidor",
    })}
  </p>
);
```

### Traduções Inline em Atributos

A função `t` é particularmente útil para traduções inline em atributos JSX.
Ao localizar atributos como `alt`, `title`, `href` ou `aria-label`, você pode usar `t` diretamente no atributo.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    pt: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    pt: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
      pt: "Uma paisagem bonita",
    })}
  />
</button>
```

---

## Tópicos Avançados

### Integração com TypeScript

A função `t` é segura para tipos quando usada com TypeScript, garantindo que todos os idiomas necessários sejam fornecidos.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  pt: "Bem-vindo",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  pt: "Bem-vindo",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  pt: "Bem-vindo",
};

const greeting = t(translations);
```

### Detecção e Contexto de Idioma

No `next-intlayer`, o idioma atual é gerenciado por meio de provedores de contexto: `IntlayerClientProvider` e `IntlayerServerProvider`. Certifique-se de que esses provedores envolvam seus componentes e que a propriedade `locale` seja passada corretamente.

#### Exemplo:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Seus componentes aqui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Seus componentes aqui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Seus componentes aqui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Erros Comuns e Soluções

### `t` Retorna Undefined ou Tradução Incorreta

- **Causa**: O idioma atual não está configurado corretamente ou a tradução para o idioma atual está ausente.
- **Solução**:
  - Verifique se o `IntlayerClientProvider` ou `IntlayerServerProvider` está configurado corretamente com o `locale` apropriado.
  - Certifique-se de que seu objeto de traduções inclua todos os idiomas necessários.

### Traduções Ausentes no TypeScript

- **Causa**: O objeto de traduções não satisfaz os idiomas necessários, resultando em erros no TypeScript.
- **Solução**: Use o tipo `IConfigLocales` para garantir a completude das suas traduções.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Ausência de 'es' causará um erro no TypeScript [!code error]
  pt: "Texto",
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Ausência de 'es' causará um erro no TypeScript [!code error]
  pt: "Texto",
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Ausência de 'es' causará um erro no TypeScript [!code error]
  pt: "Texto",
};

const text = t(translations);
```

---

## Dicas para Uso Eficaz

1. **Use `t` para Traduções Inline Simples**: Ideal para traduzir pequenos trechos de texto diretamente nos seus componentes.
2. **Prefira `useIntlayer` para Conteúdo Estruturado**: Para traduções mais complexas e reutilização de conteúdo, defina o conteúdo em arquivos de declaração e use `useIntlayer`.
3. **Provisão Consistente de Idioma**: Certifique-se de que seu idioma seja fornecido consistentemente em toda a aplicação por meio dos provedores apropriados.
4. **Aproveite o TypeScript**: Use tipos do TypeScript para capturar traduções ausentes e garantir segurança de tipos.

---

## Conclusão

A função `t` no `next-intlayer` é uma ferramenta poderosa e conveniente para gerenciar traduções inline em suas aplicações Next.js. Ao integrá-la de forma eficaz, você aprimora as capacidades de internacionalização do seu aplicativo, proporcionando uma melhor experiência para usuários em todo o mundo.

Para mais detalhes sobre o uso e recursos avançados, consulte a [documentação do next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md).

---

**Nota**: Lembre-se de configurar corretamente seus `IntlayerClientProvider` e `IntlayerServerProvider` para garantir que o idioma atual seja passado corretamente para seus componentes. Isso é crucial para que a função `t` retorne as traduções corretas.
