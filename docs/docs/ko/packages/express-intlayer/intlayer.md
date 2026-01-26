---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Express 미들웨어 문서 | express-intlayer
description: express-intlayer 패키지용 intlayer 미들웨어 사용 방법을 확인하세요
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 문서 초기화
---

# intlayer Express 미들웨어 문서

Express용 `intlayer` 미들웨어는 사용자의 로케일을 감지하고 `res.locals` 객체를 통해 번역 함수를 제공합니다. 또한 요청 핸들러 전반에서 `t` 및 `getIntlayer` 함수를 사용할 수 있게 해줍니다.

## 사용법

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## 설명

이 미들웨어는 다음 작업을 수행합니다:

1. **로케일 감지**: 쿠키, 헤더(`Accept-Language` 등), 및 URL 매개변수를 확인하여 사용자의 로케일을 결정합니다.
2. **컨텍스트 설정**: `res.locals`를 다음으로 채웁니다:
   - `locale`: 감지된 로케일.
   - `t`: 감지된 로케일에 바인딩된 번역 함수.
   - `getIntlayer`: 감지된 로케일에 바인딩된 사전을 가져오는 함수.
3. **Async Local Storage**: 요청 흐름 내에서 `express-intlayer`에서 가져온 전역 `t` 및 `getIntlayer` 함수를 사용할 수 있도록 컨텍스트를 설정합니다.
