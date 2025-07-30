---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 열거형
description: 다국어 웹사이트에서 열거형을 선언하고 사용하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정할 수 있습니다.
keywords:
  - 열거형
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - 자바스크립트
  - 리액트
slugs:
  - doc
  - concept
  - content
  - enumeration
---

# 열거형 / 복수형 처리

## 열거형 작동 방식

Intlayer에서 열거형은 특정 키를 해당 콘텐츠에 매핑하는 `enu` 함수를 통해 구현됩니다. 이 키들은 숫자 값, 범위 또는 사용자 정의 식별자를 나타낼 수 있습니다. React Intlayer 또는 Next Intlayer와 함께 사용될 때, 애플리케이션의 로케일과 정의된 규칙에 따라 적절한 콘텐츠가 자동으로 선택됩니다.

## 열거형 설정하기

Intlayer 프로젝트에서 열거형을 설정하려면, 열거형 정의를 포함하는 콘텐츠 모듈을 생성해야 합니다. 다음은 자동차 수에 대한 간단한 열거형 예시입니다:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
      "fallback": "대체 값", // 선택 사항
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
      "fallback": "대체 값", // 선택 사항
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
      "fallback": "대체 값", // 선택 사항
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "마이너스 1대 미만의 자동차",
        "-1": "마이너스 한 대",
        "0": "자동차 없음",
        "1": "자동차 한 대",
        ">5": "몇 대의 자동차",
        ">19": "많은 자동차",
        "fallback": "대체 값" // 선택 사항
      }
    }
  }
}
```

이 예제에서 `enu`는 다양한 조건을 특정 콘텐츠에 매핑합니다. React 컴포넌트에서 사용할 때, Intlayer는 주어진 변수에 따라 적절한 콘텐츠를 자동으로 선택할 수 있습니다.

> Intlayer 열거형에서 선언 순서는 매우 중요합니다. 첫 번째로 유효한 선언이 선택됩니다. 여러 조건이 적용될 경우, 예상치 못한 동작을 방지하기 위해 올바른 순서로 정렬되어야 합니다.

> 대체 값(fallback)이 선언되지 않은 경우, 일치하는 키가 없으면 함수는 `undefined`를 반환합니다.

## React Intlayer에서 열거형 사용하기

React 컴포넌트에서 열거형을 사용하려면 `react-intlayer` 패키지의 `useIntlayer` 훅을 활용할 수 있습니다. 이 훅은 지정된 ID를 기반으로 올바른 콘텐츠를 가져옵니다. 사용 예시는 다음과 같습니다:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 출력: 자동차 없음
        }
      </p>
      <p>
        {
          numberOfCar(6) // 출력: 몇 대의 자동차
        }
      </p>
      <p>
        {
          numberOfCar(20) // 출력: 많은 자동차
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 출력: 대체 값
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 출력: 자동차 없음
        }
      </p>
      <p>
        {
          numberOfCar(6) // 출력: 몇 대의 자동차
        }
      </p>
      <p>
        {
          numberOfCar(20) // 출력: 많은 자동차
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 출력: 대체 값
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 출력: 자동차 없음
        }
      </p>
      <p>
        {
          numberOfCar(6) // 출력: 몇 대의 자동차
        }
      </p>
      <p>
        {
          numberOfCar(20) // 출력: 많은 자동차
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 출력: 대체 값
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

이 예제에서 컴포넌트는 자동차 수에 따라 동적으로 출력을 조정합니다. 지정된 범위에 따라 올바른 내용이 자동으로 선택됩니다.

## 추가 자료

구성 및 사용법에 대한 자세한 정보는 다음 자료를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

이 자료들은 다양한 환경과 여러 프레임워크에서 Intlayer의 설정 및 사용법에 대한 추가적인 통찰을 제공합니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
