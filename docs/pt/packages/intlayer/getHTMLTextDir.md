# Documentation: `getHTMLTextDir` Função em `intlayer`

## Descrição:

A função `getHTMLTextDir` determina a direção do texto (`ltr`, `rtl` ou `auto`) com base no local fornecido. Ela foi projetada para ajudar os desenvolvedores a definir o atributo `dir` em HTML para renderização adequada do texto.

## Parâmetros:

- `locale?: Locales`

  - **Descrição**: A string de localidade (por exemplo, `Locales.ENGLISH`, `Locales.ARABIC`) usada para determinar a direção do texto.
  - **Tipo**: `Locales` (opcional)

## Retornos:

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descrição**: A direção do texto correspondente à localidade:
  - `'ltr'` para idiomas da esquerda para a direita.
  - `'rtl'` para idiomas da direita para a esquerda.
  - `'auto'` se a localidade não for reconhecida.

## Exemplo de Uso:

### Determinando a Direção do Texto:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Saída: "ltr"
getHTMLTextDir(Locales.FRENCH); // Saída: "ltr"
getHTMLTextDir(Locales.ARABIC); // Saída: "rtl"
```

## Casos Limite:

- **Nenhuma Localidade Fornecida:**

  - A função retorna `'auto'` quando `locale` é `undefined`.

- **Localidade Não Reconhecida:**
  - Para localidades não reconhecidas, a função padrão é `'auto'`.

## Uso em Componentes:

A função `getHTMLTextDir` pode ser usada para definir dinamicamente o atributo `dir` em um documento HTML para renderização adequada do texto com base na localidade.

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

No exemplo acima, o atributo `dir` é definido dinamicamente com base na localidade.
