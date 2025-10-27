---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Documentação da Função t | next-intlayer
description: Veja como usar a função t para o pacote next-intlayer
keywords:
  - t
  - tradução
  - Intlayer
  - next-intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Documentação: Função `t` no `next-intlayer`

A função `t` no pacote `next-intlayer` é uma ferramenta fundamental para internacionalização inline dentro da sua aplicação Next.js. Ela permite que você defina traduções diretamente dentro dos seus componentes, facilitando a exibição de conteúdo localizado com base na localidade atual.

---

## Visão Geral

A função `t` é usada para fornecer traduções para diferentes localidades diretamente em seus componentes. Ao passar um objeto contendo traduções para cada localidade suportada, `t` retorna a tradução apropriada com base no contexto da localidade atual na sua aplicação Next.js.

---

## Principais Características

- **Traduções Inline**: Ideal para textos rápidos e inline que não requerem uma declaração de conteúdo separada.
- **Seleção Automática de Localidade**: Retorna automaticamente a tradução correspondente à localidade atual.
- **Suporte ao TypeScript**: Fornece segurança de tipos e autocompletar quando usado com TypeScript.
- **Integração Fácil**: Funciona perfeitamente tanto em componentes cliente quanto servidor no Next.js.

---

## Assinatura da Função

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de localidade (ex.: `en`, `fr`, `es`) e os valores são as strings traduzidas correspondentes.

### Retorno

- Uma string representando o conteúdo traduzido para a localidade atual.

---

## Exemplos de Uso

### Usando `t` em um Componente Cliente

Certifique-se de incluir a diretiva `'use client';` no topo do arquivo do seu componente ao usar `t` em um componente do lado do cliente.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
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
      es: "Este es el contenido d un ejemplo de componente cliente",
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
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Usando `t` em um Componente do Servidor

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
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
      es: "Este es el contenido de un ejemplo de componente servidor",
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
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

###Traduções Inline em Atributos

A função `t` é particularmente útil para traduções inline em atributos JSX.
Ao localizar atributos como `alt`, `title`, `href` ou `aria-label`, você pode usar `t` diretamente dentro do atributo.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Tópicos Avançados

### Integração com TypeScript

A função `t` é segura em termos de tipos quando usada com TypeScript, garantindo que todas as localidades necessárias sejam fornecidas.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
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
};

const greeting = t(translations);
```

### Detecção de Localidade e Contexto

No `next-intlayer`, a localidade atual é gerida através de provedores de contexto: `IntlayerClientProvider` e `IntlayerServerProvider`. Certifique-se de que esses provedores envolvem seus componentes e que a propriedade `locale` é passada corretamente.

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

## Erros Comuns e Solução de Problemas

### `t` Retorna Indefinido ou Tradução Incorreta

- **Causa**: O locale atual não está configurado corretamente, ou a tradução para o locale atual está ausente.
- **Solução**:
  - Verifique se o `IntlayerClientProvider` ou `IntlayerServerProvider` está corretamente configurado com o `locale` apropriado.
  - Assegure-se de que seu objeto de traduções inclua todos os locales necessários.

### Traduções Ausentes no TypeScript

- **Causa**: O objeto de traduções não satisfaz os locales requeridos, causando erros no TypeScript.
- **Solução**: Use o tipo `IConfigLocales` para garantir a completude das suas traduções.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // A ausência de 'es' causará um erro no TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // A ausência de 'es' causará um erro no TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // A ausência de 'es' causará um erro no TypeScript [!code error]
};

const text = t(translations);
```

---

## Dicas para Uso Eficaz

1. **Use `t` para Traduções Simples Inline**: Ideal para traduzir pequenos trechos de texto diretamente dentro dos seus componentes.
2. **Prefira `useIntlayer` para Conteúdo Estruturado**: Para traduções mais complexas e reutilização de conteúdo, defina o conteúdo em arquivos de declaração e use `useIntlayer`.
3. **Fornecimento Consistente de Locale**: Garanta que seu locale seja fornecido de forma consistente em toda a sua aplicação através dos provedores apropriados.
4. **Aproveite o TypeScript**: Use os tipos do TypeScript para detectar traduções ausentes e garantir a segurança de tipos.

---

## Conclusão

A função `t` no `next-intlayer` é uma ferramenta poderosa e conveniente para gerenciar traduções inline em suas aplicações Next.js. Ao integrá-la de forma eficaz, você aprimora as capacidades de internacionalização do seu app, proporcionando uma melhor experiência para usuários ao redor do mundo.

Para um uso mais detalhado e recursos avançados, consulte a [documentação do next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

---

**Nota**: Lembre-se de configurar corretamente seu `IntlayerClientProvider` e `IntlayerServerProvider` para garantir que o locale atual seja corretamente passado para seus componentes. Isso é crucial para que a função `t` retorne as traduções corretas.
