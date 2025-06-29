---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da função getHTMLTextDir | intlayer
description: Veja como usar a função getHTMLTextDir para o pacote intlayer
keywords:
  - getHTMLTextDir
  - tradução
  - Intlayer
  - intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `getHTMLTextDir` em `intlayer`

## Descrição

A função `getHTMLTextDir` determina a direção do texto (`ltr`, `rtl` ou `auto`) com base no locale fornecido. Ela é projetada para ajudar os desenvolvedores a definir o atributo `dir` no HTML para uma renderização de texto adequada.

## Parâmetros

- `locale?: Locales`

  - **Descrição**: A string do locale (por exemplo, `Locales.ENGLISH`, `Locales.ARABIC`) usada para determinar a direção do texto.
  - **Tipo**: `Locales` (opcional)

## Retornos

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descrição**: A direção do texto correspondente ao locale:
  - `'ltr'` para idiomas da esquerda para a direita.
  - `'rtl'` para idiomas da direita para a esquerda.
  - `'auto'` se o locale não for reconhecido.

## Exemplo de Uso

### Determinando a Direção do Texto

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Saída: "ltr"
getHTMLTextDir(Locales.FRENCH); // Saída: "ltr"
getHTMLTextDir(Locales.ARABIC); // Saída: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Saída: "ltr"
getHTMLTextDir(Locales.FRENCH); // Saída: "ltr"
getHTMLTextDir(Locales.ARABIC); // Saída: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Saída: "ltr"
getHTMLTextDir(Locales.FRENCH); // Saída: "ltr"
getHTMLTextDir(Locales.ARABIC); // Saída: "rtl"
```

## Casos de Borda

- **Nenhum Locale Fornecido:**

  - A função retorna `'auto'` quando `locale` é `undefined`.

- **Locale Não Reconhecido:**
  - Para locales não reconhecidos, a função retorna `'auto'`.

## Uso em Componentes:

A função `getHTMLTextDir` pode ser usada para definir dinamicamente o atributo `dir` em um documento HTML para uma renderização de texto adequada com base no locale.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

No exemplo acima, o atributo `dir` é definido dinamicamente com base no locale.
