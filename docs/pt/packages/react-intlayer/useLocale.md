# React Integration: `useLocale` Hook Documentation

Esta seção fornece detalhes abrangentes sobre o `useLocale` hook da biblioteca `react-intlayer`, projetado para gerenciar locais em aplicações React.

## Importando `useLocale` em React

Para integrar o `useLocale` hook em sua aplicação React, importe-o do seu respectivo pacote:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Usado em componentes React para gerenciamento de locais
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Usado em componentes React para gerenciamento de locais
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Usado em componentes React para gerenciamento de locais
```

## Visão Geral

O `useLocale` hook oferece uma maneira fácil de acessar e manipular as configurações de locais dentro dos componentes React. Ele fornece acesso ao local atual, ao local padrão, a todos os locais disponíveis e funções para atualizar as configurações de locais.

## Uso

Aqui está como você pode usar o `useLocale` hook dentro de um componente React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Local Atual: {locale}</h1>
      <p>Local Padrão: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Local Atual: {locale}</h1>
      <p>Local Padrão: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Local Atual: {locale}</h1>
      <p>Local Padrão: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## Parâmetros e Valores de Retorno

Quando você invoca o `useLocale` hook, ele retorna um objeto contendo as seguintes propriedades:

- **`locale`**: O local atual conforme definido no contexto React.
- **`defaultLocale`**: O local primário definido na configuração.
- **`availableLocales`**: Uma lista de todos os locais disponíveis conforme definido na configuração.
- **`setLocale`**: Uma função para atualizar o local atual dentro do contexto da aplicação.

## Exemplo

Este exemplo mostra um componente que usa o `useLocale` hook para renderizar um seletor de locais, permitindo que os usuários mudem dinamicamente o local da aplicação:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Conclusão

O `useLocale` hook da `react-intlayer` é uma ferramenta essencial para gerenciar locais em suas aplicações React, fornecendo a funcionalidade necessária para adaptar sua aplicação a diversas audiências internacionais de forma eficaz.
