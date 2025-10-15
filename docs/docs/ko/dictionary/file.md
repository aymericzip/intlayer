---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 파일
description: `file` 함수를 사용하여 외부 파일을 콘텐츠 사전에 임베드하는 방법을 알아보세요. 이 문서는 Intlayer가 파일 콘텐츠를 동적으로 연결하고 관리하는 방식을 설명합니다.
keywords:
  - 파일
  - 국제화
  - 문서화
  - Intlayer
  - Next.js
  - 자바스크립트
  - 리액트
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력 작성
---

# 파일 콘텐츠 / Intlayer에서 파일 임베딩하기

## 파일 임베딩 작동 방식

Intlayer에서 `file` 함수는 외부 파일 콘텐츠를 사전에 임베드할 수 있도록 합니다. 이 방법은 Intlayer가 소스 파일을 인식하게 하여 Intlayer 비주얼 에디터와 CMS와의 원활한 통합을 가능하게 합니다. 직접적인 `import`, `require` 또는 `fs` 파일 읽기 방식과 달리, `file`을 사용하면 파일이 사전에 연결되어 파일이 수정될 때 Intlayer가 콘텐츠를 동적으로 추적하고 업데이트할 수 있습니다.

## 파일 콘텐츠 설정하기

Intlayer 프로젝트에 파일 콘텐츠를 임베드하려면 콘텐츠 모듈에서 `file` 함수를 사용하세요. 아래는 다양한 구현 예시입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## React Intlayer에서 파일 콘텐츠 사용하기

React 컴포넌트에서 내장된 파일 콘텐츠를 사용하려면, `react-intlayer` 패키지에서 `useIntlayer` 훅을 가져와 사용하세요. 이 훅은 지정된 키에서 콘텐츠를 가져와 동적으로 표시할 수 있게 합니다.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## 다국어 마크다운 예제

다국어 편집 가능한 마크다운 파일을 지원하기 위해, `file`을 `t()` 및 `md()`와 결합하여 마크다운 콘텐츠 파일의 다양한 언어 버전을 정의할 수 있습니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

이 설정은 사용자의 언어 선호도에 따라 콘텐츠를 동적으로 가져올 수 있도록 합니다. Intlayer 비주얼 에디터나 CMS에서 사용될 때, 시스템은 콘텐츠가 지정된 마크다운 파일에서 온 것임을 인식하고 해당 콘텐츠가 편집 가능하도록 보장합니다.

## Intlayer가 파일 콘텐츠를 처리하는 방법

`file` 함수는 Node.js의 `fs` 모듈을 기반으로 지정된 파일의 내용을 읽어 사전에 삽입합니다. Intlayer 비주얼 에디터나 CMS와 함께 사용될 때, Intlayer는 사전과 파일 간의 관계를 추적할 수 있습니다. 이를 통해 Intlayer는 다음을 수행할 수 있습니다:

- 콘텐츠가 특정 파일에서 비롯되었음을 인식합니다.
- 연결된 파일이 편집될 때 사전 콘텐츠를 자동으로 업데이트합니다.
- 파일과 사전 간의 동기화를 보장하여 콘텐츠의 무결성을 유지합니다.

## 추가 자료

Intlayer에서 파일 임베딩을 구성하고 사용하는 방법에 대한 자세한 내용은 다음 자료를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)
- [Markdown 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)
- 파일과 사전 간의 동기화를 보장하여 콘텐츠의 무결성을 유지합니다.

## 추가 자료

Intlayer에서 파일 임베딩을 구성하고 사용하는 방법에 대한 자세한 내용은 다음 자료를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)
- [마크다운 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)
- [번역 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)

이 자료들은 파일 임베딩, 콘텐츠 관리 및 Intlayer가 다양한 프레임워크와 통합되는 방법에 대한 추가적인 통찰을 제공합니다.
