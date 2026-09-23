---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Extensão do Chrome, Scanner i18n & SEO
description: Inspecione a configuração de i18n de qualquer site com a extensão do Chrome do Intlayer. Detecte o framework, a biblioteca de i18n, idiomas, tags hreflang e SEO, e execute uma auditoria de SEO i18n completa.
keywords:
  - Extensão do Chrome
  - Scanner i18n
  - Verificador de hreflang
  - SEO Multilíngue
  - Intlayer
  - Localização
  - Ferramentas de Desenvolvimento
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Histórico inicial"
author: aymericzip
---

# Extensão do Chrome: Scanner i18n & SEO

## Visão Geral

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) é a extensão oficial do Chrome para o **Intlayer**. Abra-a em qualquer site para ver como o site lida com a internacionalização: qual framework e biblioteca de i18n ele usa, quais locales ele expõe e se suas tags de SEO multilíngue estão configuradas corretamente.

Funciona em qualquer site, usando ou não o Intlayer.

![Extensão do Chrome do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

Link da extensão: [https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## Funcionalidades

- **Detecção de tecnologias**: identifica o framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) e a biblioteca de i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Cada detecção mostra as evidências que a dispararam, como uma variável global, um cookie ou um marcador DOM.
- **Locales**: lista os locales encontrados no atributo `lang`, tags hreflang e `og:locale`, no prefixo de locale da URL e em cookies ou entradas de armazenamento de locale.
- **Tags de SEO i18n**: verifica `html lang`, `html dir`, o link canônico, tags hreflang, `x-default`, `og:locale` e a proporção de links internos localizados.
- **Auditoria completa**: executa a mesma auditoria que o [Scanner de SEO i18n](https://intlayer.org/i18n-seo-scanner) e mostra uma pontuação ao vivo.

## Instalação

Instale o [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) da Chrome Web Store e fixe-o na sua barra de ferramentas.

A extensão funciona no Chrome e em qualquer navegador baseado em Chromium que suporte extensões da Chrome Web Store (Edge, Brave, Arc, Opera).

## Uso

### Inspecionar uma página

1. Abra o site que você deseja inspecionar.
2. Clique no ícone do **Intlayer i18n Scanner** na barra de ferramentas.
3. O popup mostra as seções **Tecnologias detectadas**, **Locales** e **Tags de SEO i18n** para a página atual.

A detecção é executada localmente no seu navegador, apenas na aba atual.

### Executar uma auditoria completa

![Pontuação de auditoria da extensão do Chrome do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Role até a seção **Auditoria completa** e clique em **Executar auditoria i18n completa**. Os resultados são exibidos conforme cada verificação é concluída, agrupados em:

- **Página**: atributos `html lang` e `dir`, locale atual, tags hreflang, `x-default`, link canônico, links internos localizados, seletor de idioma, ícones de bandeira e conteúdo de locale não utilizado enviado no bundle JavaScript.
- **Robots.txt**: presença e verificação se os caminhos de locale permanecem rastreáveis.
- **Sitemap**: presença, cada locale listado, links alternativos e `x-default`.
- **Domínio**: número de locales descobertos em todo o site.

Cada verificação é marcada como aprovada, aviso ou com falha, e a pontuação resume a integridade geral do SEO i18n da página.

## Privacidade e permissões

A extensão solicita permissões mínimas:

- **activeTab** e **scripting**: o detector é executado apenas na aba que você está visualizando e somente quando você abre o popup.
- **back.intlayer.org**: usado apenas quando você executa uma auditoria completa. A URL da página atual é enviada para a API do Intlayer para ser escaneada.

Nenhum histórico de navegação é coletado e nada é executado em segundo plano.

## Perguntas frequentes

<FAQ>

<Question title="O site precisa usar o Intlayer?">

Não. A extensão inspeciona qualquer site, independentemente do framework ou da biblioteca de i18n utilizada.

</Question>
<Question title="Por que uma tecnologia não é detectada?">

A detecção depende do que a página expõe no navegador: variáveis globais, cookies, meta tags e marcadores DOM. Algumas builds de produção removem esses marcadores, portanto uma biblioteca pode estar em uso sem deixar rastros visíveis.

</Question>
<Question title="Como corrijo os problemas encontrados pela auditoria?">

A maioria das verificações corresponde a uma configuração de roteamento ou de metadados. Com o Intlayer, hreflang, canônico, `x-default`, links localizados, sitemap e robots.txt são gerados a partir da sua [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md). Consulte o guia de integração para o seu framework, por exemplo [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nuxt.md) ou [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Ferramentas relacionadas

- [Extensão do VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)
- [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)
- [Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)
