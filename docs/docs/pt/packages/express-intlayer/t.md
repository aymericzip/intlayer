---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Documentação da Função t | express-intlayer
description: Veja como usar a função t para o pacote express-intlayer
keywords:
  - t
  - tradução
  - Intlayer
  - Internacionalização
  - Documentação
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Documentação: Função `t` no `express-intlayer`

A função `t` no pacote `express-intlayer` é a utilidade principal para fornecer respostas localizadas na sua aplicação Express. Ela simplifica a internacionalização (i18n) ao selecionar dinamicamente o conteúdo com base na língua preferida do usuário.

---

## Visão Geral

A função `t` é usada para definir e recuperar traduções para um conjunto específico de idiomas. Ela determina automaticamente a língua apropriada a ser retornada com base nas configurações da requisição do cliente, como o cabeçalho `Accept-Language`. Se a língua preferida não estiver disponível, ela recorre de forma elegante ao locale padrão especificado na sua configuração.

---

## Principais Características

- **Localização Dinâmica**: Seleciona automaticamente a tradução mais apropriada para o cliente.
- **Recurso de Retorno ao Locale Padrão**: Retorna a um locale padrão caso a língua preferida do cliente não esteja disponível, garantindo continuidade na experiência do usuário.
- **Leve e Rápido**: Projetado para aplicações de alto desempenho, garantindo sobrecarga mínima.
- **Suporte ao Modo Estrito**: Impõe aderência rigorosa aos locales declarados para comportamento confiável.

---

## Assinatura da Função

```typescript
t(translations: Record<string, string>): string;
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de locale (ex: `en`, `fr`, `es-MX`) e os valores são as strings traduzidas correspondentes.

### Retorno

- Uma string representando o conteúdo na língua preferida do cliente.

---

## Carregando o Manipulador de Requisição de Internacionalização

Para garantir que a funcionalidade de internacionalização fornecida pelo `express-intlayer` funcione corretamente, você **deve** carregar o middleware de internacionalização no início da sua aplicação Express. Isso habilita a função `t` e assegura o tratamento adequado da detecção de locale e tradução.

Coloque o middleware `app.use(intlayer())` **antes de quaisquer rotas** na sua aplicação para garantir que todas as rotas se beneficiem da internacionalização:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Carregar o manipulador de requisição de internacionalização
app.use(intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Carregar o manipulador de requisição de internacionalização
app.use(intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Carregar o manipulador de requisição de internacionalização
app.use(intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Por que isso é necessário

- **Detecção de Localidade**: O middleware `intlayer` processa as requisições recebidas para detectar a localidade preferida do usuário com base nos cabeçalhos, cookies ou outros métodos configurados.
- **Contexto de Tradução**: Configura o contexto necessário para que a função `t` opere corretamente, garantindo que as traduções sejam retornadas no idioma correto.
- **Prevenção de Erros**: Sem este middleware, usar a função `t` resultará em erros de tempo de execução porque as informações necessárias sobre a localidade não estarão disponíveis.

---

## Exemplos de Uso

### Exemplo Básico

Sirva conteúdo localizado em diferentes idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Requisições do Cliente:**

- Um cliente com `Accept-Language: fr` receberá `Bienvenue!`.
- Um cliente com `Accept-Language: es` receberá `¡Bienvenido!`.
- Um cliente com `Accept-Language: de` receberá `Welcome!` (local padrão).

### Tratamento de Erros

Forneça mensagens de erro em vários idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocorrió un error inesperado.",
    })
  );
});
```

---

### Usando Variantes de Localidade

Especifique traduções para variantes específicas de localidade:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Tópicos Avançados

### Mecanismo de Fallback

Se uma localidade preferida não estiver disponível, a função `t` fará fallback para a localidade padrão definida na configuração:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Por exemplo:

- Se `defaultLocale` for `Locales.CHINESE` e um cliente solicitar `Locales.DUTCH`, a tradução retornada será o valor padrão de `Locales.CHINESE`.
- Se `defaultLocale` não estiver definido, a função `t` usará como fallback o valor de `Locales.ENGLISH`.

---

### Aplicação do Modo Estrito

Configure a função `t` para impor a aderência estrita às localidades declaradas:

| Modo        | Comportamento                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `strict`    | Todas as localidades declaradas devem ter traduções fornecidas. Localidades ausentes gerarão erros. |
| `inclusive` | As localidades declaradas devem ter traduções. Localidades ausentes geram avisos, mas são aceitas.  |
| `loose`     | Qualquer localidade existente é aceita, mesmo que não declarada.                                    |

Exemplo de Configuração:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Sua configuração existente
  internationalization: {
    // ... Sua configuração existente de internacionalização
    strictMode: "strict", // Aplicar modo estrito
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Sua configuração existente
  internationalization: {
    // ... Sua configuração existente de internacionalização
    strictMode: "strict", // Aplicar modo estrito
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Sua configuração existente
  internationalization: {
    // ... Sua configuração existente de internacionalização
    strictMode: "strict", // Aplicar modo estrito
  },
};

module.exports = config;
```

---

### Integração com TypeScript

A função `t` é segura em termos de tipos quando usada com TypeScript. Defina um objeto de traduções com segurança de tipos:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Erros Comuns e Solução de Problemas

| Problema                   | Causa                                         | Solução                                                                     |
| -------------------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| Função `t` não funcionando | Middleware não carregado                      | Certifique-se de que `app.use(intlayer())` está adicionado antes das rotas. |
| Erro de traduções faltando | Modo estrito ativado sem todas as localidades | Forneça todas as traduções necessárias.                                     |

---

## Dicas para Uso Eficaz

1. **Centralize as Traduções**: Use um módulo centralizado ou arquivos JSON para gerenciar as traduções e melhorar a manutenção.
2. **Valide as Traduções**: Garanta que cada variante de idioma tenha uma tradução correspondente para evitar retornos desnecessários.
3. **Combine com i18n no Frontend**: Sincronize com a internacionalização do frontend para uma experiência de usuário fluida em todo o aplicativo.
4. **Avalie o Desempenho**: Teste os tempos de resposta do seu aplicativo ao adicionar traduções para garantir impacto mínimo.

---

## Conclusão

A função `t` é uma ferramenta poderosa para internacionalização no backend. Ao usá-la de forma eficaz, você pode criar uma aplicação mais inclusiva e amigável para um público global. Para uso avançado e opções detalhadas de configuração, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).
