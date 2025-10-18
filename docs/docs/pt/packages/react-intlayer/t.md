---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função t | react-intlayer
description: Veja como usar a função t para o pacote react-intlayer
keywords:
  - t
  - tradução
  - Intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Documentação: Função `t` no `react-intlayer`

A função `t` no pacote `react-intlayer` é uma ferramenta fundamental para internacionalização inline dentro da sua aplicação React. Ela permite que você defina traduções diretamente dentro dos seus componentes, facilitando a exibição de conteúdo localizado com base na localidade atual.

---

## Visão Geral

A função `t` é usada para fornecer traduções para diferentes localidades diretamente nos seus componentes. Ao passar um objeto contendo traduções para cada localidade suportada, `t` retorna a tradução apropriada com base no contexto da localidade atual na sua aplicação React.

---

## Principais Características

- **Traduções Inline**: Ideal para textos rápidos e inline que não requerem uma declaração de conteúdo separada.
- **Seleção Automática de Localidade**: Retorna automaticamente a tradução correspondente à localidade atual.
- **Suporte ao TypeScript**: Fornece segurança de tipos e autocompletar quando usado com TypeScript.
- **Integração Fácil**: Funciona perfeitamente dentro de componentes React.

---

## Assinatura da Função

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de localidade (ex.: `en`, `fr`, `es`) e os valores são as strings traduzidas correspondentes.

### Retorna

- Uma string representando o conteúdo traduzido para a localidade atual.

---

## Exemplos de Uso

### Uso Básico de `t` em um Componente

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Traduções Inline em Atributos

A função `t` é particularmente útil para traduções inline em atributos JSX. Ao localizar atributos como `alt`, `title`, `href` ou `aria-label`, você pode usar `t` diretamente dentro do atributo.

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
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react.intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detecção de Localidade e Contexto

No `react-intlayer`, a localidade atual é gerenciada através do `IntlayerProvider`. Certifique-se de que este provider envolva seus componentes e que a prop `locale` seja passada corretamente.

#### Exemplo:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Seus componentes aqui */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Seus componentes aqui */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Seus componentes aqui */}
  </IntlayerProvider>
);
```

---

## Erros Comuns e Solução de Problemas

### `t` Retorna Undefined ou Tradução Incorreta

- **Causa**: O locale atual não está configurado corretamente, ou a tradução para o locale atual está ausente.
- **Solução**:
  - Verifique se o `IntlayerProvider` está configurado corretamente com o `locale` apropriado.
  - Garanta que seu objeto de traduções inclua todos os locales necessários.

### Traduções Ausentes no TypeScript

- **Causa**: O objeto de traduções não satisfaz os locales requeridos, causando erros no TypeScript.
- **Solução**: Use o tipo `IConfigLocales` para garantir a completude das suas traduções.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // A ausência de 'es' causará um erro no TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // A ausência de 'es' causará um erro no TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // A ausência de 'es' causará um erro no TypeScript
};

const text = t(translations);
```

---

## Dicas para Uso Eficaz

1. **Use `t` para Traduções Simples Inline**: Ideal para traduzir pequenos trechos de texto diretamente dentro dos seus componentes.
2. **Prefira `useIntlayer` para Conteúdo Estruturado**: Para traduções mais complexas e reutilização de conteúdo, defina o conteúdo em arquivos de declaração e use `useIntlayer`.
3. **Fornecimento Consistente de Locale**: Garanta que seu locale seja fornecido de forma consistente em toda a sua aplicação através do `IntlayerProvider`.
4. **Aproveite o TypeScript**: Use os tipos do TypeScript para detectar traduções ausentes e garantir a segurança de tipos.

---

## Conclusão

A função `t` no `react-intlayer` é uma ferramenta poderosa e conveniente para gerenciar traduções inline em suas aplicações React. Ao integrá-la de forma eficaz, você aprimora as capacidades de internacionalização do seu app, proporcionando uma melhor experiência para usuários ao redor do mundo.

Para um uso mais detalhado e recursos avançados, consulte a [documentação do react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

---

**Nota**: Lembre-se de configurar corretamente seu `IntlayerProvider` para garantir que o locale atual seja passado corretamente para seus componentes. Isso é crucial para que a função `t` retorne as traduções corretas.
