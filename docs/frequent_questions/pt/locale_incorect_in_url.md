---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Locale Incorreto Recuperado da URL
description: Aprenda como corrigir o locale incorreto recuperado da URL.
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuração
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - locale-incorect-in-url
---

# Locale Incorreto Recuperado da URL

## Descrição do Problema

Ao tentar acessar o parâmetro locale da URL, você pode encontrar um problema onde o valor do locale está incorreto:

```js
const { locale } = await params;
console.log(locale); // retorna "about" ao invés do locale esperado
```

## Solução

### 1. Verifique a Estrutura dos Arquivos

Certifique-se de que o caminho do roteador da sua aplicação Next.js segue esta estrutura:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Verifique a Configuração do Middleware

O problema geralmente ocorre quando o middleware não está presente ou não é acionado. O arquivo do middleware deve estar localizado em:

```bash
src/middleware.ts
```

Este middleware é responsável por reescrever as rotas quando `prefixDefault` está definido como `false`. Por exemplo, ele reescreve `/en/about` para `/about`.

### 3. Padrões de URL Baseados na Configuração

#### Configuração Padrão (`prefixDefault: false`, `noPrefix: false`)

- Inglês: `/about`
- Francês: `/fr/about`
- Espanhol: `/es/about`

#### Com `prefixDefault: true`

- Inglês: `/en/about`
- Francês: `/fr/about`
- Espanhol: `/es/about`

#### Com `noPrefix: true`

- Inglês: `/about`
- Francês: `/about`
- Espanhol: `/about`

Para mais detalhes sobre essas opções de configuração, consulte a [Documentação de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).
