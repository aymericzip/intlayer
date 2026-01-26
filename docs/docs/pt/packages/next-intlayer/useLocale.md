---
createdAt: 2025-08-23
updatedAt: 2026-01-26
title: Documentação do Hook useLocale | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: Padrão `onLocaleChange` para `replace`
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
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

## Parâmetros

O hook `useLocale` aceita os seguintes parâmetros:

- **`onLocaleChange`**: Uma string que determina como a URL deve ser atualizada quando o local muda. Pode ser `"replace"`, `"push"` ou `"none"`.

  > Vamos dar um exemplo:
  >
  > 1. Você está em `/fr/home`
  > 2. Você navega para `/fr/about`
  > 3. Você altera o local para `/es/about`
  > 4. Você clica no botão "voltar" do navegador
  >
  > O comportamento será diferente com base no valor de `onLocaleChange`:
  >
  > - `"replace"` (padrão): Substitui a URL atual pela nova URL localizada e define o cookie.
  >   -> O botão "voltar" irá para `/es/home`
  > - `"push"`: Adiciona a nova URL localizada ao histórico do navegador e define o cookie.
  >   -> O botão "voltar" irá para `/fr/about`
  > - `"none"`: Apenas atualiza o local no contexto do cliente e define o cookie, sem alterar a URL.
  >   -> O botão "voltar" irá para `/fr/home`
  > - `(locale) => void`: Define o cookie e aciona uma função personalizada que será chamada quando o local mudar.
  >
  >   A opção `undefined` é o comportamento padrão, pois recomendamos o uso do componente `Link` para navegar para o novo local.
  >   Exemplo:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     Sobre
  >   </Link>
  >   ```

## Valores de Retorno

- **`locale`**: O local atual definido no contexto do React.
- **`defaultLocale`**: O local principal definido na configuração.
- **`availableLocales`**: Uma lista de todos os locais disponíveis conforme definido na configuração.
- **`setLocale`**: Uma função para alterar o local da aplicação e atualizar a URL de acordo. Ela cuida das regras de prefixo, se deve ou não adicionar o local ao caminho com base na configuração. Utiliza `useRouter` do `next/navigation` para funções de navegação como `push` e `refresh`.
- **`pathWithoutLocale`**: Uma propriedade computada que retorna o caminho sem o local. É útil para comparar URLs. Por exemplo, se o local atual for `fr`, e a URL for `fr/my_path`, o caminho sem local é `/my_path`. Utiliza `usePathname` do `next/navigation` para obter o caminho atual.

## Conclusão

O hook `useLocale` do `next-intlayer` é uma ferramenta crucial para gerenciar locais em aplicações Next.js. Ele oferece uma abordagem integrada para adaptar sua aplicação a múltiplos locais, lidando de forma fluida com o armazenamento do local, gerenciamento de estado e modificações na URL.
