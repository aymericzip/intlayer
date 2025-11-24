---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 문서 검토
description: 다양한 로케일에서 문서 파일의 품질, 일관성 및 완전성을 검토하는 방법을 알아보세요.
keywords:
  - 검토
  - 문서
  - 문서화
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# 문서 검토

`doc review` 명령어는 다양한 로케일에서 문서 파일의 품질, 일관성 및 완전성을 분석합니다.

```bash
npx intlayer doc review
```

이미 번역된 파일을 검토하거나 번역이 올바른지 확인하는 데 사용할 수 있습니다.

대부분의 사용 사례에서,

- 이 파일의 번역본이 없는 경우 `doc translate`를 사용하는 것이 좋습니다.
- 이 파일의 번역본이 이미 존재하는 경우 `doc review`를 사용하는 것이 좋습니다.

> 검토 프로세스는 동일한 파일을 완전히 검토하기 위해 번역 프로세스보다 더 많은 입력 토큰을 소비한다는 점에 유의하세요. 그러나 검토 프로세스는 검토할 청크를 최적화하고 변경되지 않은 부분은 건너뜁니다.

## 인수:

`doc review` 명령어는 `doc translate`와 동일한 인수를 받아 특정 문서 파일을 검토하고 품질 검사를 적용할 수 있습니다.

git 옵션 중 하나를 활성화한 경우, 명령어는 변경된 파일 부분만 검토합니다. 스크립트는 파일을 청크 단위로 처리하고 각 청크를 검토합니다. 청크에 변경 사항이 없으면 검토 프로세스를 가속화하고 AI 제공자 API 비용을 제한하기 위해 해당 청크를 건너뜁니다.

전체 인수 목록은 [문서 번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-translate.md) 명령어 문서를 참조하세요.
