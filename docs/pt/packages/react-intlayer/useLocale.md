# Integração com React: Documentação do Hook `useLocale`

Esta seção fornece detalhes abrangentes sobre o hook `useLocale` da biblioteca `react-intlayer`, projetado para gerenciar configurações de localidade em aplicativos React.

## Importando `useLocale` no React

Para integrar o hook `useLocale` em seu aplicativo React, importe-o de seu pacote respectivo:

```javascript
import { useLocale } from "react-intlayer"; // Usado em componentes React para gerenciamento de localidade
```

## Visão Geral

O hook `useLocale` oferece uma maneira fácil de acessar e manipular as configurações de localidade dentro dos componentes React. Ele fornece acesso à localidade atual, à localidade padrão, todas as localidades disponíveis e funções para atualizar as configurações de localidade.

## Uso

Veja como você pode usar o hook `useLocale` dentro de um componente React:

```jsx
import React from "react";
import { useLocale } from "react-intlayer";

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

- **`locale`**: A localidade atual conforme configurada no contexto React.
- **`defaultLocale`**: A localidade principal definida na configuração.
- **`availableLocales`**: Uma lista de todas as localidades disponíveis conforme definidas na configuração.
- **`setLocale`**: Uma função para atualizar a localidade atual dentro do contexto da aplicação.

## Exemplo

Este exemplo mostra um componente que utiliza o hook `useLocale` para renderizar um seletor de localidade, permitindo que os usuários mudem dinamicamente a localidade da aplicação:

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
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
}

export default LocaleSelector;
```

## Conclusão

O hook `useLocale` da `react-intlayer` é uma ferramenta essencial para gerenciar localidades em seus aplicativos React, fornecendo a funcionalidade necessária para adaptar sua aplicação a diversas audiências internacionais de forma eficaz.
