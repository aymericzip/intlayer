---
docName: package__react-intlayer__t
url: https://intlayer.org/doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentação da função t | react-intlayer
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
---

# Documentação: Função `t` no `react-intlayer`

A função `t` no pacote `react-intlayer` é uma ferramenta fundamental para internacionalização inline dentro da sua aplicação React. Ela permite definir traduções diretamente nos seus componentes, tornando simples exibir conteúdo localizado com base no idioma atual.

---

## Visão Geral

A função `t` é usada para fornecer traduções para diferentes idiomas diretamente nos seus componentes. Ao passar um objeto contendo traduções para cada idioma suportado, `t` retorna a tradução apropriada com base no contexto de idioma atual na sua aplicação React.

---

## Principais Recursos

- **Traduções Inline**: Ideal para textos rápidos e inline que não requerem uma declaração de conteúdo separada.
- **Seleção Automática de Idioma**: Retorna automaticamente a tradução correspondente ao idioma atual.
- **Suporte ao TypeScript**: Oferece segurança de tipos e autocompletar quando usado com TypeScript.
- **Fácil Integração**: Funciona perfeitamente dentro de componentes React.

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
          pt: "Este é um exemplo de componente",
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
          pt: "Este é um exemplo de componente",
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
          es: "Este es un exemplo de componente",
          pt: "Este é um exemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Traduções Inline em Atributos

A função `t` é particularmente útil para traduções inline em atributos JSX. Ao localizar atributos como `alt`, `title`, `href` ou `aria-label`, você pode usar `t` diretamente no atributo.

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
      pt: "Uma bela paisagem",
    })}
  />
</button>
```

---

## Tópicos Avançados

### Integração com TypeScript

A função `t` é segura para tipos quando usada com TypeScript, garantindo que todos os idiomas necessários sejam fornecidos.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  pt: "Bem-vindo",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  pt: "Bem-vindo",
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
  pt: "Bem-vindo",
};

const greeting = t(translations);
```

### Detecção de Idioma e Contexto

No `react-intlayer`, o idioma atual é gerenciado através do `IntlayerProvider`. Certifique-se de que este provedor envolve seus componentes e que a propriedade `locale` seja passada corretamente.

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

## Erros Comuns e Soluções

### `t` Retorna Undefined ou Tradução Incorreta

- **Causa**: O idioma atual não está configurado corretamente ou a tradução para o idioma atual está ausente.
- **Solução**:
  - Verifique se o `IntlayerProvider` está configurado corretamente com o idioma apropriado.
  - Certifique-se de que seu objeto de traduções inclui todos os idiomas necessários.

### Traduções Ausentes no TypeScript

- **Causa**: O objeto de traduções não satisfaz os idiomas necessários, resultando em erros no TypeScript.
- **Solução**: Use o tipo `IConfigLocales` para garantir a completude das suas traduções.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Ausência de 'es' causará um erro no TypeScript
  pt: "Texto",
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Ausência de 'es' causará um erro no TypeScript
  pt: "Texto",
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Ausência de 'es' causará um erro no TypeScript
  pt: "Texto",
};

const text = t(translations);
```

---

## Dicas para Uso Eficaz

1. **Use `t` para Traduções Inline Simples**: Ideal para traduzir pequenos trechos de texto diretamente nos seus componentes.
2. **Prefira `useIntlayer` para Conteúdo Estruturado**: Para traduções mais complexas e reutilização de conteúdo, defina o conteúdo em arquivos de declaração e use `useIntlayer`.
3. **Consistência na Provisão de Idiomas**: Certifique-se de que seu idioma seja fornecido consistentemente em toda a aplicação através do `IntlayerProvider`.
4. **Aproveite o TypeScript**: Use tipos do TypeScript para capturar traduções ausentes e garantir segurança de tipos.

---

## Conclusão

A função `t` no `react-intlayer` é uma ferramenta poderosa e conveniente para gerenciar traduções inline em suas aplicações React. Ao integrá-la de forma eficaz, você melhora as capacidades de internacionalização do seu aplicativo, proporcionando uma melhor experiência para usuários em todo o mundo.

Para mais detalhes sobre o uso e recursos avançados, consulte a [documentação do react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md).

---

**Nota**: Lembre-se de configurar corretamente seu `IntlayerProvider` para garantir que o idioma atual seja passado corretamente para seus componentes. Isso é crucial para que a função `t` retorne as traduções corretas.
