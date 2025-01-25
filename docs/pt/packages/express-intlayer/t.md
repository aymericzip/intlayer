# Documentação: `t` Função em `express-intlayer`

A função `t` no pacote `express-intlayer` é a utilidade principal para fornecer respostas localizadas em sua aplicação Express. Ela simplifica a internacionalização (i18n) ao selecionar dinamicamente o conteúdo com base na linguagem preferida do usuário.

---

## Visão Geral

A função `t` é usada para definir e recuperar traduções para um conjunto específico de idiomas. Ela determina automaticamente o idioma apropriado a ser retornado com base nas configurações da solicitação do cliente, como o cabeçalho `Accept-Language`. Se a linguagem preferida não estiver disponível, ela retorna graciosamente para o local padrão especificado em sua configuração.

---

## Principais Recursos

- **Localização Dinâmica**: Seleciona automaticamente a tradução mais apropriada para o cliente.
- **Retorno ao Local Padrão**: Retorna a um local padrão se a linguagem preferida do cliente não estiver disponível, garantindo continuidade na experiência do usuário.
- **Leve e Rápido**: Projetado para aplicações de alto desempenho, garantindo mínimo overhead.
- **Suporte a Modo Estrito**: Impõe adesão estrita aos locais declarados para comportamento confiável.

---

## Assinatura da Função

```typescript
t(translations: Record<string, string>): string;
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de local (por exemplo, `en`, `fr`, `es-MX`) e os valores são as strings traduzidas correspondentes.

### Retorna

- Uma string representando o conteúdo na linguagem preferida do cliente.

---

## Carregando o Manipulador de Solicitações de Internacionalização

Para garantir que a funcionalidade de internacionalização fornecida pelo `express-intlayer` funcione corretamente, você **deve** carregar o middleware de internacionalização no início de sua aplicação Express. Isso habilita a função `t` e garante o manuseio adequado da detecção de locais e tradução.

Coloque o middleware `app.use(intlayer())` **antes de quaisquer rotas** em sua aplicação para garantir que todas as rotas se beneficiem da internacionalização:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Carregar manipulador de solicitações de internacionalização
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

// Carregar manipulador de solicitações de internacionalização
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

// Carregar manipulador de solicitações de internacionalização
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

### Por Que Isso é Necessário

- **Detecção de Local**: O middleware `intlayer` processa solicitações recebidas para detectar o local preferido do usuário com base em cabeçalhos, cookies ou outros métodos configurados.
- **Contexto de Tradução**: Configura o contexto necessário para a função `t` operar corretamente, garantindo que as traduções sejam retornadas no idioma correto.
- **Prevenção de Erros**: Sem esse middleware, usar a função `t` resultará em erros em tempo de execução porque as informações necessárias sobre o local não estarão disponíveis.

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

**Solicitações do Cliente:**

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
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Usando Variantes de Locale

Especifique traduções para variantes específicas de local:

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

### Mecanismo de Retorno

Se um local preferido não estiver disponível, a função `t` retornará para o local padrão definido na configuração:

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

- Se `defaultLocale` for `Locales.CHINESE` e um cliente solicitar `Locales.DUTCH`, a tradução retornada será o valor de `Locales.CHINESE`.
- Se `defaultLocale` não estiver definido, a função `t` retornará o valor de `Locales.ENGLISH`.

---

### Aplicação do Modo Estrito

Configure a função `t` para impor adesão estrita aos locais declarados:

| Modo            | Comportamento                                                                             |
| --------------- | ----------------------------------------------------------------------------------------- |
| `strict`        | Todos os locais declarados devem ter traduções fornecidas. Locais ausentes gerarão erros. |
| `required_only` | Locais declarados devem ter traduções. Locais ausentes geram avisos, mas são aceitos.     |
| `loose`         | Qualquer local existente é aceito, mesmo que não declarado.                               |

Exemplo de Configuração:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Sua configuração existente
  internationalization: {
    // ... Sua configuração de internacionalização existente
    strictMode: "strict", // Impõe modo estrito
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Sua configuração existente
  internationalization: {
    // ... Sua configuração de internacionalização existente
    strictMode: "strict", // Impõe modo estrito
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Sua configuração existente
  internationalization: {
    // ... Sua configuração de internacionalização existente
    strictMode: "strict", // Impõe modo estrito
  },
};

module.exports = config;
```

---

### Integração com TypeScript

A função `t` é segura em tipos quando usada com TypeScript. Defina um objeto de traduções seguro em tipos:

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

### Erros Comuns e Soluções

| Problema                   | Causa                                    | Solução                                                                    |
| -------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| Função `t` não funciona    | Middleware não carregado                 | Certifique-se de que `app.use(intlayer())` foi adicionado antes das rotas. |
| Erro de traduções ausentes | Modo estrito ativado sem todos os locais | Forneça todas as traduções necessárias.                                    |

---

## Dicas para Uso Eficaz

1. **Centralize as Traduções**: Use um módulo centralizado ou arquivos JSON para gerenciar traduções e melhorar a manutenibilidade.
2. **Valide as Traduções**: Assegure que cada variante de linguagem tenha uma tradução correspondente para evitar retornos desnecessários.
3. **Combine com i18n do Frontend**: Sincronize com a internacionalização do frontend para uma experiência de usuário integrada em todo o aplicativo.
4. **Compare Desempenho**: Teste os tempos de resposta do seu aplicativo ao adicionar traduções para garantir impacto mínimo.

---

## Conclusão

A função `t` é uma ferramenta poderosa para internacionalização de backend. Ao usá-la de forma eficaz, você pode criar uma aplicação mais inclusiva e amigável para um público global. Para uso avançado e opções de configuração detalhadas, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).
