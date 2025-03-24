# 시작하기: 콘텐츠 선언

## 파일 확장자

기본적으로 Intlayer는 콘텐츠 선언을 위해 다음 확장자를 가진 모든 파일을 감시합니다:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

애플리케이션은 기본적으로 `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` 글로브 패턴과 일치하는 파일을 검색합니다.

이 기본 확장자는 대부분의 애플리케이션에 적합합니다. 그러나 특정 요구 사항이 있는 경우 [콘텐츠 확장자 사용자 정의 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#content-configuration)를 참조하여 이를 관리하는 방법을 확인하세요.

구성 옵션의 전체 목록은 구성 문서를 참조하세요.

## 콘텐츠 선언하기

사전(dictionary)을 생성하고 관리하세요:

```tsx fileName="src/example.content.ts" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  externalContent: string;
  insertionContent: string;
  fileContent: string;
  nestedContent: any;
  markdownContent: any;
  jsxContent: any;
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
      true: "유효성 검사가 활성화되었습니다",
      false: "유효성 검사가 비활성화되었습니다",
    }),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠의 경로
    ),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())
    markdownContent: md("# Markdown 예제"),

    /*
     * `react-intlayer` 또는 `next-intlayer`를 사용할 때만 사용 가능
     */
    jsxContent: <h1>내 제목</h1>,
  },
} satisfies Dictionary<Content>; // [선택 사항] Dictionary는 제네릭으로 사전의 형식을 강화할 수 있습니다.
```

```javascript fileName="src/example.content.mjs" contentDeclarationFormat="esm"
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
      true: "유효성 검사가 활성화되었습니다",
      false: "유효성 검사가 비활성화되었습니다",
    }),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠의 경로
    ),
    markdownContent: md("# Markdown 예제"),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` 또는 `next-intlayer`를 사용할 때만 사용 가능
    jsxContent: <h1>내 제목</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" contentDeclarationFormat="commonjs"
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
      true: "유효성 검사가 활성화되었습니다",
      false: "유효성 검사가 비활성화되었습니다",
    }),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠의 경로
    ),
    markdownContent: md("# Markdown 예제"),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` 또는 `next-intlayer`를 사용할 때만 사용 가능
    jsxContent: <h1>내 제목</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
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
        "true": "유효성 검사가 활성화되었습니다",
        "false": "유효성 검사가 비활성화되었습니다",
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
        "children": ["내 제목"],
      },
    },
  },
}
```

## 함수 중첩

함수를 다른 함수 안에 문제없이 중첩할 수 있습니다.

예제:

```javascript fileName="src/example.content.ts" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`를 반환합니다.
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
    // `getIntlayer('page','en').advancedContent(true)(10)`은 'Multiple items found'를 반환합니다.
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjs" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`를 반환합니다.
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
    // `getIntlayer('page','en').advancedContent(true)(10)`은 'Multiple items found'를 반환합니다.
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjs" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`를 반환합니다.
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
    // `getIntlayer('page','en').advancedContent(true)(10)`은 'Multiple items found'를 반환합니다.
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```
