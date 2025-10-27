---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: 성별 기반 콘텐츠
description: Intlayer에서 성별 기반 콘텐츠를 사용하여 성별에 따라 동적으로 콘텐츠를 표시하는 방법을 알아보세요. 이 문서를 따라 프로젝트에서 성별별 콘텐츠를 효율적으로 구현할 수 있습니다.
keywords:
  - 성별 기반 콘텐츠
  - 동적 렌더링
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: 성별 기반 콘텐츠 도입
---

# 성별 기반 콘텐츠 / Intlayer의 성별

## 성별 작동 방식

Intlayer에서는 `gender` 함수를 통해 성별 기반 콘텐츠를 구현합니다. 이 함수는 특정 성별 값('male', 'female')을 해당하는 콘텐츠에 매핑합니다. 이 방식을 통해 주어진 성별에 따라 동적으로 콘텐츠를 선택할 수 있습니다. React Intlayer 또는 Next Intlayer와 통합하면, 런타임에 제공된 성별에 따라 적절한 콘텐츠가 자동으로 선택됩니다.

## 성별 기반 콘텐츠 설정

Intlayer 프로젝트에서 성별 기반 콘텐츠를 설정하려면, 성별별 정의를 포함하는 콘텐츠 모듈을 생성하세요. 아래는 다양한 형식의 예시입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "남성 사용자용 콘텐츠",
      female: "여성 사용자용 콘텐츠",
      fallback: "성별이 지정되지 않았을 때의 콘텐츠", // 선택 사항
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "남성 사용자용 콘텐츠",
      female: "여성 사용자용 콘텐츠",
      fallback: "성별이 지정되지 않았을 때의 콘텐츠", // 선택 사항
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "남성 사용자용 콘텐츠",
      female: "여성 사용자용 콘텐츠",
      fallback: "성별이 지정되지 않았을 때의 콘텐츠", // 선택 사항
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "남성 사용자용 콘텐츠",
        "female": "여성 사용자용 콘텐츠",
        "fallback": "성별이 지정되지 않았을 때의 콘텐츠", // 선택 사항
      },
    },
  },
}
```

> 만약 fallback이 선언되지 않았다면, 성별이 지정되지 않았거나 정의된 성별과 일치하지 않을 경우 마지막으로 선언된 키가 fallback으로 사용됩니다.

## React Intlayer에서 성별 기반 콘텐츠 사용하기

React 컴포넌트 내에서 성별 기반 콘텐츠를 활용하려면, `react-intlayer` 패키지에서 `useIntlayer` 훅을 임포트하여 사용하세요. 이 훅은 지정된 키에 대한 콘텐츠를 가져오며, 적절한 출력을 선택하기 위해 성별을 전달할 수 있습니다.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: 남성 사용자용 콘텐츠 */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 출력: 여성 사용자용 내 콘텐츠 */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 출력: 남성 사용자용 내 콘텐츠 */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 출력: 여성 사용자용 내 콘텐츠 */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 출력: 성별이 지정되지 않았을 때 내 콘텐츠 */
          myGender("")
        }
      </p>
      <p>
        {
          /* 출력: 성별이 지정되지 않았을 때 내 콘텐츠 */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: 남성 사용자용 내 콘텐츠 */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 출력: 여성 사용자용 내 콘텐츠 */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 출력: 남성 사용자용 내 콘텐츠 */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 출력: 여성 사용자용 내 콘텐츠 */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 출력: 성별이 지정되지 않았을 때 내 콘텐츠 */
          myGender("")
        }
      </p>
      <p>
        {
          /* 출력: 성별이 지정되지 않았을 때 내 콘텐츠 */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: 남성 사용자용 콘텐츠 */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 출력: 여성 사용자용 콘텐츠 */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 출력: 남성 사용자용 콘텐츠 */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 출력: 여성 사용자용 콘텐츠 */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 출력: 성별이 지정되지 않았을 때의 내 콘텐츠 */
          myGender("")
        }
      </p>
      <p>
        {
          /* 출력: 성별이 지정되지 않았을 때의 내 콘텐츠 */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## 추가 자료

설정 및 사용법에 대한 자세한 정보는 다음 자료를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

이 자료들은 다양한 환경과 프레임워크에서 Intlayer의 설정 및 사용에 대한 추가적인 통찰을 제공합니다.
