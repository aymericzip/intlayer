---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 사전 | 시작하기
description: 다국어 웹사이트에서 사전을 선언하고 사용하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정할 수 있습니다.
keywords:
  - 시작하기
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
---

# 콘텐츠 선언 시작하기

<iframe title="i18n, Markdown, JSON… 모든 것을 관리하는 단일 솔루션 | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## 파일 확장자

기본적으로 Intlayer는 다음 확장자를 가진 모든 파일을 콘텐츠 선언용으로 감시합니다:

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

이 기본 확장자는 대부분의 애플리케이션에 적합합니다. 그러나 특정 요구 사항이 있는 경우, 이를 관리하는 방법에 대한 지침은 [콘텐츠 확장자 커스터마이징 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#content-configuration)를 참조하세요.

전체 구성 옵션 목록은 구성 문서를 방문하세요.

## 콘텐츠 선언하기

사전을 생성하고 관리하세요:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

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
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // 현재 환경 변수 값
      },
    },
    multilingualContent: t({
      en: "영어 콘텐츠",
      "en-GB": "영국 영어 콘텐츠",
      fr: "프랑스어 콘텐츠",
      es: "스페인어 콘텐츠",
    }),
    quantityContent: enu({
      "<-1": "마이너스 1보다 작은 자동차",
      "-1": "마이너스 1 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화됨",
      false: "검증이 비활성화됨",
    }),
    insertionContent: insert("안녕하세요 {{name}}!"),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠 경로
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# 마크다운 예제"),

    /*
     * `react-intlayer` 또는 `next-intlayer` 사용 시에만 사용 가능
     */
    jsxContent: <h1>내 제목</h1>,
  },
} satisfies Dictionary<Content>; // [선택 사항] Dictionary는 제네릭이며 사전의 형식을 강화할 수 있습니다.
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // 현재 노드 환경 변수
      },
      imbricatedArray: [1, 2, 3], // 중첩 배열
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "마이너스 1보다 작은 자동차",
      "-1": "마이너스 1 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화됨",
      false: "검증이 비활성화됨",
    }),
    insertionContent: insert("안녕하세요 {{name}}!"),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠 경로
    ),
    markdownContent: md("# 마크다운 예제"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` 또는 `next-intlayer`를 사용할 때만 사용 가능
    jsxContent: <h1>내 제목</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World", // 문자열 내용
        numberContent: 123, // 숫자 내용
        booleanContent: true, // 불리언 내용
        javaScriptContent: `${process.env.NODE_ENV}`, // 자바스크립트 내용
      },
      imbricatedArray: [1, 2, 3], // 중첩 배열
    },
    multilingualContent: t({
      en: "English content", // 영어 내용
      "en-GB": "English content (UK)", // 영국 영어 내용
      fr: "French content", // 프랑스어 내용
      es: "Spanish content", // 스페인어 내용
    }),
    quantityContent: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화됨",
      false: "검증이 비활성화됨",
    }),
    insertionContent: insert("안녕하세요 {{name}}!"),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠 경로
    ),
    markdownContent: md("# 마크다운 예제"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

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
        "stringContent": "안녕하세요 세계",
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
        "0": "차가 없습니다",
        "1": "한 대의 차",
        "<-1": "마이너스 1대 미만의 차",
        "-1": "마이너스 한 대의 차",
        ">5": "몇 대의 차",
        ">19": "많은 차",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "검증이 활성화됨",
        "false": "검증이 비활성화됨",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "안녕하세요 {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# 마크다운 예제",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
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

## 함수 중첩 (Function imbrication)

함수들을 다른 함수 안에 문제없이 중첩할 수 있습니다.

예시:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`를 반환합니다
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 조건, 열거형, 다국어 콘텐츠를 중첩한 복합 콘텐츠
    // `getIntlayer('page','en').advancedContent(true)(10)`는 'Multiple items found'를 반환합니다
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

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
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
    // 조건, 열거형, 다국어 콘텐츠를 중첩한 복합 콘텐츠
    // `getIntlayer('page','en').advancedContent(true)(10)`는 'Multiple items found'를 반환합니다.
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
          en: "여러 항목이 발견되었습니다",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "유효한 데이터가 없습니다",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`를 반환합니다
    hiMessage: [
      t({
        en: "안녕하세요",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 조건, 열거형, 다국어 콘텐츠를 중첩한 복합 콘텐츠
    // `getIntlayer('page','en').advancedContent(true)(10)`는 'Multiple items found'를 반환합니다
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
            en: "Hi", // 인사말
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe", // 사용자 이름
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
                "ko": "항목이 없습니다",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "ko": "항목 1개 발견",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "ko": "여러 항목 발견",
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

## 추가 자료

Intlayer에 대한 자세한 내용은 다음 자료를 참조하십시오:

- [지역별 콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/per_locale_file.md)
- [번역 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)
- [열거형 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration.md)
- [조건 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/condition.md)
- [삽입 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md)
- [파일 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/file.md)
- [중첩 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/nesting.md)
- [마크다운 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)
- [함수 호출 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/function_fetching.md)

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
