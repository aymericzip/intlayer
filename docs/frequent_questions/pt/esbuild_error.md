---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Erro ESBuild
description: Aprenda como corrigir erros do ESBuild.
keywords:
  - esbuild
  - erro
  - intlayer
  - plugin
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - doc
  - faq
  - esbuild-error
---

# Erro ESBuild

Se você encontrar um erro do ESBuild durante o processo de build, é provável que o plugin Intlayer não tenha sido configurado corretamente.

O ESBuild é responsável por ler os arquivos de declaração de conteúdo (`.content.{ts,js,mjs,cjs,json}`) e gerar os dicionários correspondentes na pasta `.intlayer/dictionary`. Além disso, ele lê o arquivo de configuração (`intlayer.config.ts`).

O Intlayer fornece plugins para integrar com seus bundlers. Ele é projetado para criar aliases de componentes que devem ser executados apenas no lado do servidor.

Se você estiver usando um framework como Next.js (Webpack / Turbopack), Vite, React Native, Lynx, etc., o Intlayer oferece um plugin que você pode usar para integrar o Intlayer em sua aplicação. Portanto, consulte a documentação específica do seu framework para aprender como integrar o plugin.
