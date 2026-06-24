---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Transloco에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Angular 애플리케이션을 Transloco에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Transloco에서 Intlayer로 마이그레이션

Angular 애플리케이션이 현재 `@jsverse/transloco`를 사용하는 경우 compat adapter를 사용하여 Intlayer로 마이그레이션할 수 있습니다. 이 전환을 통해 기존 template 구문을 유지하면서 Intlayer의 강력한 dictionary 구조를 활용할 수 있습니다.

## 해야 할 일

프로젝트에서 initialization 명령을 실행하세요:

```bash
npx intlayer init
```

필요한 `intlayer.config.ts` 설정이 생성됩니다. 그런 다음 Transloco imports를 `@intlayer/transloco` modules로 바꾸거나 build aliases에 의존할 수 있습니다.

## 내부적으로 어떻게 작동하는지

Transloco는 scopes와 `TranslocoService` (`translate`, `selectTranslate`), structural directives (`*transloco="let t"`), pipes (`| transloco`)를 사용합니다.

내부적으로:

- **Scopes:** Intlayer dictionary keys에 자연스럽게 매핑되어 bundle optimization을 위한 훌륭한 pruning 옵션을 제공합니다.
- **Service & Directives:** Intlayer의 Angular adapter는 providers를 완벽하게 교체하여 기존 template pipes와 directives가 Intlayer dictionaries에 대해 strings를 resolve할 수 있게 합니다.
- **Build time parsing:** TypeScript analyzer는 `instant/get` 호출을 인식하고 fallback pruning은 template 사용이 정적으로 추적 불가능한 경우에도 정확성을 보장합니다.
