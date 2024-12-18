# Documentation: `getMultilingualUrls` Função em `intlayer`

## Descrição:

A função `getMultilingualUrls` gera um mapeamento de URLs multilíngues, prefixando a URL fornecida com cada localidade suportada. Ela pode lidar tanto com URLs absolutas quanto relativas, aplicando o prefixo de localidade apropriado com base na configuração fornecida ou nos padrões.

---

## Parâmetros:

- `url: string`

  - **Descrição**: A string original da URL a ser prefixada com localidades.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descrição**: Array opcional de localidades suportadas. Padrão para as localidades configuradas no projeto.
  - **Tipo**: `Locales[]`
  - **Padrão**: `localesDefault`

- `defaultLocale: Locales`

  - **Descrição**: A localidade padrão para a aplicação. Padrão para a localidade padrão configurada no projeto.
  - **Tipo**: `Locales`
  - **Padrão**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descrição**: Se deve prefixar a localidade padrão. Padrão para o valor configurado no projeto.
  - **Tipo**: `boolean`
  - **Padrão**: `prefixDefaultDefault`

### Retorna:

- **Tipo**: `IConfigLocales<string>`
- **Descrição**: Um objeto mapeando cada localidade para sua correspondente URL multilíngue.

---

## Exemplo de Uso:

### URLs Relativas:

```typescript
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Saída: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URLs Absolutas:

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Saída: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Casos Limite:

- **Sem Segmento de Localidade:**

  - A função remove qualquer segmento de localidade existente da URL antes de gerar os mapeamentos multilíngues.

- **Localidade Padrão:**

  - Quando `prefixDefault` é `false`, a função não prefixa a URL para a localidade padrão.

- **Localidades Não Suportadas:**
  - Apenas as localidades fornecidas no array `locales` são consideradas para gerar as URLs.

---

## Uso em Aplicações:

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é crítico para garantir que a língua correta seja exibida. Abaixo está um exemplo de como `getMultilingualUrls` pode ser usado em uma configuração de aplicação:

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// Configuração para localidades suportadas e localidade padrão
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

A configuração acima garante que a aplicação reconheça `ENGLISH`, `FRENCH` e `SPANISH` como línguas suportadas e use `ENGLISH` como a língua de fallback.

Usando esta configuração, a função `getMultilingualUrls` pode gerar dinamicamente mapeamentos de URL multilíngues com base nas localidades suportadas pela aplicação:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Saída:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Saída:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Integrando `getMultilingualUrls`, os desenvolvedores podem manter estruturas de URL consistentes em vários idiomas, melhorando tanto a experiência do usuário quanto o SEO.
