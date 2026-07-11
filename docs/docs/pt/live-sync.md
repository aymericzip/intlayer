---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Sincronização ao vivo | Reflita as alterações de conteúdo do CMS em tempo real
description: Permita que sua aplicação reflita as alterações de conteúdo do CMS Intlayer em tempo de execução, sem necessidade de rebuild ou reimplantação.
keywords:
  - Sincronização ao vivo
  - Live Sync
  - CMS
  - Editor Visual
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Movido da documentação do CMS Intlayer para sua própria página"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Adiciona documentação sobre live sync"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Substitui o campo `hotReload` por `liveSync`"
author: aymericzip
---

# Sincronização ao vivo

A Sincronização ao Vivo permite que a sua aplicação reflita as alterações de conteúdo do CMS em tempo de execução. Não é necessário reconstruir ou reimplantar. Quando ativada, as atualizações são transmitidas para um servidor de Sincronização ao Vivo que atualiza os dicionários que a sua aplicação lê.

## Tabela de conteúdos

<TOC/>

---

## Ativar a sincronização ao vivo

> A Sincronização ao Vivo requer uma conexão contínua com o servidor e está disponível no plano enterprise.

Ative a Sincronização ao Vivo atualizando a sua configuração Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    /**
     * Ativa o recarregamento a quente das configurações de localidade quando são detetadas alterações.
     * Por exemplo, quando um dicionário é adicionado ou atualizado, a aplicação atualiza
     * o conteúdo exibido na página.
     *
     * Como o recarregamento a quente requer uma conexão contínua com o servidor, está
     * disponível apenas para clientes do plano `enterprise`.
     *
     * Padrão: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * Controla como os dicionários são importados:
     *
     * - "live": Os dicionários são buscados dinamicamente usando a API de Sincronização ao Vivo.
     *   Substitui useIntlayer por useDictionaryDynamic.
     *
     * Nota: O modo live usa a API de Sincronização ao Vivo para buscar os dicionários. Se a chamada da API
     * falhar, os dicionários são importados dinamicamente.
     * Nota: Apenas dicionários com conteúdo remoto e sinalizadores "live" usam o modo live.
     * Outros usam o modo dinâmico para melhor desempenho.
     */
    importMode: "fetch",
  },
};

export default config;
```

Inicie o servidor Live Sync para envolver sua aplicação:

Exemplo usando Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... outros scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Exemplo usando Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... outros scripts
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

O servidor Live Sync envolve sua aplicação e aplica automaticamente o conteúdo atualizado assim que ele chega.

Para receber notificações de alterações do CMS, o servidor Live Sync mantém uma conexão SSE com o backend. Quando o conteúdo muda no CMS, o backend encaminha a atualização para o servidor Live Sync, que grava os novos dicionários. Sua aplicação refletirá a atualização na próxima navegação ou recarregamento do navegador, sem necessidade de reconstrução.

Fluxograma (CMS/Backend -> Servidor Live Sync -> Servidor de Aplicação -> Frontend):

![Esquema Lógico do Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Como funciona:

![Fluxo Live Sync CMS/Backend/Servidor Live Sync/Servidor de Aplicação/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## Fluxo de trabalho de desenvolvimento (local)

- Em desenvolvimento, todos os dicionários remotos são buscados quando a aplicação inicia, para que você possa testar atualizações rapidamente.
- Para testar o Live Sync localmente com Next.js, envolva seu servidor de desenvolvimento:

```json5 fileName="package.json"
{
  "scripts": {
    // ... outros scripts
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Para Vite
  },
}
```

Habilite a otimização para que o Intlayer aplique as transformações de importação Live durante o desenvolvimento:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

Esta configuração envolve seu servidor de desenvolvimento com o servidor Live Sync, busca dicionários remotos na inicialização e transmite atualizações do CMS via SSE. Atualize a página para ver as mudanças.

## Notas e restrições

- Adicione a origem do live sync à política de segurança do seu site (CSP). Certifique-se de que a URL do live sync esteja permitida em `connect-src` (e `frame-ancestors`, se relevante).
- O Live Sync não funciona com saída estática. Para Next.js, a página deve ser dinâmica para receber atualizações em tempo de execução (por exemplo, use `generateStaticParams`, `generateMetadata`, `getServerSideProps` ou `getStaticProps` adequadamente para evitar restrições de somente estático).
- No CMS, cada dicionário possui uma flag `live`. Apenas dicionários com `live=true` são buscados via API de sincronização ao vivo; os demais são importados dinamicamente e permanecem inalterados em tempo de execução.
- A flag `live` é avaliada para cada dicionário no momento da compilação. Se o conteúdo remoto não foi marcado como `live=true` durante a compilação, você deve recompilar para habilitar a Sincronização ao Vivo para esse dicionário.
- O servidor de sincronização ao vivo deve ter permissão para escrever em `.intlayer`. Em contêineres, assegure o acesso de escrita a `/.intlayer`.

## Links úteis

- [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
- [Editor Visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- [Referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Guia de Auto-hospedagem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md)
