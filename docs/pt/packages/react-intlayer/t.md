# Documentation: `t` Função em `react-intlayer`

A função `t` no pacote `react-intlayer` é uma ferramenta fundamental para internacionalização inline dentro da sua aplicação React. Ela permite que você defina traduções diretamente dentro dos seus componentes, tornando simples exibir conteúdo localizado com base na localidade atual.

---

## Visão Geral

A função `t` é usada para fornecer traduções para diferentes localidades diretamente em seus componentes. Ao passar um objeto contendo traduções para cada localidade suportada, `t` retorna a tradução apropriada com base no contexto da localidade atual em sua aplicação React.

---

## Principais Características

- **Traduções Inline**: Ideal para textos rápidos e inline que não requerem uma declaração de conteúdo separada.
- **Seleção Automática de Localidade**: Retorna automaticamente a tradução correspondente à localidade atual.
- **Suporte a TypeScript**: Fornece segurança de tipo e autocompletar quando usado com TypeScript.
- **Fácil Integração**: Funciona perfeitamente dentro de componentes React.

---

## Assinatura da Função

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de localidade (por exemplo, `en`, `fr`, `es`) e os valores são as strings traduzidas correspondentes.

### Retornos

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
          es: "Este es un exemplo de componente",
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

/** @type {import('react-intlayer').IConfigLocales<string>} */
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

### Detecção de Locale e Contexto

No `react-intlayer`, a localidade atual é gerida através do `IntlayerProvider`. Certifique-se de que este provedor envolva seus componentes e que a prop `locale` seja passada corretamente.

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

- **Causa**: A localidade atual não está corretamente definida, ou a tradução para a localidade atual está faltando.
- **Solução**:
  - Verifique se o `IntlayerProvider` está configurado corretamente com a `locale` apropriada.
  - Certifique-se de que seu objeto de traduções inclua todas as localidades necessárias.

### Traduções Faltantes em TypeScript

- **Causa**: O objeto de traduções não atende às localidades requeridas, levando a erros de TypeScript.
- **Solução**: Use o tipo `IConfigLocales` para garantir a completude das suas traduções.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Faltando 'es' causará um erro de TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Faltando 'es' causará um erro de TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Faltando 'es' causará um erro de TypeScript
};

const text = t(translations);
```

---

## Dicas para Uso Eficaz

1. **Use `t` para Traduções Inline Simples**: Ideal para traduzir pequenas partes de texto diretamente dentro de seus componentes.
2. **Prefira `useIntlayer` para Conteúdo Estruturado**: Para traduções mais complexas e reutilização de conteúdo, defina conteúdo em arquivos de declaração e use `useIntlayer`.
3. **Provisão de Locale Consistente**: Certifique-se de que sua localidade seja consistentemente fornecida em toda a sua aplicação através do `IntlayerProvider`.
4. **Aproveite o TypeScript**: Use tipos do TypeScript para capturar traduções faltantes e garantir segurança de tipo.

---

## Conclusão

A função `t` em `react-intlayer` é uma ferramenta poderosa e conveniente para gerenciar traduções inline em suas aplicações React. Ao integrá-la de forma eficaz, você melhora as capacidades de internacionalização do seu aplicativo, proporcionando uma melhor experiência para usuários em todo o mundo.

Para um uso mais detalhado e recursos avançados, consulte a [documentação do react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

---

**Nota**: Lembre-se de configurar corretamente seu `IntlayerProvider` para garantir que a localidade atual seja passada corretamente para seus componentes. Isso é crucial para que a função `t` retorne as traduções corretas.
