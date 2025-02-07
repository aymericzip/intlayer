# 시작하기 - 콘텐츠 선언

## 파일 확장자

기본적으로 Intlayer는 다음 확장자로 된 파일에서 콘텐츠 선언을 감시합니다:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

애플리케이션은 기본적으로 `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` 글롭 패턴과 일치하는 파일을 검색합니다.

이 기본 확장자는 대부분의 애플리케이션에 적합합니다. 그러나 특정 요구 사항이 있는 경우 [콘텐츠 확장자 사용자 지정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#content-configuration)를 참조하여 이를 관리하는 방법을 확인하세요.

구성 옵션의 전체 목록은 configuration 문서를 방문하세요.

## 콘텐츠 선언

사전(dictionaries)을 생성하고 관리하세요:

```tsx fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
    };
    multilingualContent: string;
    quantityContent: string;
    conditionalContent: string;
    nestedContent: string;
    markdownContent: string;
    externalContent: string;
  };
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "1대의 자동차",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화되었습니다",
      false: "검증이 비활성화되었습니다",
    }),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠의 경로
    ),
    externalContent: async () => await fetch("https://example.com"),
    markdownContent: md("# Markdown 예제"),

    /*
     * `react-intlayer` 또는 `next-intlayer`를 사용해야만 가능합니다.
     */
    jsxContent: <h1>My title</h1>,
  },
} satisfies Dictionary<Content>; // [선택 사항] Dictionary는 제네릭으로 제공되며 사전 포맷 강화를 허용합니다.
```

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "1대의 자동차",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화되었습니다",
      false: "검증이 비활성화되었습니다",
    }),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠의 경로
    ),
    markdownContent: md("# Markdown 예제"),
    externalContent: async () => await fetch("https://example.com"),

    // `react-intlayer` 또는 `next-intlayer`를 사용해야만 가능합니다.
    jsxContent: <h1>My title</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "1대의 자동차",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화되었습니다",
      false: "검증이 비활성화되었습니다",
    }),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠의 경로
    ),
    markdownContent: md("# Markdown 예제"),
    externalContent: async () => await fetch("https://example.com"),

    // `react-intlayer` 또는 `next-intlayer`를 사용해야만 가능합니다.
    jsxContent: <h1>My title</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hello World",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "자동차 없음",
        "1": "1대의 자동차",
        "<-1": "마이너스 1대 미만의 자동차",
        "-1": "마이너스 1대의 자동차",
        ">5": "몇 대의 자동차",
        ">19": "많은 자동차",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "검증이 활성화되었습니다",
        "false": "검증이 비활성화되었습니다",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown 예제",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["My title"],
      },
    },
  },
}
```

## 함수 중첩

함수를 다른 함수에 문제 없이 중첩하여 사용할 수 있습니다.

예시:

```javascript fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`을 반환합니다.
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 조건, 열거, 다국어 콘텐츠를 중첩한 복합 콘텐츠
    // `getIntlayer('page','en').advancedContent(true)(10)`은 '다수 항목 발견됨' 반환
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "항목 없음",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "1개 항목 발견됨",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "다수 항목 발견됨",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "유효한 데이터 없음",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example

```
