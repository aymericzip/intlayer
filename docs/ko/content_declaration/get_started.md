# 시작하기 콘텐츠 선언

## 프로젝트에 Intlayer 구성하기

[NextJS와 함께 intlayer 사용하는 방법 보기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)

[ReactJS와 함께 intlayer 사용하는 방법 보기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)

[Vite와 React와 함께 intlayer 사용하는 방법 보기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)

## 패키지 설치

필요한 패키지를 npm을 사용하여 설치합니다:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## 콘텐츠 관리

콘텐츠 사전을 생성하고 관리합니다:

### TypeScript 사용

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars",
      }),
    },
  },
} satisfies DeclarationContent;

// 콘텐츠는 기본으로 내보내야 합니다
export default pageContent;
```

### ECMAScript 모듈 사용

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      0: "No cars",
      1: "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

// 콘텐츠는 기본으로 내보내야 합니다
export default pageContent;
```

### CommonJS 모듈 사용

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      0: "No cars",
      1: "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

// 콘텐츠는 기본으로 내보내야 합니다
module.exports = pageContent;
```

### JSON 사용

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    },
  },
}
```

경고, JSON 콘텐츠 선언은 [기능 가져오기 구현을 불가능하게 합니다](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/function_fetching.md)
