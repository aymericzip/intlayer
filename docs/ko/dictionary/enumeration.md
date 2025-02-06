# 열거형 / 복수형

## 열거형 작동 방식

Intlayer에서 열거형은 `enu` 함수를 통해 구현되며, 특정 키를 해당 콘텐츠에 매핑합니다. 이러한 키는 숫자 값, 범위 또는 사용자 정의 식별자를 나타낼 수 있습니다. React Intlayer 또는 Next Intlayer와 함께 사용될 때, 적절한 콘텐츠는 애플리케이션의 로캘 및 정의된 규칙에 따라 자동으로 선택됩니다.

## 열거형 설정하기

Intlayer 프로젝트에서 열거형을 설정하려면 열거형 정의를 포함하는 콘텐츠 모듈을 생성해야 합니다. 다음은 자동차 수에 대한 간단한 열거형의 예입니다:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "마이너스 한 대보다 적은 차",
      "-1": "마이너스 한 대 차",
      "0": "차 없음",
      "1": "한 대 차",
      ">5": "몇 대 차",
      ">19": "많은 차",
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
      "<-1": "마이너스 한 대보다 적은 차",
      "-1": "마이너스 한 대 차",
      "0": "차 없음",
      "1": "한 대 차",
      ">5": "몇 대 차",
      ">19": "많은 차",
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type Dictionary } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "마이너스 한 대보다 적은 차",
      "-1": "마이너스 한 대 차",
      "0": "차 없음",
      "1": "한 대 차",
      ">5": "몇 대 차",
      ">19": "많은 차",
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
      "<-1": "마이너스 한 대보다 적은 차",
      "-1": "마이너스 한 대 차",
      "0": "차 없음",
      "1": "한 대 차",
      ">5": "몇 대 차",
      ">19": "많은 차"
    }
  }
}
```

이 예제에서 `enu`는 다양한 조건을 특정 콘텐츠에 매핑합니다. React 구성 요소에서 사용될 때, Intlayer는 주어진 변수에 따라 적절한 콘텐츠를 자동으로 선택할 수 있습니다.

## React Intlayer와 함께 열거형 사용하기

React 구성 요소에서 열거형을 사용하려면 `react-intlayer` 패키지의 `useIntlayer` 훅을 활용할 수 있습니다. 이 훅은 지정된 ID에 따라 올바른 콘텐츠를 검색합니다. 다음은 사용 예입니다:

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 출력: 차 없음 */}
      <p>{content.numberOfCar(6)}</p> {/* 출력: 몇 대 차 */}
      <p>{content.numberOfCar(20)}</p> {/* 출력: 몇 대 차 */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 출력: 차 없음 */}
      <p>{content.numberOfCar(6)}</p> {/* 출력: 몇 대 차 */}
      <p>{content.numberOfCar(20)}</p> {/* 출력: 몇 대 차 */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 출력: 차 없음 */}
      <p>{content.numberOfCar(6)}</p> {/* 출력: 몇 대 차 */}
      <p>{content.numberOfCar(20)}</p> {/* 출력: 몇 대 차 */}
    </div>
  );
};

module.exports = CarComponent;
```

이 예제에서 구성 요소는 자동차 수에 따라 출력이 동적으로 조정됩니다. 지정된 범위에 따라 올바른 콘텐츠가 자동으로 선택됩니다.

## 중요 사항

- 열거형의 선언 순서는 Intlayer에서 매우 중요합니다. 첫 번째 유효한 선언이 선택됩니다.
- 여러 조건이 적용되는 경우 예기치 않은 동작을 방지하기 위해 올바른 순서로 정렬되어야 합니다.

## 열거형에 대한 모범 사례

열거형이 예상대로 작동하도록 하려면 다음 모범 사례를 따르십시오:

- **일관된 네이밍**: 혼동을 피하기 위해 열거형 모듈에 대해 명확하고 일관된 ID를 사용하십시오.
- **문서화**: 향후 유지 관리를 보장하기 위해 열거형 키와 그 예상 출력을 문서화하십시오.
- **오류 처리**: 유효한 열거형이 발견되지 않는 경우를 관리하기 위해 오류 처리를 구현하십시오.
- **성능 최적화**: 대규모 애플리케이션의 경우 성능 향상을 위해 감시 파일 확장자의 수를 줄이십시오.

## 추가 자료

구성 및 사용에 대한 더 상세한 정보는 다음 자료를 참조하십시오:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)

이 자료들은 다양한 환경 및 여러 프레임워크에서 Intlayer의 설정 및 사용에 대한 추가 정보를 제공합니다.
