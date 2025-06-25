---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentação do hook useLocale | next-intlayer
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
---

# Integração Next.js: Documentação do Hook `useLocale` para `next-intlayer`

Esta seção oferece documentação detalhada sobre o hook `useLocale` adaptado para aplicações Next.js dentro da biblioteca `next-intlayer`. Ele é projetado para lidar com mudanças de localidade e roteamento de forma eficiente.

## Importando `useLocale` no Next.js

Para utilizar o hook `useLocale` na sua aplicação Next.js, importe-o conforme mostrado abaixo:

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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

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
```

## Parâmetros e Valores Retornados

Quando você invoca o hook `useLocale`, ele retorna um objeto contendo as seguintes propriedades:

- **`locale`**: A localidade atual definida no contexto do React.
- **`defaultLocale`**: A localidade principal definida na configuração.
- **`availableLocales`**: Uma lista de todas as localidades disponíveis conforme definido na configuração.
- **`setLocale`**: Uma função para alterar a localidade da aplicação e atualizar a URL de forma correspondente. Ela cuida das regras de prefixo, seja para adicionar ou não a localidade ao caminho com base na configuração. Utiliza `useRouter` de `next/navigation` para funções de navegação como `push` e `refresh`.
- **`pathWithoutLocale`**: Uma propriedade computada que retorna o caminho sem a localidade. É útil para comparar URLs. Por exemplo, se a localidade atual for `fr`, e a URL `fr/my_path`, o caminho sem localidade é `/my_path`. Utiliza `usePathname` de `next/navigation` para obter o caminho atual.

## Conclusão

O hook `useLocale` do `next-intlayer` é uma ferramenta crucial para gerenciar localidades em aplicações Next.js. Ele oferece uma abordagem integrada para adaptar sua aplicação para múltiplas localidades, lidando com armazenamento de localidade, gerenciamento de estado e modificações de URL de forma perfeita.
