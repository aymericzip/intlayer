---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: intlayer Hono 미들웨어 문서 | hono-intlayer
description: hono-intlayer 패키지의 intlayer 미들웨어 사용법 알아보기
keywords:
  - intlayer
  - hono
  - 미들웨어
  - Intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: 문서 초기화
---

# intlayer Hono 미들웨어 문서

Hono용 `intlayer` 미들웨어는 사용자의 로케일을 감지하고 컨텍스트 객체에 Intlayer 함수를 채웁니다. 또한 요청 컨텍스트 내에서 전역 번역 함수를 사용할 수 있게 합니다.

## 사용법

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    ko: "안녕하세요",
  });

  return c.text(content);
});
```

## 설명

미들웨어는 다음 작업을 수행합니다.

1. **로케일 감지**: 요청(헤더, 쿠키 등)을 분석하여 사용자의 선호 로케일을 결정합니다.
2. **컨텍스트 채우기**: `c.get()`을 통해 액세스 가능한 Hono 컨텍스트에 Intlayer 데이터를 추가합니다. 여기에는 다음이 포함됩니다.
   - `locale`: 감지된 로케일.
   - `t`: 번역 함수.
   - `getIntlayer`: 딕셔너리를 검색하는 함수.
   - `getDictionary`: 딕셔너리 객체를 처리하는 함수.
3. **컨텍스트 관리**: `cls-hooked`를 사용하여 비동기 컨텍스트를 관리하며, 전역 Intlayer 함수(`t`, `getIntlayer`, `getDictionary`)가 컨텍스트 객체를 전달하지 않고도 요청별 로케일에 액세스할 수 있도록 합니다.
