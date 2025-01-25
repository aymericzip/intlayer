# Intlayer 콘텐츠 관리 시스템 (CMS) 문서

Intlayer CMS는 Intlayer 프로젝트의 콘텐츠를 외부화할 수 있는 애플리케이션입니다.

이를 위해 Intlayer는 '원거리 사전'의 개념을 도입합니다.

## 원거리 사전 이해하기

Intlayer는 '로컬' 사전과 '원거리' 사전의 차이를 구분합니다.

- '로컬' 사전은 Intlayer 프로젝트에 선언된 사전입니다. 예를 들어 버튼의 선언 파일이나 내비게이션 바와 같습니다. 이 경우 콘텐츠를 외부화하는 것은 의미가 없습니다. 왜냐하면 이 콘텐츠는 자주 변경될 것으로 예상되지 않기 때문입니다.

- '원거리' 사전은 Intlayer CMS를 통해 관리되는 사전입니다. 이는 팀이 웹사이트에서 직접 콘텐츠를 관리할 수 있도록 하며, A/B 테스트 기능과 SEO 자동 최적화를 사용할 수 있도록 하는 목적을 갖습니다.

## 비주얼 편집기 vs CMS

[Intlayer 비주얼](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md) 편집기는 로컬 사전을 위한 비주얼 편집기에서 콘텐츠를 관리할 수 있는 도구입니다. 변경이 이루어지면, 콘텐츠는 코드베이스에서 교체됩니다. 이는 애플리케이션이 재구성되고 페이지가 새 콘텐츠를 표시하기 위해 다시 로드됨을 의미합니다.

반대로 Intlayer CMS는 원거리 사전을 위한 비주얼 편집기에서 콘텐츠를 관리하는 도구입니다. 변경이 이루어지면, 콘텐츠는 **코드베이스에 영향을 미치지 않습니다**. 웹사이트는 변경된 콘텐츠를 자동으로 표시합니다.

## 통합

패키지를 설치하는 방법에 대한 자세한 내용은 아래의 관련 섹션을 참조하세요:

### Next.js와 통합하기

Next.js와의 통합에 대해서는 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 참조하세요.

### Create React App과 통합하기

Create React App과의 통합에 대해서는 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)를 참조하세요.

### Vite + React과 통합하기

Vite + React와의 통합에 대해서는 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)를 참조하세요.

## 구성

### 1. intlayer.config.ts 파일에서 편집기 활성화

Intlayer 구성 파일에서 편집기 설정을 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 구성 설정
  editor: {
    /**
     * 클라이언트 ID와 클라이언트 비밀번호는 편집기를 활성화하는 데 필요합니다.
     * 이들은 콘텐츠를 편집하는 사용자를 식별할 수 있도록 합니다.
     * Intlayer 대시보드 - 프로젝트에서 새로운 클라이언트를 생성하여 얻을 수 있습니다. (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * 선택 사항
     * 기본값은 `true`입니다. `false`인 경우, 편집기는 비활성화되며 접근할 수 없습니다.
     * 보안상의 이유로 특정 환경(예: 프로덕션)에 대해 편집기를 비활성화하는 데 사용할 수 있습니다.
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
  // ... 기타 구성 설정
  editor: {
    /**
     * 클라이언트 ID와 클라이언트 비밀번호는 편집기를 활성화하는 데 필요합니다.
     * 이들은 콘텐츠를 편집하는 사용자를 식별할 수 있도록 합니다.
     * Intlayer 대시보드 - 프로젝트에서 새로운 클라이언트를 생성하여 얻을 수 있습니다. (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,    /**
     * 선택 사항
     * 기본값은 `true`입니다. `false`인 경우, 편집기는 비활성화되며 접근할 수 없습니다.
     * 보안상의 이유로 특정 환경(예: 프로덕션)에 대해 편집기를 비활성화하는 데 사용할 수 있습니다.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기타 구성 설정
  editor: {
    /**
     * 클라이언트 ID와 클라이언트 비밀번호는 편집기를 활성화하는 데 필요합니다.
     * 이들은 콘텐츠를 편집하는 사용자를 식별할 수 있도록 합니다.
     * Intlayer 대시보드 - 프로젝트에서 새로운 클라이언트를 생성하여 얻을 수 있습니다. (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * 선택 사항
     * 기본값은 `true`입니다. `false`인 경우, 편집기는 비활성화되며 접근할 수 없습니다.
     * 보안상의 이유로 특정 환경(예: 프로덕션)에 대해 편집기를 비활성화하는 데 사용할 수 있습니다.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> 클라이언트 ID와 클라이언트 비밀번호가 없는 경우, [Intlayer 대시보드 - 프로젝트](https://intlayer.org/dashboard/projects)에서 새로운 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 보려면 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

## CMS 사용하기

편집기가 설치되면, 마우스를 콘텐츠 위에 가져다 대면 Intlayer에 의해 색인된 각 필드를 볼 수 있습니다.

![콘텐츠 위에 마우스를 가져다 대기](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

콘텐츠가 강조 표시된 경우, 편집 서랍을 표시하기 위해 길게 눌러야 합니다.
