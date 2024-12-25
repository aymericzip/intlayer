# Documentação: Função `t` em `next-intlayer`

A função `t` no pacote `next-intlayer` é uma ferramenta fundamental para internacionalização inline em sua aplicação Next.js. Ela permite que você defina traduções diretamente dentro de seus componentes, tornando simples a exibição de conteúdo localizado com base na localidade atual.

---

## Visão Geral

A função `t` é usada para fornecer traduções para diferentes localidades diretamente em seus componentes. Ao passar um objeto contendo traduções para cada localidade suportada, `t` retorna a tradução apropriada com base no contexto da localidade atual em sua aplicação Next.js.

---

## Principais Recursos

- **Traduções Inline**: Ideal para texto rápido e inline que não requer uma declaração de conteúdo separada.
- **Seleção Automática de Localidade**: Retorna automaticamente a tradução correspondente à localidade atual.
- **Suporte a TypeScript**: Fornece segurança de tipo e autocompletação quando usado com TypeScript.
- **Integração Fácil**: Funciona perfeitamente tanto em componentes de cliente quanto de servidor no Next.js.

---

## Assinatura da Função

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de localidade (e.g., `en`, `fr`, `es`) e os valores são as strings traduzidas correspondentes.

### Retornos

- Uma string representando o conteúdo traduzido para a localidade atual.

---

## Exemplos de Uso

### Usando `t` em um Componente de Cliente

Certifique-se de incluir a diretiva `'use client';` no topo do seu arquivo de componente ao usar `t` em um componente do lado do cliente.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "Este é o conteúdo de um exemplo de componente cliente",
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
      en: "Este é o conteúdo de um exemplo de componente cliente",
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
      en: "Este é o conteúdo de um exemplo de componente cliente",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un exemplo de componente cliente",
    })}
  </p>
);
```

### Usando `t` em um Componente de Servidor

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "Este é o conteúdo de um exemplo de componente servidor",
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
      en: "Este é o conteúdo de um exemplo de componente servidor",
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
      en: "Este é o conteúdo de um exemplo de componente servidor",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Traduções Inline em Atributos

A função `t` é particularmente útil para traduções inline em atributos JSX. Quando localizar atributos como `alt`, `title`, `href` ou `aria-label`, você pode usar `t` diretamente dentro do atributo.

```jsx
<button
  aria-label={t({
    en: "Enviar",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Enviar",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "Uma bela paisagem",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Tópicos Avançados

### Integração com TypeScript

A função `t` é segura em termos de tipo quando usada com TypeScript, garantindo que todas as localidades necessárias sejam fornecidas.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Bem-vindo",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Bem-vindo",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Bem-vindo",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detecção de Localidade e Contexto

No `next-intlayer`, a localidade atual é gerenciada através de provedores de contexto: `IntlayerClientProvider` e `IntlayerServerProvider`. Certifique-se de que esses provedores envolvem seus componentes e que a propriedade `locale` é passada corretamente.

#### Exemplo:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

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

### `t` Retorna Indefinido ou Tradução Incorreta

- **Causa**: A localidade atual não está configurada corretamente ou a tradução para a localidade atual está faltando.
- **Solução**:
  - Verifique se o `IntlayerClientProvider` ou `IntlayerServerProvider` está configurado corretamente com o `locale` apropriado.
  - Certifique-se de que seu objeto de traduções inclua todas as localidades necessárias.

### Traduções Faltando em TypeScript

- **Causa**: O objeto de traduções não satisfaz as localidades requeridas, levando a erros de TypeScript.
- **Solução**: Use o tipo `IConfigLocales` para garantir a completude de suas traduções.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Texto",
  fr: "Texte",
  // es: 'Texto', // Faltando 'es' causará um erro de TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Texto",
  fr: "Texte",
  // es: 'Texto', // Faltando 'es' causará um erro de TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Texto",
  fr: "Texte",
  // es: 'Texto', // Faltando 'es' causará um erro de TypeScript [!code error]
};

const text = t(translations);
```

---

## Dicas para Uso Eficaz

1. **Use `t` para Traduções Inline Simples**: Ideal para traduzir pequenos pedaços de texto diretamente dentro de seus componentes.
2. **Prefira `useIntlayer` para Conteúdo Estruturado**: Para traduções mais complexas e reutilização de conteúdo, defina o conteúdo em arquivos de declaração e use `useIntlayer`.
3. **Provisão Consistente de Localidade**: Certifique-se de que sua localidade seja fornecida de forma consistente em toda a sua aplicação através dos provedores apropriados.
4. **Aproveite o TypeScript**: Use tipos TypeScript para identificar traduções faltantes e garantir segurança de tipo.

---

## Conclusão

A função `t` em `next-intlayer` é uma ferramenta poderosa e conveniente para gerenciar traduções inline em suas aplicações Next.js. Ao integrá-la efetivamente, você aprimora as capacidades de internacionalização de seu aplicativo, proporcionando uma melhor experiência para usuários em todo o mundo.

Para um uso mais detalhado e recursos avançados, consulte a [documentação do next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

---

**Nota**: Lembre-se de configurar seu `IntlayerClientProvider` e `IntlayerServerProvider` corretamente para garantir que a localidade atual seja passada corretamente para seus componentes. Isso é crucial para que a função `t` retorne as traduções corretas.
