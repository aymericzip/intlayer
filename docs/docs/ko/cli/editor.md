---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 에디터 명령어
description: Intlayer 에디터 명령어 사용법을 알아보세요.
keywords:
  - 에디터
  - 비주얼 에디터
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
---

# 에디터 명령어

`editor` 명령어는 `intlayer-editor` 명령어를 다시 래핑합니다.

> `editor` 명령어를 사용하려면 `intlayer-editor` 패키지가 설치되어 있어야 합니다. ([Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 참고)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
