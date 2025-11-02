---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Como recuperar a localidade dos cookies / cabeçalhos?
description: Aprenda como recuperar a localidade dos cookies / cabeçalhos.
keywords:
  - cookie
  - cabeçalhos
  - intlayer
  - localidade
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Como recuperar a localidade dos cookies / cabeçalhos

## Usando Hooks (Recomendado)

Para a maioria dos casos de uso, é recomendado recuperar a localidade atual usando o hook `useLocale` porque ele é resolvido automaticamente. Isso funciona de forma semelhante ao composable `useLocale` no Vue.js.

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// or import { useLocale } from "vue-intlayer";

// Uso no lado do cliente
const { locale } = useLocale();
```

Para componentes no servidor, você pode importá-lo de:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

Também existe um hook `useLocaleCookie` que resolve apenas o valor do cookie.

## Configuração Manual do Cookie

Você pode declarar um nome personalizado para o cookie como

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // o padrão é 'intlayer-locale'
  },
};

export default config;
```

// recuperá-lo como

### Lado do cliente

```ts
// Usando o nome padrão do cookie
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Usando nome personalizado do cookie
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Lado do servidor (Next.js)

```ts
import { cookies } from "next/headers";

// Usando o nome padrão do cookie
const locale = cookies().get("intlayer-locale")?.value;

// Usando nome personalizado do cookie
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Se a localidade ainda não estiver definida

A localidade é definida como um cookie somente quando o usuário seleciona explicitamente a localidade. Por padrão, para novos visitantes, a localidade é interpretada a partir dos campos dos cabeçalhos.

Você pode detectar a localidade preferida do usuário a partir dos cabeçalhos da requisição. Aqui está um exemplo de como lidar com isso:

```ts
/**
 * Detecta a localidade a partir dos cabeçalhos da requisição
 *
 * O cabeçalho accept-language é o mais importante para a detecção da localidade.
 * Ele contém uma lista de códigos de idioma com valores de qualidade (q-values) que indicam
 * as línguas preferidas do usuário em ordem de preferência.
 *
 * Exemplo: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US é o idioma principal (q=1.0 é implícito)
 * - en é a segunda escolha (q=0.9)
 * - fr é a terceira escolha (q=0.8)
 * - es é a quarta escolha (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Exemplo de cabeçalhos negociadores que os navegadores normalmente enviam
 * Esses cabeçalhos ajudam a determinar o idioma preferido do usuário
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Exemplo de uso:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
