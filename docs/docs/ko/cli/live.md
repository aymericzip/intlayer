---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 라이브 싱크 명령어
description: 런타임에 CMS 콘텐츠 변경 사항을 반영하기 위해 라이브 싱크를 사용하는 방법을 알아보세요.
keywords:
  - 라이브 싱크
  - CMS
  - 런타임
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# 라이브 싱크 명령어

라이브 싱크는 앱이 런타임에 CMS 콘텐츠 변경 사항을 반영할 수 있게 합니다. 재빌드나 재배포가 필요 없습니다. 활성화되면 업데이트가 라이브 싱크 서버로 스트리밍되어 애플리케이션이 읽는 사전을 갱신합니다. 자세한 내용은 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 참조하세요.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## 인자:

**설정 옵션:**

- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다. intlayer 구성을 가져오기 위해 명령어는 기본 디렉토리에서 `intlayer.config.{ts,js,json,cjs,mjs}` 파일을 찾습니다.

- **`--no-cache`**: 캐시를 비활성화합니다.

  > 예시: `npx intlayer dictionary push --env-file .env.production.local`

**로그 옵션:**

- **`--verbose`**: 디버깅을 위해 상세 로그를 활성화합니다. (CLI에서 기본값은 true)
