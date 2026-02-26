---
createdAt: 2026-01-21
updatedAt: 2026-02-25
title: Documentação do intlayerProxy | next-intlayer
description: Veja como usar a função intlayerMiddleware do pacote next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: Renomear intlayerMiddleware para intlayerProxy
  - version: 8.0.0
    date: 2026-01-21
    changes: Doc inicial
---

# Documentação do intlayerProxy (intlayerMiddleware)

A função `intlayerProxy` (`intlayerMiddleware` para nextjs < 16) é um middleware do Next.js que gere o roteamento baseado em locale e os redirecionamentos. Ela detecta automaticamente o locale preferido do utilizador e o redireciona para o caminho localizado apropriado, quando necessário.

## Uso

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## Descrição

O middleware executa as seguintes tarefas:

1. **Locale Detection**: Verifica o caminho da URL, os cookies e o cabeçalho `Accept-Language` para determinar o locale do utilizador.
2. **Redirection**: Se a URL não contiver um prefixo de locale e a configuração exigir um (ou com base nas preferências do utilizador), redireciona para a URL localizada.
3. **Cookie Management**: Pode armazenar o locale detetado num cookie para pedidos futuros.

## Parâmetros

A função recebe o `NextRequest` padrão do Next.js como parâmetro quando usada diretamente, ou pode ser exportada conforme mostrado acima.

## Configuração

Para configurar o middleware, pode configurar a opção `routing` no ficheiro `intlayer.config.ts`. Consulte a [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para mais detalles.
