# 콘텐츠 선언 시작하기

## 파일 확장자

기본적으로 Intlayer는 다음 확장자를 가진 모든 파일에서 콘텐츠 선언을 관찰합니다:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

응용 프로그램은 기본적으로 `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` 글로브 패턴과 일치하는 파일을 검색합니다.

이러한 기본 확장자는 대부분의 응용 프로그램에 적합합니다. 그러나 특정 요구 사항이 있는 경우, [콘텐츠 확장자 사용자 정의 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#content-configuration)를 참조하여 이를 관리하는 방법에 대한 지침을 확인하십시오.

구성 옵션의 전체 목록은 구성 문서를 방문하십시오.

## 콘텐츠 선언하기

콘텐츠 사전을 생성하고 관리하십시오:

```typescript fileName="src/app/[locale]/page.content.ts" codeFormat="typescript"
import { t, enu, type Dictionary } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "편집하여 시작하십시오",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "한 대 미만의 자동차",
      "-1": "한 대의 자동차",
      "0": "자동차 없음",
      "1": "한 대의 자동차",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
  },
} satisfies Dictionary<Content>;
```

```javascript fileName="src/app/[locale]/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "편집하여 시작하십시오",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "한 대 미만의 자동차",
      "-1": "한 대의 자동차",
      0: "자동차 없음",
      1: "한 대의 자동차",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
  },
};
```

```javascript fileName="src/app/[locale]/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "편집하여 시작하십시오",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "한 대 미만의 자동차",
      "-1": "한 대의 자동차",
      0: "자동차 없음",
      1: "한 대의 자동차",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
  },
};
```

```json5 fileName="src/app/[locale]/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "편집하여 시작하십시오",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "한 대 미만의 자동차",
        "-1": "한 대의 자동차",
        "0": "자동차 없음",
        "1": "한 대의 자동차",
        ">5": "몇 대의 자동차",
        ">19": "많은 자동차",
      },
    },
  },
}
```
