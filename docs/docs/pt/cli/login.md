---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Login
description: Aprenda como usar o comando de login do Intlayer CLI para autenticar-se no Intlayer CMS e obter credenciais de acesso.
keywords:
  - CLI
  - Login
  - Autenticação
  - CMS
  - Intlayer
  - Credenciais
slugs:
  - doc
  - concept
  - cli
  - login
author: aymericzip
---

# Comando de Login do Intlayer CLI

---

## Descrição

O comando `login` do Intlayer CLI permite que você se autentique no Intlayer CMS. Este comando abre automaticamente o seu navegador padrão para concluir o processo de autenticação e receber as credenciais necessárias (Client ID e Client Secret) para usar os serviços do Intlayer.

## Uso

```bash packageManager="npm"
npx intlayer login [options]
```

```bash packageManager="yarn"
yarn intlayer login [options]
```

```bash packageManager="pnpm"
pnpm intlayer login [options]
```

```bash packageManager="bun"
bun x intlayer login [options]
```

ou

```bash
intlayer login [options]
```

## Opções

### `--cms-url <url>`

Especifica a URL do Intlayer CMS para se conectar para autenticação.

- **Tipo**: `string`
- **Padrão**: O valor configurado em `intlayer.config.*` ou `https://intlayer.org`
- **Exemplo**:

```bash packageManager="npm"
npx intlayer login --cms-url https://intlayer.org
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://intlayer.org
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://intlayer.org
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://intlayer.org
```

### Opções de Configuração

Você também pode usar opções de configuração comuns:

- `--env-file <path>`: Caminho para o arquivo de ambiente
- `-e, --env <env>`: Ambiente de execução
- `--base-dir <dir>`: Diretório base do projeto
- `--verbose`: Habilitar saída detalhada (padrão: true)
- `--prefix <prefix>`: Prefixo para os logs

## Como Funciona

1. **Inicialização do Servidor Local**: O comando inicia um servidor HTTP local em uma porta aleatória para receber as credenciais do CMS
2. **Abertura do Navegador**: O comando abre automaticamente o seu navegador padrão na URL de login do CMS
3. **Autenticação**: Complete a autenticação no navegador usando sua conta Intlayer
4. **Recepção das Credenciais**: O servidor local recebe o Client ID e o Client Secret do CMS
5. **Instruções**: O comando exibe instruções para configurar as credenciais no seu projeto

## Saída

Após um login bem-sucedido, o comando exibirá:

1. **As credenciais recebidas** (Client ID e Client Secret)
2. **Instruções para o arquivo `.env`:**

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Instruções para o arquivo de configuração do Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Mantendo a chave de acesso segura

`intlayer login` emite uma **chave de acesso**: um par `clientId` / `clientSecret` que todo comando credenciado (`push`, `pull`, `fill`, `configuration push`, `live`, …) usa para autenticar.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

> **`clientSecret` é uma credencial do lado do servidor.** Ela concede acesso total à API com escopo do projeto — leitura e escrita de seus dicionários, seu projeto e sua organização. Mantenha-a em `.env` (ignorado pelo git) ou no armazenamento de segredos do CI, e nunca a coloque inline no arquivo de configuração.

Intlayer impõe isso em vez de apenas documentá-lo:

- `clientSecret` é **removido da configuração que seu bundler incorpora**, portanto não pode chegar a um bundle do navegador qualquer que seja a integração do framework que você use. Ele é apenas lido do lado do servidor, em tempo de execução, a partir do ambiente.
- `clientId` é diferente: é a **chave pública** do projeto, segura para enviar, e usada por [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/analytics.md#how-events-are-authenticated) para obter um token de curta duração, apenas para ingestão.

Comentar `clientId` é suficiente para desabilitar todo comportamento credenciado — busca remota de dicionários, acesso ao CMS, análises — mesmo quando as variáveis de ambiente ainda estão definidas.

Para pipelines de CI, prefira o [`comando ci`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/ci.md), que injeta as credenciais pela duração de uma única execução em vez de persistí-las.

## Configuração Manual

Se o navegador não abrir automaticamente, você pode visitar manualmente a URL exibida no terminal.

## Exemplos

### Login com URL do CMS personalizado

```bash packageManager="npm"
npx intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://custom-cms.example.com
```

### Login com Arquivo de Ambiente Específico

```bash packageManager="npm"
npx intlayer login --env-file .env.production
```

```bash packageManager="yarn"
yarn intlayer login --env-file .env.production
```

```bash packageManager="pnpm"
pnpm intlayer login --env-file .env.production
```

```bash packageManager="bun"
bun x intlayer login --env-file .env.production
```

### Login em Modo Verbose

```bash packageManager="npm"
npx intlayer login --verbose
```

```bash packageManager="yarn"
yarn intlayer login --verbose
```

```bash packageManager="pnpm"
pnpm intlayer login --verbose
```

```bash packageManager="bun"
bun x intlayer login --verbose
```

## Solução de Problemas

### Navegador Não Abre

Se o navegador não abrir automaticamente, copie a URL exibida no terminal e abra-a manualmente no seu navegador.

### Problemas de Conexão

Se você encontrar problemas de conexão, verifique:

1. Que a URL do CMS esteja correta
2. Que sua conexão com a internet esteja funcionando corretamente
3. Que não haja firewalls bloqueando a conexão

### Credenciais não recebidas

Se as credenciais não forem recebidas:

1. Certifique-se de que você concluiu o processo de autenticação no navegador
2. Verifique se a porta local não está bloqueada
3. Tente executar o comando novamente

## Próximos passos

Após completar o login:

1. Adicione as credenciais ao seu arquivo `.env`
2. Configure seu arquivo `intlayer.config.*` com as credenciais
3. Use comandos da CLI para gerenciar seus dicionários:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/push.md) - Fazer push de dicionários para o CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/pull.md) - Fazer pull de dicionários do CMS

## Veja também

- [Documentação da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- [Configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
