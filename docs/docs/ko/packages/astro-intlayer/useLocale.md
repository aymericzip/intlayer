---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale 훅 문서 | astro-intlayer
description: Astro 애플리케이션에서 useLocale 훅을 사용하여 현재 로케일에 액세스하고 관리하는 방법을 알아봅니다.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "초기 문서"
author: aymericzip
---

# useLocale 훅 문서

`astro-intlayer`의 `useLocale` 훅은 Astro 애플리케이션에서 현재 요청 로케일, 구성된 기본 로케일 및 사용 가능한 모든 로케일에 대한 액세스를 제공합니다.

서버 렌더링된 `.astro` 프론트매터와 클라이언트 측 `<script>` 블록 전반에서 일관되게 동작합니다.

## 사용법

### 컴포넌트 프론트매터에서 (서버 렌더링)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>현재: {locale}</span>
      <span>기본값: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### 클라이언트 `<script>`에서 (인터랙티브)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## 반환값

이 훅은 `UseLocaleResult` 타입의 객체를 반환합니다:

| 속성               | 타입                                   | 설명                                                                                          |
| ------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | 활성 로케일.                                                                                  |
| `defaultLocale`    | `DeclaredLocales`                      | `intlayer.config.ts`에 구성된 기본 대체 로케일.                                               |
| `availableLocales` | `DeclaredLocales[]`                    | 프로젝트에 구성된 지원되는 모든 로케일의 배열.                                                |
| `setLocale`        | `(locale: LocalesValues) => void`      | 로케일을 업데이트하는 함수. (클라이언트 `<script>`에서 대화형으로 작동하며, SSR 중에는 경고). |
| `subscribe`        | `(callback: () => void) => () => void` | 클라이언트 측 로케일 변경을 구독합니다.                                                       |

## 서버 vs 클라이언트 동작

- **SSR / 서버 렌더링 중**: 요청은 고정된 매개변수로 한 번 렌더링됩니다. 서버 렌더링 중에 `setLocale()`을 호출해도 효과가 없으며 경고가 발생합니다. 로케일 전환은 클라이언트에서 수행하거나 대상 로케일 URL로 이동하여 수행해야 합니다.
- **클라이언트 스크립트에서**: `setLocale`은 클라이언트 스토어를 업데이트하고 Intlayer 구성에 따라 유지된 쿠키 또는 로컬 스토리지를 업데이트합니다.

## 관련 문서

- [`intlayer` 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useIntlayer.md)
- [`useDictionary` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useDictionary.md)
