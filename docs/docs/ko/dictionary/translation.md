---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 번역
description: 다국어 웹사이트에서 번역을 선언하고 사용하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정할 수 있습니다.
keywords:
  - 번역
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
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# 번역

## 번역 정의하기

`intlayer`의 `t` 함수는 여러 언어로 콘텐츠를 선언할 수 있게 해줍니다. 이 함수는 타입 안전성을 보장하며, 번역이 누락된 경우 오류를 발생시켜 특히 TypeScript 환경에서 유용합니다.

다음은 번역이 포함된 콘텐츠를 선언하는 예시입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## 로케일 구성

적절한 번역 처리를 보장하기 위해 `intlayer.config.ts`에서 허용되는 로케일을 구성할 수 있습니다. 이 구성은 애플리케이션이 지원하는 언어를 정의할 수 있게 합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## 로케일 구성

적절한 번역 처리를 보장하기 위해 `intlayer.config.ts`에서 허용되는 로케일을 구성할 수 있습니다. 이 구성은 애플리케이션이 지원하는 언어를 정의할 수 있게 해줍니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

module.exports = config;
```

## React 컴포넌트에서 번역 사용하기

`react-intlayer`를 사용하면 React 컴포넌트 내에서 번역을 사용할 수 있습니다. 다음은 예시입니다:

```jsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p> {/* 현재 로케일에 맞는 환영 메시지를 표시합니다 */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>{" "}
      {/* 현재 로케일에 맞는 환영 메시지를 표시합니다 */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>{" "}
      {/* 현재 로케일에 맞는 환영 메시지를 표시합니다 */}
    </div>
  );
};

module.exports = MyComponent;
```

이 컴포넌트는 애플리케이션에 설정된 현재 로케일에 따라 해당 번역을 가져옵니다.

## 사용자 정의 콘텐츠 객체

`intlayer`는 번역을 위한 사용자 정의 콘텐츠 객체를 지원하여, 더 복잡한 구조를 정의하면서 타입 안전성을 보장할 수 있습니다. 다음은 사용자 정의 객체의 예시입니다:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title",
        content: "Page Content",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies Dictionary;

export default customContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

export default {
  key: "custom_content",
  content: {
    profileText:
      t <
      ICustomContent >
      {
        en: {
          title: "페이지 제목",
          content: "페이지 내용",
        },
        fr: {
          title: "Titre de la Page",
          content: "Contenu de la Page",
        },
        es: {
          title: "Título de la Página",
          content: "Contenido de la Página",
        },
      },
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "custom_content",
  content: {
    profileText:
      t <
      ICustomContent >
      {
        en: {
          title: "Page Title",
          content: "Page Content",
        },
        fr: {
          title: "Titre de la Page",
          content: "Contenu de la Page",
        },
        es: {
          title: "Título de la Página",
          content: "Contenido de la Página",
        },
      },
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "custom_content",
  "content": {
    "profileText": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "title": "Page Title",
          "content": "페이지 내용"
        },
        "fr": {
          "title": "페이지 제목",
          "content": "페이지 내용"
        },
        "es": {
          "title": "페이지 제목",
          "content": "페이지 내용"
        }
      }
    }
  }
}
```
