---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função getConfiguration | intlayer
description: Veja como usar a função getConfiguration para o pacote intlayer
keywords:
  - getConfiguration
  - tradução
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getConfiguration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Documentação: Função `getConfiguration` em `intlayer`

## Descrição

A função `getConfiguration` recupera toda a configuração para a aplicação `intlayer` extraindo variáveis de ambiente. Esta função oferece a flexibilidade de usar a mesma configuração tanto no lado do cliente quanto no lado do servidor, garantindo consistência em toda a aplicação.

---

## Parâmetros

A função não recebe nenhum parâmetro. Em vez disso, ela utiliza variáveis de ambiente para a configuração.

### Retorno

- **Tipo**: `IntlayerConfig`
- **Descrição**: Um objeto contendo a configuração completa para o `intlayer`. A configuração inclui as seguintes seções:

  - `internationalization`: Configurações relacionadas a locais e modo estrito.
  - `middleware`: Configurações relacionadas ao gerenciamento de URL e cookies.
  - `content`: Configurações relacionadas a arquivos de conteúdo, diretórios e padrões.
  - `editor`: Configurações específicas do editor.

Consulte a [documentação de configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para mais detalhes.

---

## Exemplo de Uso

### Recuperando a Configuração Completa

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Saída:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Saída:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Saída:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Extraindo `availableLocales` e `defaultLocale`

A seção `internationalization` da configuração fornece definições relacionadas a locais, como `locales` (locais disponíveis) e `defaultLocale` (idioma padrão).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Exemplo de saída: ["en", "fr", "es"]
console.log(defaultLocale); // Exemplo de saída: "en"
console.log(cookieName); // Saída: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Exemplo de saída: ["en", "fr", "es"]
console.log(defaultLocale); // Exemplo de saída: "en"
console.log(cookieName); // Saída: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Exemplo de saída: ["en", "fr", "es"]
console.log(defaultLocale); // Exemplo de saída: "en"
console.log(cookieName); // Saída: "INTLAYER_LOCALE"
```

## Notas

- Certifique-se de que todas as variáveis de ambiente necessárias estejam corretamente definidas antes de chamar esta função. Variáveis ausentes causarão erros durante a inicialização.
- Esta função pode ser usada tanto no lado do cliente quanto no lado do servidor, tornando-a uma ferramenta versátil para gerenciar configurações de forma unificada.

## Uso em Aplicações

A função `getConfiguration` é uma utilidade fundamental para inicializar e gerenciar a configuração de uma aplicação `intlayer`. Ao fornecer acesso a configurações como locais, middleware e diretórios de conteúdo, ela garante consistência e escalabilidade em aplicações multilíngues e orientadas a conteúdo.
