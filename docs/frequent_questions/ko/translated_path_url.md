---
createdAt: 2025-05-20
updatedAt: 2026-01-22
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
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# URL 번역이 가능한가요?

네! Intlayer는 사용자 정의 URL 재작성을 지원하여 로케일별 경로를 정의할 수 있습니다. 예를 들어:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

이를 구현하려면 `intlayer.config.ts` 파일에서 `routing` 섹션을 구성할 수 있습니다.

이 기능을 구현하는 방법에 대한 자세한 내용은 [사용자 정의 URL 재작성 문서](/docs/concept/custom_url_rewrites)를 참조하세요.

또한 `getMultilingualUrl` 및 `getLocalizedUrl` 함수를 사용하여 프로그래밍 방식으로 이러한 URL을 생성할 수 있으며, 이 함수들은 재작성 규칙을 준수합니다.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (구성된 경우)
```
