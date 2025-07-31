---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Erro de Build em CI/CD
description: Aprenda como corrigir erros de build que ocorrem em ambientes CI/CD.
keywords:
  - build
  - erro
  - ci
  - cd
  - pipeline
  - intlayer
  - dicionários
  - next.js
  - prebuild
  - automação
slugs:
  - doc
  - faq
  - build-error-ci-cd
---

# Erro no build em CI/CD

Se você receber um erro como este no Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Aqui estão algumas soluções:

## 1. Dicionários ausentes

Certifique-se de que os dicionários sejam construídos na etapa de build.

É frequente que o build funcione localmente, mas não no CI/CD. A razão é que localmente o diretório `.intlayer` está presente, mas no CI/CD não está, pois é excluído do build.

Você pode corrigir isso adicionando um script de prebuild no `package.json` do seu projeto.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Será executado antes do build
    "build": "next build",
  },
}
```

> Note que se você usar a função `withIntlayer`, ou o plugin bundler equivalente para seu framework, o script de prebuild será executado antes do build.

## 2. Variáveis de ambiente ausentes no momento do build / execução

Em um container, ou plataforma de implantação automática, é recomendado excluir o arquivo `.env` do build.

```text fileName=".gitignore or .dockerignore"
# Variáveis de ambiente
.env
**/.env
.env.*
**/.env.*
```

Se suas variáveis de ambiente não estiverem disponíveis no momento do build, um erro será lançado.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Provavelmente não está relacionado ao Intlayer. Então, verifique suas variáveis de ambiente no momento do build na sua plataforma CI/CD.
