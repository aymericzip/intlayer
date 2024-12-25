# Documentação: `getHTMLTextDir` Função em `intlayer`

## Descrição:

A função `getHTMLTextDir` determina a direção do texto (`ltr`, `rtl` ou `auto`) com base na localidade fornecida. Ela é projetada para ajudar desenvolvedores a definir o atributo `dir` em HTML para renderização adequada do texto.

## Parâmetros:

- `locale?: Locales`

  - **Descrição**: A string da localidade (por exemplo, `Locales.ENGLISH`, `Locales.ARABIC`) usada para determinar a direção do texto.
  - **Tipo**: `Locales` (opcional)

## Retornos:

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descrição**: A direção do texto correspondente à localidade:
  - `'ltr'` para idiomas da esquerda para a direita.
  - `'rtl'` para idiomas da direita para a esquerda.
  - `'auto'` se a localidade não for reconhecida.

## Exemplo de Uso:

### Determinando a Direção do Texto:

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

## Casos de Extremidade:

- **Nenhuma Localidade Fornecida:**

  - A função retorna `'auto'` quando `locale` é `undefined`.

- **Localidade Não Reconhecida:**
  - Para localidades não reconhecidas, a função padrão é `'auto'`.

## Uso em Componentes:

A função `getHTMLTextDir` pode ser usada para definir dinamicamente o atributo `dir` em um documento HTML para renderização adequada do texto com base na localidade.

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

No exemplo acima, o atributo `dir` é definido dinamicamente com base na localidade.
