---
docName: package__express-intlayer__t
url: https://intlayer.org/doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: Documentação da função t | express-intlayer
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
---

# Documentação: Função `t` no `express-intlayer`

A função `t` no pacote `express-intlayer` é a principal utilidade para fornecer respostas localizadas em sua aplicação Express. Ela simplifica a internacionalização (i18n) selecionando dinamicamente o conteúdo com base no idioma preferido do usuário.

---

## Visão Geral

A função `t` é usada para definir e recuperar traduções para um conjunto de idiomas. Ela determina automaticamente o idioma apropriado para retornar com base nas configurações da solicitação do cliente, como o cabeçalho `Accept-Language`. Se o idioma preferido não estiver disponível, ela recai graciosamente para o local padrão especificado na sua configuração.

---

## Principais Recursos

- **Localização Dinâmica**: Seleciona automaticamente a tradução mais apropriada para o cliente.
- **Fallback para Local Padrão**: Recorre a um local padrão se o idioma preferido do cliente não estiver disponível, garantindo continuidade na experiência do usuário.
- **Leve e Rápido**: Projetado para aplicações de alto desempenho, garantindo sobrecarga mínima.
- **Suporte ao Modo Estrito**: Impõe aderência estrita aos locais declarados para comportamento confiável.

---

## Assinatura da Função

```typescript
t(translations: Record<string, string>): string;
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de localidade (por exemplo, `en`, `fr`, `es-MX`) e os valores são as strings traduzidas correspondentes.

### Retorna

- Uma string representando o conteúdo no idioma preferido do cliente.

---

## Carregando o Manipulador de Solicitações de Internacionalização

Para garantir que a funcionalidade de internacionalização fornecida pelo `express-intlayer` funcione corretamente, você **deve** carregar o middleware de internacionalização no início da sua aplicação Express. Isso habilita a função `t` e garante o manuseio adequado da detecção de localidade e tradução.

Coloque o middleware `app.use(intlayer())` **antes de qualquer rota** em sua aplicação para garantir que todas as rotas se beneficiem da internacionalização:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Carregar o manipulador de solicitações de internacionalização
app.use(intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pt: "Olá, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Carregar o manipulador de solicitações de internacionalização
app.use(intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pt: "Olá, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Carregar o manipulador de solicitações de internacionalização
app.use(intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pt: "Olá, Mundo!",
    })
  );
});
```

### Por Que Isso é Necessário

- **Detecção de Localidade**: O middleware `intlayer` processa solicitações recebidas para detectar o local preferido do usuário com base em cabeçalhos, cookies ou outros métodos configurados.
- **Contexto de Tradução**: Configura o contexto necessário para a função `t` operar corretamente, garantindo que as traduções sejam retornadas no idioma correto.
- **Prevenção de Erros**: Sem este middleware, o uso da função `t` resultará em erros de tempo de execução porque as informações necessárias sobre o local não estarão disponíveis.

---

## Exemplos de Uso

### Exemplo Básico

Servir conteúdo localizado em diferentes idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
      pt: "Bem-vindo!",
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
      pt: "Bem-vindo!",
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
      pt: "Bem-vindo!",
    })
  );
});
```

**Solicitações do Cliente:**

- Um cliente com `Accept-Language: fr` receberá `Bienvenue!`.
- Um cliente com `Accept-Language: es` receberá `¡Bienvenido!`.
- Um cliente com `Accept-Language: de` receberá `Welcome!` (local padrão).

### Tratando Erros

Forneça mensagens de erro em vários idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
      pt: "Ocorreu um erro inesperado.",
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
      pt: "Ocorreu um erro inesperado.",
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
      pt: "Ocorreu um erro inesperado.",
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
      pt: "Olá!",
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
      pt: "Olá!",
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
      pt: "Olá!",
    })
  );
});
```

---

## Conclusão

A função `t` é uma ferramenta poderosa para internacionalização no backend. Usando-a de forma eficaz, você pode criar uma aplicação mais inclusiva e amigável para um público global. Para uso avançado e opções detalhadas de configuração, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).
