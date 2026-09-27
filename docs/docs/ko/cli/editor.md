---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: 비주얼 에디터 명령어"
description: "CLI에서 Intlayer 비주얼 에디터를 시작하고 설정하여 실행 중인 애플리케이션에서 바로 콘텐츠를 편집합니다."
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
author: aymericzip
---

# 에디터 명령어

`editor` 명령어는 `intlayer-editor` 명령어를 다시 래핑합니다.

> `editor` 명령어를 사용하려면 `intlayer-editor` 패키지가 설치되어 있어야 합니다. ([Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 참고)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
