---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentação da Função t | adonis-intlayer
description: Veja como usar a função t para o pacote adonis-intlayer
keywords:
  - t
  - tradução
  - Intlayer
  - Internacionalização
  - Documentação
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentação inicial
---

# Documentação: Função `t` no `adonis-intlayer`

A função `t` no pacote `adonis-intlayer` é o utilitário principal para fornecer respostas localizadas em sua aplicação AdonisJS. Ela simplifica a internacionalização (i18n) selecionando dinamicamente o conteúdo com base no idioma de preferência do usuário.

---

## Visão Geral

A função `t` é usada para definir e recuperar traduções para um determinado conjunto de idiomas. Ela determina automaticamente o idioma apropriado a ser retornado com base nas configurações de solicitação do cliente, como o cabeçalho `Accept-Language`. Se o idioma preferido não estiver disponível, ela recorre graciosamente ao locale padrão especificado em sua configuração.

---

## Principais Recursos

- **Localização Dinâmica**: Seleciona automaticamente a tradução mais apropriada para o cliente.
- **Fallback para o Locale Padrão**: Recorre a um locale padrão se o idioma preferido do cliente não estiver disponível, garantindo a continuidade na experiência do usuário.
- **Contexto Assíncrono**: Funciona perfeitamente dentro do ciclo de vida da solicitação AdonisJS usando Async Local Storage.
- **Suporte ao TypeScript**: Garante a segurança de tipos para suas traduções.

---

## Assinatura da Função

```typescript
t(translations: Record<string, any>): any;
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de locale (ex: `en`, `fr`, `es`) e os valores são o conteúdo traduzido correspondente.

### Retornos

- O conteúdo que representa o idioma preferido do cliente.

---

## Carregando o Middleware

Para garantir que a função `t` funcione corretamente, você **deve** registrar o middleware `intlayer` em sua aplicação AdonisJS.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Exemplos de Uso

### Exemplo Básico

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### Uso em Controllers

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour desde o controlador",
      })
    );
  }
}
```

---

## Tópicos Avançados

### Mecanismo de Fallback

Se um locale preferido não estiver disponível, a função `t` recorrerá ao locale padrão definido em seu `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Integração com TypeScript

A função `t` é segura em termos de tipo quando usada com dicionários definidos. Para mais detalhes, consulte a [documentação do TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).
