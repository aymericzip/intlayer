---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do Hook useLocale | react-intlayer
description: Veja como usar o hook useLocale para o pacote react-intlayer
keywords:
  - useLocale
  - dicionário
  - chave
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
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Integração com React: Documentação do Hook `useLocale`

Esta seção fornece detalhes abrangentes sobre o hook `useLocale` da biblioteca `react-intlayer`, projetado para gerenciar configurações de localidade em aplicações React.

## Importando `useLocale` no React

Para integrar o hook `useLocale` na sua aplicação React, importe-o do respectivo pacote:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Usado em componentes React para gerenciamento de localidade
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Usado em componentes React para gerenciamento de localidade
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Usado em componentes React para gerenciamento de localidade
```

## Visão Geral

O hook `useLocale` oferece uma maneira fácil de acessar e manipular as configurações de localidade dentro dos componentes React. Ele fornece acesso à localidade atual, à localidade padrão, a todas as localidades disponíveis e funções para atualizar as configurações de localidade.

## Uso

Aqui está como você pode usar o hook `useLocale` dentro de um componente React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Localidade Atual: {locale}</h1>
      <p>Localidade Padrão: {defaultLocale}</p>
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
import { useLocale } from "react.intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Localidade Atual: {locale}</h1>
      <p>Localidade Padrão: {defaultLocale}</p>
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
      <h1>Localidade Atual: {locale}</h1>
      <p>Localidade Padrão: {defaultLocale}</p>
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

Quando você invoca o hook `useLocale`, ele retorna um objeto contendo as seguintes propriedades:

- **`locale`**: A localidade atual definida no contexto React.
- **`defaultLocale`**: A localidade principal definida na configuração.
- **`availableLocales`**: Uma lista de todas as localidades disponíveis conforme definido na configuração.
- **`setLocale`**: Uma função para atualizar a localidade atual dentro do contexto da aplicação.

## Exemplo

Este exemplo mostra um componente que utiliza o hook `useLocale` para renderizar um seletor de localidade, permitindo que os usuários alterem dinamicamente a localidade da aplicação:

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

O hook `useLocale` do `react-intlayer` é uma ferramenta essencial para gerenciar localidades em suas aplicações React, fornecendo a funcionalidade necessária para adaptar sua aplicação a diversos públicos internacionais de forma eficaz.
