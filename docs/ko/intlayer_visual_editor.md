# Intlayer Visual Editor Documentation

Intlayer Visual Editor는 비주얼 에디터를 사용하여 콘텐츠 선언 파일과 상호작용할 수 있도록 웹사이트를 래핑하는 도구입니다.

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/ko/assets/visual_editor.gif)

`intlayer-editor` 패키지는 Intlayer를 기반으로 하며, React (Create React App), Vite + React 및 Next.js와 같은 JavaScript 애플리케이션에서 사용할 수 있습니다.

## Visual editor vs CMS

Intlayer Visual editor는 로컬 사전의 콘텐츠를 비주얼 에디터에서 관리할 수 있도록 해주는 도구입니다. 변경이 일어나면 콘텐츠는 코드베이스에서 대체됩니다. 즉, 애플리케이션이 재구성되고 페이지가 새 콘텐츠를 표시하기 위해 새로고침됩니다.

반면, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)는 원격 사전의 콘텐츠를 비주얼 에디터에서 관리할 수 있게 해주는 도구입니다. 변경이 이루어지면 콘텐츠는 **코드베이스에 영향을 미치지 않습니다**. 그리고 웹사이트는 자동으로 변경된 콘텐츠를 표시합니다.

## Integrate Intlayer into your application

Intlayer를 통합하는 방법에 대한 자세한 내용은 아래의 관련 섹션을 참조하십시오:

### Integrating with Next.js

Next.js와의 통합에 대해서는 [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 참조하십시오.

### Integrating with Create React App

Create React App과의 통합에 대해서는 [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)를 참조하십시오.

### Integrating with Vite + React

Vite + React와의 통합에 대해서는 [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)를 참조하십시오.

## How Intlayer Editor Works

애플리케이션의 비주얼 에디터는 두 가지를 포함합니다:

- iframe에서 웹사이트를 표시할 프론트엔드 애플리케이션. 웹사이트가 Intlayer를 사용하는 경우, 비주얼 에디터는 자동으로 콘텐츠를 감지하고 상호작용할 수 있도록 해줍니다. 수정이 이루어지면 변경 사항을 다운로드할 수 있습니다.

- 다운로드 버튼을 클릭하면, 비주얼 에디터는 서버에 요청을 보내 콘텐츠 선언 파일을 새 콘텐츠로 대체합니다 (이 파일들이 프로젝트 내 어디에 선언되어 있든).

> 현재 Intlayer Editor는 콘텐츠 선언 파일을 JSON 파일로 작성합니다.

## Installation

Intlayer가 프로젝트에 구성된 후, `intlayer-editor`를 개발 종속성으로 간단히 설치하십시오:

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## Configuration

### 1. Intlayer.config.ts 파일에서 에디터 활성화

Intlayer 구성 파일에서 에디터 설정을 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 다른 구성 설정
  editor: {
    /**
     * 필수
     * 애플리케이션의 URL입니다.
     * 이것은 비주얼 에디터가 목표로 하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 선택 사항
     * 기본값은 `8000`입니다.
     * 에디터 서버의 포트입니다.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 선택 사항
     * 기본값은 "http://localhost:8000"입니다.
     * 에디터 서버의 URL입니다.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * 선택 사항
     * 기본값은 `true`입니다. `false`이면 에디터가 비활성화되고 접근할 수 없습니다.
     * 보안상의 이유로 특정 환경에서 에디터를 비활성화하는 데 사용될 수 있습니다, 예를 들어 프로덕션 환경.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 다른 구성 설정
  editor: {
   /**
     * 필수
     * 애플리케이션의 URL입니다.
     * 이것은 비주얼 에디터가 목표로 하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 선택 사항
     * 기본값은 `8000`입니다.
     * 에디터 서버의 포트입니다.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 선택 사항
     * 기본값은 "http://localhost:8000"입니다.
     * 에디터 서버의 URL입니다.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * 선택 사항
     * 기본값은 `true`입니다. `false`이면 에디터가 비활성화되고 접근할 수 없습니다.
     * 보안상의 이유로 특정 환경에서 에디터를 비활성화하는 데 사용될 수 있습니다, 예를 들어 프로덕션 환경.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 다른 구성 설정
  editor: {
   /**
     * 필수
     * 애플리케이션의 URL입니다.
     * 이것은 비주얼 에디터가 목표로 하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 선택 사항
     * 기본값은 `8000`입니다.
     * 에디터 서버의 포트입니다.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 선택 사항
     * 기본값은 "http://localhost:8000"입니다.
     * 에디터 서버의 URL입니다.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * 선택 사항
     * 기본값은 `true`입니다. `false`이면 에디터가 비활성화되고 접근할 수 없습니다.
     * 보안상의 이유로 특정 환경에서 에디터를 비활성화하는 데 사용될 수 있습니다, 예를 들어 프로덕션 환경.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> 사용 가능한 모든 매개변수를 보려면 [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

## Using the Editor

1. 에디터가 설치되면 다음 명령어로 에디터를 시작할 수 있습니다:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. 그러면 제공된 URL을 엽니다. 기본적으로 `http://localhost:8000`입니다.

   커서를 사용하여 콘텐츠 위에 올려둘 때 Intlayer에 의해 인덱싱된 각 필드를 볼 수 있습니다.

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/ko/assets/intlayer_editor_hover_content.png)

3. 콘텐츠의 경계가 표시되면 길게 눌러 편집 서랍을 표시할 수 있습니다.
