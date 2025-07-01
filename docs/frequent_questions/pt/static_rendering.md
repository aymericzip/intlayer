---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Renderização Estática vs Dinâmica com i18n no Next.js
description: Aprenda como usar renderização estática vs dinâmica com i18n no Next.js.
keywords:
  - estático
  - dinâmico
  - renderização
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - configuração
slugs:
  - doc
  - faq
  - renderizacao-estatica
---

# Renderização Estática vs Dinâmica com i18n no Next.js

## O problema com o **next-intl**

- **O que acontece?**
  Quando você usa `useTranslations`, `getTranslations` ou qualquer helper do next-intl _dentro de um Componente de Servidor_ em um app com rotas i18n (`/en/…`, `/fr/…`), o Next.js marca toda a rota como **dinâmica**. ([Next Intl][1])

- **Por quê?**
  next-intl busca a localidade atual a partir de um cabeçalho disponível apenas na requisição (`x-next-intl-locale`) via `headers()`. Como `headers()` é uma **API dinâmica**, qualquer componente que a utilize perde a otimização estática. ([Next Intl][1], [Next.js][2])

- **Solução oficial (boilerplate)**

  1. Exporte `generateStaticParams` com todas as localidades suportadas.
  2. Chame `setRequestLocale(locale)` em **todos** os layouts/páginas _antes_ de chamar `useTranslations`. ([Next Intl][1])
     Isso remove a dependência do cabeçalho, mas agora você tem código extra para manter e uma API instável em produção.

## Como o **intlayer** evita o problema

**Escolhas de design**

1. **Apenas parâmetro de rota** – A localidade vem do segmento de URL `[locale]` que o Next.js já passa para cada página.
2. **Pacotes em tempo de compilação** – As traduções são importadas como módulos ES regulares, portanto são otimizadas (tree-shaken) e incorporadas no momento da compilação.
3. **Sem APIs dinâmicas** – `useT()` lê do contexto React, não de `headers()` ou `cookies()`.
4. **Configuração zero** – Uma vez que suas páginas estejam sob `app/[locale]/`, o Next.js pré-renderiza automaticamente um arquivo HTML por localidade.
