# 국제화(Intlayer와 i18next 사용)

i18next는 자바스크립트 애플리케이션을 위한 오픈 소스 국제화(i18n) 프레임워크입니다. 소프트웨어 프로젝트에서 번역, 지역화 및 언어 전환을 관리하는 데 널리 사용됩니다. 그러나 확장성과 개발을 복잡하게 만들 수 있는 몇 가지 제한 사항이 있습니다.

Intlayer는 이러한 제한 사항을 해결하는 또 다른 국제화 프레임워크로, 콘텐츠 선언 및 관리에 대한 보다 유연한 접근 방식을 제공합니다. i18next와 Intlayer의 몇 가지 주요 차이점과 최적의 국제화를 위해 두 가지를 구성하는 방법을 살펴보겠습니다.

## Intlayer와 i18next: 주요 차이점

### 1. 콘텐츠 선언

i18next에서는 번역 사전을 특정 폴더에 선언해야 하므로 애플리케이션의 확장성을 복잡하게 만들 수 있습니다. 반면, Intlayer는 콘텐츠를 구성 요소와 동일한 디렉터리에 선언할 수 있게 해줍니다. 이는 여러 가지 장점을 제공합니다:

- **간편한 콘텐츠 편집**: 사용자는 편집할 올바른 사전을 찾을 필요가 없으며, 오류의 가능성이 줄어듭니다.
- **자동 적응**: 구성 요소의 위치가 변경되거나 제거되면 Intlayer가 이를 감지하고 자동으로 적응합니다.

### 2. 구성 복잡성

i18next를 구성하는 것은 복잡할 수 있으며, 특히 서버 측 구성 요소와 통합하거나 Next.js와 같은 프레임워크에 대한 미들웨어를 구성할 때 더욱 그렇습니다. Intlayer는 이 프로세스를 단순화하여 보다 직관적인 구성을 제공합니다.

### 3. 번역 사전의 일관성

서로 다른 언어 간 번역 사전의 일관성을 보장하는 것은 i18next에서 도전이 될 수 있습니다. 이러한 불일치는 제대로 처리되지 않을 경우 애플리케이션 충돌을 초래할 수 있습니다. Intlayer는 번역된 콘텐츠에 대한 제약을 강제함으로써 이를 해결하며, 번역이 누락되지 않고 번역된 콘텐츠의 정확성을 보장합니다.

### 4. TypeScript 통합

Intlayer는 TypeScript와의 통합이 더 잘 이루어져 있어, 코드에서 콘텐츠의 자동 제안을 가능하게 하여 개발 효율성을 향상시킵니다.

### 5. 애플리케이션 간 콘텐츠 공유

Intlayer는 여러 애플리케이션과 공유 라이브러리 간의 콘텐츠 선언 파일 공유를 촉진합니다. 이 기능은 더 큰 코드베이스에서 일관된 번역을 유지하는 데 도움이 됩니다.

## Intlayer로 i18next 사전 생성하는 방법

### Intlayer를 구성하여 i18next 사전 내보내기

> 중요 사항
> i18next 사전의 내보내기는 현재 베타 단계이며 다른 프레임워크와 1:1 호환성을 보장하지 않습니다. 문제를 최소화하기 위해 Intlayer 기반의 구성에 고수하는 것이 좋습니다.

i18next 사전을 내보내려면 Intlayer를 적절하게 구성해야 합니다. 다음은 Intlayer를 설정하여 Intlayer 및 i18next 사전을 모두 내보내는 방법의 예입니다.

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // Intlayer가 Intlayer 및 i18next 사전 모두를 내보낼 것임을 나타냅니다.
    dictionaryOutput: ["intlayer", "i18next"],
    // i18n 사전이 내보내질 디렉터리까지의 프로젝트 루트의 상대 경로
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

구성에 'i18next'를 포함함으로써 Intlayer는 Intlayer 사전 외에 전용 i18next 사전을 생성합니다. 구성에서 'intlayer'를 제거하면 React-Intlayer 또는 Next-Intlayer와의 호환성이 끊어질 수 있습니다.

### i18next 구성에 사전 가져오기

생성된 사전을 i18next 구성으로 가져오려면 'i18next-resources-to-backend'를 사용할 수 있습니다. 다음은 i18next 사전을 가져오는 방법의 예입니다.

```typescript
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // 귀하의 i18next 구성
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```
