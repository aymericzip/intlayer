# Next.js Integração: Documentação do Hook `useLocale` para `next-intlayer`

Esta seção oferece documentação detalhada sobre o hook `useLocale` adaptado para aplicações Next.js dentro da biblioteca `next-intlayer`. Ele é projetado para gerenciar mudanças de localidade e roteamento de forma eficiente.

## Importando `useLocale` no Next.js

Para utilizar o hook `useLocale` na sua aplicação Next.js, importe-o conforme mostrado abaixo:

```javascript
import { useLocale } from "next-intlayer"; // Usado para gerenciar localidades e roteamento no Next.js
```

## Uso

Aqui está como implementar o hook `useLocale` dentro de um componente Next.js:

```jsx
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
- **`defaultLocale`**: A localidade primária definida na configuração.
- **`availableLocales`**: Uma lista de todas as localidades disponíveis conforme definido na configuração.
- **`setLocale`**: Uma função para mudar a localidade da aplicação e atualizar a URL de acordo. Cuida das regras de prefixo, se deve ou não adicionar a localidade ao caminho com base na configuração. Utiliza `useRouter` de `next/navigation` para funções de navegação como `push` e `refresh`.
- **`pathWithoutLocale`**: Uma propriedade computada que retorna o caminho sem a localidade. É útil para comparar URLs. Por exemplo, se a localidade atual é `fr`, e a URL é `fr/my_path`, o caminho sem a localidade é `/my_path`. Utiliza `usePathname` de `next/navigation` para obter o caminho atual.

## Conclusão

O hook `useLocale` da `next-intlayer` é uma ferramenta crucial para gerenciar localidades em aplicações Next.js. Ele oferece uma abordagem integrada para adaptar sua aplicação a múltiplas localidades, gerenciando armazenamento de localidades, gerenciamento de estado e modificações de URL de forma tranquila.
