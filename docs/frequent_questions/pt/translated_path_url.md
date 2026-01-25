---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Posso traduzir o caminho do URL?
description: Aprenda como traduzir o caminho do URL.
keywords:
  - array
  - conteúdo
  - declaração
  - intlayer
  - middleware
  - proxy
  - reescrita
  - prefixo
  - localidade
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# É possível traduzir URLs?

Sim! O Intlayer suporta reescritas de URL personalizadas, que permitem definir caminhos específicos de localidade. Por exemplo:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Para implementar isso, você pode configurar a seção `routing` no seu arquivo `intlayer.config.ts`.

Para mais informações sobre como implementar este recurso, consulte a [documentação de Reescritas de URL Personalizadas](/docs/concept/custom_url_rewrites).

Você também pode usar as funções `getMultilingualUrl` e `getLocalizedUrl` para gerar essas URLs programaticamente, e elas respeitarão suas regras de reescrita.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (se configurado)
```
