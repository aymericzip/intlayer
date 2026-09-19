---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale Hook Dokümantasyonu | remix-intlayer
description: Remix 3 uygulamalarında geçerli istek yerel ayarını, varsayılan yerel ayarı ve kullanılabilir yerel ayarları almak için useLocale hook'unun nasıl kullanılacağını görün.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - uluslararasılaştırma
  - dokümantasyon
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useLocale hook'u başlangıç dokümantasyonu"
author: aymericzip
---

# useLocale Hook Dokümantasyonu

`remix-intlayer` paketindeki `useLocale` hook'u, o anda işlenmekte olan HTTP isteğinin yerel ayarına ve ayrıca projede yapılandırılmış varsayılan ve kullanılabilir yerel ayarlara erişim sağlar.

## Kullanım

Bir Remix bileşeninde (örneğin bir dil değiştirici):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

Bir rota işleyicisinde:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## Dönüş Değerleri

Hook, `UseLocaleResult` türünde bir nesne döndürür:

| Özellik            | Tür                 | Açıklama                                                                                 |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | Geçerli istek için çözümlenen yerel ayar.                                                |
| `defaultLocale`    | `DeclaredLocales`   | `intlayer.config.ts` dosyasında yapılandırılan varsayılan geri dönüş yerel ayarı.        |
| `availableLocales` | `DeclaredLocales[]` | `intlayer.config.ts` dosyasında yapılandırılmış tüm kullanılabilir yerel ayarlar dizisi. |

## Açıklama

1. **İstek Kapsamında Çözümleme**: `intlayer()` ara yazılımı tarafından işlenen etkin bir istekte `useLocale`, istek deposundan çözümlenen yerel ayarı okur.
2. **Sorunsuz Geri Dönüş (Fallback)**: Bir istek bağlamı dışında çağrılırsa (başlatma komut dosyaları veya test paketleri gibi), yapılandırılmış `defaultLocale` değerine geri döner.

## İlgili Dokümantasyon

- [`intlayer` Ara Yazılımı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useIntlayer.md)
- [`useDictionary` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useDictionary.md)
