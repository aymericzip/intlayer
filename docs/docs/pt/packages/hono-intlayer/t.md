---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Documentação da Função t | hono-intlayer
description: Veja como usar a função t para o pacote hono-intlayer
keywords:
  - t
  - tradução
  - Intlayer
  - Internacionalização
  - Documentação
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicialização do histórico
---

# Documentação: Função `t` no `hono-intlayer`

A função `t` no pacote `hono-intlayer` é o utilitário principal para fornecer respostas localizadas na sua aplicação Hono. Ela simplifica a internacionalização (i18n) selecionando dinamicamente o conteúdo com base no idioma de preferência do usuário.

---

## Visão Geral

A função `t` é usada para definir e recuperar traduções para um determinado conjunto de idiomas. Ela determina automaticamente o idioma apropriado a ser retornado com base nas configurações de solicitação do cliente, como o cabeçalho `Accept-Language`. Se o idioma preferido não estiver disponível, ela recorre graciosamente ao local padrão especificado na sua configuração.

---

## Principais Recursos

- **Localização Dinâmica**: Seleciona automaticamente a tradução mais apropriada para o cliente.
- **Fallback para o Local Padrão**: Recorre a um local padrão se o idioma preferido do cliente não estiver disponível, garantindo continuidade na experiência do usuário.
- **Leve e Rápido**: Projetado para aplicações de alto desempenho, garantindo uma sobrecarga mínima.
- **Suporte ao Modo Estrito**: Reforça a adesão estrita aos locais declarados para um comportamento confiável.

---

## Assinatura da Função

```typescript
t(translations: Record<string, string>): string;
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de localidade (ex: `en`, `fr`, `pt`) e os valores são as strings traduzidas correspondentes.

### Retorno

- Uma string representando o conteúdo no idioma de preferência do cliente.

---

## Carregando o Manipulador de Solicitação de Internacionalização

Para garantir que a funcionalidade de internacionalização fornecida pelo `hono-intlayer` funcione corretamente, você **deve** carregar o middleware de internacionalização no início da sua aplicação Hono. Isso habilita a função `t` e garante o tratamento adequado da detecção de localidade e tradução.

Coloque o middleware `app.use("*", intlayer())` **antes de quaisquer rotas** na sua aplicação para garantir que todas as rotas se beneficiem da internacionalização:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Carregar manipulador de solicitação de internacionalização
app.use("*", intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pt: "Olá, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Carregar manipulador de solicitação de internacionalização
app.use("*", intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pt: "Olá, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Carregar manipulador de solicitação de internacionalização
app.use("*", intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pt: "Olá, Mundo!",
    })
  );
});
```

### Por que isso é Obrigatório

- **Detecção de Localidade**: O middleware `intlayer` processa as solicitações recebidas para detectar a localidade preferida do usuário com base em cabeçalhos, cookies ou outros métodos configurados.
- **Contexto de Tradução**: Configura o contexto necessário para que a função `t` opere corretamente, garantindo que as traduções sejam retornadas no idioma correto.
- **Prevenção de Erros**: Sem este middleware, o uso da função `t` resultará em erros de tempo de execução porque as informações de localidade necessárias não estarão disponíveis.

---

## Exemplos de Uso

### Exemplo Básico

Sirva conteúdo localizado em diferentes idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      pt: "Bem-vindo!",
    })
  );
});
```

**Solicitações do Cliente:**

- Um cliente com `Accept-Language: fr` receberá `Bienvenue!`.
- Um cliente com `Accept-Language: pt` receberá `Bem-vindo!`.
- Um cliente com `Accept-Language: de` receberá `Welcome!` (localidade padrão).

### Tratamento de Erros

Forneça mensagens de erro em vários idiomas:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      pt: "Ocorreu um erro inesperado.",
    }),
    500
  );
});
```

---

### Usando Variantes de Localidade

Especifique traduções para variantes específicas de localidade:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      pt: "Olá!",
    })
  );
});
```

---

## Tópicos Avançados

### Mecanismo de Fallback

Se uma localidade preferida estiver indisponível, a função `t` recorrerá à localidade padrão definida na configuração:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.PORTUGUESE],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### Execução do Modo Estrito

Configure a função `t` para reforçar a adesão estrita aos locais declarados:

| Modo        | Comportamento                                                                              |
| ----------- | ------------------------------------------------------------------------------------------ |
| `strict`    | Todos os locais declarados devem ter traduções fornecidas. Locais ausentes lançarão erros. |
| `inclusive` | Locais declarados devem ter traduções. Locais ausentes acionam avisos, mas são aceitos.    |
| `loose`     | Qualquer local existente é aceito, mesmo que não seja declarado.                           |

---

### Integração com TypeScript

A função `t` é type-safe quando usada com TypeScript. Defina um objeto de traduções type-safe:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  pt: "Bom dia!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Erros Comuns e Solução de Problemas

| Problema                   | Causa                                    | Solução                                                                          |
| -------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| Função `t` não funciona    | Middleware não carregado                 | Certifique-se de que `app.use("*", intlayer())` seja adicionado antes das rotas. |
| Erro de traduções ausentes | Modo estrito ativado sem todos os locais | Forneça todas as traduções necessárias.                                          |

---

## Conclusão

A função `t` é uma ferramenta poderosa para a internacionalização de back-end. Ao usá-la de forma eficaz, você pode criar uma aplicação mais inclusiva e amigável para um público global. Para uso avançado e opções de configuração detalhadas, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
