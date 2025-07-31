---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do Hook useLocale | next-intlayer
description: Veja como usar o hook useLocale para o pacote next-intlayer
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
  - next-intlayer
  - useLocale
---

# Integração com Next.js: Documentação do Hook `useLocale` para `next-intlayer`

Esta seção oferece documentação detalhada sobre o hook `useLocale` adaptado para aplicações Next.js dentro da biblioteca `next-intlayer`. Ele é projetado para gerenciar mudanças de localidade e roteamento de forma eficiente.

## Importando `useLocale` no Next.js

Para utilizar o hook `useLocale` em sua aplicação Next.js, importe-o conforme mostrado abaixo:

```javascript
import { useLocale } from "next-intlayer"; // Usado para gerenciar localidades e roteamento no Next.js
```

## Uso

Veja como implementar o hook `useLocale` dentro de um componente Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

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
```

## Parâmetros e Valores de Retorno

Quando você invoca o hook `useLocale`, ele retorna um objeto contendo as seguintes propriedades:

- **`locale`**: O local atual definido no contexto do React.
- **`defaultLocale`**: O local principal definido na configuração.
- **`availableLocales`**: Uma lista de todos os locais disponíveis conforme definido na configuração.
- **`setLocale`**: Uma função para alterar o local da aplicação e atualizar a URL de acordo. Ela cuida das regras de prefixo, se deve ou não adicionar o local ao caminho com base na configuração. Utiliza `useRouter` do `next/navigation` para funções de navegação como `push` e `refresh`.
- **`pathWithoutLocale`**: Uma propriedade computada que retorna o caminho sem o local. É útil para comparar URLs. Por exemplo, se o local atual for `fr`, e a URL for `fr/my_path`, o caminho sem local é `/my_path`. Utiliza `usePathname` do `next/navigation` para obter o caminho atual.

## Conclusão

O hook `useLocale` do `next-intlayer` é uma ferramenta crucial para gerenciar locais em aplicações Next.js. Ele oferece uma abordagem integrada para adaptar sua aplicação a múltiplos locais, lidando de forma fluida com o armazenamento do local, gerenciamento de estado e modificações na URL.

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
