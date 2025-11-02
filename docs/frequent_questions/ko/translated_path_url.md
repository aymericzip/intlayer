---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: URL 경로를 번역할 수 있나요?
description: URL 경로를 번역하는 방법을 알아보세요.
keywords:
  - 배열
  - 콘텐츠
  - 선언
  - intlayer
  - 미들웨어
  - 프록시
  - 재작성
  - 접두사
  - 로케일
  - URL
slugs:
  - frequent-questions
  - translated-path-url
---

# 다음과 같이 URL을 번역할 수 있나요?

```bash
en -> /product (접두사 없음) 또는 /en/product (접두사 있음)
fr -> /fr/produit
es -> /es/producto
```

안타깝게도 Intlayer는 지정된 대로 URL을 번역하는 것을 허용하지 않습니다. 이를 구현하려면 자체 미들웨어나 프록시를 사용하여 URL을 재작성해야 합니다.

하지만 특정 로케일에 대해 URL에 접두사를 삽입하려면 `getMultilingualUrl` 함수를 사용할 수 있습니다.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (접두사 없음) 또는 /en/product (접두사 있음)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

또는 `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
