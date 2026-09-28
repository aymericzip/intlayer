---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: intlayer Ara Yazılım Dokümantasyonu | remix-intlayer
description: Remix 3'te yerel ayarları algılamak, yönlendirmeleri yönetmek ve Intlayer durumunu istek bağlamına eklemek için intlayer ara yazılımını nasıl kullanacağınızı öğrenin.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "intlayer ara yazılımı başlangıç dokümantasyonu"
author: aymericzip
---

# intlayer Remix 3 Ara Yazılım Dokümantasyonu

Remix 3 için `intlayer` ara yazılımı, uygulamanız genelinde uluslararasılaştırma katmanını yönetir. Web standartları (`Request` ve `Response`) üzerine inşa edilmiştir; yerel ayar yönlendirmesini (yönlendirmeler ve dahili yeniden yazmalar) ele alır, isteğin yerel ayarını algılar, bunu çerezlerde ve başlıklarda saklar ve bir `AsyncLocalStorage` kapsamı oluşturarak alt işleyicilerin ve bileşenlerin prop aktarımı (prop drilling) olmadan çevirilere erişmesini sağlar.

## Kullanım

Remix 3 yönlendiricinizi başlatırken `intlayer` ara yazılımını kaydedin:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// `/`, `/fr`, `/es` sunar, yerel ayar istekten çözümlenir
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Açıklama

`intlayer` ara yazılımı aşağıdaki görevleri gerçekleştirir:

1. **Sözlük Hazırlığı**: Oluşturulan tüm sözlüklerin derlenmiş ve kullanılabilir olmasını sağlamak için başlangıçta `prepareIntlayer` çalıştırır.
2. **Yerel Ayar Yönlendirmesi**: İsteği yapılandırılmış yönlendirme stratejisine (`prefix_always`, `prefix_as_needed`, `no_prefix`) göre değerlendirir:
   - **Yönlendirmeler**: Bir kullanıcı `/about` sayfasını ziyaret ederse ve bir yerel ayar önekine (ör. `/fr/about`) yönlendirilmesi gerekiyorsa, ara yazılım uygun `location` ve `Set-Cookie` başlıklarıyla bir yönlendirme yanıtı döndürür.
   - **Dahili Yeniden Yazmalar**: Bir kullanıcı `/fr/about` adresine eriştiğinde, URL dahili olarak yeniden yazılır; böylece rota işleyiciniz `/about` ile eşleşirken çözümlenen yerel ayar `fr` olarak yakalanır.
   - **Yerelleştirilmiş URL Takma Adları**: `intlayer.config.ts` içinde tanımlanan URL yeniden yazma kurallarına uyar (ör. `/fr/about` adresini `/fr/a-propos` olarak yeniden yazma).
3. **Yerel Ayar Çözümleme**: Etkin yerel ayarı URL önekine, saklanan çerezlere, özel başlıklara veya `Accept-Language` tarayıcı tercihlerine göre algılar.
4. **Bağlam Enjeksiyonu**:
   - `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) nesnesini Remix `RequestContext` bağlamına `Intlayer` anahtarı altında ve `context.intlayer` olarak ekler.
   - İsteğin geri kalanını bir `AsyncLocalStorage` kapsamı (`requestStorage`) içinde çalıştırarak `useIntlayer`, `useDictionary` ve `useLocale` fonksiyonlarının işleyicilerde, görünümlerde ve bileşenlerde sorunsuz şekilde çağrılabilmesini sağlar.
5. **Kalıcılık**: Kullanıcının tercihini korumak için giden yerel ayar başlıklarını ve çerezlerini nihai HTTP yanıtına ekler.

## Parametreler

`intlayer` fonksiyonu isteğe bağlı `IntlayerMiddlewareOptions` kabul eder:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Özel yönlendirme yapılandırması geçersiz kılmaları
};

const middleware = intlayer(options);
```

## Bağlama Doğrudan Erişim

Hook'ları kullanmanın yanı sıra, çözümlenen `IntlayerState` nesnesine doğrudan Remix istek bağlamından erişebilirsiniz:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // context.get() aracılığıyla
  const state = context.get(Intlayer);

  // Veya doğrudan context.intlayer özelliği aracılığıyla
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## İlgili Dokümantasyon

- [`Intlayer` İstek Bağlamı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/Intlayer.md)
- [`useIntlayer` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useLocale.md)
