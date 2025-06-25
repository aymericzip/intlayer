---
docName: dictionary__file
url: https://intlayer.org/doc/concept/content/file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/file.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: 파일
description: Intlayer의 `file` 함수를 사용하여 외부 파일을 콘텐츠 사전에 삽입하는 방법을 학습합니다. 이 문서에서는 Intlayer가 파일 콘텐츠를 동적으로 관리하는 방법을 설명합니다.
keywords:
  - 파일
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

## 파일 임베딩 작동 방식

Intlayer에서 `file` 함수는 외부 파일 콘텐츠를 딕셔너리에 임베딩할 수 있도록 합니다. 이 접근 방식은 Intlayer가 소스 파일을 인식하여 Intlayer Visual Editor 및 CMS와의 원활한 통합을 가능하게 합니다. 직접적인 `import`, `require` 또는 `fs` 파일 읽기 방법과는 달리, `file`을 사용하면 파일이 딕셔너리와 연결되어 파일이 편집될 때 콘텐츠를 동적으로 추적하고 업데이트할 수 있습니다.

## 파일 콘텐츠 설정

Intlayer 프로젝트에서 파일 콘텐츠를 임베딩하려면 콘텐츠 모듈에서 `file` 함수를 사용하십시오. 아래는 다양한 구현 방식을 보여주는 예제입니다.

### TypeScript 구현

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

### ECMAScript Module (ESM) 구현

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

### CommonJS 구현

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

### JSON 구성

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

## React Intlayer에서 파일 콘텐츠 사용

React 컴포넌트에서 임베딩된 파일 콘텐츠를 사용하려면 `react-intlayer` 패키지에서 `useIntlayer` 훅을 가져와 사용하십시오. 이를 통해 지정된 키에서 콘텐츠를 동적으로 가져와 표시할 수 있습니다.

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

## 다국어 Markdown 예제

다국어 편집 가능한 Markdown 파일을 지원하려면 `file`을 `t()` 및 `md()`와 결합하여 Markdown 콘텐츠 파일의 다양한 언어 버전을 정의할 수 있습니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ko: file("src/components/test.ko.md"),
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
        ko: file("src/components/test.ko.md"),
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
        ko: file("src/components/test.ko.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

이 설정을 통해 사용자의 언어 환경 설정에 따라 콘텐츠를 동적으로 가져올 수 있습니다. Intlayer Visual Editor 또는 CMS에서 사용될 때, 시스템은 콘텐츠가 지정된 Markdown 파일에서 비롯된 것을 인식하고 편집 가능하도록 유지합니다.

## Intlayer가 파일 콘텐츠를 처리하는 방식

`file` 함수는 Node.js의 `fs` 모듈을 기반으로 지정된 파일의 콘텐츠를 읽고 이를 딕셔너리에 삽입합니다. Intlayer Visual Editor 또는 CMS와 함께 사용될 때, Intlayer는 딕셔너리와 파일 간의 관계를 추적할 수 있습니다. 이를 통해 Intlayer는 다음을 수행할 수 있습니다:

- 콘텐츠가 특정 파일에서 비롯된 것을 인식합니다.
- 연결된 파일이 편집될 때 딕셔너리 콘텐츠를 자동으로 업데이트합니다.
- 파일과 딕셔너리 간의 동기화를 보장하여 콘텐츠의 무결성을 유지합니다.

## 추가 자료

Intlayer에서 파일 임베딩을 구성하고 사용하는 방법에 대한 자세한 내용은 다음 자료를 참조하십시오:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)
- [Markdown 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/markdown.md)
- [번역 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/translation.md)

이 자료들은 파일 임베딩, 콘텐츠 관리 및 Intlayer의 다양한 프레임워크와의 통합에 대한 추가적인 통찰력을 제공합니다.
