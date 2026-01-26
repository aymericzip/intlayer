---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Fastify 플러그인 문서 | fastify-intlayer
description: fastify-intlayer 패키지용 intlayer 플러그인 사용 방법을 확인하세요
keywords:
  - intlayer
  - fastify
  - 플러그인
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 문서 초기화
---

# intlayer Fastify 플러그인 문서

The `intlayer` plugin for Fastify detects the user's locale and decorates the request object with Intlayer functions. It also enables the use of global translation functions within the request context.

## 사용법

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    ko: "안녕하세요",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## 설명

이 플러그인은 다음 작업을 수행합니다:

1. **로케일 감지**: 요청(헤더, 쿠키 등)을 분석하여 사용자의 선호 로케일을 결정합니다.
2. **요청 데코레이션**: `FastifyRequest` 객체에 `intlayer` 속성을 추가하며, 해당 속성은 다음을 포함합니다:
   - `locale`: 감지된 로케일.
   - `t`: 번역 함수.
   - `getIntlayer`: 사전을 가져오는 함수.
3. **컨텍스트 관리**: 비동기 컨텍스트를 관리하기 위해 `cls-hooked`를 사용하여, 전역 Intlayer 함수들이 요청별 로케일에 접근할 수 있도록 합니다.
